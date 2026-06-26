const matches = [
  {
    id: "egy-iran",
    group: "Group G",
    condition: "g",
    home: "Egypt",
    away: "Iran",
    flags: ["🇪🇬", "🇮🇷"],
    kickoff: "2026-06-27T04:00:00+01:00",
    desired: "Egypt win",
    aliases: [["egypt"], ["iran", "ir iran", "islamic republic of iran"]],
    helps: ({ home, away }) => home > away,
  },
  {
    id: "uru-spain",
    group: "Group H",
    condition: "h",
    home: "Uruguay",
    away: "Spain",
    flags: ["🇺🇾", "🇪🇸"],
    kickoff: "2026-06-27T01:00:00+01:00",
    desired: "Spain win",
    aliases: [["uruguay"], ["spain"]],
    helps: ({ home, away }) => away > home,
  },
  {
    id: "sen-iraq",
    group: "Group I",
    condition: "i",
    home: "Senegal",
    away: "Iraq",
    flags: ["🇸🇳", "🇮🇶"],
    kickoff: "2026-06-26T20:00:00+01:00",
    desired: "Draw or Iraq by 1",
    aliases: [["senegal"], ["iraq"]],
    helps: ({ home, away }) => away - home === 0 || away - home === 1,
  },
  {
    id: "alg-austria",
    group: "Group J",
    condition: "j",
    home: "Algeria",
    away: "Austria",
    flags: ["🇩🇿", "🇦🇹"],
    kickoff: "2026-06-28T03:00:00+01:00",
    desired: "Algeria lose by 2+ or Austria lose by 4+",
    aliases: [["algeria"], ["austria"]],
    helps: ({ home, away }) => away - home >= 2 || home - away >= 4,
  },
  {
    id: "col-portugal",
    group: "Group K",
    condition: "k",
    home: "Colombia",
    away: "Portugal",
    flags: ["🇨🇴", "🇵🇹"],
    kickoff: "2026-06-28T00:30:00+01:00",
    desired: "Draw",
    aliases: [["colombia"], ["portugal"]],
    helps: ({ home, away }) => home === away,
  },
  {
    id: "drcongo-uzbekistan",
    group: "Group K",
    condition: "k",
    home: "DR Congo",
    away: "Uzbekistan",
    flags: ["🇨🇩", "🇺🇿"],
    kickoff: "2026-06-28T00:30:00+01:00",
    desired: "Uzbekistan by 1",
    aliases: [["dr congo", "d.r. congo", "congo dr", "democratic republic of congo"], ["uzbekistan"]],
    helps: ({ home, away }) => away - home === 1,
  },
  {
    id: "croatia-ghana",
    group: "Group L",
    condition: "l",
    home: "Croatia",
    away: "Ghana",
    flags: ["🇭🇷", "🇬🇭"],
    kickoff: "2026-06-27T22:00:00+01:00",
    desired: "Ghana by 3+",
    aliases: [["croatia"], ["ghana"]],
    helps: ({ home, away }) => away - home >= 3,
  },
];

const conditions = [
  {
    id: "g",
    group: "Group G",
    text: "Egypt must beat Iran.",
    matchIds: ["egy-iran"],
  },
  {
    id: "h",
    group: "Group H",
    text: "Spain must beat Uruguay.",
    matchIds: ["uru-spain"],
  },
  {
    id: "i",
    group: "Group I",
    text: "Senegal and Iraq draw, or Iraq win by exactly 1.",
    matchIds: ["sen-iraq"],
  },
  {
    id: "j",
    group: "Group J",
    text: "Algeria lose by 2+, or Austria lose by 4+.",
    matchIds: ["alg-austria"],
  },
  {
    id: "k",
    group: "Group K",
    text: "Colombia and Portugal draw, or Uzbekistan beat DR Congo by exactly 1.",
    matchIds: ["col-portugal", "drcongo-uzbekistan"],
  },
  {
    id: "l",
    group: "Group L",
    text: "Ghana must beat Croatia by 3+.",
    matchIds: ["croatia-ghana"],
  },
];

