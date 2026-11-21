import fs from 'node:fs';
import path from 'node:path';

const root = 'D:\\dafeiyu\\openear\\sun-src';
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
walk(path.join(root, 'smali'));

const MAP = [
  ['Copyright (C) 2026 alimiracle\\nFree software under the GNU General Public License, version 3 or later. It comes with ABSOLUTELY NO WARRANTY.',
   '版权所有 (C) 2026 alimiracle\\n本程序是自由软件，遵循 GNU 通用公共许可证第 3 版或更高版本，不提供任何担保。'],
  ["Sun Piano needs the Nearby devices permission to find Bluetooth MIDI keyboards. You can allow it in the app\\'s settings.",
   'Sun Piano 需要「附近的设备」权限才能找到蓝牙 MIDI 键盘。可以在系统设置里为它开启。'],
  ['Tip: a computer keyboard works too (Z\\u2013M row = C3, Q\\u2013U row = C4), as does a USB MIDI keyboard: just plug it in.',
   '提示：电脑键盘也能弹（Z–M 行 = C3，Q–U 行 = C4），USB MIDI 键盘插上就能用。'],
  ['No Bluetooth MIDI keyboards found. Switch yours on (or into Bluetooth mode) and search again.',
   '没有找到蓝牙 MIDI 键盘。把你的键盘开机（或切到蓝牙模式）后重新搜索。'],
  ["Can\\'t play the recording right now: another app, such as a call, is using the sound.",
   '现在放不了录音：有别的应用（比如通话）正在占用声音。'],
  ["Couldn\\'t search for Bluetooth devices. Try turning Bluetooth off and on.",
   '搜索蓝牙设备失败。试着把蓝牙关掉再打开。'],
  ['Nothing here yet. Tap \\u25cf Rec, play something, then tap \\u25a0 Stop.',
   '还没有录音。点 ● 录制，弹一段，再点 ■ 停止。'],
];

let total = 0;
for (const [en, zh] of MAP) {
  let hit = 0;
  for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    if (!t.includes(en)) continue;
    const c = t.split(en).length - 1;
    t = t.split(en).join(zh);
    fs.writeFileSync(f, t, 'utf8');
    hit += c;
  }
  console.log((hit ? 'OK x' + hit + '  ' : 'MISS  ') + en.slice(0, 60));
  total += hit;
}
console.log('total:', total);
