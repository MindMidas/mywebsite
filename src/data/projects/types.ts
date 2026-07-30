export type ProjectDetail = {
  label: string;
  text: string;
};

export type ProjectInfo = {
  title: string;
  href: string;
  sourceHref?: string;
  websiteHref?: string;
  description: string;
  technologies: readonly string[];
  details: readonly ProjectDetail[];
  image?: string;
  images?: readonly string[];
  imageClassName?: string;
  mediaGradient?: string;
  inspectClassName?: string;
  codeSnippet?: string;
  logo?: string;
  logoDark?: string;
  logoClassName?: string;
  logoShowName?: boolean;
};
