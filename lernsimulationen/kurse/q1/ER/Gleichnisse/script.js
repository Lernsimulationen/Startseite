(() => {
const MAX_TIME = 60;
const TIMER_CIRCUMFERENCE = 326.73;
const PRIVACY_MODE = true;
const LEGACY_LOG_KEY = "cdg_local_log_v2";

const imageSources = {
  archive: "assets/mission-archive.jpg",
  fragments: "assets/mission-fragments.jpg",
  sower: "assets/mission-sower.jpg",
  forms: "assets/mission-forms.jpg",
  privacy: "assets/mission-privacy.jpg"
};

const missions = [
  {
    id: 1,
    kind: "heading",
    type: "Sektor 1",
    title: "Textinseln bergen",
    image: "fragments",
    text: "Finde die passende Codekarte.",
    fragment: "Signal suchen. Karte wählen. Code prüfen.",
    action: "Codekarte setzen",
    items: [
      {
        quote: "Bekanntes macht Schwieriges anschaulich.",
        options: ["Bekanntes Bild", "Zeitrechnung", "Datenschutz"],
        answer: "Bekanntes Bild",
        explain: "Gleichnisse machen Schwieriges durch bekannte Bilder verstehbar."
      },
      {
        quote: "Freiheit ist wie ein Muskel.",
        options: ["Vergleich", "Allegorie", "Protokoll"],
        answer: "Vergleich",
        explain: "Der Satz nutzt einen Vergleich, um eine abstrakte Sache anschaulich zu machen."
      },
      {
        quote: "Der alte Sinn wirkt in neuer Lage weiter.",
        options: ["Transfer", "Inhaltsangabe", "Nur Bild"],
        answer: "Transfer",
        explain: "Gleichnisse werden auf neue Situationen bezogen, ohne ihren Sinn beliebig zu machen."
      }
    ],
    hint: "Achte auf das Signalwort: bekannt, wie, neue Lage."
  },
  {
    id: 2,
    kind: "classify",
    type: "Sektor 2",
    title: "Formen kalibrieren",
    image: "forms",
    text: "Lege jede Karte in das richtige Fach.",
    fragment: "Vier Formen. Vier Fächer. Ein sauberer Code.",
    action: "Form zuordnen",
    zones: [
      { id: "gleichnis", label: "Gleichnis" },
      { id: "parabel", label: "Parabel" },
      { id: "beispiel", label: "Beispielgeschichte" },
      { id: "allegorie", label: "Allegorie" }
    ],
    cards: [
      { id: "known", text: "Alltägliches Bild", zone: "gleichnis" },
      { id: "point", text: "Story mit Pointe", zone: "parabel" },
      { id: "imitate", text: "Muster zum Handeln", zone: "beispiel" },
      { id: "mapping", text: "Viele Einzeldeutungen", zone: "allegorie" }
    ],
    hint: "Allegorie deutet viele Details. Beispielgeschichte zeigt ein Handlungsmodell."
  },
  {
    id: 3,
    kind: "binary",
    type: "Sektor 3",
    title: "Bild oder Sache?",
    image: "sower",
    text: "Scanne: Erzählbild oder Bedeutung?",
    fragment: "Bildebene erzählt. Sachebene deutet.",
    action: "Ebene bestimmen",
    zones: [
      { id: "bild", label: "Bildebene" },
      { id: "sache", label: "Sachebene" }
    ],
    cards: [
      { id: "seed", text: "Saat fällt auf Böden.", zone: "bild" },
      { id: "birds", text: "Vögel fressen Saat.", zone: "bild" },
      { id: "message", text: "Botschaft wird verschieden aufgenommen.", zone: "sache" },
      { id: "resistance", text: "Widerstand blockiert Wirkung.", zone: "sache" },
      { id: "harvest", text: "Große Ernte am Ende.", zone: "bild" },
      { id: "hope", text: "Gottes Wirken setzt sich durch.", zone: "sache" }
    ],
    hint: "Bildebene ist das erzaehlte Bild. Sachebene ist die Deutung."
  },
  {
    id: 4,
    kind: "order",
    type: "Sektor 4",
    title: "Route legen",
    image: "archive",
    text: "Ordne die Route zur Deutung.",
    fragment: "Erst lesen. Dann deuten. Am Ende übertragen.",
    action: "Deutungsroute ordnen",
    steps: [
      { id: "read", text: "Text lesen" },
      { id: "levels", text: "Bild/Sache trennen" },
      { id: "form", text: "Form bestimmen" },
      { id: "transfer", text: "Transfer wagen" },
      { id: "point", text: "Pointe finden" }
    ],
    answer: ["read", "form", "levels", "point", "transfer"],
    hint: "Zuerst verstehen, was im Text passiert; erst danach uebertragen."
  },
  {
    id: 5,
    kind: "choice",
    type: "Sektor 5",
    title: "Kerncode wählen",
    image: "fragments",
    text: "Welche Deutung öffnet die Schleuse?",
    fragment: "Gleichnisse machen Gottes Reich erzählbar.",
    action: "Deutung bewerten",
    choices: [
      {
        text: "Gleichnisse machen Gottes Wirken erzählbar.",
        correct: true,
        explain: "Das verbindet Bild, Handlung und Deutung, ohne die Aussage auf einen Merksatz zu verkleinern."
      },
      {
        text: "Gleichnisse sind geheime Regeln.",
        correct: false,
        explain: "Der Grundlagentext warnt davor, Gleichnisse auf einfache Lehrsaetze zu reduzieren."
      },
      {
        text: "Jede Figur ist historisch exakt.",
        correct: false,
        explain: "Das waere eine zu enge allegorische Lesart und passt nicht zu allen Formen."
      }
    ],
    hint: "Die staerkste Deutung nimmt Bildhaftigkeit, Pointe und Transfer zusammen."
  },
  {
    id: 6,
    kind: "diagnosis",
    type: "Sektor 6",
    title: "Finale Diagnose",
    image: "privacy",
    text: "Warum ist Deuten manchmal schwer?",
    fragment: "Nicht jede Form ist gleich leicht zu knacken.",
    action: "Schwierigkeit beurteilen",
    choices: [
      {
        text: "Allegorien sind heikel: viele Details brauchen begründete Deutung.",
        correct: true,
        explain: "Der Grundlagentext beschreibt die Allegorie als Zug-um-Zug-Deutung einzelner Personen und Umstaende."
      },
      {
        text: "Beispielgeschichten sind Zufall und unlösbar.",
        correct: false,
        explain: "Beispielgeschichten bieten einen Musterfall; schwierig ist eher die verantwortete Uebertragung."
      },
      {
        text: "Parabeln sind leicht, weil sie nie irritieren.",
        correct: false,
        explain: "Gerade die irritierende Pointe verlangt genaue Analyse."
      }
    ],
    hint: "Achte darauf, ob eine Form ein einziges Bild, eine Pointe, ein Beispiel oder viele Einzelzuordnungen verlangt."
  },
  {
    id: 7,
    kind: "wordsearch",
    type: "Sektor 7",
    title: "Suchsel der Deutung",
    image: "forms",
    text: "Finde sechs Schlüsselwörter im Raster.",
    fragment: "Tippe die Buchstaben eines Wortes der Reihe nach an.",
    action: "Suchsel lösen",
    time: 120,
    words: ["GLEICHNIS", "PARABEL", "BILD", "SACHE", "POINTE", "TRANSFER"],
    hint: "Suche waagerecht und senkrecht. Beginne bei einem Anfangsbuchstaben aus der Wortliste."
  },
  {
    id: 8,
    kind: "runner",
    type: "Sektor 8",
    title: "Archiv-Run",
    image: "archive",
    text: "Sammle drei Splitter. Weiche Firewalls aus.",
    fragment: "Sprung steuert den Avatar. Drei Splitter öffnen das Archiv.",
    action: "Archiv-Run abschließen",
    time: 75,
    goal: 3,
    hint: "Springe früh. Splitter bringen Fortschritt, Firewalls kosten Zeit."
  }
];

const GameState = {
  missionIndex: 0,
  points: 0,
  time: MAX_TIME,
  maxTime: MAX_TIME,
  log: [],
  logCounter: 0,
  sessionStart: 0,
  attempts: 0,
  timerId: null,
  transitionId: null,
  missionLocked: false,
  lastFailureAt: 0,
  lastFailureSignature: "",
  exporting: false,
  selectedCardId: null,
  placements: {},
  headingAnswers: {},
  orderedIds: [],
  wordsearch: {
    selected: [],
    found: [],
    vector: null
  },
  finished: false,
  runner: {
    running: false,
    x: 92,
    y: 0,
    vy: 0,
    ground: 112,
    frame: 0,
    obstacleX: 760,
    shardX: 420,
    shardPulse: 0,
    speed: 4.8,
    shake: 0,
    particles: [],
    score: 0,
    lives: 3,
    invulnerable: 0,
    collected: 0,
    missionCollected: 0,
    activeMission: false
  },
  music: {
    active: false,
    context: null,
    master: null,
    timer: null,
    step: 0
  }
};

const els = {
  intro: document.querySelector("#intro"),
  game: document.querySelector("#game"),
  results: document.querySelector("#results"),
  startGame: document.querySelector("#startGame"),
  levelLabel: document.querySelector("#levelLabel"),
  pointsLabel: document.querySelector("#pointsLabel"),
  timeLabel: document.querySelector("#timeLabel"),
  timerProgress: document.querySelector("#timerProgress"),
  logLabel: document.querySelector("#logLabel"),
  progressBar: document.querySelector("#progressBar"),
  missionType: document.querySelector("#missionType"),
  missionTitle: document.querySelector("#missionTitle"),
  missionText: document.querySelector("#missionText"),
  fragmentText: document.querySelector("#fragmentText"),
  feedback: document.querySelector("#feedback"),
  interactionPanel: document.querySelector("#interactionPanel"),
  visualPanel: document.querySelector("#visualPanel"),
  runnerCanvas: document.querySelector("#runnerCanvas"),
  jumpButton: document.querySelector("#jumpButton"),
  musicButton: document.querySelector("#musicButton"),
  privacyNote: document.querySelector("#privacyNote"),
  hintButton: document.querySelector("#hintButton"),
  retryButton: document.querySelector("#retryButton"),
  exportButton: document.querySelector("#exportButton"),
  clearLogButton: document.querySelector("#clearLogButton"),
  restartButton: document.querySelector("#restartButton"),
  finalExportButton: document.querySelector("#finalExportButton"),
  resultSummary: document.querySelector("#resultSummary"),
  finalPoints: document.querySelector("#finalPoints"),
  finalLogCount: document.querySelector("#finalLogCount")
};

function startGame() {
  clearPendingTransition();
  clearInterval(GameState.timerId);
  stopMusic();
  GameState.missionIndex = 0;
  GameState.points = 0;
  GameState.log = [];
  GameState.logCounter = 0;
  GameState.sessionStart = Date.now();
  GameState.finished = false;
  GameState.missionLocked = false;
  GameState.lastFailureAt = 0;
  GameState.lastFailureSignature = "";
  GameState.runner.score = 0;
  GameState.runner.lives = 3;
  GameState.runner.collected = 0;
  GameState.runner.missionCollected = 0;
  logEvent("Spielstart", "info", 0, "-");
  els.intro.classList.add("hidden");
  els.results.classList.add("hidden");
  els.game.classList.remove("hidden");
  startMission(0);
}

function startMission(index) {
  clearPendingTransition();
  clearInterval(GameState.timerId);
  GameState.missionIndex = Math.max(0, Math.min(index, missions.length - 1));
  const mission = currentMission();
  GameState.maxTime = mission.time || MAX_TIME;
  GameState.time = GameState.maxTime;
  GameState.attempts = 0;
  GameState.missionLocked = false;
  GameState.lastFailureAt = 0;
  GameState.lastFailureSignature = "";
  GameState.selectedCardId = null;
  GameState.placements = {};
  GameState.headingAnswers = {};
  GameState.orderedIds = [];
  GameState.wordsearch.selected = [];
  GameState.wordsearch.found = [];
  GameState.wordsearch.vector = null;
  renderMission();
  updateHud();
  startTimer();
}

function startTimer() {
  clearInterval(GameState.timerId);
  GameState.timerId = setInterval(() => {
    if (GameState.missionLocked || GameState.finished) return;
    GameState.time -= 1;
    if (GameState.time <= 0) {
      GameState.time = 0;
      GameState.missionLocked = true;
      clearInterval(GameState.timerId);
      applyScore(false);
      logEvent("Timer Ablauf", "fail", -5, "Zeit ueberschritten");
      showFeedback(false, "Zeit abgelaufen. Die Mission wird als nicht bestanden geloggt.");
      updateHud();
      setMissionActionsDisabled(true);
      GameState.transitionId = setTimeout(nextMission, 1000);
      return;
    }
    updateHud();
  }, 1000);
}

function renderMission() {
  const mission = currentMission();
  els.missionType.textContent = mission.type;
  els.missionTitle.textContent = mission.title;
  els.missionText.textContent = mission.text;
  els.fragmentText.textContent = mission.fragment || mission.quote || "";
  els.feedback.className = "feedback";
  els.feedback.textContent = "";
  els.interactionPanel.replaceChildren();
  configureRunnerStage(mission);
  renderVisual(mission);
  if (mission.kind === "runner") prepareRunnerForMission();

  if (mission.kind === "heading") renderHeadingMission(mission);
  if (mission.kind === "classify" || mission.kind === "binary") renderMatchMission(mission);
  if (mission.kind === "order") renderOrderMission(mission);
  if (mission.kind === "choice" || mission.kind === "diagnosis") renderChoiceMission(mission);
  if (mission.kind === "wordsearch") renderWordsearchMission(mission);
  if (mission.kind === "runner") renderRunnerMission(mission);
}

function renderVisual(mission) {
  const src = imageSources[mission.image] || imageSources.archive;
  const scene = document.createElement("div");
  scene.className = "scene";
  scene.classList.add(`scene-${safeClassToken(mission.image)}`);

  const img = document.createElement("img");
  img.className = "scene-img";
  img.src = src;
  img.alt = mission.title;
  img.addEventListener("error", () => {
    img.remove();
    scene.classList.add("scene-fallback");
    logEvent("Asset", "fail", 0, "Bild lokal nicht gefunden");
  }, { once: true });

  const scanline = document.createElement("div");
  scanline.className = "scanline";

  const symbol = document.createElement("div");
  symbol.className = "scene-symbol";
  symbol.textContent = sceneSymbol(mission.image);

  const caption = document.createElement("div");
  caption.className = "scene-caption";
  const captionStrong = document.createElement("strong");
  captionStrong.textContent = mission.type;
  const captionText = document.createElement("span");
  captionText.textContent = mission.title;
  caption.append(captionStrong, captionText);

  scene.append(img, scanline, symbol, caption);
  els.visualPanel.replaceChildren(scene);
}

function sceneSymbol(key) {
  const symbols = { archive: "ARCHIV", fragments: "TEXT", sower: "SAAT", forms: "FORM", privacy: "LOKAL" };
  return symbols[key] || "CODE";
}

function safeClassToken(value) {
  return String(value || "archive").replace(/[^a-z0-9_-]/gi, "");
}

function renderHeadingMission(mission) {
  const wrap = document.createElement("div");
  wrap.className = "puzzle-stack";
  mission.items.forEach((item, index) => {
    const block = document.createElement("section");
    block.className = "quote-puzzle";
    const quote = document.createElement("p");
    quote.textContent = item.quote;
    block.appendChild(quote);
    const buttons = document.createElement("div");
    buttons.className = "choice-row";
    shuffleArray(item.options).forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mini-choice";
      button.textContent = option;
      button.addEventListener("click", () => safeInteraction(() => {
        GameState.headingAnswers[index] = option;
        buttons.querySelectorAll("button").forEach((el) => el.classList.remove("selected"));
        button.classList.add("selected");
      }));
      buttons.appendChild(button);
    });
    block.appendChild(buttons);
    wrap.appendChild(block);
  });
  wrap.appendChild(actionButton("Code prüfen", () => checkHeadingMission(mission)));
  els.interactionPanel.appendChild(wrap);
}

