const alphabet = [
  { upper: "Α", lower: "α", name: "Alpha", sound: "a", hint: "wie A in Ameise", audio: "assets/audio/alpha.mp3", token: "alpha", theme: "goldene Schriftrolle" },
  { upper: "Β", lower: "β", name: "Beta", sound: "b", hint: "wie B in Ball", audio: "assets/audio/beta.mp3", token: "beta", theme: "Terrakotta-Vase" },
  { upper: "Γ", lower: "γ", name: "Gamma", sound: "g", hint: "wie G in Garten", audio: "assets/audio/gamma.mp3", token: "gamma", theme: "Marmor-Säule" },
  { upper: "Δ", lower: "δ", name: "Delta", sound: "d", hint: "wie D in Dose", audio: "assets/audio/delta.mp3", token: "delta", theme: "Tempeldach" },
  { upper: "Ε", lower: "ε", name: "Epsilon", sound: "e", hint: "kurzes E", audio: "assets/audio/epsilon.mp3", token: "epsilon", theme: "Wachstafel" },
  { upper: "Ζ", lower: "ζ", name: "Zeta", sound: "z", hint: "wie stimmhaftes S", audio: "assets/audio/zeta.mp3", token: "zeta", theme: "Hafensegel" },
  { upper: "Η", lower: "η", name: "Eta", sound: "e", hint: "langes E", audio: "assets/audio/eta.mp3", token: "eta", theme: "Olivenhain" },
  { upper: "Θ", lower: "θ", name: "Theta", sound: "th", hint: "wie englisch think", audio: "assets/audio/theta.mp3", token: "theta", theme: "Theatermaske" },
  { upper: "Ι", lower: "ι", name: "Iota", sound: "i", hint: "wie I in Igel", audio: "assets/audio/iota.mp3", token: "iota", theme: "Mosaikstein" },
  { upper: "Κ", lower: "κ", name: "Kappa", sound: "k", hint: "wie K in Kiste", audio: "assets/audio/kappa.mp3", token: "kappa", theme: "Bibliotheksrolle" },
  { upper: "Λ", lower: "λ", name: "Lambda", sound: "l", hint: "wie L in Lampe", audio: "assets/audio/lambda.mp3", token: "lambda", theme: "Bergpfad" },
  { upper: "Μ", lower: "μ", name: "My", sound: "m", hint: "wie M in Mond", audio: "assets/audio/my.mp3", token: "my", theme: "Münze" },
  { upper: "Ν", lower: "ν", name: "Ny", sound: "n", hint: "wie N in Nase", audio: "assets/audio/ny.mp3", token: "ny", theme: "Schriftband" },
  { upper: "Ξ", lower: "ξ", name: "Xi", sound: "x", hint: "wie ks in Keks", audio: "assets/audio/xi.mp3", token: "xi", theme: "Wellenlinie" },
  { upper: "Ο", lower: "ο", name: "Omikron", sound: "o", hint: "kurzes O", audio: "assets/audio/omikron.mp3", token: "omikron", theme: "kleiner Schild" },
  { upper: "Π", lower: "π", name: "Pi", sound: "p", hint: "wie P in Paket", audio: "assets/audio/pi.mp3", token: "pi", theme: "Tor zum Tempel" },
  { upper: "Ρ", lower: "ρ", name: "Rho", sound: "r", hint: "gerolltes R", audio: "assets/audio/rho.mp3", token: "rho", theme: "rotes Siegel" },
  { upper: "Σ", lower: "σ/ς", name: "Sigma", sound: "s", hint: "ς steht am Wortende", audio: "assets/audio/sigma.mp3", token: "sigma", theme: "Sternkarte" },
  { upper: "Τ", lower: "τ", name: "Tau", sound: "t", hint: "wie T in Tafel", audio: "assets/audio/tau.mp3", token: "tau", theme: "Steintafel" },
  { upper: "Υ", lower: "υ", name: "Ypsilon", sound: "y/u", hint: "später oft wie Ü", audio: "assets/audio/ypsilon.mp3", token: "ypsilon", theme: "blaue Amphore" },
  { upper: "Φ", lower: "φ", name: "Phi", sound: "ph", hint: "wie F", audio: "assets/audio/phi.mp3", token: "phi", theme: "goldener Kranz" },
  { upper: "Χ", lower: "χ", name: "Chi", sound: "ch", hint: "wie ch in Bach", audio: "assets/audio/chi.mp3", token: "chi", theme: "Kreuzweg" },
  { upper: "Ψ", lower: "ψ", name: "Psi", sound: "ps", hint: "wie ps in Gips", audio: "assets/audio/psi.mp3", token: "psi", theme: "Dreizack-Muster" },
  { upper: "Ω", lower: "ω", name: "Omega", sound: "o", hint: "langes O", audio: "assets/audio/omega.mp3", token: "omega", theme: "großer Abschlusskranz" }
];

const stationStories = {
  match: ["Die Säulen stehen wieder gerade.", "Du hast Groß- und Kleinbuchstaben verbunden. Ein Mosaikstein leuchtet."],
  memory: ["Die Theatermasken erinnern sich.", "Du hast Namen und Zeichen gefunden. Die Bühne schenkt dir ein Lorbeerblatt."],
  sort: ["Die Bibliothek ist geordnet.", "Die Rollen liegen wieder in richtiger Reihenfolge."],
  catch: ["Der Hafen jubelt.", "Du hast die richtigen Zeichen aus der Brandung gefischt."],
  rush: ["Die Agora wird hell.", "Schnelle Augen, klare Zeichen: Du hast die Blitzrunde geschafft."],
  trial: ["Der Tempel öffnet sich.", "Dein Abschlussmosaik ist vollständig genug für den nächsten Auftrag."]
};

