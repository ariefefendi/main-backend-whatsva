
const express = require('express'),
    app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app)
const mysql = require('mysql');

app.set('port', 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
global.session = []
global.session_connection = []
global.data_session = []
global.domain_server = 'http://servicewa.whusnet.com/';

global.myclient = []
global.midomain = []
global.base_dir = __dirname;
global.statet = []
global.saveStatet = []
global.contacts = []
global.multidevice_status = []



global.__basedir = __dirname;
app.use('/assets', express.static(__dirname + '/files'));

var db_config = {
    host: 'localhost',
    user: 'whusnet_whatsva',
    password: 'W*yw358en',
    database: 'db_backend_whatsva',
    charset: "utf8mb4"
};
function handleDisconnect() {
    conn = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.
    conn.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            exec("sudo /etc/init.d/mysql restart", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    conn.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

require('./route')(app);
// require('./cronjob_restart');
http.listen(app.get('port'), "0.0.0.0", function () {
    console.log('Express server on port ' + app.get('port'));
})
