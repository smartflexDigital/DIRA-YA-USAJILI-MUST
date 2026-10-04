import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {getFirestore,collection,getDocs,doc,getDoc,setDoc,deleteDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {CFG,ADMIN_EMAIL} from './firebase-config.js';
const $=id=>document.getElementById(id);
const h=(t,p={},...k)=>{const e=Object.assign(document.createElement(t),p);e.append(...k);return e};
if(CFG.apiKey.startsWith('PASTE')){$('msg').textContent='Jaza firebase-config.js kwanza (angalia MAELEKEZO.md).';$('lf').hidden=true}
else{
const app=initializeApp(CFG),auth=getAuth(app),db=getFirestore(app);
let U=[],F=[],C=[],tab='u';
const SW=new Set('ya wa na ni kwa je nini naomba nataka naweza vipi gani kuna hii hiyo the is of to a'.split(' '));
const kw=q=>[...new Set(q.split(' ').filter(w=>w.length>2&&!SW.has(w)))].join(' ');
const when=d=>d&&d.toDate?d.toDate().toLocaleDateString():'';
const sum=(a,k)=>a.reduce((s,x)=>s+(x[k]||0),0);
const btn=(t,f,c='')=>h('button',{textContent:t,className:c,type:'button',onclick:f});
async function load(){
const [u,f,c]=await Promise.all([getDocs(collection(db,'unanswered')),getDocs(collection(db,'feedback')),getDoc(doc(db,'config','customAnswers'))]);
U=u.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>b.n-a.n);
F=f.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.down>0).sort((a,b)=>b.down-a.down);
C=c.exists()?c.data().items||[]:[];
const allF=f.docs.map(d=>d.data());
$('stats').replaceChildren(...[[U.length,'Maswali tofauti yasiyo na jibu'],[sum(U,'n'),'Mara yaliyoulizwa'],['👍 '+sum(allF,'up')+'  👎 '+sum(allF,'down'),'Maoni ya wanafunzi'],[C.length,'Majibu yako maalum']].map(([n,l])=>h('div',{className:'st'},h('b',{textContent:n}),h('span',{textContent:l}))));
render()}
function render(){
$('tabs').replaceChildren(...[['u','Hayajajibiwa ('+U.length+')'],['f','👎 Majibu mabaya ('+F.length+')'],['c','Majibu yangu ('+C.length+')']].map(([k,t])=>btn(t,()=>{tab=k;render()},k===tab?'on':'ghost')));
const L=$('list');L.replaceChildren();
const rows=tab==='u'?U.map(x=>row(x.q,'Imeulizwa mara '+x.n+' | '+when(x.last),null,[btn('Ongeza jibu',()=>form({q:x.q,k:kw(x.q),src:['unanswered',x.id]})),btn('Futa',()=>del('unanswered',x.id),'del')])):
tab==='f'?F.map(x=>row(x.q,'👎 '+x.down+'   👍 '+x.up+' | '+when(x.last),'Jibu lililotolewa: '+x.a,[btn('Andika jibu sahihi',()=>form({q:x.q,k:kw(x.q),src:['feedback',x.id]})),btn('Futa',()=>del('feedback',x.id),'del')])):
C.map((x,i)=>row(x.k,'Maneno muhimu ya jibu hili',x.a,[btn('Hariri',()=>form({...x,idx:i})),btn('Futa',()=>delC(i),'del')]));
if(!rows.length)L.append(h('p',{className:'empty',textContent:'Hakuna kitu hapa kwa sasa 🎉'}));else L.append(...rows)}
const row=(t,m,x,a)=>h('div',{className:'row'},h('p',{textContent:t}),h('p',{className:'meta',textContent:m}),...(x?[h('p',{className:'meta',textContent:x})]:[]),h('div',{className:'acts'},...a));
function form(o){const F_=$('form');F_.hidden=false;
const k=h('input',{value:o.k||'',placeholder:'Maneno muhimu, tenganisha kwa nafasi'}),a=h('textarea',{value:o.a||'',placeholder:'Andika jibu sahihi hapa'});
const f=h('form',{onsubmit:async e=>{e.preventDefault();const it={k:k.value.trim(),a:a.value.trim(),q:o.q||''};if(!it.k||!it.a)return;
if(o.idx!=null)C[o.idx]=it;else C.push(it);
await save();if(o.src)await deleteDoc(doc(db,o.src[0],o.src[1]));F_.hidden=true;load()}},
h('p',{className:'ctx',textContent:o.q?'Swali: '+o.q:'Jibu maalum'}),k,a,h('div',{className:'acts'},h('button',{textContent:'Hifadhi'}),btn('Ghairi',()=>{F_.hidden=true},'ghost')));
F_.replaceChildren(f);a.focus();F_.scrollIntoView({behavior:'smooth'})}
const save=()=>setDoc(doc(db,'config','customAnswers'),{items:C,updated:serverTimestamp()}).then(()=>localStorage.removeItem('ca'));
async function del(c,id){if(confirm('Futa kipengele hiki?')){await deleteDoc(doc(db,c,id));load()}}
async function delC(i){if(confirm('Futa jibu hili?')){C.splice(i,1);await save();load()}}
$('lf').onsubmit=async e=>{e.preventDefault();try{await signInWithEmailAndPassword(auth,$('em').value,$('pw').value)}catch(x){$('msg').textContent='Barua pepe au nenosiri si sahihi.'}};
$('out').onclick=()=>signOut(auth);
onAuthStateChanged(auth,u=>{const ok=u&&u.email===ADMIN_EMAIL;$('login').hidden=!!ok;$('app').hidden=!ok;
if(ok)load();else if(u){$('msg').textContent='Akaunti hii haina ruhusa ya admin.';signOut(auth)}});
}
