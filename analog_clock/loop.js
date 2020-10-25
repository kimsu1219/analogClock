function Loop() { //함수를 넣어줄 배열 만들고 배열안에 든 함수를 반복해서 호출해주는 함수
  const arr = []; //비어있는 배열 만들기
  this.arr = arr; // 배열을 Loop 필드
}
//배열 추가 메소드
Loop.prototype.add = function (funcIn) {
  this.arr.push(funcIn);
};
//배열 제거 메소드
Loop.prototype.remove = function (index, num) {
  this.arr.splice(index, num);
};

//arr에 들어있는 함수들 실행
Loop.prototype.draw = function() {
  for(let i = 0; i < this.arr.length; i++){
    let poo = this.arr[i];
    poo();
  }
  requestAnimationFrame(()=>{
    this.draw();
  });
};

//requestAnimationFrame 써서 반복
Loop.prototype.loopoo = function() {
  requestAnimationFrame(()=>this.draw());
};

// this 보기 call,apply,bind 

// Loop.prototype.loopoo = function() {
//   requestAnimationFrame(function draw() {
//     for(let i = 0; i < this.arr.length; i++) {
//       let poo = this.arr[i];
//       poo();
//     }
//     requestAnimationFrame(draw);
//   })
// }

export { Loop };