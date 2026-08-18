import { Icons } from "@/components/icons";
import { autopilot } from "./autopilot";
import { chezz } from "./chezz";
import { parkd } from "./parkd";
import { cukevision } from "./cukevision";
import { warpfilters } from "./warpfilters";
import { orangepill } from "./orangepill";
import { crackuccino } from "./crackuccino";
import { eightBall } from "./eight-ball";
import { rushhour } from "./rushhour";
import { mancala } from "./mancala";
import { eightPuzzle } from "./eight-puzzle";
import type { ProjectInfo } from "./types";

const projectFiles: readonly ProjectInfo[] = [
  autopilot,
  chezz,
  parkd,
  cukevision,
  warpfilters,
  orangepill,
  crackuccino,
  eightBall,
  rushhour,
  mancala,
  eightPuzzle,
];

export const projects = projectFiles.map((project) => ({
  ...project,
  links: [
    ...(project.sourceHref
      ? [
          {
            type: "Source",
            href: project.sourceHref,
            isPrivate: project.sourcePrivate,
            icon: <Icons.github className="size-3" />,
          },
        ]
      : []),
    ...(project.websiteHref
      ? [
          {
            type: "Website",
            href: project.websiteHref,
            isPrivate: project.websitePrivate,
            icon: <Icons.globe className="size-3" />,
          },
        ]
      : []),
  ],
}));
