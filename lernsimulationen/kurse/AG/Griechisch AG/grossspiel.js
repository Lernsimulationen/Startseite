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
  { upper: "Α", lower: "α", name: "Alpha", sound: "a", group: "Vokal", hint: "A wie Anfang." },
  { upper: "Β", lower: "β", name: "Beta", sound: "b", group: "Konsonant", hint: "Klingt wie b." },
  { upper: "Γ", lower: "γ", name: "Gamma", sound: "g", group: "Konsonant", hint: "Klingt wie g." },
  { upper: "Δ", lower: "δ", name: "Delta", sound: "d", group: "Konsonant", hint: "Klingt wie d." },
  { upper: "Ε", lower: "ε", name: "Epsilon", sound: "kurzes e", group: "Vokal", hint: "Das kurze e." },
  { upper: "Ζ", lower: "ζ", name: "Zeta", sound: "ds", group: "Doppellaut", hint: "d und s zusammen." },
  { upper: "Η", lower: "η", name: "Eta", sound: "langes e", group: "Vokal", hint: "Das lange e." },
  { upper: "Θ", lower: "θ", name: "Theta", sound: "th", group: "Hauchlaut", hint: "t mit Hauch." },
  { upper: "Ι", lower: "ι", name: "Iota", sound: "i", group: "Vokal", hint: "Klingt wie i." },
  { upper: "Κ", lower: "κ", name: "Kappa", sound: "k", group: "Konsonant", hint: "Klingt wie k." },
  { upper: "Λ", lower: "λ", name: "Lambda", sound: "l", group: "Konsonant", hint: "Klingt wie l." },
  { upper: "Μ", lower: "μ", name: "My", sound: "m", group: "Konsonant", hint: "Klingt wie m." },
  { upper: "Ν", lower: "ν", name: "Ny", sound: "n", group: "Konsonant", hint: "Klingt wie n." },
  { upper: "Ξ", lower: "ξ", name: "Xi", sound: "ks", group: "Doppellaut", hint: "k und s zusammen." },
  { upper: "Ο", lower: "ο", name: "Omikron", sound: "kurzes o", group: "Vokal", hint: "Das kurze o." },
  { upper: "Π", lower: "π", name: "Pi", sound: "p", group: "Konsonant", hint: "Klingt wie p." },
  { upper: "Ρ", lower: "ρ", name: "Rho", sound: "r", group: "Konsonant", hint: "Klingt wie r." },
  { upper: "Σ", lower: "σ", name: "Sigma", sound: "s", group: "Konsonant", hint: "Am Wortende steht ς." },
  { upper: "Τ", lower: "τ", name: "Tau", sound: "t", group: "Konsonant", hint: "Klingt wie t." },
  { upper: "Υ", lower: "υ", name: "Ypsilon", sound: "ü", group: "Vokal", hint: "Oft wie ü." },
  { upper: "Φ", lower: "φ", name: "Phi", sound: "ph", group: "Hauchlaut", hint: "p mit Hauch." },
  { upper: "Χ", lower: "χ", name: "Chi", sound: "ch", group: "Hauchlaut", hint: "Rauer ch-Laut." },
  { upper: "Ψ", lower: "ψ", name: "Psi", sound: "ps", group: "Doppellaut", hint: "p und s zusammen." },
  { upper: "Ω", lower: "ω", name: "Omega", sound: "langes o", group: "Vokal", hint: "Das lange o." },
];

