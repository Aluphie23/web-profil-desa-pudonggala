const fs = require('fs');

const data = fs.readFileSync('scratch/ocr.txt', 'utf-8');
const lines = data.split('\n').filter(l => l.trim().length > 0);

const dusunMap = {};

for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 10) continue;
    
    // NKK NIK NAME... PENDIDIKAN TEMPAT TGL LAHIR USIA L/P STATUS ALAMAT DUSUN RT PEKERJAAN
    // We can parse backwards because NAME can have spaces, TEMPAT LAHIR can have spaces.
    // The format is roughly:
    // ... [ALAMAT] [DUSUN] [RT] [PEKERJAAN]
    
    // Dusun is always numeric like '001', '002', '003'
    // Let's find the dusun index
    let dusunIdx = -1;
    for(let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] === '001' || parts[i] === '002' || parts[i] === '003') {
            // Usually RT is the next one, also numeric.
            if (i > 0 && (parts[i-1] === 'DS.PUDONGGALA' || parts[i-1].includes('PUDONGGALA'))) {
                dusunIdx = i;
                break;
            }
        }
    }
    
    if (dusunIdx !== -1) {
        const dusun = parseInt(parts[dusunIdx], 10);
        let pekerjaan = parts.slice(dusunIdx + 2).join(' ').trim();
        if (pekerjaan === '-' || pekerjaan === '') pekerjaan = 'BELUM/TIDAK BEKERJA';
        
        // Find pendidikan. It's usually after Name. Or just before TEMPAT LAHIR.
        // Let's look for standard keywords: SD, SMP, SMA, S1, D1, D3, TK, '-'
        const pendKeywords = ['SD', 'SMP', 'SMA', 'S1', 'D1', 'D3', 'TK', '-'];
        let pendidikan = 'TIDAK DIKETAHUI';
        for(let i=2; i<dusunIdx; i++) {
            if (pendKeywords.includes(parts[i])) {
                // If it's a single dash, it might be before TEMPAT LAHIR.
                // We assume the first matching keyword after NIK is Pendidikan.
                pendidikan = parts[i] === '-' ? 'TIDAK TAMAT SD/BELUM SEKOLAH' : parts[i];
                break;
            }
        }
        
        if (!dusunMap[dusun]) {
            dusunMap[dusun] = { total: 0, pendidikan: {}, pekerjaan: {} };
        }
        
        dusunMap[dusun].total++;
        dusunMap[dusun].pendidikan[pendidikan] = (dusunMap[dusun].pendidikan[pendidikan] || 0) + 1;
        dusunMap[dusun].pekerjaan[pekerjaan] = (dusunMap[dusun].pekerjaan[pekerjaan] || 0) + 1;
    }
}

console.log(JSON.stringify(dusunMap, null, 2));
