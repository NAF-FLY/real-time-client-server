const express = require('express')
const app = express() // экземпляр экспресса
const PORT = 5001

const http = require('http').Server(app)
const cors = require('cors')
const webSocket = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:5173',
	},
})

app.get('api', (req, res) => {
	res.json({
		message: 'Hello',
	})
})

const users = []

webSocket.on('connection', socket => {
	console.log(`${socket.id} user connected`)
	socket.on('message', data => {
		webSocket.emit('response', data)
	})
	socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data))
	socket.on('newUser', data => {
		users.push(data)
		webSocket.emit('responseNewUser', users)
	})
	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnect`)
	})
})

http.listen(PORT, () => {
	console.log('Server working')
})
