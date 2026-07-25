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
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.work.map((work) => {
        return (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="w-full border-b-0 grid gap-2"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage
                  src={work.logoUrl}
                  alt={work.company}
                  background={"logoBackground" in work ? work.logoBackground : undefined}
                />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-none flex items-center gap-2">
                    {work.company}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {work.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span>{work.period}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
            <div className="grid gap-2">
              <p>{work.description}</p>
              {"highlights" in work && work.highlights?.length ? (
                <ul className="grid gap-1 pl-4 list-disc marker:text-muted-foreground/70">
                  {work.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
        );
      })}
    </Accordion>
  );
}
