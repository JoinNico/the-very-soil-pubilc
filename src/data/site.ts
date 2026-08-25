export type ReleasePhase =
  | 'pre_event'
  | 'event'
  | 'online_remainder'
  | 'sold_out';

export interface BookMeta {
  eyebrow: string;
  title: string;
  subtitle: string;
  englishSubtitle: string;
  author: string;
  translator: string;
  format: string;
  pages: number;
  language: string;
  editionYear: number;
  edition: string;
  printing: string;
}

export interface BookPart {
  number: 'I' | 'II' | 'III';
  title: string;
  englishTitle: string;
  chapterCount: number;
  description: string;
  accent: 'pink' | 'violet' | 'red';
}

export interface ReleaseInfo {
  phase: ReleasePhase;
  event: {
    name: string;
    dateLabel: string;
    startDate: string;
    endDate: string;
    venue: string;
    city: string;
    officialUrl: string;
  };
  booth: string;
  price: string;
  interestFormUrl: string;
  onlineSaleUrl: string;
  notice: string;
}

const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL?.trim();

export const book: BookMeta = {
  eyebrow: 'THE VERY SOIL',
  title: '绝望即壤',
  subtitle: '《魔法少女小圆》非官方批评研究',
  englishSubtitle:
    'An Unauthorized Critical Study of Puella Magi Madoka Magica',
  author: 'Jen A. Blue',
  translator: 'JoinNico',
  format: 'ISO B6 · 125 × 176 mm',
  pages: 144,
  language: 'Chinese Edition',
  editionYear: 2026,
  edition: '2026 年 8 月第一版',
  printing: '2026 年 9 月第一次印刷',
};

export const parts: BookPart[] = [
  {
    number: 'I',
    title: '电视动画',
    englishTitle: 'TV ANIME',
    chapterCount: 12,
    description:
      '循十二集逐章重访愿望、契约与代价，辨认希望如何在同一套秩序中生成绝望。',
    accent: 'pink',
  },
  {
    number: 'II',
    title: '外传漫画',
    englishTitle: 'MANGA',
    chapterCount: 3,
    description:
      '从《和美》《织莉子》与 The Different Story，观察魔法少女体制在异写中的裂隙。',
    accent: 'violet',
  },
  {
    number: 'III',
    title: '叛逆的物语',
    englishTitle: 'REBELLION',
    chapterCount: 7,
    description:
      '以七种“反抗”为路径，追问爱、救赎、神明、丘比，以及焰自身所构成的悖论。',
    accent: 'red',
  },
];

export const release: ReleaseInfo = {
  phase: 'pre_event',
  event: {
    name: 'ComicQuest 5.0',
    dateLabel: '2026.10.05 — 10.06',
    startDate: '2026-10-05',
    endDate: '2026-10-06',
    venue: '上海世博展览馆',
    city: '上海 · 浦东新区',
    officialUrl:
      'https://www.comicquest.cn/activity/6a625828e6f8ea2754db146d',
  },
  booth: '待公布',
  price: '待公布',
  interestFormUrl: '',
  onlineSaleUrl: '',
  notice:
    '意向登记仅用于估算印量，不构成预订或留货；展后线上销售以实际余量为准。',
};

export const links = {
  samplePdf: '/downloads/the-very-soil-sample.pdf',
};

export const seo = {
  siteUrl: configuredSiteUrl
    ? configuredSiteUrl.replace(/\/$/, '')
    : undefined,
  title: '绝望即壤｜《魔法少女小圆》非官方批评研究',
  description:
    'Jen A. Blue《The Very Soil》中文译本展示站：从炼金术、后现代批评、佛学与女性主义重读《魔法少女小圆》。',
  image: '/brand/og-image.png',
};
