const db=createDb();
let sessionId=getActiveSession()||randomSession(),rows=[],liveChannel=null,teacherPin="",locked=false,groupTarget=4,teacherTasks=[],teacherTaskIndex=0,teacherTaskRenderedIndex=-1,currentModuleId=SECTORS[0].id;
setActiveSession(sessionId);

async function loadTeacherTasks(){
  try{
    const text=await fetch("tablet.js",{cache:"no-store"}).then(response=>response.text()),match=text.match(/const TASKS=(\[[\s\S]*?\n\]);/);
    teacherTasks=sortTasksByLearningPath(match?Function(`"use strict";return (${match[1]});`)():[]);
  }catch(error){
    console.error(error);
    teacherTasks=[];
  }
  renderTeacherTaskSelect();
  renderTeacherTask();
}

function taskSolution(task){
  if(!task)return "";
  if(["choice","case","conflict","decode","rpg","trust"].includes(task.type))return task.answers?.[task.correct]||"";
  if(task.type==="mini")return(task.questions||[]).map(item=>item.answers[item.correct]).join(" · ");
  if(task.type==="levels")return(task.levels||[]).map(item=>item.answers[item.correct]).join(" · ");
  if(task.type==="word")return task.answer||"";
  if(task.type==="unlockword")return`${(task.challenges||[]).map(item=>item.answers[item.correct]).join(" · ")} → ${task.answer||""}`;
  if(task.type==="dialog")return task.answers?.[task.correct]||"";
  if(task.type==="chat")return(task.chat||[]).map(item=>item.choices[item.correct]).join(" · ");
  if(task.type==="wimmel")return(task.hotspots||[]).filter(item=>item.correct).map(item=>item.label).join(" · ");
  if(task.type==="path")return(task.steps||[]).map(item=>item.answers[item.correct]).join(" · ");
  if(task.type==="finalquest")return(task.phases||[]).map(item=>item.answers[item.correct]).join(" · ");
  if(["mark","quest"].includes(task.type))return(task.correct||[]).map(index=>task.answers[index]).join(" · ");
  if(["order","sort","puzzle","logic"].includes(task.type))return(task.correct||[]).join(" → ");
  if(["match","matrix","cards","compass"].includes(task.type))return(task.items||[]).map(([statement],index)=>`${statement} = ${task.correct?.[index]||""}`).join(" · ");
  if(task.type==="evidence")return`These: ${task.claims?.[task.correct?.[0]]||""} · Beleg: ${task.evidence?.[task.correct?.[1]]||""}`;
  if(task.type==="reflection")return"Offene Gruppennotiz ohne Zeichenminimum.";
  return"Keine Musterlösung hinterlegt.";
}

function taskTypeLabel(type){
  return{choice:"Einzelauswahl",mark:"Mehrfachauswahl",order:"Reihenfolge",match:"Zuordnung",matrix:"Einordnung",evidence:"These und Beleg",reflection:"Reflexion",sort:"Seligpreisungen ordnen",cards:"Karten deuten",case:"Fall anwenden",quest:"Moralquest",conflict:"Konfliktkarten",puzzle:"Puzzle-Spiel",compass:"Bitten-Kompass",trust:"Vertrauensquest",decode:"Entschlüsselung",logic:"Logikrätsel",rpg:"RPG-Finalquest",mini:"Kurzfragen-Sequenz",levels:"Levelspiel",word:"Wort-Rätsel",unlockword:"Buchstaben freischalten",dialog:"Dialogspiel",chat:"Chat-Simulation",wimmel:"Wimmelbild",path:"Mehrstufiger Lernpfad",finalquest:"Finalquest mit Begründung"}[type]||type;
}

function renderTeacherTaskSelect(){
  const select=document.getElementById("teacherTaskSelect");
  if(!select)return;
  select.innerHTML=teacherTasks.length?teacherTasks.map((task,index)=>{
    const sector=SECTORS.find(item=>item.id===task.sector),part=teacherTasks.slice(0,index+1).filter(item=>item.sector===task.sector).length;
    return`<option value="${index}">${index+1}. ${escapeHtml(sector?.name||task.sector)} · Teil ${part}: ${escapeHtml(task.title)}</option>`;
  }).join(""):"<option>Keine Aufgaben gefunden</option>";
  select.value=String(Math.min(teacherTaskIndex,Math.max(0,teacherTasks.length-1)));
}

function teacherHash(value){
  return String(value).split("").reduce((hash,char)=>((hash<<5)-hash+char.charCodeAt(0))|0,0);
}

function teacherShuffle(items,salt=""){
  return items.map((value,index)=>({value,index,sort:teacherHash(`${salt}:${index}:${JSON.stringify(value)}`)})).sort((a,b)=>a.sort-b.sort).map(item=>item);
}

function teacherStationPart(index){
  const task=teacherTasks[index];
  return{part:teacherTasks.slice(0,index+1).filter(item=>item.sector===task.sector).length,total:teacherTasks.filter(item=>item.sector===task.sector).length};
}

function teacherBibleMarkup(sectorId,open=true){
  const panel=BIBLE_PANELS[sectorId];
  if(!panel)return"";
  const text=panel.text.replace(/\[\[(.*?)\]\]/g,"<mark>$1</mark>");
  return`<details class="bible-panel" ${open?"open":""}><summary>Bibeltext-Hilfe: ${escapeHtml(panel.reference)}</summary><p>${text}</p>${(panel.notes||[]).map(note=>`<small>${escapeHtml(note)}</small>`).join("")}</details>`;
}

