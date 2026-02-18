#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const OUTPUT_DIR = path.join(__dirname, 'output', 'code-analysis');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// File extensions to analyze
const CODE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];

// Color patterns to detect (hex, rgb, hsl, named colors)
const COLOR_PATTERNS = [
  /#[0-9a-fA-F]{3,8}\b/g,  // hex colors
  /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,  // rgb/rgba
  /hsla?\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[\d.]+\s*)?\)/g,  // hsl/hsla
  /\b(black|white|red|green|blue|yellow|orange|purple|pink|brown|gray|grey|cyan|magenta|lime|maroon|navy|olive|teal|silver|gold|violet|indigo|turquoise|coral|salmon|crimson|fuchsia|azure|beige|ivory|lavender|plum|orchid|rose)\b/gi  // named colors
];

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const stats = {
    totalLines: lines.length,
    codeLines: 0,
    commentLines: 0,
    blankLines: 0,
    jsdocBlocks: 0,
    jsdocLines: 0,
    singleLineComments: 0,
    multiLineCommentBlocks: 0,
    colors: [],
    functions: 0,
    classes: 0,
    interfaces: 0,
    types: 0,
    exports: 0,
    imports: 0
  };

  let inMultiLineComment = false;
  let inJSDoc = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineNum = index + 1;

    // Blank line detection
    if (trimmed === '') {
      stats.blankLines++;
      return;
    }

    // Multi-line comment detection
    if (trimmed.startsWith('/*')) {
      inMultiLineComment = true;
      stats.multiLineCommentBlocks++;
      if (trimmed.startsWith('/**')) {
        inJSDoc = true;
        stats.jsdocBlocks++;
      }
    }

    if (inMultiLineComment) {
      stats.commentLines++;
      if (inJSDoc) {
        stats.jsdocLines++;
      }
      
      if (trimmed.includes('*/')) {
        inMultiLineComment = false;
        inJSDoc = false;
      }
      return;
    }

    // Single-line comment detection
    if (trimmed.startsWith('//')) {
      stats.commentLines++;
      stats.singleLineComments++;
      return;
    }

    // Code line
    stats.codeLines++;

    // Detect patterns
    if (trimmed.includes('function ') || trimmed.includes('=>')) {
      stats.functions++;
    }
    if (trimmed.match(/^\s*(export\s+)?(default\s+)?class\s+/)) {
      stats.classes++;
    }
    if (trimmed.match(/^\s*interface\s+/)) {
      stats.interfaces++;
    }
    if (trimmed.match(/^\s*type\s+/)) {
      stats.types++;
    }
    if (trimmed.match(/^export\s+/)) {
      stats.exports++;
    }
    if (trimmed.match(/^import\s+/)) {
      stats.imports++;
    }

    // Color detection
    COLOR_PATTERNS.forEach(pattern => {
      const matches = trimmed.match(pattern);
      if (matches) {
        matches.forEach(color => {
          // Check if it's actually a color and not something else
          if (!color.includes('//') && !color.includes('/*')) {
            stats.colors.push({ color, line: lineNum });
          }
        });
      }
    });
  });

  // Calculate percentages
  const totalNonBlank = stats.totalLines - stats.blankLines;
  stats.commentDensity = totalNonBlank > 0 ? ((stats.commentLines / totalNonBlank) * 100).toFixed(2) : 0;
  stats.codeDensity = totalNonBlank > 0 ? ((stats.codeLines / totalNonBlank) * 100).toFixed(2) : 0;
  stats.blankPercentage = stats.totalLines > 0 ? ((stats.blankLines / stats.totalLines) * 100).toFixed(2) : 0;
  stats.documentationCoverage = stats.functions > 0 ? ((stats.jsdocBlocks / stats.functions) * 100).toFixed(2) : 0;

  return stats;
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
      const stats = analyzeFile(fullPath);
      results.push({
        path: relPath,
        fullPath,
        ...stats
      });
    }
  }

  return results;
}

