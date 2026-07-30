import type { ProjectInfo } from "./types";

export const mancala: ProjectInfo = {
  title: "Mancala",
  href: "https://github.com/MindMidas/mancala",
  sourceHref: "https://github.com/MindMidas/mancala",
  description:
    "A Java terminal Mancala game I built to showcase object-oriented programming. Mancala is an old sowing/counting strategy game, and this version supports two rule sets: Kalah and Ayo.",
  technologies: ["Java", "Gradle"],
  details: [
    { label: "Goal", text: "Build a complete two-player Mancala game in Java while keeping the code object-oriented and easy to extend." },
    { label: "Why", text: "I wanted a project that showed my Java fundamentals. Mancala looks simple, but the move logic gets interesting once you handle stores, captures, bonus turns, invalid moves, and different rule sets." },
    { label: "Build", text: "Terminal UI with Java classes for players, pits, stores, board data, saving/loading, rules, and exceptions. Kalah and Ayo are implemented as separate rule paths, with unit tests around captures, bonus turns, end-game cleanup, and edge cases." },
    { label: "Result", text: "The result is a simple working Java game and showcase, with enough structure to show how I think about classes, state, and rules." },
  ],
  image: "/project-media/mancala.gif",
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#2f2f2f",
};