function teacherStoryMarkup(task,module,part){
  return`<details class="bible-panel story-panel" open><summary>Rahmenerzählung vor Spiel ${part.part}</summary><p>${escapeHtml(module.narrative)}</p><p>${escapeHtml(task.story)}</p></details>`;
}

function teacherProductMarkup(task,next){
  const finalInModule=!next||next.sector!==task.sector;
  if(!finalInModule)return"";
  return`<label class="reflection-label teacher-product-preview"><span>Merksatz für die Tafel</span><textarea placeholder="Als Gruppe würden Lernende hier ihren Merksatz formulieren."></textarea><small>Lehrkraft-Vorschau: Dieser Text wird hier nicht gespeichert.</small></label>`;
}

function teacherChoiceMarkup(task,multiple=false){
  const correct=Array.isArray(task.correct)?new Set(task.correct):new Set([task.correct]);
  return teacherShuffle(task.answers,task.id).map(item=>`<label class="answer"><input type="${multiple?"checkbox":"radio"}" name="teacher-answer" data-correct="${correct.has(item.index)?"true":"false"}"><span>${escapeHtml(item.value)}</span></label>`).join("");
}

function teacherAssignmentMarkup(task){
  return`<div class="assignment-game" data-assignment-type="${escapeHtml(task.type)}"><div class="assignment-slots">${task.items.map(([statement,correct],index)=>`<article class="match-card"><p>${escapeHtml(statement)}</p><button class="match-slot" type="button" data-correct="${escapeHtml(correct)}" data-slot="${index}"><span>Belegkarte ablegen</span></button></article>`).join("")}</div><div class="match-bank">${teacherShuffle(task.correct,`${task.id}:match`).map(item=>`<button class="match-token" type="button" data-value="${escapeHtml(item.value)}">${escapeHtml(item.value)}</button>`).join("")}</div><button class="mini-action reset-match" type="button">Zuordnung leeren</button></div>`;
}

function teacherPuzzleMarkup(task){
  return`<div class="puzzle-game"><div class="puzzle-slots">${task.correct.map((correct,index)=>`<button class="puzzle-slot" type="button" data-correct="${escapeHtml(correct)}" data-slot="${index}"><small>${index+1}</small><span>frei</span></button>`).join("")}</div><div class="puzzle-bank">${teacherShuffle(task.items,`${task.id}:puzzle`).map(item=>`<button class="puzzle-piece" type="button" data-value="${escapeHtml(item.value)}">${escapeHtml(item.value)}</button>`).join("")}</div><button class="mini-action reset-puzzle" type="button">Puzzle leeren</button></div>`;
}

function teacherLevelsMarkup(task){
  return`<div class="level-game">${task.levels.map((level,index)=>`<fieldset class="level-card"><legend>${escapeHtml(level.title)}</legend><p>${escapeHtml(level.q)}</p>${teacherShuffle(level.answers,`${task.id}:level:${index}`).map(answer=>`<label class="answer"><input type="radio" name="teacher-level-${index}" data-correct="${answer.index===level.correct?"true":"false"}"><span>${escapeHtml(answer.value)}</span></label>`).join("")}</fieldset>`).join("")}</div>`;
}

function teacherUnlockWordMarkup(task){
  return`<div class="unlock-word-game"><div class="letter-safe" data-word="${escapeHtml(task.clue)}" aria-live="polite">${task.clue.split("").map((letter,index)=>`<span data-letter-index="${index}">${index===0?escapeHtml(letter):"_"}</span>`).join("")}</div>${task.challenges.map((challenge,index)=>`<fieldset class="unlock-challenge" data-letters="${escapeHtml(challenge.letters)}"><legend>${index+1}. ${escapeHtml(challenge.q)}</legend>${teacherShuffle(challenge.answers,`${task.id}:unlock:${index}`).map(answer=>`<label class="answer"><input type="radio" name="teacher-unlock-${index}" data-correct="${answer.index===challenge.correct?"true":"false"}"><span>${escapeHtml(answer.value)}</span></label>`).join("")}</fieldset>`).join("")}<input class="word-input" name="teacher-word-answer" autocomplete="off" placeholder="Freigeschaltetes Schlüsselwort eingeben"><small>Jede richtige Teilentscheidung deckt Buchstaben auf. Am Ende muss das ganze Wort stimmen.</small></div>`;
}

function teacherChatMarkup(task){
  return`<div class="chat-game" aria-live="polite">${task.chat.map((step,index)=>`<section class="chat-step ${index?"hidden":""} ${index?"":"revealed"}" data-chat-step="${index}"><div class="chat-bubble incoming"><b>${escapeHtml(step.from)}</b><span>${escapeHtml(step.text)}</span></div><div class="chat-choices">${teacherShuffle(step.choices,`${task.id}:chat:${index}`).map(choice=>`<button class="chat-choice" type="button" data-correct="${choice.index===step.correct?"true":"false"}">${escapeHtml(choice.value)}</button>`).join("")}</div><div class="typing-dots hidden" data-typing-for="${index+1}" aria-label="schreibt"><i></i><i></i><i></i></div><div class="chat-bubble system hidden">${escapeHtml(step.reply)}</div></section>`).join("")}</div>`;
}

