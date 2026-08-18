import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const PROJECTS_PER_PAGE = 4;

export default function ProjectsSection() {
    const [pageIndex, setPageIndex] = useState(0);
    const projectCount = DATA.projects.length;
    const pageCount = Math.ceil(projectCount / PROJECTS_PER_PAGE);
    const startIndex = pageIndex * PROJECTS_PER_PAGE;
    const visibleProjects = DATA.projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
    const visibleStart = startIndex + 1;
    const visibleEnd = Math.min(startIndex + PROJECTS_PER_PAGE, projectCount);

    const showPreviousPage = () => {
        setPageIndex((current) => (current === 0 ? pageCount - 1 : current - 1));
    };

    const showNextPage = () => {
        setPageIndex((current) => (current + 1) % pageCount);
    };

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-5 sm:gap-y-8">
                <div className="flex flex-col gap-y-2.5 items-center justify-center sm:gap-y-4">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"

                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-xs font-medium sm:text-sm">{DATA.sections.projects.label}</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-2 items-center justify-center sm:gap-y-3">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">{DATA.sections.projects.heading}</h2>
                        <p className="mx-auto w-full max-w-[30rem] text-justify text-[13px] leading-relaxed text-muted-foreground [text-align-last:center] sm:max-w-[34rem] sm:text-sm md:text-base lg:text-lg">
                            {DATA.sections.projects.text}
                        </p>
                    </div>
                </div>
                <div className="relative left-1/2 w-[min(calc(100vw-3rem),800px)] -translate-x-1/2">
                    {pageCount > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={showPreviousPage}
                            aria-label="Show previous projects"
                            className="absolute left-2 top-1/2 z-30 hidden -translate-y-1/2 cursor-pointer rounded-full bg-background/95 shadow-sm pointer-events-auto lg:-left-12 lg:inline-flex"
                        >
                            <ChevronLeft className="size-4" aria-hidden />
                        </Button>
                    )}
                    <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 auto-rows-fr">
                        {visibleProjects.map((project, id) => (
                            <BlurFade
                                key={id}
                                delay={0}
                                duration={0.08}
                                yOffset={0}
                                blur="0px"
                                className="h-full"
                            >
                                <ProjectCard
                                    href={project.href || undefined}
                                    hrefPrivate={"hrefPrivate" in project ? project.hrefPrivate : undefined}
                                    title={project.title}
                                    description={project.description}
                                    tags={project.technologies}
                                    image={"image" in project ? project.image : undefined}
                                    images={"images" in project ? project.images : undefined}
                                    imageClassName={"imageClassName" in project ? project.imageClassName : undefined}
                                    mediaGradient={"mediaGradient" in project ? project.mediaGradient : undefined}
                                    inspectClassName={"inspectClassName" in project ? project.inspectClassName : undefined}
                                    codeSnippet={"codeSnippet" in project ? project.codeSnippet : undefined}
                                    logo={"logo" in project ? project.logo : undefined}
                                    logoDark={"logoDark" in project ? project.logoDark : undefined}
                                    logoClassName={"logoClassName" in project ? project.logoClassName : undefined}
                                    logoShowName={"logoShowName" in project ? project.logoShowName : undefined}
                                    details={"details" in project ? project.details : undefined}
                                    links={project.links}
                                />
                            </BlurFade>
                        ))}
                    </div>
                    {pageCount > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={showNextPage}
                            aria-label="Show next projects"
                            className="absolute right-2 top-1/2 z-30 hidden -translate-y-1/2 cursor-pointer rounded-full bg-background/95 shadow-sm pointer-events-auto lg:-right-12 lg:inline-flex"
                        >
                            <ChevronRight className="size-4" aria-hidden />
                        </Button>
                    )}
                </div>
                {pageCount > 1 && (
                    <div className="flex items-center justify-center gap-3 lg:hidden">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={showPreviousPage}
                            aria-label="Show previous projects"
                            className="size-10 cursor-pointer rounded-full bg-background/95 shadow-sm"
                        >
                            <ChevronLeft className="size-4" aria-hidden />
                        </Button>
                        <div className="min-w-20 text-center text-xs tabular-nums text-muted-foreground">
                            {visibleStart}-{visibleEnd} of {projectCount}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={showNextPage}
                            aria-label="Show next projects"
                            className="size-10 cursor-pointer rounded-full bg-background/95 shadow-sm"
                        >
                            <ChevronRight className="size-4" aria-hidden />
                        </Button>
                    </div>
                )}
                {pageCount > 1 && (
                    <div className="hidden text-center text-xs tabular-nums text-muted-foreground lg:block">
                        {visibleStart}-{visibleEnd} of {projectCount}
                    </div>
                )}
            </div>
        </section>
    );
}
