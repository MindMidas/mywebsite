<h1 align="center">Portfolio</h1>

<p align="center">
  My personal site — <a href="https://paulmancion.com">paulmancion.com</a>
</p>

<p align="center">
  <a href="https://astro.build/"><img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=111827" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"></a>
</p>

---

# **Pre-Requisites**

- Node.js 22.12+
- pnpm 11+

---

# **How to Build & Run**

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm preview
```

---

# **Folder Structure**

```text
website/
|-- public/
|-- src/
|   |-- components/
|   |-- data/
|   |-- layouts/
|   |-- pages/
|   `-- styles/
|-- astro.config.mjs
|-- package.json
`-- README.md
```

Useful paths:

- `src/data/` — resume, projects, and site config
- `public/project-media/` — project images and demos

The Coding Activity section imports `react-activity-calendar` and uses the
profile's actual daily contribution totals, including anonymized private
activity. It retrieves the public profile calendar through
[GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api),
the same service used by `react-github-calendar`. This service caches for one hour.
The chart defaults to the current calendar year (January–December). The right-hand
year list comes from the complete profile history, newest first. Selecting a year
updates the chart and annual contribution count immediately without another API
request. Leap years retain February 29.

Public commits authored by MindMidas in `MindMidas/skill-issue` provide the green
problem-solving overlay. Yellow shows all remaining profile contributions,
including private activity, PRs, reviews, and issues; it does not claim those
are all project commits. Mixed days use diagonally split green-and-yellow squares.
Tooltips show the daily total and category counts. Overlay counts are capped at each day's
profile count so uncredited repo commits cannot inflate the displayed total.
Intensity scales independently within each category.

No token or private repository details are needed. The browser caches only the
calendar counts and public practice commit metadata for one hour. Cache version 4
stores the complete year history and invalidates the former rolling-year cache.
If either source is unavailable,
saved complete data remains visible with a notice; otherwise the section offers a
retry and a GitHub link. Partial or inconsistent profile calendars are rejected.
Dates use UTC, and the calendar follows the site's light/dark toggle and normal
section width.

Run the activity data checks with Node 22.18+:

```bash
node --test tests/github-activity.test.mjs
```

---

# **License**

[MIT](LICENSE)
