(() => {
 'use strict';
 const root = './assets/playground/';
 const concepts = [
  {title:'F1 Next Race',type:'Built · Android widget',files:['f1-live','f1-countdown'],copy:'Race weekends, at a glance. Session times, countdowns, circuit outlines and live standings on your Android home screen.',link:'https://github.com/joejojy/f1-android-widget-',x:7,y:54,w:29,tilt:-3},
  {title:'Maps',type:'Navigation concept',files:['1'],copy:'Exploring a more useful route-planning experience, with the journey and its details in one view.',x:11,y:24,w:8,tilt:7},
  {title:'Fitness',type:'Fitness concept',files:['2'],copy:'A playful exploration of fitness summaries, activity rings and personal progress.',x:36,y:20,w:13,tilt:-6},
  {title:'Photo cleanup',type:'Photos concept',files:['3'],copy:'An unexpected take on photo-library cleanup: a focused prompt to rethink which memories you keep.',x:81,y:17,w:10,tilt:7},
  {title:'Spotify chat',type:'Music & chat concept',files:['7'],copy:'What if sharing music and talking about it lived in the same place? A conversation layer inside the listening experience.',x:65,y:46,w:27,tilt:-4},
  {title:'Virtual try-on',type:'Shopping concept',files:['10'],copy:'Exploring a shopping flow that lets you create an avatar and preview how an outfit could look before choosing it.',x:56,y:27,w:16,tilt:5},
  {title:'Goodreads',type:'Reading concept',files:['13'],copy:'A refreshed reading experience that brings your bookshelf, discovery and reading goals together.',x:36,y:73,w:29,tilt:4},
  {title:'Booking reminders',type:'Booking concept',files:['12.1','12.2'],copy:'A small addition to movie booking: set a reminder when the show or time you want is not yet available.',x:81,y:74,w:10,tilt:-5},
  {title:'Emergency response',type:'Service concept',files:['5'],copy:'A concept for requesting emergency assistance, sharing a location and following the response in one place.',x:8,y:110,w:27,tilt:-3},
  {title:'Everyday learning',type:'Learning concept',files:['6'],copy:'Small lessons, daily challenges and a community feed make everyday civic learning more approachable.',x:55,y:115,w:25,tilt:4},
  {title:'Woof',type:'Pet wellbeing concept',files:['8'],copy:'A daily snapshot of a pet’s wellbeing, bringing activity, recovery and routine into a single dashboard.',x:39,y:112,w:10,tilt:-5},
  {title:'Ask a previous buyer',type:'Shopping concept',files:['9'],copy:'A product-review idea that lets shoppers ask long-term owners questions about real use, comfort and durability.',x:83,y:115,w:11,tilt:5},
  {title:'Forwarding, reconsidered',type:'Messaging concept',files:['11'],copy:'An exploration of the message-forwarding screen and how people choose recipients.',x:20,y:162,w:11,tilt:-5},
  {title:'Shared expenses',type:'Messaging concept',files:['14.1','14.2'],copy:'An expense-splitting experience within a group conversation, keeping shared spending close to the people involved.',x:54,y:162,w:13,tilt:5}
 ];
 const icon = (name) => `<img src="${root}${name}.svg" alt="" aria-hidden="true">`;
 const entry = document.createElement('section');
 entry.className = 'pg-entry'; entry.id = 'playground-entry';
 entry.innerHTML = '<p class="section-index">04 Playground</p><h2>Ideas in the air.</h2><p>Small experiments, unexpected features, and things I built out of curiosity.</p><a href="#playground">Enter Playground ↗</a>';
 const contactIndex=document.querySelector('#contact .section-index');
 const sectionNumber=parseInt(contactIndex.textContent,10)||4;
 entry.querySelector('.section-index').textContent=String(sectionNumber).padStart(2,'0')+' Playground';
 document.querySelector('#contact').before(entry);contactIndex.textContent=String(sectionNumber+1).padStart(2,'0')+' Contact';
 document.querySelectorAll('nav a[href="#contact"]').forEach(a => {const link=document.createElement('a');link.href='#playground';link.textContent='Playground';a.before(link);});
 const world = document.createElement('section'); world.className='pg-world';world.id='playground';world.hidden=true;world.setAttribute('aria-label','Playground');
 world.innerHTML=`<canvas class="pg-sky" aria-hidden="true"></canvas><div class="pg-title"><h1 tabindex="-1">Playground</h1><p>If the sky’s the limit, reach it.</p></div><div class="pg-space" aria-label="Floating design gallery"><div class="pg-plane" tabindex="0" aria-label="Explore the sky. Drag in any direction. Scroll or pinch to fly forwards and backwards. Arrow keys move; Home returns to the start."></div></div><div class="pg-controls"><button class="pg-icon pg-time" type="button" aria-label="Switch to night">${icon('sun')}</button><button class="pg-icon pg-weather" type="button" aria-label="Change weather to cloudy">${icon('cloud')}</button></div><p class="pg-status" role="status" aria-live="polite"></p>`;
 document.body.append(world);
 const plane=world.querySelector('.pg-plane'),space=world.querySelector('.pg-space');
 concepts.forEach((c,i)=>{
  const item=document.createElement('article');item.className='pg-item';
  item.dataset.concept=String(i);item.style.cssText=`--x:${c.x}%;--y:calc(${c.y} * var(--pg-unit, 1vh));--w:${c.w}%;--tilt:${c.tilt}deg;--duration:${8+i%5*1.7}s;--delay:-${i*1.3}s`;
  item.innerHTML=`<div class="pg-float"><button class="pg-card" type="button" aria-label="Open ${c.title}"><img src="${root}${c.files[0]}-thumb.jpg" alt="${c.title} design preview" draggable="false" ${i>7?'loading="lazy"':''}><span class="pg-label">${c.title}<small>${c.type}</small></span></button><div class="pg-hint" aria-hidden="true"><strong>${c.title}</strong><p>${c.copy}</p><span>Explore ↗</span></div></div>`;
  item.querySelector('button').addEventListener('click',()=>{if(!dragged)openConcept(i);});plane.append(item);
 });
 const dialog=document.createElement('dialog');dialog.className='pg-dialog';dialog.setAttribute('aria-labelledby','pg-detail-title');
 dialog.innerHTML=`<div class="pg-dialog-head"><p class="pg-detail-type"></p><button class="pg-icon pg-close" type="button" aria-label="Close design">${icon('x')}</button></div><div class="pg-dialog-media"><img alt=""></div><div class="pg-dialog-tools"><button class="pg-icon pg-prev" type="button" aria-label="Previous image">${icon('arrow-left')}</button><span class="pg-page"></span><button class="pg-icon pg-next" type="button" aria-label="Next image">${icon('arrow-right')}</button><button class="pg-text-button pg-zoom" type="button">View full size</button></div><div class="pg-dialog-copy"><h2 id="pg-detail-title"></h2><p></p><a target="_blank" rel="noopener noreferrer" hidden>View project ↗</a></div>`;
 document.body.append(dialog);
 let selected=0,slide=0,opener=null;
 function renderSlide(){const c=concepts[selected];const img=dialog.querySelector('.pg-dialog-media img');img.src=root+c.files[slide]+'.png';img.alt=`${c.title} — design ${slide+1} of ${c.files.length}`;dialog.querySelector('.pg-page').textContent=`${slide+1} / ${c.files.length}`;dialog.querySelector('.pg-prev').disabled=slide===0;dialog.querySelector('.pg-next').disabled=slide===c.files.length-1;dialog.querySelector('.pg-dialog-media').classList.remove('is-zoomed');dialog.querySelector('.pg-zoom').textContent='View full size';}
 function openConcept(i){selected=i;slide=0;opener=document.activeElement;const c=concepts[i];dialog.querySelector('#pg-detail-title').textContent=c.title;dialog.querySelector('.pg-detail-type').textContent=c.type;dialog.querySelector('.pg-dialog-copy p').textContent=c.copy;const link=dialog.querySelector('.pg-dialog-copy a');link.hidden=!c.link;link.href=c.link||'#';renderSlide();dialog.showModal();}
 dialog.querySelector('.pg-close').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.querySelector('.pg-prev').onclick=()=>{if(slide>0){slide--;renderSlide();}};
 dialog.querySelector('.pg-next').onclick=()=>{if(slide<concepts[selected].files.length-1){slide++;renderSlide();}};
 dialog.querySelector('.pg-zoom').onclick=()=>{const zoom=dialog.querySelector('.pg-dialog-media').classList.toggle('is-zoomed');dialog.querySelector('.pg-zoom').textContent=zoom?'Fit image':'View full size';};

 let entered=false,returnScroll=0,dragged=false;
 const canvas=world.querySelector('canvas'),ctx=canvas.getContext('2d',{alpha:false});
 const timeButton=world.querySelector('.pg-time'),weatherButton=world.querySelector('.pg-weather'),status=world.querySelector('.pg-status');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const camera={x:0,y:0,z:0},target={x:0,y:0,z:0},velocity={x:0,y:0,z:0};
 let width=1,height=1,focal=900,frame=0,last=0,clock=0,manualTime=false;
 function localMood(date=new Date()){const h=date.getHours();return h<6||h>=20?'night':h<9?'morning':h<17?'day':'sunset';}
 let time=localMood(),weather=0,cover=0,stormMix=0;
 const weatherNames=['clear','cloudy','rainy'];
 const textures={};
 for(const [name,file] of Object.entries({day:'sky.png',night:'night.png',cloud:'cloud-bank.png',storm:'storm-bank.png'})){
  const image=new Image();image.src=root+file;image.onload=()=>{textures[name]=image;prepareClouds();if(entered)draw();};
 }
 let cloudVariants={};
 function prepareClouds(){
  if(!textures.cloud||!textures.storm)return;
  for(const mood of ['day','night','morning','sunset']) for(const kind of ['cloud','storm']){
   const source=textures[kind],sheet=document.createElement('canvas');sheet.width=768;sheet.height=512;
   const paint=sheet.getContext('2d');paint.drawImage(source,0,0,768,512);
   if(mood!=='day'){paint.globalCompositeOperation='source-atop';paint.globalAlpha=mood==='night'?.77:.25;paint.fillStyle={night:'#152237',morning:'#ebc5b0',sunset:'#9c6788'}[mood];paint.fillRect(0,0,768,512);}
   cloudVariants[mood+kind]=sheet;
  }
 }
 // Deterministic cloud volume. Three overlapping scale bands give foreground,
 // middle-distance and far clouds independent parallax and wind speeds.
 const random=i=>{const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n);};
 const clouds=Array.from({length:72},(_,i)=>({x:(random(i+1)-.5)*9000,y:(random(i+90)-.5)*5700,z:700+random(i+190)*6200,size:900+random(i+290)*1700,wind:8+random(i+390)*18,phase:random(i+490)*6.28,seed:i}));
 const layout=[
  [-.30,.08,1450],[-.40,-.22,2200],[-.08,-.24,2700],[.36,-.26,1900],
  [.29,.07,1750],[.12,-.20,3100],[-.04,.35,1700],[.38,.36,2300],
  [-.75,.12,2500],[.74,-.15,2800],[-.36,-.70,3100],[.60,.72,3400],
  [-.62,.65,2900],[.24,-.67,3300]
 ];
 const items=[...plane.querySelectorAll('.pg-item')].map((el,i)=>{
  const [sx,sy,z]=layout[i],c=concepts[i];
  const p={el,button:el.querySelector('button'),x:sx*1440*z/900,y:sy*1024*z/900,z,baseWidth:c.w/100*1440*z/900,baseHeight:300,phase:i*1.7,tilt:c.tilt,paused:false,shown:true};
  el.style.width=p.baseWidth+'px';
  el.addEventListener('pointerenter',()=>p.paused=true);el.addEventListener('pointerleave',()=>p.paused=false);
  p.button.addEventListener('focus',()=>{p.paused=true;if(keyboardFocus){target.x=p.x;target.y=p.y;target.z=Math.max(-600,p.z-1400);}});
  p.button.addEventListener('blur',()=>p.paused=false);
  return p;
 });
 let keyboardFocus=false;
 document.addEventListener('keydown',()=>keyboardFocus=true);
 document.addEventListener('pointerdown',()=>keyboardFocus=false);
 function updateAtmosphere(announce=false){
  world.dataset.time=time;world.dataset.weather=weatherNames[weather];
  timeButton.innerHTML=icon(time==='night'?'moon':'sun');timeButton.setAttribute('aria-label',time==='night'?'Switch to daytime sky':'Switch to night sky');
  weatherButton.innerHTML=icon(['sun','cloud','cloud-rain'][weather]);weatherButton.setAttribute('aria-label',`Change weather to ${weatherNames[(weather+1)%3]}`);
  if(announce)status.textContent=`${time} sky, ${weatherNames[weather]}`;
  if(reduced.matches){cover=weather;stormMix=weather===2?1:0;}
  if(entered){draw();start();}
 }
 timeButton.onclick=()=>{manualTime=true;time=time==='night'?'day':'night';updateAtmosphere(true);};
 weatherButton.onclick=()=>{weather=(weather+1)%3;updateAtmosphere(true);};
 setInterval(()=>{if(!manualTime){const next=localMood();if(next!==time){time=next;updateAtmosphere();}}},60000);
 function homeCamera(){return width<700?{x:-600,y:70,z:150}:{x:0,y:0,z:0};}function resetCamera(){Object.assign(target,homeCamera());Object.assign(velocity,{x:0,y:0,z:0});}
 function resize(){width=innerWidth;height=innerHeight;focal=width<700?480:Math.min(width/1440,height/1024)*900;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);if(entered)draw();}
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 function constrain(){target.x=clamp(target.x,-4300,4300);target.y=clamp(target.y,-3100,3100);target.z=clamp(target.z,-1200,2500);}
 function advance(dt){
  if(!reduced.matches&&!dialog.open){clock+=dt;target.x+=velocity.x*dt;target.y+=velocity.y*dt;target.z+=velocity.z*dt;}
  const damping=Math.exp(-dt*5);velocity.x*=damping;velocity.y*=damping;velocity.z*=damping;constrain();
  const follow=reduced.matches?1:1-Math.exp(-dt*8);for(const axis of ['x','y','z'])camera[axis]+=(target[axis]-camera[axis])*follow;
  cover+=(weather-cover)*(1-Math.exp(-dt*1.7));stormMix+=((weather===2?1:0)-stormMix)*(1-Math.exp(-dt*1.8));
 }
 function drawClouds(){
  const bank=cloudVariants[time+'cloud'],storm=cloudVariants[time+'storm'];if(!bank||!storm)return;
  const count=7+cover*32;
  const projected=[];
  for(const c of clouds){
   const presence=clamp(count-c.seed,0,1);if(presence===0)continue;
   const wx=((c.x+clock*c.wind+4800)%9600)-4800;
   const z=c.z-camera.z*.62; if(z<160)continue;
   const k=focal/z,x=width*.5+(wx-camera.x*.76)*k,y=height*.54+(c.y-camera.y*.76+Math.sin(clock*.06+c.phase)*28)*k;
   const w=c.size*(1+cover*.25)*k,h=w*2/3;
   if(x+w/2<0||x-w/2>width||y+h/2<0||y-h/2>height)continue;
   projected.push({z,x,y,w,h,alpha:presence*Math.min(1,(z-160)/400)*(.22+cover*.16),phase:c.phase});
  }
  projected.sort((a,b)=>b.z-a.z);
  for(const p of projected){
   const breathing=1+Math.sin(clock*.025+p.phase)*.035;
   ctx.globalAlpha=p.alpha*(1-stormMix*.9);ctx.drawImage(bank,p.x-p.w/2,p.y-p.h/2,p.w*breathing,p.h);
   if(stormMix>.005){ctx.globalAlpha=p.alpha*stormMix*1.4;ctx.drawImage(storm,p.x-p.w*.58,p.y-p.h*.52,p.w*1.16,p.h*1.12);}
  }
  ctx.globalAlpha=1;
 }
 function draw(){
  if(world.hidden)return;
  const night=time==='night';
  ctx.fillStyle=night?'#060e1c':time==='sunset'?'#8c798b':time==='morning'?'#bbd2de':'#8eb8d1';ctx.fillRect(0,0,width,height);
  const bg=night?textures.night:textures.day;
  if(bg){
   const scale=Math.max(width/bg.width,height/bg.height)*1.22,bw=bg.width*scale,bh=bg.height*scale;
   const dx=-(bw-width)/2-camera.x*.015+Math.sin(clock*.009)*20,dy=-(bh-height)/2-camera.y*.01;
   ctx.globalAlpha=night?.6+cover*.17:.13+cover*.22;ctx.drawImage(bg,dx,dy,bw,bh);ctx.globalAlpha=1;
  }
  if(time==='sunset'||time==='morning'){ctx.globalAlpha=time==='sunset'?.25:.12;ctx.fillStyle='#d7a17e';ctx.fillRect(0,0,width,height);ctx.globalAlpha=1;}
  drawClouds();
  if(stormMix>.01){ctx.globalAlpha=stormMix*.21;ctx.fillStyle=night?'#07111e':'#233b50';ctx.fillRect(0,0,width,height);ctx.globalAlpha=1;}
  if(stormMix>.02&&!reduced.matches){ctx.strokeStyle=night?'#b4cad54d':'#27425555';ctx.lineWidth=.8;ctx.beginPath();for(let i=0;i<110;i++){const depth=.45+random(i+800)*.8,x=(random(i+950)*(width+160)+clock*65*depth-camera.x*.08)%(width+160)-80,y=(random(i+1000)*height+clock*520*depth)%(height+60)-30;ctx.moveTo(x,y);ctx.lineTo(x-6*depth,y+20*depth);}ctx.globalAlpha=stormMix;ctx.stroke();ctx.globalAlpha=1;}
  for(const [i,p] of items.entries()){
   const z=p.z-camera.z;if(z<220){p.el.style.visibility='hidden';p.shown=false;continue;}
   const k=focal/z;
   const drifting=reduced.matches?0:clock;
   if(!p.paused||p.waveX===undefined){p.waveX=Math.sin(drifting*.22+p.phase)*22;p.waveY=Math.cos(drifting*.17+p.phase)*25;p.waveTilt=Math.sin(drifting*.10+p.phase)*1.8;}
   const x=width*.5+(p.x-camera.x+p.waveX)*k,y=Math.max(height*.60,460)+(p.y-camera.y+p.waveY)*k;
   p.el.style.visibility='visible';p.shown=true;p.el.style.setProperty('--label-size',12/k+'px');p.el.style.setProperty('--small-size',11/k+'px');p.el.style.setProperty('--hint-width',240/k+'px');p.el.style.setProperty('--hint-size',14/k+'px');p.el.style.zIndex=String(Math.round(10000-z));
   p.el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${k}) rotate(${p.tilt+p.waveTilt}deg)`;
   const visibility=clamp((z-220)/240,0,1)*clamp((y-150)/90,0,1);p.el.style.opacity=String(visibility);p.el.style.pointerEvents=visibility<.1?'none':'auto';
   p.el.dataset.depth=String(Math.round(z));
  }
  world.classList.toggle('is-travelling',Math.abs(camera.x-homeCamera().x)+Math.abs(camera.y-homeCamera().y)+Math.abs(camera.z-homeCamera().z)>360);world.dataset.camera=`${Math.round(camera.x)},${Math.round(camera.y)},${Math.round(camera.z)}`;
  world.dataset.cloudCoverage=cover.toFixed(2);
 }
 function tick(now){const dt=last?Math.min((now-last)/1000,.05):.016;last=now;advance(dt);draw();frame=requestAnimationFrame(tick);}
 function start(){if(!frame&&!document.hidden&&entered)frame=requestAnimationFrame(tick);}
 function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
 const pointers=new Map();let lastPoint=null,pinchDistance=0,dragStart=null;
 space.addEventListener('pointerdown',e=>{
  if(dialog.open||e.button>0)return;dragged=false;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});lastPoint={x:e.clientX,y:e.clientY,t:performance.now()};dragStart={x:e.clientX,y:e.clientY};
  if(pointers.size===2){const [a,b]=[...pointers.values()];pinchDistance=Math.hypot(a.x-b.x,a.y-b.y);}
 });
 window.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);target.z+=(distance-pinchDistance)*5;pinchDistance=distance;dragged=true;}
  else if(lastPoint){
   const dx=e.clientX-lastPoint.x,dy=e.clientY-lastPoint.y;
   if(dragStart&&Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y)>5)dragged=true;
   if(dragged){const speed=1400/focal;target.x-=dx*speed;target.y-=dy*speed;velocity.x=-dx*speed*11;velocity.y=-dy*speed*11;space.classList.add('is-dragging');}
   lastPoint={x:e.clientX,y:e.clientY,t:performance.now()};
  }
  constrain();if(reduced.matches){Object.assign(camera,target);draw();}
 });
 function endPointer(e){pointers.delete(e.pointerId);if(!pointers.size){lastPoint=null;dragStart=null;space.classList.remove('is-dragging');setTimeout(()=>dragged=false,80);}else{const p=[...pointers.values()][0];lastPoint={...p,t:performance.now()};}}
 window.addEventListener('pointerup',endPointer);window.addEventListener('pointercancel',endPointer);
 space.addEventListener('wheel',e=>{if(dialog.open)return;e.preventDefault();target.z+=e.deltaY*(e.deltaMode===1?18:1.3);target.x+=e.deltaX*1.1;velocity.z=0;constrain();if(reduced.matches){Object.assign(camera,target);draw();}},{passive:false});
 space.addEventListener('dblclick',e=>{if(!e.target.closest('.pg-card'))resetCamera();});
 document.addEventListener('keydown',e=>{
  if(!entered||dialog.open||e.target.closest('nav')||document.querySelector('.mobile-nav.is-open'))return;
  const moves={ArrowLeft:['x',-180],a:['x',-180],ArrowRight:['x',180],d:['x',180],ArrowUp:['y',-160],w:['y',-160],ArrowDown:['y',160],s:['y',160],'+':['z',180],'=':['z',180],'-':['z',-180]};
  if(moves[e.key]){e.preventDefault();const [axis,delta]=moves[e.key];target[axis]+=delta;constrain();if(reduced.matches){Object.assign(camera,target);draw();}}
  if(e.key==='Home'){e.preventDefault();resetCamera();}
  if(e.key==='Escape')location.hash='playground-entry';
 });
 function route(){const open=location.hash==='#playground';if(open===entered)return;entered=open;
  if(open){returnScroll=scrollY;world.hidden=false;document.body.classList.add('pg-open');document.querySelector('main').inert=true;document.querySelector('.site-footer')?.setAttribute('inert','');document.querySelector('#mobile-nav')?.classList.remove('is-open');document.querySelector('#mobile-nav')?.setAttribute('aria-hidden','true');document.querySelector('#hamburger')?.setAttribute('aria-expanded','false');document.body.style.overflow='';resize();resetCamera();Object.assign(camera,target);plane.focus({preventScroll:true});start();}
  else {if(dialog.open)dialog.close();world.hidden=true;document.body.classList.remove('pg-open');document.querySelector('main').inert=false;document.querySelector('.site-footer')?.removeAttribute('inert');stop();const id=decodeURIComponent(location.hash.slice(1)),destination=document.getElementById(id||'home');if(destination)destination.scrollIntoView({behavior:'instant'});else scrollTo(0,returnScroll);}
 }
 window.addEventListener('hashchange',route);
 document.querySelectorAll('a[href="#playground"]').forEach(a=>a.addEventListener('click',()=>{if(location.hash==='#playground')route();}));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(entered)start();});
 window.addEventListener('resize',resize);updateAtmosphere();route();
})();







