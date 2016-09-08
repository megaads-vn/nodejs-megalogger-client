var jwt = require('jsonwebtoken');
var http = require('http');
var os = require('os');
var interfaces = os.networkInterfaces();
module.exports = MegaLogger;
function MegaLogger(initData) {
    this.source = initData.source;
    this.token = jwt.sign({audience: initData.apiKey}, 'megalogger', {expiresIn: 30}, {algorithm: 'HS512'});
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    var ip = '';
    if (addresses.length > 0) {
        ip = addresses[0];
    }
    this.log = function (data, level) {
        var d = new Date();
        var n = d.getTime();
        var dataLog = {
            title: data.title,
            token: this.token,
            type: 'request',
            data: data.body,
            level: level,
            meta: {
                language: 'Nodejs',
                ip: ip
            },
            time: n,
            source: this.source

        };
        var strData = JSON.stringify(dataLog);
        var options = {
            host: 'hamster.megaads.vn',
            port: 8161,
            path: '/api/message?destination=queue://logger',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(strData)
            }
        };

        var req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        req.write(strData);
        req.end();
    };
}
