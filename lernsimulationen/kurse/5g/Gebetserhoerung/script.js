const STORAGE_KEY = "tal-der-lichtspuren-rpg-v4";
const MEMORY_REVEAL_MS = 900;
const TOTAL_STARS = 10;

const mapStart = { left: 56, top: 90 };

const characters = [
  {
    id: "lio",
    name: "Lio",
    role: "Mutmacher",
    image: "assets/char-lio.png",
    vibe: "geht gern voran",
    perk: "Lio sagt: Wir probieren es einfach."
  },
  {
    id: "mira",
    name: "Mira",
    role: "Leise Hörerin",
    image: "assets/char-mira.png",
    vibe: "hört gut zu",
    perk: "Mira merkt kleine Zeichen."
  },
  {
    id: "nuri",
    name: "Nuri",
    role: "Fragenfreundin",
    image: "assets/char-nuri.png",
    vibe: "fragt gern nach",
    perk: "Nuri findet neue Ideen."
  },
  {
    id: "theo",
    name: "Theo",
    role: "Ruhefinder",
    image: "assets/char-theo.png",
    vibe: "bleibt ruhig",
    perk: "Theo denkt in Ruhe nach."
  }
];

const stops = [
  {
    id: "echoes",
    label: "Wiese der Stimmen",
    title: "Viele Stimmen auf einer Wiese",
    scene: "assets/scene-echoes.png",
    map: { left: 30, top: 62 },
    story: [
      "Auf der Wiese sitzen drei Kinder im Gras. Sie reden über das Beten.",
      "Ein Kind erzählt von guten Erfahrungen. Ein anderes Kind ist unsicher. Ein drittes Kind zweifelt.",
      "Deine Figur merkt: Schon hier gibt es nicht nur eine Meinung. Manche sind froh, manche vorsichtig und manche haben Fragen."
    ],
    task: "Welche Aussage passt am besten zu diesem Ort?",
    choices: [
      {
        title: "Alle müssen gleich denken.",
        text: "Nur eine Meinung darf richtig sein.",
        correct: false
      },
      {
        title: "Menschen denken verschieden.",
        text: "Darum ist Zuhören wichtig.",
        correct: true
      },
      {
        title: "Nur fröhliche Gedanken zählen.",
        text: "Unsicherheit ist nicht wichtig.",
        correct: false
      },
      {
        title: "Fragen sind hier verboten.",
        text: "Man darf nicht zweifeln.",
        correct: false
      }
    ],
    reward: "⭐ Stern 1: Gut zuhören",
    feedback: "Genau. Beim Thema Gebetserhörung gibt es verschiedene Erfahrungen, Fragen und Gefühle.",
    game: {
      type: "stars",
      title: "Mini-Spiel: Sternensuche",
      help: "Finde die 3 leuchtenden Sterne im Bild. Tippe sie nacheinander an.",
      spots: [
        { id: "s1", left: 20, top: 26 },
        { id: "s2", left: 77, top: 23 },
        { id: "s3", left: 58, top: 70 }
      ]
    }
  },
  {
    id: "arena",
    label: "Platz der Wünsche",
    title: "Zwei Teams, ein Spiel",
    scene: "assets/scene-arena.png",
    map: { left: 45, top: 77 },
    story: [
      "Auf dem Platz stehen zwei Teams vor einem Spiel. Beide wollen gewinnen.",
      "Ein Kind aus dem ersten Team flüstert ein Gebet. Ein Kind aus dem zweiten Team macht das auch.",
      "Deine Figur denkt nach: Beide hoffen ehrlich. Aber am Ende kann nicht jedes Team denselben Sieg bekommen."
    ],
    task: "Welche Antwort ist am besten?",
    choices: [
      {
        title: "Gott kann beide hören.",
        text: "Aber nicht beide können denselben Sieg bekommen.",
        correct: true
      },
      {
        title: "Dann hört Gott gar niemanden.",
        text: "Schwierige Wünsche zählen nicht.",
        correct: false
      },
      {
        title: "Das lautere Team gewinnt.",
        text: "Wer mehr ruft, wird eher gehört.",
        correct: false
      },
      {
        title: "Nur das bessere Team darf beten.",
        text: "Die anderen haben Pech.",
        correct: false
      }
    ],
    reward: "⭐ Stern 2: Genau denken",
    feedback: "Richtig. Gehört werden und genau den eigenen Wunsch bekommen, ist nicht dasselbe.",
    game: {
      type: "wire",
      title: "Mini-Spiel: Heißer Draht",
      help: "Tippe die Punkte der Reihe nach an: 1, 2, 3, 4. Wenn du dich vertippst, beginnt der Weg neu.",
      nodes: [
        { id: 1, left: 12, top: 70 },
        { id: 2, left: 36, top: 32 },
        { id: 3, left: 60, top: 67 },
        { id: 4, left: 84, top: 28 }
      ]
    }
  },
  {
    id: "bridge",
    label: "Brücke der Hilfe",
    title: "Kleine Hilfe, großer Mut",
    scene: "assets/scene-bridge.png",
    map: { left: 16, top: 81 },
    story: [
      "Auf der Brücke erzählt ein Kind von einer schweren Woche. Es war traurig und müde.",
      "Nach dem Beten war nicht sofort alles leicht. Aber Freunde halfen. Jemand hörte zu. Langsam kam neuer Mut zurück.",
      "Deine Figur merkt: Manchmal sind kleine Schritte sehr wichtig. Nicht alles muss laut und riesig sein."
    ],
    task: "Was könnte hier eine Antwort sein?",
    choices: [
      {
        title: "Nur ein großes Wunder zählt.",
        text: "Ohne Zauber ist nichts passiert.",
        correct: false
      },
      {
        title: "Hilfe und neuer Mut können wichtig sein.",
        text: "Auch kleine Zeichen können stark sein.",
        correct: true
      },
      {
        title: "Wenn etwas Zeit braucht, war es keine Antwort.",
        text: "Nur Sofort-Antworten zählen.",
        correct: false
      },
      {
        title: "Freunde haben damit nichts zu tun.",
        text: "Nur das eigene Gefühl zählt.",
        correct: false
      }
    ],
    reward: "⭐ Stern 3: Kleine Zeichen sehen",
    feedback: "Ja. Antworten können durch Menschen, Trost, Hilfe und neuen Mut kommen.",
    game: {
      type: "memory",
      title: "Mini-Spiel: Brücken-Memory",
      help: "Finde die 3 passenden Paare.",
      pairs: [
        ["Mut", "Neuer Mut wächst."],
        ["Hilfe", "Freunde helfen."],
        ["Trost", "Jemand hört zu."]
      ]
    }
  },
  {
    id: "tower",
    label: "Hoher Turm",
    title: "Von oben sieht manches anders aus",
    scene: "assets/scene-tower.png",
    map: { left: 69, top: 26 },
    story: [
      "Deine Figur steigt den hohen Turm hinauf. Unten wirkten die Wege verwirrend.",
      "Von oben sieht man plötzlich mehr. Manche Wege treffen sich später wieder. Manche Kurven sind auf einmal verständlich.",
      "Deine Figur denkt: Vielleicht verstehe ich auch bei Gebeten nicht immer alles sofort. Manches wird erst später klar."
    ],
    task: "Was passt am besten?",
    choices: [
      {
        title: "Menschen sehen nur einen Teil.",
        text: "Darum verstehen wir nicht immer alles gleich.",
        correct: true
      },
      {
        title: "Menschen verstehen sofort alles.",
        text: "Fragen bleiben nie offen.",
        correct: false
      },
      {
        title: "Fragen sind etwas Schlechtes.",
        text: "Man darf nicht weiter nachdenken.",
        correct: false
      },
      {
        title: "Nur schnelle Antworten sind gut.",
        text: "Später ist zu spät.",
        correct: false
      }
    ],
    reward: "⭐ Stern 4: Geduldig bleiben",
    feedback: "Richtig. Wir Menschen sehen nicht alles auf einmal. Manches wird erst später klar.",
    game: {
      type: "search",
      title: "Mini-Spiel: Suchsel",
      help: "Tippe die Buchstaben nacheinander an, bis du ein richtiges Wort gelegt hast.",
      rows: [
        ["M", "U", "T", "S", "A", "B"],
        ["Q", "H", "I", "L", "F", "E"],
        ["Z", "E", "I", "T", "C", "D"],
        ["R", "O", "S", "T", "U", "V"],
        ["W", "E", "G", "X", "Y", "Z"]
      ],
      words: [
        {
          word: "MUT",
          cells: ["0-0", "0-1", "0-2"]
        },
        {
          word: "HILFE",
          cells: ["1-1", "1-2", "1-3", "1-4", "1-5"]
        },
        {
          word: "ZEIT",
          cells: ["2-0", "2-1", "2-2", "2-3"]
        }
      ]
    }
  },
  {
    id: "sanctuary",
    label: "Sternenhaus",
    title: "Deine eigene Lichtspur",
    map: { left: 80, top: 78 },
    builder: true
  }
];

