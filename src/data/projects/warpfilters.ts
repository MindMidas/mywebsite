import type { ProjectInfo } from "./types";

export const warpfilters: ProjectInfo = {
  title: "WarpFilters",
  href: "https://github.com/MindMidas/warpfilters",
  sourceHref: "https://github.com/MindMidas/warpfilters",
  description:
    "I built this program to gain experience with NVIDIA Warp, NumPy, and pixel-level image "
      + "filtering. The program can denoise and/or sharpen grayscale/RGB images using custom Warp "
      + "kernels, with image I/O handled by Pillow and data passed through NumPy arrays.",
  technologies: ["Python", "NVIDIA Warp", "NumPy"],
  details: [
    {
      label: "Goal",
      text:
        "Build a CLI-facing image-filtering program while learning how to process images as NumPy "
          + "arrays and run pixel-level filters with NVIDIA Warp kernels.",
    },
    {
      label: "Why",
      text:
        "I wanted to build a stronger understanding of image processing at the kernel level and "
          + "work with a performance-focused computing framework with structured parallel execution.",
    },
    {
      label: "Build",
      text:
        "Python CLI with Pillow/NumPy image I/O, contiguous float32 buffers, custom Warp kernels "
          + "for Gaussian blur and unsharp masking, one thread per pixel, per-channel processing, "
          + "reflected indexing at borders, CPU/CUDA device selection, and tests around images and "
          + "edge cases.",
    },
    {
      label: "Result",
      text:
        "The result is a complete tool that denoises and/or sharpens an image. It gave me a GPU "
          + "way of thinking that I can use for larger vision projects.",
    },
  ],
  image: "/project-media/warpfilters-showcase.png",
  imageClassName: "p-1 sm:p-2",
  inspectClassName: "project-warpfilters-inspect",
  mediaGradient: "#0b0f14",
};
