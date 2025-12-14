const GAMES = [
  {
    id: "g1",
    icon: "🎈",
    title: "GAME 1 — Ho Ho Blow",
    meta: "1v1 • Balloon Blast Edition",
    objective:
      "Use a balloon to blow plastic cups off the table. This is a 1v1 battle — fastest person to clear all their cups wins.",
    materials: ["Balloons", "Plastic cups", "Table (split into two sides)"]
  },
  {
    id: "g2",
    icon: "❄️",
    title: "GAME 2 — Snowball Fight",
    meta: "1v1 • Mittens Mode 🧤",
    objective:
      "Wearing oven mitts, players throw cotton balls across the table trying to land them into the opponent’s bucket. Most cotton balls in the bucket wins.",
    materials: ["Cotton balls", "2 buckets (one at each side of table)", "Oven mitts", "Table"]
  },
  {
    id: "g3",
    icon: "🔔",
    title: "GAME 3 — Jingle Balls",
    meta: "No hands 🙅 • Waist swing challenge",
    objective:
      "Swing a bauble attached to a string around your waist and get it into a cup tied at the front — no hands.",
    materials: ["Plastic cup", "Christmas bauble", "String or belt"]
  },
  {
    id: "g4",
    icon: "😈",
    title: "GAME 4 — The Grinch Hates Balloons",
    meta: "Group • Last balloon standing",
    objective:
      "Each player has a balloon attached to one of their legs. You must pop everyone else’s balloons while protecting your own. Last person with at least one balloon wins.",
    materials: ["Balloons", "String / tape for attaching to legs", "Open space"]
  },
  {
    id: "g5",
    icon: "🧝",
    title: "GAME 5 — Elf Reflex Rumble",
    meta: "Group • Fast reactions ⚡",
    objective:
      "Everyone stands around a cup. The caller shouts: “Head!” “Knees!” “Nose!” etc. When they yell “Cup!” everyone tries to grab the cup. Slowest person is eliminated each round until two remain.",
    materials: ["1 cup", "Caller"]
  },
  {
    id: "g6",
    icon: "🦌",
    title: "GAME 6 — Rudolph’s Antlers",
    meta: "Solo • Ring toss ⭕",
    objective:
      "Throw rings onto reindeer antlers (worn or mounted). Most rings landed wins.",
    materials: ["Antler headband", "Rings (glow sticks or rope)"]
  },
  {
    id: "g7",
    icon: "🧸",
    title: "GAME 7 — I Want a Teddy Bear for Christmas",
    meta: "Group • Voice guessing 🎤",
    objective:
      "One person sits, eyes closed, in the middle. Everyone walks in a circle. A randomly chosen player says “I’m a Teddy Bear!” in a disguised voice. The middle person must guess who said it.",
    materials: ["None (just voices!)"]
  },
  {
    id: "g8",
    icon: "🎁",
    title: "GAME 8 — White Elephant Gift Exchange",
    meta: "Group • Gift chaos guaranteed 😅",
    objective:
      "A gift exchange where you can pick a new gift or steal an opened one — with rules to keep it fair (and funny).",
    materials: ["1 wrapped gift per person (at least $50)"]
  }
];

const WHITE_ELEPHANT = {
  giftRule: [
    "Each participant must bring one wrapped gift at least $50.",
    "Do not label the gift with your name."
  ],
  howToPlay: [
    {
      step: "1. Draw Numbers",
      text: "Everyone draws a random number. This decides the order of turns (1 goes first, highest number goes last)."
    },
    {
      step: "2. Player Turn Options",
      text:
        "Option A — Pick a New Gift: choose any unopened gift, unwrap it, and reveal it.\n" +
        "Option B — Steal a Gift: take a gift someone else has already opened."
    }
  ],
  stealingRules: [
    "A gift can only be stolen once per turn.",
    "A gift can only be stolen 3 times total in the whole game. After 3 steals, it becomes frozen ❄️ and can’t be taken again.",
    "If your gift is stolen, you must immediately take another turn by opening a new gift OR stealing someone else’s gift.",
    "You cannot steal back the same gift from the person who just stole it from you."
  ],
  turnEndRule:
    "If a turn reaches 3 steals total during that turn, that turn immediately ends and moves to the next player.",
  finalRule:
    "At the end of the game, Player #1 gets one final choice: keep their current gift OR steal any unfrozen gift. If Player #1 steals, the person they stole from receives the last unopened gift (if one remains) or swaps with Player #1.",
  endGame:
    "Everyone keeps the final gift they are holding. Laughs, chaos, and arguments about who stole what are all included for free."
};

