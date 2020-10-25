//createElement, Div, Link, initArray 함수 import
import { createElement, Div, Link, initArray } from './index';

//시계 틀, 시침, 분침, 초침 생성
function Clock(hour, min, sec, fontname) {
  const fontlink = `https://fonts.googleapis.com/css?family=${fontname.replace(/ /g, '+')}&display=swap`;
  const fontfamily = `${fontname}, sans-serif`;
  const CLOCK_SIZE = 300; // 시계크기
  const CLOCK_RADIUS = 120; // 반지름
  const HOURS_DEG = 360 / 12; // 30도
  const OFFSET_DEG = 90;

  const frame = Div({
    style: `
      position: relative;
      width: ${CLOCK_SIZE}px;
      height: ${CLOCK_SIZE}px;
      box-shadow: inset 0 0 0 ${3}px #333, inset 0 0 0 ${CLOCK_SIZE / 2 - 5}px #fff;
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
    transform: translate(-50%, 0) rotate(${(hour * 30) + 180}deg);
    `
  })
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
    transform: translate(-50%, 0) rotate(${(min * 6) + 180}deg);
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
    transform: translate(-50%, 0) rotate(${(sec * 6) + 180}deg);
    `
  });
  frame.appendChild(secDiv);

  initArray(12, (_, i) => i + 1) // initArray = [1,2,3,4,5,6,7,8,9,10,11,12]
    .map((num, i) => {
      i = i + 1;
      const currentDeg = HOURS_DEG * i;
      const x =
        CLOCK_RADIUS * Math.cos((Math.PI / 180) * (currentDeg - OFFSET_DEG));
      const y =
        CLOCK_RADIUS * Math.sin((Math.PI / 180) * (currentDeg - OFFSET_DEG));
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

  document.body.appendChild(frame);
}

//link태그 만들기
Clock.prototype.style = function() {
  this.frame.appendChild(Link({ rel: "stylesheet", href: this.fontlink }));
}

//테두리 만들기
Clock.prototype.Line = function() {
  for(let i = 0; i< 60; i++){
    if(i % 5 == 0){
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
      this.frame.appendChild(lineDiv);
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
      this.frame.appendChild(lineDiv);
    }
  }
}

//회전
Clock.prototype.render = function (hour, min, sec) {
  this.hour.style.transform = `translate(-50%, 0) rotate(${180 + (hour * 30) + (min * 0.5) + (sec * 0.1)}deg)`;
  this.min.style.transform = `translate(-50%, 0) rotate(${180 + (min * 6) + (sec * 0.1)}deg)`;
  this.sec.style.transform = `translate(-50%, 0) rotate(${180 + (sec * 6)}deg)`;
};

export { Clock };

