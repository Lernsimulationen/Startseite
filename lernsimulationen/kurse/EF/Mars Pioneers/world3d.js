import * as THREE from './vendor/three.module.min.js';

export function createWorld(api){
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setClearColor(0x101d2a);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
 const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','application');canvas.setAttribute('aria-label','3D-Station. WASD oder Pfeiltasten bewegen den Avatar. E interagiert, I öffnet das Inventar. Alle Aktionen sind auch in der Stationsliste möglich.');
 const scene=new THREE.Scene();scene.fog=new THREE.Fog(0x101d2a,35,85);
 const camera=new THREE.PerspectiveCamera(47,1,.1,160);
 scene.add(new THREE.HemisphereLight(0xd8ecff,0x62524a,2.2));const sun=new THREE.DirectionalLight(0xffdfbe,2.6);sun.position.set(-4,12,8);scene.add(sun);const fill=new THREE.DirectionalLight(0x8fcbff,1.4);fill.position.set(12,8,-15);scene.add(fill);
 const materials=new Map(),geometries=new Set(),textures=[];const targets=[],doors=[],itemObjects=[],limbs=[];
 function material(color,emissive=0){const key=color+':'+emissive;if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,roughness:.65,metalness:.16,emissive,emissiveIntensity:emissive?.6:0}));return materials.get(key);}
 function mesh(geometry,color,x,y,z,parent=scene){geometries.add(geometry);const m=new THREE.Mesh(geometry,material(color));m.position.set(x,y,z);parent.add(m);return m;}
 function box(w,h,d,color,x,y,z,parent=scene){return mesh(new THREE.BoxGeometry(w,h,d),color,x,y,z,parent);}
 function sphere(radius,color,x,y,z,parent){return mesh(new THREE.SphereGeometry(radius,16,12),color,x,y,z,parent);}
 function label(text,x,y,z,width=3.5,color='#d8eee9'){const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');ctx.fillStyle='rgba(13,25,35,.94)';ctx.fillRect(0,0,512,96);ctx.strokeStyle='#597180';ctx.lineWidth=3;ctx.strokeRect(2,2,508,92);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='500 30px system-ui';ctx.fillText(text,256,48,476);const t=new THREE.CanvasTexture(c);textures.push(t);const mat=new THREE.SpriteMaterial({map:t,depthTest:false});const s=new THREE.Sprite(mat);s.position.set(x,y,z);s.scale.set(width,width*96/512,1);scene.add(s);return s;}
 const roomNames=['CREWARCHIV','WERKSTATT','FORSCHUNGSLABOR','FUNKRAUM','SCHLEUSE','ANTENNE'];
 const accents=[0xf7ad74,0x79cbb9,0x98bce8,0xc4a4e2,0xf0cd84,0x94d6e2];
 const floors=[];
 for(let r=0;r<6;r++){
  const x=r*14,accent=accents[r];floors.push(box(13.9,.3,10,0x243746,x,-.2,0));
  for(let a=-6;a<=6;a+=2){box(.018,.01,9.7,0x425460,x+a,-.035,0);}
  for(let z=-4;z<=4;z+=2)box(13.8,.01,.018,0x425460,x,-.035,z);
  box(14,.18,.16,accent,x,.01,-4.55);box(14,.18,.16,0x57798a,x,.01,4.55);
  box(14,2.7,.2,0x1a2b39,x,1.35,-5);box(14,.8,.2,0x1a2b39,x,.4,5);
  // Tall rear window panels and low front parapet keep the station readable.
  for(let wx=-4;wx<=4;wx+=4){box(3.25,1.45,.06,0x4b687a,x+wx,1.65,-4.87);box(3.1,1.25,.08,0x243f53,x+wx,1.65,-4.82);box(3.1,.035,.08,accent,x+wx,.98,-4.75);}
  for(let z of [-3.2,3.2]){box(.22,2.7,3.6,0x263a48,x+7,1.35,z);}
  box(.35,.35,3,0x526e7c,x+7,2.85,0);box(.4,2.7,.22,accent,x+7,1.35,-1.5);box(.4,2.7,.22,accent,x+7,1.35,1.5);
  const door=box(.18,2.65,2.65,0x8b655b,x+7,1.32,0);doors.push(door);
  label(`${String(r+1).padStart(2,'0')} / ${roomNames[r]}`,x,3.3,-4.7,5.1);
  // Low consoles are positioned outside the walking lanes.
  for(let cx of [-4,0,4]){box(1.9,.7,1,0x354b59,x+cx,.35,-4.15);box(1.65,.09,.8,0x172a38,x+cx,.76,-4.05);box(.45,.035,.18,accent,x+cx,.82,-3.9);}
  box(2.1,.9,1.25,0x314c5c,x+3.9,.45,4.02);const screen=box(1.7,.85,.1,0x81cabb,x+3.9,1.27,4.4);screen.material=material(0x66b7a7,0x397e70);
  label('TERMINAL',x+3.9,2.02,4.1,2.35);
  const terminal={kind:'terminal',stage:r,x:x+3.9,z:3.25,label:'Terminal öffnen'};screen.userData.target=terminal;targets.push({object:screen,...terminal});
  if(r<5){const t={kind:'door',stage:r,x:x+5.6,z:0,label:'Zum nächsten Raum'};door.userData.target=t;targets.push({object:door,...t});}
  // Equipment and structural ribs provide depth without blocking controls.
  box(1.4,1.7,.8,0x2d4350,x-5.5,.85,4.25);for(let y=.3;y<1.5;y+=.3)box(1.1,.055,.04,0x7497a5,x-5.5,y,3.83);
  const docCount=r===1?4:3;
  const positions=[[-4,-3.25],[0,-3.25],[4,-3.25],[-3.2,3.25]];
  for(let i=0;i<docCount;i++){const [dx,z]=positions[i];const group=new THREE.Group();group.position.set(x+dx,.28,z);scene.add(group);const base=mesh(new THREE.CylinderGeometry(.45,.55,.16,16),0x263f4e,0,0,0,group);const capsule=box(.55,.65,.13,accent,0,.5,0,group);box(.33,.04,.025,0x193746,0,.61,-.08,group);box(.33,.04,.025,0x193746,0,.47,-.08,group);const ring=mesh(new THREE.TorusGeometry(.57,.025,6,28),accent,0,.05,0,group);ring.rotation.x=Math.PI/2;const tag=label(`DOKUMENT ${i+1}`,x+dx,1.5,z,2);const target={kind:'item',id:`doc-${r}-${i}`,stage:r,x:x+dx,z:z<0?z+.55:z-.55,label:`Dokument ${i+1} aufnehmen`};for(const child of group.children)child.userData.target=target;targets.push({object:group,...target});itemObjects.push({group,tag,capsule,id:target.id,stage:r});}
 }
 box(.2,2.7,10,0x263a48,-7,1.35,0);
 const moduleGroup=new THREE.Group();moduleGroup.position.set(-3.2,.3,3.25);scene.add(moduleGroup);const mod=mesh(new THREE.OctahedronGeometry(.42),0xc6a2ef,0,.48,0,moduleGroup);const moduleTag=label('ANALYSEMODUL',-3.2,1.65,3.25,2.9,'#dbc9f6');const moduleTarget={kind:'item',id:'module',stage:0,x:-3.2,z:2.7,label:'Analysemodul aufnehmen'};mod.userData.target=moduleTarget;targets.push({object:moduleGroup,...moduleTarget});itemObjects.push({group:moduleGroup,tag:moduleTag,capsule:mod,id:'module',stage:0});
 const avatar=new THREE.Group();scene.add(avatar);let suit=0xf69e67;const body=mesh(new THREE.CapsuleGeometry(.29,.42,4,12),suit,0,.94,0,avatar);const head=sphere(.32,0xe1e6e5,0,1.57,0,avatar);const visor=sphere(.265,0x122f45,0,1.57,.16,avatar);visor.scale.set(1,.7,.65);box(.4,.5,.23,0x586d79,0,1.05,-.32,avatar);box(.17,.12,.035,0xc2e9dd,0,1.04,.3,avatar);
 for(let side of [-1,1]){const arm=new THREE.Group();arm.position.set(side*.41,1.15,0);avatar.add(arm);const sleeve=mesh(new THREE.CapsuleGeometry(.095,.33,3,10),suit,0,-.2,0,arm);sphere(.105,0xcfdcdd,0,-.46,0,arm);const leg=new THREE.Group();leg.position.set(side*.16,.65,0);avatar.add(leg);mesh(new THREE.CapsuleGeometry(.115,.33,3,10),0x43586a,0,-.23,0,leg);box(.24,.13,.35,0x9aaeb8,0,-.48,.06,leg);limbs.push({arm,leg,side,sleeve});}
 const shadow=mesh(new THREE.CircleGeometry(.55,24),0x142633,0,.001,0,avatar);shadow.rotation.x=-Math.PI/2;
 let nameTag=label('CREW 07',0,2.2,0,2.7),currentName='',currentColor='';
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
 let mounted=null,raf=0,disposed=false,last=0,walkTime=0,position={x:0,z:2.5},goal=null,route=[],autoAction=null,nearest=null,keys=new Set(),lastPrompt='',lastSave=0,stage=-1;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const observer=new ResizeObserver(()=>resize());function resize(){if(!mounted)return;const w=mounted.clientWidth,h=mounted.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
 function savePosition(){api.onPosition({x:position.x,z:position.z});}
 function canMove(x,z,s){if(x< -5.9||x>s.stage*14+5.9||z< -3.8||z>3.8)return false;const oldRoom=Math.floor((position.x+7)/14),newRoom=Math.floor((x+7)/14);if(oldRoom!==newRoom&&Math.abs(z)>1.03)return false;return true;}
 function navigate(target){route=[];const from=Math.floor((position.x+7)/14),to=Math.floor((target.x+7)/14);if(from!==to){route.push({x:position.x,z:0});route.push({x:to*14,z:0});}route.push(target);goal=route.shift();}
 function interact(){savePosition();if(nearest)api.onInteract({kind:nearest.kind,id:nearest.id,stage:nearest.stage});}
 function tick(now){if(!mounted||disposed)return;const s=api.snapshot();if(s.paused){suspend();return;}const dt=Math.min(.045,(now-last)/1000||.016);last=now;
  let dx=(keys.has('east')?1:0)-(keys.has('west')?1:0),dz=(keys.has('south')?1:0)-(keys.has('north')?1:0);
  if(dx||dz){goal=null;route=[];autoAction=null;}else if(goal){dx=goal.x-position.x;dz=goal.z-position.z;if(Math.hypot(dx,dz)<.12){goal=route.shift()||null;dx=dz=0;if(!goal&&autoAction){const action=autoAction;autoAction=null;savePosition();api.onInteract(action);if(!mounted)return;}}}
  const moving=Math.hypot(dx,dz)>.02;if(moving){const length=Math.hypot(dx,dz);const step=Math.min(3.7*dt,goal?length:Infinity);const nx=position.x+dx/length*step,nz=position.z+dz/length*step;if(canMove(nx,position.z,s))position.x=nx;if(canMove(position.x,nz,s))position.z=nz;avatar.rotation.y=Math.atan2(dx,dz);walkTime+=dt*8;}
  avatar.position.set(position.x,0,position.z);for(const l of limbs){l.arm.rotation.x=moving?Math.sin(walkTime)*.42*l.side:0;l.leg.rotation.x=moving?-Math.sin(walkTime)*.5*l.side:0;}
  if(s.avatar.color!==currentColor){currentColor=s.avatar.color;const palette={orange:0xf69e67,mint:0x75c9b7,blue:0x72abe8,violet:0xb09bdb};body.material=material(palette[currentColor]);for(const l of limbs)l.sleeve.material=body.material;}
  if(s.avatar.name!==currentName){currentName=s.avatar.name;scene.remove(nameTag);nameTag.material.map?.dispose();nameTag.material.dispose();nameTag=label(currentName.toUpperCase(),position.x,2.25,position.z,2.7);}
  nameTag.position.set(position.x,2.3,position.z);
  const owned=new Set(s.items);for(const item of itemObjects){const visible=item.stage<=s.stage&&!owned.has(item.id);item.group.visible=visible;item.tag.visible=visible;if(visible&&!reduced.matches)item.capsule.position.y=.5+Math.sin(now*.0018+item.stage)*.06;}
  doors.forEach((door,i)=>{const open=i<s.stage||(i===s.stage&&s.solved);door.position.y=open?3.6:1.32;door.material=material(open?0x78b8a5:0x8b655b);});
  nearest=null;let distance=1.8;for(const target of targets){if(target.stage>s.stage||target.kind==='item'&&owned.has(target.id))continue;if(target.kind==='door'&&(target.stage!==s.stage||!s.solved))continue;const d=Math.hypot(target.x-position.x,target.z-position.z);if(d<distance){distance=d;nearest=target;}}
  const prompt=nearest?`${nearest.label} · E oder Schaltfläche`:'Geht zu einer leuchtenden Dokumentkapsel, einem Terminal oder einer freigegebenen Tür.';if(prompt!==lastPrompt){api.onPrompt(prompt,!!nearest);lastPrompt=prompt;}
  camera.position.set(position.x+8,12,position.z+12.5);camera.lookAt(position.x,0,position.z-1);renderer.render(scene,camera);
  if(now-lastSave>1500){savePosition();lastSave=now;}raf=requestAnimationFrame(tick);
 }
 function click(event){if(!mounted)return;canvas.focus();const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const s=api.snapshot(),owned=new Set(s.items);const candidates=targets.filter(t=>t.stage<=s.stage&&!(t.kind==='item'&&owned.has(t.id))&&!(t.kind==='door'&&(t.stage!==s.stage||!s.solved)));const hits=ray.intersectObjects(candidates.map(t=>t.object),true);if(hits.length){let t=hits[0].object.userData.target;let parent=hits[0].object.parent;while(!t&&parent){t=parent.userData.target;parent=parent.parent;}if(t){navigate({x:t.x,z:t.z});autoAction={kind:t.kind,id:t.id,stage:t.stage};return;}}
  if(ray.ray.intersectPlane(plane,hit)){navigate({x:Math.max(-5.8,Math.min(s.stage*14+5.8,hit.x)),z:Math.max(-3.7,Math.min(3.7,hit.z))});autoAction=null;}
 }
 const map={w:'north',ArrowUp:'north',s:'south',ArrowDown:'south',a:'west',ArrowLeft:'west',d:'east',ArrowRight:'east'};
 function keydown(e){if(document.activeElement!==canvas||!mounted)return;const key=map[e.key]||map[e.key.toLowerCase()];if(key){e.preventDefault();keys.add(key);}if(e.key.toLowerCase()==='e'&&!e.repeat){e.preventDefault();interact();}if(e.key.toLowerCase()==='i'&&!e.repeat){e.preventDefault();api.onInventory();}}
 function keyup(e){const key=map[e.key]||map[e.key.toLowerCase()];if(key)keys.delete(key);}
 function stopWalking(){keys.clear();}
 function contextLost(e){e.preventDefault();suspend();api.onError();}
 canvas.addEventListener('pointerup',click);canvas.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);canvas.addEventListener('blur',stopWalking);canvas.addEventListener('webglcontextlost',contextLost);window.addEventListener('blur',stopWalking);
 function mount(host){mounted=host;const s=api.snapshot();position={...s.position};stage=s.stage;goal=null;route=[];autoAction=null;host.replaceChildren(canvas);observer.observe(host);resize();last=performance.now();lastPrompt='';cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);}
 function suspend(){if(mounted&&api.snapshot().stage===stage)savePosition();cancelAnimationFrame(raf);if(mounted)observer.unobserve(mounted);mounted=null;keys.clear();goal=null;route=[];autoAction=null;}
 function dispose(){if(disposed)return;disposed=true;suspend();observer.disconnect();window.removeEventListener('keyup',keyup);window.removeEventListener('blur',stopWalking);renderer.dispose();for(const g of geometries)g.dispose();for(const m of materials.values())m.dispose();for(const t of textures)t.dispose();scene.traverse(o=>{if(o.isSprite)o.material.dispose();});}
 return {mount,suspend,dispose,interact,walk:(direction,on)=>{goal=null;if(on)keys.add(direction);else keys.delete(direction);},stopWalking};
}
