import { cloneElement, useEffect, useId, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import { DATA } from "@/data/resume";
import {
  buildActivityCalendar,
  buildCodingCalendar,
  fetchCodingActivity,
  parseProfileContributions,
  selectActivityYear,
  type CodingActivityData,
  type CommitDay,
} from "@/lib/github-activity";

const OWNER = "MindMidas";
const REPO = "skill-issue";
const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
const CACHE_KEY = `github-coding-activity:${OWNER}:v4`;
const CACHE_TTL = 60 * 60 * 1000;
const GITHUB_THEME = {
  light: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"],
  dark: ["#151b23", "#033a16", "#196c2e", "#2ea043", "#56d364"],
};
const PROJECT_THEME = {
  light: ["#eff2f5", "#fef9c3", "#fde047", "#eab308", "#a16207"],
  dark: ["#151b23", "#3b3100", "#756000", "#b59500", "#facc15"],
};

function readCache(): { fetchedAt: number; activity: CodingActivityData } | null {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
    if (typeof cached?.fetchedAt !== "number" || cached.fetchedAt > Date.now()) return null;
    const profile = parseProfileContributions(
      {
        total: cached.activity?.yearTotals,
        contributions: cached.activity?.calendar,
      },
      "all"
    );
    const problemCommits = cached.activity?.problemCommits;
    if (
      !Array.isArray(problemCommits) ||
      !problemCommits.every(
        (commit: CommitDay) =>
          typeof commit?.date === "string" && !Number.isNaN(Date.parse(commit.date))
      )
    )
      return null;
    return { fetchedAt: cached.fetchedAt, activity: { ...profile, problemCommits } };
  } catch {
    /* Storage can be disabled; live activity still works. */
  }
  return null;
}

