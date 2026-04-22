const PATH = [
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 4, y: 3 },
  { x: 4, y: 2 },
  { x: 4, y: 1 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 6, y: 1 },
  { x: 6, y: 2 },
  { x: 6, y: 3 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 9, y: 4 },
  { x: 10, y: 4 },
  { x: 10, y: 5 },
  { x: 10, y: 6 },
  { x: 9, y: 6 },
  { x: 8, y: 6 },
  { x: 7, y: 6 },
  { x: 6, y: 6 },
  { x: 6, y: 7 },
  { x: 6, y: 8 },
  { x: 6, y: 9 },
  { x: 6, y: 10 },
  { x: 5, y: 10 },
  { x: 4, y: 10 },
  { x: 4, y: 9 },
  { x: 4, y: 8 },
  { x: 4, y: 7 },
  { x: 4, y: 6 },
  { x: 3, y: 6 },
  { x: 2, y: 6 },
  { x: 1, y: 6 },
  { x: 0, y: 6 },
  { x: 0, y: 5 },
];

const LETTERS = [
  { upper: "Α", lower: "α", name: "Alpha", sound: "a" },
  { upper: "Β", lower: "β", name: "Beta", sound: "b" },
  { upper: "Γ", lower: "γ", name: "Gamma", sound: "g" },
  { upper: "Δ", lower: "δ", name: "Delta", sound: "d" },
  { upper: "Ε", lower: "ε", name: "Epsilon", sound: "kurzes e" },
  { upper: "Ζ", lower: "ζ", name: "Zeta", sound: "ds" },
  { upper: "Η", lower: "η", name: "Eta", sound: "langes e" },
  { upper: "Θ", lower: "θ", name: "Theta", sound: "th" },
  { upper: "Ι", lower: "ι", name: "Iota", sound: "i" },
  { upper: "Κ", lower: "κ", name: "Kappa", sound: "k" },
  { upper: "Λ", lower: "λ", name: "Lambda", sound: "l" },
  { upper: "Μ", lower: "μ", name: "My", sound: "m" },
  { upper: "Ν", lower: "ν", name: "Ny", sound: "n" },
  { upper: "Ξ", lower: "ξ", name: "Xi", sound: "ks" },
  { upper: "Ο", lower: "ο", name: "Omikron", sound: "kurzes o" },
  { upper: "Π", lower: "π", name: "Pi", sound: "p" },
  { upper: "Ρ", lower: "ρ", name: "Rho", sound: "r" },
  { upper: "Σ", lower: "σ", name: "Sigma", sound: "s" },
  { upper: "Τ", lower: "τ", name: "Tau", sound: "t" },
  { upper: "Υ", lower: "υ", name: "Ypsilon", sound: "ue" },
  { upper: "Φ", lower: "φ", name: "Phi", sound: "ph" },
  { upper: "Χ", lower: "χ", name: "Chi", sound: "ch" },
  { upper: "Ψ", lower: "ψ", name: "Psi", sound: "ps" },
  { upper: "Ω", lower: "ω", name: "Omega", sound: "langes o" },
];

const QUESTION_VARIANTS_PER_TYPE = 4;
const QUESTION_TYPES = [
  {
    key: "name",
    title: "Buchstabenname",
    description: "Name zum Zeichen",
    prompts: [
      "Wie heisst dieses Buchstabenpaar?",
      "Welcher Name gehoert zu diesem griechischen Zeichen?",
      "Wie nennt man diesen Buchstaben?",
      "Welcher Buchstabenname passt hier?",
    ],
  },
  {
    key: "lower",
    title: "Kleinschrift",
    description: "Gross zu klein",
    prompts: [
      "Welche Kleinschreibung gehoert zu {upper}?",
      "Welches kleine Zeichen passt zu {upper}?",
      "Wie schreibt man {upper} klein?",
      "Welcher Kleinbuchstabe gehoert zu {upper}?",
    ],
  },
  {
    key: "upper",
    title: "Grossschrift",
    description: "Klein zu gross",
    prompts: [
      "Welche Grossschreibung gehoert zu {lower}?",
      "Welches grosse Zeichen passt zu {lower}?",
      "Wie schreibt man {lower} gross?",
      "Welcher Grossbuchstabe gehoert zu {lower}?",
    ],
  },
  {
    key: "sound",
    title: "Lautwert",
    description: "Laut zum Zeichen",
    prompts: [
      "Wie klingt dieser Buchstabe ungefaehr?",
      "Welcher Laut passt zu diesem Zeichen?",
      "Wie spricht man diesen Buchstaben grob aus?",
      "Welcher Lautwert gehoert zu diesem Buchstaben?",
    ],
  },
  {
    key: "glyph",
    title: "Zeichenbild",
    description: "Zeichen zum Namen",
    prompts: [
      "Wie sieht {name} aus?",
      "Welches Zeichenpaar gehoert zu {name}?",
      "Welche Schreibweise passt zu {name}?",
      "Womit schreibt man {name} im Alphabet?",
    ],
  },
];

