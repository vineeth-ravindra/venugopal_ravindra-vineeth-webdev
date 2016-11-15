var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
require("./assignment/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = 3000;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