const state = {
  currentLetter: 0,
  tutorialIndex: 0,
  selectedUpper: null,
  matchRound: [],
  matchDone: 0,
  memoryFirst: null,
  memoryLock: false,
  memoryDone: 0,
  sortRound: [],
  sortIndex: 0,
  catchRound: [],
  catchTarget: null,
  catchDone: 0,
  rushTimer: null,
  rushTime: 60,
  rushScore: 0,
  trialIndex: 0,
  trialScore: 0,
  trialQuestions: [],
  reviewQueue: [],
  boss: null,
  progress: loadProgress()
};

const els = {
  xpValue: document.querySelector("#xpValue"),
  progressBar: document.querySelector("#progressBar"),
  progressText: document.querySelector("#progressText"),
  levelText: document.querySelector("#levelText"),
  badgeRow: document.querySelector("#badgeRow"),
  letterCard: document.querySelector("#letterCard"),
  letterList: document.querySelector("#letterList"),
  matchInfo: document.querySelector("#matchInfo"),
  matchScore: document.querySelector("#matchScore"),
  upperColumn: document.querySelector("#upperColumn"),
  lowerColumn: document.querySelector("#lowerColumn"),
  memoryInfo: document.querySelector("#memoryInfo"),
  memoryScore: document.querySelector("#memoryScore"),
  memoryGrid: document.querySelector("#memoryGrid"),
  sortInfo: document.querySelector("#sortInfo"),
  sortScore: document.querySelector("#sortScore"),
  sortBoard: document.querySelector("#sortBoard"),
  catchInfo: document.querySelector("#catchInfo"),
  catchScore: document.querySelector("#catchScore"),
  catchBoard: document.querySelector("#catchBoard"),
  catchTarget: document.querySelector("#catchTarget"),
  rushTimer: document.querySelector("#rushTimer"),
  rushPrompt: document.querySelector("#rushPrompt"),
  rushAnswers: document.querySelector("#rushAnswers"),
  rushResult: document.querySelector("#rushResult"),
  reviewCard: document.querySelector("#reviewCard"),
  mistakeList: document.querySelector("#mistakeList"),
  albumGrid: document.querySelector("#albumGrid"),
  trialQuestion: document.querySelector("#trialQuestion"),
  trialOptions: document.querySelector("#trialOptions"),
  trialFeedback: document.querySelector("#trialFeedback"),
  storyModal: document.querySelector("#storyModal"),
  storyKicker: document.querySelector("#storyKicker"),
  storyTitle: document.querySelector("#storyTitle"),
  storyText: document.querySelector("#storyText"),
  bossModal: document.querySelector("#bossModal"),
  bossTitle: document.querySelector("#bossTitle"),
  bossQuestion: document.querySelector("#bossQuestion"),
  bossOptions: document.querySelector("#bossOptions"),
  bossFeedback: document.querySelector("#bossFeedback"),
  tutorialModal: document.querySelector("#tutorialModal"),
  tutorialImage: document.querySelector("#tutorialImage"),
  tutorialKicker: document.querySelector("#tutorialKicker"),
  tutorialTitle: document.querySelector("#tutorialTitle"),
  tutorialText: document.querySelector("#tutorialText"),
  tutorialDots: document.querySelector("#tutorialDots"),
  tutorialBack: document.querySelector("#tutorialBack"),
  tutorialSkip: document.querySelector("#tutorialSkip"),
  tutorialNext: document.querySelector("#tutorialNext"),
  narratorWidget: document.querySelector("#narratorWidget"),
  narratorTitle: document.querySelector("#narratorTitle"),
  narratorText: document.querySelector("#narratorText"),
  guideMission: document.querySelector("#guideMission"),
  learningPath: document.querySelector("#learningPath"),
  guideTitle: document.querySelector("#guideTitle"),
  guideText: document.querySelector("#guideText")
};

const narratorLines = {
  home: ["Kallia wartet auf dich!", "Ich bin Kallia, die junge Schreiberin. Folge dem Lernweg und hilf mir, die Schriftrollen der Agora zu ordnen."],
  learn: ["Schriftrolle", "Schau dir die Zeichen an, höre sie dir an und markiere nur die Buchstaben, die du wirklich sicher kannst."],
  match: ["Säulen-Spiel", "Wähle links einen Großbuchstaben und suche rechts seinen kleinen Partner."],
  memory: ["Theater-Memory", "Merke dir die Zeichen wie Rollen auf einer Bühne. Falsche Paare landen in deiner Übungs-Schriftrolle."],
  sort: ["Bibliothek", "Ordne die Rollen in der Reihenfolge des griechischen Alphabets."],
  catch: ["Hafenfang", "Im Hafen schwimmen Zeichen vorbei. Tippe nur auf das gesuchte."],
  rush: ["Agora-Blitz", "Jetzt zählt Tempo. Lieber genau als wild klicken."],
  review: ["Übungs-Schriftrolle", "Hier warten die Zeichen, die eben noch knifflig waren."],
  album: ["Sammelalbum", "Jede sichere Antwort schaltet neue Karten und Mosaikstücke frei."],
  trial: ["Tempelprüfung", "Wenn du genug Zeichen sicher kennst, kannst du die Abschlussrunde schaffen."]
};

const learningSteps = [
  { view: "learn", title: "1. Entdecken", text: "Höre die ersten Zeichen und sammle sichere Buchstaben.", required: 0, complete: 3 },
  { view: "match", title: "2. Paare finden", text: "Verbinde Groß- und Kleinbuchstaben.", required: 0, complete: 6 },
  { view: "memory", title: "3. Namen merken", text: "Finde Zeichen und Namen im Theater.", required: 3, complete: 9 },
  { view: "sort", title: "4. Reihenfolge", text: "Ordne die Schriftrollen im Alphabet.", required: 6, complete: 12 },
  { view: "catch", title: "5. Schnell erkennen", text: "Fange im Hafen das richtige Zeichen.", required: 9, complete: 18 },
  { view: "trial", title: "6. Tempelprüfung", text: "Zeige, dass du die 24 Zeichen beherrschst.", required: 18, complete: 24 }
];

