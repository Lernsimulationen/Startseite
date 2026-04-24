const STORAGE_KEY = "sternenpost-lernpfad-beten-v2";

const voicesData = [
  {
    speaker: "Ben",
    text: "Wenn ich bete, bin ich für einen kurzen Moment ganz für mich und kann mich ein bisschen zurückziehen.",
    choices: [
      "Beten kann Ruhe und Rückzug schenken.",
      "Beten ist nur etwas für Erwachsene.",
      "Beten klappt nur in einer Kirche."
    ],
    answer: 0,
    fact: "Auf der Doppelseite erzählen Kinder und Jugendliche, dass Beten ein stiller Rückzugsort sein kann."
  },
  {
    speaker: "Larissa",
    text: "Wenn ich Gott von meinem Leben erzähle, wird mir beim Reden vieles klarer.",
    choices: [
      "Beten macht unsichtbar.",
      "Beten kann Gedanken ordnen und klarer machen.",
      "Beten ersetzt jede Entscheidung."
    ],
    answer: 1,
    fact: "Ein wichtiger Gedanke der Seite ist: Beten kann Klarheit über das eigene Leben bringen."
  },
  {
    speaker: "Emil",
    text: "Wenn ich für meine Schwester bete, tröstet mich das und es geht mir etwas besser.",
    choices: [
      "Beten bedeutet nur Danke sagen.",
      "Beten kann Trost schenken.",
      "Beten funktioniert nur mit auswendig gelernten Sätzen."
    ],
    answer: 1,
    fact: "Die Doppelseite zeigt: Gerade in schweren Situationen kann Beten Trost geben."
  },
  {
    speaker: "Philip",
    text: "Mir geht es gerade gut. Ich bete oft und danke Gott dafür.",
    choices: [
      "Beten ist nur für Probleme da.",
      "Beten kann helfen, das Schöne im Leben wahrzunehmen.",
      "Beten darf nie fröhlich sein."
    ],
    answer: 1,
    fact: "Nicht nur Sorgen gehören ins Gebet. Auch Dank und Freude haben dort Platz."
  }
];

const quizData = [
  {
    question: "Wo kann man laut der Seite beten?",
    choices: [
      "Nur im Gottesdienst",
      "Nur zu Hause",
      "An vielen Orten, sogar im Zimmer, auf dem Sportplatz oder im Bett"
    ],
    answer: 2,
    fact: "Auf der Seite steht ausdrücklich: Beten geht nicht nur im Gottesdienst, sondern überall."
  },
  {
    question: "Wann kann man beten?",
    choices: [
      "Immer, morgens, abends oder zwischendurch",
      "Nur sonntags",
      "Nur vor dem Essen"
    ],
    answer: 0,
    fact: "Die Buchseite macht klar: Gott hört jederzeit zu."
  },
  {
    question: "Wie kann ein Gebet anfangen?",
    choices: [
      "Nur mit schweren, alten Worten",
      "Zum Beispiel einfach mit: Lieber Gott ...",
      "Nur mit einem Lied"
    ],
    answer: 1,
    fact: "Die Seite ermutigt: Man darf ganz einfach anfangen und Gott direkt ansprechen."
  },
  {
    question: "Was kann man Gott sagen?",
    choices: [
      "Nur Bitten",
      "Nur Dank",
      "Sorgen, Freude, Angst, Dank und Bitte"
    ],
    answer: 2,
    fact: "Im Schnupperkurs steht: Mit Gott kann man über alles reden."
  },
  {
    question: "Wie endet ein Gebet oft?",
    choices: [
      "Amen",
      "Pause",
      "Vorbei"
    ],
    answer: 0,
    fact: "Amen bedeutet auf der Seite sinngemäß: So soll es sein."
  }
];

const differenceHotspots = [
  { id: "sticky", label: "Zettel", left: 55, top: 35 },
  { id: "cup", label: "Becherstern", left: 78, top: 78 },
  { id: "plant", label: "Blumentopf", left: 87, top: 67 },
  { id: "pencils", label: "Stifte", left: 79, top: 61 },
  { id: "heart", label: "Tischkarte", left: 50, top: 81 }
];

