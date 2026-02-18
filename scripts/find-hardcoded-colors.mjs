#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const OUTPUT_DIR = path.join(__dirname, 'output', 'hardcoded-colors');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// File extensions to analyze (code files only)
const CODE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];

// Patterns to exclude (CSS files, token files, etc.)
const EXCLUDED_PATTERNS = [
  /\.css$/,
  /\.scss$/,
  /\.sass$/,
  /\.less$/,
  /token/i,
  /theme/i,
  /color/i,
  /style/i
];

// Color patterns to detect
const COLOR_PATTERNS = [
  {
    name: 'Hex Colors (3-digit)',
    pattern: /#([0-9a-fA-F]){3}\b/g
  },
  {
    name: 'Hex Colors (6-digit)',
    pattern: /#([0-9a-fA-F]){6}\b/g
  },
  {
    name: 'Hex Colors (8-digit with alpha)',
    pattern: /#([0-9a-fA-F]){8}\b/g
  },
  {
    name: 'RGB Colors',
    pattern: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g
  },
  {
    name: 'HSL Colors',
    pattern: /hsla?\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[\d.]+\s*)?\)/g
  },
  {
    name: 'Named Colors',
    pattern: /\b(black|white|red|green|blue|yellow|orange|purple|pink|brown|gray|grey|cyan|magenta|lime|maroon|navy|olive|teal|silver|gold|violet|indigo|turquoise|coral|salmon|crimson|fuchsia|azure|beige|ivory|lavender|plum|orchid|rose)\b/gi
  }
];

// Patterns that are likely false positives
const FALSE_POSITIVE_PATTERNS = [
  /#(define|ifdef|ifndef|endif|pragma|include|error|warning)/,
  /\/\/.*#/,
  /\/\*.*#\*\//,
  /https?:\/\/[^\s]+/,
  /\b[A-Z0-9_]{2,}\b/,  // Constants like MAX_VALUE
  /'#[^']+'/,  // String literals with hash
  /"[^"]*#[^"]*"/  // String literals with hash
];

function isFalsePositive(color, line) {
  for (const pattern of FALSE_POSITIVE_PATTERNS) {
    if (pattern.test(line)) {
      return true;
    }
  }
  return false;
}

function shouldExcludeFile(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(SRC_DIR, filePath);
  
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(fileName) || pattern.test(relativePath)) {
      return true;
    }
  }
  
  return false;
}

function findColorsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const colors = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Skip comment lines
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    COLOR_PATTERNS.forEach(({ name, pattern }) => {
      const matches = trimmed.match(pattern);
      if (matches) {
        matches.forEach(color => {
          // Validate it's actually a color
          if (!isFalsePositive(color, line)) {
            // Additional validation for hex colors
            if (color.startsWith('#')) {
              const hex = color.slice(1);
              if (!/^[0-9a-fA-F]+$/.test(hex)) {
                return;
              }
            }
            
            colors.push({
              color,
              type: name,
              line: lineNum,
              context: line.trim()
            });
          }
        });
      }
    });
  });

  return colors;
}

function analyzeDirectory(dirPath, relativePath = '') {
  const results = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...analyzeDirectory(fullPath, relPath));
    } else if (entry.isFile() && CODE_EXTENSIONS.includes(path.extname(entry.name))) {
      if (!shouldExcludeFile(fullPath)) {
        const colors = findColorsInFile(fullPath);
        if (colors.length > 0) {
          results.push({
            path: relPath,
            fullPath,
            colors
          });
        }
      }
    }
  }

  return results;
}

function generateMarkdownReport(results) {
  let report = '# Hardcoded Colors Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  const totalColors = results.reduce((sum, r) => sum + r.colors.length, 0);
  const totalFiles = results.length;

  report += '## Summary\n\n';
  report += '| Metric | Value |\n';
  report += '|--------|-------|\n';
  report += `| Files with Hardcoded Colors | ${totalFiles} |\n`;
  report += `| Total Hardcoded Color Instances | ${totalColors} |\n`;

  if (totalColors > 0) {
    // Color type breakdown
    const colorTypes = {};
    results.forEach(file => {
      file.colors.forEach(({ type }) => {
        colorTypes[type] = (colorTypes[type] || 0) + 1;
      });
    });

    report += '\n### Color Types\n\n';
    report += '| Type | Count |\n';
    report += '|------|-------|\n';
    Object.entries(colorTypes)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        report += `| ${type} | ${count} |\n`;
      });

    // Files with most colors
    report += '\n## Files with Hardcoded Colors\n\n';
    
    const sortedByColorCount = [...results].sort((a, b) => b.colors.length - a.colors.length);
    
    sortedByColorCount.forEach(file => {
      report += `### ${file.path}\n\n`;
      report += `**Total colors:** ${file.colors.length}\n\n`;
      
      // Group colors by type
      const colorsByType = {};
      file.colors.forEach(c => {
        if (!colorsByType[c.type]) {
          colorsByType[c.type] = [];
        }
        colorsByType[c.type].push(c);
      });

      Object.entries(colorsByType).forEach(([type, colors]) => {
        report += `#### ${type} (${colors.length})\n\n`;
        colors.slice(0, 20).forEach(({ color, line, context }) => {
          const truncatedContext = context.length > 100 ? context.substring(0, 97) + '...' : context;
          report += `- **Line ${line}:** \`${color}\`\n`;
          report += `  \`${truncatedContext}\`\n`;
        });
        
        if (colors.length > 20) {
          report += `  *... and ${colors.length - 20} more*\n`;
        }
        report += '\n';
      });
    });

    // Recommendations
    report += '\n## Recommendations\n\n';
    report += '1. **Create color variables**: Move hardcoded colors to theme configuration or CSS custom properties\n';
    report += '2. **Use semantic names**: Replace color values with semantic names like `--color-primary`, `--color-error`\n';
    report += '3. **Centralize color definitions**: Keep all color definitions in a single location (e.g., `src/config/theme/colors.ts`)\n';
    report += '4. **Use design tokens**: Consider using a design token system for better maintainability\n';
    report += '5. **Document color usage**: Add comments explaining why specific colors are used where they are\n';
  } else {
    report += '\n✅ No hardcoded colors found in code files!\n\n';
  }

  return report;
}

function generateJSONReport(results) {
  const allColors = [];
  results.forEach(file => {
    file.colors.forEach(color => {
      allColors.push({
        file: file.path,
        ...color
      });
    });
  });

  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: {
      totalFiles: results.length,
      totalColors: allColors.length
    },
    files: results.map(f => ({
      path: f.path,
      colorCount: f.colors.length,
      colors: f.colors
    })),
    allColors
  }, null, 2);
}

function main() {
  console.log('Searching for hardcoded colors in code files...');
  
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  const results = analyzeDirectory(SRC_DIR);

  console.log(`Found ${results.length} files with hardcoded colors`);

  // Generate reports
  const markdownReport = generateMarkdownReport(results);
  const jsonReport = generateJSONReport(results);

  // Write reports
  fs.writeFileSync(path.join(OUTPUT_DIR, 'report.md'), markdownReport);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'report.json'), jsonReport);

  console.log(`Reports generated in: ${OUTPUT_DIR}`);
  console.log(`  - report.md`);
  console.log(`  - report.json`);
}

main();