const QUESTION_TYPES = [
  {
    key: "name",
    title: "Buchstabenname",
    prompts: [
      "Wie heisst dieses Buchstabenpaar?",
      "Welcher Name gehoert zu diesem Zeichen?",
      "Wie nennt man diesen Buchstaben?",
      "Welcher Buchstabenname passt?",
    ],
  },
  {
    key: "lower",
    title: "Kleinschrift",
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

const MYTHOLOGY_QUESTIONS = [
  {
    prompt: "Wer ist in der griechischen Mythologie der Goettervater?",
    options: ["Zeus", "Hermes", "Ares", "Dionysos"],
    correct: "Zeus",
    explanation: "Zeus ist der Goettervater und Herr des Himmels.",
  },
  {
    prompt: "Welche Goettin gilt als Goettin der Weisheit?",
    options: ["Athene", "Aphrodite", "Artemis", "Hera"],
    correct: "Athene",
    explanation: "Athene steht fuer Weisheit, Strategie und Handwerk.",
  },
  {
    prompt: "Welcher Gott traegt den Dreizack?",
    options: ["Poseidon", "Apollon", "Hephaistos", "Hermes"],
    correct: "Poseidon",
    explanation: "Poseidon ist der Meeresgott und traegt den Dreizack.",
  },
  {
    prompt: "Wer ist der Gott der Unterwelt?",
    options: ["Hades", "Zeus", "Ares", "Pan"],
    correct: "Hades",
    explanation: "Hades herrscht in der Unterwelt.",
  },
  {
    prompt: "Welche Goettin ist mit Liebe und Schoenheit verbunden?",
    options: ["Aphrodite", "Demeter", "Hestia", "Nike"],
    correct: "Aphrodite",
    explanation: "Aphrodite ist die Goettin der Liebe und Schoenheit.",
  },
  {
    prompt: "Welcher Gott ist der schnelle Goetterbote?",
    options: ["Hermes", "Ares", "Dionysos", "Kronos"],
    correct: "Hermes",
    explanation: "Hermes ist der Bote der Goetter.",
  },
  {
    prompt: "Welche Goettin ist mit Jagd und Mond verbunden?",
    options: ["Artemis", "Hera", "Athene", "Persephone"],
    correct: "Artemis",
    explanation: "Artemis ist Goettin der Jagd und wird mit dem Mond verbunden.",
  },
  {
    prompt: "Welcher Gott steht fuer Musik, Licht und Weissagung?",
    options: ["Apollon", "Ares", "Poseidon", "Hephaistos"],
    correct: "Apollon",
    explanation: "Apollon ist Gott der Musik, des Lichts und der Weissagung.",
  },
  {
    prompt: "Welcher Gott ist mit Krieg und Kampf verbunden?",
    options: ["Ares", "Hermes", "Dionysos", "Hades"],
    correct: "Ares",
    explanation: "Ares ist der Gott des Krieges.",
  },
  {
    prompt: "Welche Goettin schuetzt Ehe und Familie?",
    options: ["Hera", "Athene", "Aphrodite", "Artemis"],
    correct: "Hera",
    explanation: "Hera ist Goettin der Ehe und Familie.",
  },
  {
    prompt: "Wer bringt den Menschen in vielen Mythen das Feuer?",
    options: ["Prometheus", "Achilleus", "Odysseus", "Orpheus"],
    correct: "Prometheus",
    explanation: "Prometheus bringt den Menschen das Feuer.",
  },
  {
    prompt: "Welcher Held besiegt den Minotaurus?",
    options: ["Theseus", "Herakles", "Perseus", "Jason"],
    correct: "Theseus",
    explanation: "Theseus besiegt den Minotaurus im Labyrinth.",
  },
  {
    prompt: "Wer hilft Theseus mit einem Faden aus dem Labyrinth?",
    options: ["Ariadne", "Medea", "Kassandra", "Helena"],
    correct: "Ariadne",
    explanation: "Ariadne gibt Theseus den Faden.",
  },
  {
    prompt: "Welcher Held erledigt zwoelf Aufgaben?",
    options: ["Herakles", "Perseus", "Paris", "Orpheus"],
    correct: "Herakles",
    explanation: "Herakles ist fuer seine zwoelf Aufgaben bekannt.",
  },
  {
    prompt: "Welches Tier ist die Hydra?",
    options: ["Eine vielkoepfige Schlange", "Ein gefluegeltes Pferd", "Ein Stier", "Ein Adler"],
    correct: "Eine vielkoepfige Schlange",
    explanation: "Die Hydra ist ein vielkoepfiges Schlangenwesen.",
  },
  {
    prompt: "Wer toetet die Medusa?",
    options: ["Perseus", "Achilleus", "Theseus", "Jason"],
    correct: "Perseus",
    explanation: "Perseus toetet Medusa.",
  },
  {
    prompt: "Was passiert, wenn man Medusa direkt ansieht?",
    options: ["Man versteinert", "Man schlaeft ein", "Man wird unsichtbar", "Man kann fliegen"],
    correct: "Man versteinert",
    explanation: "Medusas Blick verwandelt Menschen in Stein.",
  },
  {
    prompt: "Wie heisst das gefluegelte Pferd der Mythologie?",
    options: ["Pegasos", "Kerberos", "Chiron", "Argos"],
    correct: "Pegasos",
    explanation: "Pegasos ist das gefluegelte Pferd.",
  },
  {
    prompt: "Welcher Hund bewacht die Unterwelt?",
    options: ["Kerberos", "Pegasos", "Minotaurus", "Python"],
    correct: "Kerberos",
    explanation: "Kerberos bewacht den Eingang zur Unterwelt.",
  },
  {
    prompt: "Wer fuehrt die Argonauten an?",
    options: ["Jason", "Theseus", "Perseus", "Aias"],
    correct: "Jason",
    explanation: "Jason fuehrt die Argonauten.",
  },
  {
    prompt: "Wonach suchen Jason und die Argonauten?",
    options: ["Nach dem Goldenen Vlies", "Nach dem Apfel der Eris", "Nach dem Helm des Hades", "Nach dem Dreizack"],
    correct: "Nach dem Goldenen Vlies",
    explanation: "Jason sucht mit den Argonauten das Goldene Vlies.",
  },
  {
    prompt: "Welche Zauberin hilft Jason?",
    options: ["Medea", "Ariadne", "Hera", "Demeter"],
    correct: "Medea",
    explanation: "Medea hilft Jason mit Zauberkraft.",
  },
  {
    prompt: "Wer ist der listenreiche Held der Odyssee?",
    options: ["Odysseus", "Achilleus", "Hektor", "Paris"],
    correct: "Odysseus",
    explanation: "Odysseus ist fuer Klugheit und Listen bekannt.",
  },
  {
    prompt: "Wie heisst die Heimat des Odysseus?",
    options: ["Ithaka", "Sparta", "Troja", "Delphi"],
    correct: "Ithaka",
    explanation: "Odysseus ist Koenig von Ithaka.",
  },
  {
    prompt: "Wie heisst die Frau des Odysseus?",
    options: ["Penelope", "Helena", "Medea", "Ariadne"],
    correct: "Penelope",
    explanation: "Penelope wartet auf Odysseus.",
  },
  {
    prompt: "Welches Wesen hat nur ein Auge?",
    options: ["Kyklop", "Satyr", "Kentaur", "Sirene"],
    correct: "Kyklop",
    explanation: "Ein Kyklop ist ein einäugiger Riese.",
  },
  {
    prompt: "Wie heisst der Kyklop, dem Odysseus begegnet?",
    options: ["Polyphem", "Kerberos", "Pegasos", "Argos"],
    correct: "Polyphem",
    explanation: "Odysseus begegnet dem Kyklopen Polyphem.",
  },
  {
    prompt: "Welche Wesen locken Seeleute mit Gesang an?",
    options: ["Sirenen", "Musen", "Nymphen", "Gorgonen"],
    correct: "Sirenen",
    explanation: "Sirenen verfuehren Seeleute mit ihrem Gesang.",
  },
  {
    prompt: "Wer ist der schnellste griechische Held vor Troja?",
    options: ["Achilleus", "Odysseus", "Agamemnon", "Menelaos"],
    correct: "Achilleus",
    explanation: "Achilleus ist der beruehmte schnelle Held der Ilias.",
  },
  {
    prompt: "Welcher trojanische Held kaempft gegen Achilleus?",
    options: ["Hektor", "Paris", "Priamos", "Aeneas"],
    correct: "Hektor",
    explanation: "Hektor ist der wichtigste Verteidiger Trojas.",
  },
  {
    prompt: "Wer gilt als die schoenste Frau im Trojanischen Krieg?",
    options: ["Helena", "Penelope", "Kassandra", "Ariadne"],
    correct: "Helena",
    explanation: "Helena steht im Zentrum des Trojanischen Krieges.",
  },
  {
    prompt: "Welche Stadt wird im Trojanischen Krieg belagert?",
    options: ["Troja", "Athen", "Sparta", "Korinth"],
    correct: "Troja",
    explanation: "Troja wird von den Griechen belagert.",
  },
  {
    prompt: "Womit gelangen die Griechen laut Sage in die Stadt Troja?",
    options: ["Mit einem Holzpferd", "Mit einem Schiff aus Gold", "Mit einer Leiter aus Bronze", "Mit einem unterirdischen Fluss"],
    correct: "Mit einem Holzpferd",
    explanation: "Das Trojanische Pferd ist eine List der Griechen.",
  },
  {
    prompt: "Welche Seherin aus Troja wird oft nicht geglaubt?",
    options: ["Kassandra", "Medea", "Ariadne", "Europa"],
    correct: "Kassandra",
    explanation: "Kassandra sieht Unheil voraus, doch ihr glaubt man nicht.",
  },
  {
    prompt: "Welche Goettin ist mit Ernte und Getreide verbunden?",
    options: ["Demeter", "Hera", "Athene", "Nike"],
    correct: "Demeter",
    explanation: "Demeter ist Goettin der Ernte und des Getreides.",
  },
  {
    prompt: "Wie heisst Demeters Tochter, die in die Unterwelt kommt?",
    options: ["Persephone", "Artemis", "Hestia", "Iris"],
    correct: "Persephone",
    explanation: "Persephone wird mit der Unterwelt und den Jahreszeiten verbunden.",
  },
  {
    prompt: "Wer ist der Gott des Weines und des Theaters?",
    options: ["Dionysos", "Apollon", "Hermes", "Ares"],
    correct: "Dionysos",
    explanation: "Dionysos ist Gott des Weines und des Theaters.",
  },
  {
    prompt: "Wer schmiedet Waffen fuer die Goetter?",
    options: ["Hephaistos", "Ares", "Hermes", "Pan"],
    correct: "Hephaistos",
    explanation: "Hephaistos ist der goettliche Schmied.",
  },
  {
    prompt: "Welche Goettin steht fuer den Sieg?",
    options: ["Nike", "Hestia", "Selene", "Themis"],
    correct: "Nike",
    explanation: "Nike ist die Siegesgoettin.",
  },
  {
    prompt: "Welche neun Gestalten inspirieren Kuenste und Wissenschaften?",
    options: ["Musen", "Sirenen", "Gorgonen", "Hesperiden"],
    correct: "Musen",
    explanation: "Die Musen inspirieren Kuenste und Wissenschaften.",
  },
];

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

const TOTAL_TASKS = LETTERS.length * QUESTION_TYPES.length * 4 + MYTHOLOGY_QUESTIONS.length;
const MAX_LOG_ENTRIES = 10;

const board = document.querySelector("#board");
const newRoundButton = document.querySelector("#newRoundButton");
const teamBadge = document.querySelector("#teamBadge");
const teamName = document.querySelector("#teamName");
const dieButtons = document.querySelector("#dieButtons");
const statusCard = document.querySelector("#statusCard");
const questionPopup = document.querySelector("#questionPopup");
const questionType = document.querySelector("#questionType");
const deckCount = document.querySelector("#deckCount");
const questionPrompt = document.querySelector("#questionPrompt");
const questionDisplay = document.querySelector("#questionDisplay");
const answerButtons = document.querySelector("#answerButtons");
const continueButton = document.querySelector("#continueButton");
const pawnButtons = document.querySelector("#pawnButtons");
const moveLabel = document.querySelector("#moveLabel");
const moveHint = document.querySelector("#moveHint");
const manualNextButton = document.querySelector("#manualNextButton");
const undoButton = document.querySelector("#undoButton");
const teamList = document.querySelector("#teamList");
const alphabetGrid = document.querySelector("#alphabetGrid");
const logList = document.querySelector("#logList");
const overlayRoot = document.querySelector("#overlayRoot");
const overlayPanels = [...document.querySelectorAll(".overlay-panel")];
const panelToggles = [...document.querySelectorAll(".panel-toggle")];
const overlayCloseButtons = [...document.querySelectorAll("[data-close-overlay]")];
const flash = document.querySelector("#flash");

const state = {
  players: [],
  currentPlayer: 0,
  phase: "waitingDie",
  die: null,
  question: null,
  answerCorrect: null,
  taskDeck: [],
  legalMoves: [],
  log: [],
  history: [],
  overlay: null,
  flashTimeout: null,
};

const pawnElements = [];

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
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
      typeTitle: type.title,
      prompt,
      display: formatLetterPair(letter),
      options: shuffle([letter.sound, ...distractors.map((entry) => entry.sound)]),
      correct: letter.sound,
      explanation: `${formatLetterPair(letter)} klingt ungefaehr wie ${letter.sound}.`,
    };
  }

  return {
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

function createAlphabetQuestionDeck() {
  const deck = [];
  LETTERS.forEach((letter, letterIndex) => {
    QUESTION_TYPES.forEach((type) => {
      for (let variant = 0; variant < 4; variant += 1) {
        deck.push(buildQuestionOfType(type, letter, letterIndex, variant));
      }
    });
  });
  return shuffle(deck);
}

function createMythologyQuestionDeck() {
  return shuffle(
    MYTHOLOGY_QUESTIONS.map((question) => ({
      typeTitle: "Mythologie",
      prompt: question.prompt,
      display: "Mythos",
      options: shuffle(question.options),
      correct: question.correct,
      explanation: question.explanation,
    }))
  );
}

function createQuestionDeck() {
  const alphabetDeck = createAlphabetQuestionDeck();
  const mythologyDeck = createMythologyQuestionDeck();
  const sequence = [];

  while (alphabetDeck.length || mythologyDeck.length) {
    if (alphabetDeck.length) {
      sequence.push(alphabetDeck.pop());
    }

    if (mythologyDeck.length) {
      sequence.push(mythologyDeck.pop());
    }
  }

  return sequence.reverse();
}

function drawQuestion() {
  if (!state.taskDeck.length) {
    state.taskDeck = createQuestionDeck();
    addLog("Der Aufgabenstapel wurde neu gemischt.");
  }
  return state.taskDeck.pop();
}

function cloneTeams() {
  return TEAMS.map((team) => ({
    ...team,
    displayName: team.defaultName,
    pawns: [-1, -1, -1, -1],
  }));
}

function getCurrentPlayer() {
  return state.players[state.currentPlayer];
}

function canExitHouse(die) {
  return die === 5 || die === 6;
}

function getTargetProgress(progress, die) {
  if (progress === -1) {
    return canExitHouse(die) ? 0 : null;
  }

  const target = progress + die;
  return target <= 43 ? target : null;
}

function getLegalMoves(player, die) {
  return player.pawns
    .map((progress, pawnIndex) => ({ pawnIndex, target: getTargetProgress(progress, die) }))
    .filter((move) => move.target !== null && !ownPawnBlocks(player, move.pawnIndex, move.target));
}

function ownPawnBlocks(player, movingPawnIndex, targetProgress) {
  return player.pawns.some((progress, pawnIndex) => {
    if (pawnIndex === movingPawnIndex || progress === -1) {
      return false;
    }

    return progress === targetProgress;
  });
}

function getPawnCoord(playerIndex, progress, pawnIndex) {
  const team = state.players[playerIndex] || TEAMS[playerIndex];
  if (progress === -1) {
    return team.baseCoords[pawnIndex];
  }
  if (progress >= 40) {
    return team.finishCoords[progress - 40];
  }
  return PATH[(team.startIndex + progress) % PATH.length];
}

function placeOnGrid(element, coord) {
  element.style.left = `calc(${coord.x} * var(--cell))`;
  element.style.top = `calc(${coord.y} * var(--cell))`;
}

function setPawnPosition(playerIndex, pawnIndex, progress) {
  const pawn = pawnElements[playerIndex][pawnIndex];
  placeOnGrid(pawn, getPawnCoord(playerIndex, progress, pawnIndex));
}

function createCell(className, coord, label = "") {
  const element = document.createElement("div");
  element.className = `cell ${className}`;
  if (label) {
    const labelElement = document.createElement("span");
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
    board.append(createCell(`track-cell ${team ? `start-${team.id}` : ""}`, coord, team?.badge || ""));
  });

  TEAMS.forEach((team) => {
    team.baseCoords.forEach((coord) => {
      board.append(createCell(`home-cell home-${team.id}`, coord, team.badge));
    });

    team.finishCoords.forEach((coord, index) => {
      board.append(createCell(`finish-cell finish-${team.id}`, coord, String(index + 1)));
    });
  });

  const center = document.createElement("div");
  center.className = "center-field";
  center.innerHTML = "<strong>Agora</strong>";
  placeOnGrid(center, { x: 5, y: 5 });
  board.append(center);

  TEAMS.forEach((team, playerIndex) => {
    pawnElements[playerIndex] = [];
    for (let pawnIndex = 0; pawnIndex < 4; pawnIndex += 1) {
      const pawn = document.createElement("button");
      pawn.type = "button";
      pawn.className = `pawn pawn-${team.id}`;
      pawn.innerHTML = `
        <span class="pawn-shadow"></span>
        <span class="pawn-token">
          <span class="pawn-top"></span>
          <span class="pawn-neck"></span>
          <span class="pawn-base"></span>
          <strong>${team.badge}</strong>
          <span class="pawn-number">${pawnIndex + 1}</span>
        </span>
      `;
      pawn.addEventListener("click", () => applyMove(pawnIndex));
      board.append(pawn);
      pawnElements[playerIndex][pawnIndex] = pawn;
    }
  });
}

