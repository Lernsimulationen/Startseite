const fields = [
  {
    id: "income",
    title: "Einkommen & Steuern",
    short: "Steuern",
    image: "assets/topic-income.png",
    impulse: "Wie verteilt eure Gesellschaft Chancen, Einkommen und Verantwortung?",
    concepts: [
      "Leistungsprinzip mit niedrigen Steuern",
      "Progressive Steuern und soziale Ausgleichsleistungen",
      "Grundeinkommen oder starke Grundsicherung",
      "Vermögenssteuer, Mindestlohn oder negative Einkommensteuer"
    ],
    guide: "Formuliert eine eigene Regel. Begründet, welche Risiken sie abfedert und welche Freiheits- oder Leistungsanreize sie erhält."
  },
  {
    id: "health",
    title: "Gesundheit & Pflege",
    short: "Gesundheit",
    image: "assets/topic-health.png",
    impulse: "Was passiert, wenn jemand krank wird, Pflege braucht oder dauerhaft Unterstützung benötigt?",
    concepts: [
      "Private Versicherung mit Eigenverantwortung",
      "Solidarische Bürgerversicherung",
      "Grundversorgung für alle plus private Zusatzleistungen",
      "Starke Pflege- und Assistenzrechte"
    ],
    guide: "Begründet, ob Gesundheit für euch eher Privatsache, Bürgerrecht oder Mischform ist."
  },
  {
    id: "education",
    title: "Bildung",
    short: "Bildung",
    image: "assets/topic-education.png",
    impulse: "Wie verhindert ihr, dass Herkunft über Zukunft entscheidet?",
    concepts: [
      "Freie Schulwahl und Wettbewerb",
      "Kostenfreie öffentliche Bildung",
      "Gezielte Förderung benachteiligter Kinder",
      "Inklusion, Lernmittel, Ganztag und Ausbildungsförderung"
    ],
    guide: "Legt fest, welche Bildungsrechte gelten und warum euer Modell gerecht ist."
  },
  {
    id: "housing",
    title: "Wohnen",
    short: "Wohnen",
    image: "assets/topic-housing.png",
    impulse: "Wie organisiert ihr bezahlbaren Wohnraum, ohne dass Wohnungsbau unmöglich wird?",
    concepts: [
      "Freier Wohnungsmarkt",
      "Wohngeld und begrenzte Mietregeln",
      "Sozialer Wohnungsbau",
      "Mietpreisdeckel, Genossenschaften oder Bodenpolitik"
    ],
    guide: "Begründet, wie euer Konzept Menschen mit wenig Einkommen schützt und zugleich Wohnraum schafft."
  },
  {
    id: "pension",
    title: "Rente & Alterssicherung",
    short: "Rente",
    image: "assets/topic-pension.png",
    impulse: "Wie soll ein würdiges Leben im Alter gesichert werden?",
    concepts: [
      "Private Eigenvorsorge",
      "Beitragsrente mit Grundsicherung",
      "Einheitliche Basisrente für alle",
      "Mehr-Säulen-Modell aus Staat, Betrieb und Privatvorsorge"
    ],
    guide: "Erklärt, wie euer Modell mit unterbrochenen Erwerbsbiografien, Krankheit und niedrigen Löhnen umgeht."
  }
];