function teacherLogicMarkup(task){
  return`<div class="foundation-game"><div class="foundation-slots">${task.correct.map((correct,index)=>`<button class="logic-slot" type="button" data-correct="${escapeHtml(correct)}"><small>${index+1}</small><span>Baustein setzen</span></button>`).join("")}</div><div class="foundation-bank">${teacherShuffle(task.items,`${task.id}:logic`).map(item=>`<button class="logic-stone" type="button" data-value="${escapeHtml(item.value)}">${escapeHtml(item.value)}</button>`).join("")}</div><button class="mini-action reset-logic" type="button">Fundament neu bauen</button></div>`;
}

function teacherPathMarkup(task){
  return`<div class="path-game">${task.steps.map((step,index)=>`<fieldset class="path-card"><legend>${index+1}. ${escapeHtml(step.title)}</legend><p>${escapeHtml(step.q)}</p>${teacherShuffle(step.answers,`${task.id}:path:${index}`).map(answer=>`<label class="answer"><input type="radio" name="teacher-path-${index}" data-correct="${answer.index===step.correct?"true":"false"}"><span>${escapeHtml(answer.value)}</span></label>`).join("")}</fieldset>`).join("")}</div>`;
}

function teacherFinalQuestMarkup(task){
  return`<div class="module-context"><p>Lehrkraft-Vorschau: Im Tablet erscheinen hier zusätzlich die Karten, die diese Gruppe gesammelt hat.</p></div><div class="finalquest-game">${task.phases.map((phase,index)=>`<fieldset class="path-card"><legend>${index+1}. ${escapeHtml(phase.title)}</legend><p>${escapeHtml(phase.q)}</p>${teacherShuffle(phase.answers,`${task.id}:final:${index}`).map(answer=>`<label class="answer"><input type="radio" name="teacher-final-${index}" data-correct="${answer.index===phase.correct?"true":"false"}"><span>${escapeHtml(answer.value)}</span></label>`).join("")}</fieldset>`).join("")}<label class="reflection-label"><span>Begründung für die Plenumsarena</span><textarea placeholder="Wir bauen auf Fels, weil ..."></textarea><small>In der Vorschau wird nichts an die Tafel gesendet.</small></label></div>`;
}

function teacherWimmelMarkup(task){
  const targets=(task.hotspots||[]).filter(spot=>spot.correct);
  return`<div class="wimmel-brief"><p><b>Diese Symbole sucht ihr:</b></p><div class="wimmel-targets">${targets.map((spot,index)=>`<span data-target="${index}"><i>${escapeHtml(spot.symbol||"•")}</i>${escapeHtml(spot.label)}</span>`).join("")}</div></div><div class="wimmel-progress"><b id="teacherWimmelCount">0</b><span> / ${targets.length} Funde</span></div><div class="wimmel-game" role="group" aria-label="KI-Wimmelbild"><img class="wimmel-image" src="${escapeHtml(task.image)}" alt="Comic-Wimmelbild zur Bergpredigt und zum Vaterunser">${targets.map((spot,index)=>`<button class="wimmel-spot" type="button" data-index="${index}" data-symbol="${escapeHtml(spot.symbol||"•")}" data-label="${escapeHtml(spot.label)}" data-correct="true" style="--x:${spot.x}%;--y:${spot.y}%" aria-label="${escapeHtml(spot.label)} finden"><span>${escapeHtml(spot.label)}</span></button>`).join("")}</div><div class="found-shelf" aria-live="polite"><b>Fund-Regal</b><div>${targets.map((spot,index)=>`<span class="shelf-slot" data-shelf="${index}"><i>${escapeHtml(spot.symbol||"•")}</i><small>${escapeHtml(spot.label)}</small></span>`).join("")}</div></div>`;
}

function teacherAnswerMarkup(task){
  if(task.type==="levels")return teacherLevelsMarkup(task);
  if(task.type==="unlockword")return teacherUnlockWordMarkup(task);
  if(task.type==="chat")return teacherChatMarkup(task);
  if(task.type==="wimmel")return teacherWimmelMarkup(task);
  if(task.type==="path")return teacherPathMarkup(task);
  if(task.type==="finalquest")return teacherFinalQuestMarkup(task);
  if(task.type==="quest")return teacherChoiceMarkup(task,true);
  if(task.type==="puzzle")return teacherPuzzleMarkup(task);
  if(task.type==="logic")return teacherLogicMarkup(task);
  if(["match","cards"].includes(task.type))return teacherAssignmentMarkup(task);
  return teacherChoiceMarkup(task);
}

function teacherNormalizeWord(value){return String(value||"").trim().toLowerCase().replace(/\s+/g,"")}