const tutorialSteps = [
  {
    image: "assets/generated/ai-narrator.png",
    kicker: "Kallias Einführung",
    title: "Willkommen in der Alpha-Agora!",
    text: "Ich bin Kallia, eine junge Schreiberin. Du hilfst mir, die griechischen Schriftrollen wieder richtig zu ordnen."
  },
  {
    image: "assets/generated/ai-scrolls.png",
    kicker: "Schritt 1",
    title: "Erst entdecken",
    text: "Beginne mit der Schriftrolle. Schau dir die Form an, sprich den Namen und höre dir den Buchstaben an."
  },
  {
    image: "assets/generated/ai-map-quest.png",
    kicker: "Schritt 2",
    title: "Folge dem Lernweg",
    text: "Der gelbe Rahmen zeigt dir, welche Station gerade passt. Gesperrte Stationen öffnen sich, wenn du genug Zeichen sicher kannst."
  },
  {
    image: "assets/generated/ai-learn-kids.png",
    kicker: "Wenn es schwer wird",
    title: "Ich helfe dir",
    text: "Klicke auf Hilf mir. Wenn ein Zeichen öfter falsch ist, lege ich es automatisch in deine Übungs-Schriftrolle."
  },
  {
    image: "assets/generated/ai-temple.png",
    kicker: "Ziel",
    title: "Am Ende wartet die Tempelprüfung",
    text: "Sammle die 24 Buchstabenbilder und zeige in der Prüfung, dass du das griechische Alphabet beherrschst."
  }
];

const stationIntros = {
  learn: ["Kallias erster Auftrag", "Schau dir die ersten Zeichen in Ruhe an. Nutze Anhören und drücke Kann ich nur, wenn du das Zeichen wiedererkennst."],
  match: ["Säulen-Spiel", "Jetzt verbindest du Groß- und Kleinbuchstaben. Wähle links ein großes Zeichen und suche rechts seinen kleinen Partner."],
  memory: ["Theater-Memory", "Finde Zeichen und Namen als Paar. Sage den Namen leise mit, dann bleibt er besser hängen."],
  sort: ["Bibliothek", "Ordne die Schriftrollen in Alphabet-Reihenfolge. Beginne immer bei Alpha."],
  catch: ["Hafenfang", "Lies zuerst den Namen im blauen Feld. Fange dann nur das passende Zeichen."],
  rush: ["Agora-Blitz", "Jetzt wird es schnell. Genauigkeit ist wichtiger als wildes Klicken."],
  review: ["Übungs-Schriftrolle", "Hier landen Zeichen, die noch wackelig sind. Übe sie kurz und kehre dann zum Lernweg zurück."],
  album: ["Sammelalbum", "Hier siehst du deine freigeschalteten Buchstabenbilder. Verborgene Karten warten noch auf dich."],
  trial: ["Tempelprüfung", "Wenn du genug Zeichen sicher kennst, kannst du zeigen, was du gelernt hast."]
};

function loadProgress() {
  const fallback = { xp: 0, mastered: [], wrong: [], bosses: [], stones: 0, intros: [], tutorialSeen: false };
  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem("alphaAgoraProgress")) || {}) };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem("alphaAgoraProgress", JSON.stringify(state.progress));
}

function normalizeProgress() {
  state.progress.mastered = [...new Set(state.progress.mastered || [])];
  state.progress.wrong = [...new Set(state.progress.wrong || [])];
  state.progress.bosses = [...new Set(state.progress.bosses || [])];
  state.progress.intros = [...new Set(state.progress.intros || [])];
  state.progress.stones = state.progress.stones || 0;
  state.progress.tutorialSeen = Boolean(state.progress.tutorialSeen);
}

function stageSize() {
  const mastered = state.progress.mastered.length;
  if (mastered >= 18) return 24;
  if (mastered >= 12) return 18;
  if (mastered >= 6) return 12;
  return 6;
}

function activePool() {
  return alphabet.slice(0, stageSize());
}

function byName(name) {
  return alphabet.find((item) => item.name === name);
}

function letterArtSrc(item) {
  const index = alphabet.findIndex((entry) => entry.name === item.name) + 1;
  return `assets/generated/letter-${String(index).padStart(2, "0")}-${item.token}.png`;
}

function addXp(amount, letterName) {
  state.progress.xp += amount;
  if (letterName && !state.progress.mastered.includes(letterName)) {
    state.progress.mastered.push(letterName);
    state.progress.wrong = state.progress.wrong.filter((name) => name !== letterName);
  }
  saveProgress();
  renderAllProgress();
}

function markWrong(item) {
  if (item && !state.progress.wrong.includes(item.name) && !state.progress.mastered.includes(item.name)) {
    state.progress.wrong.push(item.name);
    saveProgress();
    renderAllProgress();
  }
}

function renderAllProgress() {
  normalizeProgress();
  const mastered = state.progress.mastered.length;
  els.xpValue.textContent = state.progress.xp;
  els.progressBar.style.width = `${Math.round((mastered / alphabet.length) * 100)}%`;
  els.progressText.textContent = `${mastered} von ${alphabet.length} Buchstaben sicher.`;
  els.levelText.textContent = `Aktuell übst du die ersten ${stageSize()} Zeichen. ${state.progress.wrong.length} Zeichen warten in der Übungs-Schriftrolle.`;
  renderBadges();
  renderMapLocks();
  renderLetterList();
  renderAlbum();
  renderMistakes();
  renderLearningPath();
  renderGuide();
}

