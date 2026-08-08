import type { ProjectInfo } from "./types";

export const chezz: ProjectInfo = {
  title: "Chezz",
  href: "https://github.com/MindMidas/games/tree/main/src/chezz",
  sourceHref: "https://github.com/MindMidas/games/tree/main/src/chezz",
  description:
    "My submission for a university competition requiring students to build an engine in Python "
      + "was the beginning of Chezz. From Python, I rewrote it in C and switched the algorithm to "
      + "alpha-beta Negamax to make it run faster. Chezz is a chess-variant with new pieces; this "
      + "required custom optimal move generation and heuristics.",
  technologies: ["C", "Python", "TypeScript", "Supabase", "Negamax"],
  details: [
    {
      label: "Goal",
      text:
        "Build a chess engine in C using alpha-beta Negamax for search and custom heuristics for "
          + "move scoring.",
    },
    {
      label: "Why",
      text:
        "I enjoy playing chess and wanted to overcome the obstacles that new chess pieces brought "
          + "while challenging myself by doing it in C. Regular chess engines already exist, but "
          + "adding new pieces introduced move generation and heuristics complexity. I also wanted "
          + "to speed up the original Python version by rewriting the core in C, using bitboards and "
          + "bitwise operations to search deeper and evaluate faster.",
    },
    {
      label: "Build",
      text:
        "C engine with piece bitboards (uint64_t values where each bit represents one board "
          + "square), bitwise move/board generation, alpha-beta Negamax, Zobrist hashing, a "
          + "transposition table, magic attacks, precomputed non-sliding move tables, and heuristics "
          + "for material, mobility, attack/defence coordination, and safety.",
    },
    {
      label: "Result",
      text:
        "Chezz became smarter and ~30x faster than the Python version because the engine "
          + "searches deeper using tuned heuristics. It still has room to improve, but I'm proud of "
          + "what I built. I also turned it into a server-backed online game where you can play "
          + "against the engine or against other players.",
    },
  ],
  image: "/project-media/chezz.gif",
  imageClassName: "p-0 rounded-[4px]",
  mediaGradient: "#e8d9a8",
};
