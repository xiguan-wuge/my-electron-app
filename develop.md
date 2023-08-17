# 开发记录

- 安装electron时卡住  
  设置electron镜像：pnpm config set electron_mirror "https://npmmirror.com/mirrors/electron/"

- 配置start命令时，`electron` 少了个` .`, 导致打开的页面不是index.html

- pnpm 安装依赖后， npx electron-forge import 报错，xxx包 未安装，网上搜索后，采用npm安装依赖 [解决方案](https://blog.csdn.net/includei/article/details/112623234)

- macOS 添加代码签名报错 `Error: notarytool is not available, you must be on at least Xcode 13`

- 打包和部署
  不同机器（macOS | windows ） 只等打包出对应平台的app, 若需要打包不同平台的app,需要借助github action 或者 自行部署的 一个更新服务器并配置自动 autoUpdater 模块
- 需要进一步了解效率进程

- 是否改成pnpm包管理工具，参照[如何使用pnpm打包electron项目](https://juejin.cn/post/7118630303173705759#comment)

## Electron的优缺点
### 优点

- 原生的接口（菜单、消息提醒、系统托盘等）。
- 上手难度低，能够使用react、vue等前端框架，能方便地迁移前端组件，构建出漂亮的桌面应用。
- 方便热更新
- 调试和测试方便
- Electron使用node.js。因此，您可以导入Chrome应用程序中不容易使用的许多模块
- Electron文档要好得多

### 缺点

- 不适合开发轻量级的应用。即使一个electron的项目框架，也包含chromium内核。
- 相比c++开发的桌面应用，性能远远不如后者。
- 启动速度慢。
- 每个窗口都是一个新的进程，占据大量内存。
