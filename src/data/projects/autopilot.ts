import type { ProjectInfo } from "./types";

export const autopilot: ProjectInfo = {
  title: "Autopilot",
  href: "https://github.com/MindMidas/autopilot",
  sourceHref: "https://github.com/MindMidas/autopilot",
  description:
    "Began as a solo research project (Rocket.ai) testing whether ML models could automate a trading strategy and match or outperform the original results. Once it did, it raised another question: could any strategy be automated from a few prompts? This led to my latest passion project, Autopilot.",
  technologies: ["Python", "React", "CCXT", "scikit-learn", "Supabase", "AWS"],
  details: [
    { label: "Goal", text: "Build a platform that lets users automate, test, and deploy trading strategies through plain-language conversations with agents." },
    { label: "Why", text: "A few reasons: make strategy testing less gated, save time on setups that keep you glued to the charts, help traders build without coding, and make experiments easier to repeat and compare. Long term, creators can monetize strategies." },
    { label: "Build", text: "Rocket.ai is mostly written in Python and uses Flask, CCXT, pandas, TradingView, and SQLite to fetch candles, generate indicators, simulate strategy trades, train ML models, and test paper/live trading. Autopilot builds on this with prompt-to-code agents, a deterministic language for the indicator and strategy builder, visualizing/integrating/testing, attaching indicators/strategies to datasets, MCP tools for the pipeline, AWS jobs, Supabase, and real-time candles." },
    { label: "Result", text: "The big win so far is a repeatable prompt-to-workflow pipeline that works and that I can keep improving." },
  ],
  image: "/project-media/autopilot-logo.svg",
  imageClassName: "p-8 dark:invert",
  mediaGradient: "#334155",
  logo: "/project-media/autopilot-logo.svg",
  logoClassName: "h-4 max-w-[110px] dark:invert",
};
