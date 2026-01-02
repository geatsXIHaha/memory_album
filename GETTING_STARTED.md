# 🚀 情侣日记 - 开始使用指南

欢迎使用**情侣日记**应用！这是为情侣设计的温馨日记应用，让你们能够一起记录和珍藏美好的回忆。

## 📖 文档导航

### 👤 对于首次用户
**→ 请先阅读:** [快速开始指南 (QUICKSTART.md)](./QUICKSTART.md)

这个指南会帮你：
- 配置 Firebase 项目
- 设置环境变量
- 本地运行应用
- 首次测试功能

### 🛠️ 对于开发人员
**→ 请先阅读:** [项目总结 (PROJECT_SUMMARY.md)](./PROJECT_SUMMARY.md)

这个文档包含：
- 技术栈详情
- 项目结构说明
- 数据库设计
- 架构信息

### 🚢 准备部署？
**→ 请先阅读:** [部署检查清单 (DEPLOYMENT_CHECKLIST.md)](./DEPLOYMENT_CHECKLIST.md)

这个清单帮你：
- 验证所有功能
- 检查安全配置
- 测试构建
- 选择部署平台

### 📚 需要详细说明？
**→ 请阅读:** [完整 README (README.md)](./README.md)

包含：
- 完整功能列表
- 安装步骤
- 使用指南
- 常见问题解答

### ⚙️ 需要 Firebase 配置帮助？
**→ 请阅读:** [Firebase 配置指南 (FIREBASE_SETUP.md)](./FIREBASE_SETUP.md)

详细步骤：
- 创建 Firebase 项目
- 启用所有服务
- 配置安全规则
- 设置环境变量

---

## ⚡ 快速 5 分钟开始

### 1️⃣ 准备工作（2分钟）
```bash
# 进入项目目录
cd c:\Users\User\memory_album

# 安装依赖（如果还没安装）
npm install
```

### 2️⃣ 配置 Firebase（2分钟）
1. 访问 https://console.firebase.google.com
2. 创建新项目或使用现有项目
3. 获取配置信息
4. 在项目根目录创建 `.env.local` 文件：
```
VITE_FIREBASE_API_KEY=你的_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=你的_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL=你的_DATABASE_URL
VITE_FIREBASE_PROJECT_ID=你的_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=你的_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=你的_SENDER_ID
VITE_FIREBASE_APP_ID=你的_APP_ID
```

### 3️⃣ 启动应用（1分钟）
```bash
npm run dev
```

打开浏览器访问 http://localhost:5173

---

## 🎯 应用功能一览

### 📝 日记功能
- 💭 记录心情和想法
- 📍 标记地点
- 🖼️ 上传多张照片
- ✏️ 随时编辑
- 🗑️ 删除不需要的记录

### 🎨 个性化定制
- 🌈 6个精选主题
- 🎭 完全自定义颜色
- 🌙 深色模式
- 💾 设置自动保存

### 📊 统计信息
- 📈 总日记统计
- 📅 本月数据
- 🔥 连续打卡
- 📋 日期搜索

---

## 🌟 主题展示

### 预设主题（点击即用）
1. **玫瑰粉** - 温暖浪漫（推荐）
2. **深蓝** - 沉静专业
3. **夜间模式** - 护眼深色
4. **薄荷绿** - 清爽现代
5. **落日黄** - 温暖怀旧
6. **深紫** - 优雅神秘

### 自定义主题
进入设置 → 自定义主题，调整：
- 主要颜色
- 次要颜色
- 背景颜色
- 文字颜色
- 深色模式开关

---

## 📱 设备兼容性

### ✅ 完全支持
- 📱 手机 (iOS 14+, Android 8+)
- 📲 平板电脑
- 💻 电脑 (Windows, Mac, Linux)
- 🌐 所有现代浏览器

### 浏览器
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🔐 安全说明

### 你的数据
- 🔒 采用企业级 Firebase 存储
- 🛡️ HTTPS 加密传输
- 👤 用户数据完全隔离
- 🔑 只有本人可访问

### 登录方式
1. **邮箱密码** - 永久账户（推荐）
2. **匿名登录** - 快速体验

---

## 💬 常见问题

### Q: 我的数据会丢失吗？
**A:** 不会。你的所有数据都安全存储在 Firebase 云上。

### Q: 可以多设备同步吗？
**A:** 是的！使用同一账户登录，数据会自动同步。

### Q: 图片会一直保存吗？
**A:** 是的，除非你主动删除，否则会永久保存。

### Q: 可以离线使用吗？
**A:** 目前需要网络，但我们计划添加离线功能。

### Q: 如何导出我的日记？
**A:** 可以从 Firebase Console 导出数据，具体方法见文档。

---

## 🚀 部署应用

### 选项 1: Firebase Hosting（最简单）
```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy
```

### 选项 2: Vercel
```bash
npm i -g vercel
vercel --prod
```

### 选项 3: Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

详见 [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🎓 学习路径

### 初级用户
1. ✅ 注册账户
2. ✅ 写第一篇日记
3. ✅ 上传图片
4. ✅ 改变主题颜色

### 中级用户
1. ✅ 学习所有功能
2. ✅ 自定义主题
3. ✅ 邀请伴侣
4. ✅ 创建美好回忆

### 高级用户
1. ✅ 部署自己的实例
2. ✅ 自定义功能
3. ✅ 集成第三方服务
4. ✅ 贡献改进建议

---

## 📞 获取帮助

### 问题排查
1. 查看浏览器控制台 (F12)
2. 查看 Firebase 控制台
3. 阅读相关文档
4. 检查网络连接

### 常用资源
- [README.md](./README.md) - 完整说明
- [QUICKSTART.md](./QUICKSTART.md) - 快速开始
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase 配置
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 项目总结
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - 部署清单

---

## 🎉 开始你的故事

现在就准备好了！

1. **第一步:** 阅读 [QUICKSTART.md](./QUICKSTART.md)
2. **第二步:** 配置 Firebase
3. **第三步:** 运行 `npm run dev`
4. **第四步:** 邀请你的伴侣
5. **第五步:** 开始记录美好回忆！

---

## 💝 寄语

这个应用是为了帮你们记录和珍藏每一个特别的时刻。

不论是日常琐碎还是重要里程碑，都值得被记录。

祝你们用这个应用，写下属于你们的故事！

---

**让我们开始吧！** 🚀

**项目地址:** c:\Users\User\memory_album  
**文档位置:** 本目录 (README.md, QUICKSTART.md, 等)  
**需要帮助？** 查看完整文档或联系技术支持

---

*💑 为爱而生，为你们的回忆而设计*

**Happy Journaling!** ✨📝