function buildMemoryDeck() {
  const stop = stops.find((entry) => entry.id === "bridge");
  const deck = stop.game.pairs.flatMap((pair, pairIndex) => [
    { id: `p${pairIndex}`, title: pair[0], text: "Finde die passende Erklärung." },
    { id: `p${pairIndex}`, title: pair[1], text: "Zu welchem Wort passt das?" }
  ]);

  for (let i = deck.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }

  return deck;
}

const builderData = {
  opening: [
    "Ich habe gelernt:",
    "Das nehme ich mit:",
    "Mein Gedanke ist:"
  ],
  truth: [
    "Gott hört Gebete.",
    "Menschen denken nicht alle gleich darüber.",
    "Ich verstehe nicht immer alles sofort.",
    "Fragen sind erlaubt."
  ],
  sign: [
    "Hilfe durch andere kann wichtig sein.",
    "Neuer Mut kann eine Antwort sein.",
    "Manche Antworten brauchen Zeit.",
    "Kleine Zeichen können stark sein."
  ],
  ending: [
    "Das merke ich mir.",
    "Damit gehe ich weiter.",
    "Diese Spur behalte ich."
  ]
};

function freshState() {
  return {
    screen: "intro",
    heroId: "",
    currentStop: null,
    selectedMapStop: null,
    positionStop: -1,
    score: 0,
    finishBurstDone: false,
    visited: [],
    answered: {},
    relics: [],
    mini: {
      echoes: { found: [], done: false, rewarded: false },
      arena: { progress: 0, done: false, rewarded: false },
      bridge: { deck: buildMemoryDeck(), flipped: [], matched: [], lock: false, done: false, rewarded: false },
      tower: { foundWords: [], currentCells: [], currentText: "", done: false, rewarded: false, message: "" }
    },
    builder: {
      opening: builderData.opening[0],
      truth: "",
      sign: "",
      ending: builderData.ending[0],
      done: false
    }
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return freshState();
    const parsed = JSON.parse(saved);
    return {
      ...freshState(),
      ...parsed,
      mini: {
        ...freshState().mini,
        ...(parsed.mini || {}),
        bridge: {
          ...freshState().mini.bridge,
          ...(parsed.mini?.bridge || {}),
          deck: Array.isArray(parsed.mini?.bridge?.deck) && parsed.mini.bridge.deck.length === 6 ? parsed.mini.bridge.deck : buildMemoryDeck()
        },
        tower: {
          ...freshState().mini.tower,
          ...(parsed.mini?.tower || {})
        }
      },
      builder: { ...freshState().builder, ...(parsed.builder || {}) }
    };
  } catch (error) {
    return freshState();
  }
}

