const SECTORS=[
  {id:"berg",name:"Seligpreisungen",title:"Zuspruch und Gerechtigkeit",mode:"all",art:"assets/images/station-berg-beatitudes.webp"},
  {id:"kapernaum",name:"Salz und Licht",title:"Wirksam handeln",mode:"single",art:"assets/images/station-kapernaum-salt.webp"},
  {id:"tiberias",name:"Feindesliebe",title:"Frieden stiften",mode:"all",art:"assets/images/station-tiberias-peace.webp"},
  {id:"see",name:"Sorge und Vertrauen",title:"Verantwortlich leben",mode:"all",art:"assets/images/station-see-trust.webp"},
  {id:"nazareth",name:"Goldene Regel",title:"Perspektivwechsel bündeln",mode:"single",art:"assets/images/station-nazareth-golden-rule.webp"}
];
const DEFAULT_MODULES=[
  {id:"berg",title:"Modul 1: Umwertung hören",objective:"Die Lernenden erschließen die Seligpreisungen als Zuspruch und kritische Gegenperspektive zu üblichen Erfolgsmaßstäben.",narrative:"Die Gruppe kommt am Berg an: Vor jeder Forderung steht ein Zuspruch. Wer gilt als selig, wenn Gottes Reich zum Maßstab wird?",teacherMove:"Textnah lesen lassen und vorschnelle Vertröstungen problematisieren.",product:"Begründete Deutung: Zuspruch, Gerechtigkeit und Friedenshandeln."},
  {id:"kapernaum",title:"Modul 2: Wirkung verantworten",objective:"Die Lernenden deuten Salz und Licht als Auftrag zu sichtbarer, aber nicht selbstinszenierter Verantwortung.",narrative:"Nach dem Hören stellt sich die Frage: Woran merkt die Welt etwas von dieser Botschaft?",teacherMove:"Zwischen Wirkung, Profil und moralischer Selbstdarstellung unterscheiden lassen.",product:"Kriterien für eine kleine, überprüfbare Veränderung."},
  {id:"tiberias",title:"Modul 3: Radikale Ethik prüfen",objective:"Die Lernenden beurteilen Feindesliebe als Unterbrechung von Vergeltung, ohne Schutz und Gerechtigkeit preiszugeben.",narrative:"Der Lernweg führt in den Konflikt: Was heißt Frieden, wenn Unrecht real ist?",teacherMove:"Die Spannung zwischen Schutz, Wahrheit und Versöhnung offenhalten.",product:"Verantwortlicher Konfliktbeschluss mit Grenzen und Wiedergutmachung."},
  {id:"see",title:"Modul 4: Vertrauen und Sorge abwägen",objective:"Die Lernenden setzen Jesu Sorgenkritik in Beziehung zu Verantwortung, Solidarität und Prioritäten des Reiches Gottes.",narrative:"Am See wird der Anspruch alltagsnah: Welche Sorgen lähmen, welche Verantwortung bleibt?",teacherMove:"Keine naive Planungskritik zulassen; den Zielhorizont Gerechtigkeit herausarbeiten.",product:"Handlungsfolge für eine Krisensituation."},
  {id:"nazareth",title:"Modul 5: Perspektiven bündeln",objective:"Die Lernenden verstehen die Goldene Regel als verdichtende ethische Perspektivübernahme im Zusammenhang von Gesetz und Propheten.",narrative:"Am Ende wird der Weg gebündelt: Wie wird aus Hören, Wirken, Frieden und Vertrauen eine Regel für Entscheidungen?",teacherMove:"Auf Transfer und Urteilskompetenz zielen: Welche Aussage bleibt unbequem?",product:"Entscheidungsnotiz mit Prüffragen für Gegenwartssituationen."}
];
const APP_VERSION="v20";
const WORK_MODES={
  cooperative:{id:"cooperative",name:"Kooperativ",hint:"Stationen öffnen sich erst, wenn alle aktiven Gruppen ihren Beitrag geliefert haben."},
  standard:{id:"standard",name:"Nicht kooperativ",hint:"Eine aktive Gruppe kann eine Station für die Karte freischalten."}
};
const AVATARS=[
  {id:"laterne",name:"Laterne",pos:"0% 0%"},
  {id:"olive",name:"Olivenzweig",pos:"50% 0%"},
  {id:"bergpfad",name:"Bergpfad",pos:"100% 0%"},
  {id:"schriftrolle",name:"Schriftrolle",pos:"0% 100%"},
  {id:"salzlicht",name:"Salz und Licht",pos:"50% 100%"},
  {id:"frieden",name:"Frieden",pos:"100% 100%"}
];
const LOCAL_KEY="bergpredigt-fortschritt-v2";
const ACTIVE_SESSION_KEY="bergpredigt-active-session";
const SESSION_PATTERN=/^[a-z0-9-]{6,32}$/;
function configReady(){return Boolean(window.BERG_CONFIG?.SUPABASE_URL&&window.BERG_CONFIG?.SUPABASE_ANON_KEY&&window.supabase)}
function createDb(){return configReady()?window.supabase.createClient(window.BERG_CONFIG.SUPABASE_URL,window.BERG_CONFIG.SUPABASE_ANON_KEY):null}
function sanitizeSession(value){const clean=(value||"").trim().toLowerCase().replace(/[^a-z0-9-]/g,"").slice(0,32);return SESSION_PATTERN.test(clean)?clean:""}
function randomSession(){return `kurs-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(0,8)}`}
function sessionFromUrl(){return sanitizeSession(new URLSearchParams(location.search).get("session"))}
function getActiveSession(){return sessionFromUrl()||sanitizeSession(localStorage.getItem(ACTIVE_SESSION_KEY))}
function setActiveSession(sessionId){localStorage.setItem(ACTIVE_SESSION_KEY,sanitizeSession(sessionId))}
function sessionUrl(page,sessionId){const url=new URL(page,location.href);url.searchParams.set("session",sanitizeSession(sessionId));return url.href}
function getLocalRows(){try{return JSON.parse(localStorage.getItem(LOCAL_KEY)||"[]")}catch{return[]}}
function saveLocalRow(row){const saved={...row,created_at:new Date().toISOString()};const rows=getLocalRows();rows.push(saved);localStorage.setItem(LOCAL_KEY,JSON.stringify(rows));window.dispatchEvent(new CustomEvent("berg-local-progress",{detail:saved}))}
async function readProgress(db,sessionId){if(!db)return getLocalRows().filter(row=>row.session_id===sessionId);const{data,error}=await db.from("fortschritt").select("session_id,gruppen_id,sektor,status,event_type,payload,created_at").eq("session_id",sessionId);if(error)throw error;return data}
async function markDone(db,row,options={}){const payload={event_type:"solved",...row};if(!db){saveLocalRow(payload);return}if(window.BERG_CONFIG?.EDGE_FUNCTION_URL){const response=await fetch(window.BERG_CONFIG.EDGE_FUNCTION_URL,{method:"POST",headers:{"content-type":"application/json","apikey":window.BERG_CONFIG.SUPABASE_ANON_KEY,"authorization":`Bearer ${window.BERG_CONFIG.SUPABASE_ANON_KEY}`,...(options.teacherPin?{"x-teacher-pin":options.teacherPin}:{})},body:JSON.stringify(payload)});if(!response.ok)throw new Error(`Edge Function: ${response.status}`);return}const{error}=await db.from("fortschritt").insert(payload);if(error)throw error}
function controlRows(rows){return rows.filter(row=>row.sektor==="control").sort((a,b)=>new Date(a.created_at)-new Date(b.created_at))}
function isSessionLocked(rows){const last=controlRows(rows).filter(row=>row.event_type==="lock"||row.event_type==="unlock").at(-1);return last?.event_type==="lock"}
function controlLabel(rows){return isSessionLocked(rows)?"Expedition gesperrt":"Expedition offen"}
function groupTargetFromRows(rows){const last=controlRows(rows).filter(row=>row.event_type==="groups"&&/^gruppen-\d+$/.test(row.gruppen_id||"")).at(-1),match=last?.gruppen_id?.match(/^gruppen-(\d+)$/);return match?Math.max(1,Math.min(12,Number(match[1]))):4}
function excludedGroups(rows){const excluded=new Set();controlRows(rows).filter(row=>row.event_type==="groups"&&String(row.payload||"").startsWith("group:")).forEach(row=>{const action=String(row.payload).replace("group:",""),group=row.gruppen_id;if(action==="exclude")excluded.add(group);if(action==="include")excluded.delete(group)});return excluded}
function isGroupExcluded(rows,groupId){return excludedGroups(rows).has(groupId)}
function effectiveGroupTargetFromRows(rows){return Math.max(1,groupTargetFromRows(rows)-excludedGroups(rows).size)}
function activePhase(rows){const last=controlRows(rows).filter(row=>row.event_type==="phase").at(-1);return last?.payload||"Startphase"}
function activePrompt(rows){return controlRows(rows).filter(row=>row.event_type==="prompt"&&row.payload).at(-1)?.payload||""}
function activeWorkMode(rows){const last=controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("mode:")).at(-1),mode=String(last?.payload||"mode:standard").replace("mode:","");return WORK_MODES[mode]?mode:"standard"}
function groupAvatarsFromRows(rows){const avatars=new Map(),excluded=excludedGroups(rows);controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("avatar:")).forEach(row=>{const avatar=String(row.payload).replace("avatar:","");if(AVATARS.some(item=>item.id===avatar)&&row.gruppen_id!=="lehrkraft"&&!excluded.has(row.gruppen_id))avatars.set(row.gruppen_id,avatar)});return avatars}
function avatarById(id){return AVATARS.find(avatar=>avatar.id===id)||AVATARS[0]}
function sectorRequirement(sector,rows){return activeWorkMode(rows)==="cooperative"?effectiveGroupTargetFromRows(rows):1}
function sectorGroupCounts(rows){const counts=new Map(),excluded=excludedGroups(rows);rows.filter(row=>row.status==="erledigt"&&row.sektor!=="finale"&&row.sektor!=="control"&&row.gruppen_id!=="lehrkraft"&&!excluded.has(row.gruppen_id)).forEach(row=>{if(!counts.has(row.sektor))counts.set(row.sektor,new Set());counts.get(row.sektor).add(row.gruppen_id)});return counts}
function sectorCompletion(rows){const counts=sectorGroupCounts(rows),manual=new Set(rows.filter(row=>row.gruppen_id==="lehrkraft"&&row.status==="erledigt"&&row.sektor!=="control"&&row.sektor!=="finale").map(row=>row.sektor));return new Map(SECTORS.map(sector=>{const required=sectorRequirement(sector,rows),count=counts.get(sector.id)?.size||0,complete=manual.has(sector)||count>=required;return[sector.id,{count,required,complete,ratio:Math.min(1,count/required)}]}))}
function completedSectorIds(rows){const completion=sectorCompletion(rows);return new Set([...completion].filter(([,value])=>value.complete).map(([id])=>id))}
function finaleRequested(rows){return rows.some(row=>row.sektor==="finale"&&row.status==="erledigt")}
function bossFinaleReady(rows){const completion=sectorCompletion(rows),groups=sectorGroupCounts(rows).get("nazareth")?.size||0,target=activeWorkMode(rows)==="cooperative"?effectiveGroupTargetFromRows(rows):1;return SECTORS.every(sector=>completion.get(sector.id)?.complete)&&groups>=target}
function moduleOverrides(rows){const overrides=new Map();controlRows(rows).filter(row=>row.event_type==="groups"&&String(row.payload||"").startsWith("module:")).forEach(row=>{const[,id,encoded]=String(row.payload).split(":");if(encoded==="reset"){overrides.delete(id);return}try{overrides.set(id,JSON.parse(decodeURIComponent(encoded)))}catch{}});return overrides}
function moduleFor(id,rows=[]){const base=DEFAULT_MODULES.find(module=>module.id===id)||DEFAULT_MODULES[0],override=moduleOverrides(rows).get(id)||{};return{...base,...override}}
function sortTasksByLearningPath(tasks){const order=new Map(SECTORS.map((sector,index)=>[sector.id,index]));return tasks.sort((a,b)=>(order.get(a.sector)??99)-(order.get(b.sector)??99))}
function taskSkillLabel(task){return{choice:"Deuten",mark:"Kriterien anwenden",order:"Handlungsschritte begründen",match:"Begriffe präzisieren",matrix:"Urteile differenzieren",evidence:"These mit Textbeleg prüfen",reflection:"Transfer formulieren"}[task?.type]||"Aufgabe bearbeiten"}
function escapeHtml(value){return String(value||"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function setConnectionStatus(text,isLive=false){const label=document.getElementById("connectionLabel"),dot=document.querySelector(".status-dot");if(label)label.textContent=text;if(dot)dot.classList.toggle("live",isLive)}
function registerOffline(){if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})}
registerOffline();
