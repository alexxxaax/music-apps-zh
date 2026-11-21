import fs from 'node:fs';

const MAP = JSON.parse(fs.readFileSync('D:\\dafeiyu\\openear\\_map_final.json', 'utf8'));
const src = 'D:\\dafeiyu\\openear\\alljs';
const dst = 'D:\\dafeiyu\\openear\\js2';
fs.mkdirSync(dst, { recursive: true });
const files = ['src_app_exercise_routes_ts.js', 'default-src_app_exercise_exercise_service_ts.js', 'main.js', 'src_app_about_routes_ts.js'];
for (const f of files) fs.copyFileSync(src + '\\' + f, dst + '\\' + f);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WS = '(?:\\\\n|\\\\r|\\\\t|\\s)+';
const fuzzy = (en) => en.split(/\s+/).filter(Boolean).map(esc).join(WS);

const dq = (s) => s.replace(/"/g, '\\"');
const sq = (s) => s.replace(/'/g, "\\'");

const CONTEXT_ONLY = new Set([
  'Play', 'degree', '. The', 'Root position', 'First inversion', 'Second inversion',
  'Chord in Key', 'Note!', 'Tip!', 'For example:', '(one) chord', 'Cancel', 'Reset', 'Help',
  'from the same key', 'two notes will be played', 'it is called the', 'Chord Types', 'Intervals',
  'Scale Degrees', 'Next', 'Repeat', 'Sound', 'BPM', 'About OpenEar', 'Contribution', 'Feedback',
]);

const FIELDS = ['label', 'info', 'name', 'summary', 'title', 'text', 'header', 'placeholder', 'desc'];

function apply(t, en, zh, contextOnly) {
  let n = 0;
  const bodies = [fuzzy(en), fuzzy(dq(en)), fuzzy(sq(en)), fuzzy(dq(sq(en)))];
  for (const body of bodies) {
    if (contextOnly) {
      for (const fld of FIELDS) {
        const re = new RegExp('(' + fld + ': [\'"])\\s*' + body + '\\s*([\'"])', 'g');
        t = t.replace(re, (m, a, b) => { n += 1; return a + zh + b; });
      }
      let re = new RegExp('(ɵɵtext"\\]\\(\\d+, ")\\s*' + body + '\\s*(")', 'g');
      t = t.replace(re, (m, a, b) => { n += 1; return a + zh + b; });
      re = new RegExp('(ɵɵtextInterpolate\\d*\\(")\\s*' + body + '\\s*(")', 'g');
      t = t.replace(re, (m, a, b) => { n += 1; return a + zh + b; });
      re = new RegExp('(buttonText = [\'"])\\s*' + body + '\\s*([\'"])', 'g');
      t = t.replace(re, (m, a, b) => { n += 1; return a + zh + b; });
    } else {
      const re = new RegExp('(\'|"|`)\\s*' + body + '\\s*(\'|"|`)', 'g');
      t = t.replace(re, (m, a, b) => { n += 1; return a + zh + b; });
    }
  }
  return { text: t, n };
}

let total = 0;
const missing = [];
for (const group of ['labels', 'infos', 'texts']) {
  for (const [en, zh] of Object.entries(MAP[group] || {})) {
    let hit = 0;
    for (const f of files) {
      const p = dst + '\\' + f;
      let t = fs.readFileSync(p, 'utf8');
      const r = apply(t, en, zh, CONTEXT_ONLY.has(en) || en.length <= 14);
      if (r.n) { fs.writeFileSync(p, r.text, 'utf8'); hit += r.n; }
    }
    if (hit) total += hit; else missing.push(group + ':' + en.slice(0, 55));
  }
}
console.log('total replacements:', total, ' missing:', missing.length);
for (const m of missing) console.log('  MISS ' + m);
