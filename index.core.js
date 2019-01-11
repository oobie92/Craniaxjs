const DB = require('../VentaPaquetes/db.js');
const Menus = require('../VentaPaquetes/menus.js');
// const GlobalVaribles = require('../VentaPaquetes/global.varibles.js')


var Craniaxjs = function() {
  Core.call(this)
  Ivr.call(this)
},

Ivr = function() {
  this.menu = {}
  this.audios = {}
  this.backend = {}
  this.session = {}
  this.vxml = null
},

Menu = function() {
  this.vxml = "menu.vxml"
  this.name = !1
  this.state = !1
},

Audios = function() {
  this.vxml = "audio.vxml" 
  this.state = !1
},

Backend = function() {
  this.request = {}
  this.vxml = "backend.vxml"
  this.name = !1
  this.state = !1
},

Session = function() {
  this.reports = {} 
  this.details = {}
  this.logSession = new Log
},

Log = function() { 
  this.stacktrace = {}
  this.qttyErros = 0
},

Core = function() {
  this.__runtimeEngine__ = new __Engine__ 
  this.library = {}
},

__Engine__ = function() {
  this.callStack = [] 
  this.callbackQueue = []
  this.cache = {} 
  this.heap = null
};

Craniaxjs.prototype.createCraniaxjs = function() {
  var t = this.protoInherit(Craniaxjs, Core);
  return  t.menu = new Menu, 
          t.audios = new Audios, 
          t.backend = new Backend, 
          t.session = new Session, 
          t.memoryAllocation(t), 
          t
}

Craniaxjs.prototype.protoInherit = function(t, e) {
  if ("function" != typeof e || "function" != typeof t) throw new Error("Both args must be constructors");
  return  t.prototype = e.prototype, 
          t = new(t.prototype.constructor = t)
}

Log.prototype.createStackTrace = function(t, e){
  var stacktraceId = Date.now(),
      accusableModule = t.getActiveStructure();
  delete accusableModule.state
  this.qttyErros++
  this.stacktrace[stacktraceId] = e
  this.stacktrace[stacktraceId]["accusableModule"] = accusableModule
}

__Engine__.prototype.eventLoop = function() {
  var t = this.queue();

  if (0 < t.length) for (var e in t) this.callStack.push(t[e]);
  this.garbageCollector()
}

__Engine__.prototype.execStack = function() {
  var stack = this.stackFrames(),
      data = this.getCacheData(),
      heap = this.getHeap();

  if (stack.length < 1 && (this.eventLoop(), 0 < stack.length)) {
    for (var key in stack) {
        if (stack[key].constructor === Function) {
          try {
            var fn = stack[key];
                // fn.call(heap);
                // data = data ? eval(stack[key](data).call(heap, data))
                data = data ? eval(stack[key].call(heap, data))
                            : fn.call(heap),
                data && this.setCache(data);
              } catch (error) {
                heap.session.logSession.createStackTrace(this, error)
              }
            }
          }
        }
        this.garbageCollector()
}

__Engine__.prototype.queue = function() {
  return this.callbackQueue 
}

__Engine__.prototype.stackFrames = function() {
  return this.callStack
}

__Engine__.prototype.garbageCollector = function() {
  this.mark(), 
  this.sweep()
}

__Engine__.prototype.sweep = function() {
  var t, e;
  var n = this.queue(),
      i = this.stackFrames();

    i.__markBit__ ? t = "callStack" : n.__markBit__ && (t = "callbackQueue")
    i.__markBit__ ? e = i : n.__markBit__ && (e = n)
    this[t] = e.filter(function(t) {
      return 1 == t.__markBit__ && !(t.__markBit__ = 0)
    })
}

__Engine__.prototype.mark = function() {
  for (var  queue = this.queue(), 
            stack = this.stackFrames(), 
            n = [0 < queue.length ? queue : stack]; n.length;) {
    var i = n.pop();
    if (!i.__markBit__) for (var r in i.__markBit__ = 1, i) "object" == typeof i[r] && n.push(i[r])
  }
}

