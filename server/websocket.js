var WebSocketServer = new require('ws')

// подключённые клиенты
var clients = {}

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
	port: 5500,
})
webSocketServer.on('connection', function (ws) {
	var id = Date.now()
	clients[id] = ws
	console.log('новое соединение ' + id)

	ws.on('message', function (message) {
		console.log('получено сообщение ' + message)

		for (var key in clients) {
			clients[key].send(message)
		}
	})

	ws.on('close', function () {
		console.log('соединение закрыто ' + id)
		delete clients[id]
	})
})