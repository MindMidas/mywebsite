export type ActivityDay = { date: string; count: number; level: number };
export type CommitDay = { date: string; sha?: string };
export type CodingActivityData = {
  calendar: ActivityDay[];
  problemCommits: CommitDay[];
  total: number;
  yearTotals?: Record<string, number>;
};
export type CodingActivityDay = ActivityDay & {
  problemSolving: number;
  projects: number;
  problemLevel: number;
  projectLevel: number;
};

const DAY_MS = 86_400_000;

export function activityRange(now = new Date()) {
  const end = new Date(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
  const start = new Date(end.getTime() - 364 * DAY_MS);
  return { start, end };
}

export function buildActivityCalendar(commits: CommitDay[], now = new Date()): ActivityDay[] {
  const { start, end } = activityRange(now);
  const counts = new Map<string, number>();
  for (const { date } of commits) {
    const day = new Date(date).toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  const days: ActivityDay[] = [];
  for (let time = start.getTime(); time <= end.getTime(); time += DAY_MS) {
    const date = new Date(time).toISOString().slice(0, 10);
    days.push({ date, count: counts.get(date) ?? 0, level: 0 });
  }
  const max = Math.max(1, ...days.map(({ count }) => count));
  return days.map((day) => ({
    ...day,
    level: day.count === 0 ? 0 : Math.ceil((day.count / max) * 4),
  }));
}

/** Preserve GitHub's exact daily totals, including anonymized private activity. */
export function buildCodingCalendar(activity: CodingActivityData): CodingActivityDay[] {
  const counts = new Map<string, number>();
  for (const { date } of activity.problemCommits) {
    const day = new Date(date).toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  const days = activity.calendar.map((day) => {
    // A repository commit may not qualify for profile credit. Never increase
    // GitHub's total or create negative remaining activity when sources differ.
    const problemSolving = Math.min(day.count, counts.get(day.date) ?? 0);
    return { ...day, problemSolving, projects: day.count - problemSolving };
  });
  const maxProblems = Math.max(1, ...days.map((day) => day.problemSolving));
  const maxOther = Math.max(1, ...days.map((day) => day.projects));
  return days.map((day) => ({
    ...day,
    problemLevel: day.problemSolving === 0 ? 0 : Math.ceil((day.problemSolving / maxProblems) * 4),
    projectLevel: day.projects === 0 ? 0 : Math.ceil((day.projects / maxOther) * 4),
  }));
}

/** Validate daily counts against the total for every requested year. */
export function parseProfileContributions(
  value: unknown,
  mode: "last" | "all" = "last"
): Pick<CodingActivityData, "calendar" | "total" | "yearTotals"> {
  const result = value as { total?: Record<string, unknown>; contributions?: unknown };
  if (
    !result ||
    !Array.isArray(result.contributions) ||
    !result.total ||
    typeof result.total !== "object"
  ) {
    throw new Error("Invalid GitHub contribution calendar");
  }
  const calendar: ActivityDay[] = result.contributions
    .map((day) => {
      if (
        !day ||
        typeof day.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        Number.isNaN(Date.parse(day.date)) ||
        new Date(day.date).toISOString().slice(0, 10) !== day.date ||
        !Number.isSafeInteger(day.count) ||
        day.count < 0 ||
        !Number.isInteger(day.level) ||
        day.level < 0 ||
        day.level > 4
      ) {
        throw new Error("Invalid GitHub contribution day");
      }
      return { date: day.date, count: day.count, level: day.level };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  if (
    calendar.some(
      (day, index) =>
        index > 0 && Date.parse(day.date) - Date.parse(calendar[index - 1].date) !== DAY_MS
    )
  ) {
    throw new Error("Incomplete GitHub contribution calendar");
  }
  if (mode === "all") {
    const yearTotals: Record<string, number> = {};
    const years = Object.keys(result.total).sort();
    if (!years.length || years.some((year) => !/^\d{4}$/.test(year)))
      throw new Error("Invalid GitHub contribution years");
    for (const year of years) {
      const total = result.total[year];
      const days = calendar.filter((day) => day.date.startsWith(`${year}-`));
      const expectedDays =
        (Date.parse(`${Number(year) + 1}-01-01`) - Date.parse(`${year}-01-01`)) / DAY_MS;
      if (
        !Number.isSafeInteger(total) ||
        (total as number) < 0 ||
        days.length !== expectedDays ||
        days[0]?.date !== `${year}-01-01` ||
        days.at(-1)?.date !== `${year}-12-31` ||
        days.reduce((sum, day) => sum + day.count, 0) !== total
      ) {
        throw new Error("Incomplete GitHub contribution year");
      }
      yearTotals[year] = total as number;
    }
    if (calendar.some((day) => !(day.date.slice(0, 4) in yearTotals)))
      throw new Error("Invalid GitHub contribution year");
    return {
      calendar,
      yearTotals,
      total: Object.values(yearTotals).reduce((sum, count) => sum + count, 0),
    };
  }
  // GitHub starts at the beginning of a week, so its last-year view can contain
  // more than 365 dates. Use that full range instead of trimming the total.
  if (
    !Number.isSafeInteger(result.total.lastYear) ||
    (result.total.lastYear as number) < 0 ||
    calendar.length < 365 ||
    calendar.length > 372 ||
    calendar.reduce((sum, day) => sum + day.count, 0) !== result.total?.lastYear
  ) {
    throw new Error("Incomplete GitHub contribution calendar");
  }
  return { calendar, total: result.total.lastYear as number };
}

export function selectActivityYear(activity: CodingActivityData, year: number): CodingActivityData {
  const total = activity.yearTotals?.[year];
  if (total === undefined) throw new Error("GitHub contribution year unavailable");
  return {
    ...activity,
    calendar: activity.calendar.filter((day) => day.date.startsWith(`${year}-`)),
    total,
  };
}

export async function fetchCodingActivity({
  owner,
  repo,
  signal,
  fetcher = fetch,
}: {
  owner: string;
  repo: string;
  signal?: AbortSignal;
  fetcher?: typeof fetch;
}): Promise<CodingActivityData> {
  // This is the same profile-calendar service used by react-github-calendar.
  // It exposes only the counts already visible on the public GitHub profile.
  const response = await fetcher(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(owner)}?y=all`,
    { signal }
  );
  if (!response.ok)
    throw new Error(`GitHub contribution calendar unavailable (${response.status})`);
  const profile = parseProfileContributions(await response.json(), "all");
  const problemCommits = await fetchRepositoryActivity({
    owner,
    repo,
    author: owner,
    signal,
    fetcher,
    range: {
      start: new Date(`${profile.calendar[0].date}T00:00:00Z`),
      end: new Date(`${profile.calendar.at(-1)!.date}T00:00:00Z`),
    },
  });
  return { ...profile, problemCommits };
}

/** Fetch every page, so the calendar never silently drops older commits. */
export async function fetchRepositoryActivity({
  owner,
  repo,
  author,
  signal,
  now = new Date(),
  fetcher = fetch,
  range,
}: {
  owner: string;
  repo: string;
  author: string;
  signal?: AbortSignal;
  now?: Date;
  fetcher?: typeof fetch;
  range?: { start: Date; end: Date };
}): Promise<CommitDay[]> {
  const commits = new Map<string, CommitDay>();
  const { start, end } = range ?? activityRange(now);
  for (let page = 1; ; page++) {
    const url = new URL(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits`
    );
    url.search = new URLSearchParams({
      author,
      since: start.toISOString(),
      until: new Date(end.getTime() + DAY_MS - 1).toISOString(),
      per_page: "100",
      page: String(page),
    }).toString();
    const response = await fetcher(url, {
      signal,
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub activity unavailable (${response.status})`);
    const entries: unknown = await response.json();
    if (!Array.isArray(entries)) throw new Error("Invalid GitHub activity response");
    for (const entry of entries) {
      const date = entry?.commit?.author?.date;
      if (
        typeof entry?.sha !== "string" ||
        typeof date !== "string" ||
        Number.isNaN(Date.parse(date))
      ) {
        throw new Error("Invalid GitHub commit");
      }
      commits.set(entry.sha, { date, sha: entry.sha });
    }
    if (entries.length < 100) break;
  }
  return [...commits.values()];
}