let state = loadState();

const app = document.getElementById("app");
const statusHero = document.getElementById("statusHero");
const statusProgress = document.getElementById("statusProgress");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

function getHero() {
  return characters.find((entry) => entry.id === state.heroId) || null;
}

function completedStops() {
  return state.visited.length + (state.builder.done ? 1 : 0);
}

function currentPosition() {
  return state.positionStop === -1 ? mapStart : stops[state.positionStop].map;
}

function stopById(stopId) {
  return stops.find((entry) => entry.id === stopId);
}

function canOpenStop(stopId) {
  if (stopId !== "sanctuary") return true;
  return ["echoes", "arena", "bridge", "tower"].every((id) => state.visited.includes(id));
}

function updateHeader() {
  const hero = getHero();
  statusHero.textContent = hero ? `${hero.name} · ${hero.role}` : "Noch kein Held gewählt";
  statusProgress.textContent = `${state.score} / ${TOTAL_STARS} Sterne`;
  progressFill.style.width = `${(completedStops() / stops.length) * 100}%`;

  const labels = {
    intro: "Start",
    select: "Figur wählen",
    map: "Abenteuerkarte",
    travel: "Unterwegs",
    stop: state.currentStop ? stopById(state.currentStop)?.label || "Ort" : "Ort",
    finale: "Geschafft"
  };

  progressLabel.textContent = labels[state.screen] || "Unterwegs";

  stops.forEach((stop) => {
    const dot = document.querySelector(`[data-stop-dot="${stop.id}"]`);
    if (!dot) return;
    dot.classList.remove("done", "active");
    if (state.visited.includes(stop.id) || (stop.id === "sanctuary" && state.builder.done)) {
      dot.classList.add("done");
    }
    if ((state.screen === "stop" || state.screen === "travel" || state.screen === "map") && state.currentStop === stop.id) {
      dot.classList.add("active");
    }
  });
}

function renderIntro() {
  app.innerHTML = `
    <section class="intro-grid">
      <article class="panel">
        <p class="eyebrow">Abenteuer für Klasse 5</p>
        <h2>Reise durch das Tal der Lichtspuren</h2>
        <p class="lead">
          In diesem Spiel geht es um eine große Frage:
          Wie kann Gebetserhörung aussehen?
          Du reist frei über die Karte, suchst dir selbst den nächsten Ort aus, spielst kleine Spiele und sammelst Sterne.
        </p>

        <div class="task-box">
          <span class="task-title">So geht's</span>
          <div class="step-list">
            <div>1. Wähle eine Figur.</div>
            <div>2. Such dir auf der Karte einen Ort aus.</div>
            <div>3. Löse das Mini-Spiel und beantworte die Frage.</div>
            <div>4. Sammle so viele Sterne wie möglich: ${TOTAL_STARS} insgesamt.</div>
          </div>
        </div>

        <div class="helper-list">
          <div class="helper-item">Du darfst die Reihenfolge der Geschichten selbst wählen.</div>
          <div class="helper-item">Es gibt immer mehrere Antwortmöglichkeiten.</div>
          <div class="helper-item">Deine Sterne werden die ganze Zeit mitgezählt.</div>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="enterSelectionBtn">Figur wählen</button>
          <button class="btn btn-secondary" id="resetAdventureBtn">Neu beginnen</button>
        </div>
      </article>

      <aside class="hero-card">
        <img src="assets/world-map.png" alt="Fantastische Landschaft mit Wegen, Brücke, Häusern und Bergen." />
        <div class="hero-overlay"></div>
        <div class="hero-copy">
          <span class="map-caption">Das Tal der Lichtspuren</span>
          <h2>Wähle selbst, wohin du als Nächstes gehst</h2>
        </div>
      </aside>
    </section>
  `;

  document.getElementById("enterSelectionBtn").addEventListener("click", () => {
    state.screen = "select";
    saveState();
    render();
  });

  document.getElementById("resetAdventureBtn").addEventListener("click", () => {
    state = freshState();
    clearState();
    render();
  });
}