function renderAlphabetGrid() {
  alphabetGrid.innerHTML = LETTERS.map(
    (letter) => `
      <article class="alphabet-card">
        <strong>${letter.upper} ${letter.lower}</strong>
        <span>${letter.name}</span>
        <span>${letter.sound}</span>
        <p>${letter.hint}</p>
      </article>
    `
  ).join("");
}

function renderDieButtons() {
  dieButtons.innerHTML = "";
  for (let value = 1; value <= 6; value += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(value);
    button.className = state.die === value ? "active" : "";
    button.disabled = state.phase !== "waitingDie";
    button.addEventListener("click", () => registerRealDie(value));
    dieButtons.append(button);
  }
}

function renderQuestion() {
  answerButtons.innerHTML = "";
  continueButton.classList.add("hidden");
  questionPopup.classList.toggle("hidden", state.phase !== "answering");

  if (!state.question) {
    questionType.textContent = "Aufgabe";
    questionPrompt.textContent = "Nach dem realen Wurf erscheint hier die Aufgabe.";
    questionDisplay.textContent = "Α Β Γ Δ";
    return;
  }

  questionType.textContent = state.question.typeTitle;
  questionPrompt.textContent = state.question.prompt;
  questionDisplay.textContent = state.question.display;

  state.question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.disabled = state.phase !== "answering";
    button.addEventListener("click", () => answerQuestion(option));
    answerButtons.append(button);
  });
}

