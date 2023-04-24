import styles from './Body.module.css'

const Body = ({ messages, status }) => {
	return (
		<div className={styles.container}>
			{messages.map(el =>
				el.name === localStorage.getItem('user') ? (
					<div className={styles.chats} key={el.id}>
						<p className={styles.senderName}>Вы</p>
						<div className={styles.messageSender}>
							<p>{el.text}</p>
						</div>
					</div>
				) : (
					<div className={styles.chats} key={el.id}>
						<p className={styles.recipientName}>{el.name}</p>
						<div className={styles.messageRecipient}>
							<p>{el.text}</p>
						</div>
					</div>
				)
			)}
			<div className={styles.status}>
				<p>{status}</p>
			</div>
		</div>
	)
}
export default Body
