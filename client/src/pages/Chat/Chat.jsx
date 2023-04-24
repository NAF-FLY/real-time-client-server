// import { UserOutlined } from '@ant-design/icons'
// import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
// import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
// import { createElement, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Body from '../../components/Body/Body'
import Message from '../../components/Message/Message'
// const { Content, Sider } = Layout

import styles from './Chat.module.css'
import { useNavigate } from 'react-router-dom'

// const Chat = ({ socket }) => {
// 	const [users, setUsers] = useState([])
// 	const [status, setStatus] = useState('')

// 	useEffect(() => {
// 		socket.on('responseNewUser', data => setUsers(data))
// 	}, [socket, users])

// 	const items2 = [UserOutlined].map((icon, index) => {
// 		const key = String(index + 1)
// 		return {
// 			key: `sub${key}`,
// 			icon: createElement(icon),
// 			label: `Комната №${key}`,
// 			children: users.map((el, j) => {
// 				const subKey = index * 4 + j + 1
// 				return {
// 					key: subKey,
// 					label: el.user,
// 				}
// 			}),
// 		}
// 	})

// 	const [messages, setMessages] = useState([])
// 	const navigate = useNavigate()

// 	useEffect(() => {
// 		socket.on('responseLeaveUser', data => setUsers(data))
// 	}, [socket, users])

// 	const handleLeave = () => {
// 		socket.emit('leaveUser', { user: localStorage.getItem('user') , socketID: socket.id })
// 		localStorage.removeItem('user')
// 		navigate('/')
// 	}

// 	useEffect(() => {
// 		socket.on('response', data => setMessages([...messages, data]))
// 	}, [socket, messages])

// 	useEffect(() => {
// 		socket.on('responseTyping', data => {
// 			setStatus(data)
// 			setTimeout(() => setStatus(''), 1000)
// 		})
// 	}, [socket])

// 	const {
// 		token: { colorBgContainer },
// 	} = theme.useToken()

// 	return (
// 		<Content style={{ padding: '0 10em' }}>
// 			<div
// 				style={{
// 					display: 'flex',
// 					justifyContent: 'space-between',
// 					alignItems: 'center',
// 				}}
// 			>
// 				<Breadcrumb style={{ margin: '16px 0' }}>
// 					<BreadcrumbItem>Home</BreadcrumbItem>
// 					<BreadcrumbItem>Chat</BreadcrumbItem>
// 				</Breadcrumb>
// 				<Button
// 					type='primary'
// 					style={{ background: '#f5222d' }}
// 					onClick={handleLeave}
// 				>
// 					Покинуть чат
// 				</Button>
// 			</div>
// 			<Layout style={{ padding: '24px 0', background: colorBgContainer }}>
// 				<Sider style={{ background: colorBgContainer }} width={200}>
// 					<Menu
// 						mode='inline'
// 						defaultSelectedKeys={['1']}
// 						defaultOpenKeys={['sub1']}
// 						style={{ height: '100%' }}
// 						items={items2}
// 					/>
// 				</Sider>
// 				<Content
// 					style={{
// 						padding: '0 24px',
// 						height: '70vh',
// 						display: 'flex',
// 						flexDirection: 'column',
// 						justifyContent: 'space-between',
// 					}}
// 				>
// 					<Body messages={messages} status={status} />
// 					<Message socket={socket} />
// 				</Content>
// 			</Layout>
// 		</Content>
// 	)
// }

// export default Chat

const Chat = ({ socket, isSidebarOpen }) => {
	const [users, setUsers] = useState([])
	const [status, setStatus] = useState('')
	const [messages, setMessages] = useState([])
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		socket.on('responseLeaveUser', data => setUsers(data))
	}, [socket, users])

	const openDropdown = () => setIsDropdownOpen(!isDropdownOpen)

	const handleLeave = () => {
		socket.emit('leaveUser', {
			user: localStorage.getItem('user'),
			socketID: socket.id,
		})
		localStorage.removeItem('user')
		navigate('/')
	}

	useEffect(() => {
		socket.on('response', data => setMessages([...messages, data]))
	}, [socket, messages])

	useEffect(() => {
		socket.on('responseTyping', data => {
			setStatus(data)
			setTimeout(() => setStatus(''), 1000)
		})
	}, [socket])

	useEffect(() => {
		socket.on('responseNewUser', data => setUsers(data))
	}, [socket, users])
	return (
		<>
			<aside
				id='logo-sidebar'
				className={`${
					isSidebarOpen ? 'transform-none' : '-translate-x-full'
				} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'`}
				aria-label='Sidebar'
			>
				<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between'>
					<ul className='space-y-2 font-medium'>
						<li>
							<button
								type='button'
								className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-example'
								data-collapse-toggle='dropdown-example'
								onClick={openDropdown}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='w-6 h-6'
								>
									<path
										fillRule='evenodd'
										d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
										clipRule='evenodd'
									/>
								</svg>
								<span className='flex-1 ml-3 text-left whitespace-nowrap'>
									Пользователи
								</span>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</button>
							<ul
								id='dropdown-example'
								className={`${isDropdownOpen ? 'hidden' : ''} py-2 space-y-2`}
							>
								{users.map(el => (
									<li key={`${el.socketID} ${Math.random()}`}>
										<span
											href='#'
											className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
										>
											{el.user}
										</span>
									</li>
								))}
							</ul>
						</li>
					</ul>
					<div className='flex flex-col gap-4'>
						<button
							type='button'
							className='rounded-md bg-red-600 text-white p-2 hover:bg-red-700'
							onClick={handleLeave}
						>
							Покинуть чат
						</button>
						<h2 className='text-sm text-white text-center'>
							MSTU "STANKIN" ©2023 Created by NAF-FLY (Patsyuk V.)
						</h2>
					</div>
				</div>
			</aside>
			<div className={`${styles.body} sm:px-3 sm:py-16 h-full sm:ml-64`}>
				<Body messages={messages} status={status} />
				<Message socket={socket} />
			</div>
		</>
	)
}
export default Chat
