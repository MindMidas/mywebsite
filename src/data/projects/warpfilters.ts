import type { ProjectInfo } from "./types";

export const warpfilters: ProjectInfo = {
  title: "WarpFilters",
  href: "https://github.com/MindMidas/warpfilters",
  sourceHref: "https://github.com/MindMidas/warpfilters",
  description:
    "I built WarpFilters to get experience with NVIDIA Warp, NumPy, and pixel-level image filtering. It denoises or sharpens grayscale/RGB images using custom Warp kernels, CPU/CUDA selection, and visual outputs I could inspect.",
  technologies: ["Python", "NVIDIA Warp", "NumPy"],
  details: [
    { label: "Goal", text: "Build a simple image-filtering CLI while learning how Warp kernels, NumPy buffers, and pixel-wise parallel work fit together." },
    { label: "Why", text: "I wanted to build a stronger understanding of image processing at the kernel level: how each pixel is read, how borders are handled, and how RGB/grayscale data moves through the pipeline." },
    { label: "Build", text: "Python CLI with Pillow/NumPy image I/O, contiguous float32 buffers, custom Warp kernels for Gaussian blur and unsharp masking, one thread per pixel, per-channel processing, reflected indexing at borders, CPU/CUDA device selection, and tests around images and edge cases." },
    { label: "Result", text: "The result is a small but complete tool that denoises or sharpens an image from CLI. It gave me a practical feel for Warp, NumPy, and GPU-style thinking that I can take for when I work on larger vision projects." },
  ],
  image: "/project-media/warpfilters-showcase.png",
  imageClassName: "p-1 sm:p-2",
  inspectClassName: "project-warpfilters-inspect",
  mediaGradient: "#0b0f14",
};
