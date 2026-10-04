const $=id=>document.getElementById(id),log=$('log'),q=$('q');
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(Boolean);
function lev(a,b){const m=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){let p=m[0];m[0]=i;for(let j=1;j<=b.length;j++){const t=m[j];m[j]=Math.min(m[j]+1,m[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t}}return m[b.length]}
const hit=(t,k)=>t===k||(t.length>3&&k.length>3&&(t.includes(k)||(t.length>4&&k.includes(t))))?1:(t.length>4&&lev(t,k)<=1?.6:0);
const f=n=>n.toLocaleString('en-US');
const GEN=new Set('wapi lini nini vipi gani ngapi je chuo'.split(' '));
let pend=null,name='',cnt=0,miss=null,quiet=false;
try{name=sessionStorage.getItem('n')||''}catch(e){}
function course(P){let b=null,s=0;for(const e of CS){const[n,g,k]=e.split('|'),w=k.split(';');if(w.every(x=>P.includes(x))){const l=w.join('').length;if(l>s){s=l;b=[n,g]}}}return b}
function feeHtml([nm,g]){const t=G[g],h=t/2;
let s=`💰 <b>${nm}</b>, mwaka wa kwanza (Bachelor):<ul><li>Ada ya masomo: <b>${f(t)}</b></li><li>Jumla ukiishi hosteli ya chuo: <b>${f(t+477500)}</b> (Muhula I ${f(477500+h)}, Muhula II ${f(h)})</li>`;
s+=`<li>Jumla ukiishi nje ya chuo: <b>${f(t+370400)}</b> (Muhula I ${f(370400+h)}, Muhula II ${f(h)})</li>`;
s+='</ul>Walio chini ya miaka 21 wenye NHIF hawalipi 50,400. Kwa gharama zinazolipwa na mdhamini, andika <i>direct cost</i>.';
return g==='AG'?s+'<br>🥾 Lete gumboots na koti kwa kazi za shambani.':s}
let dg=null;
function dipGroup(P){return /biotech/.test(P)?'DT':/ business |agribusiness/.test(P)?'DB':/engineer|architect|science|laborator|food| computer|civil|electrical|mechanical|telecommunication| ict /.test(P)?'DE':null}
function dipFee(g){const[t,n]=DF[g],b=300400,a=107100,m=1176000,h=t/2,row=(l,tot,s2)=>`<li>${l}: <b>${f(tot)}</b> (Muhula I ${f(tot-s2)}, Muhula II ${f(s2)})</li>`;
return `💰 <b>Diploma (udhamini binafsi), ${n}, mwaka wa kwanza.</b> Ada ya masomo ni ${f(t)}.<ul>${row('Hosteli na chakula',t+b+a+m,h+m/2)}${row('Hosteli bila chakula',t+b+a,h)}${row('Nje ya chuo',t+b,h)}</ul>Chaguo ulilochagua linadumu mwaka mmoja.`+(g==='DT'?'<br>🧾 Gharama za mdhamini (Biotechnology): IPT 700,000 mwaka 1 na 2; vitabu 120,000 kila mwaka (jumla 820,000 mwaka 1 na 2, na 120,000 mwaka 3).':'')}
let sp=null;
function dip(P,gv,pv,dgm){const g=dgm||dg;dg=g;if(pv&&!gv)sp='pv';else if(gv&&!pv)sp='gv';
if(sp==='gv'){pend=null;dg=null;sp=null;return DIP}
if(!sp){pend='dip';return ASKSP}
if(!g){pend='dip';return ASKDG}
pend=null;dg=null;sp=null;return dipFee(g)}
function core(text){
const T=norm(text).filter(w=>w!=='kwanza'&&w!=='mwaka'),P=' '+T.join(' ')+' ',di=P.includes(' diploma '),cs=course(P);
if(/mtwara|rukwa|kianda|sumbawanga|shangani|mccote|mrcc|finishing|wood technology|technical education in construction|civil engineering with technical/.test(P)){pend=null;return OC}
let best=-1,sc=0;
K.forEach((e,i)=>{const s=[...new Set(e[0].split(' '))].reduce((a,k)=>a+Math.max(0,...T.map(t=>hit(t,k)))*(GEN.has(k)?.3:1),0);if(s>sc){sc=s;best=i}});
if(sc<1)best=-1;
if(/bweni|hostel|malazi|accommodation/.test(P)&&/ ada | fee |bei|gharama|ngapi|shilingi|lipi|kiasi|cost|price/.test(P)){pend=null;return ACC}
const gv=/serikali|government|govt/.test(P),pv=/binafsi|private/.test(P),dgm=dipGroup(P);
if(best===0||(pend==='fee'&&(cs||di||best<0))||(pend==='dip'&&(gv||pv||dgm||best<0))){
if(di||pend==='dip')return dip(P,gv,pv,dgm);
if(cs){pend=null;return feeHtml(cs)}
const r=pend==='fee'?NOCOURSE:ASKFEE;pend='fee';return r}
pend=null;if(best<1){miss=text;return FALL}quiet=best>=K.length-2;return K[best][1]+(sc<1.5&&T.length>=5&&best<K.length-2?WEAK:'')}
const NS=/(?:naitwa|jina langu ni|jina langu|mimi ni|my name is|i am|i'm)\s+([a-zà-ÿ'’-]+(?:\s+[a-zà-ÿ'’-]+)?)/i;
const NOT=new Set('mwanafunzi mgeni mpya student new first a an the na ni wa ya hapa nina nataka nahitaji nasoma natoka kutoka from here sure looking in at'.split(' '));
function reply(text){miss=null;quiet=false;
const m=text.match(NS);
if(m){const w=[];for(const x of m[1].trim().split(/\s+/)){if(NOT.has(x.toLowerCase()))break;w.push(x[0].toUpperCase()+x.slice(1).toLowerCase())}
if(w.length){name=w.join(' ');try{sessionStorage.setItem('n',name)}catch(e){}
const rest=text.replace(m[0],' '),r=norm(rest).length?core(rest):FALL,g=`Karibu <b>${name}</b>! 😊`;
return r===FALL?(quiet=true,g+' Nikusaidie nini leo? Uliza kuhusu ada, nyaraka, malazi au tarehe 🎓'):g+'<br>'+r}}
let r=core(text);
if(name&&r===FALL)r=`Samahani ${name} 🙏 `+r;else if(name&&cnt++%3===0)r=`Sawa ${name}! `+r;
return r}
const esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]).replace(/\n/g,'<br>');
function addCustom(items){K.splice(1,0,...items.map(i=>[norm(i.k).join(' '),esc(i.a)]))}
const clean=t=>t.replace(NS,' ').replace(/\d{5,}/g,' ').trim();
function addVote(w,q,r){const v=document.createElement('div');v.className='vote';
v.innerHTML='<span>Jibu hili limekusaidia?</span><button data-v="up" aria-label="Ndiyo">👍</button><button data-v="down" aria-label="Hapana">👎</button>';
v.onclick=e=>{const b=e.target.closest('button');if(!b)return;let a=r.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();if(name)a=a.split(name).join('');globalThis.FB.vote(q,a,b.dataset.v);v.textContent=b.dataset.v==='up'?'Asante! 🙏':'Asante, tutalirekebisha jibu hili. 🙏'};w.appendChild(v)}
function add(h,c,html){const d=document.createElement('div');d.className='m '+c;html?d.innerHTML=h:d.textContent=h;log.appendChild(d);log.scrollTop=log.scrollHeight;return d}
function ask(t){t=t.trim();if(!t)return;const h=$('hero');if(h)h.remove();add(t,'me');
const w=add('<span class="dots"><span></span><span></span><span></span></span>','bot',1);
setTimeout(()=>{const r=reply(t);w.innerHTML=r;const F=globalThis.FB;if(F){if(miss)F.log(clean(miss));else if(!pend&&!quiet)addVote(w,clean(t),r)}log.scrollTop=log.scrollHeight},500)}
$('f').onsubmit=e=>{e.preventDefault();ask(q.value);q.value=''};
[['📅','Tarehe za kuripoti','Usajili unaanza lini?'],['💰','Ada ya kozi yangu','Ada ni shilingi ngapi?'],['📄','Nyaraka za usajili','Nabeba nyaraka gani?'],['🏠','Malazi ya chuo','Naombaje bweni?']].forEach(([i,t,s])=>{
const b=document.createElement('button');b.type='button';b.innerHTML=`<span>${i}</span>${t}`;b.onclick=()=>ask(s);$('topics').appendChild(b)});
const d=Math.ceil((new Date('2026-11-07T00:00:00+03:00')-Date.now())/864e5);
if(d>0){$('days').textContent=d}else{$('days').textContent='Karibu';$('dlabel').textContent='usajili hadi 20/11/2026'}