const gamesEl = document.getElementById("games");
const searchEl = document.getElementById("search");
const expandAllBtn = document.getElementById("expandAll");
const collapseAllBtn = document.getElementById("collapseAll");

function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function renderGame(game){
  const materialsHtml = game.materials
    .map(m => `<li>${escapeHtml(m)}</li>`)
    .join("");

  let extraHtml = "";

  if (game.id === "g8") {
    extraHtml = `
      <div class="block">
        <h3>🎁 Gift Rule</h3>
        <ul>${WHITE_ELEPHANT.giftRule.map(r=>`<li>${escapeHtml(r)}</li>`).join("")}</ul>
      </div>

      <div class="block">
        <h3>🎲 How to Play</h3>
        <ul>
          ${WHITE_ELEPHANT.howToPlay.map(s=>`
            <li><b>${escapeHtml(s.step)}:</b> ${escapeHtml(s.text).replace(/\n/g,"<br/>")}</li>
          `).join("")}
        </ul>
      </div>

      <div class="block">
        <h3>🔄 Stealing Rules</h3>
        <ul>${WHITE_ELEPHANT.stealingRules.map(r=>`<li>${escapeHtml(r)}</li>`).join("")}</ul>
      </div>

      <div class="block">
        <h3>🧊 Turn-End Rule</h3>
        <p>${escapeHtml(WHITE_ELEPHANT.turnEndRule)}</p>
      </div>

      <div class="block">
        <h3>🏁 Final Rule — Player #1 Bonus Turn</h3>
        <p>${escapeHtml(WHITE_ELEPHANT.finalRule)}</p>
      </div>

      <div class="block">
        <h3>🎉 End of Game</h3>
        <p>${escapeHtml(WHITE_ELEPHANT.endGame)}</p>
      </div>
    `;
  }

  return `
    <article class="card" data-search="${escapeHtml(
      (game.title + " " + game.meta + " " + game.objective + " " + game.materials.join(" ")).toLowerCase()
    )}">
      <details>
        <summary>
          <div class="title">
            <div class="icon" aria-hidden="true">${game.icon}</div>
            <div>
              <h2>${escapeHtml(game.title)}</h2>
              <div class="meta">${escapeHtml(game.meta)}</div>
            </div>
          </div>
          <div class="chev" aria-hidden="true">⌄</div>
        </summary>

        <div class="content">
          <div class="block">
            <h3>🎯 Objective</h3>
            <p>${escapeHtml(game.objective)}</p>
          </div>

          <div class="block">
            <h3>🧰 Materials</h3>
            <ul>${materialsHtml}</ul>
          </div>

          ${extraHtml || ""}
        </div>
      </details>
    </article>
  `;
}

function render(list){
  if (!list.length){
    gamesEl.innerHTML = `<div class="empty">No matches 😅 Try searching “balloon”, “bucket”, “gift”, etc.</div>`;
    return;
  }
  gamesEl.innerHTML = list.map(renderGame).join("");
}

function setAll(open){
  document.querySelectorAll("details").forEach(d => (d.open = open));
}

render(GAMES);

searchEl.addEventListener("input", () => {
  const q = searchEl.value.trim().toLowerCase();
  if (!q) return render(GAMES);
  const filtered = GAMES.filter(g => {
    const hay = (g.title + " " + g.meta + " " + g.objective + " " + g.materials.join(" ")).toLowerCase();
    return hay.includes(q);
  });
  render(filtered);
});

expandAllBtn.addEventListener("click", () => setAll(true));
collapseAllBtn.addEventListener("click", () => setAll(false));
