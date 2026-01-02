# Firebase 配置检查清单

完成以下步骤以部署情侣日记应用。

## ✅ 第一步：创建Firebase项目

- [ ] 访问 https://console.firebase.google.com
- [ ] 登录Google账户
- [ ] 点击 "新建项目"
- [ ] 项目名称：`couples-diary`
- [ ] 选择服务条款，点击 "创建项目"
- [ ] 等待项目创建完成

## ✅ 第二步：启用Realtime Database

- [ ] 在左侧菜单中找到 "构建" → "Realtime Database"
- [ ] 点击 "创建数据库"
- [ ] 选择最靠近你的位置（或选择美国）
- [ ] **选择"以测试模式启动"**（稍后改为安全规则）
- [ ] 点击 "启用"

## ✅ 第三步：启用Authentication

- [ ] 在左侧菜单中找到 "构建" → "Authentication"
- [ ] 点击 "开始"
- [ ] 找到 "Email/Password" 登录方式
  - [ ] 点击 "Email/Password"
  - [ ] 启用 "Email/Password"
  - [ ] 点击 "保存"
- [ ] 找到 "Anonymous" 登录方式
  - [ ] 点击 "Anonymous"
  - [ ] 启用 "Anonymous"
  - [ ] 点击 "保存"

## ✅ 第四步：启用Cloud Storage

- [ ] 在左侧菜单中找到 "构建" → "Storage"
- [ ] 点击 "开始"
- [ ] 选择地理位置（与Database相同最好）
- [ ] 默认安全规则，点击 "完成"
- [ ] 进入 "规则" 选项卡

将规则替换为：
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

- [ ] 点击 "发布"

## ✅ 第五步：配置Realtime Database安全规则

- [ ] 进入你的Realtime Database
- [ ] 点击 "规则" 选项卡
- [ ] 将所有内容替换为：

```json
{
  "rules": {
    "diaries": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "$entryId": {
          ".validate": "newData.hasChildren(['date', 'content', 'images', 'createdAt', 'updatedAt'])"
        }
      }
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

- [ ] 点击 "发布"

## ✅ 第六步：获取Firebase配置

- [ ] 点击项目设置（⚙️ 图标）
- [ ] 选择 "项目设置" 选项卡
- [ ] 滚动到 "您的应用" 部分
- [ ] 如果没有应用，点击 "</>" 创建Web应用
- [ ] 复制整个firebase配置对象

配置看起来像这样：
```javascript
{
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
}
```

## ✅ 第七步：配置本地环境

在项目根目录 (`c:\Users\User\memory_album\`) 创建 `.env.local` 文件：

```
VITE_FIREBASE_API_KEY=粘贴apiKey值
VITE_FIREBASE_AUTH_DOMAIN=粘贴authDomain值
VITE_FIREBASE_DATABASE_URL=粘贴databaseURL值
VITE_FIREBASE_PROJECT_ID=粘贴projectId值
VITE_FIREBASE_STORAGE_BUCKET=粘贴storageBucket值
VITE_FIREBASE_MESSAGING_SENDER_ID=粘贴messagingSenderId值
VITE_FIREBASE_APP_ID=粘贴appId值
```

示例（使用你的实际值）：
```
VITE_FIREBASE_API_KEY=AIzaSyCxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=couples-diary-12345.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://couples-diary-12345.firebaseio.com
VITE_FIREBASE_PROJECT_ID=couples-diary-12345
VITE_FIREBASE_STORAGE_BUCKET=couples-diary-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

## ✅ 第八步：测试本地应用

```bash
# 进入项目目录
cd c:\Users\User\memory_album

# 启动开发服务器
npm run dev
```

- [ ] 打开浏览器访问 http://localhost:5173
- [ ] 点击 "匿名登录"
- [ ] 写第一篇日记（测试）
- [ ] 检查日记是否保存
- [ ] 上传图片测试
- [ ] 编辑日记测试
- [ ] 删除日记测试
- [ ] 测试主题颜色

## ✅ 第九步：准备部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

- [ ] 验证构建成功（无错误）
- [ ] 检查dist文件夹是否生成
- [ ] 本地预览应用是否正常

## ✅ 第十步：选择部署平台并部署

### 选项A：Firebase Hosting（推荐）

```bash
# 全局安装Firebase CLI
npm install -g firebase-tools

# 登录你的Firebase账户
firebase login

# 初始化项目
firebase init hosting
# 选择已创建的项目（couples-diary）
# public目录：dist
# 单页应用：选择 Yes

# 部署
firebase deploy
```

- [ ] 部署完成
- [ ] 访问提供的URL测试应用
- [ ] 邀请伴侣开始使用

### 选项B：Vercel

```bash
npm i -g vercel
vercel
# 按照提示完成部署
```

### 选项C：Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
# 按照提示完成部署
```

## ✅ 部署后检查

- [ ] 打开部署的应用URL
- [ ] 测试注册功能
- [ ] 测试匿名登录
- [ ] 写新日记
- [ ] 上传图片
- [ ] 验证图片保存
- [ ] 编辑日记
- [ ] 删除日记
- [ ] 改变主题
- [ ] 深色模式测试
- [ ] 在不同设备上测试（手机、平板）
- [ ] 测试浏览器兼容性

## ✅ 优化和监控

- [ ] 在Firebase Console检查数据库使用量
- [ ] 在Firebase Console检查Storage使用量
- [ ] 设置Firebase监控警报
- [ ] 定期备份数据

## ✅ 邀请伴侣

- [ ] 复制应用URL
- [ ] 发送给伴侣
- [ ] 共同注册账户
- [ ] 开始记录美好回忆！

## 🆘 故障排除

### 问题：网页无法加载
**解决：**
1. 检查网络连接
2. 检查浏览器控制台错误
3. 清除浏览器缓存
4. 尝试另一个浏览器

### 问题：无法登录
**解决：**
1. 检查Firebase Authentication是否启用
2. 检查邮箱格式是否正确
3. 检查密码是否正确
4. 查看浏览器控制台错误

### 问题：图片上传失败
**解决：**
1. 检查Firebase Storage是否启用
2. 检查Storage安全规则
3. 检查文件大小（Firebase限制）
4. 检查网络连接

### 问题：日记无法保存
**解决：**
1. 检查Realtime Database是否启用
2. 检查Database安全规则
3. 检查网络连接
4. 查看浏览器控制台错误

### 问题：主题未保存
**解决：**
1. 检查浏览器localStorage是否启用
2. 检查Database中users节点的规则
3. 刷新页面测试

## 📞 获取帮助

- 查看项目README.md文档
- 查看QUICKSTART.md指南
- 检查Firebase官方文档
- 查看代码注释

---

## 🎉 完成！

所有步骤完成后，你就有了一个完整可用的情侣日记应用！

**开心地使用吧！** 💑✨

---

**最后一步提醒：**
- ✅ 保存.env.local文件（不要提交到git）
- ✅ 告诉伴侣登录方式
- ✅ 分享应用URL
- ✅ 开始记录故事！
