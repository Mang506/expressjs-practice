const http = require('http');
const url = require('url');

function handler(req, res) {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') { //check if homepage
    res.writeHead(200, {contentType: 'text'});
    res.write('Hello from the web server!');
    res.end();
  } else { // not homepage: 404 error
    res.writeHead(404, {contentType: 'text/plain'});
    res.end();
  }

}

const server = http.createServer(handler);

server.listen(3000);