__Engine__.prototype.deepCompare = function() {
  var t, e, i, r;

  function s(t, e) {
    var n;
    if (isNaN(t) && isNaN(e) && "number" == typeof t && "number" == typeof e) return !0;
    if (t === e) return !0;
    if ("function" == typeof t && "function" == typeof e || t instanceof Date && e instanceof Date 
          || t instanceof RegExp && e instanceof RegExp || t instanceof String && e instanceof String 
          || t instanceof Number && e instanceof Number) return t.toString() === e.toString();
    if (!(t instanceof Object && e instanceof Object)) return !1;
    if (t.isPrototypeOf(e) || e.isPrototypeOf(t)) return !1;
    if (t.constructor !== e.constructor) return !1;
    if (t.prototype !== e.prototype) return !1;
    if (-1 < i.indexOf(t) || -1 < r.indexOf(e)) return !1;
    for (n in e) {
        if (e.hasOwnProperty(n) !== t.hasOwnProperty(n)) return !1;
        if (typeof e[n] != typeof t[n]) return !1
    }
    for (n in t) {
        if (e.hasOwnProperty(n) !== t.hasOwnProperty(n)) return !1;
        if (typeof e[n] != typeof t[n]) return !1;
        switch (typeof t[n]) {
            case "object":
              //Falls through
              case "function":
              if (i.push(t), r.push(e), !s(t[n], e[n])) return !1;
              i.pop(), r.pop();
              break;
              default:
              if (t[n] !== e[n]) return !1
              //Falls through
        }
    }
    return !0
  }
  if (arguments.length < 2) throw new Error("Need more than One arg to compare :S");
  for (t = 1, e = arguments.length; t < e; t++) {
    if (i = [], r = [], !s(arguments[0], arguments[t])) return !1;
  }
  return !0
}

__Engine__.prototype.setCacheData = function(t) {
  this.cache.data = t
}

__Engine__.prototype.getCacheData = function() {
  // var t = this.cache.data;
  return this.cache.data || !1
}

__Engine__.prototype.rmCacheData = function() {
  delete this.cache.data
}

__Engine__.prototype.setCacheRule = function(t) {
  this.cache.rule = t
}

__Engine__.prototype.getCacheRule = function() {
  return this.cache.rule
}

__Engine__.prototype.rmCacheRule = function() {
  delete this.cache.rule
}

__Engine__.prototype.setHeap = function(snapshot) {
  delete snapshot.__runtimeEngine__.heap, this.heap = snapshot
}

__Engine__.prototype.getHeap = function() {
  var snapshot = this.heap;
  return snapshot || !1
}

__Engine__.prototype.reCreateFn = function(t, e) {
  return e.prototype.craniaxjs = t
}

Core.prototype.test = function() {
  this.backend.request.wsResponse = ["globalPromo.wav", "SegmentPromo.wav"]
}

Core.prototype.validateHeap = function(snapshot) {
  return (new __Engine__).deepCompare(snapshot, this)
}

Core.prototype.getMemory = function() {
  return this.__runtimeEngine__.getHeap()
}

Core.prototype.memoryAllocation = function(snapshot) {
  this.__runtimeEngine__.setHeap(snapshot)
} 

Core.prototype.setCache = function(type, data) {
  var n = new RegExp(type, "i");
  return n.test("data") ? this.__runtimeEngine__.setCacheData(data) : n.test("rule") 
                        ? this.__runtimeEngine__.setCacheRule(data) : void 0
}

Core.prototype.getCache = function(type) {
  var e = new RegExp(type, "i");
  return e.test("data") ? this.__runtimeEngine__.getCacheData() : e.test("rule")
                        ? this.__runtimeEngine__.getCacheRule() : void 0
} 

Core.prototype.rmCache = function(type) {
  var e = new RegExp(type, "i");
  e.test("data") ? this.__runtimeEngine__.rmCacheData() 
                 : e.test("rule") && this.__runtimeEngine__.rmCacheRule()
}

Core.prototype.runEngine = function() {
  var t;
  this.__runtimeEngine__.execStack(), 
  new RegExp(this.getPath(), "i").test("backend.vxml") && 
            (t =  this.backend.getRequest(), 
                  this.prepareExecution(this.getResource(t.methodName, "backend")), 
                  this.rmCache("data"), 
                  this.getCache("rule") && this.setModule(cache))
}

Core.prototype.prepareExecution = function(t) {
  this.__runtimeEngine__.callbackQueue.push(t)
  this.memoryAllocation(this)
}

Core.prototype.run = function() {
  for (var t, e, n = new RegExp(this.getPath(), "i"); n.test("backend.vxml");) {
    t = this.backend.getWsResponse();
    e = this.getCache("data");
    this.test();
    (t || e) && this.runEngine(), n = new RegExp(this.getPath(), "i")
  }
}

