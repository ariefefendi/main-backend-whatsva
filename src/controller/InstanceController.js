// const makeWASocket = require('whatsvamd');
const { makeid, formatnumberindo } = require('./../helper/library')
var fs_1 = require("fs");
var pino_1 = require("pino");
const mimeTypes = require('mime-types')
const fs = require('fs');
const axios = require('axios')
var whatsvamd = require("whatsvamd");
const moment = require('moment');
const { createBrotliCompress } = require('zlib');
const { writeFile } = require('fs/promises')

function loadstate(device, multidevice) {
    multidevice_status[[device]] = multidevice
    if (multidevice == "1") {
        var _a = (0, whatsvamd.useSingleFileAuthState)(__basedir + '/sessions/' + device + 'auth_info_multi.json'),
            state = _a.state,
            saveState = _a.saveState;
        return _a;
    } else {
        var _a = (0, whatsvamd.useSingleFileLegacyAuthState)(__basedir + '/sessions/' + device + 'auth_info_multi.json'),
            state = _a.state,
            saveState = _a.saveState;
        return _a;

    }

}
function simpankirimchat(dari, tujuan, id_user, keterangan, type, jenis, files, status_kirim, key_message, waktu_kirim, id_device) {
    var keyne = Object.keys(keterangan)[0];
    // console.log({message : keterangan})
    if (keyne == "text") {
        keterangan = keterangan.text
    } else if (keyne == "document") {
        files = keterangan.document.url
        var keterangan = keterangan.fileName
        // console.log({keterangan : keterangan})
    } else if (keyne == "image") {
        files = keterangan.image.url
        var keterangan = keterangan.caption
    } else if (keyne == "video") {
        files = keterangan.video.url
        var keterangan = keterangan.caption
    }
    else if (keyne == "location") {
        var keterangan = JSON.stringify(keterangan.location);
    } else if (keyne == "contacts") {
        var keterangan = JSON.stringify(keterangan.contacts);
    } else if (keyne == "buttons") {
        var keterangan = JSON.stringify(keterangan.buttons);
    }
    else {
        keterangan = JSON.stringify(keterangan);
    }
    conn.query(`select * from chat where key_message ='${key_message}'`, (err, results) => {
        if (err) console.log(err)
        if (results.length < 1) {
            let sql = `insert into chat set 
            dari ='${dari}',
            tujuan='${tujuan}',
            id_user='${id_user}',
            message= ?,
            files = '${files}',
            type = '${type}',
            jenis = '${jenis}',
            status='${status_kirim}',
            key_message='${key_message}',
            waktu_kirim='${waktu_kirim}',
            waktu_diterima='${waktu_kirim}',
            id_device='${id_device}'`;
            conn.query(sql, [keterangan]);
        }
    })

}
function timestamptodate(timestamp) {
    var ts = timestamp;

    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;

    // initialize new Date object
    var date_ob = new Date(ts_ms);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);

    // hours as 2 digits (hh)
    var hours = ("0" + date_ob.getHours()).slice(-2);

    // minutes as 2 digits (mm)
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // seconds as 2 digits (ss)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);


    var datee = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    return datee;
}

// async function startSock (instance_key) {
//     var _a = (0, whatsvamd.useSingleFileAuthState)('./sessions/'+instance_key+'auth_info_multi.json'), 
//         state = _a.state, 
//         saveState = _a.saveState;

//     session[[instance_key]] = (0, whatsvamd["default"])({
//         logger: (0, pino_1["default"])({ level: 'trace' }),
//         printQRInTerminal: true,
//         auth: state
//     });

