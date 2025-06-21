const http = require('http');

const server = http.createServer((req,res) => {
    console.log("URL hit:", req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Siddharth, your server is live');
});

server.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
})