function renderCharacterSelection() {
  const selectedHero = getHero();

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">Schritt 1</p>
        <h2>Wähle deine Figur</h2>
        <p class="lead">
          Tippe auf eine Figur. Danach öffnet sich die Karte und du entscheidest selbst, wohin du gehst.
        </p>

        <div class="task-box">
          <span class="task-title">Deine Aufgabe</span>
          <div class="step-list">
            <div>1. Schau dir die Figuren an.</div>
            <div>2. Wähle deine Lieblingsfigur.</div>
            <div>3. Drücke auf „Los geht's“.</div>
          </div>
        </div>

        <div class="character-grid">
          ${characters.map((character) => `
            <button class="character-card ${state.heroId === character.id ? "selected" : ""}" data-hero="${character.id}">
              <img src="${character.image}" alt="${character.name}, ${character.role}" />
              <div class="character-meta">
                <h3>${character.name}</h3>
                <span class="role-pill">${character.role}</span>
                <p>${character.vibe}</p>
                <p>${character.perk}</p>
              </div>
            </button>
          `).join("")}
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="startAdventureBtn" ${selectedHero ? "" : "disabled"}>Los geht's</button>
          <button class="btn btn-secondary" id="backIntroBtn">Zurück</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="mini-panel">
          <h3>Dein Ziel</h3>
          <p>Reise frei über die Karte, löse Spiele und finde an jedem Ort die beste Antwort.</p>
        </article>
        <article class="mini-panel">
          <h3>Sterne</h3>
          <p>Es gibt insgesamt ${TOTAL_STARS} Sterne zu sammeln.</p>
        </article>
      </aside>
    </section>
  `;

  app.querySelectorAll("[data-hero]").forEach((button) => {
    button.addEventListener("click", () => {
      state.heroId = button.dataset.hero;
      saveState();
      render();
    });
  });

  document.getElementById("startAdventureBtn").addEventListener("click", () => {
    state.screen = "map";
    state.currentStop = null;
    state.selectedMapStop = null;
    saveState();
    render();
  });

  document.getElementById("backIntroBtn").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function mapPins(activeId) {
  return stops.map((stop) => {
    const classes = [
      "map-pin",
      stop.id === activeId ? "active" : "",
      state.visited.includes(stop.id) || (stop.id === "sanctuary" && state.builder.done) ? "done" : "",
      canOpenStop(stop.id) ? "" : "locked"
    ].filter(Boolean).join(" ");
    return `<button class="${classes}" data-map-stop="${stop.id}" style="left:${stop.map.left}%; top:${stop.map.top}%">${canOpenStop(stop.id) ? "" : "🔒"}</button>`;
  }).join("");
}

function sidePanel(activeId) {
  const hero = getHero();
  return `
    <aside class="side-stack">
      <article class="mini-panel">
        <h3>Deine Figur</h3>
        ${hero ? `
          <div class="hero-summary">
            <img src="${hero.image}" alt="${hero.name}" />
            <div>
              <strong>${hero.name}</strong>
              <p>${hero.role}</p>
              <p>${hero.perk}</p>
            </div>
          </div>
        ` : "<p>Noch niemand gewählt.</p>"}
      </article>

      <article class="mini-panel">
        <h3>Deine Sterne</h3>
        <div class="inventory-list">
          ${state.relics.length ? state.relics.map((relic) => `<div class="inventory-item">${relic}</div>`).join("") : '<div class="inventory-item">Noch kein Stern gefunden.</div>'}
        </div>
        <div class="stars-row">
          <span class="star-chip">${state.score} / ${TOTAL_STARS} Sterne</span>
        </div>
      </article>

      ${activeId ? `
        <article class="mini-panel">
          <h3>Ausgewählter Ort</h3>
          <p>${stopById(activeId).label}</p>
          <p>${stopById(activeId).title}</p>
        </article>
      ` : ""}
    </aside>
  `;
}

function renderMap() {
  const selectedStop = state.selectedMapStop ? stopById(state.selectedMapStop) : null;
  const hero = getHero();
  const pos = currentPosition();

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">Abenteuerkarte</p>
        <h2>Wähle deinen nächsten Ort</h2>
        <p class="lead">
          Du darfst selbst entscheiden, in welcher Geschichte du weitermachst.
          Tippe auf einen Ort auf der Karte.
        </p>

        <div class="task-box">
          <span class="task-title">Deine Aufgabe</span>
          <div class="step-list">
            <div>1. Tippe auf einen Ort auf der Karte.</div>
            <div>2. Drücke auf „Zu diesem Ort laufen“.</div>
            <div>3. Löse dort das Spiel und die Frage.</div>
          </div>
        </div>

        <div class="travel-map">
          <img src="assets/world-map.png" alt="Karte des Tals der Lichtspuren" />
          <div class="travel-path"></div>
          ${mapPins(state.selectedMapStop)}
          <div class="runner-avatar" style="left:${pos.left}%; top:${pos.top}%;">
            <img src="${hero.image}" alt="${hero.name}" />
          </div>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="goToStopBtn" ${selectedStop ? "" : "disabled"}>Zu diesem Ort laufen</button>
          <button class="btn btn-secondary" id="backToIntroBtn">Zum Start</button>
        </div>
      </article>

      ${sidePanel(state.selectedMapStop)}
    </section>
  `;

  app.querySelectorAll("[data-map-stop]").forEach((button) => {
    button.addEventListener("click", () => {
      const stopId = button.dataset.mapStop;
      if (!canOpenStop(stopId)) return;
      state.selectedMapStop = stopId;
      state.currentStop = stopId;
      saveState();
      render();
    });
  });

  document.getElementById("goToStopBtn").addEventListener("click", () => {
    state.screen = "travel";
    saveState();
    render();
  });

  document.getElementById("backToIntroBtn").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function renderTravel() {
  const stop = stopById(state.currentStop);
  const hero = getHero();
  const from = currentPosition();
  const to = stop.map;

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">Reise</p>
        <h2>Laufe zu ${stop.label}</h2>
        <p class="lead">
          Deine Figur läuft jetzt los.
          Danach kannst du den Ort betreten.
        </p>

        <div class="task-box">
          <span class="task-title">Deine Aufgabe</span>
          <div class="step-list">
            <div>1. Drücke auf „Loslaufen“.</div>
            <div>2. Schau zu, wie deine Figur zur Station läuft.</div>
            <div>3. Betritt danach den Ort.</div>
          </div>
        </div>

        <div class="travel-map">
          <img src="assets/world-map.png" alt="Karte des Tals der Lichtspuren" />
          <div class="travel-path"></div>
          ${mapPins(stop.id)}
          <div class="runner-avatar" id="runnerAvatar" style="left:${from.left}%; top:${from.top}%;">
            <img src="${hero.image}" alt="${hero.name}" />
          </div>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="runButton">Loslaufen</button>
          <button class="btn btn-secondary" id="backToMapBtn">Zurück zur Karte</button>
        </div>
      </article>

      ${sidePanel(stop.id)}
    </section>
  `;

  app.querySelectorAll("[data-map-stop]").forEach((button) => {
    button.disabled = true;
  });

  document.getElementById("runButton").addEventListener("click", () => {
    const avatar = document.getElementById("runnerAvatar");
    const button = document.getElementById("runButton");
    button.disabled = true;
    avatar.classList.add("moving");
    requestAnimationFrame(() => {
      avatar.style.left = `${to.left}%`;
      avatar.style.top = `${to.top}%`;
    });
    window.setTimeout(() => {
      state.positionStop = stops.findIndex((entry) => entry.id === stop.id);
      state.screen = "stop";
      saveState();
      render();
    }, 1700);
  });

  document.getElementById("backToMapBtn").addEventListener("click", () => {
    state.screen = "map";
    saveState();
    render();
  });
}

function renderStarGame(gameState, stop) {
  return `
    <div class="game-box">
      <h3>${stop.game.title}</h3>
      <p>${stop.game.help}</p>
      <div class="search-scene">
        <img src="${stop.scene}" alt="${stop.label}" />
        ${stop.game.spots.map((spot) => `
          <button
            class="star-spot ${gameState.found.includes(spot.id) ? "found" : ""}"
            data-star="${spot.id}"
            style="left:${spot.left}%; top:${spot.top}%"
            ${gameState.done ? "disabled" : ""}
          >★</button>
        `).join("")}
      </div>
      <p class="game-status">${gameState.done ? "Geschafft! Du hast alle Sterne gefunden." : `Gefunden: ${gameState.found.length} von ${stop.game.spots.length}`}</p>
    </div>
  `;
}

function renderWireGame(gameState, stop) {
  return `
    <div class="game-box">
      <h3>${stop.game.title}</h3>
      <p>${stop.game.help}</p>
      <div class="wire-board">
        <svg viewBox="0 0 100 100" class="wire-svg" aria-hidden="true">
          <path d="M12 70 C20 55, 26 48, 36 32 S53 44, 60 67 S76 46, 84 28" />
        </svg>
        ${stop.game.nodes.map((node) => `
          <button
            class="wire-node ${gameState.progress >= node.id ? "done" : ""}"
            data-wire="${node.id}"
            style="left:${node.left}%; top:${node.top}%"
            ${gameState.done ? "disabled" : ""}
          >${node.id}</button>
        `).join("")}
      </div>
      <p class="game-status">${gameState.done ? "Geschafft! Der Weg ist frei." : `Nächster Punkt: ${gameState.progress + 1}`}</p>
    </div>
  `;
}

function renderMemoryGame(gameState, stop) {
  return `
    <div class="game-box">
      <h3>${stop.game.title}</h3>
      <p>${stop.game.help}</p>
      <div class="memory-grid-simple">
        ${gameState.deck.map((card, index) => {
          const isFlipped = gameState.flipped.includes(index) || gameState.matched.includes(card.id);
          const isMatched = gameState.matched.includes(card.id);
          return `
            <button
              class="memory-card-simple ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}"
              data-memory="${index}"
              ${gameState.lock || isMatched ? "disabled" : ""}
            >
              ${isFlipped ? `<strong>${card.title}</strong><span>${card.text}</span>` : "<strong>?</strong><span>Karte</span>"}
            </button>
          `;
        }).join("")}
      </div>
      <p class="game-status">${gameState.done ? "Geschafft! Alle Paare sind gefunden." : `Paare: ${gameState.matched.length} von ${stop.game.pairs.length}`}</p>
    </div>
  `;
}

function renderSearchGame(gameState, stop) {
  return `
    <div class="game-box">
      <h3>${stop.game.title}</h3>
      <p>${stop.game.help}</p>
      <div class="word-grid">
        ${stop.game.rows.map((row, rowIndex) => `
          <div class="word-row">
            ${row.map((letter, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const selected = gameState.currentCells.includes(cellId);
              const found = stop.game.words.some((entry) => entry.cells.includes(cellId) && gameState.foundWords.includes(entry.word));
              return `<button class="letter-cell ${selected ? "selected" : ""} ${found ? "found" : ""}" data-cell="${cellId}" ${gameState.done ? "disabled" : ""}>${letter}</button>`;
            }).join("")}
          </div>
        `).join("")}
      </div>
      <div class="word-buttons">
        ${stop.game.words.map((entry) => `
          <span class="word-chip ${gameState.foundWords.includes(entry.word) ? "found" : ""}">${entry.word}</span>
        `).join("")}
      </div>
      <p class="game-status">${gameState.done ? "Geschafft! Alle Wörter sind gefunden." : `Aktuelles Wort: ${gameState.currentText || "—"}`}</p>
      ${gameState.message ? `<p class="game-note">${gameState.message}</p>` : ""}
    </div>
  `;
}

function renderMiniGame(stop) {
  const gameState = state.mini[stop.id];
  if (!stop.game) return "";
  if (stop.game.type === "stars") return renderStarGame(gameState, stop);
  if (stop.game.type === "wire") return renderWireGame(gameState, stop);
  if (stop.game.type === "memory") return renderMemoryGame(gameState, stop);
  return renderSearchGame(gameState, stop);
}

function miniGameDone(stopId) {
  return state.mini[stopId]?.done;
}

function rewardMiniGame(stopId) {
  const gameState = state.mini[stopId];
  if (!gameState || gameState.rewarded) return;
  gameState.rewarded = true;
  state.score += 1;
}

function renderStop() {
  const stop = stopById(state.currentStop);
  if (stop.builder) {
    renderBuilder();
    return;
  }

  const answer = state.answered[stop.id];
  const gameDone = miniGameDone(stop.id);

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">${stop.label}</p>
        <h2>${stop.title}</h2>

        <div class="task-box">
          <span class="task-title">Deine Aufgabe</span>
          <div class="step-list">
            <div>1. Lies die Geschichte.</div>
            <div>2. Löse das Mini-Spiel.</div>
            <div>3. Beantworte die Frage mit einer von 4 Antworten.</div>
          </div>
        </div>

        <div class="scene-card scene-card-fixed" style="margin-top: 18px;">
          <img src="${stop.scene}" alt="${stop.label}" />
          <div class="scene-overlay"></div>
          <div class="scene-copy">
            <span class="chapter-name">${stop.label}</span>
            <p>Hier wartet eine neue Lichtspur auf dich.</p>
          </div>
        </div>

        <div class="narration-box">
          <span class="chapter-name">Geschichte</span>
          ${stop.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>

        ${renderMiniGame(stop)}

        <div class="narration-box">
          <span class="chapter-name">Frage</span>
          <p>${stop.task}</p>
          ${!gameDone ? '<p><strong>Erst das Mini-Spiel lösen, dann kannst du antworten.</strong></p>' : ""}
        </div>

        <div class="choice-grid" style="margin-top: 18px;">
          ${stop.choices.map((entry, index) => {
            let classes = "choice-btn";
            if (answer) {
              if (entry.correct) classes += " correct";
              else if (answer.index === index) classes += " wrong";
            }
            return `
              <button class="${classes}" data-choice="${index}" ${answer || !gameDone ? "disabled" : ""}>
                <strong>${entry.title}</strong>
                <span>${entry.text}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${answer ? `
          <div class="feedback-box">
            <span class="feedback-chip ${answer.correct ? "feedback-good" : "feedback-note"}">${answer.correct ? "Super!" : "Fast!"}</span>
            <p>${stop.feedback}</p>
          </div>
        ` : ""}

        <div class="action-row" style="margin-top: 18px;">
          ${answer ? `<button class="btn btn-primary" id="backToMapAfterStopBtn">${stop.id === "tower" ? "Zurück zur Karte" : "Nächsten Ort auf Karte wählen"}</button>` : ""}
          <button class="btn btn-secondary" id="backToMapBtn">Zur Karte</button>
        </div>
      </article>

      ${sidePanel(stop.id)}
    </section>
  `;

  if (stop.game.type === "stars") {
    app.querySelectorAll("[data-star]").forEach((button) => {
      button.addEventListener("click", () => {
        const gameState = state.mini.echoes;
        const id = button.dataset.star;
        if (gameState.found.includes(id)) return;
        gameState.found.push(id);
        if (gameState.found.length === stop.game.spots.length) {
          gameState.done = true;
          rewardMiniGame("echoes");
        }
        saveState();
        render();
      });
    });
  }

  if (stop.game.type === "wire") {
    app.querySelectorAll("[data-wire]").forEach((button) => {
      button.addEventListener("click", () => {
        const gameState = state.mini.arena;
        const next = Number(button.dataset.wire);
        if (gameState.done) return;
        if (next === gameState.progress + 1) {
          gameState.progress += 1;
          if (gameState.progress === stop.game.nodes.length) {
            gameState.done = true;
            rewardMiniGame("arena");
          }
        } else {
          gameState.progress = 0;
        }
        saveState();
        render();
      });
    });
  }

  if (stop.game.type === "memory") {
    app.querySelectorAll("[data-memory]").forEach((button) => {
      button.addEventListener("click", () => {
        handleMemoryFlip(Number(button.dataset.memory), stop);
      });
    });
  }

  if (stop.game.type === "search") {
    app.querySelectorAll("[data-cell]").forEach((button) => {
      button.addEventListener("click", () => {
        handleSearchCellClick(button.dataset.cell, stop);
      });
    });
  }

  app.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.choice);
      const selected = stop.choices[index];
      state.answered[stop.id] = { index, correct: selected.correct };
      if (!state.visited.includes(stop.id)) {
        state.visited.push(stop.id);
        state.relics.push(stop.reward);
      }
      if (selected.correct) state.score += 1;
      saveState();
      render();
    });
  });

  const backToMapAfterStopBtn = document.getElementById("backToMapAfterStopBtn");
  if (backToMapAfterStopBtn) {
    backToMapAfterStopBtn.addEventListener("click", () => {
      state.screen = "map";
      state.selectedMapStop = null;
      if (stop.id === "tower" && canOpenStop("sanctuary")) {
        state.currentStop = "sanctuary";
      } else {
        state.currentStop = null;
      }
      saveState();
      render();
    });
  }

  document.getElementById("backToMapBtn").addEventListener("click", () => {
    state.screen = "map";
    saveState();
    render();
  });
}

function handleMemoryFlip(index, stop) {
  const gameState = state.mini.bridge;
  if (gameState.lock || gameState.flipped.includes(index)) return;

  gameState.flipped.push(index);
  saveState();
  render();

  if (gameState.flipped.length < 2) return;

  gameState.lock = true;
  const [firstIndex, secondIndex] = gameState.flipped;
  const first = gameState.deck[firstIndex];
  const second = gameState.deck[secondIndex];

  window.setTimeout(() => {
    if (first.id === second.id) {
      if (!gameState.matched.includes(first.id)) {
        gameState.matched.push(first.id);
      }
      if (gameState.matched.length === stop.game.pairs.length) {
        gameState.done = true;
        rewardMiniGame("bridge");
      }
    }
    gameState.flipped = [];
    gameState.lock = false;
    saveState();
    render();
  }, MEMORY_REVEAL_MS);
}

function handleSearchCellClick(cellId, stop) {
  const gameState = state.mini.tower;
  const [row, col] = cellId.split("-").map(Number);
  const letter = stop.game.rows[row][col];

  if (gameState.currentCells.includes(cellId)) return;

  gameState.currentCells.push(cellId);
  gameState.currentText += letter;

  const remainingWords = stop.game.words.filter((entry) => !gameState.foundWords.includes(entry.word));
  const exactMatch = remainingWords.find((entry) => entry.word === gameState.currentText && entry.cells.join("|") === gameState.currentCells.join("|"));
  const validPrefix = remainingWords.some((entry) => entry.word.startsWith(gameState.currentText) && entry.cells.slice(0, gameState.currentCells.length).join("|") === gameState.currentCells.join("|"));

  if (exactMatch) {
    gameState.foundWords.push(exactMatch.word);
    gameState.currentCells = [];
    gameState.currentText = "";
    gameState.message = `${exactMatch.word} gefunden!`;
    if (gameState.foundWords.length === stop.game.words.length) {
      gameState.done = true;
      rewardMiniGame("tower");
    }
  } else if (!validPrefix) {
    gameState.currentCells = [];
    gameState.currentText = "";
    gameState.message = "Das war noch kein richtiges Wort. Versuch es noch einmal.";
  } else {
    gameState.message = "Gut so, tippe weiter.";
  }

  saveState();
  render();
}

function builderPreview() {
  return [
    state.builder.opening,
    state.builder.truth,
    state.builder.sign,
    state.builder.ending
  ].filter(Boolean).join("\n");
}

function builderBlock(key, title, text, optional = true) {
  const clearButton = optional ? `<button class="chip-btn ${state.builder[key] === "" ? "selected" : ""}" data-builder="${key}" data-value="">Auslassen</button>` : "";
  return `
    <section class="builder-block">
      <h3>${title}</h3>
      <p>${text}</p>
      <div class="chip-row">
        ${builderData[key].map((item) => `
          <button class="chip-btn ${state.builder[key] === item ? "selected" : ""}" data-builder="${key}" data-value="${encodeURIComponent(item)}">${item}</button>
        `).join("")}
        ${clearButton}
      </div>
    </section>
  `;
}

function renderBuilder() {
  const hasMiddle = Boolean(state.builder.truth || state.builder.sign);

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">Sternenhaus</p>
        <h2>Baue deinen Schlusssatz</h2>
        <p class="lead">
          Jetzt bist du fast fertig.
          Wähle die Sätze aus, die dir wichtig sind.
        </p>

        <div class="task-box">
          <span class="task-title">Deine Aufgabe</span>
          <div class="step-list">
            <div>1. Wähle einen Anfang.</div>
            <div>2. Wähle einen wichtigen Gedanken.</div>
            <div>3. Wähle ein Zeichen.</div>
            <div>4. Drücke auf „Fertig“.</div>
          </div>
        </div>

        <div class="builder-grid">
          ${builderBlock("opening", "Anfang", "So beginnt dein Satz.", false)}
          ${builderBlock("truth", "Mein Gedanke", "Was ist für dich wichtig?")}
          ${builderBlock("sign", "Mein Zeichen", "Was passt gut dazu?")}
          ${builderBlock("ending", "Schluss", "So endet dein Satz.", false)}
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="finishJourneyBtn">Fertig</button>
          <button class="btn btn-secondary" id="returnMapBtn">Zur Karte</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="preview-card">
          <h3>Dein Schlusssatz</h3>
          <div class="preview-text">${builderPreview()}</div>
        </article>
        <article class="mini-panel">
          <h3>Belohnung</h3>
          <p>Für deinen fertigen Schlusssatz bekommst du noch 2 Sterne.</p>
          <div class="stars-row">
            <span class="star-chip">${state.score} / ${TOTAL_STARS} Sterne</span>
          </div>
        </article>
      </aside>
    </section>
  `;

  app.querySelectorAll("[data-builder]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.builder;
      state.builder[key] = decodeURIComponent(button.dataset.value);
      saveState();
      render();
    });
  });

  document.getElementById("finishJourneyBtn").addEventListener("click", () => {
    if (!hasMiddle) {
      const note = document.createElement("div");
      note.className = "feedback-box";
      note.innerHTML = `
        <span class="feedback-chip feedback-note">Fast geschafft</span>
        <p>Wähle bitte noch einen Gedanken oder ein Zeichen aus.</p>
      `;
      app.querySelector(".panel").appendChild(note);
      return;
    }

    if (!state.builder.done) {
      state.builder.done = true;
      state.score += 2;
    }
    state.screen = "finale";
    saveState();
    render();
  });

  document.getElementById("returnMapBtn").addEventListener("click", () => {
    state.screen = "map";
    saveState();
    render();
  });
}