//     session[[instance_key]].ev.on('connection.update', (update) => {
//         const { connection, lastDisconnect } = update
//         if(connection === 'close') {
//             // const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
//             const shouldReconnect = lastDisconnect.error 
//             console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
//             // reconnect if not logged out
//             if(shouldReconnect) {
//                 sock = startWaConnection(instance_key)
//             }
//         } else if(connection === 'open') {
//             console.log('opened connection')
//             var sqlupdate = `update instance set instance_status='connected', data='',domain='${domain_server}' where instance_key='${instance_key}'`
//             conn.query(sqlupdate)
//              sendMessageWTyping({ text: 'Hello juga' }, "62895361034833@s.whatsapp.net")
//         } 
//         if(update.qr){
//             console.log("qr : "+JSON.stringify(update.qr))
//             conn.query(`update instance set qrCode='${update.qr}' where instance_key='${instance_key}'`)
//             // create event
//             conn.query(`select * from instance where instance_key='${instance_key}'`, (err, results) => {
//                 if (err) console.log(err)
//                 if (results.length > 0) {
//                     var data_instance = results.shift()
//                     if (data_instance.domain !== undefined || data_instance.domain !== null || data_instance.domain !== "") {
//                         var domain = data_instance.domain
//                         axios.post(domain + "/index.php/io", {
//                             multidevice : true,
//                             event: "qr",
//                             instance_key: instance_key,
//                             data: { qr: update.qr }

//                         }).then((res) => {
//                             // console.log(res.data)

//                         }).catch((error) => {
//                             // console.log(error)
//                         })
//                     }
//                 }
//             })
//         }

//     })


// }





// var WebSocket = require("ws")
// global.websocket = []
console.log("hello")
conn.query(`select * from instance where instance_status='connected' and status ='1'`, async (err, results) => {
    if (err) console.log(err)
    if (results.length > 0) {
        for (i in results) {

            if (results[i].multidevice == "1") {
                session_connection[[results[i].instance_key]] = await loadstate(results[i].instance_key, "1");
                startWaConnection(results[i].instance_key, results[i].domain, "1")
            } else if (results[i].multidevice == "0") {
                // startWhatsvi(results[i].instance_key, results[i].domain)
                console.log("start nonmulti")
                session_connection[[results[i].instance_key]] = await loadstate(results[i].instance_key, "0");
                startWaConnection(results[i].instance_key, results[i].domain, "0")
            }

        }
    }
})

