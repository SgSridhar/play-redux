import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import Search from "./components/Search";
import {getStore} from "./store";

const App = () => {
	return (
		<Provider store={getStore()}>
			<div className="app">
				<Search/>
			</div>
		</Provider>
	)
}

ReactDOM.render(<App/>, document.getElementById('app'))
