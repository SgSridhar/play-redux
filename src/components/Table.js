import React from 'react'
import {connect} from 'react-redux'
import {requestFollowers} from "../actions/users";

class Table extends React.Component {
	componentWillMount() {
		this.props.onComponentWillMount()
	}

	render() {
		return (
			<table className="Table">
				<thead>
				<tr>
					{this.props.columns.map((col) => {
						return (
							<th key={col.id}>{col.label}</th>
						)
					})}
				</tr>
				</thead>
				<tbody>
				{this.props.data.map((user) => {
					return (
						<tr key={user.login}>
							<td>{user.login}</td>
							<td>{user.followersCount.count}</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return ({
		onComponentWillMount: () => {
			requestFollowers(ownProps.data)
		}
	})
}

export default connect(null, mapDispatchToProps)(Table)
