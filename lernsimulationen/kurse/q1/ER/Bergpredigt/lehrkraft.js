const db=createDb();
let sessionId=getActiveSession()||randomSession(),rows=[],liveChannel=null,teacherPin="",locked=false,groupTarget=4,teacherTasks=[],teacherTaskIndex=0;
setActiveSession(sessionId);

async function loadTeacherTasks(){
  try{
    const text=await fetch("tablet.js",{cache:"no-store"}).then(response=>response.text()),match=text.match(/const TASKS=(\[[\s\S]*?\n\]);/);
    teacherTasks=match?Function(`"use strict";return (${match[1]});`)():[];
  }catch(error){
    console.error(error);
    teacherTasks=[];
  }
  renderTeacherTaskSelect();
  renderTeacherTask();
}

function taskSolution(task){
  if(!task)return "";
  if(task.type==="choice")return task.answers?.[task.correct]||"";
  if(task.type==="mark")return (task.correct||[]).map(index=>task.answers[index]).join(" · ");
  if(task.type==="order")return (task.correct||[]).join(" → ");
  if(task.type==="match"||task.type==="matrix")return (task.items||[]).map(([statement,category])=>`${statement} = ${category}`).join(" · ");
  if(task.type==="evidence")return `These: ${task.claims?.[task.correct?.[0]]||""} · Beleg: ${task.evidence?.[task.correct?.[1]]||""}`;
  if(task.type==="reflection")return `Offene Gruppennotiz, mindestens ${task.minChars} Zeichen.`;
  return "Keine Musterlösung hinterlegt.";
}

function taskTypeLabel(type){
  return {choice:"Einzelauswahl",mark:"Mehrfachauswahl",order:"Reihenfolge",match:"Zuordnung",matrix:"Einordnung",evidence:"These und Beleg",reflection:"Reflexion"}[type]||type;
}