function renderMoveButtons() {
  pawnButtons.innerHTML = "";
  const player = getCurrentPlayer();

  if (state.phase !== "moving") {
    moveLabel.textContent = "Noch kein Zug";
    moveHint.textContent = "Wenn eine reale Figur bewegt wurde, waehlt hier dieselbe Figur aus.";
    return;
  }

  if (!state.legalMoves.length) {
    moveLabel.textContent = "Kein moeglicher Zug";
    moveHint.textContent = "Das reale Team kann nicht ziehen. Danach wird zum naechsten Team gewechselt.";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = "Naechstes Team";
    button.addEventListener("click", nextTurn);
    pawnButtons.append(button);
    return;
  }

  moveLabel.textContent = `Real ${state.die} Feld(er) ziehen`;
  moveHint.textContent = "Tippt die Figur an, die auf dem echten Bodenbrett bewegt wurde.";

  state.legalMoves.forEach(({ pawnIndex, target }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `Figur ${pawnIndex + 1} -> ${formatProgress(target)}`;
    button.addEventListener("click", () => applyMove(pawnIndex));
    pawnButtons.append(button);
  });
}

function renderPawns() {
  state.players.forEach((player, playerIndex) => {
    player.pawns.forEach((progress, pawnIndex) => {
      const pawn = pawnElements[playerIndex][pawnIndex];
      setPawnPosition(playerIndex, pawnIndex, progress);
      const selectable =
        state.phase === "moving" &&
        playerIndex === state.currentPlayer &&
        state.legalMoves.some((move) => move.pawnIndex === pawnIndex);
      pawn.classList.toggle("selectable", selectable);
      pawn.disabled = !selectable;
      pawn.title = `${player.displayName}, Figur ${pawnIndex + 1}`;
    });
  });
}