const DISTRACTOR_PATTERNS = [
  [1, 5],
  [2, 8],
  [3, 11],
  [4, 13],
];

const TOTAL_TASKS =
  LETTERS.length * QUESTION_TYPES.length * QUESTION_VARIANTS_PER_TYPE;

const TEAMS = [
  {
    id: "red",
    badge: "Α",
    defaultName: "Alpha",
    startIndex: 0,
    baseCoords: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    finishCoords: [
      { x: 1, y: 5 },
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
    ],
  },
  {
    id: "blue",
    badge: "Β",
    defaultName: "Beta",
    startIndex: 30,
    baseCoords: [
      { x: 1, y: 8 },
      { x: 2, y: 8 },
      { x: 1, y: 9 },
      { x: 2, y: 9 },
    ],
    finishCoords: [
      { x: 5, y: 9 },
      { x: 5, y: 8 },
      { x: 5, y: 7 },
      { x: 5, y: 6 },
    ],
  },
  {
    id: "green",
    badge: "Γ",
    defaultName: "Gamma",
    startIndex: 20,
    baseCoords: [
      { x: 8, y: 8 },
      { x: 9, y: 8 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ],
    finishCoords: [
      { x: 9, y: 5 },
      { x: 8, y: 5 },
      { x: 7, y: 5 },
      { x: 6, y: 5 },
    ],
  },
  {
    id: "gold",
    badge: "Δ",
    defaultName: "Delta",
    startIndex: 10,
    baseCoords: [
      { x: 8, y: 1 },
      { x: 9, y: 1 },
      { x: 8, y: 2 },
      { x: 9, y: 2 },
    ],
    finishCoords: [
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
    ],
  },
];

const DIE_FACES = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅",
};

const board = document.querySelector("#board");
const setupForm = document.querySelector("#setupForm");
const currentPlayerName = document.querySelector("#currentPlayerName");
const turnBadge = document.querySelector("#turnBadge");
const rollButton = document.querySelector("#rollButton");
const dieFace = document.querySelector("#dieFace");
const phaseHint = document.querySelector("#phaseHint");
const effectStatus = document.querySelector("#effectStatus");
const turnActions = document.querySelector("#turnActions");
const questionPop = document.querySelector("#questionPop");
const questionModeLabel = document.querySelector("#questionModeLabel");
const questionStage = document.querySelector("#questionStage");
const questionSubline = document.querySelector("#questionSubline");
const answerButtons = document.querySelector("#answerButtons");
const moveButtons = document.querySelector("#moveButtons");
const continueButton = document.querySelector("#continueButton");
const playerList = document.querySelector("#playerList");
const alphabetGrid = document.querySelector("#alphabetGrid");
const taskBreakdown = document.querySelector("#taskBreakdown");
const panelTaskTotal = document.querySelector("#panelTaskTotal");
const panelTaskRemaining = document.querySelector("#panelTaskRemaining");
const logList = document.querySelector("#logList");
const overlayRoot = document.querySelector("#overlayRoot");
const overlayPanels = [...document.querySelectorAll(".overlay-panel")];
const panelToggles = [...document.querySelectorAll(".panel-toggle")];
const overlayCloseButtons = [...document.querySelectorAll("[data-close-overlay]")];
const feedbackFlash = document.querySelector("#feedbackFlash");
const toggleSoundButton = document.querySelector("#toggleSoundButton");

const state = {
  players: [],
  currentPlayer: 0,
  phase: "roll",
  die: null,
  question: null,
  legalMoves: [],
  turnEnd: null,
  winner: null,
  log: [],
  taskDeck: [],
  busy: false,
  overlay: null,
  flashTimeout: null,
  effectsEnabled: true,
  audioContext: null,
  bonusValue: 0,
  effect: null,
  notice: "",
};

const pawnElements = [];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function placeOnGrid(element, coord) {
  element.style.left = `calc(${coord.x} * var(--cell))`;
  element.style.top = `calc(${coord.y} * var(--cell))`;
}

function coordKey(coord) {
  return `${coord.x}-${coord.y}`;
}

