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
  updated: "26 Jun, 23:18 BST",
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
    "col-portugal": {
      note: "Public DraftKings moneyline from ESPN scoreboard.",
      outcomes: [
        { key: "home", label: "Colombia", odds: "+300" },
        { key: "draw", label: "Draw", odds: "+280" },
        { key: "away", label: "Portugal", odds: "-110" },
      ],
      scotlandKey: "draw",
    },
  },
};

const finalResults = {
  savedAt: "28 Jun, 04:55 BST",
  matches: {
    "egy-iran": {
      home: 1,
      away: 1,
      detail: "FT",
      state: "post",
      startedAt: "04:00",
      endedAt: "05:54",
      goals: [
        { team: "Egypt", scorer: "Mahmoud Saber", minute: "5'", time: "04:05" },
        { team: "Iran", scorer: "Ramin Rezaeian", minute: "14'", time: "04:14" },
      ],
    },
    "uru-spain": {
      home: 0,
      away: 1,
      detail: "FT",
      state: "post",
      startedAt: "01:00",
      endedAt: "02:51",
      goals: [
        { team: "Spain", scorer: "Alex Baena", minute: "42'", time: "01:42" },
      ],
    },
    "sen-iraq": {
      home: 5,
      away: 0,
      detail: "FT",
      state: "post",
      startedAt: "20:00",
      endedAt: "21:51",
      goals: [
        { team: "Senegal", scorer: "Habib Diarra", minute: "4'", time: "20:04" },
        { team: "Senegal", scorer: "Ismaila Sarr", minute: "56'", time: "21:11" },
        { team: "Senegal", scorer: "Pape Gueye", minute: "59'", time: "21:14" },
        { team: "Senegal", scorer: "Pape Gueye", minute: "71'", time: "21:26" },
        { team: "Senegal", scorer: "Iliman Ndiaye", minute: "82'", time: "21:37" },
      ],
    },
    "alg-austria": {
      home: 3,
      away: 3,
      detail: "FT",
      state: "post",
      startedAt: "03:00",
      endedAt: "04:52",
      goals: [
        { team: "Austria", scorer: "Marko Arnautovic", minute: "28'", time: "03:28" },
        { team: "Algeria", scorer: "Rafik Belghali", minute: "45'", time: "03:45" },
        { team: "Austria", scorer: "Marcel Sabitzer", minute: "55'", time: "04:10" },
        { team: "Algeria", scorer: "Riyad Mahrez", minute: "60'", time: "04:15" },
        { team: "Algeria", scorer: "Riyad Mahrez", minute: "90'+3'", time: "04:48" },
        { team: "Austria", scorer: "Sasa Kalajdzic", minute: "90'+6'", time: "04:51" },
      ],
    },
    "col-portugal": {
      home: 0,
      away: 0,
      detail: "FT",
      state: "post",
      startedAt: "00:30",
      endedAt: "02:21",
      goals: [],
    },
    "drcongo-uzbekistan": {
      home: 3,
      away: 1,
      detail: "FT",
      state: "post",
      startedAt: "00:30",
      endedAt: "02:23",
      goals: [
        { team: "Uzbekistan", scorer: "Eldor Shomurodov", minute: "10'", time: "00:40" },
        { team: "DR Congo", scorer: "Yoane Wissa", minute: "68'", time: "01:53" },
        { team: "DR Congo", scorer: "Fiston Mayele", minute: "78'", time: "02:03" },
        { team: "DR Congo", scorer: "Yoane Wissa", minute: "90'+1'", time: "02:16" },
      ],
    },
    "croatia-ghana": {
      home: 2,
      away: 1,
      detail: "FT",
      state: "post",
      startedAt: "22:00",
      endedAt: "23:53",
      goals: [
        { team: "Croatia", scorer: "Petar Sucic", minute: "31'", time: "22:31" },
        { team: "Ghana", scorer: "Derrick Luckassen", minute: "73'", time: "23:28" },
        { team: "Croatia", scorer: "Nikola Vlasic", minute: "83'", time: "23:38" },
      ],
    },
  },
};

const scoreState = new Map(Object.entries(finalResults.matches));
const conditionGrid = document.querySelector("#conditions-grid");
const matchesGrid = document.querySelector("#matches-grid");
const meter = document.querySelector(".meter");
const qualificationLine = document.querySelector("#qualification-line");
const lastUpdated = document.querySelector("#last-updated");
const refreshButton = document.querySelector("#refresh-scores");

function formatKickoff(iso) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Europe/Isle_of_Man",
  }).format(new Date(iso));
}

