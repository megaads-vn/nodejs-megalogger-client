var jwt = require('jsonwebtoken');
var http = require('http');
module.exports = MegaLogger;
function MegaLogger(initData) {
    this.source = initData.source;
    this.token = jwt.sign({audience: initData.apiKey}, 'megalogger', {expiresIn: 30}, {algorithm: 'HS512'});

    this.log = function (data, level) {
        console.log(this.token);
        var d = new Date();
        var n = d.getTime();
        var dataLog = {
            token: this.token,
            type: 'request',
            data: data,
            level: level,
            meta: {
                language: 'Javascript'
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
