import type { ProjectInfo } from "./types";

export const rushhour: ProjectInfo = {
  title: "Rush Hour",
  href: "https://github.com/MindMidas/rushhour",
  sourceHref: "https://github.com/MindMidas/rushhour",
  description:
    "I built a puzzle editor and solver for the Rush Hour game as a visual way to compare search "
      + "algorithms and heuristics. Users can build boards and run DFS, BFS, or A*.",
  technologies: ["Python", "React", "TypeScript", "A* / BFS / DFS"],
  details: [
    {
      label: "Goal",
      text:
        "Create a simple learning tool for Rush Hour: edit a board, run different solvers, "
          + "compare performance, and view the solution.",
    },
    {
      label: "Why",
      text:
        "Search algorithms are easier to understand when you can see how they solve a problem and "
          + "compare their time complexity. The Rush Hour puzzle made this especially clear because "
          + "the same board can behave very differently depending on the algorithm and heuristic "
          + "being used.",
    },
    {
      label: "Build",
      text:
        "React/TypeScript board editor with cars, trucks, 40 bundled puzzles, solution playback, "
          + "and run history. Python is used for the API and solver code: BFS, DFS, and Best-First/A* "
          + "with three heuristics: distance to exit, blockers, and estimated cost to move blockers.",
    },
    {
      label: "Result",
      text:
        "The result does everything I wanted it to do: build or load a puzzle, run the solvers, "
          + "and view stats.",
    },
  ],
  image: "/project-media/rush-hour.gif",
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#dc2626",
  logo: "/project-media/rush-hour-logo.png",
  logoClassName: "h-4 w-4 rounded bg-white p-px",
  logoShowName: true,
};
