import {Observable} from 'rxjs'
import {STATUS_ERROR, STATUS_LOADED, STATUS_LOADING, TYPE_USER} from "../constants";
import {
	RECEIVE_FOLLOWERS, RECEIVE_FOLLOWERS_ERROR,
	RECEIVE_USERS, RECEIVE_USERS_ERROR, receiveFollowers, receiveFollowersError, receiveUsers, receiveUsersError,
	REQUEST_FOLLOWERS,
	REQUEST_USERS,
} from "../actions/users";
import {getFollowers, getUsers} from "../api";

export const INIT_USERS = {
	status: STATUS_LOADING,
	data: null
}

export function users(state = INIT_USERS, action) {
	switch(action.type) {
		case RECEIVE_USERS:
			return {...state, status: STATUS_LOADED, data: action.payload.users.reduce((acc, user) => {
				if(user.type === TYPE_USER) {
					acc[user.login] = {
						...user,
						followersCount: {
							status: STATUS_LOADING,
							count: 0,
						},
					}
				}
				return acc
			}, {})}
		case RECEIVE_USERS_ERROR:
			return {...state, status: STATUS_ERROR, data: action.payload.error}
		case RECEIVE_FOLLOWERS:
			return {...state, data: {
				...state.data,
				[action.payload.user]: {
					...state.data[user],
					followersCount: action.payload.followers.length
				}
			}}
		// case RECEIVE_FOLLOWERS_ERROR:
		// 	console.log(action)
		// 	return state
	}
	return state
}

export function usersEpic(action$) {
	return action$
		.ofType(REQUEST_USERS)
		.switchMap(() => getUsers()
			.map(({response: users}) => receiveUsers(users))
			.catch((err) => Observable.of(receiveUsersError(err)))
		)
}

export function followersEpic(action$) {
	return action$
		.ofType(REQUEST_FOLLOWERS)
		.switchMap((action) => {
			return Observable.from(action.payload.users)
		})
		.concatMap((user) => getFollowers(user['followers_url'])
			.map(({response: followers}) => receiveFollowers(followers, user.login))
			.catch((err) => Observable.of(receiveFollowersError(err, user.login)))
		)
}