function renderTeams() {
  teamList.innerHTML = "";
  state.players.forEach((player, playerIndex) => {
    const done = player.pawns.filter((progress) => progress === 43).length;
    const home = player.pawns.filter((progress) => progress === -1).length;
    const card = document.createElement("article");
    card.className = `team-card ${player.id} ${playerIndex === state.currentPlayer ? "active" : ""}`;
    card.innerHTML = `
      <div class="team-row">
        <strong>${player.badge}</strong>
        <span>${player.displayName}</span>
      </div>
      <p>Haus ${home} / Ziel ${done}</p>
    `;
    teamList.append(card);
  });
}

function renderLog() {
  logList.innerHTML = state.log
    .slice(-MAX_LOG_ENTRIES)
    .map((entry) => `<li>${entry}</li>`)
    .join("");
}

function renderStatus() {
  const player = getCurrentPlayer();
  teamBadge.textContent = player.badge;
  teamBadge.className = `team-badge ${player.id}`;
  teamName.textContent = player.displayName;
  deckCount.textContent = `${state.taskDeck.length} im Stapel`;

  if (state.phase === "waitingDie") {
    statusCard.innerHTML = `<strong>Real wuerfeln</strong><span>${player.displayName} wuerfelt mit dem Schaumstoffwuerfel und traegt die Zahl ein.</span>`;
  } else if (state.phase === "answering") {
    statusCard.innerHTML = `<strong>Antwort waehlen</strong><span>Die Klasse entscheidet gemeinsam. Danach wird real gezogen.</span>`;
  } else {
    statusCard.innerHTML = `<strong>Real bewegen</strong><span>Bewegt die Figur auf dem Bodenbrett und bildet denselben Zug digital ab.</span>`;
  }

  undoButton.disabled = state.history.length === 0;
}

