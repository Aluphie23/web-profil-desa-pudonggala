const fs = require('fs');
const data = fs.readFileSync('scratch/ocr.txt', 'utf-8');
const lines = data.split('\n').filter(l => l.trim().length > 0);

const dusunMap = {};

for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 10) continue;
    
    // Dusun is numeric like '001', '002', '003'
    let dusunIdx = -1;
    for(let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] === '001' || parts[i] === '002' || parts[i] === '003') {
            if (i > 0 && (parts[i-1] === 'DS.PUDONGGALA' || parts[i-1].includes('PUDONGGALA'))) {
                dusunIdx = i;
                break;
            }
        }
    }
    
    if (dusunIdx !== -1) {
        const dusun = parseInt(parts[dusunIdx], 10);
        
        // Find gender L or P. It's usually right before the status (BELUM KAWIN, KAWIN, CERAI HIDUP, CERAI MATI).
        // Let's just look for 'L' or 'P' as an exact word in the line.
        let gender = 'Unknown';
        for(let i=2; i<dusunIdx; i++) {
            if (parts[i] === 'L') {
                gender = 'Laki-laki';
                break;
            } else if (parts[i] === 'P') {
                gender = 'Perempuan';
                break;
            }
        }
        
        if (!dusunMap[dusun]) {
            dusunMap[dusun] = { L: 0, P: 0, total: 0 };
        }
        
        if (gender === 'Laki-laki') dusunMap[dusun].L++;
        if (gender === 'Perempuan') dusunMap[dusun].P++;
        dusunMap[dusun].total++;
    }
}

console.log(JSON.stringify(dusunMap, null, 2));
