// 標準空間示意圖（SVG，座標單位 = 公分）
// 每張圖含一層 <g class="anno"> 標註，可由外層 .hide-anno 隱藏。

function _esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}

// 水平尺寸線：x1→x2 在高度 y，label 置中於線上方
function dimH(x1,x2,y,label,flip){
  const tick=8, off=flip?14:-14;
  const cx=(x1+x2)/2, w=_esc(label).length*7+10;
  return `<g class="anno">
    <line x1="${x1}" y1="${y-tick}" x2="${x1}" y2="${y+tick}"/>
    <line x1="${x2}" y1="${y-tick}" x2="${x2}" y2="${y+tick}"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>
    <rect class="lbl-bg" x="${cx-w/2}" y="${y+off-11}" width="${w}" height="16" rx="3"/>
    <text x="${cx}" y="${y+off}" text-anchor="middle">${_esc(label)}</text>
  </g>`;
}
// 垂直尺寸線：y1→y2 在 x，label 置中於線左/右
function dimV(y1,y2,x,label,right){
  const tick=8, off=right?16:-16;
  const cy=(y1+y2)/2, w=_esc(label).length*7+10;
  return `<g class="anno">
    <line x1="${x-tick}" y1="${y1}" x2="${x+tick}" y2="${y1}"/>
    <line x1="${x-tick}" y1="${y2}" x2="${x+tick}" y2="${y2}"/>
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>
    <rect class="lbl-bg" x="${x+(right?off:off-w)+ (right?0:0)}" y="${cy-9}" width="${w}" height="16" rx="3" transform="translate(${right?0:0},0)"/>
    <text x="${x+off}" y="${cy+4}" text-anchor="${right?'start':'end'}">${_esc(label)}</text>
  </g>`;
}
function note(x,y,label){
  const w=_esc(label).length*7+10;
  return `<g class="anno"><rect class="lbl-bg" x="${x-w/2}" y="${y-11}" width="${w}" height="16" rx="3"/>
    <text x="${x}" y="${y}" text-anchor="middle">${_esc(label)}</text></g>`;
}
function fixLabel(x,y,t){return `<text class="fix-label" x="${x}" y="${y}" text-anchor="middle">${_esc(t)}</text>`;}
function svg(vb,inner){return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;}

// ───────── 廚房 ─────────
function kitchenPlan(){
  // 房 360×240，上下兩排檯面深 60，中央走道 120
  const inner=`
    <rect class="wall" x="0" y="0" width="360" height="240"/>
    <rect class="fix" x="0" y="0" width="360" height="60"/>
    <rect class="fix" x="0" y="180" width="360" height="60"/>
    ${fixLabel(180,35,'上排檯面 / 吊櫃')}
    ${fixLabel(180,215,'下排檯面（流理台）')}
    <circle cx="60" cy="30" r="14" class="fix"/>${fixLabel(60,52,'冰箱')}
    <circle cx="180" cy="210" r="14" class="fix"/>${fixLabel(180,232,'水槽')}
    <circle cx="300" cy="210" r="14" class="fix"/>${fixLabel(300,232,'爐')}
    <polygon class="tri" points="60,30 180,210 300,210"/>
    ${dimV(60,180,180,'走道 120',false)}
    ${dimV(180,240,330,'深 60',true)}
    ${note(300,120,'工作三角 ≤660')}`;
  return svg('-70 -30 500 320',inner);
}
function kitchenElev(){
  // 立面：地板 y=240，檯面高 85，吊櫃距檯面 55，吊櫃高 70
  const floor=240, topC=floor-85, upBot=topC-55, upTop=upBot-70;
  const inner=`
    <line class="wall" x1="0" y1="${floor}" x2="300" y2="${floor}"/>
    <rect class="fix" x="20" y="${topC}" width="260" height="85"/>${fixLabel(150,topC+50,'下櫃')}
    <rect class="fix" x="20" y="${upTop}" width="260" height="70"/>${fixLabel(150,upTop+40,'吊櫃')}
    ${dimV(topC,floor,10,'檯面高 85',false)}
    ${dimV(upBot,topC,295,'距檯面 55',true)}
    ${dimV(upTop,upBot,150,'吊櫃高 70',true)}`;
  return svg('-80 -10 460 300',inner);
}
// ───────── 衛浴 ─────────
function bathroomPlan(){
  // 房 240×200
  const inner=`
    <rect class="wall" x="0" y="0" width="240" height="200"/>
    <rect class="fix" x="0" y="0" width="100" height="55"/>${fixLabel(50,30,'洗手台')}
    <rect class="fix" x="150" y="0" width="90" height="90"/>${fixLabel(195,48,'淋浴 90×90')}
    <rect class="fix" x="25" y="130" width="40" height="70"/>${fixLabel(45,170,'馬桶')}
    ${dimH(0,45,200,'中心距牆 45',true)}
    ${dimV(70,130,45,'前緣淨空 60',false)}
    ${dimH(150,240,100,'淋浴 90',true)}`;
  return svg('-70 -30 380 280',inner);
}
// ───────── 餐廳 ─────────
function diningPlan(){
  // 房 300×300，餐桌 120×80 置中
  const inner=`
    <rect class="wall" x="0" y="0" width="300" height="300"/>
    <rect class="fix" x="90" y="110" width="120" height="80"/>${fixLabel(150,155,'餐桌 120×80')}
    <rect class="fix" x="100" y="80" width="30" height="24"/>
    <rect class="fix" x="170" y="80" width="30" height="24"/>
    <rect class="fix" x="100" y="196" width="30" height="24"/>
    <rect class="fix" x="170" y="196" width="30" height="24"/>
    ${dimH(0,90,150,'離牆 ≥90',false)}
    ${dimH(90,150,255,'每人 ≥60',true)}`;
  return svg('-70 -30 440 360',inner);
}

const DIAGRAMS={
  kitchen:[{id:'plan',name:'平面圖',svg:kitchenPlan},{id:'elev',name:'立面圖',svg:kitchenElev}],
  bathroom:[{id:'plan',name:'平面圖',svg:bathroomPlan}],
  dining:[{id:'plan',name:'平面圖',svg:diningPlan}]
};
