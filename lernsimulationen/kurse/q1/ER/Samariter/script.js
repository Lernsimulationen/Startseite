const SCENES = [
  {
    id: "frage",
    title: "Die Frage nach dem Leben",
    type: "Auftakt",
    role: "Rolle: Lernender im Gespräch",
    tags: ["Gesetz", "Frage", "Auftakt"],
    cast: ["Jesus", "Gesetzeslehrer", "Hörende"],
    text: "Der Gesetzeslehrer fragt nach dem ewigen Leben. Entscheidend ist, ob du die Szene als Wissensfrage oder als Start in gelebte Liebe liest.",
    question: "Wie willst du diese erste Szene verstehen?",
    frames: [
      { src: "assets/scene-1-law.svg", title: "Gespräch", caption: "Das Gleichnis beginnt mit einer Frage, nicht mit einer Tat.", focus: "Dieses Bild zeigt den Auftakt: Noch geht es um Worte, aber die Szene öffnet bereits die spätere Handlung." },
      { src: "assets/scene-1-law-detail.svg", title: "Gesetz", caption: "Bekanntes Wissen wird zur Herausforderung.", focus: "Hier wird sichtbar: Das Problem ist nicht fehlendes Wissen, sondern die Frage, ob Bekanntes wirklich gelebt wird." },
      { src: "assets/scene-1-law-face.svg", title: "Spannung", caption: "Hinter der Antwort steht eine tiefere Zumutung.", focus: "Dieses Bild lenkt den Blick auf die innere Spannung: Die Antwort ist gesagt, aber die eigentliche Probe steht noch aus." }
    ],
    options: [
      {
        id: "wissen",
        label: "Ich halte die Szene zunächst für eine Frage nach richtiger religiöser Antwort.",
        outcomeTitle: "Richtig, aber noch nicht weit genug",
        outcomeText: "Du startest nahe am Textanfang, aber die Geschichte drängt weiter.",
        outcomeClass: "warn",
        effects: { courage: 0, care: 1, wisdom: 2, fragments: 0, strongReason: false },
        nextScene: "weg",
        reasons: [
          {
            id: "wissen_a",
            label: "Weil zuerst tatsächlich nach dem Gesetz und nach der richtigen Antwort gefragt wird.",
            quality: "strong",
            explain: "Das ist textnah. Du erkennst den Auftakt präzise, bleibst aber noch vor der eigentlichen Bewegung der Geschichte."
          },
          {
            id: "wissen_b",
            label: "Weil religiöse Fragen meistens nur Theorie sind.",
            quality: "weak",
            explain: "Diese Begründung greift zu kurz. Das Gleichnis will gerade zeigen, dass Theorie und Praxis zusammengehören."
          },
          {
            id: "wissen_c",
            label: "Weil die Szene noch offenlässt, wie aus Wissen Handeln werden soll.",
            quality: "strong",
            explain: "Diese Begründung ist stark, weil sie den Übergang zur eigentlichen Geschichte vorbereitet."
          }
        ]
      },
      {
        id: "handeln",
        label: "Ich lese die Szene sofort als Weg vom Wissen zum Handeln.",
        outcomeTitle: "Die Spannung gut erfasst",
        outcomeText: "Du erkennst früh, dass die Frage nach dem Leben auf gelebte Liebe hinausläuft.",
        outcomeClass: "good",
        effects: { courage: 1, care: 2, wisdom: 2, fragments: 1, strongReason: true },
        nextScene: "weg",
        reasons: [
          {
            id: "handeln_a",
            label: "Weil das Gleichnis später nicht nach korrekten Sätzen fragt, sondern nach dem, der zum Nächsten wird.",
            quality: "strong",
            explain: "Sehr tragfähig. Du verbindest die Auftaktszene mit der Pointe des Gleichnisses."
          },
          {
            id: "handeln_b",
            label: "Weil gute Menschen immer handeln.",
            quality: "weak",
            explain: "Zu allgemein. Die Geschichte ist spannender, weil Handeln gerade nicht selbstverständlich ist."
          },
          {
            id: "handeln_c",
            label: "Weil die Frage nach dem ewigen Leben hier schon in Richtung Lebenspraxis verschoben wird.",
            quality: "strong",
            explain: "Stark begründet. Du nimmst die Bewegung des Textes ernst."
          }
        ]
      }
    ]
  },
  {
    id: "weg",
    title: "Unterwegs nach Jericho",
    type: "Wegszene",
    role: "Rolle: Reisender",
    tags: ["Weg", "Gefahr", "Landschaft"],
    cast: ["Reisender", "Landschaft", "Unsicherheit"],
    text: "Der Weg nach Jericho ist schön und gefährlich. Du musst entscheiden, mit welcher Haltung du losgehst.",
    question: "Welche Vorbereitung wählst du für den gefährlichen Weg?",
    frames: [
      { src: "assets/scene-2-road.svg", title: "Weg", caption: "Die Landschaft ist schön und bedrohlich zugleich.", focus: "Das Gesamtbild macht klar: Der Weg selbst gehört zur ethischen Spannung der Geschichte." },
      { src: "assets/scene-2-road-detail.svg", title: "Reisender", caption: "Du bist klein gegenüber dem Gelände.", focus: "Dieses Bild zeigt menschliche Verletzlichkeit. Es erklärt, warum Angst und Vorsicht später eine echte Rolle spielen." },
      { src: "assets/scene-2-road-danger.svg", title: "Gefahr", caption: "Der Weg stellt Mut und Vorsicht gleichzeitig auf die Probe.", focus: "Hier wird die Gefahr sichtbar gemacht. Der Sinn ist, Barmherzigkeit nicht idyllisch, sondern unter Risiko zu lesen." }
    ],
    options: [
      {
        id: "vorsicht",
        label: "Ich gehe wachsam, spare Kräfte und halte Hilfsmittel bereit.",
        outcomeTitle: "Klug vorbereitet",
        outcomeText: "Du gehst weder naiv noch gelähmt los. Diese Mischung kann später wichtig werden.",
        outcomeClass: "good",
        effects: { courage: 1, care: 1, wisdom: 2, fragments: 0, strongReason: true },
        nextScene: "runner",
        reasons: [
          {
            id: "vorsicht_a",
            label: "Weil Hilfe unter Risiko klug vorbereitet sein muss und nicht nur spontan sein kann.",
            quality: "strong",
            explain: "Stark. Du nimmst ernst, dass Barmherzigkeit unter realen Bedingungen geschieht."
          },
          {
            id: "vorsicht_b",
            label: "Weil ich am liebsten gar nichts mit anderen zu tun hätte.",
            quality: "weak",
            explain: "Diese Begründung kippt in Distanz. Wachsamkeit ist hier nicht dasselbe wie Abschottung."
          },
          {
            id: "vorsicht_c",
            label: "Weil der Weg gefährlich ist und Hilfe später nur gelingt, wenn ich nicht kopflos bin.",
            quality: "strong",
            explain: "Tragfähig. Du verbindest Risiko und Verantwortung sinnvoll."
          }
        ]
      },
      {
        id: "eile",
        label: "Ich will so schnell wie möglich durch und denke nur an mein eigenes Durchkommen.",
        outcomeTitle: "Schnell, aber eng geführt",
        outcomeText: "Du reduzierst den Weg auf Selbstschutz. Das kann später deinen Blick verengen.",
        outcomeClass: "bad",
        effects: { courage: 0, care: 0, wisdom: 1, fragments: 0, strongReason: false },
        nextScene: "runner",
        reasons: [
          {
            id: "eile_a",
            label: "Weil auf einem gefährlichen Weg zuerst nur das eigene Überleben zählt.",
            quality: "weak",
            explain: "Das ist nachvollziehbar, aber ethisch zu kurz. Das Gleichnis prüft gerade diese Verengung."
          },
          {
            id: "eile_b",
            label: "Weil der Weg sonst keine Zeit für spätere Hilfe lässt.",
            quality: "medium",
            explain: "Teilweise plausibel. Du bemerkst das Risiko, blendest aber den anderen fast ganz aus."
          },
          {
            id: "eile_c",
            label: "Weil Angst den Blick auf andere leicht verschließt.",
            quality: "strong",
            explain: "Stark reflektiert. Selbst wenn du diese Haltung wählst, erkennst du ihre Gefahr."
          }
        ]
      }
    ]
  },
  {
    id: "beobachtung",
    title: "Vorbeigehen oder anhalten",
    type: "Schlüsselszene",
    role: "Rolle: Beobachter am Weg",
    tags: ["Priester", "Levit", "Blick"],
    cast: ["Überfallener", "Priester", "Levit"],
    text: "Der Überfallene liegt am Weg. Priester und Levit gehen vorbei. Das mittlere Bild prüft ihren Blick, das dritte rückt den Verwundeten ins Zentrum.",
    question: "Wie liest du das Vorbeigehen der beiden?",
    frames: [
      { src: "assets/scene-3-passing.svg", title: "Vorbeigehen", caption: "Die Not bleibt liegen, während andere Distanz halten.", focus: "Das erste Bild zeigt die Szene als Ganzes: Not ist da, sie wird gesehen, aber nicht unterbrochen." },
      { src: "assets/scene-3-priests.svg", title: "Priester und Levit", caption: "Dieses Bild zoomt bewusst auf die Vorübergehenden: Man soll fragen, was in ihnen vorgeht.", focus: "Der tiefere Sinn dieses Bildes ist: Du sollst ihre Perspektive prüfen. Angst, Rolle und Selbstschutz können nachvollziehbar sein, rechtfertigen das Vorbeigehen aber nicht einfach." },
      { src: "assets/scene-3-wounded.svg", title: "Der Verwundete", caption: "Die Perspektive des Verwundeten verändert die Szene.", focus: "Hier kippt der Blick. Nicht mehr die Gründe der Vorübergehenden stehen im Zentrum, sondern die Erfahrung des Menschen, der liegen bleibt." }
    ],
    options: [
      {
        id: "spiegel",
        label: "Ich lese die beiden als Spiegel für eigenes Wegsehen unter Druck.",
        outcomeTitle: "Selbstkritisch gelesen",
        outcomeText: "Du machst die Szene nicht zu einem Fremdurteil, sondern zu einer Prüfung des eigenen Blicks.",
        outcomeClass: "good",
        effects: { courage: 2, care: 2, wisdom: 2, fragments: 1, strongReason: true },
        nextScene: "samariter",
        reasons: [
          {
            id: "spiegel_a",
            label: "Weil das Gleichnis nicht nur andere bloßstellen, sondern mich selbst befragen will.",
            quality: "strong",
            explain: "Sehr tragfähig. Du nimmst die Pointe des Gleichnisses ernst."
          },
          {
            id: "spiegel_b",
            label: "Weil Priester und Levit bestimmt einfach schlechte Menschen sind.",
            quality: "weak",
            explain: "Zu einfach. Dann bleibt die Zumutung für dich selbst zu klein."
          },
          {
            id: "spiegel_c",
            label: "Weil nachvollziehbare Angst und echtes Versagen gleichzeitig vorkommen können.",
            quality: "strong",
            explain: "Stark. Du moralisiert nicht flach, sondern verstehst die Spannung."
          }
        ]
      },
      {
        id: "verurteilung",
        label: "Ich verurteile die beiden sofort, weil sie offensichtlich falsch handeln.",
        outcomeTitle: "Klar, aber etwas flach",
        outcomeText: "Du erkennst das Problem, bleibst aber stärker beim Urteil über andere als bei der Frage an dich selbst.",
        outcomeClass: "warn",
        effects: { courage: 1, care: 1, wisdom: 1, fragments: 0, strongReason: false },
        nextScene: "samariter",
        reasons: [
          {
            id: "verurteilung_a",
            label: "Weil Nicht-Helfen hier sichtbar schadet und deshalb nicht beschönigt werden darf.",
            quality: "medium",
            explain: "Das ist richtig, aber noch nicht die tiefste Deutung der Szene."
          },
          {
            id: "verurteilung_b",
            label: "Weil die Geschichte sonst keine klaren Guten und Bösen hätte.",
            quality: "weak",
            explain: "Zu schematisch. Gerade die Ambivalenz macht die Geschichte stark."
          },
          {
            id: "verurteilung_c",
            label: "Weil ihre Rollen sie nicht von Verantwortung entbinden.",
            quality: "strong",
            explain: "Das ist tragfähig. Du erkennst, dass Status die Not des anderen nicht aufhebt."
          }
        ]
      }
    ]
  },
  {
    id: "samariter",
    title: "Jetzt handelst du als Samariter",
    type: "Rollenspiel",
    role: "Rolle: Samariter",
    tags: ["Hilfe", "Risiko", "Grenze"],
    cast: ["Samariter", "Verwundeter", "Reittier"],
    text: "Jetzt spielst du den Samariter. Hilfe ist möglich, kostet aber Zeit, Kraft und Risiko.",
    question: "Was tust du zuerst?",
    frames: [
      { src: "assets/scene-4-mercy.svg", title: "Annäherung", caption: "Die Distanz wird unterbrochen.", focus: "Dieses Bild macht den ersten entscheidenden Schritt sichtbar: Hilfe beginnt damit, Distanz nicht stehen zu lassen." },
      { src: "assets/scene-4-mercy-detail.svg", title: "Versorgung", caption: "Erste Hilfe braucht Nähe und Zeit.", focus: "Hier wird deutlich, dass Mitgefühl praktisch wird. Es bleibt nicht beim inneren Betroffensein." },
      { src: "assets/scene-4-mercy-lift.svg", title: "Weitertragen", caption: "Hilfe ist mehr als Betroffenheit.", focus: "Der Blick aufs Tragen zeigt: Wirkliche Hilfe kostet Kraft und verändert den Weg des Helfenden mit." }
    ],
    options: [
      {
        id: "direkthilfe",
        label: "Ich versorge die Wunden sofort und bringe den Verwundeten auf mein Tier.",
        outcomeTitle: "Tatkräftig und nah",
        outcomeText: "Du unterbrichst die Logik des Vorbeigehens durch konkrete Hilfe.",
        outcomeClass: "good",
        effects: { courage: 2, care: 2, wisdom: 1, fragments: 1, strongReason: true },
        nextScene: "herberge",
        reasons: [
          {
            id: "direkthilfe_a",
            label: "Weil Mitgefühl im Gleichnis erst dann stark ist, wenn es wirklich handelt.",
            quality: "strong",
            explain: "Sehr tragfähig. Du erfasst den Kern der Szene."
          },
          {
            id: "direkthilfe_b",
            label: "Weil es gut aussieht, sofort zu helfen.",
            quality: "weak",
            explain: "Zu oberflächlich. Im Gleichnis geht es nicht um Wirkung nach außen."
          },
          {
            id: "direkthilfe_c",
            label: "Weil die soziale Grenze hier gerade durch praktische Hilfe überschritten wird.",
            quality: "strong",
            explain: "Stark. Du verbindest Hilfe und Grenzüberschreitung."
          }
        ]
      },
      {
        id: "hilfeholen",
        label: "Ich sichere zuerst die Umgebung und hole dann Hilfe, statt sofort selbst alles zu tun.",
        outcomeTitle: "Vorsichtig, aber nicht gleichgültig",
        outcomeText: "Du hilfst indirekter, willst die Lage aber nicht ignorieren. Das kann ein Ausweg sein, wenn du wirklich zurückkommst oder Hilfe organisierst.",
        outcomeClass: "warn",
        effects: { courage: 1, care: 1, wisdom: 2, fragments: 0, strongReason: false },
        nextScene: "herberge",
        reasons: [
          {
            id: "hilfeholen_a",
            label: "Weil verantwortliche Hilfe manchmal erst die Gefahr mitbedenken muss.",
            quality: "strong",
            explain: "Tragfähig, wenn daraus keine Ausrede wird."
          },
          {
            id: "hilfeholen_b",
            label: "Weil ich mich möglichst aus der Szene heraushalten will.",
            quality: "weak",
            explain: "Das klingt eher nach Distanz als nach Verantwortung."
          },
          {
            id: "hilfeholen_c",
            label: "Weil auch organisierte Hilfe besser sein kann als kopflose Hilfe.",
            quality: "medium",
            explain: "Teilweise stark. Es hängt daran, ob der Verwundete wirklich nicht liegen bleibt."
          }
        ]
      }
    ]
  },
  {
    id: "herberge",
    title: "Die Hilfe muss weitertragen",
    type: "Folgeszene",
    role: "Rolle: Samariter und Wirt",
    tags: ["Herberge", "Kosten", "Nachsorge"],
    cast: ["Samariter", "Wirt", "Verwundeter"],
    text: "Erste Hilfe reicht nicht. Jetzt zeigt sich, ob deine Hilfe auch morgen noch trägt.",
    question: "Wie sicherst du die Hilfe ab?",
    frames: [
      { src: "assets/scene-5-inn.svg", title: "Ankunft", caption: "Die Hilfe erreicht einen geschützten Ort.", focus: "Das Bild zeigt, dass gute Hilfe den Verletzten aus offener Gefahr in einen tragenden Raum bringt." },
      { src: "assets/scene-5-inn-detail.svg", title: "Pflege", caption: "Sorge endet nicht mit dem ersten Verband.", focus: "Hier liegt der Sinn auf der Dauer: Barmherzigkeit bleibt nicht beim ersten Impuls stehen." },
      { src: "assets/scene-5-inn-payment.svg", title: "Kosten", caption: "Verantwortung trägt auch materielle Folgen mit.", focus: "Dieses Bild lenkt den Blick auf Verbindlichkeit. Hilfe wird durch Kosten und Absprachen abgesichert." }
    ],
    options: [
      {
        id: "verbindlich",
        label: "Ich bezahle, kläre Verantwortung mit dem Wirt und sichere die weitere Pflege ab.",
        outcomeTitle: "Verlässlich weitergeführt",
        outcomeText: "Deine Hilfe wird tragfähig, weil sie nicht im Augenblick stecken bleibt.",
        outcomeClass: "good",
        effects: { courage: 1, care: 2, wisdom: 2, fragments: 1, strongReason: true },
        nextScene: "heute",
        reasons: [
          {
            id: "verbindlich_a",
            label: "Weil Nächstenliebe im Gleichnis gerade auch in der Nachsorge sichtbar wird.",
            quality: "strong",
            explain: "Stark. Du verstehst, dass Barmherzigkeit nicht nach dem ersten Impuls endet."
          },
          {
            id: "verbindlich_b",
            label: "Weil Hilfe nur dann zählt, wenn sie auch etwas kostet.",
            quality: "medium",
            explain: "Teilweise tragfähig, aber etwas zu eng. Kosten sind wichtig, aber nicht das Ganze."
          },
          {
            id: "verbindlich_c",
            label: "Weil Hilfe erst dann zuverlässig wird, wenn Verantwortung geteilt und abgesichert wird.",
            quality: "strong",
            explain: "Sehr stark begründet. Du beschreibst den Kern der Szene."
          }
        ]
      },
      {
        id: "locker",
        label: "Ich überlasse den Verwundeten dem Wirt und hoffe, dass es schon gut weitergeht.",
        outcomeTitle: "Der Weg bleibt offen, aber unsicher",
        outcomeText: "Du gehst weiter, ohne die Hilfe wirklich zu sichern. Es ist ein Ausweg, aber ein schwacher.",
        outcomeClass: "bad",
        effects: { courage: 0, care: 1, wisdom: 0, fragments: 0, strongReason: false },
        nextScene: "heute",
        reasons: [
          {
            id: "locker_a",
            label: "Weil ich schon genug getan habe und andere jetzt übernehmen müssen.",
            quality: "weak",
            explain: "Diese Begründung verengt Verantwortung deutlich."
          },
          {
            id: "locker_b",
            label: "Weil Hilfe ohne klare Absprachen schnell abbrechen kann, ich hier aber darauf vertraue.",
            quality: "medium",
            explain: "Reflektierter als bloßes Abschieben, aber dennoch unsicher."
          },
          {
            id: "locker_c",
            label: "Weil ich die Grenze zwischen eigener Hilfe und weiterer Organisation nicht klar ziehe.",
            quality: "strong",
            explain: "Stark in der Selbstkritik. Auch eine schwache Entscheidung kann klug begründet werden."
          }
        ]
      }
    ]
  },
  {
    id: "heute",
    title: "Heute: Wer wird zum Nächsten?",
    type: "Transfer",
    role: "Rolle: Schüler in der Gegenwart",
    tags: ["Schule", "Ausgrenzung", "Transfer"],
    cast: ["Ausgegrenzter Schüler", "Zuschauende", "Du"],
    text: "Ein Mitschüler wird in der Schule und online ausgegrenzt. Jetzt musst du entscheiden, was heute dem Gleichnis entspricht.",
    question: "Wie handelst du in dieser heutigen Szene?",
    frames: [
      { src: "assets/scene-6-today.svg", title: "Heute", caption: "Die Frage endet nicht in der Antike.", focus: "Das erste Bild macht klar: Das Gleichnis soll nicht nur nacherzählt, sondern in die Gegenwart übertragen werden." },
      { src: "assets/scene-6-school-detail.svg", title: "Ausgrenzung", caption: "Viele sehen hin, aber wenige handeln.", focus: "Dieses Bild übersetzt die Wegszene in die Gegenwart: Not ist sichtbar, aber Reaktionen bleiben oft aus." },
      { src: "assets/scene-6-school-support.svg", title: "Beistand", caption: "Hilfe kann heute mutig und organisiert sein.", focus: "Hier wird der mögliche Ausweg gezeigt: Nächstenliebe heute ist oft kluge, gemeinsame Unterstützung." }
    ],
    options: [
      {
        id: "intervention",
        label: "Ich suche das Gespräch, hole Unterstützung dazu und lasse den Betroffenen nicht allein.",
        outcomeTitle: "Der Transfer gelingt",
        outcomeText: "Du überträgst die Logik des Gleichnisses in eine heutige Situation, ohne einfach nur Held zu spielen.",
        outcomeClass: "good",
        effects: { courage: 2, care: 2, wisdom: 2, fragments: 1, strongReason: true },
        nextScene: null,
        reasons: [
          {
            id: "intervention_a",
            label: "Weil Nächstenliebe heute sowohl persönliche Zuwendung als auch kluge Organisation braucht.",
            quality: "strong",
            explain: "Sehr tragfähig. Du überträgst das Gleichnis differenziert in die Gegenwart."
          },
          {
            id: "intervention_b",
            label: "Weil ich dann selbst als mutig angesehen werde.",
            quality: "weak",
            explain: "Diese Begründung richtet den Blick zu stark auf dich selbst."
          },
          {
            id: "intervention_c",
            label: "Weil Schweigen die verletzende Struktur eher schützt als den verletzten Menschen.",
            quality: "strong",
            explain: "Stark. Du triffst die Pointe des Transfers."
          }
        ]
      },
      {
        id: "privat",
        label: "Ich schreibe dem Mitschüler privat, mische mich aber sonst nicht weiter ein.",
        outcomeTitle: "Nicht nichts, aber noch zu wenig",
        outcomeText: "Du zeigst Nähe, veränderst die Situation aber nur begrenzt. Die Geschichte bleibt offen für eine stärkere Reaktion.",
        outcomeClass: "warn",
        effects: { courage: 1, care: 1, wisdom: 1, fragments: 0, strongReason: false },
        nextScene: null,
        reasons: [
          {
            id: "privat_a",
            label: "Weil persönliche Zuwendung helfen kann, auch wenn sie die Struktur noch nicht verändert.",
            quality: "medium",
            explain: "Das ist reflektiert, aber noch nicht die stärkste Übertragung."
          },
          {
            id: "privat_b",
            label: "Weil ich keinen Ärger bekommen will und trotzdem etwas getan haben möchte.",
            quality: "weak",
            explain: "Diese Begründung zeigt, wie stark Selbstschutz den Transfer begrenzen kann."
          },
          {
            id: "privat_c",
            label: "Weil leise Hilfe besser ist als gar keine, auch wenn sie noch ausbaufähig bleibt.",
            quality: "medium",
            explain: "Teilweise tragfähig. Du erkennst zugleich die Grenze deiner Entscheidung."
          }
        ]
      }
    ]
  }
];

