import { cn } from "@/lib/utils";
import { Database, Hammer, Search, Zap, type LucideIcon } from "lucide-react";

type BrandIconInfo =
  | {
      kind: "image";
      src: string;
      alt: string;
      background?: string;
      imageClassName?: string;
      hideLabel?: boolean;
      badgeClassName?: string;
    }
  | {
      kind: "symbol";
      icon: LucideIcon;
      color: string;
    };

const tileClassName =
  "flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] ring-1 ring-border/40";

const brandIcons: Record<string, BrandIconInfo> = {
  "A* / BFS / DFS": { kind: "symbol", icon: Search, color: "#2563eb" },
  "AWS": {
    kind: "image",
    src: "/brand-icons/aws-logo-rgb.png",
    alt: "AWS logo",
    background: "#ffffff",
    imageClassName: "h-[78%] w-[88%] object-contain",
    hideLabel: true,
    badgeClassName: "h-3.5 w-7",
  },
  "BFS / DFS": { kind: "symbol", icon: Search, color: "#2563eb" },
  "C": {
    kind: "image",
    src: "/brand-icons/c-logo.svg",
    alt: "C logo",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "C++": {
    kind: "image",
    src: "/brand-icons/cpp-logo.svg",
    alt: "C++ logo",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "CCXT": {
    kind: "image",
    src: "/brand-icons/ccxt-logo.png",
    alt: "CCXT logo",
    background: "#111827",
    imageClassName: "h-[82%] w-[82%] object-contain",
  },
  "Docker": {
    kind: "image",
    src: "/brand-icons/docker-mark.svg",
    alt: "Docker logo",
    imageClassName: "h-[82%] w-[82%] object-contain",
  },
  "FastAPI": {
    kind: "image",
    src: "/brand-icons/fastapi-icon.svg",
    alt: "FastAPI logo",
    background: "#009688",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "Flutter": {
    kind: "image",
    src: "/brand-icons/flutter-logomark.svg",
    alt: "Flutter logo",
    imageClassName: "h-[92%] w-[92%] object-contain",
  },
  "Gradle": {
    kind: "image",
    src: "/brand-icons/gradle-logo.png",
    alt: "Gradle logo",
    imageClassName: "h-full w-full object-cover",
  },
  "Hugging Face": {
    kind: "image",
    src: "/brand-icons/huggingface-logo.svg",
    alt: "Hugging Face logo",
    background: "#32343D",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "Java": {
    kind: "image",
    src: "/brand-icons/openjdk-logo.svg",
    alt: "OpenJDK logo",
    background: "#ffffff",
    imageClassName: "h-[72%] w-[88%] object-contain",
  },
  "JavaScript": {
    kind: "image",
    src: "/brand-icons/javascript-logo.svg",
    alt: "JavaScript logo",
    imageClassName: "h-full w-full object-contain",
  },
  "Lightning Network": {
    kind: "symbol",
    icon: Zap,
    color: "#f59e0b",
  },
  "Makefile": {
    kind: "symbol",
    icon: Hammer,
    color: "#6d00cc",
  },
  "Mapbox": {
    kind: "image",
    src: "/brand-icons/mapbox-logo.svg",
    alt: "Mapbox logo",
    background: "#ffffff",
    imageClassName: "h-[64%] w-[90%] object-contain",
    hideLabel: true,
    badgeClassName: "h-3.5 w-12",
  },
  "NVIDIA Warp": {
    kind: "image",
    src: "/brand-icons/nvidia-logo.svg",
    alt: "NVIDIA logo",
    imageClassName: "h-[82%] w-[82%] object-contain",
  },
  "Negamax": { kind: "symbol", icon: Search, color: "#2563eb" },
  "Node.js": {
    kind: "image",
    src: "/brand-icons/nodejs-hex.svg",
    alt: "Node.js logo",
    imageClassName: "h-[86%] w-[86%] object-contain",
  },
  "Nostr": {
    kind: "image",
    src: "/brand-icons/nostr-head.svg",
    alt: "Nostr community icon",
    background: "#8A2BE2",
    imageClassName: "h-[82%] w-[82%] object-contain",
  },
  "NumPy": {
    kind: "image",
    src: "/brand-icons/numpy-logomark.svg",
    alt: "NumPy logo",
    background: "#ffffff",
    imageClassName: "h-[82%] w-[82%] object-contain",
  },
  "Open MPI": {
    kind: "image",
    src: "/brand-icons/openmpi-logo.png",
    alt: "Open MPI logo",
    background: "#ffffff",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "OpenCV": {
    kind: "image",
    src: "/brand-icons/opencv-logo.svg",
    alt: "OpenCV logo",
    imageClassName: "h-[86%] w-[86%] object-contain",
  },
  "PostgreSQL": {
    kind: "image",
    src: "/brand-icons/postgresql-logo.svg",
    alt: "PostgreSQL logo",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "PySide6": {
    kind: "image",
    src: "/brand-icons/qt-logo.png",
    alt: "Qt logo",
    imageClassName: "h-full w-full object-cover",
  },
  "PyTorch": {
    kind: "image",
    src: "/brand-icons/pytorch-logo.png",
    alt: "PyTorch logo",
    background: "#ffffff",
    imageClassName: "h-full w-full scale-[1.72] object-cover",
  },
  "Python": {
    kind: "image",
    src: "/brand-icons/python-logo.svg",
    alt: "Python logo",
    imageClassName: "h-[92%] w-[92%] object-contain",
  },
  "Go": {
    kind: "image",
    src: "/brand-icons/go-logo.svg",
    alt: "Go logo",
    imageClassName: "h-[70%] w-[92%] object-contain",
  },
  "Racket": {
    kind: "image",
    src: "/brand-icons/racket-logo.svg",
    alt: "Racket logo",
    imageClassName: "h-[88%] w-[88%] object-contain",
  },
  "React": {
    kind: "image",
    src: "/brand-icons/react-logo.svg",
    alt: "React logo",
    imageClassName: "h-[92%] w-[92%] object-contain",
  },
  "scikit-learn": {
    kind: "image",
    src: "/brand-icons/scikit-learn-logo.svg",
    alt: "scikit-learn logo",
    background: "#ffffff",
    imageClassName: "h-[78%] w-[92%] object-contain",
    hideLabel: true,
    badgeClassName: "h-3.5 w-14",
  },
  "Stripe": {
    kind: "image",
    src: "/brand-icons/stripe-wordmark.svg",
    alt: "Stripe logo",
    imageClassName: "h-[68%] w-[92%] object-contain",
    hideLabel: true,
    badgeClassName: "h-3.5 w-10",
  },
  "SQL": {
    kind: "symbol",
    icon: Database,
    color: "#60a5fa",
  },
  "Supabase": {
    kind: "image",
    src: "/brand-icons/supabase-logo.svg",
    alt: "Supabase logo",
    imageClassName: "h-[84%] w-[84%] object-contain",
  },
  "TypeScript": {
    kind: "image",
    src: "/brand-icons/typescript-logo.svg",
    alt: "TypeScript logo",
    imageClassName: "h-full w-full object-contain",
  },
};

export function brandIconHidesLabel(name: string) {
  const iconInfo = brandIcons[name];
  return iconInfo?.kind === "image" && iconInfo.hideLabel;
}

export function brandIconBadgeClassName(name: string) {
  const iconInfo = brandIcons[name];

  if (iconInfo?.kind === "image" && iconInfo.badgeClassName) {
    return iconInfo.badgeClassName;
  }

  return brandIconHidesLabel(name) ? "h-3.5 w-9" : "size-3.5";
}

export function BrandIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const iconInfo = brandIcons[name];

  if (!iconInfo) {
    return null;
  }

  if (iconInfo.kind === "symbol") {
    const Icon = iconInfo.icon;

    return (
      <Icon
        className={cn("shrink-0 stroke-[2.25]", className)}
        color={iconInfo.color}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={cn(tileClassName, className)}
      style={{ backgroundColor: iconInfo.background ?? "transparent" }}
      aria-hidden
    >
      <img
        src={iconInfo.src}
        alt={iconInfo.alt}
        className={iconInfo.imageClassName ?? "h-[82%] w-[82%] object-contain"}
      />
    </span>
  );
}