function normalizeName(value, fallback) {
  const cleaned = value
    .replace(/[<>]/g, "")
    .replace(/[^\p{L}\p{N}\s._-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14);
  return cleaned || fallback;
}

function formatLetterPair(letter) {
  return `${letter.upper} ${letter.lower}`;
}

function cloneTeams() {
  return TEAMS.map((team, index) => {
    const formValue = setupForm.elements[`player${index}`].value;
    return {
      ...team,
      displayName: normalizeName(formValue, team.defaultName),
      pawns: [-1, -1, -1, -1],
      skipTurns: 0,
    };
  });
}

function getDistractorLetters(letterIndex, variant) {
  return DISTRACTOR_PATTERNS[variant].map(
    (offset) => LETTERS[(letterIndex + offset) % LETTERS.length]
  );
}

function buildQuestionOfType(type, letter, letterIndex, variant) {
  const distractors = getDistractorLetters(letterIndex, variant);
  const prompt = type.prompts[variant]
    .replace("{upper}", letter.upper)
    .replace("{lower}", letter.lower)
    .replace("{name}", letter.name);

  if (type.key === "name") {
    return {
      type: type.key,
      typeTitle: type.title,
      prompt,
      display: formatLetterPair(letter),
      options: shuffle([letter.name, ...distractors.map((entry) => entry.name)]),
      correct: letter.name,
      explanation: `${formatLetterPair(letter)} heisst ${letter.name} und klingt wie ${letter.sound}.`,
    };
  }

  if (type.key === "lower") {
    return {
      type: type.key,
      typeTitle: type.title,
      prompt,
      display: letter.upper,
      options: shuffle([letter.lower, ...distractors.map((entry) => entry.lower)]),
      correct: letter.lower,
      explanation: `Zu ${letter.upper} gehoert ${letter.lower}.`,
    };
  }

  if (type.key === "upper") {
    return {
      type: type.key,
      typeTitle: type.title,
      prompt,
      display: letter.lower,
      options: shuffle([letter.upper, ...distractors.map((entry) => entry.upper)]),
      correct: letter.upper,
      explanation: `Zur Kleinschreibung ${letter.lower} gehoert ${letter.upper}.`,
    };
  }

  if (type.key === "sound") {
    return {
      type: type.key,
      typeTitle: type.title,
      prompt,
      display: formatLetterPair(letter),
      options: shuffle([letter.sound, ...distractors.map((entry) => entry.sound)]),
      correct: letter.sound,
      explanation: `${formatLetterPair(letter)} klingt ungefaehr wie ${letter.sound}.`,
    };
  }

  return {
    type: type.key,
    typeTitle: type.title,
    prompt,
    display: letter.name,
    options: shuffle([
      formatLetterPair(letter),
      ...distractors.map((entry) => formatLetterPair(entry)),
    ]),
    correct: formatLetterPair(letter),
    explanation: `${letter.name} schreibt man als ${formatLetterPair(letter)}.`,
  };
}

function createQuestionDeck() {
  const deck = [];

  LETTERS.forEach((letter, letterIndex) => {
    QUESTION_TYPES.forEach((type) => {
      for (let variant = 0; variant < QUESTION_VARIANTS_PER_TYPE; variant += 1) {
        deck.push(buildQuestionOfType(type, letter, letterIndex, variant));
      }
    });
  });

  return shuffle(deck);
}

function drawQuestion() {
  if (!state.taskDeck.length) {
    state.taskDeck = createQuestionDeck();
    addLog("Der Orakelstapel wurde neu gemischt.");
    showFlash("info", "Stapel neu gemischt");
  }

  return state.taskDeck.pop();
}

function getCurrentPlayer() {
  return state.players[state.currentPlayer];
}

function canExitHouse(die) {
  return die === 5 || die === 6;
}

function getTargetProgress(progress, die, bonusValue = 0) {
  if (progress === -1) {
    if (!canExitHouse(die)) {
      return null;
    }
    return bonusValue;
  }

  const targetProgress = progress + die + bonusValue;
  if (targetProgress > 43) {
    return null;
  }

  return targetProgress;
}

function getPawnCoord(playerIndex, pawnIndex, progress) {
  const player = state.players[playerIndex];

  if (progress === -1) {
    return player.baseCoords[pawnIndex];
  }

  if (progress <= 39) {
    return PATH[(player.startIndex + progress) % PATH.length];
  }

  return player.finishCoords[progress - 40];
}

function setPawnPosition(playerIndex, pawnIndex, progress) {
  const pawn = pawnElements[playerIndex][pawnIndex];
  placeOnGrid(pawn, getPawnCoord(playerIndex, pawnIndex, progress));
}

function ownPawnBlocks(playerIndex, pawnIndex, targetProgress) {
  const targetKey = coordKey(getPawnCoord(playerIndex, pawnIndex, targetProgress));
  return state.players[playerIndex].pawns.some((progress, otherIndex) => {
    if (otherIndex === pawnIndex || progress === -1) {
      return false;
    }

    return coordKey(getPawnCoord(playerIndex, otherIndex, progress)) === targetKey;
  });
}

function canMovePawn(playerIndex, pawnIndex, die, bonusValue = 0) {
  const progress = state.players[playerIndex].pawns[pawnIndex];

  if (progress === 43) {
    return false;
  }

  const targetProgress = getTargetProgress(progress, die, bonusValue);
  if (targetProgress === null) {
    return false;
  }

  return !ownPawnBlocks(playerIndex, pawnIndex, targetProgress);
}

function getLegalMoves(playerIndex, die, bonusValue = 0) {
  return state.players[playerIndex].pawns
    .map((progress, pawnIndex) => ({ progress, pawnIndex }))
    .filter(({ pawnIndex }) =>
      canMovePawn(playerIndex, pawnIndex, die, bonusValue)
    )
    .map(({ pawnIndex }) => pawnIndex);
}

function findCapturedPawn(playerIndex, coord) {
  for (let index = 0; index < state.players.length; index += 1) {
    if (index === playerIndex) {
      continue;
    }

    const enemy = state.players[index];
    for (let pawnIndex = 0; pawnIndex < enemy.pawns.length; pawnIndex += 1) {
      const progress = enemy.pawns[pawnIndex];
      if (progress < 0 || progress > 39) {
        continue;
      }

      const enemyCoord = getPawnCoord(index, pawnIndex, progress);
      if (coordKey(enemyCoord) === coordKey(coord)) {
        return { playerIndex: index, pawnIndex };
      }
    }
  }

  return null;
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 12);
}