function render() {
  renderStatus();
  renderDieButtons();
  renderQuestion();
  renderMoveButtons();
  renderPawns();
  renderTeams();
  renderLog();
}

function formatProgress(progress) {
  if (progress === -1) {
    return "Haus";
  }
  if (progress >= 40) {
    return `Ziel ${progress - 39}`;
  }
  return `Feld ${progress + 1}`;
}

function addLog(message) {
  state.log.push(message);
}

function showFlash(message) {
  flash.textContent = message;
  flash.classList.add("show");
  clearTimeout(state.flashTimeout);
  state.flashTimeout = setTimeout(() => flash.classList.remove("show"), 1800);
}

function snapshot() {
  state.history.push({
    players: state.players.map((player) => ({ ...player, pawns: [...player.pawns] })),
    currentPlayer: state.currentPlayer,
    phase: state.phase,
    die: state.die,
    question: state.question,
    answerCorrect: state.answerCorrect,
    legalMoves: state.legalMoves.map((move) => ({ ...move })),
    log: [...state.log],
  });
}

function restore(snapshotState) {
  state.players = snapshotState.players.map((player) => ({ ...player, pawns: [...player.pawns] }));
  state.currentPlayer = snapshotState.currentPlayer;
  state.phase = snapshotState.phase;
  state.die = snapshotState.die;
  state.question = snapshotState.question;
  state.answerCorrect = snapshotState.answerCorrect;
  state.legalMoves = snapshotState.legalMoves.map((move) => ({ ...move }));
  state.log = [...snapshotState.log];
}