function teacherPreviewCorrect(task,root){
  const checkedCorrect=name=>root.querySelector(`input[name="${name}"]:checked`)?.dataset.correct==="true";
  if(task.type==="levels")return task.levels.every((_,index)=>checkedCorrect(`teacher-level-${index}`));
  if(task.type==="unlockword"){
    const answer=teacherNormalizeWord(root.querySelector('[name="teacher-word-answer"]')?.value),valid=[task.answer,...(task.alternatives||[])].map(teacherNormalizeWord);
    return task.challenges.every((_,index)=>checkedCorrect(`teacher-unlock-${index}`))&&valid.includes(answer);
  }
  if(task.type==="chat")return task.chat.every((_,index)=>root.querySelector(`[data-chat-step="${index}"] .chat-choice.selected`)?.dataset.correct==="true");
  if(task.type==="wimmel")return[...root.querySelectorAll(".wimmel-spot")].every(button=>button.classList.contains("found"));
  if(task.type==="path")return task.steps.every((_,index)=>checkedCorrect(`teacher-path-${index}`));
  if(task.type==="finalquest")return task.phases.every((_,index)=>checkedCorrect(`teacher-final-${index}`));
  if(task.type==="quest"){const inputs=[...root.querySelectorAll('input[name="teacher-answer"]')];return inputs.some(input=>input.checked)&&inputs.every(input=>input.checked===(input.dataset.correct==="true"))}
  if(task.type==="puzzle")return[...root.querySelectorAll(".puzzle-slot")].every(slot=>slot.dataset.value&&slot.dataset.value===slot.dataset.correct);
  if(task.type==="logic")return[...root.querySelectorAll(".logic-slot")].every(slot=>slot.dataset.value&&slot.dataset.value===slot.dataset.correct);
  if(["match","cards"].includes(task.type))return[...root.querySelectorAll(".match-slot")].every(slot=>slot.dataset.value&&slot.dataset.value===slot.dataset.correct);
  return checkedCorrect("teacher-answer");
}

function teacherBindPreview(task){
  const root=document.getElementById("teacherTaskView");
  if(!root)return;
  const place=(slot,button,emptyText)=>{
    if(!slot||!button)return;
    slot.dataset.value=button.dataset.value;
    slot.querySelector("span").textContent=button.dataset.value;
    button.disabled=true;
  };
  const clearSlot=(slot,selector,emptyText)=>{
    if(!slot?.dataset.value)return;
    const button=[...root.querySelectorAll(selector)].find(item=>item.dataset.value===slot.dataset.value&&item.disabled);
    if(button)button.disabled=false;
    delete slot.dataset.value;
    slot.querySelector("span").textContent=emptyText;
  };
  root.querySelectorAll(".puzzle-piece").forEach(piece=>piece.addEventListener("click",()=>place([...root.querySelectorAll(".puzzle-slot")].find(item=>!item.dataset.value),piece,"frei")));
  root.querySelectorAll(".puzzle-slot").forEach(slot=>slot.addEventListener("click",()=>clearSlot(slot,".puzzle-piece","frei")));
  root.querySelector(".reset-puzzle")?.addEventListener("click",()=>{root.querySelectorAll(".puzzle-slot").forEach(slot=>{delete slot.dataset.value;slot.querySelector("span").textContent="frei"});root.querySelectorAll(".puzzle-piece").forEach(piece=>piece.disabled=false)});
  root.querySelectorAll(".match-token").forEach(token=>token.addEventListener("click",()=>place([...root.querySelectorAll(".match-slot")].find(item=>!item.dataset.value),token,"Belegkarte ablegen")));
  root.querySelectorAll(".match-slot").forEach(slot=>slot.addEventListener("click",()=>clearSlot(slot,".match-token","Belegkarte ablegen")));
  root.querySelector(".reset-match")?.addEventListener("click",()=>{root.querySelectorAll(".match-slot").forEach(slot=>{delete slot.dataset.value;slot.querySelector("span").textContent="Belegkarte ablegen"});root.querySelectorAll(".match-token").forEach(token=>token.disabled=false)});
  root.querySelectorAll(".logic-stone").forEach(stone=>stone.addEventListener("click",()=>place([...root.querySelectorAll(".logic-slot")].find(item=>!item.dataset.value),stone,"Baustein setzen")));
  root.querySelectorAll(".logic-slot").forEach(slot=>slot.addEventListener("click",()=>clearSlot(slot,".logic-stone","Baustein setzen")));
  root.querySelector(".reset-logic")?.addEventListener("click",()=>{root.querySelectorAll(".logic-slot").forEach(slot=>{delete slot.dataset.value;slot.querySelector("span").textContent="Baustein setzen"});root.querySelectorAll(".logic-stone").forEach(stone=>stone.disabled=false)});
  const updateLetters=()=>{const safe=root.querySelector(".letter-safe");if(!safe)return;const word=safe.dataset.word||"",revealed=new Set([0]);let cursor=1;root.querySelectorAll(".unlock-challenge").forEach(challenge=>{const checked=challenge.querySelector("input:checked"),count=String(challenge.dataset.letters||"").length;if(checked?.dataset.correct==="true")for(let i=0;i<count;i++)revealed.add(cursor+i);cursor+=count});[...safe.querySelectorAll("span")].forEach((span,index)=>span.textContent=revealed.has(index)?word[index]:"_")};
  root.querySelectorAll(".unlock-challenge input").forEach(input=>input.addEventListener("change",updateLetters));
  root.querySelectorAll(".chat-choice").forEach(button=>button.addEventListener("click",()=>{const step=button.closest(".chat-step"),index=Number(step?.dataset.chatStep||0);step.querySelectorAll(".chat-choice").forEach(item=>item.classList.remove("selected","wrong"));button.classList.add("selected");if(button.dataset.correct==="true"){step.querySelectorAll(".chat-choice").forEach(item=>item.disabled=true);step.querySelector(".chat-bubble.system")?.classList.remove("hidden");const next=root.querySelector(`[data-chat-step="${index+1}"]`),typing=step.querySelector(`[data-typing-for="${index+1}"]`);if(next&&next.classList.contains("hidden")){typing?.classList.remove("hidden");setTimeout(()=>{typing?.classList.add("hidden");next.classList.remove("hidden");requestAnimationFrame(()=>next.classList.add("revealed"));next.scrollIntoView({behavior:"smooth",block:"nearest"})},650)}}else button.classList.add("wrong")}));
  const updateWimmel=()=>{const found=[...root.querySelectorAll(".wimmel-spot.found")],count=root.querySelector("#teacherWimmelCount");if(count)count.textContent=String(found.length);root.querySelectorAll(".wimmel-targets [data-target]").forEach(target=>target.classList.toggle("found",!!root.querySelector(`.wimmel-spot.found[data-index="${target.dataset.target}"]`)));root.querySelectorAll(".shelf-slot").forEach(slot=>{const foundButton=root.querySelector(`.wimmel-spot.found[data-index="${slot.dataset.shelf}"]`);slot.classList.toggle("filled",!!foundButton);if(foundButton){slot.querySelector("i").textContent=foundButton.dataset.symbol||"•";slot.querySelector("small").textContent=foundButton.dataset.label||foundButton.textContent.trim()}})};
  root.querySelectorAll(".wimmel-spot").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();if(button.classList.contains("found"))return;button.classList.add("found");button.disabled=true;updateWimmel()}));
  root.querySelector("#teacherPreviewReset")?.addEventListener("click",renderTeacherTask);
  root.querySelector("#teacherPreviewCheck")?.addEventListener("click",()=>{const feedback=root.querySelector("#teacherPreviewFeedback"),ok=teacherPreviewCorrect(task,root);feedback.className=`feedback ${ok?"good":"bad"}`;feedback.textContent=ok?"So würde das Tablet die Aufgabe als richtig werten.":"So wäre die Aufgabe im Tablet noch nicht korrekt gelöst."});
  root.querySelector("#teacherPreviewSolution")?.addEventListener("click",()=>teacherShowPreviewSolution(task,root));
}