function currentGuide() {
  const mastered = state.progress.mastered.length;
  if (state.progress.wrong.length >= 3) {
    return {
      view: "review",
      title: "Kallias Rettungsrolle",
      text: `${state.progress.wrong.length} Zeichen sind noch wackelig. Übe sie kurz, dann geht die Reise leichter weiter.`,
      help: "Klicke im Übungsbereich ein Zeichen an. Schau dir Bild, Namen und Laut an, höre es dir an und markiere es erst dann als sicher."
    };
  }
  if (mastered < 3) {
    return {
      view: "learn",
      title: "Erst die ersten Zeichen sichern",
      text: "Starte ruhig: Alpha bis Zeta reichen für den Anfang. Höre dir die Zeichen an und sammle die ersten sicheren Karten.",
      help: "Merksatz: Schau zuerst auf die Form, sprich den Namen laut und nutze dann Anhören. Danach nur Kann ich drücken, wenn du es allein wiedererkennst."
    };
  }
  if (mastered < 6) {
    return {
      view: "match",
      title: "Groß und klein verbinden",
      text: "Übe jetzt im Säulen-Spiel, welche großen und kleinen Zeichen zusammengehören.",
      help: "Tipp von Kallia: Suche zuerst auffällige Paare. Alpha und Beta sehen sich ähnlich. Bei kniffligen Zeichen zurück zur Schriftrolle."
    };
  }
  if (mastered < 9) {
    return {
      view: "memory",
      title: "Namen im Theater merken",
      text: "Du bist bereit fürs Theater-Memory. Hier merkst du dir Zeichen und Namen zusammen.",
      help: "Decke langsam auf und sage den Namen leise mit. Wenn ein Paar falsch war, merkt Kallia es für die Übungs-Schriftrolle."
    };
  }
  if (mastered < 12) {
    return {
      view: "sort",
      title: "Alphabet-Reihenfolge bauen",
      text: "Ordne in der Bibliothek die Schriftrollen. So entsteht die Reihenfolge des Alphabets.",
      help: "Beginne immer bei Alpha. Wenn du unsicher bist, schaue kurz in die Buchstabenliste und probiere dann weiter."
    };
  }
  if (mastered < 18) {
    return {
      view: "catch",
      title: "Zeichen im Hafen fangen",
      text: "Jetzt trainierst du schnelles Erkennen. Tippe nur auf das gesuchte Zeichen.",
      help: "Lies zuerst den Namen im blauen Feld. Suche dann nur dieses Zeichen. Genauigkeit zählt mehr als Tempo."
    };
  }
  if (mastered < 24) {
    return {
      view: "rush",
      title: "Agora-Blitz vor der Prüfung",
      text: "Mische jetzt alles im Blitzspiel. Danach ist die Tempelprüfung dran.",
      help: "Wenn der Blitz zu schwer ist, geh kurz zu Üben oder Schriftrolle. Kallia verliert keinen Fortschritt."
    };
  }
  return {
    view: "trial",
    title: "Bereit für die Tempelprüfung",
    text: "Du hast alle 24 Zeichen gesammelt. Zeig Kallia, dass die Schriftrollen wieder vollständig sind.",
    help: "Atme kurz durch. In der Prüfung kommen Namen und Kleinbuchstaben gemischt vor."
  };
}

function renderLearningPath() {
  if (!els.learningPath) return;
  const mastered = state.progress.mastered.length;
  const guide = currentGuide();
  const buttons = learningSteps.map((step, index) => {
    const button = document.createElement("button");
    const locked = mastered < step.required;
    const done = mastered >= step.complete;
    button.className = "path-step";
    button.classList.toggle("locked", locked);
    button.classList.toggle("done", done);
    button.classList.toggle("current", guide.view === step.view || (guide.view === "rush" && step.view === "catch"));
    button.disabled = locked;
    button.innerHTML = `
      <span>${index + 1}</span>
      <strong>${step.title}</strong>
      <small>${locked ? `${step.required} sichere Zeichen nötig` : step.text}</small>
    `;
    button.addEventListener("click", () => switchView(step.view));
    return button;
  });
  els.learningPath.replaceChildren(...buttons);
}

function renderGuide() {
  const guide = currentGuide();
  if (els.guideTitle) els.guideTitle.textContent = guide.title;
  if (els.guideText) els.guideText.textContent = guide.text;
  if (els.guideMission) {
    els.guideMission.textContent = `${guide.text} Kallia sammelt schwierige Zeichen automatisch in der Übungs-Schriftrolle.`;
  }
}

function goToGuideStep() {
  switchView(currentGuide().view);
}

function showGuideHelp() {
  const guide = currentGuide();
  els.narratorTitle.textContent = guide.title;
  els.narratorText.textContent = guide.help;
  els.narratorWidget.classList.remove("collapsed");
}

function openTutorial(index = 0) {
  state.tutorialIndex = Math.max(0, Math.min(index, tutorialSteps.length - 1));
  renderTutorial();
  els.tutorialModal.hidden = false;
  els.narratorWidget.classList.add("collapsed");
}

function closeTutorial(markSeen = true) {
  els.tutorialModal.hidden = true;
  if (markSeen) {
    state.progress.tutorialSeen = true;
    saveProgress();
  }
}

function renderTutorial() {
  const step = tutorialSteps[state.tutorialIndex];
  els.tutorialImage.src = step.image;
  els.tutorialKicker.textContent = step.kicker;
  els.tutorialTitle.textContent = step.title;
  els.tutorialText.textContent = step.text;
  els.tutorialBack.disabled = state.tutorialIndex === 0;
  els.tutorialNext.textContent = state.tutorialIndex === tutorialSteps.length - 1 ? "Loslernen" : "Weiter";
  els.tutorialDots.replaceChildren(...tutorialSteps.map((_, index) => {
    const dot = document.createElement("span");
    dot.className = "tutorial-dot";
    dot.classList.toggle("active", index === state.tutorialIndex);
    return dot;
  }));
}

function nextTutorialStep() {
  if (state.tutorialIndex >= tutorialSteps.length - 1) {
    closeTutorial(true);
    switchView("learn");
    return;
  }
  state.tutorialIndex += 1;
  renderTutorial();
}

function previousTutorialStep() {
  state.tutorialIndex = Math.max(0, state.tutorialIndex - 1);
  renderTutorial();
}

function maybeShowStationIntro(view) {
  if (!stationIntros[view] || state.progress.intros.includes(view) || !els.storyModal.hidden || !els.tutorialModal.hidden) return;
  state.progress.intros.push(view);
  saveProgress();
  const [title, text] = stationIntros[view];
  showStory("Kallias Tipp", title, text);
}