Core.prototype.setRules = function(rules) {
  var e;
  if (typeof rules === "object") {
    for (var n in rules) {
      rules.hasOwnProperty(n) 
      && rules[n] 
      && (e ? this.setCache("rule", [n, rules[n]]) : this.setModule((e = [n, rules[n]])))
    }
  }
}

Core.prototype.setRequest = function(t) {
  this.backend.configRequest(t, this.session.getCaller())
}

Core.prototype.setInfoSession = function(t, e) {
  this.session.details[t] = e
}

Core.prototype.setSessionDetail = function(session) {
  this.session._setSessionDetail(session);
}

Core.prototype.setReport = function(route) {
  this.session._setReport(route);
}

Core.prototype.setMask = function(num) {
  this.session._setMask(num)
}

Core.prototype.loadDefaults = function() {
  var loadInit = this.getResource("init", "backend");
  this.session._setSessionDetail();

  // if (loadInit) loadInit.call(this) && loadInit();
  if (loadInit) this.setRules({ backend: "setSegmentCategory" });

  this.setCache("data", "PREP|TOP");
  this.run();
}

Core.prototype.exitHandler = function(){
  var activeModule = this.getActiveStructure();
  activeModule.state = false;
  if (activeModule.name) activeModule.name = false;
  if (activeModule.current) activeModule.current = {}
  else if (activeModule.request) activeModule.request = {}
  else delete activeModule.play || void 0;
  this.vxml = 'disconnect.vxml';
}

Core.prototype.updateStructure = function() {
  this.menu.state 
  ? (this.vxml = this.menu.vxml, 
     this.backend.request = {},
     this.backend.name = !1,
     delete this.audios.play) 
  : this.backend.state 
      ? (this.vxml = this.backend.vxml, 
         delete this.audios.play,
         this.menu.name = !1,
         delete this.menu.current) 
      : this.audios.state 
      && (this.vxml = this.audios.vxml, 
          this.backend.request = {}, 
          this.menu.name = !1,
          this.backend.name = !1,
          delete this.menu.current)
}

Core.prototype.getActiveStructure = function() {
  return  this.menu.state ? this.menu 
                          : this.backend.state ? this.backend 
                          : this.audios.state && this.audios
}

Core.prototype.createLibrary = function(libName, library) {
  try {
    this.library[libName] = new library
    // this.getMemory()
    // this.library[libName].prototype.heap = {}
    // this.library[libName].brind(this.library[libName] , this.getMemory())
    // this.library[libName].call(this.getMemory())
  } catch (err) {
    this.session.logSession.createStackTrace(this, err)
  }
}

Core.prototype.getResource = function(fn, libName) {
  try {
    return this.library[libName][fn]
  } catch (err) {
    this.session.logSession.createStackTrace(this, err)
    return a
  }
}

Core.prototype.mergeObjects = function() {
  var t = (new Core).initCore();
  for (var e in arguments) {
    var n = arguments[e],
        i = [];
    for (var r in n) n.hasOwnProperty(r) && i.push(r);
    for (var s in i) t[i[s]] = n[i[s]]
  }
  return t
}

Core.prototype.activeModule = function(t) {
  switch (t) {
    case "backend":
        this.backend.state = !0
        this.menu.state = !1
        this.audios.state = !1
        break;
    case "menu":
        this.menu.state = !0
        this.backend.state = !1
        this.audios.state = !1
        break;
    case "audios":
        this.audios.state = !0
        this.menu.state = !1
        this.backend.state = !1
  }
}

Core.prototype.updateModule = function() {
  rule = this.getCache("rule")
  rule && (this.setModule(rule), this.rmCache("rule"))
}

