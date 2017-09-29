export const REQUEST_USERS = 'REQUEST_USERS'
export const REQUEST_FOLLOWERS = 'REQUEST_FOLLOWERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS'
export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'
export const RECEIVE_FOLLOWERS_ERROR = 'RECEIVE_FOLLOWERS_ERROR'

export const requestUsers = function requestUsers() {
	return {
		type: REQUEST_USERS
	}
}

export const receiveUsers = function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		payload: {users}
	}
}

export const receiveUsersError = function receiveUsersError(error) {
	return {
		type: RECEIVE_USERS_ERROR,
		payload: {error}
	}
}

export const requestFollowers = function requestFollowers(users) {
	return {
		type: REQUEST_FOLLOWERS,
		payload: {users}
	}
}

export const receiveFollowers = function receiveFollowers(followers, user) {
	return {
		type: RECEIVE_FOLLOWERS,
		payload: {followers, user}
	}
}

export const receiveFollowersError = function receiveFollowersError(error, user) {
	return {
		type: RECEIVE_FOLLOWERS_ERROR,
		payload: {error, user}
	}
}
