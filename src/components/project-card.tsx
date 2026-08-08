/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

const PROJECT_SLIDESHOW_INTERVAL_MS = 5000;
const PROJECT_SLIDESHOW_TRANSITION_MS = 900;
const PROJECT_INSPECT_SLIDESHOW_INTERVAL_MS = 10500;
const PROJECT_INSPECT_SLIDESHOW_SETTLE_MS = 900;

const DEFAULT_PROJECT_MEDIA_GRADIENT =
  "#0ea5e9";
const projectMediaBackdrop =
  "relative flex h-52 w-full items-center justify-center overflow-hidden bg-slate-900 sm:aspect-[16/10] sm:h-auto";
const projectMediaGlow =
  "pointer-events-none absolute inset-0 bg-transparent";
const projectMediaAsset =
  "relative z-10 h-full w-full rounded-xl object-contain p-2 drop-shadow-[0_0_20px_rgba(0,0,0,0.42)]";
const projectGifMediaAsset =
  "relative z-10 block max-h-[calc(100%-0.75rem)] max-w-[calc(100%-0.75rem)] rounded-xl object-contain p-0 drop-shadow-[0_0_20px_rgba(0,0,0,0.42)]";
const projectSlideshowAsset =
  "h-full w-full shrink-0 rounded-xl object-contain p-2 drop-shadow-[0_0_20px_rgba(0,0,0,0.42)]";