function registerRealDie(value) {
  snapshot();
  state.die = value;
  state.question = drawQuestion();
  state.answerCorrect = null;
  state.phase = "answering";
  addLog(`${getCurrentPlayer().displayName} hat real eine ${value} gewuerfelt.`);
  render();
}

function answerQuestion(option) {
  const buttons = [...answerButtons.querySelectorAll("button")];
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.toggle("correct", button.textContent === state.question.correct);
    button.classList.toggle("wrong", button.textContent === option && option !== state.question.correct);
  });

  state.answerCorrect = option === state.question.correct;

  if (state.answerCorrect) {
    addLog(`Richtig: ${state.question.explanation}`);
    showFlash("Richtig beantwortet");
    continueButton.textContent = "Real bewegen";
  } else {
    addLog(`Nicht ganz: ${state.question.explanation} Kein Zug; das naechste Team ist dran.`);
    showFlash("Kein Zug");
    continueButton.textContent = "Naechstes Team";
  }

  continueButton.classList.remove("hidden");
}

function prepareMove() {
  if (!state.answerCorrect) {
    state.question = null;
    state.answerCorrect = null;
    advancePlayer();
    addLog(`Weiter mit ${getCurrentPlayer().displayName}.`);
    render();
    return;
  }

  const player = getCurrentPlayer();
  state.phase = "moving";
  state.legalMoves = getLegalMoves(player, state.die);
  state.question = null;
  state.answerCorrect = null;
  render();
}

