const categories = [
  {
    id: "bildung",
    name: "Bildung",
    hint: "Schulen, Ausbildung, Forschung",
    icon: "B",
    color: "#376fa7",
    value: 18,
    weights: { people: 0.45, future: 1.05, stable: 0.15 }
  },
  {
    id: "soziales",
    name: "Soziales",
    hint: "Familien, Rente, Bürgergeld",
    icon: "S",
    color: "#7257a8",
    value: 24,
    weights: { people: 0.9, future: 0.1, stable: 0.45 }
  },
  {
    id: "verkehr",
    name: "Verkehr",
    hint: "Bahn, Straßen, Brücken",
    icon: "V",
    color: "#49907b",
    value: 16,
    weights: { people: 0.45, future: 0.45, stable: 0.45 }
  },
  {
    id: "sicherheit",
    name: "Sicherheit",
    hint: "Polizei, Schutz, Verteidigung",
    icon: "P",
    color: "#dc5f46",
    value: 14,
    weights: { people: 0.2, future: 0.05, stable: 0.95 }
  },
  {
    id: "klima",
    name: "Klima",
    hint: "Energie, Umwelt, Anpassung",
    icon: "K",
    color: "#2f9d70",
    value: 14,
    weights: { people: 0.1, future: 1.05, stable: 0.2 }
  },
  {
    id: "zinsen",
    name: "Schuldenbremse",
    hint: "Zinsen zahlen, weniger neue Schulden",
    icon: "Z",
    color: "#8a6b3d",
    value: 14,
    weights: { people: -0.15, future: 0.35, stable: 0.9 }
  }
];

const events = [
  {
    title: "Marode Brücken",
    text: "Mehrere Brücken müssen schneller saniert werden. Ohne Geld für Verkehr sinkt die Stabilität.",
    icon: "V",
    focus: "verkehr",
    effects: [
      ["Verkehr ab 18 Mrd.", "+ Stabilität"],
      ["Verkehr unter 12 Mrd.", "- Zufriedenheit"]
    ],
    apply(values, score) {
      if (values.verkehr >= 18) score.stable += 10;
      if (values.verkehr < 12) {
        score.people -= 8;
        score.stable -= 8;
      }
    }
  },
  {
    title: "Viele Eltern fordern bessere Schulen",
    text: "Digitalisierung, Gebäude und Lehrkräfte kosten Geld. Bildungsausgaben wirken besonders langfristig.",
    icon: "B",
    focus: "bildung",
    effects: [
      ["Bildung ab 22 Mrd.", "+ Zukunft"],
      ["Bildung unter 14 Mrd.", "- Zukunft"]
    ],
    apply(values, score) {
      if (values.bildung >= 22) score.future += 13;
      if (values.bildung < 14) score.future -= 12;
    }
  },
  {
    title: "Energiepreise steigen",
    text: "Haushalte mit wenig Geld brauchen Hilfe. Gleichzeitig soll Energie sauberer werden.",
    icon: "E",
    focus: "soziales",
    effects: [
      ["Soziales ab 26 Mrd.", "+ Zufriedenheit"],
      ["Klima ab 16 Mrd.", "+ Zukunft"]
    ],
    apply(values, score) {
      if (values.soziales >= 26) score.people += 12;
      if (values.klima >= 16) score.future += 8;
      if (values.soziales < 18) score.people -= 12;
    }
  },
  {
    title: "Unsichere Weltlage",
    text: "Der Bund soll mehr in Schutz und Verteidigung investieren. Zu starke Kürzungen fallen schnell auf.",
    icon: "!",
    focus: "sicherheit",
    effects: [
      ["Sicherheit ab 18 Mrd.", "+ Stabilität"],
      ["Sicherheit unter 10 Mrd.", "- Stabilität"]
    ],
    apply(values, score) {
      if (values.sicherheit >= 18) score.stable += 12;
      if (values.sicherheit < 10) score.stable -= 14;
    }
  }
];

const state = {
  round: 0,
  score: { people: 50, future: 50, stable: 50 },
  debt: 0,
  notes: []
};

