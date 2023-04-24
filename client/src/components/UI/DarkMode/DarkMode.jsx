import styles from './DarkMode.module.css'

const DarkMode = () => {
	return (
		<div className={styles.dark_mode}>
			<input
				className={styles.dark_mode_input}
				type='checkbox'
				id='darkmode-toggle'
			/>
			<label
				className={styles.dark_mode_label}
				htmlFor='darkmode-toggle'
			></label>
		</div>
	)
}

export default DarkMode
