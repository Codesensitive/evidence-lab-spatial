// CSS perspective and lighting only; independent of every RAG application module.
const host=document.getElementById('evidence-scene');
if(host){
 const descriptions={source:'Documents become overlapping passages. Each passage keeps its source, page and OCR provenance.',retrieval:'BM25 and local embeddings rank the passages. Hybrid search combines their ranks with reciprocal rank fusion.',evidence:'Retrieved passages stay visible beside the answer. Open a citation to inspect the original source text.'};
 const reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)'),pause=document.getElementById('scene-motion'),lab=document.getElementById('lab-panel');
 let paused=reduced?.matches??true,visible=false,busy=false,frame=0;
 const observerSupported=typeof IntersectionObserver==='function'&&typeof ResizeObserver==='function';
 const updateMotion=()=>{host.classList.toggle('motion-running',!paused&&visible&&!busy&&!document.hidden);pause.textContent=paused?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused));};
 const buttons=[...document.querySelectorAll('[data-scene-stage]')];
 function activateStage(stage,focus=false){
  if(!descriptions[stage])return;
  for(const button of buttons){const selected=button.dataset.sceneStage===stage;button.setAttribute('aria-pressed',String(selected));button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected&&focus)button.focus();}
  for(const panel of host.querySelectorAll('[data-pipeline-panel]')){const selected=panel.dataset.pipelinePanel===stage;panel.classList.toggle('is-active',selected);panel.setAttribute('aria-hidden',String(!selected));panel.inert=!selected;}
  host.dataset.stage=stage;document.getElementById('scene-description').textContent=descriptions[stage];
 }
 document.getElementById('scene-stages').addEventListener('click',event=>{const button=event.target.closest('[data-scene-stage]');if(button)activateStage(button.dataset.sceneStage);});
 document.getElementById('scene-stages').addEventListener('keydown',event=>{
  const current=buttons.findIndex(button=>button===event.target);if(current<0)return;
  let next;if(event.key==='ArrowRight')next=(current+1)%buttons.length;else if(event.key==='ArrowLeft')next=(current+buttons.length-1)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;
  event.preventDefault();activateStage(buttons[next].dataset.sceneStage,true);
 });
 activateStage(host.dataset.stage||'source');
 pause.addEventListener('click',()=>{paused=!paused;updateMotion();});
 const reset=()=>{host.style.removeProperty('--scene-x');host.style.removeProperty('--scene-y');};
 const move=event=>{if(event.pointerType==='touch'||reduced?.matches||busy)return;if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=0;const r=host.getBoundingClientRect();host.style.setProperty('--scene-x',((event.clientX-r.left)/r.width-.5)*4+'deg');host.style.setProperty('--scene-y',-((event.clientY-r.top)/r.height-.5)*3+'deg');});};
 host.addEventListener('pointermove',move);host.addEventListener('pointerleave',reset);
 const motionChange=()=>{paused=!!reduced?.matches;reset();updateMotion();};reduced?.addEventListener?.('change',motionChange);
 document.addEventListener('visibilitychange',updateMotion);
 if(observerSupported){
  host.dataset.render='ready';pause.hidden=false;
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;updateMotion();},{threshold:.05});intersection.observe(host);
  const mutation=new MutationObserver(()=>{busy=lab.getAttribute('aria-busy')==='true';updateMotion();});mutation.observe(lab,{attributes:true,attributeFilter:['aria-busy']});
  window.addEventListener('pagehide',event=>{if(frame)cancelAnimationFrame(frame);frame=0;host.classList.remove('motion-running');if(!event.persisted){intersection.disconnect();mutation.disconnect();document.removeEventListener('visibilitychange',updateMotion);reduced?.removeEventListener?.('change',motionChange);}}, {once:false});
  window.addEventListener('pageshow',updateMotion);
 }else{host.dataset.render='fallback';pause.hidden=true;}
 updateMotion();
}