function summaryCard(title, value, text) {
  return `
    <article class="summary-card">
      <h3>${title}</h3>
      <span class="score-pill">${value}</span>
      <p style="margin-top: 10px;">${text}</p>
    </article>
  `;
}

function buildResultText() {
  const hero = getHero();
  return [
    "ERGEBNIS: TAL DER LICHTSPUREN",
    "=============================",
    `Datum: ${new Date().toLocaleDateString("de-DE")}`,
    `Figur: ${hero ? `${hero.name} (${hero.role})` : "nicht gewählt"}`,
    `Sterne: ${state.score} von ${TOTAL_STARS}`,
    `Orte geschafft: ${completedStops()} von ${stops.length}`,
    "",
    "MEINE STERNE",
    ...state.relics.map((entry) => `- ${entry}`),
    "",
    "MEIN SCHLUSSSATZ",
    builderPreview(),
    "",
    "WICHTIGE GEDANKEN",
    "- Menschen denken unterschiedlich über Gebetserhörung.",
    "- Nicht jede Antwort kommt sofort.",
    "- Hilfe, Mut und Zeit können wichtig sein.",
    "- Wir Menschen verstehen nicht immer alles gleich."
  ].join("\n");
}

function downloadResultText() {
  const content = buildResultText();
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tal-der-Lichtspuren-Ergebnis.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function fireConfetti() {
  const colors = ["#ffd873", "#73ddc8", "#ff9a8d", "#d4fff3", "#fff2c2"];
  for (let index = 0; index < 34; index += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDuration = `${2.3 + Math.random() * 1.7}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4500);
  }
}

function renderFinale() {
  if (!state.finishBurstDone) {
    fireConfetti();
    state.finishBurstDone = true;
    saveState();
  }

  const hero = getHero();

  app.innerHTML = `
    <section class="adventure-grid">
      <article class="panel">
        <p class="eyebrow">Geschafft</p>
        <h2>Super! Deine Reise ist zu Ende</h2>
        <p class="lead">
          ${hero ? hero.name : "Deine Figur"} hat alle Orte besucht,
          Spiele gelöst und eine eigene Lichtspur gebaut.
        </p>

        <div class="summary-grid">
          ${summaryCard("Sterne", `${state.score} / ${TOTAL_STARS}`, "So viele Sterne hast du gesammelt.")}
          ${summaryCard("Orte", `${completedStops()} / ${stops.length}`, "Alle Orte sind geschafft.")}
          ${summaryCard("Figur", hero ? hero.name : "—", "Mit dieser Figur hast du gespielt.")}
          ${summaryCard("Schlusssatz", "Fertig", "Du hast deine eigene Lichtspur gebaut.")}
        </div>

        <div class="preview-card" style="margin-top: 18px;">
          <h3>Deine Lichtspur</h3>
          <div class="preview-text">${builderPreview()}</div>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="downloadTxtBtn">Ergebnis laden</button>
          <button class="btn btn-primary" id="restartQuestBtn">Noch einmal spielen</button>
          <button class="btn btn-secondary" id="backQuestIntroBtn">Zum Start</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="hero-card">
          <img src="assets/world-map.png" alt="Leuchtendes Tal am Ende der Reise" />
          <div class="hero-overlay"></div>
          <div class="hero-copy">
            <span class="map-caption">Gut gemacht</span>
            <p>Du hast zugehört, gespielt, nachgedacht und deine eigene Spur gefunden.</p>
          </div>
        </article>

        <article class="mini-panel">
          <h3>Merke dir</h3>
          <div class="helper-list">
            <div class="helper-item">Menschen erleben nicht alles gleich.</div>
            <div class="helper-item">Antworten können klein und leise sein.</div>
            <div class="helper-item">Manches versteht man erst später.</div>
          </div>
          <div class="stars-row">
            <span class="star-chip">${state.score} / ${TOTAL_STARS} Sterne</span>
          </div>
        </article>
      </aside>
    </section>
  `;

  document.getElementById("downloadTxtBtn").addEventListener("click", () => {
    downloadResultText();
  });

  document.getElementById("restartQuestBtn").addEventListener("click", () => {
    state = freshState();
    clearState();
    render();
  });

  document.getElementById("backQuestIntroBtn").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function render() {
  updateHeader();

  switch (state.screen) {
    case "intro":
      renderIntro();
      break;
    case "select":
      renderCharacterSelection();
      break;
    case "map":
      renderMap();
      break;
    case "travel":
      renderTravel();
      break;
    case "stop":
      renderStop();
      break;
    default:
      renderFinale();
  }
}

render();
