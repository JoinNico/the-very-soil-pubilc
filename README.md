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

## 内容与发售状态

书籍元数据、活动信息、按钮链接与发售阶段集中在 `src/data/site.ts`。`release.phase` 支持以下状态：

- `pre_event`：ComicQuest 首发预告与意向登记；
- `event`：展会现场售卖中；
- `online_remainder`：展后余量线上销售；
- `sold_out`：售罄。

外部问卷和线上销售 URL 尚未提供时，页面会显示不可点击的说明，不会产生空链接。

意向问卷建议收集：昵称、联系方式、购买渠道（10 月 5 日现场 / 10 月 6 日现场 / 展后线上）、预计数量、备注和联系授权。问卷须明确说明：登记不构成预订或留货，线上销售以实际余量为准。

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

## 正式图片替换

目前封面与内页视觉使用主题色和项目母题构成，不包含动画截图或模板图片。正式素材建议：

- 正封面：B6 比例 `125:176`，无透视，至少 `1600×2253px`，推荐 `2000×2816px`，sRGB；
- 实体书跨页照片：横向 3:2，至少 `2400×1600px`，避免反光；
- 可选：合起书本、书脊或纸张细节照片。

首屏的 CSS 立体书只需要正封面；除非以后扩展到大角度或 360°旋转，否则无需封底和书脊平面稿。

## 权利说明

译文与排版 © 2026 JoinNico。保留所有权利；未经许可，不得复制、转载、改编或用于商业用途。

本书为非官方翻译评论作品，与原作者、出版方及相关权利方无隶属或授权关系。原著及相关作品的权利归各自权利人所有。网站代码沿用仓库根目录 `LICENSE` 所列的软件许可；Libertinus 与 Noto 字体遵循随附 SIL Open Font License，MadokaRunes 的使用范围见随附项目使用说明。