const els = {
  roundText: document.querySelector("#roundText"),
  scorePeople: document.querySelector("#scorePeople"),
  scoreFuture: document.querySelector("#scoreFuture"),
  scoreStable: document.querySelector("#scoreStable"),
  debtText: document.querySelector("#debtText"),
  barPeople: document.querySelector("#barPeople"),
  barFuture: document.querySelector("#barFuture"),
  barStable: document.querySelector("#barStable"),
  barDebt: document.querySelector("#barDebt"),
  eventIcon: document.querySelector("#eventIcon"),
  eventTitle: document.querySelector("#eventTitle"),
  eventText: document.querySelector("#eventText"),
  eventEffects: document.querySelector("#eventEffects"),
  budgetInputs: document.querySelector("#budgetInputs"),
  remainingText: document.querySelector("#remainingText"),
  autoBalance: document.querySelector("#autoBalance"),
  submitBudget: document.querySelector("#submitBudget"),
  ledgerList: document.querySelector("#ledgerList"),
  resultDialog: document.querySelector("#resultDialog"),
  resultTitle: document.querySelector("#resultTitle"),
  resultText: document.querySelector("#resultText"),
  resultGrid: document.querySelector("#resultGrid"),
  restartGame: document.querySelector("#restartGame")
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function getValues() {
  return Object.fromEntries(
    categories.map((category) => {
      const input = document.querySelector(`#${category.id}`);
      return [category.id, Number(input.value)];
    })
  );
}

function getTotal() {
  return Object.values(getValues()).reduce((sum, value) => sum + value, 0);
}

function setMeter(bar, value, invert = false) {
  bar.style.width = `${clamp(value)}%`;
  if (invert) {
    bar.style.background = value > 25 ? "var(--red)" : "var(--green)";
    return;
  }
  bar.style.background = value < 35 ? "var(--red)" : value < 58 ? "var(--yellow)" : "var(--green)";
}

function renderInputs() {
  els.budgetInputs.innerHTML = categories.map((category) => `
    <div class="budget-row" data-category="${category.id}">
      <span class="cat-icon" style="background:${category.color}">${category.icon}</span>
      <label for="${category.id}">
        ${category.name}
        <small>${category.hint}</small>
      </label>
      <input id="${category.id}" type="range" min="4" max="36" value="${category.value}" step="1">
      <span class="amount" id="${category.id}Amount">${category.value} Mrd.</span>
    </div>
  `).join("");

  categories.forEach((category) => {
    document.querySelector(`#${category.id}`).addEventListener("input", updateBudgetState);
  });
}

function updateBudgetState() {
  const total = getTotal();
  const remaining = 100 - total;
  els.remainingText.textContent = remaining === 0 ? "0 übrig" : `${Math.abs(remaining)} ${remaining > 0 ? "übrig" : "zu viel"}`;
  els.remainingText.classList.toggle("warning", remaining !== 0);
  els.submitBudget.disabled = remaining !== 0;

  categories.forEach((category) => {
    const value = document.querySelector(`#${category.id}`).value;
    document.querySelector(`#${category.id}Amount`).textContent = `${value} Mrd.`;
  });
}

function autoBalance() {
  let total = getTotal();
  let index = 0;

  while (total !== 100 && index < 800) {
    const category = categories[index % categories.length];
    const input = document.querySelector(`#${category.id}`);
    const value = Number(input.value);

    if (total > 100 && value > Number(input.min)) {
      input.value = value - 1;
      total -= 1;
    } else if (total < 100 && value < Number(input.max)) {
      input.value = value + 1;
      total += 1;
    }
    index += 1;
  }

  updateBudgetState();
}

function renderEvent() {
  const event = events[state.round];
  els.roundText.textContent = `${state.round + 1} / ${events.length}`;
  els.eventIcon.textContent = event.icon;
  els.eventTitle.textContent = event.title;
  els.eventText.textContent = event.text;
  els.eventEffects.innerHTML = event.effects
    .map(([label, impact]) => `<div class="effect"><span>${label}</span><strong>${impact}</strong></div>`)
    .join("");

  document.querySelectorAll(".budget-row").forEach((row) => {
    row.style.borderColor = row.dataset.category === event.focus ? "#efbd3f" : "var(--line)";
  });
}

function calculateRound(values) {
  const score = { people: 0, future: 0, stable: 0 };

  categories.forEach((category) => {
    const diff = values[category.id] - category.value;
    score.people += diff * category.weights.people;
    score.future += diff * category.weights.future;
    score.stable += diff * category.weights.stable;
  });

  const savings = values.zinsen - categories.find((category) => category.id === "zinsen").value;
  const newDebt = clamp(Math.round(16 - savings * 1.4), 0, 32);
  score.people += Math.max(0, 18 - values.zinsen) * 0.35;
  score.stable -= newDebt * 0.45;

  events[state.round].apply(values, score);

  return {
    score: {
      people: Math.round(score.people),
      future: Math.round(score.future),
      stable: Math.round(score.stable)
    },
    debt: newDebt
  };
}

function commitBudget() {
  const values = getValues();
  const result = calculateRound(values);
  const event = events[state.round];

  state.score.people = clamp(state.score.people + result.score.people);
  state.score.future = clamp(state.score.future + result.score.future);
  state.score.stable = clamp(state.score.stable + result.score.stable);
  state.debt += result.debt;

  const strongest = categories
    .map((category) => [category.name, values[category.id]])
    .sort((a, b) => b[1] - a[1])[0];
  state.notes.unshift(`${event.title}: Schwerpunkt ${strongest[0]} (${strongest[1]} Mrd.), neue Schulden ${result.debt} Mrd.`);

  state.round += 1;
  renderScores();
  renderLedger();

  if (state.round >= events.length) {
    showResult();
    return;
  }

  renderEvent();
}

function renderScores() {
  els.scorePeople.textContent = state.score.people;
  els.scoreFuture.textContent = state.score.future;
  els.scoreStable.textContent = state.score.stable;
  els.debtText.textContent = state.debt;
  setMeter(els.barPeople, state.score.people);
  setMeter(els.barFuture, state.score.future);
  setMeter(els.barStable, state.score.stable);
  setMeter(els.barDebt, clamp(state.debt, 0, 100), true);
}

function renderLedger() {
  els.ledgerList.innerHTML = state.notes
    .map((note) => `<li>${note}</li>`)
    .join("");
}

function showResult() {
  const average = Math.round((state.score.people + state.score.future + state.score.stable) / 3);
  const debtPenalty = state.debt > 70 ? "Die hohen neuen Schulden machen den nächsten Haushalt schwieriger." : "Die Schulden bleiben diskutierbar, aber nicht kostenlos.";

  els.resultTitle.textContent = average >= 70 ? "Starker Kompromiss" : average >= 52 ? "Knapp tragfähiger Haushalt" : "Schwieriger Haushalt";
  els.resultText.textContent = `${debtPenalty} Euer Ergebnis zeigt: Im Bundeshaushalt konkurrieren gute Ziele miteinander.`;
  els.resultGrid.innerHTML = [
    ["Zufriedenheit", state.score.people],
    ["Zukunft", state.score.future],
    ["Stabilität", state.score.stable],
    ["Neue Schulden", `${state.debt} Mrd.`]
  ].map(([label, value]) => `
    <div class="result-stat">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  if (typeof els.resultDialog.showModal === "function") {
    els.resultDialog.showModal();
  } else {
    alert(`${els.resultTitle.textContent}\n${els.resultText.textContent}`);
  }
}

function resetGame() {
  state.round = 0;
  state.score = { people: 50, future: 50, stable: 50 };
  state.debt = 0;
  state.notes = [];

  categories.forEach((category) => {
    const input = document.querySelector(`#${category.id}`);
    input.value = category.value;
  });

  els.resultDialog.close();
  updateBudgetState();
  renderScores();
  renderLedger();
  renderEvent();
}

renderInputs();
renderScores();
renderLedger();
renderEvent();
updateBudgetState();

els.autoBalance.addEventListener("click", autoBalance);
els.submitBudget.addEventListener("click", commitBudget);
els.restartGame.addEventListener("click", resetGame);
