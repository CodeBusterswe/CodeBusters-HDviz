import logo from "./logo/logo.svg"
import "../../style.css"

const Header = () => {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1>HDViz</h1>
		</header>
	)
}
export default Header
