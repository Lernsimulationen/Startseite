const canvas=document.querySelector("#game"),ctx=canvas.getContext("2d"),$=s=>document.querySelector(s);
const mediaMatches=query=>typeof matchMedia==="function"&&matchMedia(query).matches;
const touchDevice=("maxTouchPoints" in navigator&&navigator.maxTouchPoints>0)||mediaMatches("(pointer: coarse)")||mediaMatches("(hover: none)");
const reducedMotion=mediaMatches("(prefers-reduced-motion: reduce)");
document.documentElement.classList.toggle("touch-device",touchDevice);
const storage={
 get(key){try{return localStorage.getItem(key)}catch{return null}},
 set(key,value){try{localStorage.setItem(key,value);return true}catch{return false}},
 remove(key){try{localStorage.removeItem(key)}catch{}}
};
const image=src=>{const x=new Image();x.src=src;return x};
const backgrounds=[
 image("assets/bg-sun-islands.png"),
 image("assets/bg-shadow-agora.png"),
 image("assets/bg-cosmos-logos.png")
],avatarArt=image("assets/avatars.png"),objectArt=image("assets/game-objects.png"),toolArt=image("assets/tools.png");
const alphabet=[
 ["Α","α","Alpha","A"],["Β","β","Beta","B"],["Γ","γ","Gamma","G"],["Δ","δ","Delta","D"],
 ["Ε","ε","Epsilon","E"],["Ζ","ζ","Zeta","Z"],["Η","η","Eta","E"],["Θ","θ","Theta","Th"],
 ["Ι","ι","Iota","I"],["Κ","κ","Kappa","K"],["Λ","λ","Lambda","L"],["Μ","μ","My","M"],
 ["Ν","ν","Ny","N"],["Ξ","ξ","Xi","X"],["Ο","ο","Omikron","O"],["Π","π","Pi","P"],
 ["Ρ","ρ","Rho","R"],["Σ","σ/ς","Sigma","S"],["Τ","τ","Tau","T"],["Υ","υ","Ypsilon","Y"],
 ["Φ","φ","Phi","Ph"],["Χ","χ","Chi","Ch"],["Ψ","ψ","Psi","Ps"],["Ω","ω","Omega","O"]
];
const dimensions=[
 {name:"Sonneninseln",copy:"Die Großbuchstaben leuchten im Marmor.",tint:"rgba(10,64,92,.08)",form:0},
 {name:"Schatten-Agora",copy:"Die Zeichen erscheinen nun in ihrer kleinen Gestalt.",tint:"rgba(74,16,105,.35)",form:1},
 {name:"Kosmos des Logos",copy:"Groß und klein treffen in wechselnden Prüfungen aufeinander.",tint:"rgba(4,8,42,.48)",form:2}
];
const difficulty={
 easy:{hearts:5,speed:.9,quiz:3,penalty:0,label:"Entdecker"},
 normal:{hearts:3,speed:1,quiz:4,penalty:150,label:"Held"},
 hard:{hearts:2,speed:1.35,quiz:4,penalty:250,label:"Titan"}
};
const ui={start:$("#startScreen"),avatar:$("#avatarScreen"),quiz:$("#quizScreen"),portal:$("#portalScreen"),boss:$("#bossScreen"),end:$("#endScreen"),target:$("#targetCard"),greek:$("#targetGreek"),name:$("#targetName"),routeStep:$("#routeStep"),score:$("#score"),hearts:$("#hearts"),streak:$("#streak"),level:$("#levelLabel"),timer:$("#timer"),progress:$("#progressBar"),progressText:$("#progressText"),toast:$("#toast"),powers:$("#powerStatus")};
const WORLD_W=3200,GROUND=620;
let state,player,platforms=[],tokens=[],enemies=[],powerups=[],tools=[],particles=[],gate=null,keys={},raf,last=0,audioOn=false,audio,activeQuestion=null;
let resumeAfterVisibility=false,hiddenAt=0;