function renderMatchMission(mission) {
  const cards = document.createElement("div");
  cards.className = "card-grid";
  shuffleArray(mission.cards).forEach((card) => cards.appendChild(createCard(card)));

  const zones = document.createElement("div");
  zones.className = "drop-grid";
  mission.zones.forEach((zone) => zones.appendChild(createZone(zone)));

  els.interactionPanel.append(
    paragraph("Tippe Karte, dann Zielfeld."),
    cards,
    zones,
    actionButton("Schleuse prüfen", () => checkMatchMission(mission))
  );
}

function renderOrderMission(mission) {
  GameState.orderedIds = shuffledIds(mission.steps, mission.answer);
  const list = document.createElement("div");
  list.className = "order-list";
  GameState.orderedIds.forEach((id, index) => {
    const step = mission.steps.find((item) => item.id === id);
    list.appendChild(createOrderItem(step, index));
  });
  els.interactionPanel.append(
    paragraph("Bringe die Route in Ordnung."),
    list,
    actionButton("Route prüfen", () => checkOrderMission(mission))
  );
}

function renderChoiceMission(mission) {
  const choices = document.createElement("div");
  choices.className = "choice-grid";
  shuffleArray(mission.choices).forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => safeInteraction(() => chooseAnswer(mission, choice, button)));
    choices.appendChild(button);
  });
  els.interactionPanel.append(paragraph("Wähle den stärksten Code."), choices);
}