function renderBadges() {
  const badges = [];
  if (state.progress.xp >= 40) badges.push("Bronze-Lorbeer");
  if (state.progress.xp >= 120) badges.push("Silber-Schriftrolle");
  if (state.progress.bosses.length >= 3) badges.push("Wächterfreund");
  if (state.progress.stones >= 5) badges.push("Mosaikbauer");
  if (state.progress.mastered.length >= 24) badges.push("Alpha-Meister");
  els.badgeRow.replaceChildren(...badges.map((badge) => {
    const span = document.createElement("span");
    span.className = "badge";
    span.textContent = badge;
    return span;
  }));
}

function renderMapLocks() {
  const mastered = state.progress.mastered.length;
  const rules = { memory: 3, sort: 6, catch: 9, rush: 12, trial: 18 };
  const labels = {
    learn: "Entdecken",
    match: "Paare verbinden",
    memory: "Namen merken",
    sort: "Reihenfolge bauen",
    catch: "Zeichen fangen",
    rush: "Schnell reagieren",
    trial: "Alles kombinieren"
  };
  document.querySelectorAll(".map-step").forEach((button) => {
    const required = rules[button.dataset.jump] || 0;
    const locked = mastered < required;
    button.classList.toggle("locked", locked);
    button.disabled = locked;
    button.querySelector("small").textContent = locked ? `${required} sichere Zeichen` : labels[button.dataset.jump];
  });
  document.querySelectorAll(".nav-tab").forEach((button) => {
    const required = rules[button.dataset.view] || 0;
    const locked = mastered < required;
    button.disabled = locked;
    button.classList.toggle("locked", locked);
    button.title = locked ? `${required} sichere Zeichen nötig` : "";
  });
}

function switchView(view) {
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === view));
  document.querySelectorAll(".nav-tab").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
  updateNarrator(view);
  renderGuide();
  if (view === "album") renderAlbum();
  if (view === "review") renderReview();
  setTimeout(() => maybeShowStationIntro(view), 120);
}

function updateNarrator(view) {
  const [title, text] = narratorLines[view] || narratorLines.home;
  els.narratorTitle.textContent = title;
  els.narratorText.textContent = text;
  els.narratorWidget.classList.remove("collapsed");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function sampleLetters(count, source = activePool()) {
  return shuffle(source).slice(0, Math.min(count, source.length));
}

function renderLetter() {
  const item = alphabet[state.currentLetter];
  els.letterCard.innerHTML = `
    <img class="letter-art-image" src="${letterArtSrc(item)}" alt="Bildkarte zu ${item.name}">
    <div class="greek-big">${item.upper}${item.lower}</div>
    <h3>${item.name}</h3>
    <p><strong>Laut:</strong> ${item.sound}</p>
    <p>${item.hint}</p>
    <p class="card-theme">${item.theme}</p>
    <div class="letter-actions">
      <button class="primary-btn" id="masterLetter">Kann ich!</button>
      <button class="ghost-btn" id="speakLetter">Anhören</button>
    </div>
  `;
  document.querySelector("#masterLetter").addEventListener("click", () => addXp(5, item.name));
  document.querySelector("#speakLetter").addEventListener("click", () => playLetterAudio(item));
  renderLetterList();
}

function renderLetterList() {
  if (!els.letterList) return;
  const unlockedCount = stageSize();
  const buttons = alphabet.map((item, index) => {
    const button = document.createElement("button");
    const locked = index >= unlockedCount;
    button.className = "letter-pill";
    button.classList.toggle("active", index === state.currentLetter);
    button.classList.toggle("mastered", state.progress.mastered.includes(item.name));
    button.classList.toggle("locked", locked);
    button.disabled = locked;
    button.innerHTML = `<strong>${locked ? "?" : item.upper}</strong><small>${locked ? "später" : item.name}</small>`;
    button.addEventListener("click", () => {
      state.currentLetter = index;
      renderLetter();
    });
    return button;
  });
  els.letterList.replaceChildren(...buttons);
}

function playLetterAudio(item) {
  const audio = new Audio(item.audio);
  audio.play().catch(() => {
    const status = document.querySelector("#letterCard p:last-of-type");
    if (status) status.textContent = `${item.hint} Audio konnte nicht abgespielt werden.`;
  });
}

function sound(kind) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = kind === "ok" ? 660 : 190;
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  osc.start();
  osc.stop(ctx.currentTime + 0.18);
}

function newMatchRound() {
  state.matchRound = sampleLetters(6);
  state.selectedUpper = null;
  state.matchDone = 0;
  els.matchInfo.textContent = "Wähle links einen Großbuchstaben.";
  renderMatch();
}

function renderMatch() {
  els.matchScore.textContent = `${state.matchDone}/${state.matchRound.length}`;
  els.upperColumn.replaceChildren(...state.matchRound.map((item) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.dataset.name = item.name;
    button.innerHTML = `<span class="symbol">${item.upper}</span>${item.name}`;
    button.addEventListener("click", () => {
      if (button.classList.contains("done")) return;
      state.selectedUpper = item;
      document.querySelectorAll("#upperColumn .choice-btn").forEach((node) => node.classList.remove("selected"));
      button.classList.add("selected");
      els.matchInfo.textContent = `Welcher Kleinbuchstabe gehört zu ${item.name}?`;
    });
    return button;
  }));

  els.lowerColumn.replaceChildren(...shuffle(state.matchRound).map((item) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.dataset.name = item.name;
    button.innerHTML = `<span class="symbol">${item.lower}</span>Kleinbuchstabe`;
    button.addEventListener("click", () => checkMatch(button, item));
    return button;
  }));
}