function applyMove(pawnIndex) {
  if (state.phase !== "moving") {
    return;
  }

  const move = state.legalMoves.find((entry) => entry.pawnIndex === pawnIndex);
  if (!move) {
    return;
  }

  snapshot();
  const player = getCurrentPlayer();
  const from = player.pawns[pawnIndex];
  player.pawns[pawnIndex] = move.target;
  const capture = captureOn(move.target);
  const detail = capture ? ` ${capture.displayName} stellt eine Figur real zurueck ins Haus.` : "";
  addLog(
    `${player.displayName} spiegelt Figur ${pawnIndex + 1}: ${formatProgress(from)} -> ${formatProgress(
      move.target
    )}.${detail}`
  );

  if (player.pawns.every((progress) => progress === 43)) {
    state.phase = "finished";
    addLog(`${player.displayName} gewinnt das Grossspiel.`);
    showFlash(`${player.displayName} gewinnt`);
  } else if (state.die === 6) {
    state.phase = "waitingDie";
    state.die = null;
    state.question = null;
    state.answerCorrect = null;
    state.legalMoves = [];
    addLog(`${player.displayName} darf wegen der 6 noch einmal real wuerfeln.`);
  } else {
    advancePlayer();
  }

  render();
}

function captureOn(targetProgress) {
  if (targetProgress < 0 || targetProgress >= 40) {
    return null;
  }

  const activeTeam = getCurrentPlayer();
  const activeBoardIndex = (activeTeam.startIndex + targetProgress) % PATH.length;

  for (let playerIndex = 0; playerIndex < state.players.length; playerIndex += 1) {
    if (playerIndex === state.currentPlayer) {
      continue;
    }

    const opponent = state.players[playerIndex];
    for (let pawnIndex = 0; pawnIndex < opponent.pawns.length; pawnIndex += 1) {
      const progress = opponent.pawns[pawnIndex];
      if (progress >= 0 && progress < 40) {
        const boardIndex = (opponent.startIndex + progress) % PATH.length;
        if (boardIndex === activeBoardIndex) {
          opponent.pawns[pawnIndex] = -1;
          return opponent;
        }
      }
    }
  }

  return null;
}

function advancePlayer() {
  state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
  state.phase = "waitingDie";
  state.die = null;
  state.question = null;
  state.answerCorrect = null;
  state.legalMoves = [];
}

function nextTurn() {
  snapshot();
  advancePlayer();
  addLog(`Weiter mit ${getCurrentPlayer().displayName}.`);
  render();
}

function undoLast() {
  const previous = state.history.pop();
  if (!previous) {
    return;
  }
  restore(previous);
  showFlash("Letzter Schritt zurueckgenommen");
  render();
}

function openPanel(panelId) {
  state.overlay = panelId;
  overlayRoot.classList.remove("hidden");
  overlayRoot.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
  overlayPanels.forEach((panel) => panel.classList.toggle("hidden", panel.id !== panelId));
}

function closeOverlay() {
  state.overlay = null;
  overlayRoot.classList.add("hidden");
  overlayRoot.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
  overlayPanels.forEach((panel) => panel.classList.add("hidden"));
}

function startNewGame() {
  state.players = cloneTeams();
  state.currentPlayer = 0;
  state.phase = "waitingDie";
  state.die = null;
  state.question = null;
  state.answerCorrect = null;
  state.taskDeck = createQuestionDeck();
  state.legalMoves = [];
  state.history = [];
  state.log = ["Grossspiel gestartet. Das echte Bodenbrett ist die fuehrende Version."];
  render();
}

newRoundButton.addEventListener("click", () => {
  startNewGame();
});

continueButton.addEventListener("click", prepareMove);
manualNextButton.addEventListener("click", nextTurn);
undoButton.addEventListener("click", undoLast);

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

createBoard();
renderAlphabetGrid();
startNewGame();