function renderWordsearchMission(mission) {
  const grid = buildWordsearchGrid();

  const wrap = document.createElement("div");
  wrap.className = "wordsearch-wrap";

  const board = document.createElement("div");
  board.className = "wordsearch-grid";
  grid.forEach((row, y) => {
    [...row].forEach((letter, x) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "word-cell";
      cell.textContent = letter;
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      cell.addEventListener("click", () => safeInteraction(() => selectWordCell(cell, mission)));
      board.appendChild(cell);
    });
  });

  const list = document.createElement("div");
  list.className = "word-list";
  mission.words.forEach((word) => {
    const badge = document.createElement("span");
    badge.textContent = word;
    badge.dataset.word = word;
    list.appendChild(badge);
  });

  wrap.append(paragraph("120 Sekunden: waagerecht und senkrecht."), board, list);
  els.interactionPanel.appendChild(wrap);
}

function renderRunnerMission(mission) {
  const panel = document.createElement("div");
  panel.className = "runner-briefing";
  const goal = document.createElement("p");
  goal.className = "instruction";
  goal.textContent = `Ziel: ${mission.goal} Splitter sammeln.`;
  const rule = document.createElement("p");
  rule.textContent = "Springe über Firewalls. Jeder Splitter bringt Fortschritt.";
  const meter = document.createElement("div");
  meter.className = "runner-meter";
  const meterBar = document.createElement("span");
  meterBar.id = "runnerGoalBar";
  meter.appendChild(meterBar);
  const start = actionButton("Run starten", () => {
    start.disabled = true;
    start.textContent = "Run läuft";
    startRunnerMission(mission);
  });
  panel.append(goal, rule, meter, start);
  els.interactionPanel.appendChild(panel);
  updateRunnerGoalBar();
}

function createCard(card) {
  const el = document.createElement("button");
  el.className = "draggable";
  el.type = "button";
  el.textContent = card.text;
  el.dataset.cardId = card.id;
  el.addEventListener("click", () => selectCard(card.id));
  el.addEventListener("pointerdown", (event) => beginDrag(event, card.id));
  return el;
}

function createZone(zone) {
  const el = document.createElement("button");
  el.className = "drop-zone";
  el.type = "button";
  el.dataset.zoneId = zone.id;
  const title = document.createElement("h3");
  title.textContent = zone.label;
  const items = document.createElement("div");
  items.className = "zone-items";
  items.dataset.itemsFor = zone.id;
  el.append(title, items);
  el.addEventListener("click", () => placeSelected(zone.id));
  return el;
}

