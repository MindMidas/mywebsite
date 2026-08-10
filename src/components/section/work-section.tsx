/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function LogoImage({
  src,
  alt,
  background,
}: {
  src: string;
  alt: string;
  background?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const logoFitClass = cn(
    "block object-contain max-w-[70%] max-h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
    src.includes("pi") && "max-w-[62%] max-h-[62%]"
  );

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 rounded-full border bg-muted shadow ring-2 ring-border flex-none" />
    );
  }

  return (
    <div className="size-8 md:size-10 rounded-full border bg-background p-0.5 shadow ring-2 ring-border flex-none">
      <div
        style={{ background: background ?? "var(--background)" }}
        className="size-full rounded-full flex items-center justify-center overflow-hidden"
      >
        <img
          src={src}
          alt={alt}
          className={logoFitClass}
          onError={() => setImageError(true)}
        />
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-4 sm:gap-6">
      {DATA.work.map((work) => {
        const bullets = [
          "description" in work && work.description ? work.description : null,
          ...("highlights" in work && work.highlights ? work.highlights : []),
        ].filter(Boolean);

        return (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="w-full border-b-0 grid gap-1.5 sm:gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 text-left sm:gap-x-3">
              <div className="flex-none">
                <LogoImage
                  src={work.logoUrl}
                  alt={work.company}
                  background={"logoBackground" in work ? work.logoBackground : undefined}
                />
              </div>

              <div className="min-w-0">
                <div className="flex min-w-0 items-start justify-between gap-x-2">
                  <div className="flex min-w-0 flex-1 items-start gap-1 font-semibold text-xs leading-tight tracking-[-0.025em] sm:text-sm lg:gap-2 lg:tracking-normal">
                    <span className="min-w-0">
                      {work.company}
                    </span>
                    <span className="relative mt-px inline-flex h-3 w-3 shrink-0 items-center sm:h-3.5 sm:w-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3 w-3 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out sm:h-3.5 sm:w-3.5",
                          "translate-x-0 opacity-100",
                          "group-hover:translate-x-0.5",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3 w-3 shrink-0 text-muted-foreground stroke-2 transition-all duration-200 sm:h-3.5 sm:w-3.5",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="mt-px flex flex-none items-center gap-1 whitespace-nowrap text-right text-[11px] tabular-nums text-muted-foreground sm:text-xs">
                    <span>{work.period}</span>
                  </div>
                </div>
                <div className="mt-0.5 font-sans text-[11.5px] leading-tight text-muted-foreground sm:text-xs lg:text-sm lg:leading-normal">
                  {work.title}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-0 text-xs leading-relaxed text-muted-foreground lg:ml-13 lg:text-sm">
            {bullets.length > 0 ? (
              <ul className="grid gap-1 pl-4 list-disc marker:text-muted-foreground/70">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </AccordionContent>
        </AccordionItem>
        );
      })}
    </Accordion>
  );
}
