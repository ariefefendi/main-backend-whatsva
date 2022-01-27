"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var pino_1 = require("pino");
var baileys_md_1 = require("@slonbook/baileys-md");
// load authentication state from a file
var loadState = function (device) {
    var state = undefined;
    try {
        var value = JSON.parse((0, fs_1.readFileSync)(`./sessions/${device}.json`, { encoding: 'utf-8' }), baileys_md_1.BufferJSON.reviver);
        state = {
            creds: value.creds,
            // stores pre-keys, session & other keys in a JSON object
            // we deserialize it here
            keys: (0, baileys_md_1.initInMemoryKeyStore)(value.keys)
        };
    }
    catch (_a) { }
    return state;
};
// save the authentication state to a file
var saveState = function (state,device) {
    console.log('saving auth state');
    (0, fs_1.writeFileSync)(`./sessions/${device}.json`, 
    // BufferJSON replacer utility saves buffers nicely
    JSON.stringify(state, baileys_md_1.BufferJSON.replacer, 2));
};
// start a connection
var startSock = function (device) {
    var sock = (0, baileys_md_1["default"])({
        logger: (0, pino_1["default"])({ level: 'trace' }),
        printQRInTerminal: true,
        auth: loadState(device)
    });
    var sendMessageWTyping = function (msg, jid) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sock.presenceSubscribe(jid)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, baileys_md_1.delay)(500)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sock.sendPresenceUpdate('composing', jid)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, baileys_md_1.delay)(2000)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sock.sendPresenceUpdate('paused', jid)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sock.sendMessage(jid, msg)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    sock.ev.on('qr', function (m) { return console.log(m); });
    sock.ev.on('messages.upsert', function (m) { return __awaiter(void 0, void 0, void 0, function () {
        var msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(JSON.stringify(m, undefined, 2));
                    msg = m.messages[0];
                    if (!(!msg.key.fromMe && m.type === 'notify')) return [3 /*break*/, 3];
                    console.log('replying to', m.messages[0].key.remoteJid);
                    return [4 /*yield*/, sock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [msg.key.id])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    sock.ev.on('messages.update', function (m) { return console.log(m); });
    sock.ev.on('presence.update', function (m) { return console.log(m); });
    sock.ev.on('chats.update', function (m) { return console.log(m); });
    sock.ev.on('contacts.update', function (m) { return console.log(m); });
    sock.ev.on('connection.update', function (update) {
        var _a, _b;
        var connection = update.connection, lastDisconnect = update.lastDisconnect;
        if (connection === 'close') {
            // reconnect if not logged out
            if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_md_1.DisconnectReason.loggedOut) {
                startSock();
            }
            else {
                console.log('connection closed');
            }
        }
        console.log('connection update', update);
    });
    // listen for when the auth state is updated
    // it is imperative you save this data, it affects the signing keys you need to have conversations
    sock.ev.on('auth-state.update', function () { return saveState(sock.authState,device); });
    return sock;
};
startSock('qrtestcode');