function checkMatch(button, item) {
  if (!state.selectedUpper || button.classList.contains("done")) return;
  if (state.selectedUpper.name === item.name) {
    button.classList.add("done", "spark");
    document.querySelector(`#upperColumn .choice-btn[data-name="${item.name}"]`).classList.add("done", "spark");
    state.matchDone += 1;
    addXp(8, item.name);
    sound("ok");
    els.matchInfo.textContent = `Richtig: ${item.upper} und ${item.lower} sind ${item.name}.`;
    state.selectedUpper = null;
    document.querySelectorAll("#upperColumn .choice-btn").forEach((node) => node.classList.remove("selected"));
    if (state.matchDone === state.matchRound.length) finishStation("match");
  } else {
    markWrong(state.selectedUpper);
    markWrong(item);
    sound("bad");
    button.classList.add("wrong");
    els.matchInfo.textContent = `Fast. ${state.selectedUpper.name} passt nicht zu ${item.lower}.`;
    setTimeout(() => button.classList.remove("wrong"), 360);
  }
  els.matchScore.textContent = `${state.matchDone}/${state.matchRound.length}`;
}

function newMemoryRound() {
  const round = sampleLetters(6);
  const cards = shuffle(round.flatMap((item) => [
    { id: item.name, label: item.upper, item },
    { id: item.name, label: item.name, item }
  ]));
  state.memoryFirst = null;
  state.memoryLock = false;
  state.memoryDone = 0;
  els.memoryInfo.textContent = "Decke zwei Theaterkarten auf.";
  els.memoryScore.textContent = `0/${round.length}`;
  els.memoryGrid.replaceChildren(...cards.map((card) => createMemoryCard(card, round.length)));
}

function createMemoryCard(card, total) {
  const button = document.createElement("button");
  button.className = "memory-card";
  button.dataset.id = card.id;
  button.innerHTML = `<span class="memory-face">?</span>`;
  button.addEventListener("click", () => revealMemory(button, card, total));
  return button;
}

function revealMemory(button, card, total) {
  if (state.memoryLock || button.classList.contains("matched") || button.classList.contains("revealed")) return;
  button.classList.add("revealed");
  button.querySelector(".memory-face").textContent = card.label;
  if (!state.memoryFirst) {
    state.memoryFirst = { button, card };
    return;
  }
  state.memoryLock = true;
  if (state.memoryFirst.card.id === card.id && state.memoryFirst.button !== button) {
    button.classList.add("matched", "spark");
    state.memoryFirst.button.classList.add("matched", "spark");
    state.memoryDone += 1;
    addXp(10, card.item.name);
    sound("ok");
    els.memoryInfo.textContent = `Paar gefunden: ${card.item.name}.`;
    els.memoryScore.textContent = `${state.memoryDone}/${total}`;
    state.memoryFirst = null;
    state.memoryLock = false;
    if (state.memoryDone === total) finishStation("memory");
  } else {
    markWrong(card.item);
    markWrong(state.memoryFirst.card.item);
    sound("bad");
    els.memoryInfo.textContent = "Diese zwei gehören nicht zusammen.";
    setTimeout(() => {
      [button, state.memoryFirst.button].forEach((node) => {
        node.classList.remove("revealed");
        node.querySelector(".memory-face").textContent = "?";
      });
      state.memoryFirst = null;
      state.memoryLock = false;
    }, 760);
  }
}

function newSortRound() {
  state.sortRound = sampleLetters(6).sort((a, b) => alphabet.indexOf(a) - alphabet.indexOf(b));
  state.sortIndex = 0;
  els.sortInfo.textContent = "Klicke die Buchstaben in Alphabet-Reihenfolge an.";
  renderSort();
}

function renderSort() {
  els.sortScore.textContent = `${state.sortIndex}/${state.sortRound.length}`;
  els.sortBoard.replaceChildren(...shuffle(state.sortRound).map((item) => {
    const button = document.createElement("button");
    button.className = "choice-btn scroll-choice";
    button.dataset.name = item.name;
    button.innerHTML = `<span class="symbol">${item.upper}</span>${item.name}`;
    button.addEventListener("click", () => checkSort(button, item));
    return button;
  }));
}

function checkSort(button, item) {
  const expected = state.sortRound[state.sortIndex];
  if (!expected || button.classList.contains("done")) return;
  if (item.name === expected.name) {
    button.classList.add("done", "spark");
    state.sortIndex += 1;
    addXp(7, item.name);
    sound("ok");
    els.sortInfo.textContent = state.sortIndex < state.sortRound.length
      ? `Gut. Jetzt kommt ${state.sortRound[state.sortIndex].name}.`
      : "Alle Rollen liegen richtig.";
    if (state.sortIndex === state.sortRound.length) finishStation("sort");
  } else {
    markWrong(item);
    button.classList.add("wrong");
    sound("bad");
    els.sortInfo.textContent = `Erst ${expected.name}, dann ${item.name}.`;
    setTimeout(() => button.classList.remove("wrong"), 360);
  }
  els.sortScore.textContent = `${state.sortIndex}/${state.sortRound.length}`;
}

function newCatchRound() {
  state.catchRound = sampleLetters(8);
  state.catchDone = 0;
  nextCatchTarget();
}

function nextCatchTarget() {
  if (state.catchDone >= 8) {
    finishStation("catch");
    return;
  }
  state.catchTarget = sampleLetters(1, activePool())[0];
  els.catchTarget.textContent = `Fange: ${state.catchTarget.name}`;
  els.catchScore.textContent = `${state.catchDone}/8`;
  const decoys = sampleLetters(7, alphabet.filter((item) => item.name !== state.catchTarget.name));
  const options = shuffle([state.catchTarget, ...decoys]);
  els.catchBoard.replaceChildren(...options.map((item, index) => {
    const button = document.createElement("button");
    button.className = "catch-token";
    button.style.setProperty("--x", `${8 + ((index * 13) % 76)}%`);
    button.style.setProperty("--y", `${18 + ((index * 29) % 58)}%`);
    button.innerHTML = `<span>${item.upper}</span>`;
    button.addEventListener("click", () => {
      if (item.name === state.catchTarget.name) {
        state.catchDone += 1;
        addXp(5, item.name);
        sound("ok");
        els.catchInfo.textContent = `Gefangen: ${item.name}.`;
        nextCatchTarget();
      } else {
        markWrong(item);
        button.classList.add("wrong");
        sound("bad");
        els.catchInfo.textContent = `Das war ${item.name}. Gesucht ist ${state.catchTarget.name}.`;
        setTimeout(() => button.classList.remove("wrong"), 360);
      }
    });
    return button;
  }));
}

