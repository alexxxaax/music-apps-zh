import fs from 'node:fs';
const dir = 'D:\\dafeiyu\\openear\\js';
const files = ['src_app_exercise_routes_ts.js', 'default-src_app_exercise_exercise_service_ts.js', 'main.js'];

// 1. find Next variants first
for (const f of files) {
  const t = fs.readFileSync(dir + '\\' + f, 'utf8');
  const re = /ɵɵtext"\]\(\d+, "(\s*Next\s*|Next)"/g;
  let m;
  while ((m = re.exec(t))) console.log('NEXT-NODE ' + f.slice(0, 24) + ' ' + JSON.stringify(m[1]));
  const re2 = /ɵɵtext"\]\(\d+, " Next "/g;
  if (re2.test(t)) console.log('NEXT-SPACED ' + f.slice(0, 24));
}

// 2. apply replacements
const MAP = [
  [' Correct answers: ', ' 答对：'],
  [' Click here for more options and to adjust difficulty level\\n', ' 点这里打开更多选项、调整难度\\n'],
  ["this.buttonText = 'Got it'", "this.buttonText = '知道了'"],
  [' Repeat ', ' 重放 '],
  [' Next ', ' 下一题 '],
];
for (const [en, zh] of MAP) {
  let n = 0;
  for (const f of files) {
    const p = dir + '\\' + f;
    let t = fs.readFileSync(p, 'utf8');
    const c = t.split(en).length - 1;
    if (!c) continue;
    t = t.split(en).join(zh);
    fs.writeFileSync(p, t, 'utf8');
    n += c;
  }
  console.log((n ? 'OK x' + n + ' ' : 'MISS ') + JSON.stringify(en));
}