export default function ActivitySection() {
  const currentYear = new Date().getUTCFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activity, setActivity] = useState<CodingActivityData | null>(null);
  const gradientPrefix = useId().replace(/:/g, "");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [blockSize, setBlockSize] = useState(7);
  const panelRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Keep recent activity visible when the full year scrolls on small screens.
    const scroller = calendarRef.current?.querySelector(
      ".react-activity-calendar__scroll-container"
    );
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [activity, loading, blockSize, selectedYear]);

  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      // Fit all 53 weeks inside the existing section; scroll only on phones.
      setBlockSize(
        Math.max(6, Math.min(12, Math.floor((entry.contentRect.width - 32 - 53 * 3) / 53)))
      );
    });
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCache();
    setFailed(false);
    if (cached) setActivity(cached.activity);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      setLoading(false);
      return;
    }
    setLoading(!cached);
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    let active = true;
    fetchCodingActivity({ owner: OWNER, repo: REPO, signal: controller.signal })
      .then((result) => {
        if (!active) return;
        setActivity(result);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ fetchedAt: Date.now(), activity: result })
          );
        } catch {
          /* Keep rendering when storage is unavailable. */
        }
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  const years = activity?.yearTotals
    ? Object.keys(activity.yearTotals)
        .map(Number)
        .sort((a, b) => b - a)
    : [currentYear];
  const displayedYear = years.includes(selectedYear) ? selectedYear : years[0];
  const selectedActivity = activity ? selectActivityYear(activity, displayedYear) : null;
  const days = selectedActivity
    ? buildCodingCalendar(selectedActivity)
    : buildCodingCalendar({
        calendar: buildActivityCalendar([]),
        problemCommits: [],
        total: 0,
      });
  const daysByDate = new Map(days.map((day) => [day.date, day]));
  const green = isDark ? GITHUB_THEME.dark : GITHUB_THEME.light;
  const yellow = isDark ? PROJECT_THEME.dark : PROJECT_THEME.light;
  const describeDay = (date: string) => {
    const day = daysByDate.get(date);
    const formattedDate = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
    const problems = day?.problemSolving ?? 0;
    const other = day?.projects ?? 0;
    return `${formattedDate}: ${day?.count ?? 0} total contributions — ${problems} problem-solving, ${other} other (including private activity)`;
  };
  const total = selectedActivity?.total ?? 0;

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="flex min-w-0 flex-col gap-y-4 sm:gap-y-6"
    >
      <div className="space-y-2">
        <h2 id="activity-heading" className="text-lg font-bold sm:text-xl">
          {DATA.sections.activity.heading}
        </h2>
        <p className="text-[13px] leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          Data structures, algorithms, and projects.
        </p>
      </div>
      <div className="github-activity grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 sm:gap-x-5">
        <div className="col-start-1 row-start-1 flex min-w-0 flex-wrap items-center justify-between gap-2">
          <p className="text-xs sm:text-sm" aria-live="polite">
            {loading
              ? "Loading activity…"
              : activity
                ? `${total.toLocaleString()} ${total === 1 ? "contribution" : "contributions"} in ${displayedYear}`
                : "Coding activity"}
          </p>
        </div>
        <nav
          aria-label="Activity year"
          className="col-start-2 row-span-2 row-start-1 flex flex-col gap-2"
        >
          {years.map((year) => (
            <button
              key={year}
              type="button"
              aria-pressed={displayedYear === year}
              disabled={!activity}
              onClick={() => setSelectedYear(year)}
              className={`cursor-pointer rounded-md px-3 py-2 text-left text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5 sm:text-xs ${displayedYear === year ? "bg-[#1f6feb] text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              {year}
            </button>
          ))}
        </nav>
        <div
          ref={panelRef}
          className="github-activity-panel col-start-1 min-w-0 rounded-md border p-3 sm:p-4"
          aria-busy={loading}
        >
          {activity || loading ? (
            <ActivityCalendar
              ref={calendarRef}
              data={days}
              loading={loading}
              theme={GITHUB_THEME}
              colorScheme={isDark ? "dark" : "light"}
              blockSize={blockSize}
              blockMargin={3}
              blockRadius={2}
              fontSize={12}
              weekStart={0}
              showWeekdayLabels={["mon", "wed", "fri"]}
              showTotalCount={false}
              showColorLegend={false}
              style={{ marginInline: "auto" }}
              renderBlock={(block, { date }) => {
                if (loading) return block;
                const day = daysByDate.get(date);
                const mixed = Boolean(day?.problemSolving && day?.projects);
                const gradientId = `${gradientPrefix}-${date}`;
                const problemColor = green[day?.problemLevel ?? 0];
                const projectColor = yellow[day?.projectLevel ?? 0];
                const fill = mixed
                  ? `url(#${gradientId})`
                  : day?.projects
                    ? projectColor
                    : problemColor;
                return (
                  <g
                    data-category={
                      mixed
                        ? "both"
                        : day?.projects
                          ? "projects"
                          : day?.problemSolving
                            ? "problem-solving"
                            : "none"
                    }
                  >
                    {mixed && (
                      <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="50%" stopColor={problemColor} />
                          <stop offset="50%" stopColor={projectColor} />
                        </linearGradient>
                      </defs>
                    )}
                    {cloneElement(block, { fill, role: "img", "aria-label": describeDay(date) })}
                  </g>
                );
              }}
              tooltips={{
                activity: {
                  withArrow: true,
                  text: ({ date }) => describeDay(date),
                },
              }}
            />
          ) : (
            <p role="status" className="py-8 text-center text-sm text-muted-foreground">
              Activity is temporarily unavailable.{" "}
              <a
                href={`https://github.com/${OWNER}?tab=overview`}
                className="underline underline-offset-4"
              >
                View it on GitHub
              </a>
              .
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] text-muted-foreground sm:text-xs">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span
                  aria-hidden
                  className="size-[10px] rounded-[2px]"
                  style={{ backgroundColor: green[3] }}
                />
                Problem solving
              </a>
              <span className="inline-flex items-center gap-1">
                <span
                  aria-hidden
                  className="size-[10px] rounded-[2px]"
                  style={{ backgroundColor: yellow[3] }}
                />
                Other activity
              </span>
              <span className="inline-flex items-center gap-1">
                <span
                  aria-hidden
                  className="size-[10px] rounded-[2px]"
                  style={{
                    background: `linear-gradient(135deg, ${green[3]} 50%, ${yellow[3]} 50%)`,
                  }}
                />
                Both
              </span>
            </div>
            <div
              className="ml-auto flex items-center gap-[3px]"
              aria-label="Contribution activity intensity from less to more"
            >
              <span className="mr-1">Less</span>
              {green.map((color, level) => (
                <span
                  key={level}
                  aria-hidden
                  className="size-[10px] rounded-[2px]"
                  style={{
                    background:
                      level === 0
                        ? color
                        : `linear-gradient(135deg, ${color} 50%, ${yellow[level]} 50%)`,
                  }}
                />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-wrap items-center justify-start gap-2 text-xs text-muted-foreground">
          {failed && activity && <span className="mr-auto">Showing saved activity</span>}
          {failed ? (
            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
              className="cursor-pointer hover:text-foreground hover:underline"
            >
              Retry loading activity
            </button>
          ) : (
            <a
              href={`https://github.com/${OWNER}?tab=overview`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline"
            >
              View activity on GitHub →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