function startRush() {
  clearInterval(state.rushTimer);
  state.rushTime = 60;
  state.rushScore = 0;
  els.rushResult.textContent = "Los geht's!";
  nextRushQuestion();
  state.rushTimer = setInterval(() => {
    state.rushTime -= 1;
    els.rushTimer.textContent = `${state.rushTime} Sekunden`;
    if (state.rushTime <= 0) {
      clearInterval(state.rushTimer);
      els.rushPrompt.textContent = "Zeit vorbei!";
      els.rushAnswers.replaceChildren();
      els.rushResult.textContent = `Du hast ${state.rushScore} Zeichen gefangen.`;
      addXp(state.rushScore);
      if (state.rushScore >= 8) finishStation("rush");
    }
  }, 1000);
}

function nextRushQuestion() {
  const correct = sampleLetters(1)[0];
  const askName = Math.random() > 0.5;
  const options = shuffle([correct, ...sampleLetters(3, alphabet.filter((item) => item.name !== correct.name))]);
  els.rushTimer.textContent = `${state.rushTime} Sekunden`;
  els.rushPrompt.textContent = askName ? `Welcher Buchstabe heißt ${correct.name}?` : `Wie heißt ${correct.upper}?`;
  els.rushAnswers.replaceChildren(...options.map((item) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.innerHTML = askName ? `<span class="symbol">${item.upper}</span>` : item.name;
    button.addEventListener("click", () => {
      if (item.name === correct.name) {
        state.rushScore += 1;
        els.rushResult.textContent = `Richtig. Punkte: ${state.rushScore}`;
        sound("ok");
        addXp(2, item.name);
        nextRushQuestion();
      } else {
        markWrong(correct);
        markWrong(item);
        els.rushResult.textContent = `Knapp daneben. Richtig wäre ${correct.name}.`;
        sound("bad");
      }
    });
    return button;
  }));
}

function finishStation(station) {
  const [title, text] = stationStories[station];
  const bossSeen = state.progress.bosses.includes(station);
  if (bossSeen) {
    showStory("Station geschafft", title, text);
    return;
  }
  startBoss(station);
}

function startBoss(station) {
  state.boss = {
    station,
    index: 0,
    score: 0,
    questions: sampleLetters(5).map((item) => ({ item, mode: Math.random() > 0.5 ? "name" : "lower" }))
  };
  els.bossTitle.textContent = `Wächter von ${stationLabel(station)}`;
  els.bossFeedback.textContent = "";
  els.bossModal.hidden = false;
  renderBossQuestion();
}

function renderBossQuestion() {
  const question = state.boss.questions[state.boss.index];
  if (!question) {
    const passed = state.boss.score >= 4;
    if (passed) {
      state.progress.bosses.push(state.boss.station);
      state.progress.stones += 1;
      addXp(25);
      const [title, text] = stationStories[state.boss.station];
      els.bossModal.hidden = true;
      showStory("Mosaikstein gewonnen", title, text);
    } else {
      els.bossQuestion.textContent = `Fast geschafft: ${state.boss.score}/5. Übe kurz und versuche es wieder.`;
      els.bossOptions.replaceChildren();
      setTimeout(() => {
        els.bossModal.hidden = true;
        switchView("review");
      }, 1400);
    }
    return;
  }
  const { item, mode } = question;
  els.bossQuestion.textContent = mode === "name" ? `Wie heißt ${item.upper}?` : `Welcher Kleinbuchstabe gehört zu ${item.upper}?`;
  const options = shuffle([item, ...sampleLetters(3, alphabet.filter((entry) => entry.name !== item.name))]);
  els.bossOptions.replaceChildren(...options.map((option) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.innerHTML = mode === "name" ? option.name : `<span class="symbol">${option.lower}</span>`;
    button.addEventListener("click", () => {
      if (option.name === item.name) {
        state.boss.score += 1;
        addXp(4, item.name);
        sound("ok");
        els.bossFeedback.textContent = "Richtig.";
      } else {
        markWrong(item);
        sound("bad");
        els.bossFeedback.textContent = `Nicht ganz: ${item.name}.`;
      }
      state.boss.index += 1;
      setTimeout(renderBossQuestion, 480);
    });
    return button;
  }));
}

function stationLabel(station) {
  return ({ match: "den Säulen", memory: "dem Theater", sort: "der Bibliothek", catch: "dem Hafen", rush: "der Agora" }[station] || "der Station");
}

function showStory(kicker, title, text) {
  els.storyKicker.textContent = kicker;
  els.storyTitle.textContent = title;
  els.storyText.textContent = text;
  els.storyModal.hidden = false;
}

function renderMistakes() {
  const wrong = state.progress.wrong.map(byName).filter(Boolean);
  els.mistakeList.replaceChildren(...(wrong.length ? wrong : activePool().slice(0, 4)).map((item) => {
    const button = document.createElement("button");
    button.className = "letter-pill";
    button.innerHTML = `<strong>${item.upper}</strong><small>${item.name}</small>`;
    button.addEventListener("click", () => {
      state.reviewQueue = [item];
      renderReview();
    });
    return button;
  }));
}

