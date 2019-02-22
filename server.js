var express = require('express')
var path = require('path')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)

app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

app.use(express.static('.'))

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`)
})
