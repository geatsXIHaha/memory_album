# 💑 情侣日记 (Couples Diary)

一个温馨的网页应用，让情侣们能够一起记录和珍藏美好的回忆。

## 功能特性

✨ **完整的日记系统**
- 📝 写日记：轻松记录每天的故事
- 📖 查看历史：浏览过往的日记
- ✏️ 编辑日记：随时修改和更新内容
- 🗑️ 删除日记：清理不需要的记录

🎨 **自定义主题系统**
- 🎭 6个精选主题预设（玫瑰粉、深蓝、夜间模式、薄荷绿、落日黄、深紫）
- 🌈 完全自定义主题颜色
- 🌙 深色模式支持
- 💾 主题自动保存到账户

📷 **图片管理**
- 🖼️ 支持上传多张图片
- 📦 自动图片压缩优化
- 🔒 安全的云存储

❤️ **用户账户**
- 🔐 邮箱注册和登录
- 👻 匿名登录选项
- 🔑 安全的身份验证

📊 **统计和分析**
- 📈 查看总日记数量
- 📅 本月日记统计
- 🔥 连续打卡天数

## 技术栈

### 前端
- **React 19** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 快速开发和构建
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **date-fns** - 日期处理
- **React Icons** - 图标库

### 后端 & 数据库
- **Firebase Authentication** - 用户认证
- **Firebase Realtime Database** - 日记数据存储（大容量，无限扩展）
- **Firebase Storage** - 图片存储和管理

## 数据库推荐

### 为什么使用Firebase Realtime Database？

1. **大存储空间** - Firebase提供25GB免费存储，对于日记应用足够使用
2. **自动扩展** - 随着用户增多自动扩展，无需担心容量
3. **实时同步** - 数据实时同步到所有设备
4. **免费配额** - 足够的免费操作配额供小规模应用使用
5. **安全性** - 内置安全规则和身份验证
6. **简单部署** - 无需自建服务器

## 快速开始

### 1. 环境准备

```bash
# 安装依赖
npm install
```

### 2. 配置Firebase

