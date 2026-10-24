import assert from "node:assert/strict";
import test from "node:test";
import {
  activityRange,
  buildActivityCalendar,
  buildCodingCalendar,
  fetchRepositoryActivity,
  parseProfileContributions,
  selectActivityYear,
  fetchCodingActivity,
} from "../src/lib/github-activity.ts";

test("calendar spans 365 UTC dates across leap day and ignores out-of-range commits", () => {
  const now = new Date("2024-03-01T23:59:59Z");
  const { start, end } = activityRange(now);
  const days = buildActivityCalendar(
    [
      { date: "2024-02-29T10:00:00Z" },
      { date: "2024-02-29T11:00:00Z" },
      { date: "2024-03-01T01:00:00Z" },
      { date: "2022-01-01T00:00:00Z" },
      { date: "2025-01-01T00:00:00Z" },
    ],
    now
  );
  assert.equal(days.length, 365);
  assert.equal(days[0].date, start.toISOString().slice(0, 10));
  assert.equal(days.at(-1).date, end.toISOString().slice(0, 10));
  assert.equal(
    days.reduce((sum, day) => sum + day.count, 0),
    3
  );
  assert.deepEqual(
    days.find((day) => day.date === "2024-02-29"),
    { date: "2024-02-29", count: 2, level: 4 }
  );
  assert.ok(
    days.every(({ count, level }) => (count === 0 ? level === 0 : level >= 1 && level <= 4))
  );
});

test("a successful empty history produces an empty calendar", () => {
  const days = buildActivityCalendar([], new Date("2026-10-23T12:00:00Z"));
  assert.equal(days.length, 365);
  assert.ok(days.every(({ count, level }) => count === 0 && level === 0));
});

const commit = (sha) => ({
  sha: String(sha),
  commit: { author: { date: "2026-10-23T12:00:00Z" } },
});
const options = {
  owner: "MindMidas",
  repo: "skill-issue",
  author: "MindMidas",
  now: new Date("2026-10-23T15:00:00Z"),
};

test("fetches all pages, scopes repo and author, and deduplicates overlapping commits", async () => {
  const urls = [];
  const commits = await fetchRepositoryActivity({
    ...options,
    fetcher: async (url) => {
      urls.push(url);
      const page = Number(url.searchParams.get("page"));
      return Response.json(
        page === 1 ? Array.from({ length: 100 }, (_, i) => commit(i)) : [commit(99), commit(100)]
      );
    },
  });
  assert.equal(commits.length, 101);
  assert.equal(urls.length, 2);
  assert.equal(urls[0].pathname, "/repos/MindMidas/skill-issue/commits");
  assert.equal(urls[0].searchParams.get("author"), "MindMidas");
  assert.equal(urls[1].searchParams.get("page"), "2");
  assert.equal(urls[0].searchParams.get("until"), "2026-10-23T23:59:59.999Z");
});

test("a rate limit or failed later page never becomes a misleading partial calendar", async () => {
  await assert.rejects(
    fetchRepositoryActivity({
      ...options,
      fetcher: async (url) =>
        url.searchParams.get("page") === "1"
          ? Response.json(Array.from({ length: 100 }, (_, i) => commit(i)))
          : new Response("Rate limited", { status: 403 }),
    }),
    /unavailable \(403\)/
  );
});

test("rejects malformed API responses", async () => {
  for (const payload of [{ message: "error" }, [{ sha: "abc", commit: {} }]]) {
    await assert.rejects(
      fetchRepositoryActivity({ ...options, fetcher: async () => Response.json(payload) }),
      /Invalid GitHub/
    );
  }
});

function profileResponse() {
  const first = Date.parse("2025-10-19T00:00:00Z");
  const contributions = Array.from({ length: 371 }, (_, index) => ({
    date: new Date(first + index * 86_400_000).toISOString().slice(0, 10),
    count: index === 0 ? 4 : index === 369 ? 1792 : 0,
    level: index === 369 ? 4 : index === 0 ? 1 : 0,
  }));
  return { total: { lastYear: 1796 }, contributions };
}

test("profile total includes private counts and GitHub's leading week", () => {
  const profile = parseProfileContributions(profileResponse());
  const days = buildCodingCalendar({
    ...profile,
    problemCommits: [{ date: "2026-10-23T12:00:00Z" }],
  });
  assert.equal(days.length, 371);
  assert.equal(days[0].count, 4);
  assert.equal(
    days.reduce((sum, day) => sum + day.count, 0),
    1796
  );
  const mixed = days.find((day) => day.date === "2026-10-23");
  assert.equal(mixed.problemSolving, 1);
  assert.equal(mixed.projects, 1791);
  assert.equal(mixed.count, 1792);
});

