import { Clock } from '/clock.js';
import { Loop } from './loop.js';

(() => {
  const date = new Date(); //현재 시간 받아오기
  const hour = date.getHours();
  const min = date.getMinutes();
  const millsec = date.getMilliseconds();
  const sec = date.getSeconds() + (millsec / 1000);

  const clock = new Clock(hour, min, sec, "Nanum Brush Script"); //clock 인스턴스 생성
  clock.style(); // link태그 바꿔준 함수 호출
  clock.Line(); // 테두리 만들어준 함수 호출
  
  // console.log(clock.render);
  
  const loop = new Loop(); //loop인스턴스 생성

  // 배열에 익명함수 추가
  loop.add(function () { 
    const date = new Date(); //현재 시간 받아오기
    const hour = date.getHours();
    const min = date.getMinutes();
    const millsec = date.getMilliseconds();
    const sec = date.getSeconds() + (millsec / 1000);
    clock.render(hour, min, sec);
  });


  loop.loopoo();

  console.log("finished")
})();


