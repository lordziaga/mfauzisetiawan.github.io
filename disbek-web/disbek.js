var fs = require('fs');
var http = require('http');
const host = '127.0.0.1';
const port = 6006;


http.createServer(function (request, response) {

    
    fs.readFile('index.html', (err, data) => {
        if (err) throw err;
               
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

}).listen(6006);
    console.log(`server menyala di hhtp//${host}:${port}/ . . .`);
