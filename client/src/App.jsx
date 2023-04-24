import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'

import Chat from './pages/Chat/Chat'
import Home from './pages/Home/Home'

import Header from './components/Layout/Header'

import { useState } from 'react'
import './styles/App.css'

const socket = socketIO.connect('http://localhost:5001')

function App() {
	const [users, setUsers] = useState([])
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	return (
		<div className='h-screen flex flex-col justify-between'>
			<Header
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Routes>
				<Route
					path='/'
					element={<Home socket={socket} users={users} setUsers={setUsers} />}
				/>
				<Route
					path='/chat'
					element={<Chat socket={socket} isSidebarOpen={isSidebarOpen} />}
				/>
			</Routes>
		</div>
	)
}

export default App