function setTurnEnd(nextPlayer, message, buttonLabel) {
  state.phase = "turnEnd";
  state.turnEnd = {
    nextPlayer,
    message,
    buttonLabel,
  };
}

function showFlash(type, message) {
  clearTimeout(state.flashTimeout);
  feedbackFlash.textContent = message;
  feedbackFlash.className = `feedback-flash ${type}`;
  requestAnimationFrame(() => {
    feedbackFlash.classList.add("show");
  });
  state.flashTimeout = setTimeout(() => {
    feedbackFlash.classList.remove("show");
  }, 1100);
}

function resolveSkippedPlayers() {
  const skippedMessages = [];
  let safety = 0;

  while (
    state.players[state.currentPlayer].skipTurns > 0 &&
    safety < state.players.length
  ) {
    const skippedPlayer = state.players[state.currentPlayer];
    skippedPlayer.skipTurns -= 1;
    const message = `${skippedPlayer.displayName} setzt diese Runde aus.`;
    skippedMessages.push(message);
    addLog(message);
    state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    safety += 1;
  }

  return skippedMessages;
}

function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    state.audioContext = new AudioContextClass();
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  return state.audioContext;
}

function playToneSequence(notes, wave = "triangle") {
  if (!state.effectsEnabled) {
    return;
  }

  const context = ensureAudioContext();
  if (!context) {
    return;
  }

  let now = context.currentTime + 0.02;

  notes.forEach(({ freq, duration, gain = 0.06 }) => {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(freq, now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.linearRampToValueAtTime(gain, now + 0.02);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(envelope).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
    now += duration * 0.86;
  });
}

function playRollSound() {
  playToneSequence(
    [
      { freq: 260, duration: 0.06, gain: 0.04 },
      { freq: 310, duration: 0.06, gain: 0.04 },
      { freq: 370, duration: 0.08, gain: 0.05 },
    ],
    "square"
  );
}

function playCorrectSound() {
  playToneSequence(
    [
      { freq: 392, duration: 0.08, gain: 0.05 },
      { freq: 494, duration: 0.08, gain: 0.05 },
      { freq: 587, duration: 0.12, gain: 0.06 },
    ],
    "triangle"
  );
}

function playWrongSound() {
  playToneSequence(
    [
      { freq: 392, duration: 0.08, gain: 0.05 },
      { freq: 330, duration: 0.08, gain: 0.05 },
      { freq: 262, duration: 0.12, gain: 0.06 },
    ],
    "sawtooth"
  );
}

function playMoveSound() {
  playToneSequence(
    [
      { freq: 330, duration: 0.05, gain: 0.04 },
      { freq: 392, duration: 0.08, gain: 0.05 },
    ],
    "triangle"
  );
}

function playCaptureSound() {
  playToneSequence(
    [
      { freq: 190, duration: 0.06, gain: 0.05 },
      { freq: 150, duration: 0.09, gain: 0.05 },
    ],
    "square"
  );
}

function playVictorySound() {
  playToneSequence(
    [
      { freq: 392, duration: 0.1, gain: 0.05 },
      { freq: 523, duration: 0.1, gain: 0.06 },
      { freq: 659, duration: 0.16, gain: 0.07 },
      { freq: 784, duration: 0.22, gain: 0.08 },
    ],
    "triangle"
  );
}

function updateSoundButton() {
  toggleSoundButton.textContent = `Klang ${state.effectsEnabled ? "an" : "aus"}`;
}

function renderTaskBreakdown() {
  taskBreakdown.innerHTML = QUESTION_TYPES.map(
    (type) => `
      <article class="task-entry">
        <strong>${type.title}: ${LETTERS.length * QUESTION_VARIANTS_PER_TYPE}</strong>
        <p>${type.description}</p>
      </article>
    `
  ).join("");
}

function openPanel(panelId) {
  state.overlay = panelId;
  overlayRoot.classList.remove("hidden");
  overlayRoot.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");

  overlayPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== panelId);
  });
}

