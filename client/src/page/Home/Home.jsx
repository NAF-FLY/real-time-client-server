import { Layout, theme } from 'antd'
import LoginForm from '../../components/LoginForm/LoginForm'

import styles from './Home.module.css'
const Home = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	return (
		<Layout className={styles.layout}>
			<LoginForm />
		</Layout>
	)
}
export default Home
