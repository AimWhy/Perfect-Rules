# **Perfect Rules**

**阿尔忒弥斯实验室维护的平台代理分流规则库。**

提供适用于 **Clash / Mihomo、V2rayN、Karing** 等客户端的分流配置。

**下载 → 导入 → 使用，无需自己编写复杂规则。**

## **🚀 快速开始**

| **客户端**         | **配置文件**                         | **使用方式**                                      | **教程视频**                 |
| ------------------ | ------------------------------------ | ------------------------------------------------- | ---------------------------- |
| **Clash / Mihomo** | [`Clash/`](./Clash/Clash_merge.yaml) | 复制配置 → 在Clash订阅的“全局覆写扩展配置” → 粘贴 | https://youtu.be/2A2SdHP_NKA |
| **V2rayN**         | [`V2rayN.json`](./V2rayN.json)       | 下载文件 → 导入路由配置                           | https://youtu.be/eaTmKWPyVG4 |

------

## **⭐ Clash 完美分流 3.0**

Clash / Mihomo 用户推荐使用最新的 **Perfect Rules 3.0**。

核心配置已经整理完成，你不需要自己寻找大量规则并逐条添加。

### **使用方法**

**第一步：** 下载项目中的 Clash 配置。

**第二步：** 在 Clash / Mihomo 客户端中导入配置，或者将配置添加到对应的 **覆写 / Merge** 功能。

**第三步：** 选择你的代理节点，启用配置即可。

```text
打开配置文件直接复制全部代码
   ↓
打开 Clash verge
   ↓
找到订阅面板，双击“全局覆写扩展配置”
   ↓
选择代理节点
   ↓
完成
```

------

## **🧩 分流内容**

Perfect Rules 已经针对常见使用场景进行了分类：

+ 🇨🇳 国内网站 → **DIRECT**
+ 🌍 海外网站 → **代理**
+ 🤖 AI 服务 → **AI 专用策略**
+ ▶️ YouTube → **YouTube 专用策略**
+ 🚫 广告 / 追踪 → **REJECT**
+ 🏠 局域网 → **DIRECT**

规则会持续更新和优化。

------

## **📁 项目文件**

```text
Perfect-Rules/
│
├── Clash/
│   └── ...
│
├── V2rayN.json
│
└── README.md
```

### **Clash / Mihomo**

[`Clash/`](./Clash/)

### **V2rayN**

[`V2rayN.json`](./V2rayN.json)

------

## **📺 视频教程**

本项目相关配置会在 **阿尔忒弥斯实验室** YouTube 频道进行详细演示。

[**阿尔忒弥斯实验室 · Artemis Lab**](https://www.youtube.com/@%E9%98%BF%E5%B0%94%E5%BF%92%E5%BC%A5%E6%96%AF%E5%AE%9E%E9%AA%8C%E5%AE%A4)

------

## **🔄 更新说明**

Perfect Rules 会持续维护。

主要更新内容：

+ 新增网站及服务
+ 新增 AI 域名
+ 优化分流规则
+ 修复错误分流
+ 更新 Clash / Mihomo 配置
+ 根据实际使用反馈调整规则

如果发现规则存在问题，欢迎提交 Issue。

------

## **⚠️ 免责声明**

本项目仅用于网络技术研究、学习以及配置交流。

请遵守所在地法律法规以及相关软件、网络服务的平台规则。

------

## **⭐ 支持项目**

如果 **Perfect Rules** 对你有帮助，欢迎给项目一个 ⭐ Star。

也欢迎提交 Issue 或 Pull Request，共同完善规则。

------

**Perfect Rules**

*Make complex routing simple.*

**阿尔忒弥斯实验室 · Artemis Lab**