Core.prototype.getModule = function(decision) {
  var obj, key, res;
  var menuReg = /[\d#\\*]/i;
  for (key in 
        "number" == typeof decision 
        || menuReg.test(decision) ? obj = this.menu._getMenu() 
                                  : obj = decision, obj) {
    if (obj.hasOwnProperty(key) && -1 === ["audio", "config"].indexOf(key)) {
      if(-1 === ["next"].indexOf(key) && !res) {
        res = "number" == typeof decision 
                  || menuReg.test(decision)
                  ? (obj.opts[decision] ? obj.opts[decision].output = decision : void 0)
                  && this.getOpts(obj[key][decision])
                  : obj.constructor === Array ? obj : [key, obj[key]];
      } else if (0 === ["next"].indexOf(key) && obj[key][decision]) {
        this.setCache("rule", this.getOpts(obj[key][decision]));
      }
    } else if (0 === "config".indexOf(key) && obj.config.type === "input") {
      if (obj.config.min >= decision.length && obj.config.min <= decision.length) {
        res = this.getOpts(obj.opts);
        obj.opts["output"] = decision;
      } else {
        this.lengthHandler(obj.config.errPrompt);
        return void 0;
      }
    }
  }

  if (!res) return this.optsHandler();

  return res;
}

Core.prototype.getOpts = function(obj) {
  var reg = /(menu|input|backend|prompts)/i;
  var regType = /type/i;
  var regName = /name/i;
  var regRoute = /route/i;
  var t, n;

  if (typeof obj === 'object') {
    for (var key in obj) {
      if (reg.test(obj[key]) && regType.test(key)) {
        t = obj[key] == "input" ? "menu" : obj[key];
      } else if (regName.test(key)) {
        n = obj[key]
      } else if (regRoute.test(key)) {
        this.session._setReport(obj[key])
      }
     }
    return [t, n]
  } 
}

Core.prototype.lengthHandler = function (audio) {
  var name = this.menu._getMenusName();
  var tmp = this.menu._getMenu();
  if (tmp.config.counter) {
    tmp.config.counter--;
    this.setRules({
      prompt: audio,
      menu: name
    }); 
  } else {
    this.exitHandler();
  }
}

Core.prototype.optsHandler = function () {
  var tmp = this.getActiveStructure();
  var menu = this.menu._getMenu();
  if (menu.config.counter) menu.config.counter--;
  var rule = /.*(?=\.)/i;
  var err = new Error('Cannot find "' + decision + '" in ' + tmp.name || tmp.play || tmp.vxml + ' :S');
  this.session.logSession.createStackTrace(this, err);
  return [rule.exec(tmp.vxml)[0], tmp.name];
}

Core.prototype.getPath = function() {
  return this.vxml
}

Core.prototype.setModule = function(t) {
  var e = this.getModule(t) || ["exit", "break"];
  switch (e[0].toString().toLowerCase()) {
    case "menu":
    case "input":
    case "menus":
        if (new RegExp(e[1], "i").test("main")
            || new RegExp(e[1], "i").test("index")) {
          var s = this.identifyMain() 
          this.menu.setMenu(s)
        } else {
          e[0] = "menu"
          this.menu.setMenu(this.getResource(e[1], e[0]))
          this.menu.name = e[1]
        }
        this.activeModule("menu")
        this.updateStructure()
        break;
    case "backend":
    case "fn":
        e[0] = "backend"
        this.setRequest(e[1])
        this.prepareExecution(this.getResource(e[1], e[0]))
        this.backend.name = e[1]
        this.activeModule("backend")
        this.updateStructure();
        break;
    case "prompt":
    case "prompts":
    case "audios":
        this.audios.setAudios(e[1])
        this.activeModule("audios")
        this.updateStructure()
        break;
    // case "exit":
    // case "finish":
    //     this.audios.setAudios(e[1])
    //     this.activeModule("audios")
    //     this.updateStructure()
    //     break;
  }
}

Core.prototype.getMenu = function() {
  return this.menu._getMenu();
}

Core.prototype.getMenusName = function() {
  return this.menu._getMenusName();
}

Core.prototype.identifyMain = function() {
  return this.menu._identifyMain(this);
}

Menu.prototype._identifyMain = function(heap) {
  for (var key in heap.library.menu) {
    var getItem = heap.getResource(key, "menu");
    // console.log(`This the menu: ${key}`) /// remove for production!
    // console.log(getItem) /// remove for production!
    var menuType = getItem.config ? !getItem.config.type 
                                  ? false : getItem.config.type : false;
    var access = getItem.config ? getItem.config.accessType 
                                ? new RegExp(getItem.config.accessType, 'i') : false : false;
    var sessionDetails = heap.session.getSessionDetails();
    var sessionSegment = (sessionDetails.segment && sessionDetails.category) 
                          ? true : false;
                          
    if (sessionSegment) {
      var logic = access ? new RegExp("(" + sessionDetails.segment + "|" + sessionDetails.category + ")[^.?](" 
                                          + sessionDetails.category + "|" + sessionDetails.segment + ")" , 'i') 
                                      : false;
      // var a = new RegExp('(index|main)', 'i').test(menuType) /// remove for production!
      // var b = logic ? logic.test(access) : false
      if ((new RegExp('(index|main)', 'i').test(menuType)) && (logic.test(access))) {
        this.name = key
        return getItem;
      }
    }
  }
}

Menu.prototype.setMenu = function(menu) {
  this.current = menu
}

Menu.prototype._getMenu = function() {
  return this.current || void 0;
}

Menu.prototype._getMenusName = function() {
  return this.name || void 0;
}

Audios.prototype.setAudios = function(t) {
  this.play || (this.play = [])
  this.play.push(t)
}

Audios.prototype.getAudios = function() {
  return "../promptFiles/audio/" + this.play
}

Audios.prototype.setMenuAudio = function() {
  for (var t = [], e = 0; e < 10; e++) t.push("../promptFiles/audio/inactive.wav");
  if (1 < this.menu.current.audio.length) {
    for (var n in this.menu.current.audio) t[n] = "../promptFiles/audio/" + this.menu.current.audio[n];
    return t
  }
  return t[0] = "../promptFiles/audio/" + this.menu.current.audio, t
}

Backend.prototype.configRequest = function(methodName, value) {
  this.request.methodName = methodName
  this.request.parameterName = "ani"
  this.request.valueName = value
}

Backend.prototype.getWsResponse = function() {
  return this.request.wsResponse
}

Backend.prototype.getRequest = function() {
  return this.request
}

Session.prototype._setMask = function(t) {
  this.testCall ? this.details.mask = t : t && (this.testCall = !0)
}

Session.prototype.getDuration = function() {
  return (new Date).getMilliseconds()
}

Session.prototype.getDate = function() {
  var t = new Date;
  return t.getDate() 
         + "/" + (t.getMonth() + 1) 
         + "/" + t.getFullYear() 
         + " " + (t.getHours() < 10 ? "0" : "") + t.getHours() 
         + ":" + (t.getMinutes() < 10 ? "0" : "") + t.getMinutes() 
         + ":" + (t.getSeconds() < 10 ? "0" : "") + t.getSeconds()
}

Session.prototype.getSessionDetails = function() {
  return this.details
}

Session.prototype.getCaller = function() {
  return this.testCall && this.mask ? this.mask : this.details.caller
}

Session.prototype._setReport = function(route) {
  // var _rep = this.reports,
  var _this = this;
  if (!route) return this;
  if (route.constructor === Array) {
    for (var i in route) this._setReport(route[i]);
    return this
  }
  return this.reports = {
    route: function() {
            return this.route ? this.route + route + "|" 
                              : this.route = "" + (this.route ? this.route 
                                                              : this.route = "") + route + "|"
    }(),
    routeTime: function() {
            return this.routeTime ? this.routeTime + _this.getDuration() + "|" 
                                  : this.routeTime = "" + (this.routeTime ? this.routeTime 
                                                                          : this.routeTime = "") + _this.getDuration() + "|"
    }(),
    start: function() {
            return this.start ? this.start : this.start = "" 
                + (this.start ? this.start : this.start = "") + _this.getDate()
    }()
  }, this
}

Session.prototype._setSessionDetail = function(e) {
  e = e || { remote: { uri: "test+50244236394" },
              local: { uri: "test50244236394" },
        ccxml: { sessionid: "https://this-a-test.com" }
            }, 
  this.details = {
    caller: function() {
      try {
        var t = e;
        return t = t.remote.uri.substring(5), parseInt(t.split("@")[0])
      } catch (t) { 
        return t
        }
    }(),
    dialedNumber: function() {
      try {
        var t = e;
        return t = t.local.uri.substring(4), parseInt(t.split("@")[0])
      } catch (t) {
        return t
      }
    }(),
    serverIp: function() {
      try {
          return e.ccxml.sessionid.split("/")[2]
      } catch (t) {
          return t
      }
    }()
  }, this.validateSessionDetail()
}

Session.prototype.validateSessionDetail = function() {
  var t = this.details.caller.toString();
  8 < t.length && (this.details.caller = t.substring(3), 
                   this.details.prefix = t.substring(0, 3))
};


var craniaxjs = (new Craniaxjs).createCraniaxjs();
craniaxjs.createLibrary("backend", DB);
craniaxjs.createLibrary("menu", Menus);

// craniaxjs.menu._identifyMain(craniaxjs.getMemory())
craniaxjs.loadDefaults();
craniaxjs.setModule('123456');
var play = craniaxjs.audios.getAudios();
craniaxjs.updateModule();
craniaxjs.exitHandler();
craniaxjs.setModule('#');
craniaxjs.setModule('1');

var b = 1
// introspect(a)
