import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'

import Header from './components/Header/Top'
import Home from './page/Home/Home'
import Chat from './page/Chat/Chat'
import Footer from './components/Footer/Bottom'

import { Layout } from 'antd'
import './App.css'

const socket = socketIO.connect('http://localhost:5001')

function App() {
	return (
		<Layout className='layout'>
			<Header />
			<Routes>
				<Route path='/' element={<Home socket={socket} />} />
				<Route path='/chat' element={<Chat socket={socket} />} />
			</Routes>
			<Footer />
		</Layout>
	)
}

export default App
