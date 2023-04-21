import { UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem'
import { createElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Body from '../../components/Body/Body'
import Message from '../../components/Message/Message'
const { Content, Sider } = Layout

const Chat = ({ socket }) => {
	const [users, setUsers] = useState([])
	const [status, setStatus] = useState('')

	useEffect(() => {
		socket.on('responseNewUser', data => setUsers(data))
	}, [socket, users])

	const items2 = [UserOutlined].map((icon, index) => {
		const key = String(index + 1)
		return {
			key: `sub${key}`,
			icon: createElement(icon),
			label: `Комната №${key}`,
			children: users.map((el, j) => {
				const subKey = index * 4 + j + 1
				return {
					key: subKey,
					label: el.user,
				}
			}),
		}
	})

	const [messages, setMessages] = useState([])
	const navigate = useNavigate()
	const handleLeave = () => {
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

	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Content style={{ padding: '0 10em' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<BreadcrumbItem>Home</BreadcrumbItem>
					<BreadcrumbItem>Chat</BreadcrumbItem>
				</Breadcrumb>
				<Button
					type='primary'
					style={{ background: '#f5222d' }}
					onClick={handleLeave}
				>
					Покинуть чат
				</Button>
			</div>
			<Layout style={{ padding: '24px 0', background: colorBgContainer }}>
				<Sider style={{ background: colorBgContainer }} width={200}>
					<Menu
						mode='inline'
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{ height: '100%' }}
						items={items2}
					/>
				</Sider>
				<Content
					style={{
						padding: '0 24px',
						height: '70vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<Body messages={messages} status={status} />
					<Message socket={socket} />
				</Content>
			</Layout>
		</Content>
	)
}

export default Chat
