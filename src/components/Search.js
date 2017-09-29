import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import Input from "./Input";
import {requestUsers} from "../actions/users";
import {STATUS_LOADING} from "../constants";
import Table from "./Table";

class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			search: ''
		}

		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
		this.props.onComponentWillMount()
	}

	handleChange(e) {
		this.setState({
			search: e.target.value
		})
	}

	render() {
		if (this.props.users.status === STATUS_LOADING) {
			return (
				<div className="Search">
					Loading ....
				</div>
			)
		}

		const columns = [{
			id: 'name',
			label: 'Name'
		}, {
			id: 'followersCount',
			label: 'Followers Count'
		}]

		const data = this.props.users.data

		const filteredData = (Object.values(data)).filter((u) => u.login.match(new RegExp(this.state.search, 'gi')))

		return (
			<div className="Search">
				<div>
					<div>Search</div>
					<Input onChange={this.handleChange} value={this.state.search} />
				</div>
				<Table columns={columns} data={R.sortBy(R.prop('followersCount'), Object.values(filteredData))} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.users
})

const mapDispatchToProps = (dispatch) => ({
	onComponentWillMount: () => {
		dispatch(requestUsers())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
