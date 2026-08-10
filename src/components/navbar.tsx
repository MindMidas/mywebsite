import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const dockIconClassName =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";

const tooltipClassName =
  "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

function PjmLogo() {
  return (
    <svg
      width="750"
      height="294"
      viewBox="0 0 750 294"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-12 object-contain"
      aria-hidden="true"
    >
      <path
        d="M433.5 108.54V0L577.268 206.774H543.015L684.37 0H748.535L749.5 293H676.169L675.686 97.5271H689.195L576.303 262.026H541.085L433.5 108.54Z"
        fill="currentColor"
      />
      <path
        d="M202.5 293.54H272.541C307.261 293.54 333.581 284.58 351.501 266.66C369.421 248.74 378.381 221.58 378.381 185.18V0H310.761V188.96C310.761 221.44 296.901 237.68 269.181 237.68H202.5V293.54Z"
        fill="currentColor"
      />
      <path
        d="M0 294V0H127.26C153.58 0 176.26 4.34 195.3 13.02C214.34 21.42 229.04 33.6 239.4 49.56C249.76 65.52 254.94 84.56 254.94 106.68C254.94 128.52 249.76 147.42 239.4 163.38C229.04 179.34 214.34 191.66 195.3 200.34C176.26 208.74 153.58 212.94 127.26 212.94H123.48V157.5C144.48 157.5 160.16 153.02 170.52 144.06C180.88 135.1 186.06 122.64 186.06 106.68C186.06 90.44 180.88 77.84 170.52 68.88C160.16 59.92 144.48 55.44 123.48 55.44H68.04V294H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TooltipLabel({ label }: { label: string }) {
  return (
    <TooltipContent side="top" sideOffset={8} className={tooltipClassName}>
      <p>{label}</p>
      <TooltipArrow className="fill-primary" />
    </TooltipContent>
  );
}

function CvMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const cvButton = (
    <button
      type="button"
      onClick={() => setOpen((current) => !current)}
      aria-label="Choose CV"
      aria-expanded={open}
    >
      <DockIcon className={`${dockIconClassName} group`}>
        <span className="relative flex size-full items-center justify-center text-xs font-semibold tracking-wide">
          <span className="transition-opacity group-hover:opacity-0">CV</span>
          <ArrowUpRight
            className="absolute size-4 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </span>
      </DockIcon>
    </button>
  );

  return (
    <div ref={menuRef} className="relative">
      {open ? (
        cvButton
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{cvButton}</TooltipTrigger>
          <TooltipLabel label="CV" />
        </Tooltip>
      )}

      {open ? (
        <div className="absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 w-44 -translate-x-1/2 rounded-2xl border border-border bg-card/95 p-2 text-card-foreground shadow-[0_16px_45px_-18px_rgba(0,0,0,0.45)] backdrop-blur-3xl dark:shadow-[0_16px_45px_-18px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col gap-1">
            {DATA.cvOptions.map((option) =>
              option.href ? (
                <a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{option.label}</span>
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                    aria-hidden
                  />
                </a>
              ) : (
                <div
                  key={option.label}
                  aria-disabled="true"
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground"
                >
                  <span>{option.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em]">
                    Soon
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const socialLinks = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar && social.url
  );

  return (
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-30 flex justify-center">
      <Dock className="z-50 relative h-14 p-2 w-fit flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            window.history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="h-10 min-w-16 px-2.5 flex items-center justify-center rounded-3xl text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Paul Mancion"
        >
          <PjmLogo />
        </a>

        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />

        {socialLinks.map(([name, social]) => {
          const IconComponent = social.icon;

          return (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <DockIcon className={dockIconClassName}>
                    <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipLabel label={social.name} />
            </Tooltip>
          );
        })}

        <CvMenu />

        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipLabel label="Theme" />
        </Tooltip>
      </Dock>
    </div>
  );
}
