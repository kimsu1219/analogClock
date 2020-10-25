// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var index = function index() {
  var createElement = function createElement(tagName, properties) {
    return Object.assign(document.createElement(tagName), properties);
  };

  var Div = function Div(properties) {
    return createElement("div", properties);
  }; //div 태그를 가진 엘리먼트 만들기


  var Link = function Link(properties) {
    return createElement("link", properties);
  }; //link 태그를 가진 엘리먼트 만들기


  var initArray = function initArray(n) {
    var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_, i) {
      return i;
    };
    return Array.from({
      length: n
    }, f);
  }; //배열만들어주는 함수


  var CLOCK_SIZE = 300; // 시계크기

  var CLOCK_RADIUS = 120; // 반지름

  var HOURS_DEG = 360 / 12; // 30도

  var OFFSET_DEG = 90;

  function Clock(hour, min, sec, fontname) {
    var fontlink = "https://fonts.googleapis.com/css?family=".concat(fontname.replace(/ /g, '+'), "&display=swap");
    var fontfamily = "".concat(fontname, ", sans-serif");
    var frame = Div({
      style: "\n        position: relative;\n        width: ".concat(CLOCK_SIZE, "px;\n        height: ").concat(CLOCK_SIZE, "px;\n        box-shadow: inset 0 0 0 ", 3, "px #333, inset 0 0 0 ").concat(CLOCK_SIZE / 2 - 5, "px #fff;\n        border-radius: 50%;\n        background: #333;\n      ")
    });
    frame.classList.add("frame"); //classList.add() 클래스 생성함수 

    var circle = Div({
      style: "\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      background-color: black;\n      height: 13px;\n      width: 13px;\n      border-radius: 50%;\n      transform: translate(-50%, -50%);\n      z-index: 1;\n      "
    });
    frame.appendChild(circle);
    var hourDiv = Div({
      style: "\n      position: absolute;\n      left: 50%;\n      top : 50%;\n      background-color: black;\n      height: 75px;\n      width: 8px;\n      transform-origin: 50% 0;\n      transform: translate(-50%, 0) rotate(".concat(hour * 30 + 180, "deg);\n      ")
    });
    frame.appendChild(hourDiv);
    var minDiv = Div({
      style: "\n      position: absolute;\n      left: 50%;\n      top : 50%;\n      background-color: black;\n      height: 105px;\n      width: 5px;\n      transform-origin: 50% 0;\n      transform: translate(-50%, 0) rotate(".concat(min * 6 + 180, "deg);\n      ")
    });
    frame.appendChild(minDiv);
    var secDiv = Div({
      style: "\n      position: absolute;\n      left: 50%;\n      top : 50%;\n      background-color: red;\n      height: 120px;\n      width: 1px;\n      transform-origin: 50% 0;\n      transform: translate(-50%, 0) rotate(".concat(sec * 6 + 180, "deg);\n      ")
    });
    frame.appendChild(secDiv);
    initArray(12, function (_, i) {
      return i + 1;
    }) // initArray = [1,2,3,4,5,6,7,8,9,10,11,12]
    .map(function (num, i) {
      i = i + 1;
      var currentDeg = HOURS_DEG * i;
      var x = CLOCK_RADIUS * Math.cos(Math.PI / 180 * (currentDeg - OFFSET_DEG));
      var y = CLOCK_RADIUS * Math.sin(Math.PI / 180 * (currentDeg - OFFSET_DEG)); // console.log(x);
      // console.log(y);

      return Div({
        innerText: num,
        style: "\n          color: #333;\n          font-family: ".concat(fontfamily, ";\n          font-size: 40px;\n          font-weight: bold;\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%, -50%) translate(").concat(x, "px, ").concat(y, "px);\n          ")
      });
    }).forEach(function (time) {
      return frame.appendChild(time);
    }); //시간 넣어줌    

    this.frame = frame;
    this.fontlink = fontlink;
    this.hour = hourDiv;
    this.min = minDiv;
    this.sec = secDiv;
  }

  Clock.prototype.render = function (hour, min, sec) {
    clock.hour.style.transform = "translate(-50%, 0) rotate(".concat(180 + hour * 30 + min * 0.5 + sec * 0.1, "deg)");
    clock.min.style.transform = "translate(-50%, 0) rotate(".concat(180 + min * 6 + sec * 0.1, "deg)");
    clock.sec.style.transform = "translate(-50%, 0) rotate(".concat(180 + sec * 6, "deg)");
  };

  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var millsec = date.getMilliseconds(); //인스턴스 생성

  var clock = new Clock(hour, min, sec, "Nanum Brush Script"); //font링크태그 생성

  clock.frame.appendChild(Link({
    rel: "stylesheet",
    href: clock.fontlink
  })); //link태그 만들기

  for (var i = 0; i < 60; i++) {
    //시계옆에 초테두리
    // const div = i%5;
    // console.log(div);
    if (i % 5 == 0) {
      // 5초마다 진하게 표시
      var lineDiv = Div({
        //div를 계속해서 만들어주는함수.
        style: "\n          position: absolute;\n          left: 50%;\n          top : 50%;\n          background-color: red;\n          height: 13px;\n          width: 3px;\n          // transform-origin: 50% 0;\n          transform: translate(-50%, -50%) rotate(".concat(i * 6, "deg) translate(0%, 1100%) ;\n          ")
      });
      clock.frame.appendChild(lineDiv);
    } else {
      var _lineDiv = Div({
        //div를 계속해서 만들어주는함수.
        style: "\n          position: absolute;\n          left: 50%;\n          top : 50%;\n          background-color: black;\n          height: 10px;\n          width: 2px;\n          // transform-origin: 50% 0;\n          transform: translate(-50%, -50%) rotate(".concat(i * 6, "deg) translate(0%, 1400%) ;\n          ")
      });

      clock.frame.appendChild(_lineDiv);
    }
  }

  function Loop(func) {
    var arr = new Array(); //비어있는 배열 만들기

    this.arr = arr; // 배열을 Loop 필드
  } //배열 추가 메소드


  Loop.prototype.add = function (funcIn) {
    this.arr.push(funcIn);
  }; //배열 제거 메소드


  Loop.prototype.remove = function (index, num) {
    this.arr.splice(index, num);
  }; //인스턴스 생성


  var loop = new Loop(); //loop.arr[0]에 저장

  loop.add(function () {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes(); // const sec= date.getSeconds(); // 1초씩돌아가는 시계

    var millsec = date.getMilliseconds();
    var sec = date.getSeconds() + millsec / 1000; //무소음시계 -> 현재 초 + 밀리초

    clock.render(hour, min, sec);
  });
  loop.add(function () {}); //loop.arr[1]에 저장

  loop.remove(1, 1); //loop.arr[1]에 1개요소 제거

  var loopoo = function loopoo(f) {
    return requestAnimationFrame(function draw() {
      for (var _i = 0; _i < loop.arr.length; _i++) {
        var poo = loop.arr[_i];
        poo();
      }

      requestAnimationFrame(draw);
    });
  };

  loopoo();
  document.body.appendChild(clock.frame);
};
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "2702" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/analog_clock.e31bb0bc.js.map