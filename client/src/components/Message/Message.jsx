import { Button, Input, Space } from 'antd'
import { useState } from 'react'
import styles from './Message.module.css'

const Message = ({ socket }) => {
	const [message, setMessage] = useState('')

	const handleSend = e => {
		e.preventDefault()
		if (message.trim() && localStorage.getItem('user')) {
			socket.emit('message', {
				text: message,
				name: localStorage.getItem('user'),
				id: `${socket.id}-${Math.random()}`,
				socketID: socket.id,
			})
		}
		setMessage('')
	}
	return (
		<div className={styles.messageBlock}>
			<form className={styles.form} onSubmit={handleSend}>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						placeholder='Введите ваше сообщение'
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<Button type='primary' onClick={handleSend}>
						Отправить
					</Button>
				</Space.Compact>
			</form>
		</div>
	)
}
export default Message
