const server = require("hhtp").createServer()

server.on("request", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.writeHead(200);

    res.end("Hello");
})

server.listen(3001, ()=> {
    console.log("server on");
})