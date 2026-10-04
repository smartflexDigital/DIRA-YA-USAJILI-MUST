import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getFirestore,doc,getDoc,setDoc,increment,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {CFG} from './firebase-config.js';
/* Bila config, chatbot inafanya kazi kawaida bila kuhifadhi maoni wala maswali */
if(!CFG.apiKey.startsWith('PASTE')){
const db=getFirestore(initializeApp(CFG));
const hash=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return h.toString(36)};
const key=q=>norm(q).join(' ').slice(0,200);
let n=0;
globalThis.FB={
log(q){const k=key(q);if(!k||n>=15)return;n++;setDoc(doc(db,'unanswered','q'+hash(k)),{q:k,n:increment(1),last:serverTimestamp()},{merge:true}).catch(()=>{})},
vote(q,a,v){const k=key(q);if(!k)return;setDoc(doc(db,'feedback','f'+hash(k)),{q:k,a:a.slice(0,300),up:increment(v==='up'?1:0),down:increment(v==='down'?1:0),last:serverTimestamp()},{merge:true}).catch(()=>{})}};
try{const c=JSON.parse(localStorage.getItem('ca')||'null');let items;
if(c&&Date.now()-c.t<18e5)items=c.items;
else{const s=await getDoc(doc(db,'config','customAnswers'));items=s.exists()?s.data().items||[]:[];localStorage.setItem('ca',JSON.stringify({t:Date.now(),items}))}
addCustom(items)}catch(e){}
}