function renderTeacherTaskSelect(){
  const select=document.getElementById("teacherTaskSelect");
  if(!select)return;
  select.innerHTML=teacherTasks.length?teacherTasks.map((task,index)=>{
    const sector=SECTORS.find(item=>item.id===task.sector),part=teacherTasks.slice(0,index+1).filter(item=>item.sector===task.sector).length;
    return `<option value="${index}">${index+1}. ${escapeHtml(sector?.name||task.sector)} · Teil ${part}: ${escapeHtml(task.title)}</option>`;
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
  const task=teacherTasks[teacherTaskIndex],sector=SECTORS.find(item=>item.id===task.sector),part=teacherTasks.slice(0,teacherTaskIndex+1).filter(item=>item.sector===task.sector).length,total=teacherTasks.filter(item=>item.sector===task.sector).length;
  document.getElementById("teacherTaskSelect").value=String(teacherTaskIndex);
  view.innerHTML=`<p class="comic-kicker">${escapeHtml(sector?.name||task.sector)} · Teil ${part}/${total}</p><h3>${escapeHtml(task.title)}</h3><p class="session-state">${escapeHtml(taskTypeLabel(task.type))}</p><p><b>Situation:</b> ${escapeHtml(task.story)}</p><p class="source">${escapeHtml(task.source)}</p><p><b>Auftrag:</b> ${escapeHtml(task.question)}</p><details open><summary>Musterlösung anzeigen</summary><p>${escapeHtml(taskSolution(task))}</p></details><details><summary>Hinweis für Gruppen</summary><p>${escapeHtml(task.hint||"")}</p></details>`;
}

function stepTeacherTask(delta){
  teacherTaskIndex=Math.max(0,Math.min(teacherTaskIndex+delta,teacherTasks.length-1));
  renderTeacherTask();
}

function renderLinks(){
  const tablet=sessionUrl("tablet.html",sessionId),board=sessionUrl("tafel.html",sessionId);
  document.getElementById("teacherSession").textContent=sessionId;
  document.getElementById("tabletUrl").value=tablet;
  document.getElementById("openBoard").href=board;
  document.getElementById("qrImage").src=`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(tablet)}`;
}

function groupMap(){
  const groups=new Map();
  rows.filter(row=>row.sektor!=="finale"&&row.sektor!=="control"&&row.gruppen_id!=="lehrkraft").forEach(row=>{
    if(!groups.has(row.gruppen_id))groups.set(row.gruppen_id,new Set());
    groups.get(row.gruppen_id).add(row.sektor);
  });
  return groups;
}

function renderAnalytics(groups,completion){
  const discovered=[...groups.values()].map(set=>set.size),activeGroups=groups.size,avg=activeGroups?(discovered.reduce((a,b)=>a+b,0)/activeGroups).toFixed(1):"0.0";
  const bottleneck=SECTORS.map(sector=>({sector,state:completion.get(sector.id)})).sort((a,b)=>a.state.ratio-b.state.ratio)[0];
  const ready=sectorGroupCounts(rows).get("tiberias")?.size||0;
  document.getElementById("teacherAnalytics").innerHTML=`<div class="analytics-grid"><span><b>${activeGroups}</b> aktive Gruppen</span><span><b>${avg}</b> Ø Stationen</span><span><b>${ready}/${groupTarget}</b> finale Gruppen</span><span><b>${bottleneck?.sector.name||"n/a"}</b> Engstelle</span></div>`;
}

function renderGroups(){
  locked=isSessionLocked(rows);
  groupTarget=groupTargetFromRows(rows)||groupTarget;
  const phase=activePhase(rows),prompt=activePrompt(rows),groups=groupMap(),completion=sectorCompletion(rows);
  document.getElementById("groupCountInput").value=groupTarget;
  document.getElementById("sessionState").textContent=`${controlLabel(rows)} · ${groupTarget} ${groupTarget===1?"Gruppe":"Gruppen"}`;
  document.getElementById("sessionState").classList.toggle("locked",locked);
  document.getElementById("phaseState").textContent=`Aktuelle Phase: ${phase}`;
  document.getElementById("promptInput").placeholder=prompt?`Letzter Auftrag: ${prompt}`:"Kurzen Auftrag an alle Tablets senden ...";
  document.getElementById("toggleLock").textContent=locked?"Expedition entsperren":"Expedition sperren";
  document.getElementById("toggleLock").classList.toggle("unlock-button",locked);
  document.getElementById("teacherGroups").innerHTML=groups.size?[...groups].map(([group,sectors])=>`<div class="group-progress"><b>${group}</b><span>${sectors.size} / ${SECTORS.length}</span><div class="mini-track"><i style="width:${sectors.size/SECTORS.length*100}%"></i></div></div>`).join(""):"<p>Noch keine Gruppe hat eine Station abgeschlossen.</p>";
  document.getElementById("teacherGroups").innerHTML+=`<div class="coop-summary">${SECTORS.map(sector=>{const state=completion.get(sector.id);return `<span class="${state.complete?"done":""}">${sector.name}: ${state.count}/${state.required}</span>`}).join("")}</div>`;
  renderAnalytics(groups,completion);
  const ready=bossFinaleReady(rows);
  document.getElementById("finaleGate").classList.toggle("hidden",ready);
  document.getElementById("startFinale").disabled=!ready;
  const done=completedSectorIds(rows);
  document.getElementById("manualUnlock").innerHTML=SECTORS.map(sector=>`<button class="comic-button ${done.has(sector.id)?"done-button":""}" data-unlock="${sector.id}" ${done.has(sector.id)?"disabled":""}>${done.has(sector.id)?"✓ ":""}${sector.name}</button>`).join("");
  document.querySelectorAll("[data-unlock]").forEach(button=>button.addEventListener("click",()=>unlock(button.dataset.unlock)));
}

async function refresh(){rows=await readProgress(db,sessionId);renderGroups()}
async function unlock(sector){await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor,status:"erledigt",event_type:"manual"},{teacherPin});await refresh()}
async function sendFinale(){
  if(!bossFinaleReady(rows)){document.getElementById("finaleGate").classList.remove("hidden");return}
  await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"finale",status:"erledigt",event_type:"finale"},{teacherPin});
  document.getElementById("startFinale").textContent="Finale gesendet";
}
async function toggleLock(){const next=locked?"unlock":"lock";await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:next},{teacherPin});await refresh()}
async function saveGroupCount(){groupTarget=Math.max(1,Math.min(12,Number(document.getElementById("groupCountInput").value)||1));await markDone(db,{session_id:sessionId,gruppen_id:`gruppen-${groupTarget}`,sektor:"control",status:"erledigt",event_type:"groups"},{teacherPin});await refresh()}
async function setPhase(phase){await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"phase",payload:phase},{teacherPin});await refresh()}
async function sendPrompt(){
  const input=document.getElementById("promptInput"),payload=input.value.trim().slice(0,420);
  if(!payload)return;
  await markDone(db,{session_id:sessionId,gruppen_id:"lehrkraft",sektor:"control",status:"erledigt",event_type:"prompt",payload},{teacherPin});
  input.value="";
  await refresh();
}
function subscribe(){if(!db)return;if(liveChannel)db.removeChannel(liveChannel);liveChannel=db.channel(`teacher-${sessionId}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"fortschritt",filter:`session_id=eq.${sessionId}`},()=>refresh()).subscribe()}
async function startSession(){sessionId=randomSession();rows=[];setActiveSession(sessionId);history.replaceState({}, "", `?session=${sessionId}`);renderLinks();renderGroups();subscribe();await saveGroupCount();await setPhase("Einzelarbeit")}
function openDashboard(){document.getElementById("teacherLogin").classList.add("hidden");document.getElementById("teacherDashboard").classList.remove("hidden");renderLinks();loadTeacherTasks();refresh();subscribe()}

document.getElementById("pinForm").addEventListener("submit",event=>{event.preventDefault();teacherPin=document.getElementById("pinInput").value;if(teacherPin!==String(window.BERG_CONFIG?.TEACHER_PIN||"2468")){document.getElementById("pinError").classList.remove("hidden");return}openDashboard()});
document.getElementById("newSession").addEventListener("click",startSession);
document.getElementById("saveGroupCount").addEventListener("click",saveGroupCount);
document.getElementById("toggleLock").addEventListener("click",toggleLock);
document.getElementById("startFinale").addEventListener("click",sendFinale);
document.getElementById("sendPrompt").addEventListener("click",sendPrompt);
document.querySelectorAll("[data-phase]").forEach(button=>button.addEventListener("click",()=>setPhase(button.dataset.phase)));
document.getElementById("prevTeacherTask").addEventListener("click",()=>stepTeacherTask(-1));
document.getElementById("nextTeacherTask").addEventListener("click",()=>stepTeacherTask(1));
document.getElementById("teacherTaskSelect").addEventListener("change",event=>{teacherTaskIndex=Number(event.target.value)||0;renderTeacherTask()});
document.getElementById("copyTabletUrl").addEventListener("click",async()=>{const field=document.getElementById("tabletUrl");try{await navigator.clipboard.writeText(field.value);document.getElementById("copyTabletUrl").textContent="Link kopiert"}catch{field.focus();field.select()}});
setConnectionStatus(db?"Live verbunden":"Demo-Modus",Boolean(db));
