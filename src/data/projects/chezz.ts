import type { ProjectInfo } from "./types";

export const chezz: ProjectInfo = {
  title: "Chezz",
  href: "https://github.com/MindMidas/games/tree/main/src/chezz",
  sourceHref: "https://github.com/MindMidas/games/tree/main/src/chezz",
  description:
    "Originally built in Python for a university AI course competition, then I rewrote the engine in C because I wanted it to be faster. Chezz is a chess variant with new pieces, so I had to build search, move generation, and evaluation around rules normal chess engines do not cover.",
  technologies: ["C", "Python", "TypeScript", "Supabase", "Negamax"],
  details: [
    { label: "Goal", text: "Build a chess engine in C using Negamax for search and custom heuristics for move scoring." },
    { label: "Why", text: "I enjoy playing chess and wanted a challenge to build something from the ground up. Moreover, regular chess engines already exist, but this variant made the problem interesting. I also wanted to speed up the original Python version by rewriting the core in C, using bitboards and bitwise operations to generate boards and search faster." },
    { label: "Build", text: "C engine with 18 piece bitboards (uint64_t values where each bit represents one board square), bitwise move/board generation, alpha-beta Negamax, Zobrist hashing, a transposition table, magic bitboards for sliding-piece attacks, precomputed non-sliding move tables, and heuristics for material, mobility, king safety, and piece safety." },
    { label: "Result", text: "Incredibly faster than the Python version and smarter because the engine searches deeper using tuned heuristics. It still has room to improve, but I'm proud of what I built. I also turned it into a server-backed online game where you can play against the engine or against other players." },
  ],
  image: "/project-media/chezz.gif",
  imageClassName: "p-0 rounded-[4px]",
  mediaGradient: "#e8d9a8",
};
