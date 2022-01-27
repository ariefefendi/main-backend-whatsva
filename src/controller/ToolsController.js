// const { WaClient, MessageType } = require("mywava");
const mimeTypes = require('mime-types')
const fs = require('fs')
const { GetFilename, getmime } = require('./../helper/library')
const path = require('path')

exports.checkNumber = (req, res) => {
    var instance_key = req.body.instance_key
    var jid = req.body.jid

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    } else if (!jid) {
        res.json({
            success: false,
            message: "jid empty"
        })
    } else {
        var sqlcek = `select * from instance where instance_key='${instance_key}' and instance_status='connected' and status = '1'`

        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                const result = await session[[instance_key]].onWhatsApp(jid);
                console.log(result)
                if (!result.length > 0) {
                    res.json({
                        success: false,
                        message: "Number Not found"
                    })
                } else {
                    res.json({
                        success: true,
                        message: "Active number on whatsapp",
                        data: req.body
                    })
                }

            } else {
                res.json({
                    success: false,
                    message: "Instance Not Found"
                })
            }
        })
    }
}
exports.ListContact = (req, res) => {
    var instance_key = req.body.instance_key

    if (!instance_key) {
        res.json({
            success: false,
            message: "instance key empty"
        })
    }
     else {
        var sqlcek = `select * from tb_contact where instance_key='${instance_key}' and name not in('undefined','-')`

        conn.query(sqlcek, async (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "List Contact",
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
