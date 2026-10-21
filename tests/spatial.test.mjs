import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {JSDOM} from 'jsdom';
const root=new URL('../',import.meta.url),manifest=JSON.parse(readFileSync(new URL('frozen-core.json',root)));
test('all 19 RAG application modules match the frozen live baseline',()=>{for(const [file,expected] of Object.entries(manifest.files)){const source=readFileSync(new URL(file,root),'utf8').replace(/\r\n/g,'\n');assert.equal(createHash('sha256').update(source).digest('hex'),expected,file);}});
test('the spatial UI retains every original application control ID',()=>{const document=new JSDOM(readFileSync(new URL('dist/index.html',root),'utf8')).window.document;for(const id of manifest.ids)assert.ok(document.getElementById(id),id);});
test('the scene gracefully falls back without observers while stage controls still explain the pipeline',async t=>{const dom=new JSDOM(readFileSync(new URL('dist/index.html',root),'utf8'));const oldDocument=globalThis.document;globalThis.document=dom.window.document;t.after(()=>{globalThis.document=oldDocument;dom.window.close();});await import('../dist/spatial.js?fallback-test');const document=dom.window.document;assert.equal(document.getElementById('evidence-scene').dataset.render,'fallback');assert.equal(document.getElementById('scene-motion').hidden,true);document.querySelector('[data-scene-stage="retrieval"]').click();assert.match(document.getElementById('scene-description').textContent,/reciprocal rank fusion/);assert.equal(document.querySelector('[data-scene-stage="retrieval"]').getAttribute('aria-pressed'),'true');assert.equal(document.querySelector('[data-scene-stage="source"]').getAttribute('aria-pressed'),'false');});
