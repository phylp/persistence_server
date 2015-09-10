var http = require('http');
var fs = require('fs');

var counter = 0;
var server = http.createServer(function(req, res){
	if(req.url === '/upload' && req.method === 'POST'){
		counter += 1;
		req.on('data', function(data){
			var postData = JSON.parse(data);
			fs.writeFile(__dirname + '/json_logs/' + counter + '.json', data);
			res.end();
		});
	}

	if(req.method === 'GET'){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('you made a get request');
		res.end();
	}
});
server.listen(3002);