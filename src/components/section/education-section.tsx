/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";

type EducationEntry = (typeof DATA.education)[number];
type EducationLogo = {
  src: string;
  alt: string;
  background?: string;
  href?: string;
  label?: string;
};

function getEducationLogos(education: EducationEntry): readonly EducationLogo[] {
  if ("logoUrls" in education) {
    return education.logoUrls;
  }

  if (!education.logoUrl) {
    return [];
  }

  return [
    {
      src: education.logoUrl,
      alt: `${education.school} logo`,
      background: "logoBackground" in education ? education.logoBackground : undefined,
      href: education.href,
      label: education.school,
    },
  ];
}

function getEducationLogoFitClass(src: string) {
  return cn(
    "block object-contain max-w-[70%] max-h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]",
    src.includes("university_of_guelph") && "max-w-[64%] max-h-[64%]",
    src.includes("university_of_waterloo") && "max-w-[60%] max-h-[60%] translate-y-0.5",
    src.includes("st_mary_catholic_academy") && "max-w-[62%] max-h-[62%]"
  );
}

export default function EducationSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-4 sm:gap-6">
      {DATA.education.map((education) => {
        const logos = getEducationLogos(education);
        const links = logos
          .map((logo) => ({
            href: logo.href ?? education.href,
            label: logo.label ?? logo.alt.replace(/\s+logo$/i, ""),
          }))
          .filter((link) => link.href);

        return (
          <AccordionItem
            key={education.school}
            value={education.school}
            className="w-full border-b-0 grid gap-1.5 sm:gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 text-left sm:gap-x-3">
                {logos.length > 0 ? (
                  <div className="flex -space-x-2 flex-none">
                    {logos.map((logo) => (
                      <div
                        key={logo.src}
                        className="size-8 md:size-10 rounded-full border bg-background p-0.5 shadow ring-2 ring-border"
                      >
                        <div
                          style={{ background: logo.background ?? "var(--background)" }}
                          className="size-full rounded-full flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className={getEducationLogoFitClass(logo.src)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="size-8 md:size-10 rounded-full border bg-muted shadow ring-2 ring-border flex-none" />
                )}

                <div className="min-w-0">
                  <div className="flex min-w-0 items-start justify-between gap-x-2">
                    <div className="flex min-w-0 flex-1 items-start gap-1 font-semibold text-xs leading-tight tracking-[-0.025em] sm:text-sm lg:gap-2 lg:tracking-normal">
                      <span className="min-w-0">
                        {education.school}
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
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </div>
                  <div className="mt-0.5 font-sans text-[11.5px] leading-tight text-muted-foreground sm:text-xs lg:text-sm lg:leading-normal">
                    {education.degree}
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-0 ml-0 text-xs leading-relaxed text-muted-foreground lg:ml-13 lg:text-sm">
              {"achievements" in education && education.achievements.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 sm:space-y-1.5">
                  {education.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              )}

              {links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                  {links.map((link) => (
                    <a
                      key={`${education.school}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-foreground hover:bg-muted transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