const numberedProfiles = [
  {
    number: 1,
    text: "22 Jahre, Spitzenverdiener in der IT-Branche, single, kerngesund, reiche Eltern.",
    task: "Begründe selbstständig, in welchen Bereichen du durch eure Regeln bevorzugt wirst und wo du trotzdem Pflichten oder Nachteile trägst."
  },
  {
    number: 2,
    text: "45 Jahre, alleinerziehend, 3 Kinder, kein Berufsabschluss, zwei Minijobs, chronisch krank.",
    task: "Begründe selbstständig, welche eurer Regeln dich vor Armut, Krankheit und Überlastung schützen und wo du benachteiligt bleibst."
  },
  {
    number: 3,
    text: "72 Jahre, ehemaliger selbstständiger Handwerker, kaum private Vorsorge, Mindestrente.",
    task: "Begründe selbstständig, wie eure Regeln deine Lebenslage verbessern oder verschärfen."
  },
  {
    number: 4,
    text: "14 Jahre, schwere körperliche Behinderung, benötigt Barrierefreiheit und Assistenz, Eltern im Niedriglohnsektor.",
    task: "Begründe selbstständig, ob eure Gesellschaft echte Teilhabe ermöglicht und welche Regeln dich bevorzugen oder benachteiligen."
  },
  {
    number: 5,
    text: "38 Jahre, Durchschnittsverdiener im Öffentlichen Dienst, verheiratet, keine Kinder.",
    task: "Begründe selbstständig, wie fair eure Regeln aus deiner mittleren sozialen Lage wirken und welche Lasten du für andere mitträgst."
  },
  {
    number: 6,
    text: "29 Jahre, befristet beschäftigt, Berufseinsteigerin nach Ausbildung, kleine Mietwohnung, keine Ersparnisse.",
    task: "Begründe selbstständig, ob eure Regeln dir Sicherheit beim Start ins Berufsleben geben oder dich vor allem auf Eigenverantwortung verweisen."
  },
  {
    number: 7,
    text: "53 Jahre, Unternehmer mit 18 Beschäftigten, hohes Einkommen, privat versichert, pflegebedürftiger Vater.",
    task: "Begründe selbstständig, wo du durch eure Regeln belastet wirst und wo du selbst auf Schutz oder öffentliche Infrastruktur angewiesen bist."
  },
  {
    number: 8,
    text: "17 Jahre, geflüchtet, sehr gute Schulnoten, Familie mit unsicherem Aufenthaltsstatus und wenig Geld.",
    task: "Begründe selbstständig, ob eure Regeln Bildungs- und Aufstiegschancen eröffnen oder soziale Herkunft weiter stark wirken lassen."
  },
  {
    number: 9,
    text: "61 Jahre, Lagerarbeiterin, körperlich belastender Beruf, gesundheitliche Einschränkungen, geringe Rentenansprüche.",
    task: "Begründe selbstständig, wie eure Regeln mit harter Arbeit, Krankheit und drohender Altersarmut umgehen."
  },
  {
    number: 10,
    text: "34 Jahre, selbstständig in der Kulturbranche, schwankendes Einkommen, keine Kinder, gesetzlich versichert.",
    task: "Begründe selbstständig, ob eure Regeln Menschen mit unsicherem Einkommen auffangen oder stärker individuelle Vorsorge verlangen."
  },
  {
    number: 11,
    text: "41 Jahre, homosexueller Mann, Krankenpfleger in Teilzeit, lebt mit Partner in einer teuren Großstadt, unterstützt seine Mutter finanziell.",
    task: "Begründe selbstständig, ob eure Regeln unterschiedliche Lebensformen fair berücksichtigen und wie sie dich bei Wohnen, Einkommen, Pflegeverantwortung und sozialer Sicherheit bevorzugen oder benachteiligen."
  }
];

const workRulesNote = "Kein Internet nutzen, außer um Sachbegriffe nachzuschlagen. KI ist komplett verboten.";
const uploadWarning = "Wichtig: Nur eine Person lädt die Zusammenfassung bei Teams hoch. Alle anderen laden nur ihre einzelne Begründung hoch.";

const state = {
  step: "intro",
  groupSize: 5,
  fieldIndex: 0,
  selectedFieldIds: [],
  students: makeStudents(5),
  rules: [],
  breakingSeal: false
};

const appShell = document.querySelector(".app-shell");
const contentCard = document.querySelector("#contentCard");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const resetButton = document.querySelector("#resetButton");
const visualPanel = document.querySelector(".visual-panel");