function closeOverlay() {
  state.overlay = null;
  overlayRoot.classList.add("hidden");
  overlayRoot.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
  overlayPanels.forEach((panel) => panel.classList.add("hidden"));
}

async function animateDieRoll(result) {
  dieFace.classList.add("rolling");
  for (let step = 0; step < 10; step += 1) {
    dieFace.textContent = DIE_FACES[(step % 6) + 1];
    await delay(70);
  }
  dieFace.classList.remove("rolling");
  dieFace.textContent = DIE_FACES[result];
}

async function animatePawnTravel(playerIndex, pawnIndex, fromProgress, toProgress) {
  const pawn = pawnElements[playerIndex][pawnIndex];
  pawn.classList.add("moving");

  if (fromProgress === -1) {
    setPawnPosition(playerIndex, pawnIndex, 0);
    await delay(240);
  } else {
    for (let progress = fromProgress + 1; progress <= toProgress; progress += 1) {
      setPawnPosition(playerIndex, pawnIndex, progress);
      await delay(progress >= 40 ? 210 : 145);
    }
  }

  pawn.classList.remove("moving");
}

async function animateCapture(playerIndex, pawnIndex) {
  const pawn = pawnElements[playerIndex][pawnIndex];
  pawn.classList.add("captured");
  await delay(380);
  pawn.classList.remove("captured");
}

async function rollDie() {
  if (state.phase !== "roll" || state.winner || state.busy) {
    return;
  }

  state.busy = true;
  state.notice = "";
  state.effect = null;
  state.bonusValue = 0;
  const result = Math.floor(Math.random() * 6) + 1;
  await animateDieRoll(result);
  playRollSound();
  state.die = result;
  state.question = drawQuestion();
  state.phase = "quiz";
  state.busy = false;
  render();
}

function revealAnswerState(selectedOption, correct) {
  [...answerButtons.querySelectorAll("button")].forEach((button) => {
    button.disabled = true;
    if (button.dataset.option === state.question.correct) {
      button.classList.add("correct");
    }
    if (!correct && button.dataset.option === selectedOption) {
      button.classList.add("wrong");
    }
  });
}

async function answerQuestion(selectedOption) {
  if (state.phase !== "quiz" || state.busy) {
    return;
  }

  state.busy = true;
  const player = getCurrentPlayer();
  const correct = selectedOption === state.question.correct;

  revealAnswerState(selectedOption, correct);

  if (!correct) {
    playWrongSound();
    showFlash("error", "Nicht ganz");
    await delay(860);
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    player.skipTurns = Math.min(1, player.skipTurns + 1);
    state.effect = {
      type: "penalty",
      text: `Tempelpause: ${player.displayName} setzt die naechste Runde aus.`,
    };
    const message = `Nicht ganz. ${state.question.explanation} Tempelpause: ${player.displayName} setzt die naechste Runde aus.`;
    addLog(`${player.displayName} loest die Aufgabe nicht richtig und erhaelt eine Tempelpause.`);
    setTurnEnd(nextPlayer, message, `Weiter zu ${state.players[nextPlayer].displayName}`);
    state.busy = false;
    render();
    return;
  }

  playCorrectSound();
  showFlash("success", "Richtig");
  await delay(720);

  state.bonusValue = Math.floor(Math.random() * 3) + 1;
  state.effect = {
    type: "reward",
    text: `Goetterbonus: +${state.bonusValue} Schritte fuer diesen Zug.`,
  };
  state.legalMoves = getLegalMoves(
    state.currentPlayer,
    state.die,
    state.bonusValue
  );
  if (state.legalMoves.length === 0) {
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    const message = `Richtig. ${state.question.explanation} Der Goetterbonus ist +${state.bonusValue}, aber es gibt trotzdem keinen moeglichen Zug.`;
    addLog(`${player.displayName} wusste die Antwort, konnte aber nicht ziehen.`);
    setTurnEnd(nextPlayer, message, `Weiter zu ${state.players[nextPlayer].displayName}`);
    state.busy = false;
    render();
    return;
  }

  state.phase = "move";
  state.busy = false;
  render();
}

