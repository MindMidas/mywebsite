import type { ProjectInfo } from "./types";

export const crackuccino: ProjectInfo = {
  title: "Crackuccino",
  href: "https://github.com/MindMidas/crackuccino",
  sourceHref: "https://github.com/MindMidas/crackuccino",
  description:
    "A parallel cipher tool that improved my understanding of MPI and its applications. The "
      + "cipher itself is simple: encrypt text and brute-force unknown mappings. The interesting "
      + "part was turning the brute-force into parallel work that could be split, timed, tracked, "
      + "and compared across ranks.",
  technologies: ["C", "Open MPI", "Makefile"],
  details: [
    {
      label: "Goal",
      text:
        "Use a substitution-cipher brute-force problem to understand MPI: split permutation work "
          + "across ranks, compare serial vs parallel search, and make the run easy to inspect.",
    },
    {
      label: "Why",
      text:
        "I wanted a problem where the calculation was obvious, but the coordination was hard. As "
          + "the number of unique letters increases, the search space grows factorially, so I had to "
          + "work through broadcasts, reductions, uneven work, progress output, and debugging "
          + "multiple processes.",
    },
    {
      label: "Build",
      text:
        "Four C executables: encrypt, decrypt-key, decrypt-serial, and decrypt-mpi. It uses "
          + "Fisher-Yates shuffling and key-based encryption, recursive permutation search over "
          + "unique ciphertext letters, a custom hash dictionary for word validation, hit buffering, "
          + "timing/stats, MPI broadcast/reduce/gatherv, auto prefix-depth task splitting, a live "
          + "rank progress table, Makefile, and some unit tests.",
    },
    {
      label: "Result",
      text:
        "I decided to showcase it because it captures what I learned from MPI. It isn't only "
          + "about making a brute-force calculation faster; it shows how parallel programs "
          + "coordinate, collect results, report progress, and stay debuggable.",
    },
  ],
  codeSnippet: "mpirun -np 4 ./decrypt-mpi ... --stats",
  imageClassName: "p-8",
  mediaGradient: "#facc15",
  logo: "/project-media/crackuccino.png",
  logoClassName: "h-4 w-4 -translate-y-px",
  logoShowName: true,
};
