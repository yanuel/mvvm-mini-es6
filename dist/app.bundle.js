/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pub = __webpack_require__(1);

var _pub2 = _interopRequireDefault(_pub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Watcher = function () {
	function Watcher(vm, expOrFn, cb) {
		_classCallCheck(this, Watcher);

		this.cb = cb;
		this.vm = vm;
		this.expOrFn = expOrFn;
		this.pubIds = {};

		if (typeof expOrFn === 'function') {
			this.getter = expOrFn;
		} else {
			this.getter = this.parseGetter(expOrFn);
		}

		this.value = this.get();
	}

	_createClass(Watcher, [{
		key: 'update',
		value: function update() {
			this.run();
		}
	}, {
		key: 'run',
		value: function run() {
			var value = this.get();
			var oldVal = this.value;
			if (value !== oldVal) {
				this.value = value;
				this.cb.call(this.vm, value, oldVal);
			}
		}
	}, {
		key: 'addPub',
		value: function addPub(pub) {
			if (!this.pubIds.hasOwnProperty(pub.id)) {
				pub.addSub(this);
				this.pubIds[pub.id] = pub;
			}
		}
	}, {
		key: 'get',
		value: function get() {
			_pub2.default.target = this;
			var value = this.getter.call(this.vm, this.vm);
			_pub2.default.target = null;

			return value;
		}
	}, {
		key: 'parseGetter',
		value: function parseGetter(exp) {
			if (/[^\w.$]/.test(exp)) return;

			var exps = exp.split('.');

			return function (obj) {
				for (var i = 0, len = exps.length; i < len; i++) {
					if (!obj) return;
					obj = obj[exps[i]];
				}

				return obj;
			};
		}
	}]);

	return Watcher;
}();

exports.default = Watcher;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uid = 0;

var Pub = function () {
	function Pub() {
		_classCallCheck(this, Pub);

		this.id = uid++;
		this.subs = [];
	}

	_createClass(Pub, [{
		key: "addSub",
		value: function addSub(sub) {
			this.subs.push(sub);
		}
	}, {
		key: "depend",
		value: function depend() {
			Pub.target.addPub(this);
		}
	}, {
		key: "removeSub",
		value: function removeSub(sub) {
			var index = this.subs.indexOf(sub);
			if (index != -1) {
				this.subs.splice(index, 1);
			}
		}
	}, {
		key: "notify",
		value: function notify() {
			this.subs.forEach(function (sub) {
				return sub.update();
			});
		}
	}]);

	return Pub;
}();

Pub.target = null;
exports.default = Pub;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mvvm = __webpack_require__(3);

var _mvvm2 = _interopRequireDefault(_mvvm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vm = new _mvvm2.default({
    el: '#mvvm-app',
    data: {
        someStr: 'hello ',
        className: 'btn',
        htmlStr: '<span style="color: #f00;">red</span>',
        child: {
            someStr: 'World !'
        }
    },

    computed: {
        getHelloWord: function getHelloWord() {
            return this.someStr + this.child.someStr;
        }
    },

    methods: {
        clickBtn: function clickBtn(e) {
            var randomStrArr = ['One', 'Two', 'Three'];
            this.child.someStr = randomStrArr[parseInt(Math.random() * 3)];
        }
    }
});

vm.$watch('child.someStr', function () {
    console.log(arguments);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _compile = __webpack_require__(4);

var _compile2 = _interopRequireDefault(_compile);

var _observer = __webpack_require__(5);

var _observer2 = _interopRequireDefault(_observer);

var _watcher = __webpack_require__(0);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MVVM = function () {
  function MVVM(options) {
    var _this = this;

    _classCallCheck(this, MVVM);

    this.$options = options || {};
    var data = this._data = this.$options.data;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function (key) {
      _this._proxyData(key);
    });

    this._initComputed();

    (0, _observer2.default)(data, this);

    this.$compile = new _compile2.default(options.el || document.body, this);
  }

  _createClass(MVVM, [{
    key: '$watch',
    value: function $watch(key, cb) {
      new _watcher2.default(this, key, cb);
    }
  }, {
    key: '_proxyData',
    value: function _proxyData(key, setter, getter) {
      var self = this;
      setter = setter || Object.defineProperty(self, key, {
        configurable: false,

        enumerable: true,

        get: function get() {
          return self._data[key];
        },
        set: function set(newVal) {
          self._data[key] = newVal;
        }
      });
    }
  }, {
    key: '_initComputed',
    value: function _initComputed() {
      var _this2 = this;

      var _ref = [this, this.$options.computed],
          self = _ref[0],
          computed = _ref[1];


      if ((typeof computed === 'undefined' ? 'undefined' : _typeof(computed)) === 'object') {
        Object.keys(computed).forEach(function (key) {
          Object.defineProperty(_this2, key, {
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
            set: function set() {}
          });
        });
      }
    }
  }]);

  return MVVM;
}();

exports.default = MVVM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _watcher = __webpack_require__(0);

var _watcher2 = _interopRequireDefault(_watcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compile = function () {
	function Compile(el, vm) {
		_classCallCheck(this, Compile);

		this.$vm = vm;
		this.$el = this.isElementNode(el) ? el : document.querySelector(el);

		if (this.$el) {
			this.$fragment = this.node2Fragment(this.$el);
			this.init();
			this.$el.appendChild(this.$fragment);
		}
	}

	_createClass(Compile, [{
		key: 'node2Fragment',
		value: function node2Fragment(el) {
			var _ref = [document.createDocumentFragment()],
			    fragment = _ref[0],
			    child = _ref[1];

			// 将原生节点拷贝到fragment

			while (child = el.firstChild) {
				fragment.appendChild(child);
			}

			return fragment;
		}
	}, {
		key: 'init',
		value: function init() {
			this.compileElement(this.$fragment);
		}
	}, {
		key: 'compileElement',
		value: function compileElement(el) {
			var _this = this;

			var childNodes = el.childNodes;

			[].slice.call(childNodes).forEach(function (node) {
				var _ref2 = [node.textContent, /\{\{(.*)\}\}/],
				    text = _ref2[0],
				    reg = _ref2[1];


				if (_this.isElementNode(node)) {
					_this.compile(node);
				} else if (_this.isTextNode(node) && reg.test(text)) {
					_this.compileText(node, RegExp.$1);
				}

				if (node.childNodes && node.childNodes.length) {
					_this.compileElement(node);
				}
			});
		}
	}, {
		key: 'compile',
		value: function compile(node) {
			var _this2 = this;

			var nodeAttrs = node.attributes;

			[].slice.call(nodeAttrs).forEach(function (attr) {
				var attrName = attr.name;
				if (_this2.isDirective(attrName)) {
					var _ref3 = [attr.value, attrName.substring(2)],
					    exp = _ref3[0],
					    dir = _ref3[1];
					// 事件指令

					if (_this2.isEventDirective(dir)) {
						compileUtil.eventHandler(node, _this2.$vm, exp, dir);
						// 普通指令
					} else {
						compileUtil[dir] && compileUtil[dir](node, _this2.$vm, exp);
					}

					node.removeAttribute(attrName);
				}
			});
		}
	}, {
		key: 'compileText',
		value: function compileText(node, exp) {
			compileUtil.text(node, this.$vm, exp);
		}
	}, {
		key: 'isDirective',
		value: function isDirective(attr) {
			return attr.indexOf('v-') == 0;
		}
	}, {
		key: 'isEventDirective',
		value: function isEventDirective(dir) {
			return dir.indexOf('on') === 0;
		}
	}, {
		key: 'isElementNode',
		value: function isElementNode(node) {
			return node.nodeType == 1;
		}
	}, {
		key: 'isTextNode',
		value: function isTextNode(node) {
			return node.nodeType == 3;
		}
	}]);

	return Compile;
}();

// 指令处理集合


var compileUtil = {
	text: function text(node, vm, exp) {
		this.bind(node, vm, exp, 'text');
	},
	html: function html(node, vm, exp) {
		this.bind(node, vm, exp, 'html');
	},
	model: function model(node, vm, exp) {
		var _this3 = this;

		this.bind(node, vm, exp, 'model');

		var val = this._getVMVal(vm, exp);

		node.addEventListener('input', function (e) {
			var newValue = e.target.value;

			if (val === newValue) {
				return;
			}

			_this3._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},
	class: function _class(node, vm, exp) {
		this.bind(node, vm, exp, 'class');
	},
	bind: function bind(node, vm, exp, dir) {
		var updaterFn = updater[dir + 'Updater'];

		updaterFn && updaterFn(node, this._getVMVal(vm, exp));

		new _watcher2.default(vm, exp, function (value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		});
	},


	// 事件处理
	eventHandler: function eventHandler(node, vm, exp, dir) {
		var _ref4 = [dir.split(':')[1], vm.$options.methods && vm.$options.methods[exp]],
		    eventType = _ref4[0],
		    fn = _ref4[1];


		if (eventType && fn) {
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},
	_getVMVal: function _getVMVal(vm, exp) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (k) {
			val = val[k];
		});

		return val;
	},
	_setVMVal: function _setVMVal(vm, exp, value) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function (k, i) {
			// 非最后一个key，更新val的值
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		});
	}
};

var updater = {
	textUpdater: function textUpdater(node, value) {
		node.textContent = typeof value == 'undefined' ? '' : value;
	},
	htmlUpdater: function htmlUpdater(node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value;
	},
	classUpdater: function classUpdater(node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, '').replace(/\s$/, '');

		var space = className && String(value) ? ' ' : '';

		node.className = className + space + value;
	},
	modelUpdater: function modelUpdater(node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value;
	}
};

exports.default = Compile;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = observe;

var _pub = __webpack_require__(1);

var _pub2 = _interopRequireDefault(_pub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//劫持监听所有属性
var Observer = function () {
    function Observer(data) {
        _classCallCheck(this, Observer);

        this.data = data;
        this.walk(data);
    }

    _createClass(Observer, [{
        key: 'walk',
        value: function walk(data) {
            var _this = this;

            Object.keys(data).forEach(function (key) {
                _this.convert(key, data[key]);
            });
        }
    }, {
        key: 'convert',
        value: function convert(key, val) {
            this.defineReactive(this.data, key, val);
        }
    }, {
        key: 'defineReactive',
        value: function defineReactive(data, key, val) {
            var _ref = [new _pub2.default(), observe(val)],
                pub = _ref[0],
                childObj = _ref[1];


            Object.defineProperty(data, key, {
                enumerable: true, // 可枚举
                configurable: false,
                get: function get() {
                    if (_pub2.default.target) {
                        pub.depend();
                    }
                    return val;
                },
                set: function set(newVal) {
                    if (newVal === val) {
                        return;
                    }
                    val = newVal;
                    // 新的值是object的话，进行监听
                    childObj = observe(newVal);
                    // 通知订阅者
                    pub.notify();
                }
            });
        }
    }]);

    return Observer;
}();

function observe(value, vm) {
    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
        return;
    }

    return new Observer(value);
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjgxN2QyYmEzYWY0OGU5NDhmNTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9tdnZtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vYnNlcnZlci5qcyJdLCJuYW1lcyI6WyJXYXRjaGVyIiwidm0iLCJleHBPckZuIiwiY2IiLCJwdWJJZHMiLCJnZXR0ZXIiLCJwYXJzZUdldHRlciIsInZhbHVlIiwiZ2V0IiwicnVuIiwib2xkVmFsIiwiY2FsbCIsInB1YiIsImhhc093blByb3BlcnR5IiwiaWQiLCJhZGRTdWIiLCJ0YXJnZXQiLCJleHAiLCJ0ZXN0IiwiZXhwcyIsInNwbGl0Iiwib2JqIiwiaSIsImxlbiIsImxlbmd0aCIsInVpZCIsIlB1YiIsInN1YnMiLCJzdWIiLCJwdXNoIiwiYWRkUHViIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZm9yRWFjaCIsInVwZGF0ZSIsImVsIiwiZGF0YSIsInNvbWVTdHIiLCJjbGFzc05hbWUiLCJodG1sU3RyIiwiY2hpbGQiLCJjb21wdXRlZCIsImdldEhlbGxvV29yZCIsIm1ldGhvZHMiLCJjbGlja0J0biIsImUiLCJyYW5kb21TdHJBcnIiLCJwYXJzZUludCIsIk1hdGgiLCJyYW5kb20iLCIkd2F0Y2giLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwiTVZWTSIsIm9wdGlvbnMiLCIkb3B0aW9ucyIsIl9kYXRhIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsIl9wcm94eURhdGEiLCJfaW5pdENvbXB1dGVkIiwiJGNvbXBpbGUiLCJkb2N1bWVudCIsImJvZHkiLCJzZXR0ZXIiLCJzZWxmIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwic2V0IiwibmV3VmFsIiwiQ29tcGlsZSIsIiR2bSIsIiRlbCIsImlzRWxlbWVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiJGZyYWdtZW50Iiwibm9kZTJGcmFnbWVudCIsImluaXQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJmcmFnbWVudCIsImZpcnN0Q2hpbGQiLCJjb21waWxlRWxlbWVudCIsImNoaWxkTm9kZXMiLCJzbGljZSIsIm5vZGUiLCJ0ZXh0Q29udGVudCIsInRleHQiLCJyZWciLCJjb21waWxlIiwiaXNUZXh0Tm9kZSIsImNvbXBpbGVUZXh0IiwiUmVnRXhwIiwiJDEiLCJub2RlQXR0cnMiLCJhdHRyaWJ1dGVzIiwiYXR0ciIsImF0dHJOYW1lIiwibmFtZSIsImlzRGlyZWN0aXZlIiwic3Vic3RyaW5nIiwiZGlyIiwiaXNFdmVudERpcmVjdGl2ZSIsImNvbXBpbGVVdGlsIiwiZXZlbnRIYW5kbGVyIiwicmVtb3ZlQXR0cmlidXRlIiwibm9kZVR5cGUiLCJiaW5kIiwiaHRtbCIsIm1vZGVsIiwidmFsIiwiX2dldFZNVmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5ld1ZhbHVlIiwiX3NldFZNVmFsIiwiY2xhc3MiLCJ1cGRhdGVyRm4iLCJ1cGRhdGVyIiwib2xkVmFsdWUiLCJldmVudFR5cGUiLCJmbiIsImsiLCJ0ZXh0VXBkYXRlciIsImh0bWxVcGRhdGVyIiwiaW5uZXJIVE1MIiwiY2xhc3NVcGRhdGVyIiwicmVwbGFjZSIsInNwYWNlIiwiU3RyaW5nIiwibW9kZWxVcGRhdGVyIiwib2JzZXJ2ZSIsIk9ic2VydmVyIiwid2FsayIsImNvbnZlcnQiLCJkZWZpbmVSZWFjdGl2ZSIsImNoaWxkT2JqIiwiZGVwZW5kIiwibm90aWZ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0lBRU1BLE87QUFDTCxrQkFBYUMsRUFBYixFQUFpQkMsT0FBakIsRUFBMEJDLEVBQTFCLEVBQThCO0FBQUE7O0FBQzdCLE9BQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNHLE9BQUtGLEVBQUwsR0FBVUEsRUFBVjtBQUNBLE9BQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtFLE1BQUwsR0FBYyxFQUFkOztBQUVBLE1BQUksT0FBT0YsT0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUMvQixRQUFLRyxNQUFMLEdBQWNILE9BQWQ7QUFDSCxHQUZELE1BRU87QUFDSCxRQUFLRyxNQUFMLEdBQWMsS0FBS0MsV0FBTCxDQUFpQkosT0FBakIsQ0FBZDtBQUNIOztBQUVELE9BQUtLLEtBQUwsR0FBYSxLQUFLQyxHQUFMLEVBQWI7QUFDSDs7OzsyQkFFUztBQUNULFFBQUtDLEdBQUw7QUFDQTs7O3dCQUVNO0FBQ04sT0FBSUYsUUFBUSxLQUFLQyxHQUFMLEVBQVo7QUFDTSxPQUFJRSxTQUFTLEtBQUtILEtBQWxCO0FBQ0EsT0FBSUEsVUFBVUcsTUFBZCxFQUFzQjtBQUNsQixTQUFLSCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLSixFQUFMLENBQVFRLElBQVIsQ0FBYSxLQUFLVixFQUFsQixFQUFzQk0sS0FBdEIsRUFBNkJHLE1BQTdCO0FBQ0g7QUFDUDs7O3lCQUVPRSxHLEVBQUs7QUFDWixPQUFJLENBQUMsS0FBS1IsTUFBTCxDQUFZUyxjQUFaLENBQTJCRCxJQUFJRSxFQUEvQixDQUFMLEVBQXlDO0FBQy9CRixRQUFJRyxNQUFKLENBQVcsSUFBWDtBQUNBLFNBQUtYLE1BQUwsQ0FBWVEsSUFBSUUsRUFBaEIsSUFBc0JGLEdBQXRCO0FBQ0g7QUFDUDs7O3dCQUVNO0FBQ04saUJBQUlJLE1BQUosR0FBYSxJQUFiO0FBQ00sT0FBSVQsUUFBUSxLQUFLRixNQUFMLENBQVlNLElBQVosQ0FBaUIsS0FBS1YsRUFBdEIsRUFBMEIsS0FBS0EsRUFBL0IsQ0FBWjtBQUNBLGlCQUFJZSxNQUFKLEdBQWEsSUFBYjs7QUFFQSxVQUFPVCxLQUFQO0FBQ047Ozs4QkFFWVUsRyxFQUFLO0FBQ2pCLE9BQUksVUFBVUMsSUFBVixDQUFlRCxHQUFmLENBQUosRUFBeUI7O0FBRW5CLE9BQUlFLE9BQU9GLElBQUlHLEtBQUosQ0FBVSxHQUFWLENBQVg7O0FBRUEsVUFBTyxVQUFDQyxHQUFELEVBQVM7QUFDZixTQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxNQUFNSixLQUFLSyxNQUEzQixFQUFtQ0YsSUFBSUMsR0FBdkMsRUFBNENELEdBQTVDLEVBQWlEO0FBQzFDLFNBQUksQ0FBQ0QsR0FBTCxFQUFVO0FBQ1ZBLFdBQU1BLElBQUlGLEtBQUtHLENBQUwsQ0FBSixDQUFOO0FBQ0g7O0FBRUQsV0FBT0QsR0FBUDtBQUNILElBUEQ7QUFRTjs7Ozs7O2tCQUdhckIsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RGYsSUFBSXlCLE1BQU0sQ0FBVjs7SUFFTUMsRztBQUdMLGdCQUFlO0FBQUE7O0FBQ2QsT0FBS1osRUFBTCxHQUFVVyxLQUFWO0FBQ0csT0FBS0UsSUFBTCxHQUFZLEVBQVo7QUFDSDs7Ozt5QkFFT0MsRyxFQUFLO0FBQ1osUUFBS0QsSUFBTCxDQUFVRSxJQUFWLENBQWVELEdBQWY7QUFDQTs7OzJCQUVTO0FBQ1RGLE9BQUlWLE1BQUosQ0FBV2MsTUFBWCxDQUFrQixJQUFsQjtBQUNBOzs7NEJBRVVGLEcsRUFBSztBQUNmLE9BQUlHLFFBQVEsS0FBS0osSUFBTCxDQUFVSyxPQUFWLENBQWtCSixHQUFsQixDQUFaO0FBQ00sT0FBSUcsU0FBUyxDQUFDLENBQWQsRUFBaUI7QUFDYixTQUFLSixJQUFMLENBQVVNLE1BQVYsQ0FBaUJGLEtBQWpCLEVBQXdCLENBQXhCO0FBQ0g7QUFDUDs7OzJCQUVTO0FBQ0gsUUFBS0osSUFBTCxDQUFVTyxPQUFWLENBQWtCO0FBQUEsV0FBT04sSUFBSU8sTUFBSixFQUFQO0FBQUEsSUFBbEI7QUFDTjs7Ozs7O0FBekJJVCxHLENBQ0VWLE0sR0FBUyxJO2tCQTJCRlUsRzs7Ozs7Ozs7O0FDOUJmOzs7Ozs7QUFFQSxJQUFJekIsS0FBSyxtQkFBUztBQUNkbUMsUUFBSSxXQURVO0FBRWRDLFVBQU07QUFDRkMsaUJBQVMsUUFEUDtBQUVGQyxtQkFBVyxLQUZUO0FBR0ZDLGlCQUFTLHVDQUhQO0FBSUZDLGVBQU87QUFDSEgscUJBQVM7QUFETjtBQUpMLEtBRlE7O0FBV2RJLGNBQVU7QUFDTkMsc0JBQWMsd0JBQVc7QUFDckIsbUJBQU8sS0FBS0wsT0FBTCxHQUFlLEtBQUtHLEtBQUwsQ0FBV0gsT0FBakM7QUFDSDtBQUhLLEtBWEk7O0FBaUJkTSxhQUFTO0FBQ0xDLGtCQUFVLGtCQUFTQyxDQUFULEVBQVk7QUFDbEIsZ0JBQUlDLGVBQWUsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE9BQWYsQ0FBbkI7QUFDQSxpQkFBS04sS0FBTCxDQUFXSCxPQUFYLEdBQXFCUyxhQUFhQyxTQUFTQyxLQUFLQyxNQUFMLEtBQWdCLENBQXpCLENBQWIsQ0FBckI7QUFDSDtBQUpJO0FBakJLLENBQVQsQ0FBVDs7QUF5QkFqRCxHQUFHa0QsTUFBSCxDQUFVLGVBQVYsRUFBMkIsWUFBVztBQUNsQ0MsWUFBUUMsR0FBUixDQUFZQyxTQUFaO0FBQ0gsQ0FGRCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1DLEk7QUFDTCxnQkFBYUMsT0FBYixFQUFzQjtBQUFBOztBQUFBOztBQUNyQixTQUFLQyxRQUFMLEdBQWdCRCxXQUFXLEVBQTNCO0FBQ0csUUFBSW5CLE9BQU8sS0FBS3FCLEtBQUwsR0FBYSxLQUFLRCxRQUFMLENBQWNwQixJQUF0Qzs7QUFFQTtBQUNBO0FBQ0FzQixXQUFPQyxJQUFQLENBQVl2QixJQUFaLEVBQWtCSCxPQUFsQixDQUEwQixVQUFDMkIsR0FBRCxFQUFTO0FBQ2xDLFlBQUtDLFVBQUwsQ0FBZ0JELEdBQWhCO0FBQ0EsS0FGRDs7QUFJQSxTQUFLRSxhQUFMOztBQUVBLDRCQUFRMUIsSUFBUixFQUFjLElBQWQ7O0FBRUEsU0FBSzJCLFFBQUwsR0FBZ0Isc0JBQVlSLFFBQVFwQixFQUFSLElBQWM2QixTQUFTQyxJQUFuQyxFQUF5QyxJQUF6QyxDQUFoQjtBQUNIOzs7OzJCQUVPTCxHLEVBQUsxRCxFLEVBQUk7QUFDaEIsNEJBQVksSUFBWixFQUFrQjBELEdBQWxCLEVBQXVCMUQsRUFBdkI7QUFDQTs7OytCQUVXMEQsRyxFQUFLTSxNLEVBQVE5RCxNLEVBQVE7QUFDaEMsVUFBSStELE9BQU8sSUFBWDtBQUNNRCxlQUFTQSxVQUNUUixPQUFPVSxjQUFQLENBQXNCRCxJQUF0QixFQUE0QlAsR0FBNUIsRUFBaUM7QUFDN0JTLHNCQUFjLEtBRGU7O0FBRzdCQyxvQkFBWSxJQUhpQjs7QUFLN0IvRCxXQUw2QixpQkFLdEI7QUFDTixpQkFBTzRELEtBQUtWLEtBQUwsQ0FBV0csR0FBWCxDQUFQO0FBQ0EsU0FQNEI7QUFTN0JXLFdBVDZCLGVBU3hCQyxNQVR3QixFQVNoQjtBQUNaTCxlQUFLVixLQUFMLENBQVdHLEdBQVgsSUFBa0JZLE1BQWxCO0FBQ0E7QUFYNEIsT0FBakMsQ0FEQTtBQWNOOzs7b0NBRWdCO0FBQUE7O0FBQUEsaUJBQ08sQ0FBQyxJQUFELEVBQU8sS0FBS2hCLFFBQUwsQ0FBY2YsUUFBckIsQ0FEUDtBQUFBLFVBQ1gwQixJQURXO0FBQUEsVUFDTDFCLFFBREs7OztBQUdWLFVBQUksUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxPQUFvQixRQUF4QixFQUFrQztBQUNqQ2lCLGVBQU9DLElBQVAsQ0FBWWxCLFFBQVosRUFBc0JSLE9BQXRCLENBQThCLFVBQUMyQixHQUFELEVBQVM7QUFDdENGLGlCQUFPVSxjQUFQLFNBQTRCUixHQUE1QixFQUFpQztBQUN2QnJELGlCQUFLLE9BQU9rQyxTQUFTbUIsR0FBVCxDQUFQLEtBQXlCLFVBQXpCLEdBQ0tuQixTQUFTbUIsR0FBVCxDQURMLEdBRUtuQixTQUFTbUIsR0FBVCxFQUFjckQsR0FIRDtBQUl2QmdFLGVBSnVCLGlCQUloQixDQUVOO0FBTnNCLFdBQWpDO0FBUUEsU0FURDtBQVVBO0FBQ1A7Ozs7OztrQkFHYWpCLEk7Ozs7Ozs7Ozs7Ozs7OztBQzlEZjs7Ozs7Ozs7SUFFTW1CLE87QUFDTCxrQkFBYXRDLEVBQWIsRUFBaUJuQyxFQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLMEUsR0FBTCxHQUFXMUUsRUFBWDtBQUNHLE9BQUsyRSxHQUFMLEdBQVcsS0FBS0MsYUFBTCxDQUFtQnpDLEVBQW5CLElBQXlCQSxFQUF6QixHQUE4QjZCLFNBQVNhLGFBQVQsQ0FBdUIxQyxFQUF2QixDQUF6Qzs7QUFFQSxNQUFJLEtBQUt3QyxHQUFULEVBQWM7QUFDVixRQUFLRyxTQUFMLEdBQWlCLEtBQUtDLGFBQUwsQ0FBbUIsS0FBS0osR0FBeEIsQ0FBakI7QUFDQSxRQUFLSyxJQUFMO0FBQ0EsUUFBS0wsR0FBTCxDQUFTTSxXQUFULENBQXFCLEtBQUtILFNBQTFCO0FBQ0g7QUFDSjs7OztnQ0FFYzNDLEUsRUFBSTtBQUFBLGNBQ1ksQ0FBQzZCLFNBQVNrQixzQkFBVCxFQUFELENBRFo7QUFBQSxPQUNQQyxRQURPO0FBQUEsT0FDRzNDLEtBREg7O0FBR1o7O0FBQ0EsVUFBT0EsUUFBUUwsR0FBR2lELFVBQWxCLEVBQThCO0FBQzFCRCxhQUFTRixXQUFULENBQXFCekMsS0FBckI7QUFDSDs7QUFFRCxVQUFPMkMsUUFBUDtBQUNOOzs7eUJBRU87QUFDUCxRQUFLRSxjQUFMLENBQW9CLEtBQUtQLFNBQXpCO0FBQ0E7OztpQ0FFZTNDLEUsRUFBSTtBQUFBOztBQUNiLE9BQUltRCxhQUFhbkQsR0FBR21ELFVBQXBCOztBQUVBLE1BQUdDLEtBQUgsQ0FBUzdFLElBQVQsQ0FBYzRFLFVBQWQsRUFBMEJyRCxPQUExQixDQUFrQyxVQUFDdUQsSUFBRCxFQUFVO0FBQUEsZ0JBQ3pCLENBQUNBLEtBQUtDLFdBQU4sRUFBbUIsY0FBbkIsQ0FEeUI7QUFBQSxRQUN0Q0MsSUFEc0M7QUFBQSxRQUNoQ0MsR0FEZ0M7OztBQUczQyxRQUFHLE1BQUtmLGFBQUwsQ0FBbUJZLElBQW5CLENBQUgsRUFBNkI7QUFDNUIsV0FBS0ksT0FBTCxDQUFhSixJQUFiO0FBQ0EsS0FGRCxNQUVNLElBQUksTUFBS0ssVUFBTCxDQUFnQkwsSUFBaEIsS0FBeUJHLElBQUkxRSxJQUFKLENBQVN5RSxJQUFULENBQTdCLEVBQTZDO0FBQ2xELFdBQUtJLFdBQUwsQ0FBaUJOLElBQWpCLEVBQXVCTyxPQUFPQyxFQUE5QjtBQUNBOztBQUVELFFBQUlSLEtBQUtGLFVBQUwsSUFBbUJFLEtBQUtGLFVBQUwsQ0FBZ0IvRCxNQUF2QyxFQUErQztBQUN4QyxXQUFLOEQsY0FBTCxDQUFvQkcsSUFBcEI7QUFDSDtBQUNKLElBWkQ7QUFhTjs7OzBCQUVRQSxJLEVBQU07QUFBQTs7QUFDZCxPQUFJUyxZQUFZVCxLQUFLVSxVQUFyQjs7QUFFQSxNQUFHWCxLQUFILENBQVM3RSxJQUFULENBQWN1RixTQUFkLEVBQXlCaEUsT0FBekIsQ0FBaUMsVUFBQ2tFLElBQUQsRUFBVTtBQUMxQyxRQUFJQyxXQUFXRCxLQUFLRSxJQUFwQjtBQUNTLFFBQUksT0FBS0MsV0FBTCxDQUFpQkYsUUFBakIsQ0FBSixFQUFnQztBQUFBLGlCQUNYLENBQUNELEtBQUs3RixLQUFOLEVBQWE4RixTQUFTRyxTQUFULENBQW1CLENBQW5CLENBQWIsQ0FEVztBQUFBLFNBQ3ZCdkYsR0FEdUI7QUFBQSxTQUNsQndGLEdBRGtCO0FBRTVCOztBQUNBLFNBQUksT0FBS0MsZ0JBQUwsQ0FBc0JELEdBQXRCLENBQUosRUFBZ0M7QUFDNUJFLGtCQUFZQyxZQUFaLENBQXlCbkIsSUFBekIsRUFBK0IsT0FBS2QsR0FBcEMsRUFBeUMxRCxHQUF6QyxFQUE4Q3dGLEdBQTlDO0FBQ0E7QUFDSCxNQUhELE1BR087QUFDSEUsa0JBQVlGLEdBQVosS0FBb0JFLFlBQVlGLEdBQVosRUFBaUJoQixJQUFqQixFQUF1QixPQUFLZCxHQUE1QixFQUFpQzFELEdBQWpDLENBQXBCO0FBQ0g7O0FBRUR3RSxVQUFLb0IsZUFBTCxDQUFxQlIsUUFBckI7QUFDSDtBQUNWLElBZEQ7QUFlQTs7OzhCQUVZWixJLEVBQU14RSxHLEVBQUs7QUFDdkIwRixlQUFZaEIsSUFBWixDQUFpQkYsSUFBakIsRUFBdUIsS0FBS2QsR0FBNUIsRUFBaUMxRCxHQUFqQztBQUNBOzs7OEJBRVltRixJLEVBQU07QUFDbEIsVUFBT0EsS0FBS3BFLE9BQUwsQ0FBYSxJQUFiLEtBQXNCLENBQTdCO0FBQ0E7OzttQ0FFaUJ5RSxHLEVBQUs7QUFDdEIsVUFBT0EsSUFBSXpFLE9BQUosQ0FBWSxJQUFaLE1BQXNCLENBQTdCO0FBQ0E7OztnQ0FFY3lELEksRUFBTTtBQUNwQixVQUFPQSxLQUFLcUIsUUFBTCxJQUFpQixDQUF4QjtBQUNBOzs7NkJBRVdyQixJLEVBQU07QUFDakIsVUFBT0EsS0FBS3FCLFFBQUwsSUFBaUIsQ0FBeEI7QUFDQTs7Ozs7O0FBR0Y7OztBQUNBLElBQUlILGNBQWM7QUFDakJoQixLQURpQixnQkFDWEYsSUFEVyxFQUNMeEYsRUFESyxFQUNEZ0IsR0FEQyxFQUNJO0FBQ3BCLE9BQUs4RixJQUFMLENBQVV0QixJQUFWLEVBQWdCeEYsRUFBaEIsRUFBb0JnQixHQUFwQixFQUF5QixNQUF6QjtBQUNBLEVBSGdCO0FBS2pCK0YsS0FMaUIsZ0JBS1h2QixJQUxXLEVBS0x4RixFQUxLLEVBS0RnQixHQUxDLEVBS0k7QUFDcEIsT0FBSzhGLElBQUwsQ0FBVXRCLElBQVYsRUFBZ0J4RixFQUFoQixFQUFvQmdCLEdBQXBCLEVBQXlCLE1BQXpCO0FBQ0EsRUFQZ0I7QUFTakJnRyxNQVRpQixpQkFTVnhCLElBVFUsRUFTSnhGLEVBVEksRUFTQWdCLEdBVEEsRUFTSztBQUFBOztBQUNyQixPQUFLOEYsSUFBTCxDQUFVdEIsSUFBVixFQUFnQnhGLEVBQWhCLEVBQW9CZ0IsR0FBcEIsRUFBeUIsT0FBekI7O0FBRUEsTUFBSWlHLE1BQU0sS0FBS0MsU0FBTCxDQUFlbEgsRUFBZixFQUFtQmdCLEdBQW5CLENBQVY7O0FBRUF3RSxPQUFLMkIsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ3RFLENBQUQsRUFBTztBQUNyQyxPQUFJdUUsV0FBV3ZFLEVBQUU5QixNQUFGLENBQVNULEtBQXhCOztBQUVBLE9BQUcyRyxRQUFRRyxRQUFYLEVBQXFCO0FBQ3BCO0FBQ0E7O0FBRUQsVUFBS0MsU0FBTCxDQUFlckgsRUFBZixFQUFtQmdCLEdBQW5CLEVBQXdCb0csUUFBeEI7QUFDU0gsU0FBTUcsUUFBTjtBQUNULEdBVEQ7QUFVQSxFQXhCZ0I7QUEwQmpCRSxNQTFCaUIsa0JBMEJWOUIsSUExQlUsRUEwQkp4RixFQTFCSSxFQTBCQWdCLEdBMUJBLEVBMEJLO0FBQ3JCLE9BQUs4RixJQUFMLENBQVV0QixJQUFWLEVBQWdCeEYsRUFBaEIsRUFBb0JnQixHQUFwQixFQUF5QixPQUF6QjtBQUNBLEVBNUJnQjtBQThCakI4RixLQTlCaUIsZ0JBOEJYdEIsSUE5QlcsRUE4Qkx4RixFQTlCSyxFQThCRGdCLEdBOUJDLEVBOEJJd0YsR0E5QkosRUE4QlM7QUFDekIsTUFBSWUsWUFBWUMsUUFBUWhCLE1BQU0sU0FBZCxDQUFoQjs7QUFFQWUsZUFBYUEsVUFBVS9CLElBQVYsRUFBZ0IsS0FBSzBCLFNBQUwsQ0FBZWxILEVBQWYsRUFBbUJnQixHQUFuQixDQUFoQixDQUFiOztBQUVNLHdCQUFZaEIsRUFBWixFQUFnQmdCLEdBQWhCLEVBQXFCLFVBQVNWLEtBQVQsRUFBZ0JtSCxRQUFoQixFQUEwQjtBQUMzQ0YsZ0JBQWFBLFVBQVUvQixJQUFWLEVBQWdCbEYsS0FBaEIsRUFBdUJtSCxRQUF2QixDQUFiO0FBQ0gsR0FGRDtBQUdOLEVBdENnQjs7O0FBd0NkO0FBQ0FkLGFBekNjLHdCQXlDQW5CLElBekNBLEVBeUNNeEYsRUF6Q04sRUF5Q1VnQixHQXpDVixFQXlDZXdGLEdBekNmLEVBeUNvQjtBQUFBLGNBQ1IsQ0FBQ0EsSUFBSXJGLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFELEVBQW9CbkIsR0FBR3dELFFBQUgsQ0FBWWIsT0FBWixJQUF1QjNDLEdBQUd3RCxRQUFILENBQVliLE9BQVosQ0FBb0IzQixHQUFwQixDQUEzQyxDQURRO0FBQUEsTUFDekIwRyxTQUR5QjtBQUFBLE1BQ2RDLEVBRGM7OztBQUc5QixNQUFJRCxhQUFhQyxFQUFqQixFQUFxQjtBQUNqQm5DLFFBQUsyQixnQkFBTCxDQUFzQk8sU0FBdEIsRUFBaUNDLEdBQUdiLElBQUgsQ0FBUTlHLEVBQVIsQ0FBakMsRUFBOEMsS0FBOUM7QUFDSDtBQUNKLEVBL0NhO0FBaURka0gsVUFqRGMscUJBaURIbEgsRUFqREcsRUFpRENnQixHQWpERCxFQWlETTtBQUNuQixNQUFJaUcsTUFBTWpILEVBQVY7QUFDR2dCLFFBQU1BLElBQUlHLEtBQUosQ0FBVSxHQUFWLENBQU47QUFDQUgsTUFBSWlCLE9BQUosQ0FBWSxVQUFDMkYsQ0FBRCxFQUFPO0FBQ2xCWCxTQUFNQSxJQUFJVyxDQUFKLENBQU47QUFDQSxHQUZEOztBQUlBLFNBQU9YLEdBQVA7QUFDSCxFQXpEYTtBQTJEZEksVUEzRGMscUJBMkRIckgsRUEzREcsRUEyRENnQixHQTNERCxFQTJETVYsS0EzRE4sRUEyRGE7QUFDMUIsTUFBSTJHLE1BQU1qSCxFQUFWO0FBQ0dnQixRQUFNQSxJQUFJRyxLQUFKLENBQVUsR0FBVixDQUFOO0FBQ0FILE1BQUlpQixPQUFKLENBQVksVUFBQzJGLENBQUQsRUFBSXZHLENBQUosRUFBVTtBQUNyQjtBQUNHLE9BQUlBLElBQUlMLElBQUlPLE1BQUosR0FBYSxDQUFyQixFQUF3QjtBQUNwQjBGLFVBQU1BLElBQUlXLENBQUosQ0FBTjtBQUNILElBRkQsTUFFTztBQUNIWCxRQUFJVyxDQUFKLElBQVN0SCxLQUFUO0FBQ0g7QUFDSixHQVBEO0FBUUg7QUF0RWEsQ0FBbEI7O0FBMEVBLElBQUlrSCxVQUFVO0FBQ2JLLFlBRGEsdUJBQ0FyQyxJQURBLEVBQ01sRixLQUROLEVBQ2E7QUFDekJrRixPQUFLQyxXQUFMLEdBQW1CLE9BQU9uRixLQUFQLElBQWdCLFdBQWhCLEdBQThCLEVBQTlCLEdBQW1DQSxLQUF0RDtBQUNBLEVBSFk7QUFLYndILFlBTGEsdUJBS0F0QyxJQUxBLEVBS01sRixLQUxOLEVBS2E7QUFDekJrRixPQUFLdUMsU0FBTCxHQUFpQixPQUFPekgsS0FBUCxJQUFnQixXQUFoQixHQUE4QixFQUE5QixHQUFtQ0EsS0FBcEQ7QUFDQSxFQVBZO0FBU2IwSCxhQVRhLHdCQVNDeEMsSUFURCxFQVNPbEYsS0FUUCxFQVNjbUgsUUFUZCxFQVN3QjtBQUNwQyxNQUFJbkYsWUFBWWtELEtBQUtsRCxTQUFyQjtBQUNNQSxjQUFZQSxVQUFVMkYsT0FBVixDQUFrQlIsUUFBbEIsRUFBNEIsRUFBNUIsRUFBZ0NRLE9BQWhDLENBQXdDLEtBQXhDLEVBQStDLEVBQS9DLENBQVo7O0FBRUEsTUFBSUMsUUFBUTVGLGFBQWE2RixPQUFPN0gsS0FBUCxDQUFiLEdBQTZCLEdBQTdCLEdBQW1DLEVBQS9DOztBQUVBa0YsT0FBS2xELFNBQUwsR0FBaUJBLFlBQVk0RixLQUFaLEdBQW9CNUgsS0FBckM7QUFDTixFQWhCWTtBQWtCYjhILGFBbEJhLHdCQWtCQzVDLElBbEJELEVBa0JPbEYsS0FsQlAsRUFrQmNtSCxRQWxCZCxFQWtCd0I7QUFDcENqQyxPQUFLbEYsS0FBTCxHQUFhLE9BQU9BLEtBQVAsSUFBZ0IsV0FBaEIsR0FBOEIsRUFBOUIsR0FBbUNBLEtBQWhEO0FBQ0E7QUFwQlksQ0FBZDs7a0JBdUJlbUUsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDOUlTNEQsTzs7QUE1Q3hCOzs7Ozs7OztBQUNBO0lBQ01DLFE7QUFDTCxzQkFBYWxHLElBQWIsRUFBbUI7QUFBQTs7QUFDbEIsYUFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0csYUFBS21HLElBQUwsQ0FBVW5HLElBQVY7QUFDSDs7Ozs2QkFFS0EsSSxFQUFNO0FBQUE7O0FBQ1hzQixtQkFBT0MsSUFBUCxDQUFZdkIsSUFBWixFQUFrQkgsT0FBbEIsQ0FBMEIsVUFBQzJCLEdBQUQsRUFBUztBQUNsQyxzQkFBSzRFLE9BQUwsQ0FBYTVFLEdBQWIsRUFBa0J4QixLQUFLd0IsR0FBTCxDQUFsQjtBQUNBLGFBRkQ7QUFHQTs7O2dDQUVRQSxHLEVBQUtxRCxHLEVBQUs7QUFDbEIsaUJBQUt3QixjQUFMLENBQW9CLEtBQUtyRyxJQUF6QixFQUErQndCLEdBQS9CLEVBQW9DcUQsR0FBcEM7QUFDQTs7O3VDQUVlN0UsSSxFQUFNd0IsRyxFQUFLcUQsRyxFQUFLO0FBQUEsdUJBQ0gsQ0FBQyxtQkFBRCxFQUFZb0IsUUFBUXBCLEdBQVIsQ0FBWixDQURHO0FBQUEsZ0JBQ3BCdEcsR0FEb0I7QUFBQSxnQkFDZitILFFBRGU7OztBQUd6QmhGLG1CQUFPVSxjQUFQLENBQXNCaEMsSUFBdEIsRUFBNEJ3QixHQUE1QixFQUFpQztBQUM3QlUsNEJBQVksSUFEaUIsRUFDWDtBQUNsQkQsOEJBQWMsS0FGZTtBQUc3QjlELHFCQUFLLGVBQVc7QUFDWix3QkFBSSxjQUFJUSxNQUFSLEVBQWdCO0FBQ1pKLDRCQUFJZ0ksTUFBSjtBQUNIO0FBQ0QsMkJBQU8xQixHQUFQO0FBQ0gsaUJBUjRCO0FBUzdCMUMscUJBQUssYUFBU0MsTUFBVCxFQUFpQjtBQUNsQix3QkFBSUEsV0FBV3lDLEdBQWYsRUFBb0I7QUFDaEI7QUFDSDtBQUNEQSwwQkFBTXpDLE1BQU47QUFDQTtBQUNBa0UsK0JBQVdMLFFBQVE3RCxNQUFSLENBQVg7QUFDQTtBQUNBN0Qsd0JBQUlpSSxNQUFKO0FBQ0g7QUFsQjRCLGFBQWpDO0FBb0JOOzs7Ozs7QUFHYSxTQUFTUCxPQUFULENBQWlCL0gsS0FBakIsRUFBd0JOLEVBQXhCLEVBQTRCO0FBQ3ZDLFFBQUksQ0FBQ00sS0FBRCxJQUFVLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBL0IsRUFBeUM7QUFDckM7QUFDSDs7QUFFRCxXQUFPLElBQUlnSSxRQUFKLENBQWFoSSxLQUFiLENBQVA7QUFDSCxFIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ODE3ZDJiYTNhZjQ4ZTk0OGY1OSIsImltcG9ydCBQdWIgZnJvbSAnLi9wdWInO1xuXG5jbGFzcyBXYXRjaGVyIHtcblx0Y29uc3RydWN0b3IgKHZtLCBleHBPckZuLCBjYikge1xuXHRcdHRoaXMuY2IgPSBjYjtcblx0ICAgIHRoaXMudm0gPSB2bTtcblx0ICAgIHRoaXMuZXhwT3JGbiA9IGV4cE9yRm47XG5cdCAgICB0aGlzLnB1YklkcyA9IHt9O1xuXG5cdCAgICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuZ2V0dGVyID0gdGhpcy5wYXJzZUdldHRlcihleHBPckZuKTtcblx0ICAgIH1cblxuXHQgICAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG5cdH1cblxuXHR1cGRhdGUgKCkge1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cblxuXHRydW4gKCkge1xuXHRcdHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWwpO1xuICAgICAgICB9XG5cdH1cblxuXHRhZGRQdWIgKHB1Yikge1xuXHRcdGlmICghdGhpcy5wdWJJZHMuaGFzT3duUHJvcGVydHkocHViLmlkKSkge1xuICAgICAgICAgICAgcHViLmFkZFN1Yih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucHViSWRzW3B1Yi5pZF0gPSBwdWI7XG4gICAgICAgIH1cblx0fVxuXG5cdGdldCAoKSB7XG5cdFx0UHViLnRhcmdldCA9IHRoaXM7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwodGhpcy52bSwgdGhpcy52bSk7XG4gICAgICAgIFB1Yi50YXJnZXQgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcblx0fVxuXG5cdHBhcnNlR2V0dGVyIChleHApIHtcblx0XHRpZiAoL1teXFx3LiRdLy50ZXN0KGV4cCkpIHJldHVybjsgXG5cbiAgICAgICAgdmFyIGV4cHMgPSBleHAuc3BsaXQoJy4nKTtcblxuICAgICAgICByZXR1cm4gKG9iaikgPT4ge1xuICAgICAgICBcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBleHBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHJldHVybjtcbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbZXhwc1tpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYXRjaGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXRjaGVyLmpzIiwibGV0IHVpZCA9IDA7XG5cbmNsYXNzIFB1YiB7XG5cdHN0YXRpYyB0YXJnZXQgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHR0aGlzLmlkID0gdWlkKys7XG4gICAgXHR0aGlzLnN1YnMgPSBbXTtcblx0fVxuXG5cdGFkZFN1YiAoc3ViKSB7XG5cdFx0dGhpcy5zdWJzLnB1c2goc3ViKTtcblx0fVxuXG5cdGRlcGVuZCAoKSB7XG5cdFx0UHViLnRhcmdldC5hZGRQdWIodGhpcyk7XG5cdH1cblxuXHRyZW1vdmVTdWIgKHN1Yikge1xuXHRcdGxldCBpbmRleCA9IHRoaXMuc3Vicy5pbmRleE9mKHN1Yik7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cblx0fVxuXG5cdG5vdGlmeSAoKSB7XG4gICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKHN1YiA9PiBzdWIudXBkYXRlKCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1YjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHViLmpzIiwiaW1wb3J0IE1WVk0gZnJvbSAnLi9tdnZtJztcblxubGV0IHZtID0gbmV3IE1WVk0oe1xuICAgIGVsOiAnI212dm0tYXBwJyxcbiAgICBkYXRhOiB7XG4gICAgICAgIHNvbWVTdHI6ICdoZWxsbyAnLFxuICAgICAgICBjbGFzc05hbWU6ICdidG4nLFxuICAgICAgICBodG1sU3RyOiAnPHNwYW4gc3R5bGU9XCJjb2xvcjogI2YwMDtcIj5yZWQ8L3NwYW4+JyxcbiAgICAgICAgY2hpbGQ6IHtcbiAgICAgICAgICAgIHNvbWVTdHI6ICdXb3JsZCAhJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGdldEhlbGxvV29yZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb21lU3RyICsgdGhpcy5jaGlsZC5zb21lU3RyO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgY2xpY2tCdG46IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciByYW5kb21TdHJBcnIgPSBbJ09uZScsICdUd28nLCAnVGhyZWUnXTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuc29tZVN0ciA9IHJhbmRvbVN0ckFycltwYXJzZUludChNYXRoLnJhbmRvbSgpICogMyldO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZtLiR3YXRjaCgnY2hpbGQuc29tZVN0cicsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLmpzIiwiaW1wb3J0IENvbXBpbGUgZnJvbSAnLi9jb21waWxlJztcbmltcG9ydCBPYnNlcnZlIGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi93YXRjaGVyJztcblxuY2xhc3MgTVZWTSB7XG5cdGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG5cdFx0dGhpcy4kb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdCAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGEgPSB0aGlzLiRvcHRpb25zLmRhdGE7XG5cblx0ICAgIC8vIOaVsOaNruS7o+eQhlxuXHQgICAgLy8g5a6e546wIHZtLnh4eCAtPiB2bS5fZGF0YS54eHhcblx0ICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuXHQgICAgXHR0aGlzLl9wcm94eURhdGEoa2V5KTtcblx0ICAgIH0pO1xuXG5cdCAgICB0aGlzLl9pbml0Q29tcHV0ZWQoKTtcblxuXHQgICAgT2JzZXJ2ZShkYXRhLCB0aGlzKTtcblxuXHQgICAgdGhpcy4kY29tcGlsZSA9IG5ldyBDb21waWxlKG9wdGlvbnMuZWwgfHwgZG9jdW1lbnQuYm9keSwgdGhpcylcblx0fVxuXG5cdCR3YXRjaCAoa2V5LCBjYikge1xuXHRcdG5ldyBXYXRjaGVyKHRoaXMsIGtleSwgY2IpO1xuXHR9XG5cblx0X3Byb3h5RGF0YSAoa2V5LCBzZXR0ZXIsIGdldHRlcikge1xuXHRcdGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0dGVyID0gc2V0dGVyIHx8IFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwga2V5LCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgXHRyZXR1cm4gc2VsZi5fZGF0YVtrZXldO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0IChuZXdWYWwpIHtcbiAgICAgICAgICAgIFx0c2VsZi5fZGF0YVtrZXldID0gbmV3VmFsO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcblx0fVxuXG5cdF9pbml0Q29tcHV0ZWQgKCkge1xuXHRcdGxldCBbc2VsZiwgY29tcHV0ZWRdID0gW3RoaXMsIHRoaXMuJG9wdGlvbnMuY29tcHV0ZWRdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29tcHV0ZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIFx0T2JqZWN0LmtleXMoY29tcHV0ZWQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IHR5cGVvZiBjb21wdXRlZFtrZXldID09PSAnZnVuY3Rpb24nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY29tcHV0ZWRba2V5XSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvbXB1dGVkW2tleV0uZ2V0LFxuICAgICAgICAgICAgICAgICAgICBzZXQgKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXHR9KTtcbiAgICAgICAgfVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1WVk07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL212dm0uanMiLCJpbXBvcnQgV2F0Y2hlciBmcm9tICcuL3dhdGNoZXInO1xuXG5jbGFzcyBDb21waWxlIHtcblx0Y29uc3RydWN0b3IgKGVsLCB2bSkge1xuXHRcdHRoaXMuJHZtID0gdm07XG4gICAgXHR0aGlzLiRlbCA9IHRoaXMuaXNFbGVtZW50Tm9kZShlbCkgPyBlbCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXG5cdCAgICBpZiAodGhpcy4kZWwpIHtcblx0ICAgICAgICB0aGlzLiRmcmFnbWVudCA9IHRoaXMubm9kZTJGcmFnbWVudCh0aGlzLiRlbCk7XG5cdCAgICAgICAgdGhpcy5pbml0KCk7XG5cdCAgICAgICAgdGhpcy4kZWwuYXBwZW5kQ2hpbGQodGhpcy4kZnJhZ21lbnQpO1xuXHQgICAgfVxuXHR9XG5cblx0bm9kZTJGcmFnbWVudCAoZWwpIHtcbiAgICAgICAgbGV0IFtmcmFnbWVudCwgY2hpbGRdID0gW2RvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKV07XG5cbiAgICAgICAgLy8g5bCG5Y6f55Sf6IqC54K55ou36LSd5YiwZnJhZ21lbnRcbiAgICAgICAgd2hpbGUgKGNoaWxkID0gZWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuXHR9XG5cblx0aW5pdCAoKSB7XG5cdFx0dGhpcy5jb21waWxlRWxlbWVudCh0aGlzLiRmcmFnbWVudCk7XG5cdH1cblxuXHRjb21waWxlRWxlbWVudCAoZWwpIHtcbiAgICAgICAgbGV0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuXG4gICAgICAgIFtdLnNsaWNlLmNhbGwoY2hpbGROb2RlcykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBcdGxldCBbdGV4dCwgcmVnXSA9IFtub2RlLnRleHRDb250ZW50LCAvXFx7XFx7KC4qKVxcfVxcfS9dO1xuXG4gICAgICAgIFx0aWYodGhpcy5pc0VsZW1lbnROb2RlKG5vZGUpKSB7XG4gICAgICAgIFx0XHR0aGlzLmNvbXBpbGUobm9kZSk7XG4gICAgICAgIFx0fWVsc2UgaWYgKHRoaXMuaXNUZXh0Tm9kZShub2RlKSAmJiByZWcudGVzdCh0ZXh0KSkge1xuICAgICAgICBcdFx0dGhpcy5jb21waWxlVGV4dChub2RlLCBSZWdFeHAuJDEpO1xuICAgICAgICBcdH1cblxuICAgICAgICBcdGlmIChub2RlLmNoaWxkTm9kZXMgJiYgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXHR9XG5cblx0Y29tcGlsZSAobm9kZSkge1xuXHRcdGxldCBub2RlQXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG5cblx0XHRbXS5zbGljZS5jYWxsKG5vZGVBdHRycykuZm9yRWFjaCgoYXR0cikgPT4ge1xuXHRcdFx0bGV0IGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXJlY3RpdmUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IFtleHAsIGRpcl0gPSBbYXR0ci52YWx1ZSwgYXR0ck5hbWUuc3Vic3RyaW5nKDIpXTtcbiAgICAgICAgICAgICAgICAvLyDkuovku7bmjIfku6RcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V2ZW50RGlyZWN0aXZlKGRpcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGlsZVV0aWwuZXZlbnRIYW5kbGVyKG5vZGUsIHRoaXMuJHZtLCBleHAsIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaZrumAmuaMh+S7pFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBpbGVVdGlsW2Rpcl0gJiYgY29tcGlsZVV0aWxbZGlyXShub2RlLCB0aGlzLiR2bSwgZXhwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG5cdFx0fSk7XG5cdH1cblxuXHRjb21waWxlVGV4dCAobm9kZSwgZXhwKSB7XG5cdFx0Y29tcGlsZVV0aWwudGV4dChub2RlLCB0aGlzLiR2bSwgZXhwKTtcblx0fVxuXG5cdGlzRGlyZWN0aXZlIChhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIuaW5kZXhPZigndi0nKSA9PSAwO1xuXHR9XG5cblx0aXNFdmVudERpcmVjdGl2ZSAoZGlyKSB7XG5cdFx0cmV0dXJuIGRpci5pbmRleE9mKCdvbicpID09PSAwO1xuXHR9XG5cblx0aXNFbGVtZW50Tm9kZSAobm9kZSkge1xuXHRcdHJldHVybiBub2RlLm5vZGVUeXBlID09IDE7XG5cdH1cblxuXHRpc1RleHROb2RlIChub2RlKSB7XG5cdFx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT0gMztcblx0fVxufVxuXG4vLyDmjIfku6TlpITnkIbpm4blkIhcbnZhciBjb21waWxlVXRpbCA9IHtcblx0dGV4dCAobm9kZSwgdm0sIGV4cCkge1xuXHRcdHRoaXMuYmluZChub2RlLCB2bSwgZXhwLCAndGV4dCcpO1xuXHR9LFxuXG5cdGh0bWwgKG5vZGUsIHZtLCBleHApIHtcblx0XHR0aGlzLmJpbmQobm9kZSwgdm0sIGV4cCwgJ2h0bWwnKTtcblx0fSxcblxuXHRtb2RlbCAobm9kZSwgdm0sIGV4cCkge1xuXHRcdHRoaXMuYmluZChub2RlLCB2bSwgZXhwLCAnbW9kZWwnKTtcblxuXHRcdGxldCB2YWwgPSB0aGlzLl9nZXRWTVZhbCh2bSwgZXhwKTtcblxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuXHRcdFx0bGV0IG5ld1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cblx0XHRcdGlmKHZhbCA9PT0gbmV3VmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9zZXRWTVZhbCh2bSwgZXhwLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB2YWwgPSBuZXdWYWx1ZTtcblx0XHR9KVxuXHR9LFxuXG5cdGNsYXNzIChub2RlLCB2bSwgZXhwKSB7XG5cdFx0dGhpcy5iaW5kKG5vZGUsIHZtLCBleHAsICdjbGFzcycpO1xuXHR9LFxuXG5cdGJpbmQgKG5vZGUsIHZtLCBleHAsIGRpcikge1xuXHRcdGxldCB1cGRhdGVyRm4gPSB1cGRhdGVyW2RpciArICdVcGRhdGVyJ107XG5cblx0XHR1cGRhdGVyRm4gJiYgdXBkYXRlckZuKG5vZGUsIHRoaXMuX2dldFZNVmFsKHZtLCBleHApKTtcblxuICAgICAgICBuZXcgV2F0Y2hlcih2bSwgZXhwLCBmdW5jdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXJGbiAmJiB1cGRhdGVyRm4obm9kZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cdH0sXG4gICAgXG4gICAgLy8g5LqL5Lu25aSE55CGXG4gICAgZXZlbnRIYW5kbGVyIChub2RlLCB2bSwgZXhwLCBkaXIpIHtcbiAgICAgICAgbGV0IFtldmVudFR5cGUsIGZuXSA9IFtkaXIuc3BsaXQoJzonKVsxXSwgdm0uJG9wdGlvbnMubWV0aG9kcyAmJiB2bS4kb3B0aW9ucy5tZXRob2RzW2V4cF1dO1xuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiYgZm4pIHtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZuLmJpbmQodm0pLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldFZNVmFsICh2bSwgZXhwKSB7XG4gICAgXHRsZXQgdmFsID0gdm07XG4gICAgICAgIGV4cCA9IGV4cC5zcGxpdCgnLicpO1xuICAgICAgICBleHAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICBcdHZhbCA9IHZhbFtrXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgX3NldFZNVmFsICh2bSwgZXhwLCB2YWx1ZSkge1xuICAgIFx0bGV0IHZhbCA9IHZtO1xuICAgICAgICBleHAgPSBleHAuc3BsaXQoJy4nKTtcbiAgICAgICAgZXhwLmZvckVhY2goKGssIGkpID0+IHtcbiAgICAgICAgXHQvLyDpnZ7mnIDlkI7kuIDkuKprZXnvvIzmm7TmlrB2YWznmoTlgLxcbiAgICAgICAgICAgIGlmIChpIDwgZXhwLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxba107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbFtrXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5cbnZhciB1cGRhdGVyID0ge1xuXHR0ZXh0VXBkYXRlciAobm9kZSwgdmFsdWUpIHtcblx0XHRub2RlLnRleHRDb250ZW50ID0gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gJycgOiB2YWx1ZTtcblx0fSxcblxuXHRodG1sVXBkYXRlciAobm9kZSwgdmFsdWUpIHtcblx0XHRub2RlLmlubmVySFRNTCA9IHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyA/ICcnIDogdmFsdWU7XG5cdH0sXG5cblx0Y2xhc3NVcGRhdGVyIChub2RlLCB2YWx1ZSwgb2xkVmFsdWUpIHtcblx0XHRsZXQgY2xhc3NOYW1lID0gbm9kZS5jbGFzc05hbWU7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKG9sZFZhbHVlLCAnJykucmVwbGFjZSgvXFxzJC8sICcnKTtcblxuICAgICAgICBsZXQgc3BhY2UgPSBjbGFzc05hbWUgJiYgU3RyaW5nKHZhbHVlKSA/ICcgJyA6ICcnO1xuXG4gICAgICAgIG5vZGUuY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgc3BhY2UgKyB2YWx1ZTtcblx0fSxcblxuXHRtb2RlbFVwZGF0ZXIgKG5vZGUsIHZhbHVlLCBvbGRWYWx1ZSkge1xuXHRcdG5vZGUudmFsdWUgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyAnJyA6IHZhbHVlO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21waWxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21waWxlLmpzIiwiaW1wb3J0IFB1YiBmcm9tICcuL3B1Yic7XG4vL+WKq+aMgeebkeWQrOaJgOacieWxnuaAp1xuY2xhc3MgT2JzZXJ2ZXIge1xuXHRjb25zdHJ1Y3RvciAoZGF0YSkge1xuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgXHR0aGlzLndhbGsoZGF0YSk7XG5cdH1cblxuXHR3YWxrIChkYXRhKSB7XG5cdFx0T2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHR0aGlzLmNvbnZlcnQoa2V5LCBkYXRhW2tleV0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y29udmVydCAoa2V5LCB2YWwpIHtcblx0XHR0aGlzLmRlZmluZVJlYWN0aXZlKHRoaXMuZGF0YSwga2V5LCB2YWwpO1xuXHR9XG5cblx0ZGVmaW5lUmVhY3RpdmUgKGRhdGEsIGtleSwgdmFsKSB7XG4gICAgICAgIGxldCBbcHViLCBjaGlsZE9ial0gPSBbbmV3IFB1YigpLCBvYnNlcnZlKHZhbCldO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkYXRhLCBrZXksIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsIC8vIOWPr+aemuS4vlxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKFB1Yi50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHViLmRlcGVuZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24obmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIC8vIOaWsOeahOWAvOaYr29iamVjdOeahOivne+8jOi/m+ihjOebkeWQrFxuICAgICAgICAgICAgICAgIGNoaWxkT2JqID0gb2JzZXJ2ZShuZXdWYWwpO1xuICAgICAgICAgICAgICAgIC8vIOmAmuefpeiuoumYheiAhVxuICAgICAgICAgICAgICAgIHB1Yi5ub3RpZnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2JzZXJ2ZSh2YWx1ZSwgdm0pIHtcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUpO1xufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb2JzZXJ2ZXIuanMiXSwic291cmNlUm9vdCI6IiJ9