function makeStudents(size) {
  return Array.from({ length: size }, (_, index) => ({ number: index + 1, initials: "" }));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectedFields() {
  return state.selectedFieldIds.map((id) => fields.find((field) => field.id === id)).filter(Boolean);
}

function setProgress(percent, text) {
  progressBar.style.width = `${percent}%`;
  progressText.textContent = text;
}

function setLayout(mode, topicId = "", topicImage = "") {
  appShell.classList.toggle("compact-work", mode === "work");
  appShell.classList.toggle("reveal-full", mode === "reveal");
  appShell.classList.toggle("seal-layout", mode === "seal");
  visualPanel.classList.toggle("reveal-mode", mode === "seal");
  visualPanel.dataset.topic = topicId;
  visualPanel.style.setProperty("--topic-image", topicImage ? `url("${topicImage}")` : "none");
}

function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function bindAutoResize() {
  document.querySelectorAll("textarea").forEach((textarea) => {
    autoResizeTextarea(textarea);
    textarea.addEventListener("input", () => autoResizeTextarea(textarea));
  });
}

function renderIntro() {
  state.step = "intro";
  state.breakingSeal = false;
  setLayout("intro");
  setProgress(4, "Vorbereitung");
  contentCard.innerHTML = `
    <div class="slide-in">
      <h2>Gruppenauftrag: Einen gerechten Staat entwerfen</h2>
      <p class="lead">Ihr arbeitet als Verfassungskongress. Hinter dem Schleier des Nichtwissens kennt niemand seine spätere soziale Lage. Deshalb entwickelt ihr zuerst als Gruppe eigene Regeln und begründet sie sozialwissenschaftlich.</p>
      <p class="notice"><strong>Arbeitsregel:</strong> ${workRulesNote}</p>
      <p>Ihr wählt gleich eine Gruppengröße zwischen 3 und 11 Personen. Danach entscheidet ihr euch für genau drei Politikfelder, mit denen ihr euch vertieft beschäftigt.</p>
      <button class="primary-button" type="button" id="startButton">Gruppe einrichten</button>
    </div>
  `;
  document.querySelector("#startButton").addEventListener("click", renderSetup);
}

function renderSetup() {
  state.step = "setup";
  setLayout("intro");
  setProgress(10, "Gruppe einrichten");
  contentCard.innerHTML = `
    <div class="slide-in">
      <h2>Gruppengröße und Initialen</h2>
      <p class="lead">Legt fest, wie viele Personen mitarbeiten. Tragt danach nur Initialen ein, damit die Zuordnung datenschutzsicher bleibt.</p>
      <p class="notice"><strong>Arbeitsregel:</strong> ${workRulesNote}</p>
      <label class="size-control" for="groupSize">Gruppengröße</label>
      <select id="groupSize">
        ${Array.from({ length: 9 }, (_, index) => index + 3).map((size) => `
          <option value="${size}" ${state.groupSize === size ? "selected" : ""}>${size} Personen</option>
        `).join("")}
      </select>
      <div class="roster-grid">
        ${state.students.map((student) => `
          <label class="roster-item">
            <span>Nummer ${student.number}</span>
            <input maxlength="6" data-initial="${student.number}" value="${escapeHtml(student.initials)}" placeholder="z. B. LM">
          </label>
        `).join("")}
      </div>
      <div class="button-row">
        <button class="primary-button" type="button" id="saveSetupButton">Themen auswählen</button>
        <span class="warning" id="warning" role="alert"></span>
      </div>
    </div>
  `;

  document.querySelector("#groupSize").addEventListener("change", (event) => {
    const nextSize = Number(event.target.value);
    const previous = state.students;
    state.groupSize = nextSize;
    state.students = makeStudents(nextSize).map((student, index) => ({
      ...student,
      initials: previous[index]?.initials || ""
    }));
    renderSetup();
  });

  document.querySelector("#saveSetupButton").addEventListener("click", () => {
    const inputs = [...document.querySelectorAll("[data-initial]")];
    const initials = inputs.map((input) => input.value.trim().toUpperCase());
    const warning = document.querySelector("#warning");
    if (initials.some((value) => !value)) {
      warning.textContent = "Bitte für jede Nummer Initialen eintragen.";
      return;
    }
    state.students = initials.map((value, index) => ({ number: index + 1, initials: value }));
    renderTopicSelection();
  });
}

function renderTopicSelection() {
  state.step = "topics";
  setLayout("intro");
  setProgress(18, "Drei Themen auswählen");
  contentCard.innerHTML = `
    <div class="slide-in">
      <h2>Wählt genau drei Politikfelder</h2>
      <p class="lead">Ihr müsst nicht alles bearbeiten. Entscheidet euch für die drei Bereiche, die ihr für eure gerechte Gesellschaft am wichtigsten findet.</p>
      <p class="notice"><strong>Arbeitsregel:</strong> ${workRulesNote}</p>
      <div class="topic-grid">
        ${fields.map((field) => `
          <label class="topic-card">
            <input type="checkbox" value="${field.id}" ${state.selectedFieldIds.includes(field.id) ? "checked" : ""}>
            <span>${field.title}</span>
            <small>${field.impulse}</small>
          </label>
        `).join("")}
      </div>
      <div class="button-row">
        <button class="secondary-button" type="button" id="backButton">Zurück</button>
        <button class="primary-button" type="button" id="startWorkButton">Gruppenarbeit starten</button>
        <span class="warning" id="warning" role="alert"></span>
      </div>
    </div>
  `;

  document.querySelector("#backButton").addEventListener("click", renderSetup);
  document.querySelector("#startWorkButton").addEventListener("click", () => {
    const chosen = [...document.querySelectorAll(".topic-card input:checked")].map((input) => input.value);
    const warning = document.querySelector("#warning");
    if (chosen.length !== 3) {
      warning.textContent = "Bitte genau drei Themen auswählen.";
      return;
    }
    state.selectedFieldIds = chosen;
    state.fieldIndex = 0;
    state.rules = [];
    renderField();
  });
}

function renderField() {
  state.step = "fields";
  const activeFields = selectedFields();
  const field = activeFields[state.fieldIndex];
  setLayout("work", field.short, field.image);
  setProgress(30 + state.fieldIndex * 16, `Gruppenarbeit · Thema ${state.fieldIndex + 1}/3`);
  const existing = state.rules[state.fieldIndex] || { rule: "", reason: "" };

  contentCard.innerHTML = `
    <div class="slide-in work-grid">
      <aside class="work-sidebar">
        <p class="kicker">Thema ${state.fieldIndex + 1}/3</p>
        <h2>${field.title}</h2>
        <p>${field.impulse}</p>
        <p class="notice compact"><strong>Regel:</strong> ${workRulesNote}</p>
        <div class="topic-pills">
          ${activeFields.map((item, index) => `<span class="${index === state.fieldIndex ? "active" : ""}">${index + 1}. ${item.short}</span>`).join("")}
        </div>
      </aside>
      <section class="work-main">
        <div class="concept-box compact">
          <h3>Mögliche Konzepte</h3>
          <ul>
            ${field.concepts.map((concept) => `<li>${escapeHtml(concept)}</li>`).join("")}
          </ul>
        </div>
        <p class="guide">${field.guide}</p>
        <div class="compact-form">
          <div class="field-row">
            <label for="groupRule">Eure selbst formulierte Regel</label>
            <textarea id="groupRule" rows="2" placeholder="Schreibt hier euer eigenes Konzept.">${escapeHtml(existing.rule)}</textarea>
          </div>
          <div class="field-row">
            <label for="groupReason">Begründung der Gruppe</label>
            <textarea id="groupReason" rows="2" placeholder="Warum ist diese Regel gerecht? Welche Interessen und Risiken berücksichtigt sie?">${escapeHtml(existing.reason)}</textarea>
          </div>
        </div>
        <div class="button-row">
          ${state.fieldIndex > 0 ? '<button class="secondary-button" type="button" id="backButton">Zurück</button>' : ""}
          <button class="primary-button" type="button" id="nextButton">${state.fieldIndex === activeFields.length - 1 ? "Umschlag vorbereiten" : "Nächstes Thema"}</button>
          <span class="warning" id="warning" role="alert"></span>
        </div>
      </section>
    </div>
  `;
  bindAutoResize();

  const backButton = document.querySelector("#backButton");
  if (backButton) {
    backButton.addEventListener("click", () => {
      persistCurrentField();
      state.fieldIndex -= 1;
      renderField();
    });
  }

  document.querySelector("#nextButton").addEventListener("click", () => {
    const warning = document.querySelector("#warning");
    if (!persistCurrentField()) {
      warning.textContent = "Bitte Regel und Begründung ausfüllen.";
      return;
    }
    if (state.fieldIndex < activeFields.length - 1) {
      state.fieldIndex += 1;
      renderField();
      return;
    }
    renderSeal();
  });
}

function persistCurrentField() {
  const activeFields = selectedFields();
  const field = activeFields[state.fieldIndex];
  const rule = document.querySelector("#groupRule")?.value.trim() || "";
  const reason = document.querySelector("#groupReason")?.value.trim() || "";
  state.rules[state.fieldIndex] = {
    field: field.title,
    rule,
    reason
  };
  return Boolean(rule && reason);
}

function renderSeal() {
  state.step = "seal";
  setLayout("seal");
  setProgress(82, "Umschlag versiegelt");
  contentCard.innerHTML = `
    <div class="slide-in seal-screen">
      <p class="kicker">Wechsel zur Einzelarbeit</p>
      <h2>Der Umschlag liegt bereit</h2>
      <p class="lead">Die Gruppenregeln sind festgelegt. Erst jetzt wird sichtbar, welche soziale Position hinter den Nummern 1 bis ${state.groupSize} steckt.</p>
      <p class="notice"><strong>Wichtig:</strong> Auch bei der Einzelarbeit gilt: ${workRulesNote}</p>
      <div class="seal-button-wrap">
        <button class="seal-button ${state.breakingSeal ? "cracked" : ""}" type="button" id="breakSealButton" aria-label="Siegel brechen und Rollen öffnen">
          <span class="wax-seal"><span class="seal-mark">§</span></span>
          <span>Siegel brechen</span>
        </button>
      </div>
    </div>
  `;
  document.querySelector("#breakSealButton").addEventListener("click", () => {
    state.breakingSeal = true;
    document.querySelector("#breakSealButton").classList.add("cracked");
    setTimeout(renderReveal, 760);
  });
}

function renderReveal() {
  state.step = "reveal";
  setLayout("reveal");
  setProgress(100, "Einzelarbeit und Abgabe");
  const visibleProfiles = numberedProfiles.slice(0, state.groupSize);
  const profileCards = visibleProfiles.map((profile) => {
    const student = state.students.find((item) => item.number === profile.number);
    return `
      <section class="profile-card">
        <div class="profile-number">${profile.number}</div>
        <div>
          <h3>${escapeHtml(student.initials)} · Rolle ${profile.number}</h3>
          <p>${escapeHtml(profile.text)}</p>
          <p><strong>Einzelauftrag:</strong> ${escapeHtml(profile.task)}</p>
        </div>
      </section>
    `;
  }).join("");

  contentCard.innerHTML = `
    <div class="slide-in reveal-open reveal-layout">
      <section class="reveal-main">
        <p class="kicker">Der Umschlag ist geöffnet</p>
        <h2>Rollen 1 bis ${state.groupSize}</h2>
        <p class="lead">Ordnet euch über eure Initialen zu. Jede Person schreibt nun selbstständig, wie sie in dieser neuen Gesellschaft bevorzugt oder benachteiligt würde und begründet das mit den Gruppenregeln.</p>
        <p class="notice"><strong>Abgabe:</strong> Ladet die Zusammenfassung herunter. Ihr könnt sie zusätzlich in euren Gruppenchat stellen. Die Zusammenfassung muss bei der Aufgabe in Teams hochgeladen werden. Die einzelnen Begründungen werden ebenfalls einzeln bei Teams hochgeladen.</p>
        <p class="upload-warning"><strong>${uploadWarning}</strong></p>
        <p class="notice"><strong>Arbeitsregel:</strong> ${workRulesNote}</p>
        <div class="button-row">
          <button class="primary-button" type="button" id="downloadSummaryButton">Zusammenfassung herunterladen</button>
          <button class="secondary-button" type="button" id="restartButton">Neu starten</button>
        </div>
      </section>
      <section class="reveal-columns">
        <div>
          <h3>Rollenprofile</h3>
          <div class="profile-list">${profileCards}</div>
        </div>
        <div>
          <h3>Gruppenregeln</h3>
          <div class="answers">${rulesHtml()}</div>
        </div>
      </section>
    </div>
  `;

  document.querySelector("#downloadSummaryButton").addEventListener("click", () => downloadText("rawls-gruppenarbeit-zusammenfassung.txt", buildSummaryText()));
  document.querySelector("#restartButton").addEventListener("click", resetSimulation);
}

function rulesHtml() {
  return state.rules.map((item) => `
    <div class="answer-item">
      <strong>${escapeHtml(item.field)}</strong>
      <p><strong>Regel:</strong> ${escapeHtml(item.rule)}</p>
      <p><strong>Begründung:</strong> ${escapeHtml(item.reason)}</p>
    </div>
  `).join("");
}

function buildRulesText() {
  return [
    "Gruppenregeln: Sozialstaat und soziale Gerechtigkeit",
    "Gedankenexperiment nach John Rawls: Schleier des Nichtwissens",
    `Bearbeitete Themen: ${selectedFields().map((field) => field.title).join(", ")}`,
    "",
    ...state.rules.flatMap((item, index) => [
      `${index + 1}. ${item.field}`,
      `Regel: ${item.rule}`,
      `Begründung: ${item.reason}`,
      ""
    ])
  ].join("\n");
}

function buildSummaryText() {
  const roster = state.students.map((student) => `Nummer ${student.number}: ${student.initials}`).join("\n");
  const profiles = numberedProfiles.slice(0, state.groupSize).map((profile) => {
    const student = state.students.find((item) => item.number === profile.number);
    return [
      `Nummer ${profile.number} (${student.initials})`,
      `Rolle: ${profile.text}`,
      `Einzelauftrag: ${profile.task}`,
      "Eigene Begründung der Schülerin/des Schülers: separat verfassen und bei Teams hochladen.",
      ""
    ].join("\n");
  }).join("\n");

  return [
    "Einreichung: Gruppenarbeit und Einzelarbeit",
    "Thema: Der Sozialstaat und soziale Gerechtigkeit",
    "Methode: John Rawls - Schleier des Nichtwissens",
    "",
    `Gruppengröße: ${state.groupSize}`,
    "Gruppenmitglieder nach Initialen",
    roster,
    "",
    "Arbeitsregel:",
    workRulesNote,
    "",
    "Abgabehinweis:",
    "Diese Zusammenfassung kann zusätzlich in den Gruppenchat gestellt werden.",
    "Sie muss bei der Aufgabe in Teams hochgeladen werden.",
    "Die einzelnen Begründungen der Schülerinnen und Schüler müssen ebenfalls einzeln bei Teams hochgeladen werden.",
    uploadWarning,
    "",
    buildRulesText(),
    "Einzelarbeit nach Öffnung des Umschlags",
    profiles,
    "Abschlussfrage für den Unterricht:",
    "Warum ist es in der echten Politik schwerer, sich auf ein gerechtes Sozialsystem zu einigen, wenn alle ihre eigene soziale Lage kennen?"
  ].join("\n");
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function resetSimulation() {
  state.step = "intro";
  state.groupSize = 5;
  state.fieldIndex = 0;
  state.selectedFieldIds = [];
  state.students = makeStudents(5);
  state.rules = [];
  state.breakingSeal = false;
  renderIntro();
}

resetButton.addEventListener("click", resetSimulation);
renderIntro();
