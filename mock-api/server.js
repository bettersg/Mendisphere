// refer to https://stackoverflow.com/questions/36836424/cant-watch-multiple-files-with-json-server

/*
To run service:
1. Open terminal
2. Go to mock-api directory
3. run command "node server.js"
4. navigate to browser (localhose:<port number>) or make api call from app.
*/

var jsonServer  = require('json-server')
var server      = jsonServer.create()
var router      = jsonServer.router(require('./db.js')())
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(8000, function () {
console.log('JSON Server is running')
})
Footer
