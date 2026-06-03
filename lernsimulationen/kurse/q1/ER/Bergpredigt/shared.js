const SECTORS = [
  {id:"nazareth",name:"Nazareth",title:"Goldene Regel",icon:"♥",art:"assets/images/station-nazareth-golden-rule.webp"},
  {id:"berg",name:"Berg der Lehre",title:"Seligpreisungen",icon:"☀",art:"assets/images/station-berg-beatitudes.webp"},
  {id:"kapernaum",name:"Kapernaum",title:"Salz der Erde",icon:"✦",art:"assets/images/station-kapernaum-salt.webp"},
  {id:"see",name:"See Genezareth",title:"Vom Sorgen",icon:"≈",art:"assets/images/station-see-trust.webp"},
  {id:"tiberias",name:"Tiberias",title:"Friedensstifter",icon:"☮",art:"assets/images/station-tiberias-peace.webp"}
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
async function readProgress(db,sessionId){if(!db)return getLocalRows().filter(row=>row.session_id===sessionId);const {data,error}=await db.from("fortschritt").select("session_id,gruppen_id,sektor,status,event_type,created_at").eq("session_id",sessionId);if(error)throw error;return data}
async function markDone(db,row,options={}){const payload={event_type:"solved",...row};if(!db){saveLocalRow(payload);return}if(window.BERG_CONFIG?.EDGE_FUNCTION_URL){const response=await fetch(window.BERG_CONFIG.EDGE_FUNCTION_URL,{method:"POST",headers:{"content-type":"application/json","apikey":window.BERG_CONFIG.SUPABASE_ANON_KEY,"authorization":`Bearer ${window.BERG_CONFIG.SUPABASE_ANON_KEY}`,...(options.teacherPin?{"x-teacher-pin":options.teacherPin}:{})},body:JSON.stringify(payload)});if(!response.ok)throw new Error(`Edge Function: ${response.status}`);return}const {error}=await db.from("fortschritt").insert(payload);if(error)throw error}
function completedSectorIds(rows){return new Set(rows.filter(row=>row.status==="erledigt"&&row.sektor!=="finale").map(row=>row.sektor))}
function finaleRequested(rows){return rows.some(row=>row.sektor==="finale"&&row.status==="erledigt")}
function setConnectionStatus(text,isLive=false){const label=document.getElementById("connectionLabel"),dot=document.querySelector(".status-dot");if(label)label.textContent=text;if(dot)dot.classList.toggle("live",isLive)}
function registerOffline(){if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})}
registerOffline();
