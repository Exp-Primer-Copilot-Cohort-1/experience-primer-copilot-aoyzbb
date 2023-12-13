// Create web server
// Create a web server that can respond to requests for /comments.json
// with a JSON string of comments back to the browser.
// Ex:
//     GET /comments.json
//     [
//         {"name": "Some Guy", "comment": "i dont like your haircut"},
//         {"name": "Some Gal", "comment": "you smell"},
//         {"name": "Other Guy", "comment": "i like your haircut"}
//     ]
//
// You'll need to use fs.readFile() to read the contents of comments.json
// into your program and JSON.parse() to convert it to a JavaScript object.
//
// You can send JSON data back to the browser with res.json(object).
//
// Remember to set the Content-Type header to application/json in your
// response so the browser knows to treat the response as JSON.
//
// Finally, remember to send a 404 response code if a resource is not found.
//
// -------------------------------------------------------------------------------

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(req, res) {
    // console.log(req.url);
    // console.log(url.parse(req.url));
    // console.log(url.parse(req.url, true));
    // console.log(url.parse(req.url, true).pathname);
    // console.log(url.parse(req.url, true).query);
    // console.log(url.parse(req.url, true).query.name);
    // console.log(url.parse(req.url, true).query.comment);

    const pathname = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;
    const name = query.name;
    const comment = query.comment;

    if (pathname === '/comments.json') {
        fs.readFile('comments.json', 'utf8', function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/form') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Comments</title>
                </head>