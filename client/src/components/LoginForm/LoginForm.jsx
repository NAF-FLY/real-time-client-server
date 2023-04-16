import { UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'

const LoginForm = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState('')
	const [form] = Form.useForm()
	const [, forceUpdate] = useState({})

	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({})
	}, [])
	const onFinish = values => {
		localStorage.setItem('user', user)
		navigate('/chat')
	}
	return (
		<Form
			form={form}
			name='vertical_login'
			layout='vertical'
			onFinish={onFinish}
			className={styles.form}
		>
			<Divider>Зайти в чат</Divider>
			<Form.Item
				name='username'
				rules={[
					{
						required: true,
						message: 'Введите ваш никнейм!',
					},
				]}
			>
				<Input
					prefix={<UserOutlined className='site-form-item-icon' />}
					placeholder='Никнейм'
					onChange={e => setUser(e.target.value)}
				/>
			</Form.Item>
			<Form.Item shouldUpdate>
				{() => (
					<Button
						type='primary'
						htmlType='submit'
						disabled={
							!form.isFieldsTouched(true) ||
							!!form.getFieldsError().filter(({ errors }) => errors.length)
								.length
						}
						className={styles.btn}
					>
						Войти
					</Button>
				)}
			</Form.Item>
		</Form>
	)
}
export default LoginForm