function createOrderItem(step, index) {
  const item = document.createElement("div");
  item.className = "order-item";
  item.dataset.stepId = step.id;
  const number = document.createElement("span");
  number.className = "order-number";
  number.textContent = String(index + 1);
  const text = document.createElement("p");
  text.textContent = step.text;
  const actions = document.createElement("div");
  actions.className = "order-actions";
  const up = document.createElement("button");
  up.type = "button";
  up.setAttribute("aria-label", "Nach oben");
  up.textContent = "Auf";
  const down = document.createElement("button");
  down.type = "button";
  down.setAttribute("aria-label", "Nach unten");
  down.textContent = "Ab";
  actions.append(up, down);
  item.append(number, text, actions);
  up.addEventListener("click", () => safeInteraction(() => moveStep(step.id, -1)));
  down.addEventListener("click", () => safeInteraction(() => moveStep(step.id, 1)));
  return item;
}

function moveStep(id, delta) {
  const index = GameState.orderedIds.indexOf(id);
  const next = index + delta;
  if (next < 0 || next >= GameState.orderedIds.length) return;
  const ids = GameState.orderedIds;
  [ids[index], ids[next]] = [ids[next], ids[index]];
  refreshOrderList();
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffledIds(items, correctOrder) {
  let ids = shuffleArray(items).map((item) => item.id);
  const sameAsAnswer = ids.every((id, index) => id === correctOrder[index]);
  if (sameAsAnswer && ids.length > 1) {
    [ids[0], ids[1]] = [ids[1], ids[0]];
  }
  return ids;
}

function buildWordsearchGrid() {
  const size = 10;
  const filler = [
    "X", "Q", "W", "T", "Z", "K", "L", "M", "O", "N",
    "D", "E", "U", "T", "U", "N", "G", "R", "A", "S"
  ];
  const grid = Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) => filler[(x + y * 3) % filler.length]));
  const placements = [
    { word: "GLEICHNIS", x: 0, y: 0, dx: 1, dy: 0 },
    { word: "PARABEL", x: 9, y: 1, dx: 0, dy: 1 },
    { word: "BILD", x: 1, y: 2, dx: 1, dy: 0 },
    { word: "SACHE", x: 0, y: 3, dx: 0, dy: 1 },
    { word: "POINTE", x: 3, y: 5, dx: 1, dy: 0 },
    { word: "TRANSFER", x: 1, y: 9, dx: 1, dy: 0 }
  ];

  placements.forEach((placement) => {
    [...placement.word].forEach((letter, index) => {
      const x = placement.x + placement.dx * index;
      const y = placement.y + placement.dy * index;
      grid[y][x] = letter;
    });
  });

  return grid.map((row) => row.join(""));
}

function selectWordCell(cell, mission) {
  if (cell.classList.contains("found") || GameState.wordsearch.selected.includes(cell)) return;
  if (!isValidWordsearchStep(cell)) {
    resetWordsearchSelection();
    failMission("Suchsel Auswahl", "Wörter müssen in einer geraden Nachbarlinie markiert werden.");
    return;
  }

  cell.classList.add("selected");
  GameState.wordsearch.selected.push(cell);
  const current = GameState.wordsearch.selected.map((item) => item.textContent).join("");
  const remaining = mission.words.filter((word) => !GameState.wordsearch.found.includes(word));
  const exact = remaining.find((word) => word === current);
  const possible = remaining.some((word) => word.startsWith(current));

  if (exact) {
    GameState.wordsearch.found.push(exact);
    GameState.wordsearch.selected.forEach((item) => {
      item.classList.remove("selected");
      item.classList.add("found");
      item.disabled = true;
    });
    const badge = findByDataset("[data-word]", "word", exact);
    if (badge) badge.classList.add("found");
    GameState.wordsearch.selected = [];
    GameState.wordsearch.vector = null;
    GameState.points += 4;
    GameState.time = Math.min(GameState.maxTime, GameState.time + 3);
    logEvent("Suchsel Wort", "korrekt", 4, exact);
    showFeedback(true, `${exact} gefunden. +4 Punkte.`);
    updateHud();
    if (GameState.wordsearch.found.length === mission.words.length) {
      completeMission(mission.action, true, "Alle Schlüsselwörter gefunden.");
    }
    return;
  }

  if (!possible || current.length > 10) {
    resetWordsearchSelection();
    failMission("Suchsel Auswahl", "Diese Buchstabenfolge ist kein gesuchtes Wort.");
  }
}

function isValidWordsearchStep(cell) {
  const selected = GameState.wordsearch.selected;
  if (selected.length === 0) return true;
  const previous = selected[selected.length - 1];
  const dx = Number(cell.dataset.x) - Number(previous.dataset.x);
  const dy = Number(cell.dataset.y) - Number(previous.dataset.y);
  const stepX = Math.sign(dx);
  const stepY = Math.sign(dy);
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || (stepX === 0 && stepY === 0)) return false;
  if (stepX !== 0 && stepY !== 0) return false;

  if (selected.length === 1) {
    GameState.wordsearch.vector = { x: stepX, y: stepY };
    return true;
  }

  const vector = GameState.wordsearch.vector;
  return Boolean(vector && vector.x === stepX && vector.y === stepY);
}

function resetWordsearchSelection() {
  GameState.wordsearch.selected.forEach((item) => item.classList.remove("selected"));
  GameState.wordsearch.selected = [];
  GameState.wordsearch.vector = null;
}

function findByDataset(selector, key, value) {
  return [...document.querySelectorAll(selector)].find((element) => element.dataset[key] === value) || null;
}

function refreshOrderList() {
  const mission = currentMission();
  const list = document.querySelector(".order-list");
  if (!list) return;
  list.replaceChildren();
  GameState.orderedIds.forEach((id, index) => {
    const step = mission.steps.find((item) => item.id === id);
    list.appendChild(createOrderItem(step, index));
  });
}

function beginDrag(event, cardId) {
  safeInteraction(() => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const original = findByDataset("[data-card-id]", "cardId", cardId);
    if (!original) return;
    original.setPointerCapture(event.pointerId);
    const ghost = original.cloneNode(true);
    const rect = original.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    let moved = false;
    ghost.classList.add("dragging");
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);

    const move = (moveEvent) => {
      const distance = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
      if (distance < 10 && !moved) return;
      moved = true;
      ghost.style.left = `${moveEvent.clientX - rect.width / 2}px`;
      ghost.style.top = `${moveEvent.clientY - rect.height / 2}px`;
      markDropTarget(moveEvent.clientX, moveEvent.clientY);
    };
    const end = (upEvent) => {
      original.releasePointerCapture(event.pointerId);
      cleanup();
      if (!moved) return;
      const target = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      const zone = target ? target.closest(".drop-zone") : null;
      if (zone) placeCard(cardId, zone.dataset.zoneId);
      else logEvent("Drag nicht ausgeloest", "fail", 0, "Keine Zielzone getroffen");
    };
    const cancel = () => {
      cleanup();
      logEvent("Drag nicht ausgeloest", "fail", 0, "Interaktion abgebrochen");
    };
    const cleanup = () => {
      original.removeEventListener("pointermove", move);
      original.removeEventListener("pointerup", end);
      original.removeEventListener("pointercancel", cancel);
      ghost.remove();
      clearDropTarget();
    };

    original.addEventListener("pointermove", move);
    original.addEventListener("pointerup", end);
    original.addEventListener("pointercancel", cancel);
  });
}

