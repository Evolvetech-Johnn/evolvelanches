const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/services/mockData.js');
const assetsPath = path.join(__dirname, 'src/assets/img-produtos');

try {
    const assetsFiles = fs.readdirSync(assetsPath);
    console.log(`Found ${assetsFiles.length} files in assets.`);

    let mockData = fs.readFileSync(mockDataPath, 'utf8');
    
    // Regex to find imports: import varName from '../path/filename.ext';
    const importRegex = /import\s+(\w+)\s+from\s+['"]\.\.\/assets\/img-produtos\/([^'"]+)['"];/g;
    
    let newMockData = mockData.replace(importRegex, (match, varName, oldFilename) => {
        // Try to find a match in assetsFiles
        // Strategy: 
        // 1. Exact match
        // 2. Case insensitive match
        // 3. "Relaxed" match (remove dashes/spaces, ignore case)
        
        if (assetsFiles.includes(oldFilename)) {
            return match; // All good
        }
        
        const oldBase = oldFilename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[-_]/g, "");
        
        const bestMatch = assetsFiles.find(f => {
            const fBase = f.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[\s-_]/g, "");
            // Check if fBase contains oldBase or vice versa
            return fBase.includes(oldBase) || oldBase.includes(fBase);
        });
        
        if (bestMatch) {
            console.log(`✅ Mapping ${oldFilename} -> ${bestMatch}`);
            return `import ${varName} from '../assets/img-produtos/${bestMatch}';`;
        } else {
            console.log(`❌ No match for ${oldFilename} (${varName})`);
            // Point to a placeholder or keep it (will break build, but shows what's missing)
            // Let's fallback to the first file just to make it buildable, OR better: 
            // point to 'logotherooster-nobg.png' (which we saw in the list) as a safe fallback?
            // checking list... "logotherooster-nobg.png" is there.
            return `import ${varName} from '../assets/img-produtos/logotherooster-nobg.png'; // FIXME: Missing ${oldFilename}`;
        }
    });
    
    fs.writeFileSync(mockDataPath, newMockData);
    console.log('Updated mockData.js imports.');
    
} catch (e) {
    console.error('Error:', e);
}