function teacherShowPreviewSolution(task,root){
  root.querySelectorAll("input").forEach(input=>{input.checked=input.dataset.correct==="true"});
  root.querySelectorAll(".puzzle-slot,.match-slot,.logic-slot").forEach(slot=>{const value=slot.dataset.correct;slot.dataset.value=value;slot.querySelector("span").textContent=value});
  root.querySelectorAll(".puzzle-piece,.match-token,.logic-stone").forEach(button=>button.disabled=true);
  root.querySelectorAll(".chat-step").forEach(step=>{step.classList.remove("hidden");step.classList.add("revealed");step.querySelector(".chat-bubble.system")?.classList.remove("hidden");step.querySelectorAll(".chat-choice").forEach(choice=>{choice.classList.toggle("selected",choice.dataset.correct==="true");choice.disabled=choice.dataset.correct==="true"})});
  root.querySelectorAll(".wimmel-spot").forEach(button=>{button.classList.add("found");button.disabled=true});
  const word=root.querySelector('[name="teacher-word-answer"]');if(word)word.value=task.answer||"";
  root.querySelectorAll(".letter-safe span").forEach((span,index)=>span.textContent=(root.querySelector(".letter-safe")?.dataset.word||"")[index]||"");
  root.querySelector("#teacherPreviewFeedback").className="feedback good";
  root.querySelector("#teacherPreviewFeedback").textContent="Musterlösung ist in der Vorschau markiert.";
}

function renderTeacherTask(){
  const view=document.getElementById("teacherTaskView");
  if(!view)return;
  if(!teacherTasks.length){
    view.innerHTML="<p>Die Aufgaben konnten noch nicht geladen werden.</p>";
    return;
  }
  teacherTaskIndex=Math.max(0,Math.min(teacherTaskIndex,teacherTasks.length-1));
  const task=teacherTasks[teacherTaskIndex],next=teacherTasks[teacherTaskIndex+1],sector=SECTORS.find(item=>item.id===task.sector),module=moduleFor(task.sector,rows),part=teacherStationPart(teacherTaskIndex);
  document.getElementById("teacherTaskSelect").value=String(teacherTaskIndex);
  view.className=`teacher-task-view task-card task-type-${task.type} teacher-tablet-preview`;
  view.innerHTML=`<div class="station-header"><span class="station-number">${escapeHtml(sector?.name||task.sector)} · Spiel ${part.part}/${part.total} · Schwierigkeit ${task.difficulty}</span><b>${escapeHtml(taskSkillLabel(task))}</b><span class="teacher-preview-pill">Lehrkraft-Vorschau</span></div><p class="coop-note">Diese Ansicht entspricht dem Tabletmodus. Prüfen und Lösung markieren bleiben lokal und speichern keinen Fortschritt.</p>${teacherStoryMarkup(task,module,part)}${teacherBibleMarkup(task.sector,part.part===1)}<h2>${escapeHtml(task.title)}</h2><h3>${escapeHtml(task.question)}</h3><div class="answers">${teacherAnswerMarkup(task)}</div>${teacherProductMarkup(task,next)}<div class="feedback hidden" id="teacherPreviewFeedback" aria-live="polite"></div><div class="task-actions teacher-preview-actions"><button class="comic-button" id="teacherPreviewCheck" type="button">Wie Tablet prüfen</button><button class="comic-button" id="teacherPreviewSolution" type="button">Lösung markieren</button><button class="comic-button change-group" id="teacherPreviewReset" type="button">Vorschau zurücksetzen</button></div><details open class="teacher-solution-box"><summary>Musterlösung und didaktischer Blick</summary><p><b>Musterlösung:</b> ${escapeHtml(taskSolution(task))}</p><p><b>Hinweis im Tablet:</b> ${escapeHtml(task.hint||"")}</p><p><b>Lehrkraft-Impuls:</b> ${escapeHtml(module.teacherMove)}</p></details>`;
  teacherTaskRenderedIndex=teacherTaskIndex;
  teacherBindPreview(task);
}

