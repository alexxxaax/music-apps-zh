import fs from 'node:fs';
import path from 'node:path';

const root = 'D:\\dafeiyu\\openear\\sun-src\\smali';
const files = [];
function walk(dir, depth = 0) {
  if (depth > 8) return;
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp, depth + 1);
    else if (e.name.endsWith('.smali')) files.push(fp);
  }
}
walk(root);

const MAP = [
  ['Settings', '设置'],
  ['Reverb', '混响'],
  ['Transpose', '移调'],
  ['Tuning (A4)', '调音（A4）'],
  ['Visible keys', '显示琴键'],
  ['Show note names', '显示音名'],
  ['Do-Re-Mi names', '唱名（Do Re Mi）'],
  ['Touch position sets loudness', '按触键位置决定音量'],
  ['Glissando (slide between keys)', '滑奏（琴键间滑动）'],
  ['Keep screen on', '保持屏幕常亮'],
  ['Piano', '钢琴'],
  ['Vol', '音量'],
  ['Sustain', '延音'],
  ['Stop', '停止'],
  ['Save', '保存'],
  ['Delete', '删除'],
  ['Clear', '清除'],
  ['About', '关于'],
];

let total = 0;
for (const [en, zh] of MAP) {
  const needle = '"' + en + '"';
  const repl = '"' + zh + '"';
  let hit = 0;
  for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    const c = t.split(needle).length - 1;
    if (!c) continue;
    t = t.split(needle).join(repl);
    fs.writeFileSync(f, t, 'utf8');
    hit += c;
  }
  console.log((hit ? 'OK x' + hit + '  ' : 'MISS  ') + en);
  total += hit;
}
console.log('total:', total);
