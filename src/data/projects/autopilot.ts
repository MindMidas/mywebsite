import type { ProjectInfo } from "./types";

export const autopilot: ProjectInfo = {
  title: "Autopilot",
  href: "https://github.com/MindMidas/autopilot",
  sourceHref: "https://github.com/MindMidas/autopilot",
  description:
    "What began as a research project (Rocket.ai) in University turned into my passion project. "
      + "I tested whether ML models could automate a trading strategy and match/outperform the "
      + "original results. Once it could, I pondered a new question: could any strategy be automated "
      + "from a few prompts? This led to Autopilot.",
  technologies: ["Python", "React", "CCXT", "scikit-learn", "Hugging Face", "Supabase", "AWS"],
  details: [
    {
      label: "Goal",
      text:
        "Build a platform that lets users automate, test, tune and deploy trading strategies from "
          + "natural-language conversations with agents.",
    },
    {
      label: "Why",
      text:
        "A few reasons: make strategy testing less gated, save time on setups that keep you glued "
          + "to the charts, help traders build without coding, and make experiments easier to repeat "
          + "and compare. Long term, creators can monetize strategies.",
    },
    {
      label: "Build",
      text:
        "Rocket.ai is mostly written in Python and uses Flask, CCXT, pandas, scikit-learn, Hugging "
          + "Face, TradingView, and SQLite to fetch candles, generate indicators, simulate strategy "
          + "trades, train ML models, and test paper/live trading.\n\nAutopilot builds on this with "
          + "prompt-to-code agents, a deterministic indicator/strategy language for the builder, "
          + "agent-facing MCP servers, and AWS Lambda/Step Functions + Vercel for async ingestion "
          + "and live execution.",
    },
    {
      label: "Result",
      text: "The big win so far is a repeatable prompt-to-workflow pipeline that works.",
    },
  ],
  image: "/project-media/autopilot-logo.svg",
  imageClassName: "p-8 dark:invert",
  mediaGradient: "#334155",
  logo: "/project-media/autopilot-logo.svg",
  logoClassName: "h-4 max-w-[110px] dark:invert",
};