async function movePawn(pawnIndex) {
  if (
    state.phase !== "move" ||
    state.busy ||
    !state.legalMoves.includes(pawnIndex)
  ) {
    return;
  }

  state.busy = true;
  const player = getCurrentPlayer();
  const progress = player.pawns[pawnIndex];
  const targetProgress = getTargetProgress(progress, state.die, state.bonusValue);
  let message = "";

  if (progress === -1 && state.bonusValue > 0) {
    message = `${player.displayName} bringt Figur ${pawnIndex + 1} ins Spiel und zieht mit dem Goetterbonus noch ${state.bonusValue} Felder weiter.`;
  } else if (progress === -1) {
    message = `${player.displayName} bringt Figur ${pawnIndex + 1} ins Spiel.`;
  } else if (targetProgress >= 40 && progress < 40) {
    message = `${player.displayName} zieht Figur ${pawnIndex + 1} in die Tempelstrasse.`;
  } else if (targetProgress === 43) {
    message = `${player.displayName} bringt Figur ${pawnIndex + 1} ins Ziel.`;
  } else {
    message = `${player.displayName} zieht Figur ${pawnIndex + 1} mit ${state.die} + ${state.bonusValue}.`;
  }

  playMoveSound();
  await animatePawnTravel(state.currentPlayer, pawnIndex, progress, targetProgress);
  player.pawns[pawnIndex] = targetProgress;

  if (targetProgress <= 39) {
    const captured = findCapturedPawn(
      state.currentPlayer,
      getPawnCoord(state.currentPlayer, pawnIndex, targetProgress)
    );
    if (captured) {
      await animateCapture(captured.playerIndex, captured.pawnIndex);
      state.players[captured.playerIndex].pawns[captured.pawnIndex] = -1;
      setPawnPosition(captured.playerIndex, captured.pawnIndex, -1);
      playCaptureSound();
      message += ` ${state.players[captured.playerIndex].displayName}s Figur ${
        captured.pawnIndex + 1
      } muss zurueck.`;
    }
  }

  addLog(message);

  if (player.pawns.every((entry) => entry === 43)) {
    state.phase = "gameOver";
    state.winner = state.currentPlayer;
    playVictorySound();
    showFlash("win", `${player.displayName} gewinnt`);
    state.busy = false;
    render();
    return;
  }

  if (state.die === 6) {
    setTurnEnd(
      state.currentPlayer,
      `${message} Bonuswurf.`,
      `Bonuswurf fuer ${player.displayName}`
    );
  } else {
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    setTurnEnd(nextPlayer, message, `Weiter zu ${state.players[nextPlayer].displayName}`);
  }

  state.busy = false;
  render();
}

function advanceTurn() {
  if (state.phase !== "turnEnd" || state.busy) {
    return;
  }

  state.currentPlayer = state.turnEnd.nextPlayer;
  state.phase = "roll";
  state.die = null;
  state.question = null;
  state.legalMoves = [];
  state.turnEnd = null;
  state.bonusValue = 0;
  state.effect = null;
  const skippedMessages = resolveSkippedPlayers();
  state.notice = skippedMessages.join(" ");
  if (skippedMessages.length) {
    showFlash("error", skippedMessages[0]);
    state.effect = {
      type: "penalty",
      text: skippedMessages.join(" "),
    };
  }
  render();
}

function createCell(className, coord, label = "") {
  const element = document.createElement("div");
  element.className = `cell ${className}`;

  if (label) {
    const labelElement = document.createElement("span");
    labelElement.className = "cell-label";
    labelElement.textContent = label;
    element.append(labelElement);
  }

  placeOnGrid(element, coord);
  return element;
}

function createBoard() {
  board.innerHTML = "";

  PATH.forEach((coord, index) => {
    const team = TEAMS.find((entry) => entry.startIndex === index);
    const classNames = ["track-cell"];
    if (team) {
      classNames.push(`start-${team.id}`);
    }
    const label = team ? team.badge : "";
    board.append(createCell(classNames.join(" "), coord, label));
  });

  TEAMS.forEach((team) => {
    team.baseCoords.forEach((coord) => {
      board.append(createCell(`home-cell home-${team.id}`, coord, team.badge));
    });

    team.finishCoords.forEach((coord, index) => {
      board.append(createCell(`finish-cell finish-${team.id}`, coord, `${index + 1}`));
    });
  });

  const temple = document.createElement("div");
  temple.className = "center-temple";
  temple.innerHTML =
    "<div><strong>Tempel des Alphabets</strong><span>Bringt alle vier Figuren sicher ins Ziel.</span></div>";
  placeOnGrid(temple, { x: 4, y: 4 });
  board.append(temple);

  TEAMS.forEach((team, playerIndex) => {
    pawnElements[playerIndex] = [];

    for (let pawnIndex = 0; pawnIndex < 4; pawnIndex += 1) {
      const pawn = document.createElement("button");
      pawn.type = "button";
      pawn.className = `pawn pawn-${team.id}`;
      pawn.dataset.playerIndex = String(playerIndex);
      pawn.dataset.pawnIndex = String(pawnIndex);
      pawn.innerHTML = `
        <span class="pawn-aura"></span>
        <span class="pawn-body"></span>
        <span class="pawn-base"></span>
        <span class="pawn-crest">${team.badge}</span>
        <span class="pawn-number">${pawnIndex + 1}</span>
      `;
      pawn.addEventListener("click", () => movePawn(pawnIndex));
      board.append(pawn);
      pawnElements[playerIndex][pawnIndex] = pawn;
    }
  });
}

