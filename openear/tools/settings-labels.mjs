import fs from 'node:fs';
const p = 'D:\\dafeiyu\\openear\\js\\default-src_app_exercise_exercise_service_ts.js';
let t = fs.readFileSync(p, 'utf8');

const L = {
  Diatonic: '调内', Melodic: '旋律', Harmonic: '和声', Display: '显示方式', Numbers: '数字',
  'Movable-Do': '可移动 Do', Range: '音域', High: '高', Middle: '中', Bass: '低音', Soprano: '高音',
  Triad: '三和弦', Seventh: '七和弦', 'Arpeggiate Speed': '琶音速度',
  'Play Root After Correct Answer': '答对后播放根音', 'Arpeggio Direction': '琶音方向',
  Ascending: '上行', Descending: '下行', 'Ascending & Descending': '上行再下行',
  'Descending & Ascending': '下行再上行', Random: '随机', Smooth: '平滑',
  '1st Inversion': '第一转位', '2nd Inversion': '第二转位', Drone: '持续低音', Off: '关',
  'Analyze By': '分析依据', 'i iv V i (Minor)': 'i iv V i（小调）',
  'vi ii III vi (Relative Minor)': 'vi ii III vi（关系小调）', Included: '包含', Key: '调',
  'Change key': '换调', Never: '从不', 'Every Question': '每道题',
  'Every 5 Questions': '每 5 道题', 'Every 10 Questions': '每 10 道题', 'Every 20 Questions': '每 20 道题',
};

let applied = 0;
for (const [en, zh] of Object.entries(L)) {
  const needle = "label: '" + en + "'";
  const c = t.split(needle).length - 1;
  if (!c) { console.log('MISS ' + en); continue; }
  t = t.split(needle).join("label: '" + zh + "'");
  applied += c;
}
console.log('labels replaced:', applied);

const I = {
  'Limit the types of chords that can appear in the examples.<br><br>':
    '限制示例里能出现的和弦类型。<br><br>',
  'Choose how the scale degrees are noted. <br>(This setting will apply only after you close the settings page.)':
    '选择音级的记法。<br>（关闭设置页后才会生效。）',
  'Ascending - the chord will be arpeggiated from bottom to top.':
    '上行 —— 和弦从低到高琶音展开。',
  'Smooth: voices in the chords will move as little as possible (as usually happens in real music) <br>':
    '平滑：各声部尽量少动（真实音乐里通常如此）<br>',
  'Determines how chord progression in different modes are analyzed. <br>':
    '决定不同调式的和弦进行如何分析。<br>',
  'When to change key. <br> Never - a key is selected only once per session':
    '何时换调。<br>从不 —— 每次会话只选一次调。',
};
let i2 = 0;
for (const [en, zh] of Object.entries(I)) {
  const needle = "info: '" + en + "'";
  const c = t.split(needle).length - 1;
  if (!c) { console.log('MISS-INFO ' + en.slice(0, 40)); continue; }
  t = t.split(needle).join("info: '" + zh + "'");
  i2 += c;
}
console.log('infos replaced:', i2);
fs.writeFileSync(p, t, 'utf8');