exports.initInstance = (req, res) => {

    var instance_name = req.body.instance_name
    var apiKey = req.body.panel_key
    if (!instance_name) {
        res.json({
            success: false,
            message: "instance name empty"
        })
    } else if (!apiKey) {
        res.json({
            success: false,
            message: "apiKey empty"
        })
    } else {
        var sqlcek = `select * from instance where name='${instance_name}' and apiKey='${apiKey}' and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: false,
                    message: "Instance Already exists"
                })
            } else {
                var instance_key = makeid(12)
                conn.query(`insert into instance set name='${instance_name}',instance_key='${instance_key}',apiKey='${apiKey}',instance_status='disconnected',status='1'`, (err) => {
                    if (err) console.log(err)
                })
                res.json({ success: true, message: "generating instance", data: { instance_name: instance_name, instance_key: instance_key } })
            }
        })

    }

}
exports.detail = (req, res) => {
    var instance_key = req.body.instance_key
    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "Instance Data",
                    data: results.shift()
                })
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.list = (req, res) => {
    var apiKey = req.body.apiKey
    if (!apiKey) {
        res.json({
            success: false,
            message: "api key empty"
        })
    } else {
        var sqlcek = `select * from instance where apiKey='${apiKey}' and status='1'`

        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "List Instance",
                    data: results
                })
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.resetInstance = (req, res) => {

    var instance_key = req.body.instance_key
    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else {
        if (session[[instance_key]]) {
            // session[[instance_key]].destroy()
            console.log('session found')
        }
        var pathe = __basedir + '/sessions/' + instance_key + 'auth_info_multi.json';
        if (fs.existsSync(pathe)) {
            fs.unlinkSync(pathe);
        }
        // console.log("dirname : "+__dirname+'/../../sessions/'+instance_key+".json")
        conn.query(`update instance set instance_status='disconnected' where instance_key='${instance_key}'`)
        res.json({
            success: true,
            message: "reset your session"
        })
    }
}
exports.update_multidevice = (req, res) => {

    var instance_key = req.body.instance_key
    var multidevice = req.body.multidevice
    console.log(req.body)
    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${instance_key}'  and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                var dinstance = results.shift();
                if (dinstance.instance_status == 'disconnected') {
                    console.log(`update instance set multidevice = '${multidevice}' where instance_key='${instance_key}'`)
                    conn.query(`update instance set multidevice = '${multidevice}' where instance_key='${instance_key}'`, (err) => {
                        if (err) console.log(err)
                    })
                    res.json({ success: true, message: "Updating instance" })
                } else {
                    res.json({ success: false, message: "Instance must be in a disconnected state" })
                }


            } else {
                res.json({
                    success: false,
                    message: "Instance can't update"
                })
            }
        })
    }
}

exports.delete = (req, res) => {

    var instance_key = req.body.instance_key
    var apiKey = req.body.apiKey

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!apiKey) {
        res.json({
            success: false,
            message: "api key empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and apiKey='${apiKey}' and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                conn.query(`update instance set instance_status = '0' where apiKey='${apiKey}' and instance_key='${instance_key}'`, (err) => {
                    if (err) console.log(err)
                })
                res.json({ success: true, message: "Deleting instance" })
            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.generateQr = async (req, res) => {

    var device = req.body.instance_key
    var panel_domain = req.body.panel_domain;


    if (!device) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${device}' and status='1'`
        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                var muldev = results.shift().multidevice;
                console.log("multidevice : " + muldev);

                var sql = `select * from instance where instance_key ='${device}' and instance_status='connected'`;
                console.log(sql)
                conn.query(sql, async (err, result) => {
                    if (err) console.log(err)
                    if (result.length > 0) {
                        res.json({
                            success: false,
                            message: "Paired device"
                        })
                    } else {
                        if (session[[device]]) {
                            // session[[device]].destroy()
                        }
                        var pathe = __basedir + '/sessions/' + device + 'auth_info_multi.json';
                        if (fs.existsSync(pathe)) {
                            fs.unlinkSync(pathe);
                        }
                        if (muldev == "1") {
                            session_connection[[device]] = await loadstate(device, "1");
                            await startWaConnection(device, panel_domain, "1")
                        } else {
                            session_connection[[device]] = await loadstate(device, "0");
                            await startWaConnection(device, panel_domain, "0")
                        }


                        res.json({
                            success: true,
                            message: 'Qrcode is being generated'
                        })

                    }
                })


            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })

    }

}

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
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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


