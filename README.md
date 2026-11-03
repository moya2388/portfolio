# 墨玡 · 游戏开发作品集

静态网页，无需安装前端依赖，适合 GitHub Pages 免费托管。

## 本地查看

直接打开 `index.html` 即可浏览，项目弹窗和筛选不依赖服务器。

也可在本目录运行 `python -m http.server 8765 --bind 127.0.0.1`，然后访问 `http://127.0.0.1:8765`。

`downloads/` 中保留三个原始 ZIP 的副本，供本地试玩下载；原文件未修改。

## GitHub 免费发布

1. 创建公开仓库，默认分支使用 `main`，将本目录中的网页源文件提交进去，包括 `.github/workflows/pages.yml`。不要提交 `downloads/`、`.preview-game/`、`.qa/`、`notes/` 等本地目录；`.gitignore` 已配置。
2. 在仓库 Releases 中创建一个标签为 **`games`** 的正式 Release，上传 `downloads/` 中三个游戏包，文件名保持不变：
   - `paper-dungeon-windows.zip`
   - `delay-windows.zip`
   - `algee-and-blooms-windows.zip`
3. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
4. 在 Actions 中运行 **Publish portfolio to GitHub Pages**。首次推送早于 Release 创建时，第一次检查可能失败；上传完三个包后重新运行即可。后续推送 `main` 会自动更新网页。
5. 发布成功后，Pages 显示实际网址。项目仓库通常是 `https://用户名.github.io/仓库名/`，用户主页仓库通常是 `https://用户名.github.io/`。

发布流程会自动把本地下载地址替换成当前仓库 `games` Release 的地址，并检查三个游戏包是否存在，避免发布不可用的试玩按钮。网页只上传静态页面和图片，游戏包不进入 Pages 构建。

《纸上地牢》约 102.2 MiB，不能作为普通 Git 文件推送；其余游戏包也统一通过 Releases 分发。网页没有后端、付费依赖或外部字体服务。

## 修改内容

- 首页标题、个人介绍：`index.html`
- 项目介绍、开发要点、画廊、按键：`projects.js`
- 配色、字号和手机排版：`styles.css`
- 图片：`assets/`

联系信息尚未提供，因此网页没有虚构邮箱或社交账号。项目个人职责未确认，采用项目层面的介绍；团队作品没有写成个人独立开发。

## 素材说明

项目图片来自用户已有的游戏资源、宣传封面和开发截图。宣传封面和实际开发画面在页面中分开标注；开发截图可能与下载包中的具体状态略有差别。

图片版权归相应作者/权利人，随作品集展示不代表授权他人复用。发布前应按项目真实分工补充个人职责，并确认团队素材可公开展示。本仓库不自动为游戏和素材授予开源许可。
