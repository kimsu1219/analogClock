const createElement = (tagName, properties) =>
Object.assign(document.createElement(tagName), properties);
const Div = properties => createElement("div", properties); //div 태그를 가진 엘리먼트 만들기
const Link = properties => createElement("link", properties);//link 태그를 가진 엘리먼트 만들기
const initArray = (n, f = (_, i) => i) => Array.from({ length: n }, f); //배열만들어주는 함수

export { createElement, Div, Link, initArray }