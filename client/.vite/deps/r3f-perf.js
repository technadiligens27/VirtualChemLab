import { r as __toESM, t as __commonJSMin } from "./chunk-B-1-B7_t.js";
import { n as preloadFont, r as _extends, t as Text$1 } from "./troika-three-text.esm-BczU4jAQ.js";
import { t as require_react } from "./react.js";
import { t as require_client } from "./client-SG0MEPYV.js";
import { Fs as Vector3, Kr as MathUtils, Pi as Object3D, Qt as DynamicDrawUsage, So as Scene, Zr as Mesh, ta as Points } from "./three.core-DVx0lc9k.js";
import { F as require_jsx_runtime, M as suspend, P as require_with_selector, a as addEffect, i as addAfterEffect, k as useThree, o as addTail, t as Canvas, w as useFrame } from "./react-three-fiber.esm-DjCFVs63.js";
//#region node_modules/r3f-perf/node_modules/zustand/esm/vanilla.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_with_selector = /* @__PURE__ */ __toESM(require_with_selector(), 1);
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => {
		if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
		listeners.clear();
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe,
		destroy
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
//#endregion
//#region node_modules/r3f-perf/node_modules/zustand/esm/traditional.mjs
var { useDebugValue } = import_react.default;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var identity = (arg) => arg;
function useStoreWithEqualityFn(api, selector = identity, equalityFn) {
	const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
	useDebugValue(slice);
	return slice;
}
var createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
	const api = createStore(createState);
	const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
	Object.assign(useBoundStoreWithEqualityFn, api);
	return useBoundStoreWithEqualityFn;
};
var createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
//#endregion
//#region node_modules/r3f-perf/node_modules/zustand/esm/shallow.mjs
function shallow$1(objA, objB) {
	if (Object.is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	if (objA instanceof Map && objB instanceof Map) {
		if (objA.size !== objB.size) return false;
		for (const [key, value] of objA) if (!Object.is(value, objB.get(key))) return false;
		return true;
	}
	if (objA instanceof Set && objB instanceof Set) {
		if (objA.size !== objB.size) return false;
		for (const value of objA) if (!objB.has(value)) return false;
		return true;
	}
	const keysA = Object.keys(objA);
	if (keysA.length !== Object.keys(objB).length) return false;
	for (const keyA of keysA) if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) return false;
	return true;
}
//#endregion
//#region node_modules/r3f-perf/dist/store.mjs
var setCustomData = (customData) => {
	setPerf({ customData });
};
var getCustomData = () => {
	return getPerf().customData;
};
var usePerfImpl = createWithEqualityFn((set, get) => {
	function getReport() {
		var _a;
		const { accumulated, startTime, infos } = get();
		const maxMemory = (_a = get().log) == null ? void 0 : _a.maxMemory;
		const { totalFrames, log, gl, max } = accumulated;
		const glAverage = {
			calls: gl.calls / totalFrames,
			triangles: gl.triangles / totalFrames,
			points: gl.points / totalFrames,
			lines: gl.lines / totalFrames
		};
		const logAverage = {
			gpu: log.gpu / totalFrames,
			cpu: log.cpu / totalFrames,
			mem: log.mem / totalFrames,
			fps: log.fps / totalFrames
		};
		return {
			sessionTime: (window.performance.now() - startTime) / 1e3,
			infos,
			log: logAverage,
			gl: glAverage,
			max,
			maxMemory,
			totalFrames
		};
	}
	return {
		log: null,
		paused: false,
		triggerProgramsUpdate: 0,
		startTime: 0,
		customData: 0,
		fpsLimit: 60,
		overclockingFps: false,
		accumulated: {
			totalFrames: 0,
			gl: {
				calls: 0,
				triangles: 0,
				points: 0,
				lines: 0,
				counts: 0
			},
			log: {
				gpu: 0,
				cpu: 0,
				mem: 0,
				fps: 0
			},
			max: {
				gl: {
					calls: 0,
					triangles: 0,
					points: 0,
					lines: 0,
					counts: 0
				},
				log: {
					gpu: 0,
					cpu: 0,
					mem: 0,
					fps: 0
				}
			}
		},
		chart: {
			data: {
				fps: [],
				cpu: [],
				gpu: [],
				mem: []
			},
			circularId: 0
		},
		gl: void 0,
		objectWithMaterials: null,
		scene: void 0,
		programs: /* @__PURE__ */ new Map(),
		sceneLength: void 0,
		tab: "infos",
		getReport
	};
});
var usePerf = (sel) => usePerfImpl(sel, shallow$1);
Object.assign(usePerf, usePerfImpl);
var { getState: getPerf, setState: setPerf } = usePerfImpl;
//#endregion
//#region node_modules/r3f-perf/dist/internal.mjs
var import_jsx_runtime = require_jsx_runtime();
var overLimitFps = {
	value: 0,
	fpsLimit: 60,
	isOverLimit: 0
};
var average = (arr) => (arr == null ? void 0 : arr.reduce((a, b) => a + b, 0)) / arr.length;
var GLPerf = class {
	constructor(settings = {}) {
		this.names = [""];
		this.finished = [];
		this.paused = false;
		this.overClock = false;
		this.queryHasResult = false;
		this.queryCreated = false;
		this.isWebGL2 = true;
		this.memAccums = [];
		this.gpuAccums = [];
		this.activeAccums = [];
		this.logsAccums = {
			mem: [],
			gpu: [],
			cpu: [],
			fps: [],
			fpsFixed: []
		};
		this.fpsChart = [];
		this.gpuChart = [];
		this.cpuChart = [];
		this.memChart = [];
		this.paramLogger = () => {};
		this.glFinish = () => {};
		this.chartLogger = () => {};
		this.chartLen = 60;
		this.logsPerSecond = 10;
		this.maxMemory = 1500;
		this.chartHz = 10;
		this.startCpuProfiling = false;
		this.lastCalculateFixed = 0;
		this.chartFrame = 0;
		this.gpuTimeProcess = 0;
		this.chartTime = 0;
		this.activeQueries = 0;
		this.circularId = 0;
		this.detected = 0;
		this.frameId = 0;
		this.rafId = 0;
		this.idleCbId = 0;
		this.checkQueryId = 0;
		this.uuid = void 0;
		this.currentCpu = 0;
		this.currentMem = 0;
		this.paramFrame = 0;
		this.paramTime = 0;
		this.now = () => {};
		this.t0 = 0;
		window.GLPerf = window.GLPerf || {};
		Object.assign(this, settings);
		this.fpsChart = new Array(this.chartLen).fill(0);
		this.gpuChart = new Array(this.chartLen).fill(0);
		this.cpuChart = new Array(this.chartLen).fill(0);
		this.memChart = new Array(this.chartLen).fill(0);
		this.now = () => window.performance && window.performance.now ? window.performance.now() : Date.now();
		this.initGpu();
		this.is120hz();
	}
	initGpu() {
		this.uuid = MathUtils.generateUUID();
		if (this.gl) {
			this.isWebGL2 = true;
			if (!this.extension) this.extension = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
			if (this.extension === null) this.isWebGL2 = false;
		}
	}
	/**
	* 120hz device detection
	*/
	is120hz() {
		let n = 0;
		const loop = (t) => {
			if (++n < 20) this.rafId = window.requestAnimationFrame(loop);
			else {
				this.detected = Math.ceil(1e3 * n / (t - this.t0) / 70);
				window.cancelAnimationFrame(this.rafId);
			}
			if (!this.t0) this.t0 = t;
		};
		this.rafId = window.requestAnimationFrame(loop);
	}
	/**
	* Explicit UI add
	* @param { string | undefined } name
	*/
	addUI(name) {
		if (this.names.indexOf(name) === -1) {
			this.names.push(name);
			this.gpuAccums.push(0);
			this.activeAccums.push(false);
		}
	}
	nextFps(d) {
		const goal = 1e3 / 60;
		const elapsed = goal - d.timeRemaining();
		const fps = goal * overLimitFps.fpsLimit / 10 / elapsed;
		if (fps < 0) return;
		overLimitFps.value = fps;
		if (overLimitFps.isOverLimit < 25) overLimitFps.isOverLimit++;
		else setPerf({ overclockingFps: true });
	}
	/**
	* Increase frameID
	* @param { any | undefined } now
	*/
	nextFrame(now) {
		this.frameId++;
		const t = now || this.now();
		let duration = t - this.paramTime;
		let gpu = 0;
		if (this.frameId <= 1) {
			this.paramFrame = this.frameId;
			this.paramTime = t;
		} else if (t >= this.paramTime) {
			this.maxMemory = window.performance.memory ? window.performance.memory.jsHeapSizeLimit / 1048576 : 0;
			const frameCount = this.frameId - this.paramFrame;
			const fpsFixed = frameCount * 1e3 / duration;
			const fps = getPerf().overclockingFps ? overLimitFps.value : fpsFixed;
			gpu = this.isWebGL2 ? this.gpuAccums[0] : this.gpuAccums[0] / duration;
			if (this.isWebGL2) this.gpuAccums[0] = 0;
			else Promise.all(this.finished).then(() => {
				this.gpuAccums[0] = 0;
				this.finished = [];
			});
			this.currentMem = Math.round(window.performance && window.performance.memory ? window.performance.memory.usedJSHeapSize / 1048576 : 0);
			if (window.performance && this.startCpuProfiling) {
				window.performance.mark("cpu-finished");
				const cpuMeasure = performance.measure("cpu-duration", "cpu-started", "cpu-finished");
				this.currentCpu = (cpuMeasure == null ? void 0 : cpuMeasure.duration) || 0;
				this.logsAccums.cpu.push(this.currentCpu);
				this.startCpuProfiling = false;
			}
			this.logsAccums.mem.push(this.currentMem);
			this.logsAccums.fpsFixed.push(fpsFixed);
			this.logsAccums.fps.push(fps);
			this.logsAccums.gpu.push(gpu);
			if (this.overClock && typeof window.requestIdleCallback !== "undefined") {
				if (overLimitFps.isOverLimit > 0 && fps > fpsFixed) overLimitFps.isOverLimit--;
				else if (getPerf().overclockingFps) setPerf({ overclockingFps: false });
			}
			if (t >= this.paramTime + 1e3 / this.logsPerSecond) {
				this.paramLogger({
					cpu: average(this.logsAccums.cpu),
					gpu: average(this.logsAccums.gpu),
					mem: average(this.logsAccums.mem),
					fps: average(this.logsAccums.fps),
					duration: Math.round(duration),
					maxMemory: this.maxMemory,
					frameCount
				});
				this.logsAccums.mem = [];
				this.logsAccums.fps = [];
				this.logsAccums.gpu = [];
				this.logsAccums.cpu = [];
				this.paramFrame = this.frameId;
				this.paramTime = t;
			}
			if (this.overClock) {
				if (t - this.lastCalculateFixed >= 2 * 1e3) {
					this.lastCalculateFixed = now;
					overLimitFps.fpsLimit = Math.round(average(this.logsAccums.fpsFixed) / 10) * 100;
					setPerf({ fpsLimit: overLimitFps.fpsLimit / 10 });
					this.logsAccums.fpsFixed = [];
					this.paramFrame = this.frameId;
					this.paramTime = t;
				}
			}
		}
		if (!this.detected || !this.chartFrame) {
			this.chartFrame = this.frameId;
			this.chartTime = t;
			this.circularId = 0;
		} else {
			const timespan = t - this.chartTime;
			let hz = this.chartHz * timespan / 1e3;
			while (--hz > 0 && this.detected) {
				const fpsFixed = (this.frameId - this.chartFrame) / timespan * 1e3;
				const fps = getPerf().overclockingFps ? overLimitFps.value : fpsFixed;
				this.fpsChart[this.circularId % this.chartLen] = fps;
				const memS = 1e3 / this.currentMem;
				const cpuS = this.currentCpu;
				const gpuS = (this.isWebGL2 ? this.gpuAccums[1] * 2 : Math.round(this.gpuAccums[1] / duration * 100)) + 4;
				if (gpuS > 0) this.gpuChart[this.circularId % this.chartLen] = gpuS;
				if (cpuS > 0) this.cpuChart[this.circularId % this.chartLen] = cpuS;
				if (memS > 0) this.memChart[this.circularId % this.chartLen] = memS;
				for (let i = 0; i < this.names.length; i++) this.chartLogger({
					i,
					data: {
						fps: this.fpsChart,
						gpu: this.gpuChart,
						cpu: this.cpuChart,
						mem: this.memChart
					},
					circularId: this.circularId
				});
				this.circularId++;
				this.chartFrame = this.frameId;
				this.chartTime = t;
			}
		}
	}
	startGpu() {
		const gl = this.gl;
		const ext = this.extension;
		if (!gl || !ext) return;
		if (this.isWebGL2) {
			let available = false;
			let disjoint, ns;
			if (this.query) {
				this.queryHasResult = false;
				let query = this.query;
				available = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE);
				disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);
				if (available && !disjoint) {
					ns = gl.getQueryParameter(this.query, gl.QUERY_RESULT);
					const ms = ns * 1e-6;
					if (available || disjoint) {
						gl.deleteQuery(this.query);
						query = null;
					}
					if (available && ms > 0) {
						if (!disjoint) this.activeAccums.forEach((_active, i) => {
							this.gpuAccums[i] = ms;
						});
					}
				}
			}
			if (available || !this.query) {
				this.queryCreated = true;
				this.query = gl.createQuery();
				gl.beginQuery(ext.TIME_ELAPSED_EXT, this.query);
			}
		}
	}
	endGpu() {
		const ext = this.extension;
		const gl = this.gl;
		if (this.isWebGL2 && this.queryCreated && gl.getQuery(ext.TIME_ELAPSED_EXT, gl.CURRENT_QUERY)) gl.endQuery(ext.TIME_ELAPSED_EXT);
	}
	/**
	* Begin named measurement
	* @param { string | undefined } name
	*/
	begin(name) {
		this.startGpu();
		this.updateAccums(name);
	}
	/**
	* End named measure
	* @param { string | undefined } name
	*/
	end(name) {
		this.endGpu();
		this.updateAccums(name);
	}
	updateAccums(name) {
		let nameId = this.names.indexOf(name);
		if (nameId === -1) {
			nameId = this.names.length;
			this.addUI(name);
		}
		const t = this.now();
		this.activeAccums[nameId] = !this.activeAccums[nameId];
		this.t0 = t;
	}
};
//#endregion
//#region node_modules/r3f-perf/dist/helpers/countGeoDrawCalls.mjs
var countGeoDrawCalls = (programs) => {
	programs.forEach((program, _pkey) => {
		const { meshes } = program;
		if (!meshes) return;
		let drawCounts = {
			total: 0,
			type: "Triangle",
			data: []
		};
		Object.keys(meshes).forEach((key) => {
			const mesh = meshes[key];
			const { geometry, material } = mesh;
			let index = geometry.index;
			const position = geometry.attributes.position;
			if (!position) return;
			let rangeFactor = 1;
			if (material.wireframe === true) rangeFactor = 0;
			const dataCount = index !== null ? index.count : position.count;
			const rangeStart = geometry.drawRange.start * rangeFactor;
			const rangeCount = geometry.drawRange.count * rangeFactor;
			const drawStart = rangeStart;
			const drawEnd = Math.min(dataCount, rangeStart + rangeCount) - 1;
			let countInstanceRatio = 1;
			const instanceCount = mesh.count || 1;
			let type = "Triangle";
			let mostDrawCalls = 0;
			if (mesh.isMesh) if (material.wireframe === true) {
				type = "Line";
				countInstanceRatio = countInstanceRatio / 2;
			} else {
				type = "Triangle";
				countInstanceRatio = countInstanceRatio / 3;
			}
			else if (mesh.isLine) {
				type = "Line";
				if (mesh.isLineSegments) countInstanceRatio = countInstanceRatio / 2;
				else if (mesh.isLineLoop) countInstanceRatio = countInstanceRatio;
				else countInstanceRatio = countInstanceRatio - 1;
			} else if (mesh.isPoints) {
				type = "Point";
				countInstanceRatio = countInstanceRatio;
			} else if (mesh.isSprite) {
				type = "Triangle";
				countInstanceRatio = countInstanceRatio / 3;
			}
			const drawCount = Math.round(Math.max(0, drawEnd - drawStart + 1) * (countInstanceRatio * instanceCount));
			if (drawCount > mostDrawCalls) {
				mostDrawCalls = drawCount;
				drawCounts.type = type;
			}
			drawCounts.total += drawCount;
			drawCounts.data.push({
				drawCount,
				type
			});
			mesh.userData.drawCount = {
				type,
				count: drawCount
			};
		});
		program.drawCounts = drawCounts;
	});
};
var eventEmitter = /* @__PURE__ */ new (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = Object.prototype.hasOwnProperty, prefix = "~";
	/**
	* Constructor to create a storage for our `EE` objects.
	* An `Events` instance is a plain object whose properties are event names.
	*
	* @constructor
	* @private
	*/
	function Events() {}
	if (Object.create) {
		Events.prototype = Object.create(null);
		if (!new Events().__proto__) prefix = false;
	}
	/**
	* Representation of a single event listener.
	*
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	* @constructor
	* @private
	*/
	function EE(fn, context, once) {
		this.fn = fn;
		this.context = context;
		this.once = once || false;
	}
	/**
	* Add a listener for a given event.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} once Specify if the listener is a one-time listener.
	* @returns {EventEmitter}
	* @private
	*/
	function addListener(emitter, event, fn, context, once) {
		if (typeof fn !== "function") throw new TypeError("The listener must be a function");
		var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
		if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		else emitter._events[evt] = [emitter._events[evt], listener];
		return emitter;
	}
	/**
	* Clear event by name.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} evt The Event name.
	* @private
	*/
	function clearEvent(emitter, evt) {
		if (--emitter._eventsCount === 0) emitter._events = new Events();
		else delete emitter._events[evt];
	}
	/**
	* Minimal `EventEmitter` interface that is molded against the Node.js
	* `EventEmitter` interface.
	*
	* @constructor
	* @public
	*/
	function EventEmitter() {
		this._events = new Events();
		this._eventsCount = 0;
	}
	/**
	* Return an array listing the events for which the emitter has registered
	* listeners.
	*
	* @returns {Array}
	* @public
	*/
	EventEmitter.prototype.eventNames = function eventNames() {
		var names = [], events, name;
		if (this._eventsCount === 0) return names;
		for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
		return names;
	};
	/**
	* Return the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Array} The registered listeners.
	* @public
	*/
	EventEmitter.prototype.listeners = function listeners(event) {
		var evt = prefix ? prefix + event : event, handlers = this._events[evt];
		if (!handlers) return [];
		if (handlers.fn) return [handlers.fn];
		for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
		return ee;
	};
	/**
	* Return the number of listeners listening to a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Number} The number of listeners.
	* @public
	*/
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
		var evt = prefix ? prefix + event : event, listeners = this._events[evt];
		if (!listeners) return 0;
		if (listeners.fn) return 1;
		return listeners.length;
	};
	/**
	* Calls each of the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Boolean} `true` if the event had listeners, else `false`.
	* @public
	*/
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return false;
		var listeners = this._events[evt], len = arguments.length, args, i;
		if (listeners.fn) {
			if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
			switch (len) {
				case 1: return listeners.fn.call(listeners.context), true;
				case 2: return listeners.fn.call(listeners.context, a1), true;
				case 3: return listeners.fn.call(listeners.context, a1, a2), true;
				case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
				case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
				case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			}
			for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
			listeners.fn.apply(listeners.context, args);
		} else {
			var length = listeners.length, j;
			for (i = 0; i < length; i++) {
				if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
				switch (len) {
					case 1:
						listeners[i].fn.call(listeners[i].context);
						break;
					case 2:
						listeners[i].fn.call(listeners[i].context, a1);
						break;
					case 3:
						listeners[i].fn.call(listeners[i].context, a1, a2);
						break;
					case 4:
						listeners[i].fn.call(listeners[i].context, a1, a2, a3);
						break;
					default:
						if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
						listeners[i].fn.apply(listeners[i].context, args);
				}
			}
		}
		return true;
	};
	/**
	* Add a listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.on = function on(event, fn, context) {
		return addListener(this, event, fn, context, false);
	};
	/**
	* Add a one-time listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.once = function once(event, fn, context) {
		return addListener(this, event, fn, context, true);
	};
	/**
	* Remove the listeners of a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn Only remove the listeners that match this function.
	* @param {*} context Only remove the listeners that have this context.
	* @param {Boolean} once Only remove one-time listeners.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return this;
		if (!fn) {
			clearEvent(this, evt);
			return this;
		}
		var listeners = this._events[evt];
		if (listeners.fn) {
			if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
		} else {
			for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
			if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
			else clearEvent(this, evt);
		}
		return this;
	};
	/**
	* Remove all listeners, or those of the specified event.
	*
	* @param {(String|Symbol)} [event] The event name.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		var evt;
		if (event) {
			evt = prefix ? prefix + event : event;
			if (this._events[evt]) clearEvent(this, evt);
		} else {
			this._events = new Events();
			this._eventsCount = 0;
		}
		return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	if ("undefined" !== typeof module) module.exports = EventEmitter;
})))(), 1)).default();
function onEvent(eventName, handler, options) {
	return (options == null ? void 0 : options.once) ? eventEmitter.once(eventName, handler) : eventEmitter.on(eventName, handler);
}
function offEvent(eventName, handler, options) {
	var _a;
	eventEmitter.removeListener(eventName, handler, (_a = options == null ? void 0 : options.context) != null ? _a : null, options == null ? void 0 : options.once);
}
function emitEvent(eventName, payload) {
	eventEmitter.emit(eventName, payload);
}
//#endregion
//#region node_modules/@utsubo/events/dist/react.mjs
function useEvent(eventName, handler, deps = [], options) {
	const handlerRef = (0, import_react.useRef)(handler);
	(0, import_react.useEffect)(() => void (handlerRef.current = handler), [handler]);
	(0, import_react.useEffect)(() => {
		const handler2 = (event) => {
			var _a;
			return (_a = handlerRef.current) == null ? void 0 : _a.call(handlerRef, event);
		};
		const context = onEvent(eventName, handler2, options);
		return () => offEvent(eventName, handler2, {
			...options,
			context
		});
	}, [
		eventName,
		options == null ? void 0 : options.once,
		...deps
	]);
}
//#endregion
//#region node_modules/r3f-perf/dist/components/PerfHeadless.mjs
var updateMatrixWorldTemp = Object3D.prototype.updateMatrixWorld;
var updateWorldMatrixTemp = Object3D.prototype.updateWorldMatrix;
var updateMatrixTemp = Object3D.prototype.updateMatrix;
var maxGl = [
	"calls",
	"triangles",
	"points",
	"lines"
];
var maxLog = [
	"gpu",
	"cpu",
	"mem",
	"fps"
];
var matriceWorldCount = { value: 0 };
var matriceCount = { value: 0 };
var isUUID = (uuid) => {
	let s = "" + uuid;
	s = s.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
	if (s === null) return false;
	return true;
};
var addMuiPerfID = (material, currentObjectWithMaterials) => {
	if (!material.defines) material.defines = {};
	if (material.defines && !material.defines.muiPerf) material.defines = Object.assign(material.defines || {}, { muiPerf: material.uuid });
	const uuid = material.uuid;
	if (!currentObjectWithMaterials[uuid]) {
		currentObjectWithMaterials[uuid] = {
			meshes: {},
			material
		};
		material.needsUpdate = true;
	}
	material.needsUpdate = false;
	return uuid;
};
var getMUIIndex = (muid) => muid === "muiPerf";
var PerfHeadless = ({ overClock, logsPerSecond, chart, deepAnalyze, matrixUpdate }) => {
	const { gl, scene } = useThree();
	setPerf({
		gl,
		scene
	});
	const PerfLib = (0, import_react.useMemo)(() => {
		const PerfLib2 = new GLPerf({
			trackGPU: true,
			overClock,
			chartLen: chart ? chart.length : 120,
			chartHz: chart ? chart.hz : 60,
			logsPerSecond: logsPerSecond || 10,
			gl: gl.getContext(),
			chartLogger: (chart2) => {
				setPerf({ chart: chart2 });
			},
			paramLogger: (logger) => {
				const log = {
					maxMemory: logger.maxMemory,
					gpu: logger.gpu,
					cpu: logger.cpu,
					mem: logger.mem,
					fps: logger.fps,
					totalTime: logger.duration,
					frameCount: logger.frameCount
				};
				setPerf({ log });
				const { accumulated } = getPerf();
				const glRender = gl.info.render;
				accumulated.totalFrames++;
				accumulated.gl.calls += glRender.calls;
				accumulated.gl.triangles += glRender.triangles;
				accumulated.gl.points += glRender.points;
				accumulated.gl.lines += glRender.lines;
				accumulated.log.gpu += logger.gpu;
				accumulated.log.cpu += logger.cpu;
				accumulated.log.mem += logger.mem;
				accumulated.log.fps += logger.fps;
				for (let i = 0; i < maxGl.length; i++) {
					const key = maxGl[i];
					const value = glRender[key];
					if (value > accumulated.max.gl[key]) accumulated.max.gl[key] = value;
				}
				for (let i = 0; i < maxLog.length; i++) {
					const key = maxLog[i];
					const value = logger[key];
					if (value > accumulated.max.log[key]) accumulated.max.log[key] = value;
				}
				setPerf({ accumulated });
				emitEvent("log", [log, gl]);
			}
		});
		const ctx = gl.getContext();
		let glRenderer = null;
		let glVendor = null;
		const rendererInfo = ctx.getExtension("WEBGL_debug_renderer_info");
		const glVersion = ctx.getParameter(ctx.VERSION);
		if (rendererInfo != null) {
			glRenderer = ctx.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL);
			glVendor = ctx.getParameter(rendererInfo.UNMASKED_VENDOR_WEBGL);
		}
		if (!glVendor) glVendor = "Unknown vendor";
		if (!glRenderer) glRenderer = ctx.getParameter(ctx.RENDERER);
		setPerf({
			startTime: window.performance.now(),
			infos: {
				version: glVersion,
				renderer: glRenderer,
				vendor: glVendor
			}
		});
		const callbacks = /* @__PURE__ */ new Map();
		const callbacksAfter = /* @__PURE__ */ new Map();
		Object.defineProperty(Scene.prototype, "onBeforeRender", {
			get() {
				return (...args) => {
					var _a;
					if (PerfLib2) PerfLib2.begin("profiler");
					(_a = callbacks.get(this)) == null || _a(...args);
				};
			},
			set(callback) {
				callbacks.set(this, callback);
			},
			configurable: true
		});
		Object.defineProperty(Scene.prototype, "onAfterRender", {
			get() {
				return (...args) => {
					var _a;
					if (PerfLib2) PerfLib2.end("profiler");
					(_a = callbacksAfter.get(this)) == null || _a(...args);
				};
			},
			set(callback) {
				callbacksAfter.set(this, callback);
			},
			configurable: true
		});
		return PerfLib2;
	}, []);
	(0, import_react.useEffect)(() => {
		if (PerfLib) {
			PerfLib.overClock = overClock || false;
			if (overClock === false) {
				setPerf({ overclockingFps: false });
				overLimitFps.value = 0;
				overLimitFps.isOverLimit = 0;
			}
			PerfLib.chartHz = (chart == null ? void 0 : chart.hz) || 60;
			PerfLib.chartLen = (chart == null ? void 0 : chart.length) || 120;
		}
	}, [
		overClock,
		PerfLib,
		chart == null ? void 0 : chart.length,
		chart == null ? void 0 : chart.hz
	]);
	(0, import_react.useEffect)(() => {
		if (matrixUpdate) {
			Object3D.prototype.updateMatrixWorld = function() {
				if (this.matrixWorldNeedsUpdate || arguments[0]) matriceWorldCount.value++;
				updateMatrixWorldTemp.apply(this, arguments);
			};
			Object3D.prototype.updateWorldMatrix = function() {
				matriceWorldCount.value++;
				updateWorldMatrixTemp.apply(this, arguments);
			};
			Object3D.prototype.updateMatrix = function() {
				matriceCount.value++;
				updateMatrixTemp.apply(this, arguments);
			};
		}
		gl.info.autoReset = false;
		let effectSub = null;
		let afterEffectSub = null;
		if (!gl.info) return;
		effectSub = addEffect(function preRafR3FPerf() {
			if (getPerf().paused) setPerf({ paused: false });
			if (window.performance) {
				window.performance.mark("cpu-started");
				PerfLib.startCpuProfiling = true;
			}
			matriceCount.value -= 1;
			matriceWorldCount.value = 0;
			matriceCount.value = 0;
			if (gl.info) gl.info.reset();
		});
		afterEffectSub = addAfterEffect(function postRafR3FPerf() {
			var _a, _b;
			if (PerfLib && !PerfLib.paused) {
				PerfLib.nextFrame(window.performance.now());
				if (overClock && typeof window.requestIdleCallback !== "undefined") PerfLib.idleCbId = requestIdleCallback(PerfLib.nextFps);
			}
			if (deepAnalyze) {
				const currentObjectWithMaterials = {};
				const programs = /* @__PURE__ */ new Map();
				scene.traverse(function deepAnalyzeR3FPerf(object) {
					if (object instanceof Mesh || object instanceof Points) {
						if (object.material) {
							let uuid = object.material.uuid;
							if (Array.isArray(object.material) && object.material.length > 1) uuid = addMuiPerfID(object.material[1], currentObjectWithMaterials);
							else uuid = addMuiPerfID(object.material, currentObjectWithMaterials);
							currentObjectWithMaterials[uuid].meshes[object.uuid] = object;
						}
					}
				});
				(_b = (_a = gl == null ? void 0 : gl.info) == null ? void 0 : _a.programs) == null || _b.forEach((program) => {
					const cacheKeySplited = program.cacheKey.split(",");
					const muiPerfTracker = cacheKeySplited[cacheKeySplited.findIndex(getMUIIndex) + 1];
					if (isUUID(muiPerfTracker) && currentObjectWithMaterials[muiPerfTracker]) {
						const { material, meshes } = currentObjectWithMaterials[muiPerfTracker];
						programs.set(muiPerfTracker, {
							program,
							material,
							meshes,
							drawCounts: {
								total: 0,
								type: "triangle",
								data: []
							},
							expand: false,
							visible: true
						});
					}
				});
				if (programs.size !== getPerf().programs.size) {
					countGeoDrawCalls(programs);
					setPerf({
						programs,
						triggerProgramsUpdate: getPerf().triggerProgramsUpdate++
					});
				}
			}
		});
		return () => {
			if (PerfLib) {
				if (typeof window.cancelIdleCallback !== "undefined") window.cancelIdleCallback(PerfLib.idleCbId);
				window.cancelAnimationFrame(PerfLib.rafId);
				window.cancelAnimationFrame(PerfLib.checkQueryId);
			}
			if (matrixUpdate) Object3D.prototype.updateMatrixWorld = updateMatrixTemp;
			effectSub();
			afterEffectSub();
		};
	}, [
		PerfLib,
		gl,
		chart,
		matrixUpdate
	]);
	(0, import_react.useEffect)(() => {
		const unsub = addTail(function postRafTailR3FPerf() {
			if (PerfLib) {
				PerfLib.paused = true;
				matriceCount.value = 0;
				matriceWorldCount.value = 0;
				setPerf({
					paused: true,
					log: {
						maxMemory: 0,
						gpu: 0,
						mem: 0,
						cpu: 0,
						fps: 0,
						totalTime: 0,
						frameCount: 0
					}
				});
			}
			return false;
		});
		return () => {
			unsub();
		};
	}, []);
	return null;
};
//#endregion
//#region node_modules/@stitches/react/dist/index.mjs
var e = "colors", t = "sizes", r = "space", n = {
	gap: r,
	gridGap: r,
	columnGap: r,
	gridColumnGap: r,
	rowGap: r,
	gridRowGap: r,
	inset: r,
	insetBlock: r,
	insetBlockEnd: r,
	insetBlockStart: r,
	insetInline: r,
	insetInlineEnd: r,
	insetInlineStart: r,
	margin: r,
	marginTop: r,
	marginRight: r,
	marginBottom: r,
	marginLeft: r,
	marginBlock: r,
	marginBlockEnd: r,
	marginBlockStart: r,
	marginInline: r,
	marginInlineEnd: r,
	marginInlineStart: r,
	padding: r,
	paddingTop: r,
	paddingRight: r,
	paddingBottom: r,
	paddingLeft: r,
	paddingBlock: r,
	paddingBlockEnd: r,
	paddingBlockStart: r,
	paddingInline: r,
	paddingInlineEnd: r,
	paddingInlineStart: r,
	top: r,
	right: r,
	bottom: r,
	left: r,
	scrollMargin: r,
	scrollMarginTop: r,
	scrollMarginRight: r,
	scrollMarginBottom: r,
	scrollMarginLeft: r,
	scrollMarginX: r,
	scrollMarginY: r,
	scrollMarginBlock: r,
	scrollMarginBlockEnd: r,
	scrollMarginBlockStart: r,
	scrollMarginInline: r,
	scrollMarginInlineEnd: r,
	scrollMarginInlineStart: r,
	scrollPadding: r,
	scrollPaddingTop: r,
	scrollPaddingRight: r,
	scrollPaddingBottom: r,
	scrollPaddingLeft: r,
	scrollPaddingX: r,
	scrollPaddingY: r,
	scrollPaddingBlock: r,
	scrollPaddingBlockEnd: r,
	scrollPaddingBlockStart: r,
	scrollPaddingInline: r,
	scrollPaddingInlineEnd: r,
	scrollPaddingInlineStart: r,
	fontSize: "fontSizes",
	background: e,
	backgroundColor: e,
	backgroundImage: e,
	borderImage: e,
	border: e,
	borderBlock: e,
	borderBlockEnd: e,
	borderBlockStart: e,
	borderBottom: e,
	borderBottomColor: e,
	borderColor: e,
	borderInline: e,
	borderInlineEnd: e,
	borderInlineStart: e,
	borderLeft: e,
	borderLeftColor: e,
	borderRight: e,
	borderRightColor: e,
	borderTop: e,
	borderTopColor: e,
	caretColor: e,
	color: e,
	columnRuleColor: e,
	fill: e,
	outline: e,
	outlineColor: e,
	stroke: e,
	textDecorationColor: e,
	fontFamily: "fonts",
	fontWeight: "fontWeights",
	lineHeight: "lineHeights",
	letterSpacing: "letterSpacings",
	blockSize: t,
	minBlockSize: t,
	maxBlockSize: t,
	inlineSize: t,
	minInlineSize: t,
	maxInlineSize: t,
	width: t,
	minWidth: t,
	maxWidth: t,
	height: t,
	minHeight: t,
	maxHeight: t,
	flexBasis: t,
	gridTemplateColumns: t,
	gridTemplateRows: t,
	borderWidth: "borderWidths",
	borderTopWidth: "borderWidths",
	borderRightWidth: "borderWidths",
	borderBottomWidth: "borderWidths",
	borderLeftWidth: "borderWidths",
	borderStyle: "borderStyles",
	borderTopStyle: "borderStyles",
	borderRightStyle: "borderStyles",
	borderBottomStyle: "borderStyles",
	borderLeftStyle: "borderStyles",
	borderRadius: "radii",
	borderTopLeftRadius: "radii",
	borderTopRightRadius: "radii",
	borderBottomRightRadius: "radii",
	borderBottomLeftRadius: "radii",
	boxShadow: "shadows",
	textShadow: "shadows",
	transition: "transitions",
	zIndex: "zIndices"
}, i = (e, t) => "function" == typeof t ? { "()": Function.prototype.toString.call(t) } : t, o = () => {
	const e = Object.create(null);
	return (t, r, ...n) => {
		const o = ((e) => JSON.stringify(e, i))(t);
		return o in e ? e[o] : e[o] = r(t, ...n);
	};
}, l = Symbol.for("sxs.internal"), s = (e, t) => Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), a = (e) => {
	for (const t in e) return !0;
	return !1;
}, { hasOwnProperty: c } = Object.prototype, d = (e) => e.includes("-") ? e : e.replace(/[A-Z]/g, ((e) => "-" + e.toLowerCase())), g = /\s+(?![^()]*\))/, p = (e) => (t) => e(..."string" == typeof t ? String(t).split(g) : [t]), u = {
	appearance: (e) => ({
		WebkitAppearance: e,
		appearance: e
	}),
	backfaceVisibility: (e) => ({
		WebkitBackfaceVisibility: e,
		backfaceVisibility: e
	}),
	backdropFilter: (e) => ({
		WebkitBackdropFilter: e,
		backdropFilter: e
	}),
	backgroundClip: (e) => ({
		WebkitBackgroundClip: e,
		backgroundClip: e
	}),
	boxDecorationBreak: (e) => ({
		WebkitBoxDecorationBreak: e,
		boxDecorationBreak: e
	}),
	clipPath: (e) => ({
		WebkitClipPath: e,
		clipPath: e
	}),
	content: (e) => ({ content: e.includes("\"") || e.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e) ? e : `"${e}"` }),
	hyphens: (e) => ({
		WebkitHyphens: e,
		hyphens: e
	}),
	maskImage: (e) => ({
		WebkitMaskImage: e,
		maskImage: e
	}),
	maskSize: (e) => ({
		WebkitMaskSize: e,
		maskSize: e
	}),
	tabSize: (e) => ({
		MozTabSize: e,
		tabSize: e
	}),
	textSizeAdjust: (e) => ({
		WebkitTextSizeAdjust: e,
		textSizeAdjust: e
	}),
	userSelect: (e) => ({
		WebkitUserSelect: e,
		userSelect: e
	}),
	marginBlock: p(((e, t) => ({
		marginBlockStart: e,
		marginBlockEnd: t || e
	}))),
	marginInline: p(((e, t) => ({
		marginInlineStart: e,
		marginInlineEnd: t || e
	}))),
	maxSize: p(((e, t) => ({
		maxBlockSize: e,
		maxInlineSize: t || e
	}))),
	minSize: p(((e, t) => ({
		minBlockSize: e,
		minInlineSize: t || e
	}))),
	paddingBlock: p(((e, t) => ({
		paddingBlockStart: e,
		paddingBlockEnd: t || e
	}))),
	paddingInline: p(((e, t) => ({
		paddingInlineStart: e,
		paddingInlineEnd: t || e
	})))
}, h = /([\d.]+)([^]*)/, f = (e, t) => e.length ? e.reduce(((e, r) => (e.push(...t.map(((e) => e.includes("&") ? e.replace(/&/g, /[ +>|~]/.test(r) && /&.*&/.test(e) ? `:is(${r})` : r) : r + " " + e))), e)), []) : t, m = (e, t) => e in b && "string" == typeof t ? t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, ((t, r, n, i) => r + ("stretch" === n ? `-moz-available${i};${d(e)}:${r}-webkit-fill-available` : `-moz-fit-content${i};${d(e)}:${r}fit-content`) + i)) : String(t), b = {
	blockSize: 1,
	height: 1,
	inlineSize: 1,
	maxBlockSize: 1,
	maxHeight: 1,
	maxInlineSize: 1,
	maxWidth: 1,
	minBlockSize: 1,
	minHeight: 1,
	minInlineSize: 1,
	minWidth: 1,
	width: 1
}, S = (e) => e ? e + "-" : "", k = (e, t, r) => e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, ((e, n, i, o, l) => "$" == o == !!i ? e : (n || "--" == o ? "calc(" : "") + "var(--" + ("$" === o ? S(t) + (l.includes("$") ? "" : S(r)) + l.replace(/\$/g, "-") : l) + ")" + (n || "--" == o ? "*" + (n || "") + (i || "1") + ")" : ""))), y = /\s*,\s*(?![^()]*\))/, B = Object.prototype.toString, $ = (e, t, r, n, i) => {
	let o, l, s;
	const a = (e, t, r) => {
		let c, g;
		const p = (e) => {
			for (c in e) {
				const R = 64 === c.charCodeAt(0);
				for (g of R && Array.isArray(e[c]) ? e[c] : [e[c]]) {
					const e = /[A-Z]/.test($ = c) ? $ : $.replace(/-[^]/g, ((e) => e[1].toUpperCase())), z = "object" == typeof g && g && g.toString === B && (!n.utils[e] || !t.length);
					if (e in n.utils && !z) {
						const t = n.utils[e];
						if (t !== l) {
							l = t, p(t(g)), l = null;
							continue;
						}
					} else if (e in u) {
						const t = u[e];
						if (t !== s) {
							s = t, p(t(g)), s = null;
							continue;
						}
					}
					if (R && (b = c.slice(1) in n.media ? "@media " + n.media[c.slice(1)] : c, c = b.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, ((e, t, r, n, i, o) => {
						const l = h.test(t), s = .0625 * (l ? -1 : 1), [a, c] = l ? [n, t] : [t, n];
						return "(" + ("=" === r[0] ? "" : ">" === r[0] === l ? "max-" : "min-") + a + ":" + ("=" !== r[0] && 1 === r.length ? c.replace(h, ((e, t, n) => Number(t) + s * (">" === r ? 1 : -1) + n)) : c) + (i ? ") and (" + (">" === i[0] ? "min-" : "max-") + a + ":" + (1 === i.length ? o.replace(h, ((e, t, r) => Number(t) + s * (">" === i ? -1 : 1) + r)) : o) : "") + ")";
					}))), z) {
						const e = R ? r.concat(c) : [...r], n = R ? [...t] : f(t, c.split(y));
						void 0 !== o && i(x(...o)), o = void 0, a(g, n, e);
					} else void 0 === o && (o = [
						[],
						t,
						r
					]), c = R || 36 !== c.charCodeAt(0) ? c : `--${S(n.prefix)}${c.slice(1).replace(/\$/g, "-")}`, g = z ? g : "number" == typeof g ? g && e in I ? String(g) + "px" : String(g) : k(m(e, null == g ? "" : g), n.prefix, n.themeMap[e]), o[0].push(`${R ? `${c} ` : `${d(c)}:`}${g}`);
				}
			}
			var b, $;
		};
		p(e), void 0 !== o && i(x(...o)), o = void 0;
	};
	a(e, t, r);
}, x = (e, t, r) => `${r.map(((e) => `${e}{`)).join("")}${t.length ? `${t.join(",")}{` : ""}${e.join(";")}${t.length ? "}" : ""}${Array(r.length ? r.length + 1 : 0).join("}")}`, I = {
	animationDelay: 1,
	animationDuration: 1,
	backgroundSize: 1,
	blockSize: 1,
	border: 1,
	borderBlock: 1,
	borderBlockEnd: 1,
	borderBlockEndWidth: 1,
	borderBlockStart: 1,
	borderBlockStartWidth: 1,
	borderBlockWidth: 1,
	borderBottom: 1,
	borderBottomLeftRadius: 1,
	borderBottomRightRadius: 1,
	borderBottomWidth: 1,
	borderEndEndRadius: 1,
	borderEndStartRadius: 1,
	borderInlineEnd: 1,
	borderInlineEndWidth: 1,
	borderInlineStart: 1,
	borderInlineStartWidth: 1,
	borderInlineWidth: 1,
	borderLeft: 1,
	borderLeftWidth: 1,
	borderRadius: 1,
	borderRight: 1,
	borderRightWidth: 1,
	borderSpacing: 1,
	borderStartEndRadius: 1,
	borderStartStartRadius: 1,
	borderTop: 1,
	borderTopLeftRadius: 1,
	borderTopRightRadius: 1,
	borderTopWidth: 1,
	borderWidth: 1,
	bottom: 1,
	columnGap: 1,
	columnRule: 1,
	columnRuleWidth: 1,
	columnWidth: 1,
	containIntrinsicSize: 1,
	flexBasis: 1,
	fontSize: 1,
	gap: 1,
	gridAutoColumns: 1,
	gridAutoRows: 1,
	gridTemplateColumns: 1,
	gridTemplateRows: 1,
	height: 1,
	inlineSize: 1,
	inset: 1,
	insetBlock: 1,
	insetBlockEnd: 1,
	insetBlockStart: 1,
	insetInline: 1,
	insetInlineEnd: 1,
	insetInlineStart: 1,
	left: 1,
	letterSpacing: 1,
	margin: 1,
	marginBlock: 1,
	marginBlockEnd: 1,
	marginBlockStart: 1,
	marginBottom: 1,
	marginInline: 1,
	marginInlineEnd: 1,
	marginInlineStart: 1,
	marginLeft: 1,
	marginRight: 1,
	marginTop: 1,
	maxBlockSize: 1,
	maxHeight: 1,
	maxInlineSize: 1,
	maxWidth: 1,
	minBlockSize: 1,
	minHeight: 1,
	minInlineSize: 1,
	minWidth: 1,
	offsetDistance: 1,
	offsetRotate: 1,
	outline: 1,
	outlineOffset: 1,
	outlineWidth: 1,
	overflowClipMargin: 1,
	padding: 1,
	paddingBlock: 1,
	paddingBlockEnd: 1,
	paddingBlockStart: 1,
	paddingBottom: 1,
	paddingInline: 1,
	paddingInlineEnd: 1,
	paddingInlineStart: 1,
	paddingLeft: 1,
	paddingRight: 1,
	paddingTop: 1,
	perspective: 1,
	right: 1,
	rowGap: 1,
	scrollMargin: 1,
	scrollMarginBlock: 1,
	scrollMarginBlockEnd: 1,
	scrollMarginBlockStart: 1,
	scrollMarginBottom: 1,
	scrollMarginInline: 1,
	scrollMarginInlineEnd: 1,
	scrollMarginInlineStart: 1,
	scrollMarginLeft: 1,
	scrollMarginRight: 1,
	scrollMarginTop: 1,
	scrollPadding: 1,
	scrollPaddingBlock: 1,
	scrollPaddingBlockEnd: 1,
	scrollPaddingBlockStart: 1,
	scrollPaddingBottom: 1,
	scrollPaddingInline: 1,
	scrollPaddingInlineEnd: 1,
	scrollPaddingInlineStart: 1,
	scrollPaddingLeft: 1,
	scrollPaddingRight: 1,
	scrollPaddingTop: 1,
	shapeMargin: 1,
	textDecoration: 1,
	textDecorationThickness: 1,
	textIndent: 1,
	textUnderlineOffset: 1,
	top: 1,
	transitionDelay: 1,
	transitionDuration: 1,
	verticalAlign: 1,
	width: 1,
	wordSpacing: 1
}, R = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97)), z = (e) => ((e) => {
	let t, r = "";
	for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = R(t % 52) + r;
	return R(t % 52) + r;
})(((e, t) => {
	let r = t.length;
	for (; r;) e = 33 * e ^ t.charCodeAt(--r);
	return e;
})(5381, JSON.stringify(e)) >>> 0), W = [
	"themed",
	"global",
	"styled",
	"onevar",
	"resonevar",
	"allvar",
	"inline"
], j = (e) => {
	if (e.href && !e.href.startsWith(location.origin)) return !1;
	try {
		return !!e.cssRules;
	} catch (e) {
		return !1;
	}
}, E = (e) => {
	let t;
	const r = () => {
		const { cssRules: e } = t.sheet;
		return [].map.call(e, ((r, n) => {
			const { cssText: i } = r;
			let o = "";
			if (i.startsWith("--sxs")) return "";
			if (e[n - 1] && (o = e[n - 1].cssText).startsWith("--sxs")) {
				if (!r.cssRules.length) return "";
				for (const e in t.rules) if (t.rules[e].group === r) return `--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${i}`;
				return r.cssRules.length ? `${o}${i}` : "";
			}
			return i;
		})).join("");
	}, n = () => {
		if (t) {
			const { rules: e, sheet: r } = t;
			if (!r.deleteRule) {
				for (; 3 === Object(Object(r.cssRules)[0]).type;) r.cssRules.splice(0, 1);
				r.cssRules = [];
			}
			for (const t in e) delete e[t];
		}
		const i = Object(e).styleSheets || [];
		for (const e of i) if (j(e)) {
			for (let i = 0, o = e.cssRules; o[i]; ++i) {
				const l = Object(o[i]);
				if (1 !== l.type) continue;
				const s = Object(o[i + 1]);
				if (4 !== s.type) continue;
				++i;
				const { cssText: a } = l;
				if (!a.startsWith("--sxs")) continue;
				const c = a.slice(14, -3).trim().split(/\s+/), d = W[c[0]];
				d && (t || (t = {
					sheet: e,
					reset: n,
					rules: {},
					toString: r
				}), t.rules[d] = {
					group: s,
					index: i,
					cache: new Set(c)
				});
			}
			if (t) break;
		}
		if (!t) {
			const i = (e, t) => ({
				type: t,
				cssRules: [],
				insertRule(e, t) {
					this.cssRules.splice(t, 0, i(e, {
						import: 3,
						undefined: 1
					}[(e.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
				},
				get cssText() {
					return "@media{}" === e ? `@media{${[].map.call(this.cssRules, ((e) => e.cssText)).join("")}}` : e;
				}
			});
			t = {
				sheet: e ? (e.head || e).appendChild(document.createElement("style")).sheet : i("", "text/css"),
				rules: {},
				reset: n,
				toString: r
			};
		}
		const { sheet: o, rules: l } = t;
		for (let e = W.length - 1; e >= 0; --e) {
			const t = W[e];
			if (!l[t]) {
				const r = W[e + 1], n = l[r] ? l[r].index : o.cssRules.length;
				o.insertRule("@media{}", n), o.insertRule(`--sxs{--sxs:${e}}`, n), l[t] = {
					group: o.cssRules[n + 1],
					index: n,
					cache: new Set([e])
				};
			}
			v(l[t]);
		}
	};
	return n(), t;
}, v = (e) => {
	const t = e.group;
	let r = t.cssRules.length;
	e.apply = (e) => {
		try {
			t.insertRule(e, r), ++r;
		} catch (e) {}
	};
}, T = Symbol(), w = o(), M = (e, t) => w(e, (() => (...r) => {
	let n = {
		type: null,
		composers: /* @__PURE__ */ new Set()
	};
	for (const t of r) if (null != t) if (t[l]) {
		n.type ??= t[l].type;
		for (const e of t[l].composers) n.composers.add(e);
	} else t.constructor !== Object || t.$$typeof ? n.type ??= t : n.composers.add(C(t, e));
	return n.type ??= "span", n.composers.size || n.composers.add([
		"PJLV",
		{},
		[],
		[],
		{},
		[]
	]), P(e, n, t);
})), C = ({ variants: e, compoundVariants: t, defaultVariants: r, ...n }, i) => {
	const o = `${S(i.prefix)}c-${z(n)}`, l = [], s = [], d = Object.create(null), g = [];
	for (const e in r) d[e] = String(r[e]);
	if ("object" == typeof e && e) for (const t in e) {
		p = d, u = t, c.call(p, u) || (d[t] = "undefined");
		const r = e[t];
		for (const e in r) {
			const n = { [t]: String(e) };
			"undefined" === String(e) && g.push(t);
			const i = r[e], o = [
				n,
				i,
				!a(i)
			];
			l.push(o);
		}
	}
	var p, u;
	if ("object" == typeof t && t) for (const e of t) {
		let { css: t, ...r } = e;
		t = "object" == typeof t && t || {};
		for (const e in r) r[e] = String(r[e]);
		const n = [
			r,
			t,
			!a(t)
		];
		s.push(n);
	}
	return [
		o,
		n,
		l,
		s,
		d,
		g
	];
}, P = (e, t, r) => {
	const [n, i, o, a] = L(t.composers), c = "function" == typeof t.type || t.type.$$typeof ? ((e) => {
		function t() {
			for (let r = 0; r < t[T].length; r++) {
				const [n, i] = t[T][r];
				e.rules[n].apply(i);
			}
			return t[T] = [], null;
		}
		return t[T] = [], t.rules = {}, W.forEach(((e) => t.rules[e] = { apply: (r) => t[T].push([e, r]) })), t;
	})(r) : null, d = (c || r).rules, g = `.${n}${i.length > 1 ? `:where(.${i.slice(1).join(".")})` : ""}`, p = (l) => {
		l = "object" == typeof l && l || A;
		const { css: s, ...p } = l, u = {};
		for (const e in o) if (delete p[e], e in l) {
			let t = l[e];
			"object" == typeof t && t ? u[e] = {
				"@initial": o[e],
				...t
			} : (t = String(t), u[e] = "undefined" !== t || a.has(e) ? t : o[e]);
		} else u[e] = o[e];
		const h = new Set([...i]);
		for (const [n, i, o, l] of t.composers) {
			r.rules.styled.cache.has(n) || (r.rules.styled.cache.add(n), $(i, [`.${n}`], [], e, ((e) => {
				d.styled.apply(e);
			})));
			const t = O(o, u, e.media), s = O(l, u, e.media, !0);
			for (const i of t) if (void 0 !== i) for (const [t, o, l] of i) {
				const i = `${n}-${z(o)}-${t}`;
				h.add(i);
				const s = (l ? r.rules.resonevar : r.rules.onevar).cache, a = l ? d.resonevar : d.onevar;
				s.has(i) || (s.add(i), $(o, [`.${i}`], [], e, ((e) => {
					a.apply(e);
				})));
			}
			for (const t of s) if (void 0 !== t) for (const [i, o] of t) {
				const t = `${n}-${z(o)}-${i}`;
				h.add(t), r.rules.allvar.cache.has(t) || (r.rules.allvar.cache.add(t), $(o, [`.${t}`], [], e, ((e) => {
					d.allvar.apply(e);
				})));
			}
		}
		if ("object" == typeof s && s) {
			const t = `${n}-i${z(s)}-css`;
			h.add(t), r.rules.inline.cache.has(t) || (r.rules.inline.cache.add(t), $(s, [`.${t}`], [], e, ((e) => {
				d.inline.apply(e);
			})));
		}
		for (const e of String(l.className || "").trim().split(/\s+/)) e && h.add(e);
		const f = p.className = [...h].join(" ");
		return {
			type: t.type,
			className: f,
			selector: g,
			props: p,
			toString: () => f,
			deferredInjector: c
		};
	};
	return s(p, {
		className: n,
		selector: g,
		[l]: t,
		toString: () => (r.rules.styled.cache.has(n) || p(), n)
	});
}, L = (e) => {
	let t = "";
	const r = [], n = {}, i = [];
	for (const [o, , , , l, s] of e) {
		"" === t && (t = o), r.push(o), i.push(...s);
		for (const e in l) {
			const t = l[e];
			(void 0 === n[e] || "undefined" !== t || s.includes(t)) && (n[e] = t);
		}
	}
	return [
		t,
		r,
		n,
		new Set(i)
	];
}, O = (e, t, r, n) => {
	const i = [];
	e: for (let [o, l, s] of e) {
		if (s) continue;
		let e, a = 0, c = !1;
		for (e in o) {
			const n = o[e];
			let i = t[e];
			if (i !== n) {
				if ("object" != typeof i || !i) continue e;
				{
					let e, t, o = 0;
					for (const l in i) {
						if (n === String(i[l])) {
							if ("@initial" !== l) {
								const e = l.slice(1);
								(t = t || []).push(e in r ? r[e] : l.replace(/^@media ?/, "")), c = !0;
							}
							a += o, e = !0;
						}
						++o;
					}
					if (t && t.length && (l = { ["@media " + t.join(", ")]: l }), !e) continue e;
				}
			}
		}
		(i[a] = i[a] || []).push([
			n ? "cv" : `${e}-${o[e]}`,
			l,
			c
		]);
	}
	return i;
}, A = {}, N = o(), D = (e, t) => N(e, (() => (...r) => {
	const n = () => {
		for (let n of r) {
			n = "object" == typeof n && n || {};
			let r = z(n);
			if (!t.rules.global.cache.has(r)) {
				if (t.rules.global.cache.add(r), "@import" in n) {
					let e = [].indexOf.call(t.sheet.cssRules, t.rules.themed.group) - 1;
					for (let r of [].concat(n["@import"])) r = r.includes("\"") || r.includes("'") ? r : `"${r}"`, t.sheet.insertRule(`@import ${r};`, e++);
					delete n["@import"];
				}
				$(n, [], [], e, ((e) => {
					t.rules.global.apply(e);
				}));
			}
		}
		return "";
	};
	return s(n, { toString: n });
})), H = o(), V = (e, t) => H(e, (() => (r) => {
	const n = `${S(e.prefix)}k-${z(r)}`, i = () => {
		if (!t.rules.global.cache.has(n)) {
			t.rules.global.cache.add(n);
			const i = [];
			$(r, [], [], e, ((e) => i.push(e)));
			const o = `@keyframes ${n}{${i.join("")}}`;
			t.rules.global.apply(o);
		}
		return n;
	};
	return s(i, {
		get name() {
			return i();
		},
		toString: i
	});
})), G = class {
	constructor(e, t, r, n) {
		this.token = null == e ? "" : String(e), this.value = null == t ? "" : String(t), this.scale = null == r ? "" : String(r), this.prefix = null == n ? "" : String(n);
	}
	get computedValue() {
		return "var(" + this.variable + ")";
	}
	get variable() {
		return "--" + S(this.prefix) + S(this.scale) + this.token;
	}
	toString() {
		return this.computedValue;
	}
}, F = o(), J = (e, t) => F(e, (() => (r, n) => {
	n = "object" == typeof r && r || Object(n);
	const i = `.${r = (r = "string" == typeof r ? r : "") || `${S(e.prefix)}t-${z(n)}`}`, o = {}, l = [];
	for (const t in n) {
		o[t] = {};
		for (const r in n[t]) {
			const i = `--${S(e.prefix)}${t}-${r}`, s = k(String(n[t][r]), e.prefix, t);
			o[t][r] = new G(r, s, t, e.prefix), l.push(`${i}:${s}`);
		}
	}
	const s = () => {
		if (l.length && !t.rules.themed.cache.has(r)) {
			t.rules.themed.cache.add(r);
			const i = `${n === e.theme ? ":root," : ""}.${r}{${l.join(";")}}`;
			t.rules.themed.apply(i);
		}
		return r;
	};
	return {
		...o,
		get className() {
			return s();
		},
		selector: i,
		toString: s
	};
})), U = o(), X, Y = o(), q = (e) => {
	const t = ((e) => {
		let t = !1;
		const r = U(e, ((e) => {
			t = !0;
			const r = "prefix" in (e = "object" == typeof e && e || {}) ? String(e.prefix) : "", i = "object" == typeof e.media && e.media || {}, o = "object" == typeof e.root ? e.root || null : globalThis.document || null, l = "object" == typeof e.theme && e.theme || {}, s = {
				prefix: r,
				media: i,
				theme: l,
				themeMap: "object" == typeof e.themeMap && e.themeMap || { ...n },
				utils: "object" == typeof e.utils && e.utils || {}
			}, a = E(o), c = {
				css: M(s, a),
				globalCss: D(s, a),
				keyframes: V(s, a),
				createTheme: J(s, a),
				reset() {
					a.reset(), c.theme.toString();
				},
				theme: {},
				sheet: a,
				config: s,
				prefix: r,
				getCssText: a.toString,
				toString: a.toString
			};
			return String(c.theme = c.createTheme(l)), c;
		}));
		return t || r.reset(), r;
	})(e);
	return t.styled = (({ config: e, sheet: t }) => Y(e, (() => {
		const r = M(e, t);
		return (...e) => {
			const t = r(...e), n = t[l].type, i = import_react.forwardRef(((e, r) => {
				const i = e && e.as || n, { props: o, deferredInjector: l } = t(e);
				return delete o.as, o.ref = r, l ? import_react.createElement(import_react.Fragment, null, import_react.createElement(i, o), import_react.createElement(l, null)) : import_react.createElement(i, o);
			}));
			return i.className = t.className, i.displayName = `Styled.${n.displayName || n.name || n}`, i.selector = t.selector, i.toString = () => t.selector, i[l] = t[l], i;
		};
	})))(t), t;
}, K = () => X || (X = q()), re = (...e) => K().styled(...e);
//#endregion
//#region node_modules/r3f-perf/dist/styles.mjs
var PerfS = re("div", {
	position: "fixed",
	top: 0,
	right: 0,
	zIndex: 9999,
	fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
	backgroundColor: "rgba(36, 36, 36, .9)",
	color: "#fff",
	margin: 0,
	minHeight: "100px",
	padding: "4px 0",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",
	userSelect: "none",
	"&.top-left": {
		right: "initial",
		left: 0
	},
	"&.bottom-left": {
		right: "initial",
		top: "initial",
		bottom: 0,
		left: 0,
		".__perf_toggle": {
			top: "-20px",
			bottom: "initial"
		}
	},
	"&.bottom-right": {
		top: "initial",
		bottom: 0,
		".__perf_toggle": {
			top: "-20px",
			bottom: "initial"
		}
	},
	"&.minimal": { backgroundColor: "rgba(36, 36, 36, .75)" },
	"*": {
		margin: "0",
		padding: "0",
		border: "0",
		fontSize: "100%",
		lineHeight: "1",
		verticalAlign: "baseline"
	}
});
var PerfSmallI = re("small", {
	position: "absolute",
	right: 0,
	fontSize: "10px"
});
var PerfI = re("div", {
	display: "inline-flex",
	fontStyle: "normal",
	padding: 0,
	lineHeight: "13px",
	fontSize: "14px",
	width: "62px",
	position: "relative",
	pointerEvents: "auto",
	cursor: "default",
	fontWeight: 500,
	letterSpacing: "0px",
	textAlign: "left",
	height: "29px",
	whiteSpace: "nowrap",
	justifyContent: "space-evenly",
	fontVariantNumeric: "tabular-nums",
	small: { paddingLeft: "12px" },
	svg: {
		padding: 0,
		color: "rgba(145, 145, 145, 0.3)",
		fontSize: "40px",
		position: "absolute",
		zIndex: 1,
		maxHeight: "20px",
		left: " 50%",
		marginLeft: "-23px",
		top: "4px"
	}
});
var PerfB = re("span", {
	verticalAlign: "bottom",
	position: "absolute",
	bottom: "5px",
	color: "rgba(101, 197, 188, 1)",
	textAlign: "right",
	letterSpacing: "1px",
	fontSize: "8px",
	fontWeight: "500",
	width: "60px"
});
var PerfIContainer = re("div", { display: "flex" });
var ProgramHeader = re("div", {
	backgroundColor: "#404040",
	padding: "6px",
	display: "block",
	fontSize: "12px",
	marginBottom: "6px",
	cursor: "pointer",
	"*": { cursor: "pointer !important" },
	"> span": {},
	small: { fontSize: "9px" },
	"> b": {
		marginRight: "4px",
		cursor: "pointer"
	}
});
var Graph = re("div", {
	height: "66px",
	overflow: "hidden",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	top: "0px",
	justifyContent: "center",
	width: "100%",
	minWidth: "310px",
	margin: "0 auto",
	canvas: {
		background: "transparent !important",
		position: "absolute !important"
	}
});
var Graphpc = re("div", {
	textAlign: "center",
	fontWeight: 700,
	fontSize: "12px",
	lineHeight: "12px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	verticalAlign: "middle",
	color: "#f1f1f1",
	padding: "7px",
	width: "100%",
	backgroundColor: "rgba(36, 36, 37, 0.8)",
	zIndex: 1,
	position: "absolute",
	height: "100%"
});
var Toggle = re("div", {
	pointerEvents: "auto",
	justifyContent: "center",
	cursor: "pointer",
	fontSize: "12px",
	backgroundColor: "rgb(41, 43, 45)",
	marginTop: "6px",
	width: "auto",
	margin: "0",
	color: "rgba(145, 145, 145, 1)",
	textAlign: "center",
	display: "inline-block",
	verticalAlign: "middle",
	padding: "4px 6px",
	"&.__perf_toggle_tab_active": { backgroundColor: "rgb(31 31 31)" },
	svg: {
		width: "12px",
		height: "12px",
		float: "left"
	}
});
var ToggleVisible = re("div", {
	pointerEvents: "auto",
	justifyContent: "center",
	cursor: "pointer",
	fontSize: "12px",
	float: "right",
	backgroundColor: "rgb(41, 43, 45)",
	width: "auto",
	margin: "0",
	color: "rgba(145, 145, 145, 1)",
	textAlign: "center",
	display: "inline-block",
	verticalAlign: "middle",
	padding: "4px 6px",
	"&.__perf_toggle_tab_active": { backgroundColor: "rgb(31 31 31)" },
	svg: {
		width: "12px",
		height: "12px",
		float: "left"
	}
});
var ProgramGeo = re("div", {
	padding: "4px 6px",
	fontSize: "12px",
	pointerEvents: "auto"
});
var ProgramTitle = re("span", {
	fontWeight: "bold",
	letterSpacing: "0.08em",
	maxWidth: "145px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "inline-block",
	verticalAlign: "middle",
	fontSize: "11px",
	marginRight: "10px"
});
var ContainerScroll = re("div", {
	maxHeight: "50vh",
	overflowY: "auto",
	marginTop: "38px"
});
var ProgramsContainer = re("div", { marginTop: "0" });
var ProgramsULHeader = re("div", {
	display: "flex",
	position: "relative",
	fontWeight: "bold",
	color: "#fff",
	lineHeight: "14px",
	svg: {
		marginRight: "4px",
		display: "inline-block"
	}
});
var ProgramsUL = re("ul", {
	display: "block",
	position: "relative",
	paddingLeft: "10px",
	margin: "6px 6px",
	img: {
		maxHeight: "60px",
		maxWidth: "100%",
		margin: "6px auto",
		display: "block"
	},
	"&:after": {
		content: "",
		position: "absolute",
		left: "0px",
		top: "0px",
		width: "1px",
		height: "100%",
		backgroundColor: "grey",
		transform: "translateX(-50%)",
		maxHeight: "50vh",
		overflowY: "auto"
	},
	li: {
		borderBottom: "1px solid #313131",
		display: "block",
		padding: "4px",
		margin: 0,
		lineHeight: 1,
		verticalAlign: "middle",
		height: "24px"
	},
	b: { fontWeight: "bold" },
	small: {
		textAlign: "revert",
		letterSpacing: "1px",
		fontSize: "10px",
		fontWeight: "500",
		marginLeft: "2px",
		color: "rgb(101, 197, 188)"
	}
});
var ProgramConsole = re("button", {
	fontWeight: "bold",
	letterSpacing: "0.02em",
	backgroundColor: "rgb(41, 43, 45)",
	color: "rgb(211, 211, 211)",
	overflow: "hidden",
	textOverflow: "ellipsis",
	cursor: "pointer",
	display: "block",
	verticalAlign: "middle",
	fontSize: "11px",
	padding: "5px",
	margin: "4px auto"
});
var ToggleContainer = re("div", {
	display: "flex",
	justifyContent: "center",
	cursor: "pointer",
	fontSize: "12px",
	backgroundColor: "rgb(41, 43, 45)",
	marginTop: "6px",
	width: "auto",
	margin: "0 auto",
	color: "rgba(145, 145, 145, 1)",
	textAlign: "center",
	position: "absolute",
	right: 0,
	bottom: " -20px",
	svg: {
		width: "12px",
		height: "12px",
		float: "left"
	}
});
var ProgramsGeoLi = re("li", {
	display: "flex !important",
	height: "auto !important",
	span: {
		height: "40px",
		display: "block",
		position: "relative"
	},
	b: { paddingLeft: "12px" }
});
//#endregion
//#region node_modules/@radix-ui/react-icons/dist/react-icons.esm.js
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var _excluded$1 = ["color"];
var ActivityLogIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M0 1.5C0 1.22386 0.223858 1 0.5 1H2.5C2.77614 1 3 1.22386 3 1.5C3 1.77614 2.77614 2 2.5 2H0.5C0.223858 2 0 1.77614 0 1.5ZM4 1.5C4 1.22386 4.22386 1 4.5 1H14.5C14.7761 1 15 1.22386 15 1.5C15 1.77614 14.7761 2 14.5 2H4.5C4.22386 2 4 1.77614 4 1.5ZM4 4.5C4 4.22386 4.22386 4 4.5 4H11.5C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H4.5C4.22386 11 4 10.7761 4 10.5ZM0 13.5C0 13.2239 0.223858 13 0.5 13H2.5C2.77614 13 3 13.2239 3 13.5C3 13.7761 2.77614 14 2.5 14H0.5C0.223858 14 0 13.7761 0 13.5ZM4 13.5C4 13.2239 4.22386 13 4.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H4.5C4.22386 14 4 13.7761 4 13.5Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$o = ["color"];
var BarChartIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$o);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$H = ["color"];
var ButtonIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$H);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M2 5H13C13.5523 5 14 5.44772 14 6V9C14 9.55228 13.5523 10 13 10H2C1.44772 10 1 9.55228 1 9V6C1 5.44772 1.44772 5 2 5ZM0 6C0 4.89543 0.895431 4 2 4H13C14.1046 4 15 4.89543 15 6V9C15 10.1046 14.1046 11 13 11H2C0.89543 11 0 10.1046 0 9V6ZM4.5 6.75C4.08579 6.75 3.75 7.08579 3.75 7.5C3.75 7.91421 4.08579 8.25 4.5 8.25C4.91421 8.25 5.25 7.91421 5.25 7.5C5.25 7.08579 4.91421 6.75 4.5 6.75ZM6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5ZM10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25C10.9142 8.25 11.25 7.91421 11.25 7.5C11.25 7.08579 10.9142 6.75 10.5 6.75Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$1w = ["color"];
var CubeIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1w);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$1H = ["color"];
var DotIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1H);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$1W = ["color"];
var DropdownMenuIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1W);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.49999 3.09998C7.27907 3.09998 7.09999 3.27906 7.09999 3.49998C7.09999 3.72089 7.27907 3.89998 7.49999 3.89998H14.5C14.7209 3.89998 14.9 3.72089 14.9 3.49998C14.9 3.27906 14.7209 3.09998 14.5 3.09998H7.49999ZM7.49998 5.1C7.27907 5.1 7.09998 5.27908 7.09998 5.5C7.09998 5.72091 7.27907 5.9 7.49998 5.9H14.5C14.7209 5.9 14.9 5.72091 14.9 5.5C14.9 5.27908 14.7209 5.1 14.5 5.1H7.49998ZM7.1 7.5C7.1 7.27908 7.27909 7.1 7.5 7.1H14.5C14.7209 7.1 14.9 7.27908 14.9 7.5C14.9 7.72091 14.7209 7.9 14.5 7.9H7.5C7.27909 7.9 7.1 7.72091 7.1 7.5ZM7.49998 9.1C7.27907 9.1 7.09998 9.27908 7.09998 9.5C7.09998 9.72091 7.27907 9.9 7.49998 9.9H14.5C14.7209 9.9 14.9 9.72091 14.9 9.5C14.9 9.27908 14.7209 9.1 14.5 9.1H7.49998ZM7.09998 11.5C7.09998 11.2791 7.27907 11.1 7.49998 11.1H14.5C14.7209 11.1 14.9 11.2791 14.9 11.5C14.9 11.7209 14.7209 11.9 14.5 11.9H7.49998C7.27907 11.9 7.09998 11.7209 7.09998 11.5ZM2.5 9.25003L5 6.00003H0L2.5 9.25003Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$25 = ["color"];
var EyeNoneIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$25);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$26 = ["color"];
var EyeOpenIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$26);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$2C = ["color"];
var ImageIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$2C);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$2H = ["color"];
var LapTimerIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$2H);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L12.058 2.05806C12.3021 1.81398 12.6978 1.81398 12.9419 2.05806C13.186 2.30214 13.186 2.69786 12.9419 2.94194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13361 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.49998 8.49998V4.09998C5.06992 4.09998 3.09998 6.06992 3.09998 8.49998C3.09998 10.93 5.06992 12.9 7.49998 12.9C8.715 12.9 9.815 12.4075 10.6112 11.6112L7.49998 8.49998Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$2J = ["color"];
var LayersIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$2J);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$2Q = ["color"];
var LightningBoltIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$2Q);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$34 = ["color"];
var MarginIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$34);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M1.49988 2.00012C1.77602 2.00012 1.99988 1.77626 1.99988 1.50012C1.99988 1.22398 1.77602 1.00012 1.49988 1.00012C1.22374 1.00012 0.999878 1.22398 0.999878 1.50012C0.999878 1.77626 1.22374 2.00012 1.49988 2.00012ZM4.49988 2.00012C4.77602 2.00012 4.99988 1.77626 4.99988 1.50012C4.99988 1.22398 4.77602 1.00012 4.49988 1.00012C4.22374 1.00012 3.99988 1.22398 3.99988 1.50012C3.99988 1.77626 4.22374 2.00012 4.49988 2.00012ZM7.99988 1.50012C7.99988 1.77626 7.77602 2.00012 7.49988 2.00012C7.22374 2.00012 6.99988 1.77626 6.99988 1.50012C6.99988 1.22398 7.22374 1.00012 7.49988 1.00012C7.77602 1.00012 7.99988 1.22398 7.99988 1.50012ZM10.4999 2.00012C10.776 2.00012 10.9999 1.77626 10.9999 1.50012C10.9999 1.22398 10.776 1.00012 10.4999 1.00012C10.2237 1.00012 9.99988 1.22398 9.99988 1.50012C9.99988 1.77626 10.2237 2.00012 10.4999 2.00012ZM13.9999 1.50012C13.9999 1.77626 13.776 2.00012 13.4999 2.00012C13.2237 2.00012 12.9999 1.77626 12.9999 1.50012C12.9999 1.22398 13.2237 1.00012 13.4999 1.00012C13.776 1.00012 13.9999 1.22398 13.9999 1.50012ZM1.49988 14.0001C1.77602 14.0001 1.99988 13.7763 1.99988 13.5001C1.99988 13.224 1.77602 13.0001 1.49988 13.0001C1.22374 13.0001 0.999878 13.224 0.999878 13.5001C0.999878 13.7763 1.22374 14.0001 1.49988 14.0001ZM1.99988 10.5001C1.99988 10.7763 1.77602 11.0001 1.49988 11.0001C1.22374 11.0001 0.999878 10.7763 0.999878 10.5001C0.999878 10.224 1.22374 10.0001 1.49988 10.0001C1.77602 10.0001 1.99988 10.224 1.99988 10.5001ZM1.49988 8.00012C1.77602 8.00012 1.99988 7.77626 1.99988 7.50012C1.99988 7.22398 1.77602 7.00012 1.49988 7.00012C1.22374 7.00012 0.999878 7.22398 0.999878 7.50012C0.999878 7.77626 1.22374 8.00012 1.49988 8.00012ZM1.99988 4.50012C1.99988 4.77626 1.77602 5.00012 1.49988 5.00012C1.22374 5.00012 0.999878 4.77626 0.999878 4.50012C0.999878 4.22398 1.22374 4.00012 1.49988 4.00012C1.77602 4.00012 1.99988 4.22398 1.99988 4.50012ZM13.4999 11.0001C13.776 11.0001 13.9999 10.7763 13.9999 10.5001C13.9999 10.224 13.776 10.0001 13.4999 10.0001C13.2237 10.0001 12.9999 10.224 12.9999 10.5001C12.9999 10.7763 13.2237 11.0001 13.4999 11.0001ZM13.9999 7.50012C13.9999 7.77626 13.776 8.00012 13.4999 8.00012C13.2237 8.00012 12.9999 7.77626 12.9999 7.50012C12.9999 7.22398 13.2237 7.00012 13.4999 7.00012C13.776 7.00012 13.9999 7.22398 13.9999 7.50012ZM13.4999 5.00012C13.776 5.00012 13.9999 4.77626 13.9999 4.50012C13.9999 4.22398 13.776 4.00012 13.4999 4.00012C13.2237 4.00012 12.9999 4.22398 12.9999 4.50012C12.9999 4.77626 13.2237 5.00012 13.4999 5.00012ZM4.99988 13.5001C4.99988 13.7763 4.77602 14.0001 4.49988 14.0001C4.22374 14.0001 3.99988 13.7763 3.99988 13.5001C3.99988 13.224 4.22374 13.0001 4.49988 13.0001C4.77602 13.0001 4.99988 13.224 4.99988 13.5001ZM7.49988 14.0001C7.77602 14.0001 7.99988 13.7763 7.99988 13.5001C7.99988 13.224 7.77602 13.0001 7.49988 13.0001C7.22374 13.0001 6.99988 13.224 6.99988 13.5001C6.99988 13.7763 7.22374 14.0001 7.49988 14.0001ZM10.9999 13.5001C10.9999 13.7763 10.776 14.0001 10.4999 14.0001C10.2237 14.0001 9.99988 13.7763 9.99988 13.5001C9.99988 13.224 10.2237 13.0001 10.4999 13.0001C10.776 13.0001 10.9999 13.224 10.9999 13.5001ZM13.4999 14.0001C13.776 14.0001 13.9999 13.7763 13.9999 13.5001C13.9999 13.224 13.776 13.0001 13.4999 13.0001C13.2237 13.0001 12.9999 13.224 12.9999 13.5001C12.9999 13.7763 13.2237 14.0001 13.4999 14.0001ZM3.99988 5.00012C3.99988 4.44784 4.44759 4.00012 4.99988 4.00012H9.99988C10.5522 4.00012 10.9999 4.44784 10.9999 5.00012V10.0001C10.9999 10.5524 10.5522 11.0001 9.99988 11.0001H4.99988C4.44759 11.0001 3.99988 10.5524 3.99988 10.0001V5.00012ZM4.99988 5.00012H9.99988V10.0001H4.99988V5.00012Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$37 = ["color"];
var MinusIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$37);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$3m = ["color"];
var PauseIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$3m);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$3H = ["color"];
var RocketIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$3H);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$3L = ["color"];
var RulerHorizontalIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$3L);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M0.5 4C0.223858 4 0 4.22386 0 4.5V10.5C0 10.7761 0.223858 11 0.5 11H14.5C14.7761 11 15 10.7761 15 10.5V4.5C15 4.22386 14.7761 4 14.5 4H0.5ZM1 10V5H2.075V7.5C2.075 7.73472 2.26528 7.925 2.5 7.925C2.73472 7.925 2.925 7.73472 2.925 7.5V5H4.075V6.5C4.075 6.73472 4.26528 6.925 4.5 6.925C4.73472 6.925 4.925 6.73472 4.925 6.5V5H6.075V6.5C6.075 6.73472 6.26528 6.925 6.5 6.925C6.73472 6.925 6.925 6.73472 6.925 6.5V5H8.075V7.5C8.075 7.73472 8.26528 7.925 8.5 7.925C8.73472 7.925 8.925 7.73472 8.925 7.5V5H10.075V6.5C10.075 6.73472 10.2653 6.925 10.5 6.925C10.7347 6.925 10.925 6.73472 10.925 6.5V5H12.075V6.5C12.075 6.73472 12.2653 6.925 12.5 6.925C12.7347 6.925 12.925 6.73472 12.925 6.5V5H14V10H1Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$4q = ["color"];
var TextAlignJustifyIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$4q);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
var _excluded$4H = ["color"];
var TriangleDownIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$4H);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M4 6H11L7.5 10.5L4 6Z",
		fill: color
	}));
});
var _excluded$4K = ["color"];
var TriangleUpIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$4K);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M4 9H11L7.5 4.5L4 9Z",
		fill: color
	}));
});
var _excluded$4R = ["color"];
var VercelLogoIcon = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, forwardedRef) {
	var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$4R);
	return (0, import_react.createElement)("svg", Object.assign({
		width: "15",
		height: "15",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props, { ref: forwardedRef }), (0, import_react.createElement)("path", {
		d: "M7.49998 1L6.92321 2.00307L1.17498 12L0.599976 13H1.7535H13.2464H14.4L13.825 12L8.07674 2.00307L7.49998 1ZM7.49998 3.00613L2.3285 12H12.6714L7.49998 3.00613Z",
		fill: color,
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
});
//#endregion
//#region node_modules/r3f-perf/node_modules/@react-three/drei/core/Text.js
var Text = /* @__PURE__ */ import_react.forwardRef(({ sdfGlyphSize = 64, anchorX = "center", anchorY = "middle", font, fontSize = 1, children, characters, onSync, ...props }, ref) => {
	const invalidate = useThree(({ invalidate }) => invalidate);
	const [troikaMesh] = import_react.useState(() => new Text$1());
	const [nodes, text] = import_react.useMemo(() => {
		const n = [];
		let t = "";
		import_react.Children.forEach(children, (child) => {
			if (typeof child === "string" || typeof child === "number") t += child;
			else n.push(child);
		});
		return [n, t];
	}, [children]);
	suspend(() => new Promise((res) => preloadFont({
		font,
		characters
	}, res)), [
		"troika-text",
		font,
		characters
	]);
	import_react.useLayoutEffect(() => void troikaMesh.sync(() => {
		invalidate();
		if (onSync) onSync(troikaMesh);
	}));
	import_react.useEffect(() => {
		return () => troikaMesh.dispose();
	}, [troikaMesh]);
	return /*#__PURE__*/ import_react.createElement("primitive", _extends({
		object: troikaMesh,
		ref,
		font,
		text,
		anchorX,
		anchorY,
		fontSize,
		sdfGlyphSize
	}, props), nodes);
});
//#endregion
//#region node_modules/r3f-perf/dist/roboto.woff.mjs
var localFont = "data:font/woff;base64,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";
//#endregion
//#region node_modules/r3f-perf/dist/components/TextsHighHZ.mjs
var TextHighHZ = (0, import_react.memo)(({ isPerf, color, colorBlind, customData, isMemory, isShadersInfo, metric, fontSize, offsetY = 0, offsetX, round, hasInstance }) => {
	const { width: w, height: h } = useThree((s) => s.viewport);
	const fpsRef = (0, import_react.useRef)(null);
	const fpsInstanceRef = (0, import_react.useRef)(null);
	useEvent("log", function updateR3FPerfText([log, gl]) {
		var _a;
		if (!log || !fpsRef.current) return;
		if (customData) fpsRef.current.text = (Math.round(getPerf().customData * Math.pow(10, round)) / Math.pow(10, round)).toFixed(round);
		if (!metric) return;
		let info = log[metric];
		if (isShadersInfo) info = (_a = gl.info.programs) == null ? void 0 : _a.length;
		else if (metric === "matriceCount") info = matriceCount.value;
		else if (!isPerf && gl.info.render) info = (isMemory ? gl.info.memory : gl.info.render)[metric];
		if (metric === "fps") fpsRef.current.color = getPerf().overclockingFps ? colorsGraph(colorBlind).overClock.toString() : `rgb(${colorsGraph(colorBlind).fps.toString()})`;
		fpsRef.current.text = (Math.round(info * Math.pow(10, round)) / Math.pow(10, round)).toFixed(round);
		if (hasInstance) {
			const infosInstance = gl.info.instance;
			if (typeof infosInstance === "undefined" && metric !== "matriceCount") return;
			let infoInstance;
			if (metric === "matriceCount") infoInstance = matriceWorldCount.value;
			else infoInstance = infosInstance[metric];
			if (infoInstance > 0) {
				fpsRef.current.fontSize = fontSize / 1.15;
				fpsInstanceRef.current.fontSize = info > 0 ? fontSize / 1.4 : fontSize;
				fpsRef.current.position.y = h / 2 - offsetY - fontSize / 1.9;
				fpsInstanceRef.current.text = " ±	" + (Math.round(infoInstance * Math.pow(10, round)) / Math.pow(10, round)).toFixed(round);
			} else {
				if (fpsInstanceRef.current.text) fpsInstanceRef.current.text = "";
				fpsRef.current.position.y = h / 2 - offsetY - fontSize;
				fpsRef.current.fontSize = fontSize;
			}
		}
		matriceCount.value -= 1;
		fpsRef.current.updateMatrix();
		fpsRef.current.matrixWorld.copy(fpsRef.current.matrix);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
		fallback: null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
			textAlign: "justify",
			matrixAutoUpdate: false,
			ref: fpsRef,
			font: localFont,
			fontSize,
			position: [
				-w / 2 + offsetX + fontSize,
				h / 2 - offsetY - fontSize,
				0
			],
			color,
			characters: "0123456789",
			onUpdate: (self) => {
				self.updateMatrix();
				matriceCount.value -= 1;
				self.matrixWorld.copy(self.matrix);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { blending: 1 }), "0"]
		}), hasInstance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			textAlign: "justify",
			matrixAutoUpdate: false,
			ref: fpsInstanceRef,
			font: "data:font/woff;base64,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",
			fontSize: 8,
			position: [
				-w / 2 + offsetX + fontSize,
				h / 2 - offsetY - fontSize * 1.15,
				0
			],
			color: "lightgrey",
			characters: "0123456789",
			onUpdate: (self) => {
				self.updateMatrix();
				matriceCount.value -= 1;
				self.matrixWorld.copy(self.matrix);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { blending: 1 })
		})]
	});
});
var TextsHighHZ = ({ colorBlind, customData, minimal, matrixUpdate }) => {
	const fontSize = 14;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
			colorBlind,
			color: `rgb(${colorsGraph(colorBlind).fps.toString()})`,
			isPerf: true,
			metric: "fps",
			fontSize,
			offsetX: 140,
			round: 0
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
			color: `rgb(${colorsGraph(colorBlind).cpu.toString()})`,
			isPerf: true,
			metric: "cpu",
			fontSize,
			offsetX: 72,
			round: 3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
			color: `rgb(${colorsGraph(colorBlind).gpu.toString()})`,
			isPerf: true,
			metric: "gpu",
			fontSize,
			offsetX: 10,
			round: 3
		}),
		!minimal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				metric: "calls",
				fontSize,
				offsetX: 200,
				round: 0,
				hasInstance: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				metric: "triangles",
				fontSize,
				offsetX: 260,
				round: 0,
				hasInstance: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				isMemory: true,
				metric: "geometries",
				fontSize,
				offsetY: 30,
				offsetX: 0,
				round: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				isMemory: true,
				metric: "textures",
				fontSize,
				offsetY: 30,
				offsetX: 80,
				round: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				isShadersInfo: true,
				metric: "programs",
				fontSize,
				offsetY: 30,
				offsetX: 140,
				round: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				metric: "lines",
				fontSize,
				offsetY: 30,
				offsetX: 200,
				round: 0,
				hasInstance: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				metric: "points",
				fontSize,
				offsetY: 30,
				offsetX: 260,
				round: 0,
				hasInstance: true
			}),
			matrixUpdate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
				isPerf: true,
				metric: "matriceCount",
				fontSize,
				offsetY: 30,
				offsetX: 320,
				round: 0,
				hasInstance: true
			})
		] }) : null,
		customData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextHighHZ, {
			color: `rgb(${colorsGraph(colorBlind).custom.toString()})`,
			customData,
			fontSize,
			offsetY: 0,
			offsetX: minimal ? 200 : 320,
			round: customData.round || 2
		})
	] });
};
//#endregion
//#region node_modules/r3f-perf/dist/components/Graph.mjs
var ChartCurve = ({ colorBlind, minimal, chart = {
	length: 120,
	hz: 60
} }) => {
	const curves = (0, import_react.useMemo)(() => {
		return {
			fps: new Float32Array(chart.length * 3),
			cpu: new Float32Array(chart.length * 3),
			gpu: new Float32Array(chart.length * 3)
		};
	}, [chart]);
	const fpsRef = (0, import_react.useRef)(null);
	const fpsMatRef = (0, import_react.useRef)(null);
	const gpuRef = (0, import_react.useRef)(null);
	const cpuRef = (0, import_react.useRef)(null);
	const dummyVec3 = (0, import_react.useMemo)(() => new Vector3(0, 0, 0), []);
	const updatePoints = (element, factor = 1, ref, viewport) => {
		let maxVal = 0;
		const { width: w, height: h } = viewport;
		const chart2 = getPerf().chart.data[element];
		if (!chart2 || chart2.length === 0) return;
		const padding = minimal ? 2 : 6;
		const paddingTop = minimal ? 12 : 50;
		let len = chart2.length;
		for (let i = 0; i < len; i++) {
			let id = (getPerf().chart.circularId + i + 1) % len;
			if (chart2[id] !== void 0) {
				if (chart2[id] > maxVal) maxVal = chart2[id] * factor;
				dummyVec3.set(padding + i / (len - 1) * (w - padding * 2) - w / 2, Math.min(100, chart2[id]) * factor / 100 * (h - padding * 2 - paddingTop) - h / 2, 0);
				dummyVec3.toArray(ref.attributes.position.array, i * 3);
			}
		}
		ref.attributes.position.needsUpdate = true;
	};
	useFrame(function updateChartCurve({ viewport }) {
		updatePoints("fps", 1, fpsRef.current, viewport);
		if (fpsMatRef.current) fpsMatRef.current.color.set(getPerf().overclockingFps ? colorsGraph(colorBlind).overClock.toString() : `rgb(${colorsGraph(colorBlind).fps.toString()})`);
		updatePoints("gpu", 5, gpuRef.current, viewport);
		updatePoints("cpu", 5, cpuRef.current, viewport);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("line", {
			onUpdate: (self) => {
				self.updateMatrix();
				matriceCount.value -= 1;
				self.matrixWorld.copy(self.matrix);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", {
				ref: fpsRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
					attach: "attributes-position",
					count: chart.length,
					array: curves.fps,
					itemSize: 3,
					usage: DynamicDrawUsage,
					needsUpdate: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				ref: fpsMatRef,
				color: `rgb(${colorsGraph(colorBlind).fps.toString()})`,
				transparent: true,
				opacity: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("line", {
			onUpdate: (self) => {
				self.updateMatrix();
				matriceCount.value -= 1;
				self.matrixWorld.copy(self.matrix);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", {
				ref: gpuRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
					attach: "attributes-position",
					count: chart.length,
					array: curves.gpu,
					itemSize: 3,
					usage: DynamicDrawUsage,
					needsUpdate: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: `rgb(${colorsGraph(colorBlind).gpu.toString()})`,
				transparent: true,
				opacity: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("line", {
			onUpdate: (self) => {
				self.updateMatrix();
				matriceCount.value -= 1;
				self.matrixWorld.copy(self.matrix);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", {
				ref: cpuRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
					attach: "attributes-position",
					count: chart.length,
					array: curves.cpu,
					itemSize: 3,
					usage: DynamicDrawUsage,
					needsUpdate: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: `rgb(${colorsGraph(colorBlind).cpu.toString()})`,
				transparent: true,
				opacity: .5
			})]
		})
	] });
};
var ChartUI = ({ colorBlind, chart, customData, matrixUpdate, showGraph = true, antialias = true, minimal }) => {
	const canvas = (0, import_react.useRef)(void 0);
	const paused = usePerf((state) => state.paused);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Graph, {
		style: {
			display: "flex",
			position: "absolute",
			height: `${minimal ? 37 : showGraph ? 100 : 60}px`,
			minWidth: `${minimal ? "100px" : customData ? "370px" : "310px"}`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			ref: canvas,
			orthographic: true,
			camera: { rotation: [
				0,
				0,
				0
			] },
			dpr: antialias ? [1, 2] : 1,
			gl: {
				antialias: true,
				alpha: true,
				stencil: false,
				depth: false
			},
			onCreated: ({ scene }) => {
				scene.traverse((obj) => {
					obj.matrixWorldAutoUpdate = false;
					obj.matrixAutoUpdate = false;
				});
			},
			flat: true,
			style: {
				marginBottom: `-42px`,
				position: "relative",
				pointerEvents: "none",
				background: "transparent !important",
				height: `${minimal ? 37 : showGraph ? 100 : 60}px`
			},
			children: !paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Renderer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextsHighHZ, {
					customData,
					minimal,
					matrixUpdate
				}),
				showGraph && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCurve, {
					colorBlind,
					minimal,
					chart
				})
			] }) : null
		}), paused && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Graphpc, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseIcon, {}), " PAUSED"] })]
	});
};
var Renderer = () => {
	useFrame(function updateR3FPerf({ gl, scene, camera }) {
		camera.updateMatrix();
		matriceCount.value -= 1;
		camera.matrixWorld.copy(camera.matrix);
		camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
		gl.render(scene, camera);
		matriceWorldCount.value = 0;
		matriceCount.value = 0;
	}, Infinity);
	return null;
};
//#endregion
//#region node_modules/r3f-perf/dist/components/HtmlMinimal.mjs
var import_client = /* @__PURE__ */ __toESM(require_client(), 1);
var HtmlMinimal = (0, import_react.forwardRef)(({ portal, className, children, name, ...props }, ref) => {
	const gl = useThree((state) => state.gl);
	const group = (0, import_react.useRef)(null);
	const rootRef = (0, import_react.useRef)(null);
	const target = (portal == null ? void 0 : portal.current) != null ? portal.current : gl.domElement.parentNode;
	(0, import_react.useLayoutEffect)(() => {
		if (!group.current || !target) return;
		const el = document.createElement("div");
		const root = rootRef.current = (0, import_client.createRoot)(el);
		target.appendChild(el);
		return () => {
			root.unmount();
			rootRef.current = null;
			target.removeChild(el);
		};
	}, [target]);
	(0, import_react.useLayoutEffect)(() => {
		const root = rootRef.current;
		if (!root) return;
		root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className,
			children
		}));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		name,
		...props,
		ref: group
	});
});
//#endregion
//#region node_modules/r3f-perf/dist/helpers/estimateBytesUsed.mjs
function estimateBytesUsed(geometry) {
	let mem = 0;
	for (let name in geometry.attributes) {
		const attr = geometry.getAttribute(name);
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;
	}
	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;
}
//#endregion
//#region node_modules/r3f-perf/dist/components/Program.mjs
var addTextureUniforms = (id, texture) => {
	const repeatType = (wrap) => {
		switch (wrap) {
			case 1e3: return "RepeatWrapping";
			case 1001: return "ClampToEdgeWrapping";
			case 1002: return "MirroredRepeatWrapping";
			default: return "ClampToEdgeWrapping";
		}
	};
	const encodingType = (encoding) => {
		switch (encoding) {
			case 3e3: return "LinearEncoding";
			case 3001: return "sRGBEncoding";
			case 3002: return "RGBEEncoding";
			case 3003: return "LogLuvEncoding";
			case 3004: return "RGBM7Encoding";
			case 3005: return "RGBM16Encoding";
			case 3006: return "RGBDEncoding";
			case 3007: return "GammaEncoding";
			default: return "ClampToEdgeWrapping";
		}
	};
	return {
		name: id,
		url: texture.image.currentSrc,
		encoding: encodingType(texture.encoding),
		wrapT: repeatType(texture.wrapT),
		flipY: texture.flipY.toString()
	};
};
var UniformsGL = ({ program, material, setTexNumber }) => {
	const gl = usePerf((state) => state.gl);
	const [uniforms, set] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (gl) {
			const data = program == null ? void 0 : program.getUniforms();
			let TexCount = 0;
			const format = /* @__PURE__ */ new Map();
			data.seq.forEach((e) => {
				if (!e.id.includes("uTroika") && e.id !== "isOrthographic" && e.id !== "uvTransform" && e.id !== "lightProbe" && e.id !== "projectionMatrix" && e.id !== "viewMatrix" && e.id !== "normalMatrix" && e.id !== "modelMatrix" && e.id !== "modelViewMatrix") {
					let values = [];
					let data2 = { name: e.id };
					if (e.cache) {
						e.cache.forEach((v) => {
							if (typeof v !== "undefined") values.push(v.toString().substring(0, 4));
						});
						data2.value = values.join();
						if (material[e.id] && material[e.id].image) {
							if (material[e.id].image) {
								TexCount++;
								data2.value = addTextureUniforms(e.id, material[e.id]);
							}
						}
						if (!data2.value) data2.value = "empty";
						format.set(e.id, data2);
					}
				}
			});
			if (material.uniforms) Object.keys(material.uniforms).forEach((key) => {
				const uniform = material.uniforms[key];
				if (uniform.value) {
					const { value } = uniform;
					let data2 = { name: key };
					if (key.includes("uTroika")) return;
					if (value.isTexture) {
						TexCount++;
						data2.value = addTextureUniforms(key, value);
					} else {
						let sb = JSON.stringify(value);
						try {
							sb = JSON.stringify(value);
						} catch (_err) {
							sb = value.toString();
						}
						data2.value = sb;
					}
					format.set(key, data2);
				}
			});
			if (TexCount > 0) setTexNumber(TexCount);
			set(format);
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsUL, { children: uniforms && Array.from(uniforms.values()).map((uniform) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeof uniform.value === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			uniform.name,
			" :",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [uniform.value.substring(0, 30), uniform.value.length > 30 ? "..." : ""] })
		] }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [uniform.value.name, ":"] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [Object.keys(uniform.value).map((key) => {
			return key !== "name" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: key === "url" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: uniform.value[key],
				target: "_blank",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: uniform.value[key] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				key,
				": ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: uniform.value[key] })
			] }) }, key) : null;
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramConsole, {
			onClick: () => {
				var _a;
				console.info(material[uniform.value.name] || ((_a = material == null ? void 0 : material.uniforms[uniform.value.name]) == null ? void 0 : _a.value));
			},
			children: [
				"console.info(",
				uniform.value.name,
				");"
			]
		})] })] }) }, uniform.name);
	}) });
};
var DynamicDrawCallInfo = ({ el }) => {
	usePerf((state) => state.log);
	const gl = usePerf((state) => state.gl);
	const getVal = (el2) => {
		if (!gl) return 0;
		const res = Math.round(el2.drawCounts.total / (gl.info.render.triangles + gl.info.render.lines + gl.info.render.points) * 100 * 10) / 10;
		return isFinite(res) && res || 0;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: el.drawCounts.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, {
		style: {
			height: "auto",
			width: "auto",
			margin: "0 4px"
		},
		children: [
			el.drawCounts.type === "Triangle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VercelLogoIcon, { style: { top: "-1px" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLogIcon, { style: { top: "-1px" } }),
			el.drawCounts.total,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [el.drawCounts.type, "s"] }),
			gl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfB, {
				style: {
					bottom: "-10px",
					width: "40px",
					fontWeight: "bold"
				},
				children: [el.visible && !el.material.wireframe ? getVal(el) : 0, "%"]
			})
		]
	}) });
};
var ProgramUI = ({ el }) => {
	const [showProgram, setShowProgram] = (0, import_react.useState)(el.visible);
	const [toggleProgram, set] = (0, import_react.useState)(el.expand);
	const [texNumber, setTexNumber] = (0, import_react.useState)(0);
	const { meshes, program, material } = el;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramGeo, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramHeader, {
		onClick: () => {
			el.expand = !toggleProgram;
			Object.keys(meshes).forEach((key) => {
				const mesh = meshes[key];
				mesh.material.wireframe = false;
			});
			set(!toggleProgram);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				style: { marginRight: "6px" },
				children: toggleProgram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleDownIcon, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleUpIcon, {}) })
			}),
			program && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramTitle, { children: program.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, {
					style: {
						height: "auto",
						width: "auto",
						margin: "0 4px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayersIcon, { style: { top: "-1px" } }),
						Object.keys(meshes).length,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: Object.keys(meshes).length > 1 ? "users" : "user" })
					]
				}),
				texNumber > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, {
					style: {
						height: "auto",
						width: "auto",
						margin: "0 4px"
					},
					children: [
						texNumber > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, { style: { top: "-1px" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, { style: { top: "-1px" } }),
						texNumber,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "tex" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicDrawCallInfo, { el }),
				material.glslVersion === "300 es" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, {
					style: {
						height: "auto",
						width: "auto",
						margin: "0 4px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RocketIcon, { style: { top: "-1px" } }),
						"300",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "es" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, {
							style: {
								bottom: "-10px",
								width: "40px"
							},
							children: "glsl"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleVisible, {
				onPointerEnter: () => {
					Object.keys(meshes).forEach((key) => {
						const mesh = meshes[key];
						mesh.material.wireframe = true;
					});
				},
				onPointerLeave: () => {
					Object.keys(meshes).forEach((key) => {
						const mesh = meshes[key];
						mesh.material.wireframe = false;
					});
				},
				onClick: (e) => {
					e.stopPropagation();
					Object.keys(meshes).forEach((key) => {
						const mesh = meshes[key];
						const invert = !showProgram;
						mesh.visible = invert;
						el.visible = invert;
						setShowProgram(invert);
					});
				},
				children: showProgram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOpenIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeNoneIcon, {})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			maxHeight: toggleProgram ? "9999px" : 0,
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramsULHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonIcon, {}), " Uniforms:"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniformsGL, {
				program,
				material,
				setTexNumber
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramsULHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CubeIcon, {}), " Geometries:"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsUL, { children: meshes && Object.keys(meshes).map((key) => meshes[key] && meshes[key].geometry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramsGeoLi, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [meshes[key].geometry.type, ": "] }), meshes[key].userData && meshes[key].userData.drawCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [meshes[key].userData.drawCount.count, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
					" ",
					meshes[key].userData.drawCount.type,
					"s"
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					Math.round(estimateBytesUsed(meshes[key].geometry) / 1024 * 1e3) / 1e3,
					"Kb",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: " memory used" })
				] })
			] })] }, key)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgramConsole, {
				onClick: () => {
					console.info(material);
				},
				children: [
					"console.info(",
					material.type,
					")"
				]
			})
		]
	})] });
};
var ProgramsUI = () => {
	usePerf((state) => state.triggerProgramsUpdate);
	const programs = usePerf((state) => state.programs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsContainer, { children: programs && Array.from(programs.values()).map((el) => {
		if (!el) return null;
		return el ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramUI, { el }, el.material.uuid) : null;
	}) });
};
//#endregion
//#region node_modules/r3f-perf/dist/components/Perf.mjs
var colorsGraph = (colorBlind) => {
	return {
		overClock: `#ff6eff`,
		fps: colorBlind ? "100, 143, 255" : "238,38,110",
		cpu: colorBlind ? "254, 254, 98" : "66,226,46",
		gpu: colorBlind ? "254,254,254" : "253,151,31",
		custom: colorBlind ? "86,180,233" : "40,255,255"
	};
};
var DynamicUIPerf = ({ showGraph, colorBlind }) => {
	const overclockingFps = usePerf((s) => s.overclockingFps);
	const fpsLimit = usePerf((s) => s.fpsLimit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfB, {
		style: showGraph ? { color: overclockingFps ? colorsGraph(colorBlind).overClock.toString() : `rgb(${colorsGraph(colorBlind).fps})` } : {},
		children: ["FPS ", overclockingFps ? `${fpsLimit}🚀` : ""]
	});
};
var DynamicUI = ({ showGraph, colorBlind, customData, minimal }) => {
	const gl = usePerf((state) => state.gl);
	return gl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfIContainer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightningBoltIcon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, {
				style: showGraph ? { color: `rgb(${colorsGraph(colorBlind).gpu.toString()})` } : {},
				children: "GPU"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfSmallI, { children: "ms" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulerHorizontalIcon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, {
				style: showGraph ? { color: `rgb(${colorsGraph(colorBlind).cpu.toString()})` } : {},
				children: "CPU"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfSmallI, { children: "ms" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LapTimerIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicUIPerf, {
			showGraph,
			colorBlind
		})] }),
		!minimal && gl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignJustifyIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: gl.info.render.calls === 1 ? "call" : "calls" })] }),
		!minimal && gl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VercelLogoIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Triangles" })] }),
		customData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarChartIcon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, {
				style: showGraph ? { color: `rgb(${colorsGraph(colorBlind).custom})` } : {},
				children: customData.name
			}),
			customData.info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfSmallI, { children: customData.info })
		] })
	] }) : null;
};
var PerfUI = ({ showGraph, colorBlind, deepAnalyze, customData, matrixUpdate, openByDefault, minimal }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicUI, {
		showGraph,
		colorBlind,
		customData,
		minimal
	}), !minimal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfThree, {
		matrixUpdate,
		openByDefault,
		deepAnalyze,
		showGraph
	})] });
};
var InfoUI = ({ matrixUpdate }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarginIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Geometries" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Textures" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLogIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "shaders" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinusIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Lines" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Points" })] }),
		matrixUpdate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfI, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfB, { children: "Matrices" })] })
	] });
};
var ToggleEl = ({ tab, title, set }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		className: `${usePerf((s) => s.tab) === tab ? " __perf_toggle_tab_active" : ""}`,
		onClick: () => {
			set(true);
			setPerf({ tab });
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })
	});
};
var PerfThree = ({ openByDefault, showGraph, deepAnalyze, matrixUpdate }) => {
	const [show, set] = import_react.useState(openByDefault);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabContainers, {
		show,
		showGraph,
		matrixUpdate
	}), openByDefault && !deepAnalyze ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleContainer, {
		className: "__perf_toggle",
		children: [
			deepAnalyze && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleEl, {
				tab: "programs",
				title: "Programs",
				set
			}),
			deepAnalyze && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleEl, {
				tab: "infos",
				title: "Infos",
				set
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				onClick: () => {
					set(!show);
				},
				children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleDownIcon, {}), " Minimize"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleUpIcon, {}), " More"] })
			})
		]
	})] });
};
var TabContainers = ({ show, showGraph, matrixUpdate }) => {
	const tab = usePerf((state) => state.tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoUI, { matrixUpdate }), show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerScroll, {
		style: { marginTop: showGraph ? "38px" : 0 },
		children: tab === "programs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramsUI, {})
	}) })] });
};
var Perf = ({ showGraph = true, colorBlind = false, openByDefault = true, className, overClock = false, style, position = "top-right", chart, logsPerSecond, deepAnalyze = false, antialias = true, customData, matrixUpdate, minimal }) => {
	const perfContainerRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfHeadless, {
		logsPerSecond,
		chart,
		overClock,
		deepAnalyze,
		matrixUpdate
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlMinimal, {
		name: "r3f-perf",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PerfS, {
			className: (className ? " ".concat(className) : " ") + ` ${position ? position : ""} ${minimal ? "minimal" : ""}`,
			style: {
				minHeight: minimal ? "37px" : showGraph ? "100px" : "60px",
				...style
			},
			ref: perfContainerRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartUI, {
				perfContainerRef,
				colorBlind,
				chart,
				showGraph,
				antialias,
				customData,
				minimal,
				matrixUpdate
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfUI, {
				colorBlind,
				showGraph,
				deepAnalyze,
				openByDefault,
				customData,
				matrixUpdate,
				minimal
			})]
		})
	})] });
};
//#endregion
export { Perf, PerfHeadless, getCustomData, getPerf, setCustomData, setPerf, usePerf };

//# sourceMappingURL=r3f-perf.js.map