const memoryBase = [
  { id: "ruhe", icon: "🌙", title: "Ruhe", text: "kurz still werden" },
  { id: "trost", icon: "🧡", title: "Trost", text: "nicht ganz allein sein" },
  { id: "dank", icon: "🌟", title: "Dank", text: "das Gute sehen" },
  { id: "bitte", icon: "🙏", title: "Bitte", text: "um Hilfe fragen" },
  { id: "erzählen", icon: "💬", title: "Erzählen", text: "alles sagen dürfen" },
  { id: "klarheit", icon: "💡", title: "Klarheit", text: "Gedanken sortieren" }
];

const builderData = {
  address: [
    "Lieber Gott,",
    "Hallo Gott,",
    "Guter Gott,",
    "Gott,"
  ],
  feeling: [
    "heute bin ich froh.",
    "heute bin ich aufgeregt.",
    "ich brauche gerade Ruhe.",
    "ich finde gerade keine großen Worte."
  ],
  thanks: [
    "Danke für meine Freundinnen und Freunde.",
    "Danke für einen guten Moment heute.",
    "Danke, dass ich Schönes entdecken kann.",
    "Danke, dass ich nicht allein bin."
  ],
  ask: [
    "Bitte gib mir Mut für morgen.",
    "Bitte pass auf einen Menschen auf, den ich lieb habe.",
    "Bitte hilf mir bei meinen Sorgen.",
    "Bitte hör mir einfach zu."
  ],
  ending: [
    "Amen.",
    "Danke, dass du zuhörst. Amen.",
    "Ich bin noch einen Moment still. Amen."
  ]
};

const maxStations = 5;
const MEMORY_REVEAL_MS = 1100;

function buildMemoryDeck() {
  const deck = memoryBase.flatMap((item) => [
    {
      id: item.id,
      icon: item.icon,
      cardKey: `${item.id}-word`,
      faceType: "word",
      label: "Begriff",
      title: item.title,
      text: "Finde die passende Bedeutung."
    },
    {
      id: item.id,
      icon: item.icon,
      cardKey: `${item.id}-meaning`,
      faceType: "meaning",
      label: "Bedeutung",
      title: item.text,
      text: "Zu welchem Gebetswort passt das?"
    }
  ]);

  for (let i = deck.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }
  return deck;
}

function freshState() {
  return {
    screen: "intro",
    score: 0,
    finishBurstDone: false,
    voices: {
      index: 0,
      locked: false,
      selected: null,
      results: []
    },
    differences: {
      found: []
    },
    memory: {
      deck: buildMemoryDeck(),
      flipped: [],
      matched: [],
      turns: 0,
      lock: false
    },
    quiz: {
      index: 0,
      locked: false,
      selected: null,
      results: []
    },
    builder: {
      address: builderData.address[0],
      feeling: "",
      thanks: "",
      ask: "",
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
      voices: { ...freshState().voices, ...(parsed.voices || {}) },
      differences: { ...freshState().differences, ...(parsed.differences || {}) },
      memory: {
        ...freshState().memory,
        ...(parsed.memory || {}),
        deck: Array.isArray(parsed.memory?.deck) && parsed.memory.deck.length === memoryBase.length * 2 ? parsed.memory.deck : buildMemoryDeck()
      },
      quiz: { ...freshState().quiz, ...(parsed.quiz || {}) },
      builder: { ...freshState().builder, ...(parsed.builder || {}) }
    };
  } catch (error) {
    return freshState();
  }
}

let state = loadState();

const app = document.getElementById("app");
const statusScore = document.getElementById("statusScore");
const statusProgress = document.getElementById("statusProgress");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

function completedStations() {
  return [
    state.voices.results.length === voicesData.length,
    state.differences.found.length === differenceHotspots.length,
    state.memory.matched.length === memoryBase.length,
    state.quiz.results.length === quizData.length,
    state.builder.done
  ].filter(Boolean).length;
}

