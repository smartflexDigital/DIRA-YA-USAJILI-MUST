/* Maarifa ya chatbot: hariri faili hili kuongeza au kubadilisha majibu */
const G={A:1100000,BA:800000,AG:1000000,B:1500000,C:1400000};
/* "Jina la kozi|kundi la ada|maneno muhimu (yote yanahitajika, yatenganishwe kwa ;)" */
const CS=[
"Technical Education in Computer Science|B|technical;computer science",
"Technical Education in Telecommunication Engineering|B|technical;telecommunication",
"Urban and Regional Planning|B|urban","Aquatic Science and Aquaculture Technologies|B|aqua",
"Instrumentation and Control Engineering|B|instrumentation","Information and Computer Networking|B|networking",
"Electronics and Automation Engineering|B|electronics","Construction Technology|B|construction",
"Petroleum Storage and Transportation Engineering|B|petroleum","Mechatronics Engineering|B|mechatronics",
"Electrical and Renewable Energy Technology|B|renewable energy","Applied Informatics in Marketing|B|marketing",
"Health Information System|B|health information","Software Engineering|B|software",
"Food and Human Nutrition|B|nutrition","Crop Production and Technology|B|crop","Dairy Technology|B|dairy",
"Environmental Engineering|B|environmental engineering","Environmental Health with Technology|B|environmental health",
"Linguistics and Media Studies|B|linguistic","Linguistics and Media Studies|B|media studies",
"Applied Informatics in Industrial Automation|B|industrial automation","Applied Nuclear Science|B|nuclear",
"Biotechnology|C|biotech","Chemistry|C|chemistry","Environmental Science and Technology|C|environmental science",
"Agribusiness Management|AG|agribusiness","Business Administration|BA|business admin","Business Administration|BA| business ",
"Computer Science|A|computer science","Information and Communication Technology|A| ict ",
"Information and Communication Technology|A|information and communication","Science with Education|A|science with education",
"Laboratory Science and Technology|A|laborator","Food Science and Technology|A|food science",
"Natural Resource Conservation|A|natural resource","Civil Engineering|A|civil","Mechanical Engineering|A|mechanical",
"Computer Engineering|A|computer engineering","Electrical Engineering|A|electrical","Telecommunication Engineering|A|telecommunication",
"Data Science|A|data science","Landscape Architecture|A|landscape","Architecture|A|architect"
];
const DIP="💰 <b>Diploma (udhamini wa Serikali), mwaka wa kwanza:</b> jumla <b>TZS 320,400</b>. Serikali inagharamia ada ya masomo, malazi, chakula na mafunzo kwa vitendo.<br>Mchanganuo: caution 20,000; malazi 20,000; maktaba 30,000; mitihani 50,000; cheti 40,000; MUSTSO 10,000; usajili 10,000; kitambulisho 10,000; NHIF 50,400; capitation 10,000; TCU 20,000; joho 40,000; transcript 10,000.";
const ASKFEE="💰 Ada hutegemea kozi na kiwango chako. Unasoma <b>Bachelor</b> (niambie jina la kozi, mfano Software Engineering au Business Administration) au <b>Diploma</b>?";
const NOCOURSE="🤔 Sijaitambua kozi hiyo. Andika jina la kozi kama lilivyo kwenye barua yako ya joining instructions, mfano <i>Computer Science</i>, au andika <i>diploma</i>.";
const FALL="Sijapata jibu la swali hilo kwenye taarifa nilizonazo. Jaribu kuuliza kwa maneno mengine, au wasiliana na chuo: 📞 +255 (0)25 2957541, ✉️ dvcarc@must.ac.tz.";
/* K[0] ni ada (inashughulikiwa na script.js). Kila kipengele: [maneno muhimu, jibu] */
const K=[
["ada fee fees kiasi bei jumla tuition",null],
["nhif nida bima taifa","🩺 Mchango wa NHIF ni TZS 50,400. Walio chini ya miaka 21 wenye bima ya NHIF hawalipi. Diploma wa Serikali: unalipa moja kwa moja NHIF kwa control number, na unahitaji namba ya NIDA."],
["tarehe lini ripoti report anza muhula semester chelewa date","📅 <b>Kuripoti:</b> 07/11/2026 (Jumamosi). Masomo ya muhula wa kwanza yanaanza 09/11/2026.<br>Usajili ni 07/11 hadi 20/11/2026, na hautafanyika baada ya wiki ya pili, kwa hiyo usichelewe."],
["nyaraka documents vyeti cheti beba nahitaji joining nifike nikifika usajili hatua admissions","📄 <b>Nyaraka za usajili (Bachelor):</b><ul><li>Barua ya joining instruction</li><li>Vyeti halisi (original) na transcript au statement of results (original)</li><li>Cheti cha kuzaliwa (original)</li><li>Fomu ya uchunguzi wa afya iliyojazwa</li><li>Picha 2 za rangi za passport size</li><li>Bank slip halisi na nakala 2 zinazoonyesha ada imelipwa</li><li>Fomu zilizosainiwa (Declaration na Dress Code)</li></ul>Usajili haufanyiki bila nyaraka zote. Diploma wa Serikali: lete pia risiti za malipo ya TZS 320,400."],
["control number lipa wapi malipo mpesa tigo airtel awamu installment","💳 Unalipa kwa <b>control number</b> inayotengenezwa kupitia www.must.ac.tz, kisha unalipa kwa Tigo Pesa, M-Pesa au Airtel Money. Unaweza kulipa ada yote mara moja, au kwa awamu mbili (mwanzo wa Muhula I na wa Muhula II). Lipa kiasi sahihi, kwa sababu ziada haitarudishwa."],
["mkopo mikopo heslb loan bodi","🏦 Bachelor wenye uhitaji wanaweza kuomba mkopo kupitia Bodi ya Mikopo (HESLB) kwa miongozo ya 2026/2027. Wewe mwenyewe unawajibika kuupata, na chuo hakihusiki na utoaji wake. Jua hali ya mkopo wako kabla ya kuripoti."],
["direct moja sponsor mdhamini ipt vitabu stationery","🧾 <b>Gharama za moja kwa moja</b> hulipwa na mdhamini kwa mwanafunzi, siyo chuoni.<ul><li>Miaka 4, mwaka 1 hadi 3: IPT 700,000, vitabu 200,000, mahitaji ya kitivo 300,000, malazi na chakula 2,400,000 (jumla 3,600,000). Usafiri wa IPT hubadilika.</li><li>Miaka 4, mwaka 4: vitabu 200,000, uchapishaji wa mradi 400,000, kitivo 300,000 (jumla 900,000)</li><li>Miaka 3: mwaka 1 na 2 ni 3,600,000; mwaka 3 ni 900,000</li><li>Natural Resource Conservation: mwaka 1 na 2 ni 3,600,000; mwaka 3 ni 4,000,000</li></ul>Hivi ni viwango vya chini; mdhamini anaweza kulipa zaidi."],
["medical kipimo vipimo daktari hospitali zahanati uchunguzi afya kituo","🏥 Kabla ya usajili, fanya uchunguzi wa afya katika Kituo cha Afya cha chuo kwa fomu ya Medical Examination iliyoambatanishwa. Vipimo ni HB, kinyesi, mkojo, TB, macho, masikio-pua-koo, X-ray ya kifua na tumbo. Matibabu ni jukumu la mzazi au mdhamini."],
["wapi iko kiko kipo ipo chuo mahali location campus tunduma tazara kufika","📍 <b>Kampasi ya Mbeya:</b> Jiji la Mbeya, km 10 kutoka katikati ya jiji, barabara ya Tunduma, karibu na kituo cha TAZARA na kiwanda cha Coca Cola."],
["usafiri nauli transport gari basi safari","🚌 Gharama zote za usafiri kwenda na kurudi chuoni ni jukumu lako mwenyewe."],
["beba leta mahitaji shuka chandarua vifaa daftari kikokotoo calculator laptop kompyuta koti overcoat buti boots","🎒 Lete shuka na chandarua (godoro linatolewa), vifaa vya kuandikia, scientific calculator, na laptop inashauriwa.<br>Agribusiness: gumboots na koti kwa kazi za shambani.<br>Diploma: viatu vya ngozi na koti (buluu kwa Architecture na Engineering; nyeupe kwa Laboratory, Food Science na Biomedical Equipment; Business hawahitaji)."],
["drawing michoro board architecture engineering ict maalum clutch compass","📐 Architecture na Engineering wanatakiwa kuleta: drawing board A3, clutch pencils 0.5mm na 2mm na refills, adjustable set square, laptop, drawing pens (seti ya 4 au 8), T-square, circle stencils na compass set. Kwa Diploma, pia Computer Science na ICT. Unaweza kuombwa uvionyeshe, vinginevyo usajili ukakataliwa."],
["bweni hostel malazi chumba kulala accommodation godoro kupika","🏠 Malazi ya chuo ni machache. Kuomba hosteli, tumia www.must.ac.tz na utasaini mkataba wa masharti (kipaumbele kwa wenye ulemavu na makundi mengine). Vyumba vina vitanda na godoro; usiondoe vifaa vya chumba na uripoti uharibifu mara moja. Kupika hosteli ni marufuku, na ulevi, uvutaji, dawa za kulevya au wageni wasioruhusiwa vinaweza kukufanya ufukuzwe chumbani. Usipopata nafasi, tafuta chumba nje ya chuo (bei ni mazungumzo kati yako na mwenye nyumba). Chaguo lako (hosteli na chakula, hosteli tu, au nje) linadumu mwaka mmoja. Diploma wa Serikali: malazi na chakula vinagharamiwa."],
["orientation utangulizi kuwapokea","🎓 Orientation ni <b>ya lazima kwa wote</b>: wiki moja inayoanza 09/11/2026, ambapo kanuni za chuo zitaelezwa."],
["dress code nguo vazi","👔 Fuata kanuni za mavazi za chuo (mwongozo uko Download center ya www.must.ac.tz). Angalia mavazi yaliyokatazwa kwenye tovuti, kisha jaza fomu ya Dress Code Acknowledgement (inasainiwa pia na mzazi/mlezi)."],
["badili jina kosa kurekebisha change name","Chuo hakikubali mabadiliko ya majina wakati wa usajili wala kipindi chote cha masomo, kwa hiyo hakikisha majina yako ni sahihi."],
["refund kurudishiwa kurudisha ziada caution","Pesa ya ziada uliyolipa bila sababu ya msingi haitarudishwa. Caution money (TZS 20,000) pia hairudishwi baada ya kumaliza masomo."],
["kitambulisho id card potea poteza upotevu polisi","🪪 Kitambulisho (TZS 10,000) kimo kwenye ada. Ukipoteza, unalipa TZS 10,000 tena na kuleta taarifa ya polisi ya upotevu."],
["masharti nidhamu sponsorship serikali udhamini ahirisha kanuni","📋 Masharti makuu: nidhamu nzuri, kufuata sheria na kanuni za chuo, hakuna maandamano bila kibali, na kusoma kwa bidii. Kuahirisha masomo kunahitaji idhini ya chuo (Diploma wa Serikali: ya mfadhili). Kufeli kitaaluma kunaweza kusababisha kusitishwa masomo, na kutiwa hatiani kwa kosa la jinai kunasababisha kufukuzwa. Kutojua kanuni si kisingizio."],
["fomu declaration saini mtendaji dc kiapo form","✍️ Jaza fomu ya Declaration kwa herufi kubwa. Unasaini wewe na mzazi/mlezi/mdhamini (Diploma wa Serikali: pia Mtendaji wa Kata au Mkuu wa Wilaya anathibitisha). Fomu isiyokamilika haipokelewi."],
["cheti hakijatoka transcript result slip matokeo","Kama cheti hakijatoka, lete transcript au statement of results (original), au result slip kwa Diploma."],
["maktaba library maabara workshop uwanja dispensary huduma","📚 Chuo kina maktaba, mabweni, karakana, maabara, viwanja vya michezo na zahanati ya huduma ya kwanza tu."],
["miaka muda kozi diploma masomo","⏳ Barua ya Diploma ya udhamini wa Serikali inasema miaka mitatu, na unatunukiwa Diploma Certificate. Muda wa kozi nyingine hutofautiana, kwa hiyo thibitisha na chuo."],
["mawasiliano simu barua pepe email tovuti website piga wasiliana contact msaada","📞 Simu ya chuo: +255 25 295 7544 au +255 25 295 7542<br>✉️ must@must.ac.tz (masuala ya taaluma: dvcarc@must.ac.tz, simu +255 25 295 7541)<br>🌐 www.must.ac.tz<br>📮 S.L.P 131, Mbeya"],
["chakula kula meals mgahawa cafeteria kantini lishe","🍽️ Chuo kina cafeteria inayohudumia wanafunzi wa Diploma (Serikali na binafsi) waliolipia huduma ya chakula. Wanafunzi wengine, pamoja na wa Bachelor, hupata chakula MUST Social Club, kwa mama/baba lishe na wachuuzi karibu na chuo. Chuo hakiwezi kuhakikisha usalama na ubora wa chakula cha wachuuzi."],
["sims portal akaunti login nenosiri mfumo","💻 Chuo kina mfumo wa taarifa za wanafunzi (SIMS): sims.must.ac.tz. Ukihitaji msaada wa kuingia, wasiliana na chuo."],
["pakua download pakuwa mwongozo guide bylaw bylaws","📥 Kwenye Download center ya www.must.ac.tz kuna joining instructions za 2026/2027 (Bachelor, Diploma binafsi, Diploma ya Serikali), mwongozo wa mavazi, Students By-Law, Students Guide na Off-Campus Form."],
["asante shukrani thank ahsante","Karibu sana! 😊 Uliza chochote kingine kuhusu usajili."],
["habari hujambo mambo vipi hi hello salaam shikamoo hey","Karibu! 👋 Niulize chochote kuhusu usajili, ada, nyaraka au malazi."]
];
const ACC="🏠 Ada ya malazi ya hosteli ni <b>TZS 107,100</b> kwa mwaka kwa Bachelor (Diploma wa Serikali: TZS 20,000). Imo kwenye jumla ya ada ya kuishi chuoni. Ukiishi nje ya chuo hulipi ada hii.";
const WEAK="<br><small>Kama hili halijajibu swali lako, uliza kwa maneno mengine au wasiliana na chuo: dvcarc@must.ac.tz</small>";

const DF={DE:[900000,"Engineering, Architecture na Sayansi"],DB:[700000,"Business Administration na Agribusiness"],DT:[1100000,"Biotechnology"]};
const ASKSP="💰 Diploma ya udhamini wa <b>Serikali</b> au <b>binafsi</b> (private)? Ada ni tofauti.";
const ASKDG="💰 Kwa Diploma ya binafsi, ada hutegemea kozi. Ni ya <b>Engineering/Architecture/Sayansi</b>, <b>Business/Agribusiness</b>, au <b>Biotechnology</b>?";

const OC="🏫 Msaidizi huyu ni wa <b>kampasi ya Mbeya pekee</b>. Kwa kampasi za Rukwa na Mtwara (pamoja na kozi za MCCOTE), wasiliana na chuo: 📞 +255 25 295 7544, ✉️ must@must.ac.tz.";
