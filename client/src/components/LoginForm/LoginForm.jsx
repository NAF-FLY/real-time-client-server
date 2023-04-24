import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const LoginForm = ({ socket }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		localStorage.setItem('user', user)
		socket.emit('newUser', { user, socketID: socket.id })
		navigate('/chat')
	}

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-2xl'>
				<img
					className='mx-auto h-10 w-auto'
					src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
					alt='Your Company'
				/>
				<h2 className='mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Зайти в чат
				</h2>
			</div>

			<div className='mt-6 sm:mx-auto sm:w-56 sm:max-w-sm'>
				<form className='space-y-6' onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor='user'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Имя пользователя
						</label>
						<div className='mt-2'>
							<input
								id='user'
								name='user'
								type='text'
								required
								className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								onChange={e => setUser(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default LoginForm
