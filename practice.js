const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<body><h1>Hey, welcom to the loscoles romanos family</h1></body>');

        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add a user</button></form>')

        res.write('<a href="/users">send to user</a><br>');
        res.write('<a href="/create-user">send to create-user</a>');
        res.write('</html>');
        return res.end();
    };

    if (url === '/users') {
        res.write('<html>');
        res.write('<body><ul><li>User 1: Bogdan</li><li>User 2: Illya</li><li>User 3: Anna</li></ul></body>');
        res.write('<a href="/">return to main</a><br>');
        res.write('</html>');
        return res.end();
    };

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    };
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end();
});

server.listen(3000);