# Sun Piano 简体中文版

**原版**：[Sun Piano 1.0](https://codeberg.org/alimiracle/sun-piano) · GPL-3.0-or-later · F-Droid `code.alimiracle.sunpiano`
**汉化版**：`sunpiano-zh-1.0.apk`（见仓库 Releases）

## 这是什么

88 键钢琴，全部声音实时合成（不带采样，所以安装包只有 2.4MB），8 种乐器、滑奏、力度感应、录音、蓝牙 MIDI 键盘支持。原版界面英文。

## 翻了什么

33 条界面字符串：

- 顶栏：钢琴 / 音量 / 延音 / 节拍 / ● 录制 / 曲库
- 设置页：混响、移调、调音（A4）、显示琴键、显示音名、唱名（Do Re Mi）、按触键位置决定音量、滑奏（琴键间滑动）、保持屏幕常亮、N 个白键
- 乐器下拉：钢琴 / 电钢琴 / 酒吧钢琴 / 风琴 / 弦乐 / 羽管键琴 / 马林巴 / 合成主音
- 蓝牙区：蓝牙 MIDI 键盘 / 未连接 / 搜索键盘 / 关闭
- 录音页：还没有录音。点 ● 录制，弹一段，再点 ■ 停止。
- 其他：权限提示、蓝牙搜索失败提示、版权页、电脑键盘提示

**没翻的**：音名 C3/C4、频率 440 Hz、乐器英文缩写。

## 技术上值得一说

Sun Piano 是 **Jetpack Compose** 应用，界面文字**没有放在 Android 资源里** —— 编译后 `res/values/strings.xml` 只有 14 条 Material3 库的无障碍文案，应用自己的文字全部硬编码在 Kotlin 里，编译成 smali 的 `const-string`。

所以汉化流程是：

```bash
apktool d 原版.apk -o src        # 反编译出 2750 个 smali 文件
# 在 smali 里按 const-string 精确匹配英文字符串，替换成中文
apktool b src -o zh-unsigned.apk # 回编译
java -jar uber-apk-signer.jar -a zh-unsigned.apk
```

风险点：`const-string` 里的字符串可能是 UI 文案，也可能是 SharedPreferences 的 key 或枚举值。所以每条都先确认它只出现 1-2 次、且在 UI 相关的 smali 里，才动手。整个过程打了 5 个中间版本，每上一版都验证 App 能启动。

## 怎么复现

```bash
apktool d code.alimiracle.sunpiano_2.apk -o sun-src
# 依次跑 tools/ 下五个脚本（每个脚本对应一批字符串）
node tools/01-longtext.mjs
node tools/02-settings.mjs
node tools/03-topbar.mjs
node tools/04-bluetooth.mjs
node tools/05-instruments.mjs
apktool b sun-src -o zh-unsigned.apk
java -jar uber-apk-signer.jar -a zh-unsigned.apk
```

脚本默认路径是 `D:\dafeiyu\openear\sun-src\smali`，改成你自己的路径。

## 已知问题

没发现。功能、合成、录音、蓝牙都正常。

## 许可

GPL-3.0-or-later，跟原项目一致。原仓库：[alimiracle/sun-piano](https://codeberg.org/alimiracle/sun-piano)。

按 GPL-3.0 第 6 条，本仓库提供了完整可复现的修改方法（脚本）和修改内容（脚本里的字符串映射表就是全部的改动）。源码请从原仓库获取。
