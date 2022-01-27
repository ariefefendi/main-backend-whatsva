var cron = require('node-cron');
const { exec } = require("child_process");

// running setiap 5 detik
// * - 1 ( untuk detik )
// * - 2 ( untuk menit )
// * - 3 ( untuk jam )
// * - 4 ( untuk hari dalam bulan)
// * - 5 ( untuk bulan )
// * - 6 ( untuk hari dalam minggu )
// cron.schedule('*/5 * * * * *', () => {
//     console.log('cron logs running a task every 5 seconds');
// });

cron.schedule('1 */15 * * * *', () => {
    console.log('running job restart every 15 minit');
    // /src/var/www/whatsva_pw/server.js

    exec("pm2 restart index.js", (error, stdout, stderr) => {
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

});
