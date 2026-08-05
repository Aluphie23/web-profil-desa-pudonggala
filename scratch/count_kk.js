const fs = require('fs');
const data = fs.readFileSync('scratch/ocr.txt', 'utf-8');
const lines = data.split('\n').filter(l => l.trim().length > 0);

const nkkSet = new Set();
for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length > 1) {
        // NKK is usually the second column if the first is "NO Urut" but there is no NO Urut in my parsed text except maybe some rows.
        // Actually, looking at OCR: "7409072711150001 7409070101800003 JAMIL..."
        // Or "7402026607850001 IRMAYANTI, S.Pd..." when there is no NKK? 
        // Wait, looking at the first OCR page:
        // 1 7409072711150001 7409070101800003 JAMIL
        // 2 7402026607850001 IRMAYANTI (this might be NIK or NKK?)
        // Let's just find any 16 digit number. The first 16 digit number is usually NKK if there are two, or NIK if there is one.
        // Actually, NKK is grouped. People in the same family have the same NKK.
        // Let's print out the structure to see.
    }
}

// Let's just use regex to find all 16 digit numbers.
const matches = data.match(/\b\d{16}\b/g);
if (matches) {
    // Some lines have 2, some have 1. NKK is usually the first one if there's a new family.
    // In the raw PDF, NKK is only printed on the first person of the family.
    // Let's count how many lines have a 16-digit number that appears before another 16-digit number, OR just lines that have 2 16-digit numbers (NKK and NIK).
    // Or, more simply, just count lines that start with a 16 digit number in my ocr.txt.
    let nkkCount = 0;
    for (const line of lines) {
        const p = line.split(/\s+/);
        // If p[0] is 16 digits and p[1] is 16 digits, p[0] is NKK, p[1] is NIK.
        if (p[0].length === 16 && p[1] && p[1].length === 16) {
            nkkSet.add(p[0]);
        }
    }
    console.log("Unique NKK count:", nkkSet.size);
}