function selectCard(cardId) {
  const card = findByDataset("[data-card-id]", "cardId", cardId);
  if (!card) return;
  GameState.selectedCardId = cardId;
  document.querySelectorAll(".draggable").forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
}

function placeSelected(zoneId) {
  if (GameState.selectedCardId) placeCard(GameState.selectedCardId, zoneId);
}

function placeCard(cardId, zoneId) {
  const mission = currentMission();
  const card = mission.cards.find((item) => item.id === cardId);
  const zoneItems = findByDataset("[data-items-for]", "itemsFor", zoneId);
  if (!card || !zoneItems) return;
  GameState.placements[cardId] = zoneId;
  document.querySelectorAll("[data-placed-card]").forEach((el) => {
    if (el.dataset.placedCard === cardId) el.remove();
  });
  const placed = document.createElement("div");
  placed.className = "placed-item";
  placed.textContent = card.text;
  placed.dataset.placedCard = cardId;
  zoneItems.appendChild(placed);
  document.querySelectorAll(".draggable").forEach((item) => item.classList.remove("selected"));
  GameState.selectedCardId = null;
}

function checkHeadingMission(mission) {
  const complete = mission.items.every((_, index) => GameState.headingAnswers[index]);
  if (!complete) return failMission(mission.action, "Noch nicht alle Textinseln haben eine Ueberschrift.");
  const correct = mission.items.every((item, index) => GameState.headingAnswers[index] === item.answer);
  completeMission(mission.action, correct, correct
    ? "Code stabil."
    : `Mindestens eine Ueberschrift passt noch nicht. ${mission.hint}`);
}

function checkMatchMission(mission) {
  const complete = mission.cards.every((card) => GameState.placements[card.id]);
  if (!complete) return failMission(mission.action, "Noch nicht alle Karten sind zugeordnet.");
  const correct = mission.cards.every((card) => GameState.placements[card.id] === card.zone);
  completeMission(mission.action, correct, correct
    ? "Schleuse offen."
    : `Zuordnung fehlerhaft. ${mission.hint}`);
}

function checkOrderMission(mission) {
  const correct = mission.answer.every((id, index) => GameState.orderedIds[index] === id);
  completeMission(mission.action, correct, correct
    ? "Route aktiv."
    : `Die Route springt noch zu frueh in die Deutung. ${mission.hint}`);
}

function chooseAnswer(mission, choice, button) {
  if (choice.correct) {
    document.querySelectorAll(".choice").forEach((el) => {
      el.disabled = true;
      const data = mission.choices.find((item) => item.text === el.textContent);
      if (data && data.correct) el.classList.add("correct");
    });
    button.classList.add("correct");
    completeMission(mission.action, true, choice.explain);
    return;
  }

  button.classList.add("wrong");
  button.disabled = true;
  failMission(mission.action, choice.explain);
}

function completeMission(action, correct, message) {
  if (!correct) {
    failMission(action, message);
    return;
  }
  if (GameState.missionLocked) return;
  GameState.missionLocked = true;
  GameState.attempts += 1;
  applyScore(true);
  logEvent(action, "korrekt", 12, "-");
  showFeedback(true, hintAfterAttempts(message));
  setMissionActionsDisabled(true);
  clearInterval(GameState.timerId);
  GameState.transitionId = setTimeout(nextMission, 1100);
}

function failMission(action, message) {
  if (GameState.missionLocked || shouldThrottleFailure(action, message)) return;
  GameState.attempts += 1;
  applyScore(false);
  logEvent(action, "falsch", -5, message);
  showFeedback(false, hintAfterAttempts(message));
}

function shouldThrottleFailure(action, message) {
  const now = performance.now();
  const signature = `${GameState.missionIndex}|${action}|${message}`;
  const repeated = GameState.lastFailureSignature === signature && now - GameState.lastFailureAt < 800;
  GameState.lastFailureSignature = signature;
  GameState.lastFailureAt = now;
  return repeated;
}

function applyScore(correct) {
  if (correct) {
    GameState.points += 12;
    GameState.time = Math.min(GameState.maxTime, GameState.time + 5);
    GameState.runner.score += 1;
  } else {
    GameState.points = Math.max(0, GameState.points - 5);
    GameState.time = Math.max(0, GameState.time - 5);
  }
  updateHud();
}

function hintAfterAttempts(message) {
  if (GameState.attempts >= 2) return `${message} Hinweis: ${currentMission().hint}`;
  return message;
}

function showFeedback(correct, message) {
  els.feedback.className = `feedback ${correct ? "good" : "bad"}`;
  els.feedback.textContent = message;
}

function nextMission() {
  GameState.transitionId = null;
  const next = GameState.missionIndex + 1;
  if (next >= missions.length) finishGame();
  else startMission(next);
}

function clearPendingTransition() {
  if (GameState.transitionId) {
    clearTimeout(GameState.transitionId);
    GameState.transitionId = null;
  }
}