function stepTeacherTask(delta){
  teacherTaskIndex=Math.max(0,Math.min(teacherTaskIndex+delta,teacherTasks.length-1));
  renderTeacherTask();
}

function renderModuleSelect(){
  const select=document.getElementById("moduleSelect");
  if(!select)return;
  select.innerHTML=SECTORS.map((sector,index)=>`<option value="${sector.id}">${index+1}. ${escapeHtml(sector.name)}</option>`).join("");
  select.value=currentModuleId;
}
function renderFeedbackSelect(){
  const select=document.getElementById("feedbackSectorSelect");
  if(!select)return;
  select.innerHTML=SECTORS.map(sector=>`<option value="${sector.id}">${escapeHtml(sector.name)}</option>`).join("");
  select.value=SECTORS[0].id;
}

function renderModuleEditor(){
  const module=moduleFor(currentModuleId,rows);
  document.getElementById("moduleTitleInput").value=module.title;
  document.getElementById("moduleObjectiveInput").value=module.objective;
  document.getElementById("moduleNarrativeInput").value=module.narrative;
  document.getElementById("moduleTeacherMoveInput").value=module.teacherMove;
  document.getElementById("moduleError").classList.add("hidden");
}

function renderLinks(){
  const tablet=sessionUrl("tablet.html",sessionId),board=sessionUrl("tafel.html",sessionId);
  document.getElementById("teacherSession").textContent=sessionId;
  document.getElementById("tabletUrl").value=tablet;
  document.getElementById("openBoard").href=board;
  document.getElementById("qrImage").src=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(tablet)}`;
}

function groupMap(includeExcluded=true){
  const groups=new Map();
  groupAvatarsFromRows(rows).forEach((avatar,group)=>groups.set(group,new Set()));
  rows.filter(row=>row.sektor!=="finale"&&row.sektor!=="control"&&row.gruppen_id!=="lehrkraft").forEach(row=>{
    if(!includeExcluded&&isGroupExcluded(rows,row.gruppen_id))return;
    if(!groups.has(row.gruppen_id))groups.set(row.gruppen_id,new Set());
    groups.get(row.gruppen_id).add(row.sektor);
  });
  excludedGroups(rows).forEach(group=>{if(!groups.has(group))groups.set(group,new Set())});
  return groups;
}

function renderAnalytics(groups,completion){
  const active=[...groups].filter(([group])=>!isGroupExcluded(rows,group)),discovered=active.map(([,set])=>set.size),activeGroups=active.length,avg=activeGroups?(discovered.reduce((a,b)=>a+b,0)/activeGroups).toFixed(1):"0.0";
  const bottleneck=SECTORS.map(sector=>({sector,state:completion.get(sector.id)})).sort((a,b)=>a.state.ratio-b.state.ratio)[0];
  const ready=sectorGroupCounts(rows).get("nazareth")?.size||0,target=effectiveGroupTargetFromRows(rows);
  document.getElementById("teacherAnalytics").innerHTML=`<div class="analytics-grid"><span><b>${activeGroups}</b> aktive Gruppen</span><span><b>${excludedGroups(rows).size}</b> ausgeschlossen</span><span><b>${avg}</b> Ø Stationen</span><span><b>${ready}/${target}</b> finale Beiträge</span><span><b>${bottleneck?.sector.name||"n/a"}</b> Engstelle</span></div>`;
}
function renderProductGallery(){
  const gallery=document.getElementById("productGallery");
  if(!gallery)return;
  const products=productRows(rows).slice(-18).reverse();
  gallery.innerHTML=products.length?products.map(item=>{const sector=SECTORS.find(s=>s.id===item.sector);return`<article><p class="comic-kicker">${escapeHtml(sector?.name||item.sector)}</p><p>${escapeHtml(item.text)}</p><small>${escapeHtml(item.group)}</small></article>`}).join(""):"<p>Noch keine Merksätze eingegangen.</p>";
}
function renderDiagnostics(){
  const view=document.getElementById("diagnosticsView");
  if(!view)return;
  const diagnostics=diagnosticSummary(rows);
  view.innerHTML=diagnostics.length?`<div class="diagnostic-list">${diagnostics.map(item=>{const sector=SECTORS.find(s=>s.id===item.sector);return`<div><b>${escapeHtml(sector?.name||item.sector)} · ${escapeHtml(taskTypeLabel(item.type))}</b><span>${item.count} Fehlversuche · ${item.groups.size} Gruppen</span></div>`}).join("")}</div>`:"<p>Keine Fehlversuche gemeldet.</p>";
}

function renderGroups(){
  locked=isSessionLocked(rows);
  groupTarget=groupTargetFromRows(rows)||groupTarget;
  const phase=activePhase(rows),prompt=activePrompt(rows),groups=groupMap(true),completion=sectorCompletion(rows),workMode=activeWorkMode(rows),avatars=groupAvatarsFromRows(rows),activeTarget=effectiveGroupTargetFromRows(rows);
  document.getElementById("groupCountInput").value=groupTarget;
  document.getElementById("workModeSelect").value=workMode;
  document.getElementById("workModeHint").textContent=WORK_MODES[workMode].hint;
  document.getElementById("sessionState").textContent=`${controlLabel(rows)} · ${WORK_MODES[workMode].name} · ${activeTarget}/${groupTarget} aktive Gruppen zählen`;
  document.getElementById("sessionState").classList.toggle("locked",locked);
  document.getElementById("phaseState").textContent=`Aktuelle Phase: ${phase}`;
  document.getElementById("promptInput").placeholder=prompt?`Letzter Auftrag: ${prompt}`:"Kurzen Auftrag an alle Tablets senden ...";
  document.getElementById("toggleLock").textContent=locked?"Expedition entsperren":"Expedition sperren";
  document.getElementById("toggleLock").classList.toggle("unlock-button",locked);
  document.getElementById("teacherGroups").innerHTML=groups.size?[...groups].sort(([a],[b])=>a.localeCompare(b)).map(([group,sectors])=>{
    const excluded=isGroupExcluded(rows,group),avatar=avatarById(avatars.get(group));
    return`<div class="group-progress ${excluded?"excluded":""}"><b><span class="avatar-token tiny" style="--avatar-pos:${avatar.pos}"></span>${escapeHtml(group)}</b><span>${excluded?"ausgeschlossen":`${sectors.size} / ${SECTORS.length}`}</span><div class="mini-track"><i style="width:${excluded?0:sectors.size/SECTORS.length*100}%"></i></div><button class="mini-action" data-group-toggle="${escapeHtml(group)}">${excluded?"Wieder zulassen":"Ausschließen"}</button></div>`;
  }).join(""):"<p>Noch keine Gruppe hat sich angemeldet oder eine Station abgeschlossen.</p>";
  document.getElementById("teacherGroups").innerHTML+=`<div class="coop-summary">${SECTORS.map(sector=>{const state=completion.get(sector.id);return`<span class="${state.complete?"done":""}">${sector.name}: ${state.count}/${state.required}</span>`}).join("")}</div>`;
  document.querySelectorAll("[data-group-toggle]").forEach(button=>button.addEventListener("click",()=>toggleGroupExclusion(button.dataset.groupToggle)));
  renderAnalytics(groups,completion);
  renderProductGallery();
  renderDiagnostics();
  const ready=bossFinaleReady(rows);
  document.getElementById("finaleGate").classList.toggle("hidden",ready);
  document.getElementById("finaleGate").textContent="Finale startet erst, wenn alle aktiven Gruppen die Module abgeschlossen haben.";
  document.getElementById("startFinale").disabled=!ready;
  const done=completedSectorIds(rows);
  const focus=activeFocus(rows);
  document.getElementById("manualUnlock").innerHTML=SECTORS.map(sector=>`<button class="comic-button ${focus===sector.id?"done-button":""}" data-focus="${sector.id}">${focus===sector.id?"Fokus: ":""}${sector.name}</button>`).join("");
  document.querySelectorAll("[data-focus]").forEach(button=>button.addEventListener("click",()=>setBoardFocus(button.dataset.focus)));
  if(!document.activeElement?.closest?.(".teacher-module-panel"))renderModuleEditor();
  if(!document.activeElement?.closest?.("#teacherTaskView"))renderTeacherTask();
}

async function refresh(){rows=await readProgress(db,sessionId);renderGroups()}
async function setBoardFocus(sector){await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"prompt",payload:`focus:${sector}`},{teacherPin});const module=moduleFor(sector,rows);await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"prompt",payload:`Tafel-Fokus: ${module.title}. Prüft eure Karten und sucht einen Bibelbeleg.`},{teacherPin});await refresh()}
async function sendFinale(){
  if(!bossFinaleReady(rows)){document.getElementById("finaleGate").classList.remove("hidden");return}
  await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"finale",status:"erledigt",event_type:"finale"},{teacherPin});
  document.getElementById("startFinale").textContent="Finale gesendet";
}
async function toggleLock(){const next=locked?"unlock":"lock";await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:next},{teacherPin});await refresh()}
async function saveGroupCount(){groupTarget=Math.max(1,Math.min(12,Number(document.getElementById("groupCountInput").value)||1));await markDone(db,{session_id:sessionId,gruppen_id:`gruppen-${groupTarget}`,sektor:"control",status:"erledigt",event_type:"groups"},{teacherPin});await refresh()}
async function saveWorkMode(){const mode=WORK_MODES[document.getElementById("workModeSelect").value]?.id||"standard";await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"manual",payload:`mode:${mode}`},{teacherPin});await refresh()}
async function setPhase(phase){await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"phase",payload:phase},{teacherPin});await refresh()}
async function sendPrompt(){
  const input=document.getElementById("promptInput"),payload=input.value.trim().slice(0,420);
  if(!payload)return;
  await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"prompt",payload},{teacherPin});
  input.value="";
  await refresh();
}
async function sendFeedback(){
  const sector=document.getElementById("feedbackSectorSelect").value,text=document.getElementById("feedbackInput").value.trim().replace(/\s+/g," ").slice(0,300);
  if(!sector||!text)return;
  await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"prompt",payload:`feedback:${sector}:${text}`},{teacherPin});
  document.getElementById("feedbackInput").value="";
  await refresh();
}
async function toggleGroupExclusion(group){
  const action=isGroupExcluded(rows,group)?"include":"exclude";
  await markDone(db,{session_id:sessionId,gruppen_id:group,sektor:"control",status:"erledigt",event_type:"groups",payload:`group:${action}`},{teacherPin});
  await refresh();
}
async function saveModule(){
  const error=document.getElementById("moduleError"),data={
    title:document.getElementById("moduleTitleInput").value.trim().slice(0,58),
    objective:document.getElementById("moduleObjectiveInput").value.trim().slice(0,92),
    narrative:document.getElementById("moduleNarrativeInput").value.trim().slice(0,96),
    teacherMove:document.getElementById("moduleTeacherMoveInput").value.trim().slice(0,80)
  };
  const payload=`module:${currentModuleId}:${JSON.stringify(data)}`;
  if(payload.length>420){error.textContent="Das Modul ist noch zu lang. Bitte die Texte etwas kürzen.";error.classList.remove("hidden");return}
  await markDone(db,{session_id:sessionId,gruppen_id:`module-${currentModuleId}`,sektor:"control",status:"erledigt",event_type:"groups",payload},{teacherPin});
  await refresh();
}
async function resetModule(){
  await markDone(db,{session_id:sessionId,gruppen_id:`module-${currentModuleId}`,sektor:"control",status:"erledigt",event_type:"groups",payload:`module:${currentModuleId}:reset`},{teacherPin});
  await refresh();
}
function subscribe(){if(!db)return;if(liveChannel)db.removeChannel(liveChannel);liveChannel=db.channel(`teacher-${sessionId}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"fortschritt",filter:`session_id=eq.${sessionId}`},()=>refresh()).subscribe()}
async function startSession(){const wantedMode=document.getElementById("workModeSelect").value||"standard";sessionId=randomSession();rows=[];setActiveSession(sessionId);history.replaceState({},"",`?session=${sessionId}`);renderLinks();renderGroups();document.getElementById("workModeSelect").value=wantedMode;subscribe();await saveGroupCount();await saveWorkMode();await setPhase("Einzelarbeit")}
function openDashboard(){document.getElementById("teacherLogin").classList.add("hidden");document.getElementById("teacherDashboard").classList.remove("hidden");renderLinks();renderModuleSelect();renderFeedbackSelect();loadTeacherTasks();refresh();subscribe()}

