const http = require('http');
const url = require('url');

function handler(req, res) {
  const parsedUrl = url.parse(req.url, true);

  res.setHeader('x-server-date', new Date());

  if (parsedUrl.pathname === '/') { //check if homepage
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello from the web server!');
    // res.write(parsedUrl);
    return res.end();
  } else if (parsedUrl.pathname === '/time') { // return date
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(new Date().toString());
    return res.end();
  } else if(parsedUrl.pathname === '/hello') { // get name query
    const name = parsedUrl.query.name;
    if (!name) { // no name
      res.writeHead(400, {'Content-Type': 'text/plain'});
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Hello ${name}`);
    return res.end();
  } else if (parsedUrl.pathname.startsWith('/user/')){ // get user with parameter
    const regex = new RegExp('\/user\/(.+)');
    const match = regex.exec(parsedUrl.pathname);
    if (!match || !match[1]) { // no user entered
      res.writeHead(400, {'Content-Type': 'text/plain'});
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Userprofile of ${match[1]}`);
    return res.end();
  } else { // not valid request: 404 error
    res.writeHead(404, {'Content-Type': 'text/plain'});
    return res.end();
  }

}

const server = http.createServer(handler);

server.listen(3000);
