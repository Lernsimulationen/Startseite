(() => {
  const portraitAssets = {
    hero: "assets/images/mika-fullbody.png",
    sower: "assets/images/eli-fullbody.png",
    seed: "assets/images/mara-fullbody.png",
    mustard: "assets/images/jona-fullbody.png",
    yeast: "assets/images/ruth-fullbody.png"
  };

  const scriptureSources = {
    markus4: {
      label: "Lutherbibel 1912 (LU12), Markus 4 auf Die Bibel.de",
      url: "https://www.die-bibel.de/bibel/LU12/MRK.4/Markus-4"
    },
    matthaeus13: {
      label: "Lutherbibel 1912 (LU12), Matthäus 13 auf Die Bibel.de",
      url: "https://www.die-bibel.de/bibel/LU12/MAT.13/Matthaeus-13"
    }
  };

  const stations = [
    {
      id: "sower",
      label: "Begegnung 1",
      title: "Der Sämann",
      npc: "Feldhüter Eli",
      sprite: "sower",
      x: 15,
      y: 83,
      scriptureRef: "Markus 4,3-20",
      scriptureSource: scriptureSources.markus4,
      scripturePages: [
        [
          "3 Hoeret zu! Siehe, es ging ein Saemann aus, zu saeen.",
          "4 Und es begab sich, indem er saete, fiel etliches an den Weg; da kamen die Voegel unter dem Himmel und frassen's auf.",
          "5 Etliches fiel in das Steinige, wo es nicht viel Erde hatte; und ging bald auf, darum dass es nicht tiefe Erde hatte.",
          "6 Da nun die Sonne aufging, verwelkte es, und dieweil es nicht Wurzel hatte verdorrte es.",
          "7 Und etliches fiel unter die Dornen; und die Dornen wuchsen empor und erstickten's, und es brachte keine Frucht.",
          "8 Und etliches fiel auf ein gutes Land und brachte Frucht, die da zunahm und wuchs; etliches trug dreissigfaeltig und etliches sechzigfaeltig und etliches hundertfaeltig."
        ],
        [
          "9 Und er sprach zu ihnen: Wer Ohren hat, zu hoeren, der hoere!",
          "14 Der Saemann saet das Wort.",
          "15 Diese sind's aber, die an dem Wege sind: Wo das Wort gesaet wird und sie es gehoert haben, so kommt alsbald der Satan und nimmt weg das Wort, das in ihr Herz gesaet war.",
          "16 Also auch die sind's, bei welchen aufs Steinige gesaet ist: wenn sie das Wort gehoert haben, nehmen sie es alsbald mit Freuden auf,",
          "17 und haben keine Wurzel in sich, sondern sind wetterwendisch; wenn sich Truebsal oder Verfolgung um des Wortes willen erhebt, so aergern sie sich alsbald.",
          "18 Und diese sind's, bei welchen unter die Dornen gesaet ist: die das Wort hoeren,",
          "19 und die Sorgen dieser Welt und der betruegerische Reichtum und viele andere Lueste gehen hinein und ersticken das Wort, und es bleibt ohne Frucht.",
          "20 Und diese sind's, bei welchen auf ein gutes Land gesaet ist: die das Wort hoeren und nehmen's an und bringen Frucht, etliche dreissigfaeltig und etliche sechzigfaeltig und etliche hundertfaeltig."
        ]
      ],
      intro:
        "Ich bewache das erste Feld und den Kupferschlüssel. Dieses Gleichnis fragt nicht nur nach dem Samen, sondern nach dem Boden, der ihn aufnimmt.",
      taskTitle: "Böden und Frucht",
      taskType: "sowerSort",
      token: "Kupferschlüssel",
      success:
        "Du hast verstanden, dass das Wort nicht überall gleich aufgenommen wird. Der Kupferschlüssel gehört dir."
    },
    {
      id: "seed",
      label: "Begegnung 2",
      title: "Die selbstwachsende Saat",
      npc: "Gärtnerin Mara",
      sprite: "seed",
      x: 36,
      y: 81,
      scriptureRef: "Markus 4,26-29",
      scriptureSource: scriptureSources.markus4,
      scripturePages: [[
        "26 Und er sprach: Das Reich Gottes hat sich also, als wenn ein Mensch Samen aufs Land wirft",
        "27 und schlaeft und steht auf Nacht und Tag; und der Same geht auf und waechst, dass er's nicht weiss.",
        "28 Denn die Erde bringt von selbst zum ersten das Gras, darnach die Aehren, darnach den vollen Weizen in den Aehren.",
        "29 Wenn sie aber die Frucht gebracht hat, so schickt er bald die Sichel hin; denn die Ernte ist da."
      ]],
      intro:
        "Hier ist Geduld wichtiger als Kontrolle. Achte auf die Reihenfolge des Wachstums und darauf, was der Mensch tun kann und was nicht. Wer es versteht, gewinnt den Mondschlüssel.",
      taskTitle: "Wachstum verstehen",
      taskType: "seedOrder",
      token: "Mondschlüssel",
      success:
        "Gut geordnet. Das Wachstum ist ein Prozess, der geschieht, auch wenn der Mensch ihn nicht ganz beherrscht. Der Mondschlüssel gehört jetzt dir."
    },
    {
      id: "mustard",
      label: "Begegnung 3",
      title: "Das Senfkorn",
      npc: "Hügelwache Jona",
      sprite: "mustard",
      x: 58,
      y: 78,
      scriptureRef: "Markus 4,30-32",
      scriptureSource: scriptureSources.markus4,
      scripturePages: [[
        "30 Und er sprach: Wem wollen wir das Reich Gottes vergleichen, und durch welch Gleichnis wollen wir es vorbilden?",
        "31 Gleichwie ein Senfkorn, wenn das gesaet wird aufs Land, so ist's das kleinste unter allen Samen auf Erden;",
        "32 und wenn es gesaet ist, so nimmt es zu und wird groesser denn alle Kohlkraeuter und gewinnt grosse Zweige, also dass die Voegel unter dem Himmel unter seinem Schatten wohnen koennen."
      ]],
      intro:
        "Hier wirst du durch Größe leicht getäuscht. Nur wer das Kleine ernst nimmt, verdient den Wurzelschlüssel.",
      taskTitle: "Projekt beurteilen",
      taskType: "mustardJudge",
      token: "Wurzelschlüssel",
      success:
        "Genau. Das Reich Gottes beginnt unscheinbar und kann gerade dadurch ein Raum für andere werden. Du erhältst den Wurzelschlüssel."
    },
    {
      id: "yeast",
      label: "Begegnung 4",
      title: "Der Sauerteig",
      npc: "Bäckerin Ruth",
      sprite: "yeast",
      x: 79,
      y: 82,
      scriptureRef: "Matthäus 13,33",
      scriptureSource: scriptureSources.matthaeus13,
      scripturePages: [[
        "33 Ein anderes Gleichnis redete er zu ihnen: Das Himmelreich ist gleich einem Sauerteig, den ein Weib nahm und unter drei Scheffel Mehl vermengte, bis es ganz durchsaeuert ward."
      ]],
      intro:
        "Der Sauerteig wirkt nicht laut, sondern tief. Wenn du die Backstube verstehst, gewinnst du den Sternschlüssel.",
      taskTitle: "Backstuben-Spiel",
      taskType: "yeastSkill",
      token: "Sternschlüssel",
      success:
        "Jetzt ist klar: Das Kleine wirkt durchdringend und verändert das Ganze von innen. Der Sternschlüssel ist dein."
    }
  ];

  const worldObjects = [
    {
      id: "sign",
      requiredStations: 1,
      sprite: "sign",
      x: 26,
      y: 83,
      icon: "S",
      title: "Schiefes Schild",
      taskTitle: "Behauptung prüfen",
      intro: "Das Schild behauptet: Nur wer alles kontrolliert, kann im Reich Gottes wachsen. Stimmt das? Wenn du den Fehler erkennst, bekommst du einen Bonus für Mara.",
      taskType: "trueFalse",
      statement: "Nur volle Kontrolle bringt Wachstum hervor.",
      options: ["Wahr", "Falsch"],
      answer: 1,
      reward: "Hinweisstein 1",
      bonusFor: "seed",
      bonusText: "Bonus für Mara: Du weißt schon vor der Aufgabe, dass der Mensch nur sät und wartet, das Wachstum aber nicht macht.",
      success: "Richtig. Das Schild war eine False Flag. Du hast den ersten Hinweisstein gefunden."
    },
    {
      id: "chest",
      requiredStations: 2,
      sprite: "chest",
      x: 49,
      y: 83,
      icon: "K",
      title: "Leuchtkiste",
      taskTitle: "Kiste entschlüsseln",
      intro: "Die Leuchtkiste lockt mit Abkürzungen. Wenn du sie richtig deutest, bekommst du einen Bonus für Jonas nächste Aufgabe.",
      taskType: "singleChoice",
      question: "Welche Reihenfolge passt zum Gleichnis der selbstwachsenden Saat?",
      options: [
        "Saat, Warten, Wachsen, Ernte",
        "Ernte, Saat, Wachsen, Schlaf",
        "Wachsen, Saat, Ernte, Warten"
      ],
      answer: 0,
      reward: "Hinweisstein 2",
      bonusFor: "mustard",
      bonusText: "Bonus für Jona: Ein unpassendes Großprojekt wird für dich ausgeblendet.",
      success: "Die Leuchtkiste führte nicht in die Irre, sondern prüfte dein Verständnis. Hinweisstein 2 ist nun dein."
    },
    {
      id: "lever",
      requiredStations: 3,
      sprite: "lever",
      x: 69,
      y: 83,
      icon: "H",
      title: "Falscher Hebel",
      taskTitle: "Hebel beurteilen",
      intro: "Der große Hebel verspricht Macht. Wenn du ihn entlarvst, bekommst du einen Bonus für Ruths Backstube.",
      taskType: "singleChoice",
      question: "Welche Einsicht entlarvt den Hebel als False Flag?",
      options: [
        "Nur Größe beeindruckt wirklich.",
        "Das Kleine kann später Schutzraum für viele werden.",
        "Nur laut sichtbare Wirkung zählt."
      ],
      answer: 1,
      reward: "Hinweisstein 3",
      bonusFor: "yeast",
      bonusText: "Bonus für Ruth: Der grüne Trefferbereich in der Backstube wird breiter.",
      success: "Gut erkannt. Nicht der größte Hebel, sondern die richtige Einsicht öffnet den Weg."
    }
  ];

  const searchWords = [
    { word: "SAEMANN", start: [0, 0], end: [0, 6] },
    { word: "BODEN", start: [2, 2], end: [2, 6] },
    { word: "FRUCHT", start: [4, 0], end: [4, 5] },
    { word: "SAMEN", start: [6, 1], end: [6, 5] },
    { word: "ERNTE", start: [8, 0], end: [8, 4] },
    { word: "SENFKORN", start: [10, 0], end: [10, 7] },
    { word: "VOEGEL", start: [1, 11], end: [6, 11] },
    { word: "SAUERTEIG", start: [0, 9], end: [8, 9] },
    { word: "HIMMELREICH", start: [11, 1], end: [11, 11] },
    { word: "DORNEN", start: [3, 10], end: [8, 10] }
  ];

  const clozePrompts = [
    {
      text: "Der Sämann zeigt, dass das Wort auf unterschiedliche ____ trifft.",
      options: ["Böden", "Tore", "Äste"],
      answer: "Böden"
    },
    {
      text: "Die selbstwachsende Saat macht deutlich, dass Wachstum nicht vollständig ____ werden kann.",
      options: ["kontrolliert", "verkauft", "abgekürzt"],
      answer: "kontrolliert"
    },
    {
      text: "Das Senfkorn lehrt, dass aus kleinem Anfang große ____ für andere entstehen kann.",
      options: ["Weite", "Unruhe", "Machtspiele"],
      answer: "Weite"
    },
    {
      text: "Der Sauerteig beschreibt, wie das Reich Gottes die Wirklichkeit von ____ her verwandelt.",
      options: ["innen", "oben", "hinten"],
      answer: "innen"
    }
  ];

  const state = {
    screen: "start",
    player: { x: 7, y: 86 },
    target: null,
    pendingInteraction: null,
    promptAction: null,
    contactLock: null,
    controls: { up: false, down: false, left: false, right: false },
    completedStations: new Set(),
    completedObjects: new Set(),
    bonuses: {},
    tokens: [],
    logs: [],
    modal: null,
    scripturePageIndex: 0,
    taskState: {},
    search: {
      selectedStart: null,
      foundWords: new Set()
    },
    clozeAnswers: [],
    clozeOrders: {},
    rewardReady: false
  };

  const worldEngine = {
    game: null,
    scene: null,
    ready: false,
    player: null,
    gates: [],
    stationNodes: {},
    objectNodes: {},
    goalNode: null
  };

  const els = {
    startScreen: document.querySelector("#startScreen"),
    worldScreen: document.querySelector("#worldScreen"),
    worldStage: document.querySelector("#worldStage"),
    phaserWorld: document.querySelector("#phaserWorld"),
    modalScreen: document.querySelector("#modalScreen"),
    searchScreen: document.querySelector("#searchScreen"),
    finalScreen: document.querySelector("#finalScreen"),
    startGame: document.querySelector("#startGame"),
    tokenCount: document.querySelector("#tokenCount"),
    keyRing: document.querySelector("#keyRing"),
    missionText: document.querySelector("#missionText"),
    worldLayer: document.querySelector("#worldLayer"),
    worldPrompt: document.querySelector("#worldPrompt"),
    actionButton: document.querySelector("#actionButton"),
    moveButtons: Array.prototype.slice.call(document.querySelectorAll("[data-move]")),
    modalLabel: document.querySelector("#modalLabel"),
    modalTitle: document.querySelector("#modalTitle"),
    modalPortrait: document.querySelector("#modalPortrait"),
    modalSpeaker: document.querySelector("#modalSpeaker"),
    modalText: document.querySelector("#modalText"),
    closeModal: document.querySelector("#closeModal"),
    scripturePane: document.querySelector("#scripturePane"),
    scriptureReference: document.querySelector("#scriptureReference"),
    scripturePageLabel: document.querySelector("#scripturePageLabel"),
    scriptureText: document.querySelector("#scriptureText"),
    scriptureSourceLink: document.querySelector("#scriptureSourceLink"),
    taskPane: document.querySelector("#taskPane"),
    taskTitle: document.querySelector("#taskTitle"),
    taskContent: document.querySelector("#taskContent"),
    taskFeedback: document.querySelector("#taskFeedback"),
    modalNext: document.querySelector("#modalNext"),
    wordGrid: document.querySelector("#wordGrid"),
    wordList: document.querySelector("#wordList"),
    searchProgress: document.querySelector("#searchProgress"),
    searchFeedback: document.querySelector("#searchFeedback"),
    toFinalDialog: document.querySelector("#toFinalDialog"),
    clozeList: document.querySelector("#clozeList"),
    clozeFeedback: document.querySelector("#clozeFeedback"),
    checkCloze: document.querySelector("#checkCloze"),
    finalDialogStage: document.querySelector("#finalDialogStage"),
    rewardStage: document.querySelector("#rewardStage"),
    endingText: document.querySelector("#endingText"),
    summaryList: document.querySelector("#summaryList"),
    downloadReport: document.querySelector("#downloadReport"),
    restartGame: document.querySelector("#restartGame")
  };

  function createFilledArray(length, value) {
    const items = [];
    for (let index = 0; index < length; index += 1) {
      items.push(value);
    }
    return items;
  }

  function arrayFind(items, predicate) {
    for (let index = 0; index < items.length; index += 1) {
      if (predicate(items[index], index)) {
        return items[index];
      }
    }
    return null;
  }

  function arrayFindIndex(items, predicate) {
    for (let index = 0; index < items.length; index += 1) {
      if (predicate(items[index], index)) {
        return index;
      }
    }
    return -1;
  }

  function arrayIncludes(items, value) {
    for (let index = 0; index < items.length; index += 1) {
      if (items[index] === value) {
        return true;
      }
    }
    return false;
  }

  function shuffleArray(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const temp = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = temp;
    }
    return copy;
  }

  function bindPress(element, handler) {
    if (!element) return;
    const run = (event) => {
      if (event && event.preventDefault) event.preventDefault();
      handler();
    };
    element.addEventListener("click", run);
    element.addEventListener("touchend", run, { passive: false });
  }

  function getOptionOrder(key, length) {
    if (!state.taskState.optionOrders) {
      state.taskState.optionOrders = {};
    }
    if (!state.taskState.optionOrders[key]) {
      state.taskState.optionOrders[key] = shuffleArray(Array.from({ length }, (_, index) => index));
    }
    return state.taskState.optionOrders[key];
  }

  function getClozeOrder(index, length) {
    if (!state.clozeOrders[index]) {
      state.clozeOrders[index] = shuffleArray(Array.from({ length }, (_, entryIndex) => entryIndex));
    }
    return state.clozeOrders[index];
  }

  function setHidden(element, hidden) {
    if (hidden) {
      element.classList.add("hidden");
      return;
    }
    element.classList.remove("hidden");
  }

  function setWalking(element, walking) {
    if (walking) {
      element.classList.add("walking");
      return;
    }
    element.classList.remove("walking");
  }

  function logAction(kind, detail) {
    state.logs.push({
      time: new Date().toISOString(),
      kind,
      detail
    });
  }

  function showScreen(name) {
    state.screen = name;
    setHidden(els.startScreen, name !== "start");
    setHidden(els.worldScreen, name !== "world");
    setHidden(els.modalScreen, name !== "modal");
    setHidden(els.searchScreen, name !== "search");
    setHidden(els.finalScreen, name !== "final");
  }

  function nextStation() {
    return arrayFind(stations, (station) => !state.completedStations.has(station.id));
  }

  function missionText() {
    const next = nextStation();
    if (next) return `Finde ${next.npc} und gewinne ${next.token}`;
    if (state.completedObjects.size < worldObjects.length) return "Untersuche Schild, Leuchtkiste und Hebel für Bonuswissen";
    if (state.search.foundWords.size < searchWords.length) return "Öffne das Wortsuchspiel am Zieltor";
    if (!state.rewardReady) return "Schließe den Abschlussdialog ab";
    return "Lade das Protokoll herunter";
  }

  function renderKeyRing() {
    if (!els.keyRing) return;
    const palette = [
      { id: "copper", label: "Kupferschlüssel" },
      { id: "moon", label: "Mondschlüssel" },
      { id: "root", label: "Wurzelschlüssel" },
      { id: "star", label: "Sternschlüssel" }
    ];
    els.keyRing.innerHTML = "";
    palette.forEach((keyDef) => {
      const chip = document.createElement("div");
      const active = arrayIncludes(state.tokens, keyDef.label);
      chip.className = `key-slot${active ? " active" : ""}`;
      chip.innerHTML = `
        <div class="key-chip key-${keyDef.id}${active ? " active" : ""}">
          <span class="key-bow"></span>
          <span class="key-stem"></span>
          <span class="key-teeth"></span>
        </div>
        <span class="key-name">${keyDef.label}</span>
      `;
      chip.title = keyDef.label;
      els.keyRing.appendChild(chip);
    });
  }

  function renderHud() {
    els.tokenCount.textContent = `${state.tokens.length} / 4 Schlüssel`;
    els.missionText.textContent = missionText();
    renderKeyRing();
  }

  function maxWalkX() {
    if (state.completedStations.size === 0) return 28;
    if (state.completedStations.size === 1) return 51;
    if (state.completedStations.size === 2) return 73;
    return 96;
  }

  function characterSpriteMarkup(sprite, variant) {
    return `
      <div class="sprite-character sprite-${sprite} sprite-${variant}">
        <div class="sprite-shadow"></div>
        <div class="sprite-body">
          <div class="sprite-head"></div>
          <div class="sprite-hair"></div>
          <div class="sprite-hat"></div>
          <div class="sprite-torso"></div>
          <div class="sprite-belt"></div>
          <div class="sprite-arm arm-left"></div>
          <div class="sprite-arm arm-right"></div>
          <div class="sprite-leg leg-left"></div>
          <div class="sprite-leg leg-right"></div>
          <div class="sprite-tool"></div>
          <div class="sprite-aura"></div>
        </div>
      </div>
    `;
  }

  function characterFigureMarkup(sprite, label, extraClass) {
    const path = portraitAssets[sprite] || portraitAssets.hero;
    return `
      <div class="character-figure${extraClass ? ` ${extraClass}` : ""}" aria-hidden="true">
        <img src="${path}" alt="${label}">
      </div>
    `;
  }

  function objectSpriteMarkup(sprite) {
    return `
      <div class="sprite-object sprite-${sprite}">
        <div class="object-shadow"></div>
        <div class="object-core"></div>
        <div class="object-accent accent-a"></div>
        <div class="object-accent accent-b"></div>
        <div class="object-glow"></div>
      </div>
    `;
  }

  function goalSpriteMarkup() {
    return `
      <div class="goal-chip">
        <div class="goal-arch"></div>
        <div class="goal-door"></div>
        <div class="goal-light"></div>
      </div>
    `;
  }

  function canUseWorldEngine() {
    return !!(els.phaserWorld && window.Phaser);
  }

  function worldPixelX(percent) {
    if (!worldEngine.scene) return 0;
    return (worldEngine.scene.scale.width * percent) / 100;
  }

  function worldPixelY(percent) {
    if (!worldEngine.scene) return 0;
    return (worldEngine.scene.scale.height * percent) / 100;
  }

  function addWorldLabel(scene, text, yOffset) {
    return scene.add.text(0, yOffset, text, {
      fontFamily: "Trebuchet MS, Arial, sans-serif",
      fontSize: "13px",
      color: "#3b2c16",
      backgroundColor: "#fff9ee",
      padding: { left: 10, right: 10, top: 4, bottom: 4 }
    }).setOrigin(0.5, 0);
  }

  function createCharacterNode(scene, sprite, label, kind, id, xPercent, yPercent) {
    const root = scene.add.container(worldPixelX(xPercent), worldPixelY(yPercent));
    const palette = {
      hero: { coat: 0x2f69b3, trim: 0xefd27d, hair: 0x4b2d18, accent: 0xc48d42 },
      sower: { coat: 0xaf5e35, trim: 0xd8ba63, hair: 0x5e3a1d, accent: 0x7caa54 },
      seed: { coat: 0x5d8f44, trim: 0xcfe689, hair: 0x4f3823, accent: 0x88b45e },
      mustard: { coat: 0xc5962e, trim: 0xf6de84, hair: 0x53361d, accent: 0x7ea35a },
      yeast: { coat: 0xb5634f, trim: 0xf0d7a3, hair: 0x6d4028, accent: 0xd8b17c }
    };
    const colors = palette[sprite] || palette.hero;
    const shadow = scene.add.ellipse(0, 0, 46, 12, 0x54391d, 0.18);
    const cape = scene.add.triangle(-10, -56, 0, 0, -22, 56, 18, 54, colors.coat, 0.82);
    const legs = scene.add.rectangle(0, -22, 18, 36, 0x6a4b2d, 1).setRadius(6);
    const boots = scene.add.rectangle(0, -4, 24, 10, 0x4c321a, 1).setRadius(4);
    const torso = scene.add.rectangle(0, -62, 34, 46, colors.coat, 1).setRadius(12);
    const belt = scene.add.rectangle(0, -45, 32, 6, 0x53361c, 0.9).setRadius(4);
    const armLeft = scene.add.rectangle(-21, -62, 10, 34, 0x6a4b2d, 1).setRotation(0.35).setRadius(5);
    const armRight = scene.add.rectangle(21, -62, 10, 34, 0x6a4b2d, 1).setRotation(-0.32).setRadius(5);
    const head = scene.add.circle(0, -97, 18, 0xf1c48d, 1);
    const hair = scene.add.ellipse(0, -106, 38, 20, colors.hair, 1);
    const face = scene.add.arc(0, -93, 9, 20, 160, false, 0x6e4726, 1);
    const accent = scene.add.circle(23, -58, 9, colors.accent, 1);
    const trim = scene.add.rectangle(0, -74, 18, 6, colors.trim, 1).setRadius(3);
    const labelText = addWorldLabel(scene, label, 10);
    const hitZone = scene.add.zone(0, -68, 110, 150).setOrigin(0.5).setInteractive({ useHandCursor: true });
    hitZone.on("pointerup", function (pointer, localX, localY, event) {
      if (event && event.stopPropagation) event.stopPropagation();
      navigateToInteraction(kind, id, xPercent, yPercent);
    });
    root.add([shadow, cape, legs, boots, torso, belt, armLeft, armRight, head, hair, face, accent, trim, labelText, hitZone]);
    root.setSize(110, 150);
    return root;
  }

  function createObjectNode(scene, sprite, label, kind, id, xPercent, yPercent) {
    const root = scene.add.container(worldPixelX(xPercent), worldPixelY(yPercent));
    const shadow = scene.add.ellipse(0, 0, 56, 14, 0x54391d, 0.16);
    let parts = [shadow];
    if (sprite === "sign") {
      parts = parts.concat([
        scene.add.rectangle(0, -44, 54, 26, 0xe4c56e, 1).setRotation(-0.08).setStrokeStyle(3, 0x8b6434, 1),
        scene.add.rectangle(0, -16, 10, 48, 0x7b5531, 1).setRadius(4),
        scene.add.rectangle(0, -44, 30, 4, 0xa56f3a, 0.72).setRotation(-0.08)
      ]);
    } else if (sprite === "chest") {
      parts = parts.concat([
        scene.add.rectangle(0, -34, 52, 34, 0x46a9d3, 1).setRadius(12).setStrokeStyle(3, 0x266c88, 1),
        scene.add.rectangle(0, -46, 54, 12, 0x78d7ff, 0.92).setRadius(8),
        scene.add.rectangle(0, -34, 12, 10, 0xfff2bc, 1).setRadius(4),
        scene.add.ellipse(0, -34, 90, 76, 0x74e8ff, 0.18)
      ]);
    } else if (sprite === "lever") {
      parts = parts.concat([
        scene.add.rectangle(0, -20, 46, 18, 0x6f4e2d, 1).setRadius(8),
        scene.add.rectangle(2, -50, 8, 46, 0xbcb2a4, 1).setRotation(0.28).setRadius(4),
        scene.add.circle(9, -69, 11, 0xd86f4b, 1),
        scene.add.ellipse(0, -40, 82, 62, 0xffb18d, 0.12)
      ]);
    }
    const labelText = addWorldLabel(scene, label, 8);
    const hitZone = scene.add.zone(0, -30, 120, 120).setOrigin(0.5).setInteractive({ useHandCursor: true });
    hitZone.on("pointerup", function (pointer, localX, localY, event) {
      if (event && event.stopPropagation) event.stopPropagation();
      navigateToInteraction(kind, id, xPercent, yPercent);
    });
    parts.push(labelText, hitZone);
    root.add(parts);
    root.setSize(120, 120);
    return root;
  }

  function createGoalNode(scene, xPercent, yPercent) {
    const root = scene.add.container(worldPixelX(xPercent), worldPixelY(yPercent));
    const glow = scene.add.ellipse(0, -70, 88, 88, 0xffec9e, 0.22);
    const arch = scene.add.rectangle(0, -44, 82, 110, 0xe0a94a, 1).setRadius(24).setStrokeStyle(3, 0x8e6227, 1);
    const door = scene.add.rectangle(0, -24, 38, 66, 0x59371b, 1).setRadius(12);
    const cap = scene.add.rectangle(0, -90, 52, 12, 0xf4d889, 1).setRadius(6);
    const labelText = addWorldLabel(scene, "Zieltor", 18);
    const hitZone = scene.add.zone(0, -36, 130, 150).setOrigin(0.5).setInteractive({ useHandCursor: true });
    hitZone.on("pointerup", function (pointer, localX, localY, event) {
      if (event && event.stopPropagation) event.stopPropagation();
      navigateToInteraction("goal", "goal", xPercent, yPercent);
    });
    root.add([glow, arch, door, cap, labelText, hitZone]);
    root.setSize(130, 150);
    return root;
  }

  function createGateNode(scene, xPercent) {
    const root = scene.add.container(worldPixelX(xPercent), worldPixelY(85));
    const poleLeft = scene.add.rectangle(-8, -48, 9, 96, 0x7c5831, 1).setRadius(4);
    const poleRight = scene.add.rectangle(8, -48, 9, 96, 0x7c5831, 1).setRadius(4);
    const bar = scene.add.rectangle(0, -72, 30, 7, 0x9c7342, 1).setRadius(4);
    root.add([poleLeft, poleRight, bar]);
    return root;
  }

  function createPlayerNode(scene) {
    const root = scene.add.container(worldPixelX(state.player.x), worldPixelY(state.player.y));
    const shadow = scene.add.ellipse(0, 0, 48, 12, 0x54391d, 0.2);
    const cape = scene.add.triangle(-9, -55, 0, 0, -22, 56, 20, 54, 0x2f69b3, 0.84);
    const legs = scene.add.rectangle(0, -22, 18, 36, 0x705034, 1).setRadius(6);
    const boots = scene.add.rectangle(0, -3, 26, 10, 0x4a311b, 1).setRadius(4);
    const torso = scene.add.rectangle(0, -61, 34, 48, 0x3878c7, 1).setRadius(12);
    const belt = scene.add.rectangle(0, -44, 34, 6, 0x56381c, 0.95).setRadius(4);
    const satchel = scene.add.rectangle(18, -34, 16, 20, 0x8e6032, 1).setRadius(4);
    const armLeft = scene.add.rectangle(-21, -62, 10, 34, 0x705034, 1).setRotation(0.36).setRadius(5);
    const armRight = scene.add.rectangle(21, -62, 10, 34, 0x705034, 1).setRotation(-0.3).setRadius(5);
    const head = scene.add.circle(0, -97, 18, 0xf1c48d, 1);
    const hair = scene.add.ellipse(0, -106, 38, 22, 0x4b2d18, 1);
    const key = scene.add.circle(24, -68, 7, 0xe6be58, 1);
    root.add([shadow, cape, legs, boots, torso, belt, satchel, armLeft, armRight, head, hair, key]);
    root.setData("walkCycle", 0);
    return root;
  }

  function clearWorldEngineNodes() {
    if (!worldEngine.scene) return;
    Object.keys(worldEngine.stationNodes).forEach(function (key) {
      worldEngine.stationNodes[key].destroy(true);
    });
    Object.keys(worldEngine.objectNodes).forEach(function (key) {
      worldEngine.objectNodes[key].destroy(true);
    });
    worldEngine.gates.forEach(function (node) {
      node.destroy(true);
    });
    worldEngine.gates = [];
    worldEngine.stationNodes = {};
    worldEngine.objectNodes = {};
    if (worldEngine.goalNode) {
      worldEngine.goalNode.destroy(true);
      worldEngine.goalNode = null;
    }
    if (worldEngine.player) {
      worldEngine.player.destroy(true);
      worldEngine.player = null;
    }
  }

  function renderWorldEngine() {
    if (!worldEngine.ready || !worldEngine.scene) return;
    clearWorldEngineNodes();
    worldEngine.player = createPlayerNode(worldEngine.scene);
    stations.forEach(function (station) {
      const node = createCharacterNode(worldEngine.scene, station.sprite, station.npc, "station", station.id, station.x, station.y);
      if (state.completedStations.has(station.id)) {
        node.setAlpha(0.8);
      }
      worldEngine.stationNodes[station.id] = node;
    });
    worldObjects.forEach(function (object) {
      const node = createObjectNode(worldEngine.scene, object.sprite, object.title, "object", object.id, object.x, object.y);
      if (state.completedObjects.has(object.id)) {
        node.setAlpha(0.78);
      }
      worldEngine.objectNodes[object.id] = node;
    });
    [
      { needed: 1, x: 29 },
      { needed: 2, x: 52 },
      { needed: 3, x: 74 }
    ].forEach(function (gate) {
      if (state.completedStations.size >= gate.needed) return;
      worldEngine.gates.push(createGateNode(worldEngine.scene, gate.x));
    });
    worldEngine.goalNode = createGoalNode(worldEngine.scene, 96, 82);
  }

  function updateWorldEnginePlayer() {
    if (!worldEngine.player || !worldEngine.scene) return;
    worldEngine.player.x = worldPixelX(state.player.x);
    worldEngine.player.y = worldPixelY(state.player.y);
    const walking = state.controls.up || state.controls.down || state.controls.left || state.controls.right || !!state.target;
    const cycle = (worldEngine.player.getData("walkCycle") || 0) + (walking ? 0.22 : 0);
    worldEngine.player.setData("walkCycle", cycle);
    const bodyY = walking ? Math.sin(cycle) * 3 : 0;
    worldEngine.player.list.forEach(function (child, index) {
      if (index === 0) return;
      if (child.type === "Rectangle" || child.type === "Triangle" || child.type === "Ellipse" || child.type === "Arc") {
        child.y += 0;
      }
    });
    worldEngine.player.y += bodyY;
  }

  function moveTargetFromWorldPoint(clientX, clientY) {
    if (!els.worldStage) return;
    const rect = els.worldStage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPercent = ((clientX - rect.left) / rect.width) * 100;
    const yPercent = ((clientY - rect.top) / rect.height) * 100;
    state.pendingInteraction = null;
    state.target = {
      x: Math.max(5, Math.min(maxWalkX(), xPercent)),
      y: Math.max(80, Math.min(88, yPercent))
    };
  }

  function setupWorldEngine() {
    if (!canUseWorldEngine() || worldEngine.game) return;
    const PhaserLib = window.Phaser;
    if (!PhaserLib || !els.phaserWorld || !els.worldStage) return;
    els.worldStage.classList.add("engine-active");
    worldEngine.game = new PhaserLib.Game({
      type: PhaserLib.CANVAS,
      parent: els.phaserWorld,
      transparent: true,
      width: els.worldStage.clientWidth || 1000,
      height: els.worldStage.clientHeight || 640,
      scale: {
        mode: PhaserLib.Scale.RESIZE,
        parent: els.phaserWorld,
        width: "100%",
        height: "100%"
      },
      scene: {
        create: function () {
          worldEngine.scene = this;
          worldEngine.ready = true;
          this.input.on("pointerup", function (pointer) {
            moveTargetFromWorldPoint(pointer.event.clientX, pointer.event.clientY);
          });
          this.scale.on("resize", function () {
            renderWorldEngine();
          });
          renderWorldEngine();
        }
      }
    });
  }

  function applyEntityState(element, completed) {
    if (!element) return;
    if (completed) {
      element.classList.add("is-cleared");
      return;
    }
    element.classList.remove("is-cleared");
  }

  function makeAvatar() {
    const wrapper = document.createElement("div");
    wrapper.id = "avatar";
    wrapper.className = "world-entity avatar";
    wrapper.innerHTML = characterFigureMarkup("hero", "Mika", "hero-figure");
    return wrapper;
  }

  function buildEntityHitbox(kind, id, x, y, label) {
    const hitbox = document.createElement("button");
    hitbox.type = "button";
    hitbox.className = "entity-hitbox";
    hitbox.setAttribute("aria-label", label);
    const activate = (event) => {
      if (event && event.preventDefault) event.preventDefault();
      if (event && event.stopPropagation) event.stopPropagation();
      navigateToInteraction(kind, id, x, y);
    };
    hitbox.addEventListener("click", activate);
    hitbox.addEventListener("touchend", activate, { passive: false });
    hitbox.addEventListener("pointerup", activate);
    return hitbox;
  }

  function makeCharacterMarker(station) {
    const marker = document.createElement("div");
    marker.className = `world-entity npc-marker npc-${station.sprite}`;
    marker.style.left = `${station.x}%`;
    marker.style.top = `${station.y}%`;
    marker.innerHTML = `
      ${characterFigureMarkup(station.sprite, station.npc, "npc-figure")}
      <div class="entity-label">${station.npc}</div>
    `;
    marker.appendChild(buildEntityHitbox("station", station.id, station.x, station.y, station.npc));
    applyEntityState(marker, state.completedStations.has(station.id));
    return marker;
  }

  function makeObjectMarker(object) {
    const marker = document.createElement("div");
    marker.className = `world-entity world-object object-${object.sprite}`;
    marker.style.left = `${object.x}%`;
    marker.style.top = `${object.y}%`;
    marker.innerHTML = `
      ${objectSpriteMarkup(object.sprite)}
      <div class="entity-label">${object.title}</div>
    `;
    marker.appendChild(buildEntityHitbox("object", object.id, object.x, object.y, object.title));
    applyEntityState(marker, state.completedObjects.has(object.id));
    return marker;
  }

  function makeGoalMarker() {
    const marker = document.createElement("div");
    marker.className = "world-entity world-goal";
    marker.style.left = "96%";
    marker.style.top = "82%";
    marker.innerHTML = `
      ${goalSpriteMarkup()}
      <div class="entity-label">Zieltor</div>
    `;
    marker.appendChild(buildEntityHitbox("goal", "goal", 96, 82, "Zieltor"));
    return marker;
  }

  function placeGates() {
    const thresholds = [
      { needed: 1, x: 29 },
      { needed: 2, x: 52 },
      { needed: 3, x: 74 }
    ];

    thresholds.forEach((gate) => {
      if (state.completedStations.size >= gate.needed) return;
      const node = document.createElement("div");
      node.className = "world-entity gate";
      node.style.left = `${gate.x}%`;
      node.style.top = "85%";
      els.worldLayer.appendChild(node);
    });
  }

  function renderWorld() {
    if (canUseWorldEngine()) {
      setupWorldEngine();
      if (els.worldLayer) els.worldLayer.innerHTML = "";
      renderWorldEngine();
      return;
    }
    els.worldLayer.innerHTML = "";
    const avatar = makeAvatar();
    avatar.style.left = `${state.player.x}%`;
    avatar.style.top = `${state.player.y}%`;
    els.worldLayer.appendChild(avatar);

    stations.forEach((station) => {
      els.worldLayer.appendChild(makeCharacterMarker(station));
    });

    worldObjects.forEach((object) => {
      els.worldLayer.appendChild(makeObjectMarker(object));
    });

    placeGates();
    els.worldLayer.appendChild(makeGoalMarker());
  }

  function updateAvatarPosition() {
    if (canUseWorldEngine()) {
      updateWorldEnginePlayer();
      return;
    }
    const avatar = document.querySelector("#avatar");
    if (!avatar) return;
    avatar.style.left = `${state.player.x}%`;
    avatar.style.top = `${state.player.y}%`;
    setWalking(
      avatar,
      state.controls.up || state.controls.down || state.controls.left || state.controls.right
    );
  }

  function worldInteractions() {
    const items = [];
    stations.forEach((station) => {
      items.push({ kind: "station", id: station.id, x: station.x, y: station.y, label: station.npc });
    });
    worldObjects.forEach((object) => {
      items.push({ kind: "object", id: object.id, x: object.x, y: object.y, label: object.title });
    });
    items.push({ kind: "goal", id: "goal", x: 96, y: 82, label: "Zieltor" });
    return items;
  }

  function nearestInteraction() {
    let nearest = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    worldInteractions().forEach((item) => {
      const dx = item.x - state.player.x;
      const dy = item.y - state.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = {
          kind: item.kind,
          id: item.id,
          x: item.x,
          y: item.y,
          label: item.label,
          distance
        };
      }
    });
    return nearest;
  }

  function interactionKey(kind, id) {
    return `${kind}:${id}`;
  }

  function interactionDistance(item) {
    if (!item) return Number.POSITIVE_INFINITY;
    const dx = item.x - state.player.x;
    const dy = item.y - state.player.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function canInteractWith(kind, id) {
    if (kind === "station") {
      const index = arrayFindIndex(stations, (station) => station.id === id);
      return index <= state.completedStations.size;
    }
    if (kind === "object") {
      const object = arrayFind(worldObjects, (entry) => entry.id === id);
      return !!object && state.completedStations.size >= object.requiredStations;
    }
    return state.completedStations.size >= 4 && state.completedObjects.size >= 3;
  }

  function releaseContactLockIfNeeded() {
    if (!state.contactLock) return;
    const splitIndex = state.contactLock.indexOf(":");
    const kind = state.contactLock.slice(0, splitIndex);
    const id = state.contactLock.slice(splitIndex + 1);
    const item = arrayFind(worldInteractions(), (entry) => entry.kind === kind && entry.id === id);
    if (!item || interactionDistance(item) > 5.4) {
      state.contactLock = null;
    }
  }

  function processWorldContact() {
    if (state.screen !== "world") return;
    releaseContactLockIfNeeded();
    if (state.contactLock) return;
    const near = nearestInteraction();
    if (!near || near.distance > 3.4) return;
    if (!canInteractWith(near.kind, near.id)) return;
    state.contactLock = interactionKey(near.kind, near.id);
    state.target = null;
    state.pendingInteraction = null;
    interactWith(near.kind, near.id);
  }

  function setPrompt(text) {
    if (!text) {
      els.worldPrompt.classList.add("hidden");
      els.worldPrompt.disabled = true;
      state.promptAction = null;
      return;
    }
    els.worldPrompt.textContent = text;
    els.worldPrompt.classList.remove("hidden");
  }

  function updatePrompt() {
    const near = nearestInteraction();
    if (!near || near.distance > 10) {
      setPrompt("");
      return;
    }
    const touching = near.distance <= 3.4;

    if (near.kind === "station") {
      const index = arrayFindIndex(stations, (station) => station.id === near.id);
      if (index > state.completedStations.size) {
        state.promptAction = null;
        els.worldPrompt.disabled = true;
        setPrompt("Dieser Weg ist noch verschlossen.");
      } else {
        state.promptAction = { kind: "station", id: near.id };
        els.worldPrompt.disabled = !touching;
        setPrompt(touching ? `${near.label}: Berührung startet das Gespräch.` : `Gehe näher zu ${near.label}.`);
      }
      return;
    }

    if (near.kind === "object") {
      const object = arrayFind(worldObjects, (entry) => entry.id === near.id);
      if (state.completedStations.size < object.requiredStations) {
        state.promptAction = null;
        els.worldPrompt.disabled = true;
        setPrompt(`${object.title}: später sinnvoll`);
      } else {
        state.promptAction = { kind: "object", id: near.id };
        els.worldPrompt.disabled = !touching;
        setPrompt(touching ? `${near.label}: Berührung startet das Rätsel.` : `Gehe näher zu ${near.label}.`);
      }
      return;
    }

    if (near.kind === "goal") {
      if (state.completedStations.size < 4 || state.completedObjects.size < 3) {
        state.promptAction = null;
        els.worldPrompt.disabled = true;
        setPrompt("Das Zieltor wartet noch auf alle Wegmarken und Hinweissteine.");
      } else if (state.search.foundWords.size < searchWords.length) {
        state.promptAction = { kind: "goal", id: "goal" };
        els.worldPrompt.disabled = !touching;
        setPrompt(touching ? "Berührung öffnet das Wortsuchspiel." : "Gehe näher zum Zieltor.");
      } else {
        state.promptAction = { kind: "goal", id: "goal" };
        els.worldPrompt.disabled = !touching;
        setPrompt(touching ? "Berührung öffnet den Abschlussdialog." : "Gehe näher zum Zieltor.");
      }
    }
  }

  function openModal(definition) {
    state.modal = definition;
    state.scripturePageIndex = 0;
    state.taskState = {};
    state.pendingInteraction = null;
    state.promptAction = null;
    renderModal();
    showScreen("modal");
  }

  function getApproachTarget(x, y) {
    const offset = state.player.x <= x ? -2.6 : 2.6;
    return {
      x: Math.max(5, Math.min(maxWalkX(), x + offset)),
      y: Math.max(80, Math.min(88, y + 0.3))
    };
  }

  function navigateToInteraction(kind, id, x, y) {
    const approach = getApproachTarget(x, y);
    state.pendingInteraction = { kind, id };
    state.contactLock = null;
    state.target = approach;
    state.controls = { up: false, down: false, left: false, right: false };
  }

  function interactWith(kind, id) {
    if (kind === "station") {
      const station = arrayFind(stations, (entry) => entry.id === id);
      const index = arrayFindIndex(stations, (entry) => entry.id === id);
      if (index > state.completedStations.size) {
        setPrompt("Zuerst musst du den vorherigen Wegabschnitt abschliessen.");
        return;
      }
      logAction("station_open", station.id);
      openModal({ kind: "station", id: station.id, phase: "intro" });
      return;
    }

    if (kind === "object") {
      const object = arrayFind(worldObjects, (entry) => entry.id === id);
      if (state.completedStations.size < object.requiredStations) {
        setPrompt("Dieses Objekt wird erst spaeter sinnvoll.");
        return;
      }
      logAction("object_open", object.id);
      openModal({ kind: "object", id: object.id, phase: "intro" });
      return;
    }

    if (state.completedStations.size < 4 || state.completedObjects.size < 3) {
      setPrompt("Dir fehlen noch Wegmarken oder Hinweissteine.");
      return;
    }

    if (state.search.foundWords.size < searchWords.length) {
      logAction("goal_open_search", "wordsearch");
      showScreen("search");
      renderWordSearch();
    } else {
      logAction("goal_open_final", "cloze");
      showScreen("final");
      renderCloze();
    }
  }

  function currentStationDefinition() {
    return arrayFind(stations, (station) => station.id === state.modal.id);
  }

  function currentObjectDefinition() {
    return arrayFind(worldObjects, (object) => object.id === state.modal.id);
  }

  function renderModalPortrait(kind, sprite) {
    const portraitSprite = sprite || "hero";
    const portraitPath = portraitAssets[portraitSprite] || portraitAssets.hero;
    if (kind === "object") {
      els.modalPortrait.className = `portrait-sprite sprite-object sprite-${portraitSprite} object-portrait`;
      els.modalPortrait.innerHTML = `
        <div class="object-shadow"></div>
        <div class="object-core"></div>
        <div class="object-accent accent-a"></div>
        <div class="object-accent accent-b"></div>
        <div class="object-glow"></div>
      `;
      return;
    }
    els.modalPortrait.className = "portrait-sprite portrait-illustration";
    els.modalPortrait.innerHTML = `<img src="${portraitPath}" alt="">`;
  }

  function renderModal() {
    els.scripturePane.classList.add("hidden");
    els.taskPane.classList.add("hidden");
    els.taskFeedback.textContent = "";
    els.closeModal.classList.add("hidden");
    els.modalNext.disabled = false;

    if (state.modal.kind === "station") {
      const station = currentStationDefinition();
      els.modalLabel.textContent = station.label;
      els.modalTitle.textContent = station.title;
      renderModalPortrait("station", station.sprite);
      els.modalSpeaker.textContent = station.npc;

      if (state.modal.phase === "intro") {
        els.modalText.textContent = station.intro;
        els.modalNext.textContent = "Zum Bibeltext";
      } else if (state.modal.phase === "scripture") {
        els.modalText.textContent = "Lies den Bibeltext aufmerksam. Danach folgt eine passende Aufgabe.";
        els.scripturePane.classList.remove("hidden");
        els.scriptureReference.textContent = station.scriptureRef;
        if (els.scriptureSourceLink) {
          els.scriptureSourceLink.textContent = station.scriptureSource.label;
          els.scriptureSourceLink.href = station.scriptureSource.url;
        }
        els.scripturePageLabel.textContent = `Seite ${state.scripturePageIndex + 1} / ${station.scripturePages.length}`;
        els.scriptureText.innerHTML = station.scripturePages[state.scripturePageIndex]
          .map((verse) => {
            const splitAt = verse.indexOf(" ");
            return `<p><sup>${verse.slice(0, splitAt)}</sup>${verse.slice(splitAt + 1)}</p>`;
          })
          .join("");
        els.modalNext.textContent = state.scripturePageIndex < station.scripturePages.length - 1 ? "Nächste Textseite" : "Zur Aufgabe";
      } else if (state.modal.phase === "task") {
        els.modalText.textContent = state.bonuses[station.id]
          ? `Jetzt wird das Gleichnis aktiv bearbeitet. ${state.bonuses[station.id]}`
          : "Jetzt wird das Gleichnis aktiv bearbeitet.";
        els.taskPane.classList.remove("hidden");
        els.taskTitle.textContent = station.taskTitle;
        renderTask(station);
        els.modalNext.textContent = "Aufgabe prüfen";
      } else {
        els.modalText.textContent = station.success;
        els.closeModal.classList.remove("hidden");
        els.modalNext.textContent = "Zurück zur Welt";
      }
      return;
    }

    const object = currentObjectDefinition();
    els.modalLabel.textContent = "Weltobjekt";
    els.modalTitle.textContent = object.title;
    renderModalPortrait("object", object.sprite);
    els.modalSpeaker.textContent = "Untersuchung";

    if (state.modal.phase === "intro") {
      els.modalText.textContent = object.intro;
      els.modalNext.textContent = "Zur Aufgabe";
    } else if (state.modal.phase === "task") {
      els.modalText.textContent = "Dieses Objekt ist nur dann nützlich, wenn du seine False Flag erkennst und den Bonus für die nächste Station sicherst.";
      els.taskPane.classList.remove("hidden");
      els.taskTitle.textContent = object.taskTitle;
      renderTask(object);
        els.modalNext.textContent = "Aufgabe prüfen";
    } else {
      els.modalText.textContent = `${object.success} Belohnung: ${object.reward}. ${object.bonusText || ""}`;
      els.closeModal.classList.remove("hidden");
        els.modalNext.textContent = "Zurück zur Welt";
    }
  }

  function renderTask(definition) {
    els.taskContent.innerHTML = "";

    if (definition.taskType === "sowerSort") {
      const cases = [
        { key: "case1", text: "Jemand hört die Botschaft, doch kaum ist der Unterricht vorbei, ist alles wieder weg." },
        { key: "case2", text: "Jemand ist begeistert, gibt aber beim ersten Gegenwind sofort auf." },
        { key: "case3", text: "Jemand will glauben, doch Sorgen und Besitz drängen alles andere weg." },
        { key: "case4", text: "Jemand hört, nimmt an und lebt danach verlässlich weiter." }
      ];
      const options = ["Weg", "Fels", "Dornen", "Guter Boden"];
      const optionOrder = getOptionOrder("sowerSort-select", options.length);
      cases.forEach((entry) => {
        const row = document.createElement("div");
        row.className = "task-row";
        const label = document.createElement("div");
        label.textContent = entry.text;
        const select = document.createElement("select");
        select.className = "task-select";
        select.innerHTML = `<option value="">Boden wählen</option>${optionOrder.map((optionIndex) => `<option>${options[optionIndex]}</option>`).join("")}`;
        select.value = state.taskState[entry.key] || "";
        select.addEventListener("change", () => {
          state.taskState[entry.key] = select.value;
        });
        row.append(label, select);
        els.taskContent.appendChild(row);
      });

      const extraTitle = document.createElement("div");
      extraTitle.textContent = "Welche Deutung fasst den guten Boden am besten?";
      els.taskContent.appendChild(extraTitle);
      const extraOptions = [
        "Er hört, nimmt an und bringt Frucht.",
        "Er hört kurz und vergisst alles wieder.",
        "Er bleibt absichtlich oberflächlich."
      ];
      const extraGrid = document.createElement("div");
      extraGrid.className = "option-grid";
      getOptionOrder("sowerFruit", extraOptions.length).forEach((optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `option-button${state.taskState.fruit === optionIndex ? " active" : ""}`;
        button.textContent = extraOptions[optionIndex];
        bindPress(button, () => {
          state.taskState.fruit = optionIndex;
          renderTask(definition);
        });
        extraGrid.appendChild(button);
      });
      els.taskContent.appendChild(extraGrid);
      return;
    }

    if (definition.taskType === "seedOrder") {
      const steps = [
        { key: "sow", text: "Der Mensch sät den Samen." },
        { key: "wait", text: "Er schläft und steht auf, während die Zeit vergeht." },
        { key: "grow", text: "Gras, Ähren und voller Weizen erscheinen." },
        { key: "harvest", text: "Am Ende kommt die Ernte." }
      ];
      const shuffledSteps = getOptionOrder("seedStepOrder", steps.length).map((stepIndex) => steps[stepIndex]);
      shuffledSteps.forEach((entry) => {
        const row = document.createElement("div");
        row.className = "task-row";
        const label = document.createElement("div");
        label.textContent = entry.text;
        const select = document.createElement("select");
        select.className = "task-select";
        select.innerHTML = `
          <option value="">Reihenfolge</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        `;
        select.value = state.taskState[entry.key] || "";
        select.addEventListener("change", () => {
          state.taskState[entry.key] = select.value;
        });
        row.append(label, select);
        els.taskContent.appendChild(row);
      });

      const reflectTitle = document.createElement("div");
      reflectTitle.textContent = "Was kann der Mensch in diesem Gleichnis nicht direkt machen?";
      els.taskContent.appendChild(reflectTitle);
      const reflectOptions = [
        "Das Wachstum selbst erzwingen.",
        "Den Samen aufs Land werfen.",
        "Zur Ernte die Sichel holen."
      ];
      const reflectGrid = document.createElement("div");
      reflectGrid.className = "option-grid";
      getOptionOrder("seedReflect", reflectOptions.length).forEach((optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `option-button${state.taskState.control === optionIndex ? " active" : ""}`;
        button.textContent = reflectOptions[optionIndex];
        bindPress(button, () => {
          state.taskState.control = optionIndex;
          renderTask(definition);
        });
        reflectGrid.appendChild(button);
      });
      els.taskContent.appendChild(reflectGrid);
      return;
    }

    if (definition.taskType === "mustardJudge") {
      const questions = [
        {
          key: "project",
          question: "Welches Projekt passt am ehesten zum Senfkorn?",
          options: [
            "Eine riesige Kampagne, die sofort beeindrucken will.",
            "Ein kleines Nachbarschaftsprojekt, das langsam Schutzraum fuer andere schafft.",
            "Ein Projekt, das nur fuer die eigene Gruppe sichtbar bleibt."
          ]
        },
        {
          key: "reason",
          question: "Warum passt dieses Projekt?",
          options: [
            "Weil nur sofortige Groesse zaehlt.",
            "Weil das Unsichtbare nie wichtig wird.",
            "Weil aus kleinem Anfang spaeter Weite fuer andere entstehen kann."
          ]
        },
        {
          key: "shelter",
          question: "Woran erkennt man im Gleichnis den Nutzen für andere?",
          options: [
            "An den Vögeln, die unter den Zweigen wohnen können.",
            "An der schnellen Werbung auf dem Markt.",
            "An der Größe des ersten Samens."
          ]
        }
      ];
      questions.forEach((question) => {
        const title = document.createElement("div");
        title.textContent = question.question;
        els.taskContent.appendChild(title);
        const grid = document.createElement("div");
        grid.className = "option-grid";
        const order = getOptionOrder(`mustard-${question.key}`, question.options.length);
        order.forEach((optionIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          const disabledByBonus = question.key === "project" && state.bonuses.mustard && optionIndex === 0;
          button.className = `option-button${state.taskState[question.key] === optionIndex ? " active" : ""}`;
          button.textContent = question.options[optionIndex];
          button.disabled = disabledByBonus;
          if (disabledByBonus) {
            button.textContent = "Dieses Großprojekt wurde durch deinen Bonus entlarvt.";
          }
          bindPress(button, () => {
            if (disabledByBonus) return;
            state.taskState[question.key] = optionIndex;
            renderTask(definition);
          });
          grid.appendChild(button);
        });
        els.taskContent.appendChild(grid);
      });
      return;
    }

    if (definition.taskType === "yeastSkill") {
      const info = document.createElement("div");
      info.textContent = "Stoppe den Marker dreimal im grünen Bereich. Danach folgen zwei Deutungsfragen.";
      const meterBox = document.createElement("div");
      meterBox.className = "meter-box";
      const zoneText = state.bonuses.yeast ? "Bonus aktiv: breiter Trefferbereich." : "Normale Schwierigkeit.";
      meterBox.innerHTML = `
        <div class="meter-track">
          <div id="meterMarker" class="meter-marker"></div>
        </div>
        <div class="meter-status">Treffer: ${state.taskState.hits || 0} / 3 · ${zoneText}</div>
      `;
      const stopButton = document.createElement("button");
      stopButton.type = "button";
      stopButton.className = "primary-button";
      stopButton.textContent = "Teig kneten";
      bindPress(stopButton, handleSkillStop);
      els.taskContent.append(info, meterBox, stopButton);

      if ((state.taskState.hits || 0) >= 3) {
        const title = document.createElement("div");
        title.textContent = "Welche Deutung passt jetzt am besten?";
        els.taskContent.appendChild(title);
        const grid = document.createElement("div");
        grid.className = "option-grid";
        const firstOptions = [
          "Kleine Kraft kann das Ganze von innen her durchdringen.",
          "Nur laute Grossereignisse veraendern die Welt.",
          "Ein Teil des Teigs bleibt absichtlich unberuehrt."
        ];
        getOptionOrder("yeast-choice", firstOptions.length).forEach((optionIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `option-button${state.taskState.choice === optionIndex ? " active" : ""}`;
          button.textContent = firstOptions[optionIndex];
          bindPress(button, () => {
            state.taskState.choice = optionIndex;
            renderTask(definition);
          });
          grid.appendChild(button);
        });
        els.taskContent.appendChild(grid);

        const secondTitle = document.createElement("div");
        secondTitle.textContent = "Welche Aussage beschreibt die Wirkung des Sauerteigs zusätzlich richtig?";
        els.taskContent.appendChild(secondTitle);
        const secondGrid = document.createElement("div");
        secondGrid.className = "option-grid";
        const secondOptions = [
          "Er verändert nicht nur einen Teil, sondern den ganzen Teig.",
          "Er bleibt sichtbar oben liegen und mischt sich nicht ein.",
          "Er wirkt nur, wenn er sofort groß ist."
        ];
        getOptionOrder("yeast-reach", secondOptions.length).forEach((optionIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `option-button${state.taskState.reach === optionIndex ? " active" : ""}`;
          button.textContent = secondOptions[optionIndex];
          bindPress(button, () => {
            state.taskState.reach = optionIndex;
            renderTask(definition);
          });
          secondGrid.appendChild(button);
        });
        els.taskContent.appendChild(secondGrid);
      }
      return;
    }

    if (definition.statement) {
      const statement = document.createElement("div");
      statement.textContent = definition.statement;
      els.taskContent.appendChild(statement);
    }
    if (definition.question) {
      const question = document.createElement("div");
      question.textContent = definition.question;
      els.taskContent.appendChild(question);
    }
    const grid = document.createElement("div");
    grid.className = "option-grid";
    getOptionOrder(`${definition.id}-single`, definition.options.length).forEach((index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `option-button${state.taskState.choice === index ? " active" : ""}`;
      button.textContent = definition.options[index];
      bindPress(button, () => {
        state.taskState.choice = index;
        renderTask(definition);
      });
      grid.appendChild(button);
    });
    els.taskContent.appendChild(grid);
  }

  function handleSkillStop() {
    if (!state.taskState.skillInitialized) {
      state.taskState.skillInitialized = true;
      state.taskState.marker = 0;
      state.taskState.direction = 1;
      state.taskState.hits = state.taskState.hits || 0;
    }
    const position = state.taskState.marker || 0;
    const minHit = state.bonuses.yeast ? 30 : 38;
    const maxHit = state.bonuses.yeast ? 70 : 62;
    if (position >= minHit && position <= maxHit) {
      state.taskState.hits = (state.taskState.hits || 0) + 1;
      els.taskFeedback.textContent = "Treffer im grünen Bereich.";
    } else {
      els.taskFeedback.textContent = "Daneben. Versuche es noch einmal.";
    }
    renderTask(currentStationDefinition());
  }

  function validateStationTask(station) {
    if (station.taskType === "sowerSort") {
      return state.taskState.case1 === "Weg" &&
        state.taskState.case2 === "Fels" &&
        state.taskState.case3 === "Dornen" &&
        state.taskState.case4 === "Guter Boden" &&
        state.taskState.fruit === 0;
    }
    if (station.taskType === "seedOrder") {
      return state.taskState.sow === "1" &&
        state.taskState.wait === "2" &&
        state.taskState.grow === "3" &&
        state.taskState.harvest === "4" &&
        state.taskState.control === 0;
    }
    if (station.taskType === "mustardJudge") {
      return state.taskState.project === 1 && state.taskState.reason === 2 && state.taskState.shelter === 0;
    }
    return (state.taskState.hits || 0) >= 3 && state.taskState.choice === 0 && state.taskState.reach === 0;
  }

  function validateObjectTask(object) {
    return state.taskState.choice === object.answer;
  }

  function completeStation(station) {
    if (!state.completedStations.has(station.id)) {
      state.completedStations.add(station.id);
      state.tokens.push(station.token);
      logAction("station_complete", `${station.id}:${station.token}`);
    }
    state.modal.phase = "complete";
    renderHud();
    renderWorld();
    renderModal();
  }

  function completeObject(object) {
    if (!state.completedObjects.has(object.id)) {
      state.completedObjects.add(object.id);
      if (object.bonusFor) {
        state.bonuses[object.bonusFor] = object.bonusText;
      }
      logAction("object_complete", `${object.id}:${object.reward}`);
    }
    state.modal.phase = "complete";
    renderHud();
    renderModal();
  }

  function handleModalNext() {
    if (state.modal.kind === "station") {
      const station = currentStationDefinition();
      if (state.modal.phase === "intro") {
        state.modal.phase = "scripture";
        renderModal();
        return;
      }
      if (state.modal.phase === "scripture") {
        if (state.scripturePageIndex < station.scripturePages.length - 1) {
          state.scripturePageIndex += 1;
        } else {
          state.modal.phase = "task";
        }
        renderModal();
        return;
      }
      if (state.modal.phase === "task") {
        if (!validateStationTask(station)) {
          els.taskFeedback.textContent = "Noch nicht stimmig. Arbeite die Aufgabe noch einmal genauer durch.";
          logAction("station_attempt_failed", station.id);
          return;
        }
        completeStation(station);
        return;
      }
      showScreen("world");
      updatePrompt();
      return;
    }

    const object = currentObjectDefinition();
    if (state.modal.phase === "intro") {
      state.modal.phase = "task";
      renderModal();
      return;
    }
    if (state.modal.phase === "task") {
      if (!validateObjectTask(object)) {
        els.taskFeedback.textContent = "Das Objekt führt dich noch in die Irre. Prüfe die Aussage genauer.";
        logAction("object_attempt_failed", object.id);
        return;
      }
      completeObject(object);
      return;
    }
    showScreen("world");
    updatePrompt();
  }

  function renderWordSearch() {
    const grid = Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => ""));
    searchWords.forEach(({ word, start, end }) => {
      const [r1, c1] = start;
      const [r2, c2] = end;
      const stepR = Math.sign(r2 - r1);
      const stepC = Math.sign(c2 - c1);
      for (let i = 0; i < word.length; i += 1) {
        grid[r1 + stepR * i][c1 + stepC * i] = word[i];
      }
    });

    const filler = "ABCDEFGHIKLMNOPRSTUVWYZ";
    for (let r = 0; r < 12; r += 1) {
      for (let c = 0; c < 12; c += 1) {
        if (!grid[r][c]) {
          grid[r][c] = filler[(r * 7 + c * 3) % filler.length];
        }
      }
    }

    els.wordGrid.innerHTML = "";
    grid.forEach((row, r) => {
      row.forEach((letter, c) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "grid-cell";
        button.textContent = letter;
        if (state.search.selectedStart && state.search.selectedStart.row === r && state.search.selectedStart.col === c) {
          button.classList.add("selected");
        }
        if (Array.from(state.search.foundWords).some((word) => wordUsesCell(word, r, c))) {
          button.classList.add("found");
        }
        bindPress(button, () => selectGridCell(r, c));
        els.wordGrid.appendChild(button);
      });
    });

    els.wordList.innerHTML = "";
    searchWords.forEach(({ word }) => {
      const item = document.createElement("div");
      item.className = `word-list-item${state.search.foundWords.has(word) ? " found" : ""}`;
      item.textContent = word;
      els.wordList.appendChild(item);
    });

    els.searchProgress.textContent = `${state.search.foundWords.size} / 10`;
    els.toFinalDialog.disabled = state.search.foundWords.size !== searchWords.length;
  }

  function wordUsesCell(word, row, col) {
    const meta = arrayFind(searchWords, (entry) => entry.word === word);
    const [r1, c1] = meta.start;
    const [r2, c2] = meta.end;
    const stepR = Math.sign(r2 - r1);
    const stepC = Math.sign(c2 - c1);
    for (let i = 0; i < meta.word.length; i += 1) {
      if (r1 + stepR * i === row && c1 + stepC * i === col) return true;
    }
    return false;
  }

  function selectGridCell(row, col) {
    if (!state.search.selectedStart) {
      state.search.selectedStart = { row, col };
      renderWordSearch();
      return;
    }

    const start = state.search.selectedStart;
    state.search.selectedStart = null;
    const match = arrayFind(searchWords, (entry) => {
      if (state.search.foundWords.has(entry.word)) return false;
      const direct = entry.start[0] === start.row && entry.start[1] === start.col && entry.end[0] === row && entry.end[1] === col;
      const reverse = entry.end[0] === start.row && entry.end[1] === start.col && entry.start[0] === row && entry.start[1] === col;
      return direct || reverse;
    });

    if (!match) {
      els.searchFeedback.textContent = "Das war kein gesuchter Begriff in gerader Linie.";
      renderWordSearch();
      return;
    }

    state.search.foundWords.add(match.word);
    logAction("word_found", match.word);
    els.searchFeedback.textContent = `${match.word} gefunden.`;
    renderHud();
    renderWordSearch();
  }

  function renderCloze() {
    els.clozeList.innerHTML = "";
    clozePrompts.forEach((entry, index) => {
      const row = document.createElement("div");
      row.className = "cloze-row";
      const sentence = document.createElement("div");
      const value = state.clozeAnswers[index] || "_____";
      sentence.textContent = entry.text.replace("____", value);
      const options = document.createElement("div");
      options.className = "cloze-options";
      getClozeOrder(index, entry.options.length).forEach((optionIndex) => {
        const option = entry.options[optionIndex];
        const button = document.createElement("button");
        button.type = "button";
        button.className = `option-button${state.clozeAnswers[index] === option ? " active" : ""}`;
        button.textContent = option;
        bindPress(button, () => {
          state.clozeAnswers[index] = option;
          renderCloze();
        });
        options.appendChild(button);
      });
      row.append(sentence, options);
      els.clozeList.appendChild(row);
    });
  }

  function checkCloze() {
    const correct = clozePrompts.every((entry, index) => state.clozeAnswers[index] === entry.answer);
    if (!correct) {
      els.clozeFeedback.textContent = "Noch nicht ganz. Vervollständige die Deutungen genauer.";
      logAction("cloze_failed", JSON.stringify(state.clozeAnswers));
      return;
    }

    state.rewardReady = true;
    logAction("cloze_complete", "final interpretation correct");
    showReward();
  }

  function showReward() {
    els.finalDialogStage.classList.add("hidden");
    els.rewardStage.classList.remove("hidden");
    els.endingText.textContent =
      "Mika hat die vier Schlüssel gesammelt und das Tor geöffnet. Dabei wurde klar: Aufnahme entscheidet mit, Wachstum entzieht sich totaler Kontrolle, kleine Anfänge können weit werden und stille Kräfte verwandeln das Ganze von innen.";
    els.summaryList.innerHTML = "";
    [
      `Schlüssel: ${state.tokens.join(", ")}`,
      `Hinweissteine: ${state.completedObjects.size} / 3 gefunden`,
      `Boni aktiviert: ${Object.keys(state.bonuses).length}`,
      `Wortsuchbegriffe: ${state.search.foundWords.size} / 10 gefunden`,
      "Interpretationsdialog erfolgreich abgeschlossen"
    ].forEach((line) => {
      const item = document.createElement("div");
      item.textContent = line;
      els.summaryList.appendChild(item);
    });
    downloadReport();
  }

  function buildReportText() {
    const lines = [
      "Lernprotokoll Wachstumspfad",
      `Zeitpunkt Export: ${new Date().toISOString()}`,
      "",
      `Schlüssel: ${state.tokens.join(", ")}`,
      `Hinweissteine gefunden: ${Array.from(state.completedObjects).join(", ")}`,
      `Boni: ${Object.keys(state.bonuses).map((key) => `${key}:${state.bonuses[key]}`).join(" | ")}`,
      `Wortsuchbegriffe gefunden: ${Array.from(state.search.foundWords).join(", ")}`,
      `Cloze-Antworten: ${state.clozeAnswers.join(" | ")}`,
      "",
      "Aktionen:"
    ];

    state.logs.forEach((entry) => {
      lines.push(`${entry.time} | ${entry.kind} | ${entry.detail}`);
    });

    return lines.join("\n");
  }

  function downloadReport() {
    const blob = new Blob([buildReportText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "wachstumspfad-protokoll.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    logAction("report_downloaded", "wachstumspfad-protokoll.txt");
  }

  function setControl(direction, pressed) {
    state.controls[direction] = pressed;
    if (pressed) {
      state.target = null;
    }
  }

  function setMoveTargetFromEvent(event) {
    if (!els.worldStage || !event || !els.worldStage.getBoundingClientRect) return;
    const rect = els.worldStage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clientX = typeof event.clientX === "number"
      ? event.clientX
      : event.changedTouches && event.changedTouches[0]
        ? event.changedTouches[0].clientX
        : null;
    const clientY = typeof event.clientY === "number"
      ? event.clientY
      : event.changedTouches && event.changedTouches[0]
        ? event.changedTouches[0].clientY
        : null;
    if (clientX === null || clientY === null) return;

    const xPercent = ((clientX - rect.left) / rect.width) * 100;
    const yPercent = ((clientY - rect.top) / rect.height) * 100;
    state.target = {
      x: Math.max(5, Math.min(maxWalkX(), xPercent)),
      y: Math.max(80, Math.min(88, yPercent))
    };
  }

  function stepTowardTarget() {
    if (!state.target) return;
    const dx = state.target.x - state.player.x;
    const dy = state.target.y - state.player.y;
    if (Math.abs(dx) < 0.45 && Math.abs(dy) < 0.2) {
      state.player.x = state.target.x;
      state.player.y = state.target.y;
      state.target = null;
      state.pendingInteraction = null;
      return;
    }
    if (Math.abs(dx) >= 0.45) {
      state.player.x += dx > 0 ? 0.32 : -0.32;
    }
    if (Math.abs(dy) >= 0.2) {
      state.player.y += dy > 0 ? 0.12 : -0.12;
    }
    state.player.x = Math.max(5, Math.min(maxWalkX(), state.player.x));
    state.player.y = Math.max(80, Math.min(88, state.player.y));
  }

  function handleKey(event, pressed) {
    const key = event.key.toLowerCase();
    if (arrayIncludes(["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e", " "], key)) {
      event.preventDefault();
    }
    if (key === "arrowup" || key === "w") setControl("up", pressed);
    if (key === "arrowdown" || key === "s") setControl("down", pressed);
    if (key === "arrowleft" || key === "a") setControl("left", pressed);
    if (key === "arrowright" || key === "d") setControl("right", pressed);
    if (pressed && (key === "e" || key === " ")) {
      if (state.screen === "world") {
        const near = nearestInteraction();
        if (near && near.distance <= 3.4 && canInteractWith(near.kind, near.id)) {
          interactWith(near.kind, near.id);
        }
      }
    }
  }

  function movePlayer() {
    const currentStation = state.modal && state.modal.kind === "station"
      ? currentStationDefinition()
      : null;
    const yeastTaskActive = !!(
      state.modal &&
      state.modal.kind === "station" &&
      currentStation &&
      currentStation.taskType === "yeastSkill" &&
      state.modal.phase === "task"
    );

    if (yeastTaskActive) {
      state.taskState.skillInitialized = true;
    }

    if (state.taskState.skillInitialized && yeastTaskActive) {
      if (typeof state.taskState.marker !== "number") state.taskState.marker = 0;
      if (typeof state.taskState.direction !== "number") state.taskState.direction = 1;
      state.taskState.marker += state.taskState.direction * 1.5;
      if (state.taskState.marker >= 100) {
        state.taskState.marker = 100;
        state.taskState.direction = -1;
      }
      if (state.taskState.marker <= 0) {
        state.taskState.marker = 0;
        state.taskState.direction = 1;
      }
      const marker = document.querySelector("#meterMarker");
      if (marker) marker.style.left = `${state.taskState.marker}%`;
    }

    if (state.screen !== "world") {
      updateAvatarPosition();
      window.requestAnimationFrame(movePlayer);
      return;
    }

    if (state.controls.left) state.player.x = Math.max(5, state.player.x - 0.32);
    if (state.controls.right) state.player.x = Math.min(maxWalkX(), state.player.x + 0.32);
    if (state.controls.up) state.player.y = Math.max(80, state.player.y - 0.12);
    if (state.controls.down) state.player.y = Math.min(88, state.player.y + 0.12);
    if (!state.controls.left && !state.controls.right && !state.controls.up && !state.controls.down) {
      stepTowardTarget();
    }

    updateAvatarPosition();
    processWorldContact();
    if (state.screen === "world") {
      updatePrompt();
    } else {
      setPrompt("");
    }
    window.requestAnimationFrame(movePlayer);
  }

  function bindTouch(button, direction) {
    const start = (event) => {
      if (event && event.preventDefault) event.preventDefault();
      setControl(direction, true);
    };
    const stop = (event) => {
      if (event && event.preventDefault) event.preventDefault();
      setControl(direction, false);
    };
    ["pointerdown", "touchstart", "mousedown"].forEach((type) => button.addEventListener(type, start, { passive: false }));
    ["pointerup", "pointercancel", "touchend", "mouseup", "mouseleave"].forEach((type) => button.addEventListener(type, stop, { passive: false }));
  }

  function resetState() {
    state.player = { x: 7, y: 86 };
    state.target = null;
    state.pendingInteraction = null;
    state.controls = { up: false, down: false, left: false, right: false };
    state.completedStations = new Set();
    state.completedObjects = new Set();
    state.bonuses = {};
    state.tokens = [];
    state.logs = [];
    state.modal = null;
    state.scripturePageIndex = 0;
    state.taskState = {};
    state.search = { selectedStart: null, foundWords: new Set() };
    state.clozeAnswers = createFilledArray(clozePrompts.length, null);
    state.clozeOrders = {};
    state.rewardReady = false;
    state.promptAction = null;
    state.contactLock = null;
  }

  function startGame() {
    resetState();
    els.finalDialogStage.classList.remove("hidden");
    els.rewardStage.classList.add("hidden");
    els.clozeFeedback.textContent = "";
    els.searchFeedback.textContent = "";
    logAction("game_start", "Mika sucht vier Schlüssel, um das Tor des wachsenden Reiches zu öffnen.");
    renderHud();
    renderWorld();
    updatePrompt();
    showScreen("world");
  }

  window.__startGame = startGame;

  function bindEvents() {
    if (els.startGame) {
      els.startGame.addEventListener("click", startGame);
      els.startGame.addEventListener("touchend", (event) => {
        event.preventDefault();
        startGame();
      }, { passive: false });
    }
    if (els.closeModal) {
      els.closeModal.addEventListener("click", () => {
        showScreen("world");
        updatePrompt();
      });
    }
    if (els.modalNext) {
      els.modalNext.addEventListener("click", handleModalNext);
    }
    if (els.actionButton) {
      els.actionButton.addEventListener("click", () => {
        if (state.screen !== "world") return;
        const near = nearestInteraction();
        if (near && near.distance <= 3.4 && canInteractWith(near.kind, near.id)) {
          interactWith(near.kind, near.id);
        }
      });
    }
    if (els.worldPrompt) {
      const activatePrompt = (event) => {
        if (event && event.preventDefault) event.preventDefault();
        if (!state.promptAction || state.screen !== "world") return;
        interactWith(state.promptAction.kind, state.promptAction.id);
      };
      els.worldPrompt.addEventListener("click", activatePrompt);
      els.worldPrompt.addEventListener("touchend", activatePrompt, { passive: false });
    }
    if (els.worldStage && !canUseWorldEngine()) {
      els.worldStage.addEventListener("click", (event) => {
        if (event.target && event.target.closest && event.target.closest(".entity-hitbox")) return;
        state.pendingInteraction = null;
        setMoveTargetFromEvent(event);
      });
      els.worldStage.addEventListener("touchend", (event) => {
        if (event.target && event.target.closest && event.target.closest(".entity-hitbox")) return;
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        state.pendingInteraction = null;
        setMoveTargetFromEvent(event);
      }, { passive: false });
      els.worldStage.addEventListener("pointerup", (event) => {
        if (event.target && event.target.closest && event.target.closest(".entity-hitbox")) return;
        state.pendingInteraction = null;
        setMoveTargetFromEvent(event);
      });
    }
    if (els.toFinalDialog) {
      els.toFinalDialog.addEventListener("click", () => {
        logAction("wordsearch_complete", "all 10 terms found");
        showScreen("final");
        renderCloze();
      });
    }
    if (els.checkCloze) {
      els.checkCloze.addEventListener("click", checkCloze);
    }
    if (els.downloadReport) {
      els.downloadReport.addEventListener("click", downloadReport);
    }
    if (els.restartGame) {
      els.restartGame.addEventListener("click", startGame);
    }
    els.moveButtons.forEach((button) => bindTouch(button, button.dataset.move));
    window.addEventListener("keydown", (event) => handleKey(event, true));
    window.addEventListener("keyup", (event) => handleKey(event, false));
  }

  function init() {
    state.clozeAnswers = createFilledArray(clozePrompts.length, null);
    bindEvents();
    if (document.body && document.body.getAttribute("data-autostart") === "world") {
      startGame();
    } else {
      renderHud();
      renderWorld();
    }
    window.requestAnimationFrame(movePlayer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
