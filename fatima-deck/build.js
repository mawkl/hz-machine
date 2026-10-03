const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/40eaa2d3-cf35-4cc3-b158-d3f9a53c5a57_66694698-a60d-4e28-9e6c-36cd65138281/pptx/scripts/apply_theme.js");

const BLACK="0B0B0B", CARD="171512", GOLD="C9A24B", GOLD2="E6C77A", WHITE="FFFFFF", MUTED="B8B2A3";
const THEME={name:"Fatima Gold",headFontFace:"Arial",bodyFontFace:"Arial",colors:{dk1:BLACK,lt1:WHITE,dk2:CARD,lt2:"F4EFE3",accent1:GOLD,accent2:GOLD2,accent3:MUTED,accent4:"8A6D2B",accent5:"3A3326",accent6:"D6412A",hlink:GOLD,folHlink:MUTED}};

async function icon(name,color){
  const svg=RDS.renderToStaticMarkup(React.createElement(fa[name],{color:"#"+color,size:256}));
  const buf=await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}
const pres=new pptxgen(); pres.layout="LAYOUT_16x9"; pres.theme={headFontFace:"Arial",bodyFontFace:"Arial"};
pres.title="FATIMA DARIJA AI"; pres.author="FATIMA DARIJA AI";
const S=pres.ShapeType;

function bg(s){
  s.background={color:BLACK};
  // Moroccan 8-point star motif, outlined, corner
  s.addShape(S.star8,{x:-1.1,y:3.4,w:3.2,h:3.2,fill:{color:BLACK,transparency:100},line:{color:GOLD,width:1,transparency:70},objectName:"Motif star"});
  s.addShape(S.star8,{x:-0.6,y:3.9,w:2.2,h:2.2,fill:{color:BLACK,transparency:100},line:{color:GOLD,width:1,transparency:80},objectName:"Motif star inner"});
}
function title(s,t,sub){
  s.addText(t,{x:0.6,y:0.4,w:8.8,h:0.8,fontSize:38,bold:true,color:WHITE,align:"right",rtlMode:true,valign:"middle",margin:0,isTextBox:true,objectName:"Title"});
  if(sub) s.addText(sub,{x:0.6,y:1.2,w:8.8,h:0.5,fontSize:20,color:GOLD,align:"right",rtlMode:true,valign:"middle",margin:0,isTextBox:true,objectName:"Subtitle"});
}
function foot(s){
  s.addText("FATIMA DARIJA AI",{x:0.6,y:5.15,w:3,h:0.3,fontSize:10,bold:true,color:GOLD,charSpacing:4,margin:0,isTextBox:true,objectName:"Footer"});
}
function circ(s,img,x,y,d,fillc){
  s.addShape(S.ellipse,{x,y,w:d,h:d,fill:{color:fillc||GOLD},line:{color:GOLD,width:0}});
  const p=d*0.5; s.addImage({data:img,x:x+(d-p)/2,y:y+(d-p)/2,w:p,h:p});
}