function renderReview() {
  const queue = state.progress.wrong.map(byName).filter(Boolean);
  state.reviewQueue = queue.length ? queue : sampleLetters(4);
  const item = state.reviewQueue[0];
  els.reviewCard.innerHTML = `
    <img class="letter-art-image" src="${letterArtSrc(item)}" alt="Bildkarte zu ${item.name}">
    <div class="greek-big">${item.upper}${item.lower}</div>
    <h3>${item.name}</h3>
    <p>${item.hint}</p>
    <div class="letter-actions">
      <button class="primary-btn" id="reviewKnown">Kann ich jetzt</button>
      <button class="ghost-btn" id="reviewHear">Anhören</button>
    </div>
  `;
  document.querySelector("#reviewKnown").addEventListener("click", () => addXp(6, item.name));
  document.querySelector("#reviewHear").addEventListener("click", () => playLetterAudio(item));
  renderMistakes();
}

function renderAlbum() {
  if (!els.albumGrid) return;
  els.albumGrid.replaceChildren(...alphabet.map((item, index) => {
    const unlocked = state.progress.mastered.includes(item.name);
    const card = document.createElement("article");
    card.className = "album-card";
    card.classList.toggle("locked", !unlocked);
    card.innerHTML = `
      <div class="album-art mosaic-${index % 6}">
        <img src="${letterArtSrc(item)}" alt="Buchstabenbild ${item.name}">
        <span>${unlocked ? item.upper : "?"}</span>
      </div>
      <h3>${unlocked ? item.name : "Noch verborgen"}</h3>
      <p>${unlocked ? item.theme : "Meistere das Zeichen, um die Karte freizuschalten."}</p>
    `;
    return card;
  }));
}

function startTrial() {
  state.trialIndex = 0;
  state.trialScore = 0;
  state.trialQuestions = shuffle(alphabet).slice(0, 10).map((item) => ({ item, mode: Math.random() > 0.5 ? "name" : "lower" }));
  els.trialFeedback.textContent = "";
  renderTrialQuestion();
}

function renderTrialQuestion() {
  const question = state.trialQuestions[state.trialIndex];
  if (!question) {
    const passed = state.trialScore >= 8;
    els.trialQuestion.textContent = passed
      ? `Bestanden: ${state.trialScore}/10. Dein Mosaik glänzt!`
      : `Noch eine Runde Übung: ${state.trialScore}/10.`;
    els.trialOptions.replaceChildren();
    if (passed) {
      addXp(40);
      showStory("Tempelprüfung", "Der Tempel öffnet sich.", "Du hast genug Zeichen erkannt, um das Abschlussmosaik weiterzubauen.");
    }
    return;
  }
  const { item, mode } = question;
  els.trialQuestion.textContent = mode === "name" ? `Wie heißt ${item.upper}?` : `Welcher Kleinbuchstabe gehört zu ${item.upper}?`;
  const options = shuffle([item, ...sampleLetters(3, alphabet.filter((entry) => entry.name !== item.name))]);
  els.trialOptions.replaceChildren(...options.map((option) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.innerHTML = mode === "name" ? option.name : `<span class="symbol">${option.lower}</span>`;
    button.addEventListener("click", () => {
      if (option.name === item.name) {
        state.trialScore += 1;
        addXp(6, item.name);
        sound("ok");
        els.trialFeedback.textContent = "Richtig.";
      } else {
        markWrong(item);
        sound("bad");
        els.trialFeedback.textContent = `Nicht ganz: Es war ${item.name}.`;
      }
      state.trialIndex += 1;
      setTimeout(renderTrialQuestion, 520);
    });
    return button;
  }));
}

function bindEvents() {
  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.jump));
  });
  document.querySelector("#prevLetter").addEventListener("click", () => {
    state.currentLetter = (state.currentLetter + alphabet.length - 1) % stageSize();
    renderLetter();
  });
  document.querySelector("#nextLetter").addEventListener("click", () => {
    state.currentLetter = (state.currentLetter + 1) % stageSize();
    renderLetter();
  });
  document.querySelector("#newMatchRound").addEventListener("click", newMatchRound);
  document.querySelector("#newMemoryRound").addEventListener("click", newMemoryRound);
  document.querySelector("#newSortRound").addEventListener("click", newSortRound);
  document.querySelector("#newCatchRound").addEventListener("click", newCatchRound);
  document.querySelector("#newReviewRound").addEventListener("click", renderReview);
  document.querySelector("#startRush").addEventListener("click", startRush);
  document.querySelector("#startTrial").addEventListener("click", startTrial);
  document.querySelector("#closeStory").addEventListener("click", () => {
    els.storyModal.hidden = true;
    renderAllProgress();
  });
  document.querySelector("#narratorToggle").addEventListener("click", () => {
    els.narratorWidget.classList.toggle("collapsed");
  });
  document.querySelector("#narratorNext").addEventListener("click", goToGuideStep);
  document.querySelector("#narratorHelp").addEventListener("click", showGuideHelp);
  document.querySelector("#narratorTutorial").addEventListener("click", () => openTutorial(0));
  document.querySelector("#guideGo").addEventListener("click", goToGuideStep);
  document.querySelector("#guideHelp").addEventListener("click", showGuideHelp);
  document.querySelector("#guideTutorial").addEventListener("click", () => openTutorial(0));
  document.querySelector("#nextGuideStep").addEventListener("click", goToGuideStep);
  document.querySelector("#openTutorial").addEventListener("click", () => openTutorial(0));
  document.querySelector("#tutorialBack").addEventListener("click", previousTutorialStep);
  document.querySelector("#tutorialNext").addEventListener("click", nextTutorialStep);
  document.querySelector("#tutorialSkip").addEventListener("click", () => closeTutorial(true));
  document.querySelector("#resetProgress").addEventListener("click", () => {
    state.progress = { xp: 0, mastered: [], wrong: [], bosses: [], stones: 0, intros: [], tutorialSeen: false };
    saveProgress();
    renderLetter();
    renderAllProgress();
    openTutorial(0);
  });
}

bindEvents();
normalizeProgress();
renderLetter();
renderAllProgress();
updateNarrator("home");
newMatchRound();
newMemoryRound();
newSortRound();
newCatchRound();
if (!state.progress.tutorialSeen) {
  setTimeout(() => openTutorial(0), 350);
}