#### 步骤1：创建Firebase项目
1. 访问 [Firebase Console](https://console.firebase.google.com)
2. 点击"新建项目"
3. 输入项目名称（如 "couples-diary"）
4. 完成项目创建

#### 步骤2：启用服务
1. 在项目主页，点击"构建" → "Realtime Database"
2. 点击"创建数据库"
3. 选择位置，选择"以测试模式启动"
4. 在项目主页，点击"构建" → "身份验证"
5. 点击"开始"，启用以下登录方式：
   - Email/Password（邮箱密码登录）
   - Anonymous（匿名登录）
6. 在项目主页，点击"构建" → "Storage"
7. 点击"开始"，创建存储桶

#### 步骤3：获取配置凭据
1. 在项目设置中（齿轮图标 → 项目设置）
2. 找到"您的应用"部分
3. 如果没有Web应用，点击"</>"
4. 复制Firebase配置代码

#### 步骤4：配置本地环境
1. 复制 `.env.example` 为 `.env.local`：
```bash
cp .env.example .env.local
```

2. 将Firebase配置信息填入 `.env.local`：
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### 步骤5：配置Firebase安全规则（重要！）

在Firebase Console中配置Realtime Database规则：

```json
{
  "rules": {
    "diaries": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['date', 'content', 'images', 'createdAt', 'updatedAt'])",
        "$entryId": {
          ".validate": "newData.hasChildren(['date', 'content', 'images', 'createdAt', 'updatedAt'])"
        }
      }
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "theme": {
          ".validate": "newData.hasChildren(['primaryColor', 'secondaryColor', 'backgroundColor', 'textColor', 'darkMode'])"
        }
      }
    }
  }
}
```

配置Storage规则：

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /diaries/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── config/              # 配置文件
│   └── firebase.ts     # Firebase初始化
├── pages/              # 页面组件
│   ├── Auth.tsx        # 登录/注册页面
│   ├── Home.tsx        # 主页
│   ├── DiaryList.tsx   # 日记列表
│   ├── AddEntry.tsx    # 添加/编辑日记
│   └── Settings.tsx    # 设置/主题
├── components/         # 通用组件
│   └── ProtectedRoute.tsx  # 受保护的路由
├── services/           # 服务
│   ├── diaryService.ts    # 日记数据操作
│   └── imageService.ts    # 图片上传处理
├── store/             # 状态管理
│   ├── authStore.ts    # 认证状态
│   └── themeStore.ts   # 主题状态
├── styles/            # 样式文件
├── App.tsx            # 主应用组件
└── main.tsx           # 入口文件
```

## 使用指南

### 首次使用

1. **注册账户**
   - 点击"注册"输入邮箱和密码
   - 或选择"匿名登录"

2. **编写第一篇日记**
   - 点击"写日记"按钮
   - 选择日期、心情、地点
   - 输入内容并上传图片
   - 点击"保存日记"

3. **查看日记**
   - 在主页"最近的日记"浏览最新日记
   - 点击"查看日记"查看完整列表
   - 可按日期搜索

4. **编辑和删除**
   - 在日记列表中选择日记
   - 点击"编辑"修改内容
   - 点击"删除"移除日记

5. **自定义主题**
   - 进入"设置"页面
   - 选择预设主题或自定义颜色
   - 点击"保存自定义主题"

### 心情表情

支持的心情表情：
- 😊 开心
- 😔 难过
- 😍 迷恋
- 😴 困倦
- 😤 生气
- 🤔 思考
- 😎 酷
- 😘 亲吻

## 主题颜色

### 预设主题

| 主题名称 | 主色 | 副色 | 背景 | 文字 |
|---------|------|------|------|------|
| 玫瑰粉 | #ff6b9d | #c44569 | #ffffff | #333333 |
| 深蓝 | #0066cc | #003d99 | #f0f2f5 | #1a1a1a |
| 夜间模式 | #ff6b9d | #c44569 | #1a1a1a | #e0e0e0 |
| 薄荷绿 | #1abc9c | #16a085 | #f5fffe | #2c3e50 |
| 落日黄 | #f39c12 | #e67e22 | #fef5e7 | #34495e |
| 深紫 | #9b59b6 | #8e44ad | #ecf0f1 | #2c3e50 |

## 图片优化

应用会自动：
- 压缩上传的图片（最大宽/高: 1200px）
- 降低质量到80%以节省存储空间
- 支持JPEG格式优化

## 部署

### 部署到Firebase Hosting

```bash
# 安装Firebase CLI
npm install -g firebase-tools

# 登录Firebase
firebase login

# 初始化项目
firebase init hosting

# 构建项目
npm run build

# 部署
firebase deploy
```

### 部署到其他平台

支持部署到：
- Vercel
- Netlify
- GitHub Pages
- 任何支持静态网站的主机

## 常见问题

### Q: 图片上传失败？
A: 检查Firebase Storage是否已启用，并检查安全规则配置。

### Q: 匿名用户的数据会保存吗？
A: 是的，匿名用户的数据会存储在数据库中，但注册邮箱账户可以获得更好的数据保护。

### Q: 如何导出我的日记？
A: 目前应用不支持直接导出，但可以通过Firebase Console导出数据。

### Q: 数据是否加密？
A: Firebase会自动加密传输中的数据。生产环境建议启用HTTPS。

### Q: 可以多人使用同一账户吗？
A: 可以，但每个用户应该有自己的账户以保证隐私。

## 隐私和安全

- 所有数据都存储在Firebase服务器上
- 使用Firebase身份验证确保只有授权用户可以访问数据
- 数据传输使用HTTPS加密
- 建议启用两因素认证提高账户安全性

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

---

**祝你和伴侣一起写下美好的回忆！** 💑✨
