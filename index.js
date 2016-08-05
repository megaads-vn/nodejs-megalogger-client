var jwt = require('jsonwebtoken');
var http = require('http');

function log(apiKey, data, level, source) {
    var token = jwt.sign({audience: apiKey}, 'megadev_secret', {algorithm: 'HS512'});
    var d = new Date();
    var n = d.getTime();
    var dataLog = {
        token: token,
        type: 'request',
        data: data,
        level: level,
        meta: {
            language: 'Javascript'
        },
        time: n,
        source: source

    };
    var strData = JSON.stringify(dataLog);
    var options = {
        host: '192.168.1.172',
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
}
module.exports = {
    log: log
};