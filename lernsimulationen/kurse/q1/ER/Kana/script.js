(() => {
  const stages = [
    {
      id: "a",
      nav: "a · Dritter Tag",
      title: "Spur 1: Der dritte Tag",
      verses: [1],
      message: "Beginnen wir mit einer kleinen Formulierung, die leicht überlesen wird. Johannes schreibt nicht einfach: Eines Tages war eine Hochzeit. Er setzt einen Akzent.",
      focus: "<b>Vers 1:</b> „Und am dritten Tage ward eine Hochzeit zu Kana ...“",
      prompt: "Warum könnte diese Zeitangabe theologisch bedeutsam sein? An welches zentrale Ereignis erinnert sie? Erkläre auch, welches Licht diese Anspielung auf die Erzählung wirft.",
      test: answer => has(answer, ["aufersteh", "ostern", "öster", "osterg"]) && has(answer, ["tod", "leben", "überwind", "neues leben", "herrlichkeit"]),
      nudge: "Du hast einen ersten Gedanken formuliert. Schau noch genauer auf die Worte „am dritten Tage“: Wo begegnet dir diese Zeitangabe im Zentrum des christlichen Glaubens? Was könnte das für Jesu Rolle bedeuten?",
      bonus: "<details><summary>Bonusspur: Jesu „Stunde“ in Vers 4</summary><p>Jesus sagt: „Meine Stunde ist noch nicht gekommen.“ Im Johannesevangelium verweist seine „Stunde“ besonders auf Passion, Tod und Verherrlichung. Welche Verbindung entsteht, wenn du Vers 4 neben die österliche Spur aus Vers 1 stellst?</p></details>",
      success: "Sehr gut gesehen. Die Zeitangabe öffnet einen österlichen Deutungshorizont: Schon am Beginn des Wirkens Jesu klingt an, dass seine Herrlichkeit mit neuem Leben und der Überwindung des Todes verbunden ist.",
      note: "„Am dritten Tage“ eröffnet einen österlichen Deutungshorizont: Jesus steht für neues Leben und die Überwindung des Todes."
    },
    {
      id: "b",
      nav: "b · Kontext",
      title: "Spur 2: Ein erklärter Brauch",
      verses: [6],
      message: "Nun wechseln wir die Perspektive: Eine Formulierung kann etwas über die vermuteten Leserinnen und Leser verraten. Das Johannesevangelium entstand wahrscheinlich gegen Ende des 1. Jahrhunderts n. Chr.",
      focus: "<b>Vers 6:</b> „... sechs steinerne Wasserkrüge <em>nach der Weise der jüdischen Reinigung</em> ...“",
      prompt: "Warum erklärt der Erzähler den Zweck der Krüge ausdrücklich? Was lässt sich daraus vorsichtig über den Adressatenkreis des Evangeliums ableiten?",
      visual: {
        src: "assets/images/stone-jars.jpg",
        alt: "Illustration von sechs steinernen Wasserkrügen in einem Hof",
        caption: "Sechs steinerne Krüge: Zähle nach und prüfe, welche historische Erklärung der Erzähler in Vers 6 ergänzt."
      },
      test: answer => has(answer, ["heidenchrist", "nichtjüd", "nicht-jüd", "jüdische bräuche nicht", "jüdischen bräuche nicht", "brauch nicht", "bräuche nicht", "unvertraut"]) && has(answer, ["adressat", "leser", "gemeinde", "publikum"]),
      nudge: "Deine Beobachtung ist noch nicht ganz ausgeschöpft. Frage dich: Für wen wäre die Zusatzinformation unnötig und für wen hilfreich? Formuliere eine Vermutung über die Leserschaft.",
      method: "<strong>Methodennotiz: Indiz oder Beweis?</strong> Eine erklärende Formulierung im Text ist ein Indiz: Sie macht eine historische Vermutung plausibel. Ein einzelner Vers beweist jedoch nicht eindeutig, wie eine ganze Gemeinde zusammengesetzt war.",
      bonus: "<details><summary>Bonusspur: Die sechs steinernen Krüge</summary><p>Die Krüge gehören zur jüdischen Reinigungspraxis. Der Text wertet diese Tradition nicht ab. Frage stattdessen vorsichtig: Wie deutet Johannes die große Fülle des Weins christologisch? Formuliere so, dass das Judentum nicht als minderwertige Vorstufe erscheint.</p></details>",
      info: "<strong>Infobox: Historischer Kontext</strong>Das Johannesevangelium wird meist gegen Ende des 1. Jahrhunderts n. Chr. eingeordnet. In dieser Zeit lebten christliche Gemeinden zunehmend in einer nichtjüdisch geprägten Umwelt. Wenn jüdische Bräuche erklärt werden, kann das ein Hinweis auf einen überwiegend heidenchristlichen Adressatenkreis sein.",
      success: "Genau. Die Erklärung wäre für mit dem Brauch vertraute jüdische Leserinnen und Leser kaum nötig. Sie ist ein redaktionsgeschichtliches Indiz für einen überwiegend heidenchristlichen Adressatenkreis. Wichtig ist das vorsichtige Wort „Indiz“: Der Vers beweist nicht jede Einzelheit der Gemeindegeschichte.",
      note: "Die Erklärung der jüdischen Reinigung ist ein Indiz für einen überwiegend heidenchristlichen Adressatenkreis, dem jüdische Bräuche nicht selbstverständlich vertraut waren."
    },
    {
      id: "c",
      nav: "c · Glaube",
      title: "Spur 3: Mehr als ein Zaubertrick",
      verses: [9, 10, 11],
      message: "Am Ende heißt es, die Jünger glaubten an Jesus. Doch Johannes interessiert sich nicht für eine bloße Show. Achte deshalb auf den Speisemeister: Er kennt den Ursprung des Weins nicht, urteilt aber über seine Qualität.",
      focus: "<b>Verse 10-11:</b> „... du hast den guten Wein bisher behalten.“<br>„... offenbarte seine Herrlichkeit. Und seine Jünger glaubten an ihn.“",
      prompt: "Welche Rolle spielt der Speisemeister als unwissender Zeuge? Warum führt die Szene die Jünger zum Glauben und nicht nur zum Staunen über eine erstaunliche Tat?",
      test: answer => has(answer, ["qualität", "gut", "besser", "zeuge", "bezeug"]) && has(answer, ["fülle", "messian", "endzeit", "heil", "herrlichkeit", "glaube"]),
      nudge: "Du beschreibst die erstaunliche Tat. Gehe nun einen Schritt weiter: Was bezeugt der Speisemeister unfreiwillig über die Qualität? Wein kann biblisch für Freude und endzeitliche Fülle stehen. Welche Deutung wird dadurch möglich?",
      success: "Stark herausgearbeitet. Der Speisemeister bezeugt unfreiwillig die besondere Qualität des Weins. Die Jünger erkennen darin nicht bloß eine unerklärliche Verwandlung, sondern einen Hinweis auf messianische Fülle und Jesu Herrlichkeit.",
      note: "Der unwissende Speisemeister bezeugt die Qualität des Weins. Die Jünger erkennen im Zeichen messianische Fülle und Jesu Herrlichkeit."
    },
    {
      id: "c2",
      nav: "3b · Umkehr",
      title: "Spur 3b: Das Beste kommt zum Schluss",
      verses: [10],
      message: "Bleiben wir noch kurz bei Vers 10. Die Reihenfolge irritiert den Speisemeister. Genau diese Verkehrung verdient eine eigene Deutung.",
      focus: "<b>Vers 10:</b> „Jedermann gibt zuerst guten Wein ... du hast den guten Wein bisher behalten.“",
      prompt: "Welche theologische Bedeutung könnte diese umgekehrte Reihenfolge haben? Was sagt sie über das Neue aus, das mit Jesus anbricht?",
      visual: {
        src: "assets/images/good-wine.jpg",
        alt: "Illustration eines Weinkelchs auf einer festlichen Tafel",
        caption: "Der gute Wein kommt zuletzt: Welche theologische Pointe liegt in dieser überraschenden Reihenfolge?"
      },
      test: answer => has(answer, ["beste", "gut", "besser", "übertriff", "überbiet", "schluss", "zuletzt"]) && has(answer, ["jesus", "neu", "tradition", "bisher", "füll"]),
      nudge: "Die ungewöhnliche Reihenfolge ist mehr als gute Bewirtung. Vergleiche das Bisherige mit dem, was durch Jesus kommt: Was wird hier übertroffen?",
      success: "Treffend. Die erzählte Welt wird verkehrt: Das Beste kommt nicht zuerst, sondern mit Jesus. Das Neue knüpft an das Bisherige an, übertrifft es aber in seiner Fülle.",
      note: "Vers 10 erzählt eine Verkehrung: Mit Jesus kommt das Beste zum Schluss. Die bisherige Tradition wird nicht belanglos, aber in neuer Fülle übertroffen."
    },
    {
      id: "d",
      nav: "d · Semeion",
      title: "Spur 4: Warum „Zeichen“?",
      verses: [11],
      message: "Zum Abschluss lohnt sich ein einzelnes Wort. Johannes nennt die Tat ausdrücklich ein „Zeichen“. Das griechische Wort lautet σημεῖον (sēmeion), im Plural σημεῖα (sēmeia).",
      focus: "<b>Vers 11:</b> „Das ist das erste <em>Zeichen</em>, das Jesus tat ... und offenbarte seine Herrlichkeit.“",
      prompt: "Warum spricht der Text von einem „Zeichen“ und nicht einfach von einem Wunder? Worauf verweist die Tat über sich selbst hinaus?",
      test: answer => has(answer, ["hinaus", "verweis", "weist", "offenbar", "herrlichkeit", "christolog", "identität", "wer jesus"]) && has(answer, ["zeichen", "seme"]),
      shallow: answer => has(answer, ["wunder", "sensation", "staun", "magie", "zauber", "wasser", "wein"]) && !has(answer, ["hinaus", "verweis", "weist", "offenbar", "herrlichkeit", "identität"]),
      nudge: "Du hast die sichtbare Ebene erfasst. Johannes will aber mehr als Staunen auslösen: Frage dich, worauf diese Tat verweist. Was wird über Jesus sichtbar?",
      info: "<strong>Infobox: Zeichen im Johannesevangelium</strong>Ein Zeichen (griech. σημεῖον / sēmeion) erschöpft sich nicht in der auffälligen Tat. Wie ein Wegweiser lenkt es den Blick über sich selbst hinaus: Es macht sichtbar, wer Jesus ist, und offenbart seine Herrlichkeit.",
      success: "Genau das ist der Kern johanneischer Zeichentheologie. Die Verwandlung ist kein Selbstzweck. Als Zeichen weist sie über sich hinaus: In der messianischen Fülle wird Jesu Herrlichkeit sichtbar und der Glaube eröffnet.",
      note: "Das sēmeion weist über die sichtbare Tat hinaus: Die messianische Fülle offenbart Jesu Herrlichkeit und eröffnet Glauben."
    }
  ];

  const storageKey = "kana-learning-state-v1";
  const state = { stage: 0, attempts: {}, notes: [], answers: [], dialogue: [], synthesis: "", finished: false };
  const els = {
    stageLabel: byId("stageLabel"), progressText: byId("progressText"), progressBar: byId("progressBar"),
    stageNav: byId("stageNav"), stageTitle: byId("stageTitle"), teacherMessage: byId("teacherMessage"),
    focusBox: byId("focusBox"), feedback: byId("feedback"), infoBox: byId("infoBox"),
    methodBox: byId("methodBox"), bonusBox: byId("bonusBox"), form: byId("answerForm"),
    stationVisual: byId("stationVisual"), stationVisualImage: byId("stationVisualImage"), stationVisualCaption: byId("stationVisualCaption"),
    observation: byId("observationInput"), interpretation: byId("interpretationInput"),
    conversation: byId("conversationList"), nextRow: byId("nextRow"),
    nextButton: byId("nextButton"), nextNote: byId("nextNote"), notesList: byId("notesList"),
    finish: byId("finishScreen"), summary: byId("summaryList"), synthesis: byId("synthesisInput"),
    synthesisFeedback: byId("synthesisFeedback"), finishActions: byId("finishActions"),
    textPanel: byId("textPanel"), textToggle: byId("textToggleButton"), startScreen: byId("startScreen"),
    resumeButton: byId("resumeButton")
  };

  function byId(id) { return document.getElementById(id); }
  function normalize(text) { return text.toLocaleLowerCase("de-DE").replace(/[ä]/g, "ae").replace(/[ö]/g, "oe").replace(/[ü]/g, "ue").replace(/[ß]/g, "ss"); }
  function has(answer, terms) {
    const clean = normalize(answer);
    return terms.some(term => clean.includes(normalize(term)));
  }

  function renderStage() {
    const stage = stages[state.stage];
    els.stageLabel.textContent = `Station ${state.stage + 1} von ${stages.length}`;
    els.progressText.textContent = `${Math.round((state.notes.length / stages.length) * 100)} %`;
    els.progressBar.style.width = `${(state.notes.length / stages.length) * 100}%`;
    els.stageTitle.textContent = stage.title;
    els.teacherMessage.textContent = stage.message;
    els.focusBox.innerHTML = `${stage.focus}<hr><b>Dein Auftrag:</b> ${stage.prompt}`;
    els.observation.value = "";
    els.interpretation.value = "";
    els.observation.disabled = false;
    els.interpretation.disabled = false;
    els.form.classList.remove("hidden");
    els.form.querySelector("button").textContent = "Gedanken festhalten";
    els.feedback.className = "feedback hidden";
    els.infoBox.className = "info-box hidden";
    els.methodBox.className = "method-box hidden";
    els.bonusBox.className = "bonus-box hidden";
    els.stationVisual.className = "station-visual hidden";
    if (stage.method) {
      els.methodBox.innerHTML = stage.method;
      els.methodBox.classList.remove("hidden");
    }
    if (stage.bonus) {
      els.bonusBox.innerHTML = stage.bonus;
      els.bonusBox.classList.remove("hidden");
    }
    if (stage.visual) {
      els.stationVisualImage.src = stage.visual.src;
      els.stationVisualImage.alt = stage.visual.alt;
      els.stationVisualCaption.textContent = stage.visual.caption;
      els.stationVisual.classList.remove("hidden");
    }
    els.nextRow.classList.add("hidden");
    document.querySelectorAll("[data-verse]").forEach(node => {
      node.classList.toggle("active", stage.verses.includes(Number(node.dataset.verse)));
    });
    els.stageNav.innerHTML = stages.map((item, index) => {
      const status = index < state.stage ? "done" : index === state.stage ? "current" : "";
      return `<li class="${status}">${item.nav}</li>`;
    }).join("");
    renderConversation();
    els.observation.focus();
  }

  function renderNotes() {
    if (!state.notes.length) {
      els.notesList.innerHTML = '<p class="empty-note">Hier erscheinen deine gesicherten Zwischenergebnisse.</p>';
      return;
    }
    els.notesList.innerHTML = state.notes.map(item => `<div class="note"><strong>${item.title}</strong><br><b>Beobachtung:</b> ${escapeHtml(item.observation)}<br><b>Deutung:</b> ${escapeHtml(item.interpretation)}</div>`).join("");
  }

  els.form.addEventListener("submit", event => {
    event.preventDefault();
    const stage = stages[state.stage];
    const observation = els.observation.value.trim();
    const interpretation = els.interpretation.value.trim();
    const answer = `${observation} ${interpretation}`.trim();
    if (!observation || !interpretation) {
      showFeedback("Halte bitte je einen kurzen Gedanken zur Beobachtung und zur Deutung fest. Ein Satzteil pro Feld genügt.", false);
      return;
    }
    state.attempts[stage.id] = (state.attempts[stage.id] || 0) + 1;
    const attempt = state.attempts[stage.id];
    const previous = state.dialogue.filter(item => item.stageId === stage.id && item.type === "answer").at(-1);
    if (!previous || previous.observation !== observation || previous.interpretation !== interpretation) {
      state.dialogue.push({ stageId: stage.id, title: stage.title, type: "answer", attempt, observation, interpretation });
    }
    if (stage.id === "d" && stage.shallow(answer)) recordInfo(stage);
    if (attempt === 1) {
      state.dialogue.push({ stageId: stage.id, title: stage.title, type: "impulse", text: stage.nudge });
      showFeedback(stage.nudge, false);
      els.form.querySelector("button").textContent = "Antwort ergänzen oder sichern";
      renderConversation();
      saveState();
      return;
    }
    if (stage.id === "b" && !stage.test(answer)) {
      recordInfo(stage);
    }
    state.answers.push({ title: stage.title, observation, interpretation });
    state.notes.push({ title: stage.nav, observation, interpretation });
    showFeedback("Danke. Dein Gedanke ist im Lernprotokoll gesichert. Du kannst nun zur nächsten Station weitergehen.", true);
    renderNotes();
    renderConversation();
    els.observation.disabled = true;
    els.interpretation.disabled = true;
    els.form.querySelector("button").disabled = true;
    els.nextNote.textContent = state.stage === stages.length - 1 ? "Deine Analyse ist bereit für die Zusammenfassung." : "Dieser Gedanke ist gesichert. Gehe weiter, wenn du bereit bist.";
    els.nextButton.textContent = state.stage === stages.length - 1 ? "Analyse abschließen" : "Nächste Station";
    els.nextRow.classList.remove("hidden");
    els.progressText.textContent = `${Math.round((state.notes.length / stages.length) * 100)} %`;
    els.progressBar.style.width = `${(state.notes.length / stages.length) * 100}%`;
    saveState();
  });

  function showFeedback(text, good) {
    els.feedback.textContent = text;
    els.feedback.className = `feedback${good ? " good" : ""}`;
  }
  function showInfo(html) {
    els.infoBox.innerHTML = html;
    els.infoBox.classList.remove("hidden");
  }
  function stripHtml(html) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    return wrapper.textContent || wrapper.innerText || "";
  }
  function recordInfo(stage) {
    showInfo(stage.info);
    const alreadyRecorded = state.dialogue.some(item => item.stageId === stage.id && item.type === "info");
    if (!alreadyRecorded) state.dialogue.push({ stageId: stage.id, title: stage.title, type: "info", text: stripHtml(stage.info) });
    renderConversation();
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }
  function renderConversation() {
    const stage = stages[state.stage];
    const entries = state.dialogue.filter(item => item.stageId === stage.id);
    if (!entries.length) {
      els.conversation.innerHTML = '<p class="empty-note">Dein erster Gedanke eröffnet das Gespräch.</p>';
      return;
    }
    els.conversation.innerHTML = entries.map(item => {
      if (item.type === "answer") {
        return `<div class="chat-card student"><b>Dein Gedanke</b>${escapeHtml(item.observation)}<br>${escapeHtml(item.interpretation)}</div>`;
      }
      return `<div class="chat-card ${item.type === "info" ? "info" : "teacher"}"><b>${item.type === "info" ? "Infobox" : "Weiterführender Impuls"}</b>${escapeHtml(item.text)}</div>`;
    }).join("");
  }

  els.nextButton.addEventListener("click", () => {
    els.form.querySelector("button").disabled = false;
    if (state.stage < stages.length - 1) {
      state.stage += 1;
      saveState();
      renderStage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finish();
    }
  });

  function finish() {
    els.summary.innerHTML = state.notes.map(item => `<div class="summary-item"><b>${item.title}</b><br>${escapeHtml(item.observation)}<br>${escapeHtml(item.interpretation)}</div>`).join("");
    els.synthesis.value = state.synthesis;
    els.synthesisFeedback.className = "feedback hidden";
    els.finishActions.classList.toggle("hidden", !state.synthesis);
    els.finish.classList.remove("hidden");
    state.finished = true;
    saveState();
  }

  function restart() {
    state.stage = 0;
    state.attempts = {};
    state.notes = [];
    state.answers = [];
    state.dialogue = [];
    state.synthesis = "";
    state.finished = false;
    localStorage.removeItem(storageKey);
    els.form.querySelector("button").disabled = false;
    els.finish.classList.add("hidden");
    renderNotes();
    renderStage();
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || !Array.isArray(saved.notes) || !Array.isArray(saved.dialogue)) return false;
      Object.assign(state, saved);
      return true;
    } catch {
      localStorage.removeItem(storageKey);
      return false;
    }
  }
  function enterSimulation() {
    els.startScreen.classList.add("hidden");
    renderNotes();
    renderStage();
    if (state.finished) finish();
  }

  function downloadProtocol() {
    const lines = [
      "Lernprotokoll: Die Hochzeit zu Kana (Johannes 2,1-11)",
      "Lutherbibel 1912",
      "",
      "Persönliches Fazit",
      state.synthesis,
      "",
      ...stages.flatMap((stage, index) => {
        const entries = state.dialogue.filter(item => item.stageId === stage.id);
        return [
          `${index + 1}. ${stage.title}`,
          ...entries.map(item => {
            if (item.type === "answer") return [
              `Eigener Gedanke${item.attempt > 1 ? ` (Bearbeitungsstand ${item.attempt})` : ""}:`,
              `Beobachtung: ${item.observation}`,
              `Deutung: ${item.interpretation}`
            ].join("\n");
            if (item.type === "impulse") return `Weiterführender Impuls: ${item.text}`;
            return `Infobox: ${item.text}`;
          }),
          ""
        ];
      })
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lernprotokoll-hochzeit-zu-kana.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  byId("saveSynthesisButton").addEventListener("click", () => {
    const synthesis = els.synthesis.value.trim();
    if (!synthesis) {
      els.synthesisFeedback.textContent = "Halte bitte einen kurzen eigenen Schlussgedanken fest. Ein Satz genügt.";
      els.synthesisFeedback.className = "feedback";
      return;
    }
    state.synthesis = synthesis;
    saveState();
    els.synthesisFeedback.textContent = "Dein Fazit ist gesichert. Das vollständige Lernprotokoll steht nun zum Download bereit.";
    els.synthesisFeedback.className = "feedback good";
    els.finishActions.classList.remove("hidden");
  });
  els.textToggle.addEventListener("click", () => {
    els.textPanel.classList.add("open");
    els.textToggle.setAttribute("aria-expanded", "true");
  });
  byId("textCloseButton").addEventListener("click", () => {
    els.textPanel.classList.remove("open");
    els.textToggle.setAttribute("aria-expanded", "false");
  });
  byId("startButton").addEventListener("click", () => {
    restart();
    enterSimulation();
  });
  els.resumeButton.addEventListener("click", () => {
    loadState();
    enterSimulation();
  });
  byId("printButton").addEventListener("click", () => window.print());
  byId("restartButton").addEventListener("click", restart);
  byId("finishRestartButton").addEventListener("click", restart);
  byId("downloadButton").addEventListener("click", downloadProtocol);
  if (localStorage.getItem(storageKey)) els.resumeButton.classList.remove("hidden");
  renderNotes();
  renderStage();
})();
