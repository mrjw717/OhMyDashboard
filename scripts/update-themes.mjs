import * as fs from 'fs';
import * as path from 'path';

const themesDir = '/mnt/ugh/Dev/OHHHBoiler-Doublesidebar/themes/corecolors';
// Check if directory exists
if (!fs.existsSync(themesDir)) {
    console.error(`Directory not found: ${themesDir}`);
    process.exit(1);
}

const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(themesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Helper to find the index of a property while respecting object hierarchy
    const injectToken = (objectContent, isDark) => {
        // Find the end of the object (before the last closing brace and chart spread)
        const spreadIndex = objectContent.indexOf('...commonChartColors');
        if (spreadIndex === -1) return objectContent;

        // Extract colors to calculate defaults if needed
        const bgMatch = objectContent.match(/background:\s*'([^']+)'/);
        const borderMatch = objectContent.match(/border:\s*'([^']+)'/);
        const bg = bgMatch ? bgMatch[1] : (isDark ? '240 10% 3.9%' : '0 0% 100%');
        const border = borderMatch ? borderMatch[1] : (isDark ? '240 3.7% 15.9%' : '240 5.9% 90%');

        // Calculate section bg
        let sectionBg = bg;
        if (isDark) {
            // Very basic HSL adjustment for dark mode surfaces
            const parts = bg.split(' ');
            if (parts.length === 3) {
                const h = parts[0];
                const s = parts[1];
                let l = parseFloat(parts[2]);
                sectionBg = `${h} ${s} ${Math.min(l + 3, 15)}%`;
            } else {
                // Try to handle no-space format if it exists
                const hslMatch = bg.match(/(\d+\.?\d*)\s+(\d+\.?\d*%?)\s+(\d+\.?\d*%?)/);
                if (hslMatch) {
                    const h = hslMatch[1];
                    const s = hslMatch[2];
                    let l = parseFloat(hslMatch[3]);
                    sectionBg = `${h} ${s} ${Math.min(l + 3, 15)}%`;
                }
            }
        } else {
            if (bg === '0 0% 100%' || bg.includes('99%')) {
                sectionBg = '0 0% 100%';
            }
        }

        const sectionToken = `section: '${sectionBg}',\n    sectionBorder: '${border}',\n    `;

        // Insert before the spread
        return objectContent.slice(0, spreadIndex) + sectionToken + objectContent.slice(spreadIndex);
    };

    // Skip if tokens already exist
    if (content.includes('section:')) {
        console.log(`Skipping ${file} (already updated)`);
        return;
    }

    const lightStart = content.indexOf('light: {');
    const darkStart = content.indexOf('dark: {');

    if (lightStart !== -1 && darkStart !== -1) {
        let lightObj = content.slice(lightStart, darkStart);
        let darkObj = content.slice(darkStart);

        lightObj = injectToken(lightObj, false);
        darkObj = injectToken(darkObj, true);

        content = content.slice(0, lightStart) + lightObj + darkObj;
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});
