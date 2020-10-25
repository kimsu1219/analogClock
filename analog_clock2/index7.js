// import 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap';
const createElement = (tagName, properties) =>
  Object.assign(document.createElement(tagName), properties); 
const Div = properties => createElement("div", properties); //div 태그를 가진 엘리먼트 만들기
const Link = properties => createElement("link", properties);//link 태그를 가진 엘리먼트 만들기
const initArray = (n, f = (_, i) => i) => Array.from({ length: n }, f); //배열만들어주는 함수

const CLOCK_SIZE = 300; // 시계크기
const CLOCK_RADIUS = 120; // 반지름
const HOURS_DEG = 360 / 12; // 30도
const OFFSET_DEG = 90;

function Clock(hour, min, sec, fontname) { 
  const fontlink = `https://fonts.googleapis.com/css?family=${fontname.replace(/ /g, '+')}&display=swap`;
  const fontfamily = `${fontname}, sans-serif`;
  const frame = Div({
    style: `
      position: relative;
      width: ${CLOCK_SIZE}px;
      height: ${CLOCK_SIZE}px;
      box-shadow: inset 0 0 0 ${3}px #333, inset 0 0 0 ${CLOCK_SIZE / 2-5}px #fff;
      border-radius: 50%;
      background: #333;
    `
  });
  frame.classList.add("frame"); //classList.add() 클래스 생성함수 
  const circle = Div({
    style: `
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: black;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    `
  })
  frame.appendChild(circle);
  const hourDiv = Div({
    style: `
    position: absolute;
    left: 50%;
    top : 50%;
    background-color: black;
    height: 75px;
    width: 8px;
    transform-origin: 50% 0;
    transform: translate(-50%, 0) rotate(${(hour*30)+180}deg);
    `
  })
  // div:before.style = "background-color: green";   
  frame.appendChild(hourDiv);
  const minDiv = Div({
    style: `
    position: absolute;
    left: 50%;
    top : 50%;
    background-color: black;
    height: 105px;
    width: 5px;
    transform-origin: 50% 0;
    transform: translate(-50%, 0) rotate(${(min*6)+180}deg);
    `
  });
  frame.appendChild(minDiv);
  const secDiv = Div({
    style: `
    position: absolute;
    left: 50%;
    top : 50%;
    background-color: red;
    height: 120px;
    width: 1px;
    transform-origin: 50% 0;
    transform: translate(-50%, 0) rotate(${(sec*6)+180}deg);
    `
  });
  frame.appendChild(secDiv);
  
  initArray(12, (_,i) => i+1) // initArray = [1,2,3,4,5,6,7,8,9,10,11,12]
  .map((num, i) => {
      i = i+1;
      const currentDeg = HOURS_DEG *i;
      const x = 
      CLOCK_RADIUS * Math.cos((Math.PI/180) * (currentDeg - OFFSET_DEG));
      const y =
      CLOCK_RADIUS * Math.sin((Math.PI/180) * (currentDeg - OFFSET_DEG));
      // console.log(x);
      // console.log(y);
      
      return Div({
        innerText: num,
        style: `
        color: #333;
        font-family: ${fontfamily};
        font-size: 40px;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) translate(${x}px, ${y}px);
        `
      });
  })
  .forEach(time => frame.appendChild(time));//시간 넣어줌    
  this.frame = frame;
  this.fontlink = fontlink;
  this.hour = hourDiv; 
  this.min = minDiv;
  this.sec = secDiv;
}  

Clock.prototype.render = function (hour, min, sec) {
    clock.hour.style.transform = `translate(-50%, 0) rotate(${180+(hour*30)+(min*0.5)+(sec*0.1)}deg)`;
    clock.min.style.transform = `translate(-50%, 0) rotate(${180+(min*6)+(sec*0.1)}deg)`;
    clock.sec.style.transform = `translate(-50%, 0) rotate(${180+(sec*6)}deg)`;
};
  
const date = new Date();     
const hour = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();
const millsec = date.getMilliseconds();
//인스턴스 생성
const clock = new Clock(hour,min,sec,"Nanum Brush Script");
//font링크태그 생성
clock.frame.appendChild(Link({rel: "stylesheet", href: clock.fontlink}));//link태그 만들기

for(let i = 0; i < 60; i++){ //시계옆에 초테두리
    // const div = i%5;
    // console.log(div);
    if(i%5 == 0){ // 5초마다 진하게 표시
      const lineDiv = Div({ //div를 계속해서 만들어주는함수.
        style: `
        position: absolute;
        left: 50%;
        top : 50%;
        background-color: red;
        height: 13px;
        width: 3px;
        // transform-origin: 50% 0;
        transform: translate(-50%, -50%) rotate(${i*6}deg) translate(0%, 1100%) ;
        `
      });
      clock.frame.appendChild(lineDiv);
    }
    else {
      const lineDiv = Div({ //div를 계속해서 만들어주는함수.
        style: `
        position: absolute;
        left: 50%;
        top : 50%;
        background-color: black;
        height: 10px;
        width: 2px;
        // transform-origin: 50% 0;
        transform: translate(-50%, -50%) rotate(${i*6}deg) translate(0%, 1400%) ;
        `
      });
      clock.frame.appendChild(lineDiv);
    }    
}

function Loop(func) {
  const arr = new Array(); //비어있는 배열 만들기
  this.arr = arr; // 배열을 Loop 필드
}
//배열 추가 메소드
Loop.prototype.add = function(funcIn) {
  this.arr.push(funcIn);
};
//배열 제거 메소드
Loop.prototype.remove = function(index,num) {
  this.arr.splice(index,num);
};

//인스턴스 생성
const loop = new Loop();
//loop.arr[0]에 저장
loop.add(function() {
  const date = new Date();     
  const hour = date.getHours();
  const min = date.getMinutes();
  // const sec= date.getSeconds(); // 1초씩돌아가는 시계
  const millsec = date.getMilliseconds();
  const sec = date.getSeconds() + (millsec/1000); //무소음시계 -> 현재 초 + 밀리초
  clock.render(hour,min,sec);
}); 
loop.add(function () {}); //loop.arr[1]에 저장
loop.remove(1,1);//loop.arr[1]에 1개요소 제거

const loopoo = f => requestAnimationFrame(function draw() {
  for(let i = 0; i < loop.arr.length; i++) {
    let poo = loop.arr[i];
    poo();
  }
  requestAnimationFrame(draw)
})

loopoo();
document.body.appendChild(clock.frame);