function renderQuestionCard() {
  answerButtons.innerHTML = "";
  moveButtons.innerHTML = "";
  continueButton.classList.add("hidden");
  questionPop.dataset.mode = state.phase;

  const shouldShowPopup =
    state.phase === "quiz" || state.phase === "gameOver";
  questionPop.classList.toggle("hidden", !shouldShowPopup);

  if (!shouldShowPopup) {
    return;
  }

  if (state.phase === "roll") {
    questionModeLabel.textContent = "Bereit";
    questionSubline.textContent = "Wuerfle fuer dein Team.";
    questionStage.innerHTML = `
      <p class="question-prompt">Der naechste Zug beginnt mit dem Wurf.</p>
      <div class="greek-display">Α Β Γ Δ</div>
    `;
    return;
  }

  if (state.phase === "quiz") {
    questionModeLabel.textContent = state.question.typeTitle;
    questionSubline.textContent = "Tippt gemeinsam die richtige Antwort an.";
    questionStage.innerHTML = `
      <p class="question-prompt">${state.question.prompt}</p>
      <div class="greek-display">${state.question.display}</div>
    `;

    state.question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.dataset.option = option;
      button.textContent = option;
      button.addEventListener("click", () => answerQuestion(option));
      answerButtons.append(button);
    });
    return;
  }

  if (state.phase === "move") {
    questionModeLabel.textContent = "Ziehen";
    questionSubline.textContent = "Waehlt eine leuchtende Figur.";
    questionStage.innerHTML = `
      <p class="question-prompt">${state.question.explanation}</p>
      <div class="greek-display">${state.question.display}</div>
      <p class="question-note">Jetzt darf gezogen werden.</p>
    `;

    state.legalMoves.forEach((pawnIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "move-button";
      button.textContent = `Figur ${pawnIndex + 1}`;
      button.addEventListener("click", () => movePawn(pawnIndex));
      moveButtons.append(button);
    });
    return;
  }

  if (state.phase === "turnEnd") {
    questionModeLabel.textContent = "Weiter";
    questionSubline.textContent = "Ein kurzer Blick, dann geht es weiter.";
    questionStage.innerHTML = `
      <p class="question-prompt">${state.turnEnd.message}</p>
    `;
    continueButton.textContent = state.turnEnd.buttonLabel;
    continueButton.classList.remove("hidden");
    return;
  }

  if (state.phase === "gameOver") {
    const winner = getCurrentPlayer();
    questionModeLabel.textContent = "Sieg";
    questionSubline.textContent = "Die Runde ist entschieden.";
    questionStage.innerHTML = `
      <p class="question-prompt">${winner.displayName} gewinnt die Runde.</p>
      <div class="greek-display">${winner.badge} ${winner.badge} ${winner.badge}</div>
    `;
  }
}

function renderPlayers() {
  playerList.innerHTML = "";

  state.players.forEach((player, playerIndex) => {
    const homeCount = player.pawns.filter((progress) => progress === -1).length;
    const targetCount = player.pawns.filter((progress) => progress === 43).length;
    const card = document.createElement("article");
    card.className = `player-card ${player.id} ${
      playerIndex === state.currentPlayer && state.phase !== "gameOver"
        ? "active"
        : ""
    }`;

    const miniPawns = player.pawns
      .map((progress, pawnIndex) => {
        let status = "track";
        if (progress === -1) {
          status = "home";
        } else if (progress >= 40 && progress <= 42) {
          status = "finish";
        } else if (progress === 43) {
          status = "done";
        }

        return `<span class="mini-pawn ${player.id} ${status}">${pawnIndex + 1}</span>`;
      })
      .join("");

    card.innerHTML = `
      <div class="player-head">
        <div class="player-badge ${player.id}">${player.badge}</div>
        <div>
          <h3>${player.displayName}</h3>
          <p class="tiny-label">Haus ${homeCount} / Ziel ${targetCount}</p>
        </div>
      </div>
      <div class="mini-pawns">${miniPawns}</div>
    `;

    playerList.append(card);
  });
}

