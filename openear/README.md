# OpenEar 简体中文版

**原版**：[OpenEar 1.9.0](https://github.com/ShacharHarshuv/open-ear) · MIT · F-Droid `com.openear.www`
**汉化版**：`openear-zh-1.9.0.apk`（见仓库 Releases）

## 这是什么

OpenEar 是一个练耳（ear training）应用，练和弦听辨、音程、音级、和弦进行。原版界面全英文，这个版本把界面全部译成简体中文。

## 翻了什么

约 200 条字符串，覆盖：

- 8 个练习的名称和简介（音级、和弦功能、常见和弦进行、真实歌曲的和弦进行、和弦类型、和弦中的音级、三和弦转位、音程）
- 练习页全部按钮（重放、下一题、知道了、调：、答对：）
- 设置页所有选项标签和说明（混响、移调、调音 A4、显示琴键、显示音名、唱名、滑奏、保持屏幕常亮、学习模式、自动答题…）
- 20 种和弦类型名（大三和弦、属七和弦、挂四和弦、半减七和弦…）
- 40+ 乐理术语（大二度、纯五度、增四度、原位、第一转位、多利亚主音…）
- 帮助页整段讲解文字

**没翻的**：音名（C D E F G A B）、和弦符号（I IV V vi）、唱名（Do Re Mi）、100 多首歌名和歌手名。

## 已知问题

**「提示」气泡正文空白** —— 练习介绍页右上角那个白色气泡，标题「提示」和按钮「知道了」都在，中间正文是空的。

这是第三方库 `bdc-walk-popup` 的引导组件，内容通过 Angular 的内容投影渲染。原版在 Android 15+ 上也是空的，和汉化无关。不点掉也不影响功能。

**状态栏黑边** —— 顶部那条黑色系统状态栏去不掉。OpenEar 是 Capacitor（网页壳）应用，没做 Android 15 的 edge-to-edge 适配，WebView 内容停在状态栏下方，露出系统黑底。试过改 `android:statusBarColor`（API 35 起系统忽略）、`windowBackground`、adb 的 `policy_control immersive`（国产 ROM 拒绝），都没用。

## 怎么复现

```bash
# 1. 拿原版 APK（F-Droid 或 GitHub Release）
# 2. 解包
apktool d com.openear.www_47.apk -o src

# 3. 应用翻译（node 脚本，三个 bundle 都要改）
node tools/apply.mjs          # 主体：labels / infos / texts
node tools/buttons.mjs        # 练习页按钮
node tools/settings-labels.mjs # 设置页标签
# 映射表在同目录 map*.json 里，输出写到 js/ 目录，再拷进 src/assets/public/

# 4. 回编译 + 签名
apktool b src -o zh-unsigned.apk
java -jar uber-apk-signer.jar -a zh-unsigned.apk
```

脚本默认读写 `D:\dafeiyu\openear\js\`，改一下路径常量就能跑在你自己的目录。

## 改了哪些文件

原版 2470 个条目，只动了这三个 JS bundle 的字符串内容：

```
assets/public/src_app_exercise_routes_ts.js                  （界面模板）
assets/public/default-src_app_exercise_exercise_service_ts.js（练习定义）
assets/public/main.js                                        （主 bundle + 版本说明）
```

App 的逻辑代码、音频样本、许可证一个字节没动。

## 许可

MIT，跟原项目一致。原作者 ShacharHarshuv 的版权声明保留在 App 的「关于」页。