function matchClockLabel(match, score) {
  if (!score) return "Final score unavailable";
  return `Final: ${score.startedAt}-${score.endedAt} BST`;
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

function finalTimelineMarkup(match) {
  const result = scoreState.get(match.id);
  if (!result) return "";

  const goalRows = result.goals.length
    ? result.goals
        .map(
          (goal) => `
            <li>
              <span>${goal.time}</span>
              <strong>${goal.team}</strong>
              ${goal.scorer} (${goal.minute})
            </li>
          `,
        )
        .join("")
    : "<li><span>--</span><strong>No goals</strong> Scoreless draw.</li>";

  return `
    <div class="match-card__timeline" aria-label="Saved final timeline">
      <div class="match-card__timeline-top">
        <span>Started ${result.startedAt} BST</span>
        <span>Ended ${result.endedAt} BST</span>
      </div>
      <ul>${goalRows}</ul>
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
          ${finalTimelineMarkup(match)}
          ${oddsMarkup(match)}
          <p class="match-card__desired">${match.desired}</p>
          <p class="match-card__status">WAITING</p>
        </article>
      `,
    )
    .join("");
}

function scoreLabel(match, score) {
  if (!score) return "---";
  return `${score.home} - ${score.away}`;
}

function updateMatchCards() {
  for (const match of matches) {
    const card = document.querySelector(`[data-match="${match.id}"]`);
    const score = scoreState.get(match.id);
    const helping = score ? match.helps(score) : false;

    card.classList.remove("is-good", "is-bad", "is-ongoing-good", "is-ongoing-bad", "is-waiting");
    card.classList.add(!score ? "is-waiting" : helping ? "is-good" : "is-bad");

    card.querySelector(".match-card__time").innerHTML = `${formatKickoff(match.kickoff)}<br><strong>${matchClockLabel(
      match,
      score,
    )}</strong>`;
    card.querySelector(".match-card__score").textContent = scoreLabel(match, score);
    card.querySelector(".match-card__status").textContent = !score
      ? "WAITING"
      : helping
        ? "SUCCESS"
        : "Failed";
  }
}

function evaluateCondition(condition) {
  const conditionMatches = condition.matchIds.map((id) => matches.find((match) => match.id === id));
  const knownScores = conditionMatches
    .map((match) => ({ match, score: scoreState.get(match.id) }))
    .filter((entry) => entry.score);

  if (knownScores.length === 0) {
    return { state: "waiting", pill: "Pending", line: "Saved final score unavailable." };
  }

  const helps = knownScores.some(({ match, score }) => match.helps(score));
  const scoreBits = knownScores.map(({ match, score }) => `${match.home} ${score.home}-${score.away} ${match.away}`);

  return {
    state: helps ? "good" : "bad",
    live: false,
    pill: helps ? "Success" : "Failed",
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

function buildQualificationRing(success, failed) {
  const successful = Math.min(Math.max(success, 0), 4);
  const danger = Math.min(Math.max(failed - 2, 0), 4 - successful);
  const segmentSize = 90;
  const stops = Array.from({ length: 4 }, (_, index) => {
    const segmentStart = index * segmentSize;
    const end = segmentStart + segmentSize;
    const dangerStart = 4 - danger;
    const colour =
      index < successful
        ? "var(--meter-landing)"
        : index >= dangerStart
          ? "var(--meter-failed)"
          : "var(--meter-waiting)";
    return `${colour} ${segmentStart}deg ${end}deg`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function qualificationCoreColour(success, failed) {
  if (success >= 4) return "var(--meter-landing)";
  if (failed >= 3) return "var(--meter-failed)";
  return "var(--meter-core-waiting)";
}

function updateConditionCards() {
  let success = 0;
  let ongoing = 0;
  let failed = 0;
  let currentlyGood = 0;
  const results = [];

  for (const condition of conditions) {
    const result = evaluateCondition(condition);
    results.push(result);
    if (result.state === "good") currentlyGood += 1;
    if (result.state === "good" && !result.live) success += 1;
    if (result.live) ongoing += 1;
    if (result.state === "bad" && !result.live) failed += 1;

    const card = document.querySelector(`[data-condition="${condition.id}"]`);
    card.classList.remove("is-good", "is-bad", "is-ongoing-good", "is-ongoing-bad", "is-waiting");
    card.classList.add(
      result.live && result.state === "good"
        ? "is-ongoing-good"
        : result.live && result.state === "bad"
          ? "is-ongoing-bad"
          : `is-${result.state}`,
    );
    card.querySelector(".status-pill").textContent = result.pill;
    card.querySelector(".condition-card__scoreline").textContent = result.line;
  }

  meter.style.setProperty("--meter-ring", buildMeterRing(results));
  meter.style.setProperty("--meter-pie", buildQualificationRing(success, failed));
  meter.style.setProperty("--meter-core", qualificationCoreColour(success, failed));
  meter.setAttribute(
    "aria-label",
    `${success} of 4 required results successful. ${ongoing} ongoing, ${failed} failed.`,
  );
  qualificationLine.textContent =
    currentlyGood >= 4
      ? "Final tally would have put Scotland through."
      : `Final tally: ${success} success, ${ongoing} ongoing, ${failed} failed.`;
}

function updateTimestamp() {
  lastUpdated.textContent = `Final results saved ${finalResults.savedAt}. No live score feed is queried.`;
  refreshButton.disabled = true;
}

renderShell();
updateMatchCards();
updateConditionCards();
updateTimestamp();
