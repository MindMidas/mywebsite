import type { ProjectInfo } from "./types";

export const parkd: ProjectInfo = {
  title: "Parkd",
  href: "https://github.com/MindMidas/parkd",
  sourceHref: "https://github.com/MindMidas/parkd",
  description:
    "Built in a month with a team of four, Parkd is a peer-to-peer parking app for dense regions that lack parking infrastructure. Students can find nearby residential parking on a map, while local residents can list unused driveway space for passive income.",
  technologies: ["Flutter", "Supabase", "PostgreSQL", "Mapbox", "Stripe"],
  details: [
    { label: "Goal", text: "Build a simple two-sided mobile MVP: drivers can find/book parking near campus, and hosts can list unused spots with pricing and availability." },
    { label: "Why", text: "Campus parking is saturated, and building new infrastructure has its downsides. Parkd makes use of spaces that already exist, giving students more options and local residents a way to earn on their own schedule." },
    { label: "Build", text: "Built with Flutter, Riverpod, and go_router, with Supabase powering auth, data, storage, and real-time features. Mapbox and Geolocator handled location, while Edge Functions supported address search and Stripe managed payments, refunds, and payouts." },
    { label: "Result", text: "We kept the MVP focused on the core driver–host flow instead of splitting the app into separate interfaces. Our biggest challenge was maintaining UI consistency, so we used short biweekly check-ins, a shared widget library, and clear ownership of each workflow. By prioritizing a small set of features and executing them well, we delivered a working solution on time." },
  ],
  images: [
    "/project-media/parkd-showcase/slide-1.png",
    "/project-media/parkd-showcase/slide-2.png",
    "/project-media/parkd-showcase/slide-3.png",
  ],
  imageClassName: "p-1 sm:p-2",
  mediaGradient: "#2563eb",
  logo: "/project-media/parkd-logo.png",
  logoClassName: "h-4 w-4",
  logoShowName: true,
};