const oddsSnapshot = {
  updated: "26 Jun",
  source: "Public web lookup",
  matches: {
    "egy-iran": {
      note: "Public match result prices from a betting preview.",
      outcomes: [
        { key: "home", label: "Egypt", odds: "7/5" },
        { key: "draw", label: "Draw", odds: "9/5" },
        { key: "away", label: "Iran", odds: "13/5" },
      ],
      scotlandKey: "home",
    },
    "uru-spain": {
      note: "Public match result prices from a betting preview.",
      outcomes: [
        { key: "home", label: "Uruguay", odds: "6/1" },
        { key: "draw", label: "Draw", odds: "3/1" },
        { key: "away", label: "Spain", odds: "4/9" },
      ],
      scotlandKey: "away",
    },
  },
};

const scoreState = new Map();
const conditionGrid = document.querySelector("#conditions-grid");
const matchesGrid = document.querySelector("#matches-grid");
const meter = document.querySelector(".meter");
const qualificationLine = document.querySelector("#qualification-line");
const lastUpdated = document.querySelector("#last-updated");
const refreshButton = document.querySelector("#refresh-scores");

function normalise(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatKickoff(iso) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Isle_of_Man",
  }).format(new Date(iso));
}

function formatCountdown(iso) {
  const remaining = new Date(iso).getTime() - Date.now();
  if (remaining <= 0) return "In play window";
  const hours = Math.floor(remaining / 36e5);
  const minutes = Math.floor((remaining % 36e5) / 6e4);
  if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${Math.max(minutes, 1)}m`;
}

function hasStarted(match) {
  return Date.now() >= new Date(match.kickoff).getTime();
}

function matchClockLabel(match, score) {
  if (!hasStarted(match)) return `Starts in ${formatCountdown(match.kickoff)}`;
  if (!score?.detail || score.detail.toLowerCase() === "scheduled") return "Score pending";
  return score.detail;
}

function oddsToDecimal(odds) {
  if (typeof odds === "number") return odds;
  const value = String(odds).trim();
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);
    return numerator / denominator + 1;
  }
  const american = Number(value);
  if (!Number.isFinite(american)) return null;
  if (american > 0) return american / 100 + 1;
  return 100 / Math.abs(american) + 1;
}

function oddsProbabilities(matchId) {
  const odds = oddsSnapshot.matches[matchId];
  if (!odds) return null;

  const outcomes = odds.outcomes
    .map((outcome) => ({
      ...outcome,
      decimal: oddsToDecimal(outcome.odds),
    }))
    .filter((outcome) => outcome.decimal && outcome.decimal > 1);
  const bookTotal = outcomes.reduce((total, outcome) => total + 1 / outcome.decimal, 0);

  return {
    ...odds,
    outcomes: outcomes.map((outcome) => ({
      ...outcome,
      probability: ((1 / outcome.decimal) / bookTotal) * 100,
    })),
  };
}

function formatProbability(value) {
  if (!Number.isFinite(value)) return "--";
  if (value < 10) return `${value.toFixed(1)}%`;
  return `${Math.round(value)}%`;
}

function scotlandProbability(odds) {
  if (!odds) return null;
  if (Number.isFinite(odds.scotlandProbability)) {
    return {
      label: odds.scotlandLabel || "Scotland-helping outcome",
      probability: odds.scotlandProbability,
    };
  }
  const outcome = odds.outcomes.find((entry) => entry.key === odds.scotlandKey);
  if (!outcome) return null;
  return {
    label: odds.scotlandLabel || outcome.label,
    probability: outcome.probability,
  };
}

function oddsMarkup(match) {
  const odds = oddsProbabilities(match.id);
  const helpingOdds = scotlandProbability(odds);
  if (!odds || !helpingOdds) return "";

  const outcomeItems = odds.outcomes
    .map(
      (outcome) => `
        <span>
          <strong>${outcome.label}</strong>
          ${formatProbability(outcome.probability)}
          <small>${outcome.odds}</small>
        </span>
      `,
    )
    .join("");

  return `
    <div class="match-card__odds" aria-label="Betting-implied probabilities">
      <div class="match-card__odds-top">
        <span>Odds</span>
        <small>${oddsSnapshot.updated}</small>
      </div>
      <div class="match-card__probabilities">${outcomeItems}</div>
      <p class="match-card__scotland-chance">
        <strong>${formatProbability(helpingOdds.probability)}</strong>
        ${helpingOdds.label}
      </p>
      <p class="match-card__odds-note">${odds.note}</p>
    </div>
  `;
}

function renderShell() {
  conditionGrid.innerHTML = conditions
    .map(
      (condition) => `
        <article class="condition-card is-waiting" data-condition="${condition.id}">
          <div class="condition-card__top">
            <span class="condition-card__group">${condition.group}</span>
            <span class="status-pill">Waiting</span>
          </div>
          <p class="condition-card__text">${condition.text}</p>
          <p class="condition-card__scoreline">Kickoff picture pending.</p>
        </article>
      `,
    )
    .join("");

  matchesGrid.innerHTML = matches
    .map(
      (match) => `
        <article class="match-card is-waiting" data-match="${match.id}">
          <div class="match-card__flags"><span>${match.flags[0]}</span><span>${match.flags[1]}</span></div>
          <p class="match-card__group">${match.group}</p>
          <h3 class="match-card__teams">${match.home} <span>v</span> ${match.away}</h3>
          <div class="match-card__fixture">
            <p class="match-card__time">${formatKickoff(match.kickoff)}<br><strong>${matchClockLabel(match)}</strong></p>
            <p class="match-card__score">---</p>
          </div>
          ${oddsMarkup(match)}
          <p class="match-card__desired">${match.desired}</p>
          <p class="match-card__status">WAITING</p>
        </article>
      `,
    )
    .join("");
}

function matchEventToFixture(event) {
  const competitors = event?.competitions?.[0]?.competitors || [];
  const home = competitors.find((team) => team.homeAway === "home");
  const away = competitors.find((team) => team.homeAway === "away");
  if (!home || !away) return null;

  const homeNames = [
    home.team?.displayName,
    home.team?.shortDisplayName,
    home.team?.name,
    home.team?.abbreviation,
  ]
    .filter(Boolean)
    .map(normalise);
  const awayNames = [
    away.team?.displayName,
    away.team?.shortDisplayName,
    away.team?.name,
    away.team?.abbreviation,
  ]
    .filter(Boolean)
    .map(normalise);

  return matches.find((match) => {
    const homeAliases = match.aliases[0].map(normalise);
    const awayAliases = match.aliases[1].map(normalise);
    const homeMatches = homeNames.some((name) => homeAliases.includes(name));
    const awayMatches = awayNames.some((name) => awayAliases.includes(name));
    return homeMatches && awayMatches;
  });
}

async function fetchScores() {
  if (!matches.some(hasStarted)) return 0;

  const dates = ["20260626", "20260627", "20260628"];
  const endpoints = [
    "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard",
    "https://site.web.api.espn.com/apis/v2/sports/soccer/fifa.world/scoreboard",
  ];

  const fetchJson = async (url) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5500);
    try {
      const response = await fetch(url, { cache: "no-store", signal: controller.signal });
      if (!response.ok) return null;
      return response.json();
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  };

  const payloads = await Promise.all(
    endpoints.flatMap((endpoint) => dates.map((date) => fetchJson(`${endpoint}?dates=${date}&limit=1000`))),
  );

  let matched = 0;
  for (const payload of payloads) {
    if (!payload) continue;
    for (const event of payload.events || []) {
      const fixture = matchEventToFixture(event);
      if (!fixture) continue;
      const competitors = event.competitions[0].competitors;
      const home = competitors.find((team) => team.homeAway === "home");
      const away = competitors.find((team) => team.homeAway === "away");
      scoreState.set(fixture.id, {
        home: Number.parseInt(home.score, 10),
        away: Number.parseInt(away.score, 10),
        detail: event.status?.type?.shortDetail || event.status?.type?.detail || "Live",
        state: event.status?.type?.state || "pre",
      });
      matched += 1;
    }
  }
  return matched;
}

function scoreLabel(match, score) {
  if (!hasStarted(match) || !score) return "---";
  return `${score.home} - ${score.away}`;
}

function updateMatchCards() {
  for (const match of matches) {
    const card = document.querySelector(`[data-match="${match.id}"]`);
    const score = scoreState.get(match.id);
    const started = hasStarted(match);
    const helping = score ? match.helps(score) : false;

    card.classList.remove("is-good", "is-bad", "is-waiting");
    card.classList.add(!started || !score ? "is-waiting" : helping ? "is-good" : "is-bad");

    card.querySelector(".match-card__time").innerHTML = `${formatKickoff(match.kickoff)}<br><strong>${matchClockLabel(
      match,
      score,
    )}</strong>`;
    card.querySelector(".match-card__score").textContent = scoreLabel(match, score);
    card.querySelector(".match-card__status").textContent = !started || !score
      ? "WAITING"
      : helping
        ? "Helps Scotland"
        : "Failed";
  }
}

function evaluateCondition(condition) {
  const conditionMatches = condition.matchIds.map((id) => matches.find((match) => match.id === id));
  const knownScores = conditionMatches
    .map((match) => ({ match, score: scoreState.get(match.id) }))
    .filter((entry) => entry.score);
  const started = conditionMatches.some(hasStarted);

  if (!started) {
    return { state: "waiting", pill: "Waiting", line: "Match not started." };
  }
  if (knownScores.length === 0) {
    return { state: "waiting", pill: "Pending", line: "Waiting for score data." };
  }

  const helps = knownScores.some(({ match, score }) => match.helps(score));
  const scoreBits = knownScores.map(({ match, score }) => `${match.home} ${score.home}-${score.away} ${match.away}`);
  const stillLive = knownScores.some(({ score }) => score.state !== "post");

  return {
    state: helps ? "good" : "bad",
    live: stillLive,
    pill: stillLive ? (helps ? "Ongoing" : "Failed") : helps ? "Landing" : "Failed",
    line: scoreBits.join(" / "),
  };
}

function meterColour(result) {
  if (result.live && result.state === "good") return "var(--meter-ongoing-good)";
  if (result.live && result.state === "bad") return "var(--meter-ongoing-bad)";
  if (result.state === "good") return "var(--meter-landing)";
  if (result.state === "bad") return "var(--meter-failed)";
  return "var(--meter-waiting)";
}

function buildMeterRing(results) {
  const segmentSize = 60;
  const stops = results.flatMap((result, index) => {
    const segmentStart = index * segmentSize;
    const end = segmentStart + segmentSize;
    const colour = meterColour(result);
    return `${colour} ${segmentStart}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function buildLandingPie(landing) {
  const landed = Math.min(Math.max(landing, 0), 4);
  const segmentSize = 90;
  const stops = Array.from({ length: 4 }, (_, index) => {
    const segmentStart = index * segmentSize;
    const end = segmentStart + segmentSize;
    const colour = index < landed ? "var(--meter-landing)" : "var(--meter-waiting)";
    return `${colour} ${segmentStart}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function updateConditionCards() {
  let landing = 0;
  let ongoing = 0;
  let failed = 0;
  let currentlyGood = 0;
  const results = [];

  for (const condition of conditions) {
    const result = evaluateCondition(condition);
    results.push(result);
    if (result.state === "good") currentlyGood += 1;
    if (result.state === "good" && !result.live) landing += 1;
    if (result.live) ongoing += 1;
    if (result.state === "bad" && !result.live) failed += 1;

    const card = document.querySelector(`[data-condition="${condition.id}"]`);
    card.classList.remove("is-good", "is-bad", "is-waiting");
    card.classList.add(`is-${result.state}`);
    card.querySelector(".status-pill").textContent = result.pill;
    card.querySelector(".condition-card__scoreline").textContent = result.line;
  }

  meter.style.setProperty("--meter-ring", buildMeterRing(results));
  meter.style.setProperty("--meter-pie", buildLandingPie(landing));
  meter.setAttribute(
    "aria-label",
    `${landing} of 4 required results landed. ${ongoing} ongoing, ${failed} failed.`,
  );
  qualificationLine.textContent =
    currentlyGood >= 4
      ? "Current live picture would put Scotland through."
      : `Live picture: ${landing} landing, ${ongoing} ongoing, ${failed} failed.`;
}

function updateTimestamp(matched = 0) {
  const stamp = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Isle_of_Man",
    timeZoneName: "short",
  }).format(new Date());
  const suffix = matched > 0 ? `${matched} match feed${matched === 1 ? "" : "s"} matched.` : "No matching live feed data yet.";
  lastUpdated.textContent = `Last checked ${stamp}. ${suffix}`;
}

async function refreshScores() {
  refreshButton.disabled = true;
  let matched = 0;
  try {
    matched = await fetchScores();
  } finally {
    updateMatchCards();
    updateConditionCards();
    updateTimestamp(matched);
    refreshButton.disabled = false;
  }
}

renderShell();
updateMatchCards();
updateConditionCards();
refreshScores();
setInterval(refreshScores, 60_000);
setInterval(() => {
  updateMatchCards();
  updateConditionCards();
}, 30_000);

refreshButton.addEventListener("click", refreshScores);
