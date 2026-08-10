import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { Mail } from "lucide-react";
import Markdown from "react-markdown";

const contactActions = [
  {
    name: DATA.contact.social.GitHub.name,
    href: DATA.contact.social.GitHub.url,
    icon: Icons.github,
  },
  {
    name: DATA.contact.social.LinkedIn.name,
    href: DATA.contact.social.LinkedIn.url,
    icon: Icons.linkedin,
  },
  {
    name: DATA.contact.email.address,
    href: DATA.contact.email.url,
    icon: Mail,
  },
];

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-5 relative sm:p-10">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-xs font-medium sm:text-sm">{DATA.sections.contact.label}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-2.5 text-center sm:gap-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
          {DATA.sections.contact.heading}
        </h2>
        <Markdown
          components={{
            p: ({ children }) => (
              <p className="mx-auto max-w-lg text-center text-[13px] leading-relaxed text-muted-foreground text-balance [text-align-last:center] sm:text-sm md:text-base">
                {children}
              </p>
            ),
            a: ({ href, children }) => {
              const isExternal = href?.startsWith("http");

              return (
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="font-medium text-foreground underline decoration-foreground/60 underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {DATA.sections.contact.text}
        </Markdown>
        <div className="flex flex-wrap justify-center gap-1.5 pt-0.5 sm:gap-2 sm:pt-1">
          {contactActions.map((action) => {
            const Icon = action.icon;
            const isExternal = action.href.startsWith("http");

            return (
              <a
                key={action.name}
                href={action.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-7 w-fit px-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:h-8 sm:px-4 sm:gap-2 sm:text-sm"
              >
                <Icon className="size-3.5 sm:size-4" aria-hidden />
                <span>{action.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
