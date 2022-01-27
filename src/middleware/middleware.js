const {formatnumberindo} = require('../helper/library')
exports.formatnumber = (req,res,next)=>{
    req.body.jid = formatnumberindo(req.body.jid);
    next();
}
exports.cek_panel_key = (req, res, next) => {

    var key = req.body.panel_key
  
    console.log(key)
    let sql = `select * from user where apiKey = '${key}'`;
   conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
           next()
        } else {
            var data = {
                success: false,
                message: 'Panel Key not found, Please contact the developer to get the panel key'
            }
            res.send(data)
        }
    })
}
exports.validasi_group = (req,res)=>{
    var jid_group = req.body.jid_group
    
}