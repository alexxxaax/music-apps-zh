# 音乐练习 App 简体中文版

三个 Android 音乐练习应用的简体中文汉化版，都是开源软件，原版只有英文界面。

| App | 原版 | 汉化版 | 干什么用 | 原项目许可 |
|---|---|---|---|---|
| **OpenEar** | 1.9.0 | ✅ 全量中文 | 练耳：听和弦、音程、音级、和弦进行 | MIT |
| **Sun Piano** | 1.0 | ✅ 全量中文 | 88 键钢琴，8 种乐器实时合成 | GPL-3.0-or-later |
| **Semitone** | 1.3 | ✅ 全量中文 | 调音器 + 节拍器 + 钢琴 | GPL-3.0-or-later |

三个都自带完整功能、无广告、无内购、不联网（OpenEar 的「真实歌曲」练习要访问 YouTube，那是原版行为）。

---

## 安装

APK 在 [Releases](../../releases) 里，不在仓库内（OpenEar 单个就 98MB）。

```bash
adb install -r openear-zh-1.9.0.apk
adb install -r sunpiano-zh-1.0.apk
adb install -r semitone-zh-1.3.apk
```

或者直接把 APK 拷到手机上点开装。

**要先卸载原版**：汉化版用的是我自己的签名，和原版签名不同，覆盖安装会失败（`INSTALL_FAILED_UPDATE_INCOMPATIBLE`）。

```bash
adb uninstall com.openear.www
adb uninstall code.alimiracle.sunpiano
adb uninstall mn.tck.semitone
```

装完如果想回原版：卸载汉化版，去 [F-Droid](https://f-droid.org) 搜名字重装。

---

## 各 App 详情

- [OpenEar 汉化说明](openear/README.md)
- [Sun Piano 汉化说明](sunpiano/README.md)
- [Semitone 汉化说明](semitone/README.md)

---

## 已知问题

**OpenEar**
- 练习介绍页右上角那个「提示」气泡，气泡正文是空的。这是第三方库 `bdc-walk-popup` 的引导组件，原版在 Android 15+ 上也有这个问题，和汉化无关。点「知道了」关掉即可，不影响任何功能。
- 顶部黑色状态栏去不掉。OpenEar 是 Capacitor（网页壳）应用，没做 Android 15 的 edge-to-edge insets 适配，状态栏区域露出系统默认黑底。改 `android:statusBarColor` 在 API 35+ 已失效，adb 的 `policy_control immersive` 又会被部分国产 ROM 拒绝。凑合用。

**Sun Piano / Semitone**
- 没发现功能问题。

---

## 汉化怎么做的

三个 App 的技术栈不同，处理方法也不同，脚本都在各自目录的 `tools/` 里。

| App | 技术栈 | 字符串在哪 | 改法 |
|---|---|---|---|
| OpenEar | Capacitor（Ionic + Angular） | 编译后的 JS bundle 里，硬编码 | 字符串精确替换 + 重打包 assets |
| Sun Piano | Jetpack Compose（Kotlin） | dex 里的 `const-string`，没有资源文件 | apktool 解包改 smali + 回编译 |
| Semitone | 传统 Android（XML 资源） | `res/values/strings.xml` | 改 XML + 回编译 |

共同流程：`apktool` 解包 → 改字符串 → `apktool` 回编译 → `uber-apk-signer` 签名。

用到的工具（都需要 Java 11+）：

```bash
apktool d 原版.apk -o src
# 改字符串
apktool b src -o 汉化版-unsigned.apk
java -jar uber-apk-signer.jar -a 汉化版-unsigned.apk
```

---

## 保留了英文的地方

按中文使用习惯判断，这些**故意没翻**：

- 音名（C D E F G A B）、和弦符号（I IV V vi）、唱名（Do Re Mi Fa Sol La Ti）—— 国际通用记法，翻了反而看不懂
- 歌曲名、歌手名（Billie Jean、Let It Go、Avril Lavigne…）
- 音分单位 `¢`、频率 `Hz`、速度 `BPM`

乐理术语按国内教材的习惯译：Perfect 5th→纯五度、Aug 4th→增四度、Root Position→原位、Dorian Tonic (2nd)→多利亚主音（2 级）、Cadence→终止式。

---

## 许可与来源

三个 App 的原作者持有版权，本仓库只是字符串翻译，使用同样的许可证：

- **OpenEar** — MIT，[ShacharHarshuv/open-ear](https://github.com/ShacharHarshuv/open-ear)，原版权声明保留在 APK 的关于页
- **Sun Piano** — GPL-3.0-or-later，[alimiracle/sun-piano](https://codeberg.org/alimiracle/sun-piano)
- **Semitone** — GPL-3.0-or-later，[tckmn/semitone](https://github.com/tckmn/semitone)

GPL 项目按 GPL-3.0 第 6 条分发：本仓库提供了完整的、可复现的修改方法（脚本 + 映射表）和修改后的源文件（`semitone/tools/strings-zh.xml`），源码本身请从上面的原仓库获取。

本仓库里的脚本（`tools/*.mjs`）是 MIT。

---

## 免责

改了签名的 APK 无法从 F-Droid 自动更新。原项目发新版，这里不会跟着更新；想要新版就自己按 `tools/` 里的脚本重跑一遍，或者提 issue。
