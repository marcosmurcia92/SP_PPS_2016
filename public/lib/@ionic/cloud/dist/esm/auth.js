var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Facebook, GooglePlus } from 'ionic-native';
import { isAPIResponseError } from './guards';
import { DetailedError } from './errors';
import { DeferredPromise } from './promise';
import { isValidEmail } from './util';
/**
 * @hidden
 */
export var AuthTokenContext = (function () {
    function AuthTokenContext(deps, label) {
        this.label = label;
        this.storage = deps.storage;
    }
    AuthTokenContext.prototype.get = function () {
        return this.storage.get(this.label);
    };
    AuthTokenContext.prototype.store = function (token) {
        this.storage.set(this.label, token);
    };
    AuthTokenContext.prototype.delete = function () {
        this.storage.delete(this.label);
    };
    return AuthTokenContext;
}());
/**
 * @hidden
 */
export var CombinedAuthTokenContext = (function () {
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
export var Auth = (function () {
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
export var AuthType = (function () {
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
export var BasicAuthType = (function (_super) {
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
export var NativeAuth = (function () {
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
export var GoogleAuth = (function (_super) {
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
        var _this = this;
        var deferred = new DeferredPromise();
        var authConfig = this.config.settings.auth;
        this.emitter.once('cordova:deviceready', function () {
            var scope = ['profile', 'email'];
            if (!GooglePlus) {
                deferred.reject(new Error('Ionic native is not installed'));
                return;
            }
            if (!window || !window.cordova) {
                deferred.reject(new Error('Cordova is missing'));
                return;
            }
            if (!window.plugins || !window.plugins.googleplus) {
                deferred.reject(new Error('GooglePlus cordova plugin is missing.'));
                return;
            }
            if (!authConfig || !authConfig.google || !authConfig.google.webClientId) {
                deferred.reject(new Error('Missing google web client id. Please visit http://docs.ionic.io/services/users/google-auth.html#native'));
                return;
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
                    return;
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
    return GoogleAuth;
}(NativeAuth));
/**
 * FacebookNative handles logging into facebook through the cordova-plugin-facebook4 plugin.
 * @featured
 */
export var FacebookAuth = (function (_super) {
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
export var CustomAuthType = (function (_super) {
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
export var TwitterAuthType = (function (_super) {
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
export var FacebookAuthType = (function (_super) {
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
export var GithubAuthType = (function (_super) {
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
export var GoogleAuthType = (function (_super) {
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
export var InstagramAuthType = (function (_super) {
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
export var LinkedInAuthType = (function (_super) {
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