function updateHeader() {
  statusScore.textContent = `⭐ ${state.score} Sternenfunken`;
  statusProgress.textContent = `${completedStations()} / ${maxStations} Stationen`;
  progressFill.style.width = `${(completedStations() / maxStations) * 100}%`;

  const labels = {
    intro: "Startklar",
    voices: "Station 1: Sternenstimmen",
    differences: "Station 2: Fehlerbild",
    memory: "Station 3: Memory",
    quiz: "Station 4: Schnupperkurs",
    builder: "Station 5: Sternenkarte",
    finish: "Ziel erreicht"
  };
  progressLabel.textContent = labels[state.screen] || "Unterwegs";

  const order = ["voices", "differences", "memory", "quiz", "builder"];
  order.forEach((key, index) => {
    const dot = document.querySelector(`[data-station-dot="${key}"]`);
    if (!dot) return;
    dot.classList.remove("done", "active");
    const done = [
      state.voices.results.length === voicesData.length,
      state.differences.found.length === differenceHotspots.length,
      state.memory.matched.length === memoryBase.length,
      state.quiz.results.length === quizData.length,
      state.builder.done
    ][index];
    if (done) dot.classList.add("done");
    if (state.screen === key) dot.classList.add("active");
  });
}

function routeCard(number, title, text) {
  return `
    <article class="route-card">
      <strong>${number}</strong>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function renderIntro() {
  const hasProgress = completedStations() > 0;
  app.innerHTML = `
    <section class="hero-grid">
      <article class="panel hero-content">
        <p class="eyebrow">Süßer Lernpfad für Klasse 5</p>
        <h2>Fünf Stationen rund ums Beten</h2>
        <p class="lead">
          Dieser Lernpfad macht die Doppelseite zu einer kleinen Reise:
          hören, entdecken, Fehler suchen, Memory spielen und am Ende eine
          eigene Sternenkarte gestalten. Alles ist extra groß, ruhig und iPad-freundlich aufgebaut.
        </p>

        <div class="route-grid">
          ${routeCard("1", "Sternenstimmen", "Was bringt Beten? Du hörst Kinderstimmen und sammelst Ideen.")}
          ${routeCard("2", "Fehlerbild", "Finde die fünf Unterschiede im Klassenraum-Bild.")}
          ${routeCard("3", "Memory", "Passe Begriffe und Gebetsideen zusammen.")}
          ${routeCard("4", "Schnupperkurs", "Wo, wann und wie kann Beten gehen?")}
          ${routeCard("5", "Sternenkarte", "Baue dein kleines eigenes Gebet aus sanften Bausteinen.")}
        </div>

        <div class="action-row">
          <button class="btn btn-primary" id="startPathBtn">Lernpfad starten</button>
          ${hasProgress ? '<button class="btn btn-secondary" id="continuePathBtn">Mit meinem Stand weiter</button>' : ""}
          <button class="btn btn-secondary" id="resetPathBtn">Neu beginnen</button>
        </div>
      </article>

      <aside class="side-stack">
        <figure class="hero-frame">
          <img src="assets/beten/hero-lernen.png" alt="Zwei Kinder entdecken gemeinsam einen Sternen-Lernpfad auf einem Tablet." />
        </figure>
      </aside>
    </section>
  `;

  document.getElementById("startPathBtn").addEventListener("click", () => {
    state.screen = "voices";
    saveState();
    render();
  });

  const continueBtn = document.getElementById("continuePathBtn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (state.builder.done) {
        state.screen = "finish";
      } else if (state.quiz.results.length === quizData.length) {
        state.screen = "builder";
      } else if (state.memory.matched.length === memoryBase.length) {
        state.screen = "quiz";
      } else if (state.differences.found.length === differenceHotspots.length) {
        state.screen = "memory";
      } else {
        state.screen = "voices";
      }
      saveState();
      render();
    });
  }

  document.getElementById("resetPathBtn").addEventListener("click", () => {
    state = freshState();
    clearState();
    render();
  });
}

function renderQuizStation(config) {
  const stationState = state[config.key];
  const item = config.data[stationState.index];
  const isLast = stationState.index === config.data.length - 1;

  const choices = item.choices.map((choice, index) => {
    let classes = "choice-btn";
    if (stationState.locked) {
      if (index === item.answer) classes += " correct";
      else if (index === stationState.selected) classes += " wrong";
    }
    return `<button class="${classes}" data-choice="${index}" ${stationState.locked ? "disabled" : ""}>${choice}</button>`;
  }).join("");

  const feedback = stationState.locked ? `
    <div class="feedback-box">
      <span class="feedback-chip ${stationState.selected === item.answer ? "feedback-good" : "feedback-note"}">
        ${stationState.selected === item.answer ? "Super getroffen" : "Fast da"}
      </span>
      <p>${item.fact}</p>
    </div>
  ` : "";

  app.innerHTML = `
    <section class="station-grid">
      <article class="panel">
        <p class="eyebrow">${config.eyebrow}</p>
        <h2>${config.title}</h2>
        <p class="lead">${config.lead}</p>

        <div class="voice-card">
          <p>${item.text || item.question}</p>
          ${item.speaker ? `<span class="voice-tag">${item.speaker}</span>` : ""}
        </div>

        <div class="choice-grid">
          ${choices}
        </div>

        ${feedback}

        <div class="action-row" style="margin-top: 18px;">
          ${stationState.locked ? `<button class="btn btn-primary" id="nextStationBtn">${isLast ? config.finishLabel : "Weiter"}</button>` : ""}
          <button class="btn btn-secondary" id="backHomeBtn">Zur Übersicht</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="mini-panel">
          <h3>Dein Stand</h3>
          <p>${stationState.results.length} von ${config.data.length} Aufgaben geschafft.</p>
          <div class="badge-row">
            <span class="badge">⭐ ${state.score} Sternenfunken</span>
            <span class="badge">${completedStations()} Stationen fertig</span>
          </div>
        </article>
        <article class="mini-panel">
          <h3>Merkhilfe</h3>
          <p>${config.tip}</p>
        </article>
      </aside>
    </section>
  `;

  app.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      if (stationState.locked) return;
      const selected = Number(button.dataset.choice);
      stationState.selected = selected;
      stationState.locked = true;
      stationState.results.push({
        index: stationState.index,
        selected,
        correct: selected === item.answer
      });
      if (selected === item.answer) state.score += 1;
      saveState();
      render();
    });
  });

  const nextButton = document.getElementById("nextStationBtn");
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      stationState.locked = false;
      stationState.selected = null;
      if (isLast) {
        state.screen = config.nextScreen;
      } else {
        stationState.index += 1;
      }
      saveState();
      render();
    });
  }

  document.getElementById("backHomeBtn").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function renderDifferences() {
  const foundAll = state.differences.found.length === differenceHotspots.length;
  const markers = differenceHotspots.filter((spot) => state.differences.found.includes(spot.id));

  app.innerHTML = `
    <section class="station-grid">
      <article class="panel">
        <p class="eyebrow">Station 2 • Fehlerbild</p>
        <h2>Finde die fünf Unterschiede</h2>
        <p class="lead">
          Beide Bilder zeigen denselben Klassenraum. Im rechten Bild haben sich fünf Fehler versteckt.
          Tippe im rechten Bild auf die Unterschiede.
        </p>

        <div class="scene-layout">
          <div class="scene-card">
            <p class="scene-label">Original</p>
            <div class="scene">
              ${sceneMarkup(false, markers)}
            </div>
          </div>
          <div class="scene-card">
            <p class="scene-label">Fehlerbild</p>
            <div class="scene alt">
              ${sceneMarkup(true, markers)}
              ${differenceHotspots.map((spot) => `
                <button
                  class="hotspot ${state.differences.found.includes(spot.id) ? "found" : ""}"
                  data-diff="${spot.id}"
                  aria-label="Unterschied ${spot.label} finden"
                  style="left:${spot.left}%; top:${spot.top}%; transform:translate(-50%, -50%);"
                ></button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="feedback-box">
          <span class="feedback-chip feedback-note">Schon gefunden: ${state.differences.found.length} / ${differenceHotspots.length}</span>
          <p>${foundAll ? "Klasse. Du hast alle Unterschiede entdeckt." : "Die Unterschiede sind jetzt deutlich größer: Schau auf Zettel, Becher, Tischkarte, Stifte und Topf."}</p>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          ${foundAll ? '<button class="btn btn-primary" id="toMemoryBtn">Weiter zum Memory</button>' : ""}
          <button class="btn btn-secondary" id="backIntroFromDiff">Zur Übersicht</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="mini-panel">
          <h3>Warum passt das?</h3>
          <p>Auch beim Beten geht es ums genaue Hinschauen: Was ist schön, was fehlt, was beschäftigt mich gerade?</p>
        </article>
        <article class="mini-panel">
          <h3>Sternenfunken</h3>
          <p>Jeder gefundene Unterschied bringt dir einen Sternenfunken.</p>
          <div class="badge-row">
            <span class="badge">⭐ ${state.score}</span>
          </div>
        </article>
      </aside>
    </section>
  `;

  app.querySelectorAll("[data-diff]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.diff;
      if (state.differences.found.includes(id)) return;
      state.differences.found.push(id);
      state.score += 1;
      saveState();
      render();
    });
  });

  const toMemoryBtn = document.getElementById("toMemoryBtn");
  if (toMemoryBtn) {
    toMemoryBtn.addEventListener("click", () => {
      state.screen = "memory";
      saveState();
      render();
    });
  }

  document.getElementById("backIntroFromDiff").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function sceneMarkup(isAlt, markers) {
  return `
    <div class="window"></div>
    <div class="sun"></div>
    <div class="garland">
      <span class="hang one"></span>
      <span class="hang two"></span>
      <span class="hang three"></span>
      <span class="hang four"></span>
    </div>
    <div class="shelf">
      <span class="book a"></span>
      <span class="book b"></span>
      <span class="book c"></span>
    </div>
    <div class="sticky"></div>
    <div class="plant">
      <span class="leaf left"></span>
      <span class="leaf right"></span>
      <span class="pot"></span>
    </div>
    <div class="desk"></div>
    <div class="notebook"></div>
    <div class="heart"></div>
    ${isAlt ? '<div class="difference-hint sticky-hint"></div><div class="difference-hint cup-hint"></div><div class="difference-hint plant-hint"></div><div class="difference-hint pencils-hint"></div><div class="difference-hint heart-hint"></div>' : ""}
    <div class="pencils">
      <span class="pencil one"></span>
      <span class="pencil two"></span>
      <span class="pencil three"></span>
      <span class="pencil four"></span>
    </div>
    <div class="cup"></div>
    ${markers.map((spot) => `
      <span class="hidden-marker" style="left:${spot.left}%; top:${spot.top}%;"></span>
    `).join("")}
  `;
}