function generateMarkdownReport(results) {
  let report = '# Code Analysis Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  // Summary statistics
  const totalFiles = results.length;
  const totalLines = results.reduce((sum, r) => sum + r.totalLines, 0);
  const totalCodeLines = results.reduce((sum, r) => sum + r.codeLines, 0);
  const totalCommentLines = results.reduce((sum, r) => sum + r.commentLines, 0);
  const totalBlankLines = results.reduce((sum, r) => sum + r.blankLines, 0);
  const totalFunctions = results.reduce((sum, r) => sum + r.functions, 0);
  const totalJSDoc = results.reduce((sum, r) => sum + r.jsdocBlocks, 0);
  const totalColors = results.reduce((sum, r) => sum + r.colors.length, 0);

  report += '## Summary\n\n';
  report += '| Metric | Value |\n';
  report += '|--------|-------|\n';
  report += `| Total Files | ${totalFiles} |\n`;
  report += `| Total Lines | ${totalLines} |\n`;
  report += `| Code Lines | ${totalCodeLines} |\n`;
  report += `| Comment Lines | ${totalCommentLines} |\n`;
  report += `| Blank Lines | ${totalBlankLines} |\n`;
  report += `| Functions | ${totalFunctions} |\n`;
  report += `| JSDoc Blocks | ${totalJSDoc} |\n`;
  report += `| Hardcoded Colors | ${totalColors} |\n`;
  report += `| Avg Comment Density | ${totalFiles > 0 ? (results.reduce((sum, r) => sum + parseFloat(r.commentDensity), 0) / totalFiles).toFixed(2) : 0}% |\n`;
  report += `| Avg Code Density | ${totalFiles > 0 ? (results.reduce((sum, r) => sum + parseFloat(r.codeDensity), 0) / totalFiles).toFixed(2) : 0}% |\n`;

  report += '\n## File-by-File Analysis\n\n';
  report += '| File | LOC | Code | Comments | Blank | Comment % | Code % | JSDoc | Functions | Classes | Colors |\n';
  report += '|------|-----|------|----------|-------|-----------|--------|-------|-----------|---------|--------|\n';

  results.forEach(file => {
    const fileName = file.path.length > 40 ? '...' + file.path.slice(-37) : file.path;
    report += `| ${fileName} | ${file.totalLines} | ${file.codeLines} | ${file.commentLines} | ${file.blankLines} | ${file.commentDensity}% | ${file.codeDensity}% | ${file.jsdocBlocks} | ${file.functions} | ${file.classes} | ${file.colors.length} |\n`;
  });

  // Files with hardcoded colors
  const filesWithColors = results.filter(f => f.colors.length > 0);
  if (filesWithColors.length > 0) {
    report += '\n## Files with Hardcoded Colors\n\n';
    filesWithColors.forEach(file => {
      report += `### ${file.path}\n\n`;
      report += `Total colors: ${file.colors.length}\n\n`;
      file.colors.forEach(({ color, line }) => {
        report += `- Line ${line}: \`${color}\`\n`;
      });
      report += '\n';
    });
  }

  // KPI Analysis
  report += '\n## KPI Analysis\n\n';

  // Top files by LOC
  const topLOC = [...results].sort((a, b) => b.totalLines - a.totalLines).slice(0, 10);
  report += '### Top 10 Files by Lines of Code\n\n';
  report += '| File | LOC |\n';
  report += '|------|-----|\n';
  topLOC.forEach(file => {
    report += `| ${file.path} | ${file.totalLines} |\n`;
  });

  // Files with highest comment density
  const topCommentDensity = [...results].filter(f => f.codeLines > 0).sort((a, b) => parseFloat(b.commentDensity) - parseFloat(a.commentDensity)).slice(0, 10);
  report += '\n### Top 10 Files by Comment Density\n\n';
  report += '| File | Comment % |\n';
  report += '|------|-----------|\n';
  topCommentDensity.forEach(file => {
    report += `| ${file.path} | ${file.commentDensity}% |\n`;
  });

  // Files with lowest documentation coverage
  const lowDocs = [...results].filter(f => f.functions > 0).sort((a, b) => parseFloat(a.documentationCoverage) - parseFloat(b.documentationCoverage)).slice(0, 10);
  if (lowDocs.length > 0) {
    report += '\n### Files with Lowest Documentation Coverage\n\n';
    report += '| File | JSDoc Coverage % |\n';
    report += '|------|------------------|\n';
    lowDocs.forEach(file => {
      report += `| ${file.path} | ${file.documentationCoverage}% |\n`;
    });
  }

  return report;
}

function generateJSONReport(results) {
  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: {
      totalFiles: results.length,
      totalLines: results.reduce((sum, r) => sum + r.totalLines, 0),
      totalCodeLines: results.reduce((sum, r) => sum + r.codeLines, 0),
      totalCommentLines: results.reduce((sum, r) => sum + r.commentLines, 0),
      totalBlankLines: results.reduce((sum, r) => sum + r.blankLines, 0),
      totalFunctions: results.reduce((sum, r) => sum + r.functions, 0),
      totalClasses: results.reduce((sum, r) => sum + r.classes, 0),
      totalJSDocBlocks: results.reduce((sum, r) => sum + r.jsdocBlocks, 0),
      totalColors: results.reduce((sum, r) => sum + r.colors.length, 0),
      averageCommentDensity: results.length > 0 ? (results.reduce((sum, r) => sum + parseFloat(r.commentDensity), 0) / results.length).toFixed(2) : 0,
      averageCodeDensity: results.length > 0 ? (results.reduce((sum, r) => sum + parseFloat(r.codeDensity), 0) / results.length).toFixed(2) : 0
    },
    files: results
  }, null, 2);
}

function main() {
  console.log('Analyzing code in src directory...');
  
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  const results = analyzeDirectory(SRC_DIR);

  console.log(`Analyzed ${results.length} files`);

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
