var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/counter.tmpl.html');
});

app.use('/build', express.static('./build'));

app.listen(80, null, function() {
	console.log('LISTENING!');
});
