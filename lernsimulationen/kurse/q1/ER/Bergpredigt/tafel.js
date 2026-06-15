const db=createDb();let rows=[],doneIds=new Set(),completion=new Map(),sessionId=getActiveSession()||randomSession(),finale=false,locked=false,groupTarget=1,refreshing=false,finaleDismissed=false;
const AVATAR_POINTS=[[51,64],[48,62.7],[45,61.3],[42,60],[48,53.3],[54,46.7],[60,40],[66.7,47],[73.3,54],[80,61],[74,68],[68,75],[62,82]];
setActiveSession(sessionId);document.getElementById("sessionLabel").textContent=sessionId;
document.getElementById("leitfragePanel").innerHTML=ethikKompassPanelMarkup();
document.getElementById("ethikKompassClosing").innerHTML=ethikKompassClosingMarkup();
function celebrate(sector){const burst=document.getElementById("unlockBurst"),map=document.querySelector(".map-card");burst.innerHTML=`<i>✦</i><i>•</i><b>Treffer!</b><span>${sector.name} ist freigeschaltet.</span><i>✦</i><i>•</i>`;burst.classList.remove("hidden");map.classList.add("map-celebrate");setTimeout(()=>{burst.classList.add("hidden");map.classList.remove("map-celebrate")},1800)}
function showFinale(force=false){if(finaleDismissed&&!force)return;document.getElementById("boardFinale").classList.remove("hidden");document.getElementById("reopenFinale").classList.add("hidden")}
function groupProgressMap(){const groups=new Map(),excluded=excludedGroups(rows);groupAvatarsFromRows(rows).forEach((avatar,group)=>groups.set(group,new Set()));rows.filter(row=>row.status==="erledigt"&&row.sektor!=="control"&&row.sektor!=="finale"&&row.gruppen_id!=="lehrkraft"&&!excluded.has(row.gruppen_id)).forEach(row=>{if(!groups.has(row.gruppen_id))groups.set(row.gruppen_id,new Set());groups.get(row.gruppen_id).add(row.sektor)});return groups}
function renderGroupAvatars(){const layer=document.getElementById("groupAvatarLayer"),avatars=groupAvatarsFromRows(rows),gameCounts=groupGameCounts(rows),groups=[...groupProgressMap().keys()].sort((a,b)=>a.localeCompare(b));layer.innerHTML=groups.map((group,index)=>{const games=Math.min(gameCounts.get(group)||0,AVATAR_POINTS.length-1),point=AVATAR_POINTS[games],avatar=avatarById(avatars.get(group)),offset=(index%5-2)*1.4;return `<div class="group-map-avatar" style="--x:${point[0]+offset}%;--y:${point[1]+Math.floor(index/5)*3}%;--avatar-pos:${avatar.pos}" title="${escapeHtml(group)}"><span class="avatar-token"></span><b>${escapeHtml(group)}</b></div>`}).join("")}
function renderCardWall(){
  const target=document.getElementById("cardWall");
  if(!target)return;
  const items=SECTORS.map((sector,index)=>{const term=GLOSSARY[index];return doneIds.has(sector.id)?`<article class="collection-card"><i>${index+1}</i><b>${escapeHtml(term.term)}</b><em>${escapeHtml(term.definition)}</em></article>`:`<article class="collection-card locked"><i>?</i><b>Fachbegriff ${index+1}</b><small>Wird nach „${escapeHtml(sector.name)}" freigeschaltet</small></article>`}).join("");
  const unlocked=SECTORS.filter(s=>doneIds.has(s.id)).length;
  target.innerHTML=`<div class="card-wall">${items}</div><p class="privacy-note">${unlocked} / ${SECTORS.length} Fachbegriffe freigeschaltet.</p>`;
}
function renderPlenumArena(){
  const target=document.getElementById("plenumArena");
  if(!target)return;
  const allProducts=productRows(rows),products=allProducts.filter(item=>item.sector!=="notiz"&&item.sector!=="wimmel").slice(-5).reverse(),notes=allProducts.filter(item=>item.sector==="notiz").slice(-5).reverse(),diagnostics=diagnosticSummary(rows).slice(0,3),misses=diagnosticRows(rows).slice(-6).reverse(),debates=debateRows(rows);
  const html=`<div class="plenum-status"><b>${debates.length}</b><span>Plenumsbeiträge eingegangen</span><b>${products.length}</b><span>Merksätze sichtbar</span></div><h3>Merksätze</h3><div class="product-ticker">${products.length?products.map(item=>`<span>${escapeHtml(item.text)}</span>`).join(""):"<small>Noch keine Merksätze eingegangen.</small>"}</div><h3>Notizen der Gruppen</h3><div class="product-ticker notes-ticker">${notes.length?notes.map(item=>`<span>${escapeHtml(item.text)}</span>`).join(""):"<small>Noch keine Notizen eingegangen.</small>"}</div><h3>Gemeinsam genauer hinschauen</h3><div class="diagnostic-ticker">${diagnostics.length?diagnostics.map(item=>{const sector=SECTORS.find(s=>s.id===item.sector);return`<span>${escapeHtml(sector?.name||item.sector)}: ${item.count} Stolperstellen</span>`}).join(""):"<small>Keine auffälligen Stolperstellen.</small>"}</div><div class="miss-log">${misses.length?misses.map(item=>{const sector=SECTORS.find(s=>s.id===item.sector);return`<small>${escapeHtml(sector?.name||item.sector)} · ${escapeHtml(item.type)} · ${escapeHtml(item.group)}</small>`}).join(""):""}</div>`;
  target.innerHTML=html;
  const finale=document.getElementById("finaleLiveArena");if(finale)finale.innerHTML=html;
}
function renderWimmelReasons(){
  const target=document.getElementById("wimmelReasons");
  if(!target)return;
  const reasons=productRows(rows).filter(item=>item.sector==="wimmel").slice(-12).reverse();
  target.innerHTML=reasons.length?`<div class="wimmel-reason-wall">${reasons.map((item,index)=>`<article><b>Deutung ${reasons.length-index}</b><p>${escapeHtml(item.text)}</p></article>`).join("")}</div>`:"<p>Noch keine Wimmelbild-Begründungen eingegangen.</p>";
}
function renderBoard(){const focus=activeFocus(rows);(document.getElementById("storyPanelContent")||document.getElementById("storyPanel")).innerHTML=storyRecapMarkup(doneIds);document.querySelectorAll("[data-sector]").forEach(node=>{node.classList.toggle("done",doneIds.has(node.dataset.sector));node.classList.toggle("focus",focus===node.dataset.sector)});document.getElementById("boardLock").classList.toggle("hidden",!locked);document.getElementById("groupTargetLabel").textContent=`${WORK_MODES[activeWorkMode(rows)].name} · ${groupTarget} ${groupTarget===1?"Gruppe":"Gruppen"}`;const reached=SECTORS.filter(sector=>doneIds.has(sector.id)).length,finaleAvailable=reached===SECTORS.length||finale,maxGames=Math.max(0,...[...groupGameCounts(rows).values()]),routeProgress=Math.min(maxGames/(AVATAR_POINTS.length-1),1);document.getElementById("expeditionRoute").style.strokeDashoffset=100-routeProgress*100;document.getElementById("doneCount").textContent=reached;document.getElementById("progressBar").style.width=`${reached/SECTORS.length*100}%`;document.getElementById("sectorList").innerHTML=SECTORS.map(s=>{const state=completion.get(s.id)||{count:0,required:1,complete:false};return `<div class="${state.complete?"done":""} ${focus===s.id?"focus":""}"><img src="${s.art}" alt=""><span>${state.complete?"✓":state.count}</span><small><b>${s.name}</b>${focus===s.id?"Tafel-Fokus":state.complete?s.title:`${state.count} / ${state.required} Gruppenbeiträge`}</small></div>`}).join("");renderGroupAvatars();document.getElementById("activeGroupsLabel").textContent=`${groupProgressMap().size} Gruppen aktiv`;renderCardWall();renderPlenumArena();renderWimmelReasons();setupFloatingPanels();document.getElementById("reopenFinale").classList.toggle("hidden",!finaleAvailable||!finaleDismissed);if(finaleAvailable)showFinale()}
async function acceptRow(row){if(row.session_id!==sessionId||row.status!=="erledigt")return;if(row.sektor==="finale"){finale=true;finaleDismissed=false;showFinale(true);return}const before=new Set(doneIds);await refresh();const sector=SECTORS.find(s=>s.id===row.sektor);if(sector&&!before.has(sector.id)&&doneIds.has(sector.id))celebrate(sector)}
async function refresh(){if(refreshing)return;refreshing=true;try{rows=await readProgress(db,sessionId);completion=sectorCompletion(rows);doneIds=completedSectorIds(rows);finale=finaleRequested(rows);locked=isSessionLocked(rows);groupTarget=effectiveGroupTargetFromRows(rows);renderBoard()}finally{refreshing=false}}
async function start(){try{await refresh();setInterval(refresh,3000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh()});if(!db){setConnectionStatus("Demo-Modus",false);window.addEventListener("storage",event=>{if(event.key===LOCAL_KEY)refresh()});window.addEventListener("berg-local-progress",event=>acceptRow(event.detail));return}setConnectionStatus("Live verbunden",true);db.channel(`tafel-${sessionId}`).on("postgres_changes",{event:"INSERT",schema:"public",table:"fortschritt",filter:`session_id=eq.${sessionId}`},payload=>acceptRow(payload.new)).subscribe(status=>{if(status==="SUBSCRIBED")setConnectionStatus("Live verbunden",true)})}catch(error){console.error(error);setConnectionStatus("Verbindung prüfen",false)}}
document.getElementById("fullscreenMap").addEventListener("click",async()=>{const board=document.body,button=document.getElementById("fullscreenMap");try{if(document.fullscreenElement){await document.exitFullscreen();button.textContent="Tafel Vollbild"}else{await board.requestFullscreen();button.textContent="Vollbild verlassen"}}catch{board.classList.toggle("board-fullscreen-fallback");button.textContent=board.classList.contains("board-fullscreen-fallback")?"Vollbild verlassen":"Tafel Vollbild"}});
document.addEventListener("fullscreenchange",()=>document.getElementById("fullscreenMap").textContent=document.fullscreenElement?"Vollbild verlassen":"Tafel Vollbild");
function exportResults(){const products=productRows(rows),merksaetze=products.filter(item=>item.sector!=="notiz"&&item.sector!=="wimmel"),notes=products.filter(item=>item.sector==="notiz"),wimmel=products.filter(item=>item.sector==="wimmel"),debates=debateRows(rows),diagnostics=diagnosticSummary(rows),cards=cardRows(rows),groups=[...groupProgressMap().keys()].sort();const lines=[`Bergpredigt-Expedition - Ergebnisse · Sitzung ${sessionId}`,"","Merksätze:",...(merksaetze.length?merksaetze.map(item=>`- ${item.text}`):["(keine)"]),"","Wimmelbild-Begründungen:",...(wimmel.length?wimmel.map(item=>`- ${item.text}`):["(keine)"]),"","Notizen:",...(notes.length?notes.map(item=>`- ${item.text}`):["(keine)"]),"","Debattenbeiträge:",...(debates.length?debates.map(item=>`- ${item.side===2?"Eigene Position":`Position ${item.side+1}`}: ${item.text}`):["(keine)"]),"","Stolperstellen:",...(diagnostics.length?diagnostics.map(item=>{const sector=SECTORS.find(s=>s.id===item.sector);return`- ${sector?.name||item.sector} · ${item.type}: ${item.count}x`}):["(keine)"]),"","Sammelkarten:",...(cards.length?cards.map(item=>`- ${item.type}: ${item.name}`):["(keine)"]),"","Protokoll je Gruppe:",...(groups.length?groups.flatMap(group=>{const entries=groupProtocolEntries(rows,group);return[`-- Gruppe ${group} --`,...(entries.length?entries:["(keine Einträge)"])]}):["(keine Gruppen)"])];const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=`bergpredigt-ergebnisse-${sessionId}.txt`;link.click();URL.revokeObjectURL(url)}
document.getElementById("exportResults").addEventListener("click",exportResults);
document.getElementById("closeFinale").addEventListener("click",()=>{finaleDismissed=true;document.getElementById("boardFinale").classList.add("hidden");document.getElementById("reopenFinale").classList.remove("hidden")});
document.getElementById("reopenFinale").addEventListener("click",()=>{finaleDismissed=false;showFinale(true)});
let floatingZ=40;
function panelTitle(panel){return panel.querySelector("h2")?.textContent||panel.querySelector(".comic-kicker")?.textContent||"Fenster"}
function clampPanel(panel){
  const layout=document.querySelector(".board-layout").getBoundingClientRect(),rect=panel.getBoundingClientRect(),margin=8;
  const left=Math.min(Math.max(rect.left-layout.left,margin),Math.max(margin,layout.width-rect.width-margin));
  const top=Math.min(Math.max(rect.top-layout.top,margin),Math.max(margin,layout.height-rect.height-margin));
  panel.style.left=`${left}px`;
  panel.style.top=`${top}px`;
}
function activatePanelWindow(panel){
  panel.classList.add("active");
  panel.style.zIndex=String(++floatingZ);
  document.getElementById("sidePanel").classList.add("open");
  document.querySelector(`#boardToolbar button[data-panel="${panel.dataset.panel}"]`)?.classList.add("active");
  requestAnimationFrame(()=>clampPanel(panel));
}
function closePanelWindow(panel){
  panel.classList.remove("active");
  document.querySelector(`#boardToolbar button[data-panel="${panel.dataset.panel}"]`)?.classList.remove("active");
  if(!document.querySelector("#sidePanel .panel.active"))document.getElementById("sidePanel").classList.remove("open");
}
function closeSidePanel(){document.getElementById("sidePanel").querySelectorAll(".panel").forEach(closePanelWindow)}
function setupFloatingPanels(){
  const panelHost=document.getElementById("sidePanel");
  panelHost.querySelectorAll(".panel").forEach((panel,index)=>{
    panel.style.setProperty("--float-x",`${18+index*28}px`);
    panel.style.setProperty("--float-y",`${18+index*24}px`);
    panel.style.setProperty("--float-w",index===2?"min(620px,64vw)":"min(440px,45vw)");
    panel.style.setProperty("--float-h",index===2?"min(520px,72vh)":"min(390px,64vh)");
    if(panel.querySelector(".panel-window-bar"))return;
    const bar=document.createElement("div");
    bar.className="panel-window-bar";
    bar.innerHTML=`<span>${escapeHtml(panelTitle(panel))}</span><button class="mini-action" type="button" aria-label="Fenster schließen">×</button>`;
    panel.prepend(bar);
    bar.querySelector("button").addEventListener("click",()=>closePanelWindow(panel));
    bar.addEventListener("pointerdown",event=>{
      if(event.target.closest("button"))return;
      const startX=event.clientX,startY=event.clientY,startLeft=panel.offsetLeft,startTop=panel.offsetTop,layout=document.querySelector(".board-layout").getBoundingClientRect();
      bar.dataset.pointerDragging="true";
      activatePanelWindow(panel);
      bar.setPointerCapture(event.pointerId);
      const move=moveEvent=>{
        const rect=panel.getBoundingClientRect(),maxLeft=Math.max(8,layout.width-rect.width-8),maxTop=Math.max(8,layout.height-rect.height-8);
        panel.style.left=`${Math.min(Math.max(startLeft+moveEvent.clientX-startX,8),maxLeft)}px`;
        panel.style.top=`${Math.min(Math.max(startTop+moveEvent.clientY-startY,8),maxTop)}px`;
      };
      const up=()=>{bar.dataset.pointerDragging="false";bar.removeEventListener("pointermove",move);bar.removeEventListener("pointerup",up);bar.removeEventListener("pointercancel",up);clampPanel(panel)};
      bar.addEventListener("pointermove",move);
      bar.addEventListener("pointerup",up,{once:true});
      bar.addEventListener("pointercancel",up,{once:true});
    });
    bar.addEventListener("mousedown",event=>{
      if(event.target.closest("button")||bar.dataset.pointerDragging==="true")return;
      event.preventDefault();
      const startX=event.clientX,startY=event.clientY,startLeft=panel.offsetLeft,startTop=panel.offsetTop,layout=document.querySelector(".board-layout").getBoundingClientRect();
      activatePanelWindow(panel);
      const move=moveEvent=>{
        const rect=panel.getBoundingClientRect(),maxLeft=Math.max(8,layout.width-rect.width-8),maxTop=Math.max(8,layout.height-rect.height-8);
        panel.style.left=`${Math.min(Math.max(startLeft+moveEvent.clientX-startX,8),maxLeft)}px`;
        panel.style.top=`${Math.min(Math.max(startTop+moveEvent.clientY-startY,8),maxTop)}px`;
      };
      const up=()=>{document.removeEventListener("mousemove",move);document.removeEventListener("mouseup",up);clampPanel(panel)};
      document.addEventListener("mousemove",move);
      document.addEventListener("mouseup",up,{once:true});
    });
    panel.addEventListener("pointerdown",()=>{panel.style.zIndex=String(++floatingZ)});
  });
}
document.querySelectorAll("#boardToolbar button").forEach(btn=>{btn.addEventListener("click",()=>{const panel=document.querySelector(`#sidePanel .panel[data-panel="${btn.dataset.panel}"]`);if(!panel)return;panel.classList.contains("active")?closePanelWindow(panel):activatePanelWindow(panel)})});
document.getElementById("closeSidePanel").addEventListener("click",closeSidePanel);
setupFloatingPanels();
start();