async function startWaConnection(device, panel_domain, multidevice) {
    var instance_key = device;

    if (multidevice == "1") {
        session[[device]] = (0, whatsvamd["default"])({
            printQRInTerminal: true,
            auth: session_connection[[device]].state
        });
    } else {
        session[[device]] = (0, whatsvamd["makeWALegacySocket"])({
            printQRInTerminal: true,
            auth: session_connection[[device]].state,
        });

    }
    global.sendMessageWTyping = async function (msg, jid, id_device, options = {}) {

        await session[[id_device]].presenceSubscribe(jid);
        await whatsvamd.delay(500);
        await session[[id_device]].sendPresenceUpdate('composing', jid);
        await whatsvamd.delay(2000);
        await session[[id_device]].sendPresenceUpdate('paused', jid)
        console.log({ message: msg, jid: jid })
        var sending = await session[[id_device]].sendMessage(jid, msg, options)
        console.log({ send: jid })
        var id_user = id_device;
        var id_pesan = sending.key.id;
        var timestamp = sending.messageTimestamp;
        simpankirimchat(id_device, jid, id_user, msg, 'chat', 'kirim', 'kosong', 'pending', id_pesan, timestamptodate(timestamp), id_device)
        return sending;
    }

    session[[instance_key]].ev.on('contacts.upsert', async m => {

        conn.query(`select id from tb_contact where instance_key='${instance_key}'`, (err, results) => {
            if (err) console.log(err);
            if (results.length < 100) {
                console.log('save contact ' + m.length)
                for (i in m) {
                    // simpan data contact
                    if (m[i].name != undefined) {
                        savecontact(m[i].name, m[i].id, instance_key);
                    } else if (m[i].notify != undefined) {
                        savecontact(m[i].notify, m[i].id, instance_key);
                    } else if (m[i].verifiedName != undefined) {
                        savecontact(m[i].verifiedName, m[i].id, instance_key);
                    }

                }
            }
        })

    })

    session[[instance_key]].ev.on('group.upsert', m => {
        console.log({ 'data-group': m })
    })
    function saveChat(id, conversationTimestamp, unreadCount, archive, pin, mute, notSpam, nama, ephemeralExpiration, ephemeralSettingTimestamp, readOnly, instance_key) {
        if (id != undefined || conversationTimestamp != undefined) {
            nama = nama + ""
            nama = nama.replace(`'`, `-`)
            var sqlinsert = `insert into tb_chat set 
            jid='${id}',
            conversationTimestamp='${conversationTimestamp}',
            unreadCount='${unreadCount}',
            archive='${archive}',
            pin='${pin}',
            mute='${mute}',
            notSpam='${notSpam}',
            name ='${nama}',
            ephemeralExpiration='${ephemeralExpiration}',
            ephemeralSettingTimestamp='${ephemeralSettingTimestamp}',
            readOnly='${readOnly}',
            instance_key='${instance_key}',
            createAt='${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}',
            waktu ='${moment.unix(conversationTimestamp).format("YYYY-MM-DD HH:mm:ss")}'`;

            conn.query(sqlinsert, (err) => {
                if (err) console.log(err)
            })
        }


    }
    function savecontact(name, jid, instance_key) {
        if (jid.includes("@g.us")) {
            conn.query(`select * from tb_group where instance_key ='${instance_key}' and jid_group='${jid}'`, (err, results) => {
                if (err) console.log(err)
                if (results.length < 1) {
                    var names = name + ""
                    names = names.replace('"', "")
                    names = names.replace('"', "")
                    conn.query(`insert into tb_group set
                        instance_key ='${instance_key}',
                        jid_phone ='${instance_key}',
                        name="${names}",
                        jid_group='${jid}',
                        creation='-',
                        creator='-',
                        description='-',
                        descriptionId='-'`)
                }
            })
        }
        conn.query(`select id from tb_contact where jid='${jid}' and instance_key='${instance_key}'`, (err, results) => {
            if (err) console.log(err);
            if (results.length < 1) {
                if (name != undefined || name != "") {
                    var names = name + ""
                    names = names.replace('"', "")
                    names = names.replace('"', "")
                    conn.query(`insert into tb_contact set name="${names}",jid='${jid}',instance_key='${instance_key}'`)
                }

            } else {
                // if(name != undefined){
                //     var names = name+""
                //     names = names.replace('"',"")
                //     names = names.replace('"',"")
                //     conn.query(`update tb_contact set name="${names}" where jid='${jid}' and instance_key='${instance_key}' `)
                // }


            }
        })
    }

    session[[instance_key]].ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            // const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            const shouldReconnect = lastDisconnect.error
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out

            var errore = lastDisconnect.error + "";
            console.log("my error :" + errore);
            if (errore.includes("Connection Failure") || errore.includes("QR refs attempts ended") || errore.includes("Unexpected error in login")) {
                var pathe = __basedir + '/sessions/' + instance_key + 'auth_info_multi.json';
                if (fs.existsSync(pathe)) {
                    fs.unlinkSync(pathe);
                }
                let sql = `select * from instance where instance_key ='${instance_key}' and instance_status = 'paired'`;
                let query = conn.query(sql, async (err, results) => {
                    if (err) throw err;

                    let sqlsimpan = "update instance set instance_status='not connected' where instance_key='" + instance_key + "'";
                    console.log(sqlsimpan);
                });
            } else {
                if (shouldReconnect) {
                    sock = startWaConnection(instance_key, panel_domain, multidevice)
                }
            }
        } else if (connection === 'open') {
            console.log('opened connection')
            var sqlupdate = `update instance set instance_status='connected', data='',domain='${domain_server}' where instance_key='${instance_key}'`
            conn.query(sqlupdate)

            //  sendMessageWTyping({ text: 'Hello juga' }, "62895361034833@s.whatsapp.net",instance_key)
        }
        if (update.qr) {
            console.log("qr : " + JSON.stringify(update.qr))
            conn.query(`update instance set qrCode='${update.qr}' where instance_key='${instance_key}'`)
            // create event
            conn.query(`select * from instance where instance_key='${instance_key}'`, (err, results) => {
                if (err) console.log(err)
                if (results.length > 0) {
                    var data_instance = results.shift()
                    if (data_instance.domain !== undefined || data_instance.domain !== null || data_instance.domain !== "") {
                        var domain = data_instance.domain
                        axios.post(domain + "/index.php/io", {
                            multidevice: true,
                            event: "qr",
                            instance_key: instance_key,
                            data: { qr: update.qr }

                        }).then((res) => {
                            // console.log(res.data)

                        }).catch((error) => {
                            // console.log(error)
                        })
                    }
                }
            })
        }

    })
    session[[instance_key]].ev.on('messages.update', (WAMessageStatusUpdate) => {
        // console.log({messageupdates:JSON.stringify(m)}))
        // console.log(`{message-status-update : '${JSON.stringify(WAMessageStatusUpdate)}'}`)
        const date_now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        for (i in WAMessageStatusUpdate) {
            // console.log({updatestatus :WAMessageStatusUpdate[i]});

            var key_message = WAMessageStatusUpdate[i].key.id;
            if (WAMessageStatusUpdate[i].update.status === 3) {
                let sql = `update chat set status='received',waktu_diterima='${date_now}' where key_message ='${key_message}'`;
                conn.query(sql, (err) => {
                    if (err) console.log(err);
                })
            } else if (WAMessageStatusUpdate[i].update.status === 4) {
                let sql = `update chat set status='read',waktu_dibaca='${date_now}' where key_message ='${key_message}'`;
                conn.query(sql, (err) => {
                    if (err) console.log(err);
                })
            }
        }

        // } 
    });
    // 'chats.set': { chats: Chat[], messages: WAMessage[] }
    // /** upsert chats */
    // 'chats.upsert': Chat[]
    // /** update the given chats */
    // 'chats.update': Partial<Chat>[]
    // /** delete chats with given ID */
    // 'chats.delete': string[]
    session[[instance_key]].ev.on('chats.set', async p => {
        // console.log({chatsset:p})
        const m = p.chats
        // Get the array of keys
        // sort by value
        m.sort(function (a, b) {
            return b.conversationTimestamp - a.conversationTimestamp;
        });
        // console.log(m)
        conn.query(`select * from tb_chat where instance_key ='${instance_key}'`, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                var del = conn.query(`delete from tb_chat where instance_key ='${instance_key}'`)
                if (del) {
                    for (i in m) {
                        if (i < 30) {
                            // console.log(m[i])
                            saveChat(m[i].id, m[i].conversationTimestamp, m[i].unreadCount, m[i].archive, m[i].pin, m[i].mute, m[i].notSpam, m[i].name, m[i].ephemeralExpiration, m[i].ephemeralSettingTimestamp, m[i].readOnly, instance_key)

                        }
                    }
                }
            } else {
                for (i in m) {
                    if (i < 30) {
                        // console.log(m[i])
                        saveChat(m[i].id, m[i].conversationTimestamp, m[i].unreadCount, m[i].archive, m[i].pin, m[i].mute, m[i].notSpam, m[i].name, m[i].ephemeralExpiration, m[i].ephemeralSettingTimestamp, m[i].readOnly, instance_key)

                    }
                }
            }
        })





    })
    session[[instance_key]].ev.on('chats.update', async m => {
        // console.log({chatupdate:m})
        for (i in m) {
            console.log(m[i])
            console.log(`select * from tb_chat where jid='${m[i].id}'`)
            conn.query(`select * from tb_chat where jid='${m[i].id}'`, (err, results) => {
                if (err) console.log(err)
                if (results.length > 0) {

                    if (m[i].unreadCount > 0) {
                        var jcount = parseInt(results.shift().unreadCount) + parseInt(m[i].unreadCount)
                    } else {
                        var jcount = 0;
                    }

                    conn.query(`update tb_chat set 
                    unreadCount='${jcount}'
                    ${(m[i].conversationTimestamp != undefined) ? `,conversationTimestamp="${m[i].conversationTimestamp}"` : ""} 
                    where jid='${m[i].id}'`)
                } else {

                    conn.query(`update tb_chat set unreadCount='${m[i].unreadCount}'
                    ${(m[i].conversationTimestamp != undefined) ? `,conversationTimestamp="${m[i].conversationTimestamp}"` : ""} 
                     where jid='${m[i].id}'`)
                }
            })
        }
    })
    session[[instance_key]].ev.on('messages.upsert', async ({ m, messages }) => {

        var id_user = instance_key;
        var message = messages[0];
        var jid = message.key.remoteJid;
        var id_pesan = message.key.id;
        var fromme = message.key.fromMe;
        var timestamp = message.messageTimestamp;

        if (jid != "status@broadcast") {
            if (fromme != true) {
                // console.log(JSON.stringify(m, undefined, 2))


                var mes = messages[0]
                // console.log(messages[0])
                if (!mes.message) return // if there is no text or media message
                const messageType = Object.keys(mes.message)[0]// get what type of message it is -- text, image, video
                // if the message is an image
                var file = ""
                if (messageType === 'imageMessage'||messageType === 'videoMessage' ||messageType==='documentMessage') {
                    var ekstensi = ""
                    var mediakey 
                    var type = ""
                    if(messageType === 'documentMessage'){
                        ekstensi = ".pdf"
                        mediakey = mes.message.documentMessage
                        type = "document"
                    }else if(messageType === 'videoMessage'){
                        ekstensi = ".mp4"
                        mediakey = mes.message.videoMessage
                        type = "video"
                    }else if(messageType === 'imageMessage'){
                        ekstensi = ".jpeg"
                        mediakey = mes.message.imageMessage
                        type = "image"
                    }else{
                        ekstensi = ".jpeg"
                        mediakey = mes.message.imageMessage
                        type = "image"
                    }
                    // download stream
                    const stream = await whatsvamd.downloadContentFromMessage(mediakey, type)
                    let buffer = Buffer.from([])
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk])
                    }
                    // save to file
                    var pathe = __basedir + '/files/devices/' + instance_key;

                    // var filePath = __dirname + '/public/uploads/' + id_device + '/' + filename
                    if (!fs.existsSync(pathe)) {
                        fs.mkdirSync(pathe);
                        console.log('create folder ' + pathe)
                    } else {
                        console.log('folder found')
                    }

                    await writeFile(`${pathe}/${id_pesan}${ekstensi}`, buffer)
                    file = domain_server + "/assets/devices/" + instance_key + "/" + id_pesan + ekstensi
                    simpankirimchat(instance_key, jid, id_user, message, messageType, 'terima', file, 'pending', id_pesan, timestamptodate(timestamp), instance_key)

                }
                 else {
                    file = "kosong"
                    simpankirimchat(instance_key, jid, id_user, message, messageType, 'terima', file, 'pending', id_pesan, timestamptodate(timestamp), instance_key)

                }



            }

        }

        // console.log('replying to', m.messages[0].key.remoteJid)
        // await session[[instance_key]].sendMessage(m.messages[0].key.remoteJid, { text: 'Hello there!' })
    })

    session[[instance_key]].ev.on('creds.update', session_connection[[instance_key]].saveState);
}