function renderAlphabetGrid() {
  alphabetGrid.innerHTML = LETTERS.map(
    (letter) => `
      <article class="alphabet-card">
        <strong>${letter.upper} ${letter.lower}</strong>
        <span>${letter.name}</span>
        <span>${letter.sound}</span>
      </article>
    `
  ).join("");
}

function renderLog() {
  logList.innerHTML = state.log.map((entry) => `<li>${entry}</li>`).join("");
}

function renderBoardPawns() {
  state.players.forEach((player, playerIndex) => {
    player.pawns.forEach((progress, pawnIndex) => {
      const pawn = pawnElements[playerIndex][pawnIndex];
      setPawnPosition(playerIndex, pawnIndex, progress);
      pawn.classList.toggle(
        "selectable",
        state.phase === "move" &&
          playerIndex === state.currentPlayer &&
          state.legalMoves.includes(pawnIndex)
      );
      pawn.classList.toggle("done", progress === 43);
      pawn.disabled = !(
        state.phase === "move" &&
        playerIndex === state.currentPlayer &&
        state.legalMoves.includes(pawnIndex)
      );
      pawn.setAttribute("aria-label", `${player.displayName}, Figur ${pawnIndex + 1}`);
      pawn.title = `${player.displayName}, Figur ${pawnIndex + 1}`;
    });
  });
}

function renderTurnActions() {
  turnActions.innerHTML = "";

  if (state.phase === "move") {
    state.legalMoves.forEach((pawnIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "move-button";
      button.textContent = `Figur ${pawnIndex + 1}`;
      button.addEventListener("click", () => movePawn(pawnIndex));
      turnActions.append(button);
    });
    return;
  }

  if (state.phase === "turnEnd") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = state.turnEnd.buttonLabel;
    button.addEventListener("click", advanceTurn);
    turnActions.append(button);
  }
}

function renderStatus() {
  const player = getCurrentPlayer();
  currentPlayerName.textContent = player.displayName;
  turnBadge.textContent = player.badge;
  turnBadge.className = `turn-badge ${player.id}`;
  dieFace.textContent = state.die ? DIE_FACES[state.die] : "?";
  panelTaskTotal.textContent = TOTAL_TASKS;
  panelTaskRemaining.textContent = state.taskDeck.length;

  if (state.phase === "roll") {
    phaseHint.textContent = state.notice
      ? `${state.notice} ${player.displayName} ist jetzt am Zug.`
      : `${player.displayName} ist am Zug.`;
  } else if (state.phase === "quiz") {
    phaseHint.textContent = `${player.displayName} hat eine ${state.die} gewuerfelt.`;
  } else if (state.phase === "move") {
    phaseHint.textContent = `${player.displayName} darf jetzt mit ${state.die} + ${state.bonusValue} ziehen.`;
  } else if (state.phase === "turnEnd") {
    phaseHint.textContent = state.turnEnd.message;
  } else {
    phaseHint.textContent = `${player.displayName} hat gewonnen.`;
  }

  if (state.effect) {
    effectStatus.textContent = state.effect.text;
    effectStatus.className = `effect-status ${state.effect.type}`;
    effectStatus.classList.remove("hidden");
  } else {
    effectStatus.textContent = "";
    effectStatus.className = "effect-status hidden";
  }

  rollButton.disabled = state.phase !== "roll" || state.busy;
  updateSoundButton();
}

function render() {
  renderStatus();
  renderQuestionCard();
  renderTurnActions();
  renderPlayers();
  renderBoardPawns();
  renderLog();
}

function startNewGame() {
  state.players = cloneTeams();
  state.currentPlayer = 0;
  state.phase = "roll";
  state.die = null;
  state.question = null;
  state.legalMoves = [];
  state.turnEnd = null;
  state.winner = null;
  state.busy = false;
  state.taskDeck = createQuestionDeck();
  state.bonusValue = 0;
  state.effect = null;
  state.notice = "";
  state.log = [`Neues Spiel gestartet. ${state.players[0].displayName} beginnt.`];
  render();
}

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startNewGame();
});

rollButton.addEventListener("click", rollDie);
continueButton.addEventListener("click", advanceTurn);

panelToggles.forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.panelTarget));
});

overlayCloseButtons.forEach((button) => {
  button.addEventListener("click", closeOverlay);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.overlay) {
    closeOverlay();
  }
});

toggleSoundButton.addEventListener("click", () => {
  state.effectsEnabled = !state.effectsEnabled;
  updateSoundButton();
  showFlash("info", `Klang ${state.effectsEnabled ? "an" : "aus"}`);
});

createBoard();
renderAlphabetGrid();
renderTaskBreakdown();
startNewGame();

window.getPawnCoord = getPawnCoord;
