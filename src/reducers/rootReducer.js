import {combineReducers} from 'redux'
import {combineEpics} from 'redux-observable'
import {followersEpic, INIT_USERS, users, usersEpic} from './users'

export const rootReducer = combineReducers({
	users
})

export const INIT_STATE = {
	users: INIT_USERS
}

export const rootEpic = combineEpics(usersEpic, followersEpic)
