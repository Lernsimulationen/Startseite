const SECTORS=[
  {id:"berg",name:"Seligpreisungen",title:"Zuspruch und Umwertung",mode:"all",art:"assets/images/station-berg-beatitudes.webp"},
  {id:"tiberias",name:"Antithesen",title:"Ich aber sage euch",mode:"all",art:"assets/images/station-tiberias-peace.webp"},
  {id:"see",name:"Vaterunser",title:"Beten und Vertrauen",mode:"all",art:"assets/images/station-see-trust.webp"},
  {id:"nazareth",name:"Goldene Regel",title:"Fels oder Sand",mode:"all",art:"assets/images/station-nazareth-golden-rule.webp"}
];
const VALUE_KEYS=["frieden","gerechtigkeit","vertrauen"];
const VALUE_LABELS={frieden:"Frieden",gerechtigkeit:"Gerechtigkeit",vertrauen:"Vertrauen"};
const RANKS=[
  {name:"Suchender",min:0},
  {name:"Hörender",min:20},
  {name:"Brückenbauer",min:45},
  {name:"Friedensstifter",min:75},
  {name:"Felsbauer",min:110}
];
const DEFAULT_MODULES=[
  {id:"berg",title:"Modul 1: Seligpreisungen ordnen",objective:"Die Lernenden erschließen Zuspruch und Umwertung in Mt 5,3-12.",narrative:"Am Berg beginnt der Lehrkreis mit Menschen, die Jesus selig nennt, obwohl sie nicht stark wirken.",teacherMove:"Auf den Zuspruch vor jeder Forderung achten lassen.",product:"Eine Seligpreisung als heutige Zumutung deuten."},
  {id:"tiberias",title:"Modul 2: Antithesen prüfen",objective:"Die Lernenden unterscheiden alte Konfliktlogiken und Jesu Zuspitzung.",narrative:"Jetzt wird es unbequem: Jesus stellt Gewalt, Vergeltung und Feindschaft in Frage.",teacherMove:"Die Spannung zwischen Schutz, Wahrheit und Versöhnung offenhalten.",product:"Eine Konfliktentscheidung begründet treffen."},
  {id:"see",title:"Modul 3: Vaterunser puzzeln",objective:"Die Lernenden erschließen Bitten des Vaterunsers als Vertrauens- und Handlungssprache.",narrative:"Am See wird aus Hören ein Beten: Was dürfen Menschen erwarten, erbitten und verantworten?",teacherMove:"Gebet nicht als Flucht aus Verantwortung, sondern als Ausrichtung lesen.",product:"Eine Bitte mit einer Alltagssituation verbinden."},
  {id:"nazareth",title:"Modul 4: Goldene Regel und Felsbau",objective:"Die Lernenden bündeln die Bergpredigt in Perspektivwechsel und tragfähigem Handeln.",narrative:"Am Ende zeigt sich, ob die Worte auf Fels oder auf Sand gebaut sind.",teacherMove:"Transfer ins Urteil führen: Welche Entscheidung trägt wirklich?",product:"Eine begründete Felsbauer-Entscheidung."}
];
const BIBLE_PANELS={
  berg:{reference:"Mt 5,3-12 nach Luther 1912",text:"Selig sind, die da geistlich arm sind; denn das Himmelreich ist ihr. Selig sind, die da Leid tragen; denn sie sollen getröstet werden. Selig sind die Sanftmütigen; denn sie werden das Erdreich besitzen. Selig sind, die da hungert und dürstet nach der Gerechtigkeit; denn sie sollen satt werden. Selig sind die Barmherzigen; denn sie werden Barmherzigkeit erlangen. Selig sind, die reines Herzens sind; denn sie werden Gott schauen. Selig sind die Friedfertigen; denn sie werden Gottes Kinder heißen. Selig sind, die um Gerechtigkeit willen verfolgt werden; denn das Himmelreich ist ihr."},
  tiberias:{reference:"Mt 5,21-24.37.39.44 nach Luther 1912",text:"Ihr habt gehört, daß zu den Alten gesagt ist: Du sollst nicht töten. Ich aber sage euch: Wer mit seinem Bruder zürnt, der ist des Gerichts schuldig. Darum, wenn du deine Gabe auf dem Altar opferst und wirst allda eingedenk, daß dein Bruder etwas wider dich habe, so laß allda vor dem Altar deine Gabe und gehe zuvor hin und versöhne dich mit deinem Bruder. Eure Rede aber sei: Ja, ja; nein, nein. Widerstrebet nicht dem Übel; sondern, so dir jemand einen Streich gibt auf deinen rechten Backen, dem biete den andern auch dar. Liebet eure Feinde; segnet, die euch fluchen; tut wohl denen, die euch hassen; bittet für die, so euch beleidigen und verfolgen."},
  see:{reference:"Mt 6,9-13.19-21.31-33 nach Luther 1912",text:"Unser Vater in dem Himmel! Dein Name werde geheiligt. Dein Reich komme. Dein Wille geschehe auf Erden wie im Himmel. Unser täglich Brot gib uns heute. Und vergib uns unsere Schuld, wie wir unsern Schuldigern vergeben. Und führe uns nicht in Versuchung, sondern erlöse uns von dem Übel. Ihr sollt euch nicht Schätze sammeln auf Erden. Sammelt euch aber Schätze im Himmel. Sorget nicht und saget nicht: Was werden wir essen? Trachtet am ersten nach dem Reich Gottes und nach seiner Gerechtigkeit, so wird euch solches alles zufallen."},
  nazareth:{reference:"Mt 7,1-5.12.21.24-27 nach Luther 1912",text:"Richtet nicht, auf daß ihr nicht gerichtet werdet. Was siehst du aber den Splitter in deines Bruders Auge und wirst nicht gewahr des Balkens in deinem Auge? Alles nun, was ihr wollt, daß euch die Leute tun sollen, das tut ihr ihnen auch. Es werden nicht alle, die zu mir sagen: Herr, Herr! in das Himmelreich kommen, sondern die den Willen tun meines Vaters im Himmel. Wer diese meine Rede hört und tut sie, den vergleiche ich einem klugen Mann, der sein Haus auf einen Felsen baute. Wer aber hört und tut sie nicht, der ist einem törichten Mann gleich, der sein Haus auf den Sand baute."}
};
const DEFAULT_FEEDBACK={
  berg:"Die Seligpreisungen sind mehr als Trostworte: Sie verändern, wer als stark, arm, gerecht oder friedensfähig gilt.",
  tiberias:"Die Antithesen fragen tiefer als Regeln: Wo beginnt Gewalt, und wie wird Vergeltung unterbrochen?",
  see:"Das Vaterunser verbindet Vertrauen mit Verantwortung: Gottes Reich wird erbeten und im Handeln gesucht.",
  nazareth:"Felsbauer wird, wer Jesu Worte nicht nur richtig sortiert, sondern tragfähig umsetzt."
};
const DEBATE_FINALE={
  question:"Welche Aussage der Bergpredigt ist heute am unbequemsten, aber am wichtigsten?",
  positions:["Die Bergpredigt ist ein realistischer Kompass für gerechtes Handeln.","Die Bergpredigt ist eine radikale Zumutung, die unsere Maßstäbe stört."],
  arguments:[
    "Die Goldene Regel zwingt zum Perspektivwechsel.",
    "Feindesliebe widerspricht der spontanen Vergeltung.",
    "Seligpreisungen stellen Erfolg und Stärke infrage.",
    "Das Vaterunser verbindet Vertrauen mit Verantwortung.",
    "Das Haus auf Fels zeigt: Hören reicht nicht, Handeln entscheidet.",
    "Gerechtigkeit ist in der Bergpredigt ein roter Faden."
  ]
};
const APP_VERSION="v30";
const WORK_MODES={
  cooperative:{id:"cooperative",name:"Kooperativ",hint:"Module öffnen sich erst, wenn alle aktiven Gruppen ihren Beitrag geliefert haben."},
  standard:{id:"standard",name:"Nicht kooperativ",hint:"Eine aktive Gruppe kann ein Modul für die Tafel freischalten."}
};
const AVATARS=[
  {id:"laterne",name:"Laterne",pos:"0% 0%"},
  {id:"olive",name:"Olivenzweig",pos:"50% 0%"},
  {id:"bergpfad",name:"Bergpfad",pos:"100% 0%"},
  {id:"schriftrolle",name:"Schriftrolle",pos:"0% 100%"},
  {id:"salzlicht",name:"Brot teilen",pos:"50% 100%"},
  {id:"frieden",name:"Frieden",pos:"100% 100%"}
];
const LOCAL_KEY="bergpredigt-fortschritt-v2";
const ACTIVE_SESSION_KEY="bergpredigt-active-session";
const SESSION_PATTERN=/^[a-z0-9-]{6,32}$/;
function configReady(){return Boolean(window.BERG_CONFIG?.SUPABASE_URL&&window.BERG_CONFIG?.SUPABASE_ANON_KEY&&window.supabase)}
function createDb(){return configReady()?window.supabase.createClient(window.BERG_CONFIG.SUPABASE_URL,window.BERG_CONFIG.SUPABASE_ANON_KEY):null}
function sanitizeSession(value){const clean=(value||"").trim().toLowerCase().replace(/[^a-z0-9-]/g,"").slice(0,32);return SESSION_PATTERN.test(clean)?clean:""}
function randomSession(){return`kurs-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(0,8)}`}
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
function activePrompt(rows){return controlRows(rows).filter(row=>row.event_type==="prompt"&&row.payload&&!/^(feedback|product|miss|score|card|debate|focus):/.test(String(row.payload))).at(-1)?.payload||""}
function activeWorkMode(rows){const last=controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("mode:")).at(-1),mode=String(last?.payload||"mode:standard").replace("mode:","");return WORK_MODES[mode]?mode:"standard"}
function activeFocus(rows){const focus=controlRows(rows).filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("focus:")).at(-1);return String(focus?.payload||"").replace("focus:","")}
function groupAvatarsFromRows(rows){const avatars=new Map(),excluded=excludedGroups(rows);controlRows(rows).filter(row=>row.event_type==="manual"&&String(row.payload||"").startsWith("avatar:")).forEach(row=>{const avatar=String(row.payload).replace("avatar:","");if(AVATARS.some(item=>item.id===avatar)&&row.gruppen_id!=="lehrkraft"&&!excluded.has(row.gruppen_id))avatars.set(row.gruppen_id,avatar)});return avatars}
function avatarById(id){return AVATARS.find(avatar=>avatar.id===id)||AVATARS[0]}
function sectorRequirement(sector,rows){return activeWorkMode(rows)==="cooperative"?effectiveGroupTargetFromRows(rows):1}
function sectorGroupCounts(rows){const counts=new Map(),excluded=excludedGroups(rows);rows.filter(row=>row.status==="erledigt"&&row.sektor!=="finale"&&row.sektor!=="control"&&row.gruppen_id!=="lehrkraft"&&!excluded.has(row.gruppen_id)).forEach(row=>{if(!counts.has(row.sektor))counts.set(row.sektor,new Set());counts.get(row.sektor).add(row.gruppen_id)});return counts}
function sectorCompletion(rows){const counts=sectorGroupCounts(rows),manual=new Set(rows.filter(row=>row.gruppen_id==="lehrkraft"&&row.status==="erledigt"&&row.sektor!=="control"&&row.sektor!=="finale").map(row=>row.sektor));return new Map(SECTORS.map(sector=>{const required=sectorRequirement(sector,rows),count=counts.get(sector.id)?.size||0,complete=manual.has(sector.id)||count>=required;return[sector.id,{count,required,complete,ratio:Math.min(1,count/required)}]}))}
function completedSectorIds(rows){const completion=sectorCompletion(rows);return new Set([...completion].filter(([,value])=>value.complete).map(([id])=>id))}
function finaleRequested(rows){return rows.some(row=>row.sektor==="finale"&&row.status==="erledigt")}
function compassThreshold(rows){return Math.max(1,effectiveGroupTargetFromRows(rows))*34}
function compassReady(rows){const scores=scoreRows(rows);if(!scores.length)return true;const totals=classValueTotals(rows),target=compassThreshold(rows);return VALUE_KEYS.every(key=>totals[key]>=target)}
function compassWeakValues(rows){const totals=classValueTotals(rows),target=compassThreshold(rows);return VALUE_KEYS.filter(key=>totals[key]<target)}
function bossFinaleReady(rows){const completion=sectorCompletion(rows),groups=sectorGroupCounts(rows).get("nazareth")?.size||0,target=activeWorkMode(rows)==="cooperative"?effectiveGroupTargetFromRows(rows):1;return SECTORS.every(sector=>completion.get(sector.id)?.complete)&&groups>=target&&compassReady(rows)}
function moduleOverrides(rows){const overrides=new Map();controlRows(rows).filter(row=>row.event_type==="groups"&&String(row.payload||"").startsWith("module:")).forEach(row=>{const payload=String(row.payload||""),rest=payload.slice("module:".length),separator=rest.indexOf(":"),id=rest.slice(0,separator),raw=rest.slice(separator+1);if(!id)return;if(raw==="reset"){overrides.delete(id);return}try{overrides.set(id,JSON.parse(raw))}catch{try{overrides.set(id,JSON.parse(decodeURIComponent(raw)))}catch{}}});return overrides}
function moduleFor(id,rows=[]){const base=DEFAULT_MODULES.find(module=>module.id===id)||DEFAULT_MODULES[0],override=moduleOverrides(rows).get(id)||{};return{...base,...override}}
function sortTasksByLearningPath(tasks){const order=new Map(SECTORS.map((sector,index)=>[sector.id,index]));return tasks.sort((a,b)=>(order.get(a.sector)??99)-(order.get(b.sector)??99)||((a.difficulty||1)-(b.difficulty||1)))}
function taskSkillLabel(task){return{sort:"Ordnen",cards:"Karten deuten",case:"Fall anwenden",match:"Zuordnen",quest:"Moralquest",conflict:"Konfliktkarten",puzzle:"Puzzle",compass:"Bitten-Kompass",trust:"Vertrauensquest",decode:"Entschlüsseln",logic:"Logikrätsel",rpg:"Finalquest",mini:"Kurzentscheidungen",levels:"Levelspiel",word:"Wort-Rätsel",unlockword:"Buchstaben-Rätsel",dialog:"Dialog",chat:"Chat-Simulation",wimmel:"Wimmelbild",path:"Lernpfad",finalquest:"Finalquest"}[task?.type]||"Spiel bearbeiten"}
function rankForScore(total){return RANKS.slice().reverse().find(rank=>total>=rank.min)||RANKS[0]}
function parseScorePayload(payload){const parts=String(payload||"").split(":");if(parts[0]!=="score")return null;const values={frieden:0,gerechtigkeit:0,vertrauen:0};String(parts[2]||"").split(",").forEach(pair=>{const[key,value]=pair.split("=");if(key in values)values[key]=Number(value)||0});return{taskId:parts[1],values}}
function scoreRows(rows){const excluded=excludedGroups(rows);return rows.filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("score:")&&!excluded.has(row.gruppen_id)).map(row=>({group:row.gruppen_id,...parseScorePayload(row.payload)})).filter(item=>item.values)}
function classValueTotals(rows){const totals={frieden:0,gerechtigkeit:0,vertrauen:0};scoreRows(rows).forEach(item=>VALUE_KEYS.forEach(key=>totals[key]+=item.values[key]||0));return totals}
function groupValueTotals(rows,groupId){const totals={frieden:0,gerechtigkeit:0,vertrauen:0};scoreRows(rows).filter(item=>item.group===groupId).forEach(item=>VALUE_KEYS.forEach(key=>totals[key]+=item.values[key]||0));return totals}
function cardRows(rows){const excluded=excludedGroups(rows);return rows.filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("card:")&&!excluded.has(row.gruppen_id)).map(row=>{const parts=String(row.payload).split(":"),type=parts[1],name=parts.slice(2).join(":");return{type,name,group:row.gruppen_id,created_at:row.created_at}}).filter(card=>card.type&&card.name)}
function debateRows(rows){const excluded=excludedGroups(rows);return rows.filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("debate:")&&!excluded.has(row.gruppen_id)).map(row=>{const parts=String(row.payload).split(":"),side=Number(parts[1]),text=parts.slice(2).join(":");return{side,text,group:row.gruppen_id}}).filter(item=>Number.isFinite(item.side)&&item.text)}
function feedbackOverrides(rows){const map=new Map();controlRows(rows).filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("feedback:")).forEach(row=>{const payload=String(row.payload),rest=payload.slice("feedback:".length),separator=rest.indexOf(":"),sector=rest.slice(0,separator),text=rest.slice(separator+1);if(sector&&text)map.set(sector,text)});return map}
function feedbackFor(sector,rows=[]){return feedbackOverrides(rows).get(sector)||DEFAULT_FEEDBACK[sector]||"Nehmt diese Station als Gesprächsanlass mit ins Plenum."}
function productRows(rows){const excluded=excludedGroups(rows);return rows.filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("product:")&&!excluded.has(row.gruppen_id)).map(row=>{const payload=String(row.payload),rest=payload.slice("product:".length),separator=rest.indexOf(":"),sector=rest.slice(0,separator),text=rest.slice(separator+1);return{sector,text,group:row.gruppen_id,created_at:row.created_at}}).filter(item=>item.sector&&item.text)}
function diagnosticRows(rows){return rows.filter(row=>row.event_type==="prompt"&&String(row.payload||"").startsWith("miss:")).map(row=>{const[,taskIndex,type,sector]=String(row.payload).split(":");return{taskIndex:Number(taskIndex),type,sector,group:row.gruppen_id,created_at:row.created_at}}).filter(item=>Number.isFinite(item.taskIndex)&&item.type&&item.sector)}
function diagnosticSummary(rows){const summary=new Map();diagnosticRows(rows).forEach(item=>{const key=`${item.sector}:${item.type}`;if(!summary.has(key))summary.set(key,{sector:item.sector,type:item.type,count:0,groups:new Set()});const entry=summary.get(key);entry.count++;entry.groups.add(item.group)});return[...summary.values()].sort((a,b)=>b.count-a.count)}
function escapeHtml(value){return String(value||"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function setConnectionStatus(text,isLive=false){const label=document.getElementById("connectionLabel"),dot=document.querySelector(".status-dot");if(label)label.textContent=text;if(dot)dot.classList.toggle("live",isLive)}
function registerOffline(){if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{})}
registerOffline();
