import type { ProjectInfo } from "./types";

export const cukevision: ProjectInfo = {
  title: "CukeVision",
  href: "https://github.com/MindMidas/cukevision",
  hrefPrivate: true,
  sourceHref: "https://github.com/MindMidas/cukevision",
  sourcePrivate: true,
  description:
    "CukeVision started as a group project on low-cost food inspection comparing NN, HF MobileNetV2, "
      + "and ResNet18 on a binary classification problem (Target-Produce vs. Other). The models had "
      + "99% test accuracy, but I identified a generalization gap where the models struggled with "
      + "unseen objects. I improved the dataset, ResNet pipeline, and live inspection app.",
  technologies: ["Python", "OpenCV", "PyTorch", "Hugging Face", "FastAPI", "PySide6"],
  details: [
    {
      label: "Goal",
      text:
        "Build a low-cost inspection system for cucumber/produce sorting: detect belt objects, "
          + "classify target vs. Other, and compare the simple NN, Hugging Face model, and ResNet "
          + "paths before turning the best direction into a live workflow.",
    },
    {
      label: "Why",
      text:
        "Many smaller food suppliers do not have the same automated inspection tools as larger "
        + "processing facilities. Manual sorting is slow and error-prone, while contamination can "
          + "lead to recalls, health risks, and lost trust.",
    },
    {
      label: "Build",
      text:
        "The first version compared a simple neural network, a Hugging Face classifier, and a "
          + "ResNet pipeline. CukeVision evolved into a live system using: (1) RMBG-2.0 and OpenCV "
          + "for object extraction, (2) ResNet18 for classification, (3) FastAPI and WebSockets for "
          + "phone-camera streaming, and (4) PySide6 for the app that includes review, labeling, and "
          + "fine-tuning. Most importantly, I rebuilt the dataset to improve generalization by "
          + "curating the Other-class with hard negatives across shape, material, texture, scale, "
          + "viewpoint, and lookalikes.",
    },
    {
      label: "Result",
      text:
        "The result is a live inspection loop that extracts objects and predicts their class in "
          + "real time. Training on a curated dataset also improved model performance on the Other "
          + "class.",
    },
  ],
  image: "/project-media/cukevision-showcase/live-demo.png",
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#14532d",
  logo: "/project-media/cukevision-lockup-light.png",
  logoDark: "/project-media/cukevision-lockup-dark.png",
  logoClassName: "h-6 max-h-6 max-w-[150px]",
};
