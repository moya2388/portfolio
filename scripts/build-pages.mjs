import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const repository = process.env.GITHUB_REPOSITORY;
if (!repository || !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository)) {
  throw new Error('请设置 GITHUB_REPOSITORY=用户名/仓库名；GitHub Actions 会自动提供此值。');
}
const out = path.join(root, '.pages');
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', '.nojekyll']) {
  await cp(path.join(root, file), path.join(out, file));
}
await cp(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });
const projects = await readFile(path.join(root, 'projects.js'), 'utf8');
const downloadBase = `https://github.com/${repository}/releases/download/games/`;
if (!projects.includes("downloadBase: './downloads/'")) throw new Error('未找到下载地址配置，停止发布以避免错误链接。');
await writeFile(path.join(out, 'projects.js'), projects.replace("downloadBase: './downloads/'", `downloadBase: '${downloadBase}'`));
console.log('静态网页已生成：.pages/；游戏包下载地址使用当前仓库的 games Release。');
