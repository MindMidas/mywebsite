import type { ProjectInfo } from "./types";

export const orangepill: ProjectInfo = {
  title: "Orangepill",
  href: "https://orangepill.dev",
  sourceHref: "https://github.com/MindMidas/orangepill",
  websiteHref: "https://orangepill.dev",
  description:
    "A Nostr service I collaborated on with a builder I met through early Nostr. It offered NIP-05 handles, Lightning forwarding, and paid relay access across CA, US, and EU. We crossed 2000+ users and millions of events on our relays within the first few weeks. One challenge early on was spam, which became the expensive part of running relays.",
  technologies: ["Nostr", "Lightning Network", "Node.js", "Docker"],
  details: [
    { label: "Goal", text: "Deploy useful Nostr infrastructure: NIP-05 handles, Lightning forwarding, and paid relay access from one simple service." },
    { label: "Why", text: "Nostr caught my attention because of my interest in cryptography, privacy, and censorship resistant platforms. I wanted to contribute while the network was still young, learn how the protocol worked in production, and help onboard new users to the network." },
    { label: "Build", text: "Static HTML/CSS/vanilla JS frontend with a Node 24 backend for NIP-05, LNURL, registration, manage/admin flows, NIP-98 signed auth, SQLite-backed orders/handles/relay entitlements, LNbits invoices over Core Lightning/Bitcoin Core, QR invoice generation, Docker/Caddy deployment, and Nostream relay sync/config." },
    { label: "Result", text: "We onboarded 2,000+ users and saw real usage from notable Nostr accounts, including Edward Snowden. The service worked well early on, but spam and bots showed how hard hosting these services can get. The services were stopped after 2 years due to financing, but now its back up and running for CA." },
  ],
  images: [
    "/project-media/orangepill-showcase/home.png",
    "/project-media/orangepill-showcase/register.png",
    "/project-media/orangepill-showcase/services.png",
    "/project-media/orangepill-showcase/directory.png",
  ],
  imageClassName: "p-1 sm:p-2",
  inspectClassName: "project-orangepill-inspect",
  mediaGradient: "#f97316",
  logo: "/project-media/orangepill-wordmark.png",
  logoClassName: "h-4 max-w-[140px]",
};