const state = {
  started: false,
  currentSceneIndex: -1,
  selectedFrameIndex: 0,
  pendingChoice: null,
  pendingReasonIndex: -1,
  answers: [],
  resources: {
    courage: 0,
    care: 0,
    wisdom: 0,
    fragments: 0
  },
  runnerCompleted: false,
  runnerBonusAwarded: false
};

const runnerState = {
  active: false,
  finished: false,
  success: false,
  animationFrame: 0,
  collected: 0,
  distance: 0,
  player: { x: 120, y: 0, vy: 0, size: 42, onGround: true },
  obstacles: [],
  fragments: [],
  groundY: 184
};

const elements = {
  startButton: document.getElementById("startButton"),
  openResultsButton: document.getElementById("openResultsButton"),
  showStoryPage: document.getElementById("showStoryPage"),
  showResultsPage: document.getElementById("showResultsPage"),
  storyPage: document.getElementById("storyPage"),
  resultsPage: document.getElementById("resultsPage"),
  statusLabel: document.getElementById("statusLabel"),
  resourceCourage: document.getElementById("resourceCourage"),
  resourceCare: document.getElementById("resourceCare"),
  resourceWisdom: document.getElementById("resourceWisdom"),
  resourceFragments: document.getElementById("resourceFragments"),
  stepGrid: document.getElementById("stepGrid"),
  backStepButton: document.getElementById("backStepButton"),
  journalList: document.getElementById("journalList"),
  runnerPanel: document.getElementById("runnerPanel"),
  runnerCanvas: document.getElementById("runnerCanvas"),
  runnerStartButton: document.getElementById("runnerStartButton"),
  runnerSkipButton: document.getElementById("runnerSkipButton"),
  runnerContinueButton: document.getElementById("runnerContinueButton"),
  jumpButton: document.getElementById("jumpButton"),
  runnerStatus: document.getElementById("runnerStatus"),
  sceneType: document.getElementById("sceneType"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneRole: document.getElementById("sceneRole"),
  sceneCast: document.getElementById("sceneCast"),
  sceneImage: document.getElementById("sceneImage"),
  sceneCaption: document.getElementById("sceneCaption"),
  frameFocusText: document.getElementById("frameFocusText"),
  storyThumbs: document.getElementById("storyThumbs"),
  sceneTags: document.getElementById("sceneTags"),
  sceneText: document.getElementById("sceneText"),
  sceneQuestion: document.getElementById("sceneQuestion"),
  options: document.getElementById("options"),
  sceneConsequence: document.getElementById("sceneConsequence"),
  reasonPanel: document.getElementById("reasonPanel"),
  reasons: document.getElementById("reasons"),
  confirmChoiceButton: document.getElementById("confirmChoiceButton"),
  changeChoiceButton: document.getElementById("changeChoiceButton"),
  feedback: document.getElementById("feedback"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackText: document.getElementById("feedbackText"),
  feedbackDeepen: document.getElementById("feedbackDeepen"),
  continueButton: document.getElementById("continueButton"),
  resultSummary: document.getElementById("resultSummary"),
  resultRating: document.getElementById("resultRating"),
  resultDecisions: document.getElementById("resultDecisions"),
  resultReasons: document.getElementById("resultReasons"),
  resultFragments: document.getElementById("resultFragments"),
  resultNote: document.getElementById("resultNote"),
  timeline: document.getElementById("timeline"),
  reflectionInput: document.getElementById("reflectionInput"),
  exportButton: document.getElementById("exportButton"),
  restartButton: document.getElementById("restartButton")
};

const runnerContext = elements.runnerCanvas.getContext("2d");

function showPage(pageName) {
  const showStory = pageName === "story";
  elements.storyPage.classList.toggle("hidden", !showStory);
  elements.resultsPage.classList.toggle("hidden", showStory);
  elements.showStoryPage.classList.toggle("active", showStory);
  elements.showResultsPage.classList.toggle("active", !showStory);
}

function createPill(label, className = "pill") {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = label;
  return span;
}

function currentScene() {
  return SCENES[state.currentSceneIndex];
}

function resetProgress() {
  state.resources = { courage: 0, care: 0, wisdom: 0, fragments: 0 };
}

function recomputeProgress() {
  resetProgress();
  state.answers.forEach(answer => {
    const scene = SCENES.find(item => item.id === answer.sceneId);
    const option = scene.options.find(item => item.id === answer.optionId);
    const reason = option.reasons.find(item => item.id === answer.reasonId);
    state.resources.courage += option.effects.courage;
    state.resources.care += option.effects.care;
    state.resources.wisdom += option.effects.wisdom;
    state.resources.fragments += option.effects.fragments;
    if (reason.quality === "strong") {
      answer.strongReason = true;
    } else {
      answer.strongReason = false;
    }
  });

  if (state.runnerBonusAwarded) {
    state.resources.fragments += 2;
  }
}

function updateSidebar() {
  const completed = state.answers.length;
  elements.statusLabel.textContent = state.started
    ? `Szene ${Math.min(state.currentSceneIndex + 1, SCENES.length)} von ${SCENES.length}`
    : "Noch nicht gestartet";
  elements.resourceCourage.textContent = `${state.resources.courage}`;
  elements.resourceCare.textContent = `${state.resources.care}`;
  elements.resourceWisdom.textContent = `${state.resources.wisdom}`;
  elements.resourceFragments.textContent = `${state.resources.fragments}`;
  elements.backStepButton.disabled = completed === 0;

  elements.stepGrid.innerHTML = "";
  SCENES.forEach((scene, index) => {
    const button = document.createElement("button");
    const answered = index < state.answers.length;
    const reachable = state.started && index <= state.answers.length;
    button.className = "step-button";
    if (state.currentSceneIndex === index) {
      button.classList.add("active");
    }
    if (!reachable) {
      button.classList.add("locked");
    }
    button.disabled = !reachable;
    button.type = "button";
    button.addEventListener("click", () => jumpToScene(index));

    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${scene.title}`;
    const status = document.createElement("span");
    status.textContent = answered ? "bearbeitet" : reachable ? "offen" : "gesperrt";

    button.append(title, status);
    elements.stepGrid.appendChild(button);
  });

  elements.journalList.innerHTML = "";
  if (state.answers.length === 0) {
    const empty = document.createElement("div");
    empty.className = "journal-entry";
    empty.innerHTML = "<strong>Noch kein Eintrag</strong><span>Deine Entscheidungen erscheinen hier nach und nach.</span>";
    elements.journalList.appendChild(empty);
  } else {
    state.answers.forEach((answer, index) => {
      const entry = document.createElement("article");
      entry.className = "journal-entry";
      const title = document.createElement("strong");
      title.textContent = `${index + 1}. ${answer.sceneTitle}`;
      const body = document.createElement("span");
      body.textContent = `${answer.optionLabel} – ${answer.reasonLabel}`;
      entry.append(title, body);
      elements.journalList.appendChild(entry);
    });
  }
}

function createFrameButton(frame, frameIndex) {
  const roles = ["Bild 1 · Überblick", "Bild 2 · Fokus", "Bild 3 · Vertiefung"];
  const button = document.createElement("button");
  button.className = "story-thumb";
  button.type = "button";
  button.addEventListener("click", () => selectFrame(frameIndex));

  const image = document.createElement("img");
  image.src = frame.src;
  image.alt = frame.title;

  const textWrap = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = frame.title;
  const caption = document.createElement("span");
  caption.textContent = roles[frameIndex] || `Bild ${frameIndex + 1}`;
  textWrap.append(title, caption);

  button.append(image, textWrap);
  return button;
}

function selectFrame(frameIndex) {
  const scene = currentScene();
  const frame = scene.frames[frameIndex];
  state.selectedFrameIndex = frameIndex;
  elements.sceneImage.src = frame.src;
  elements.sceneImage.alt = frame.title;
  elements.sceneCaption.textContent = frame.caption;
  elements.frameFocusText.textContent = frame.focus
    ? frame.focus.split(". ")[0].trim()
    : "Jedes Bild lenkt deinen Blick auf einen anderen Aspekt der Szene.";

  Array.from(elements.storyThumbs.children).forEach((button, index) => {
    button.classList.toggle("active", index === frameIndex);
  });
}

function createOption(option, index) {
  const article = document.createElement("article");
  article.className = "option";

  const head = document.createElement("div");
  head.className = "option-head";

  const title = document.createElement("h3");
  title.textContent = `${index + 1}. ${option.label}`;

  const tag = document.createElement("div");
  tag.className = "option-tag";
  tag.textContent = "Entscheidung";

  const button = document.createElement("button");
  button.className = "button button-secondary";
  button.type = "button";
  button.textContent = "Diese Richtung wählen";
  button.addEventListener("click", () => openReasonPanel(option));

  head.append(title, tag);
  article.append(head, button);
  return article;
}

function renderScene() {
  const scene = currentScene();
  state.pendingChoice = null;
  state.pendingReasonIndex = -1;
  state.selectedFrameIndex = 0;

  elements.sceneType.textContent = scene.type;
  elements.sceneTitle.textContent = scene.title;
  elements.sceneRole.textContent = scene.role;
  elements.sceneCast.innerHTML = "";
  scene.cast.forEach(item => elements.sceneCast.appendChild(createPill(item, "cast-pill")));
  elements.sceneTags.innerHTML = "";
  scene.tags.forEach(item => elements.sceneTags.appendChild(createPill(item)));
  elements.sceneText.textContent = scene.text;
  elements.sceneQuestion.textContent = scene.question;

  elements.storyThumbs.innerHTML = "";
  scene.frames.forEach((frame, index) => elements.storyThumbs.appendChild(createFrameButton(frame, index)));
  selectFrame(0);

  elements.options.innerHTML = "";
  scene.options.forEach((option, index) => elements.options.appendChild(createOption(option, index)));

  elements.reasonPanel.classList.add("hidden");
  elements.feedback.classList.add("hidden");
  elements.sceneConsequence.classList.remove("hidden");
  updateSidebar();
}

function openReasonPanel(option) {
  state.pendingChoice = option;
  state.pendingReasonIndex = -1;
  elements.confirmChoiceButton.disabled = true;
  elements.reasons.innerHTML = "";
  option.reasons.forEach((reason, index) => {
    const button = document.createElement("button");
    button.className = "reason-card";
    button.type = "button";
    button.addEventListener("click", () => selectReason(index));

    const title = document.createElement("strong");
    title.textContent = reason.label;
    button.append(title);
    elements.reasons.appendChild(button);
  });
  elements.reasonPanel.classList.remove("hidden");
  elements.feedback.classList.add("hidden");
}

function selectReason(index) {
  state.pendingReasonIndex = index;
  elements.confirmChoiceButton.disabled = false;
  Array.from(elements.reasons.children).forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });
}

function finalizeChoice() {
  const scene = currentScene();
  const option = state.pendingChoice;
  const reason = option.reasons[state.pendingReasonIndex];

  const answer = {
    sceneId: scene.id,
    sceneTitle: scene.title,
    optionId: option.id,
    optionLabel: option.label,
    reasonId: reason.id,
    reasonLabel: reason.label,
    strongReason: reason.quality === "strong",
    outcomeTitle: option.outcomeTitle,
    outcomeText: option.outcomeText,
    explain: reason.explain,
    outcomeClass: option.outcomeClass,
    nextScene: option.nextScene
  };

  state.answers = state.answers.slice(0, state.currentSceneIndex);
  state.answers.push(answer);
  recomputeProgress();

  elements.feedback.className = `feedback ${option.outcomeClass}`;
  elements.feedbackTitle.textContent = option.outcomeTitle;
  elements.feedbackText.textContent = `${option.outcomeText} ${reason.explain}`;
  elements.feedbackDeepen.textContent = answer.strongReason
    ? "Diese Begründung zählt als starke Auseinandersetzung mit der Szene."
    : "Du kommst weiter, aber deine Begründung bleibt eher knapp oder unsicher.";
  elements.feedback.classList.remove("hidden");
  elements.reasonPanel.classList.add("hidden");
  elements.sceneConsequence.classList.add("hidden");
  updateSidebar();
  updateResults();
}

function goNext() {
  const answer = state.answers[state.currentSceneIndex];
  if (!answer) {
    return;
  }

  if (state.currentSceneIndex === 1 && !state.runnerCompleted) {
    elements.runnerPanel.classList.remove("hidden");
    elements.runnerPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (answer.nextScene === null || state.currentSceneIndex === SCENES.length - 1) {
    updateResults();
    showPage("results");
    elements.resultsPage.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  state.currentSceneIndex += 1;
  elements.runnerContinueButton.classList.add("hidden");
  renderScene();
}

function jumpToScene(index) {
  if (!state.started || index > state.answers.length) {
    return;
  }
  state.currentSceneIndex = index;
  elements.runnerPanel.classList.add("hidden");
  elements.runnerContinueButton.classList.add("hidden");
  renderScene();
}

function goBackOneStep() {
  if (state.answers.length === 0) {
    return;
  }
  state.answers.pop();
  recomputeProgress();
  state.currentSceneIndex = Math.max(0, state.answers.length - 1);
  if (state.answers.length === 0) {
    state.currentSceneIndex = 0;
  }
  elements.runnerPanel.classList.add("hidden");
  elements.runnerContinueButton.classList.add("hidden");
  renderScene();
  updateResults();
}

function getRating() {
  const strongReasons = state.answers.filter(item => item.strongReason).length;
  const complete = state.answers.length === SCENES.length;
  const reflectionLongEnough = elements.reflectionInput.value.trim().length >= 30;

  if (complete && strongReasons >= 3 && (state.resources.fragments >= 3 || reflectionLongEnough)) {
    return {
      title: "Gut auseinandergesetzt",
      text: "Du hast die Szenen vollständig bearbeitet, tragfähige Begründungen gewählt und deutliche Spuren deiner Auseinandersetzung hinterlassen."
    };
  }

  if (complete) {
    return {
      title: "Teilweise gut auseinandergesetzt",
      text: "Du hast den Weg durchgespielt. Für eine stärkere Auseinandersetzung bräuchte es noch mehr tragfähige Begründungen oder gesicherte Spuren."
    };
  }

  return {
    title: "Noch offen",
    text: "Spiele alle Szenen und begründe deine Entscheidungen, damit die Auseinandersetzung sichtbar wird."
  };
}

function updateResults() {
  const strongReasons = state.answers.filter(item => item.strongReason).length;
  const rating = getRating();

  elements.resultRating.textContent = rating.title;
  elements.resultDecisions.textContent = `${state.answers.length} / ${SCENES.length}`;
  elements.resultReasons.textContent = `${strongReasons}`;
  elements.resultFragments.textContent = `${state.resources.fragments}`;
  elements.resultSummary.textContent = rating.text;
  elements.resultNote.textContent = `Mut ${state.resources.courage}, Sorge ${state.resources.care}, Weitblick ${state.resources.wisdom}, Spuren ${state.resources.fragments}.`;

  elements.timeline.innerHTML = "";
  if (state.answers.length === 0) {
    const entry = document.createElement("article");
    entry.className = "timeline-entry";
    entry.innerHTML = "<h3>Noch kein Weg</h3><p>Deine Entscheidungen erscheinen hier nach und nach.</p>";
    elements.timeline.appendChild(entry);
    return;
  }

  state.answers.forEach((answer, index) => {
    const article = document.createElement("article");
    article.className = "timeline-entry";
    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${answer.sceneTitle}`;
    const body = document.createElement("p");
    body.textContent = `${answer.optionLabel} Begründung: ${answer.reasonLabel}`;
    article.append(title, body);
    elements.timeline.appendChild(article);
  });
}

function renderIntro() {
  state.currentSceneIndex = 0;
  elements.sceneType.textContent = "Auftakt";
  elements.sceneTitle.textContent = "Pfad der Barmherzigkeit";
  elements.sceneRole.textContent = "Rolle: Beobachter";
  elements.sceneCast.innerHTML = "";
  ["Jesus", "Gesetzeslehrer", "Du"].forEach(item => elements.sceneCast.appendChild(createPill(item, "cast-pill")));
  elements.sceneTags.innerHTML = "";
  ["Rollenspiel", "Bildergeschichte", "Entscheidungen"].forEach(item => elements.sceneTags.appendChild(createPill(item)));
  elements.sceneText.textContent = "Drücke auf „Mission starten“, um die Geschichte als interaktives Rollenspiel zu beginnen.";
  elements.sceneQuestion.textContent = "Leitfrage: Wirst du nur zuschauen oder die Geschichte wirklich mitentscheiden?";
  elements.sceneImage.src = "assets/scene-1-law.svg";
  elements.sceneImage.alt = "Auftakt";
  elements.sceneCaption.textContent = "Auftakt der Bildergeschichte";
  elements.frameFocusText.textContent = "Jedes Bild lenkt deinen Blick auf einen anderen Aspekt der Szene.";
  elements.storyThumbs.innerHTML = "";
  elements.options.innerHTML = "";
  elements.reasonPanel.classList.add("hidden");
  elements.feedback.classList.add("hidden");
  elements.sceneConsequence.classList.remove("hidden");
  elements.runnerContinueButton.classList.add("hidden");
  updateSidebar();
  updateResults();
}

function startMission() {
  state.started = true;
  state.currentSceneIndex = 0;
  state.pendingChoice = null;
  state.pendingReasonIndex = -1;
  state.answers = [];
  state.resources = { courage: 0, care: 0, wisdom: 0, fragments: 0 };
  state.runnerCompleted = false;
  state.runnerBonusAwarded = false;
  elements.reflectionInput.value = "";
  elements.runnerPanel.classList.add("hidden");
  elements.runnerContinueButton.classList.add("hidden");
  renderScene();
  updateResults();
  showPage("story");
}

function resetMission() {
  cancelAnimationFrame(runnerState.animationFrame);
  runnerState.active = false;
  runnerState.finished = false;
  state.started = false;
  state.runnerCompleted = false;
  state.runnerBonusAwarded = false;
  state.answers = [];
  state.resources = { courage: 0, care: 0, wisdom: 0, fragments: 0 };
  elements.reflectionInput.value = "";
  elements.runnerPanel.classList.add("hidden");
  elements.runnerContinueButton.classList.add("hidden");
  renderIntro();
  showPage("story");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function exportResults() {
  const rating = getRating();
  const strongReasons = state.answers.filter(item => item.strongReason).length;
  const reflection = elements.reflectionInput.value.trim() || "Keine eigene Deutung eingetragen.";

  let text = "PFAD DER BARMHERZIGKEIT - ROLLENSPIEL Q1 ER\n";
  text += `Erstellt: ${new Date().toLocaleString("de-DE")}\n`;
  text += `Bewertung: ${rating.title}\n`;
  text += `Entscheidungen: ${state.answers.length}/${SCENES.length}\n`;
  text += `Starke Begründungen: ${strongReasons}\n`;
  text += `Spuren: ${state.resources.fragments}\n`;
  text += `Mut: ${state.resources.courage}\n`;
  text += `Sorge: ${state.resources.care}\n`;
  text += `Weitblick: ${state.resources.wisdom}\n\n`;
  text += "ENTSCHEIDUNGSWEG\n";

  state.answers.forEach((answer, index) => {
    text += `${index + 1}. ${answer.sceneTitle}\n`;
    text += `Entscheidung: ${answer.optionLabel}\n`;
    text += `Begründung: ${answer.reasonLabel}\n`;
    text += `Folge: ${answer.outcomeTitle}\n\n`;
  });

  text += "EIGENE KURZDEUTUNG\n";
  text += `${reflection}\n`;

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "pfad-der-barmherzigkeit-rollenspiel.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function setupRunner() {
  cancelAnimationFrame(runnerState.animationFrame);
  runnerState.active = false;
  runnerState.finished = false;
  runnerState.success = false;
  elements.runnerContinueButton.classList.add("hidden");
  runnerState.collected = 0;
  runnerState.distance = 0;
  runnerState.player = { x: 120, y: 0, vy: 0, size: 42, onGround: true };
  runnerState.obstacles = [
    { x: 540, width: 30, height: 34, hit: false },
    { x: 860, width: 34, height: 44, hit: false }
  ];
  runnerState.fragments = [
    { x: 390, y: 96, size: 20, taken: false },
    { x: 710, y: 84, size: 20, taken: false },
    { x: 1030, y: 88, size: 20, taken: false }
  ];
  drawRunner();
  elements.runnerStatus.textContent = "Sammle mindestens zwei Schriftfragmente.";
}

function startRunner() {
  if (runnerState.active) {
    return;
  }
  setupRunner();
  runnerState.active = true;
  runnerState.finished = false;
  runnerLoop();
}

function jumpRunner() {
  if (!runnerState.active) {
    return;
  }
  if (runnerState.player.onGround) {
    runnerState.player.vy = -12.5;
    runnerState.player.onGround = false;
  }
}

function finishRunner(success) {
  runnerState.active = false;
  runnerState.finished = true;
  runnerState.success = success;
  cancelAnimationFrame(runnerState.animationFrame);

  if (success) {
    elements.runnerStatus.textContent = "Run geschafft. Zwei Zusatzspuren wurden gesichert.";
    state.runnerCompleted = true;
    state.runnerBonusAwarded = true;
  } else {
    elements.runnerStatus.textContent = "Run beendet. Du kannst ohne Bonus weitergehen.";
    state.runnerCompleted = true;
    state.runnerBonusAwarded = false;
  }

  elements.runnerContinueButton.classList.remove("hidden");
  recomputeProgress();
  updateSidebar();
  updateResults();
}

function runnerLoop() {
  if (!runnerState.active) {
    return;
  }

  runnerState.distance += 4.2;
  runnerState.player.vy += 0.58;
  runnerState.player.y += runnerState.player.vy;

  if (runnerState.player.y >= 0) {
    runnerState.player.y = 0;
    runnerState.player.vy = 0;
    runnerState.player.onGround = true;
  }

  runnerState.obstacles.forEach(obstacle => {
    obstacle.x -= 4.2;
    const playerTop = runnerState.groundY - runnerState.player.size + runnerState.player.y;
    const playerBottom = playerTop + runnerState.player.size;
    const playerLeft = runnerState.player.x;
    const playerRight = runnerState.player.x + runnerState.player.size;
    const obstacleTop = runnerState.groundY - obstacle.height;
    const obstacleBottom = runnerState.groundY;
    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;

    const overlap = playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom > obstacleTop && playerTop < obstacleBottom;
    if (overlap && !obstacle.hit) {
      obstacle.hit = true;
      finishRunner(false);
    }
  });

  runnerState.fragments.forEach(fragment => {
    fragment.x -= 4.2;
    const playerCenterX = runnerState.player.x + runnerState.player.size / 2;
    const playerCenterY = runnerState.groundY - runnerState.player.size / 2 + runnerState.player.y;
    const dx = playerCenterX - fragment.x;
    const dy = playerCenterY - fragment.y;
    if (!fragment.taken && Math.hypot(dx, dy) < 34) {
      fragment.taken = true;
      runnerState.collected += 1;
    }
  });

  if (runnerState.collected >= 2) {
    finishRunner(true);
  }

  if (runnerState.distance > 1180 && !runnerState.finished) {
    finishRunner(runnerState.collected >= 2);
  }

  drawRunner();
  if (runnerState.active) {
    runnerState.animationFrame = requestAnimationFrame(runnerLoop);
  }
}

function drawRunner() {
  const ctx = runnerContext;
  const width = elements.runnerCanvas.width;
  const height = elements.runnerCanvas.height;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 245, 210, 0.8)";
  ctx.beginPath();
  ctx.arc(920, 56, 38, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(120, 92, 58, 0.2)";
  ctx.fillRect(0, runnerState.groundY, width, height - runnerState.groundY);

  ctx.strokeStyle = "rgba(119, 83, 48, 0.28)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, runnerState.groundY);
  ctx.lineTo(width, runnerState.groundY);
  ctx.stroke();

  ctx.fillStyle = "#7f381b";
  runnerState.obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, runnerState.groundY - obstacle.height, obstacle.width, obstacle.height);
  });

  runnerState.fragments.forEach(fragment => {
    if (fragment.taken) {
      return;
    }
    ctx.fillStyle = "#f6edd8";
    ctx.fillRect(fragment.x - 12, fragment.y - 14, 24, 28);
    ctx.strokeStyle = "#cf9d49";
    ctx.lineWidth = 2;
    ctx.strokeRect(fragment.x - 12, fragment.y - 14, 24, 28);
    ctx.beginPath();
    ctx.moveTo(fragment.x - 6, fragment.y - 2);
    ctx.lineTo(fragment.x + 6, fragment.y - 2);
    ctx.moveTo(fragment.x - 6, fragment.y + 5);
    ctx.lineTo(fragment.x + 6, fragment.y + 5);
    ctx.stroke();
  });

  const px = runnerState.player.x;
  const py = runnerState.groundY - runnerState.player.size + runnerState.player.y;
  ctx.fillStyle = "#e7bd92";
  ctx.beginPath();
  ctx.arc(px + 22, py + 12, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#57704c";
  ctx.fillRect(px + 10, py + 24, 24, 24);
  ctx.fillStyle = "#7b5836";
  ctx.fillRect(px + 12, py + 48, 8, 18);
  ctx.fillRect(px + 24, py + 48, 8, 18);

  ctx.fillStyle = "#231b14";
  ctx.font = '700 18px "Trebuchet MS"';
  ctx.fillText(`Fragmente: ${runnerState.collected}/2`, 24, 32);
}

elements.startButton.addEventListener("click", startMission);
elements.openResultsButton.addEventListener("click", () => showPage("results"));
elements.showStoryPage.addEventListener("click", () => showPage("story"));
elements.showResultsPage.addEventListener("click", () => showPage("results"));
elements.backStepButton.addEventListener("click", goBackOneStep);
elements.confirmChoiceButton.addEventListener("click", finalizeChoice);
elements.changeChoiceButton.addEventListener("click", () => {
  elements.reasonPanel.classList.add("hidden");
  state.pendingChoice = null;
  state.pendingReasonIndex = -1;
});
elements.continueButton.addEventListener("click", goNext);
elements.runnerStartButton.addEventListener("click", startRunner);
elements.runnerSkipButton.addEventListener("click", () => {
  state.runnerCompleted = true;
  state.runnerBonusAwarded = false;
  recomputeProgress();
  updateSidebar();
  updateResults();
  elements.runnerStatus.textContent = "Du gehst ohne Bonusspuren weiter.";
  elements.runnerContinueButton.classList.remove("hidden");
});
elements.runnerContinueButton.addEventListener("click", goNext);
elements.jumpButton.addEventListener("click", jumpRunner);
window.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();
    jumpRunner();
  }
});
elements.exportButton.addEventListener("click", exportResults);
elements.restartButton.addEventListener("click", resetMission);
elements.reflectionInput.addEventListener("input", updateResults);

setupRunner();
renderIntro();
showPage("story");