function loadStats(){
 const defaults={errors:{},correct:{},runs:[],totalCorrect:0,totalAnswers:0};
 try{
  const saved=JSON.parse(storage.get("alphaOdysseeStats"))||{};
  return{...defaults,...saved,errors:saved.errors||{},correct:saved.correct||{},runs:Array.isArray(saved.runs)?saved.runs:[]};
 }catch{return defaults}
}
function saveStats(){storage.set("alphaOdysseeStats",JSON.stringify(state.stats))}
function shuffled(values){
 const result=[...values];
 for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}
 return result;
}
function makeAlphabetRoute(){
 const source=Array.from({length:24},(_,i)=>i);
 let route=source;
 for(let attempt=0;attempt<80;attempt++){
  const candidate=shuffled(source);
  const sequential=candidate.slice(1).filter((value,i)=>Math.abs(value-candidate[i])===1).length;
  const sections=[candidate.slice(0,8),candidate.slice(8,16),candidate.slice(16)];
  const spread=sections.every(section=>new Set(section.map(i=>Math.floor(i/6))).size>=3);
  if(sequential<=2&&spread){route=candidate;break}
 }
 return route;
}
function resetGame(){
 const avatar=state?.avatar??Number(storage.get("alphaOdysseeAvatar")||0);
 const diff=document.querySelector('input[name="difficulty"]:checked')?.value||"normal";
 const mode=document.querySelector('input[name="gameMode"]:checked')?.value||"journey";
 const stats=loadStats();
 state={running:false,level:0,learned:0,learnedIndices:[],letterRoute:makeAlphabetRoute(),score:0,hearts:difficulty[diff].hearts,streak:0,bestStreak:0,camera:0,cameraY:0,cameraRoll:0,cameraZoom:1,quizCount:0,avatar,diff,mode,startTime:0,elapsed:0,stats,answerStart:stats.totalAnswers,correctStart:stats.totalCorrect,bossHp:6,bossQuestions:0,transitioning:false,buffs:{speed:0,magnet:0,shield:0,compass:0,freeze:0,sandals:0,lantern:0}};
 player={x:90,y:450,w:48,h:68,vx:0,vy:0,onGround:false,invincible:0,face:1,coyote:0,jumpBuffer:0,airJumpUsed:false};
 particles=[];makeLevel();updateUI();
}
function makeLevel(){
 platforms=[
  {x:0,y:GROUND,w:650,h:100,type:0},{x:720,y:550,w:275,h:40,type:1},{x:1050,y:465,w:235,h:40,type:2},
  {x:1350,y:565,w:310,h:40,type:0},{x:1740,y:485,w:250,h:40,type:1},{x:2070,y:395,w:245,h:40,type:2},
  {x:2380,y:525,w:245,h:40,type:1},{x:2690,y:GROUND,w:510,h:100,type:0}
 ];
 const routes=[
  [[350,530],[800,460],[1120,375],[1440,475],[1815,395],[2145,305],[2455,435],[2775,530]],
  [[300,530],[825,460],[1160,375],[1510,475],[1790,395],[2180,305],[2470,435],[2820,530]],
  [[420,530],[780,460],[1180,375],[1390,475],[1880,395],[2100,305],[2520,435],[2740,530]]
 ],spots=routes[state.level];
 const levelLetters=state.letterRoute.slice(state.level*8,state.level*8+8);
 tokens=spots.map((p,i)=>({x:p[0],y:p[1],r:29,index:levelLetters[i],routePosition:i,collected:false,bob:Math.random()*6}));
 const d=difficulty[state.diff];
 enemies=[{x:850,y:500,w:52,h:52,min:760,max:950,v:1.3*d.speed},{x:1460,y:510,w:52,h:52,min:1380,max:1600,v:-1.5*d.speed},{x:2420,y:470,w:52,h:52,min:2390,max:2570,v:1.45*d.speed}];
 const powerTypes=state.level===0?["shield","speed","magnet"]:state.level===1?["magnet","shield","speed"]:["speed","magnet","shield"];
 powerups=[
  {x:930,y:490,type:powerTypes[0],taken:false,bob:0},
  {x:1900,y:425,type:powerTypes[1],taken:false,bob:2},
  {x:2545,y:465,type:powerTypes[2],taken:false,bob:4}
 ];
 const toolSets=[["compass","scroll"],["sandals","lantern"],["compass","sandals","scroll","lantern"]];
 const toolSpots=state.level===2?[[580,540],[1540,505],[2190,335],[2780,545]]:[[1230,405],[2230,335]];
 tools=toolSpots.map((p,i)=>({x:p[0],y:p[1],type:toolSets[state.level][i],taken:false,bob:i*1.7}));
 gate={x:2890,y:388,w:180,h:232,active:false,pulse:0};
 player.x=90;player.y=450;player.vx=player.vy=0;player.coyote=player.jumpBuffer=0;player.airJumpUsed=false;state.camera=0;
}
function startGame(){
 const avatar=state.avatar;resetGame();state.avatar=avatar;state.running=true;state.startTime=performance.now();
 [ui.start,ui.avatar,ui.end].forEach(x=>x.classList.remove("active"));ui.target.classList.add("show");
 updateTarget();last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);tone(440,.08);
}
function loop(now){
 const dt=Math.min((now-last)/16.67,2);last=now;
 if(state.running){state.elapsed=(performance.now()-state.startTime)/1000;update(dt);updateTimer()}
 draw();raf=requestAnimationFrame(loop);
}
function update(dt){
 const move=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0),speedBoost=state.buffs.speed>0?1.35:1;
 player.vx+=move*.78*speedBoost*dt;player.vx*=Math.pow(.82,dt);player.vx=Math.max(-7.4*speedBoost,Math.min(7.4*speedBoost,player.vx));if(move)player.face=move;
 player.vy+=.72*dt;player.x+=player.vx*dt;player.y+=player.vy*dt;player.x=Math.max(0,Math.min(WORLD_W-player.w,player.x));
 const wasGrounded=player.onGround;player.onGround=false;player.coyote=Math.max(0,player.coyote-dt);player.jumpBuffer=Math.max(0,player.jumpBuffer-dt);
 platforms.forEach(p=>{if(player.vy>=0&&player.x+player.w>p.x+3&&player.x<p.x+p.w-3&&player.y+player.h>=p.y&&player.y+player.h-player.vy*dt<=p.y+11){player.y=p.y-player.h;player.vy=0;player.onGround=true;player.coyote=7;player.airJumpUsed=false}});
 if(wasGrounded&&!player.onGround)player.coyote=Math.max(player.coyote,6);
 if(player.jumpBuffer>0&&player.coyote>0){performJump()}
 if(player.y>760)hurt(true);if(player.invincible>0)player.invincible-=dt;
 enemies.forEach(e=>{if(state.buffs.freeze<=0)e.x+=e.v*dt;if(e.x<e.min||e.x>e.max)e.v*=-1;if(hit(player,e)&&player.invincible<=0){if(player.vy>2&&player.y+player.h<e.y+20){e.y=900;player.vy=-10;state.score+=150;burst(e.x,e.y,"#ffcb52")}else hurt(false)}});
 const next=tokens.find(t=>!t.collected);
 if(next&&state.buffs.magnet>0&&dist(player.x+24,player.y+34,next.x,next.y)<300){next.x+=(player.x+24-next.x)*.045*dt;next.y+=(player.y+20-next.y)*.045*dt}
 tokens.forEach(t=>{t.bob+=.045*dt;if(!t.collected&&dist(player.x+24,player.y+34,t.x,t.y)<48){if(t===next)collect(t);else{state.streak=0;showToast(`Erst ${letterDisplay(next.index)} sammeln!`);player.vx*=-1.4}}});
 powerups.forEach(p=>{p.bob+=.05*dt;if(!p.taken&&dist(player.x+24,player.y+34,p.x,p.y)<50)collectPowerup(p)});
 tools.forEach(t=>{t.bob+=.045*dt;if(!t.taken&&dist(player.x+24,player.y+34,t.x,t.y)<52)collectTool(t)});
 ["speed","magnet","compass","freeze","sandals","lantern"].forEach(k=>state.buffs[k]=Math.max(0,state.buffs[k]-dt));updatePowerStatus();
 gate.pulse+=.05*dt;
 if(gate.active&&hit(player,gate)&&!state.transitioning)openGateQuiz();
 state.camera+=(Math.max(0,Math.min(WORLD_W-canvas.width,player.x-canvas.width*.35))-state.camera)*.08;
 const airborne=Math.max(-1,Math.min(1,player.vy/14));
 state.cameraY+=(airborne*-10-state.cameraY)*.065;
 state.cameraRoll+=((reducedMotion?0:-player.vx*.0007)-state.cameraRoll)*.08;
 state.cameraZoom+=((reducedMotion?1:1.012+Math.abs(player.vx)*.001)-state.cameraZoom)*.06;
 particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.18*dt;p.life-=dt});particles=particles.filter(p=>p.life>0);
}
function performJump(air=false){player.vy=air?-12.2:-13.5;player.onGround=false;player.coyote=0;player.jumpBuffer=0;if(air)player.airJumpUsed=true;tone(air?440:300,.04)}
function jump(){
 if(!state.running)return;
 player.jumpBuffer=7;
 if(player.onGround||player.coyote>0)performJump();
 else if(state.buffs.sandals>0&&!player.airJumpUsed)performJump(true);
}
function letterDisplay(index,forceForm=null){
 const form=forceForm??dimensions[state.level].form;
 return form===0?alphabet[index][0]:form===1?alphabet[index][1]:(index%2?alphabet[index][1]:alphabet[index][0]);
}
function collect(t){
 t.collected=true;state.learned++;state.learnedIndices.push(t.index);state.streak++;state.bestStreak=Math.max(state.bestStreak,state.streak);state.score+=100+state.streak*20;
 burst(t.x,t.y,"#3ee6f2");tone(620,.08);showToast(`${alphabet[t.index][0]} ${alphabet[t.index][1]} · ${alphabet[t.index][2]} · ${alphabet[t.index][3]}`);
 if(!tokens.some(x=>!x.collected)){gate.active=true;showToast("Das Dimensions-Tor ist offen!");tone(820,.18)}
 updateUI();updateTarget();
}
function collectPowerup(p){
 p.taken=true;state.score+=200;burst(p.x,p.y,p.type==="shield"?"#ffd45c":p.type==="speed"?"#7fffd4":"#61dfff");
 if(p.type==="shield"){state.buffs.shield=1;showToast("Aegis-Amphore: Der nächste Treffer wird geblockt!")}
 if(p.type==="speed"){state.buffs.speed=600;showToast("Hermes-Lorbeer: Tempo für 10 Sekunden!")}
 if(p.type==="magnet"){state.buffs.magnet=600;showToast("Athene-Ring: Der nächste Buchstabe wird angezogen!")}
 tone(920,.14);updatePowerStatus();
}
function collectTool(t){
 t.taken=true;state.score+=250;burst(t.x,t.y,"#72e9ff");
 const durations={compass:900,scroll:480,sandals:900,lantern:900};
 if(t.type==="compass"){state.buffs.compass=durations.compass;showToast("Astrolabium: Es weist zum nächsten Buchstaben!")}
 if(t.type==="scroll"){state.buffs.freeze=durations.scroll;showToast("Zeitrolle: Gegner halten acht Sekunden inne!")}
 if(t.type==="sandals"){state.buffs.sandals=durations.sandals;player.airJumpUsed=false;showToast("Flügelsandalen: Doppelsprung für 15 Sekunden!")}
 if(t.type==="lantern"){state.buffs.lantern=durations.lantern;showToast("Eulenlaterne: Verborgene Objekte leuchten auf!")}
 tone(1040,.16);updatePowerStatus();
}
function hurt(fell){
 if(state.buffs.shield>0){state.buffs.shield=0;player.invincible=90;player.vy=-6;player.vx*=-1;burst(player.x+24,player.y+34,"#ffd45c");showToast("Die Aegis hat dich geschützt!");tone(520,.16);updatePowerStatus();return}
 state.hearts--;state.streak=0;player.invincible=90;tone(90,.18);showToast("Energie verloren – weiter geht’s!");
 if(state.hearts<=0){state.hearts=difficulty[state.diff].hearts;state.score=Math.max(0,state.score-difficulty[state.diff].penalty)}
 player.x=fell?Math.max(40,state.camera+80):Math.max(20,player.x-120);player.y=370;player.vy=0;updateUI();
}
function weightedLetter(pool){
 const weights=pool.map(i=>{
  const errors=state.stats.errors[i]||0,correct=state.stats.correct[i]||0;
  return 1+Math.max(0,errors-correct*.5)*3;
 });
 let roll=Math.random()*weights.reduce((a,b)=>a+b,0);
 for(let n=0;n<pool.length;n++){roll-=weights[n];if(roll<=0)return pool[n]}
 return pool[0];
}
function makeQuestion(context="checkpoint"){
 const pool=state.learnedIndices.length?[...new Set(state.learnedIndices)]:[state.letterRoute[0]];
 const idx=weightedLetter(pool),a=alphabet[idx],modes=context==="boss"?[0,1,2,3]:[0,1,2];
 const mode=modes[Math.floor(Math.random()*modes.length)],form=Math.random()<.5?0:1,display=a[form];
 let question,answer,render;
 if(mode===0){question=`Welcher Buchstabe heißt ${a[2]}?`;answer=display;render=x=>alphabet[x][form]}
 else if(mode===1){question=`Wie heißt der Buchstabe ${display}?`;answer=a[2];render=x=>alphabet[x][2]}
 else if(mode===2){question=`Welcher Kleinbuchstabe gehört zu ${a[0]}?`;answer=a[1];render=x=>alphabet[x][1]}
 else{question=`Welcher Großbuchstabe gehört zu ${a[1]}?`;answer=a[0];render=x=>alphabet[x][0]}
 const ids=[idx];while(ids.length<difficulty[state.diff].quiz){const x=Math.floor(Math.random()*24);if(!ids.includes(x))ids.push(x)}
 return{idx,question,answer,options:ids.map(render).sort(()=>Math.random()-.5),context};
}
function openQuiz(context="checkpoint"){
 state.running=false;activeQuestion=makeQuestion(context);$("#quizQuestion").textContent=activeQuestion.question;renderAnswers($("#answers"),activeQuestion,false);$("#quizFeedback").textContent="";ui.quiz.classList.add("active");
}
function openGateQuiz(){state.transitioning=true;openQuiz("gate")}
function renderAnswers(box,q,boss){
 box.innerHTML="";q.options.forEach(value=>{const b=document.createElement("button");b.className="answer";b.textContent=value;b.onclick=()=>answerQuestion(b,value===q.answer,q,boss);box.appendChild(b)})
}
function recordAnswer(q,ok){
 state.stats.totalAnswers++;if(ok){state.stats.totalCorrect++;state.stats.correct[q.idx]=(state.stats.correct[q.idx]||0)+1}else state.stats.errors[q.idx]=(state.stats.errors[q.idx]||0)+1;saveStats();
}
function answerQuestion(btn,ok,q,boss){
 const selector=boss?"#bossAnswers .answer":"#answers .answer";document.querySelectorAll(selector).forEach(b=>b.disabled=true);recordAnswer(q,ok);
 if(ok){btn.classList.add("correct");state.score+=boss?400:250;state.streak++;tone(760,.15)}
 else{
  btn.classList.add("wrong");state.streak=0;tone(120,.15);
  document.querySelectorAll(selector).forEach(b=>{if(b.textContent===q.answer)b.classList.add("reveal")});
 }
 updateUI();
 if(boss){$("#bossFeedback").textContent=ok?"Treffer! Der Wissensschild bricht.":`Die Sphinx widersteht. Richtig: ${q.answer}`;if(ok)state.bossHp--;$("#bossHealth").style.width=`${state.bossHp/6*100}%`;setTimeout(()=>state.bossHp<=0?finish():nextBossQuestion(),950);return}
 $("#quizFeedback").textContent=ok?"Richtig! Dein Wissen öffnet den Weg.":`Merke dir: ${q.answer}. Diese Karte kommt häufiger wieder.`;
 setTimeout(()=>{ui.quiz.classList.remove("active");if(q.context==="gate")travelDimension();else state.running=true},1100);
}
function travelDimension(){
 if(state.level===2){startBoss();return}
 const next=dimensions[state.level+1];$("#portalTitle").textContent=next.name;$("#portalCopy").textContent=next.copy;ui.portal.classList.add("active");ui.target.classList.remove("show");
 setTimeout(()=>{ui.portal.classList.remove("active");state.level++;state.transitioning=false;makeLevel();state.running=true;ui.target.classList.add("show");updateTarget();updateUI()},1900);
}
function startBoss(){
 ui.target.classList.remove("show");ui.boss.classList.add("active");state.running=false;state.bossHp=6;state.bossQuestions=0;$("#bossHealth").style.width="100%";nextBossQuestion();
}
function nextBossQuestion(){
 state.bossQuestions++;activeQuestion=makeQuestion("boss");$("#bossQuestion").textContent=activeQuestion.question;$("#bossFeedback").textContent="";renderAnswers($("#bossAnswers"),activeQuestion,true);
}
function finish(){
 state.running=false;ui.boss.classList.remove("active");ui.target.classList.remove("show");ui.end.classList.add("active");
 $("#finalScore").textContent=state.score;$("#finalBest").textContent=state.bestStreak;$("#finalTime").textContent=`Zeit: ${formatTime(state.elapsed)} · ${difficulty[state.diff].label} · ${state.mode==="speedrun"?"Speedrun":"Lernreise"}`;
 const best=Math.max(state.score,Number(storage.get("alphaOdysseeBest")||0));storage.set("alphaOdysseeBest",best);
 const sessionAnswers=state.stats.totalAnswers-state.answerStart,sessionCorrect=state.stats.totalCorrect-state.correctStart;
 const run={date:new Date().toISOString().slice(0,10),score:state.score,time:Math.round(state.elapsed),mode:state.mode,difficulty:state.diff,accuracy:sessionAnswers?Math.round(sessionCorrect/sessionAnswers*100):100};
 state.stats.runs.unshift(run);state.stats.runs=state.stats.runs.slice(0,12);saveStats();tone(880,.25);
}
function updateTarget(){
 const next=tokens.find(t=>!t.collected);
 if(!next){ui.routeStep.textContent="ROUTE VOLLSTÄNDIG";ui.greek.textContent="◌";ui.name.textContent="Zum Dimensions-Tor";return}
 const a=alphabet[next.index];ui.greek.textContent=letterDisplay(next.index);ui.name.textContent=`${a[2]} · ${a[3]}`;
 ui.routeStep.textContent=`ROUTE ${next.routePosition+1} / 8`;
}
function updateTimer(){ui.timer.textContent=state.mode==="speedrun"?formatTime(state.elapsed):"FREI"}
function formatTime(s){const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`}
function updateUI(){
 ui.score.textContent=String(state.score).padStart(4,"0");ui.hearts.textContent="♥ ".repeat(state.hearts).trim();ui.streak.textContent=`× ${state.streak}`;
 ui.level.textContent=state.level<3?`${state.level+1} / 3`:"BOSS";ui.progress.style.width=`${state.learned/24*100}%`;ui.progressText.textContent=`${state.learned} von 24 Zeichen gemeistert`;updateTimer();
 updatePowerStatus();
}
function updatePowerStatus(){
 if(!ui.powers)return;
 const active=[];
 if(state.buffs.shield>0)active.push('<span class="power-chip"><b>ΑΙΓΙΣ</b> Schutz</span>');
 if(state.buffs.speed>0)active.push(`<span class="power-chip"><b>ΕΡΜΗΣ</b> ${Math.ceil(state.buffs.speed/60)}s</span>`);
 if(state.buffs.magnet>0)active.push(`<span class="power-chip"><b>ΑΘΗΝΑ</b> ${Math.ceil(state.buffs.magnet/60)}s</span>`);
 if(state.buffs.compass>0)active.push(`<span class="power-chip tool"><b>◈</b> Kompass ${Math.ceil(state.buffs.compass/60)}s</span>`);
 if(state.buffs.freeze>0)active.push(`<span class="power-chip tool"><b>▤</b> Zeitrolle ${Math.ceil(state.buffs.freeze/60)}s</span>`);
 if(state.buffs.sandals>0)active.push(`<span class="power-chip tool"><b>⌁</b> Doppelsprung ${Math.ceil(state.buffs.sandals/60)}s</span>`);
 if(state.buffs.lantern>0)active.push(`<span class="power-chip tool"><b>◉</b> Laterne ${Math.ceil(state.buffs.lantern/60)}s</span>`);
 const markup=active.join("");
 if(ui.powers.innerHTML!==markup)ui.powers.innerHTML=markup;
}
function draw(){
 const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
 if(!state)return;
 drawBackground3D(w,h);
 ctx.fillStyle=dimensions[state.level]?.tint||dimensions[2].tint;ctx.fillRect(0,0,w,h);drawDimensionEffects(w,h);drawPerspectiveFloor(w,h);
 ctx.save();
 ctx.translate(w/2,h/2);ctx.rotate(state.cameraRoll);ctx.scale(state.cameraZoom,state.cameraZoom);ctx.translate(-w/2-state.camera,-h/2+state.cameraY);
 platforms.forEach(drawPlatform);
 tokens.forEach(t=>{if(!t.collected)drawGroundShadow(t.x,t.y,25,.2)});
 powerups.forEach(p=>{if(!p.taken)drawGroundShadow(p.x,p.y,24,.24)});
 tools.forEach(t=>{if(!t.taken)drawGroundShadow(t.x,t.y,25,.26)});
 enemies.forEach(e=>{if(e.y<800)drawGroundShadow(e.x+e.w/2,e.y+e.h,28,.32)});
 drawGroundShadow(player.x+player.w/2,player.y+player.h,32,.35);
 tokens.forEach(drawToken);powerups.forEach(drawPowerup);tools.forEach(drawTool);enemies.forEach(drawEnemy);if(gate)drawGate();drawToolGuidance();
 particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life/40);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.s,p.s)});ctx.globalAlpha=1;drawPlayer();ctx.restore();
 drawVignette(w,h);
}
function drawBackground3D(w,h){
 const bg=backgrounds[state.level]||backgrounds[0];if(!bg.complete)return;
 const scale=Math.max(h/bg.height,w/bg.width),bw=bg.width*scale,bh=bg.height*scale;
 ctx.save();ctx.filter=state.level===0?"saturate(1.04)":state.level===1?"saturate(1.08) brightness(.9)":"saturate(1.12) brightness(.88)";
 const farX=-(state.camera*.025%(Math.max(1,bw-w)));
 ctx.drawImage(bg,farX-25,(h-bh)/2-12,bw+50,bh+24);
 ctx.globalAlpha=touchDevice ? .12 : .22;if(!touchDevice&&!reducedMotion)ctx.filter+=" blur(5px)";const midX=-(state.camera*.075%(Math.max(1,bw-w)));ctx.drawImage(bg,midX,(h-bh)/2+25,bw,bh);ctx.restore();
 const haze=ctx.createLinearGradient(0,h*.28,0,h*.72);haze.addColorStop(0,"rgba(180,225,242,0)");haze.addColorStop(.55,state.level===2?"rgba(36,31,92,.22)":"rgba(190,229,235,.22)");haze.addColorStop(1,"rgba(6,24,45,.08)");ctx.fillStyle=haze;ctx.fillRect(0,h*.28,w,h*.44);
}
function drawPerspectiveFloor(w,h){
 const horizon=430;
 ctx.save();ctx.globalAlpha=state.level===2?.17:.09;ctx.strokeStyle=state.level===1?"#d98cff":"#b9f4ff";ctx.lineWidth=1;
 for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(w/2+i*18,horizon);ctx.lineTo(w/2+i*150,h);ctx.stroke()}
 for(let y=horizon+32;y<h;y+=Math.max(18,(y-horizon)*.24)){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
 ctx.restore();
}
function drawVignette(w,h){
 const vignette=ctx.createRadialGradient(w/2,h*.46,h*.18,w/2,h*.5,w*.72);vignette.addColorStop(0,"rgba(0,0,0,0)");vignette.addColorStop(1,"rgba(0,10,28,.34)");ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);
}
function drawDimensionEffects(w,h){
 if(state.level===1){ctx.fillStyle="#b86cff20";for(let i=0;i<7;i++){ctx.beginPath();ctx.arc((i*211-state.camera*.05)%w,80+i*67,32+i*8,0,Math.PI*2);ctx.fill()}}
 if(state.level===2){ctx.fillStyle="#fff";for(let i=0;i<45;i++){const x=(i*97-state.camera*.08)%w,y=(i*53)%430;ctx.globalAlpha=.2+(i%5)/10;ctx.fillRect(x,y,2+(i%3),2+(i%3))}ctx.globalAlpha=1}
}
function drawPlatform(p){
 if(!objectArt.complete)return;
 const sprites=[
  {crop:[45,90,650,230],alphaTop:32},
  {crop:[790,105,470,200],alphaTop:17},
  {crop:[1330,110,340,190],alphaTop:39}
 ],s=sprites[p.type],dh=Math.max(82,p.h+42),dy=p.y-(s.alphaTop/s.crop[3])*dh,depth=p.h>50?74:48,skew=24;
 ctx.save();
 ctx.fillStyle=state.level===1?"rgba(31,15,52,.68)":state.level===2?"rgba(6,17,52,.78)":"rgba(79,58,44,.54)";
 ctx.beginPath();ctx.moveTo(p.x+8,p.y+8);ctx.lineTo(p.x+p.w-8,p.y+8);ctx.lineTo(p.x+p.w+skew,p.y+depth);ctx.lineTo(p.x+skew,p.y+depth);ctx.closePath();ctx.fill();
 ctx.fillStyle="rgba(0,12,27,.18)";ctx.beginPath();ctx.moveTo(p.x+skew,p.y+depth);ctx.lineTo(p.x+p.w+skew,p.y+depth);ctx.lineTo(p.x+p.w+skew+18,p.y+depth+18);ctx.lineTo(p.x+skew+18,p.y+depth+18);ctx.closePath();ctx.fill();
 ctx.restore();
 ctx.drawImage(objectArt,...s.crop,p.x,dy,p.w,dh);
}
function surfaceBelow(x,y){
 let best=GROUND+110;
 for(const p of platforms)if(x>=p.x&&x<=p.x+p.w&&p.y>=y-5&&p.y<best)best=p.y;
 return best;
}
function drawGroundShadow(x,y,width,alpha){
 const surface=surfaceBelow(x,y),height=Math.max(0,surface-y),scale=Math.max(.35,1-height/330);
 ctx.save();ctx.translate(x,surface+4);ctx.scale(scale,1);ctx.fillStyle=`rgba(0,8,22,${alpha*scale})`;ctx.beginPath();ctx.ellipse(0,0,width,7,0,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawToken(t){
 if(t.collected)return;const y=t.y+Math.sin(t.bob)*7,spin=.82+Math.abs(Math.cos(t.bob*.65))*.18;ctx.save();ctx.translate(t.x,y);ctx.scale(spin,1);ctx.shadowColor=state.level===1?"#e17aff":"#3ee6f2";ctx.shadowBlur=26;
 if(objectArt.complete)ctx.drawImage(objectArt,650,400,360,360,-38,-38,76,76);
 ctx.shadowBlur=0;ctx.fillStyle="#fff4bf";ctx.font="bold 29px Georgia";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(letterDisplay(t.index),0,1);ctx.restore();
}
function drawPowerup(p){
 if(p.taken||!objectArt.complete)return;
 const y=p.y+Math.sin(p.bob)*6,crops={shield:[1350,440,220,350],speed:[1535,490,230,310],magnet:[642,419,388,357]},c=crops[p.type],sizes={shield:[50,72],speed:[64,64],magnet:[66,66]},s=sizes[p.type];
 ctx.save();ctx.translate(p.x,y);ctx.scale(.78+Math.abs(Math.cos(p.bob*.6))*.22,1);ctx.shadowColor=p.type==="shield"?"#ffd45c":p.type==="speed"?"#9fff65":"#61eaff";ctx.shadowBlur=24;ctx.drawImage(objectArt,...c,-s[0]/2,-s[1]/2,s[0],s[1]);ctx.restore();
}
function drawTool(t){
 if(t.taken||!toolArt.complete)return;
 const data={
  compass:{crop:[41,123,450,512],size:[62,70]},
  scroll:{crop:[551,160,421,454],size:[58,64]},
  sandals:{crop:[1012,170,475,468],size:[76,65]},
  lantern:{crop:[1487,123,408,507],size:[58,70]}
 },d=data[t.type],y=t.y+Math.sin(t.bob)*6,spin=.84+Math.abs(Math.cos(t.bob*.55))*.16;
 ctx.save();ctx.translate(t.x,y);ctx.scale(spin,1);ctx.shadowColor=t.type==="scroll"?"#80efff":t.type==="lantern"?"#ffc65c":"#e3b5ff";ctx.shadowBlur=24;ctx.drawImage(toolArt,...d.crop,-d.size[0]/2,-d.size[1]/2,...d.size);ctx.restore();
}
function drawToolGuidance(){
 const next=tokens.find(t=>!t.collected);
 if(state.buffs.compass>0&&next){
  const sx=player.x+player.w/2,sy=player.y-18,angle=Math.atan2(next.y-sy,next.x-sx);
  ctx.save();ctx.translate(sx,sy);ctx.rotate(angle);ctx.fillStyle="#72efff";ctx.shadowColor="#38dce9";ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(28,0);ctx.lineTo(4,-9);ctx.lineTo(9,0);ctx.lineTo(4,9);ctx.closePath();ctx.fill();ctx.restore();
 }
 if(state.buffs.lantern>0){
  ctx.save();ctx.globalCompositeOperation="screen";
  [...tokens.filter(t=>!t.collected),...powerups.filter(p=>!p.taken),...tools.filter(t=>!t.taken)].forEach(o=>{const g=ctx.createRadialGradient(o.x,o.y,2,o.x,o.y,62);g.addColorStop(0,"rgba(255,224,115,.36)");g.addColorStop(1,"rgba(255,224,115,0)");ctx.fillStyle=g;ctx.fillRect(o.x-62,o.y-62,124,124)});
  ctx.restore();
 }
}
function drawEnemy(e){
 if(e.y>800||!objectArt.complete)return;const owl=state.level===2;
 ctx.save();if(state.buffs.freeze>0){ctx.filter="hue-rotate(150deg) saturate(.65) brightness(1.2)";ctx.shadowColor="#8ceeff";ctx.shadowBlur=12}
 if(owl)ctx.drawImage(objectArt,405,405,235,350,e.x-4,e.y-30,60,82);else ctx.drawImage(objectArt,20,380,385,390,e.x-8,e.y-28,68,80);ctx.restore();
}
function drawGate(){
 if(!objectArt.complete)return;const pulse=1+Math.sin(gate.pulse)*.035,w=gate.w*pulse,h=gate.h*pulse,x=gate.x-(w-gate.w)/2,y=gate.y-(h-gate.h);
 ctx.save();ctx.filter=gate.active?"none":"grayscale(1)";
 for(let depth=5;depth>=1;depth--){ctx.globalAlpha=(gate.active?.07:.035)*(6-depth);ctx.drawImage(objectArt,1000,350,390,420,x+depth*7,y-depth*3,w,h)}
 ctx.globalAlpha=gate.active?1:.42;ctx.shadowColor=state.level===0?"#eaff57":state.level===1?"#d45cff":"#55eaff";ctx.shadowBlur=gate.active?28+Math.sin(gate.pulse)*12:0;ctx.drawImage(objectArt,1000,350,390,420,x,y,w,h);
 if(gate.active){ctx.globalCompositeOperation="screen";ctx.globalAlpha=.2+.12*Math.sin(gate.pulse*1.5);ctx.fillStyle=state.level===1?"#d45cff":"#55eaff";ctx.beginPath();ctx.ellipse(gate.x+gate.w/2,gate.y+gate.h/2,42+Math.sin(gate.pulse)*5,89,0,0,Math.PI*2);ctx.fill()}
 ctx.restore();
 const missing=tokens.filter(t=>!t.collected).length;
 ctx.fillStyle=gate.active?"#fff4a8":"#b8c2c9";ctx.font="800 16px Arial";ctx.textAlign="center";ctx.fillText(gate.active?"DIMENSIONS-TOR · OFFEN":`DIMENSIONS-TOR · ${missing} ZEICHEN FEHLEN`,gate.x+gate.w/2,gate.y-18);
}
function drawPlayer(){
 if(player.invincible>0&&Math.floor(player.invincible/5)%2||!avatarArt.complete)return;
 const sw=avatarArt.width/4,bounds=[
  {x:78,y:53,w:374,h:694},{x:55,y:54,w:379,h:693},{x:23,y:66,w:472,h:681},{x:0,y:55,w:372,h:692}
 ],b=bounds[state.avatar],sx=sw*state.avatar+b.x,dh=82,dw=dh*b.w/b.h,dx=player.x+(player.w-dw)/2,dy=player.y+player.h-dh+2;
 ctx.save();
 if(state.buffs.shield>0){ctx.save();ctx.globalAlpha=.72+.18*Math.sin(performance.now()/120);ctx.shadowColor="#ffd45c";ctx.shadowBlur=16;ctx.drawImage(objectArt,642,419,388,357,player.x-15,player.y-11,78,86);ctx.restore()}
 if(player.face<0){ctx.translate(dx+dw,0);ctx.scale(-1,1);ctx.drawImage(avatarArt,sx,b.y,b.w,b.h,0,dy,dw,dh)}
 else ctx.drawImage(avatarArt,sx,b.y,b.w,b.h,dx,dy,dw,dh);ctx.restore();
}
function burst(x,y,color){for(let i=0;i<16;i++)particles.push({x,y,vx:(Math.random()-.5)*7,vy:-Math.random()*7,s:3+Math.random()*5,life:25+Math.random()*20,color})}
function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function dist(a,b,c,d){return Math.hypot(a-c,b-d)}
function showToast(msg){ui.toast.textContent=msg;ui.toast.classList.add("show");clearTimeout(ui.toast.t);ui.toast.t=setTimeout(()=>ui.toast.classList.remove("show"),1500)}
function tone(freq,duration){
 if(!audioOn)return;
 try{
  const AudioEngine=window.AudioContext||window.webkitAudioContext;
  if(!AudioEngine)return;
  audio=audio||new AudioEngine();const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;o.type="triangle";g.gain.setValueAtTime(.06,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+duration);
 }catch{}
}
function renderReport(){
 const s=loadStats(),runs=s.runs||[];$("#reportRuns").textContent=runs.length;$("#reportAccuracy").textContent=s.totalAnswers?`${Math.round(s.totalCorrect/s.totalAnswers*100)} %`:"–";
 $("#reportBest").textContent=Math.max(0,...runs.map(r=>r.score||0),Number(storage.get("alphaOdysseeBest")||0));
 const times=runs.filter(r=>r.mode==="speedrun").map(r=>r.time);$("#reportSpeed").textContent=times.length?formatTime(Math.min(...times)):"–";
 const weak=Object.entries(s.errors||{}).sort((a,b)=>b[1]-a[1]).slice(0,8);$("#weakLetters").innerHTML=weak.length?weak.map(([i,n])=>`<span>${alphabet[i][0]} ${alphabet[i][1]} · ${n} Fehler</span>`).join(""):"<span>Noch keine Fehlerschwerpunkte</span>";
 $("#sessionList").innerHTML=runs.length?runs.map(r=>`<div>${r.date} · ${r.mode==="speedrun"?"Speedrun":"Lernreise"} · ${r.score} P · ${formatTime(r.time)} · ${r.accuracy}%</div>`).join(""):"<div>Noch keine abgeschlossene Sitzung.</div>";
}

addEventListener("keydown",e=>{keys[e.key]=true;keys[e.key.toLowerCase()]=true;if([" ","ArrowUp","w","W"].includes(e.key)){e.preventDefault();jump()}});
addEventListener("keyup",e=>{keys[e.key]=false;keys[e.key.toLowerCase()]=false});
$("#startBtn").onclick=()=>{ui.start.classList.remove("active");ui.avatar.classList.add("active")};$("#playBtn").onclick=startGame;$("#restartBtn").onclick=startGame;
$("#soundBtn").onclick=()=>{
 audioOn=!audioOn;
 $("#soundBtn").textContent=audioOn?"♪ Ton ausschalten":"♪ Ton einschalten";
 $("#soundBtn").setAttribute("aria-pressed",String(audioOn));
 tone(520,.08);
};
const alphabetDialog=$("#alphabetDialog"),privacy=$("#privacyDialog"),teacher=$("#teacherDialog"),toolsDialog=$("#toolsDialog");
function openDialog(dialog){
 dialog._resumeGame=Boolean(state?.running);
 dialog._pausedAt=dialog._resumeGame?performance.now():0;
 if(dialog._resumeGame){state.running=false;clearTouchControls()}
 if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
}
function closeDialog(dialog){
 if(typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");
 if(dialog._resumeGame){
  state.startTime+=performance.now()-dialog._pausedAt;
  last=performance.now();state.running=true;dialog._resumeGame=false;
 }
}
$("#alphabetBtn").onclick=()=>openDialog(alphabetDialog);$("#closeAlphabet").onclick=()=>closeDialog(alphabetDialog);$("#privacyBtn").onclick=()=>openDialog(privacy);$("#closePrivacy").onclick=()=>closeDialog(privacy);
$("#teacherBtn").onclick=()=>{renderReport();openDialog(teacher)};$("#closeTeacher").onclick=()=>closeDialog(teacher);
$("#toolsBtn").onclick=()=>openDialog(toolsDialog);$("#closeTools").onclick=()=>closeDialog(toolsDialog);
$("#deleteData").onclick=()=>{["alphaOdysseeBest","alphaOdysseeAvatar","alphaOdysseeStats"].forEach(k=>storage.remove(k));$("#deleteFeedback").textContent="Alle lokalen Spiel- und Lerndaten wurden gelöscht."};
$("#exportReport").onclick=()=>{const blob=new Blob([JSON.stringify(loadStats(),null,2)],{type:"application/json"}),a=document.createElement("a"),url=URL.createObjectURL(blob);a.href=url;a.download="alpha-odyssee-lernbericht.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
document.querySelectorAll(".avatar-option").forEach(option=>option.onclick=()=>{document.querySelectorAll(".avatar-option").forEach(x=>x.classList.remove("selected"));option.classList.add("selected");state.avatar=Number(option.dataset.avatar);storage.set("alphaOdysseeAvatar",state.avatar)});
$("#alphabetGrid").innerHTML=alphabet.map(a=>`<div><b>${a[0]} ${a[1]}</b><span>${a[2]} · ${a[3]}</span></div>`).join("");
function setControl(button,key,pressed){
 keys[key]=pressed;button.classList.toggle("pressed",pressed);
}
function hold(id,key){
 const b=$(id);
 if(window.PointerEvent){
  b.addEventListener("pointerdown",e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId);setControl(b,key,true)});
  ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setControl(b,key,false)}));
 }else{
  b.addEventListener("touchstart",e=>{e.preventDefault();setControl(b,key,true)},{passive:false});
  ["touchend","touchcancel"].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setControl(b,key,false)},{passive:false}));
 }
}
hold("#leftBtn","a");hold("#rightBtn","d");
const jumpButton=$("#jumpBtn");
function pressJump(e){e.preventDefault();jumpButton.classList.add("pressed");jump()}
function releaseJump(e){
 e.preventDefault();
 if(!jumpButton.classList.contains("pressed"))return;
 jumpButton.classList.remove("pressed");
 if(player?.vy< -5)player.vy*=.62;
}
if(window.PointerEvent){
 jumpButton.addEventListener("pointerdown",e=>{e.currentTarget.setPointerCapture?.(e.pointerId);pressJump(e)});
 ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>jumpButton.addEventListener(ev,releaseJump));
}else{
 jumpButton.addEventListener("touchstart",pressJump,{passive:false});
 ["touchend","touchcancel"].forEach(ev=>jumpButton.addEventListener(ev,releaseJump,{passive:false}));
}
function clearTouchControls(){
 keys.a=keys.d=false;
 ["#leftBtn","#rightBtn","#jumpBtn"].forEach(id=>$(id).classList.remove("pressed"));
}
addEventListener("blur",clearTouchControls);
document.addEventListener("visibilitychange",()=>{
 if(document.hidden){
  clearTouchControls();resumeAfterVisibility=Boolean(state?.running);hiddenAt=performance.now();
  if(resumeAfterVisibility)state.running=false;
 }else if(resumeAfterVisibility){
  state.startTime+=performance.now()-hiddenAt;last=performance.now();state.running=true;resumeAfterVisibility=false;
 }
});
canvas.addEventListener("touchmove",e=>e.preventDefault(),{passive:false});
canvas.addEventListener("contextmenu",e=>e.preventDefault());
resetGame();document.querySelectorAll(".avatar-option").forEach(x=>x.classList.toggle("selected",Number(x.dataset.avatar)===state.avatar));draw();
