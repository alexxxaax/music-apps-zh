import fs from 'node:fs';
import path from 'node:path';

const root = 'D:\\dafeiyu\\openear\\sun-src\\smali';
const files = [];
(function walk(dir, depth) {
  if (depth > 8) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, depth + 1);
    else if (e.name.endsWith('.smali')) files.push(fp);
  }
})(root, 0);

const MAP = [
  ['"Electric Piano"', '"电钢琴"'],
  ['"Honky-Tonk"', '"酒吧钢琴"'],
  ['"Organ"', '"风琴"'],
  ['"Strings"', '"弦乐"'],
  ['"Harpsichord"', '"羽管键琴"'],
  ['"Marimba"', '"马林巴"'],
  ['"Synth Lead"', '"合成主音"'],
];

let total = 0;
for (const [en, zh] of MAP) {
  let hit = 0;
  for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    const c = t.split(en).length - 1;
    if (!c) continue;
    t = t.split(en).join(zh);
    fs.writeFileSync(f, t, 'utf8');
    hit += c;
  }
  console.log((hit ? 'OK x' + hit + '  ' : 'MISS  ') + en);
  total += hit;
}
console.log('total:', total);
