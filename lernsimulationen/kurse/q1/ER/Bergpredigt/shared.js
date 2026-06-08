const SECTORS = [
  {id:"nazareth",name:"Goldene Regel",title:"Perspektivwechsel",mode:"single",art:"assets/images/station-nazareth-golden-rule.webp"},
  {id:"berg",name:"Seligpreisungen",title:"Zuspruch und Gerechtigkeit",mode:"all",art:"assets/images/station-berg-beatitudes.webp"},
  {id:"kapernaum",name:"Salz und Licht",title:"Wirksam handeln",mode:"single",art:"assets/images/station-kapernaum-salt.webp"},
  {id:"see",name:"Sorge und Vertrauen",title:"Verantwortlich leben",mode:"all",art:"assets/images/station-see-trust.webp"},
  {id:"tiberias",name:"Feindesliebe",title:"Frieden stiften",mode:"all",art:"assets/images/station-tiberias-peace.webp"}
];
const APP_VERSION = "v16";
const WORK_MODES = {
  cooperative:{id:"cooperative",name:"Kooperativ",hint:"Stationen öffnen sich erst, wenn alle Gruppen ihren Beitrag geliefert haben."},
  standard:{id:"standard",name:"Nicht kooperativ",hint:"Eine Gruppe kann eine Station für die Karte freischalten."}
};
const AVATARS = [
  {id:"laterne",name:"Laterne",pos:"0% 0%"},
  {id:"olive",name:"Olivenzweig",pos:"50% 0%"},
  {id:"bergpfad",name:"Bergpfad",pos:"100% 0%"},
  {id:"schriftrolle",name:"Schriftrolle",pos:"0% 100%"},
  {id:"salzlicht",name:"Salz und Licht",pos:"50% 100%"},
  {id:"frieden",name:"Frieden",pos:"100% 100%"}
];
const LOCAL_KEY = "bergpredigt-fortschritt-v2";
const ACTIVE_SESSION_KEY = "bergpredigt-active-session";
const SESSION_PATTERN = /^[a-z0-9-]{6,32}$/;
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
async function readProgress(db,sessionId){if(!db)return getLocalRows().filter(row=>row.session_id===sessionId);const {data,error}=await db.from("fortschritt").select("session_id,gruppen_id,sektor,status,event_type,payload,created_at").eq("session_id",sessionId);if(error)throw error;return data}
async function markDone(db,row,options={}){const payload={event_type:"solved",...row};if(!db){saveLocalRow(payload);return}if(window.BERG_CONFIG?.EDGE_FUNCTION_URL){const response=await fetch(window.BERG_CONFIG.EDGE_FUNCTION_URL,{method:"POST",headers:{"content-type":"application/json","apikey":window.BERG_CONFIG.SUPABASE_ANON_KEY,"authorization":`Bearer ${window.BERG_CONFIG.SUPABASE_ANON_KEY}`,...(options.teacherPin?{"x-teacher-pin":options.teacherPin}:{})},body:JSON.stringify(payload)});if(!response.ok)throw new Error(`Edge Function: ${response.status}`);return}const {error}=await db.from("fortschritt").insert(payload);if(error)throw error}
function controlRows(rows){return rows.filter(row=>row.sektor==="control").sort((a,b)=>new Date(a.created_at)-new Date(b.created_at))}
function isSessionLocked(rows){const last=controlRows(rows).filter(row=>row.event_type==="lock"||row.event_type==="unlock").at(-1);return last?.event_type==="lock"}
function controlLabel(rows){return isSessionLocked(rows)?"Expedition gesperrt":"Expedition offen"}
function groupTargetFromRows(rows){const last=controlRows(rows).filter(row=>row.event_type==="groups").at(-1),match=last?.gruppen_id?.match(/^gruppen-(\d+)$/);return match?Math.max(1,Math.min(12,Number(match[1]))):4}
function activePhase(rows){const last=controlRows(rows).filter(row=>row.event_type==="phase").at(-1);return last?.payload||"Startphase"}
function activePrompt(rows){return controlRows(rows).filter(row=>row.event_type==="prompt"&&row.payload).at(-1)?.payload||""}
function activeWorkMode(rows){const last=controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("mode:")).at(-1),mode=String(last?.payload||"mode:standard").replace("mode:","");return WORK_MODES[mode]?mode:"standard"}
function groupAvatarsFromRows(rows){const avatars=new Map();controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("avatar:")).forEach(row=>{const avatar=String(row.payload).replace("avatar:","");if(AVATARS.some(item=>item.id===avatar)&&row.gruppen_id!=="lehrkraft")avatars.set(row.gruppen_id,avatar)});return avatars}
function avatarById(id){return AVATARS.find(avatar=>avatar.id===id)||AVATARS[0]}
function sectorRequirement(sector,rows){return activeWorkMode(rows)==="cooperative"?groupTargetFromRows(rows):1}
function sectorGroupCounts(rows){const counts=new Map();rows.filter(row=>row.status==="erledigt"&&row.sektor!=="finale"&&row.sektor!=="control"&&row.gruppen_id!=="lehrkraft").forEach(row=>{if(!counts.has(row.sektor))counts.set(row.sektor,new Set());counts.get(row.sektor).add(row.gruppen_id)});return counts}
function sectorCompletion(rows){const counts=sectorGroupCounts(rows),manual=new Set(rows.filter(row=>row.gruppen_id==="lehrkraft"&&row.status==="erledigt"&&row.sektor!=="control"&&row.sektor!=="finale").map(row=>row.sektor));return new Map(SECTORS.map(sector=>{const required=sectorRequirement(sector,rows),count=counts.get(sector)?.size||0,complete=manual.has(sector)||count>=required;return[sector.id,{count,required,complete,ratio:Math.min(1,count/required)}]}))}
function completedSectorIds(rows){const completion=sectorCompletion(rows);return new Set([...completion].filter(([,value])=>value.complete).map(([id])=>id))}
function finaleRequested(rows){return rows.some(row=>row.sektor==="finale"&&row.status==="erledigt")}
function bossFinaleReady(rows){const completion=sectorCompletion(rows),groups=sectorGroupCounts(rows).get("tiberias")?.size||0,target=activeWorkMode(rows)==="cooperative"?groupTargetFromRows(rows):1;return SECTORS.every(sector=>completion.get(sector.id)?.complete)&&groups>=target}
function escapeHtml(value){return String(value||"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function setConnectionStatus(text,isLive=false){const label=document.getElementById("connectionLabel"),dot=document.querySelector(".status-dot");if(label)label.textContent=text;if(dot)dot.classList.toggle("live",isLive)}
function registerOffline(){if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})}
registerOffline();
