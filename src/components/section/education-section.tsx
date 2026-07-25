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
    <Accordion type="single" collapsible className="w-full grid gap-6">
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
            className="w-full border-b-0 grid gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex items-center gap-x-3 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
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

                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {education.school}
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
                      {education.degree}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {education.start} - {education.end}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
              {"achievements" in education && education.achievements.length > 0 && (
                <ul className="list-disc pl-4 space-y-1.5">
                  {education.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              )}

              {links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
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
