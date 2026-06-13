const db=createDb();
let sessionId=getActiveSession()||randomSession(),rows=[],liveChannel=null,teacherPin="",locked=false,groupTarget=4,teacherTasks=[],teacherTaskIndex=0,currentModuleId=SECTORS[0].id;
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

function renderTeacherTask(){
  const view=document.getElementById("teacherTaskView");
  if(!view)return;
  if(!teacherTasks.length){
    view.innerHTML="<p>Die Aufgaben konnten noch nicht geladen werden.</p>";
    return;
  }
  teacherTaskIndex=Math.max(0,Math.min(teacherTaskIndex,teacherTasks.length-1));
  const task=teacherTasks[teacherTaskIndex],sector=SECTORS.find(item=>item.id===task.sector),module=moduleFor(task.sector,rows),part=teacherTasks.slice(0,teacherTaskIndex+1).filter(item=>item.sector===task.sector).length,total=teacherTasks.filter(item=>item.sector===task.sector).length;
  document.getElementById("teacherTaskSelect").value=String(teacherTaskIndex);
  view.innerHTML=`<p class="comic-kicker">${escapeHtml(module.title)} · Teil ${part}/${total}</p><h3>${escapeHtml(task.title)}</h3><p class="session-state">${escapeHtml(taskTypeLabel(task.type))} · ${escapeHtml(taskSkillLabel(task))}</p><p><b>Modulziel:</b> ${escapeHtml(module.objective)}</p><p><b>Situation:</b> ${escapeHtml(task.story)}</p><p class="source">${escapeHtml(task.source)}</p><p><b>Auftrag:</b> ${escapeHtml(task.question)}</p><details open><summary>Musterlösung anzeigen</summary><p>${escapeHtml(taskSolution(task))}</p></details><details><summary>Didaktischer Hinweis</summary><p>${escapeHtml(task.hint||"")}</p><p>${escapeHtml(module.teacherMove)}</p></details>`;
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
  renderTeacherTask();
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