function renderMemory() {
  const allMatched = state.memory.matched.length === memoryBase.length;

  app.innerHTML = `
    <section class="station-grid">
      <article class="panel">
        <p class="eyebrow">Station 3 • Memory</p>
        <h2>Finde zusammen, was zusammengehört</h2>
        <p class="lead">
          Hinter allen Karten steckt derselbe Rücken. Erst beim Umdrehen siehst du,
          ob dort ein Gebetswort oder eine passende Bedeutung steckt. Ein Paar ist
          geschafft, wenn Begriff und Bedeutung zusammenpassen.
        </p>

        <div class="memory-grid">
          ${state.memory.deck.map((card, index) => {
            const flipped = state.memory.flipped.includes(index) || state.memory.matched.includes(card.id);
            const matched = state.memory.matched.includes(card.id);
            return `
              <button class="memory-card ${flipped ? "flipped" : ""} ${matched ? "matched locked" : ""}" data-memory-index="${index}" ${state.memory.lock || matched ? "disabled" : ""}>
                <span class="memory-inner">
                  <span class="memory-face memory-front">
                    <span class="memory-front-badge">✨</span>
                    <span class="memory-front-title">Sternenkarte</span>
                  </span>
                  <span class="memory-face memory-back">
                    <span>
                      <em>${card.label}</em>
                      <strong>${card.title}</strong>
                      <p>${card.text}</p>
                    </span>
                  </span>
                </span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="feedback-box">
          <span class="feedback-chip feedback-note">Paare: ${state.memory.matched.length} / ${memoryBase.length}</span>
          <p>${allMatched ? "Wunderbar. Alle Paare sind gefunden." : `Schon gespielt: ${state.memory.turns} Züge.`}</p>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          ${allMatched ? '<button class="btn btn-primary" id="toQuizBtn">Weiter zum Schnupperkurs</button>' : ""}
          <button class="btn btn-secondary" id="shuffleMemoryBtn">Karten neu mischen</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="mini-panel">
          <h3>Mini-Merksatz</h3>
          <p>Beten kann Dank, Bitte, Trost, Ruhe, Erzählen und Klarheit enthalten.</p>
        </article>
        <article class="mini-panel">
          <h3>Spielidee</h3>
          <p>Jetzt musst du genauer nachdenken: Ein Begriff passt zu seiner Bedeutung, nicht zu einer identischen Karte.</p>
        </article>
      </aside>
    </section>
  `;

  app.querySelectorAll("[data-memory-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.memoryIndex);
      handleMemoryFlip(index);
    });
  });

  const toQuizBtn = document.getElementById("toQuizBtn");
  if (toQuizBtn) {
    toQuizBtn.addEventListener("click", () => {
      state.screen = "quiz";
      saveState();
      render();
    });
  }

  document.getElementById("shuffleMemoryBtn").addEventListener("click", () => {
    state.memory = {
      deck: buildMemoryDeck(),
      flipped: [],
      matched: [],
      turns: 0,
      lock: false
    };
    saveState();
    render();
  });
}

function handleMemoryFlip(index) {
  if (state.memory.lock) return;
  if (state.memory.flipped.includes(index)) return;

  state.memory.flipped.push(index);
  saveState();
  render();

  if (state.memory.flipped.length < 2) return;

  state.memory.lock = true;
  state.memory.turns += 1;
  const [firstIndex, secondIndex] = state.memory.flipped;
  const firstCard = state.memory.deck[firstIndex];
  const secondCard = state.memory.deck[secondIndex];

  window.setTimeout(() => {
    if (firstCard.id === secondCard.id) {
      if (!state.memory.matched.includes(firstCard.id)) {
        state.memory.matched.push(firstCard.id);
        state.score += 1;
      }
    }
    state.memory.flipped = [];
    state.memory.lock = false;
    saveState();
    render();
  }, MEMORY_REVEAL_MS);
}

function builderPreview() {
  return [
    state.builder.address,
    state.builder.feeling,
    state.builder.thanks,
    state.builder.ask,
    state.builder.ending
  ].filter(Boolean).join("\n");
}

function builderBlock(key, title, text, optional = true) {
  const clearButton = optional ? `<button class="chip-btn ${state.builder[key] === "" ? "selected" : ""}" data-builder="${key}" data-value="">Gerade nichts auswählen</button>` : "";
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
  const hasMiddle = Boolean(state.builder.feeling || state.builder.thanks || state.builder.ask);

  app.innerHTML = `
    <section class="station-grid">
      <article class="panel">
        <p class="eyebrow">Station 5 • Sternenkarte</p>
        <h2>Baue dein kleines Gebet</h2>
        <p class="lead">
          Hier gibt es kein falsch. Wähle einfach Sätze, die zu dir passen.
          Du darfst danken, bitten, erzählen oder auch nur still werden.
        </p>

        <div class="builder-grid">
          ${builderBlock("address", "Start", "Beginne ganz einfach.", false)}
          ${builderBlock("feeling", "Gefühl", "So könntest du einsteigen.")}
          ${builderBlock("thanks", "Dank", "Wenn du magst, nimm einen Danke-Satz dazu.")}
          ${builderBlock("ask", "Bitte", "Oder eine Bitte um Hilfe oder Mut.")}
          ${builderBlock("ending", "Ende", "Viele Gebete enden mit Amen.", false)}
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="finishBuilderBtn">Sternenkarte abschließen</button>
          <button class="btn btn-secondary" id="builderHomeBtn">Zur Übersicht</button>
        </div>
      </article>

      <aside class="side-stack">
        <article class="preview-card">
          <h3>Deine Sternenkarte</h3>
          <div class="preview-text">${builderPreview()}</div>
        </article>
        <article class="mini-panel">
          <h3>Leise ist auch okay</h3>
          <p>Wenn dir keine Worte einfallen, darf dein Gebet auch still bleiben. Genau das wird auf der Doppelseite gesagt.</p>
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

  document.getElementById("finishBuilderBtn").addEventListener("click", () => {
    if (!hasMiddle) {
      const note = document.createElement("div");
      note.className = "feedback-box";
      note.innerHTML = `
        <span class="feedback-chip feedback-note">Noch ein kleiner Schritt</span>
        <p>Wähle mindestens einen Gedanken für die Mitte deiner Sternenkarte: Gefühl, Dank oder Bitte.</p>
      `;
      app.querySelector(".panel").appendChild(note);
      return;
    }

    if (!state.builder.done) state.score += 2;
    state.builder.done = true;
    state.screen = "finish";
    saveState();
    render();
  });

  document.getElementById("builderHomeBtn").addEventListener("click", () => {
    state.screen = "intro";
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
  const voicesCorrect = state.voices.results.filter((entry) => entry.correct).length;
  const quizCorrect = state.quiz.results.filter((entry) => entry.correct).length;

  return [
    "ERGEBNIS: STERNENPOST - BETEN ENTDECKEN",
    "=======================================",
    `Datum: ${new Date().toLocaleDateString("de-DE")}`,
    `Sternenfunken: ${state.score}`,
    `Stationen geschafft: ${completedStations()} von ${maxStations}`,
    "",
    "STATIONEN",
    `1. Sternenstimmen: ${voicesCorrect} von ${voicesData.length} richtig`,
    `2. Fehlerbild: ${state.differences.found.length} von ${differenceHotspots.length} Unterschiede gefunden`,
    `3. Memory: ${state.memory.matched.length} von ${memoryBase.length} Paaren gefunden`,
    `   Zuege: ${state.memory.turns}`,
    `4. Schnupperkurs: ${quizCorrect} von ${quizData.length} richtig`,
    `5. Sternenkarte: ${state.builder.done ? "fertig" : "noch offen"}`,
    "",
    "MEINE STERNENKARTE",
    builderPreview(),
    "",
    "MERKSAETZE",
    "- Beten kann Trost, Ruhe, Dank und Klarheit schenken.",
    "- Beten geht mit einfachen Worten und an vielen Orten.",
    "- Auch Stille kann ein Gebet sein."
  ].join("\n");
}

function downloadResultText() {
  const content = buildResultText();
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Sternenpost-Ergebnis.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function fireConfetti() {
  const colors = ["#ffc94f", "#7fd6c6", "#ff8675", "#7d84f6", "#ffeaa6"];
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

function renderFinish() {
  if (!state.finishBurstDone) {
    fireConfetti();
    state.finishBurstDone = true;
    saveState();
  }

  app.innerHTML = `
    <section class="finish-grid">
      <article class="panel">
        <p class="eyebrow">Ziel erreicht</p>
        <h2>Deine Sternenpost ist fertig</h2>
        <p class="lead">
          Du hast die Inhalte der Doppelseite jetzt als Lernpfad bearbeitet:
          mit Stimmen, Fehlerbild, Memory, Schnupperkurs und deiner eigenen Sternenkarte.
        </p>

        <div class="summary-grid" style="margin-top: 18px;">
          ${summaryCard("Sternenfunken", `⭐ ${state.score}`, "Alles zusammen ergibt deinen Lernpfad-Stand.")}
          ${summaryCard("Stationen", `${completedStations()} / ${maxStations}`, "Alle fünf Stationen sind geschafft.")}
          ${summaryCard("Memory", `${state.memory.matched.length} / ${memoryBase.length}`, "Begriffe und Bedeutungen passend entdeckt.")}
          ${summaryCard("Fehlerbild", `${state.differences.found.length} / ${differenceHotspots.length}`, "Beim genauen Hinschauen alle Unterschiede gefunden.")}
        </div>

        <div class="preview-card" style="margin-top: 18px;">
          <h3>Deine Sternenkarte</h3>
          <div class="preview-text">${builderPreview()}</div>
        </div>

        <div class="action-row" style="margin-top: 18px;">
          <button class="btn btn-primary" id="downloadTxtBtn">Ergebnis als TXT laden</button>
          <button class="btn btn-primary" id="restartPathBtn">Noch einmal spielen</button>
          <button class="btn btn-secondary" id="backOverviewBtn">Zur Übersicht</button>
        </div>
      </article>

      <aside class="side-stack">
        <figure class="hero-frame finish-image">
          <img src="assets/beten/hero-abschluss.png" alt="Zwei Kinder freuen sich über ihre fertige Sternenkarte nach dem Lernpfad." />
        </figure>
        <article class="mini-panel">
          <h3>Merksätze aus der Seite</h3>
          <div class="helper-list">
            <div class="helper-item">Beten kann Trost, Ruhe, Dank und Klarheit schenken.</div>
            <div class="helper-item">Beten geht mit einfachen Worten und an vielen Orten.</div>
            <div class="helper-item">Auch Stille kann ein Gebet sein.</div>
          </div>
        </article>
      </aside>
    </section>
  `;

  document.getElementById("downloadTxtBtn").addEventListener("click", () => {
    downloadResultText();
  });

  document.getElementById("restartPathBtn").addEventListener("click", () => {
    state = freshState();
    clearState();
    render();
  });

  document.getElementById("backOverviewBtn").addEventListener("click", () => {
    state.screen = "intro";
    saveState();
    render();
  });
}

function render() {
  if (state.builder.done && state.screen !== "finish") {
    state.screen = "finish";
  }

  updateHeader();

  switch (state.screen) {
    case "intro":
      renderIntro();
      break;
    case "voices":
      renderQuizStation({
        key: "voices",
        data: voicesData,
        eyebrow: "Station 1 • Sternenstimmen",
        title: "Was bringt Beten?",
        lead: "Lies die Kinderstimmen und tippe die Aussage an, die am besten passt.",
        tip: "Auf der Doppelseite ist Beten nicht nur Bitte. Es kann auch Trost, Dank, Ruhe und Klarheit bedeuten.",
        finishLabel: "Weiter zum Fehlerbild",
        nextScreen: "differences"
      });
      break;
    case "differences":
      renderDifferences();
      break;
    case "memory":
      renderMemory();
      break;
    case "quiz":
      renderQuizStation({
        key: "quiz",
        data: quizData,
        eyebrow: "Station 4 • Schnupperkurs",
        title: "Wie geht Beten?",
        lead: "Hier sammelst du die Kernideen der rechten Buchseite.",
        tip: "Man darf ganz einfach anfangen: mit eigenen Worten, jederzeit und fast überall.",
        finishLabel: "Weiter zur Sternenkarte",
        nextScreen: "builder"
      });
      break;
    case "builder":
      renderBuilder();
      break;
    default:
      renderFinish();
  }
}

render();