(async()=>{
  const I={}; 
  const need={mic:["FaMicrophone",BLACK],micG:["FaMicrophone",GOLD],bull:["FaBullhorn",BLACK],bolt:["FaBolt",BLACK],star:["FaStar",BLACK],brief:["FaBriefcase",BLACK],
   store:["FaStore",BLACK],phone:["FaMobileAlt",BLACK],bag:["FaShoppingBag",BLACK],film:["FaFilm",BLACK],tag:["FaTag",BLACK],
   check:["FaCheckCircle",GOLD],wa:["FaWhatsapp",GOLD],ig:["FaInstagram",GOLD],mail:["FaEnvelope",GOLD],
   play:["FaPlayCircle",BLACK],yt:["FaYoutube",BLACK],box:["FaBoxOpen",BLACK],chart:["FaChartLine",BLACK],starB:["FaStar",GOLD],fire:["FaFire",BLACK]};
  for(const k in need) I[k]=await icon(...need[k]);

  // 1 COVER
  let s=pres.addSlide(); bg(s);
  s.addShape(S.star8,{x:5.6,y:0.5,w:4.6,h:4.6,fill:{color:BLACK,transparency:100},line:{color:GOLD,width:1.25,transparency:40},objectName:"Cover star"});
  s.addShape(S.star8,{x:6.2,y:1.1,w:3.4,h:3.4,fill:{color:BLACK,transparency:100},line:{color:GOLD,width:1,transparency:65},objectName:"Cover star inner"});
  circ(s,I.mic,7.05,1.95,1.7);
  s.addText("FATIMA\nDARIJA AI",{x:0.6,y:0.9,w:5.6,h:1.7,fontSize:50,bold:true,color:WHITE,charSpacing:3,margin:0,valign:"top",isTextBox:true,objectName:"Brand"});
  s.addText("صوت AI بالدارجة المغربية",{x:0.6,y:2.75,w:5.6,h:0.6,fontSize:26,bold:true,color:GOLD,rtlMode:true,align:"left",margin:0,isTextBox:true,objectName:"Tagline"});
  s.addText("خلي الإعلانات والمحتوى ديالك يهضرو بالدارجة بشكل طبيعي واحترافي.",{x:0.6,y:3.4,w:5.4,h:0.9,fontSize:16,color:WHITE,rtlMode:true,align:"left",margin:0,isTextBox:true,objectName:"Description"});
  s.addText("للشركات • البراندات • صناع المحتوى",{x:0.6,y:4.6,w:6,h:0.4,fontSize:14,color:MUTED,rtlMode:true,align:"left",margin:0,isTextBox:true,objectName:"Audience"});
  s.addNotes("غلاف: تقديم FATIMA DARIJA AI للعميل المحتمل.");

  // 2 WHAT IS
  s=pres.addSlide(); bg(s); title(s,"شنو هي FATIMA DARIJA AI؟"); foot(s);
  s.addText("صوت ذكاء اصطناعي كيهضر بالدارجة المغربية",{x:3.9,y:1.4,w:5.5,h:0.9,fontSize:22,bold:true,color:GOLD,rtlMode:true,align:"right",margin:0,valign:"top",isTextBox:true,objectName:"Headline"});
  s.addText("Fatima Darija AI كتعاونك تصايب voice-over بالدارجة المغربية للمحتوى والإعلانات ديالك بطريقة سريعة، سهلة واحترافية.",{x:3.9,y:2.35,w:5.5,h:1.4,fontSize:16,color:WHITE,rtlMode:true,align:"right",margin:0,valign:"top",isTextBox:true,objectName:"Body"});
  s.addText("مناسبة لـ:",{x:0.6,y:1.4,w:2.9,h:0.4,fontSize:14,bold:true,color:MUTED,rtlMode:true,align:"right",margin:0,isTextBox:true});
  const uses=[["الإعلانات","bull"],["Reels وTikTok","phone"],["YouTube","yt"],["فيديوهات المنتجات","box"],["المحتوى التجاري","brief"]];
  uses.forEach((u,i)=>{
    const y=1.85+i*0.62;
    s.addShape(S.roundRect,{x:0.6,y,w:2.9,h:0.52,fill:{color:CARD},line:{color:"3A3326",width:0.75},rectRadius:0.1,objectName:"Chip "+(i+1)});
    circ(s,I[u[1]],3.5-0.45,y+0.06,0.4);
    s.addText(u[0],{x:0.75,y,w:2.2,h:0.52,fontSize:14,color:WHITE,rtlMode:true,align:"right",valign:"middle",margin:0,isTextBox:true});
  });

  // 3 MONTHLY
  s=pres.addSlide(); bg(s); title(s,"الاشتراك الشهري"); foot(s);
  s.addShape(S.roundRect,{x:0.6,y:1.5,w:4.6,h:3.2,fill:{color:CARD},line:{color:GOLD,width:1.25},rectRadius:0.15,objectName:"Price card"});
  s.addText("59€",{x:0.6,y:1.7,w:4.6,h:1.6,fontSize:96,bold:true,color:GOLD,align:"center",valign:"middle",margin:0,isTextBox:true,objectName:"Price"});
  s.addText("/ الشهر",{x:0.6,y:3.3,w:4.6,h:0.6,fontSize:28,color:WHITE,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("كتخلص شهر بشهر.",{x:0.6,y:3.95,w:4.6,h:0.5,fontSize:18,color:MUTED,rtlMode:true,align:"center",margin:0,isTextBox:true});
  ["مرونة فالأداء","بلا التزام سنوي","مناسب للتجربة والاستعمال حسب الحاجة"].forEach((t,i)=>{
    const y=1.7+i*0.95;
    s.addImage({data:I.check,x:9.0,y:y+0.1,w:0.4,h:0.4});
    s.addText(t,{x:5.6,y,w:3.3,h:0.8,fontSize:18,color:WHITE,rtlMode:true,align:"right",valign:"middle",margin:0,isTextBox:true,objectName:"Benefit "+(i+1)});
  });
  s.addText("FATIMA DARIJA AI — 59€/MONTH",{x:5.6,y:4.7,w:3.8,h:0.3,fontSize:11,bold:true,color:GOLD,charSpacing:2,align:"right",margin:0,isTextBox:true});

  // 4 YEARLY
  s=pres.addSlide(); bg(s); title(s,"العرض السنوي"); foot(s);
  s.addShape(S.roundRect,{x:0.6,y:1.45,w:5.2,h:3.35,fill:{color:GOLD},line:{color:GOLD,width:0},rectRadius:0.15,objectName:"Annual card"});
  s.addText("600€",{x:0.6,y:1.6,w:5.2,h:1.9,fontSize:110,bold:true,color:BLACK,align:"center",valign:"middle",margin:0,isTextBox:true,objectName:"Price"});
  s.addText("/ السنة",{x:0.6,y:3.45,w:5.2,h:0.55,fontSize:28,bold:true,color:BLACK,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("يعني تقريباً 50€ فالشهر ملي كتقسم الثمن على عام كامل.",{x:0.9,y:4.0,w:4.6,h:0.7,fontSize:14,color:BLACK,rtlMode:true,align:"center",valign:"middle",margin:0,isTextBox:true});
  // calc column
  s.addText("الثمن الشهري",{x:6.2,y:1.45,w:3.2,h:0.35,fontSize:14,color:MUTED,rtlMode:true,align:"right",margin:0,isTextBox:true});
  s.addText("59€ × 12 = 708€",{x:6.2,y:1.8,w:3.2,h:0.5,fontSize:24,bold:true,color:WHITE,align:"right",margin:0,isTextBox:true});
  s.addText("الثمن السنوي",{x:6.2,y:2.45,w:3.2,h:0.35,fontSize:14,color:MUTED,rtlMode:true,align:"right",margin:0,isTextBox:true});
  s.addText("600€",{x:6.2,y:2.8,w:3.2,h:0.5,fontSize:24,bold:true,color:GOLD,align:"right",margin:0,isTextBox:true});
  s.addShape(S.roundRect,{x:6.2,y:3.55,w:3.2,h:1.25,fill:{color:CARD},line:{color:GOLD,width:1.5},rectRadius:0.12,objectName:"Savings badge"});
  s.addText("108€",{x:6.2,y:3.6,w:3.2,h:0.75,fontSize:44,bold:true,color:GOLD2,align:"center",valign:"middle",margin:0,isTextBox:true,objectName:"Saving"});
  s.addText("كتوفّر فالسنة  |  économie",{x:6.2,y:4.3,w:3.2,h:0.4,fontSize:14,bold:true,color:WHITE,rtlMode:true,align:"center",margin:0,isTextBox:true});

  // 5 WHY
  s=pres.addSlide(); bg(s); title(s,"علاش تختار Fatima؟","خلي المحتوى ديالك يهضر بالدارجة"); foot(s);
  const why=[["صوت بالدارجة المغربية","mic"],["مناسب للإعلانات والفيديوهات","bull"],["سريع وسهل فالاستعمال","bolt"],["إحساس مغربي طبيعي","star"],["مناسب للشركات والبراندات وصناع المحتوى","brief"]];
  why.forEach((w,i)=>{
    const y=1.85+i*0.62;
    s.addShape(S.roundRect,{x:2.2,y,w:7.2,h:0.52,fill:{color:CARD},line:{color:"3A3326",width:0.75},rectRadius:0.1,objectName:"Row "+(i+1)});
    circ(s,I[w[1]],9.4-0.47,y+0.06,0.4);
    s.addText(w[0],{x:2.4,y,w:6.4,h:0.52,fontSize:16,color:WHITE,rtlMode:true,align:"right",valign:"middle",margin:0,isTextBox:true});
  });

  // 6 WHO
  s=pres.addSlide(); bg(s); title(s,"شكون يقدر يستعملها؟","الخدمة مناسبة ليك إلا كنت:"); foot(s);
  const who=[["صاحب مشروع","store"],["صانع محتوى","phone"],["كتبيع Online","bag"],["كتدير إعلانات","bull"],["كتنتج فيديوهات","film"],["عندك Brand","tag"]];
  who.forEach((w,i)=>{
    const col=i%3,row=Math.floor(i/3);
    const x=9.4-(col+1)*2.8-col*0.2+0.0, y=2.0+row*1.5;
    s.addShape(S.roundRect,{x,y,w:2.8,h:1.3,fill:{color:CARD},line:{color:"3A3326",width:0.75},rectRadius:0.12,objectName:"Card "+(i+1)});
    circ(s,I[w[1]],x+1.1,y+0.15,0.6);
    s.addText(w[0],{x,y:y+0.8,w:2.8,h:0.4,fontSize:16,bold:true,color:WHITE,rtlMode:true,align:"center",margin:0,isTextBox:true});
  });

  // 7 CHOOSE
  s=pres.addSlide(); bg(s); title(s,"اختار العرض ديالك"); foot(s);
  s.addShape(S.roundRect,{x:5.4,y:1.55,w:4.0,h:3.2,fill:{color:CARD},line:{color:"3A3326",width:1},rectRadius:0.15,objectName:"Monthly card"});
  s.addText("شهري",{x:5.4,y:1.75,w:4.0,h:0.5,fontSize:22,bold:true,color:WHITE,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("59€",{x:5.4,y:2.5,w:4.0,h:1.1,fontSize:60,bold:true,color:WHITE,align:"center",valign:"middle",margin:0,isTextBox:true});
  s.addText("/ الشهر",{x:5.4,y:3.65,w:4.0,h:0.5,fontSize:20,color:MUTED,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("أو",{x:4.8,y:2.9,w:0.6,h:0.5,fontSize:18,color:MUTED,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addShape(S.roundRect,{x:0.6,y:1.3,w:4.2,h:3.6,fill:{color:GOLD},line:{color:GOLD2,width:2},rectRadius:0.15,shadow:{type:"outer",color:"000000",opacity:0.5,blur:12,offset:4,angle:90},objectName:"Annual card"});
  s.addShape(S.roundRect,{x:1.6,y:1.05,w:2.4,h:0.5,fill:{color:BLACK},line:{color:GOLD,width:1.5},rectRadius:0.25,objectName:"Recommended badge"});
  s.addText("RECOMMENDED",{x:1.6,y:1.05,w:2.4,h:0.5,fontSize:12,bold:true,color:GOLD,charSpacing:2,align:"center",valign:"middle",margin:0,isTextBox:true});
  s.addText("سنوي",{x:0.6,y:1.7,w:4.2,h:0.5,fontSize:22,bold:true,color:BLACK,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("600€",{x:0.6,y:2.3,w:4.2,h:1.3,fontSize:72,bold:true,color:BLACK,align:"center",valign:"middle",margin:0,isTextBox:true});
  s.addText("/ السنة",{x:0.6,y:3.6,w:4.2,h:0.5,fontSize:20,bold:true,color:BLACK,rtlMode:true,align:"center",margin:0,isTextBox:true});
  s.addText("وفر 108€ فالسنة",{x:0.6,y:4.15,w:4.2,h:0.5,fontSize:20,bold:true,color:BLACK,rtlMode:true,align:"center",margin:0,isTextBox:true});

  // 8 CTA
  s=pres.addSlide(); bg(s);
  s.addShape(S.star8,{x:6.0,y:-0.4,w:4.4,h:4.4,fill:{color:BLACK,transparency:100},line:{color:GOLD,width:1,transparency:55},objectName:"CTA star"});
  s.addText("بغيتي صوت بالدارجة للمحتوى ديالك؟",{x:0.6,y:0.5,w:8.8,h:0.8,fontSize:34,bold:true,color:WHITE,rtlMode:true,align:"right",valign:"middle",margin:0,isTextBox:true,objectName:"Title"});
  s.addText("FATIMA DARIJA AI",{x:0.6,y:1.4,w:8.8,h:0.6,fontSize:28,bold:true,color:GOLD,charSpacing:3,align:"right",margin:0,isTextBox:true});
  s.addText("صوت مغربي. ذكاء اصطناعي. محتوى احترافي.",{x:0.6,y:2.05,w:8.8,h:0.5,fontSize:18,color:WHITE,rtlMode:true,align:"right",margin:0,isTextBox:true});
  s.addText("تواصل معنا باش تبدا.",{x:0.6,y:2.55,w:8.8,h:0.45,fontSize:16,bold:true,color:GOLD2,rtlMode:true,align:"right",margin:0,isTextBox:true});
  [["wa","WhatsApp: [placeholder]"],["ig","Instagram: [placeholder]"],["mail","Email: [placeholder]"]].forEach((c,i)=>{
    const w=2.8,x=9.4-(i+1)*w-i*0.2,y=3.5;
    s.addShape(S.roundRect,{x,y,w,h:1.1,fill:{color:CARD},line:{color:GOLD,width:1,dashType:"dash"},rectRadius:0.12,objectName:"Contact "+(i+1)});
    s.addImage({data:I[c[0]],x:x+w/2-0.2,y:y+0.12,w:0.4,h:0.4});
    s.addText(c[1],{x,y:y+0.6,w,h:0.4,fontSize:14,color:WHITE,align:"center",margin:0,isTextBox:true});
  });
  s.addText("FATIMA DARIJA AI",{x:0.6,y:5.15,w:3,h:0.3,fontSize:10,bold:true,color:GOLD,charSpacing:4,margin:0,isTextBox:true});

  await pres.writeFile({fileName:"FATIMA_DARIJA_AI.pptx"});
  await applyTheme("FATIMA_DARIJA_AI.pptx",THEME);
  console.log("ok");
})();
