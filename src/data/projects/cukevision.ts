import type { ProjectInfo } from "./types";

export const cukevision: ProjectInfo = {
  title: "CukeVision",
  href: "https://github.com/MindMidas/cukevision",
  sourceHref: "https://github.com/MindMidas/cukevision",
  description:
    "Started as a group project on low-cost food inspection, classifying target produce versus Other. The models recognized the target well but struggled with unseen objects, so I continued the project independently by improving the dataset, ResNet pipeline, and live inspection app.",
  technologies: ["Python", "OpenCV", "PyTorch", "FastAPI", "PySide6"],
  details: [
    { label: "Goal", text: "Build a lower-cost inspection system for cucumber/produce sorting: detect belt objects, classify target vs non-target, and compare the simple NN, Hugging Face model, and ResNet paths before turning the best direction into a live workflow." },
    { label: "Why", text: "Many smaller food suppliers do not have the same automated inspection tools as larger processing facilities. Manual sorting is slow and error-prone, while contamination can lead to recalls, health risks, and lost trust. A simple software system gives them a more realistic way to prove quality control and meet stricter standards." },
    { label: "Build", text: "The first version compared a simple neural network, a Hugging Face classifier, and a ResNet pipeline. CukeVision evolved that into a live system using OpenCV for object extraction, ResNet18 for classification, FastAPI and WebSockets for phone-camera streaming, and PySide6 for review, labeling, and fine-tuning. I also rebuilt the dataset: curated the Other-class around harder variations in shape, material, texture, scale, viewpoint, and lookalikes." },
    { label: "Result", text: "The result is a live inspection loop that extracts objects and predicts their class in real time. Training on a curated dataset also improved model performance on the Other class." },
  ],
  image: "/project-media/cukevision-showcase/live-demo.png",
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#14532d",
  logo: "/project-media/cukevision-lockup-light.png",
  logoDark: "/project-media/cukevision-lockup-dark.png",
  logoClassName: "h-6 max-h-6 max-w-[150px]",
};
