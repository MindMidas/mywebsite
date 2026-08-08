import type { ProjectInfo } from "./types";

export const eightPuzzle: ProjectInfo = {
  title: "8 Puzzle.exe",
  href: "https://github.com/MindMidas/8puzzle.exe",
  sourceHref: "https://github.com/MindMidas/8puzzle.exe",
  description:
    "A Windows 98-style interface (using 98.css) with playable boards, challenge levels, "
      + "solver output, and move replay. It also has BFS/DFS solvers for practice runs and "
      + "viewing paths.",
  technologies: ["Python", "React", "TypeScript", "BFS / DFS"],
  details: [
    {
      label: "Goal",
      text:
        "Build a playful 8-puzzle game where users can challenge themselves by solving boards, "
          + "earning badges, running BFS/DFS, and viewing the solution path.",
    },
    {
      label: "Why",
      text:
        "I wanted to build a puzzle with increasing levels of difficulty. The retro 98.css style "
          + "made it fun to use and gave the app a cool personality.",
    },
    {
      label: "Build",
      text:
        "React/TypeScript frontend with 98.css styling, practice mode, fixed challenge levels, "
          + "browser-stored progress, and move replay. Python handles the BFS/DFS solver, solvable "
          + "board generation, CLI runs, and a small JSON API for the web UI.",
    },
    {
      label: "Result",
      text:
        "A simple and fun game that works and makes BFS and DFS easy to compare. You can play a "
          + "board, ask the solver for a path, and watch each state move instead of only seeing the "
          + "final answer.",
    },
  ],
  image: "/project-media/8-puzzle.gif",
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#1d4ed8",
  logo: "/project-media/8-puzzle-logo.png",
  logoClassName: "h-4 max-w-[140px]",
};
