import type { ProjectInfo } from "./types";

export const eightBall: ProjectInfo = {
  title: "8 Ball Pool",
  href: "https://github.com/MindMidas/games/tree/main/src/pool",
  sourceHref: "https://github.com/MindMidas/games/tree/main/src/pool",
  description:
    "A full-stack game around a C physics engine and Python runtime. Similar to my Chezz "
      + "project, it's part of my games platform and supports pass-and-play and online play.",
  technologies: ["C", "Python", "TypeScript", "Supabase"],
  details: [
    {
      label: "Goal",
      text:
        "Build a playable 8-ball game where the physics is handled in C, the shots are "
          + "replayable, and players can play locally or online through the shared Games platform.",
    },
    {
      label: "Why",
      text:
        "A good way to show that I can work across the full stack: low-level simulation, Python "
          + "runtime code, browser UI, and multiplayer state.",
    },
    {
      label: "Build",
      text:
        "C physics engine for rolling balls, drag, cushions, pockets, and collision response. "
          + "SWIG exposes the engine to Python, where each shot repeatedly calls the segment loop, "
          + "samples table states, tracks sunk balls, applies 8-ball rules, and sends replay data to "
          + "the TypeScript frontend. Online PvP uses the shared platform routes for lobby, "
          + "matchmaking, chat, replay, surrender, draw, rematch, and Supabase-backed sessions.",
    },
    {
      label: "Result",
      text:
        "The result is a playable pool game with native C simulation behind a browser replay. The "
        + "most challenging part was the self-iterating shot loop: every shot has to keep advancing "
          + "objects, checking collisions, handling events, and producing frames as the balls move "
          + "across the table and the shot is complete. An improvement to this project would be "
          + "adding physics logic to handle ball spinning.",
    },
  ],
  image: "/project-media/8-ball.gif",
  imageClassName: "p-0 rounded-[4px]",
  mediaGradient: "#047857",
};
