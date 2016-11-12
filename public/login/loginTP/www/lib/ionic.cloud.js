(function (exports) {
'use strict';

/**
 * Initialize the ionic.native Angular module if we're running in ng1.
 * This iterates through the list of registered plugins and dynamically
 * creates Angular 1 services of the form $cordovaSERVICE, ex: $cordovaStatusBar.
 */
function initAngular1(plugins) {
    if (window.angular) {
        var ngModule_1 = window.angular.module('ionic.native', []);
        for (var name in plugins) {
            var serviceName = '$cordova' + name;
            var cls = plugins[name];
            (function (serviceName, cls, name) {
                ngModule_1.service(serviceName, [function () {
                        var funcs = window.angular.copy(cls);
                        funcs.prototype['name'] = name;
                        return funcs;
                    }]);
            })(serviceName, cls, name);
        }
    }
}

function get(obj, path) {
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
        if (!obj) {
            return null;
        }
        obj = obj[path[i]];
    }
    return obj;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var root = createCommonjsModule(function (module, exports) {
"use strict";
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
/* tslint:disable:no-unused-variable */
var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
var freeGlobal = objectTypes[typeof commonjsGlobal] && commonjsGlobal;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
}
});

function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;

var isFunction_1$1 = {
	isFunction: isFunction_2
};

var isArray_1$1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

var isArray = {
	isArray: isArray_1$1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;

var isObject_1$1 = {
	isObject: isObject_2
};

// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1$2 = { e: {} };

var errorObject = {
	errorObject: errorObject_1$2
};

var errorObject_1$1 = errorObject;
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1$1.errorObject.e = e;
        return errorObject_1$1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;


var tryCatch_1$1 = {
	tryCatch: tryCatch_2
};

var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;

var UnsubscriptionError_1$1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

var isArray_1 = isArray;
var isObject_1 = isObject_1$1;
var isFunction_1$3 = isFunction_1$1;
var tryCatch_1 = tryCatch_1$1;
var errorObject_1 = errorObject;
var UnsubscriptionError_1 = UnsubscriptionError_1$1;
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1$3.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;

var Subscription_1$1 = {
	Subscription: Subscription_2
};

var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};

var Observer = {
	empty: empty
};

var root_1$2 = root;
var Symbol = root_1$2.root.Symbol;
var $$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';

var rxSubscriber = {
	$$rxSubscriber: $$rxSubscriber
};

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = isFunction_1$1;
var Subscription_1 = Subscription_1$1;
var Observer_1 = Observer;
var rxSubscriber_1$1 = rxSubscriber;
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1$1.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

var Subscriber_1$1 = {
	Subscriber: Subscriber_2
};

var Subscriber_1 = Subscriber_1$1;
var rxSubscriber_1 = rxSubscriber;
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber();
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;

var toSubscriber_1$1 = {
	toSubscriber: toSubscriber_2
};

var root_1$3 = root;
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var getSymbolObservable_1 = getSymbolObservable;
var $$observable = getSymbolObservable(root_1$3.root);

var observable = {
	getSymbolObservable: getSymbolObservable_1,
	$$observable: $$observable
};

var root_1 = root;
var toSubscriber_1 = toSubscriber_1$1;
var observable_1 = observable;
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     * @method subscribe
     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;

/**
 * @private
 * @param pluginRef
 * @returns {null|*}
 */
var getPlugin = function (pluginRef) {
    return get(window, pluginRef);
};
/**
 * @private
 * @param pluginObj
 * @param method
 */
var pluginWarn = function (pluginObj, method) {
    var pluginName = pluginObj.name, plugin = pluginObj.plugin;
    if (method) {
        console.warn('Native: tried calling ' + pluginName + '.' + method + ', but the ' + pluginName + ' plugin is not installed.');
    }
    else {
        console.warn('Native: tried accessing the ' + pluginName + ' plugin but it\'s not installed.');
    }
    console.warn('Install the ' + pluginName + ' plugin: \'ionic plugin add ' + plugin + '\'');
};
/**
 * @private
 * @param pluginName
 * @param method
 */
var cordovaWarn = function (pluginName, method) {
    if (method) {
        console.warn('Native: tried calling ' + pluginName + '.' + method + ', but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
    }
    else {
        console.warn('Native: tried accessing the ' + pluginName + ' plugin but Cordova is not available. Make sure to include cordova.js or run in a device/simulator');
    }
};
function setIndex(args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    // If the plugin method expects myMethod(success, err, options)
    if (opts.callbackOrder === 'reverse') {
        // Get those arguments in the order [resolve, reject, ...restOfArgs]
        args.unshift(reject);
        args.unshift(resolve);
    }
    else if (opts.callbackStyle === 'node') {
        args.push(function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    }
    else if (opts.callbackStyle === 'object' && opts.successName && opts.errorName) {
        var obj = {};
        obj[opts.successName] = resolve;
        obj[opts.errorName] = reject;
        args.push(obj);
    }
    else if (typeof opts.successIndex !== 'undefined' || typeof opts.errorIndex !== 'undefined') {
        // If we've specified a success/error index
        args.splice(opts.successIndex, 0, resolve);
        // We don't want that the reject cb gets spliced into the position of an optional argument that has not been defined and thus causing non expected behaviour.
        if (opts.errorIndex > args.length) {
            args[opts.errorIndex] = reject; // insert the reject fn at the correct specific index
        }
        else {
            args.splice(opts.errorIndex, 0, reject); // otherwise just splice it into the array
        }
    }
    else {
        // Otherwise, let's tack them on to the end of the argument list
        // which is 90% of cases
        args.push(resolve);
        args.push(reject);
    }
    return args;
}
function callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    // Try to figure out where the success/error callbacks need to be bound
    // to our promise resolve/reject handlers.
    args = setIndex(args, opts, resolve, reject);
    var pluginInstance = getPlugin(pluginObj.pluginRef);
    if (!pluginInstance) {
        // Do this check in here in the case that the Web API for this plugin is available (for example, Geolocation).
        if (!window.cordova) {
            cordovaWarn(pluginObj.name, methodName);
            return {
                error: 'cordova_not_available'
            };
        }
        pluginWarn(pluginObj, methodName);
        return {
            error: 'plugin_not_installed'
        };
    }
    // TODO: Illegal invocation needs window context
    return get(window, pluginObj.pluginRef)[methodName].apply(pluginInstance, args);
}
function getPromise(cb) {
    var tryNativePromise = function () {
        if (window.Promise) {
            return new Promise(function (resolve, reject) {
                cb(resolve, reject);
            });
        }
        else {
            console.error('No Promise support or polyfill found. To enable Ionic Native support, please add the es6-promise polyfill before this script, or run with a library like Angular 1/2 or on a recent browser.');
        }
    };
    if (window.angular) {
        var injector = window.angular.element(document.querySelector('[ng-app]') || document.body).injector();
        if (injector) {
            var $q = injector.get('$q');
            return $q(function (resolve, reject) {
                cb(resolve, reject);
            });
        }
        else {
            console.warn('Angular 1 was detected but $q couldn\'t be retrieved. This is usually when the app is not bootstrapped on the html or body tag. Falling back to native promises which won\'t trigger an automatic digest when promises resolve.');
            return tryNativePromise();
        }
    }
    else {
        return tryNativePromise();
    }
}
function wrapPromise(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    var pluginResult, rej;
    var p = getPromise(function (resolve, reject) {
        pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, resolve, reject);
        rej = reject;
    });
    // Angular throws an error on unhandled rejection, but in this case we have already printed
    // a warning that Cordova is undefined or the plugin is uninstalled, so there is no reason
    // to error
    if (pluginResult && pluginResult.error) {
        p.catch(function () { });
        rej(pluginResult.error);
    }
    return p;
}
function wrapOtherPromise(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    return getPromise(function (resolve, reject) {
        var pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts);
        if (pluginResult && pluginResult.error) {
            reject(pluginResult.error);
        }
        pluginResult.then(resolve).catch(reject);
    });
}
function wrapObservable(pluginObj, methodName, args, opts) {
    if (opts === void 0) { opts = {}; }
    return new Observable_2(function (observer) {
        var pluginResult = callCordovaPlugin(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
        if (pluginResult && pluginResult.error) {
            observer.error(pluginResult.error);
        }
        return function () {
            try {
                if (opts.clearFunction) {
                    if (opts.clearWithArgs) {
                        return get(window, pluginObj.pluginRef)[opts.clearFunction].apply(pluginObj, args);
                    }
                    return get(window, pluginObj.pluginRef)[opts.clearFunction].call(pluginObj, pluginResult);
                }
            }
            catch (e) {
                console.warn('Unable to clear the previous observable watch for', pluginObj.name, methodName);
                console.error(e);
            }
        };
    });
}
function callInstance(pluginObj, methodName, args, opts, resolve, reject) {
    if (opts === void 0) { opts = {}; }
    args = setIndex(args, opts, resolve, reject);
    return pluginObj._objectInstance[methodName].apply(pluginObj._objectInstance, args);
}
function wrapInstance(pluginObj, methodName, opts) {
    if (opts === void 0) { opts = {}; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (opts.sync) {
            // Sync doesn't wrap the plugin with a promise or observable, it returns the result as-is
            return callInstance(pluginObj, methodName, args, opts);
        }
        else if (opts.observable) {
            return new Observable_2(function (observer) {
                var pluginResult = callInstance(pluginObj, methodName, args, opts, observer.next.bind(observer), observer.error.bind(observer));
                return function () {
                    try {
                        if (opts.clearWithArgs) {
                            return pluginObj._objectInstance[opts.clearFunction].apply(pluginObj._objectInstance, args);
                        }
                        return pluginObj._objectInstance[opts.clearFunction].call(pluginObj, pluginResult);
                    }
                    catch (e) {
                        console.warn('Unable to clear the previous observable watch for', pluginObj.name, methodName);
                        console.error(e);
                    }
                };
            });
        }
        else if (opts.otherPromise) {
            return getPromise(function (resolve, reject) {
                var result = callInstance(pluginObj, methodName, args, opts, resolve, reject);
                result.then(resolve, reject);
            });
        }
        else {
            return getPromise(function (resolve, reject) {
                callInstance(pluginObj, methodName, args, opts, resolve, reject);
            });
        }
    };
}
/**
 * Wrap the event with an observable
 * @param event
 * @returns {Observable}
 */
function wrapEventObservable(event) {
    return new Observable_2(function (observer) {
        window.addEventListener(event, observer.next.bind(observer), false);
        return function () { return window.removeEventListener(event, observer.next.bind(observer), false); };
    });
}
/**
 * @private
 * @param pluginObj
 * @param methodName
 * @param opts
 * @returns {function(...[any]): (undefined|*|Observable|*|*)}
 */
var wrap = function (pluginObj, methodName, opts) {
    if (opts === void 0) { opts = {}; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (opts.sync) {
            // Sync doesn't wrap the plugin with a promise or observable, it returns the result as-is
            return callCordovaPlugin(pluginObj, methodName, args, opts);
        }
        else if (opts.observable) {
            return wrapObservable(pluginObj, methodName, args, opts);
        }
        else if (opts.eventObservable && opts.event) {
            return wrapEventObservable(opts.event);
        }
        else if (opts.otherPromise) {
            return wrapOtherPromise(pluginObj, methodName, args, opts);
        }
        else {
            return wrapPromise(pluginObj, methodName, args, opts);
        }
    };
};
/**
 * @private
 *
 * Class decorator specifying Plugin metadata. Required for all plugins.
 *
 * @usage
 * ```typescript
 * @Plugin({
 *  name: 'MyPlugin',
 *  plugin: 'cordova-plugin-myplugin',
 *  pluginRef: 'window.myplugin'
 *  })
 *  export class MyPlugin {
 *
 *    // Plugin wrappers, properties, and functions go here ...
 *
 *  }
 * ```
 */
function Plugin(config) {
    return function (cls) {
        // Add these fields to the class
        for (var k in config) {
            cls[k] = config[k];
        }
        cls['installed'] = function () {
            return !!getPlugin(config.pluginRef);
        };
        return cls;
    };
}
/**
 * @private
 *
 * Wrap a stub function in a call to a Cordova plugin, checking if both Cordova
 * and the required plugin are installed.
 */
function Cordova(opts) {
    if (opts === void 0) { opts = {}; }
    return function (target, methodName, descriptor) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return wrap(this, methodName, opts).apply(this, args);
            }
        };
    };
}
/**
 * @private
 *
 * Wrap an instance method
 */
function CordovaInstance(opts) {
    if (opts === void 0) { opts = {}; }
    return function (target, methodName) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return wrapInstance(this, methodName, opts).apply(this, args);
            }
        };
    };
}
/**
 * @private
 *
 *
 * Before calling the original method, ensure Cordova and the plugin are installed.
 */
function CordovaProperty(target, key, descriptor) {
    var originalMethod = descriptor.get;
    descriptor.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!window.cordova) {
            cordovaWarn(this.name, null);
            return {};
        }
        var pluginObj = this;
        var pluginInstance = getPlugin(pluginObj.pluginRef);
        if (!pluginInstance) {
            pluginWarn(this, key);
            return {};
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
/**
 * @private
 * @param target
 * @param key
 * @param descriptor
 * @constructor
 */
function InstanceProperty(target, key, descriptor) {
    descriptor.get = function () {
        return this._objectInstance[key];
    };
    descriptor.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this._objectInstance[key] = args[0];
    };
    return descriptor;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Action Sheet
 * @description
 * The ActionSheet plugin shows a native list of options the user can choose from.
 *
 * Requires Cordova plugin: `cordova-plugin-actionsheet`. For more info, please see the [ActionSheet plugin docs](https://github.com/EddyVerbruggen/cordova-plugin-actionsheet).
 *
 * @usage
 * ```typescript
 * import { ActionSheet } from 'ionic-native';
 *
 *
 * let buttonLabels = ['Share via Facebook', 'Share via Twitter'];
 * ActionSheet.show({
 *   'title': 'What do you want with this image?',
 *   'buttonLabels': buttonLabels,
 *   'addCancelButtonWithLabel': 'Cancel',
 *   'addDestructiveButtonWithLabel' : 'Delete'
 * }).then((buttonIndex: number) => {
 *   console.log('Button pressed: ' + buttonIndex);
 * });
 * ```
 *
 * @advanced
 * ActionSheet options
 *
 * | Option                        | Type      | Description                                  |
 * |-------------------------------|-----------|----------------------------------------------|
 * | title                         |`string`   | The title for the actionsheet                |
 * | buttonLabels                  |`string[]` | the labels for the buttons. Uses the index x |
 * | androidTheme                  |`number`   | Theme to be used on Android                  |
 * | androidEnableCancelButton     |`boolean`  | Enable a cancel on Android                   |
 * | winphoneEnableCancelButton    |`boolean`  | Enable a cancel on Windows Phone             |
 * | addCancelButtonWithLabel      |`string`   | Add a cancel button with text                |
 * | addDestructiveButtonWithLabel |`string`   | Add a destructive button with text           |
 * | position                      |`number[]` | On an iPad, set the X,Y position             |
 *
 *
 */
var ActionSheet = (function () {
    function ActionSheet() {
    }
    /**
     * Show a native ActionSheet component. See below for options.
     * @param {options} Options See table below
     * @returns {Promise} Returns a Promise that resolves with the index of the
     *   button pressed (1 based, so 1, 2, 3, etc.)
     */
    ActionSheet.show = function (options) { return; };
    /**
     * Progamtically hide the native ActionSheet
     * @returns {Promise} Returns a Promise that resolves when the actionsheet is closed
     */
    ActionSheet.hide = function (options) { return; };
    __decorate([
        Cordova()
    ], ActionSheet, "show", null);
    __decorate([
        Cordova()
    ], ActionSheet, "hide", null);
    ActionSheet = __decorate([
        Plugin({
            plugin: 'cordova-plugin-actionsheet',
            pluginRef: 'plugins.actionsheet',
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-actionsheet',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], ActionSheet);
    return ActionSheet;
}());

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name AdMob
 * @description Plugin for Google Ads, including AdMob / DFP (doubleclick for publisher) and mediations to other Ad networks.
 * @usage
 * Please refer the the plugin's original repository for detailed usage.
 */
var AdMob = (function () {
    function AdMob() {
    }
    // Static Methods
    /**
     *
     * @param adIdOrOptions
     */
    AdMob.createBanner = function (adIdOrOptions) { return; };
    /**
     *
     */
    AdMob.removeBanner = function () { };
    /**
     *
     * @param position
     */
    AdMob.showBanner = function (position) { };
    /**
     *
     * @param x
     * @param y
     */
    AdMob.showBannerAtXY = function (x, y) { };
    /**
     *
     */
    AdMob.hideBanner = function () { };
    /**
     *
     * @param adIdOrOptions
     */
    AdMob.prepareInterstitial = function (adIdOrOptions) { return; };
    /**
     * Show interstitial
     */
    AdMob.showInterstitial = function () { };
    /**
     *
     */
    AdMob.isInterstitialReady = function () { return; };
    /**
     * Prepare a reward video ad
     * @param adIdOrOptions
     */
    AdMob.prepareRewardVideoAd = function (adIdOrOptions) { return; };
    /**
     * Show a reward video ad
     */
    AdMob.showRewardVideoAd = function () { };
    /**
     * Sets the values for configuration and targeting
     * @param options Returns a promise that resolves if the options are set successfully
     */
    AdMob.setOptions = function (options) { return; };
    /**
     * Get user ad settings
     * @returns {Promise<any>} Returns a promise that resolves with the ad settings
     */
    AdMob.getAdSettings = function () { return; };
    // Events
    AdMob.onBannerFailedToReceive = function () { return; };
    AdMob.onBannerReceive = function () { return; };
    AdMob.onBannerPresent = function () { return; };
    AdMob.onBannerLeaveApp = function () { return; };
    AdMob.onBannerDismiss = function () { return; };
    AdMob.onInterstitialFailedToReceive = function () { return; };
    AdMob.onInterstitialReceive = function () { return; };
    AdMob.onInterstitialPresent = function () { return; };
    AdMob.onInterstitialLeaveApp = function () { return; };
    AdMob.onInterstitialDismiss = function () { return; };
    __decorate$1([
        Cordova()
    ], AdMob, "createBanner", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "removeBanner", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "showBanner", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "showBannerAtXY", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "hideBanner", null);
    __decorate$1([
        Cordova()
    ], AdMob, "prepareInterstitial", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "showInterstitial", null);
    __decorate$1([
        Cordova()
    ], AdMob, "isInterstitialReady", null);
    __decorate$1([
        Cordova()
    ], AdMob, "prepareRewardVideoAd", null);
    __decorate$1([
        Cordova({
            sync: true
        })
    ], AdMob, "showRewardVideoAd", null);
    __decorate$1([
        Cordova()
    ], AdMob, "setOptions", null);
    __decorate$1([
        Cordova()
    ], AdMob, "getAdSettings", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onBannerFailedToReceive'
        })
    ], AdMob, "onBannerFailedToReceive", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onBannerReceive'
        })
    ], AdMob, "onBannerReceive", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onBannerPresent'
        })
    ], AdMob, "onBannerPresent", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onBannerLeaveApp'
        })
    ], AdMob, "onBannerLeaveApp", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onBannerDismiss'
        })
    ], AdMob, "onBannerDismiss", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onInterstitialFailedToReceive'
        })
    ], AdMob, "onInterstitialFailedToReceive", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onInterstitialReceive'
        })
    ], AdMob, "onInterstitialReceive", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onInterstitialPresent'
        })
    ], AdMob, "onInterstitialPresent", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onInterstitialLeaveApp'
        })
    ], AdMob, "onInterstitialLeaveApp", null);
    __decorate$1([
        Cordova({
            eventObservable: true,
            event: 'onInterstitialDismiss'
        })
    ], AdMob, "onInterstitialDismiss", null);
    AdMob = __decorate$1([
        Plugin({
            plugin: 'cordova-plugin-admobpro',
            pluginRef: 'AdMob',
            repo: 'https://github.com/floatinghotpot/cordova-admob-pro',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], AdMob);
    return AdMob;
}());

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Android Fingerprint Auth
 * @description
 * This plugin will open a native dialog fragment prompting the user to authenticate using their fingerprint. If the device has a secure lockscreen (pattern, PIN, or password), the user may opt to authenticate using that method as a backup.
 * @usage
 * ```typescript
 * import { AndroidFingerprintAuth } from 'ionic-native';
 *
 * AndroidFingerprintAuth.isAvailable()
 *   .then((result)=> {
 *     if(result.isAvailable){
 *       // it is available
 *
 *       AndroidFingerprintAuth.show({ clientId: "myAppName", clientSecret: "so_encrypted_much_secure_very_secret" })
 *         .then(result => {
 *            if(result.withFingerprint) {
 *              console.log('Successfully authenticated with fingerprint!');
 *            } else if(result.withPassword) {
 *              console.log('Successfully authenticated with backup password!');
 *            } else console.log('Didn\'t authenticate!');
 *         })
 *         .catch(error => console.error(error));
 *
 *     } else {
 *       // fingerprint auth isn't available
 *     }
 *   })
 *   .catch(error => console.error(error));
 * ```
 */
var AndroidFingerprintAuth = (function () {
    function AndroidFingerprintAuth() {
    }
    /**
     * Opens a native dialog fragment to use the device hardware fingerprint scanner to authenticate against fingerprints registered for the device.
     * @param params {any}
     */
    AndroidFingerprintAuth.show = function (params) { return; };
    /**
     * Check if service is available
     */
    AndroidFingerprintAuth.isAvailable = function () { return; };
    __decorate$2([
        Cordova()
    ], AndroidFingerprintAuth, "show", null);
    __decorate$2([
        Cordova()
    ], AndroidFingerprintAuth, "isAvailable", null);
    AndroidFingerprintAuth = __decorate$2([
        Plugin({
            plugin: 'cordova-plugin-android-fingerprint-auth',
            pluginRef: 'FingerprintAuth',
            repo: 'https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth'
        })
    ], AndroidFingerprintAuth);
    return AndroidFingerprintAuth;
}());

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name App Availability
 * @description
 * This plugin allows you to check if an app is installed on the user's device. It requires an URI Scheme (e.g. twitter://) on iOS or a Package Name (e.g com.twitter.android) on Android.
 *
 * Requires Cordova plugin: cordova-plugin-appavailability. For more info, please see the [AppAvailability plugin docs](https://github.com/ohh2ahh/AppAvailability).
 *
 * @usage
 * ```typescript
 * import { AppAvailability } from 'ionic-native';
 *
 *
 * let app;
 *
 * if (device.platform === 'iOS') {
 *   app = 'twitter://';
 * } else if (device.platform === 'Android') {
 *   app = 'com.twitter.android';
 * }
 *
 * AppAvailability.check(app)
 *   .then(
 *     (yes: string) => console.log(app + ' is available'),
 *     (no: string) => console.log(app + ' is NOT available')
 *   );
 * ```
 */
var AppAvailability = (function () {
    function AppAvailability() {
    }
    /**
     * Checks if an app is available on device
     * @param {string} app Package name on android, or URI scheme on iOS
     * @returns {Promise<boolean>}
     */
    AppAvailability.check = function (app) { return; };
    __decorate$3([
        Cordova()
    ], AppAvailability, "check", null);
    AppAvailability = __decorate$3([
        Plugin({
            plugin: 'cordova-plugin-appavailability',
            pluginRef: 'appAvailability',
            repo: 'https://github.com/ohh2ahh/AppAvailability',
            platforms: ['Android', 'iOS']
        })
    ], AppAvailability);
    return AppAvailability;
}());

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name App Rate
 * @description
 * The AppRate plugin makes it easy to prompt the user to rate your app, either now, later, or never.
 *
 * Requires Cordova plugin: cordova-plugin-apprate. For more info, please see the [AppRate plugin docs](https://github.com/pushandplay/cordova-plugin-apprate).
 *
 * @usage
 * ```typescript
 * import { AppRate } from 'ionic-native';
 *
 *  AppRate.preferences.storeAppURL = {
 *    ios: '<my_app_id>',
 *    android: 'market://details?id=<package_name>',
 *  };
 *
 * AppRate.promptForRating();
 * ```
 *
 * @advanced
 *
 * Rating dialog preferences
 *
 * | Option                       | Type       | Default | Description                                                                            |
 * |------------------------------|------------|---------|----------------------------------------------------------------------------------------|
 * | useLanguage                  | `String`   | null    | custom BCP 47 language tag                                                             |
 * | displayAppName               | `String`   | ''      | custom application title                                                               |
 * | promptAgainForEachNewVersion | `Boolean`  | true    | show dialog again when application version will be updated                             |
 * | usesUntilPrompt              | `Integer`  | 3       | count of runs of application before dialog will be displayed                           |
 * | openStoreInApp               | `Boolean`  | false   | leave app or no when application page opened in app store (now supported only for iOS) |
 * | useCustomRateDialog          | `Boolean`  | false   | use custom view for rate dialog                                                        |
 * | callbacks.onButtonClicked    | `Function` | null    | call back function. called when user clicked on rate-dialog buttons                    |
 * | callbacks.onRateDialogShow   | `Function` | null    | call back function. called when rate-dialog showing                                    |
 * | storeAppURL.ios              | `String`   | null    | application id in AppStore                                                             |
 * | storeAppURL.android          | `String`   | null    | application URL in GooglePlay                                                          |
 * | storeAppURL.blackberry       | `String`   | null    | application URL in AppWorld                                                            |
 * | storeAppURL.windows8         | `String`   | null    | application URL in WindowsStore                                                        |
 * | customLocale                 | `Object`   | null    | custom locale object                                                                   |

 */
var AppRate = (function () {
    function AppRate() {
    }
    Object.defineProperty(AppRate, "preferences", {
        /**
         * Configure various settings for the Rating View.
         * See table below for options
         */
        get: function () { return window.AppRate.preferences; },
        enumerable: true,
        configurable: true
    });
    /**
     * Prompts the user for rating
     * @param {boolean} immediately  Show the rating prompt immediately.
     */
    AppRate.promptForRating = function (immediately) { };
    
    __decorate$4([
        CordovaProperty
    ], AppRate, "preferences", null);
    __decorate$4([
        Cordova()
    ], AppRate, "promptForRating", null);
    AppRate = __decorate$4([
        Plugin({
            plugin: 'cordova-plugin-apprate',
            pluginRef: 'AppRate',
            repo: 'https://github.com/pushandplay/cordova-plugin-apprate',
            platforms: ['Android', 'iOS']
        })
    ], AppRate);
    return AppRate;
}());

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name App Version
 * @description
 * Reads the version of your app from the target build settings.
 *
 * Requires Cordova plugin: `cordova-plugin-app-version`. For more info, please see the [Cordova App Version docs](https://github.com/whiteoctober/cordova-plugin-app-version).
 *
 * @usage
 * ```typescript
 * import { AppVersion } from 'ionic-native';
 *
 *
 *  AppVersion.getAppName();
 *  AppVersion.getPackageName();
 *  AppVersion.getVersionCode();
 *  AppVersion.getVersionNumber();
 * ```
 */
var AppVersion = (function () {
    function AppVersion() {
    }
    /**
     * Returns the name of the app
     * @returns {Promise}
     */
    AppVersion.getAppName = function () { return; };
    /**
     * Returns the package name of the app
     * @returns {Promise}
     */
    AppVersion.getPackageName = function () { return; };
    /**
     * Returns the build identifier of the app
     * @returns {Promise}
     */
    AppVersion.getVersionCode = function () { return; };
    /**
     * Returns the version of the app
     * @returns {Promise}
     */
    AppVersion.getVersionNumber = function () { return; };
    __decorate$5([
        Cordova()
    ], AppVersion, "getAppName", null);
    __decorate$5([
        Cordova()
    ], AppVersion, "getPackageName", null);
    __decorate$5([
        Cordova()
    ], AppVersion, "getVersionCode", null);
    __decorate$5([
        Cordova()
    ], AppVersion, "getVersionNumber", null);
    AppVersion = __decorate$5([
        Plugin({
            plugin: 'cordova-plugin-app-version',
            pluginRef: 'cordova.getAppVersion',
            repo: 'https://github.com/whiteoctober/cordova-plugin-app-version',
            platforms: ['Android', 'iOS']
        })
    ], AppVersion);
    return AppVersion;
}());

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Badge
 * @description
 * The essential purpose of badge numbers is to enable an application to inform its users that it has something for them — for example, unread messages — when the application isn’t running in the foreground.
 *
 * Requires Cordova plugin: cordova-plugin-badge. For more info, please see the [Badge plugin docs](https://github.com/katzer/cordova-plugin-badge).
 *
 * @usage
 * ```typescript
 * import { Badge } from 'ionic-native';
 *
 *
 * Badge.set(10);
 * Badge.increase();
 * Badge.clear();
 * ```
 */
var Badge = (function () {
    function Badge() {
    }
    /**
     * Clear the badge of the app icon.
     */
    Badge.clear = function () { return; };
    /**
     * Set the badge of the app icon.
     * @param {number} badgeNumber  The new badge number.
     * @returns {Promise}
     */
    Badge.set = function (badgeNumber) { return; };
    /**
     * Get the badge of the app icon.
     * @returns {Promise}
     */
    Badge.get = function () { return; };
    /**
     * Increase the badge number.
     * @param {number} increaseBy  Count to add to the current badge number
     * @returns {Promise}
     */
    Badge.increase = function (increaseBy) { return; };
    /**
     * Decrease the badge number.
     * @param {number} decreaseBy  Count to subtract from the current badge number
     * @returns {Promise}
     */
    Badge.decrease = function (decreaseBy) { return; };
    /**
     * Determine if the app has permission to show badges.
     */
    Badge.hasPermission = function () { return; };
    /**
     * Register permission to set badge notifications
     * @returns {Promise}
     */
    Badge.registerPermission = function () { return; };
    __decorate$6([
        Cordova()
    ], Badge, "clear", null);
    __decorate$6([
        Cordova()
    ], Badge, "set", null);
    __decorate$6([
        Cordova()
    ], Badge, "get", null);
    __decorate$6([
        Cordova()
    ], Badge, "increase", null);
    __decorate$6([
        Cordova()
    ], Badge, "decrease", null);
    __decorate$6([
        Cordova()
    ], Badge, "hasPermission", null);
    __decorate$6([
        Cordova()
    ], Badge, "registerPermission", null);
    Badge = __decorate$6([
        Plugin({
            plugin: 'cordova-plugin-badge',
            pluginRef: 'cordova.plugins.notification.badge',
            repo: 'https://github.com/katzer/cordova-plugin-badge',
            platforms: ['Android', 'iOS', 'Browser', 'Windows', 'Amazon FireOS', 'Windows Phone 8']
        })
    ], Badge);
    return Badge;
}());

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name BackgroundGeolocation
 * @description
 * This plugin provides foreground and background geolocation with battery-saving "circular region monitoring" and "stop detection". For
 * more detail, please see https://github.com/mauron85/cordova-plugin-background-geolocation
 *
 * @usage
 *
 * ```typescript
 * import { BackgroundGeolocation } from 'ionic-native';
 *
 *
 * // When device is ready :
 * platform.ready().then(() => {
 *     // IMPORTANT: BackgroundGeolocation must be called within app.ts and or before Geolocation. Otherwise the platform will not ask you for background tracking permission.
 *
 *     // BackgroundGeolocation is highly configurable. See platform specific configuration options
 *     let config = {
 *             desiredAccuracy: 10,
 *             stationaryRadius: 20,
 *             distanceFilter: 30,
 *             debug: true, //  enable this hear sounds for background-geolocation life-cycle.
 *             stopOnTerminate: false, // enable this to clear background location settings when the app terminates
 *     };
 *
 *     BackgroundGeolocation.configure((location) => {
         console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          BackgroundGeolocation.finish(); // FOR IOS ONLY

 *      }, (error) => {
 *        console.log('BackgroundGeolocation error');
 *      }, config);
 *
 *     // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
 *     BackgroundGeolocation.start();
 * })
 *
 * // If you wish to turn OFF background-tracking, call the #stop method.
 * BackgroundGeolocation.stop();
 *
 * ```
 */
var BackgroundGeolocation = (function () {
    function BackgroundGeolocation() {
    }
    /**
     * Configure the plugin.
     *
     * @param {Function} Success callback will be called when background location is determined.
     * @param {Function} Fail callback to be executed every time a geolocation error occurs.
     * @param {Object} An object of type Config
     *
     * @return Location object, which tries to mimic w3c Coordinates interface.
     * See http://dev.w3.org/geo/api/spec-source.html#coordinates_interface
     * Callback to be executed every time a geolocation is recorded in the background.
     */
    BackgroundGeolocation.configure = function (callback, errorCallback, options) { return; };
    /**
     * Turn ON the background-geolocation system.
     * The user will be tracked whenever they suspend the app.
     */
    BackgroundGeolocation.start = function () { return; };
    /**
     * Turn OFF background-tracking
     */
    BackgroundGeolocation.stop = function () { return; };
    /**
     * Inform the native plugin that you're finished, the background-task may be completed
     * NOTE: IOS, WP only
     */
    BackgroundGeolocation.finish = function () { };
    /**
     * Force the plugin to enter "moving" or "stationary" state
     * NOTE: IOS, WP only
     */
    BackgroundGeolocation.changePace = function (isMoving) { };
    /**
     * Setup configuration
     */
    BackgroundGeolocation.setConfig = function (options) { return; };
    /**
     * Returns current stationaryLocation if available. null if not
     * NOTE: IOS, WP only
     */
    BackgroundGeolocation.getStationaryLocation = function () { return; };
    /**
     * Add a stationary-region listener. Whenever the devices enters "stationary-mode",
     * your #success callback will be executed with #location param containing #radius of region
     * NOTE: IOS, WP only
     */
    BackgroundGeolocation.onStationary = function () { return; };
    /**
     * Check if location is enabled on the device
     * @returns {Promise<number>} Returns a promise with int argument that takes values 0, 1 (true).
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.isLocationEnabled = function () { return; };
    /**
     * Display app settings to change permissions
     */
    BackgroundGeolocation.showAppSettings = function () { };
    /**
     * Display device location settings
     */
    BackgroundGeolocation.showLocationSettings = function () { };
    /**
     * Method can be used to detect user changes in location services settings.
     * If user enable or disable location services then success callback will be executed.
     * In case or error (SettingNotFoundException) fail callback will be executed.
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.watchLocationMode = function () { return; };
    /**
     * Stop watching for location mode changes.
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.stopWatchingLocationMode = function () { };
    /**
     * Method will return all stored locations.
     * Locations are stored when:
     *  - config.stopOnTerminate is false and main activity was killed
     *    by the system
     *  or
     *  - option.debug is true
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.getLocations = function () { return; };
    /**
     * Delete stored location by given locationId.
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.deleteLocation = function (locationId) { return; };
    /**
     * Delete all stored locations.
     * NOTE: ANDROID only
     */
    BackgroundGeolocation.deleteAllLocations = function () { return; };
    __decorate$7([
        Cordova({
            sync: true
        })
    ], BackgroundGeolocation, "configure", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "start", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "stop", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "finish", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "changePace", null);
    __decorate$7([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], BackgroundGeolocation, "setConfig", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "getStationaryLocation", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "onStationary", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "isLocationEnabled", null);
    __decorate$7([
        Cordova({ sync: true })
    ], BackgroundGeolocation, "showAppSettings", null);
    __decorate$7([
        Cordova({ sync: true })
    ], BackgroundGeolocation, "showLocationSettings", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "watchLocationMode", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "stopWatchingLocationMode", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "getLocations", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "deleteLocation", null);
    __decorate$7([
        Cordova()
    ], BackgroundGeolocation, "deleteAllLocations", null);
    BackgroundGeolocation = __decorate$7([
        Plugin({
            plugin: 'cordova-plugin-mauron85-background-geolocation',
            pluginRef: 'backgroundGeolocation',
            repo: 'https://github.com/mauron85/cordova-plugin-background-geolocation',
            platforms: ['iOS', 'Android', 'Windows Phone 8']
        })
    ], BackgroundGeolocation);
    return BackgroundGeolocation;
}());

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
* @name Background Mode
* @description
* Cordova plugin to prevent the app from going to sleep while in background.
*  Requires Cordova plugin: cordova-plugin-background-mode. For more info about plugin, vist: https://github.com/katzer/cordova-plugin-background-mode#android-customization
*@usage
* ```typescript
* import { BackgroundMode } from 'ionic-native';
*
* BackgroundMode.enable();
* ```
*
* @advanced
*
* Configuration options
*
* | Property | Type      | Description                                                                  |
* |----------|-----------|------------------------------------------------------------------------------|
* | title    | `string`  | Title of the background task. Optional                                       |
* | ticker   | `string`  | The text that scrolls itself on the statusbar. Optional                      |
* | text     | `string`  | Description of the background task. Optional                                 |
* | silent   | `boolean` | If the plugin will display a notification or not. Default is false. Optional |
* | resume   | `boolean` | Bring the app into the foreground if the notification is tapped. Optional    |
*
*/
var BackgroundMode = (function () {
    function BackgroundMode() {
    }
    /**
    * Enable the background mode.
    * Once called, prevents the app from being paused while in background.
    */
    BackgroundMode.enable = function () { };
    /**
    * Disable the background mode.
    * Once the background mode has been disabled, the app will be paused when in background.
    */
    BackgroundMode.disable = function () { };
    /**
    * Checks if background mode is enabled or not.
    * @returns {boolean} returns a true of false if the background mode is enabled.
    */
    BackgroundMode.isEnabled = function () { return; };
    /**
    * Can be used to get the information if the background mode is active.
    * @returns {boolean} returns tru or flase if the background mode is active.
    */
    BackgroundMode.isActive = function () { return; };
    /**
    * Override the default title, ticker and text.
    * Available only for Android platform.
    * @param {Configure} options List of option to configure. See table below
    */
    BackgroundMode.setDefaults = function (options) { };
    /**
    * Modify the displayed information.
    * Available only for Android platform.
    * @param {Configure} options Any options you want to update. See table below.
    */
    BackgroundMode.update = function (options) { };
    /**
    * Sets a callback for a specific event
    * Can be used to get notified or run function when the background mode has been activated, deactivated or failed.
    * @param {string} eventName The name of the event. Available events: activate, deactivate, failure
    */
    BackgroundMode.on = function (eventName, callback) { };
    __decorate$8([
        Cordova({
            sync: true
        })
    ], BackgroundMode, "enable", null);
    __decorate$8([
        Cordova()
    ], BackgroundMode, "disable", null);
    __decorate$8([
        Cordova()
    ], BackgroundMode, "isEnabled", null);
    __decorate$8([
        Cordova()
    ], BackgroundMode, "isActive", null);
    __decorate$8([
        Cordova({
            platforms: ['Android']
        })
    ], BackgroundMode, "setDefaults", null);
    __decorate$8([
        Cordova({
            platforms: ['Android']
        })
    ], BackgroundMode, "update", null);
    __decorate$8([
        Cordova({
            sync: true
        })
    ], BackgroundMode, "on", null);
    BackgroundMode = __decorate$8([
        Plugin({
            plugin: 'cordova-plugin-background-mode',
            pluginRef: 'cordova.plugins.backgroundMode',
            repo: 'https://github.com/katzer/cordova-plugin-background-mode',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], BackgroundMode);
    return BackgroundMode;
}());

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Barcode Scanner
 * @description
 * The Barcode Scanner Plugin opens a camera view and automatically scans a barcode, returning the data back to you.
 *
 * Requires Cordova plugin: `phonegap-plugin-barcodescanner`. For more info, please see the [BarcodeScanner plugin docs](https://github.com/phonegap/phonegap-plugin-barcodescanner).
 *
 * @usage
 * ```typescript
 * import { BarcodeScanner } from 'ionic-native';
 *
 *
 * BarcodeScanner.scan().then((barcodeData) => {
 *  // Success! Barcode data is here
 * }, (err) => {
 * 	// An error occurred
 * });
 * ```
 */
var BarcodeScanner = (function () {
    function BarcodeScanner() {
    }
    /**
     * Open the barcode scanner.
     * @param options {Object} Optional options to pass to the scanner
     * @return Returns a Promise that resolves with scanner data, or rejects with an error.
     */
    BarcodeScanner.scan = function (options) { return; };
    /**
     * Encodes data into a barcode.
     * NOTE: not well supported on Android
     * @param type {string} Type of encoding
     * @param data {any} Data to encode
     */
    BarcodeScanner.encode = function (type, data) { return; };
    /**
     * @private
     */
    BarcodeScanner.Encode = {
        TEXT_TYPE: 'TEXT_TYPE',
        EMAIL_TYPE: 'EMAIL_TYPE',
        PHONE_TYPE: 'PHONE_TYPE',
        SMS_TYPE: 'SMS_TYPE'
    };
    __decorate$9([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], BarcodeScanner, "scan", null);
    __decorate$9([
        Cordova()
    ], BarcodeScanner, "encode", null);
    BarcodeScanner = __decorate$9([
        Plugin({
            plugin: 'phonegap-plugin-barcodescanner',
            pluginRef: 'cordova.plugins.barcodeScanner',
            repo: 'https://github.com/phonegap/phonegap-plugin-barcodescanner',
            platforms: ['Android', 'iOS', 'Windows Phone 8', 'Windows 10', 'Windows 8', 'BlackBerry 10', 'Browser']
        })
    ], BarcodeScanner);
    return BarcodeScanner;
}());

var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Base64 To Gallery
 * @description This plugin allows you to save base64 data as a png image into the device
 * @usage
 * ```typescript
 * import { Base64ToGallery } from 'ionic-native';
 *
 *
 * Base64ToGallery.base64ToGallery(base64Data, 'img_').then(
 *   res => console.log('Saved image to gallery ', res),
 *   err => console.log('Error saving image to gallery ', err)
 * );
 * ```
 */
var Base64ToGallery = (function () {
    function Base64ToGallery() {
    }
    /**
     * Converts a base64 string to an image file in the device gallery
     * @param {string} data The actual base64 string that you want to save
     * @param {any} options (optional) An object with properties: prefix: string, mediaScanner: boolean. Prefix will be prepended to the filename. If true, mediaScanner runs Media Scanner on Android and saves to Camera Roll on iOS; if false, saves to Library folder on iOS.
     * @returns {Promise} returns a promise that resolves when the image is saved.
     */
    Base64ToGallery.base64ToGallery = function (data, options) {
        return;
    };
    __decorate$10([
        Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], Base64ToGallery, "base64ToGallery", null);
    Base64ToGallery = __decorate$10([
        Plugin({
            plugin: 'cordova-base64-to-gallery',
            pluginRef: 'cordova',
            repo: 'https://github.com/Nexxa/cordova-base64-to-gallery',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], Base64ToGallery);
    return Base64ToGallery;
}());

var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Battery Status
 * @description
 * Requires Cordova plugin: cordova-plugin-batterystatus. For more info, please see the [BatteryStatus plugin docs](https://github.com/apache/cordova-plugin-battery-status).
 *
 * @usage
 * ```typescript
 * import { BatteryStatus } from 'ionic-native';
 *
 *
 * // watch change in battery status
 * let subscription = BatteryStatus.onChange().subscribe(
 *  (status: StatusObject) => {
 *    console.log(status.level, status.isPlugged);
 *  }
 * );
 *
 * // stop watch
 * subscription.unsubscribe();
 *
 * ```
 */
var BatteryStatus = (function () {
    function BatteryStatus() {
    }
    /**
     * Watch the change in battery level
     * @returns {Observable} Returns an observable that pushes a status object
     */
    BatteryStatus.onChange = function () { return; };
    /**
     * Watch when the battery level goes low
     * @returns {Observable<StatusObject>} Returns an observable that pushes a status object
     */
    BatteryStatus.onLow = function () { return; };
    /**
     * Watch when the battery level goes to critial
     * @returns {Observable<StatusObject>} Returns an observable that pushes a status object
     */
    BatteryStatus.onCritical = function () { return; };
    __decorate$11([
        Cordova({
            eventObservable: true,
            event: 'batterystatus'
        })
    ], BatteryStatus, "onChange", null);
    __decorate$11([
        Cordova({
            eventObservable: true,
            event: 'batterylow'
        })
    ], BatteryStatus, "onLow", null);
    __decorate$11([
        Cordova({
            eventObservable: true,
            event: 'batterycritical'
        })
    ], BatteryStatus, "onCritical", null);
    BatteryStatus = __decorate$11([
        Plugin({
            plugin: 'cordova-plugin-battery-status',
            repo: 'https://github.com/apache/cordova-plugin-battery-status',
            platforms: ['Amazon Fire OS', 'iOS', 'Android', 'BlackBerry 10', 'Windows Phone 7', 'Windows Phone 8', 'Windows', 'Firefox OS', 'Browser']
        })
    ], BatteryStatus);
    return BatteryStatus;
}());

var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Brightness
 * @description
 * The Brightness plugin let you control the display brightness of your device.
 *
 * Requires Cordova plugin: `cordova-plugin-brightness`. For more info, please see the [Brightness plugin docs](https://github.com/mgcrea/cordova-plugin-brightness).
 *
 * @usage
 * ```typescript
 * import { Brightness } from 'ionic-native';
 *
 *
 * let brightnessValue: number = 0.8;
 * Brightness.setBrightness(brightnessValue);
 * ```
 *
 */
var Brightness = (function () {
    function Brightness() {
    }
    /**
     * Sets the brightness of the display.
     *
     * @param {value} Floating number between 0 and 1 in which case 1 means 100% brightness and 0 means 0% brightness.
     * @returns {Promise} Returns a Promise that resolves if setting brightness was successful.
     */
    Brightness.setBrightness = function (value) { return; };
    /**
     * Reads the current brightness of the device display.
     *
     * @returns {Promise} Returns a Promise that resolves with the
     * brightness value of the device display (floating number between 0 and 1).
     */
    Brightness.getBrightness = function () { return; };
    /**
    * Keeps the screen on. Prevents the device from setting the screen to sleep.
    */
    Brightness.setKeepScreenOn = function (value) { };
    __decorate$12([
        Cordova()
    ], Brightness, "setBrightness", null);
    __decorate$12([
        Cordova()
    ], Brightness, "getBrightness", null);
    __decorate$12([
        Cordova()
    ], Brightness, "setKeepScreenOn", null);
    Brightness = __decorate$12([
        Plugin({
            plugin: 'cordova-plugin-brightness',
            pluginRef: 'cordova.plugins.brightness',
            repo: 'https://github.com/mgcrea/cordova-plugin-brightness',
            platforms: ['Android', 'iOS']
        })
    ], Brightness);
    return Brightness;
}());

var __decorate$13 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name BLE
 * @description
 * This plugin enables communication between a phone and Bluetooth Low Energy (BLE) peripherals.
 *
 * The plugin provides a simple JavaScript API for iOS and Android.
 *
 * - Scan for peripherals
 * - Connect to a peripheral
 * - Read the value of a characteristic
 * - Write new value to a characteristic
 * - Get notified when characteristic's value changes
 *
 * Advertising information is returned when scanning for peripherals. Service, characteristic, and property info is returned when connecting to a peripheral. All access is via service and characteristic UUIDs. The plugin manages handles internally.
 *
 * Simultaneous connections to multiple peripherals are supported.
 *
 * @usage
 *
 * ## Peripheral Data
 *
 * Peripheral Data is passed to the success callback when scanning and connecting. Limited data is passed when scanning.
 *
 * ```typescript
 *   {
 *       "name": "Battery Demo",
 *       "id": "20:FF:D0:FF:D1:C0",
 *       "advertising": [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
 *       "rssi": -55
 *   }
 * ```
 * After connecting, the peripheral object also includes service, characteristic and descriptor information.
 *
 * ```typescript
 *   {
 *       "name": "Battery Demo",
 *       "id": "20:FF:D0:FF:D1:C0",
 *       "advertising": [2,1,6,3,3,15,24,8,9,66,97,116,116,101,114,121],
 *       "rssi": -55,
 *       "services": [
 *           "1800",
 *           "1801",
 *           "180f"
 *       ],
 *       "characteristics": [
 *           {
 *               "service": "1800",
 *               "characteristic": "2a00",
 *               "properties": [
 *                   "Read"
 *               ]
 *           },
 *           {
 *               "service": "1800",
 *               "characteristic": "2a01",
 *               "properties": [
 *                   "Read"
 *               ]
 *           },
 *           {
 *               "service": "1801",
 *               "characteristic": "2a05",
 *               "properties": [
 *                   "Read"
 *               ]
 *           },
 *           {
 *               "service": "180f",
 *               "characteristic": "2a19",
 *               "properties": [
 *                   "Read"
 *               ],
 *               "descriptors": [
 *                   {
 *                       "uuid": "2901"
 *                   },
 *                   {
 *                       "uuid": "2904"
 *                   }
 *               ]
 *           }
 *       ]
 *   }
 * ```
 *
 * ## Advertising Data
 * Bluetooth advertising data is returned in when scanning for devices. The format format varies depending on your platform. On Android advertising data will be the raw advertising bytes. iOS does not allow access to raw advertising data, so a dictionary of data is returned.
 *
 * The advertising information for both Android and iOS appears to be a combination of advertising data and scan response data.
 *
 * ### Android
 *
 * ```typescript
 *   {
 *       "name": "demo",
 *       "id": "00:1A:7D:DA:71:13",
 *       "advertising": ArrayBuffer,
 *      "rssi": -37
 *  }
 * ```
 *
 * Convert the advertising info to a Uint8Array for processing. `var adData = new Uint8Array(peripheral.advertising)`
 *
 * ### iOS
 *
 * Note that iOS uses the string value of the constants for the [Advertisement Data Retrieval Keys](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/CBCentralManagerDelegate_Protocol/index.html#//apple_ref/doc/constant_group/Advertisement_Data_Retrieval_Keys). This will likely change in the future.
 *
 * ```typescript
 *   {
 *       "name": "demo",
 *       "id": "D8479A4F-7517-BCD3-91B5-3302B2F81802",
 *       "advertising": {
 *           "kCBAdvDataChannel": 37,
 *           "kCBAdvDataServiceData": {
 *               "FED8": {
 *                   "byteLength": 7 // data not shown
 *               }
 *           },
 *           "kCBAdvDataLocalName": "demo",
 *           "kCBAdvDataServiceUUIDs": ["FED8"],
 *           "kCBAdvDataManufacturerData": {
 *               "byteLength": 7  // data not shown
 *           },
 *           "kCBAdvDataTxPowerLevel": 32,
 *           "kCBAdvDataIsConnectable": true
 *       },
 *       "rssi": -53
 *   }
 * ```
 *
 * ## Typed Arrays
 *
 * This plugin uses typed Arrays or ArrayBuffers for sending and receiving data.
 *
 * This means that you need convert your data to ArrayBuffers before sending and from ArrayBuffers when receiving.
 *
 * ```typescript
 *   // ASCII only
 *   function stringToBytes(string) {
 *      var array = new Uint8Array(string.length);
 *      for (var i = 0, l = string.length; i < l; i++) {
 *          array[i] = string.charCodeAt(i);
 *       }
 *       return array.buffer;
 *   }
 *
 *   // ASCII only
 *   function bytesToString(buffer) {
 *       return String.fromCharCode.apply(null, new Uint8Array(buffer));
 *   }
 * ```
 * You can read more about typed arrays in these articles on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/).
 *
 * ## UUIDs
 *
 * UUIDs are always strings and not numbers. Some 16-bit UUIDs, such as '2220' look like integers, but they're not. (The integer 2220 is 0x8AC in hex.) This isn't a problem with 128 bit UUIDs since they look like strings 82b9e6e1-593a-456f-be9b-9215160ebcac. All 16-bit UUIDs should also be passed to methods as strings.
 *
 */
var BLE = (function () {
    function BLE() {
    }
    /**
     * Scan and discover BLE peripherals for the specified amount of time.
     *
     * @usage
     * ```
     * BLE.scan([], 5).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     * ```
     * @param {string[]} services  List of service UUIDs to discover, or `[]` to find all devices
     * @param {number} seconds  Number of seconds to run discovery
     * @return Returns an Observable that notifies of each peripheral that is discovered during the specified time.
     */
    BLE.scan = function (services, seconds) { return; };
    /**
     * Scan and discover BLE peripherals until `stopScan` is called.
     *
     * @usage
     * ```
     * BLE.startScan([]).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     *
     * setTimeout(() => {
     *   BLE.stopScan();
     * }, 5000);
     * ```
     * @param {string[]} services  List of service UUIDs to discover, or `[]` to find all devices
     * @return Returns an Observable that notifies of each peripheral discovered.
     */
    BLE.startScan = function (services) { return; };
    /**
     * Stop a scan started by `startScan`.
     *
     * @usage
     * ```
     * BLE.startScan([]).subscribe(device => {
     *   console.log(JSON.stringify(device));
     * });
     * setTimeout(() => {
     *   BLE.stopScan().then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @return returns a Promise.
     */
    BLE.stopScan = function () { return; };
    /**
     * Connect to a peripheral.
     * @usage
     * ```
     *   BLE.connect('12:34:56:78:9A:BC').subscribe(peripheralData => {
     *     console.log(peripheralData);
     *   },
     *   peripheralData => {
     *     console.log('disconnected');
     *   });
     * ```
     * @param deviceId {string}  UUID or MAC address of the peripheral
     * @return Returns an Observable that notifies of connect/disconnect.
     */
    BLE.connect = function (deviceId) { return; };
    /**
     * Disconnect from a peripheral.
     * @usage
     * ```
     *   BLE.disconnect('12:34:56:78:9A:BC').then(() => {
     *     console.log('Disconnected');
     *   });
     * ```
     * @param deviceId {string}  UUID or MAC address of the peripheral
     * @return Returns a Promise
     */
    BLE.disconnect = function (deviceId) { return; };
    /**
     * Read the value of a characteristic.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @return Returns a Promise
     */
    BLE.read = function (deviceId, serviceUUID, characteristicUUID) { return; };
    
    /**
     * Write the value of a characteristic.
     * @usage
     * ```
     * // send 1 byte to switch a light on
     * var data = new Uint8Array(1);
     * data[0] = 1;
     * BLE.write(device_id, "FF10", "FF11", data.buffer);
     *
     * // send a 3 byte value with RGB color
     * var data = new Uint8Array(3);
     * data[0] = 0xFF;  // red
     * data[0] = 0x00; // green
     * data[0] = 0xFF; // blue
     * BLE.write(device_id, "ccc0", "ccc1", data.buffer);
     *
     * // send a 32 bit integer
     * var data = new Uint32Array(1);
     * data[0] = counterInput.value;
     * BLE.write(device_id, SERVICE, CHARACTERISTIC, data.buffer);
     *
     * ```
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @param {ArrayBuffer} value  Data to write to the characteristic, as an ArrayBuffer.
     * @return Returns a Promise
     */
    BLE.write = function (deviceId, serviceUUID, characteristicUUID, value) { return; };
    /**
     * Write the value of a characteristic without waiting for confirmation from the peripheral.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @param {ArrayBuffer} value  Data to write to the characteristic, as an ArrayBuffer.
     * @return Returns a Promise
     */
    BLE.writeWithoutResponse = function (deviceId, serviceUUID, characteristicUUID, value) { return; };
    /**
     * Register to be notified when the value of a characteristic changes.
     *
     * @usage
     * ```
     * BLE.startNotification(device_id, "FF10", "FF11").subscribe(buffer => {
     *   console.log(String.fromCharCode.apply(null, new Uint8Array(buffer));
     * });
     * ```
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @return Returns an Observable that notifies of characteristic changes.
     */
    BLE.startNotification = function (deviceId, serviceUUID, characteristicUUID) { return; };
    /**
     * Stop being notified when the value of a characteristic changes.
     *
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @param {string} serviceUUID  UUID of the BLE service
     * @param {string} characteristicUUID  UUID of the BLE characteristic
     * @return Returns a Promise.
     */
    BLE.stopNotification = function (deviceId, serviceUUID, characteristicUUID) { return; };
    /**
     * Report the connection status.
     *
     * @usage
     * ```
     * BLE.isConnected('FFCA0B09-CB1D-4DC0-A1EF-31AFD3EDFB53').then(
     *   () => { console.log('connected'); },
     *   () => { console.log('not connected'); }
     * );
     * ```
     * @param {string} deviceId  UUID or MAC address of the peripheral
     * @return Returns a Promise.
     */
    BLE.isConnected = function (deviceId) { return; };
    /**
     * Report if bluetooth is enabled.
     *
     * @usage
     * ```
     * BLE.isEnabled().then(
     *   () => { console.log('enabled'); },
     *   () => { console.log('not enabled'); }
     * );
     * ```
     * @return Returns a Promise.
     */
    BLE.isEnabled = function () { return; };
    /**
     * Open System Bluetooth settings (Android only).
     *
     * @return Returns a Promise.
     */
    BLE.showBluetoothSettings = function () { return; };
    /**
     * Enable Bluetooth on the device (Android only).
     *
     * @return Returns a Promise.
     */
    BLE.enable = function () { return; };
    __decorate$13([
        Cordova({
            observable: true
        })
    ], BLE, "scan", null);
    __decorate$13([
        Cordova({
            observable: true,
            clearFunction: 'stopScan',
            clearWithArgs: true
        })
    ], BLE, "startScan", null);
    __decorate$13([
        Cordova()
    ], BLE, "stopScan", null);
    __decorate$13([
        Cordova({
            observable: true,
            clearFunction: 'disconnect',
            clearWithArgs: true
        })
    ], BLE, "connect", null);
    __decorate$13([
        Cordova()
    ], BLE, "disconnect", null);
    __decorate$13([
        Cordova()
    ], BLE, "read", null);
    __decorate$13([
        Cordova()
    ], BLE, "write", null);
    __decorate$13([
        Cordova()
    ], BLE, "writeWithoutResponse", null);
    __decorate$13([
        Cordova({
            observable: true,
            clearFunction: 'stopNotification',
            clearWithArgs: true
        })
    ], BLE, "startNotification", null);
    __decorate$13([
        Cordova()
    ], BLE, "stopNotification", null);
    __decorate$13([
        Cordova()
    ], BLE, "isConnected", null);
    __decorate$13([
        Cordova()
    ], BLE, "isEnabled", null);
    __decorate$13([
        Cordova()
    ], BLE, "showBluetoothSettings", null);
    __decorate$13([
        Cordova()
    ], BLE, "enable", null);
    BLE = __decorate$13([
        Plugin({
            plugin: 'cordova-plugin-ble-central',
            pluginRef: 'ble',
            repo: 'https://github.com/don/cordova-plugin-ble-central',
            platforms: ['iOS', 'Android']
        })
    ], BLE);
    return BLE;
}());

var __decorate$14 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Bluetooth Serial
 * @description This plugin enables serial communication over Bluetooth. It was written for communicating between Android or iOS and an Arduino.
 * @usage
 * ```typescript
 * import { BluetoothSerial } from 'ionic-native';
 *
 *
 * // Write a string
 * BluetoothSerial.write("hello world").then(success, failure);
 *
 * // Array of int or bytes
 * BluetoothSerial.write([186, 220, 222]).then(success, failure);
 *
 * // Typed Array
 * var data = new Uint8Array(4);
 * data[0] = 0x41;
 * data[1] = 0x42;
 * data[2] = 0x43;
 * data[3] = 0x44;
 * BluetoothSerial.write(data).then(success, failure);
 *
 * // Array Buffer
 * BluetoothSerial.write(data.buffer).then(success, failure);
 * ```
 */
var BluetoothSerial = (function () {
    function BluetoothSerial() {
    }
    /**
     * Connect to a Bluetooth device
     * @param {string} macAddress_or_uuid Identifier of the remote device
     * @returns {Observable} Subscribe to connect, unsubscribe to disconnect.
     */
    BluetoothSerial.connect = function (macAddress_or_uuid) { return; };
    /**
     * Connect insecurely to a Bluetooth device
     * @param {string} macAddress Identifier of the remote device
     * @returns {Observable} Subscribe to connect, unsubscribe to disconnect.
     */
    BluetoothSerial.connectInsecure = function (macAddress) { return; };
    /**
     * Writes data to the serial port
     * @param {any} data ArrayBuffer of data
     * @returns {Promise} returns a promise when data has been written
     */
    BluetoothSerial.write = function (data) { return; };
    /**
     * Gets the number of bytes of data available
     * @returns {Promise} returns a promise that contains the available bytes
     */
    BluetoothSerial.available = function () { return; };
    /**
     * Reads data from the buffer
     * @returns {Promise} returns a promise with data from the buffer
     */
    BluetoothSerial.read = function () { return; };
    /**
     * Reads data from the buffer until it reaches a delimiter
     * @param {string} delimiter string that you want to search until
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.readUntil = function (delimiter) { return; };
    /**
     * Subscribe to be notified when data is received
     * @param {string} delimiter the string you want to watch for
     * @returns {Observable} returns an observable.
     */
    BluetoothSerial.subscribe = function (delimiter) { return; };
    /**
     * Subscribe to be notified when data is received
     * @returns {Observable} returns an observable
     */
    BluetoothSerial.subscribeRawData = function () { return; };
    /**
     * Clears data in buffer
     * @returns {Promise} returns a promise when completed
     */
    BluetoothSerial.clear = function () { return; };
    /**
     * Lists bonded devices
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.list = function () { return; };
    /**
     * Reports if bluetooth is enabled
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.isEnabled = function () { return; };
    /**
     * Reports the connection status
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.isConnected = function () { return; };
    /**
     * Reads the RSSI from the connected peripheral
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.readRSSI = function () { return; };
    /**
     * Show the Bluetooth settings on the device
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.showBluetoothSettings = function () { return; };
    /**
     * Enable Bluetooth on the device
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.enable = function () { return; };
    /**
     * Discover unpaired devices
     * @returns {Promise} returns a promise
     */
    BluetoothSerial.discoverUnpaired = function () { return; };
    /**
     * Subscribe to be notified on Bluetooth device discovery. Discovery process must be initiated with the `discoverUnpaired` function.
     * @returns {Observable} Returns an observable
     */
    BluetoothSerial.setDeviceDiscoveredListener = function () { return; };
    /**
     * Sets the human readable device name that is broadcasted to other devices
     * @param {string} newName Desired name of device
     */
    BluetoothSerial.setName = function (newName) { };
    /**
     * Makes the device discoverable by other devices
     * @param {number} discoverableDuration Desired number of seconds device should be discoverable for
     */
    BluetoothSerial.setDiscoverable = function (discoverableDuration) { };
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'disconnect'
        })
    ], BluetoothSerial, "connect", null);
    __decorate$14([
        Cordova({
            platforms: ['Android'],
            observable: true,
            clearFunction: 'disconnect'
        })
    ], BluetoothSerial, "connectInsecure", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "write", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "available", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "read", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "readUntil", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'unsubscribe'
        })
    ], BluetoothSerial, "subscribe", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'unsubscribeRawData'
        })
    ], BluetoothSerial, "subscribeRawData", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "clear", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "list", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "isEnabled", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "isConnected", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "readRSSI", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "showBluetoothSettings", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "enable", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], BluetoothSerial, "discoverUnpaired", null);
    __decorate$14([
        Cordova({
            platforms: ['Android', 'iOS', 'Windows Phone'],
            observable: true,
            clearFunction: 'clearDeviceDiscoveredListener'
        })
    ], BluetoothSerial, "setDeviceDiscoveredListener", null);
    __decorate$14([
        Cordova({
            platforms: ['Android'],
            sync: true
        })
    ], BluetoothSerial, "setName", null);
    __decorate$14([
        Cordova({
            platforms: ['Android'],
            sync: true
        })
    ], BluetoothSerial, "setDiscoverable", null);
    BluetoothSerial = __decorate$14([
        Plugin({
            repo: 'https://github.com/don/BluetoothSerial',
            plugin: 'cordova-plugin-bluetooth-serial',
            pluginRef: 'bluetoothSerial',
            platforms: ['Android', 'iOS', 'Windows Phone', 'Browser']
        })
    ], BluetoothSerial);
    return BluetoothSerial;
}());

var __decorate$15 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Calendar
 * @description
 * This plugin allows you to add events to the Calendar of the mobile device.
 *
 * Requires Cordova plugin: `cordova-plugin-calendar`. For more info, please see the [Calendar plugin docs](https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin).
 *
 *
 * @usage
 * ```
 * import {Calendar} from 'ionic-native';
 *
 *
 *
 * Calendar.createCalendar('MyCalendar').then(
 *   (msg) => { console.log(msg); },
 *   (err) => { console.log(err); }
 * );
 * ```
 *
 */
var Calendar = (function () {
    function Calendar() {
    }
    /**
     * This function checks if we have permission to read/write from/to the calendar.
     * The promise will resolve with `true` when:
     * - You're running on iOS, or
     * - You're targetting API level lower than 23, or
     * - You're using Android < 6, or
     * - You've already granted permission
     *
     * If this returns false, you should call `requestReadWritePermissions` function
     * @returns {Promise<boolean>}
     */
    Calendar.hasReadWritePermission = function () { return; };
    /**
     * Check if we have read permission
     * @returns {Promise<boolean>}
     */
    Calendar.hasReadPermission = function () { return; };
    /**
     * Check if we have write permission
     * @returns {Promise<boolean>}
     */
    Calendar.hasWritePermission = function () { return; };
    /**
     * Request write permission
     * @returns {Promise<any>}
     */
    Calendar.requestWritePermission = function () { return; };
    /**
     * Request read permission
     * @returns {Promise<any>}
     */
    Calendar.requestReadPermission = function () { return; };
    /**
     * Requests read/write permissions
     * @returns {Promise<any>}
     */
    Calendar.requestReadWritePermission = function () { return; };
    /**
     * Create a calendar. (iOS only)
     *
     * @param {string | Object} nameOrOptions  either a string name or a options object. If string, provide the calendar name. IF an object, provide a calendar name as a string and a calendar color in hex format as a string
     * @return {Promise} Returns a Promise
     */
    Calendar.createCalendar = function (nameOrOptions) { return; };
    /**
     * Delete a calendar. (iOS only)
     * @param {string} name  Name of the calendar to delete.
     * @return Returns a Promise
     */
    Calendar.deleteCalendar = function (name) { return; };
    /**
     * Returns the default calendar options.
     *
     * @return Returns an object with the default calendar options:
     *   firstReminderMinutes: 60,
     *   secondReminderMinutes: null,
     *   recurrence: null, // options are: 'daily', 'weekly', 'monthly', 'yearly'
     *   recurrenceInterval: 1, // only used when recurrence is set
     *   recurrenceEndDate: null,
     *   calendarName: null,
     *   calendarId: null,
     *   url: null
     */
    Calendar.getCalendarOptions = function () {
        return {
            firstReminderMinutes: 60,
            secondReminderMinutes: null,
            recurrence: null,
            recurrenceInterval: 1,
            recurrenceEndDate: null,
            calendarName: null,
            calendarId: null,
            url: null
        };
    };
    /**
     * Silently create an event.
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @return Returns a Promise
     */
    Calendar.createEvent = function (title, location, notes, startDate, endDate) { return; };
    /**
     * Silently create an event with additional options.
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {CalendarOptions} [options]  Additional options, see `getCalendarOptions`
     * @return Returns a Promise
     */
    Calendar.createEventWithOptions = function (title, location, notes, startDate, endDate, options) { return; };
    /**
     * Interactively create an event.
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @return Returns a Promise
     */
    Calendar.createEventInteractively = function (title, location, notes, startDate, endDate) { return; };
    /**
     * Interactively create an event with additional options.
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {CalendarOptions} [options]  Additional options, see `getCalendarOptions`
     * @return Returns a Promise
     */
    Calendar.createEventInteractivelyWithOptions = function (title, location, notes, startDate, endDate, options) { return; };
    // deprecated
    // @Cordova()
    // static createEventInNamedCalendar(
    //   title?: string,
    //   location?: string,
    //   notes?: string,
    //   startDate?: Date,
    //   endDate?: Date,
    //   calendarName?: string
    // ) {}
    /**
     * Find an event.
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @return Returns a Promise
     */
    Calendar.findEvent = function (title, location, notes, startDate, endDate) { return; };
    /**
     * Find an event with additional options.
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {CalendarOptions} [options]  Additional options, see `getCalendarOptions`
     * @return Returns a Promise that resolves with the event, or rejects with an error.
     */
    Calendar.findEventWithOptions = function (title, location, notes, startDate, endDate, options) { return; };
    /**
     * Find a list of events within the specified date range. (Android only)
     *
     * @param {Date} [startDate]  The start date
     * @param {Date} [endDate]  The end date
     * @return Returns a Promise that resolves with the list of events, or rejects with an error.
     */
    Calendar.listEventsInRange = function (startDate, endDate) { return; };
    /**
     * Get a list of all calendars.
     * @return A Promise that resolves with the list of calendars, or rejects with an error.
     */
    Calendar.listCalendars = function () { return; };
    /**
     * Get a list of all future events in the specified calendar. (iOS only)
     * @return Returns a Promise that resolves with the list of events, or rejects with an error.
     */
    Calendar.findAllEventsInNamedCalendar = function (calendarName) { return; };
    /**
     * Modify an event. (iOS only)
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {string} [newTitle]  The new event title
     * @param {string} [newLocation]  The new event location
     * @param {string} [newNotes]  The new event notes
     * @param {Date} [newStartDate]  The new event start date
     * @param {Date} [newEndDate]  The new event end date
     * @return Returns a Promise
     */
    Calendar.modifyEvent = function (title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate) { return; };
    /**
     * Modify an event with additional options. (iOS only)
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {string} [newTitle]  The new event title
     * @param {string} [newLocation]  The new event location
     * @param {string} [newNotes]  The new event notes
     * @param {Date} [newStartDate]  The new event start date
     * @param {Date} [newEndDate]  The new event end date
     * @param {CalendarOptions} [options]  Additional options, see `getCalendarOptions`
     * @return Returns a Promise
     */
    Calendar.modifyEventWithOptions = function (title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate, options) { return; };
    /**
     * Delete an event.
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @return Returns a Promise
     */
    Calendar.deleteEvent = function (title, location, notes, startDate, endDate) { return; };
    /**
     * Delete an event from the specified Calendar. (iOS only)
     *
     * @param {string} [title]  The event title
     * @param {string} [location]  The event location
     * @param {string} [notes]  The event notes
     * @param {Date} [startDate]  The event start date
     * @param {Date} [endDate]  The event end date
     * @param {string} calendarName
     * @return Returns a Promise
     */
    Calendar.deleteEventFromNamedCalendar = function (title, location, notes, startDate, endDate, calendarName) { return; };
    /**
     * Open the calendar at the specified date.
     * @param {Date} date The date you want to open the calendar on
     * @return {Promise<any>} Promise returns a promise
     */
    Calendar.openCalendar = function (date) { return; };
    __decorate$15([
        Cordova()
    ], Calendar, "hasReadWritePermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "hasReadPermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "hasWritePermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "requestWritePermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "requestReadPermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "requestReadWritePermission", null);
    __decorate$15([
        Cordova()
    ], Calendar, "createCalendar", null);
    __decorate$15([
        Cordova()
    ], Calendar, "deleteCalendar", null);
    __decorate$15([
        Cordova({
            sync: true
        })
    ], Calendar, "getCalendarOptions", null);
    __decorate$15([
        Cordova()
    ], Calendar, "createEvent", null);
    __decorate$15([
        Cordova()
    ], Calendar, "createEventWithOptions", null);
    __decorate$15([
        Cordova()
    ], Calendar, "createEventInteractively", null);
    __decorate$15([
        Cordova()
    ], Calendar, "createEventInteractivelyWithOptions", null);
    __decorate$15([
        Cordova()
    ], Calendar, "findEvent", null);
    __decorate$15([
        Cordova()
    ], Calendar, "findEventWithOptions", null);
    __decorate$15([
        Cordova()
    ], Calendar, "listEventsInRange", null);
    __decorate$15([
        Cordova()
    ], Calendar, "listCalendars", null);
    __decorate$15([
        Cordova()
    ], Calendar, "findAllEventsInNamedCalendar", null);
    __decorate$15([
        Cordova()
    ], Calendar, "modifyEvent", null);
    __decorate$15([
        Cordova()
    ], Calendar, "modifyEventWithOptions", null);
    __decorate$15([
        Cordova()
    ], Calendar, "deleteEvent", null);
    __decorate$15([
        Cordova()
    ], Calendar, "deleteEventFromNamedCalendar", null);
    __decorate$15([
        Cordova()
    ], Calendar, "openCalendar", null);
    Calendar = __decorate$15([
        Plugin({
            plugin: 'cordova-plugin-calendar',
            pluginRef: 'plugins.calendar',
            repo: 'https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin',
            platforms: ['Android', 'iOS']
        })
    ], Calendar);
    return Calendar;
}());

var __decorate$16 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name CallNumber
 * @description
 * Call a number directly from your Cordova/Ionic application.
 *
 * @usage
 * ```
 * import {CallNumber} from 'ionic-native';
 *
 * CallNumber.callNumber(18001010101, true)
 *   .then(() => console.log('Launched dialer!'))
 *   .catch(() => console.log('Error launching dialer'));
 *
 * ```
 */
var CallNumber = (function () {
    function CallNumber() {
    }
    /**
     * Calls a phone number
     * @param numberToCall {string} The phone number to call as a string
     * @param bypassAppChooser {boolean} Set to true to bypass the app chooser and go directly to dialer
     */
    CallNumber.callNumber = function (numberToCall, bypassAppChooser) {
        return;
    };
    __decorate$16([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], CallNumber, "callNumber", null);
    CallNumber = __decorate$16([
        Plugin({
            plugin: 'call-number',
            pluginRef: 'plugins.CallNumber',
            repo: 'https://github.com/Rohfosho/CordovaCallNumberPlugin',
            platforms: ['iOS', 'Android']
        })
    ], CallNumber);
    return CallNumber;
}());

var __decorate$17 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Camera
 * @description
 * Take a photo or capture video.
 *
 * Requires {@link module:driftyco/ionic-native} and the Cordova plugin: `cordova-plugin-camera`. For more info, please see the [Cordova Camera Plugin Docs](https://github.com/apache/cordova-plugin-camera).
 *
 * @usage
 * ```typescript
 * import { Camera } from 'ionic-native';
 *
 *
 * Camera.getPicture(options).then((imageData) => {
 *  // imageData is either a base64 encoded string or a file URI
 *  // If it's base64:
 *  let base64Image = 'data:image/jpeg;base64,' + imageData;
 * }, (err) => {
 *  // Handle error
 * });
 * ```
 */
var Camera = (function () {
    function Camera() {
    }
    /**
     * Take a picture or video, or load one from the library.
     * @param {CameraOptions?} options Options that you want to pass to the camera. Encoding type, quality, etc. Optional
     * @return {Promise} Returns a Promise that resolves with Base64 encoding of the image data, or the image file URI, depending on cameraOptions, otherwise rejects with an error.
     */
    Camera.getPicture = function (options) { return; };
    /**
     * Remove intermediate image files that are kept in temporary storage after calling camera.getPicture.
     * Applies only when the value of Camera.sourceType equals Camera.PictureSourceType.CAMERA and the Camera.destinationType equals Camera.DestinationType.FILE_URI.
     * @return Returns a Promise
     */
    Camera.cleanup = function () { return; };
    
    /**
     * @private
     * @enum {number}
     */
    Camera.DestinationType = {
        /** Return base64 encoded string. DATA_URL can be very memory intensive and cause app crashes or out of memory errors. Use FILE_URI or NATIVE_URI if possible */
        DATA_URL: 0,
        /** Return file uri (content://media/external/images/media/2 for Android) */
        FILE_URI: 1,
        /** Return native uri (eg. asset-library://... for iOS) */
        NATIVE_URI: 2
    };
    /**
     * @private
     * @enum {number}
     */
    Camera.EncodingType = {
        /** Return JPEG encoded image */
        JPEG: 0,
        /** Return PNG encoded image */
        PNG: 1
    };
    /**
     * @private
     * @enum {number}
     */
    Camera.MediaType = {
        /** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
        PICTURE: 0,
        /** Allow selection of video only, ONLY RETURNS URL */
        VIDEO: 1,
        /** Allow selection from all media types */
        ALLMEDIA: 2
    };
    /**
     * @private
     * @enum {number}
     */
    Camera.PictureSourceType = {
        /** Choose image from picture library (same as SAVEDPHOTOALBUM for Android) */
        PHOTOLIBRARY: 0,
        /** Take picture from camera */
        CAMERA: 1,
        /** Choose image from picture library (same as PHOTOLIBRARY for Android) */
        SAVEDPHOTOALBUM: 2
    };
    /**
     * @private
     * Matches iOS UIPopoverArrowDirection constants to specify arrow location on popover.
     * @enum {number}
     */
    Camera.PopoverArrowDirection = {
        ARROW_UP: 1,
        ARROW_DOWN: 2,
        ARROW_LEFT: 4,
        ARROW_RIGHT: 8,
        ARROW_ANY: 15
    };
    /**
     * @private
     * @enum {number}
     */
    Camera.Direction = {
        /** Use the back-facing camera */
        BACK: 0,
        /** Use the front-facing camera */
        FRONT: 1
    };
    __decorate$17([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Camera, "getPicture", null);
    __decorate$17([
        Cordova({
            platforms: ['iOS']
        })
    ], Camera, "cleanup", null);
    Camera = __decorate$17([
        Plugin({
            plugin: 'cordova-plugin-camera',
            pluginRef: 'navigator.camera',
            repo: 'https://github.com/apache/cordova-plugin-camera',
            platforms: ['Android', 'BlackBerry', 'Browser', 'Firefox', 'FireOS', 'iOS', 'Windows', 'Windows Phone 8', 'Ubuntu']
        })
    ], Camera);
    return Camera;
}());

var __decorate$18 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name CameraPreview
 * @description
 * Showing camera preview in HTML
 *
 * For more info, please see the [Cordova Camera Preview Plugin Docs](https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview).
 *
 * @usage
 * ```
 * import { CameraPreview } from 'ionic-native';
 *
 * // camera options (Size and location)
 * let cameraRect: CameraPreviewRect = {
 *   x: 100,
 *   y: 100,
 *   width: 200,
 *   height: 200
 * };
 *
 *
 * // start camera
 * CameraPreview.startCamera(
 *   cameraRect, // position and size of preview
 *   'front', // default camera
 *   true, // tape to take picture
 *   false, // disable drag
 *   true // send the preview to the back of the screen so we can add overlaying elements
 * );
 *
 * // Set the handler to run every time we take a picture
 * CameraPreview.setOnPictureTakenHandler().subscribe((result) => {
 *   console.log(result);
 *   // do something with the result
 * });
 *
 *
 * // take a picture
 * CameraPreview.takePicture({
 *   maxWidth: 640,
 *   maxHeight: 640
 * });
 *
 * // Switch camera
 * CameraPreview.switchCamera();
 *
 * // set color effect to negative
 * CameraPreview.setColorEffect('negative');
 *
 * // Stop the camera preview
 * CameraPreview.stopCamera();
 *
 * ```
 *
 */
var CameraPreview = (function () {
    function CameraPreview() {
    }
    /**
     * Starts the camera preview instance.
     * @param {CameraPreviewRect} position and size of the preview window - {x: number, y: number, width: number, height: number}
     * @param {string} which camera to use - 'front' | 'back'
     * @param {boolean} enable tap to take picture
     * @param {boolean} enable preview box drag across the screen
     * @param {boolean} send preview box to the back of the webview
     * @param {number} alpha of the preview box
     */
    CameraPreview.startCamera = function (rect, defaultCamera, tapEnabled, dragEnabled, toBack, alpha) { };
    
    /**
     * Stops the camera preview instance.
     */
    CameraPreview.stopCamera = function () { };
    
    /**
     * Take the picture, the parameter size is optional
     * @param {CameraPreviewSize} optional - size of the picture to take
     */
    CameraPreview.takePicture = function (size) { };
    
    /**
     * Register a callback function that receives the original picture and the image captured from the preview box.
     */
    CameraPreview.setOnPictureTakenHandler = function () { return; };
    
    /**
     * Switch from the rear camera and front camera, if available.
     */
    CameraPreview.switchCamera = function () { };
    
    /**
     * Show the camera preview box.
     */
    CameraPreview.show = function () { };
    
    /**
     * Hide the camera preview box.
     */
    CameraPreview.hide = function () { };
    
    /**
     * Set the default mode for the Flash.
     */
    // @Cordova({
    //   sync: true
    // })
    // static setFlashMode(mode: number): void { };
    /**
     * Set camera color effect.
     */
    CameraPreview.setColorEffect = function (effect) { };
    
    /**
     * @private
     * @enum {number}
     */
    CameraPreview.FlashMode = {
        OFF: 0,
        ON: 1,
        AUTO: 2
    };
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "startCamera", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "stopCamera", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "takePicture", null);
    __decorate$18([
        Cordova({
            observable: true
        })
    ], CameraPreview, "setOnPictureTakenHandler", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "switchCamera", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "show", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "hide", null);
    __decorate$18([
        Cordova({
            sync: true
        })
    ], CameraPreview, "setColorEffect", null);
    CameraPreview = __decorate$18([
        Plugin({
            plugin: 'cordova-plugin-camera-preview',
            pluginRef: 'cordova.plugins.camerapreview',
            repo: 'https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview',
            platforms: ['Android', 'iOS']
        })
    ], CameraPreview);
    return CameraPreview;
}());

var __decorate$19 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name CardIO
 * @description
 * @usage
 * ```
 * import { CardIO } from 'ionic-native';
 *
 *
 * CardIO.canScan()
 *   .then(
 *     (res: boolean) => {
 *       if(res){
 *         let options = {
 *           requireExpiry: true,
 *           requireCCV: false,
 *           requirePostalCode: false
 *         };
 *         CardIO.scan(options);
 *       }
 *     }
 *   );
 * ```
 */
var CardIO = (function () {
    function CardIO() {
    }
    /**
     * Check whether card scanning is currently available. (May vary by
     * device, OS version, network connectivity, etc.)
     *
     */
    CardIO.canScan = function () { return; };
    /**
     * Scan a credit card with card.io.
     * @param {CardIOOptions} options Options for configuring the plugin
     */
    CardIO.scan = function (options) { return; };
    /**
     * Retrieve the version of the card.io library. Useful when contacting support.
     */
    CardIO.version = function () { return; };
    __decorate$19([
        Cordova()
    ], CardIO, "canScan", null);
    __decorate$19([
        Cordova()
    ], CardIO, "scan", null);
    __decorate$19([
        Cordova()
    ], CardIO, "version", null);
    CardIO = __decorate$19([
        Plugin({
            plugin: 'https://github.com/card-io/card.io-Cordova-Plugin',
            pluginRef: 'CardIO',
            repo: 'https://github.com/card-io/card.io-Cordova-Plugin',
            platforms: ['iOS', 'Android']
        })
    ], CardIO);
    return CardIO;
}());

var __decorate$20 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Clipboard
 * @description
 * Clipboard management plugin for Cordova that supports iOS, Android, and Windows Phone 8.
 *
 * Requires Cordova plugin: https://github.com/VersoSolutions/CordovaClipboard
 * For more info, please see the [Clipboard plugin docs](https://github.com/VersoSolutions/CordovaClipboard.git).
 *
 * @usage
 * ```typescript
 * import { Clipboard } from 'ionic-native';
 *
 *
 * Clipboard.copy('Hello world');
 *
 * Clipboard.paste().then(
 *    (resolve: string) => {
 *     alert(resolve);
 *     },
 *     (reject: string) => {
 *     alert('Error: ' + reject);
 *     }
 *     );
 * );
 * ```
 */
var Clipboard = (function () {
    function Clipboard() {
    }
    /**
     * Copies the given text
     * @param {string} text Text that gets copied on the system clipboard
     * @returns {Promise<T>} Returns a promise after the text has been copied
     */
    Clipboard.copy = function (text) { return; };
    /**
     * Pastes the text stored in clipboard
     * @returns {Promise<T>} Returns a promise after the text has been pasted
     */
    Clipboard.paste = function () { return; };
    __decorate$20([
        Cordova()
    ], Clipboard, "copy", null);
    __decorate$20([
        Cordova()
    ], Clipboard, "paste", null);
    Clipboard = __decorate$20([
        Plugin({
            plugin: 'https://github.com/VersoSolutions/CordovaClipboard.git',
            pluginRef: 'cordova.plugins.clipboard',
            repo: 'https://github.com/VersoSolutions/CordovaClipboard',
            platforms: ['Amazon Fire OS', 'iOS', 'Android', 'BlackBerry 10', 'Windows Phone 7', 'Windows Phone 8', 'Windows', 'Firefox OS', 'Browser']
        })
    ], Clipboard);
    return Clipboard;
}());

var __decorate$21 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the possible result statuses of the window.codePush.sync operation.
 */
var SyncStatus;
(function (SyncStatus) {
    /**
     * The application is up to date.
     */
    SyncStatus[SyncStatus["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    /**
     * An update is available, it has been downloaded, unzipped and copied to the deployment folder.
     * After the completion of the callback invoked with SyncStatus.UPDATE_INSTALLED, the application will be reloaded with the updated code and resources.
     */
    SyncStatus[SyncStatus["UPDATE_INSTALLED"] = 1] = "UPDATE_INSTALLED";
    /**
     * An optional update is available, but the user declined to install it. The update was not downloaded.
     */
    SyncStatus[SyncStatus["UPDATE_IGNORED"] = 2] = "UPDATE_IGNORED";
    /**
     * An error happened during the sync operation. This might be an error while communicating with the server, downloading or unziping the update.
     * The console logs should contain more information about what happened. No update has been applied in this case.
     */
    SyncStatus[SyncStatus["ERROR"] = 3] = "ERROR";
    /**
     * There is an ongoing sync in progress, so this attempt to sync has been aborted.
     */
    SyncStatus[SyncStatus["IN_PROGRESS"] = 4] = "IN_PROGRESS";
    /**
     * Intermediate status - the plugin is about to check for updates.
     */
    SyncStatus[SyncStatus["CHECKING_FOR_UPDATE"] = 5] = "CHECKING_FOR_UPDATE";
    /**
     * Intermediate status - a user dialog is about to be displayed. This status will be reported only if user interaction is enabled.
     */
    SyncStatus[SyncStatus["AWAITING_USER_ACTION"] = 6] = "AWAITING_USER_ACTION";
    /**
     * Intermediate status - the update package is about to be downloaded.
     */
    SyncStatus[SyncStatus["DOWNLOADING_PACKAGE"] = 7] = "DOWNLOADING_PACKAGE";
    /**
     * Intermediate status - the update package is about to be installed.
     */
    SyncStatus[SyncStatus["INSTALLING_UPDATE"] = 8] = "INSTALLING_UPDATE";
})(SyncStatus || (SyncStatus = {}));
/**
 * Defines the available install modes for updates.
 */
var InstallMode;
(function (InstallMode) {
    /**
     * The update will be applied to the running application immediately. The application will be reloaded with the new content immediately.
     */
    InstallMode[InstallMode["IMMEDIATE"] = 0] = "IMMEDIATE";
    /**
     * The update is downloaded but not installed immediately. The new content will be available the next time the application is started.
     */
    InstallMode[InstallMode["ON_NEXT_RESTART"] = 1] = "ON_NEXT_RESTART";
    /**
     * The udpate is downloaded but not installed immediately. The new content will be available the next time the application is resumed or restarted, whichever event happends first.
     */
    InstallMode[InstallMode["ON_NEXT_RESUME"] = 2] = "ON_NEXT_RESUME";
})(InstallMode || (InstallMode = {}));
/**
 * @name CodePush
 * @description
 * CodePush plugin for Cordova by Microsoft that supports iOS and Android.
 *
 * For more info, please see https://github.com/ksachdeva/ionic2-code-push-example
 *
 * @usage
 * ```typescript
 * import { CodePush } from 'ionic-native';
 *
 * // note - mostly error & completed methods of observable will not fire
 * // as syncStatus will contain the current state of the update
 * CodePush.sync().subscribe((syncStatus) => console.log(syncStatus));
 *
 * const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
 * CodePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
 *
 * ```
 */
var CodePush = (function () {
    function CodePush() {
    }
    /**
     * Get the current package information.
     *
     * @param packageSuccess Callback invoked with the currently deployed package information.
     * @param packageError Optional callback invoked in case of an error.
     */
    CodePush.getCurrentPackage = function () {
        return;
    };
    /**
     * Gets the pending package information, if any. A pending package is one that has been installed but the application still runs the old code.
     * This happends only after a package has been installed using ON_NEXT_RESTART or ON_NEXT_RESUME mode, but the application was not restarted/resumed yet.
     */
    CodePush.getPendingPackage = function () {
        return;
    };
    /**
     * Checks with the CodePush server if an update package is available for download.
     *
     * @param querySuccess Callback invoked in case of a successful response from the server.
     *                     The callback takes one RemotePackage parameter. A non-null package is a valid update.
     *                     A null package means the application is up to date for the current native application version.
     * @param queryError Optional callback invoked in case of an error.
     * @param deploymentKey Optional deployment key that overrides the config.xml setting.
     */
    CodePush.checkForUpdate = function (deploymentKey) {
        return;
    };
    /**
     * Notifies the plugin that the update operation succeeded and that the application is ready.
     * Calling this function is required on the first run after an update. On every subsequent application run, calling this function is a noop.
     * If using sync API, calling this function is not required since sync calls it internally.
     *
     * @param notifySucceeded Optional callback invoked if the plugin was successfully notified.
     * @param notifyFailed Optional callback invoked in case of an error during notifying the plugin.
     */
    CodePush.notifyApplicationReady = function () {
        return;
    };
    /**
     * Reloads the application. If there is a pending update package installed using ON_NEXT_RESTART or ON_NEXT_RESUME modes, the update
     * will be immediately visible to the user. Otherwise, calling this function will simply reload the current version of the application.
     */
    CodePush.restartApplication = function () {
        return;
    };
    /**
     * Convenience method for installing updates in one method call.
     * This method is provided for simplicity, and its behavior can be replicated by using window.codePush.checkForUpdate(), RemotePackage's download() and LocalPackage's install() methods.
     *
     * The algorithm of this method is the following:
     * - Checks for an update on the CodePush server.
     * - If an update is available
     *         - If the update is mandatory and the alertMessage is set in options, the user will be informed that the application will be updated to the latest version.
     *           The update package will then be downloaded and applied.
     *         - If the update is not mandatory and the confirmMessage is set in options, the user will be asked if they want to update to the latest version.
     *           If they decline, the syncCallback will be invoked with SyncStatus.UPDATE_IGNORED.
     *         - Otherwise, the update package will be downloaded and applied with no user interaction.
     * - If no update is available on the server, or if a previously rolled back update is available and the ignoreFailedUpdates is set to true, the syncCallback will be invoked with the SyncStatus.UP_TO_DATE.
     * - If an error occurs during checking for update, downloading or installing it, the syncCallback will be invoked with the SyncStatus.ERROR.
     *
     * @param syncCallback Optional callback to be called with the status of the sync operation.
     * @param syncOptions Optional SyncOptions parameter configuring the behavior of the sync operation.
     * @param downloadProgress Optional callback invoked during the download process. It is called several times with one DownloadProgress parameter.
     *
     */
    CodePush.sync = function (syncOptions, downloadProgress) {
        return;
    };
    __decorate$21([
        Cordova()
    ], CodePush, "getCurrentPackage", null);
    __decorate$21([
        Cordova()
    ], CodePush, "getPendingPackage", null);
    __decorate$21([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], CodePush, "checkForUpdate", null);
    __decorate$21([
        Cordova()
    ], CodePush, "notifyApplicationReady", null);
    __decorate$21([
        Cordova()
    ], CodePush, "restartApplication", null);
    __decorate$21([
        Cordova({
            observable: true,
            successIndex: 0,
            errorIndex: 3 // we don't need this, so we set it to a value higher than # of args
        })
    ], CodePush, "sync", null);
    CodePush = __decorate$21([
        Plugin({
            plugin: 'cordova-plugin-code-push',
            pluginRef: 'codePush',
            repo: 'https://github.com/Microsoft/cordova-plugin-code-push',
            platforms: ['Android', 'iOS']
        })
    ], CodePush);
    return CodePush;
}());

var __decorate$22 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @private
 */
var Contact = (function () {
    function Contact() {
        this._objectInstance = navigator.contacts.create();
    }
    Object.defineProperty(Contact.prototype, "id", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "displayName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "name", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "nickname", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "phoneNumbers", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "emails", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "addresses", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "ims", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "organizations", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "birthday", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "note", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "photos", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "categories", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "urls", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Contact.prototype.clone = function () {
        var newContact = new Contact();
        for (var prop in this) {
            if (prop === 'id')
                return;
            newContact[prop] = this[prop];
        }
        return newContact;
    };
    Contact.prototype.remove = function () { return; };
    Contact.prototype.save = function () { return; };
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "id", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "displayName", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "name", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "nickname", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "phoneNumbers", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "emails", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "addresses", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "ims", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "organizations", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "birthday", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "note", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "photos", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "categories", null);
    __decorate$22([
        InstanceProperty
    ], Contact.prototype, "urls", null);
    __decorate$22([
        CordovaInstance()
    ], Contact.prototype, "remove", null);
    __decorate$22([
        CordovaInstance()
    ], Contact.prototype, "save", null);
    return Contact;
}());
/**
 * @private
 */
var ContactName = (function () {
    function ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix) {
        this._objectInstance = new window.ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix);
    }
    Object.defineProperty(ContactName.prototype, "formatted", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "familyName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "givenName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "middleName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "honorificPrefix", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "honorificSuffix", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "formatted", null);
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "familyName", null);
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "givenName", null);
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "middleName", null);
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "honorificPrefix", null);
    __decorate$22([
        InstanceProperty
    ], ContactName.prototype, "honorificSuffix", null);
    return ContactName;
}());
/**
 * @private
 */
var ContactField = (function () {
    function ContactField(type, value, pref) {
        this._objectInstance = new window.ContactField(type, value, pref);
    }
    Object.defineProperty(ContactField.prototype, "type", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactField.prototype, "value", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactField.prototype, "pref", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate$22([
        InstanceProperty
    ], ContactField.prototype, "type", null);
    __decorate$22([
        InstanceProperty
    ], ContactField.prototype, "value", null);
    __decorate$22([
        InstanceProperty
    ], ContactField.prototype, "pref", null);
    return ContactField;
}());
/**
 * @private
 */
var ContactAddress = (function () {
    function ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
        this._objectInstance = new window.ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country);
    }
    Object.defineProperty(ContactAddress.prototype, "pref", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "type", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "formatted", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "streetAddress", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "locality", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "region", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "postalCode", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "country", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "pref", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "type", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "formatted", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "streetAddress", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "locality", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "region", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "postalCode", null);
    __decorate$22([
        InstanceProperty
    ], ContactAddress.prototype, "country", null);
    return ContactAddress;
}());
/**
 * @private
 */
var ContactOrganization = (function () {
    function ContactOrganization() {
        this._objectInstance = new window.ContactOrganization();
    }
    Object.defineProperty(ContactOrganization.prototype, "pref", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "type", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "name", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "department", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "title", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate$22([
        InstanceProperty
    ], ContactOrganization.prototype, "pref", null);
    __decorate$22([
        InstanceProperty
    ], ContactOrganization.prototype, "type", null);
    __decorate$22([
        InstanceProperty
    ], ContactOrganization.prototype, "name", null);
    __decorate$22([
        InstanceProperty
    ], ContactOrganization.prototype, "department", null);
    __decorate$22([
        InstanceProperty
    ], ContactOrganization.prototype, "title", null);
    return ContactOrganization;
}());
/**
 * @private
 */
var ContactFindOptions = (function () {
    function ContactFindOptions() {
        this._objectInstance = new window.ContactFindOptions();
    }
    Object.defineProperty(ContactFindOptions.prototype, "filter", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "multiple", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "desiredFields", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "hasPhoneNumber", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate$22([
        InstanceProperty
    ], ContactFindOptions.prototype, "filter", null);
    __decorate$22([
        InstanceProperty
    ], ContactFindOptions.prototype, "multiple", null);
    __decorate$22([
        InstanceProperty
    ], ContactFindOptions.prototype, "desiredFields", null);
    __decorate$22([
        InstanceProperty
    ], ContactFindOptions.prototype, "hasPhoneNumber", null);
    return ContactFindOptions;
}());
/**
 * @name Contacts
 * @description
 * Access and manage Contacts on the device.
 *
 * @usage
 *
 * ```typescript
 * import { Contact } from 'ionic-native';
 *
 *
 * let contact = new Contact();
 * contact.displayName = 'Mr. Ionitron';
 * contact.save().then(
 *   () => console.log('Contact saved!', contact),
 *   (error: any) => console.error('Error saving contact.', error)
 * );
 * ```
 *
 *
 */
var Contacts = (function () {
    function Contacts() {
    }
    /**
     * Create a single contact.
     * @return Returns a object Contact
     */
    Contacts.create = function () {
        return new Contact();
    };
    /**
     * Search for contacts in the Contacts list.
     * @param fields {string[]}  Contact fields to be used as a search qualifier.
     *  A zero-length contactFields parameter is invalid and results in ContactError.INVALID_ARGUMENT_ERROR.
     *  A contactFields value of "*" searches all contact fields.
     *
     * @param options {Object} the options to query with:
     *   filter: The search string used to find navigator.contacts. (string) (Default: "")
     *   multiple: Determines if the find operation returns multiple navigator.contacts. (Boolean) (Default: false)
     *   desiredFields: Contact fields to be returned back. If specified, the resulting Contact object only features values for these fields. (DOMString[]) [Optional]
     *   hasPhoneNumber(Android only): Filters the search to only return contacts with a phone number informed. (Boolean) (Default: false)
     *
     * @return Returns a Promise that resolves with the search results (an array of Contact objects)
     */
    Contacts.find = function (fields, options) { return; };
    /**
     * Select a single Contact.
     * @return Returns a Promise that resolves with the selected Contact
     */
    Contacts.pickContact = function () { return; };
    __decorate$22([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Contacts, "find", null);
    __decorate$22([
        Cordova()
    ], Contacts, "pickContact", null);
    Contacts = __decorate$22([
        Plugin({
            plugin: 'cordova-plugin-contacts',
            pluginRef: 'navigator.contacts',
            repo: 'https://github.com/apache/cordova-plugin-contacts'
        })
    ], Contacts);
    return Contacts;
}());

var __decorate$23 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Crop
 * @description Crops images
 * @usage
 * ```
 * import {Crop} from 'ionic-native';
 *
 * ...
 *
 * Crop.crop('path/to/image.jpg', {quality: 75})
 *   .then(
 *     newImage => console.log("new image path is: " + newImage),
 *     error => console.error("Error cropping image", error)
 *   );
 * ```
 */
var Crop = (function () {
    function Crop() {
    }
    /**
     * Crops an image
     * @param pathToImage
     * @param options
     * @return {Promise<string>} Returns a promise that resolves with the new image path, or rejects if failed to crop.
     */
    Crop.crop = function (pathToImage, options) { return; };
    __decorate$23([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Crop, "crop", null);
    Crop = __decorate$23([
        Plugin({
            plugin: 'cordova-plugin-crop',
            pluginRef: 'plugins',
            repo: 'https://github.com/jeduan/cordova-plugin-crop'
        })
    ], Crop);
    return Crop;
}());

var __decorate$24 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Date Picker
 * @description
 * The DatePicker plugin allows the user to fetch date or time using native dialogs.
 *
 * Platforms supported: iOS, Android, Windows
 *
 * Requires Cordova plugin: `cordova-plugin-datepicker`. For more info, please see the [DatePicker plugin docs](https://github.com/VitaliiBlagodir/cordova-plugin-datepicker).
 *
 * @usage
 * ```typescript
 * import { DatePicker } from 'ionic-native';
 *
 *
 * DatePicker.show({
 *   date: new Date(),
 *   mode: 'date'
 * }).then(
 *   date => console.log('Got date: ', date),
 *   err => console.log('Error occurred while getting date: ', err)
 * );
 * ```
 *
 */
var DatePicker = (function () {
    function DatePicker() {
    }
    /**
     * Shows the date and/or time picker dialog(s)
     * @param {DatePickerOptions} options Options for the date picker.
     * @returns {Promise<Date>} Returns a promise that resolves with the picked date and/or time, or rejects with an error.
     */
    DatePicker.show = function (options) { return; };
    __decorate$24([
        Cordova()
    ], DatePicker, "show", null);
    DatePicker = __decorate$24([
        Plugin({
            plugin: 'cordova-plugin-datepicker',
            pluginRef: 'datePicker',
            repo: 'https://github.com/VitaliiBlagodir/cordova-plugin-datepicker'
        })
    ], DatePicker);
    return DatePicker;
}());

var __decorate$25 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name DB Meter
 * @description This plugin defines a global DBMeter object, which permits to get the decibel values from the microphone.
 * @usage
 * ```typescript
 * import { DBMeter } from 'ionic-native';
 *
 *
 * // Start listening
 * let subscription = DBMeter.start().subscribe(
 *   data => console.log(data)
 * );
 *
 * // Check if we are listening
 * DBMeter.isListening().then(
 *   (isListening: boolean) => console.log(isListening)
 * );
 *
 * // Stop listening
 * subscription.unsubscribe();
 *
 * // Delete DBMeter instance from memory
 * DBMeter.delete().then(
 *   () => console.log('Deleted DB Meter instance'),
 *   error => console.log('Error occurred while deleting DB Meter instance')
 * );
 * ```
 */
var DBMeter = (function () {
    function DBMeter() {
    }
    /**
     * Starts listening
     * @return {Observable<string>} Returns an observable. Subscribe to start listening. Unsubscribe to stop listening.
     */
    DBMeter.start = function () { return; };
    /**
     * Stops listening
     * @private
     */
    DBMeter.stop = function () { return; };
    /**
     * Check if the DB Meter is listening
     * @return {Promise<boolean>} Returns a promise that resolves with a boolean that tells us whether the DB meter is listening
     */
    DBMeter.isListening = function () { return; };
    /**
     * Delete the DB Meter instance
     * @return {Promise<any>} Returns a promise that will resolve if the instance has been deleted, and rejects if errors occur.
     */
    DBMeter.delete = function () { return; };
    __decorate$25([
        Cordova({
            observable: true,
            clearFunction: 'stop'
        })
    ], DBMeter, "start", null);
    __decorate$25([
        Cordova()
    ], DBMeter, "stop", null);
    __decorate$25([
        Cordova()
    ], DBMeter, "isListening", null);
    __decorate$25([
        Cordova()
    ], DBMeter, "delete", null);
    DBMeter = __decorate$25([
        Plugin({
            plugin: 'cordova-plugin-dbmeter',
            pluginRef: 'DBMeter',
            repo: 'https://github.com/akofman/cordova-plugin-dbmeter',
            platforms: ['iOS', 'Android']
        })
    ], DBMeter);
    return DBMeter;
}());

var __decorate$26 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Ionic Deeplinks
 * @description This plugin handles deeplinks on iOS and Android for both custom URL scheme links
 * and Universal App Links.
 *
 * @usage
 * ```typescript
 * import { IonicDeeplinks } from 'ionic-native';
 *
 * ```
 */
var Deeplinks = (function () {
    function Deeplinks() {
    }
    /**
     * Define a set of paths to match against incoming deeplinks.
     *
     * @param {paths} Define a set of paths to match against incoming deeplinks.
     * paths takes an object of the form { 'path': data }. If a deeplink
     * matches the path, the resulting path-data pair will be returned in the
     * promise result which you can then use to navigate in the app as you see fit.
     * @returns {Promise} Returns a Promise that resolves when a deeplink comes through, and
     * is rejected if a deeplink comes through that does not match a given path.
     */
    Deeplinks.route = function (paths) { return; };
    /**
     *
     * This is a convenience version of `route` that takes a reference to a NavController
     * from Ionic 2, or a custom class that conforms to this protocol:
     *
     * NavController.push = function(View, Params){}
     *
     * This handler will automatically navigate when a route matches. If you need finer-grained
     * control over the behavior of a matching deeplink, use the plain `route` method.
     *
     * @param {paths} Define a set of paths to match against incoming deeplinks.
     * paths takes an object of the form { 'path': data }. If a deeplink
     * matches the path, the resulting path-data pair will be returned in the
     * promise result which you can then use to navigate in the app as you see fit.
     *
     * @returns {Promise} Returns a Promise that resolves when a deeplink comes through, and
     * is rejected if a deeplink comes through that does not match a given path.
     */
    Deeplinks.routeWithNavController = function (navController, paths) { return; };
    __decorate$26([
        Cordova({
            observable: true
        })
    ], Deeplinks, "route", null);
    __decorate$26([
        Cordova({
            observable: true
        })
    ], Deeplinks, "routeWithNavController", null);
    Deeplinks = __decorate$26([
        Plugin({
            plugin: 'ionic-plugin-deeplinks',
            pluginRef: 'IonicDeeplink',
            repo: 'https://github.com/driftyco/ionic-plugin-deeplinks',
            platforms: ['iOS', 'Android'],
            install: 'ionic plugin add ionic-plugin-deeplinks --variable URL_SCHEME=myapp --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=example.com --variable ANDROID_PATH_PREFIX=/'
        })
    ], Deeplinks);
    return Deeplinks;
}());

var __decorate$27 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Device
 * @description
 * Access information about the underlying device and platform.
 *
 * @usage
 * ```typescript
 * import { Device } from 'ionic-native';
 *
 *
 * console.log('Device UUID is: ' + Device.device.uuid);
 * ```
 */
var Device = (function () {
    function Device() {
    }
    Object.defineProperty(Device, "device", {
        /**
         * Returns the whole device object.
         *
         * @returns {Object} The device object.
         */
        get: function () { return window.device; },
        enumerable: true,
        configurable: true
    });
    __decorate$27([
        CordovaProperty
    ], Device, "device", null);
    Device = __decorate$27([
        Plugin({
            plugin: 'cordova-plugin-device',
            pluginRef: 'device',
            repo: 'https://github.com/apache/cordova-plugin-device'
        })
    ], Device);
    return Device;
}());

var __decorate$28 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DeviceAccounts = (function () {
    function DeviceAccounts() {
    }
    /**
     *  Gets all accounts registered on the Android Device
     */
    DeviceAccounts.get = function () { return; };
    /**
     *  Get all accounts registered on Android device for requested type
     */
    DeviceAccounts.getByType = function (type) { return; };
    /**
     *  Get all emails registered on Android device (accounts with 'com.google' type)
     */
    DeviceAccounts.getEmails = function () { return; };
    /**
     *  Get the first email registered on Android device
     */
    DeviceAccounts.getEmail = function () { return; };
    __decorate$28([
        Cordova()
    ], DeviceAccounts, "get", null);
    __decorate$28([
        Cordova()
    ], DeviceAccounts, "getByType", null);
    __decorate$28([
        Cordova()
    ], DeviceAccounts, "getEmails", null);
    __decorate$28([
        Cordova()
    ], DeviceAccounts, "getEmail", null);
    DeviceAccounts = __decorate$28([
        Plugin({
            plugin: 'https://github.com/loicknuchel/cordova-device-accounts.git',
            pluginRef: 'plugins.DeviceAccounts',
            repo: 'https://github.com/loicknuchel/cordova-device-accounts',
            platforms: ['Android']
        })
    ], DeviceAccounts);
    return DeviceAccounts;
}());

var __decorate$29 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Device Motion
 * @description
 * Requires Cordova plugin: `cordova-plugin-device-motion`. For more info, please see the [Device Motion docs](https://github.com/apache/cordova-plugin-device-motion).
 *
 * @usage
 * ```typescript
 * import { DeviceMotion } from 'ionic-native';
 *
 *
 * // Get the device current acceleration
 * DeviceMotion.getCurrentAcceleration().then(
 *   (acceleration: AccelerationData) => console.log(acceleration),
 *   (error: any) => console.log(error)
 * );
 *
 * // Watch device acceleration
 * var subscription = DeviceMotion.watchAcceleration().subscribe((acceleration: AccelerationData) => {
 *   console.log(acceleration);
 * });
 *
 * // Stop watch
 * subscription.unsubscribe();
 *
 * ```
 */
var DeviceMotion = (function () {
    function DeviceMotion() {
    }
    /**
     * Get the current acceleration along the x, y, and z axes.
     * @returns {Promise<any>} Returns object with x, y, z, and timestamp properties
     */
    DeviceMotion.getCurrentAcceleration = function () { return; };
    /**
     * Watch the device acceleration. Clear the watch by unsubscribing from the observable.
     * @param {AccelerometerOptions} options list of options for the accelerometer.
     * @returns {Observable<AccelerationData>} Observable returns an observable that you can subscribe to
     */
    DeviceMotion.watchAcceleration = function (options) { return; };
    __decorate$29([
        Cordova()
    ], DeviceMotion, "getCurrentAcceleration", null);
    __decorate$29([
        Cordova({
            callbackOrder: 'reverse',
            observable: true,
            clearFunction: 'clearWatch'
        })
    ], DeviceMotion, "watchAcceleration", null);
    DeviceMotion = __decorate$29([
        Plugin({
            plugin: 'cordova-plugin-device-motion',
            pluginRef: 'navigator.accelerometer',
            repo: 'https://github.com/apache/cordova-plugin-device-motion'
        })
    ], DeviceMotion);
    return DeviceMotion;
}());

var __decorate$30 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Device Orientation
 * @description
 * Requires Cordova plugin: `cordova-plugin-device-orientation`. For more info, please see the [Device Orientation docs](https://github.com/apache/cordova-plugin-device-orientation).
 *
 * @usage
 * ```typescript
 * // CompassHeading is an interface for compass
 * import { DeviceOrientation, CompassHeading } from 'ionic-native';
 *
 *
 * // Get the device current compass heading
 * DeviceOrientation.getCurrentHeading().then(
 *   (data: CompassHeading) => console.log(data),
 *   (error: any) => console.log(error)
 * );
 *
 * // Watch the device compass heading change
 * var subscription = DeviceOrientation.watchHeading().subscribe(
 *   (data: CompassHeading) => console.log(data)
 * );
 *
 * // Stop watching heading change
 * subscription.unsubscribe();
 * ```
 */
var DeviceOrientation = (function () {
    function DeviceOrientation() {
    }
    /**
     * Get the current compass heading.
     * @returns {Promise<CompassHeading>}
     */
    DeviceOrientation.getCurrentHeading = function () { return; };
    /**
     * Get the device current heading at a regular interval
     *
     * Stop the watch by unsubscribing from the observable
     * @param {CompassOptions} options Options for compass. Frequency and Filter. Optional
     * @returns {Observable<CompassHeading>} Returns an observable that contains the compass heading
     */
    DeviceOrientation.watchHeading = function (options) { return; };
    __decorate$30([
        Cordova()
    ], DeviceOrientation, "getCurrentHeading", null);
    __decorate$30([
        Cordova({
            callbackOrder: 'reverse',
            observable: true,
            clearFunction: 'clearWatch'
        })
    ], DeviceOrientation, "watchHeading", null);
    DeviceOrientation = __decorate$30([
        Plugin({
            plugin: 'cordova-plugin-device-orientation',
            pluginRef: 'navigator.compass',
            repo: 'https://github.com/apache/cordova-plugin-device-orientation'
        })
    ], DeviceOrientation);
    return DeviceOrientation;
}());

var __decorate$31 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Diagnostic
 * @description
 * Checks whether device hardware features are enabled or available to the app, e.g. camera, GPS, wifi
 *
 * @usage
 * ```typescript
 * import { Diagnostic } from 'ionic-native';
 *
 * let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
 * let errorCallback = (e) => console.error(e);
 *
 * Diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
 *
 * Diagnostic.isBluetoothAvailable().then(successCallback, errorCallback);
 *
 *
 * Diagnostic.getBluetoothState()
 *   .then((state) => {
 *     if (state == Diagnostic.bluetoothStates.POWERED_ON){
 *       // do something
 *     } else {
 *       // do something else
 *     }
 *   }).catch(e => console.error(e));
 *
 * ```
 */
var Diagnostic = (function () {
    function Diagnostic() {
    }
    /**
     * Checks if app is able to access device location.
     * @returns {Promise<any>}
     */
    Diagnostic.isLocationAvailable = function () { return; };
    /**
     * Checks if Wifi is connected/enabled. On iOS this returns true if the device is connected to a network by WiFi. On Android and Windows 10 Mobile this returns true if the WiFi setting is set to enabled.
     * On Android this requires permission. `<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`
     * @returns {Promise<any>}
     */
    Diagnostic.isWifiAvailable = function () { return; };
    /**
     * Checks if the device has a camera. On Android this returns true if the device has a camera. On iOS this returns true if both the device has a camera AND the application is authorized to use it. On Windows 10 Mobile this returns true if both the device has a rear-facing camera AND the
     * application is authorized to use it.
     * @returns {Promise<any>}
     */
    Diagnostic.isCameraAvailable = function () { return; };
    /**
     * Checks if the device has Bluetooth capabilities and if so that Bluetooth is switched on (same on Android, iOS and Windows 10 Mobile)
     * On Android this requires permission <uses-permission android:name="android.permission.BLUETOOTH" />
     * @returns {Promise<any>}
     */
    Diagnostic.isBluetoothAvailable = function () { return; };
    /**
     * Displays the device location settings to allow user to enable location services/change location mode.
     */
    Diagnostic.switchToLocationSettings = function () { };
    /**
     * Displays mobile settings to allow user to enable mobile data.
     */
    Diagnostic.switchToMobileDataSettings = function () { };
    /**
     * Displays Bluetooth settings to allow user to enable Bluetooth.
     */
    Diagnostic.switchToBluetoothSettings = function () { };
    /**
     * Displays WiFi settings to allow user to enable WiFi.
     */
    Diagnostic.switchToWifiSettings = function () { };
    /**
     * Returns true if the WiFi setting is set to enabled, and is the same as `isWifiAvailable()`
     * @returns {Promise<boolean>}
     */
    Diagnostic.isWifiEnabled = function () { return; };
    /**
     * Enables/disables WiFi on the device.
     * Requires `ACCESS_WIFI_STATE` and `CHANGE_WIFI_STATE` permissions on Android
     * @param state {boolean}
     */
    Diagnostic.setWifiState = function (state) { return; };
    /**
     * Enables/disables Bluetooth on the device.
     * Requires `BLUETOOTH` and `BLUETOOTH_ADMIN` permissions on Android
     * @param state {boolean}
     */
    Diagnostic.setBluetoothState = function (state) { return; };
    /**
     * Returns true if the device setting for location is on. On Android this returns true if Location Mode is switched on. On iOS this returns true if Location Services is switched on.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isLocationEnabled = function () { return; };
    /**
     * Checks if the application is authorized to use location.
     * Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @returns {Promise<any>}
     */
    Diagnostic.isLocationAuthorized = function () { return; };
    /**
     * Returns the location authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getLocationAuthorizationStatus = function () { return; };
    /**
     * Returns the location authorization status for the application.
     * Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     *
     * mode - (iOS-only / optional) location authorization mode: "always" or "when_in_use". If not specified, defaults to "when_in_use".
     * @returns {Promise<any>}
     */
    Diagnostic.requestLocationAuthorization = function (mode) { return; };
    /**
     * Checks if camera hardware is present on device.
     * @returns {Promise<any>}
     */
    Diagnostic.isCameraPresent = function () { return; };
    /**
     * Checks if the application is authorized to use the camera.
     * Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.
     * @returns {Promise<any>}
     */
    Diagnostic.isCameraAuthorized = function () { return; };
    /**
     * Returns the camera authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getCameraAuthorizationStatus = function () { return; };
    /**
     * Requests camera authorization for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.requestCameraAuthorization = function () { return; };
    /**
     * Checks if the application is authorized to use the microphone.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isMicrophoneAuthorized = function () { return; };
    /**
     * Returns the microphone authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getMicrophoneAuthorizationStatus = function () { return; };
    /**
     * Requests microphone authorization for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.requestMicrophoneAuthorization = function () { return; };
    /**
     * Checks if the application is authorized to use contacts (address book).
     * @returns {Promise<boolean>}
     */
    Diagnostic.isContactsAuthorized = function () { return; };
    /**
     * Returns the contacts authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getContactsAuthroizationStatus = function () { return; };
    /**
     * Requests contacts authorization for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.requestContactsAuthorization = function () { return; };
    /**
     * Checks if the application is authorized to use the calendar.
     *
     * Notes for Android:
     *   - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.
     *
     * Notes for iOS:
     *   - This relates to Calendar Events (not Calendar Reminders)
     * @returns {Promise<any>}
     */
    Diagnostic.isCalendarAuthorized = function () { return; };
    /**
     * Returns the calendar authorization status for the application.
     *
     * Notes for Android:
     *   - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return `GRANTED` status as permissions are already granted at installation time.
     *
     * Notes for iOS:
     *   - This relates to Calendar Events (not Calendar Reminders)
     *
     * @returns {Promise<any>}
     */
    Diagnostic.getCalendarAuthorizationStatus = function () { return; };
    /**
     * Requests calendar authorization for the application.
     *
     * Notes for iOS:
     *   - Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect and just return the current authorization status.
     *   - This relates to Calendar Events (not Calendar Reminders)
     *
     * Notes for Android:
     *   - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.
     *   - This requests permission for `READ_CALENDAR` run-time permission
     *   - Required permissions must be added to `AndroidManifest.xml` as appropriate - see Android permissions: `READ_CALENDAR`, `WRITE_CALENDAR`
     *
     * @returns {Promise<any>}
     */
    Diagnostic.requestCalendarAuthorization = function () { return; };
    /**
     * Opens settings page for this app.
     * On Android, this opens the "App Info" page in the Settings app.
     * On iOS, this opens the app settings page in the Settings app. This works only on iOS 8+ - iOS 7 and below will invoke the errorCallback.
     * @returns {Promise<any>}
     */
    Diagnostic.switchToSettings = function () { return; };
    /**
     * Returns the state of Bluetooth on the device.
     * @returns {Promise<any>}
     */
    Diagnostic.getBluetoothState = function () { return; };
    /**
     * Registers a function to be called when a change in Bluetooth state occurs.
     * @param handler
     */
    Diagnostic.registerBluetoothStateChangeHandler = function (handler) { };
    /**
     * Registers a function to be called when a change in Location state occurs.
     * @param handler
     */
    Diagnostic.registerLocationStateChangeHandler = function (handler) { };
    /**
     * Checks if high-accuracy locations are available to the app from GPS hardware.
     * Returns true if Location mode is enabled and is set to "Device only" or "High accuracy" AND if the app is authorised to use location.
     * @returns {Promise<any>}
     */
    Diagnostic.isGpsLocationAvailable = function () { return; };
    /**
     * Checks if location mode is set to return high-accuracy locations from GPS hardware.
     *   Returns true if Location mode is enabled and is set to either:
     *   - Device only = GPS hardware only (high accuracy)
     *   - High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
     */
    Diagnostic.isGpsLocationEnabled = function () { return; };
    /**
     * Checks if low-accuracy locations are available to the app from network triangulation/WiFi access points.
     * Returns true if Location mode is enabled and is set to "Battery saving" or "High accuracy" AND if the app is authorised to use location.
     * @returns {Promise<any>}
     */
    Diagnostic.isNetworkLocationAvailable = function () { return; };
    /**
     * Checks if location mode is set to return low-accuracy locations from network triangulation/WiFi access points.
     * Returns true if Location mode is enabled and is set to either:
     *   - Battery saving = network triangulation and Wifi network IDs (low accuracy)
     *   - High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
     * @returns {Promise<any>}
     */
    Diagnostic.isNetworkLocationEnabled = function () { return; };
    /**
     * Returns the current location mode setting for the device.
     * @returns {Promise<any>}
     */
    Diagnostic.getLocationMode = function () { return; };
    /**
     * Returns the current authorisation status for a given permission.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @param permission
     * @returns {Promise<any>}
     */
    Diagnostic.getPermissionAuthorizationStatus = function (permission) { return; };
    /**
     * Returns the current authorisation status for multiple permissions.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @param permissions
     * @returns {Promise<any>}
     */
    Diagnostic.getPermissionsAuthorizationStatus = function (permissions) { return; };
    /**
     * Requests app to be granted authorisation for a runtime permission.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.
     * @param permission
     * @returns {Promise<any>}
     */
    Diagnostic.requestRuntimePermission = function (permission) { return; };
    /**
     * Requests app to be granted authorisation for multiple runtime permissions.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @param permissions
     * @returns {Promise<any>}
     */
    Diagnostic.requestRuntimePermissions = function (permissions) { return; };
    /**
     * Checks if the device setting for Bluetooth is switched on.
     * This requires `BLUETOOTH` permission on Android
     * @returns {Promise<boolean>}
     */
    Diagnostic.isBluetoothEnabled = function () { return; };
    /**
     * Checks if the device has Bluetooth capabilities.
     * @returns {Promise<boolean>}
     */
    Diagnostic.hasBluetoothSupport = function () { return; };
    /**
     * Checks if the device has Bluetooth Low Energy (LE) capabilities.
     * @returns {Promise<boolean>}
     */
    Diagnostic.hasBluetoothLESupport = function () { return; };
    /**
     * Checks if the device supports Bluetooth Low Energy (LE) Peripheral mode.
     * @returns {Promise<boolean>}
     */
    Diagnostic.hasBluetoothLEPeripheralSupport = function () { return; };
    /**
     * Checks if the application is authorized to use the Camera Roll in Photos app.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isCameraRollAuthorized = function () { return; };
    /**
     * Returns the authorization status for the application to use the Camera Roll in Photos app.
     * @returns {Promise<boolean>}
     */
    Diagnostic.getCameraRollAuthorizationStatus = function () { return; };
    /**
     * Requests camera roll authorization for the application.
     * Should only be called if authorization status is NOT_REQUESTED.
     * Calling it when in any other state will have no effect.
     * @returns {Promise<any>}
     */
    Diagnostic.requestCameraRollAuthorization = function () { return; };
    /**
     * Checks if remote (push) notifications are enabled.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isRemoteNotificationsEnabled = function () { return; };
    /**
     * Indicates if the app is registered for remote (push) notifications on the device.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isRegisteredForRemoteNotifications = function () { return; };
    /**
     * Indicates the current setting of notification types for the app in the Settings app.
     * Note: on iOS 8+, if "Allow Notifications" switch is OFF, all types will be returned as disabled.
     * @returns {Promise<any>}
     */
    Diagnostic.getRemoteNotificationTypes = function () { return; };
    /**
     * Checks if the application is authorized to use reminders.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isRemindersAuthorized = function () { return; };
    /**
     * Returns the reminders authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getRemindersAuthorizationStatus = function () { return; };
    /**
     * Requests reminders authorization for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.requestRemindersAuthorization = function () { return; };
    /**
     * Checks if the application is authorized for background refresh.
     * @returns {Promise<boolean>}
     */
    Diagnostic.isBackgroundRefreshAuthorized = function () { return; };
    /**
     * Returns the background refresh authorization status for the application.
     * @returns {Promise<any>}
     */
    Diagnostic.getBackgroundRefreshStatus = function () { return; };
    Diagnostic.permission = {
        READ_CALENDAR: 'READ_CALENDAR',
        WRITE_CALENDAR: 'WRITE_CALENDAR',
        CAMERA: 'CAMERA',
        READ_CONTACTS: 'READ_CONTACTS',
        WRITE_CONTACTS: 'WRITE_CONTACTS',
        GET_ACCOUNTS: 'GET_ACCOUNTS',
        ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION',
        ACCESS_COARSE_LOCATION: 'ACCESS_COARSE_LOCATION',
        RECORD_AUDIO: 'RECORD_AUDIO',
        READ_PHONE_STATE: 'READ_PHONE_STATE',
        CALL_PHONE: 'CALL_PHONE',
        ADD_VOICEMAIL: 'ADD_VOICEMAIL',
        USE_SIP: 'USE_SIP',
        PROCESS_OUTGOING_CALLS: 'PROCESS_OUTGOING_CALLS',
        READ_CALL_LOG: 'READ_CALL_LOG',
        WRITE_CALL_LOG: 'WRITE_CALL_LOG',
        SEND_SMS: 'SEND_SMS',
        RECEIVE_SMS: 'RECEIVE_SMS',
        READ_SMS: 'READ_SMS',
        RECEIVE_WAP_PUSH: 'RECEIVE_WAP_PUSH',
        RECEIVE_MMS: 'RECEIVE_MMS',
        WRITE_EXTERNAL_STORAGE: 'WRITE_EXTERNAL_STORAGE',
        READ_EXTERNAL_STORAGE: 'READ_EXTERNAL_STORAGE',
        BODY_SENSORS: 'BODY_SENSORS'
    };
    Diagnostic.permissionStatus = {
        GRANTED: 'GRANTED',
        GRANTED_WHEN_IN_USE: 'GRANTED_WHEN_IN_USE',
        RESTRICTED: 'RESTRICTED',
        DENIED: 'DENIED',
        DENIED_ALWAYS: 'DENIED_ALWAYS',
        NOT_REQUESTED: 'NOT_REQUESTED'
    };
    Diagnostic.locationAuthorizationMode = {
        ALWAYS: 'ALWAYS',
        WHEN_IN_USE: 'WHEN_IN_USE'
    };
    Diagnostic.permissionGroups = {
        CALENDAR: ['READ_CALENDAR', 'WRITE_CALENDAR'],
        CAMERA: ['CAMERA'],
        CONTACTS: ['READ_CONTACTS', 'WRITE_CONTACTS', 'GET_ACCOUNTS'],
        LOCATION: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
        MICROPHONE: ['RECORD_AUDIO'],
        PHONE: ['READ_PHONE_STATE', 'CALL_PHONE', 'ADD_VOICEMAIL', 'USE_SIP', 'PROCESS_OUTGOING_CALLS', 'READ_CALL_LOG', 'WRITE_CALL_LOG'],
        SENSORS: ['BODY_SENSORS'],
        SMS: ['SEND_SMS', 'RECEIVE_SMS', 'READ_SMS', 'RECEIVE_WAP_PUSH', 'RECEIVE_MMS'],
        STORAGE: ['READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE']
    };
    Diagnostic.locationMode = {
        HIGH_ACCURACY: 'high_accuracy',
        DEVICE_ONLY: 'device_only',
        BATTERY_SAVING: 'battery_saving',
        LOCATION_OFF: 'location_off'
    };
    Diagnostic.bluetoothState = {
        UNKNOWN: 'unknown',
        RESETTING: 'resetting',
        UNSUPPORTED: 'unsupported',
        UNAUTHORIZED: 'unauthorized',
        POWERED_OFF: 'powered_off',
        POWERED_ON: 'powered_on',
        POWERING_OFF: 'powering_off',
        POWERING_ON: 'powering_on'
    };
    __decorate$31([
        Cordova()
    ], Diagnostic, "isLocationAvailable", null);
    __decorate$31([
        Cordova()
    ], Diagnostic, "isWifiAvailable", null);
    __decorate$31([
        Cordova()
    ], Diagnostic, "isCameraAvailable", null);
    __decorate$31([
        Cordova()
    ], Diagnostic, "isBluetoothAvailable", null);
    __decorate$31([
        Cordova({ sync: true, platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "switchToLocationSettings", null);
    __decorate$31([
        Cordova({ sync: true, platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "switchToMobileDataSettings", null);
    __decorate$31([
        Cordova({ sync: true, platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "switchToBluetoothSettings", null);
    __decorate$31([
        Cordova({ sync: true, platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "switchToWifiSettings", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "isWifiEnabled", null);
    __decorate$31([
        Cordova({ callbackOrder: 'reverse', platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "setWifiState", null);
    __decorate$31([
        Cordova({ callbackOrder: 'reverse', platforms: ['Android', 'Windows 10'] })
    ], Diagnostic, "setBluetoothState", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isLocationEnabled", null);
    __decorate$31([
        Cordova()
    ], Diagnostic, "isLocationAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getLocationAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "requestLocationAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isCameraPresent", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isCameraAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getCameraAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "requestCameraAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isMicrophoneAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getMicrophoneAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "requestMicrophoneAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isContactsAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getContactsAuthroizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "requestContactsAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "isCalendarAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getCalendarAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "requestCalendarAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "switchToSettings", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'] })
    ], Diagnostic, "getBluetoothState", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'], sync: true })
    ], Diagnostic, "registerBluetoothStateChangeHandler", null);
    __decorate$31([
        Cordova({ platforms: ['Android', 'iOS'], sync: true })
    ], Diagnostic, "registerLocationStateChangeHandler", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "isGpsLocationAvailable", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "isGpsLocationEnabled", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "isNetworkLocationAvailable", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "isNetworkLocationEnabled", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "getLocationMode", null);
    __decorate$31([
        Cordova({ platforms: ['Android'], callbackOrder: 'reverse' })
    ], Diagnostic, "getPermissionAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android'], callbackOrder: 'reverse' })
    ], Diagnostic, "getPermissionsAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['Android'], callbackOrder: 'reverse' })
    ], Diagnostic, "requestRuntimePermission", null);
    __decorate$31([
        Cordova({ platforms: ['Android'], callbackOrder: 'reverse' })
    ], Diagnostic, "requestRuntimePermissions", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "isBluetoothEnabled", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "hasBluetoothSupport", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "hasBluetoothLESupport", null);
    __decorate$31([
        Cordova({ platforms: ['Android'] })
    ], Diagnostic, "hasBluetoothLEPeripheralSupport", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "isCameraRollAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "getCameraRollAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "requestCameraRollAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "isRemoteNotificationsEnabled", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "isRegisteredForRemoteNotifications", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "getRemoteNotificationTypes", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "isRemindersAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "getRemindersAuthorizationStatus", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "requestRemindersAuthorization", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "isBackgroundRefreshAuthorized", null);
    __decorate$31([
        Cordova({ platforms: ['iOS'] })
    ], Diagnostic, "getBackgroundRefreshStatus", null);
    Diagnostic = __decorate$31([
        Plugin({
            plugin: 'cordova.plugins.diagnostic',
            pluginRef: 'cordova.plugins.diagnostic',
            repo: 'https://github.com/dpa99c/cordova-diagnostic-plugin'
        })
    ], Diagnostic);
    return Diagnostic;
}());

var __decorate$32 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Dialogs
 * @description
 * This plugin gives you ability to access and customize the device native dialogs.
 *
 * Requires Cordova plugin: `cordova-plugin-dialogs`. For more info, please see the [Dialogs plugin docs](https://github.com/apache/cordova-plugin-dialogs).
 *
 * @usage
 * ```typescript
 * import { Dialogs } from 'ionic-native';
 *
 *
 *
 *
 * ```
 */
var Dialogs = (function () {
    function Dialogs() {
    }
    /**
     * Shows a custom alert or dialog box.
     * @param {string} message Dialog message.
     * @param {string} title Dialog title. (Optional, defaults to Alert)
     * @param {string} buttonName Button name. (Optional, defaults to OK)
     * @returns {Promise<any>} Returns a blank promise once the user has dismissed the alert.
     */
    Dialogs.alert = function (message, title, buttonName) {
        if (title === void 0) { title = 'Alert'; }
        if (buttonName === void 0) { buttonName = 'OK'; }
        return;
    };
    /**
     * Displays a customizable confirmation dialog box.
     * @param {string} message Dialog message.
     * @param {string} title Dialog title. (Optional, defaults to Confirm)
     * @param {Array<string>} buttonLabels Array of strings specifying button labels. (Optional, defaults to [OK,Cancel])
     * @returns {Promise<number>} Returns a promise that resolves the button index that was clicked. Note that the index use one-based indexing.
     */
    Dialogs.confirm = function (message, title, buttonLabels) {
        if (title === void 0) { title = 'Confirm'; }
        if (buttonLabels === void 0) { buttonLabels = ['OK', 'Cancel']; }
        return;
    };
    /**
     * Displays a native dialog box that is more customizable than the browser's prompt function.
     * @param {string} message Dialog message.
     * @param {string} title Dialog title. (Optional, defaults to Prompt)
     * @param {Array<string>} buttonLabels  Array of strings specifying button labels. (Optional, defaults to ["OK","Cancel"])
     * @param {string} defaultText Default textbox input value.  (Optional, Default: empty string)
     * @returns {Promise<any>} Returns a promise that resolves an object with the button index clicked and the text entered
     */
    Dialogs.prompt = function (message, title, buttonLabels, defaultText) {
        if (title === void 0) { title = 'Prompt'; }
        if (buttonLabels === void 0) { buttonLabels = ['OK', 'Cancel']; }
        if (defaultText === void 0) { defaultText = ''; }
        return;
    };
    /**
     * The device plays a beep sound.
     * @param {numbers} times The number of times to repeat the beep.
     */
    Dialogs.beep = function (times) { };
    __decorate$32([
        Cordova({
            successIndex: 1,
            errorIndex: 4
        })
    ], Dialogs, "alert", null);
    __decorate$32([
        Cordova({
            successIndex: 1,
            errorIndex: 4
        })
    ], Dialogs, "confirm", null);
    __decorate$32([
        Cordova({
            successIndex: 1,
            errorIndex: 5
        })
    ], Dialogs, "prompt", null);
    __decorate$32([
        Cordova({
            sync: true
        })
    ], Dialogs, "beep", null);
    Dialogs = __decorate$32([
        Plugin({
            plugin: 'cordova-plugin-dialogs',
            pluginRef: 'navigator.notification',
            repo: 'https://github.com/apache/cordova-plugin-dialogs.git'
        })
    ], Dialogs);
    return Dialogs;
}());

var __decorate$33 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Email Composer
 * @description
 *
 * Requires Cordova plugin: cordova-plugin-email-composer. For more info, please see the [Email Composer plugin docs](https://github.com/katzer/cordova-plugin-email-composer).
 *
 * DISCLAIMER: This plugin is experiencing issues with the latest versions of Cordova. Use at your own risk. Functionality is not guaranteed. Please stay tuned for a more stable version.
 * A good alternative to this plugin is the social sharing plugin.
 *
 * @usage
 * ```typescript
 * import { EmailComposer } from 'ionic-native';
 *
 *
 * EmailComposer.isAvailable().then((available: boolean) =>{
 *  if(available) {
 *    //Now we know we can send
 *  }
 * });
 *
 * let email = {
 *   to: 'max@mustermann.de',
 *   cc: 'erika@mustermann.de',
 *   bcc: ['john@doe.com', 'jane@doe.com'],
 *   attachments: [
 *     'file://img/logo.png',
 *     'res://icon.png',
 *     'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
 *     'file://README.pdf'
 *   ],
 *   subject: 'Cordova Icons',
 *   body: 'How are you? Nice greetings from Leipzig',
 *   isHtml: true
 * };
 *
 * // Send a text message using default options
 * EmailComposer.open(email);
 *
 * ```
 */
var EmailComposer = (function () {
    function EmailComposer() {
    }
    /**
     * Verifies if sending emails is supported on the device.
     *
     * @param app {string?} An optional app id or uri scheme.
     * @returns {Promise<boolean>} Resolves if available, rejects if not available
     */
    EmailComposer.isAvailable = function (app) {
        return new Promise(function (resolve, reject) {
            if (app) {
                cordova.plugins.email.isAvailable(app, function (isAvailable) {
                    if (isAvailable) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            }
            else {
                cordova.plugins.email.isAvailable(function (isAvailable) {
                    if (isAvailable) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            }
        });
    };
    /**
     * Adds a new mail app alias.
     *
     * @param alias {string} The alias name
     * @param packageName {string} The package name
     */
    EmailComposer.addAlias = function (alias, packageName) { };
    /**
     * Displays the email composer pre-filled with data.
     *
     * @param email {Email} Email
     * @param scope {any?} An optional scope for the promise
     * @returns {Promise<any>} Resolves promise when the EmailComposer has been opened
     */
    EmailComposer.open = function (email, scope) { return; };
    __decorate$33([
        Cordova()
    ], EmailComposer, "addAlias", null);
    __decorate$33([
        Cordova({
            successIndex: 1,
            errorIndex: 3
        })
    ], EmailComposer, "open", null);
    EmailComposer = __decorate$33([
        Plugin({
            plugin: 'cordova-plugin-email-composer',
            pluginRef: 'cordova.plugins.email',
            repo: 'https://github.com/katzer/cordova-plugin-email-composer.git',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], EmailComposer);
    return EmailComposer;
}());

var __decorate$34 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name EstimoteBeacons
 *
 * @description
 * This plugin enables communication between a phone and Estimote Beacons peripherals.
 *
 */
var EstimoteBeacons = (function () {
    function EstimoteBeacons() {
    }
    /**
     * Ask the user for permission to use location services
     * while the app is in the foreground.
     * You need to call this function or requestAlwaysAuthorization
     * on iOS 8+.
     * Does nothing on other platforms.
     *
     * @usage
     * ```
     * EstimoteBeacons.requestWhenInUseAuthorization().then(
     *   () => { console.log('on success'); },
     *   () => { console.log('on error'); }
     * );
     * ```
     *
     * @see {@link https://community.estimote.com/hc/en-us/articles/203393036-Estimote-SDK-and-iOS-8-Location-Services|Estimote SDK and iOS 8 Location Services}
     * @return Returns a Promise.
     */
    EstimoteBeacons.requestWhenInUseAuthorization = function () { return; };
    /**
     * Ask the user for permission to use location services
     * whenever the app is running.
     * You need to call this function or requestWhenInUseAuthorization
     * on iOS 8+.
     * Does nothing on other platforms.
     *
     * @usage
     * ```
     * EstimoteBeacons.requestAlwaysAuthorization().then(
     *   () => { console.log('on success'); },
     *   () => { console.log('on error'); }
     * );
     * ```
     *
     * @see {@link https://community.estimote.com/hc/en-us/articles/203393036-Estimote-SDK-and-iOS-8-Location-Services|Estimote SDK and iOS 8 Location Services}
     * @return Returns a Promise.
     */
    EstimoteBeacons.requestAlwaysAuthorization = function () { return; };
    /**
     * Get the current location authorization status.
     * Implemented on iOS 8+.
     * Does nothing on other platforms.
     *
     * @usage
     * ```
     * EstimoteBeacons.authorizationStatus().then(
     *   (result) => { console.log('Location authorization status: ' + result); },
     *   (errorMessage) => { console.log('Error: ' + errorMessage); }
     * );
     * ```
     *
     * @see {@link https://community.estimote.com/hc/en-us/articles/203393036-Estimote-SDK-and-iOS-8-Location-Services|Estimote SDK and iOS 8 Location Services}
     * @return Returns a Promise.
     */
    EstimoteBeacons.authorizationStatus = function () { return; };
    /**
     * Start advertising as a beacon.
     *
     * @usage
     * ```
     * EstimoteBeacons.startAdvertisingAsBeacon('B9407F30-F5F8-466E-AFF9-25556B57FE6D', 1, 1, 'MyRegion')
     *    .then(() => { console.log('Beacon started'); });
     * setTimeout(() => {
     *   EstimoteBeacons.stopAdvertisingAsBeacon().then((result) => { console.log('Beacon stopped'); });
     * }, 5000);
     * ```
     * @param uuid {string} UUID string the beacon should advertise (mandatory).
     * @param major {number} Major value to advertise (mandatory).
     * @param minor {number} Minor value to advertise (mandatory).
     * @param regionId {string} Identifier of the region used to advertise (mandatory).
     * @return Returns a Promise.
     */
    EstimoteBeacons.startAdvertisingAsBeacon = function (uuid, major, minor, regionId) { return; };
    /**
     * Stop advertising as a beacon.
     *
     * @usage
     * ```
     * EstimoteBeacons.startAdvertisingAsBeacon('B9407F30-F5F8-466E-AFF9-25556B57FE6D', 1, 1, 'MyRegion')
     *    .then(() => { console.log('Beacon started'); });
     * setTimeout(() => {
     *   EstimoteBeacons.stopAdvertisingAsBeacon().then((result) => { console.log('Beacon stopped'); });
     * }, 5000);
     * ```
     * @return Returns a Promise.
     */
    EstimoteBeacons.stopAdvertisingAsBeacon = function () { return; };
    /**
     * Enable analytics.
     *
     * @see {@link http://estimote.github.io/iOS-SDK/Classes/ESTConfig.html|Further details}
     *
     * @usage
     * ```
     * EstimoteBeacons.enableAnalytics(true).then(() => { console.log('Analytics enabled'); });
     * ```
     * @param enable {number} Boolean value to turn analytics on or off (mandatory).
     * @return Returns a Promise.
     */
    EstimoteBeacons.enableAnalytics = function (enable) { return; };
    /**
    * Test if analytics is enabled.
    *
    * @see {@link http://estimote.github.io/iOS-SDK/Classes/ESTConfig.html|Further details}
     *
     * @usage
     * ```
     * EstimoteBeacons.isAnalyticsEnabled().then((enabled) => { console.log('Analytics enabled: ' + enabled); });
     * ```
     * @return Returns a Promise.
     */
    EstimoteBeacons.isAnalyticsEnabled = function () { return; };
    /**
    * Test if App ID and App Token is set.
    *
    * @see {@link http://estimote.github.io/iOS-SDK/Classes/ESTConfig.html|Further details}
     *
     * @usage
     * ```
     * EstimoteBeacons.isAuthorized().then((isAuthorized) => { console.log('App ID and App Token is set: ' + isAuthorized); });
     * ```
     * @return Returns a Promise.
     */
    EstimoteBeacons.isAuthorized = function () { return; };
    /**
    * Set App ID and App Token.
    *
    * @see {@link http://estimote.github.io/iOS-SDK/Classes/ESTConfig.html|Further details}
     *
     * @usage
     * ```
     * EstimoteBeacons.setupAppIDAndAppToken('MyAppID', 'MyAppToken').then(() => { console.log('AppID and AppToken configured!'); });
     * ```
     * @param appID {string} The App ID (mandatory).
     * @param appToken {string} The App Token (mandatory).
     * @return Returns a Promise.
     */
    EstimoteBeacons.setupAppIDAndAppToken = function (appID, appToken) { return; };
    /**
     * Start scanning for all nearby beacons using CoreBluetooth (no region object is used).
     * Available on iOS.
     *
     * @usage
     * ```
     * EstimoteBeacons.startEstimoteBeaconDiscovery().subscribe(beacons => {
     *   console.log(JSON.stringify(beacons));
     * });
     * setTimeout(() => {
     *   EstimoteBeacons.stopEstimoteBeaconDiscovery().then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @return Returns an Observable that notifies of each beacon discovered.
     */
    EstimoteBeacons.startEstimoteBeaconDiscovery = function () { return; };
    /**
     * Stop CoreBluetooth scan. Available on iOS.
     *
     * @usage
     * ```
     * EstimoteBeacons.startEstimoteBeaconDiscovery().subscribe(beacons => {
     *   console.log(JSON.stringify(beacons));
     * });
     * setTimeout(() => {
     *   EstimoteBeacons.stopEstimoteBeaconDiscovery().then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @return returns a Promise.
     */
    EstimoteBeacons.stopEstimoteBeaconDiscovery = function () { return; };
    /**
     * Start ranging beacons. Available on iOS and Android.
     *
     * @usage
     * ```
     * let region: BeaconRegion = {} // Empty region matches all beacons.
     * EstimoteBeacons.startRangingBeaconsInRegion(region).subscribe(info => {
     *   console.log(JSON.stringify(info));
     * });
     * setTimeout(() => {
     *   EstimoteBeacons.stopRangingBeaconsInRegion(region).then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @param region {BeaconRegion} Dictionary with region properties (mandatory).
     * @return Returns an Observable that notifies of each beacon discovered.
     */
    EstimoteBeacons.startRangingBeaconsInRegion = function (region) { return; };
    /**
     * Stop ranging beacons. Available on iOS and Android.
     *
     * @usage
     * ```
     * let region: BeaconRegion = {} // Empty region matches all beacons.
     * EstimoteBeacons.startRangingBeaconsInRegion(region).subscribe(info => {
     *   console.log(JSON.stringify(info));
     * });
     * setTimeout(() => {
     *   EstimoteBeacons.stopRangingBeaconsInRegion(region).then(() => { console.log('scan stopped'); });
     * }, 5000);
     * ```
     * @param region {BeaconRegion} Dictionary with region properties (mandatory).
     * @return returns a Promise.
     */
    EstimoteBeacons.stopRangingBeaconsInRegion = function (region) { return; };
    /**
     * Start ranging secure beacons. Available on iOS.
     * This function has the same parameters/behaviour as
     * {@link EstimoteBeacons.startRangingBeaconsInRegion}.
     * To use secure beacons set the App ID and App Token using
     * {@link EstimoteBeacons.setupAppIDAndAppToken}.
     */
    EstimoteBeacons.startRangingSecureBeaconsInRegion = function (region) { return; };
    /**
     * Stop ranging secure beacons. Available on iOS.
     * This function has the same parameters/behaviour as
     * {@link EstimoteBeacons.stopRangingBeaconsInRegion}.
     */
    EstimoteBeacons.stopRangingSecureBeaconsInRegion = function (region) { return; };
    /**
     * Start monitoring beacons. Available on iOS and Android.
     *
     * @usage
     * ```
     * let region: BeaconRegion = {} // Empty region matches all beacons.
     * EstimoteBeacons.startMonitoringForRegion(region).subscribe(state => {
     *   console.log('Region state: ' + JSON.stringify(state));
     * });
     * ```
     * @param region {BeaconRegion} Dictionary with region properties (mandatory).
     * @param [notifyEntryStateOnDisplay=false] {boolean} Set to true to detect if you
     * are inside a region when the user turns display on, see
     * {@link https://developer.apple.com/library/prerelease/ios/documentation/CoreLocation/Reference/CLBeaconRegion_class/index.html#//apple_ref/occ/instp/CLBeaconRegion/notifyEntryStateOnDisplay|iOS documentation}
     * for further details (optional, defaults to false, iOS only).
     * @return Returns an Observable that notifies of each region state discovered.
     */
    EstimoteBeacons.startMonitoringForRegion = function (region, notifyEntryStateOnDisplay) { return; };
    /**
     * Stop monitoring beacons. Available on iOS and Android.
     *
     * @usage
     * ```
     * let region: BeaconRegion = {} // Empty region matches all beacons.
     * EstimoteBeacons.stopMonitoringForRegion(region).then(() => { console.log('monitoring is stopped'); });
     * ```
     * @param region {BeaconRegion} Dictionary with region properties (mandatory).
     * @return returns a Promise.
     */
    EstimoteBeacons.stopMonitoringForRegion = function (region) { return; };
    /**
     * Start monitoring secure beacons. Available on iOS.
     * This function has the same parameters/behaviour as
     * EstimoteBeacons.startMonitoringForRegion.
     * To use secure beacons set the App ID and App Token using
     * {@link EstimoteBeacons.setupAppIDAndAppToken}.
     * @see {@link EstimoteBeacons.startMonitoringForRegion}
     */
    EstimoteBeacons.startSecureMonitoringForRegion = function (region, notifyEntryStateOnDisplay) { return; };
    /**
    * Stop monitoring secure beacons. Available on iOS.
    * This function has the same parameters/behaviour as
    * {@link EstimoteBeacons.stopMonitoringForRegion}.
    */
    EstimoteBeacons.stopSecureMonitoringForRegion = function (region) { return; };
    /**
     * Connect to Estimote Beacon. Available on Android.
     *
     * @usage
     * ```
     * EstimoteBeacons.connectToBeacon(FF:0F:F0:00:F0:00);
     * ```
     * ```
     * EstimoteBeacons.connectToBeacon({
     *     proximityUUID: '000000FF-F00F-0FF0-F000-000FF0F00000',
     *     major: 1,
     *     minor: 1
     *   });
     * ```
     * @param beacon {Beacon} Beacon to connect to.
     * @return returns a Promise.
     */
    EstimoteBeacons.connectToBeacon = function (beacon) { return; };
    /**
     * Disconnect from connected Estimote Beacon. Available on Android.
     *
     * @usage
     * ```
     * EstimoteBeacons.disconnectConnectedBeacon();
     * ```
     * @return returns a Promise.
     */
    EstimoteBeacons.disconnectConnectedBeacon = function () { return; };
    /**
     * Write proximity UUID to connected Estimote Beacon. Available on Android.
     *
     * @usage
     * ```
     * // Example that writes constant ESTIMOTE_PROXIMITY_UUID
     * EstimoteBeacons.writeConnectedProximityUUID(ESTIMOTE_PROXIMITY_UUID);
     *
     * @param uuid {string} String to write as new UUID
     * @return returns a Promise.
     */
    EstimoteBeacons.writeConnectedProximityUUID = function (uuid) { return; };
    /**
     * Write major to connected Estimote Beacon. Available on Android.
     *
     * @usage
     * ```
     * // Example that writes 1
     * EstimoteBeacons.writeConnectedMajor(1);
     *
     * @param major {number} number to write as new major
     * @return returns a Promise.
     */
    EstimoteBeacons.writeConnectedMajor = function (major) { return; };
    /**
     * Write minor to connected Estimote Beacon. Available on Android.
     *
     * @usage
     * ```
     * // Example that writes 1
     * EstimoteBeacons.writeConnectedMinor(1);
     *
     * @param minor {number} number to write as new minor
     * @return returns a Promise.
     */
    EstimoteBeacons.writeConnectedMinor = function (minor) { return; };
    /** Proximity value */
    EstimoteBeacons.ProximityUnknown = 0;
    /** Proximity value */
    EstimoteBeacons.ProximityImmediate = 1;
    /** Proximity value */
    EstimoteBeacons.ProximityNear = 2;
    /** Proximity value */
    EstimoteBeacons.ProximityFar = 3;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorUnknown = 0;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorMintCocktail = 1;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorIcyMarshmallow = 2;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorBlueberryPie = 3;
    /**
     * Beacon colour.
     */
    EstimoteBeacons.BeaconColorSweetBeetroot = 4;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorCandyFloss = 5;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorLemonTart = 6;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorVanillaJello = 7;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorLiquoriceSwirl = 8;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorWhite = 9;
    /** Beacon colour */
    EstimoteBeacons.BeaconColorTransparent = 10;
    /** Region state */
    EstimoteBeacons.RegionStateUnknown = 'unknown';
    /** Region state */
    EstimoteBeacons.RegionStateOutside = 'outside';
    /** Region state */
    EstimoteBeacons.RegionStateInside = 'inside';
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "requestWhenInUseAuthorization", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "requestAlwaysAuthorization", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "authorizationStatus", null);
    __decorate$34([
        Cordova({
            clearFunction: 'stopAdvertisingAsBeacon'
        })
    ], EstimoteBeacons, "startAdvertisingAsBeacon", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopAdvertisingAsBeacon", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "enableAnalytics", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "isAnalyticsEnabled", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "isAuthorized", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "setupAppIDAndAppToken", null);
    __decorate$34([
        Cordova({
            observable: true,
            clearFunction: 'stopEstimoteBeaconDiscovery'
        })
    ], EstimoteBeacons, "startEstimoteBeaconDiscovery", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopEstimoteBeaconDiscovery", null);
    __decorate$34([
        Cordova({
            observable: true,
            clearFunction: 'stopRangingBeaconsInRegion',
            clearWithArgs: true
        })
    ], EstimoteBeacons, "startRangingBeaconsInRegion", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopRangingBeaconsInRegion", null);
    __decorate$34([
        Cordova({
            observable: true,
            clearFunction: 'stopRangingSecureBeaconsInRegion',
            clearWithArgs: true
        })
    ], EstimoteBeacons, "startRangingSecureBeaconsInRegion", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopRangingSecureBeaconsInRegion", null);
    __decorate$34([
        Cordova({
            observable: true,
            clearFunction: 'stopMonitoringForRegion',
            clearWithArgs: true,
            successIndex: 1,
            errorIndex: 2
        })
    ], EstimoteBeacons, "startMonitoringForRegion", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopMonitoringForRegion", null);
    __decorate$34([
        Cordova({
            observable: true,
            clearFunction: 'stopSecureMonitoringForRegion',
            clearWithArgs: true,
            successIndex: 1,
            errorIndex: 2
        })
    ], EstimoteBeacons, "startSecureMonitoringForRegion", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "stopSecureMonitoringForRegion", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "connectToBeacon", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "disconnectConnectedBeacon", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "writeConnectedProximityUUID", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "writeConnectedMajor", null);
    __decorate$34([
        Cordova()
    ], EstimoteBeacons, "writeConnectedMinor", null);
    EstimoteBeacons = __decorate$34([
        Plugin({
            plugin: 'cordova-plugin-estimote',
            pluginRef: 'estimote.beacons',
            repo: 'https://github.com/evothings/phonegap-estimotebeacons',
            platforms: ['iOS', 'Android']
        })
    ], EstimoteBeacons);
    return EstimoteBeacons;
}());

var __decorate$35 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Facebook
 * @description
 * Use the Facebook Connect plugin to obtain access to the native FB application on iOS and Android.
 *
 * Requires Cordova plugin: `cordova-plugin-facebook4`. For more info, please see the [Facebook Connect](https://github.com/jeduan/cordova-plugin-facebook4).
 *
 * #### Installation
 *
 *  To use the FB plugin, you first have to create a new Facebook App inside of the Facebook developer portal at [https://developers.facebook.com/apps](https://developers.facebook.com/apps).
 *
 * [![fb-getstarted-1](/img/docs/native/Facebook/1.png)](https://developers.facebook.com/apps/)
 *
 * Retrieve the `App ID` and `App Name`.
 *
 * [![fb-getstarted-2](/img/docs/native/Facebook/2.png)](https://developers.facebook.com/apps/)
 *
 * Then type in the following command in your Terminal, where APP_ID and APP_NAME are the values from the Facebook Developer portal.
 *
 * ```bash
 *  ionic plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="myApplication"
 * ```
 *
 * After, you'll need to add the native platforms you'll be using to your app in the Facebook Developer portal under your app's Settings:
 *
 * [![fb-getstarted-3](/img/docs/native/Facebook/3.png)](https://developers.facebook.com/apps/)
 *
 * Click `'Add Platform'`.
 *
 * [![fb-getstarted-4](/img/docs/native/Facebook/4.png)](https://developers.facebook.com/apps/)
 *
 * At this point you'll need to open your project's [`config.xml`](https://cordova.apache.org/docs/en/latest/config_ref/index.html) file, found in the root directory of your project.
 *
 * Take note of the `id` for the next step:
 * ```
 * <widget id="com.mycompany.testapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
 * ```
 *
 * You can also edit the `id` to whatever you'd like it to be.
 *
 * #### iOS Install
 * Under 'Bundle ID', add the `id` from your `config.xml` file:
 *
 * [![fb-getstarted-5](/img/docs/native/Facebook/5.png)](https://developers.facebook.com/apps/)
 *
 *
 * #### Android Install
 * Under 'Google Play Package Name', add the `id` from your `config.xml` file:
 *
 * [![fb-getstarted-6](/img/docs/native/Facebook/6.png)](https://developers.facebook.com/apps/)
 *
 *
 * And that's it! You can now make calls to Facebook using the plugin.
 *
 * ## Events
 *
 * App events allow you to understand the makeup of users engaging with your app, measure the performance of your Facebook mobile app ads, and reach specific sets of your users with Facebook mobile app ads.
 *
 * - [iOS] [https://developers.facebook.com/docs/ios/app-events](https://developers.facebook.com/docs/ios/app-events)
 * - [Android] [https://developers.facebook.com/docs/android/app-events](https://developers.facebook.com/docs/android/app-events)
 * - [JS] Does not have an Events API, so the plugin functions are empty and will return an automatic success
 *
 * Activation events are automatically tracked for you in the plugin.
 *
 * Events are listed on the [insights page](https://www.facebook.com/insights/).
 *
 * For tracking events, see `logEvent` and `logPurchase`.
 *
 * @usage
 * ```typescript
 * import { Facebook } from 'ionic-native';
 *
 *
 *
 * ```
 *
 */
var Facebook = (function () {
    function Facebook() {
    }
    /**
     * Browser wrapper
     * @param {number} appId Your Facebook AppID from their dashboard
     * @param {string} version The version of API you may want to use. Optional
     */
    Facebook.browserInit = function (appId, version) {
        return;
    };
    /**
     * Login to Facebook to authenticate this app.
     *
     * ```typescript
     * {
     *   status: "connected",
     *   authResponse: {
     *     session_key: true,
     *     accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
     *     expiresIn: 5183979,
     *     sig: "...",
     *     secret: "...",
     *     userID: "634565435"
     *   }
     * }
     * ```
     *
     * @param {string[]}  permissions List of [permissions](https://developers.facebook.com/docs/facebook-login/permissions) this app has upon logging in.
     * @return {Promise<FacebookLoginResponse>} Returns a Promise that resolves with a status object if login succeeds, and rejects if login fails.
     */
    Facebook.login = function (permissions) { return; };
    /**
     * Logout of Facebook.
     *
     * For more info see the [Facebook docs](https://developers.facebook.com/docs/reference/javascript/FB.logout)
     * @return Returns a Promise that resolves on a successful logout, and rejects if logout fails.
     */
    Facebook.logout = function () { return; };
    /**
     * Determine if a user is logged in to Facebook and has authenticated your app.  There are three possible states for a user:
     *
     * 1) the user is logged into Facebook and has authenticated your application (connected)
     * 2) the user is logged into Facebook but has not authenticated your application (not_authorized)
     * 3) the user is either not logged into Facebook or explicitly logged out of your application so it doesn't attempt to connect to Facebook and thus, we don't know if they've authenticated your application or not (unknown)
     *
     * Resolves with a response like:
     *
     * ```
     * {
     *   authResponse: {
     *     userID: "12345678912345",
     *     accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
     *     session_Key: true,
     *     expiresIn: "5183738",
     *     sig: "..."
     *   },
     *   status: "connected"
     * }
     * ```
     *
     * For more information see the [Facebook docs](https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus)
     *
     * @return Returns a Promise that resolves with a status, or rejects with an error
     */
    Facebook.getLoginStatus = function () { return; };
    /**
     * Get a Facebook access token for using Facebook services.
     *
     * @return Returns a Promise that resolves with an access token, or rejects with an error
     */
    Facebook.getAccessToken = function () { return; };
    /**
     * Show one of various Facebook dialogs. Example of options for a Share dialog:
     *
     * ```
     * {
     *   method: "share",
     *   href: "http://example.com",
     *   caption: "Such caption, very feed.",
     *   description: "Much description",
     *   picture: 'http://example.com/image.png'
     * }
     * ```
     *
     * For more options see the [Cordova plugin docs](https://github.com/jeduan/cordova-plugin-facebook4#show-a-dialog) and the [Facebook docs](https://developers.facebook.com/docs/javascript/reference/FB.ui)
     * @options {Object}  options The dialog options
     * @return Returns a Promise that resolves with success data, or rejects with an error
     */
    Facebook.showDialog = function (options) { return; };
    /**
     * Make a call to Facebook Graph API. Can take additional permissions beyond those granted on login.
     *
     * For more information see:
     *
     *  Calling the Graph API - https://developers.facebook.com/docs/javascript/reference/FB.api
     *  Graph Explorer - https://developers.facebook.com/tools/explorer
     *  Graph API - https://developers.facebook.com/docs/graph-api
     *
     * @param {string}  requestPath Graph API endpoint you want to call
     * @param {string[]}  permissions List of [permissions](https://developers.facebook.com/docs/facebook-login/permissions) for this request.
     * @return Returns a Promise that resolves with the result of the request, or rejects with an error
     */
    Facebook.api = function (requestPath, permissions) { return; };
    /**
     * Log an event.  For more information see the Events section above.
     *
     * @param {string}  name Name of the event
     * @param {Object}  [params] An object containing extra data to log with the event
     * @param {number}  [valueToSum] any value to be added to added to a sum on each event
     * @return
     */
    Facebook.logEvent = function (name, params, valueToSum) { return; };
    /**
     * Log a purchase. For more information see the Events section above.
     *
     * @param {number}  value Value of the purchase.
     * @param {string}  currency The currency, as an [ISO 4217 currency code](http://en.wikipedia.org/wiki/ISO_4217)
     * @return Returns a Promise
     */
    Facebook.logPurchase = function (value, currency) { return; };
    /**
     * Open App Invite dialog. Does not require login.
     *
     * For more information see:
     *
     *   the App Invites Overview - https://developers.facebook.com/docs/app-invites/overview
     *   the App Links docs - https://developers.facebook.com/docs/applinks
     *
     *
     * @param {Object}  options An object containing an [App Link](https://developers.facebook.com/docs/applinks) URL to your app and an optional image URL.
     *   url: [App Link](https://developers.facebook.com/docs/applinks) to your app
     *   picture: image to be displayed in the App Invite dialog
     *
     * @return Returns a Promise that resolves with the result data, or rejects with an error
     */
    Facebook.appInvite = function (options) { return; };
    __decorate$35([
        Cordova()
    ], Facebook, "browserInit", null);
    __decorate$35([
        Cordova()
    ], Facebook, "login", null);
    __decorate$35([
        Cordova()
    ], Facebook, "logout", null);
    __decorate$35([
        Cordova()
    ], Facebook, "getLoginStatus", null);
    __decorate$35([
        Cordova()
    ], Facebook, "getAccessToken", null);
    __decorate$35([
        Cordova()
    ], Facebook, "showDialog", null);
    __decorate$35([
        Cordova()
    ], Facebook, "api", null);
    __decorate$35([
        Cordova()
    ], Facebook, "logEvent", null);
    __decorate$35([
        Cordova()
    ], Facebook, "logPurchase", null);
    __decorate$35([
        Cordova()
    ], Facebook, "appInvite", null);
    Facebook = __decorate$35([
        Plugin({
            plugin: 'cordova-plugin-facebook4',
            pluginRef: 'facebookConnectPlugin',
            repo: 'https://github.com/jeduan/cordova-plugin-facebook4',
            install: 'ionic plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"'
        })
    ], Facebook);
    return Facebook;
}());

var __decorate$36 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name File
 * @description
 * This plugin implements a File API allowing read/write access to files residing on the device.
 *
 * The File class implements static convenience functions to access files and directories.
 *
 * Example:
 * ```
 * import { File } from 'ionic-native';
 *
 * declare var cordova: any;
 * const fs:string = cordova.file.dataDirectory;
 * File.checkDir(this.fs, 'mydir').then(_ => console.log('yay')).catch(err => console.log('boooh'));
 * ```
 *
 *  This plugin is based on several specs, including : The HTML5 File API http://www.w3.org/TR/FileAPI/
 *  The (now-defunct) Directories and System extensions Latest: http://www.w3.org/TR/2012/WD-file-system-api-20120417/
 *  Although most of the plugin code was written when an earlier spec was current: http://www.w3.org/TR/2011/WD-file-system-api-20110419/
 *  It also implements the FileWriter spec : http://dev.w3.org/2009/dap/file-system/file-writer.html
 */
var File = (function () {
    function File() {
    }
    File.getFreeDiskSpace = function () {
        return;
    };
    /**
     * Check if a directory exists in a certain path, directory.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dir Name of directory to check
     * @return {Promise<boolean|FileError>} Returns a Promise that resolves to true if the directory exists or rejects with an error.
     */
    File.checkDir = function (path, dir) {
        if ((/^\//.test(dir))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        var fullpath = path + dir;
        return File.resolveDirectoryUrl(fullpath)
            .then(function () {
            return true;
        });
    };
    /**
     * Creates a new directory in the specific path.
     * The replace boolean value determines whether to replace an existing directory with the same name.
     * If an existing directory exists and the replace value is false, the promise will fail and return an error.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory to create
     * @param {boolean} replace If true, replaces file with same name. If false returns error
     * @return {Promise<DirectoryEntry|FileError>} Returns a Promise that resolves with a DirectoryEntry or rejects with an error.
     */
    File.createDir = function (path, dirName, replace) {
        if ((/^\//.test(dirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        var options = {
            create: true
        };
        if (!replace) {
            options.exclusive = true;
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getDirectory(fse, dirName, options);
        });
    };
    /**
     * Remove a directory at a given path.
     *
     * @param {string} path The path to the directory
     * @param {string} dirName The directory name
     * @return {Promise<RemoveResult|FileError>} Returns a Promise that resolves to a RemoveResult or rejects with an error.
     */
    File.removeDir = function (path, dirName) {
        if ((/^\//.test(dirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getDirectory(fse, dirName, { create: false });
        })
            .then(function (de) {
            return File.remove(de);
        });
    };
    /**
     * Move a directory to a given path.
     *
     * @param {string} path The source path to the directory
     * @param {string} dirName The source directory name
     * @param {string} newPath The destionation path to the directory
     * @param {string} newDirName The destination directory name
     * @return {Promise<DirectoryEntry|Entry|FileError>} Returns a Promise that resolves to the new DirectoryEntry object or rejects with an error.
     */
    File.moveDir = function (path, dirName, newPath, newDirName) {
        var _this = this;
        newDirName = newDirName || dirName;
        if ((/^\//.test(newDirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getDirectory(fse, dirName, { create: false });
        })
            .then(function (srcde) {
            return _this.resolveDirectoryUrl(newPath)
                .then(function (deste) {
                return File.move(srcde, deste, newDirName);
            });
        });
    };
    /**
     * Copy a directory in various methods. If destination directory exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newDirName New name of directory to copy to (leave blank to remain the same)
     * @return {Promise<Entry|FileError>} Returns a Promise that resolves to the new Entry object or rejects with an error.
     */
    File.copyDir = function (path, dirName, newPath, newDirName) {
        var _this = this;
        if ((/^\//.test(newDirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getDirectory(fse, dirName, { create: false });
        })
            .then(function (srcde) {
            return _this.resolveDirectoryUrl(newPath)
                .then(function (deste) {
                return File.copy(srcde, deste, newDirName);
            });
        });
    };
    /**
     * List files and directory from a given path.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory
     * @return {Promise<Entry[]>} Returns a Promise that resolves to an array of Entry objects or rejects with an error.
     */
    File.listDir = function (path, dirName) {
        if ((/^\//.test(dirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getDirectory(fse, dirName, { create: false, exclusive: false });
        })
            .then(function (de) {
            var reader = de.createReader();
            return File.readEntries(reader);
        });
    };
    /**
     * Removes all files and the directory from a desired location.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory
     * @return {Promise<RemoveResult>} Returns a Promise that resolves with a RemoveResult or rejects with an error.
     */
    File.removeRecursively = function (path, dirName) {
        if ((/^\//.test(dirName))) {
            var err = new FileError(5);
            err.message = 'directory cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getDirectory(fse, dirName, { create: false });
        })
            .then(function (de) {
            return File.rimraf(de);
        });
    };
    /**
     * Check if a file exists in a certain path, directory.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file to check
     * @return {Promise<boolean|FileError>} Returns a Promise that resolves with a boolean or rejects with an error.
     */
    File.checkFile = function (path, file) {
        if ((/^\//.test(file))) {
            var err = new FileError(5);
            err.message = 'file cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveLocalFilesystemUrl(path + file)
            .then(function (fse) {
            if (fse.isFile) {
                return true;
            }
            else {
                var err = new FileError(13);
                err.message = 'input is not a file';
                return Promise.reject(err);
            }
        });
    };
    /**
     * Creates a new file in the specific path.
     * The replace boolean value determines whether to replace an existing file with the same name.
     * If an existing file exists and the replace value is false, the promise will fail and return an error.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to create
     * @param {boolean} replace If true, replaces file with same name. If false returns error
     * @return {Promise<FileEntry|FileError>} Returns a Promise that resolves to a FileEntry or rejects with an error.
     */
    File.createFile = function (path, fileName, replace) {
        if ((/^\//.test(fileName))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        var options = {
            create: true
        };
        if (!replace) {
            options.exclusive = true;
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, fileName, options);
        });
    };
    /**
     * Removes a file from a desired location.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to remove
     * @return {Promise<RemoveResult|FileError>} Returns a Promise that resolves to a RemoveResult or rejects with an error.
     */
    File.removeFile = function (path, fileName) {
        if ((/^\//.test(fileName))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, fileName, { create: false });
        })
            .then(function (fe) {
            return File.remove(fe);
        });
    };
    /** Write a new file to the desired location.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName path relative to base path
     * @param {string | Blob} text content or blob to write
     * @param {boolean | WriteOptions} replaceOrOptions replace file if set to true. See WriteOptions for more information.
     * @returns {Promise<void>} Returns a Promise that resolves or rejects with an error.
     */
    File.writeFile = function (path, fileName, text, replaceOrOptions) {
        if ((/^\//.test(fileName))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        var opts = {};
        if (replaceOrOptions) {
            if (typeof (replaceOrOptions) === 'boolean') {
                opts.replace = replaceOrOptions;
            }
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, fileName, opts);
        })
            .then(function (fe) {
            return File.createWriter(fe);
        })
            .then(function (writer) {
            if (opts.append) {
                writer.seek(writer.length);
            }
            if (opts.hasOwnProperty('truncate')) {
                writer.truncate(opts.truncate);
            }
            return File.write(writer, text);
        });
    };
    /** Write to an existing file.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName path relative to base path
     * @param {string | Blob} text content or blob to write
     * @returns {Promise<void>} Returns a Promise that resolves or rejects with an error.
     */
    File.writeExistingFile = function (path, fileName, text) {
        if ((/^\//.test(fileName))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, fileName, { create: false });
        })
            .then(function (fe) {
            return File.createWriter(fe);
        })
            .then(function (writer) {
            return File.write(writer, text);
        });
    };
    /**
     * Read the contents of a file as text.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file, relative to path.
     * @return {Promise<string|FileError>} Returns a Promise that resolves with the contents of the file as string or rejects with an error.
     */
    File.readAsText = function (path, file) {
        if ((/^\//.test(file))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, file, { create: false });
        })
            .then(function (fe) {
            var reader = new FileReader();
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fe.file(function (file) {
                    reader.readAsText(file);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Read file and return data as a base64 encoded data url.
     * A data url is of the form:
     *      data:[<mediatype>][;base64],<data>
  
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file, relative to path.
     * @return {Promise<string|FileError>} Returns a Promise that resolves with the contents of the file as data URL or rejects with an error.
     */
    File.readAsDataURL = function (path, file) {
        if ((/^\//.test(file))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, file, { create: false });
        })
            .then(function (fe) {
            var reader = new FileReader();
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fe.file(function (file) {
                    reader.readAsDataURL(file);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Read file and return data as a binary data.
  
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file, relative to path.
     * @return {Promise<string|FileError>} Returns a Promise that resolves with the contents of the file as string rejects with an error.
     */
    File.readAsBinaryString = function (path, file) {
        if ((/^\//.test(file))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, file, { create: false });
        })
            .then(function (fe) {
            var reader = new FileReader();
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fe.file(function (file) {
                    reader.readAsBinaryString(file);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Read file and return data as an ArrayBuffer.
  
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} file Name of file, relative to path.
     * @return {Promise<ArrayBuffer|FileError>} Returns a Promise that resolves with the contents of the file as ArrayBuffer or rejects with an error.
     */
    File.readAsArrayBuffer = function (path, file) {
        if ((/^\//.test(file))) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with \/';
            return Promise.reject(err);
        }
        return File.resolveDirectoryUrl(path)
            .then(function (fse) {
            return File.getFile(fse, file, { create: false });
        })
            .then(function (fe) {
            var reader = new FileReader();
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fe.file(function (file) {
                    reader.readAsArrayBuffer(file);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * Move a file to a given path.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to move
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newFileName New name of file to move to (leave blank to remain the same)
     * @return {Promise<Entry|FileError>} Returns a Promise that resolves to the new Entry or rejects with an error.
     */
    File.moveFile = function (path, fileName, newPath, newFileName) {
        var _this = this;
        newFileName = newFileName || fileName;
        if ((/^\//.test(newFileName))) {
            var err = new FileError(5);
            err.message = 'file name cannot start with \/';
            return Promise.reject(err);
        }
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getFile(fse, fileName, { create: false });
        })
            .then(function (srcfe) {
            return _this.resolveDirectoryUrl(newPath)
                .then(function (deste) {
                return File.move(srcfe, deste, newFileName);
            });
        });
    };
    /**
     * Copy a file in various methods. If file exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} fileName Name of file to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newFileName New name of file to copy to (leave blank to remain the same)
     * @return {Promise<Entry|FileError>} Returns a Promise that resolves to an Entry or rejects with an error.
     */
    File.copyFile = function (path, fileName, newPath, newFileName) {
        var _this = this;
        newFileName = newFileName || fileName;
        if ((/^\//.test(newFileName))) {
            var err = new FileError(5);
            err.message = 'file name cannot start with \/';
            return Promise.reject(err);
        }
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getFile(fse, fileName, { create: false });
        })
            .then(function (srcfe) {
            return _this.resolveDirectoryUrl(newPath)
                .then(function (deste) {
                return File.copy(srcfe, deste, newFileName);
            });
        });
    };
    // these private methods help avoid cascading error handling
    // in the public ones, primarily simply wrapping callback
    // operations to return Promises that can then be chained.
    /**
     * @private
     */
    File.fillErrorMessage = function (err) {
        err.message = File.cordovaFileError[err.code];
    };
    /**
     * @private
     */
    File.resolveLocalFilesystemUrl = function (furl) {
        return new Promise(function (resolve, reject) {
            try {
                window.resolveLocalFileSystemURL(furl, function (entry) {
                    resolve(entry);
                }, function (err) {
                    File.fillErrorMessage(err);
                    reject(err);
                });
            }
            catch (xc) {
                File.fillErrorMessage(xc);
                reject(xc);
            }
        });
    };
    /**
     * @private
     */
    File.resolveDirectoryUrl = function (durl) {
        return File.resolveLocalFilesystemUrl(durl)
            .then(function (de) {
            if (de.isDirectory) {
                return de;
            }
            else {
                var err = new FileError(13);
                err.message = 'input is not a directory';
                return Promise.reject(err);
            }
        });
    };
    /**
     * @private
     */
    File.getDirectory = function (fse, dn, flags) {
        return new Promise(function (resolve, reject) {
            try {
                fse.getDirectory(dn, flags, function (de) {
                    resolve(de);
                }, function (err) {
                    File.fillErrorMessage(err);
                    reject(err);
                });
            }
            catch (xc) {
                File.fillErrorMessage(xc);
                reject(xc);
            }
        });
    };
    /**
     * @private
     */
    File.getFile = function (fse, fn, flags) {
        return new Promise(function (resolve, reject) {
            try {
                fse.getFile(fn, flags, function (fe) {
                    resolve(fe);
                }, function (err) {
                    File.fillErrorMessage(err);
                    reject(err);
                });
            }
            catch (xc) {
                File.fillErrorMessage(xc);
                reject(xc);
            }
        });
    };
    /**
     * @private
     */
    File.remove = function (fe) {
        return new Promise(function (resolve, reject) {
            fe.remove(function () {
                resolve({ success: true, fileRemoved: fe });
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.move = function (srce, destdir, newName) {
        return new Promise(function (resolve, reject) {
            srce.moveTo(destdir, newName, function (deste) {
                resolve(deste);
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.copy = function (srce, destdir, newName) {
        return new Promise(function (resolve, reject) {
            srce.copyTo(destdir, newName, function (deste) {
                resolve(deste);
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.readEntries = function (dr) {
        return new Promise(function (resolve, reject) {
            dr.readEntries(function (entries) {
                resolve(entries);
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.rimraf = function (de) {
        return new Promise(function (resolve, reject) {
            de.removeRecursively(function () {
                resolve({ success: true, fileRemoved: de });
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.createWriter = function (fe) {
        return new Promise(function (resolve, reject) {
            fe.createWriter(function (writer) {
                resolve(writer);
            }, function (err) {
                File.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @private
     */
    File.write = function (writer, gu) {
        if (gu instanceof Blob) {
            return this.writeFileInChunks(writer, gu);
        }
        return new Promise(function (resolve, reject) {
            writer.onwriteend = function (evt) {
                if (writer.error) {
                    reject(writer.error);
                }
                else {
                    resolve();
                }
            };
            writer.write(gu);
        });
    };
    /**
     * @private
     */
    File.writeFileInChunks = function (writer, file) {
        var BLOCK_SIZE = 1024 * 1024;
        var writtenSize = 0;
        function writeNextChunk() {
            var size = Math.min(BLOCK_SIZE, file.size - writtenSize);
            var chunk = file.slice(writtenSize, writtenSize + size);
            writtenSize += size;
            writer.write(chunk);
        }
        return new Promise(function (resolve, reject) {
            writer.onerror = reject;
            writer.onwrite = function () {
                if (writtenSize < file.size) {
                    writeNextChunk();
                }
                else {
                    resolve();
                }
            };
            writeNextChunk();
        });
    };
    File.cordovaFileError = {
        1: 'NOT_FOUND_ERR',
        2: 'SECURITY_ERR',
        3: 'ABORT_ERR',
        4: 'NOT_READABLE_ERR',
        5: 'ENCODING_ERR',
        6: 'NO_MODIFICATION_ALLOWED_ERR',
        7: 'INVALID_STATE_ERR',
        8: 'SYNTAX_ERR',
        9: 'INVALID_MODIFICATION_ERR',
        10: 'QUOTA_EXCEEDED_ERR',
        11: 'TYPE_MISMATCH_ERR',
        12: 'PATH_EXISTS_ERR',
        13: 'WRONG_ENTRY_TYPE',
        14: 'DIR_READ_ERR',
    };
    __decorate$36([
        Cordova()
    ], File, "getFreeDiskSpace", null);
    File = __decorate$36([
        Plugin({
            plugin: 'cordova-plugin-file',
            pluginRef: 'cordova.file',
            repo: 'https://github.com/apache/cordova-plugin-file'
        })
    ], File);
    return File;
}());

var __decorate$37 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name FileChooser
 * @description
 *
 * Opens the file picker on Android for the user to select a file, returns a file URI.
 *
 * @usage
 * ```
 * import {FileChooser} from 'ionic-native';
 *
 * FileChooser.open()
 *   .then(uri => console.log(uri);
 *   .catch(e => console.log(e);
 *
 * ```
 */
var FileChooser = (function () {
    function FileChooser() {
    }
    /**
     * Open a file
     */
    FileChooser.open = function () { return; };
    __decorate$37([
        Cordova()
    ], FileChooser, "open", null);
    FileChooser = __decorate$37([
        Plugin({
            plugin: 'http://github.com/don/cordova-filechooser.git',
            pluginRef: 'fileChooser',
            repo: 'https://github.com/don/cordova-filechooser',
            platforms: ['Android']
        })
    ], FileChooser);
    return FileChooser;
}());

var __decorate$38 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name FileOpener
 * @description
 * This plugin will open a file on your device file system with its default application.
 *
 * @usage
 * ```
 * import {FileOpener} from 'ionic-native';
 *
 *
 *
 * ```
 */
var FileOpener = (function () {
    function FileOpener() {
    }
    /**
     * Open an file
     * @param filePath {string} File Path
     * @param fileMIMEType {string} File MIME Type
     */
    FileOpener.open = function (filePath, fileMIMEType) { return; };
    /**
     * Uninstalls a package
     * @param packageId {string}  Package ID
     */
    FileOpener.uninstall = function (packageId) { return; };
    /**
     * Check if an app is already installed
     * @param packageId {string} Package ID
     */
    FileOpener.appIsInstalled = function (packageId) { return; };
    __decorate$38([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "open", null);
    __decorate$38([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "uninstall", null);
    __decorate$38([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "appIsInstalled", null);
    FileOpener = __decorate$38([
        Plugin({
            plugin: 'cordova-plugin-file-opener2',
            pluginRef: 'cordova.plugins.fileOpener2',
            repo: 'https://github.com/pwlin/cordova-plugin-file-opener2'
        })
    ], FileOpener);
    return FileOpener;
}());

var __decorate$39 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Transfer
 *
 * @description
 * This plugin allows you to upload and download files.
 *
 * @usage
 * ```typescript
 * import { Transfer } from 'ionic-native';
 *
 *
 * // Create instance:
 * const fileTransfer = new Transfer();
 *
 * // Upload a file:
 * fileTransfer.upload(..).then(..).catch(..);
 *
 * // Download a file:
 * fileTransfer.download(..).then(..).catch(..);
 *
 * // Abort active transfer:
 * fileTransfer.abort();
 *
 * E.g
 *
 * upload(){
 *   const fileTransfer = new Transfer();
 *   var options: any;
 *
 *   options = {
 *      fileKey: 'file',
 *      fileName: 'name.jpg',
 *      headers: {}
 *      .....
 *   }
 *   fileTransfer.upload("<file path>", "<api endpoint>", options)
 *    .then((data) => {
 *      // success
 *    }, (err) => {
 *      // error
 *    })
 * }
 *
 * ```
 *
 */
var Transfer = (function () {
    function Transfer() {
        this._objectInstance = new FileTransfer();
    }
    /**
     * Sends a file to a server.
     *
     * @param {string} fileUrl  Filesystem URL representing the file on the device or a data URI. For backwards compatibility, this can also be the full path of the file on the device.
     * @param {string} url  URL of the server to receive the file, as encoded by encodeURI().
     * @param {FileUploadOptions} options  Optional parameters.
     * @param {boolean} trustAllHosts  Optional parameter, defaults to false. If set to true, it accepts all security certificates. This is useful since Android rejects self-signed security certificates. Not recommended for production use. Supported on Android and iOS.
     * @return Returns a Promise that resolves to a FileUploadResult and rejects with FileTransferError.
     */
    Transfer.prototype.upload = function (fileUrl, url, options, trustAllHosts) {
        return;
    };
    /**
     * Downloads a file from server.
     *
     * @param {string} source  URL of the server to download the file, as encoded by encodeURI().
     * @param {stirng} target  Filesystem url representing the file on the device. For backwards compatibility, this can also be the full path of the file on the device.
     * @param {boolean} trustAllHosts  Optional parameter, defaults to false. If set to true, it accepts all security certificates. This is useful because Android rejects self-signed security certificates. Not recommended for production use. Supported on Android and iOS.
     * @param {object} Optional parameters, currently only supports headers (such as Authorization (Basic Authentication), etc).
     * @return Returns a Promise that resolves to a FileEntry object.
     */
    Transfer.prototype.download = function (source, target, trustAllHosts, options) {
        return;
    };
    /**
     * Registers a listener that gets called whenever a new chunk of data is transferred.
     * @param {function} Listener that takes a progress event.
     */
    Transfer.prototype.onProgress = function (listener) {
        this._objectInstance.onprogress = listener;
    };
    /**
     * Aborts an in-progress transfer. The onerror callback is passed a FileTransferError
     * object which has an error code of FileTransferError.ABORT_ERR.
     */
    Transfer.prototype.abort = function () { };
    /**
     * Error code rejected from upload with FileTransferError
     * Defined in FileTransferError.
     *      FILE_NOT_FOUND_ERR: 1   Return when file was not found
     *      INVALID_URL_ERR: 2,     Return when url was invalid
     *      CONNECTION_ERR: 3,      Return on connection error
     *      ABORT_ERR: 4,           Return on aborting
     *      NOT_MODIFIED_ERR: 5     Return on "304 Not Modified" HTTP response
     * @enum {number}
     */
    Transfer.FileTransferErrorCode = {
        FILE_NOT_FOUND_ERR: 1,
        INVALID_URL_ERR: 2,
        CONNECTION_ERR: 3,
        ABORT_ERR: 4,
        NOT_MODIFIED_ERR: 5
    };
    __decorate$39([
        CordovaInstance({
            successIndex: 2,
            errorIndex: 3
        })
    ], Transfer.prototype, "upload", null);
    __decorate$39([
        CordovaInstance({
            successIndex: 2,
            errorIndex: 3
        })
    ], Transfer.prototype, "download", null);
    __decorate$39([
        CordovaInstance({
            sync: true
        })
    ], Transfer.prototype, "abort", null);
    Transfer = __decorate$39([
        Plugin({
            plugin: 'cordova-plugin-file-transfer',
            pluginRef: 'FileTransfer',
            repo: 'https://github.com/apache/cordova-plugin-file-transfer'
        })
    ], Transfer);
    return Transfer;
}());

var __decorate$40 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Flashlight
 * @description This plugin allows you to switch the flashlight / torch of the device on and off.
 *
 * Requires Cordova plugin: `cordova-plugin-flashlight`. For more info, please see the [Flashlight plugin docs](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin).
 *
 * @usage
 * ```typescript
 * import { Flashlight } from 'ionic-native';
 *
 *
 *
 * ```
 */
var Flashlight = (function () {
    function Flashlight() {
    }
    /**
     * Checks if the flashlight is available
     * @returns {Promise<boolean>} Returns a promise that resolves with a boolean stating if the flashlight is available.
     */
    Flashlight.available = function () { return; };
    /**
     * Switches the flashlight on
     * @returns {Promise<boolean>}
     */
    Flashlight.switchOn = function () { return; };
    /**
     * Switches the flashlight off
     * @returns {Promise<boolean>}
     */
    Flashlight.switchOff = function () { return; };
    /**
     * Toggles the flashlight
     * @returns {Promise<any>}
     */
    Flashlight.toggle = function () { return; };
    /**
     * Checks if the flashlight is turned on.
     * @returns {boolean}
     */
    Flashlight.isSwitchedOn = function () { return; };
    __decorate$40([
        Cordova()
    ], Flashlight, "available", null);
    __decorate$40([
        Cordova()
    ], Flashlight, "switchOn", null);
    __decorate$40([
        Cordova()
    ], Flashlight, "switchOff", null);
    __decorate$40([
        Cordova()
    ], Flashlight, "toggle", null);
    __decorate$40([
        Cordova({
            sync: true
        })
    ], Flashlight, "isSwitchedOn", null);
    Flashlight = __decorate$40([
        Plugin({
            plugin: 'cordova-plugin-flashlight',
            pluginRef: 'window.plugins.flashlight',
            repo: 'https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git'
        })
    ], Flashlight);
    return Flashlight;
}());

var __decorate$41 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Geofence = (function () {
    function Geofence() {
    }
    /**
     * Initializes the plugin. User will be prompted to allow the app to use location and notifications.
     *
     * @return {Promise<any>}
     */
    Geofence.initialize = function () { return; };
    
    /**
     * Adds a new geofence or array of geofences. For geofence object, see above.
     *
     * @return {Promise<any>}
     */
    Geofence.addOrUpdate = function (geofences) { return; };
    
    /**
     * Removes a geofence or array of geofences. `geofenceID` corresponds to one or more IDs specified when the
     * geofence was created.
     *
     * @return {Promise<any>}
     */
    Geofence.remove = function (geofenceId) { return; };
    
    /**
     * Removes all geofences.
     *
     * @return {Promise<any>}
     */
    Geofence.removeAll = function () { return; };
    
    /**
     * Returns an array of geofences currently being monitored.
     *
     * @return {Promise<Array<string>>}
     */
    Geofence.getWatched = function () { return; };
    
    /**
     * Called when a geofence is crossed in the direction specified by `TransitType`.
     *
     * @return {Promise<any>}
     */
    Geofence.onTransitionReceived = function () {
        return new Observable_2(function (observer) {
            window && window.geofence && (window.geofence.onTransitionReceived = observer.next.bind(observer));
            return function () { return window.geofence.onTransitionReceived = function () { }; };
        });
    };
    /**
     * Called when the user clicks a geofence notification. iOS and Android only.
     *
     * @return {Promise<Object>}
     */
    Geofence.onNotificationClicked = function () {
        return new Observable_2(function (observer) {
            window && window.geofence && (window.geofence.onNotificationClicked = observer.next.bind(observer));
            return function () { return window.geofence.onNotificationClicked = function () { }; };
        });
    };
    Geofence.TransitionType = {
        ENTER: 1,
        EXIT: 2,
        BOTH: 3
    };
    __decorate$41([
        Cordova()
    ], Geofence, "initialize", null);
    __decorate$41([
        Cordova()
    ], Geofence, "addOrUpdate", null);
    __decorate$41([
        Cordova()
    ], Geofence, "remove", null);
    __decorate$41([
        Cordova()
    ], Geofence, "removeAll", null);
    __decorate$41([
        Cordova()
    ], Geofence, "getWatched", null);
    Geofence = __decorate$41([
        Plugin({
            plugin: 'cordova-plugin-geofence',
            pluginRef: 'geofence',
            repo: 'https://github.com/cowbell/cordova-plugin-geofence/',
            platforms: ['Android', 'iOS', 'Windows Phone 8', 'Windows Phone']
        })
    ], Geofence);
    return Geofence;
}());

var __decorate$42 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Geolocation
 * @description
 * This plugin provides information about the device's location, such as latitude and longitude. Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs.
 *
 *  This API is based on the W3C Geolocation API Specification, and only executes on devices that don't already provide an implementation.
 *
 * @usage
 *
 * ```typescript
 * import { Geolocation } from 'ionic-native';
 *
 *
 * Geolocation.getCurrentPosition().then((resp) => {
 *  // resp.coords.latitude
 *  // resp.coords.longitude
 * })
 *
 * let watch = Geolocation.watchPosition();
 * watch.subscribe((data) => {
 *  // data.coords.latitude
 *  // data.coords.longitude
 * })
 * ```
 */
var Geolocation = (function () {
    function Geolocation() {
    }
    /**
     * Get the device's current position.
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @return Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
     */
    Geolocation.getCurrentPosition = function (options) { return; };
    /**
     * Watch the current device's position.  Clear the watch by unsubscribing from
     * Observable changes.
     *
     * ```typescript
     * var subscription = Geolocation.watchPosition()
     *                               .filter((p) => p.code === undefined) //Filter Out Errors
     *                               .subscribe(position => {
     *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
     * });
     *
     * // To stop notifications
     * subscription.unsubscribe();
     * ```
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @return Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
     */
    Geolocation.watchPosition = function (options) {
        return new Observable_2(function (observer) {
            var watchId = navigator.geolocation.watchPosition(observer.next.bind(observer), observer.next.bind(observer), options);
            return function () { return navigator.geolocation.clearWatch(watchId); };
        });
    };
    __decorate$42([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Geolocation, "getCurrentPosition", null);
    Geolocation = __decorate$42([
        Plugin({
            plugin: 'cordova-plugin-geolocation',
            pluginRef: 'navigator.geolocation',
            repo: 'https://github.com/apache/cordova-plugin-geolocation'
        })
    ], Geolocation);
    return Geolocation;
}());

var __decorate$43 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Globalization
 * @description
 * @usage
 * ```typescript
 * import { Globalization } from 'ionic-native';
 *
 *
 * ```
 */
var Globalization = (function () {
    function Globalization() {
    }
    /**
     * Returns the BCP-47 compliant language identifier tag to the successCallback with a properties object as a parameter. That object should have a value property with a String value.
     * @return {Promise<{value: string}>}
     */
    Globalization.getPreferredLanguage = function () { return; };
    /**
     * Returns the BCP 47 compliant locale identifier string to the successCallback with a properties object as a parameter.
     * @return {Promise<{value: string}>}
     */
    Globalization.getLocaleName = function () { return; };
    /**
     * Converts date to string
     * @param {Date} date Date you wish to convert
     * @param options Options for the converted date. Length, selector.
     * @return {Promise<{value: string}>} Returns a promise when the date has been converted.
     */
    Globalization.dateToString = function (date, options) { return; };
    /**
     * Parses a date formatted as a string, according to the client's user preferences and calendar using the time zone of the client, and returns the corresponding date object.
     * @param {string} dateString Date as a string to be converted
     * @param options Options for the converted date. Length, selector.
     * @return {Promise<{value: string}>} Returns a promise when the date has been converted.
     */
    Globalization.stringToDate = function (dateString, options) { return; };
    /**
     * Returns a pattern string to format and parse dates according to the client's user preferences.
     * @param options Object with the format length and selector
     * @return {Promise<{value: string}>} Returns a promise.
     */
    Globalization.getDatePattern = function (options) { return; };
    /**
     * Returns an array of the names of the months or days of the week, depending on the client's user preferences and calendar.
     * @param options Object with type (narrow or wide) and item (month or days).
     * @return {Promise<{value: string}>} Returns a promise.
     */
    Globalization.getDateNames = function (options) { return; };
    /**
     * Indicates whether daylight savings time is in effect for a given date using the client's time zone and calendar.
     * @param {data} date Date to process
     * @returns {Promise<dst>} reutrns a promise with the value
     */
    Globalization.isDayLightSavingsTime = function (date) { return; };
    /**
     * Returns the first day of the week according to the client's user preferences and calendar.
     * @returns {Promise<value>} reutrns a promise with the value
     */
    Globalization.getFirstDayOfWeek = function () { return; };
    /**
     * Returns a number formatted as a string according to the client's user preferences.
     * @param options
     */
    Globalization.numberToString = function (options) { return; };
    /**
     *
     * @param {string} stringToConvert String you want to conver to a number
     * @param options  The type of number you want to return. Can be decimal, percent, or currency.
     * @returns {Promise} Returns a promise with the value.
     */
    Globalization.stringToNumber = function (stringToConvert, options) { return; };
    /**
     * Returns a pattern string to format and parse numbers according to the client's user preferences.
     * @param options Can be decimal, percent, or currency.
     * @returns {Promise} returns a promise with the value.
     */
    Globalization.getNumberPattern = function (options) { return; };
    /**
     * Returns a pattern string to format and parse currency values according to the client's user preferences and ISO 4217 currency code.
     * @param {string} currencyCode Currency Code.A
     * @returns {Promise} returns a promise with the value
     */
    Globalization.getCurrencyPattern = function (currencyCode) { return; };
    __decorate$43([
        Cordova()
    ], Globalization, "getPreferredLanguage", null);
    __decorate$43([
        Cordova()
    ], Globalization, "getLocaleName", null);
    __decorate$43([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Globalization, "dateToString", null);
    __decorate$43([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Globalization, "stringToDate", null);
    __decorate$43([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Globalization, "getDatePattern", null);
    __decorate$43([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Globalization, "getDateNames", null);
    __decorate$43([
        Cordova()
    ], Globalization, "isDayLightSavingsTime", null);
    __decorate$43([
        Cordova()
    ], Globalization, "getFirstDayOfWeek", null);
    __decorate$43([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Globalization, "numberToString", null);
    __decorate$43([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Globalization, "stringToNumber", null);
    __decorate$43([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Globalization, "getNumberPattern", null);
    __decorate$43([
        Cordova()
    ], Globalization, "getCurrencyPattern", null);
    Globalization = __decorate$43([
        Plugin({
            plugin: 'cordova-plugin-globalization',
            pluginRef: 'navigator.globalization',
            repo: 'https://github.com/apache/cordova-plugin-globalization'
        })
    ], Globalization);
    return Globalization;
}());

var __decorate$44 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Google Plus
 * @description
 * @usage
 * ```typescript
 * import { GooglePlus } from 'ionic-native';
 *
 *
 * ```
 */
var GooglePlus = (function () {
    function GooglePlus() {
    }
    /**
     * The login function walks the user through the Google Auth process.
     * @param options
     */
    GooglePlus.login = function (options) { return; };
    /**
     * You can call trySilentLogin to check if they're already signed in to the app and sign them in silently if they are.
     * @param options
     */
    GooglePlus.trySilentLogin = function (options) { return; };
    /**
     * This will clear the OAuth2 token.
     */
    GooglePlus.logout = function () { return; };
    /**
     * This will clear the OAuth2 token, forget which account was used to login, and disconnect that account from the app. This will require the user to allow the app access again next time they sign in. Be aware that this effect is not always instantaneous. It can take time to completely disconnect.
     */
    GooglePlus.disconnect = function () { return; };
    __decorate$44([
        Cordova()
    ], GooglePlus, "login", null);
    __decorate$44([
        Cordova()
    ], GooglePlus, "trySilentLogin", null);
    __decorate$44([
        Cordova()
    ], GooglePlus, "logout", null);
    __decorate$44([
        Cordova()
    ], GooglePlus, "disconnect", null);
    GooglePlus = __decorate$44([
        Plugin({
            plugin: 'cordova-plugin-googleplus',
            pluginRef: 'window.plugins.googleplus',
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-googleplus',
            platforms: ['Web', 'Android', 'iOS'],
            install: 'ionic plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid'
        })
    ], GooglePlus);
    return GooglePlus;
}());

var __decorate$45 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @private
 * You can listen to these events where appropriate
 */

/**
 * @private
 */

/**
 * @name Google Maps
 * @description This plugin uses the native Google Maps SDK
 * @usage
 * ```
 * import { GoogleMap, GoogleMapsEvent } from 'ionic-native';
 *
 * // create a new map using element ID
 * let map = new GoogleMap('elementID');
 *
 * // or create a new map by passing HTMLElement
 * let element: HTMLElement = document.getElementById('elementID');
 *
 * // In Angular 2 or Ionic 2, if we have this element in html: <div #map></div>
 * // then we can use @ViewChild to find the element and pass it to GoogleMaps
 * @ViewChild('map') mapElement;
 * let map = new GoogleMap(mapElement);
 *
 * // listen to MAP_READY event
 * map.one(GoogleMapsEvent.MAP_READY).subscribe(() => console.log('Map is ready!'));
 *
 *
 * // create LatLng object
 * let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
 *
 * // create CameraPosition
 * let position: CameraPosition = {
 *   target: ionic,
 *   zoom: 18,
 *   tilt: 30
 * };
 *
 * // move the map's camera to position
 * map.moveCamera(position);
 *
 * // create new marker
 * let markerOptions: GoogleMapsMarkerOptions = {
 *   position: ionic,
 *   title: 'Ionic'
 * };
 *
 * map.addMarker(markerOptions)
 *   .then((marker: GoogleMapsMarker) => {
 *     marker.showInfoWindow();
 *   });
 * ```
 */
var GoogleMap = (function () {
    function GoogleMap(element, options) {
        if (typeof element === 'string')
            element = document.getElementById(element);
        this._objectInstance = plugin.google.maps.Map.getMap(element, options);
    }
    /**
     * Checks if a map object has been created and is available.
     *
     * @return {Promise<boolean>}
     */
    GoogleMap.isAvailable = function () {
        return;
    };
    /**
     * Listen to a map event.
     *
     * @return {Observable<any>}
     */
    GoogleMap.prototype.on = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.on(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.off(event); };
        });
    };
    /**
     * Listen to a map event only once.
     *
     * @return {Promise<any>}
     */
    GoogleMap.prototype.one = function (event) {
        var _this = this;
        return new Promise(function (resolve) { return _this._objectInstance.one(event, resolve); });
    };
    GoogleMap.prototype.setDebuggable = function (isDebuggable) {
    };
    GoogleMap.prototype.setClickable = function (isClickable) {
    };
    /**
     * Get the position of the camera.
     *
     * @return {Promise<CameraPosition>}
     */
    GoogleMap.prototype.getCameraPosition = function () {
        return;
    };
    /**
     * Get the location of the user.
     *
     * @return {Promise<MyLocation>}
     */
    GoogleMap.prototype.getMyLocation = function (options) {
        return;
    };
    /**
     * Get the visible region.
     *
     * @return {Promise<VisibleRegion>}
     */
    GoogleMap.prototype.getVisibleRegion = function () {
        return;
    };
    GoogleMap.prototype.showDialog = function () {
    };
    GoogleMap.prototype.closeDialog = function () {
    };
    GoogleMap.prototype.getLicenseInfo = function () {
        return;
    };
    GoogleMap.prototype.setCenter = function (latLng) {
    };
    GoogleMap.prototype.setZoom = function (zoomLevel) {
    };
    GoogleMap.prototype.setMapTypeId = function (typeId) {
    };
    GoogleMap.prototype.setTilt = function (tiltLevel) {
    };
    GoogleMap.prototype.animateCamera = function (animateCameraOptions) { return; };
    GoogleMap.prototype.moveCamera = function (cameraPosition) { return; };
    GoogleMap.prototype.setMyLocationEnabled = function (enabled) {
    };
    GoogleMap.prototype.setIndoorEnabled = function (enabled) {
    };
    GoogleMap.prototype.setTrafficEnabled = function (enabled) {
    };
    GoogleMap.prototype.setCompassEnabled = function (enabled) {
    };
    GoogleMap.prototype.setAllGesturesEnabled = function (enabled) {
    };
    GoogleMap.prototype.addMarker = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addMarker(options, function (marker) {
                if (marker) {
                    resolve(new GoogleMapsMarker(marker));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addCircle = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addCircle(options, function (circle) {
                if (circle) {
                    resolve(new GoogleMapsCircle(circle));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addPolygon = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addPolygon(options, function (polygon) {
                if (polygon) {
                    resolve(new GoogleMapsPolygon(polygon));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addPolyline = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addPolyline(options, function (polyline) {
                if (polyline) {
                    resolve(new GoogleMapsPolyline(polyline));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addTileOverlay = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addTileOverlay(options, function (tileOverlay) {
                if (tileOverlay) {
                    resolve(new GoogleMapsTileOverlay(tileOverlay));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addGroundOverlay = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addGroundOverlay(options, function (groundOverlay) {
                if (groundOverlay) {
                    resolve(new GoogleMapsGroundOverlay(groundOverlay));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.addKmlOverlay = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.addKmlOverlay(options, function (kmlOverlay) {
                if (kmlOverlay) {
                    resolve(new GoogleMapsKmlOverlay(kmlOverlay));
                }
                else {
                    reject();
                }
            });
        });
    };
    GoogleMap.prototype.setDiv = function (domNode) {
    };
    GoogleMap.prototype.setVisible = function (visible) {
    };
    GoogleMap.prototype.setOptions = function (options) {
    };
    GoogleMap.prototype.setBackgroundColor = function (backgroundColor) {
    };
    GoogleMap.prototype.setPadding = function (top, right, bottom, left) {
    };
    GoogleMap.prototype.clear = function () {
    };
    GoogleMap.prototype.refreshLayout = function () {
    };
    GoogleMap.prototype.fromLatLngToPoint = function (latLng, point) {
        return;
    };
    GoogleMap.prototype.fromPointToLatLng = function (point, latLng) {
        return;
    };
    GoogleMap.prototype.toDataURL = function () {
        return;
    };
    GoogleMap.prototype.remove = function () {
    };
    GoogleMap.prototype.panBy = function () {
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setDebuggable", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setClickable", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "getCameraPosition", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "getMyLocation", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "getVisibleRegion", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "showDialog", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "closeDialog", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "getLicenseInfo", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setCenter", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setZoom", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setMapTypeId", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setTilt", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "animateCamera", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "moveCamera", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setMyLocationEnabled", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setIndoorEnabled", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setTrafficEnabled", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setCompassEnabled", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setAllGesturesEnabled", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setDiv", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setOptions", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setBackgroundColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "setPadding", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "clear", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "refreshLayout", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "fromLatLngToPoint", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "fromPointToLatLng", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMap.prototype, "toDataURL", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMap.prototype, "panBy", null);
    __decorate$45([
        Cordova()
    ], GoogleMap, "isAvailable", null);
    GoogleMap = __decorate$45([
        Plugin({
            pluginRef: 'plugin.google.maps.Map',
            plugin: 'cordova-plugin-googlemaps',
            repo: 'https://github.com/mapsplugin/cordova-plugin-googlemaps',
            install: 'ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"'
        })
    ], GoogleMap);
    return GoogleMap;
}());
/**
 * @private
 */
var GoogleMapsMarker = (function () {
    function GoogleMapsMarker(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsMarker.prototype.addEventListener = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    GoogleMapsMarker.prototype.isVisible = function () {
        return;
    };
    GoogleMapsMarker.prototype.setVisible = function (visible) {
    };
    GoogleMapsMarker.prototype.getHashCode = function () {
        return;
    };
    GoogleMapsMarker.prototype.remove = function () {
    };
    GoogleMapsMarker.prototype.setOpacity = function (alpha) {
    };
    GoogleMapsMarker.prototype.getOpacity = function () {
        return;
    };
    GoogleMapsMarker.prototype.setZIndex = function () {
    };
    GoogleMapsMarker.prototype.setIconAnchor = function (x, y) {
    };
    GoogleMapsMarker.prototype.setInfoWindowAnchor = function (x, y) {
    };
    GoogleMapsMarker.prototype.setDraggable = function (draggable) {
    };
    GoogleMapsMarker.prototype.isDraggable = function () {
        return;
    };
    GoogleMapsMarker.prototype.setFlat = function (flat) {
        return;
    };
    GoogleMapsMarker.prototype.setIcon = function (icon) {
    };
    GoogleMapsMarker.prototype.setTitle = function (title) {
    };
    GoogleMapsMarker.prototype.getTitle = function () {
        return;
    };
    GoogleMapsMarker.prototype.setSnippet = function (snippet) {
    };
    GoogleMapsMarker.prototype.getSnippet = function () {
        return;
    };
    GoogleMapsMarker.prototype.setRotation = function (rotation) {
    };
    GoogleMapsMarker.prototype.getRotation = function () {
        return;
    };
    GoogleMapsMarker.prototype.showInfoWindow = function () {
        return;
    };
    GoogleMapsMarker.prototype.hideInfoWindow = function () {
        return;
    };
    GoogleMapsMarker.prototype.setPosition = function (latLng) {
    };
    GoogleMapsMarker.prototype.getPosition = function () {
        return;
    };
    GoogleMapsMarker.prototype.getMap = function () {
        return;
    };
    GoogleMapsMarker.prototype.setAnimation = function (animation) {
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "isVisible", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMapsMarker.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getHashCode", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setIconAnchor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setInfoWindowAnchor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setDraggable", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "isDraggable", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setFlat", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setIcon", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setTitle", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getTitle", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setSnippet", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getSnippet", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setRotation", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getRotation", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "showInfoWindow", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "hideInfoWindow", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setPosition", null);
    __decorate$45([
        CordovaInstance()
    ], GoogleMapsMarker.prototype, "getPosition", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "getMap", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsMarker.prototype, "setAnimation", null);
    return GoogleMapsMarker;
}());
/**
 * @private
 */
var GoogleMapsCircle = (function () {
    function GoogleMapsCircle(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsCircle.prototype.addEventListener = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    GoogleMapsCircle.prototype.getCenter = function () {
        return;
    };
    GoogleMapsCircle.prototype.getRadius = function () {
        return;
    };
    GoogleMapsCircle.prototype.getStrokeColor = function () {
        return;
    };
    GoogleMapsCircle.prototype.getVisible = function () {
        return;
    };
    GoogleMapsCircle.prototype.getZIndex = function () {
        return;
    };
    GoogleMapsCircle.prototype.remove = function () {
    };
    GoogleMapsCircle.prototype.setCenter = function (latLng) {
    };
    GoogleMapsCircle.prototype.setFillColor = function (fillColor) {
    };
    GoogleMapsCircle.prototype.setStrokeColor = function (strokeColor) {
    };
    GoogleMapsCircle.prototype.setStrokeWidth = function (strokeWidth) {
    };
    GoogleMapsCircle.prototype.setVisible = function (visible) {
    };
    GoogleMapsCircle.prototype.setZIndex = function (zIndex) {
    };
    GoogleMapsCircle.prototype.setRadius = function (radius) {
    };
    GoogleMapsCircle.prototype.getMap = function () {
        return;
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getCenter", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getRadius", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getStrokeColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setCenter", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setFillColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setStrokeColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setStrokeWidth", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "setRadius", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsCircle.prototype, "getMap", null);
    return GoogleMapsCircle;
}());
/**
 * @private
 */
var GoogleMapsPolyline = (function () {
    function GoogleMapsPolyline(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsPolyline.prototype.addEventListener = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    GoogleMapsPolyline.prototype.getPoints = function () {
        return;
    };
    GoogleMapsPolyline.prototype.getCOlor = function () {
        return;
    };
    GoogleMapsPolyline.prototype.getWidth = function () {
        return;
    };
    GoogleMapsPolyline.prototype.getGeodesic = function () {
        return;
    };
    GoogleMapsPolyline.prototype.getZIndex = function () {
        return;
    };
    GoogleMapsPolyline.prototype.remove = function () {
    };
    GoogleMapsPolyline.prototype.setPoints = function (points) {
    };
    GoogleMapsPolyline.prototype.setColor = function (color) {
    };
    GoogleMapsPolyline.prototype.setWidth = function (width) {
    };
    GoogleMapsPolyline.prototype.setVisible = function (visible) {
    };
    GoogleMapsPolyline.prototype.setZIndex = function (zIndex) {
    };
    GoogleMapsPolyline.prototype.setGeoDesic = function (geoDesic) {
    };
    GoogleMapsPolyline.prototype.getMap = function () {
        return;
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getPoints", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getCOlor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getWidth", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getGeodesic", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setPoints", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setWidth", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "setGeoDesic", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolyline.prototype, "getMap", null);
    return GoogleMapsPolyline;
}());
/**
 * @private
 */
var GoogleMapsPolygon = (function () {
    function GoogleMapsPolygon(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsPolygon.prototype.addEventListener = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    GoogleMapsPolygon.prototype.getPoints = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getStrokeColor = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getFillColor = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getStrokeWidth = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getGeodesic = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getVisible = function () {
        return;
    };
    GoogleMapsPolygon.prototype.getZIndex = function () {
        return;
    };
    GoogleMapsPolygon.prototype.remove = function () {
    };
    GoogleMapsPolygon.prototype.setPoints = function (points) {
    };
    GoogleMapsPolygon.prototype.setStrokeColor = function (strokeColor) {
    };
    GoogleMapsPolygon.prototype.setFillColor = function (fillColor) {
    };
    GoogleMapsPolygon.prototype.setStrokeWidth = function (strokeWidth) {
    };
    GoogleMapsPolygon.prototype.setVisible = function (visible) {
    };
    GoogleMapsPolygon.prototype.setZIndex = function (zIndex) {
    };
    GoogleMapsPolygon.prototype.setGeodesic = function (geodesic) {
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getPoints", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getStrokeColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getFillColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getStrokeWidth", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getGeodesic", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "getZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setPoints", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setStrokeColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setFillColor", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setStrokeWidth", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsPolygon.prototype, "setGeodesic", null);
    return GoogleMapsPolygon;
}());
/**
 * @private
 */
var GoogleMapsTileOverlay = (function () {
    function GoogleMapsTileOverlay(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsTileOverlay.prototype.getVisible = function () {
        return;
    };
    GoogleMapsTileOverlay.prototype.setVisible = function (visible) {
    };
    GoogleMapsTileOverlay.prototype.getFadeIn = function () {
        return;
    };
    GoogleMapsTileOverlay.prototype.setFadeIn = function (fadeIn) {
    };
    GoogleMapsTileOverlay.prototype.getZIndex = function () {
        return;
    };
    GoogleMapsTileOverlay.prototype.setZIndex = function (zIndex) {
    };
    GoogleMapsTileOverlay.prototype.getOpacity = function () {
        return;
    };
    GoogleMapsTileOverlay.prototype.setOpacity = function (opacity) {
    };
    GoogleMapsTileOverlay.prototype.clearTileCache = function () {
    };
    GoogleMapsTileOverlay.prototype.remove = function () {
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "getVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "getFadeIn", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "setFadeIn", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "getZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "setZIndex", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "getOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "setOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "clearTileCache", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsTileOverlay.prototype, "remove", null);
    return GoogleMapsTileOverlay;
}());
/**
 * @private
 */
var GoogleMapsGroundOverlay = (function () {
    function GoogleMapsGroundOverlay(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsGroundOverlay.prototype.setBearing = function (bearing) {
    };
    GoogleMapsGroundOverlay.prototype.getBearing = function () {
        return;
    };
    GoogleMapsGroundOverlay.prototype.setOpacity = function (opacity) {
    };
    GoogleMapsGroundOverlay.prototype.getOpacity = function () {
        return;
    };
    GoogleMapsGroundOverlay.prototype.setVisible = function (visible) {
    };
    GoogleMapsGroundOverlay.prototype.getVisible = function () {
        return;
    };
    GoogleMapsGroundOverlay.prototype.setImage = function (image) {
    };
    
    GoogleMapsGroundOverlay.prototype.remove = function () {
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "setBearing", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "getBearing", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "setOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "getOpacity", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "setVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "getVisible", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "setImage", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsGroundOverlay.prototype, "remove", null);
    return GoogleMapsGroundOverlay;
}());
/**
 * @private
 */
var GoogleMapsKmlOverlay = (function () {
    function GoogleMapsKmlOverlay(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    GoogleMapsKmlOverlay.prototype.remove = function () {
    };
    GoogleMapsKmlOverlay.prototype.getOverlays = function () {
        return;
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsKmlOverlay.prototype, "remove", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsKmlOverlay.prototype, "getOverlays", null);
    return GoogleMapsKmlOverlay;
}());
/**
 * @private
 */
var GoogleMapsLatLngBounds = (function () {
    function GoogleMapsLatLngBounds(southwestOrArrayOfLatLng, northeast) {
        this.southwestOrArrayOfLatLng = southwestOrArrayOfLatLng;
        this.northeast = northeast;
        var args = !!northeast ? [southwestOrArrayOfLatLng, northeast] : southwestOrArrayOfLatLng;
        this._objectInstance = new plugin.google.maps.LatLngBounds(args);
    }
    GoogleMapsLatLngBounds.prototype.toString = function () {
        return;
    };
    GoogleMapsLatLngBounds.prototype.toUrlValue = function (precision) {
        return;
    };
    GoogleMapsLatLngBounds.prototype.extend = function (LatLng) {
    };
    GoogleMapsLatLngBounds.prototype.contains = function (LatLng) {
        return;
    };
    GoogleMapsLatLngBounds.prototype.getCenter = function () {
        return;
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLngBounds.prototype, "toString", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLngBounds.prototype, "toUrlValue", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLngBounds.prototype, "extend", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLngBounds.prototype, "contains", null);
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLngBounds.prototype, "getCenter", null);
    return GoogleMapsLatLngBounds;
}());
/**
 * @private
 */
var GoogleMapsLatLng = (function () {
    function GoogleMapsLatLng(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this._objectInstance = new plugin.google.maps.LatLng(lat, lng);
    }
    GoogleMapsLatLng.prototype.equals = function (other) {
        return this.lat === other.lat && this.lng === other.lng;
    };
    GoogleMapsLatLng.prototype.toString = function () {
        return;
    };
    GoogleMapsLatLng.prototype.toUrlValue = function (precision) {
        precision = precision || 6;
        return this.lat.toFixed(precision) + ',' + this.lng.toFixed(precision);
    };
    __decorate$45([
        CordovaInstance({ sync: true })
    ], GoogleMapsLatLng.prototype, "toString", null);
    return GoogleMapsLatLng;
}());
/**
 * @private
 */

var __decorate$46 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Google Analytics
 * @description
 * This plugin connects to Google's native Universal Analytics SDK
 * Prerequisites:
 * - A Cordova 3.0+ project for iOS and/or Android
 * - A Mobile App property through the Google Analytics Admin Console
 * - (Android) Google Play Services SDK installed via [Android SDK Manager](https://developer.android.com/sdk/installing/adding-packages.html)
 */
var GoogleAnalytics = (function () {
    function GoogleAnalytics() {
    }
    /**
     * In your 'deviceready' handler, set up your Analytics tracker.
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/
     * @param {string}  id  Your Google Analytics Mobile App property
     */
    GoogleAnalytics.startTrackerWithId = function (id) { return; };
    /**
     * Track a screen
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/screens
     *
     * @param {string}  title         Screen title
     * @param {string}  campaignUrl   Campaign url for measuring referrals
     */
    GoogleAnalytics.trackView = function (title, campaignUrl) { return; };
    /**
     * Track an event
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     * @param {string}  category
     * @param {string}  action
     * @param {string}  label
     * @param {number}  value
     */
    GoogleAnalytics.trackEvent = function (category, action, label, value) { return; };
    /**
     * Track an exception
     * @param {string}  description
     * @param {boolean} fatal
     */
    GoogleAnalytics.trackException = function (description, fatal) { return; };
    /**
     * Track User Timing (App Speed)
     * @param {string}  category
     * @param {number}  intervalInMilliseconds
     * @param {string}  variable
     * @param {string}  label
     */
    GoogleAnalytics.trackTiming = function (category, intervalInMilliseconds, variable, label) { return; };
    /**
     * Add a Transaction (Ecommerce)
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addTrans
     * @param {string}  id
     * @param {string}  affiliation
     * @param {number}  revenue
     * @param {number}  tax
     * @param {number}  shipping
     * @param {string}  currencyCode
     */
    GoogleAnalytics.addTransaction = function (id, affiliation, revenue, tax, shipping, currencyCode) { return; };
    /**
     * Add a Transaction Item (Ecommerce)
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addItem
     * @param {string}  id
     * @param {string}  name
     * @param {string}  sku
     * @param {string}  category
     * @param {number}  price
     * @param {number}  quantity
     * @param {string}  currencyCode
     */
    GoogleAnalytics.addTransactionItem = function (id, name, sku, category, price, quantity, currencyCode) { return; };
    /**
     * Add a Custom Dimension
     * https://developers.google.com/analytics/devguides/platform/customdimsmets
     * @param {string}  key
     * @param {string}  value
     */
    GoogleAnalytics.addCustomDimension = function (key, value) { return; };
    /**
     * Set a UserId
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id
     * @param {string}  id
     */
    GoogleAnalytics.setUserId = function (id) { };
    /**
     * Sets the app version
     * @param appVersion
     */
    GoogleAnalytics.setAppVersion = function (appVersion) { };
    /**
     * Set a anonymize Ip address
     * @param anonymize
     */
    GoogleAnalytics.setAnonymizeIp = function (anonymize) { };
    /**
     * Enabling Advertising Features in Google Analytics allows you to take advantage of Remarketing, Demographics & Interests reports, and more
     * @param allow
     */
    GoogleAnalytics.setAllowIDFACollection = function (allow) { };
    /**
     * Enable verbose logging
     */
    GoogleAnalytics.debugMode = function () { return; };
    /**
     * Enable/disable automatic reporting of uncaught exceptions
     * @param {boolean} shouldEnable
     */
    GoogleAnalytics.enableUncaughtExceptionReporting = function (shouldEnable) { return; };
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "startTrackerWithId", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "trackView", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "trackEvent", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "trackException", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "trackTiming", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "addTransaction", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "addTransactionItem", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "addCustomDimension", null);
    __decorate$46([
        Cordova({ sync: true })
    ], GoogleAnalytics, "setUserId", null);
    __decorate$46([
        Cordova({ sync: true })
    ], GoogleAnalytics, "setAppVersion", null);
    __decorate$46([
        Cordova({ sync: true })
    ], GoogleAnalytics, "setAnonymizeIp", null);
    __decorate$46([
        Cordova({ sync: true })
    ], GoogleAnalytics, "setAllowIDFACollection", null);
    __decorate$46([
        Cordova({ sync: true })
    ], GoogleAnalytics, "debugMode", null);
    __decorate$46([
        Cordova()
    ], GoogleAnalytics, "enableUncaughtExceptionReporting", null);
    GoogleAnalytics = __decorate$46([
        Plugin({
            plugin: 'cordova-plugin-google-analytics',
            pluginRef: 'analytics',
            repo: 'https://github.com/danwilson/google-analytics-plugin',
            platforms: ['Android', 'iOS']
        })
    ], GoogleAnalytics);
    return GoogleAnalytics;
}());

var __decorate$47 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Hotspot
 * @description
 * @usage
 * ```typescript
 * import { Hotspot, Network } from 'ionic-native';
 *
 *
 * Hotspot.scanWifi().then((networks: Array<Network>) => {
 *     console.log(networks);
 * });
 *
 * ```
 */
var Hotspot = (function () {
    function Hotspot() {
    }
    Hotspot.isAvailable = function () { return; };
    Hotspot.toggleWifi = function () { return; };
    /**
     * Configures and starts hotspot with SSID and Password
     *
     * @param {string}    SSID        - SSID of your new Access Point
     * @param {string}    mode        - encryption mode (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password    - password for your new Access Point
     *
     * @return {Promise<void>}        - Promise to call once hotspot is started, or reject upon failure
     */
    Hotspot.createHotspot = function (ssid, mode, password) { return; };
    /**
     * Turns on Access Point
     *
     * @return {Promise<boolean>} - true if AP is started
     */
    Hotspot.startHotspot = function () { return; };
    /**
     * Configures hotspot with SSID and Password
     *
     * @param {string}    SSID        - SSID of your new Access Point
     * @param {string}    mode        - encryption mode (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password    - password for your new Access Point
     *
     * @return {Promise<void>}        - Promise to call when hotspot is configured, or reject upon failure
     */
    Hotspot.configureHotspot = function (ssid, mode, password) { return; };
    /**
     * Turns off Access Point
     *
     * @return {Promise<boolean>} - Promise to turn off the hotspot, true on success, false on failure
     */
    Hotspot.stopHotspot = function () { return; };
    /**
     * Checks if hotspot is enabled
     *
     * @return {Promise<void>}    - Promise that hotspot is enabled, rejected if it is not enabled
     */
    Hotspot.isHotspotEnabled = function () { return; };
    Hotspot.getAllHotspotDevices = function () { return; };
    /**
     * Connect to a WiFi network
     *
     * @param {string}    ssid
     *      SSID to connect
     * @param {string}    password
     *      password to use
     *
     * @return {Promise<void>}
     *      Promise that connection to the WiFi network was successfull, rejected if unsuccessful
     */
    Hotspot.connectToWifi = function (ssid, password) { return; };
    /**
     * Connect to a WiFi network
     *
     * @param {string}   ssid
     *      SSID to connect
     * @param {string}   password
     *      Password to use
     * @param {string}   authentication
     *      Authentication modes to use (LEAP, SHARED, OPEN)
     * @param {string[]} encryption
     *      Encryption modes to use (CCMP, TKIP, WEP104, WEP40)
     *
     * @return {Promise<void>}
     *      Promise that connection to the WiFi network was successfull, rejected if unsuccessful
     */
    Hotspot.connectToWifiAuthEncrypt = function (ssid, password, authentication, encryption) { return; };
    /**
     * Add a WiFi network
     *
     * @param {string}    ssid
     *      SSID of network
     * @param {string}    mode
     *      Authentication mode of (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password
     *      Password for network
     *
     * @return {Promise<void>}
     *      Promise that adding the WiFi network was successfull, rejected if unsuccessful
     */
    Hotspot.addWifiNetwork = function (ssid, mode, password) { return; };
    /**
     * Remove a WiFi network
     *
     * @param {string}    ssid
     *      SSID of network
     *
     * @return {Promise<void>}
     *      Promise that removing the WiFi network was successfull, rejected if unsuccessful
     */
    Hotspot.removeWifiNetwork = function (ssid) { return; };
    Hotspot.isConnectedToInternet = function () { return; };
    Hotspot.isConnectedToInternetViaWifi = function () { return; };
    Hotspot.isWifiOn = function () { return; };
    Hotspot.isWifiSupported = function () { return; };
    Hotspot.isWifiDirectSupported = function () { return; };
    Hotspot.scanWifi = function () { return; };
    Hotspot.scanWifiByLevel = function () { return; };
    Hotspot.startWifiPeriodicallyScan = function (interval, duration) { return; };
    Hotspot.stopWifiPeriodicallyScan = function () { return; };
    Hotspot.getNetConfig = function () { return; };
    Hotspot.getConnectionInfo = function () { return; };
    Hotspot.pingHost = function (ip) { return; };
    /**
     * Gets MAC Address associated with IP Address from ARP File
     *
     * @param {string}        ip  - IP Address that you want the MAC Address of
     *
     * @return {Promise<string>}  - A Promise for the MAC Address
     */
    Hotspot.getMacAddressOfHost = function (ip) { return; };
    /**
     * Checks if IP is live using DNS
     *
     * @param {string}        ip  - IP Address you want to test
     *
     * @return {Promise<boolean>} - A Promise for whether the IP Address is reachable
     */
    Hotspot.isDnsLive = function (ip) { return; };
    /**
     * Checks if IP is live using socket And PORT
     *
     * @param {string}        ip  - IP Address you want to test
     *
     * @return {Promise<boolean>} - A Promise for whether the IP Address is reachable
     */
    Hotspot.isPortLive = function (ip) { return; };
    /**
     * Checks if device is rooted
     *
     * @return {Promise<boolean>} - A Promise for whether the device is rooted
     */
    Hotspot.isRooted = function () { return; };
    __decorate$47([
        Cordova()
    ], Hotspot, "isAvailable", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "toggleWifi", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "createHotspot", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "startHotspot", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "configureHotspot", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "stopHotspot", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isHotspotEnabled", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "getAllHotspotDevices", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "connectToWifi", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "connectToWifiAuthEncrypt", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "addWifiNetwork", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "removeWifiNetwork", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isConnectedToInternet", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isConnectedToInternetViaWifi", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isWifiOn", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isWifiSupported", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isWifiDirectSupported", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "scanWifi", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "scanWifiByLevel", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "startWifiPeriodicallyScan", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "stopWifiPeriodicallyScan", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "getNetConfig", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "getConnectionInfo", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "pingHost", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "getMacAddressOfHost", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isDnsLive", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isPortLive", null);
    __decorate$47([
        Cordova()
    ], Hotspot, "isRooted", null);
    Hotspot = __decorate$47([
        Plugin({
            plugin: 'cordova-plugin-hotspot',
            pluginRef: 'cordova.plugins.hotspot',
            repo: 'https://github.com/hypery2k/cordova-hotspot-plugin',
            platforms: ['Android']
        })
    ], Hotspot);
    return Hotspot;
}());

var __decorate$48 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Httpd
 * @description
 * Embedded httpd for Cordova apps. Light weight HTTP server.
 * @usage
 * ```typescript
 * import {Httpd, HttpdOptions} from 'ionic-native';
 *
 * let options: HttpdOptions = {
 *      www_root: 'httpd_root', // relative path to app's www directory
 *      port: 80,
 *      localhost_only: false
 *  };
 *
 * Httpd.startServer(options).subscribe((data) => {
 *  console.log('Server is live');
 * });
 *
 * ```
 */
var Httpd = (function () {
    function Httpd() {
    }
    /**
     * Starts a web server.
     * @returns {Observable<string>} Returns an Observable. Subscribe to receive the URL for your web server (if succeeded). Unsubscribe to stop the server.
     * @param options {HttpdOptions}
     */
    Httpd.startServer = function (options) { return; };
    /**
     * Gets the URL of the running server
     * @returns {Promise<string>} Returns a promise that resolves with the URL of the web server.
     */
    Httpd.getUrl = function () { return; };
    /**
     * Get the local path of the running webserver
     * @returns {Promise<string>} Returns a promise that resolves with the local path of the web server.
      */
    Httpd.getLocalPath = function () { return; };
    __decorate$48([
        Cordova({
            observable: true,
            clearFunction: 'stopServer'
        })
    ], Httpd, "startServer", null);
    __decorate$48([
        Cordova()
    ], Httpd, "getUrl", null);
    __decorate$48([
        Cordova()
    ], Httpd, "getLocalPath", null);
    Httpd = __decorate$48([
        Plugin({
            plugin: 'https://github.com/floatinghotpot/cordova-httpd.git',
            pluginRef: 'cordova.plugins.CorHttpd',
            repo: 'https://github.com/floatinghotpot/cordova-httpd',
            platforms: ['iOS', 'Android']
        })
    ], Httpd);
    return Httpd;
}());

var __decorate$49 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name IBeacon
 * @description
 * This plugin provides functions for working with iBeacons.
 *
 *  The plugin's API closely mimics the one exposed through the [CLLocationManager](https://developer.apple.com/library/ios/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html) introduced in iOS 7.
 *
 * @usage
 *
 * ```typescript
 * import { IBeacon } from 'ionic-native';
 *
 *
 * // Request permission to use location on iOS
 * IBeacon.requestAlwaysAuthorization();
 * // create a new delegate and register it with the native layer
 * let delegate = IBeacon.Delegate();
 *
 * // Subscribe to some of the delegate's event handlers
 * delegate.didRangeBeaconsInRegion()
 *   .subscribe(
 *     data => console.log('didRangeBeaconsInRegion: ', data),
 *     error => console.error();
 *   );
 * delegate.didStartMonitoringForRegion()
 *   .subscribe(
 *     data => console.log('didStartMonitoringForRegion: ', data),
 *     error => console.error();
 *   );
 * delegate.didEnterRegion()
 *   .subscribe(
 *     data => {
 *       console.log('didEnterRegion: ', data);
 *     }
 *   );
 *
 * let beaconRegion = IBeacon.BeaconRegion('deskBeacon','F7826DA6-ASDF-ASDF-8024-BC5B71E0893E');
 *
 * IBeacon.startMonitoringForRegion(beaconRegion)
 *   .then(
 *     () => console.log('Native layer recieved the request to monitoring'),
 *     error => console.error('Native layer failed to begin monitoring: ', error)
 *   );
 * ```
 */
var IBeacon = (function () {
    function IBeacon() {
    }
    /**
     * Instances of this class are delegates between the {@link LocationManager} and
     * the code that consumes the messages generated on in the native layer.
     *
     * @returns {Delegate} An instance of the type {@type Delegate}.
     */
    IBeacon.Delegate = function () {
        var delegate = new cordova.plugins.locationManager.Delegate();
        delegate.didChangeAuthorizationStatus = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didChangeAuthorizationStatus = cb;
            });
        };
        delegate.didDetermineStateForRegion = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didDetermineStateForRegion = cb;
            });
        };
        delegate.didEnterRegion = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didEnterRegion = cb;
            });
        };
        delegate.didExitRegion = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didExitRegion = cb;
            });
        };
        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didRangeBeaconsInRegion = cb;
            });
        };
        delegate.didStartMonitoringForRegion = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.didStartMonitoringForRegion = cb;
            });
        };
        delegate.monitoringDidFailForRegionWithError = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.monitoringDidFailForRegionWithError = cb;
            });
        };
        delegate.peripheralManagerDidStartAdvertising = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.peripheralManagerDidStartAdvertising = cb;
            });
        };
        delegate.peripheralManagerDidUpdateState = function (pluginResult) {
            return new Observable_2(function (observer) {
                var cb = function (data) { return observer.next(data); };
                return delegate.peripheralManagerDidUpdateState = cb;
            });
        };
        cordova.plugins.locationManager.setDelegate(delegate);
        return delegate;
    };
    /**
     * Creates a new BeaconRegion
     *
     * @param {String} identifier @see {CLRegion}
     * @param {String} uuid The proximity ID of the beacon being targeted.
     * This value must not be blank nor invalid as a UUID.
     * @param {Number} major The major value that you use to identify one or more beacons.
     * @param {Number} minor The minor value that you use to identify a specific beacon.
     * @param {BOOL} notifyEntryStateOnDisplay
     *
     * @return Returns the BeaconRegion that was created
     */
    IBeacon.BeaconRegion = function (identifer, uuid, major, minor, notifyEntryStateOnDisplay) {
        return new cordova.plugins.locationManager.BeaconRegion(identifer, uuid, major, minor, notifyEntryStateOnDisplay);
    };
    /**
     * @return Returns the Delegate
     */
    IBeacon.getDelegate = function () { return; };
    /**
     * @param {Delegate} delegate An instance of a delegate to register with the native layer.
     *
     * @return Returns the Delegate
     */
    IBeacon.setDelegate = function (delegate) { return; };
    /**
     * Signals the native layer that the client side is ready to consume messages.
     * Readiness here means that it has a {Delegate} set by the consumer javascript
     * code.
     *
     * The {LocationManager.setDelegate()} will implicitly call this method as well,
     * therefore the only case when you have to call this manually is if you don't
     * wish to specify a {Delegate} of yours.
     *
     * The purpose of this signaling mechanism is to make the events work when the
     * app is being woken up by the Operating System to give it a chance to handle
     * region monitoring events for example.
     *
     * If you don't set a {Delegate} and don't call this method manually, an error
     * message get emitted in the native runtime and the DOM as well after a certain
     * period of time.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the request and started to send events.
     */
    IBeacon.onDomDelegateReady = function () { return; };
    /**
     * Determines if bluetooth is switched on, according to the native layer.
     * @returns Returns a promise which is resolved with a {Boolean}
     * indicating whether bluetooth is active.
     */
    IBeacon.isBluetoothEnabled = function () { return; };
    /**
     * Enables Bluetooth using the native Layer. (ANDROID ONLY)
     *
     * @returns Returns a promise which is resolved when Bluetooth
     * could be enabled. If not, the promise will be rejected with an error.
     */
    IBeacon.enableBluetooth = function () { return; };
    /**
     * Disables Bluetooth using the native Layer. (ANDROID ONLY)
     *
     * @returns Returns a promise which is resolved when Bluetooth
     * could be enabled. If not, the promise will be rejected with an error.
     */
    IBeacon.disableBluetooth = function () { return; };
    /**
     * Start monitoring the specified region.
     *
     * If a region of the same type with the same identifier is already being
     * monitored for this application,
     * it will be removed from monitoring. For circular regions, the region
     * monitoring service will prioritize
     * regions by their size, favoring smaller regions over larger regions.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the monitoring request.
     */
    IBeacon.startMonitoringForRegion = function (region) { return; };
    /**
     * Stop monitoring the specified region.  It is valid to call
     * stopMonitoringForRegion: for a region that was registered for monitoring
     * with a different location manager object, during this or previous
     * launches of your application.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    IBeacon.stopMonitoringForRegion = function (region) { return; };
    /**
     * Request state the for specified region. When result is ready
     * didDetermineStateForRegion is triggered. This can be any region,
     * also those which is not currently monitored.
     *
     * This is done asynchronously and may not be immediately reflected in monitoredRegions.
     *
     * @param {Region} region An instance of {Region} which will be monitored
     * by the operating system.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    IBeacon.requestStateForRegion = function (region) { return; };
    /**
     * Start ranging the specified beacon region.
     *
     * If a region of the same type with the same identifier is already being
     * monitored for this application, it will be removed from monitoring.
     *
     * This is done asynchronously and may not be immediately reflected in rangedRegions.
     *
     * @param {Region} region An instance of {BeaconRegion} which will be monitored
     * by the operating system.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the monitoring request.
     */
    IBeacon.startRangingBeaconsInRegion = function (region) { return; };
    /**
     * Stop ranging the specified region.  It is valid to call
     * stopMonitoringForRegion: for a region that was registered for ranging
     * with a different location manager object, during this or previous
     * launches of your application.
     *
     * This is done asynchronously and may not be immediately reflected in rangedRegions.
     *
     * @param {Region} region An instance of {BeaconRegion} which will be monitored
     * by the operating system.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop monitoring.
     */
    IBeacon.stopRangingBeaconsInRegion = function (region) { return; };
    /**
     * Queries the native layer to determine the current authorization in effect.
     *
     * @returns Returns a promise which is resolved with the
     * requested authorization status.
     */
    IBeacon.getAuthorizationStatus = function () { return; };
    /**
     * For iOS 8 and above only. The permission model has changed by Apple in iOS 8, making it necessary for apps to
     * explicitly request permissions via methods like these:
     * <a href="https://developer.apple.com/library/prerelease/iOS/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html#//apple_ref/occ/instm/CLLocationManager/requestWhenInUseAuthorization">requestWhenInUseAuthorization</a>
     * <a href="https://developer.apple.com/library/prerelease/iOS/documentation/CoreLocation/Reference/CLLocationManager_Class/index.html#//apple_ref/occ/instm/CLLocationManager/requestAlwaysAuthorization">requestAlwaysAuthorization</a>
     *
     * If you are using this plugin on Android devices only, you will never have to use this, nor {@code requestAlwaysAuthorization}
     * @returns Returns a promise that is resolved when the request dialog is shown.
     */
    IBeacon.requestWhenInUseAuthorization = function () { return; };
    /**
     * See the docuemntation of {@code requestWhenInUseAuthorization} for further details.
     *
     * @returns Returns a promise which is resolved when the native layer
     * shows the request dialog.
     */
    IBeacon.requestAlwaysAuthorization = function () { return; };
    /**
     *
     * @returns Returns a promise which is resolved with an {Array}
     * of {Region} instances that are being monitored by the native layer.
     */
    IBeacon.getMonitoredRegions = function () { return; };
    /**
     *
     * @returns Returns a promise which is resolved with an {Array}
     * of {Region} instances that are being ranged by the native layer.
     */
    IBeacon.getRangedRegions = function () { return; };
    /**
     * Determines if ranging is available or not, according to the native layer.
     * @returns Returns a promise which is resolved with a {Boolean}
     * indicating whether ranging is available or not.
     */
    IBeacon.isRangingAvailable = function () { return; };
    /**
     * Determines if region type is supported or not, according to the native layer.
     *
     * @param {Region} region An instance of {Region} which will be checked
     * by the operating system.
     *
     * @returns Returns a promise which is resolved with a {Boolean}
     * indicating whether the region type is supported or not.
     */
    IBeacon.isMonitoringAvailableForClass = function (region) { return; };
    /**
     * Start advertising the specified region.
     *
     * If a region a different identifier is already being advertised for
     * this application, it will be replaced with the new identifier.
     *
     * This call will accept a valid beacon even when no BlueTooth is available,
     * and will start when BlueTooth is powered on. See {Delegate.}
     *
     * @param {Region} region An instance of {Region} which will be advertised
     * by the operating system.
     * @param {Integer} measuredPower: Optional parameter, if left empty, the device will
     * use it's own default value.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the advertising request.
     */
    IBeacon.startAdvertising = function (region, measuredPower) { return; };
    /**
     * Stop advertising as a beacon.
     *
     * This is done asynchronously and may not be immediately reflected in isAdvertising.
     *
     * @return Returns a promise which is resolved as soon as the
     * native layer acknowledged the dispatch of the request to stop advertising.
     */
    IBeacon.stopAdvertising = function (region) { return; };
    /**
     * Determines if advertising is available or not, according to the native layer.
     * @returns Returns a promise which is resolved with a {Boolean}
     * indicating whether advertising is available or not.
     */
    IBeacon.isAdvertisingAvailable = function () { return; };
    /**
     * Determines if advertising is currently active, according to the native layer.
     * @returns Returns a promise which is resolved with a {Boolean}
     * indicating whether advertising is active.
     */
    IBeacon.isAdvertising = function () { return; };
    /**
     * Disables debug logging in the native layer. Use this method if you want
     * to prevent this plugin from writing to the device logs.
     *
     * @returns Returns a promise which is resolved as soon as the
     * native layer has set the logging level accordingly.
     */
    IBeacon.disableDebugLogs = function () { return; };
    /**
     * Enables the posting of debug notifications in the native layer. Use this method if you want
     * to allow the plugin the posting local notifications.
     * This can be very helpful when debugging how to apps behave when launched into the background.
     *
     * @returns Returns a promise which is resolved as soon as the
     * native layer has set the flag to enabled.
     */
    IBeacon.enableDebugNotifications = function () { return; };
    /**
     * Disables the posting of debug notifications in the native layer. Use this method if you want
     * to prevent the plugin from posting local notifications.
     *
     * @returns Returns a promise which is resolved as soon as the
     * native layer has set the flag to disabled.
     */
    IBeacon.disableDebugNotifications = function () { return; };
    /**
     * Enables debug logging in the native layer. Use this method if you want
     * a debug the inner workings of this plugin.
     *
     * @returns Returns a promise which is resolved as soon as the
     * native layer has set the logging level accordingly.
     */
    IBeacon.enableDebugLogs = function () { return; };
    /**
     * Appends the provided [message] to the device logs.
     * Note: If debug logging is turned off, this won't do anything.
     *
     * @param {String} message The message to append to the device logs.
     *
     * @returns Returns a promise which is resolved with the log
     * message received by the native layer for appending. The returned message
     * is expected to be equivalent to the one provided in the original call.
     */
    IBeacon.appendToDeviceLog = function (message) { return; };
    __decorate$49([
        Cordova()
    ], IBeacon, "getDelegate", null);
    __decorate$49([
        Cordova()
    ], IBeacon, "setDelegate", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "onDomDelegateReady", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "isBluetoothEnabled", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "enableBluetooth", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "disableBluetooth", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "startMonitoringForRegion", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "stopMonitoringForRegion", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "requestStateForRegion", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "startRangingBeaconsInRegion", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "stopRangingBeaconsInRegion", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "getAuthorizationStatus", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "requestWhenInUseAuthorization", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "requestAlwaysAuthorization", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "getMonitoredRegions", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "getRangedRegions", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "isRangingAvailable", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "isMonitoringAvailableForClass", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "startAdvertising", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "stopAdvertising", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "isAdvertisingAvailable", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "isAdvertising", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "disableDebugLogs", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "enableDebugNotifications", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "disableDebugNotifications", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "enableDebugLogs", null);
    __decorate$49([
        Cordova({ otherPromise: true })
    ], IBeacon, "appendToDeviceLog", null);
    IBeacon = __decorate$49([
        Plugin({
            plugin: 'cordova-plugin-ibeacon',
            pluginRef: 'cordova.plugins.locationManager',
            repo: 'https://github.com/petermetz/cordova-plugin-ibeacon',
            platforms: ['Android', 'iOS']
        })
    ], IBeacon);
    return IBeacon;
}());

var __decorate$50 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Image Picker
 * @description
 * Cordova Plugin For Multiple Image Selection
 *
 * Requires Cordova plugin: `cordova-plugin-image-picker`.
 * For more info, please see the https://github.com/wymsee/cordova-imagePicker
 *
 * @usage
 * ```typescript
 * import { ImagePicker } from 'ionic-native';
 *
 *
 *
 * ImagePicker.getPictures(options).then((results) => {
 *   for (var i = 0; i < results.length; i++) {
 *       console.log('Image URI: ' + results[i]);
 *   }
 * }, (err) => { });
 * ```
 */
var ImagePicker = (function () {
    function ImagePicker() {
    }
    /**
     * Pick pictures from the library.
     * @param {ImagePickerOptions} options
     * @return Returns a Promise that resolves the image file URI
     * otherwise rejects with an error.
     */
    ImagePicker.getPictures = function (options) { return; };
    __decorate$50([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], ImagePicker, "getPictures", null);
    ImagePicker = __decorate$50([
        Plugin({
            plugin: 'cordova-plugin-image-picker',
            pluginRef: 'window.imagePicker',
            repo: 'https://github.com/wymsee/cordova-imagePicker'
        })
    ], ImagePicker);
    return ImagePicker;
}());

var __decorate$51 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name ImageResizer
 * @description
 * Cordova Plugin For Image Resize
 *
 * Requires plugin `info.protonet.imageresizer` - use the Ionic CLI and type in the following command:
 * `ionic plugin add https://github.com/protonet/cordova-plugin-image-resizer.git`
 *
 * For more info, please see the https://github.com/protonet/cordova-plugin-image-resizer
 *
 * @usage
 * ```typescript
 * import { ImageResizer, ImageResizerOptions } from 'ionic-native';
 *
 * let options = {
 *  uri: uri,
 *  folderName: 'Protonet',
 *  quality: 90,
 *  width: 1280,
 *  height: 1280
 * } as ImageResizerOptions;
 *
 * ImageResizer
 * .resize(options)
 * .then(
 *  (filePath: string) => { console.log('FilePath', filePath); },
 *  () => { console.log('Error occured'); }
 * )
 * ```
 */
var ImageResizer = (function () {
    function ImageResizer() {
    }
    ImageResizer.resize = function (options) { return; };
    __decorate$51([
        Cordova()
    ], ImageResizer, "resize", null);
    ImageResizer = __decorate$51([
        Plugin({
            plugin: 'https://github.com/protonet/cordova-plugin-image-resizer.git',
            pluginRef: 'ImageResizer',
            repo: 'https://github.com/protonet/cordova-plugin-image-resizer'
        })
    ], ImageResizer);
    return ImageResizer;
}());

var __decorate$52 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name InAppBrowser
 * @description Launches in app Browser
 * @usage
 * ```typescript
 * import {InAppBrowser} from 'ionic-native';
 *
 *
 * ...
 *
 *
 * let browser = new InAppBrowser('https://ionic.io', '_system');
 * browser.executeScript(...);
 * browser.insertCSS(...);
 * browser.close();
 * ```
 */
var InAppBrowser = (function () {
    /**
     * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
     * @param  url     The URL to load.
     * @param  target  The target in which to load the URL, an optional parameter that defaults to _self.
     * @param  options Options for the InAppBrowser. Optional, defaulting to: location=yes.
     *                 The options string must not contain any blank space, and each feature's
     *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
     */
    function InAppBrowser(url, target, options) {
        try {
            this._objectInstance = cordova.InAppBrowser.open(url, target, options);
        }
        catch (e) {
            window.open(url);
            console.warn('Native: InAppBrowser is not installed or you are running on a browser. Falling back to window.open, all instance methods will NOT work.');
        }
    }
    InAppBrowser.open = function (url, target, options) {
        console.warn('Native: Your current usage of the InAppBrowser plugin is depreciated as of ionic-native@1.3.8. Please check the Ionic Native docs for the latest usage details.');
    };
    /**
     * Displays an InAppBrowser window that was opened hidden. Calling this has no effect
     * if the InAppBrowser was already visible.
     */
    InAppBrowser.prototype.show = function () { };
    /**
     * Closes the InAppBrowser window.
     */
    InAppBrowser.prototype.close = function () { };
    /**
     * Injects JavaScript code into the InAppBrowser window.
     * @param script    Details of the script to run, specifying either a file or code key.
     */
    InAppBrowser.prototype.executeScript = function (script) { return; };
    /**
     * Injects CSS into the InAppBrowser window.
     * @param css       Details of the script to run, specifying either a file or code key.
     */
    InAppBrowser.prototype.insertCss = function (css) { return; };
    /**
     * A method that allows you to listen to events happening in the browser.
     * @param event Event name
     * @returns {Observable<any>} Returns back an observable that will listen to the event on subscribe, and will stop listening to the event on unsubscribe.
     */
    InAppBrowser.prototype.on = function (event) {
        var _this = this;
        return new Observable_2(function (observer) {
            _this._objectInstance.addEventListener(event, observer.next.bind(observer));
            return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
        });
    };
    __decorate$52([
        CordovaInstance({ sync: true })
    ], InAppBrowser.prototype, "show", null);
    __decorate$52([
        CordovaInstance({ sync: true })
    ], InAppBrowser.prototype, "close", null);
    __decorate$52([
        CordovaInstance()
    ], InAppBrowser.prototype, "executeScript", null);
    __decorate$52([
        CordovaInstance()
    ], InAppBrowser.prototype, "insertCss", null);
    InAppBrowser = __decorate$52([
        Plugin({
            plugin: 'cordova-plugin-inappbrowser',
            pluginRef: 'cordova.InAppBrowser',
            repo: 'https://github.com/apache/cordova-plugin-inappbrowser'
        })
    ], InAppBrowser);
    return InAppBrowser;
}());

var __decorate$53 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name InAppPurchase
 * @description
 * A lightweight Cordova plugin for in app purchases on iOS/Android.
 *
 * @usage
 * ```ts
 * import {InAppPurchase} from 'ionic-native';
 *
 * InAppPurchase
 *  .getProducts(['com.yourapp.prod1', 'com.yourapp.prod2', ...])
 *  .then((products) => {
 *    console.log(products);
 *     //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
 *  })
 *  .catch((err) => {
 *    console.log(err);
 *  });
 *
 *
 * InAppPurchase
 *   .buy('com.yourapp.prod1')
 *   .then((data)=> {
 *     console.log(data);
 *     // {
 *     //   transactionId: ...
 *     //   receipt: ...
 *     //   signature: ...
 *     // }
 *   })
 *   .catch((err)=> {
 *     console.log(err);
 *   });
 *
 * ```
 *
 * @advanced
 *
 * ```ts
 * // fist buy the product...
 * InAppPurchase
 *   .buy('com.yourapp.consumable_prod1')
 *   .then(data => InAppPurchase.consume(data.productType, data.receipt, data.signature))
 *   .then(() => console.log('product was successfully consumed!'))
 *   .catch( err=> console.log(err))
 * ```
 *
 *
 */
var InAppPurchase = (function () {
    function InAppPurchase() {
    }
    /**
     * Retrieves a list of full product data from Apple/Google. This method must be called before making purchases.
     * @param {array<string>} productId an array of product ids.
     * @returns {Promise} Returns a Promise that resolves with an array of objects.
     */
    InAppPurchase.getProducts = function (productId) { return; };
    /**
     * Buy a product that matches the productId.
     * @param {string} productId A string that matches the product you want to buy.
     * @returns {Promise} Returns a Promise that resolves with the transaction details.
     */
    InAppPurchase.buy = function (productId) { return; };
    /**
     * Same as buy, but for subscription based products.
     * @param {string} productId A string that matches the product you want to subscribe to.
     * @returns {Promise} Returns a Promise that resolves with the transaction details.
     */
    InAppPurchase.subscribe = function (productId) { return; };
    /**
     * Call this function after purchasing a "consumable" product to mark it as consumed. On Android, you must consume products that you want to let the user purchase multiple times. If you will not consume the product after a purchase, the next time you will attempt to purchase it you will get the error message:
     * @param {string} productType
     * @param {string} receipt
     * @param {string} signature
     */
    InAppPurchase.consume = function (productType, receipt, signature) { return; };
    /**
     * Restore all purchases from the store
     * @returns {Promise} Returns a promise with an array of purchases.
     */
    InAppPurchase.restorePurchases = function () { return; };
    /**
     * Get the receipt.
     * @returns {Promise<string>} Returns a promise that contains the string for the receipt
     */
    InAppPurchase.getReceipt = function () { return; };
    __decorate$53([
        Cordova({
            otherPromise: true
        })
    ], InAppPurchase, "getProducts", null);
    __decorate$53([
        Cordova({
            otherPromise: true
        })
    ], InAppPurchase, "buy", null);
    __decorate$53([
        Cordova({
            otherPromise: true
        })
    ], InAppPurchase, "subscribe", null);
    __decorate$53([
        Cordova({
            otherPromise: true
        })
    ], InAppPurchase, "consume", null);
    __decorate$53([
        Cordova({
            otherPromise: true
        })
    ], InAppPurchase, "restorePurchases", null);
    __decorate$53([
        Cordova({
            otherPromise: true,
            platforms: ['iOS']
        })
    ], InAppPurchase, "getReceipt", null);
    InAppPurchase = __decorate$53([
        Plugin({
            plugin: 'cordova-plugin-inapppurchase',
            pluginRef: 'inAppPurchase',
            platforms: ['Android', 'iOS'],
            repo: 'https://github.com/AlexDisler/cordova-plugin-inapppurchase'
        })
    ], InAppPurchase);
    return InAppPurchase;
}());

var __decorate$54 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Insomnia
 * @description
 * Prevent the screen of the mobile device from falling asleep.
 *
 * @usage
 * ```typescript
 * import { Insomnia } from 'ionic-native';
 *
 *
 * Insomnia.keepAwake()
 *   .then(
 *     () => console.log('success'),
 *     () => console.log('error')
 *   );
 *
 * Insomnia.allowSleepAgain()
 *   .then(
 *     () => console.log('success'),
 *     () => console.log('error')
 *   );
 * ```
 *
 */
var Insomnia = (function () {
    function Insomnia() {
    }
    /**
     * Keeps awake the application
     * @returns {Promise}
     */
    Insomnia.keepAwake = function () { return; };
    /**
     * Allows the application to sleep again
     * @returns {Promise}
     */
    Insomnia.allowSleepAgain = function () { return; };
    __decorate$54([
        Cordova()
    ], Insomnia, "keepAwake", null);
    __decorate$54([
        Cordova()
    ], Insomnia, "allowSleepAgain", null);
    Insomnia = __decorate$54([
        Plugin({
            plugin: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin.git',
            pluginRef: 'plugins.insomnia',
            repo: 'https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], Insomnia);
    return Insomnia;
}());

var __decorate$55 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Instagram
 * @description Share a photo with the instagram app
 *
 * @usage
 * ```
 * import {Instagram} from 'ionic-native';
 *
 * Instagram.share('data:image/png;uhduhf3hfif33', 'Caption')
 *   .then(() => console.log('Shared!'))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
var Instagram = (function () {
    function Instagram() {
    }
    /**
     * Detect if the Instagram application is installed on the device.
     *
     * @return {Promise<boolean|string>} Returns a promise that returns a boolean value if installed, or the app version on android
     */
    Instagram.isInstalled = function () { return; };
    /**
     * Share an image on Instagram
     * Note: Instagram app stopped accepting pre-filled captions on both iOS and Android. As a work-around, the caption is copied to the clipboard. You have to inform your users to paste the caption.
     *
     * @param canvasIdOrDataUrl The canvas element id or the dataURL of the image to share
     * @param caption The caption of the image
     * @return {Promise<any>} Returns a promise that resolves if the image was shared
     */
    Instagram.share = function (canvasIdOrDataUrl, caption) { return; };
    /**
     * Share a library asset or video
     * @param assetLocalIdentifier A local fileURI
     * @return {Promise<any>} Returns a promise that resolves if the image was shared
     */
    Instagram.shareAsset = function (assetLocalIdentifier) { return; };
    __decorate$55([
        Cordova({
            callbackStyle: 'node'
        })
    ], Instagram, "isInstalled", null);
    __decorate$55([
        Cordova({
            callbackStyle: 'node'
        })
    ], Instagram, "share", null);
    __decorate$55([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], Instagram, "shareAsset", null);
    Instagram = __decorate$55([
        Plugin({
            plugin: 'cordova-instagram-plugin',
            pluginRef: 'Instagram',
            repo: 'https://github.com/vstirbu/InstagramPlugin'
        })
    ], Instagram);
    return Instagram;
}());

var __decorate$56 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name IsDebug
 * @description
 * Detect if the app is running in debug mode or not.
 * Debug mode is when the app is built and installed locally via xcode / eclipse / the cordova cli etc, compared to release mode when the app was downloaded from the app / play store via an end user.
 *
 * @usage
 * ```
 * import {IsDebug} from 'ionic-native';
 *
 * IsDebug.getIsDebug()
 *   .then((isDebug: boolean) => console.log('Is debug:', isDebug))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
var IsDebug = (function () {
    function IsDebug() {
    }
    /**
     * Determine if an app was installed via xcode / eclipse / the ionic CLI etc
     * @return {Promise<boolean>} Returns a promise that resolves with true if the app was installed via xcode / eclipse / the ionic CLI etc. It will resolve to false if the app was downloaded from the app / play store by the end user.
     */
    IsDebug.getIsDebug = function () {
        return;
    };
    __decorate$56([
        Cordova()
    ], IsDebug, "getIsDebug", null);
    IsDebug = __decorate$56([
        Plugin({
            plugin: 'cordova-plugin-is-debug',
            pluginRef: 'cordova.plugins.IsDebug',
            repo: 'https://github.com/mattlewis92/cordova-plugin-is-debug'
        })
    ], IsDebug);
    return IsDebug;
}());

var __decorate$57 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Keyboard
 * @description
 * @usage
 * ```typescript
 * import { Keyboard } from 'ionic-native';
 *
 *
 *
 * ```
 */
var Keyboard = (function () {
    function Keyboard() {
    }
    /**
     * Hide the keyboard accessory bar with the next, previous and done buttons.
     * @param hide {boolean}
     */
    Keyboard.hideKeyboardAccessoryBar = function (hide) { };
    /**
     * Force keyboard to be shown.
     */
    Keyboard.show = function () { };
    /**
     * Close the keyboard if open.
     */
    Keyboard.close = function () { };
    /**
     * Prevents the native UIScrollView from moving when an input is focused.
     * @param disable
     */
    Keyboard.disableScroll = function (disable) { };
    /**
     * Creates an observable that notifies you when the keyboard is shown. Unsubscribe to observable to cancel event watch.
     */
    Keyboard.onKeyboardShow = function () { return; };
    /**
     * Creates an observable that notifies you when the keyboard is hidden. Unsubscribe to observable to cancel event watch.
     */
    Keyboard.onKeyboardHide = function () { return; };
    __decorate$57([
        Cordova({ sync: true })
    ], Keyboard, "hideKeyboardAccessoryBar", null);
    __decorate$57([
        Cordova({
            sync: true,
            platforms: ['Android', 'BlackBerry 10', 'Windows']
        })
    ], Keyboard, "show", null);
    __decorate$57([
        Cordova({
            sync: true,
            platforms: ['iOS', 'Android', 'BlackBerry 10', 'Windows']
        })
    ], Keyboard, "close", null);
    __decorate$57([
        Cordova({
            sync: true,
            platforms: ['iOS', 'Windows']
        })
    ], Keyboard, "disableScroll", null);
    __decorate$57([
        Cordova({
            eventObservable: true,
            event: 'native.keyboardshow',
            platforms: ['iOS', 'Android', 'BlackBerry 10', 'Windows']
        })
    ], Keyboard, "onKeyboardShow", null);
    __decorate$57([
        Cordova({
            eventObservable: true,
            event: 'native.keyboardhide',
            platforms: ['iOS', 'Android', 'BlackBerry 10', 'Windows']
        })
    ], Keyboard, "onKeyboardHide", null);
    Keyboard = __decorate$57([
        Plugin({
            plugin: 'ionic-plugin-keyboard',
            pluginRef: 'cordova.plugins.Keyboard',
            repo: 'https://github.com/driftyco/ionic-plugin-keyboard'
        })
    ], Keyboard);
    return Keyboard;
}());

var __decorate$58 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Launch Navigator
 * @description
 * Requires Cordova plugin: uk.co.workingedge.phonegap.plugin.launchnavigator. For more info, please see the [LaunchNavigator plugin docs](https://github.com/dpa99c/phonegap-launch-navigator).
 *
 * @usage
 * Please refer to the plugin's repo for detailed usage. This docs page only explains the Native wrapper.
 *
 * ```typescript
 * import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';
 *
 * let options: LaunchNavigatorOptions = {
 *   start: 'London, ON',
 *   app: LaunchNavigator.APPS.UBER
 * };
 *
 * LaunchNavigator.navigate('Toronto, ON', options)
 *   .then(
 *     success => console.log('Launched navigator'),
 *     error => console.log('Error launching navigator', error)
 *   );
 * ```
 */
var LaunchNavigator = (function () {
    function LaunchNavigator() {
    }
    /**
     * Launches navigator app
     * @param destination {string|number[]} Location name or coordinates (as string or array)
     * @param options {LaunchNavigatorOptions}
     * @returns {Promise<any>}
     */
    LaunchNavigator.navigate = function (destination, options) { return; };
    /**
     * Determines if the given app is installed and available on the current device.
     * @param app {string}
     */
    LaunchNavigator.isAppAvailable = function (app) { return; };
    /**
     * Returns a list indicating which apps are installed and available on the current device.
     */
    LaunchNavigator.availableApps = function () { return; };
    /**
     * Returns the display name of the specified app.
     * @param app {string}
     */
    LaunchNavigator.getAppDisplayName = function (app) { return; };
    /**
     * Returns list of supported apps on a given platform.
     * @param platform {string}
     */
    LaunchNavigator.getAppsForPlatform = function (platform) { return; };
    /**
     * Indicates if an app on a given platform supports specification of transport mode.
     * @param app {string} specified as a string, you can use one of the constants, e.g `LaunchNavigator.APP.GOOGLE_MAPS`
     * @param platform {string}
     */
    LaunchNavigator.supportsTransportMode = function (app, platform) { return; };
    /**
     * Returns the list of transport modes supported by an app on a given platform.
     * @param app {string}
     * @param platform {string}
     */
    LaunchNavigator.getTransportModes = function (app, platform) { return; };
    /**
     * Indicates if an app on a given platform supports specification of launch mode.
     * Note that currently only Google Maps on Android does.
     * @param app {string}
     * @param platform {string}
     */
    LaunchNavigator.supportsLaunchMode = function (app, platform) { return; };
    /**
     * Indicates if an app on a given platform supports specification of start location.
     * @param app {string}
     * @param platform {string}
     */
    LaunchNavigator.supportsStart = function (app, platform) { return; };
    LaunchNavigator.supportsStartName = function (app, platform) { return; };
    LaunchNavigator.supportsDestName = function (app, platform) { return; };
    LaunchNavigator.userSelect = function (destination, options) { };
    LaunchNavigator.APP = {
        USER_SELECT: 'user_select',
        APPLE_MAPS: 'apple_maps',
        GOOGLE_MAPS: 'google_maps',
        WAZE: 'waze',
        CITYMAPPER: 'citymapper',
        NAVIGON: 'navigon',
        TRANSIT_APP: 'transit_app',
        YANDEX: 'yandex',
        UBER: 'uber',
        TOMTOM: 'tomtom',
        BING_MAPS: 'bing_maps',
        SYGIC: 'sygic',
        HERE_MAPS: 'here_maps',
        MOOVIT: 'moovit'
    };
    LaunchNavigator.TRANSPORT_MODE = {
        DRIVING: 'driving',
        WALKING: 'walking',
        BICYCLING: 'bicycling',
        TRANSIT: 'transit'
    };
    __decorate$58([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], LaunchNavigator, "navigate", null);
    __decorate$58([
        Cordova()
    ], LaunchNavigator, "isAppAvailable", null);
    __decorate$58([
        Cordova()
    ], LaunchNavigator, "availableApps", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "getAppDisplayName", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "getAppsForPlatform", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "supportsTransportMode", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "getTransportModes", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "supportsLaunchMode", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "supportsStart", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "supportsStartName", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "supportsDestName", null);
    __decorate$58([
        Cordova({ sync: true })
    ], LaunchNavigator, "userSelect", null);
    LaunchNavigator = __decorate$58([
        Plugin({
            plugin: 'uk.co.workingedge.phonegap.plugin.launchnavigator',
            pluginRef: 'launchnavigator',
            repo: 'https://github.com/dpa99c/phonegap-launch-navigator.git'
        })
    ], LaunchNavigator);
    return LaunchNavigator;
}());

var __decorate$59 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Local Notifications
 * @description
 * This plugin allows you to display local notifications on the device
 *
 * @usage
 * ```typescript
 * import { LocalNotifications } from 'ionic-native';
 *
 *
 * // Schedule a single notification
 * LocalNotifications.schedule({
 *   id: 1,
 *   text: 'Single Notification',
 *   sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
 *   data: { secret: key }
 * });
 *
 *
 * // Schedule multiple notifications
 * LocalNotifications.schedule([{
 *    id: 1,
 *    text: 'Multi Notification 1',
 *    sound: isAndroid ? 'file://sound.mp3': 'file://beep.caf',
 *    data: { secret:key }
 *   },{
 *    id: 2,
 *    title: 'Local Notification Example',
 *    text: 'Multi Notification 2',
 *    icon: 'http://example.com/icon.png'
 * }]);
 *
 *
 * // Schedule delayed notification
 * LocalNotifications.schedule({
 *    text: 'Delayed Notification',
 *    at: new Date(new Date().getTime() + 3600),
 *    led: 'FF0000',
 *    sound: null
 * });
 * ```
 *
 */
var LocalNotifications = (function () {
    function LocalNotifications() {
    }
    /**
     * Schedules a single or multiple notifications
     * @param options
     */
    LocalNotifications.schedule = function (options) { };
    /**
     * Updates a previously scheduled notification. Must include the id in the options parameter.
     * @param options
     */
    LocalNotifications.update = function (options) { };
    /**
     * Clears single or multiple notifications
     * @param notificationId A single notification id, or an array of notification ids.
     * @returns {Promise} Returns a promise when the notification had been cleared
     */
    LocalNotifications.clear = function (notificationId) { return; };
    /**
     * Clears all notifications
     * @returns {Promise} Returns a promise when all notifications have cleared
     */
    LocalNotifications.clearAll = function () { return; };
    /**
     * Cancels single or multiple notifications
     * @param notificationId A single notification id, or an array of notification ids.
     * @returns {Promise} Returns a promise when the notification is canceled
     */
    LocalNotifications.cancel = function (notificationId) { return; };
    /**
     * Cancels all notifications
     * @returns {Promise} Returns a promise when all notifications are canceled
     */
    LocalNotifications.cancelAll = function () { return; };
    /**
     * Checks presence of a notification
     * @param notificationId
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.isPresent = function (notificationId) { return; };
    /**
     * Checks is a notification is scheduled
     * @param notificationId
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.isScheduled = function (notificationId) { return; };
    /**
     * Checks if a notification is triggered
     * @param notificationId
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.isTriggered = function (notificationId) { return; };
    /**
     * Get all the notification ids
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getAllIds = function () { return; };
    /**
     * Get the ids of triggered notifications
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getTriggeredIds = function () { return; };
    /**
     * Get the ids of scheduled notifications
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getScheduledIds = function () { return; };
    /**
     * Get a notification object
     * @param notificationId The id of the notification to get
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.get = function (notificationId) { return; };
    /**
     * Get a scheduled notification object
     * @param notificationId The id of the notification to get
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getScheduled = function (notificationId) { return; };
    /**
     * Get a triggered notification object
     * @param notificationId The id of the notification to get
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getTriggered = function (notificationId) { return; };
    /**
     * Get all notification objects
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getAll = function () { return; };
    /**
     * Get all scheduled notification objects
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getAllScheduled = function () { return; };
    /**
     * Get all triggered notification objects
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.getAllTriggered = function () { return; };
    /**
     * Register permission to show notifications if not already granted.
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.registerPermission = function () { return; };
    /**
     * Informs if the app has the permission to show notifications.
     * @returns {Promise} Returns a promise
     */
    LocalNotifications.hasPermission = function () { return; };
    /**
     * Sets a callback for a specific event
     * @param eventName The name of the event. Available events: schedule, trigger, click, update, clear, clearall, cancel, cancelall
     * @param callback Call back function. All events return notification and state parameter. clear and clearall return state parameter only.
     */
    LocalNotifications.on = function (eventName, callback) { };
    __decorate$59([
        Cordova({
            sync: true
        })
    ], LocalNotifications, "schedule", null);
    __decorate$59([
        Cordova({
            sync: true
        })
    ], LocalNotifications, "update", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "clear", null);
    __decorate$59([
        Cordova({
            successIndex: 0,
            errorIndex: 2
        })
    ], LocalNotifications, "clearAll", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "cancel", null);
    __decorate$59([
        Cordova({
            successIndex: 0,
            errorIndex: 2
        })
    ], LocalNotifications, "cancelAll", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "isPresent", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "isScheduled", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "isTriggered", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getAllIds", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getTriggeredIds", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getScheduledIds", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "get", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getScheduled", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getTriggered", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getAll", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getAllScheduled", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "getAllTriggered", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "registerPermission", null);
    __decorate$59([
        Cordova()
    ], LocalNotifications, "hasPermission", null);
    __decorate$59([
        Cordova({
            sync: true
        })
    ], LocalNotifications, "on", null);
    LocalNotifications = __decorate$59([
        Plugin({
            plugin: 'de.appplant.cordova.plugin.local-notification',
            pluginRef: 'cordova.plugins.notification.local',
            repo: 'https://github.com/katzer/cordova-plugin-local-notifications'
        })
    ], LocalNotifications);
    return LocalNotifications;
}());

var __decorate$60 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Media Capture
 * @description
 * @usage
 * ```typescript
 * import { MediaCapture } from 'ionic-native';
 *
 *
 * let options: CaptureImageOptions = { limit: 3 };
 * MediaCapture.captureImage(options)
 *   .then(
 *     (data: MediaFile[]) => console.log(data),
 *     (err: CaptureError) => console.error(err)
 *   );
 *
 * ```
 */
var MediaCapture = (function () {
    function MediaCapture() {
    }
    Object.defineProperty(MediaCapture, "supportedImageModes", {
        /**
         * The audio recording formats supported by the device.
         * @returns {ConfigurationData[]}
         */
        get: function () {
            return navigator.device.capture.supportedImageModes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCapture, "supportedAudioModes", {
        /**
         * The recording image sizes and formats supported by the device.
         * @returns {ConfigurationData[]}
         */
        get: function () {
            return navigator.device.capture.supportedAudioModes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaCapture, "supportedVideoModes", {
        /**
         * The recording video resolutions and formats supported by the device.
         * @returns {ConfigurationData[]}
         */
        get: function () {
            return navigator.device.capture.supportedVideoModes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start the audio recorder application and return information about captured audio clip files.
     * @param options
     */
    MediaCapture.captureAudio = function (options) { return; };
    /**
     * Start the camera application and return information about captured image files.
     * @param options
     */
    MediaCapture.captureImage = function (options) { return; };
    /**
     * Start the video recorder application and return information about captured video clip files.
     * @param options
     */
    MediaCapture.captureVideo = function (options) { return; };
    /**
     * is fired if the capture call is successful
     */
    MediaCapture.onPendingCaptureResult = function () { return; };
    /**
     * is fired if the capture call is unsuccessful
     */
    MediaCapture.onPendingCaptureError = function () { return; };
    __decorate$60([
        CordovaProperty
    ], MediaCapture, "supportedImageModes", null);
    __decorate$60([
        CordovaProperty
    ], MediaCapture, "supportedAudioModes", null);
    __decorate$60([
        CordovaProperty
    ], MediaCapture, "supportedVideoModes", null);
    __decorate$60([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], MediaCapture, "captureAudio", null);
    __decorate$60([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], MediaCapture, "captureImage", null);
    __decorate$60([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], MediaCapture, "captureVideo", null);
    __decorate$60([
        Cordova({
            eventObservable: true,
            event: 'pendingcaptureresult'
        })
    ], MediaCapture, "onPendingCaptureResult", null);
    __decorate$60([
        Cordova({
            eventObservable: true,
            event: 'pendingcaptureerror'
        })
    ], MediaCapture, "onPendingCaptureError", null);
    MediaCapture = __decorate$60([
        Plugin({
            plugin: 'cordova-plugin-media-capture',
            pluginRef: 'navigator.device.capture',
            repo: 'https://github.com/apache/cordova-plugin-media-capture'
        })
    ], MediaCapture);
    return MediaCapture;
}());

var __decorate$61 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name NativeAudio
 * @description Native Audio Playback
 * @usage
 * ```typescript
 * import {NativeAudio} from 'ionic-native';
 *
 * NativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(onSuccess, onError);
 * NativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);
 *
 * NativeAudio.play('uniqueId1').then(onSuccess, onError);
 * NativeAudio.loop('uniqueId2').then(onSuccess, onError);
 *
 * NativeAudio.setVolumeForComplexAsset('uniqueId2', 0.6).then(onSuccess,onError);
 *
 * NativeAudio.stop('uniqueId1').then(onSuccess,onError);
 *
 * NativeAudio.unload('uniqueId1').then(onSuccess,onError);
 *
 * ```
 */
var NativeAudio = (function () {
    function NativeAudio() {
    }
    /**
     * Loads an audio file into memory. Optimized for short clips / single shots (up to five seconds). Cannot be stopped / looped.
     * @param id {string} unique ID for the audio file
     * @param assetPath {string}  the relative path or absolute URL (inluding http://) to the audio asset.
     * @returns {Promise<any>}
     */
    NativeAudio.preloadSimple = function (id, assetPath) { return; };
    /**
     * Loads an audio file into memory. Optimized for background music / ambient sound. Uses highlevel native APIs with a larger footprint. (iOS: AVAudioPlayer). Can be stopped / looped and used with multiple voices. Can be faded in and out using the delay parameter.
     * @param id {string} unique ID for the audio file
     * @param assetPath {string}  the relative path or absolute URL (inluding http://) to the audio asset.
     * @param volume {number} the volume of the preloaded sound (0.1 to 1.0)
     * @param voices {number} the number of multichannel voices available
     * @param delay {number}
     * @returns {Promise<any>}
     */
    NativeAudio.preloadComplex = function (id, assetPath, volume, voices, delay) { return; };
    /**
     * Plays an audio asset
     * @param id {string} unique ID for the audio file
     * @param completeCallback {Function} callback to be invoked when audio is done playing
     */
    NativeAudio.play = function (id, completeCallback) { return; };
    /**
     * Stops playing an audio
     * @param id {string} unique ID for the audio file
     */
    NativeAudio.stop = function (id) { return; };
    /**
     * Loops an audio asset infinitely, this only works for complex assets
     * @param id {string} unique ID for the audio file
     * @return {Promise<any>}
     */
    NativeAudio.loop = function (id) { return; };
    /**
     * Unloads an audio file from memory
     * @param id {string} unique ID for the audio file
     */
    NativeAudio.unload = function (id) { return; };
    /**
     * Changes the volume for preloaded complex assets.
     * @param id {string} unique ID for the audio file
     * @param volume {number} the volume of the audio asset (0.1 to 1.0)
     */
    NativeAudio.setVolumeForComplexAsset = function (id, volume) { return; };
    __decorate$61([
        Cordova()
    ], NativeAudio, "preloadSimple", null);
    __decorate$61([
        Cordova()
    ], NativeAudio, "preloadComplex", null);
    __decorate$61([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], NativeAudio, "play", null);
    __decorate$61([
        Cordova()
    ], NativeAudio, "stop", null);
    __decorate$61([
        Cordova()
    ], NativeAudio, "loop", null);
    __decorate$61([
        Cordova()
    ], NativeAudio, "unload", null);
    __decorate$61([
        Cordova()
    ], NativeAudio, "setVolumeForComplexAsset", null);
    NativeAudio = __decorate$61([
        Plugin({
            plugin: 'cordova-plugin-nativeaudio',
            pluginRef: 'plugins.NativeAudio',
            repo: 'https://github.com/floatinghotpot/cordova-plugin-nativeaudio'
        })
    ], NativeAudio);
    return NativeAudio;
}());

var __decorate$62 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name NativePageTransitions
 * @description
 * The Native Page Transitions plugin uses native hardware acceleration to animate your transitions between views. You have complete control over the type of transition, the duration, and direction.
 *
 * @usage
 * ```
 * import {NativePageTransitions, TransitionOptions} from 'ionic-native';
 *
 * let options: TransitionOptions = {
 *    direction: 'up',
 *    duration: 500,
 *    slowdownfactor: 3,
 *    slidePixels: 20,
 *    iosdelay: 100,
 *    androiddelay: 150,
 *    winphonedelay: 250,
 *    fixedPixelsTop: 0,
 *    fixedPixelsBottom: 60
 *  };
 *
 * NativePageTransitions.slide(options)
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 */
var NativePageTransitions = (function () {
    function NativePageTransitions() {
    }
    /**
     * Perform a slide animation
     * @param options {TransitionOptions} Options for the transition
     */
    NativePageTransitions.slide = function (options) { return; };
    /**
     * Perform a flip animation
     * @param options {TransitionOptions} Options for the transition
     */
    NativePageTransitions.flip = function (options) { return; };
    /**
     * Perform a fade animation
     * @param options {TransitionOptions} Options for the transition
     */
    NativePageTransitions.fade = function (options) { return; };
    /**
     * Perform a slide animation
     * @param options {TransitionOptions} Options for the transition
     */
    NativePageTransitions.drawer = function (options) { return; };
    /**
     * Perform a slide animation
     * @param options {TransitionOptions} Options for the transition
     */
    NativePageTransitions.curl = function (options) { return; };
    __decorate$62([
        Cordova()
    ], NativePageTransitions, "slide", null);
    __decorate$62([
        Cordova()
    ], NativePageTransitions, "flip", null);
    __decorate$62([
        Cordova({ platforms: ['iOS', 'Android'] })
    ], NativePageTransitions, "fade", null);
    __decorate$62([
        Cordova({ platforms: ['iOS', 'Android'] })
    ], NativePageTransitions, "drawer", null);
    __decorate$62([
        Cordova({ platforms: ['iOS'] })
    ], NativePageTransitions, "curl", null);
    NativePageTransitions = __decorate$62([
        Plugin({
            plugin: 'com.telerik.plugins.nativepagetransitions',
            pluginRef: 'plugins.nativepagetransitions',
            repo: 'https://github.com/Telerik-Verified-Plugins/NativePageTransitions',
            platforms: ['iOS', 'Android', 'Windows Phone']
        })
    ], NativePageTransitions);
    return NativePageTransitions;
}());

var __decorate$63 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name NativeStorage
 * @description Native storage of variables in Android and iOS
 *
 * @usage
 * ```typescript
 * import { NativeStorage } from 'ionic-native';
 *
 * NativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
 *   .then(
 *     () => console.log('Stored item!'),
 *     error => console.error('Error storing item', error)
 *   );
 *
 * NativeStorage.getItem('myitem')
 *   .then(
 *     data => console.log(data),
 *     error => console.error(error)
 *   );
 * ```
 */
var NativeStorage = (function () {
    function NativeStorage() {
    }
    /**
     * Stores a value
     * @param reference {string}
     * @param value
     */
    NativeStorage.setItem = function (reference, value) { return; };
    /**
     * Gets a stored item
     * @param reference {string}
     */
    NativeStorage.getItem = function (reference) { return; };
    /**
     * Removes a single stored item
     * @param reference {string}
     */
    NativeStorage.remove = function (reference) { return; };
    /**
     * Removes all stored values.
     */
    NativeStorage.clear = function () { return; };
    __decorate$63([
        Cordova()
    ], NativeStorage, "setItem", null);
    __decorate$63([
        Cordova()
    ], NativeStorage, "getItem", null);
    __decorate$63([
        Cordova()
    ], NativeStorage, "remove", null);
    __decorate$63([
        Cordova()
    ], NativeStorage, "clear", null);
    NativeStorage = __decorate$63([
        Plugin({
            plugin: 'cordova-plugin-nativestorage',
            pluginRef: 'NativeStorage',
            repo: 'https://github.com/TheCocoaProject/cordova-plugin-nativestorage'
        })
    ], NativeStorage);
    return NativeStorage;
}());

var __decorate$64 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Market
 * @description
 * Opens an app's page in the market place (Google Play, App Store)
 *
 * @usage
 * ```
 * import {Market} from 'ionic-native';
 *
 * Market.open('your.package.name');
 *
 * ```
 */
var Market = (function () {
    function Market() {
    }
    /**
     * Opens an app in Google Play / App Store
     * @param appId {string} Package name
     * @param callbacks {Object} Optional callbacks
     */
    Market.open = function (appId, callbacks) { };
    __decorate$64([
        Cordova({ sync: true })
    ], Market, "open", null);
    Market = __decorate$64([
        Plugin({
            plugin: 'cordova-plugin-market',
            pluginRef: 'plugins.market',
            repo: 'https://github.com/xmartlabs/cordova-plugin-market'
        })
    ], Market);
    return Market;
}());

var __decorate$65 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name MediaPlugin
 * @description
 * @usage
 * ```typescript
 * import { MediaPlugin } from 'ionic-native';
 *
 *
 *
 * // Create a MediaPlugin instance.  Expects path to file or url as argument
 * var file = new MediaPlugin('path/to/file.mp3');
 *
 * // Catch the Success & Error Output
 * // Platform Quirks
 * // iOS calls success on completion of playback only
 * // Android calls success on completion of playback AND on release()
 * file.init.then(() => {
 *   console.log('Playback Finished');
 * }, (err) => {
 *   console.log('somthing went wrong! error code: ' + err.code + ' message: ' + err.message);
 * });
 *
 * // play the file
 * file.play();
 *
 * // pause the file
 * file.pause();
 *
 * // get current playback position
 * file.getCurrentPosition().then((position) => {
 *   console.log(position);
 * });
 *
 * // get file duration
 * file.getDuration().then((duration) => {
 *   console.log(position);
 * });
 *
 * // skip to 10 seconds (expects int value in ms)
 * file.seekTo(10000);
 *
 * // stop playing the file
 * file.stop();
 *
 * // release the native audio resource
 * // Platform Quirks:
 * // iOS simply create a new instance and the old one will be overwritten
 * // Android you must call release() to destroy instances of media when you are done
 * file.release();
 *
 * // Recording to a file
 * var newFile = new MediaPlugin('path/to/file.mp3');
 * newFile.startRecord();
 *
 * newFile.stopRecord();
 *
 *
 *
 * ```
 */
var MediaPlugin = (function () {
    // Methods
    /**
     * Open a media file
     * @param src {string} A URI containing the audio content.
     */
    function MediaPlugin(src) {
        var _this = this;
        this.init = new Promise(function (resolve, reject) {
            _this.status = new Observable_2(function (observer) {
                _this._objectInstance = new Media(src, resolve, reject, observer.next.bind(observer));
            });
        });
    }
    /**
     * Get the current amplitude of the current recording.
     * @returns {Promise} Returns a promise with the amplitude of the current recording
     */
    MediaPlugin.prototype.getCurrentAmplitude = function () { return; };
    /**
     * Get the current position within an audio file. Also updates the Media object's position parameter.
     * @returns {Promise} Returns a promise with the position of the current recording
     */
    MediaPlugin.prototype.getCurrentPosition = function () { return; };
    /**
     * Get the duration of an audio file in seconds. If the duration is unknown, it returns a value of -1.
     * @returns {Promise} Returns a promise with the duration of the current recording
     */
    MediaPlugin.prototype.getDuration = function () { return; };
    /**
     * Starts or resumes playing an audio file.
     */
    MediaPlugin.prototype.play = function (iosOptions) { };
    /**
     * Pauses playing an audio file.
     */
    MediaPlugin.prototype.pause = function () { };
    /**
     * Releases the underlying operating system's audio resources. This is particularly important for Android, since there are a finite amount of OpenCore instances for media playback. Applications should call the release function for any Media resource that is no longer needed.
     */
    MediaPlugin.prototype.release = function () { };
    /**
     * Sets the current position within an audio file.
     * @param {number} milliseconds The time position you want to set for the current audio file
     */
    MediaPlugin.prototype.seekTo = function (milliseconds) { };
    /**
     * Set the volume for an audio file.
     * @param volume The volume to set for playback. The value must be within the range of 0.0 to 1.0.
     */
    MediaPlugin.prototype.setVolume = function (volume) { };
    /**
     * Starts recording an audio file.
     */
    MediaPlugin.prototype.startRecord = function () { };
    /**
     * Stops recording
     */
    MediaPlugin.prototype.stopRecord = function () { };
    /**
     * Stops playing an audio file.
     */
    MediaPlugin.prototype.stop = function () { };
    // Constants
    /**
     * @private
     */
    MediaPlugin.MEDIA_NONE = 0;
    /**
     * @private
     */
    MediaPlugin.MEDIA_STARTING = 1;
    /**
     * @private
     */
    MediaPlugin.MEDIA_RUNNING = 2;
    /**
     * @private
     */
    MediaPlugin.MEDIA_PAUSED = 3;
    /**
     * @private
     */
    MediaPlugin.MEDIA_STOPPED = 4;
    // error codes
    /**
     * @private
     */
    MediaPlugin.MEDIA_ERR_ABORTED = 1;
    /**
     * @private
     */
    MediaPlugin.MEDIA_ERR_NETWORK = 2;
    /**
     * @private
     */
    MediaPlugin.MEDIA_ERR_DECODE = 3;
    /**
     * @private
     */
    MediaPlugin.MEDIA_ERR_NONE_SUPPORTED = 4;
    __decorate$65([
        CordovaInstance()
    ], MediaPlugin.prototype, "getCurrentAmplitude", null);
    __decorate$65([
        CordovaInstance()
    ], MediaPlugin.prototype, "getCurrentPosition", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "getDuration", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "play", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "pause", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "release", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "seekTo", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "setVolume", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "startRecord", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "stopRecord", null);
    __decorate$65([
        CordovaInstance({
            sync: true
        })
    ], MediaPlugin.prototype, "stop", null);
    MediaPlugin = __decorate$65([
        Plugin({
            repo: 'https://github.com/apache/cordova-plugin-media',
            plugin: 'cordova-plugin-media',
            pluginRef: 'Media'
        })
    ], MediaPlugin);
    return MediaPlugin;
}());

var __decorate$66 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Mixpanel
 * @description
 * Cordova Plugin that wraps Mixpanel SDK for Android and iOS
 *
 * @usage
 * ```
 * import {Mixpanel} from 'ionic-native';
 *
 * Mixpanel.init(token)
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 */
var Mixpanel = (function () {
    function Mixpanel() {
    }
    /**
     *
     * @param aliasId {string}
     * @param originalId {string}
     * @returns {Promise<any>}
     */
    Mixpanel.alias = function (aliasId, originalId) { return; };
    /**
     *
     * @returns {Promise<any>}
     */
    Mixpanel.distinctId = function () { return; };
    /**
     *
     */
    Mixpanel.flush = function () { return; };
    /**
     *
     * @param distinctId {string}
     * @returns {Promise<any>}
     */
    Mixpanel.identify = function (distinctId) { return; };
    /**
     *
     * @param token {string}
     * @returns {Promise<any>}
     */
    Mixpanel.init = function (token) { return; };
    /**
     *
     * @param superProperties
     * @returns {Promise<any>}
     */
    Mixpanel.registerSuperProperties = function (superProperties) { return; };
    /**
     *
     * @returns {Promise<any>}
     */
    Mixpanel.reset = function () { return; };
    /**
     *
     * @param eventName
     * @param eventProperties
     */
    Mixpanel.track = function (eventName, eventProperties) { return; };
    /**
     *
     * @returns {Promise<any>}
     */
    Mixpanel.showSurvey = function () { return; };
    Object.defineProperty(Mixpanel, "people", {
        /**
         *
         * @returns {MixpanelPeople}
         */
        get: function () { return mixpanel.people; },
        enumerable: true,
        configurable: true
    });
    
    __decorate$66([
        Cordova()
    ], Mixpanel, "alias", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "distinctId", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "flush", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "identify", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "init", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "registerSuperProperties", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "reset", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "track", null);
    __decorate$66([
        Cordova()
    ], Mixpanel, "showSurvey", null);
    __decorate$66([
        CordovaProperty
    ], Mixpanel, "people", null);
    Mixpanel = __decorate$66([
        Plugin({
            plugin: 'cordova-plugin-mixpanel',
            pluginRef: 'mixpanel',
            repo: 'https://github.com/samzilverberg/cordova-mixpanel-plugin'
        })
    ], Mixpanel);
    return Mixpanel;
}());

var __decorate$67 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name MusicControls
 * @description
 * Music controls for Cordova applications.
 * Display a 'media' notification with play/pause, previous, next buttons, allowing the user to control the play.
 * Handle also headset event (plug, unplug, headset button).
 *
 * @usage
 * ```
 * import {MusicControls} from 'ionic-native';
 *
 * MusicControls.create({
 *   track       : 'Time is Running Out',        // optional, default : ''
 *   artist      : 'Muse',                       // optional, default : ''
 *   cover       : 'albums/absolution.jpg',      // optional, default : nothing
 *   // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
 *   //           or a remote url ('http://...', 'https://...', 'ftp://...')
 *   isPlaying   : true,                         // optional, default : true
 *   dismissable : true,                         // optional, default : false
 *
 *   // hide previous/next/close buttons:
 *   hasPrev   : false,      // show previous button, optional, default: true
 *   hasNext   : false,      // show next button, optional, default: true
 *   hasClose  : true,       // show close button, optional, default: false
 *
 *   // Android only, optional
 *   // text displayed in the status bar when the notification (and the ticker) are updated
 *   ticker    : 'Now playing "Time is Running Out"'
 *  });
 *
 *  MusicControls.subscribe().subscribe(action => {
 *
 *    switch(action) {
 *        case 'music-controls-next':
 *            // Do something
 *            break;
 *        case 'music-controls-previous':
 *            // Do something
 *            break;
 *        case 'music-controls-pause':
 *            // Do something
 *            break;
 *        case 'music-controls-play':
 *            // Do something
 *            break;
 *        case 'music-controls-destroy':
 *            // Do something
 *            break;
 *
 *        // Headset events (Android only)
 *        case 'music-controls-media-button' :
 *            // Do something
 *            break;
 *        case 'music-controls-headset-unplugged':
 *            // Do something
 *            break;
 *        case 'music-controls-headset-plugged':
 *            // Do something
 *            break;
 *        default:
 *            break;
 *    }
 *
 *  });
 *
 *  MusicControls.listen(); // activates the observable above
 *
 *  MusicControls.updateIsPlaying(true);
 *
 *
 * ```
 */
var MusicControls = (function () {
    function MusicControls() {
    }
    /**
     * Create the media controls
     * @param options {MusicControlsOptions}
     * @returns {Promise<any>}
     */
    MusicControls.create = function (options) { return; };
    /**
     * Destroy the media controller
     * @returns {Promise<any>}
     */
    MusicControls.destroy = function () { return; };
    /**
     * Subscribe to the events of the media controller
     * @returns {Observable<any>}
     */
    MusicControls.subscribe = function () { return; };
    /**
     * Start listening for events, this enables the Observable from the subscribe method
     */
    MusicControls.listen = function () { };
    /**
     * Toggle play/pause:
     * @param isPlaying {boolean}
     */
    MusicControls.updateIsPlaying = function (isPlaying) { };
    __decorate$67([
        Cordova()
    ], MusicControls, "create", null);
    __decorate$67([
        Cordova()
    ], MusicControls, "destroy", null);
    __decorate$67([
        Cordova({
            observable: true
        })
    ], MusicControls, "subscribe", null);
    __decorate$67([
        Cordova({ sync: true })
    ], MusicControls, "listen", null);
    __decorate$67([
        Cordova({ sync: true })
    ], MusicControls, "updateIsPlaying", null);
    MusicControls = __decorate$67([
        Plugin({
            plugin: 'cordova-plugin-music-controls',
            pluginRef: 'MusicControls',
            repo: 'https://github.com/homerours/cordova-music-controls-plugin'
        })
    ], MusicControls);
    return MusicControls;
}());

var __decorate$68 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Network
 * @description
 * Requires Cordova plugin: cordova-plugin-network-information. For more info, please see the [Network plugin docs](https://github.com/apache/cordova-plugin-network-information).
 *
 * @usage
 * ```typescript
 * import { Network } from 'ionic-native';
 *
 * // watch network for a disconnect
 * let disconnectSubscription = Network.onDisconnect().subscribe(() => {
 *   console.log('network was disconnected :-(');
 * });
 *
 * // stop disconnect watch
 * disconnectSubscription.unsubscribe();
 *
 *
 * // watch network for a connection
 * let connectSubscription = Network.onConnect().subscribe(() => {
 *   console.log('network connected!');

 *   // We just got a connection but we need to wait briefly
 *
   // before we determine the connection type.  Might need to wait

 *   // prior to doing any api requests as well.
 *   setTimeout(() => {
 *     if (Network.connection === 'wifi') {
 *       console.log('we got a wifi connection, woohoo!');
 *     }
 *   }, 3000);
 * });
 *
 * // stop connect watch
 * connectSubscription.unsubscribe();
 *
 * ```
 * @advanced
 * The `connection` property will return one of the following connection types: `unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
 */
var Network = (function () {
    function Network() {
    }
    Object.defineProperty(Network, "connection", {
        /**
         * Return the network connection type
         */
        get: function () { return navigator.connection.type; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get notified when the device goes offline
     * @returns {Observable<any>} Returns an observable.
     */
    Network.onDisconnect = function () { return; };
    /**
     * Get notified when the device goes online
     * @returns {Observable<any>} Returns an observable.
     */
    Network.onConnect = function () { return; };
    __decorate$68([
        CordovaProperty
    ], Network, "connection", null);
    __decorate$68([
        Cordova({
            eventObservable: true,
            event: 'offline'
        })
    ], Network, "onDisconnect", null);
    __decorate$68([
        Cordova({
            eventObservable: true,
            event: 'online'
        })
    ], Network, "onConnect", null);
    Network = __decorate$68([
        Plugin({
            plugin: 'cordova-plugin-network-information',
            repo: 'https://github.com/apache/cordova-plugin-network-information',
            platforms: ['Amazon Fire OS', 'iOS', 'Android', 'BlackBerry 10', 'Windows Phone 7', 'Windows Phone 8', 'Windows', 'Firefox OS', 'Browser'],
            pluginRef: 'navigator.connection'
        })
    ], Network);
    return Network;
}());

var __decorate$69 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name NFC
 * @description
 * The NFC plugin allows you to read and write NFC tags. You can also beam to, and receive from, other NFC enabled devices.
 *
 * Use to
 * - read data from NFC tags
 * - write data to NFC tags
 * - send data to other NFC enabled devices
 * - receive data from NFC devices
 *
 * This plugin uses NDEF (NFC Data Exchange Format) for maximum compatibilty between NFC devices, tag types, and operating systems.
 *
 * @usage
 * ```
 * import {NFC, Ndef} from 'ionic-native';
 *
 * let message = Ndef.textRecord('Hello world');
 * NFC.share([message]).then(onSuccess).catch(onError);
 *
 * ```
 */
var NFC = (function () {
    function NFC() {
    }
    /**
     * Registers an event listener for any NDEF tag.
     * @param onSuccess
     * @param onFailure
     * @return {Promise<any>}
     */
    NFC.addNdefListener = function (onSuccess, onFailure) { return; };
    /**
     * Registers an event listener for tags matching any tag type.
     * @param mimeType
     * @param onSuccess
     * @param onFailure
     * @return {Promise<any>}
     */
    NFC.addTagDiscoveredListener = function (mimeType, onSuccess, onFailure) { return; };
    /**
     * Registers an event listener for NDEF tags matching a specified MIME type.
     * @param onSuccess
     * @param onFailure
     * @return {Promise<any>}
     */
    NFC.addMimeTypeListener = function (onSuccess, onFailure) { return; };
    /**
     * Registers an event listener for formatable NDEF tags.
     * @param onSuccess
     * @param onFailure
     * @return {Promise<any>}
     */
    NFC.addNdefFormatableListener = function (onSuccess, onFailure) { return; };
    /**
     * Qrites an NdefMessage to a NFC tag.
     * @param message {any[]}
     * @return {Promise<any>}
     */
    NFC.write = function (message) { return; };
    /**
     * Makes a NFC tag read only. **Warning** this is permanent.
     * @return {Promise<any>}
     */
    NFC.makeReadyOnly = function () { return; };
    /**
     * Shares an NDEF Message via peer-to-peer.
     * @param message An array of NDEF Records.
     * @return {Promise<any>}
     */
    NFC.share = function (message) { return; };
    /**
     * Stop sharing NDEF data via peer-to-peer.
     * @return {Promise<any>}
     */
    NFC.unshare = function () { return; };
    /**
     * Erase a NDEF tag
     */
    NFC.erase = function () { return; };
    /**
     * Send a file to another device via NFC handover.
     * @param uris A URI as a String, or an array of URIs.
     * @return {Promise<any>}
     */
    NFC.handover = function (uris) { return; };
    /**
     * Stop sharing NDEF data via NFC handover.
     * @return {Promise<any>}
     */
    NFC.stopHandover = function () { return; };
    /**
     * Show the NFC settings on the device.
     * @return {Promise<any>}
     */
    NFC.showSettings = function () { return; };
    /**
     * Check if NFC is available and enabled on this device.
     * @return {Promise<any>}
     */
    NFC.enabled = function () { return; };
    __decorate$69([
        Cordova({
            observable: true,
            successIndex: 0,
            errorIndex: 3,
            clearFunction: 'removeNdefListener',
            clearWithArgs: true
        })
    ], NFC, "addNdefListener", null);
    __decorate$69([
        Cordova({
            observable: true,
            successIndex: 1,
            errorIndex: 4,
            clearFunction: 'removeTagDiscoveredListener',
            clearWithArgs: true
        })
    ], NFC, "addTagDiscoveredListener", null);
    __decorate$69([
        Cordova({
            observable: true,
            successIndex: 0,
            errorIndex: 3,
            clearFunction: 'removeMimeTypeListener',
            clearWithArgs: true
        })
    ], NFC, "addMimeTypeListener", null);
    __decorate$69([
        Cordova({
            observable: true,
            successIndex: 0,
            errorIndex: 3
        })
    ], NFC, "addNdefFormatableListener", null);
    __decorate$69([
        Cordova()
    ], NFC, "write", null);
    __decorate$69([
        Cordova()
    ], NFC, "makeReadyOnly", null);
    __decorate$69([
        Cordova()
    ], NFC, "share", null);
    __decorate$69([
        Cordova()
    ], NFC, "unshare", null);
    __decorate$69([
        Cordova()
    ], NFC, "erase", null);
    __decorate$69([
        Cordova()
    ], NFC, "handover", null);
    __decorate$69([
        Cordova()
    ], NFC, "stopHandover", null);
    __decorate$69([
        Cordova()
    ], NFC, "showSettings", null);
    __decorate$69([
        Cordova()
    ], NFC, "enabled", null);
    NFC = __decorate$69([
        Plugin({
            plugin: 'phonegap-nfc',
            pluginRef: 'nfc',
            repo: 'https://github.com/chariotsolutions/phonegap-nfc'
        })
    ], NFC);
    return NFC;
}());

var __decorate$70 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name OneSignal
 * @description
 * The OneSignal plugin is an client implementation for using the [OneSignal](https://onesignal.com/) Service.
 * OneSignal is a simple implementation for delivering push notifications.
 *
 * Requires Cordova plugin: `onesignal-cordova-plugin`. For more info, please see the [OneSignal Cordova Docs](https://documentation.onesignal.com/docs/phonegap-sdk-installation).
 *
 * @usage
 * ```typescript
 * import { OneSignal } from 'ionic-native';
 *
 * OneSignal.init('b2f7f966-d8cc-11e4-bed1-df8f05be55ba',
 *                        {googleProjectNumber: '703322744261'})
 *  .subscribe(jsonData => {
 *    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
 *  });
 *
 * OneSignal.enableInAppAlertNotification(true);
 * ```
 *
 */
var OneSignal = (function () {
    function OneSignal() {
    }
    /**
     * Only required method you need to call to setup OneSignal to receive push notifications. Call this from the `deviceready` event.
     *
     * @param {appId} Your AppId from your OneSignal app
     * @param {options} The Google Project Number (which you can get from the Google Developer Potal) and the autoRegister option.
     * @returns {Observable} when a notification is received. Handle your notification action here.
     */
    OneSignal.init = function (appId, options) { return; };
    /**
     * Call this when you would like to prompt an iOS user to accept push notifications with the default system prompt.
     * Only use if you passed false to autoRegister when calling init.
     */
    OneSignal.registerForPushNotifications = function () { };
    /**
     * Tag a user based on an app event of your choosing so later you can create segments on [onesignal.com](https://onesignal.com/) to target these users.
     * Recommend using sendTags over sendTag if you need to set more than one tag on a user at a time.
     *
     * @param {key} Key of your choosing to create or update.
     * @param {value} Value to set on the key. NOTE: Passing in a blank String deletes the key, you can also call deleteTag.
     */
    OneSignal.sendTag = function (key, value) { };
    /**
   * Tag a user based on an app event of your choosing so later you can create segments on [onesignal.com](https://onesignal.com/) to target these users.
   * Recommend using sendTags over sendTag if you need to set more than one tag on a user at a time.
   *
   * @param {json} Pass a json object with key/value pairs like: {key: "value", key2: "value2"}
   */
    OneSignal.sendTags = function (json) { };
    /**
    * Retrieve a list of tags that have been set on the user from the OneSignal server.
    *
    * @returns {Promise} Returns a Promise that resolves when tags are recieved.
    */
    OneSignal.getTags = function () { return; };
    /**
    * Deletes a tag that was previously set on a user with `sendTag` or `sendTags`. Use `deleteTags` if you need to delete more than one.
    *
    * @param {key} Key to remove.
    */
    OneSignal.deleteTag = function (key) { };
    /**
    * Deletes tags that were previously set on a user with `sendTag` or `sendTags`.
    *
    * @param {keys} Keys to remove.
    */
    OneSignal.deleteTags = function (keys) { };
    /**
    * Lets you retrieve the OneSignal user id and device token.
    * Your handler is called after the device is successfully registered with OneSignal.
    *
    * @returns {Promise} Returns a Promise that reolves if the device was successfully registered.
    * It returns a JSON with `userId`and `pushToken`.
    */
    OneSignal.getIds = function () { return; };
    /**
    * Warning:
    * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
    *
    * By default OneSignal always vibrates the device when a notification is displayed unless the device is in a total silent mode.
    * Passing false means that the device will only vibrate lightly when the device is in it's vibrate only mode.
    *
    * @param {enable} false to disable vibrate, true to re-enable it.
    */
    OneSignal.enableVibrate = function (enable) { };
    /**
    * Warning:
    * Only applies to Android and Amazon. You can call this from your UI from a button press for example to give your user's options for your notifications.
    *
    * By default OneSignal plays the system's default notification sound when the device's notification system volume is turned on.
    * Passing false means that the device will only vibrate unless the device is set to a total silent mode.
    *
    * @param {enable} false to disable sound, true to re-enable it.
    */
    OneSignal.enableSound = function (enable) { };
    /**
    * Warning:
    * Only applies to Android and Amazon devices.
    *
    * By default this is false and notifications will not be shown when the user is in your app, instead the notificationOpenedCallback is fired.
    * If set to true notifications will always show in the notification area and notificationOpenedCallback will not fire until the user taps on the notification.
    *
    * @param {enable} enable
    */
    OneSignal.enableNotificationsWhenActive = function (enable) { };
    /**
    * By default this is false and notifications will not be shown when the user is in your app, instead the notificationOpenedCallback is fired.
    * If set to true notifications will be shown as native alert boxes if a notification is received when the user is in your app.
    * The notificationOpenedCallback is then fired after the alert box is closed.
    *
    * @param {enable} enable
    */
    OneSignal.enableInAppAlertNotification = function (enable) { };
    /**
    * You can call this method with false to opt users out of receiving all notifications through OneSignal.
    * You can pass true later to opt users back into notifications.
    *
    * @param {enable} enable
    */
    OneSignal.setSubscription = function (enable) { };
    /**
    *
    * @param {notificationObj} Parameters see POST [documentation](https://documentation.onesignal.com/v2.0/docs/notifications-create-notification)
    * @returns {Promise} Returns a Promise that resolves if the notification was send successfully.
    */
    OneSignal.postNotification = function (notificationObj) { return; };
    /**
    * Prompts the user for location permission to allow geotagging based on the "Location radius" filter on the OneSignal dashboard.
    */
    OneSignal.promptLocation = function () { };
    /**
    * Enable logging to help debug if you run into an issue setting up OneSignal.
    * The logging levels are as follows: 0 = None, 1= Fatal, 2 = Errors, 3 = Warnings, 4 = Info, 5 = Debug, 6 = Verbose
  
    * The higher the value the more information is shown.
    *
    * @param {loglevel} contains two properties: logLevel (for console logging) and visualLevel (for dialog messages)
    */
    OneSignal.setLogLevel = function (logLevel) { };
    __decorate$70([
        Cordova({ observable: true })
    ], OneSignal, "init", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "registerForPushNotifications", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "sendTag", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "sendTags", null);
    __decorate$70([
        Cordova()
    ], OneSignal, "getTags", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "deleteTag", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "deleteTags", null);
    __decorate$70([
        Cordova()
    ], OneSignal, "getIds", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "enableVibrate", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "enableSound", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "enableNotificationsWhenActive", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "enableInAppAlertNotification", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "setSubscription", null);
    __decorate$70([
        Cordova()
    ], OneSignal, "postNotification", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "promptLocation", null);
    __decorate$70([
        Cordova({ sync: true })
    ], OneSignal, "setLogLevel", null);
    OneSignal = __decorate$70([
        Plugin({
            plugin: 'onesignal-cordova-plugin',
            pluginRef: 'plugins.OneSignal',
            repo: 'https://github.com/OneSignal/OneSignal-Cordova-SDK'
        })
    ], OneSignal);
    return OneSignal;
}());

var __decorate$71 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Photo Viewer
 * @description This plugin can display your image in full screen with the ability to pan, zoom, and share the image.
 * @usage
 * ```typescript
 * import { PhotoViewer } from 'ionic-native';
 *
 * PhotoViewer.show('https://mysite.com/path/to/image.jpg');
 *
 * PhotoViewer.show('https://mysite.com/path/to/image.jpg', 'My image title', {share: false});
 * ```
 */
var PhotoViewer = (function () {
    function PhotoViewer() {
    }
    /**
     * Shows an image in full screen
     * @param url {string} URL or path to image
     * @param title {string}
     * @param options {any}
     */
    PhotoViewer.show = function (url, title, options) { };
    __decorate$71([
        Cordova({ sync: true })
    ], PhotoViewer, "show", null);
    PhotoViewer = __decorate$71([
        Plugin({
            plugin: 'com-sarriaroman-photoviewer',
            pluginRef: 'PhotoViewer',
            repo: 'https://github.com/sarriaroman/photoviewer'
        })
    ], PhotoViewer);
    return PhotoViewer;
}());

var __decorate$72 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Screen Orientation
 * @description
 * Cordova plugin to set/lock the screen orientation in a common way for iOS, Android, WP8 and Blackberry 10.
 * This plugin is based on an early version of Screen Orientation API so the api does not currently match the current spec.
 *
 * Requires Cordova plugin: `cordova-plugin-screen-orientation`. For more info, please see the [Screen Orientation plugin docs](https://github.com/apache/cordova-plugin-screen-orientation).
 *
 * @usage
 * ```typescript
 * import { ScreenOrientation } from 'ionic-native';
 *
 *
 * // set to either landscape
 * ScreenOrientation.lockOrientation('landscape');
 *
 * // allow user rotate
 * ScreenOrientation.unlockOrientation();
 * ```
 *
 * @advanced
 *
 * Accepted orientation values:
 *
 * | Value                         | Description                                                                  |
 * |-------------------------------|------------------------------------------------------------------------------|
 * | portrait-primary              | The orientation is in the primary portrait mode.                             |
 * | portrait-secondary            | The orientation is in the secondary portrait mode.                           |
 * | landscape-primary             | The orientation is in the primary landscape mode.                            |
 * | landscape-secondary           | The orientation is in the secondary landscape mode.                          |
 * | portrait                      | The orientation is either portrait-primary or portrait-secondary (sensor).   |
 * | landscape                     | The orientation is either landscape-primary or landscape-secondary (sensor). |
 *
 */
var ScreenOrientation = (function () {
    function ScreenOrientation() {
    }
    /**
     * Lock the orientation to the passed value.
     * See below for accepted values
     * @param {orientation} The orientation which should be locked. Accepted values see table below.
     */
    ScreenOrientation.lockOrientation = function (orientation) { };
    /**
     * Unlock and allow all orientations.
     */
    ScreenOrientation.unlockOrientation = function () { };
    Object.defineProperty(ScreenOrientation, "orientation", {
        /*
         * Get the current orientation of the device.
         */
        get: function () {
            return window.screen.orientation;
        },
        enumerable: true,
        configurable: true
    });
    __decorate$72([
        Cordova({ sync: true })
    ], ScreenOrientation, "lockOrientation", null);
    __decorate$72([
        Cordova({ sync: true })
    ], ScreenOrientation, "unlockOrientation", null);
    __decorate$72([
        CordovaProperty
    ], ScreenOrientation, "orientation", null);
    ScreenOrientation = __decorate$72([
        Plugin({
            plugin: 'cordova-plugin-screen-orientation',
            pluginRef: 'window.screen',
            repo: 'https://github.com/apache/cordova-plugin-screen-orientation',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], ScreenOrientation);
    return ScreenOrientation;
}());

var __decorate$73 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name PayPal
 * @description
 * PayPal plugin for Cordova/Ionic Applications
 *
 * @usage
 * ```
 * import {PayPal} from 'ionic-native';
 *
 * PayPal.init({
 *      "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
       "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
       })
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 */
var PayPal = (function () {
    function PayPal() {
    }
    /**
     * You must preconnect to PayPal to prepare the device for processing payments.
     * This improves the user experience, by making the presentation of the
     * UI faster. The preconnect is valid for a limited time, so
     * the recommended time to preconnect is on page load.
     *
     * @param {String} environment: available options are "PayPalEnvironmentNoNetwork", "PayPalEnvironmentProduction" and "PayPalEnvironmentSandbox"
     * @param {PayPalConfiguration} configuration: For Future Payments merchantName, merchantPrivacyPolicyURL and merchantUserAgreementURL must be set be set
     */
    PayPal.init = function (environment, configuration) { return; };
    /**
     * Retreive the version of PayPal iOS SDK Library.
     */
    PayPal.version = function () { return; };
    /**
     * Start PayPal UI to collect payment from the user.
     * See https://developer.paypal.com/webapps/developer/docs/integration/mobile/ios-integration-guide/
     * for more documentation of the params.
     *
     * @param {PayPalPayment} payment: PayPalPayment object
     */
    PayPal.renderSinglePaymentUI = function (payment) { return; };
    /**
     * Once a user has consented to future payments, when the user subsequently initiates a PayPal payment
     * from their device to be completed by your server, PayPal uses a Correlation ID to verify that the
     * payment is originating from a valid, user-consented device+application.
     * This helps reduce fraud and decrease declines.
     * This method MUST be called prior to initiating a pre-consented payment (a "future payment") from a mobile device.
     * Pass the result to your server, to include in the payment request sent to PayPal.
     * Do not otherwise cache or store this value.
     */
    PayPal.clientMetadataID = function () { return; };
    /**
     * Please Read Docs on Future Payments at https://github.com/paypal/PayPal-iOS-SDK#future-payments
     */
    PayPal.renderFuturePaymentUI = function () { return; };
    /**
     * Please Read Docs on Profile Sharing at https://github.com/paypal/PayPal-iOS-SDK#profile-sharing
     *
     * @param {Array<string>} scopes: scopes Set of requested scope-values. Accepted scopes are: openid, profile, address, email, phone, futurepayments and paypalattributes
     * See https://developer.paypal.com/docs/integration/direct/identity/attributes/ for more details
     **/
    PayPal.renderProfileSharingUI = function (scopes) { return; };
    __decorate$73([
        Cordova()
    ], PayPal, "init", null);
    __decorate$73([
        Cordova()
    ], PayPal, "version", null);
    __decorate$73([
        Cordova()
    ], PayPal, "renderSinglePaymentUI", null);
    __decorate$73([
        Cordova()
    ], PayPal, "clientMetadataID", null);
    __decorate$73([
        Cordova()
    ], PayPal, "renderFuturePaymentUI", null);
    __decorate$73([
        Cordova()
    ], PayPal, "renderProfileSharingUI", null);
    PayPal = __decorate$73([
        Plugin({
            plugin: 'com.paypal.cordova.mobilesdk',
            pluginRef: 'PayPalMobile',
            repo: 'https://github.com/paypal/PayPal-Cordova-Plugin'
        })
    ], PayPal);
    return PayPal;
}());

var __decorate$74 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Pin Dialog
 * @description
 *
 * @usage
 * ```typescript
 * import { PinDialog } from 'ionic-native';
 *
 *
 * PinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel'])
 *   .then(
 *     (result: any) => {
 *       if (result.buttonIndex == 1) console.log('User clicked OK, value is: ', result.input1);
 *       else if(result.buttonIndex == 2) console.log('User cancelled');
 *     }
 *   );
 * ```
 */
var PinDialog = (function () {
    function PinDialog() {
    }
    /**
     * Show pin dialog
     * @param {string} message Message to show the user
     * @param {string} title Title of the dialog
     * @param {string[]} buttons Buttons to show
     */
    PinDialog.prompt = function (message, title, buttons) { return; };
    __decorate$74([
        Cordova({
            successIndex: 1
        })
    ], PinDialog, "prompt", null);
    PinDialog = __decorate$74([
        Plugin({
            plugin: 'cordova-plugin-pin-dialog',
            pluginRef: 'plugins.pinDialog',
            repo: 'https://github.com/Paldom/PinDialog'
        })
    ], PinDialog);
    return PinDialog;
}());

var __decorate$75 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name PowerManagement
 * @description
 * The PowerManagement plugin offers access to the devices power-management functionality.
 * It should be used for applications which keep running for a long time without any user interaction.
 *
 * @usage
 * ```
 * import {PowerManagement} from 'ionic-native';
 *
 * PowerManagement.acquire()
 *   .then(onSuccess)
 *   .catch(onError);
 *
 * ```
 */
var PowerManagement = (function () {
    function PowerManagement() {
    }
    /**
     * Acquire a wakelock by calling this.
     */
    PowerManagement.acquire = function () { return; };
    /**
     * This acquires a partial wakelock, allowing the screen to be dimmed.
     */
    PowerManagement.dim = function () { return; };
    /**
     * Release the wakelock. It's important to do this when you're finished with the wakelock, to avoid unnecessary battery drain.
     */
    PowerManagement.release = function () { return; };
    /**
     * By default, the plugin will automatically release a wakelock when your app is paused (e.g. when the screen is turned off, or the user switches to another app).
     * It will reacquire the wakelock upon app resume. If you would prefer to disable this behaviour, you can use this function.
     * @param set {boolean}
     */
    PowerManagement.setReleaseOnPause = function (set) { return; };
    __decorate$75([
        Cordova()
    ], PowerManagement, "acquire", null);
    __decorate$75([
        Cordova()
    ], PowerManagement, "dim", null);
    __decorate$75([
        Cordova()
    ], PowerManagement, "release", null);
    __decorate$75([
        Cordova()
    ], PowerManagement, "setReleaseOnPause", null);
    PowerManagement = __decorate$75([
        Plugin({
            plugin: 'cordova-plugin-powermanagement-orig',
            pluginRef: 'https://github.com/Viras-/cordova-plugin-powermanagement',
            repo: 'powerManagement'
        })
    ], PowerManagement);
    return PowerManagement;
}());

var __decorate$76 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Printer
 * @description Prints documents or HTML rendered content
 * @usage
 * ```typescript
 * import {Printer, PrintOptions} from 'ionic-native';
 *
 * Printer.isAvailable().then(onSuccess, onError);
 *
 * let options: PrintOptions = {
 *      name: 'MyDocument',
 *      printerId: 'printer007',
 *      duplex: true,
 *      landscape: true,
 *      grayscale: true
 *    };
 *
 * Printer.print(content, options).then(onSuccess, onError);
 * ```
 */
var Printer = (function () {
    function Printer() {
    }
    /**
     * Checks whether to device is capable of printing.
     */
    Printer.isAvailable = function () { return; };
    /**
     * Sends content to the printer.
     * @param {content} The content to print. Can be a URL or an HTML string. If a HTML DOM Object is provided, its innerHtml property value will be used.
     * @param {options} The options to pass to the printer
     */
    Printer.print = function (content, options) { return; };
    __decorate$76([
        Cordova()
    ], Printer, "isAvailable", null);
    __decorate$76([
        Cordova()
    ], Printer, "print", null);
    Printer = __decorate$76([
        Plugin({
            plugin: 'de.appplant.cordova.plugin.printer',
            pluginRef: 'cordova.plugins.printer',
            repo: 'https://github.com/katzer/cordova-plugin-printer.git',
            platforms: ['Android', 'iOS']
        })
    ], Printer);
    return Printer;
}());

var __decorate$77 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Push
 * @description
 * Register and receive push notifications.
 *
 * Requires Cordova plugin: `phonegap-plugin-push`. For more info, please see the [Push plugin docs](https://github.com/phonegap/phonegap-plugin-push).
 *
 * For TypeScript users, see the [Push plugin docs about using TypeScript for custom notifications](https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/TYPESCRIPT.md).
 *
 * @usage
 * ```typescript
 * import { Push } from 'ionic-native';
 * ```
 */
var Push = (function () {
    function Push() {
    }
    /**
     * Initialize the plugin on the native side.
     *
     * ```
     * var push = Push.init({
     *    android: {
     *        senderID: '12345679'
     *    },
     *    ios: {
     *        alert: 'true',
     *        badge: true,
     *        sound: 'false'
     *    },
     *    windows: {}
     * });
     * ```
     *
     * @param {PushOptions} options  The Push [options](https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/API.md#parameters).
     * @return {PushNotification}  Returns a new [PushNotification](https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/API.md#pushonevent-callback) object.
     */
    Push.init = function (options) { return; };
    /**
     * Check whether the push notification permission has been granted.
     * @return {Promise} Returns a Promise that resolves with an object with one property: isEnabled, a boolean that indicates if permission has been granted.
     */
    Push.hasPermission = function () { return; };
    __decorate$77([
        Cordova({
            sync: true
        })
    ], Push, "init", null);
    __decorate$77([
        Cordova()
    ], Push, "hasPermission", null);
    Push = __decorate$77([
        Plugin({
            plugin: 'phonegap-plugin-push',
            pluginRef: 'PushNotification',
            repo: 'https://github.com/phonegap/phonegap-plugin-push'
        })
    ], Push);
    return Push;
}());

var __decorate$78 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name SafariViewController
 * @description
 * @usage
 * ```
 * import { SafariViewController } from 'ionic-native';
 *
 *
 * SafariViewController.isAvailable()
 *   .then(
 *     (available: boolean) => {
 *       if(available){
 *
 *         SafariViewController.show({
 *           url: 'http://ionic.io',
 *           hidden: false,
 *           animated: false,
 *           transition: 'curl',
 *           enterReaderModeIfAvailable: true,
 *           tintColor: '#ff0000'
 *         })
 *         .then(
 *           (result: any) => {
 *             if(result.event === 'opened') console.log('Opened');
 *             else if(result.event === 'loaded') console.log('Loaded');
 *             else if(result.event === 'closed') console.log('Closed');
 *           },
 *           (error: any) => console.error(error)
 *         );
 *
 *       } else {
 *         // use fallback browser, example InAppBrowser
 *       }
 *     }
 *   );
 * ```
 */
var SafariViewController = (function () {
    function SafariViewController() {
    }
    /**
     * Checks if SafariViewController is available
     */
    SafariViewController.isAvailable = function () { return; };
    /**
     * Shows Safari View Controller
     * @param options
     */
    SafariViewController.show = function (options) { return; };
    /**
     * Hides Safari View Controller
     */
    SafariViewController.hide = function () { };
    /**
     * Tries to connect to the  Chrome's custom tabs service. you must call this method before calling any of the other methods listed below.
     */
    SafariViewController.connectToService = function () { return; };
    /**
     * Call this method whenever there's a chance the user will open an external url.
     */
    SafariViewController.warmUp = function () { return; };
    /**
     * For even better performance optimization, call this methods if there's more than a 50% chance the user will open a certain URL.
     * @param url
     */
    SafariViewController.mayLaunchUrl = function (url) { return; };
    __decorate$78([
        Cordova()
    ], SafariViewController, "isAvailable", null);
    __decorate$78([
        Cordova()
    ], SafariViewController, "show", null);
    __decorate$78([
        Cordova()
    ], SafariViewController, "hide", null);
    __decorate$78([
        Cordova()
    ], SafariViewController, "connectToService", null);
    __decorate$78([
        Cordova()
    ], SafariViewController, "warmUp", null);
    __decorate$78([
        Cordova()
    ], SafariViewController, "mayLaunchUrl", null);
    SafariViewController = __decorate$78([
        Plugin({
            plugin: 'cordova-plugin-safariviewcontroller',
            pluginRef: 'SafariViewController',
            platforms: ['iOS', 'Android'],
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller'
        })
    ], SafariViewController);
    return SafariViewController;
}());

var __decorate$79 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Screenshot
 * @description Captures a screen shot
 * @usage
 * ```typescript
 * import {Screenshot} from 'ionic-native';
 *
 * // Take a screenshot and save to file
 * Screenshot.save('jpg', 80, 'myscreenshot.jpg').then(onSuccess, onError);
 *
 * // Take a screenshot and get temporary file URI
 * Screenshot.URI(80).then(onSuccess, onError);
 * ```
 */
var Screenshot = (function () {
    function Screenshot() {
    }
    /**
     *  Takes screenshot and saves the image
     *
     * @param {string} format. Format can take the value of either 'jpg' or 'png'
     * On ios, only 'jpg' format is supported
     * @param {number} quality. Determines the quality of the screenshot.
     *        Default quality is set to 100.
     * @param {string} filename. Name of the file as stored on the storage
     */
    Screenshot.save = function (format, quality, filename) {
        return new Promise(function (resolve, reject) {
            navigator.screenshot.save(function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            }, format, quality, filename);
        });
    };
    /**
     *  Takes screenshot and returns the image as an URI
     *
     * @param {number} quality. Determines the quality of the screenshot.
     *        Default quality is set to 100.
     */
    Screenshot.URI = function (quality) {
        return new Promise(function (resolve, reject) {
            navigator.screenshot.URI(function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            }, quality);
        });
    };
    Screenshot = __decorate$79([
        Plugin({
            plugin: 'https://github.com/gitawego/cordova-screenshot.git',
            pluginRef: 'navigator.screenshot',
            repo: 'https://github.com/gitawego/cordova-screenshot.git'
        })
    ], Screenshot);
    return Screenshot;
}());

var __decorate$80 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Secure Storage
 * @description
 * This plugin gets, sets and removes key,value pairs from a device's secure storage.
 *
 * Requires Cordova plugin: `cordova-plugin-secure-storage`. For more info, please see the [Cordova Secure Storage docs](https://github.com/Crypho/cordova-plugin-secure-storage).
 *
 * @usage
 *
 * ```typescript
 * import { SecureStorage } from 'ionic-native';
 *
 * let secureStorage: SecureStorage = new SecureStorage();
 * secureStorage.create('my_store_name')
 *  .then(
 *    () => console.log('Storage is ready!'),
 *    error => console.log(error)
 * );
 *
 * secureStorage.get('myitem')
 *  .then(
 *    data => console.log(data),
 *    error => console.log(error)
 * );
 *
 * secureStorage.set('myitem', 'myvalue')
 *  .then(
 *    data => console.log(data),
 *    error => console.log(error)
 * );
 *
 * secureStorage.remove('myitem')
 * .then(
 *    data => console.log(data),
 *    error => console.log(error)
 * );
 * ```
 */
var SecureStorage = (function () {
    function SecureStorage() {
    }
    /**
     * Creates a namespaced storage.
     * @param store {string}
     */
    SecureStorage.prototype.create = function (store) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this._objectInstance = new cordova.plugins.SecureStorage(res, rej, store);
        });
    };
    /**
     * Gets a stored item
     * @param reference {string}
     */
    SecureStorage.prototype.get = function (reference) { return; };
    /**
     * Stores a value
     * @param reference {string}
     * @param value {string}
     */
    SecureStorage.prototype.set = function (reference, value) { return; };
    /**
     * Removes a single stored item
     * @param reference {string}
     */
    SecureStorage.prototype.remove = function (reference) { return; };
    __decorate$80([
        CordovaInstance({
            callbackOrder: 'reverse'
        })
    ], SecureStorage.prototype, "get", null);
    __decorate$80([
        CordovaInstance({
            callbackOrder: 'reverse'
        })
    ], SecureStorage.prototype, "set", null);
    __decorate$80([
        CordovaInstance({
            callbackOrder: 'reverse'
        })
    ], SecureStorage.prototype, "remove", null);
    SecureStorage = __decorate$80([
        Plugin({
            plugin: 'cordova-plugin-secure-storage',
            pluginRef: 'plugins.securestorage',
            repo: 'https://github.com/Crypho/cordova-plugin-secure-storage',
            platforms: ['Android', 'iOS', 'Windows Phone', 'Browser']
        })
    ], SecureStorage);
    return SecureStorage;
}());

var __decorate$81 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Shake
 * @description Handles shake gesture
 * @usage
 * ```typescript
 * import {Shake} from 'ionic-native';
 *
 * let watch = Shake.startWatch(60).subscribe(() => {
 *   // do something
 *   });
 *
 * watch.unsubscribe();
 * ```
 */
var Shake = (function () {
    function Shake() {
    }
    /**
     * Watch for shake gesture
     * @param sensitivity {number} Optional sensitivity parameter. Defaults to 40
     */
    Shake.startWatch = function (sensitivity) { return; };
    __decorate$81([
        Cordova({
            observable: true,
            clearFunction: 'stopWatch',
            successIndex: 0,
            errorIndex: 2
        })
    ], Shake, "startWatch", null);
    Shake = __decorate$81([
        Plugin({
            plugin: 'cordova-plugin-shake',
            pluginRef: 'shake',
            repo: 'https://github.com/leecrossley/cordova-plugin-shake'
        })
    ], Shake);
    return Shake;
}());

var __decorate$82 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Sim
 * @description
 * Gets info from the Sim card like the carrier name, mcc, mnc and country code and other system dependent info.
 *
 * Requires Cordova plugin: `cordova-plugin-sim`. For more info, please see the [Cordova Sim docs](https://github.com/pbakondy/cordova-plugin-sim).
 *
 * @usage
 * ```typescript
 * import { Sim } from 'ionic-native';
 *
 *
 * Sim.getSimInfo().then(
 *   (info) => console.log('Sim info: ', info),
 *   (err) => console.log('Unable to get sim info: ', err)
 * );
 * ```
 */
var Sim = (function () {
    function Sim() {
    }
    /**
     * Returns info from the SIM card.
     * @returns {Promise}
     */
    Sim.getSimInfo = function () { return; };
    __decorate$82([
        Cordova()
    ], Sim, "getSimInfo", null);
    Sim = __decorate$82([
        Plugin({
            plugin: 'cordova-plugin-sim',
            pluginRef: 'plugins.sim',
            repo: 'https://github.com/pbakondy/cordova-plugin-sim',
            platforms: ['Android', 'iOS', 'Windows Phone']
        })
    ], Sim);
    return Sim;
}());

var __decorate$83 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name SMS
 * @description
 *
 * Requires Cordova plugin: cordova-plugin-sms. For more info, please see the [SMS plugin docs](https://github.com/cordova-sms/cordova-sms-plugin).
 *
 * @usage
 * ```typescript
 * import { SMS } from 'ionic-native';
 *
 *
 * // Send a text message using default options
 * SMS.send('416123456', 'Hello world!');
 * ```
 */
var SMS = (function () {
    function SMS() {
    }
    /**
     * Sends sms to a number
     * @param phoneNumber {string|Array<string>} Phone number
     * @param message {string} Message
     * @param options {SmsOptions} Options
     * @returns {Promise<any>} Resolves promise when the SMS has been sent
     */
    SMS.send = function (phoneNumber, message, options) { return; };
    __decorate$83([
        Cordova()
    ], SMS, "send", null);
    SMS = __decorate$83([
        Plugin({
            plugin: 'cordova-sms-plugin',
            pluginRef: 'sms',
            repo: 'https://github.com/cordova-sms/cordova-sms-plugin',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], SMS);
    return SMS;
}());

var __decorate$84 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Social Sharing
 * @description
 * Share text, files, images, and links via social networks, sms, and email.
 * @usage
 * ```typescript
 * import { SocialSharing } from 'ionic-native';
 *
 * // Check if sharing via email is supported
 * SocialSharing.canShareViaEmail().then(() => {
 *   // Sharing via email is possible
 * }).catch(() => {
 *   // Sharing via email is not possible
 * });
 *
 * // Share via email
 * SocialSharing.shareViaEmail('Body', 'Subject', 'recipient@example.org').then(() => {
 *   // Success!
 * }).catch(() => {
 *   // Error!
 * });
 * ```
 */
var SocialSharing = (function () {
    function SocialSharing() {
    }
    /**
     * Shares using the share sheet
     * @param message {string} The message you would like to share.
     * @param subject {string} The subject
     * @param file {string|string[]} URL(s) to file(s) or image(s), local path(s) to file(s) or image(s), or base64 data of an image. Only the first file/image will be used on Windows Phone.
     * @param url {string} A URL to share
     * @returns {Promise}
     */
    SocialSharing.share = function (message, subject, file, url) { return; };
    /**
     * Shares using the share sheet with additional options and returns a result object or an error message (requires plugin version 5.1.0+)
     * @param options {object} The options object with the message, subject, files, url and chooserTitle properties.
     * @returns {Promise}
     */
    SocialSharing.shareWithOptions = function (options) { return; };
    /**
     * Checks if you can share via a specific app.
     * @param appName {string} App name or package name. Examples: instagram or com.apple.social.facebook
     * @param message {string}
     * @param subject {string}
     * @param image {string}
     * @param url {string}
     * @returns {Promise}
     */
    SocialSharing.canShareVia = function (appName, message, subject, image, url) { return; };
    /**
     * Shares directly to Twitter
     * @param message {string}
     * @param image {string}
     * @param url {string}
     * @returns {Promise}
     */
    SocialSharing.shareViaTwitter = function (message, image, url) { return; };
    /**
     * Shares directly to Facebook
     * @param message {string}
     * @param image {string}
     * @param url {string}
     * @returns {Promise}
     */
    SocialSharing.shareViaFacebook = function (message, image, url) { return; };
    /**
     * Shares directly to Facebook with a paste message hint
     * @param message {string}
     * @param image {string}
     * @param url {string}
     * @param pasteMessageHint {string}
     * @returns {Promise}
     */
    SocialSharing.shareViaFacebookWithPasteMessageHint = function (message, image, url, pasteMessageHint) { return; };
    /**
     * Shares directly to Instagram
     * @param message {string}
     * @param image {string}
     * @returns {Promise}
     */
    SocialSharing.shareViaInstagram = function (message, image) { return; };
    /**
     * Shares directly to WhatsApp
     * @param message {string}
     * @param image {string}
     * @param url {string}
     * @returns {Promise}
     */
    SocialSharing.shareViaWhatsApp = function (message, image, url) { return; };
    /**
     * Shares directly to a WhatsApp Contact
     * @param receiver {string} Pass phone number on Android, and Addressbook ID (abid) on iOS
     * @param message {string} Message to send
     * @param image {string} Image to send (does not work on iOS
     * @param url {string} Link to send
     * @returns {Promise}
     */
    SocialSharing.shareViaWhatsAppToReceiver = function (receiver, message, image, url) { return; };
    /**
     * Share via SMS
     * @param messge {string} message to send
     * @param phoneNumber {string} Number or multiple numbers seperated by commas
     * @returns {Promise}
     */
    SocialSharing.shareViaSMS = function (messge, phoneNumber) { return; };
    /**
     * Checks if you can share via email
     * @returns {Promise}
     */
    SocialSharing.canShareViaEmail = function () { return; };
    /**
     * Share via Email
     * @param message {string}
     * @param subject {string}
     * @param to {string[]}
     * @param cc {string[]} Optional
     * @param bcc {string[]} Optional
     * @param files {string|string[]} Optional URL or local path to file(s) to attach
     * @returns {Promise}
     */
    SocialSharing.shareViaEmail = function (message, subject, to, cc, bcc, files) { return; };
    /**
     * Share via AppName
     * @param appName {string} App name or package name. Examples: instagram or com.apple.social.facebook
     * @param message {string}
     * @param subject {string}
     * @param image {string}
     * @param url {string}
     * @returns {Promise}
     */
    SocialSharing.shareVia = function (appName, message, subject, image, url) { return; };
    __decorate$84([
        Cordova()
    ], SocialSharing, "share", null);
    __decorate$84([
        Cordova({
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareWithOptions", null);
    __decorate$84([
        Cordova({
            successIndex: 5,
            errorIndex: 6,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "canShareVia", null);
    __decorate$84([
        Cordova({
            successIndex: 3,
            errorIndex: 4,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaTwitter", null);
    __decorate$84([
        Cordova({
            successIndex: 3,
            errorIndex: 4,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaFacebook", null);
    __decorate$84([
        Cordova({
            successIndex: 4,
            errorIndex: 5,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaFacebookWithPasteMessageHint", null);
    __decorate$84([
        Cordova({
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaInstagram", null);
    __decorate$84([
        Cordova({
            successIndex: 3,
            errorIndex: 4,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaWhatsApp", null);
    __decorate$84([
        Cordova({
            successIndex: 4,
            errorIndex: 5,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaWhatsAppToReceiver", null);
    __decorate$84([
        Cordova({
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareViaSMS", null);
    __decorate$84([
        Cordova({
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "canShareViaEmail", null);
    __decorate$84([
        Cordova({
            platforms: ['iOS', 'Android'],
            successIndex: 6,
            errorIndex: 7
        })
    ], SocialSharing, "shareViaEmail", null);
    __decorate$84([
        Cordova({
            successIndex: 5,
            errorIndex: 6,
            platforms: ['iOS', 'Android']
        })
    ], SocialSharing, "shareVia", null);
    SocialSharing = __decorate$84([
        Plugin({
            plugin: 'cordova-plugin-x-socialsharing',
            pluginRef: 'plugins.socialsharing',
            repo: 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin',
            platforms: ['iOS', 'Android', 'Windows Phone']
        })
    ], SocialSharing);
    return SocialSharing;
}());

var __decorate$85 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Spinner Dialog
 * @description
 * @usage
 * ```typescript
 * import { SpinnerDialog } from 'ionic-native';
 *
 *
 * SpinnerDialog.show();
 *
 * SpinnerDialog.hide();
 * ```
 */
var SpinnerDialog = (function () {
    function SpinnerDialog() {
    }
    /**
     * Shows the spinner dialog
     * @param title {string} Spinner title (shows on Android only)
     * @param message {string} Spinner message
     * @param cancelCallback {boolean|function} Set to true to set spinner not cancelable. Or provide a function to call when the user cancels the spinner.
     * @param iOSOptions {object} Options for iOS only
     */
    SpinnerDialog.show = function (title, message, cancelCallback, iOSOptions) { };
    /**
     * Hides the spinner dialog if visible
     */
    SpinnerDialog.hide = function () { };
    __decorate$85([
        Cordova({
            sync: true
        })
    ], SpinnerDialog, "show", null);
    __decorate$85([
        Cordova({
            sync: true
        })
    ], SpinnerDialog, "hide", null);
    SpinnerDialog = __decorate$85([
        Plugin({
            plugin: 'cordova-plugin-spinner-dialog',
            pluginRef: 'window.plugins.spinnerDialog',
            repo: 'https://github.com/Paldom/SpinnerDialog',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], SpinnerDialog);
    return SpinnerDialog;
}());

var __decorate$86 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Splashscreen
 * @description This plugin displays and hides a splash screen during application launch. The methods below allows showing and hiding the splashscreen after the app has loaded.
 * @usage
 * ```typescript
 * import { Splashscreen } from 'ionic-native';
 *
 *
 * Splashscreen.show();
 *
 * Splashscreen.hide();
 * ```
 */
var Splashscreen = (function () {
    function Splashscreen() {
    }
    /**
     * Shows the splashscreen
     */
    Splashscreen.show = function () { };
    /**
     * Hides the splashscreen
     */
    Splashscreen.hide = function () { };
    __decorate$86([
        Cordova({
            sync: true
        })
    ], Splashscreen, "show", null);
    __decorate$86([
        Cordova({
            sync: true
        })
    ], Splashscreen, "hide", null);
    Splashscreen = __decorate$86([
        Plugin({
            plugin: 'cordova-plugin-splashscreen',
            pluginRef: 'navigator.splashscreen',
            repo: 'https://github.com/apache/cordova-plugin-splashscreen'
        })
    ], Splashscreen);
    return Splashscreen;
}());

var __decorate$87 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name SQLite
 *
 * @description
 * Access SQLite databases on the device.
 *
 * @usage
 *
 * ```typescript
 * import { SQLite } from 'ionic-native';
 *
 * let db = new SQLite();
 * db.openDatabase({
 *   name: 'data.db',
 *   location: 'default' // the location field is required
 * }).then(() => {
 *   db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {
 *
 *   }, (err) => {
 *     console.error('Unable to execute sql: ', err);
 *   });
 * }, (err) => {
 *   console.error('Unable to open database: ', err);
 * });
 * ```
 *
 */
var SQLite = (function () {
    function SQLite() {
    }
    Object.defineProperty(SQLite.prototype, "databaseFeatures", {
        get: function () {
            return this._objectInstance.databaseFeatures;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Open or create a SQLite database file.
     *
     * See the plugin docs for an explanation of all options: https://github.com/litehelpers/Cordova-sqlite-storage#opening-a-database
     *
     * @param config the config for opening the database.
     * @usage
     *
     * ```typescript
     * import { SQLite } from 'ionic-native';
     *
     * let db = new SQLite();
     * db.openDatabase({
     *   name: 'data.db',
     *   location: 'default' // the location field is required
     * }).then(() => {
     *   db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {
     *
     *   }, (err) => {
     *     console.error('Unable to execute sql', err);
     *   })
     * }, (err) => {
     *   console.error('Unable to open database', err);
     * });
     * ```
     */
    SQLite.prototype.openDatabase = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            sqlitePlugin.openDatabase(config, function (db) {
                _this._objectInstance = db;
                resolve(db);
            }, function (error) {
                console.warn(error);
                reject(error);
            });
        });
    };
    SQLite.prototype.addTransaction = function (transaction) { };
    SQLite.prototype.transaction = function (fn) { return; };
    SQLite.prototype.readTransaction = function (fn) { return; };
    SQLite.prototype.startNextTransaction = function () { };
    SQLite.prototype.close = function () { return; };
    SQLite.prototype.start = function () { };
    /**
     * Execute SQL on the opened database. Note, you must call `openDatabase` first, and
     * ensure it resolved and successfully opened the database.
     *
     * @usage
     *
     * ```typescript
     * db.executeSql('SELECT FROM puppies WHERE type = ?', ['cavalier']).then((resultSet) => {
     *   // Access the items through resultSet.rows
     *   // resultSet.rows.item(i)
     * }, (err) => {})
     * ```
     */
    SQLite.prototype.executeSql = function (statement, params) { return; };
    SQLite.prototype.addStatement = function (sql, values) { return; };
    SQLite.prototype.sqlBatch = function (sqlStatements) { return; };
    SQLite.prototype.abortallPendingTransactions = function () { };
    SQLite.prototype.handleStatementSuccess = function (handler, response) { };
    SQLite.prototype.handleStatementFailure = function (handler, response) { };
    SQLite.prototype.run = function () { };
    SQLite.prototype.abort = function (txFailure) { };
    SQLite.prototype.finish = function () { };
    SQLite.prototype.abortFromQ = function (sqlerror) { };
    SQLite.echoTest = function () { return; };
    SQLite.deleteDatabase = function (first) { return; };
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "addTransaction", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "transaction", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "readTransaction", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "startNextTransaction", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "close", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "start", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "executeSql", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "addStatement", null);
    __decorate$87([
        CordovaInstance()
    ], SQLite.prototype, "sqlBatch", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abortallPendingTransactions", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "handleStatementSuccess", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "handleStatementFailure", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "run", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abort", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "finish", null);
    __decorate$87([
        CordovaInstance({
            sync: true
        })
    ], SQLite.prototype, "abortFromQ", null);
    __decorate$87([
        Cordova()
    ], SQLite, "echoTest", null);
    __decorate$87([
        Cordova()
    ], SQLite, "deleteDatabase", null);
    SQLite = __decorate$87([
        Plugin({
            pluginRef: 'sqlitePlugin',
            plugin: 'cordova-sqlite-storage',
            repo: 'https://github.com/litehelpers/Cordova-sqlite-storage'
        })
    ], SQLite);
    return SQLite;
}());

var __decorate$88 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Status Bar
 * @description
 * Manage the appearance of the native status bar.
 *
 * Requires Cordova plugin: `cordova-plugin-statusbar`. For more info, please see the [StatusBar plugin docs](https://github.com/apache/cordova-plugin-statusbar).
 *
 * @usage
 * ```typescript
 * import { StatusBar } from 'ionic-native';
 *
 *
 * StatusBar.overlaysWebView(true); // let status bar overlay webview
 *
 * StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
 * ```
 *
 */
var StatusBar = (function () {
    function StatusBar() {
    }
    /**
     * Set whether the status bar overlays the main app view. The default
     * is true.
     *
     * @param {boolean} doesOverlay  Whether the status bar overlays the main app view.
     */
    StatusBar.overlaysWebView = function (doesOverlay) { };
    
    /**
     * Use the default statusbar (dark text, for light backgrounds).
     */
    StatusBar.styleDefault = function () { };
    
    /**
     * Use the lightContent statusbar (light text, for dark backgrounds).
     */
    StatusBar.styleLightContent = function () { };
    
    /**
     * Use the blackTranslucent statusbar (light text, for dark backgrounds).
     */
    StatusBar.styleBlackTranslucent = function () { };
    
    /**
     * Use the blackOpaque statusbar (light text, for dark backgrounds).
     */
    StatusBar.styleBlackOpaque = function () { };
    
    /**
     * Set the status bar to a specific named color. Valid options:
     * black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown.
     *
     * iOS note: you must call StatusBar.overlaysWebView(false) to enable color changing.
     *
     * @param {string} colorName  The name of the color (from above)
     */
    StatusBar.backgroundColorByName = function (colorName) { };
    
    /**
     * Set the status bar to a specific hex color (CSS shorthand supported!).
     *
     * iOS note: you must call StatusBar.overlaysWebView(false) to enable color changing.
     *
     * @param {string} hexString  The hex value of the color.
     */
    StatusBar.backgroundColorByHexString = function (hexString) { };
    
    /**
     * Hide the StatusBar
     */
    StatusBar.hide = function () { };
    
    /**
    * Show the StatusBar
    */
    StatusBar.show = function () { };
    
    Object.defineProperty(StatusBar, "isVisible", {
        /**
         * Whether the StatusBar is currently visible or not.
         */
        get: function () { return window.StatusBar.isVisible; },
        enumerable: true,
        configurable: true
    });
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "overlaysWebView", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "styleDefault", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "styleLightContent", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "styleBlackTranslucent", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "styleBlackOpaque", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "backgroundColorByName", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "backgroundColorByHexString", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "hide", null);
    __decorate$88([
        Cordova({
            sync: true
        })
    ], StatusBar, "show", null);
    __decorate$88([
        CordovaProperty
    ], StatusBar, "isVisible", null);
    StatusBar = __decorate$88([
        Plugin({
            plugin: 'cordova-plugin-statusbar',
            pluginRef: 'StatusBar',
            repo: 'https://github.com/apache/cordova-plugin-statusbar',
            platforms: ['iOS', 'Android', 'Windows Phone 8', 'Windows 8', 'Windows 10']
        })
    ], StatusBar);
    return StatusBar;
}());

var __decorate$89 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name StreamingMedia
 * @description
 * This plugin allows you to stream audio and video in a fullscreen, native player on iOS and Android.
 *
 * @usage
 * ```
 * import {StreamingMedia, StreamingVideoOptions} from 'ionic-native';
 *
 * let options: StreamingVideoOptions = {
 *   successCallback: () => { console.log('Video played') },
 *   errorCallback: (e) => { console.log('Error streaming') },
 *   orientation: 'landscape'
 * };
 *
 * StreamingMedia.('https://path/to/video/stream', options);
 *
 * ```
 */
var StreamingMedia = (function () {
    function StreamingMedia() {
    }
    /**
     * Streams a video
     * @param videoUrl {string} The URL of the video
     * @param options {StreamingVideoOptions} Options
     */
    StreamingMedia.playVideo = function (videoUrl, options) { };
    /**
     * Streams an audio
     * @param audioUrl {string} The URL of the audio stream
     * @param options {StreamingAudioOptions} Options
     */
    StreamingMedia.playAudio = function (audioUrl, options) { };
    /**
     * Stops streaming audio
     */
    StreamingMedia.stopAudio = function () { };
    /**
     * Pauses streaming audio
     */
    StreamingMedia.pauseAudio = function () { };
    /**
     * Resumes streaming audio
     */
    StreamingMedia.resumeAudio = function () { };
    __decorate$89([
        Cordova({ sync: true })
    ], StreamingMedia, "playVideo", null);
    __decorate$89([
        Cordova({ sync: true })
    ], StreamingMedia, "playAudio", null);
    __decorate$89([
        Cordova({ sync: true })
    ], StreamingMedia, "stopAudio", null);
    __decorate$89([
        Cordova({ sync: true, platforms: ['iOS'] })
    ], StreamingMedia, "pauseAudio", null);
    __decorate$89([
        Cordova({ sync: true, platforms: ['iOS'] })
    ], StreamingMedia, "resumeAudio", null);
    StreamingMedia = __decorate$89([
        Plugin({
            plugin: 'cordova-plugin-streaming-media',
            pluginRef: 'plugins.streamingMedia',
            repo: 'https://github.com/nchutchind/cordova-plugin-streaming-media',
            platforms: ['Android', 'iOS']
        })
    ], StreamingMedia);
    return StreamingMedia;
}());

var __decorate$90 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name 3DTouch
 * @description
 * @usage
 * Please do refer to the original plugin's repo for detailed usage. The usage example here might not be sufficient.
 * ```
 * import { ThreeDeeTouch } from 'ionic-native';
 *
 * // import for type completion on variables
 * import { ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from 'ionic-native';
 * ...
 *
 * ThreeDeeTouch.isAvailable().then(isAvailable => console.log("3D Touch available? " + isAvailable));
 *
 * ThreeDeeTouch.watchForceTouches()
 *   .subscribe(
 *     (data: ThreeDeeTouchForceTouch) => {
 *       console.log("Force touch %" + data.force);
 *       console.log("Force touch timestamp: " + data.timestamp);
 *       console.log("Force touch x: " + data.x);
 *       console.log("Force touch y: " + data.y);
 *     }
 *   );
 *
 *
 * let actions: Array<ThreeDeeTouchQuickAction> = [
 *   {
 *     type: 'checkin',
 *     title: 'Check in',
 *     subtitle: 'Quickly check in',
 *     iconType: 'Compose'
 *   },
 *   {
 *     type: 'share',
 *     title: 'Share',
 *     subtitle: 'Share like you care',
 *     iconType: 'Share'
 *   },
 *   {
 *     type: 'search',
 *     title: 'Search',
 *     iconType: 'Search'
 *   },
 *   {
 *     title: 'Show favorites',
 *     iconTemplate: 'HeartTemplate'
 *   }
 * ];
 * ThreeDeeTouch.configureQuickActions(actions);
 *
 * ThreeDeeTouchForceTouch.onHomeIconPressed().subscribe(
 *  (payload) => {
 *    // returns an object that is the button you presed
 *    console.log('Pressed the ${payload.title} button')
 *    console.log(payload.type)
 *
 *  }
 * )
 * ```
 */
var ThreeDeeTouch = (function () {
    function ThreeDeeTouch() {
    }
    /**
     * You need an iPhone 6S or some future tech to use the features of this plugin, so you can check at runtime if the user's device is supported.
     * @returns {Promise<boolean>} returns a promise that resolves with a boolean that indicates whether the plugin is available or not
     */
    ThreeDeeTouch.isAvailable = function () { return; };
    /**
     * You can get a notification when the user force touches the webview. The plugin defines a Force Touch when at least 75% of the maximum force is applied to the screen. Your app will receive the x and y coordinates, so you have to figure out which UI element was touched.
     * @returns {Observable<ThreeDeeTouchForceTouch>} Returns an observable that sends a `ThreeDeeTouchForceTouch` object
     */
    ThreeDeeTouch.watchForceTouches = function () { return; };
    /**
     * setup the 3D-touch actions, takes an array of objects with the following
     * @param {string} type (optional) A type that can be used `onHomeIconPressed` callback
     * @param {string} title Title for your action
     * @param {string} subtitle (optional) A short description for your action
     * @param {string} iconType (optional) Choose between Prohibit, Contact, Home, MarkLocation, Favorite, Love, Cloud, Invitation, Confirmation, Mail, Message, Date, Time, CapturePhoto, CaptureVideo, Task, TaskCompleted, Alarm, Bookmark, Shuffle, Audio, Update
     */
    ThreeDeeTouch.configureQuickActions = function (quickActions) { };
    /**
     * When a home icon is pressed, your app launches and this JS callback is invoked.
     * @returns {Observable<any>} returns an observable that notifies you when he user presses on the home screen icon
     */
    ThreeDeeTouch.onHomeIconPressed = function () {
        return new Observable_2(function (observer) {
            if (window.ThreeDeeTouch && window.ThreeDeeTouch.onHomeIconPressed) {
                window.ThreeDeeTouch.onHomeIconPressed = observer.next.bind(observer);
            }
            else {
                observer.error('3dTouch plugin is not available.');
                observer.complete();
            }
        });
    };
    /**
     * Enable Link Preview.
     * UIWebView and WKWebView (the webviews powering Cordova apps) don't allow the fancy new link preview feature of iOS9.
     */
    ThreeDeeTouch.enableLinkPreview = function () { };
    /**
     * Disabled the link preview feature, if enabled.
     */
    ThreeDeeTouch.disableLinkPreview = function () { };
    __decorate$90([
        Cordova()
    ], ThreeDeeTouch, "isAvailable", null);
    __decorate$90([
        Cordova({
            observable: true
        })
    ], ThreeDeeTouch, "watchForceTouches", null);
    __decorate$90([
        Cordova({
            sync: true
        })
    ], ThreeDeeTouch, "configureQuickActions", null);
    __decorate$90([
        Cordova({
            sync: true
        })
    ], ThreeDeeTouch, "enableLinkPreview", null);
    __decorate$90([
        Cordova({
            sync: true
        })
    ], ThreeDeeTouch, "disableLinkPreview", null);
    ThreeDeeTouch = __decorate$90([
        Plugin({
            plugin: 'cordova-plugin-3dtouch',
            pluginRef: 'ThreeDeeTouch',
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-3dtouch',
            platforms: ['iOS']
        })
    ], ThreeDeeTouch);
    return ThreeDeeTouch;
}());

var __decorate$91 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Toast
 * @description
 * This plugin allows you to show a native Toast (a little text popup) on iOS, Android and WP8. It's great for showing a non intrusive native notification which is guaranteed always in the viewport of the browser.
 *
 * Requires Cordova plugin: `cordova-plugin-x-toast`. For more info, please see the [Toast plugin docs](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin).
 *
 * @usage
 * ```typescript
 * import { Toast } from 'ionic-native';
 *
 *
 * Toast.show("I'm a toast", '5000', 'center').subscribe(
 *   toast => {
 *     console.log(toast);
 *   }
 * );
 * ```
 */
var Toast = (function () {
    function Toast() {
    }
    /**
     * Show a native toast for the given duration at the specified position.
     *
     * @param {string} message  The message to display.
     * @param {string} duration  Duration to show the toast, either 'short', 'long' or any number of milliseconds: '1500'.
     * @param {string} position  Where to position the toast, either 'top', 'center', or 'bottom'.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.show = function (message, duration, position) { return; };
    /**
     * Manually hide any currently visible toast.
     * @return {Promise} Returns a Promise that resolves on success.
     */
    Toast.hide = function () { return; };
    /**
     * Show a native toast with the given options.
     *
     * @param {Object} options  Options for showing a toast. Available options:
     *   message  The message to display.
     *   duration  Duration to show the toast, either 'short', 'long' or any number of milliseconds: '1500'.
     *   position  Where to position the toast, either 'top', 'center', or 'bottom'.
     *   addPixelsY  Offset in pixels to move the toast up or down from its specified position.
     *
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showWithOptions = function (options) { return; };
    /**
     * Shorthand for `show(message, 'short', 'top')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showShortTop = function (message) { return; };
    /**
     * Shorthand for `show(message, 'short', 'center')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showShortCenter = function (message) { return; };
    /**
     * Shorthand for `show(message, 'short', 'bottom')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showShortBottom = function (message) { return; };
    /**
     * Shorthand for `show(message, 'long', 'top')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showLongTop = function (message) { return; };
    /**
     * Shorthand for `show(message, 'long', 'center')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showLongCenter = function (message) { return; };
    /**
     * Shorthand for `show(message, 'long', 'bottom')`.
     * @return {Observable}  Returns an Observable that notifies first on success and then when tapped, rejects on error.
     */
    Toast.showLongBottom = function (message) { return; };
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "show", null);
    __decorate$91([
        Cordova()
    ], Toast, "hide", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showWithOptions", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showShortTop", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showShortCenter", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showShortBottom", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showLongTop", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showLongCenter", null);
    __decorate$91([
        Cordova({
            observable: true,
            clearFunction: 'hide'
        })
    ], Toast, "showLongBottom", null);
    Toast = __decorate$91([
        Plugin({
            plugin: 'cordova-plugin-x-toast',
            pluginRef: 'plugins.toast',
            repo: 'https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], Toast);
    return Toast;
}());

var __decorate$92 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name TouchID
 * @description
 * Scan the fingerprint of a user with the TouchID sensor.
 *
 * Requires Cordova plugin: `cordova-plugin-touch-id`. For more info, please see the [TouchID plugin docs](https://github.com/EddyVerbruggen/cordova-plugin-touch-id).
 *
 * @usage
 * ### Import Touch ID Plugin into Project
 * ```typescript
 * import { TouchID } from 'ionic-native';
 * ```
 * ### Check for Touch ID Availability
 * ```typescript
 * TouchID.isAvailable()
 *   .then(
 *     res => console.log('TouchID is available!'),
 *     err => console.error('TouchID is not available', err)
 *   );
 * ```
 * ### Invoke Touch ID w/ Custom Message
 *
 * ```typescript
 * TouchID.verifyFingerprint('Scan your fingerprint please')
 *   .then(
 *     res => console.log('Ok', res),
 *     err => console.error('Error', err)
 *   );
 * ```
 *
 * ### Error Codes
 *
 * The plugin will reject for various reasons. Your app will most likely need to respond to the cases differently.
 *
 * Here is a list of some of the error codes:
 *
 *  -  `-1` - Fingerprint scan failed more than 3 times
 *  -  `-2` or `-128` - User tapped the 'Cancel' button
 *  -  `-3` - User tapped the 'Enter Passcode' or 'Enter Password' button
 *  -  `-4` - The scan was cancelled by the system (Home button for example)
 *  -  `-6` - TouchID is not Available
 *  -  `-8` - TouchID is locked out from too many tries
 */
var TouchID = (function () {
    function TouchID() {
    }
    /**
     * Checks Whether TouchID is available or not.
     *
     * @return {Promise} Returns a Promise that resolves if yes, rejects if no.
     */
    TouchID.isAvailable = function () { return; };
    /**
     * Show TouchID dialog and wait for a fingerprint scan. If user taps 'Enter Password' button, brings up standard system passcode screen.
     *
     * @param {string} message  The message to display
     * @return {Promise} Returns a Promise the resolves if the fingerprint scan was successful, rejects with an error code (see above).
     */
    TouchID.verifyFingerprint = function (message) { return; };
    /**
     * Show TouchID dialog and wait for a fingerprint scan. If user taps 'Enter Password' button, rejects with code '-3' (see above).
     *
     * @param {string} message  The message to display
     * @return {Promise} Returns a Promise the resolves if the fingerprint scan was successful, rejects with an error code (see above).
     */
    TouchID.verifyFingerprintWithCustomPasswordFallback = function (message) { return; };
    /**
     * Show TouchID dialog with custom 'Enter Password' message and wait for a fingerprint scan. If user taps 'Enter Password' button, rejects with code '-3' (see above).
     *
     * @param {string} message  The message to display
     * @param {string} enterPasswordLabel  Custom text for the 'Enter Password' button
     * @return {Promise} Returns a Promise the resolves if the fingerprint scan was successful, rejects with an error code (see above).
     */
    TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel = function (message, enterPasswordLabel) { return; };
    __decorate$92([
        Cordova()
    ], TouchID, "isAvailable", null);
    __decorate$92([
        Cordova()
    ], TouchID, "verifyFingerprint", null);
    __decorate$92([
        Cordova()
    ], TouchID, "verifyFingerprintWithCustomPasswordFallback", null);
    __decorate$92([
        Cordova()
    ], TouchID, "verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel", null);
    TouchID = __decorate$92([
        Plugin({
            plugin: 'cordova-plugin-touch-id',
            pluginRef: 'plugins.touchid',
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-touch-id',
            platforms: ['iOS']
        })
    ], TouchID);
    return TouchID;
}());

var __decorate$93 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name TextToSpeech
 * @description
 * Text to Speech plugin
 *
 * @usage
 * ```
 * import {TextToSpeech} from 'ionic-native';
 *
 * TextToSpeech.speak('Hello World')
 *   .then(() => console.log('Success'))
 *   .catch((reason: any) => console.log(reason));
 *
 * ```
 */
var TextToSpeech = (function () {
    function TextToSpeech() {
    }
    /**
     * This function speaks
     * @param options {string | TTSOptions} Text to speak or TTSOptions
     * @return {Promise<any>} Returns a promise that resolves when the speaking finishes
     */
    TextToSpeech.speak = function (options) {
        return;
    };
    __decorate$93([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], TextToSpeech, "speak", null);
    TextToSpeech = __decorate$93([
        Plugin({
            plugin: 'cordova-plugin-tts',
            pluginRef: 'TTS',
            repo: 'https://github.com/vilic/cordova-plugin-tts'
        })
    ], TextToSpeech);
    return TextToSpeech;
}());

var __decorate$94 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Twitter Connect
 * @description
 * Plugin to use Twitter Single Sign On
 * Uses Twitter's Fabric SDK
 * ```typescript
 * import {TwitterConnect} from 'ionic-native';
 *
 * function onSuccess(response) {
 *   console.log(response);
 *
 *   // Will console log something like:
 *   // {
 *   //   userName: 'myuser',
 *   //   userId: '12358102',
 *   //   secret: 'tokenSecret'
 *   //   token: 'accessTokenHere'
 *   // }
 * }
 *
 * TwitterConnect.login().then(onSuccess, onError);
 *
 * TwitterConnect.logout().then(onLogoutSuccess, onLogoutError);
 * ```
 */
var TwitterConnect = (function () {
    function TwitterConnect() {
    }
    /**
     * Logs in
     * @return {Promise<TwitterConnectResponse>} returns a promise that resolves if logged in and rejects if failed to login
     */
    TwitterConnect.login = function () { return; };
    /**
     * Logs out
     * @return {Promise<any>} returns a promise that resolves if logged out and rejects if failed to logout
     */
    TwitterConnect.logout = function () { return; };
    /**
     * Returns user's profile information
     * @return {Promise<any>} returns a promise that resolves if user profile is successfully retrieved and rejects if request fails
     */
    TwitterConnect.showUser = function () { return; };
    __decorate$94([
        Cordova()
    ], TwitterConnect, "login", null);
    __decorate$94([
        Cordova()
    ], TwitterConnect, "logout", null);
    __decorate$94([
        Cordova()
    ], TwitterConnect, "showUser", null);
    TwitterConnect = __decorate$94([
        Plugin({
            plugin: 'twitter-connect-plugin',
            pluginRef: 'TwitterConnect',
            repo: 'https://github.com/ManifestWebDesign/twitter-connect-plugin',
            install: 'ionic plugin add twitter-connect-plugin --variable FABRIC_KEY=fabric_API_key'
        })
    ], TwitterConnect);
    return TwitterConnect;
}());

var __decorate$95 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Vibration
 * @description Vibrates the device
 * @usage
 * ```typescript
 * import { Vibration } from 'ionic-native';
 *
 *
 * // Vibrate the device for a second
 * // Duration is ignored on iOS.
 * Vibration.vibrate(1000);
 *
 * // Vibrate 2 seconds
 * // Pause for 1 second
 * // Vibrate for 2 seconds
 * // Patterns work on Android and Windows only
 * Vibration.vibrate([2000,1000,2000]);
 *
 * // Stop any current vibrations immediately
 * // Works on Android and Windows only
 * Vibration.vibrate(0);
 * ```
 */
var Vibration = (function () {
    function Vibration() {
    }
    /**
     * Vibrates the device for given amount of time.
     * @param time {number|Array<number>} Milliseconds to vibrate the device. If passed an array of numbers, it will define a vibration pattern. Pass 0 to stop any vibration immediately.
     */
    Vibration.vibrate = function (time) { };
    __decorate$95([
        Cordova({
            sync: true
        })
    ], Vibration, "vibrate", null);
    Vibration = __decorate$95([
        Plugin({
            plugin: 'cordova-plugin-vibration',
            pluginRef: 'navigator',
            repo: 'https://github.com/apache/cordova-plugin-vibration',
            platforms: ['Android', 'iOS', 'Windows 8.1 Phone', 'Windows 8.1', 'Windows 10']
        })
    ], Vibration);
    return Vibration;
}());

var __decorate$96 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name VideoEditor
 * @description Edit videos using native device APIs
 *
 * @usage
 * ```
 * import {VideoEditor} from 'ionic-native';
 *
 * VideoEditor.transcodeVideo({
 *   fileUri: '/path/to/input.mov',
 *   outputFileName: 'output.mp4',
 *   outputFileType: VideoEditor.OutputFileType.MPEG4
 * })
 * .then((fileUri: string) => console.log('video transcode success', fileUri))
 * .catch((error: any) => console.log('video transcode error', error));
 *
 * ```
 */
var VideoEditor = (function () {
    function VideoEditor() {
    }
    /**
     * Transcode a video
     * @param options {TranscodeOptions} Options
     * @return {Promise<string>} Returns a promise that resolves to the path of the transcoded video
     */
    VideoEditor.transcodeVideo = function (options) { return; };
    /**
     * Trim a video
     * @param options {TrimOptions} Options
     * @return {Promise<string>} Returns a promise that resolves to the path of the trimmed video
     */
    VideoEditor.trim = function (options) { return; };
    /**
     * Create a JPEG thumbnail from a video
     * @param options {CreateThumbnailOptions} Options
     * @return {Promise<string>} Returns a promise that resolves to the path to the jpeg image on the device
     */
    VideoEditor.createThumbnail = function (options) { return; };
    /**
     * Get info on a video (width, height, orientation, duration, size, & bitrate)
     * @param options {GetVideoInfoOptions} Options
     * @return {Promise<VideoInfo>} Returns a promise that resolves to an object containing info on the video
     */
    VideoEditor.getVideoInfo = function (options) { return; };
    VideoEditor.OptimizeForNetworkUse = {
        NO: 0,
        YES: 1
    };
    VideoEditor.OutputFileType = {
        M4V: 0,
        MPEG4: 1,
        M4A: 2,
        QUICK_TIME: 3
    };
    __decorate$96([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], VideoEditor, "transcodeVideo", null);
    __decorate$96([
        Cordova({
            callbackOrder: 'reverse',
            platforms: ['iOS']
        })
    ], VideoEditor, "trim", null);
    __decorate$96([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], VideoEditor, "createThumbnail", null);
    __decorate$96([
        Cordova({
            callbackOrder: 'reverse'
        })
    ], VideoEditor, "getVideoInfo", null);
    VideoEditor = __decorate$96([
        Plugin({
            plugin: 'cordova-plugin-video-editor',
            pluginRef: 'VideoEditor',
            repo: 'https://github.com/jbavari/cordova-plugin-video-editor',
            platforms: ['Android', 'iOS', 'Windows Phone 8']
        })
    ], VideoEditor);
    return VideoEditor;
}());

var __decorate$97 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name VideoPlayer
 * @description
 * A Codova plugin that simply allows you to immediately play a video in fullscreen mode.
 *
 * Requires Cordova plugin: `com.moust.cordova.videoplayer`. For more info, please see the [VideoPlayer plugin docs](https://github.com/moust/cordova-plugin-videoplayer).
 *
 * @usage
 * ```typescript
 * import { VideoPlayer } from 'ionic-native';
 *
 *
 * // Playing a video.
 * VideoPlayer.play("file:///android_asset/www/movie.mp4").then(() => {
 *  console.log('video completed');
 * }).catch(err => {
 *  console.log(err);
 * });
 *
 * ```
 */
var VideoPlayer = (function () {
    function VideoPlayer() {
    }
    /**
     * Plays the video from the passed url.
     * @param fileUrl {string} File url to the video.
     * @param options {VideoOptions?} Optional video playback settings. See options above.
     * @returns {Promise<any>} Resolves promise when the video was played successfully.
     */
    VideoPlayer.play = function (fileUrl, options) { return; };
    /**
     * Stops the video playback immediatly.
     */
    VideoPlayer.close = function () { };
    __decorate$97([
        Cordova()
    ], VideoPlayer, "play", null);
    __decorate$97([
        Cordova({ sync: true })
    ], VideoPlayer, "close", null);
    VideoPlayer = __decorate$97([
        Plugin({
            plugin: 'cordova-plugin-videoplayer',
            pluginRef: 'VideoPlayer',
            repo: 'https://github.com/moust/cordova-plugin-videoplayer',
            platforms: ['Android']
        })
    ], VideoPlayer);
    return VideoPlayer;
}());

var __decorate$98 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name WebIntent
 * @description
 * @usage
 * For usage information please refer to the plugin's Github repo.
 *
 * ```typescript
 * import {WebIntent} from 'ionic-native';
 *
 * WebIntent.startActivity(options).then(onSuccess, onError);
 *
 * ```
 */
var WebIntent = (function () {
    function WebIntent() {
    }
    Object.defineProperty(WebIntent, "ACTION_VIEW", {
        get: function () {
            return window.plugins.webintent.ACTION_VIEW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebIntent, "EXTRA_TEXT", {
        get: function () {
            return window.plugins.webintent.EXTRA_TEXT;
        },
        enumerable: true,
        configurable: true
    });
    WebIntent.startActivity = function (options) { return; };
    WebIntent.hasExtra = function (extra) { return; };
    WebIntent.getExtra = function (extra) { return; };
    WebIntent.getUri = function () { return; };
    
    WebIntent.onNewIntent = function () { return; };
    
    WebIntent.sendBroadcast = function (options) { return; };
    __decorate$98([
        CordovaProperty
    ], WebIntent, "ACTION_VIEW", null);
    __decorate$98([
        CordovaProperty
    ], WebIntent, "EXTRA_TEXT", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "startActivity", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "hasExtra", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "getExtra", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "getUri", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "onNewIntent", null);
    __decorate$98([
        Cordova()
    ], WebIntent, "sendBroadcast", null);
    WebIntent = __decorate$98([
        Plugin({
            plugin: 'https://github.com/Initsogar/cordova-webintent.git',
            pluginRef: 'window.plugins.webintent',
            repo: 'https://github.com/Initsogar/cordova-webintent.git',
            platforms: ['Android']
        })
    ], WebIntent);
    return WebIntent;
}());

var __decorate$99 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name YoutubeVideoPlayer
 * @description
 * Plays YouTube videos in Native YouTube App
 *
 * @usage
 * ```
 * import {YoutubeVideoPlayer} from 'ionic-native';
 *
 * YouTubeVideoPlayer.openVideo('myvideoid');
 *
 * ```
 */
var YoutubeVideoPlayer = (function () {
    function YoutubeVideoPlayer() {
    }
    /**
     * Plays a YouTube video
     * @param videoId {string} Video ID
     */
    YoutubeVideoPlayer.openVideo = function (videoId) { };
    __decorate$99([
        Cordova({ sync: true })
    ], YoutubeVideoPlayer, "openVideo", null);
    YoutubeVideoPlayer = __decorate$99([
        Plugin({
            plugin: 'https://github.com/Glitchbone/CordovaYoutubeVideoPlayer.git',
            pluginRef: 'YoutubeVideoPlayer',
            repo: 'https://github.com/Glitchbone/CordovaYoutubeVideoPlayer',
            platforms: ['Android', 'iOS']
        })
    ], YoutubeVideoPlayer);
    return YoutubeVideoPlayer;
}());

var __decorate$100 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @name Zip
 * @description
 * A Cordova plugin to unzip files in Android and iOS.
 *
 * @usage
 * ```
 * import {Zip} from 'ionic-native';
 *
 * Zip.unzip('path/to/source.zip', 'path/to/dest', (progress) => console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
 *  .then((result) => {
 *    if(result === 0) console.log('SUCCESS');
 *    if(result === -1) console.log('FAILED');
 *  });
 *
 * ```
 */
var Zip = (function () {
    function Zip() {
    }
    /**
     * Extracts files from a ZIP archive
     * @param sourceZip {string} Source ZIP file
     * @param destUrl {string} Destination folder
     * @param onProgress {Function} optional callback to be called on progress update
     * @return  {Promise<number>} returns a promise that resolves with a number. 0 is success, -1 is error
     */
    Zip.unzip = function (sourceZip, destUrl, onProgress) { return; };
    __decorate$100([
        Cordova({
            successIndex: 2,
            errorIndex: 4
        })
    ], Zip, "unzip", null);
    Zip = __decorate$100([
        Plugin({
            plugin: 'cordova-plugin-zip',
            pluginRef: 'zip',
            repo: 'https://github.com/MobileChromeApps/cordova-plugin-zip',
        })
    ], Zip);
    return Zip;
}());

var DEVICE_READY_TIMEOUT = 2000;
// Window export to use outside of a module loading system
window['IonicNative'] = {
    ActionSheet: ActionSheet,
    AdMob: AdMob,
    AndroidFingerprintAuth: AndroidFingerprintAuth,
    AppAvailability: AppAvailability,
    AppRate: AppRate,
    AppVersion: AppVersion,
    Badge: Badge,
    BackgroundGeolocation: BackgroundGeolocation,
    BackgroundMode: BackgroundMode,
    BarcodeScanner: BarcodeScanner,
    Base64ToGallery: Base64ToGallery,
    BatteryStatus: BatteryStatus,
    Brightness: Brightness,
    BLE: BLE,
    BluetoothSerial: BluetoothSerial,
    Calendar: Calendar,
    CallNumber: CallNumber,
    Camera: Camera,
    CameraPreview: CameraPreview,
    CardIO: CardIO,
    Clipboard: Clipboard,
    CodePush: CodePush,
    Contacts: Contacts,
    Crop: Crop,
    DatePicker: DatePicker,
    DBMeter: DBMeter,
    Deeplinks: Deeplinks,
    Device: Device,
    DeviceAccounts: DeviceAccounts,
    DeviceMotion: DeviceMotion,
    DeviceOrientation: DeviceOrientation,
    Dialogs: Dialogs,
    Diagnostic: Diagnostic,
    EmailComposer: EmailComposer,
    EstimoteBeacons: EstimoteBeacons,
    Facebook: Facebook,
    File: File,
    FileChooser: FileChooser,
    FileOpener: FileOpener,
    Flashlight: Flashlight,
    Geofence: Geofence,
    Geolocation: Geolocation,
    Globalization: Globalization,
    GooglePlus: GooglePlus,
    GoogleMap: GoogleMap,
    GoogleAnalytics: GoogleAnalytics,
    Hotspot: Hotspot,
    Httpd: Httpd,
    IBeacon: IBeacon,
    ImagePicker: ImagePicker,
    ImageResizer: ImageResizer,
    InAppBrowser: InAppBrowser,
    InAppPurchase: InAppPurchase,
    Instagram: Instagram,
    IsDebug: IsDebug,
    Keyboard: Keyboard,
    LaunchNavigator: LaunchNavigator,
    LocalNotifications: LocalNotifications,
    Market: Market,
    MediaCapture: MediaCapture,
    MediaPlugin: MediaPlugin,
    Mixpanel: Mixpanel,
    MusicControls: MusicControls,
    NativeAudio: NativeAudio,
    NativePageTransitions: NativePageTransitions,
    NativeStorage: NativeStorage,
    Network: Network,
    PayPal: PayPal,
    NFC: NFC,
    Printer: Printer,
    Push: Push,
    OneSignal: OneSignal,
    PhotoViewer: PhotoViewer,
    ScreenOrientation: ScreenOrientation,
    PinDialog: PinDialog,
    PowerManagement: PowerManagement,
    SafariViewController: SafariViewController,
    Screenshot: Screenshot,
    SecureStorage: SecureStorage,
    Shake: Shake,
    Sim: Sim,
    SMS: SMS,
    SocialSharing: SocialSharing,
    SpinnerDialog: SpinnerDialog,
    Splashscreen: Splashscreen,
    SQLite: SQLite,
    StatusBar: StatusBar,
    StreamingMedia: StreamingMedia,
    ThreeDeeTouch: ThreeDeeTouch,
    Toast: Toast,
    TouchID: TouchID,
    Transfer: Transfer,
    TextToSpeech: TextToSpeech,
    TwitterConnect: TwitterConnect,
    VideoEditor: VideoEditor,
    VideoPlayer: VideoPlayer,
    Vibration: Vibration,
    WebIntent: WebIntent,
    YoutubeVideoPlayer: YoutubeVideoPlayer,
    Zip: Zip
};
initAngular1(window['IonicNative']);
// To help developers using cordova, we listen for the device ready event and
// log an error if it didn't fire in a reasonable amount of time. Generally,
// when this happens, developers should remove and reinstall plugins, since
// an inconsistent plugin is often the culprit.
var before = Date.now();
var didFireReady = false;
document.addEventListener('deviceready', function () {
    console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');
    didFireReady = true;
});
setTimeout(function () {
    if (!didFireReady && window.cordova) {
        console.warn("Native: deviceready did not fire within " + DEVICE_READY_TIMEOUT + "ms. This can happen when plugins are in an inconsistent state. Try removing plugins from plugins/ and reinstalling them.");
    }
}, DEVICE_READY_TIMEOUT);

function isAPIResponseError(x) {
    return x.meta.status >= 400;
}

var __extends$3 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @hidden
 */
var Exception = (function (_super) {
    __extends$3(Exception, _super);
    function Exception(message) {
        _super.call(this, message);
        this.message = message;
        this.name = 'Exception';
        this.stack = (new Error()).stack;
    }
    Exception.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return Exception;
}(Error));
/**
 * An error with generic error details.
 *
 * Error details can be extracted depending on the type of `D`. For instance,
 * if the type of `D` is `string[]`, you can do this:
 *
 * ```typescript
 * function handleError(err: IDetailedError<string[]>) {
 *   for (let i in err.details) {
 *     console.error('got error code: ' + i);
 *   }
 * }
 * ```
 *
 * @featured
 */
var DetailedError = (function (_super) {
    __extends$3(DetailedError, _super);
    function DetailedError(
        /**
         * The error message.
         */
        message, 
        /**
         * The error details.
         */
        details) {
        _super.call(this, message);
        this.message = message;
        this.details = details;
        this.name = 'DetailedError';
    }
    return DetailedError;
}(Exception));

/**
 * @hidden
 */
var DeferredPromise = (function () {
    function DeferredPromise() {
        this.init();
    }
    DeferredPromise.prototype.init = function () {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = function (v) {
                resolve(v);
                return _this.promise;
            };
            _this.reject = function (e) {
                reject(e);
                return _this.promise;
            };
        });
    };
    DeferredPromise.rejectImmediately = function (err) {
        return new Promise(function (resolve, reject) {
            reject(err);
        });
    };
    return DeferredPromise;
}());

var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var SEMVER_REGEX = /^v?([0-9]+)\.?([0-9]+)?\.?([0-9]+)?\.?.*$/;
function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
}
function parseSemanticVersion(s) {
    var r = s.trim().match(SEMVER_REGEX);
    if (!r) {
        throw new Error('Invalid semantic version.');
    }
    var v = {
        'major': Number(r[1])
    };
    if (r[2]) {
        v.minor = Number(r[2]);
    }
    if (r[3]) {
        v.patch = Number(r[3]);
    }
    return v;
}

var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @hidden
 */

/**
 * @hidden
 */
var CombinedAuthTokenContext = (function () {
    function CombinedAuthTokenContext(deps, label) {
        this.label = label;
        this.storage = deps.storage;
        this.tempStorage = deps.tempStorage;
    }
    CombinedAuthTokenContext.prototype.get = function () {
        var permToken = this.storage.get(this.label);
        var tempToken = this.tempStorage.get(this.label);
        var token = tempToken || permToken;
        return token;
    };
    CombinedAuthTokenContext.prototype.store = function (token, options) {
        if (options === void 0) { options = { 'permanent': true }; }
        if (options.permanent) {
            this.storage.set(this.label, token);
        }
        else {
            this.tempStorage.set(this.label, token);
        }
    };
    CombinedAuthTokenContext.prototype.delete = function () {
        this.storage.delete(this.label);
        this.tempStorage.delete(this.label);
    };
    return CombinedAuthTokenContext;
}());
/**
 * `Auth` handles authentication of a single user, such as signing up, logging
 * in & out, social provider authentication, etc.
 *
 * @featured
 */
var Auth = (function () {
    function Auth(deps) {
        this.config = deps.config;
        this.emitter = deps.emitter;
        this.authModules = deps.authModules;
        this.tokenContext = deps.tokenContext;
        this.userService = deps.userService;
    }
    Object.defineProperty(Auth.prototype, "passwordResetUrl", {
        /**
         * Link the user to this URL for password resets. Only for email/password
         * authentication.
         *
         * Use this if you want to use our password reset forms instead of creating
         * your own in your app.
         */
        get: function () {
            return this.config.getURL('web') + "/password/reset/" + this.config.get('app_id');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether the user is logged in or not.
     *
     * If an auth token exists in local storage, the user is logged in.
     */
    Auth.prototype.isAuthenticated = function () {
        var token = this.tokenContext.get();
        if (token) {
            return true;
        }
        return false;
    };
    /**
     * Sign up a user with the given data. Only for email/password
     * authentication.
     *
     * `signup` does not affect local data or the current user until `login` is
     * called. This means you'll likely want to log in your users manually after
     * signup.
     *
     * If a signup fails, the promise rejects with a [`IDetailedError`
     * object](/api/client/idetailederror) that contains an array of error codes
     * from the cloud.
     *
     * @param details - The details that describe a user.
     */
    Auth.prototype.signup = function (details) {
        return this.authModules.basic.signup(details);
    };
    /**
     * Attempt to log the user in with the given credentials. For custom & social
     * logins, kick-off the authentication process.
     *
     * After login, the full user is loaded from the cloud and saved in local
     * storage along with their auth token.
     *
     * @note TODO: Better error handling docs.
     *
     * @param moduleId
     *  The authentication provider module ID to use with this login.
     * @param credentials
     *  For email/password authentication, give an email and password. For social
     *  authentication, exclude this parameter. For custom authentication, send
     *  whatever you need.
     * @param options
     *  Options for this login, such as whether to remember the login and
     *  InAppBrowser window options for authentication providers that make use of
     *  it.
     */
    Auth.prototype.login = function (moduleId, credentials, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (typeof options.remember === 'undefined') {
            options.remember = true;
        }
        if (typeof options.inAppBrowserOptions === 'undefined') {
            options.inAppBrowserOptions = {};
        }
        if (typeof options.inAppBrowserOptions.location === 'undefined') {
            options.inAppBrowserOptions.location = false;
        }
        if (typeof options.inAppBrowserOptions.clearcache === 'undefined') {
            options.inAppBrowserOptions.clearcache = true;
        }
        if (typeof options.inAppBrowserOptions.clearsessioncache === 'undefined') {
            options.inAppBrowserOptions.clearsessioncache = true;
        }
        var context = this.authModules[moduleId];
        if (!context) {
            throw new Error('Authentication class is invalid or missing:' + context);
        }
        return context.authenticate(credentials, options).then(function (r) {
            _this.storeToken(options, r.token);
            return _this.userService.load().then(function () {
                var user = _this.userService.current();
                user.store();
                return r;
            });
        });
    };
    /**
     * Log the user out of the app.
     *
     * This clears the auth token out of local storage and restores the user to
     * an unauthenticated state.
     */
    Auth.prototype.logout = function () {
        this.tokenContext.delete();
        var user = this.userService.current();
        user.unstore();
        user.clear();
    };
    /**
     * Kick-off the password reset process. Only for email/password
     * authentication.
     *
     * An email will be sent to the user with a short password reset code, which
     * they can copy back into your app and use the [`confirmPasswordReset()`
     * method](#confirmPasswordReset).
     *
     * @param email - The email address to which to send a code.
     */
    Auth.prototype.requestPasswordReset = function (email) {
        this.storage.set('auth_password_reset_email', email);
        return this.authModules.basic.requestPasswordReset(email);
    };
    /**
     * Confirm a password reset.
     *
     * When the user gives you their password reset code into your app and their
     * requested changed password, call this method.
     *
     * @param code - The password reset code from the user.
     * @param newPassword - The requested changed password from the user.
     */
    Auth.prototype.confirmPasswordReset = function (code, newPassword) {
        var email = this.storage.get('auth_password_reset_email');
        if (!email) {
            return DeferredPromise.rejectImmediately(new Error('email address not found in local storage'));
        }
        else {
            return this.authModules.basic.confirmPasswordReset(email, code, newPassword);
        }
    };
    /**
     * Get the raw auth token of the active user from local storage.
     */
    Auth.prototype.getToken = function () {
        return this.tokenContext.get();
    };
    /**
     * @hidden
     */
    Auth.prototype.storeToken = function (options, token) {
        if (options === void 0) { options = { 'remember': true }; }
        var originalToken = this.authToken;
        this.authToken = token;
        this.tokenContext.store(this.authToken, { 'permanent': options.remember });
        this.emitter.emit('auth:token-changed', { 'old': originalToken, 'new': this.authToken });
    };
    /**
     * @hidden
     */
    Auth.getDetailedErrorFromResponse = function (res) {
        var errors = [];
        var details = [];
        if (isAPIResponseError(res.body) && typeof res.body.error.details !== 'undefined') {
            details = res.body.error.details;
        }
        for (var i = 0; i < details.length; i++) {
            var detail = details[i];
            if (detail.error_type) {
                errors.push(detail.error_type + '_' + detail.parameter);
            }
        }
        return new DetailedError('Error creating user', errors);
    };
    return Auth;
}());
/**
 * @hidden
 */
var AuthType = (function () {
    function AuthType(deps) {
        this.config = deps.config;
        this.client = deps.client;
        this.emitter = deps.emitter;
    }
    AuthType.prototype.parseInAppBrowserOptions = function (opts) {
        if (!opts) {
            return '';
        }
        var p = [];
        for (var k in opts) {
            var v = void 0;
            if (typeof opts[k] === 'boolean') {
                v = opts[k] ? 'yes' : 'no';
            }
            else {
                v = opts[k];
            }
            p.push(k + "=" + v);
        }
        return p.join(',');
    };
    AuthType.prototype.inAppBrowserFlow = function (moduleId, data, options) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (options === void 0) { options = {}; }
        var deferred = new DeferredPromise();
        if (!window || !window.cordova) {
            return deferred.reject(new Error('Cordova is missing--can\'t login with InAppBrowser flow.'));
        }
        this.emitter.once('cordova:deviceready', function () {
            if (!window.cordova.InAppBrowser) {
                deferred.reject(new Error('InAppBrowser plugin missing'));
                return;
            }
            _this.client.post("/auth/login/" + moduleId)
                .send({
                'app_id': _this.config.get('app_id'),
                'callback': window.location.href,
                'data': data
            })
                .end(function (err, res) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var w_1 = window.cordova.InAppBrowser.open(res.body.data.url, '_blank', _this.parseInAppBrowserOptions(options.inAppBrowserOptions));
                    var onExit_1 = function () {
                        deferred.reject(new Error('InAppBrowser exit'));
                    };
                    var onLoadError_1 = function () {
                        deferred.reject(new Error('InAppBrowser loaderror'));
                    };
                    var onLoadStart = function (data) {
                        if (data.url.slice(0, 20) === 'http://auth.ionic.io') {
                            var queryString = data.url.split('#')[0].split('?')[1];
                            var paramParts = queryString.split('&');
                            var params = {};
                            for (var i = 0; i < paramParts.length; i++) {
                                var part = paramParts[i].split('=');
                                params[part[0]] = part[1];
                            }
                            w_1.removeEventListener('exit', onExit_1);
                            w_1.removeEventListener('loaderror', onLoadError_1);
                            w_1.close();
                            if (params['error']) {
                                deferred.reject(new Error(decodeURIComponent(params['error'])));
                            }
                            else {
                                deferred.resolve({
                                    'token': params['token'],
                                    'signup': Boolean(parseInt(params['signup'], 10))
                                });
                            }
                        }
                    };
                    w_1.addEventListener('exit', onExit_1);
                    w_1.addEventListener('loaderror', onLoadError_1);
                    w_1.addEventListener('loadstart', onLoadStart);
                }
            });
        });
        return deferred.promise;
    };
    return AuthType;
}());
/**
 * @hidden
 */
var BasicAuthType = (function (_super) {
    __extends(BasicAuthType, _super);
    function BasicAuthType() {
        _super.apply(this, arguments);
    }
    BasicAuthType.prototype.authenticate = function (data, options) {
        var deferred = new DeferredPromise();
        if (!data.email || !data.password) {
            return deferred.reject(new Error('email and password are required for basic authentication'));
        }
        this.client.post('/auth/login')
            .send({
            'app_id': this.config.get('app_id'),
            'email': data.email,
            'password': data.password
        })
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve({
                    'token': res.body.data.token
                });
            }
        });
        return deferred.promise;
    };
    BasicAuthType.prototype.requestPasswordReset = function (email) {
        var deferred = new DeferredPromise();
        if (!email) {
            return deferred.reject(new Error('Email is required for password reset request.'));
        }
        this.client.post('/users/password/reset')
            .send({
            'app_id': this.config.get('app_id'),
            'email': email,
            'flow': 'app'
        })
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    BasicAuthType.prototype.confirmPasswordReset = function (email, code, newPassword) {
        var deferred = new DeferredPromise();
        if (!code || !email || !newPassword) {
            return deferred.reject(new Error('Code, new password, and email are required.'));
        }
        this.client.post('/users/password')
            .send({
            'reset_token': code,
            'new_password': newPassword,
            'email': email
        })
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    BasicAuthType.prototype.signup = function (data) {
        var deferred = new DeferredPromise();
        if (data.email) {
            if (!isValidEmail(data.email)) {
                return deferred.reject(new DetailedError('Invalid email supplied.', ['invalid_email']));
            }
        }
        else {
            return deferred.reject(new DetailedError('Email is required for email/password auth signup.', ['required_email']));
        }
        if (!data.password) {
            return deferred.reject(new DetailedError('Password is required for email/password auth signup.', ['required_password']));
        }
        var userData = {
            'app_id': this.config.get('app_id'),
            'email': data.email,
            'password': data.password
        };
        // optional details
        if (data.username) {
            userData.username = data.username;
        }
        if (data.image) {
            userData.image = data.image;
        }
        if (data.name) {
            userData.name = data.name;
        }
        if (data.custom) {
            userData.custom = data.custom;
        }
        this.client.post('/users')
            .send(userData)
            .end(function (err, res) {
            if (err) {
                deferred.reject(Auth.getDetailedErrorFromResponse(err.response));
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    return BasicAuthType;
}(AuthType));
/**
 * hidden
 */
var NativeAuth = (function () {
    function NativeAuth(deps) {
        this.config = deps.config;
        this.client = deps.client;
        this.userService = deps.userService;
        this.tokenContext = deps.tokenContext;
        this.emitter = deps.emitter;
    }
    /**
     * Get the raw auth token of the active user from local storage.
     * @hidden
     */
    NativeAuth.prototype.getToken = function () {
        return this.tokenContext.get();
    };
    /**
     * @hidden
     */
    NativeAuth.prototype.storeToken = function (token) {
        var originalToken = this.authToken;
        this.authToken = token;
        this.tokenContext.store(this.authToken, { 'permanent': true });
        this.emitter.emit('auth:token-changed', { 'old': originalToken, 'new': this.authToken });
    };
    return NativeAuth;
}());
/**
 * GoogleNativeAuth handles logging into googleplus through the cordova-plugin-googleplus plugin.'
 * @featured
 */
var GoogleAuth = (function (_super) {
    __extends(GoogleAuth, _super);
    function GoogleAuth() {
        _super.apply(this, arguments);
    }
    GoogleAuth.prototype.logout = function () {
        var deferred = new DeferredPromise();
        this.tokenContext.delete();
        var user = this.userService.current();
        user.unstore();
        user.clear();
        GooglePlus.logout().then(function () {
            deferred.resolve();
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    GoogleAuth.prototype.login = function () {
        console.log("Estoy logueando!!");
        var _this = this;
        var deferred = new DeferredPromise();
        var authConfig = this.config.settings.auth;
        var errorFinal = "";
        this.emitter.once('cordova:deviceready', function () {
            console.log("Device ready");
            var scope = ['profile', 'email'];
            if (!GooglePlus) {
                deferred.reject(new Error('Ionic native is not installed'));
                errorFinal = 'Ionic native is not installed'
                console.log("Ionic native is not installed");
                return errorFinal;
            }
            if (!window || !window.cordova) {
                deferred.reject(new Error('Cordova is missing'));
                errorFinal = 'Cordova is missing';
                console.log("Cordova is missing");
                return errorFinal;
            }
            if (!window.plugins || !window.plugins.googleplus) {
                deferred.reject(new Error('GooglePlus cordova plugin is missing.'));
                errorFinal = 'GooglePlus cordova plugin is missing.';
                console.log("GooglePlus cordova plugin is missing.");
                return errorFinal;
            }
            if (!authConfig || !authConfig.google || !authConfig.google.webClientId) {
                deferred.reject(new Error('Missing google web client id. Please visit http://docs.ionic.io/services/users/google-auth.html#native'));
                errorFinal = 'Missing google web client id. Please visit http://docs.ionic.io/services/users/google-auth.html#native';
                console.log("Missing google web client id. Please visit http://docs.ionic.io/services/users/google-auth.html#native");
                return errorFinal;
            }
            if (authConfig.google.scope) {
                authConfig.google.scope.forEach(function (item) {
                    if (scope.indexOf(item) === -1) {
                        scope.push(item);
                    }
                });
            }
            GooglePlus.login({ 'webClientId': authConfig.google.webClientId, 'offline': true, 'scopes': scope.join(' ') }).then(function (success) {
                if (!success.serverAuthCode) {
                    deferred.reject(new Error('Failed to retrieve offline access token.'));
                    errorFinal = 'Failed to retrieve offline access token.';
                    console.log("Failed to retrieve offline access token.");
                    return errorFinal;
                }
                var request_object = {
                    'app_id': _this.config.get('app_id'),
                    'serverAuthCode': success.serverAuthCode,
                    'additional_fields': scope,
                    'flow': 'native-mobile'
                };
                _this.client.post('/auth/login/google')
                    .send(request_object)
                    .end(function (err, res) {
                    if (err) {
                        deferred.reject(err);
                        console.log("err1");
                    }
                    else {
                        console.log("Salio todo bien!");
                        _this.storeToken(res.body.data.token);
                        _this.userService.load().then(function () {
                            var user = _this.userService.current();
                            user.store();
                            deferred.resolve({
                                'token': res.body.data.token,
                                'signup': Boolean(parseInt(res.body.data.signup, 10))
                            });
                        });
                    }
                });
            }, function (err) {
                deferred.reject(err);
                console.log("err2");
            });
        });
        console.log(deferred.reject);
        console.log(deferred.promise);
        return deferred.promise;
    };
    return GoogleAuth;
}(NativeAuth));
/**
 * FacebookNative handles logging into facebook through the cordova-plugin-facebook4 plugin.
 * @featured
 */
var FacebookAuth = (function (_super) {
    __extends(FacebookAuth, _super);
    function FacebookAuth() {
        _super.apply(this, arguments);
    }
    FacebookAuth.prototype.logout = function () {
        var deferred = new DeferredPromise();
        this.tokenContext.delete();
        var user = this.userService.current();
        user.unstore();
        user.clear();
        // Clear the facebook auth.
        Facebook.logout().then(function () {
            deferred.resolve();
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    FacebookAuth.prototype.login = function () {
        var _this = this;
        var deferred = new DeferredPromise();
        var authConfig = this.config.settings.auth;
        var scope = ['public_profile', 'email'];
        if (authConfig && authConfig.facebook && authConfig.facebook.scope) {
            authConfig.facebook.scope.forEach(function (item) {
                if (scope.indexOf(item) === -1) {
                    scope.push(item);
                }
            });
        }
        this.emitter.once('cordova:deviceready', function () {
            if (!Facebook) {
                deferred.reject(new Error('Ionic native is not installed'));
                return;
            }
            if (!window || !window.cordova) {
                deferred.reject(new Error('Cordova is missing.'));
                return;
            }
            if (!window.facebookConnectPlugin) {
                deferred.reject(new Error('Please install the cordova-plugin-facebook4 plugin'));
                return;
            }
            Facebook.login(scope).then(function (r) {
                scope.splice(scope.indexOf('public_profile'), 1);
                var request_object = {
                    'app_id': _this.config.get('app_id'),
                    'access_token': r.authResponse.accessToken,
                    'additional_fields': scope,
                    'flow': 'native-mobile'
                };
                _this.client.post('/auth/login/facebook')
                    .send(request_object)
                    .end(function (err, res) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        _this.storeToken(res.body.data.token);
                        _this.userService.load().then(function () {
                            var user = _this.userService.current();
                            user.store();
                            deferred.resolve({
                                'token': res.body.data.token,
                                'signup': Boolean(parseInt(res.body.data.signup, 10))
                            });
                        });
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
        });
        return deferred.promise;
    };
    return FacebookAuth;
}(NativeAuth));
/**
 * @hidden
 */
var CustomAuthType = (function (_super) {
    __extends(CustomAuthType, _super);
    function CustomAuthType() {
        _super.apply(this, arguments);
    }
    CustomAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('custom', data, options);
    };
    return CustomAuthType;
}(AuthType));
/**
 * @hidden
 */
var TwitterAuthType = (function (_super) {
    __extends(TwitterAuthType, _super);
    function TwitterAuthType() {
        _super.apply(this, arguments);
    }
    TwitterAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('twitter', data, options);
    };
    return TwitterAuthType;
}(AuthType));
/**
 * @hidden
 */
var FacebookAuthType = (function (_super) {
    __extends(FacebookAuthType, _super);
    function FacebookAuthType() {
        _super.apply(this, arguments);
    }
    FacebookAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('facebook', data, options);
    };
    return FacebookAuthType;
}(AuthType));
/**
 * @hidden
 */
var GithubAuthType = (function (_super) {
    __extends(GithubAuthType, _super);
    function GithubAuthType() {
        _super.apply(this, arguments);
    }
    GithubAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('github', data, options);
    };
    return GithubAuthType;
}(AuthType));
/**
 * @hidden
 */
var GoogleAuthType = (function (_super) {
    __extends(GoogleAuthType, _super);
    function GoogleAuthType() {
        _super.apply(this, arguments);
    }
    GoogleAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('google', data, options);
    };
    return GoogleAuthType;
}(AuthType));
/**
 * @hidden
 */
var InstagramAuthType = (function (_super) {
    __extends(InstagramAuthType, _super);
    function InstagramAuthType() {
        _super.apply(this, arguments);
    }
    InstagramAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('instagram', data, options);
    };
    return InstagramAuthType;
}(AuthType));
/**
 * @hidden
 */
var LinkedInAuthType = (function (_super) {
    __extends(LinkedInAuthType, _super);
    function LinkedInAuthType() {
        _super.apply(this, arguments);
    }
    LinkedInAuthType.prototype.authenticate = function (data, options) {
        if (data === void 0) { data = {}; }
        return this.inAppBrowserFlow('linkedin', data, options);
    };
    return LinkedInAuthType;
}(AuthType));

var index = createCommonjsModule(function (module) {
/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};
});

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

var index$2 = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};

/**
 * Module dependencies.
 */

var Emitter = index;
var reduce = index$2;

/**
 * Root reference for iframes.
 */

var root$2;
if (typeof window !== 'undefined') { // Browser window
  root$2 = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root$2 = self;
} else { // Other environments
  root$2 = commonjsGlobal;
}

/**
 * Noop.
 */

function noop(){}

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root$2.XMLHttpRequest
      && (!root$2.location || 'file:' != root$2.location.protocol
          || !root$2.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject$1(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject$1(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index$$1;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index$$1 = line.indexOf(':');
    field = line.slice(0, index$$1).toLowerCase();
    val = trim(line.slice(index$$1 + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
}

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject$1(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

Request.prototype.parse = function(fn){
  this._parser = fn;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root$2.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root$2.FormData();
  this._formData.append(field, file, filename || file.name);
  return this;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject$1(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject$1(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this.getHeader('Content-Type');
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

Request.prototype.then = function (fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

var client = request;



var request$1 = Object.freeze({
	default: client,
	__moduleExports: client
});

/**
 * `Client` is for making HTTP requests to the API.
 *
 * Under the hood, it uses
 * [superagent](http://visionmedia.github.io/superagent/). When a method is
 * called, you can call any number of superagent functions on it and then call
 * `end()` to complete and send the request.
 *
 * @featured
 */
var Client = (function () {
    function Client(
        /**
         * @hidden
         */
        tokenContext, 
        /**
         * @hidden
         */
        baseUrl, req // TODO: use superagent types
        ) {
        this.tokenContext = tokenContext;
        this.baseUrl = baseUrl;
        if (typeof req === 'undefined') {
            req = request$1['default'] || request$1;
        }
        this.req = req;
    }
    /**
     * GET request for retrieving a resource from the API.
     *
     * @param endpoint - The path of the API endpoint.
     */
    Client.prototype.get = function (endpoint) {
        return this.supplement(this.req.get, endpoint);
    };
    /**
     * POST request for sending a new resource to the API.
     *
     * @param endpoint - The path of the API endpoint.
     */
    Client.prototype.post = function (endpoint) {
        return this.supplement(this.req.post, endpoint);
    };
    /**
     * PUT request for replacing a resource in the API.
     *
     * @param endpoint - The path of the API endpoint.
     */
    Client.prototype.put = function (endpoint) {
        return this.supplement(this.req.put, endpoint);
    };
    /**
     * PATCH request for performing partial updates to a resource in the API.
     *
     * @param endpoint - The path of the API endpoint.
     */
    Client.prototype.patch = function (endpoint) {
        return this.supplement(this.req.patch, endpoint);
    };
    /**
     * DELETE request for deleting a resource from the API.
     *
     * @param endpoint - The path of the API endpoint.
     */
    Client.prototype.delete = function (endpoint) {
        return this.supplement(this.req.delete, endpoint);
    };
    /**
     * @hidden
     */
    Client.prototype.request = function (method, endpoint) {
        return this.supplement(this.req.bind(this.req, method), endpoint);
    };
    /**
     * @private
     */
    Client.prototype.supplement = function (fn, endpoint) {
        if (endpoint.substring(0, 1) !== '/') {
            throw Error('endpoint must start with leading slash');
        }
        var req = fn(this.baseUrl + endpoint);
        var token = this.tokenContext.get();
        if (token) {
            req.set('Authorization', "Bearer " + token);
        }
        return req;
    };
    return Client;
}());

/**
 * @hidden
 */
var Config = (function () {
    function Config() {
        /**
         * @private
         */
        this.urls = {
            'api': 'https://api.ionic.io',
            'web': 'https://web.ionic.io'
        };
    }
    /**
     * Register a new config.
     */
    Config.prototype.register = function (settings) {
        this.settings = settings;
    };
    /**
     * Get a value from the core settings. You should use `settings` attribute
     * directly for core settings and other settings.
     *
     * @deprecated
     *
     * @param name - The settings key to get.
     */
    Config.prototype.get = function (name) {
        if (!this.settings || !this.settings.core) {
            return undefined;
        }
        return this.settings.core[name];
    };
    /**
     * @hidden
     */
    Config.prototype.getURL = function (name) {
        var urls = (this.settings && this.settings.core && this.settings.core.urls) || {};
        if (urls[name]) {
            return urls[name];
        }
        return this.urls[name];
    };
    return Config;
}());

/**
 * @hidden
 */
var Cordova$1 = (function () {
    function Cordova(deps, options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.app = deps.appStatus;
        this.device = deps.device;
        this.emitter = deps.emitter;
        this.logger = deps.logger;
        this.registerEventHandlers();
    }
    Cordova.prototype.bootstrap = function () {
        var _this = this;
        var events = ['pause', 'resume'];
        document.addEventListener('deviceready', function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _this.emitter.emit('cordova:deviceready', { 'args': args });
            var _loop_1 = function(e) {
                document.addEventListener(e, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    _this.emitter.emit('cordova:' + e, { 'args': args });
                }, false);
            };
            for (var _a = 0, events_1 = events; _a < events_1.length; _a++) {
                var e = events_1[_a];
                _loop_1(e);
            }
        }, false);
    };
    /**
     * @private
     */
    Cordova.prototype.registerEventHandlers = function () {
        var _this = this;
        this.emitter.on('cordova:pause', function () {
            _this.app.closed = true;
        });
        this.emitter.on('cordova:resume', function () {
            _this.app.closed = false;
        });
    };
    return Cordova;
}());

/**
 * @hidden
 */
var Core = (function () {
    function Core(deps) {
        /**
         * @private
         */
        this._version = '0.14.0';
        this.config = deps.config;
        this.logger = deps.logger;
        this.emitter = deps.emitter;
        this.insights = deps.insights;
    }
    Core.prototype.init = function () {
        this.registerEventHandlers();
        this.onResume();
    };
    Object.defineProperty(Core.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Core.prototype.onResume = function () {
        this.insights.track('mobileapp.opened');
    };
    /**
     * @private
     */
    Core.prototype.registerEventHandlers = function () {
        var _this = this;
        this.emitter.on('cordova:resume', function () {
            _this.onResume();
        });
        this.emitter.on('push:notification', function (data) {
            if (data.message.app.asleep || data.message.app.closed) {
                _this.insights.track('mobileapp.opened.push');
            }
        });
    };
    return Core;
}());

var NO_PLUGIN = new Error('Missing deploy plugin: `ionic-plugin-deploy`');
/**
 * `Deploy` handles live deploys of the app. Downloading, extracting, and
 * rolling back snapshots.
 *
 * @featured
 */
var Deploy = (function () {
    function Deploy(deps, 
        /**
         * @hidden
         */
        options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        /**
         * The active deploy channel. Set this to change the channel on which
         * `Deploy` operates.
         */
        this.channel = 'production';
        this.config = deps.config;
        this.emitter = deps.emitter;
        this.logger = deps.logger;
        this.emitter.once('device:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.init(_this.config.get('app_id'), _this.config.getURL('api'));
            }
            _this.emitter.emit('deploy:ready');
        });
    }
    /**
     * Check for updates on the active channel.
     *
     * The promise resolves with a boolean. When `true`, a new snapshot exists on
     * the channel.
     */
    Deploy.prototype.check = function () {
        var _this = this;
        var deferred = new DeferredPromise();
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.check(_this.config.get('app_id'), _this.channel, function (result) {
                    if (result && result === 'true') {
                        _this.logger.info('Ionic Deploy: an update is available');
                        deferred.resolve(true);
                    }
                    else {
                        _this.logger.info('Ionic Deploy: no updates available');
                        deferred.resolve(false);
                    }
                }, function (error) {
                    _this.logger.error('Ionic Deploy: encountered an error while checking for updates');
                    deferred.reject(error);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * Download the available snapshot.
     *
     * This should be used in conjunction with
     * [`extract()`](/api/client/deploy/#extract).
     *
     * @param options
     *  Options for this download, such as a progress callback.
     */
    Deploy.prototype.download = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var deferred = new DeferredPromise();
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.download(_this.config.get('app_id'), function (result) {
                    if (result === 'true') {
                        _this.logger.info('Ionic Deploy: download complete');
                        deferred.resolve();
                    }
                    else if (result === 'false') {
                        deferred.reject(new Error('Ionic Deploy: Download has failed: see native logs.'));
                    }
                    else {
                        if (options.onProgress) {
                            options.onProgress(result);
                        }
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * Extract the downloaded snapshot.
     *
     * This should be called after [`download()`](/api/client/deploy/#download)
     * successfully resolves.
     *
     * @param options
     */
    Deploy.prototype.extract = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var deferred = new DeferredPromise();
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.extract(_this.config.get('app_id'), function (result) {
                    if (result === 'done') {
                        _this.logger.info('Ionic Deploy: extraction complete');
                        deferred.resolve();
                    }
                    else {
                        if (options.onProgress) {
                            options.onProgress(result);
                        }
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * Immediately reload the app with the latest deployed snapshot.
     *
     * This is only necessary to call if you have downloaded and extracted a
     * snapshot and wish to instantly reload the app with the latest deploy. The
     * latest deploy will automatically be loaded when the app is started.
     */
    Deploy.prototype.load = function () {
        var _this = this;
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.redirect(_this.config.get('app_id'));
            }
        });
    };
    /**
     * Get information about the current snapshot.
     *
     * The promise is resolved with an object that has key/value pairs pertaining
     * to the currently deployed snapshot.
     */
    Deploy.prototype.info = function () {
        var _this = this;
        var deferred = new DeferredPromise(); // TODO
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.info(_this.config.get('app_id'), function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * List the snapshots that have been installed on this device.
     *
     * The promise is resolved with an array of snapshot UUIDs.
     */
    Deploy.prototype.getSnapshots = function () {
        var _this = this;
        var deferred = new DeferredPromise(); // TODO
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.getVersions(_this.config.get('app_id'), function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * Remove a snapshot from this device.
     *
     * @param uuid
     *  The snapshot UUID to remove from the device.
     */
    Deploy.prototype.deleteSnapshot = function (uuid) {
        var _this = this;
        var deferred = new DeferredPromise(); // TODO
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.deleteVersion(_this.config.get('app_id'), uuid, function (result) {
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * Fetches the metadata for a given snapshot. If no UUID is given, it will
     * attempt to grab the metadata for the most recently known snapshot.
     *
     * @param uuid
     *  The snapshot from which to grab metadata.
     */
    Deploy.prototype.getMetadata = function (uuid) {
        var _this = this;
        var deferred = new DeferredPromise(); // TODO
        this.emitter.once('deploy:ready', function () {
            if (_this._getPlugin()) {
                _this.plugin.getMetadata(_this.config.get('app_id'), uuid, function (result) {
                    deferred.resolve(result.metadata);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            else {
                deferred.reject(NO_PLUGIN);
            }
        });
        return deferred.promise;
    };
    /**
     * @private
     */
    Deploy.prototype._getPlugin = function () {
        if (typeof window.IonicDeploy === 'undefined') {
            this.logger.warn('Ionic Deploy: Disabled! Deploy plugin is not installed or has not loaded. Have you run `ionic plugin add ionic-plugin-deploy` yet?');
            return;
        }
        if (!this.plugin) {
            this.plugin = window.IonicDeploy;
        }
        return this.plugin;
    };
    return Deploy;
}());

/**
 * @hidden
 */
var Device$1 = (function () {
    function Device(deps) {
        this.deps = deps;
        this.native = this.deps.nativeDevice;
        this.emitter = this.deps.emitter;
        this.type = this.determineDeviceType();
        this.registerEventHandlers();
    }
    Device.prototype.isAndroid = function () {
        return this.type === 'android';
    };
    Device.prototype.isIOS = function () {
        return this.type === 'iphone' || this.type === 'ipad';
    };
    Device.prototype.isConnectedToNetwork = function (options) {
        if (options === void 0) { options = {}; }
        if (typeof navigator.connection === 'undefined' ||
            typeof navigator.connection.type === 'undefined' ||
            typeof Connection === 'undefined') {
            if (!options.strictMode) {
                return true;
            }
            return false;
        }
        switch (navigator.connection.type) {
            case Connection.ETHERNET:
            case Connection.WIFI:
            case Connection.CELL_2G:
            case Connection.CELL_3G:
            case Connection.CELL_4G:
            case Connection.CELL:
                return true;
            default:
                return false;
        }
    };
    /**
     * @private
     */
    Device.prototype.registerEventHandlers = function () {
        var _this = this;
        if (this.type === 'unknown') {
            this.emitter.emit('device:ready');
        }
        else {
            this.emitter.once('cordova:deviceready', function () {
                _this.emitter.emit('device:ready');
            });
        }
    };
    /**
     * @private
     */
    Device.prototype.determineDeviceType = function () {
        var agent = navigator.userAgent;
        var ipad = agent.match(/iPad/i);
        if (ipad && (ipad[0].toLowerCase() === 'ipad')) {
            return 'ipad';
        }
        var iphone = agent.match(/iPhone/i);
        if (iphone && (iphone[0].toLowerCase() === 'iphone')) {
            return 'iphone';
        }
        var android = agent.match(/Android/i);
        if (android && (android[0].toLowerCase() === 'android')) {
            return 'android';
        }
        return 'unknown';
    };
    return Device;
}());

/**
 * A registered event receiver.
 */
var EventReceiver = (function () {
    function EventReceiver(
        /**
         * An registered identifier for this event receiver.
         */
        key, 
        /**
         * The registered name of the event.
         */
        event, 
        /**
         * The actual callback.
         */
        handler) {
        this.key = key;
        this.event = event;
        this.handler = handler;
    }
    return EventReceiver;
}());
/**
 * Stores callbacks for registered events.
 */
var EventEmitter = (function () {
    function EventEmitter() {
        /**
         * @private
         */
        this.n = 0;
        /**
         * @private
         */
        this.eventReceivers = {};
        /**
         * @private
         */
        this.eventsEmitted = {};
    }
    /**
     * Register an event callback which gets triggered every time the event is
     * fired.
     *
     * @param event
     *  The event name.
     * @param callback
     *  A callback to attach to this event.
     */
    EventEmitter.prototype.on = function (event, callback) {
        if (typeof this.eventReceivers[event] === 'undefined') {
            this.eventReceivers[event] = {};
        }
        var receiver = new EventReceiver(this.n, event, callback);
        this.n++;
        this.eventReceivers[event][receiver.key] = receiver;
        return receiver;
    };
    /**
     * Unregister an event receiver returned from
     * [`on()`](/api/client/eventemitter#on).
     *
     * @param receiver
     *  The event receiver.
     */
    EventEmitter.prototype.off = function (receiver) {
        if (typeof this.eventReceivers[receiver.event] === 'undefined' ||
            typeof this.eventReceivers[receiver.event][receiver.key] === 'undefined') {
            throw new Error('unknown event receiver');
        }
        delete this.eventReceivers[receiver.event][receiver.key];
    };
    /**
     * Register an event callback that gets triggered only once. If the event was
     * triggered before your callback is registered, it calls your callback
     * immediately.
     *
     * @note TODO: Fix the docs for () => void syntax.
     *
     * @param event
     *  The event name.
     * @param callback
     *  A callback to attach to this event. It takes no arguments.
     */
    EventEmitter.prototype.once = function (event, callback) {
        var _this = this;
        if (this.emitted(event)) {
            callback();
        }
        else {
            this.on(event, function () {
                if (!_this.emitted(event)) {
                    callback();
                }
            });
        }
    };
    /**
     * Trigger an event. Call all callbacks in the order they were registered.
     *
     * @param event
     *  The event name.
     * @param data
     *  An object to pass to every callback.
     */
    EventEmitter.prototype.emit = function (event, data) {
        if (typeof this.eventReceivers[event] === 'undefined') {
            this.eventReceivers[event] = {};
        }
        if (typeof this.eventsEmitted[event] === 'undefined') {
            this.eventsEmitted[event] = 0;
        }
        for (var k in this.eventReceivers[event]) {
            this.eventReceivers[event][k].handler(data);
        }
        this.eventsEmitted[event] += 1;
    };
    /**
     * Return a count of the number of times an event has been triggered.
     *
     * @param event
     *  The event name.
     */
    EventEmitter.prototype.emitted = function (event) {
        if (typeof this.eventsEmitted[event] === 'undefined') {
            return 0;
        }
        return this.eventsEmitted[event];
    };
    return EventEmitter;
}());

/**
 * @hidden
 */
var Stat = (function () {
    function Stat(appId, stat, value) {
        if (value === void 0) { value = 1; }
        this.appId = appId;
        this.stat = stat;
        this.value = value;
        this.appId = appId;
        this.stat = stat;
        this.value = value;
        this.created = new Date();
    }
    Stat.prototype.toJSON = function () {
        return {
            app_id: this.appId,
            stat: this.stat,
            value: this.value,
            created: this.created.toISOString(),
        };
    };
    return Stat;
}());
/**
 * A client for Insights that handles batching, user activity insight, and
 * sending insights at an interval.
 *
 * @hidden
 */
var Insights = (function () {
    function Insights(deps, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        this.app = deps.appStatus;
        this.storage = deps.storage;
        this.config = deps.config;
        this.client = deps.client;
        this.device = deps.device;
        this.logger = deps.logger;
        this.batch = [];
        if (typeof this.options.intervalSubmit === 'undefined') {
            this.options.intervalSubmit = 60 * 1000;
        }
        if (typeof this.options.intervalActiveCheck === 'undefined') {
            this.options.intervalActiveCheck = 1000;
        }
        if (typeof this.options.submitCount === 'undefined') {
            this.options.submitCount = 100;
        }
        if (this.options.intervalSubmit) {
            setInterval(function () {
                _this.submit();
            }, this.options.intervalSubmit);
        }
        if (this.options.intervalActiveCheck) {
            setInterval(function () {
                if (!_this.app.closed) {
                    _this.checkActivity();
                }
            }, this.options.intervalActiveCheck);
        }
    }
    /**
     * Track an insight.
     *
     * @param stat - The insight name.
     * @param value - The number by which to increment this insight.
     */
    Insights.prototype.track = function (stat, value) {
        if (value === void 0) { value = 1; }
        this.trackStat(new Stat(this.config.get('app_id'), stat, value));
    };
    Insights.prototype.checkActivity = function () {
        var session = this.storage.get('insights_session');
        if (!session) {
            this.markActive();
        }
        else {
            var d = new Date(session);
            var hour = 60 * 60 * 1000;
            if (d.getTime() + hour < new Date().getTime()) {
                this.markActive();
            }
        }
    };
    Insights.prototype.markActive = function () {
        this.track('mobileapp.active');
        if (!this.device.native || !this.device.native.device || !this.device.native.device.platform) {
            this.logger.warn('Ionic Insights: Device information unavailable.');
        }
        else {
            var device = this.device.native.device;
            var platform = this.normalizeDevicePlatform(device.platform);
            var platformVersion = this.normalizeVersion(device.version);
            var cordovaVersion = this.normalizeVersion(device.cordova);
            this.track("mobileapp.active.platform." + platform);
            this.track("mobileapp.active.platform." + platform + "." + platformVersion);
            this.track("mobileapp.active.cordova." + cordovaVersion);
        }
        this.storage.set('insights_session', new Date().toISOString());
    };
    Insights.prototype.normalizeDevicePlatform = function (platform) {
        return platform.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    };
    Insights.prototype.normalizeVersion = function (s) {
        var v;
        try {
            v = String(parseSemanticVersion(s).major);
        }
        catch (e) {
            v = 'unknown';
        }
        return v;
    };
    Insights.prototype.trackStat = function (stat) {
        this.batch.push(stat);
        if (this.shouldSubmit()) {
            this.submit();
        }
    };
    Insights.prototype.shouldSubmit = function () {
        return this.batch.length >= this.options.submitCount;
    };
    Insights.prototype.submit = function () {
        var _this = this;
        if (this.batch.length === 0) {
            return;
        }
        var insights = [];
        for (var _i = 0, _a = this.batch; _i < _a.length; _i++) {
            var stat = _a[_i];
            insights.push(stat.toJSON());
        }
        this.client.post('/insights')
            .send({ 'insights': insights })
            .end(function (err, res) {
            if (err) {
                _this.logger.error('Ionic Insights: Could not send insights.', err);
            }
        });
        this.batch = [];
    };
    return Insights;
}());

/**
 * Simple console logger.
 */
var Logger = (function () {
    function Logger(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        /**
         * The function to use to log info level messages.
         */
        this.infofn = console.log.bind(console);
        /**
         * The function to use to log warn level messages.
         */
        this.warnfn = console.warn.bind(console);
        /**
         * The function to use to log error level messages.
         */
        this.errorfn = console.error.bind(console);
    }
    /**
     * Send a log at info level.
     *
     * @note TODO: Fix optionalParams in docs.
     *
     * @param message - The message to log.
     */
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (!this.options.silent) {
            this.infofn.apply(this, [message].concat(optionalParams));
        }
    };
    /**
     * Send a log at warn level.
     *
     * @note TODO: Fix optionalParams in docs.
     *
     * @param message - The message to log.
     */
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (!this.options.silent) {
            this.warnfn.apply(this, [message].concat(optionalParams));
        }
    };
    /**
     * Send a log at error level.
     *
     * @note TODO: Fix optionalParams in docs.
     *
     * @param message - The message to log.
     */
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.errorfn.apply(this, [message].concat(optionalParams));
    };
    return Logger;
}());

/**
 * Represents a push notification sent to the device.
 *
 * @featured
 */
var PushMessage = (function () {
    function PushMessage() {
    }
    /**
     * Create a PushMessage from the push plugin's format.
     *
     * @hidden
     *
     * @param data - The plugin's notification object.
     */
    PushMessage.fromPluginData = function (data) {
        var message = new PushMessage();
        message.raw = data;
        message.text = data.message;
        message.title = data.title;
        message.count = data.count;
        message.sound = data.sound;
        message.image = data.image;
        message.app = {
            'asleep': !data.additionalData.foreground,
            'closed': data.additionalData.coldstart
        };
        message.payload = data.additionalData['payload'];
        return message;
    };
    PushMessage.prototype.toString = function () {
        return "<PushMessage [\"" + this.title + "\"]>";
    };
    return PushMessage;
}());

/**
 * `Push` handles push notifications for this app.
 *
 * @featured
 */
var Push$1 = (function () {
    function Push(deps, options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        /**
         * @private
         */
        this.blockRegistration = false;
        /**
         * @private
         */
        this.blockUnregister = false;
        /**
         * @private
         */
        this.blockSaveToken = false;
        /**
         * @private
         */
        this.registered = false;
        this.config = deps.config;
        this.auth = deps.auth;
        this.userService = deps.userService;
        this.device = deps.device;
        this.client = deps.client;
        this.emitter = deps.emitter;
        this.storage = deps.storage;
        this.logger = deps.logger;
        // Check for the required values to use this service
        if (this.device.isAndroid() && !this.options.sender_id) {
            this.logger.error('Ionic Push: GCM project number not found (https://docs.ionic.io/services/push/)');
            return;
        }
        if (!options.pluginConfig) {
            options.pluginConfig = {};
        }
        if (this.device.isAndroid()) {
            // inject gcm key for PushPlugin
            if (!options.pluginConfig.android) {
                options.pluginConfig.android = {};
            }
            if (!options.pluginConfig.android.senderID) {
                options.pluginConfig.android.senderID = this.options.sender_id;
            }
        }
        this.options = options;
    }
    Object.defineProperty(Push.prototype, "token", {
        get: function () {
            if (!this._token) {
                this._token = this.storage.get('push_token') || undefined;
            }
            return this._token;
        },
        set: function (val) {
            if (!val) {
                this.storage.delete('push_token');
            }
            else {
                this.storage.set('push_token', val);
            }
            this._token = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register a token with the API.
     *
     * When a token is saved, you can send push notifications to it. If a user is
     * logged in, the token is linked to them by their ID.
     *
     * @param token - The token.
     * @param options
     */
    Push.prototype.saveToken = function (token, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var deferred = new DeferredPromise();
        var tokenData = {
            'token': token.token,
            'app_id': this.config.get('app_id')
        };
        if (!options.ignore_user) {
            var user = this.userService.current();
            if (this.auth.isAuthenticated()) {
                tokenData.user_id = user.id;
            }
        }
        if (this.blockSaveToken) {
            return deferred.reject(new Error('A token save operation is already in progress.'));
        }
        this.client.post('/push/tokens')
            .send(tokenData)
            .end(function (err, res) {
            if (err) {
                _this.blockSaveToken = false;
                _this.logger.error('Ionic Push:', err);
                deferred.reject(err);
            }
            else {
                _this.blockSaveToken = false;
                _this.logger.info('Ionic Push: saved push token: ' + token.token);
                if (tokenData.user_id) {
                    _this.logger.info('Ionic Push: added push token to user: ' + tokenData.user_id);
                }
                token.id = res.body.data.id;
                token.type = res.body.data.type;
                token.saved = true;
                deferred.resolve(token);
            }
        });
        return deferred.promise;
    };
    /**
     * Registers the device with GCM/APNS to get a push token.
     *
     * After a device is registered, you will likely want to save the token with
     * [`saveToken()`](/api/client/push/#saveToken) to the API.
     */
    Push.prototype.register = function () {
        var _this = this;
        var deferred = new DeferredPromise();
        if (this.blockRegistration) {
            return deferred.reject(new Error('Another registration is already in progress.'));
        }
        this.blockRegistration = true;
        this.emitter.once('device:ready', function () {
            var pushPlugin = _this._getPushPlugin();
            if (pushPlugin) {
                _this.plugin = pushPlugin.init(_this.options.pluginConfig);
                _this.plugin.on('registration', function (data) {
                    _this.blockRegistration = false;
                    _this.token = { 'token': data.registrationId, 'registered': false, 'saved': false };
                    _this.token.registered = true;
                    deferred.resolve(_this.token);
                });
                _this.plugin.on('error', function (err) {
                    _this.logger.error('Ionic Push:', err);
                    deferred.reject(err);
                });
                _this._callbackRegistration();
                _this.registered = true;
            }
            else {
                deferred.reject(new Error('Push plugin not found! See logs.'));
            }
        });
        return deferred.promise;
    };
    /**
     * Invalidate the current push token.
     */
    Push.prototype.unregister = function () {
        var _this = this;
        var deferred = new DeferredPromise();
        if (this.blockUnregister) {
            return deferred.reject(new Error('An unregister operation is already in progress.'));
        }
        var pushToken = this.token;
        if (!pushToken) {
            return deferred.resolve();
        }
        var tokenData = {
            'token': pushToken.token,
            'app_id': this.config.get('app_id')
        };
        if (this.plugin) {
            this.plugin.unregister(function () { }, function () { });
        }
        this.client.post('/push/tokens/invalidate')
            .send(tokenData)
            .end(function (err, res) {
            _this.blockUnregister = false;
            if (err) {
                _this.logger.error('Ionic Push:', err);
                deferred.reject(err);
            }
            else {
                _this.logger.info('Ionic Push: unregistered push token');
                delete _this.token;
                deferred.resolve();
            }
        });
        this.blockUnregister = true;
        return deferred.promise;
    };
    /**
     * @private
     */
    Push.prototype._callbackRegistration = function () {
        var _this = this;
        this.plugin.on('registration', function (data) {
            if (_this.options.debug) {
                _this.logger.info('Ionic Push (debug): device token registered: ' + _this.token);
            }
            _this.emitter.emit('push:register', _this.token);
        });
        this.plugin.on('notification', function (data) {
            var message = PushMessage.fromPluginData(data);
            if (_this.options.debug) {
                _this.logger.info('Ionic Push (debug): notification received: ' + message);
            }
            _this.emitter.emit('push:notification', { 'message': message, 'raw': data });
        });
        this.plugin.on('error', function (e) {
            if (_this.options.debug) {
                _this.logger.error('Ionic Push (debug): unexpected error occured.');
                _this.logger.error('Ionic Push:', e);
            }
            _this.emitter.emit('push:error', { 'err': e });
        });
    };
    /**
     * @private
     */
    Push.prototype._getPushPlugin = function () {
        var plugin = window.PushNotification;
        if (!plugin) {
            if (this.device.isIOS() || this.device.isAndroid()) {
                this.logger.error('Ionic Push: PushNotification plugin is required. Have you run `ionic plugin add phonegap-plugin-push` ?');
            }
            else {
                this.logger.warn('Ionic Push: Disabled! Native push notifications will not work in a browser. Run your app on an actual device to use push.');
            }
        }
        return plugin;
    };
    return Push;
}());

/**
 * @hidden
 */
var LocalStorageStrategy = (function () {
    function LocalStorageStrategy() {
    }
    LocalStorageStrategy.prototype.get = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageStrategy.prototype.set = function (key, value) {
        return localStorage.setItem(key, value);
    };
    LocalStorageStrategy.prototype.delete = function (key) {
        return localStorage.removeItem(key);
    };
    return LocalStorageStrategy;
}());
/**
 * @hidden
 */
var SessionStorageStrategy = (function () {
    function SessionStorageStrategy() {
    }
    SessionStorageStrategy.prototype.get = function (key) {
        return sessionStorage.getItem(key);
    };
    SessionStorageStrategy.prototype.set = function (key, value) {
        return sessionStorage.setItem(key, value);
    };
    SessionStorageStrategy.prototype.delete = function (key) {
        return sessionStorage.removeItem(key);
    };
    return SessionStorageStrategy;
}());
/**
 * A generic local/session storage abstraction.
 */
var Storage = (function () {
    function Storage(deps, options) {
        if (options === void 0) { options = { 'prefix': 'ionic', 'cache': true }; }
        this.options = options;
        this.strategy = deps.strategy;
        this.storageCache = {};
    }
    /**
     * Set a value in the storage by the given key.
     *
     * @param key - The storage key to set.
     * @param value - The value to set. (Must be JSON-serializable).
     */
    Storage.prototype.set = function (key, value) {
        key = this.standardizeKey(key);
        var json = JSON.stringify(value);
        this.strategy.set(key, json);
        if (this.options.cache) {
            this.storageCache[key] = value;
        }
    };
    /**
     * Delete a value from the storage by the given key.
     *
     * @param key - The storage key to delete.
     */
    Storage.prototype.delete = function (key) {
        key = this.standardizeKey(key);
        this.strategy.delete(key);
        if (this.options.cache) {
            delete this.storageCache[key];
        }
    };
    /**
     * Get a value from the storage by the given key.
     *
     * @param key - The storage key to get.
     */
    Storage.prototype.get = function (key) {
        key = this.standardizeKey(key);
        if (this.options.cache) {
            var cached = this.storageCache[key];
            if (cached) {
                return cached;
            }
        }
        var json = this.strategy.get(key);
        if (!json) {
            return null;
        }
        try {
            var value = JSON.parse(json);
            if (this.options.cache) {
                this.storageCache[key] = value;
            }
            return value;
        }
        catch (err) {
            return null;
        }
    };
    /**
     * @private
     */
    Storage.prototype.standardizeKey = function (key) {
        return this.options.prefix + "_" + key;
    };
    return Storage;
}());

var dataTypeMapping = {};
var DataTypeSchema = (function () {
    function DataTypeSchema(properties) {
        this.data = {};
        this.setProperties(properties);
    }
    DataTypeSchema.prototype.setProperties = function (properties) {
        if (properties instanceof Object) {
            for (var x in properties) {
                this.data[x] = properties[x];
            }
        }
    };
    DataTypeSchema.prototype.toJSON = function () {
        var data = this.data;
        return {
            '__Ionic_DataTypeSchema': data.name,
            'value': data.value
        };
    };
    DataTypeSchema.prototype.isValid = function () {
        if (this.data.name && this.data.value) {
            return true;
        }
        return false;
    };
    return DataTypeSchema;
}());
var DataType = (function () {
    function DataType() {
    }
    DataType.get = function (name, value) {
        if (dataTypeMapping[name]) {
            return new dataTypeMapping[name](value);
        }
        return false;
    };
    DataType.getMapping = function () {
        return dataTypeMapping;
    };
    Object.defineProperty(DataType, "Schema", {
        get: function () {
            return DataTypeSchema;
        },
        enumerable: true,
        configurable: true
    });
    DataType.register = function (name, cls) {
        dataTypeMapping[name] = cls;
    };
    return DataType;
}());
var UniqueArray = (function () {
    function UniqueArray(value) {
        this.data = [];
        if (value instanceof Array) {
            for (var x in value) {
                this.push(value[x]);
            }
        }
    }
    UniqueArray.prototype.toJSON = function () {
        var data = this.data;
        var schema = new DataTypeSchema({ 'name': 'UniqueArray', 'value': data });
        return schema.toJSON();
    };
    UniqueArray.fromStorage = function (value) {
        return new UniqueArray(value);
    };
    UniqueArray.prototype.push = function (value) {
        if (this.data.indexOf(value) === -1) {
            this.data.push(value);
        }
    };
    UniqueArray.prototype.pull = function (value) {
        var index = this.data.indexOf(value);
        this.data.splice(index, 1);
    };
    return UniqueArray;
}());
DataType.register('UniqueArray', UniqueArray);

/**
 * @hidden
 */
var UserContext = (function () {
    function UserContext(deps) {
        this.config = deps.config;
        this.storage = deps.storage;
    }
    Object.defineProperty(UserContext.prototype, "label", {
        get: function () {
            return 'user_' + this.config.get('app_id');
        },
        enumerable: true,
        configurable: true
    });
    UserContext.prototype.unstore = function () {
        this.storage.delete(this.label);
    };
    UserContext.prototype.store = function (user) {
        this.storage.set(this.label, user.serializeForStorage());
    };
    UserContext.prototype.load = function (user) {
        var data = this.storage.get(this.label);
        if (data) {
            user.id = data.id;
            user.data = new UserData(data.data);
            user.details = data.details || {};
            user.social = data.social || {};
            user.fresh = data.fresh;
            return user;
        }
        return null;
    };
    return UserContext;
}());
/**
 * @hidden
 */
var UserData = (function () {
    function UserData(data) {
        if (data === void 0) { data = {}; }
        this.data = {};
        if ((typeof data === 'object')) {
            this.data = data;
            this.deserializeDataTypes();
        }
    }
    UserData.prototype.get = function (key, defaultValue) {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        }
        else {
            if (defaultValue === 0 || defaultValue === false) {
                return defaultValue;
            }
            return defaultValue || null;
        }
    };
    UserData.prototype.set = function (key, value) {
        this.data[key] = value;
    };
    UserData.prototype.unset = function (key) {
        delete this.data[key];
    };
    /**
     * @private
     */
    UserData.prototype.deserializeDataTypes = function () {
        if (this.data) {
            for (var x in this.data) {
                // if we have an object, let's check for custom data types
                if (this.data[x] && typeof this.data[x] === 'object') {
                    // do we have a custom type?
                    if (this.data[x].__Ionic_DataTypeSchema) {
                        var name = this.data[x].__Ionic_DataTypeSchema;
                        var mapping = DataType.getMapping();
                        if (mapping[name]) {
                            // we have a custom type and a registered class, give the custom data type
                            // from storage
                            this.data[x] = mapping[name].fromStorage(this.data[x].value);
                        }
                    }
                }
            }
        }
    };
    return UserData;
}());
/**
 * Represents a user of the app.
 *
 * @featured
 */
var User = (function () {
    function User(deps) {
        /**
         * The details (email, password, etc) of this user.
         */
        this.details = {};
        /**
         * The social details of this user.
         */
        this.social = {};
        this.service = deps.service;
        this.fresh = true;
        this._unset = {};
        this.data = new UserData();
    }
    /**
     * Check whether this user is anonymous or not.
     *
     * If the `id` property is set, the user is no longer anonymous.
     */
    User.prototype.isAnonymous = function () {
        if (!this.id) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Get a value from this user's custom data.
     *
     * Optionally, a default value can be provided.
     *
     * @param key - The data key to get.
     * @param defaultValue - The value to return if the key is absent.
     */
    User.prototype.get = function (key, defaultValue) {
        return this.data.get(key, defaultValue);
    };
    /**
     * Set a value in this user's custom data.
     *
     * @param key - The data key to set.
     * @param value - The value to set.
     */
    User.prototype.set = function (key, value) {
        delete this._unset[key];
        return this.data.set(key, value);
    };
    /**
     * Delete a value from this user's custom data.
     *
     * @param key - The data key to delete.
     */
    User.prototype.unset = function (key) {
        this._unset[key] = true;
        return this.data.unset(key);
    };
    /**
     * Revert this user to a fresh, anonymous state.
     */
    User.prototype.clear = function () {
        this.id = undefined;
        this.data = new UserData();
        this.details = {};
        this.fresh = true;
    };
    /**
     * Save this user to the API.
     */
    User.prototype.save = function () {
        this._unset = {};
        return this.service.save();
    };
    /**
     * Delete this user from the API.
     */
    User.prototype.delete = function () {
        return this.service.delete();
    };
    /**
     * Load the user from the API, overwriting the local user's data.
     *
     * @param id - The user ID to load into this user.
     */
    User.prototype.load = function (id) {
        return this.service.load(id);
    };
    /**
     * Store this user in local storage.
     */
    User.prototype.store = function () {
        this.service.store();
    };
    /**
     * Remove this user from local storage.
     */
    User.prototype.unstore = function () {
        this.service.unstore();
    };
    /**
     * @hidden
     */
    User.prototype.serializeForAPI = function () {
        return {
            'email': this.details.email,
            'password': this.details.password,
            'username': this.details.username,
            'image': this.details.image,
            'name': this.details.name,
            'custom': this.data.data
        };
    };
    /**
     * @hidden
     */
    User.prototype.serializeForStorage = function () {
        return {
            'id': this.id,
            'data': this.data.data,
            'details': this.details,
            'fresh': this.fresh,
            'social': this.social
        };
    };
    User.prototype.toString = function () {
        return "<User [" + (this.isAnonymous() ? 'anonymous' : this.id) + "]>";
    };
    return User;
}());
/**
 * @hidden
 */
var SingleUserService = (function () {
    function SingleUserService(deps, config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        this.client = deps.client;
        this.context = deps.context;
    }
    SingleUserService.prototype.current = function () {
        if (!this.user) {
            this.user = this.context.load(new User({ 'service': this }));
        }
        if (!this.user) {
            this.user = new User({ 'service': this });
        }
        return this.user;
    };
    SingleUserService.prototype.store = function () {
        this.context.store(this.current());
    };
    SingleUserService.prototype.unstore = function () {
        this.context.unstore();
    };
    SingleUserService.prototype.load = function (id) {
        if (id === void 0) { id = 'self'; }
        var deferred = new DeferredPromise();
        var user = this.current();
        this.client.get("/users/" + id)
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                user.id = res.body.data.uuid;
                user.data = new UserData(res.body.data.custom);
                user.details = res.body.data.details;
                user.fresh = false;
                user.social = res.body.data.social;
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    SingleUserService.prototype.delete = function () {
        var deferred = new DeferredPromise();
        if (!this.user) {
            return deferred.reject(new Error('No user loaded to delete.'));
        }
        if (this.user.isAnonymous()) {
            return deferred.reject(new Error('User is anonymous and cannot be deleted from the API.'));
        }
        this.unstore();
        this.client.delete("/users/" + this.user.id)
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    SingleUserService.prototype.save = function () {
        var _this = this;
        var deferred = new DeferredPromise();
        this.store();
        if (!this.user) {
            return deferred.reject(new Error('No user loaded to save.'));
        }
        if (this.user.isAnonymous()) {
            return deferred.reject(new Error('User is anonymous and cannot be updated in the API. Use load(<id>) or signup a user using auth.'));
        }
        this.client.patch("/users/" + this.user.id)
            .send(this.user.serializeForAPI())
            .end(function (err, res) {
            if (err) {
                deferred.reject(err);
            }
            else {
                if (_this.user) {
                    _this.user.fresh = false;
                }
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    return SingleUserService;
}());

var __decorate$101 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var modules = {};
function cache(target, propertyKey, descriptor) {
    var method = descriptor.get;
    descriptor.get = function () {
        if (typeof method !== 'undefined' && typeof modules[propertyKey] === 'undefined') {
            var value = method.apply(this, arguments);
            modules[propertyKey] = value;
        }
        return modules[propertyKey];
    };
    descriptor.set = function (value) { };
}
/**
 * @hidden
 */
var Container = (function () {
    function Container() {
    }
    Object.defineProperty(Container.prototype, "appStatus", {
        get: function () {
            return { 'asleep': false, 'closed': false };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "config", {
        get: function () {
            return new Config();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "eventEmitter", {
        get: function () {
            return new EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "logger", {
        get: function () {
            var config = this.config;
            var c = {};
            if (typeof config.settings !== 'undefined' && typeof config.settings.logger !== 'undefined') {
                c = config.settings.logger;
            }
            return new Logger(c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "localStorageStrategy", {
        get: function () {
            return new LocalStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "sessionStorageStrategy", {
        get: function () {
            return new SessionStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authTokenContext", {
        get: function () {
            var label = 'auth_' + this.config.get('app_id');
            return new CombinedAuthTokenContext({
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'tempStorage': new Storage({ 'strategy': this.sessionStorageStrategy })
            }, label);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "client", {
        get: function () {
            return new Client(this.authTokenContext, this.config.getURL('api'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "insights", {
        get: function () {
            return new Insights({
                'appStatus': this.appStatus,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'config': this.config,
                'client': this.client,
                'device': this.device,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "core", {
        get: function () {
            return new Core({
                'config': this.config,
                'logger': this.logger,
                'emitter': this.eventEmitter,
                'insights': this.insights
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "device", {
        get: function () {
            return new Device$1({ 'nativeDevice': Device, 'emitter': this.eventEmitter });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "cordova", {
        get: function () {
            return new Cordova$1({
                'appStatus': this.appStatus,
                'device': this.device,
                'emitter': this.eventEmitter,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "userContext", {
        get: function () {
            return new UserContext({ 'storage': new Storage({ 'strategy': this.localStorageStrategy }), 'config': this.config });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "singleUserService", {
        get: function () {
            return new SingleUserService({ 'client': this.client, 'context': this.userContext });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authModules", {
        get: function () {
            var authModuleDeps = {
                'config': this.config,
                'client': this.client,
                'emitter': this.eventEmitter
            };
            return {
                'basic': new BasicAuthType(authModuleDeps),
                'custom': new CustomAuthType(authModuleDeps),
                'twitter': new TwitterAuthType(authModuleDeps),
                'facebook': new FacebookAuthType(authModuleDeps),
                'github': new GithubAuthType(authModuleDeps),
                'google': new GoogleAuthType(authModuleDeps),
                'instagram': new InstagramAuthType(authModuleDeps),
                'linkedin': new LinkedInAuthType(authModuleDeps)
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "auth", {
        get: function () {
            return new Auth({
                'config': this.config,
                'emitter': this.eventEmitter,
                'authModules': this.authModules,
                'tokenContext': this.authTokenContext,
                'userService': this.singleUserService
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "facebookAuth", {
        get: function () {
            return new FacebookAuth({
                'config': this.config,
                'client': this.client,
                'userService': this.singleUserService,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'tokenContext': this.authTokenContext,
                'emitter': this.eventEmitter
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "googleAuth", {
        get: function () {
            return new GoogleAuth({
                'config': this.config,
                'client': this.client,
                'userService': this.singleUserService,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'tokenContext': this.authTokenContext,
                'emitter': this.eventEmitter
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "push", {
        get: function () {
            var config = this.config;
            var c = {};
            if (typeof config.settings !== 'undefined' && typeof config.settings.push !== 'undefined') {
                c = config.settings.push;
            }
            return new Push$1({
                'config': config,
                'auth': this.auth,
                'userService': this.singleUserService,
                'device': this.device,
                'client': this.client,
                'emitter': this.eventEmitter,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'logger': this.logger
            }, c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "deploy", {
        get: function () {
            return new Deploy({
                'config': this.config,
                'emitter': this.eventEmitter,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "appStatus", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "config", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "eventEmitter", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "logger", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "localStorageStrategy", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "sessionStorageStrategy", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "authTokenContext", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "client", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "insights", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "core", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "device", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "cordova", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "userContext", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "singleUserService", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "authModules", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "auth", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "facebookAuth", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "googleAuth", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "push", null);
    __decorate$101([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "deploy", null);
    return Container;
}());

/**
 * Angular 1 modules and factories for the bundle
 */
function bootstrapAngular1() {
    if (typeof angular === 'undefined') {
        return; // No global angular--this is not an AngularJS project.
    }
    var container = new Container();
    angular.element(document).ready(function () {
        container.core.init();
        container.cordova.bootstrap();
    });
    angular.module('ionic.cloud', [])
        .provider('$ionicCloudConfig', function () {
        var config = container.config;
        this.register = function (settings) {
            config.register(settings);
        };
        this.$get = function () {
            return config;
        };
    })
        .provider('$ionicCloud', ['$ionicCloudConfigProvider', function ($ionicCloudConfigProvider) {
            this.init = function (value) {
                $ionicCloudConfigProvider.register(value);
            };
            this.$get = [function () {
                    return container.core;
                }];
        }])
        .factory('$ionicCloudClient', [function () {
            return container.client;
        }])
        .factory('$ionicUser', [function () {
            return container.singleUserService.current();
        }])
        .factory('$ionicAuth', [function () {
            return container.auth;
        }])
        .factory('$ionicFacebookAuth', [function () {
            return container.facebookAuth;
        }])
        .factory('$ionicGoogleAuth', [function () {
            return container.googleAuth;
        }])
        .factory('$ionicPush', [function () {
            return container.push;
        }])
        .factory('$ionicDeploy', [function () {
            return container.deploy;
        }])
        .run(['$window', '$q', '$rootScope', function ($window, $q, $rootScope) {
            if (typeof $window.Promise === 'undefined') {
                $window.Promise = $q;
            }
            else {
                var init = DeferredPromise.prototype.init;
                DeferredPromise.prototype.init = function () {
                    init.apply(this, arguments);
                    this.promise = $q.when(this.promise);
                };
            }
            var emit = EventEmitter.prototype.emit;
            EventEmitter.prototype.emit = function (name, data) {
                $rootScope.$broadcast('cloud:' + name, data);
                return emit.apply(this, arguments);
            };
        }]);
}

bootstrapAngular1();

exports.Auth = Auth;
exports.AuthType = AuthType;
exports.BasicAuthType = BasicAuthType;
exports.CustomAuthType = CustomAuthType;
exports.FacebookAuth = FacebookAuth;
exports.FacebookAuthType = FacebookAuthType;
exports.GithubAuthType = GithubAuthType;
exports.GoogleAuth = GoogleAuth;
exports.GoogleAuthType = GoogleAuthType;
exports.InstagramAuthType = InstagramAuthType;
exports.LinkedInAuthType = LinkedInAuthType;
exports.TwitterAuthType = TwitterAuthType;
exports.Client = Client;
exports.Config = Config;
exports.Cordova = Cordova$1;
exports.Core = Core;
exports.Deploy = Deploy;
exports.Device = Device$1;
exports.Exception = Exception;
exports.DetailedError = DetailedError;
exports.DIContainer = Container;
exports.EventEmitter = EventEmitter;
exports.Insights = Insights;
exports.Logger = Logger;
exports.Push = Push$1;
exports.PushMessage = PushMessage;
exports.Storage = Storage;
exports.LocalStorageStrategy = LocalStorageStrategy;
exports.SessionStorageStrategy = SessionStorageStrategy;
exports.UserContext = UserContext;
exports.User = User;
exports.SingleUserService = SingleUserService;

}((this.Ionic = this.Ionic || {})));
//# sourceMappingURL=ionic.cloud.js.map