document.getElementById("pinForm").addEventListener("submit",event=>{event.preventDefault();teacherPin=document.getElementById("pinInput").value;if(teacherPin!==String(window.BERG_CONFIG?.TEACHER_PIN||"2468")){document.getElementById("pinError").classList.remove("hidden");return}openDashboard()});
document.getElementById("newSession").addEventListener("click",startSession);
document.getElementById("saveGroupCount").addEventListener("click",saveGroupCount);
document.getElementById("saveWorkMode").addEventListener("click",saveWorkMode);
document.getElementById("toggleLock").addEventListener("click",toggleLock);
document.getElementById("startFinale").addEventListener("click",sendFinale);
document.getElementById("sendPrompt").addEventListener("click",sendPrompt);
document.getElementById("sendFeedback").addEventListener("click",sendFeedback);
document.querySelectorAll("[data-phase]").forEach(button=>button.addEventListener("click",()=>setPhase(button.dataset.phase)));
document.getElementById("prevTeacherTask").addEventListener("click",()=>stepTeacherTask(-1));
document.getElementById("nextTeacherTask").addEventListener("click",()=>stepTeacherTask(1));
document.getElementById("teacherTaskSelect").addEventListener("change",event=>{teacherTaskIndex=Number(event.target.value)||0;renderTeacherTask()});
document.getElementById("moduleSelect").addEventListener("change",event=>{currentModuleId=event.target.value;renderModuleEditor();teacherTaskIndex=Math.max(0,teacherTasks.findIndex(task=>task.sector===currentModuleId));renderTeacherTask()});
document.getElementById("saveModule").addEventListener("click",saveModule);
document.getElementById("resetModule").addEventListener("click",resetModule);
document.getElementById("copyTabletUrl").addEventListener("click",async()=>{const field=document.getElementById("tabletUrl");try{await navigator.clipboard.writeText(field.value);document.getElementById("copyTabletUrl").textContent="Link kopiert"}catch{field.focus();field.select()}});
setConnectionStatus(db?"Live verbunden":"Demo-Modus",Boolean(db));
