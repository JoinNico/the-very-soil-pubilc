# The Very Soil / 绝望即壤

《绝望即壤——〈魔法少女小圆〉非官方批评研究》中文版展示网站。项目使用 Astro 6 与原生 CSS 构建，页面为纯静态输出。

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

生产域名通过 `PUBLIC_SITE_URL` 提供。部署到 GitHub 项目页等子路径时，还需要通过 `PUBLIC_BASE_PATH` 提供带首尾斜杠的部署路径。未设置站点域名时仍可正常构建，但不会生成 canonical URL 与 sitemap：

```bash
PUBLIC_SITE_URL=https://example.com PUBLIC_BASE_PATH=/repository-name/ npm run build
```

模板中的 `public/` 资源应通过 `src/utils/publicPath.ts` 生成 URL，不要直接写成 `/images/...`、`/brand/...` 或 `/downloads/...`，否则 GitHub 项目页会把请求发到域名根目录。

## 更新试读 PDF

试读本来自相邻的翻译工程，包含屏幕阅读版前 20 个物理页。需要 XeLaTeX、latexmk、Biber 与 MuPDF：

```bash
npm run sync:sample
```

脚本默认读取 `../The-Very-Soil`。也可以显式指定：

```bash
THE_VERY_SOIL_SOURCE=/absolute/path/to/The-Very-Soil npm run sync:sample
```

网站构建本身不依赖 LaTeX；生成的试读文件保存在 `public/downloads/`。

## 权利说明

译文与排版 © 2026 JoinNico，保留所有权利。未经许可，不得复制、转载、改编或用于商业用途。

本书为非官方翻译评论作品，与原作者、出版方及相关权利方无隶属或授权关系。

原著及相关作品的权利归各自权利人所有。