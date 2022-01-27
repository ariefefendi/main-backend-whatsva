
exports.add = (req, res) => {

    var webhook_url = req.body.webhook_url
    var instance_key = req.body.instance_key
    if (!webhook_url) {
        res.json({
            success: false,
            message: "webhook_url empty"
        })
    } else if (!instance_key) {
        res.json({
            success: false,
            message: "instance_key empty"
        })
    } else {
        var sqlcek = `select * from webhook where instance_key='${instance_key}' and webhook_url='${webhook_url}' and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: false,
                    message: "Webhook Already exists"
                })
            } else {
               
                conn.query(`insert into webhook set instance_key='${instance_key}',webhook_url='${webhook_url}',status='1'`, (err) => {
                    if (err) console.log(err)
                })
                res.json({ success: true, message: "adding webhook success", data: req.body })
            }
        })

    }

}
exports.detail = (req, res) => {
    var webhook_id = req.body.webhook_id
    if (!webhook_id) {
        res.json({
            success: false,
            message: "webhook_id key empty"
        })
    } else {
        var sqlcek = `select * from webhook where id='${webhook_id}' and status='1'`
        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "Webhook data",
                    data: results.shift()
                })
            } else {
                res.json({
                    success: false,
                    message: "Webhook Not Found"
                })
            }
        })
    }
}
exports.list = (req, res) => {
    var instance_key = req.body.instance_key
    if (!instance_key) {
        res.json({
            success: false,
            message: "instance_key empty"
        })
    } else {
        var sqlcek = `select * from webhook where instance_key='${instance_key}' and status='1'`

        conn.query(sqlcek, (err, results) => {
            if (err) console.log(err)
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "List Webhook",
                    data: results
                })
            } else {
                res.json({
                    success: false,
                    message: "Webhook Not Found"
                })
            }
        })
    }
}
exports.delete = (req, res) => {
    var webhook_id = req.body.webhook_id
    if (!webhook_id) {
        res.json({
            success: false,
            message: "webhook_id key empty"
        })
    } else {
     
        // console.log("dirname : "+__dirname+'/../../sessions/'+instance_key+".json")
        conn.query(`update webhook set status='0' where id='${webhook_id}'`)
        res.json({
            success: true,
            message: "delete webhook success"
        })
    }
}