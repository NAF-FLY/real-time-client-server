import React, { useRef, useState } from 'react'
import styles from './Chat.module.css'

const WebSock = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')
	const socket = useRef()
	const [connected, setConnected] = useState(false)
	const [username, setUsername] = useState('')

	function connect() {
		socket.current = new WebSocket('ws://localhost:5500')
		socket.current.onopen = () => {
			setConnected(true)
			const message = {
				event: 'connection',
				username,
				id: Date.now(),
			}
			socket.current.send(JSON.stringify(message))
		}

		socket.current.onmessage = event => {
			const message = JSON.parse(event.data)
			setMessages(prev => [message, ...prev])
		}
		socket.current.onclose = () => {
			console.log('Socket закрыт')
		}
		socket.current.onerror = () => {
			console.log('Socket произошла ошибка')
		}
	}

	function disconnect() {
		setConnected(false)
		const message = {
			event: 'disconnection',
			username,
			id: Date.now(),
		}
		socket.current.send(JSON.stringify(message))
		socket.current.close()
	}

	const sendMessage = async () => {
		const message = {
			username,
			message: value,
			id: Date.now(),
			event: 'message',
		}
		socket.current.send(JSON.stringify(message))
		setValue('')
	}

	if (!connected) {
		return (
			<div className='center'>
				<div className={styles.form}>
					<div className={styles.bannerForm}>
						<svg
							width='39'
							height='38'
							viewBox='0 0 39 38'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='19.5' cy='19' r='19' fill='#BBEEFF' />
							<path
								d='M27.75 22.75C27.75 23.2362 27.5568 23.7025 27.213 24.0464C26.8692 24.3902 26.4029 24.5833 25.9167 24.5833H14.9167L11.25 28.25V13.5833C11.25 13.0971 11.4432 12.6308 11.787 12.287C12.1308 11.9432 12.5971 11.75 13.0833 11.75H25.9167C26.4029 11.75 26.8692 11.9432 27.213 12.287C27.5568 12.6308 27.75 13.0971 27.75 13.5833V22.75Z'
								stroke='#2D9CDB'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<div className={styles.bannerTextWrapper}>
							<h1 className={styles.headingBanner}>Чат</h1>
							<span className={styles.spanBannerText}>
								Разработан студентом <br /> группы АДМ-22-04 Пацюк Вадим
							</span>
						</div>
					</div>
					<div className={styles.sendForm}>
						<input
							value={username}
							onChange={e => setUsername(e.target.value)}
							type='text'
							placeholder='Введите ваше имя'
							className={styles.input}
						/>
						<button className={styles.sendBtn} onClick={connect}>
							Войти
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.center}>
			<div className={styles.form}>
				<div className={styles.topChat}>
					<h1 className={styles.heading}>Чат</h1>
					<button className={styles.leaveBtn} onClick={disconnect}>
						Выйти
					</button>
				</div>
				<div className={styles.chatMessage}>
					{messages.map(mess => (
						<div key={mess.id}>
							{mess.event === 'connection' ? (
								''
							) : (
								<div className={styles.message}>
									<span className={styles.username}>{mess.username}:</span>{' '}
									{mess.message}
								</div>
							)}
						</div>
					))}
				</div>
				<div className={styles.sendForm}>
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						type='text'
						className={styles.input}
						placeholder='Начните общение'
					/>{' '}
					<button className={styles.sendBtn} onClick={sendMessage}>
						Отправить
					</button>
				</div>
			</div>
			<div>
				{messages.map(mess => (
					<div key={mess.id}>
						{mess.event === 'connection' ? (
							<div className='connection_message' style={{ marginTop: 15 }}>
								Пользователь {mess.username} подключился
							</div>
						) : mess.event === 'disconnection' ? (
							<div className='connection_message' style={{ marginTop: 15 }}>
								Пользователь {mess.username} отключился
							</div>
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default WebSock
