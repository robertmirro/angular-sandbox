var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(9000);

console.log('Listening on port 9000');