const stillImagePattern = /\.(png|jpe?g|avif)(?:[?#].*)?$/i;
const gifImagePattern = /\.gif(?:[?#].*)?$/i;

function ProjectMediaFrame({
  children,
  mediaGradient,
  className,
  style,
  ...props
}: {
  children: React.ReactNode;
  mediaGradient?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(projectMediaBackdrop, className)}
      style={{
        ...style,
        background: mediaGradient ?? DEFAULT_PROJECT_MEDIA_GRADIENT,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function ProjectLinksOverlay({
  links,
}: {
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href?: string;
  }[];
}) {
  if (!links?.length) return null;

  return (
    <div className="absolute right-2 top-2 z-30 flex flex-wrap justify-end gap-2">
      {links.map((link, idx) => (
        link.href ? (
          <a
            href={link.href}
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Badge
              className="flex h-7 items-center gap-1.5 px-2.5 text-[11px] bg-black text-white hover:bg-black/90"
              variant="default"
            >
              {link.icon}
              {link.type}
            </Badge>
          </a>
        ) : (
          <Badge
            key={idx}
            className="flex h-7 items-center gap-1.5 px-2.5 text-[11px] bg-black text-white hover:bg-black/90"
            variant="default"
          >
            {link.icon}
            {link.type}
          </Badge>
        )
      ))}
    </div>
  );
}

function ProjectPlaceholder({ mediaGradient }: { mediaGradient?: string }) {
  return (
    <ProjectMediaFrame mediaGradient={mediaGradient}>
      <div className={projectMediaGlow} />
      <p className="relative z-10 text-sm font-medium text-white/85">
        Image not found
      </p>
    </ProjectMediaFrame>
  );
}

function ProjectCodeSnippet({
  code,
  mediaGradient,
}: {
  code: string;
  mediaGradient?: string;
}) {
  return (
    <ProjectMediaFrame mediaGradient={mediaGradient}>
      <div className={projectMediaGlow} />
      <code className="relative z-10 flex max-w-[calc(100%-2rem)] items-center whitespace-nowrap rounded-xl border border-white/10 bg-black/85 px-3 py-3 font-mono text-[9px] text-zinc-100 shadow-[0_0_20px_rgba(0,0,0,0.42)] sm:text-[10px]">
        <span className="mr-2 shrink-0 text-yellow-400">$</span>
        <span>{code}</span>
      </code>
    </ProjectMediaFrame>
  );
}

function ProjectImage({
  src,
  alt,
  imageClassName,
  mediaGradient,
  inspectClassName,
}: {
  src: string;
  alt: string;
  imageClassName?: string;
  mediaGradient?: string;
  inspectClassName?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const shouldAutoInspect = stillImagePattern.test(src);
  const isGif = gifImagePattern.test(src);

  if (!src || imageError) {
    return <ProjectPlaceholder mediaGradient={mediaGradient} />;
  }

  return (
    <ProjectMediaFrame mediaGradient={mediaGradient}>
      <div className={projectMediaGlow} />
      <img
        src={src}
        alt={alt}
        className={cn(
          isGif ? projectGifMediaAsset : projectMediaAsset,
          shouldAutoInspect && "project-still-image",
          shouldAutoInspect && inspectClassName,
          imageClassName
        )}
        onError={() => setImageError(true)}
      />
      {shouldAutoInspect && (
        <div
          className={cn(
            "project-still-cursor pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.75)]",
            inspectClassName
          )}
          aria-hidden
        >
          <MousePointer2 className="size-5 fill-black/45 stroke-[2.5]" />
        </div>
      )}
    </ProjectMediaFrame>
  );
}

function ProjectSlideshow({
  images,
  alt,
  imageClassName,
  mediaGradient,
  inspectClassName,
}: {
  images: readonly string[];
  alt: string;
  imageClassName?: string;
  mediaGradient?: string;
  inspectClassName?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isSlideSettled, setIsSlideSettled] = useState(false);
  const usableImages = images.filter(Boolean);
  const hasMultipleImages = usableImages.length > 1;
  const hasInspectMotion = Boolean(inspectClassName);
  const trackImages = hasMultipleImages
    ? [...usableImages, usableImages[0]]
    : usableImages;
  const visibleIndex = hasMultipleImages
    ? activeIndex % usableImages.length
    : 0;

  useEffect(() => {
    setActiveIndex(0);
    setShouldAnimate(true);
    setIsSlideSettled(false);
  }, [usableImages.length]);

  useEffect(() => {
    if (!hasMultipleImages || activeIndex >= usableImages.length) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => current + 1);
    }, hasInspectMotion ? PROJECT_INSPECT_SLIDESHOW_INTERVAL_MS : PROJECT_SLIDESHOW_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, hasInspectMotion, hasMultipleImages, usableImages.length]);

  useEffect(() => {
    if (!hasInspectMotion || activeIndex >= usableImages.length) {
      setIsSlideSettled(false);
      return;
    }

    setIsSlideSettled(false);
    const timer = window.setTimeout(() => {
      setIsSlideSettled(true);
    }, hasMultipleImages ? PROJECT_INSPECT_SLIDESHOW_SETTLE_MS : 0);

    return () => window.clearTimeout(timer);
  }, [activeIndex, hasInspectMotion, hasMultipleImages, usableImages.length]);

  useEffect(() => {
    if (!hasMultipleImages || activeIndex !== usableImages.length) return;

    const timer = window.setTimeout(() => {
      setShouldAnimate(false);
      setActiveIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setShouldAnimate(true));
      });
    }, PROJECT_SLIDESHOW_TRANSITION_MS + 50);

    return () => window.clearTimeout(timer);
  }, [activeIndex, hasMultipleImages, usableImages.length]);

  if (!usableImages.length) {
    return <ProjectPlaceholder mediaGradient={mediaGradient} />;
  }

  return (
    <ProjectMediaFrame mediaGradient={mediaGradient} aria-live="off">
      <div className={projectMediaGlow} />
      <div
        className={cn(
          "relative z-10 flex h-full w-full",
          shouldAnimate
            ? "transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            : "transition-none",
          "motion-reduce:transition-none"
        )}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {trackImages.map((src, index) => {
          const isCurrentSlide = index === activeIndex || (!hasMultipleImages && index === 0);
          const slideIndex = usableImages.length ? index % usableImages.length : 0;
          const shouldInspectSlide = hasInspectMotion && isSlideSettled && isCurrentSlide && activeIndex < usableImages.length;

          return (
            <div
              key={`${src}-${index}`}
              className="relative flex h-full w-full shrink-0 items-center justify-center overflow-hidden"
            >
              <img
                src={src}
                alt={isCurrentSlide ? `${alt} screenshot ${visibleIndex + 1} of ${usableImages.length}` : ""}
                aria-hidden={!isCurrentSlide}
                className={cn(
                  projectSlideshowAsset,
                  shouldInspectSlide && "project-slideshow-image",
                  shouldInspectSlide && inspectClassName,
                  shouldInspectSlide && `project-slideshow-slide-${slideIndex}`,
                  imageClassName
                )}
              />
              {shouldInspectSlide && (
                <div
                  className={cn(
                    "project-slideshow-cursor pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.75)]",
                    inspectClassName,
                    `project-slideshow-slide-${slideIndex}`
                  )}
                  aria-hidden
                >
                  <MousePointer2 className="size-5 fill-black/45 stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
          {usableImages.map((src, index) => (
            <span
              key={`${src}-${index}`}
              className={cn(
                "size-1.5 rounded-full bg-white/45 transition-colors",
                index === visibleIndex && "bg-white"
              )}
            />
          ))}
        </div>
      )}
    </ProjectMediaFrame>
  );
}

function ProjectTitleMark({
  title,
  logo,
  logoDark,
  logoClassName,
  logoShowName,
}: {
  title: string;
  logo?: string;
  logoDark?: string;
  logoClassName?: string;
  logoShowName?: boolean;
}) {
  if (!logo) {
    return <h3 className="flex h-7 items-center font-semibold leading-tight">{title}</h3>;
  }

  if (logoShowName) {
    return (
      <div className="flex h-7 min-w-0 items-center gap-2">
        {logoDark ? (
          <>
            <img
              src={logo}
              alt=""
              className={cn("h-4 w-4 shrink-0 object-contain dark:hidden", logoClassName)}
            />
            <img
              src={logoDark}
              alt=""
              className={cn("hidden h-4 w-4 shrink-0 object-contain dark:block", logoClassName)}
            />
          </>
        ) : (
          <img
            src={logo}
            alt=""
            className={cn("h-4 w-4 shrink-0 object-contain", logoClassName)}
          />
        )}
        <span className="truncate text-sm font-semibold leading-none">
          {title}
        </span>
      </div>
    );
  }

  if (logoDark) {
    return (
      <div className="flex h-7 items-center">
        <img
          src={logo}
          alt={title}
          className={cn("max-h-4 max-w-[140px] object-contain object-left dark:hidden", logoClassName)}
        />
        <img
          src={logoDark}
          alt={title}
          className={cn("hidden max-h-4 max-w-[140px] object-contain object-left dark:block", logoClassName)}
        />
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={title}
      className={cn("max-h-4 max-w-[140px] object-contain object-left", logoClassName)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  image?: string;
  images?: readonly string[];
  imageClassName?: string;
  mediaGradient?: string;
  inspectClassName?: string;
  codeSnippet?: string;
  logo?: string;
  logoDark?: string;
  logoClassName?: string;
  logoShowName?: boolean;
  details?: readonly {
    label: string;
    text: string;
  }[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href?: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  image,
  images,
  imageClassName,
  mediaGradient,
  inspectClassName,
  codeSnippet,
  logo,
  logoDark,
  logoClassName,
  logoShowName,
  details,
  links,
  className,
}: Props) {
  const [isRevealed, setIsRevealed] = useState(false);
  const hasDetails = Boolean(details?.length);

  const shouldHandleTapReveal = () => (
    typeof window !== "undefined"
    && window.matchMedia("(hover: none), (pointer: coarse)").matches
  );

  const toggleReveal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hasDetails || !shouldHandleTapReveal()) return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    setIsRevealed((current) => !current);
  };

  const toggleRevealFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasDetails || (event.target as HTMLElement).closest("a, button")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setIsRevealed((current) => !current);
  };

  const media = images?.length ? (
    <ProjectSlideshow
      images={images}
      alt={title}
      imageClassName={imageClassName}
      mediaGradient={mediaGradient}
      inspectClassName={inspectClassName}
    />
  ) : codeSnippet ? (
    <ProjectCodeSnippet code={codeSnippet} mediaGradient={mediaGradient} />
  ) : image ? (
    <ProjectImage
      src={image}
      alt={title}
      imageClassName={imageClassName}
      mediaGradient={mediaGradient}
      inspectClassName={inspectClassName}
    />
  ) : (
    <ProjectPlaceholder mediaGradient={mediaGradient} />
  );

  return (
    <div
      className={cn(
        "group relative flex h-[540px] flex-col border border-border rounded-xl overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-[560px]",
        href ? "hover:ring-2 cursor-pointer hover:ring-muted" : "hover:ring-1 hover:ring-muted",
        hasDetails && "cursor-default sm:cursor-pointer",
        className
      )}
      tabIndex={hasDetails ? 0 : undefined}
      role={hasDetails ? "button" : undefined}
      aria-label={hasDetails ? `${title} project details.` : undefined}
      aria-pressed={hasDetails ? isRevealed : undefined}
      onClick={toggleReveal}
      onKeyDown={toggleRevealFromKeyboard}
    >
      <ProjectLinksOverlay links={links} />

      <div
        className={cn(
          "flex h-full flex-col transition-opacity duration-150",
          hasDetails && "group-hover:opacity-0 group-focus-visible:opacity-0",
          isRevealed && "opacity-0"
        )}
        aria-hidden={isRevealed}
      >
        <div className="relative shrink-0">
          {media}
        </div>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-h-7 items-center">
              <ProjectTitleMark
                title={title}
                logo={logo}
                logoDark={logoDark}
                logoClassName={logoClassName}
                logoShowName={logoShowName}
              />
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                aria-label={`Open ${title}`}
                onClick={(event) => event.stopPropagation()}
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
          <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.map((tag) => (
                <TechBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>

      {hasDetails && (
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col overflow-hidden bg-background px-2.5 pb-2.5 pt-2 opacity-0 pointer-events-none transition-opacity duration-150 sm:px-3 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:opacity-100",
            isRevealed && "opacity-100 pointer-events-auto"
          )}
        >
          <div className="flex min-h-7 items-center pr-20 sm:pr-32">
            <ProjectTitleMark
              title={title}
              logo={logo}
              logoDark={logoDark}
              logoClassName={logoClassName}
              logoShowName={logoShowName}
            />
          </div>
          <div className="mt-2 grid min-h-0 flex-1 content-start gap-2 overflow-y-auto pr-1">
            {details?.map((detail) => (
              <div key={detail.label} className="rounded-lg border border-border/80 bg-muted/30 p-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {detail.label}
                </p>
                <div className="mt-1 space-y-1.5 text-[11px] leading-snug text-muted-foreground">
                  {detail.text.split(/\n{2,}/).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
