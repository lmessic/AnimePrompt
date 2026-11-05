# AnimePrompt

> ✨ Indie 作品集项目｜动漫风格AI绘图提示词生成工具，基于 Next.js + TypeScript + TailwindCSS + Zustand
> 项目用于前端求职展示，完整演示从产品需求、组件设计到部署上线的全流程开发能力。

## 📖 项目介绍

AnimePrompt 是一个**纯前端AI绘画提示词生成Web应用**，专为二次元/动漫风格绘图打造。
用户通过可视化表单选择画风、角色特征、构图、光影、画质参数，自动拼接标准化正向提示词与负面提示词；支持历史记录、自定义模板收藏，一键复制Prompt到Midjourney / Stable Diffusion等AI绘图工具。

> 项目整体设计为Next.js15 App Router全栈方案，预留后端数据库与OAuth登录能力。
> ✅ 当前版本：前端MVP，使用LocalStorage保存历史记录和模板，完整交互可用。
> ⏳ 后续迭代：接入Server Actions、Prisma、Auth.js，实现Github登录+云端数据库存储，支持跨设备同步。

## 🛠️ 技术栈

- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：TailwindCSS
- **状态管理**：Zustand + persist（本地持久化）
- **图标**：lucide-react
- **部署**：Vercel（免费静态部署）

## ✨ 功能特性（MVP）

- 🎨 动漫风格选择：吉卜力 / 新海诚 / 赛璐璐 / 日系厚涂 / 动漫原画 / 像素二次元 / 二次元3D渲染
- 🧑 角色可视化配置：性别、年龄、发型、瞳色、表情、服饰 + 自定义补充描述
- 🖼️ 画面参数设置：构图、光影、画质关键词
- ❌ 负面提示词：内置默认负面词，支持开关和自定义编辑
- 📋 一键复制提示词，复制成功Toast反馈
- 📜 历史记录：自动保存生成记录，支持复用、删除、清空
- ⭐ 模板收藏：保存常用配置模板，一键回填复用
- 📱 响应式布局：PC端左右分栏，移动端上下自适应
- 🌓 深色/浅色主题切换（加分项）

## 🚀 本地运行

### 前置条件

- Node.js >= 20（使用nvm管理Node版本）
- Git

```bash
# 克隆仓库
git clone https://github.com/你的用户名/anime-prompt.git

# 进入项目目录
cd anime-prompt

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
