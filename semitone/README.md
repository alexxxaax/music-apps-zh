# Semitone 简体中文版

**原版**：[Semitone 1.3](https://github.com/tckmn/semitone) · GPL-3.0-or-later · F-Droid `mn.tck.semitone`
**汉化版**：`semitone-zh-1.3.apk`（见仓库 Releases）

## 这是什么

一个调音器 + 节拍器 + 钢琴三合一的小工具，5.9MB，界面极简。三样东西用顶部三个 Tab 切换：

- **调音器**：对着麦克风发音，实时显示音高和音分偏差
- **节拍器**：拍数、细分、点击测速、后台继续
- **钢琴**：多点触控琴键，可在键上标音名

## 翻了什么

42 条字符串：

- 顶部 Tab：调音器 / 节拍器 / 钢琴
- 设置页：关于、全局设置、A4 音高（A4 频率设置）、节拍器（后台节拍）、钢琴（延音、标注音名、只标注 C）
- 所有开关的标题和说明文字
- 库自带的常用文案：完成、更多选项、搜索、收起、开 / 关

**没翻的**：音名（C3、C4）、`cents`→保留为「音分」但单位符号 ¢ 保留、A4/440Hz 这类物理量。

## 技术上

Semitone 是**传统 Android 应用**，字符串都在 `res/values/strings.xml` 里，是三个 App 里最好做的一个：

```bash
apktool d mn.tck.semitone_4.apk -o semi-src
# 改 semi-src/res/values/strings.xml
apktool b semi-src -o zh-unsigned.apk
java -jar uber-apk-signer.jar -a zh-unsigned.apk
```

改完的完整 `strings.xml` 就在 `tools/strings-zh.xml`，直接覆盖原文件即可。**dex 一行没动**，所以不存在逻辑被改坏的风险。

## 已知问题

没发现。

## 许可

GPL-3.0-or-later，跟原项目一致。原仓库：[tckmn/semitone](https://github.com/tckmn/semitone)。

修改内容全部在 `tools/strings-zh.xml` 里 —— 这就是完整的改动，可以直接跟原项目的 `res/values/strings.xml` 对比出 diff。