function setMissionActionsDisabled(disabled) {
  els.interactionPanel.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

function retryMission() {
  if (GameState.missionLocked) return;
  clearPendingTransition();
  GameState.runner.running = false;
  GameState.runner.activeMission = false;
  failMission("Retry", "Mission neu gestartet; Zeitverlust wurde geloggt.");
  GameState.transitionId = setTimeout(() => startMission(GameState.missionIndex), 450);
}

function showHint() {
  if (GameState.missionLocked) return;
  GameState.attempts += 1;
  logEvent("Hinweis", "info", 0, "Didaktischer Hinweis ohne personenbezogene Daten");
  showFeedback(false, currentMission().hint);
}

function finishGame() {
  clearPendingTransition();
  clearInterval(GameState.timerId);
  GameState.finished = true;
  GameState.runner.running = false;
  GameState.runner.activeMission = false;
  els.game.classList.add("hidden");
  els.results.classList.remove("hidden");
  els.finalPoints.textContent = GameState.points;
  els.finalLogCount.textContent = GameState.log.length;
  els.resultSummary.textContent = GameState.points >= 50
    ? "Alle Codes sitzen. Das Archiv ist offen."
    : "Archiv offen, aber einige Codes flackern.";
}

function updateHud() {
  const missionNumber = Math.min(GameState.missionIndex + 1, missions.length);
  els.levelLabel.textContent = `${missionNumber}/${missions.length}`;
  els.pointsLabel.textContent = GameState.points;
  els.timeLabel.textContent = `${GameState.time}s`;
  els.logLabel.textContent = GameState.log.length;
  els.progressBar.style.width = `${(missionNumber / missions.length) * 100}%`;
  const ratio = Math.max(0, Math.min(1, GameState.time / GameState.maxTime));
  els.timerProgress.style.strokeDashoffset = String(TIMER_CIRCUMFERENCE * (1 - ratio));
  els.timerProgress.style.stroke = ratio <= 0.2 ? "var(--red)" : "var(--accent)";
}

function markDropTarget(x, y) {
  clearDropTarget();
  const target = document.elementFromPoint(x, y);
  const zone = target ? target.closest(".drop-zone") : null;
  if (zone) zone.classList.add("over");
}

function clearDropTarget() {
  document.querySelectorAll(".drop-zone").forEach((zone) => zone.classList.remove("over"));
}

function currentMission() {
  return missions[GameState.missionIndex];
}

function logEvent(action, result, pointChange, error) {
  GameState.logCounter += 1;
  GameState.log.push({
    time: relativeSessionTime(),
    step: GameState.logCounter,
    mission: GameState.missionIndex + 1,
    action,
    result,
    points: pointChange > 0 ? `+${pointChange}` : String(pointChange),
    timeStatus: `${GameState.time}s`,
    error: error || "-"
  });
  if (els.logLabel) els.logLabel.textContent = GameState.log.length;
}

function relativeSessionTime() {
  if (!GameState.sessionStart) return "T+00:00";
  const elapsed = Math.max(0, Math.floor((Date.now() - GameState.sessionStart) / 1000));
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  return `T+${minutes}:${seconds}`;
}

function removeLegacyLocalLog() {
  try {
    window.localStorage?.removeItem(LEGACY_LOG_KEY);
  } catch (error) {
    // Intentionally ignored: deletion is a privacy cleanup, not gameplay state.
  }
}

function clearLocalLog() {
  removeLegacyLocalLog();
  GameState.log = [];
  GameState.logCounter = 0;
  updateHud();
  showFeedback(true, "Protokoll im Speicher wurde geloescht. Es werden keine Logs automatisch gespeichert.");
}

function exportTXT() {
  if (GameState.exporting) return;
  GameState.exporting = true;
  try {
    logEvent("TXT Export", "korrekt", 0, "-");
    const blob = new Blob([buildLogText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "code-der-gleichnisse-log.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    logEvent("UI-Interaktionsfehler", "fail", 0, "Export fehlgeschlagen");
    showFeedback(false, "Export konnte nicht gestartet werden.");
  } finally {
    setTimeout(() => {
      GameState.exporting = false;
    }, 600);
  }
}

function buildLogText() {
  const rows = GameState.log.map((entry) => (
    `${entry.step} | ${entry.time} | Mission ${entry.mission} | ${entry.action} | ${entry.result} | ${entry.points} | ${entry.timeStatus} | ${entry.error}`
  ));
  return [
    "Spiel: Code der Gleichnisse - Offline Edition",
    "Export: lokal durch Nutzeraktion",
    "Zeitformat: relative Spieldauer, keine echte Uhrzeit",
    "Geraet: nicht erfasst",
    "Offline-Modus: aktiv",
    "Datenschutz: keine Namen, keine Freitexte, keine Netzwerkuebertragung, keine automatische Speicherung.",
    "",
    ...rows
  ].join("\n");
}

function safeInteraction(fn) {
  try {
    fn();
  } catch (error) {
    logEvent("UI-Interaktionsfehler", "fail", 0, "Interaktion fehlgeschlagen");
    showFeedback(false, "Interaktion fehlgeschlagen. Nutze die Tap-Alternative.");
  }
}

function configureRunnerStage(mission) {
  const isRunner = mission.kind === "runner";
  const stage = document.querySelector(".runner-stage");
  if (stage) {
    stage.classList.toggle("hidden", !isRunner);
    stage.classList.toggle("runner-focus", isRunner);
  }
  GameState.runner.activeMission = false;
  GameState.runner.running = false;
}

function prepareRunnerForMission() {
  GameState.runner.obstacleX = 760 - (GameState.missionIndex * 46) % 280;
  GameState.runner.shardX = 360 + (GameState.missionIndex * 73) % 330;
  GameState.runner.shardPulse = 0;
  GameState.runner.particles = [];
  GameState.runner.shake = 0;
  GameState.runner.speed = 4.8;
  GameState.runner.missionCollected = 0;
  GameState.runner.lives = 3;
  updateRunnerGoalBar();
}

function startRunnerMission(mission) {
  if (GameState.runner.running) return;
  GameState.runner.activeMission = true;
  startRunner();
  logEvent("Archiv-Run Start", "info", 0, `Ziel ${mission.goal} Splitter`);
  showFeedback(true, "Run aktiv: Sammle drei Splitter.");
}

function startRunner() {
  if (!els.runnerCanvas || GameState.runner.running) return;
  GameState.runner.running = true;
  GameState.runner.ground = els.runnerCanvas.height - 38;
  GameState.runner.y = GameState.runner.ground;
  requestAnimationFrame(drawRunner);
}

function jumpRunner() {
  const runner = GameState.runner;
  if (!runner.activeMission) return;
  if (runner.y >= runner.ground - 1) {
    runner.vy = -15.5;
    logEvent("Archiv-Run Sprung", "info", 0, "-");
  }
}

function drawRunner() {
  if (!GameState.runner.running || !els.runnerCanvas) return;
  if (!GameState.runner.activeMission) {
    GameState.runner.running = false;
    return;
  }
  const canvas = els.runnerCanvas;
  const ctx = canvas.getContext("2d");
  const runner = GameState.runner;
  const w = canvas.width;
  const h = canvas.height;
  const ground = h - 38;
  runner.ground = ground;
  runner.frame += 1;
  runner.shardPulse += 0.08;
  runner.vy += 0.72;
  runner.y = Math.min(runner.ground, runner.y + runner.vy);
  if (runner.y >= runner.ground) runner.vy = 0;
  if (runner.invulnerable > 0) runner.invulnerable -= 1;
  if (runner.shake > 0) runner.shake -= 1;
  runner.obstacleX -= runner.speed;
  runner.shardX -= runner.speed * 0.72;
  if (runner.obstacleX < -40) runner.obstacleX = w + 120 + Math.random() * 220;
  if (runner.shardX < -30) runner.shardX = w + 80 + Math.random() * 260;
  updateRunnerParticles();
  resolveRunnerCollisions();

  ctx.save();
  if (runner.shake > 0) {
    ctx.translate((Math.random() - 0.5) * runner.shake, (Math.random() - 0.5) * runner.shake * 0.45);
  }
  drawRunnerBackground(ctx, w, h, runner);
  drawRunnerTrack(ctx, w, h, runner);
  drawRunnerShard(ctx, runner);
  drawRunnerObstacle(ctx, runner);
  drawRunnerPlayer(ctx, runner);
  drawRunnerParticles(ctx);
  ctx.restore();
  drawRunnerHud(ctx, w, runner);

  requestAnimationFrame(drawRunner);
}

function drawRunnerBackground(ctx, w, h, runner) {
  const sky = ctx.createLinearGradient(0, 0, w, h);
  sky.addColorStop(0, "#071014");
  sky.addColorStop(0.42, "#103f41");
  sky.addColorStop(0.68, "#211421");
  sky.addColorStop(1, "#0f1213");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const core = ctx.createRadialGradient(w * 0.74, h * 0.38, 12, w * 0.74, h * 0.38, h * 0.95);
  core.addColorStop(0, "rgba(242, 201, 76, 0.38)");
  core.addColorStop(0.38, "rgba(0, 167, 181, 0.16)");
  core.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(242, 201, 76, 0.18)";
  ctx.lineWidth = 1;
  for (let x = -((runner.frame * 1.4) % 72); x < w; x += 72) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 160, h);
    ctx.stroke();
  }

  for (let i = 0; i < 9; i += 1) {
    const towerW = 34 + (i % 3) * 12;
    const towerH = 58 + (i % 4) * 16;
    const x = (i * 132 - runner.frame * (0.45 + i * 0.02)) % (w + 160) - 70;
    const y = runner.ground - towerH - 18;
    ctx.fillStyle = i % 2 ? "rgba(255,255,255,0.10)" : "rgba(0,167,181,0.16)";
    roundedRect(ctx, x, y, towerW, towerH, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(242, 201, 76, 0.34)";
    for (let wy = y + 12; wy < y + towerH - 8; wy += 17) {
      ctx.fillRect(x + 8, wy, towerW - 16, 3);
    }
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  for (let i = 0; i < 22; i += 1) {
    const x = (i * 61 - runner.frame * (0.25 + i * 0.01)) % (w + 40);
    const y = 18 + ((i * 29) % Math.max(24, runner.ground - 66));
    ctx.fillRect(x, y, 2 + (i % 3), 2);
  }
}

function drawRunnerTrack(ctx, w, h, runner) {
  const y = runner.ground + 15;
  const floor = ctx.createLinearGradient(0, runner.ground - 4, 0, h);
  floor.addColorStop(0, "rgba(242, 201, 76, 0.28)");
  floor.addColorStop(0.35, "rgba(0, 167, 181, 0.22)");
  floor.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, runner.ground - 4, w, h - runner.ground + 4);

  ctx.strokeStyle = "#f2c94c";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(w, y);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  for (let x = -((runner.frame * runner.speed) % 64); x < w; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, runner.ground + 24);
    ctx.lineTo(x + 34, h);
    ctx.stroke();
  }
}

function drawRunnerPlayer(ctx, runner) {
  const px = runner.x;
  const py = runner.y;
  const flicker = runner.invulnerable > 0 && runner.invulnerable % 12 < 6;
  const stride = Math.sin(runner.frame * 0.34) * 5;

  ctx.save();
  ctx.shadowColor = flicker ? "rgba(242, 201, 76, 0.9)" : "rgba(0, 167, 181, 0.65)";
  ctx.shadowBlur = flicker ? 18 : 12;
  ctx.fillStyle = flicker ? "#f2c94c" : "#f7fbff";
  roundedRect(ctx, px - 18, py - 54, 36, 42, 7);
  ctx.fill();

  ctx.fillStyle = "#101418";
  roundedRect(ctx, px - 11, py - 45, 22, 11, 5);
  ctx.fill();
  ctx.fillStyle = "#00d2df";
  ctx.fillRect(px - 7, py - 41, 14, 3);

  ctx.strokeStyle = "#f2c94c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px - 12, py - 13);
  ctx.lineTo(px - 22, py - 1 + stride);
  ctx.moveTo(px + 11, py - 13);
  ctx.lineTo(px + 22, py - 1 - stride);
  ctx.stroke();

  ctx.strokeStyle = "rgba(242, 201, 76, 0.42)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px, py - 34, 30, -0.2, Math.PI * 1.3);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(242, 201, 76, 0.28)";
  ctx.beginPath();
  ctx.ellipse(px - 10, py + 18, 36, 7, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawRunnerObstacle(ctx, runner) {
  const x = runner.obstacleX;
  const y = runner.ground - 58;
  ctx.save();
  ctx.shadowColor = "rgba(199, 53, 53, 0.75)";
  ctx.shadowBlur = 16;
  const gate = ctx.createLinearGradient(x, y, x + 38, y + 66);
  gate.addColorStop(0, "#ff6b57");
  gate.addColorStop(0.5, "#c73535");
  gate.addColorStop(1, "#5c1418");
  ctx.fillStyle = gate;
  roundedRect(ctx, x, y, 42, 66, 6);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.86)";
  for (let i = 0; i < 4; i += 1) {
    ctx.save();
    ctx.translate(x + 7, y + 10 + i * 14);
    ctx.rotate(-0.35);
    ctx.fillRect(0, 0, 30, 4);
    ctx.restore();
  }
  ctx.fillStyle = "#101418";
  ctx.fillRect(x + 10, y + 27, 22, 8);
  ctx.restore();
}

function drawRunnerShard(ctx, runner) {
  const pulse = Math.sin(runner.shardPulse) * 6;
  const x = runner.shardX;
  const y = runner.ground - 78 + pulse;
  ctx.save();
  ctx.shadowColor = "rgba(242, 201, 76, 0.82)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#f2c94c";
  ctx.beginPath();
  ctx.moveTo(x, y - 27);
  ctx.lineTo(x + 25, y);
  ctx.lineTo(x, y + 28);
  ctx.lineTo(x - 25, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#9a3f6a";
  ctx.beginPath();
  ctx.moveTo(x, y - 18);
  ctx.lineTo(x + 14, y);
  ctx.lineTo(x, y + 17);
  ctx.lineTo(x - 14, y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.76)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 33, y);
  ctx.lineTo(x + 33, y);
  ctx.moveTo(x, y - 36);
  ctx.lineTo(x, y + 36);
  ctx.stroke();
  ctx.restore();
}

function drawRunnerHud(ctx, w, runner) {
  const mission = currentMission();
  const goal = mission.kind === "runner" ? mission.goal : 3;
  ctx.save();
  ctx.fillStyle = "rgba(247, 251, 255, 0.92)";
  roundedRect(ctx, 18, 14, 256, 34, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(16, 20, 24, 0.42)";
  ctx.stroke();
  ctx.fillStyle = "#101418";
  ctx.font = "800 18px Verdana, Arial, sans-serif";
  ctx.fillText(`Splitter ${runner.missionCollected}/${goal}   Leben ${runner.lives}`, 34, 37);

  ctx.fillStyle = "rgba(247, 251, 255, 0.9)";
  roundedRect(ctx, w - 176, 14, 154, 34, 8);
  ctx.fill();
  ctx.fillStyle = "#101418";
  ctx.fillText("Tippen = Sprung", w - 160, 37);
  ctx.restore();
}

function spawnRunnerParticles(x, y, color, count) {
  const runner = GameState.runner;
  for (let i = 0; i < count; i += 1) {
    runner.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 4 - 1,
      life: 24 + Math.random() * 16,
      color,
      size: 2 + Math.random() * 4
    });
  }
}

function updateRunnerParticles() {
  const particles = GameState.runner.particles;
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.18;
    particle.life -= 1;
  }
  GameState.runner.particles = particles.filter((particle) => particle.life > 0);
}

