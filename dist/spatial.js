// Presentation only. Document processing and inference remain independent.
const host=document.getElementById('evidence-scene');
if(host){
 const descriptions={source:'Documents become overlapping passages. Each passage keeps its source, page and OCR provenance.',retrieval:'BM25 and local embeddings rank the passages. Hybrid search combines their ranks with reciprocal rank fusion.',evidence:'Retrieved passages stay visible beside the answer. Open a citation to inspect the original source text.'};
 let stage='source',paused=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??true,visible=false,busy=false,disposed=false;
 let renderer,scene,camera,assembly,frames=0,lastFrame=0,rotation=0,resizeObserver,intersection,mutation,animation=0;
 let pointer={x:0,y:0},target={x:0,y:0},parts={},resources=[];
 const pause=document.getElementById('scene-motion'),status=document.getElementById('scene-description');
 function updateMotion(){pause.textContent=paused?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused));}
 function selectStage(event){const button=event.target.closest('[data-scene-stage]');if(!button)return;stage=button.dataset.sceneStage;document.querySelectorAll('[data-scene-stage]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));status.textContent=descriptions[stage];draw();}
 function toggle(){paused=!paused;updateMotion();schedule();}
 function move(event){if(event.pointerType==='touch')return;const rect=host.getBoundingClientRect();target={x:(event.clientX-rect.left)/rect.width-.5,y:(event.clientY-rect.top)/rect.height-.5};if(paused)draw();}
 function leave(){target={x:0,y:0};if(paused)draw();}
 function pageVisibility(){schedule();}
 document.getElementById('scene-stages').addEventListener('click',selectStage);
 pause.addEventListener('click',toggle);host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
 document.addEventListener('visibilitychange',pageVisibility);updateMotion();
 function draw(){
  if(!renderer||disposed)return;const reduce=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  pointer.x+=(target.x-pointer.x)*.08;pointer.y+=(target.y-pointer.y)*.08;
  assembly.rotation.y=-.3+(reduce?0:pointer.x*.18)+rotation;assembly.rotation.x=.05+(reduce?0:pointer.y*.07);
  parts.sheets.forEach((sheet,i)=>{sheet.position.y=.24+i*.2+(stage==='source'?i*.13:0);});
  parts.ring.material.color.set(stage==='retrieval'?0xf3bc74:0x778887);parts.evidence.material.emissiveIntensity=stage==='evidence'?1.2:.35;
  renderer.render(scene,camera);frames++;host.dataset.frames=String(frames);
 }
 function tick(time){animation=0;if(!renderer||disposed)return;if(time-lastFrame>=33){if(!paused)rotation+=.0008;draw();lastFrame=time;}schedule();}
 function schedule(){if(animation){cancelAnimationFrame(animation);animation=0;}if(renderer&&!disposed&&visible&&!busy&&!document.hidden&&!paused)animation=requestAnimationFrame(tick);}
 async function initialize(){
  if(renderer||disposed||host.dataset.loading)return;host.dataset.loading='true';
  try{
   const T=await import('./vendor/three/three.module.js');if(disposed)return;
   const canvas=host.querySelector('canvas');renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
   scene=new T.Scene();camera=new T.PerspectiveCamera(32,1,.1,60);camera.position.set(6.7,5.2,8.8);camera.lookAt(0,.55,0);
   scene.add(new T.HemisphereLight(0xe7eef1,0x262b2a,3));const key=new T.DirectionalLight(0xffffff,4);key.position.set(3,7,4);scene.add(key);
   const amber=new T.PointLight(0xffc480,45,12);amber.position.set(-3,2,1);scene.add(amber);const rim=new T.DirectionalLight(0xb2ced6,3);rim.position.set(-3,2,-5);scene.add(rim);
   assembly=new T.Group();scene.add(assembly);
   function mesh(geometry,material,parent=assembly){resources.push(geometry,material);const object=new T.Mesh(geometry,material);parent.add(object);return object;}
   const base=mesh(new T.CylinderGeometry(2.4,2.4,.16,80),new T.MeshStandardMaterial({color:0x262f30,metalness:.85,roughness:.3}));base.position.y=-.5;
   const disc=mesh(new T.CylinderGeometry(2.05,2.05,.025,80),new T.MeshStandardMaterial({color:0x0d1315,metalness:.75,roughness:.23}));disc.position.y=-.4;
   for(let i=0;i<48;i++){const angle=i/48*Math.PI*2;const mark=mesh(new T.BoxGeometry(i%4===0?.018:.012,.012,i%4===0?.14:.065),new T.MeshBasicMaterial({color:i%4===0?0xbdaa84:0x65716f}));mark.position.set(Math.sin(angle)*2.23,-.409,Math.cos(angle)*2.23);mark.rotation.y=angle;}
   const orbit=mesh(new T.TorusGeometry(1.95,.013,6,100),new T.MeshStandardMaterial({color:0x778887,metalness:.7,roughness:.3}));orbit.rotation.x=Math.PI/2;orbit.position.y=.6;parts.ring=orbit;
   const orbit2=mesh(new T.TorusGeometry(2.04,.006,4,100),new T.MeshBasicMaterial({color:0x7a6750,transparent:true,opacity:.55}));orbit2.rotation.x=Math.PI/2;orbit2.position.y=.8;
   function paperTexture(index){
    const c=document.createElement('canvas');c.width=768;c.height=1024;const ctx=c.getContext('2d');ctx.fillStyle=index===3?'#e6dec9':'#a7b0ad';ctx.fillRect(0,0,768,1024);
    ctx.fillStyle='#5a655f';ctx.font='22px sans-serif';ctx.fillText('EVIDENCE LAB / SOURCE',60,80);ctx.fillStyle='#25342f';ctx.font='bold 55px sans-serif';ctx.fillText(index===3?'Source material':'Document '+(index+1),60,190);
    ctx.fillStyle='#65726a';for(let i=0;i<12;i++){const width=[590,540,610,430][i%4];if(i===5||i===6){ctx.fillStyle='#b8955b';ctx.fillRect(54,275+i*43,width+10,29);ctx.fillStyle='#405045';}ctx.fillRect(60,283+i*43,width,7);}ctx.font='24px sans-serif';ctx.fillText('Local retrieval / inspectable sources',60,950);
    const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;resources.push(texture);return texture;
   }
   parts.sheets=[];for(let i=0;i<4;i++){const sheet=new T.Group();assembly.add(sheet);sheet.position.set((i-1.5)*.09,.24+i*.2,(i-1.5)*-.045);sheet.rotation.y=(i-1.5)*.09;mesh(new T.BoxGeometry(1.7,.035,2.3),new T.MeshStandardMaterial({color:0x9da9a5,metalness:.25,roughness:.6}),sheet);const face=mesh(new T.PlaneGeometry(1.66,2.26),new T.MeshStandardMaterial({map:paperTexture(i),roughness:.8,metalness:.08}),sheet);face.rotation.x=-Math.PI/2;face.position.y=.019;parts.sheets.push(sheet);}
   const evidence=mesh(new T.BoxGeometry(1.96,.09,.085),new T.MeshStandardMaterial({color:0xffc887,emissive:0xbf772c,emissiveIntensity:.35,roughness:.4,metalness:.4}));evidence.position.set(.12,1.3,.36);parts.evidence=evidence;
   const marker=mesh(new T.OctahedronGeometry(.115),new T.MeshStandardMaterial({color:0xf5bc70,emissive:0x6f421a,metalness:.6,roughness:.3}));marker.position.set(1.93,.8,0);
   const resize=()=>{if(disposed)return;const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();draw();};resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
   canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();host.dataset.render='fallback';disposeGraphics();},{once:true});host.dataset.render='ready';pause.hidden=false;schedule();
  }catch{host.dataset.render='fallback';pause.hidden=true;disposeGraphics();}
 }
 function disposeGraphics(){if(animation)cancelAnimationFrame(animation);animation=0;resizeObserver?.disconnect();for(const resource of new Set(resources))resource.dispose?.();resources=[];renderer?.dispose();renderer=null;}
 function dispose(){disposed=true;disposeGraphics();intersection?.disconnect();mutation?.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',pageVisibility);}
 if(typeof IntersectionObserver==='function'&&typeof ResizeObserver==='function'){intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)void initialize();schedule();},{threshold:.05});intersection.observe(host);const lab=document.getElementById('lab-panel');mutation=new MutationObserver(()=>{busy=lab.getAttribute('aria-busy')==='true';schedule();});mutation.observe(lab,{attributes:true,attributeFilter:['aria-busy']});window.addEventListener('pagehide',event=>{if(event.persisted){if(animation)cancelAnimationFrame(animation);animation=0;}else dispose();});window.addEventListener('pageshow',pageVisibility);}else{pause.hidden=true;host.dataset.render='fallback';}
}
