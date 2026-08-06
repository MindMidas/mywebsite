import React from "react";
import { BrandIcon } from "@/components/brand-icon";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import EducationSection from "@/components/section/education-section";
import PhotosSection from "@/components/section/photos-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";

const BLUR_FADE_DELAY = 0.04;

const footerLinkClassName =
  "font-medium text-foreground underline decoration-foreground/60 underline-offset-4 transition-colors hover:decoration-foreground";

function FooterCredits() {
  return (
    <BlurFade delay={BLUR_FADE_DELAY * 17}>
      <footer className="border-t border-border/60 pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        <a
          href={DATA.sourceCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={footerLinkClassName}
        >
          Website Source
        </a>
      </footer>
    </BlurFade>
  );
}

const sectionComponents: Record<string, React.ReactNode> = {
  about: (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{DATA.sections.about.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="font-medium text-foreground underline decoration-foreground/60 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  ),
  work: (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">{DATA.sections.work.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <WorkSection />
        </BlurFade>
      </div>
    </section>
  ),
  education: (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">{DATA.sections.education.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <EducationSection />
        </BlurFade>
      </div>
    </section>
  ),
  skills: (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">{DATA.sections.skills.heading}</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-2">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                {"logos" in skill && skill.logos?.length ? (
                  <span className="flex items-center gap-1">
                    {skill.logos.map((logo) => (
                      <BrandIcon key={logo} name={logo} className="size-4" />
                    ))}
                  </span>
                ) : "icon" in skill && skill.icon ? (
                  <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                ) : null}
                <span className="text-foreground text-sm font-medium">{skill.name}</span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  ),
  projects: (
    <section id="projects">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <ProjectsSection />
      </BlurFade>
    </section>
  ),
  photos: <PhotosSection />,
  contact: (
    <section id="contact">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <ContactSection />
      </BlurFade>
    </section>
  ),
};

export default function HomePage() {
  const orderedSections = Object.entries(DATA.sections)
    .filter(([, s]) => s.enabled)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key]) => key);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                showCursor
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] whitespace-pre-line md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <a
                  href={DATA.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  CV
                  <ArrowUpRight
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      {orderedSections.map((key) => (
        <React.Fragment key={key}>
          {sectionComponents[key]}
        </React.Fragment>
      ))}
      <FooterCredits />
    </main>
  );
}