test("overlay never inflates profile totals when practice commits exceed profile credit", () => {
  const profile = parseProfileContributions(profileResponse());
  const days = buildCodingCalendar({
    ...profile,
    problemCommits: [
      ...Array.from({ length: 10 }, () => ({ date: "2025-10-19T12:00:00Z" })),
      { date: "2026-10-24T12:00:00Z" },
    ],
  });
  assert.equal(days[0].problemSolving, 4);
  assert.equal(days[0].projects, 0);
  assert.equal(days.at(-1).problemSolving, 0);
  assert.ok(
    days.every((day) => day.problemSolving + day.projects === day.count && day.projects >= 0)
  );
  assert.equal(
    days.reduce((sum, day) => sum + day.count, 0),
    1796
  );
});

test("overlay uses UTC boundaries for repository timestamps", () => {
  const profile = parseProfileContributions(profileResponse());
  const days = buildCodingCalendar({
    ...profile,
    problemCommits: [{ date: "2026-10-22T23:30:00-04:00" }],
  });
  assert.equal(days.find((day) => day.date === "2026-10-23").problemSolving, 1);
});

test("rejects truncated, duplicated, invalid, or inconsistent profile data", () => {
  for (const mutate of [
    (data) => data.contributions.splice(100, 1),
    (data) => {
      data.contributions[1].date = data.contributions[0].date;
    },
    (data) => {
      data.contributions[0].count = -1;
    },
    (data) => {
      data.contributions[0].date = "2025-02-30";
    },
    (data) => {
      data.total.lastYear = 188;
    },
    (data) => {
      data.contributions[0].level = 8;
    },
  ]) {
    const data = profileResponse();
    mutate(data);
    assert.throws(() => parseProfileContributions(data), /[Ii]nvalid|[Ii]ncomplete/);
  }
});

test("fetch uses the profile calendar instead of public commit search and covers its exact dates", async () => {
  const urls = [];
  const result = await fetchCodingActivity({
    ...options,
    fetcher: async (input) => {
      const url = new URL(input);
      urls.push(url);
      return Response.json(
        url.hostname === "github-contributions-api.jogruber.de"
          ? historyResponse()
          : [commit("practice")]
      );
    },
  });
  assert.equal(result.total, 2915);
  assert.equal(result.problemCommits.length, 1);
  assert.equal(urls.length, 2);
  assert.equal(urls[0].searchParams.get("y"), "all");
  assert.equal(urls[1].searchParams.get("since"), "2022-01-01T00:00:00.000Z");
  assert.equal(urls[1].searchParams.get("until"), "2026-12-31T23:59:59.999Z");
  assert.ok(urls.every((url) => url.pathname !== "/search/commits"));
});

test("profile failures are surfaced rather than falling back to a smaller public-only total", async () => {
  await assert.rejects(
    fetchCodingActivity({
      ...options,
      fetcher: async () => new Response("Unavailable", { status: 503 }),
    }),
    /unavailable \(503\)/
  );
});

function historyResponse() {
  const total = { 2022: 48, 2023: 256, 2024: 125, 2025: 868, 2026: 1618 };
  const contributions = [];
  for (let time = Date.parse("2022-01-01"); time <= Date.parse("2026-12-31"); time += 86_400_000) {
    const date = new Date(time).toISOString().slice(0, 10);
    const count = date.endsWith("-01-01") ? total[date.slice(0, 4)] : 0;
    contributions.push({ date, count, level: count ? 4 : 0 });
  }
  return { total, contributions };
}

test("all history exposes every real year with the matching annual total", () => {
  const history = parseProfileContributions(historyResponse(), "all");
  assert.deepEqual(Object.keys(history.yearTotals), ["2022", "2023", "2024", "2025", "2026"]);
  const activity = { ...history, problemCommits: [{ date: "2026-01-01T12:00:00Z" }] };
  const current = selectActivityYear(activity, 2026);
  assert.equal(current.total, 1618);
  assert.equal(current.calendar.length, 365);
  assert.equal(current.calendar[0].date, "2026-01-01");
  assert.equal(current.calendar.at(-1).date, "2026-12-31");
  const previous = selectActivityYear(activity, 2025);
  assert.equal(previous.total, 868);
  assert.ok(previous.calendar.every((day) => day.date.startsWith("2025-")));
  assert.equal(
    buildCodingCalendar(previous).reduce((sum, day) => sum + day.problemSolving, 0),
    0
  );
  assert.equal(selectActivityYear(activity, 2024).calendar.length, 366);
  assert.throws(() => selectActivityYear(activity, 2021), /unavailable/);
});

test("annual history rejects missing days and mismatching annual totals", () => {
  const missing = historyResponse();
  missing.contributions.splice(10, 1);
  assert.throws(() => parseProfileContributions(missing, "all"), /Incomplete/);
  const wrong = historyResponse();
  wrong.total[2026] = 1796;
  assert.throws(() => parseProfileContributions(wrong, "all"), /Incomplete/);
});