function drawRunnerParticles(ctx) {
  for (const particle of GameState.runner.particles) {
    ctx.globalAlpha = Math.max(0, particle.life / 36);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function resolveRunnerCollisions() {
  const runner = GameState.runner;
  const player = { x: runner.x - 22, y: runner.y - 56, w: 44, h: 58 };
  const obstacle = { x: runner.obstacleX, y: runner.ground - 58, w: 42, h: 66 };
  const shard = { x: runner.shardX - 28, y: runner.ground - 110, w: 56, h: 72 };

  if (rectsOverlap(player, shard)) {
    spawnRunnerParticles(runner.shardX, runner.ground - 78, "#f2c94c", 18);
    runner.collected += 1;
    runner.missionCollected += 1;
    runner.score += 3;
    runner.speed = Math.min(6.4, runner.speed + 0.25);
    GameState.points += 3;
    GameState.time = Math.min(GameState.maxTime, GameState.time + 3);
    runner.shardX = (els.runnerCanvas?.width || 900) + Math.random() * 260;
    logEvent("Archiv-Run Splitter", "korrekt", 3, "-");
    updateRunnerGoalBar();
    const mission = currentMission();
    if (mission.kind === "runner" && runner.missionCollected >= mission.goal) {
      runner.activeMission = false;
      runner.running = false;
      completeMission(mission.action, true, "Drei Splitter gesammelt. Archiv-Run abgeschlossen.");
      return;
    }
    updateHud();
  }

  if (runner.invulnerable <= 0 && rectsOverlap(player, obstacle)) {
    spawnRunnerParticles(runner.obstacleX + 20, runner.ground - 30, "#ff6b57", 20);
    runner.shake = 10;
    runner.lives = Math.max(0, runner.lives - 1);
    runner.invulnerable = 80;
    GameState.points = Math.max(0, GameState.points - 3);
    GameState.time = Math.max(0, GameState.time - 3);
    runner.obstacleX = (els.runnerCanvas?.width || 900) + Math.random() * 240;
    logEvent("Archiv-Run Kollision", "falsch", -3, "Firewall getroffen");
    showFeedback(false, "Firewall getroffen: -3 Punkte, -3 Sekunden.");
    if (runner.lives === 0) {
      runner.lives = 3;
      runner.score = Math.max(0, runner.score - 5);
      logEvent("Archiv-Run Neustart", "fail", 0, "Run-Leben erneuert");
    }
    updateHud();
  }
}

function updateRunnerGoalBar() {
  const bar = document.querySelector("#runnerGoalBar");
  if (!bar) return;
  const mission = currentMission();
  const goal = mission.kind === "runner" ? mission.goal : 3;
  bar.style.width = `${Math.min(100, (GameState.runner.missionCollected / goal) * 100)}%`;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function toggleMusic() {
  if (GameState.music.active) {
    stopMusic();
  } else {
    startMusic();
  }
}

function startMusic() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  const audio = GameState.music;
  audio.context = audio.context || new AudioCtor();
  if (audio.context.state === "suspended") audio.context.resume();
  audio.master = audio.context.createGain();
  audio.master.gain.value = 0.055;
  audio.master.connect(audio.context.destination);
  audio.active = true;
  els.musicButton.textContent = "Musik aus";
  const notes = [220, 261.63, 329.63, 392, 440, 392, 329.63, 261.63];
  audio.timer = setInterval(() => {
    const now = audio.context.currentTime;
    const osc = audio.context.createOscillator();
    const gain = audio.context.createGain();
    osc.type = audio.step % 4 === 0 ? "triangle" : "sine";
    osc.frequency.value = notes[audio.step % notes.length];
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    osc.connect(gain);
    gain.connect(audio.master);
    osc.start(now);
    osc.stop(now + 0.46);
    audio.step += 1;
  }, 360);
  logEvent("Musik", "info", 0, "lokal erzeugt");
}

function stopMusic() {
  const audio = GameState.music;
  if (audio.timer) clearInterval(audio.timer);
  audio.timer = null;
  audio.active = false;
  if (audio.master) {
    audio.master.disconnect();
    audio.master = null;
  }
  els.musicButton.textContent = "Musik an";
}

function paragraph(text) {
  const p = document.createElement("p");
  p.className = "instruction";
  p.textContent = text;
  return p;
}

function actionButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-action";
  button.textContent = label;
  button.addEventListener("click", () => safeInteraction(handler));
  return button;
}

function initApp() {
  const missing = Object.entries(els)
    .filter(([, element]) => !element)
    .map(([name]) => name);
  if (missing.length > 0) {
    document.body.textContent = `Spiel konnte nicht gestartet werden. Fehlende UI-Elemente: ${missing.join(", ")}`;
    return;
  }

  removeLegacyLocalLog();
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.remove();
    }, { once: true });
  });

  els.startGame.addEventListener("click", startGame);
  els.restartButton.addEventListener("click", startGame);
  els.exportButton.addEventListener("click", exportTXT);
  els.finalExportButton.addEventListener("click", exportTXT);
  els.retryButton.addEventListener("click", retryMission);
  els.hintButton.addEventListener("click", showHint);
  els.clearLogButton.addEventListener("click", clearLocalLog);
  els.jumpButton.addEventListener("click", jumpRunner);
  els.runnerCanvas.addEventListener("pointerdown", jumpRunner);
  els.musicButton.addEventListener("click", toggleMusic);
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      jumpRunner();
    }
  });

  els.timerProgress.style.strokeDasharray = String(TIMER_CIRCUMFERENCE);
  els.privacyNote.textContent = PRIVACY_MODE
    ? "Offline. Keine Namen. Keine automatische Speicherung. Export nur auf Knopfdruck."
    : "Offline-Modus.";
  document.querySelector(".runner-stage")?.classList.add("hidden");
  updateHud();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
}
})();
