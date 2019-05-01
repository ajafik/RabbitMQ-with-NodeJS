var express = require('express');
var router = express.Router();

var resp = function (res, data, code) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.writeHead(code || 200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(data));
};

router.get("/", (req, res) => {
    resp(res, {"description": 'RabbitMQ API', "version": "0.0.1"});
});

module.exports = router;