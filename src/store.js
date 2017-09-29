import {createStore, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import {INIT_STATE, rootEpic, rootReducer} from "./reducers/rootReducer";

let store

export function getStore() {
	if (store) {
		return store
	}

	store = createStore(
		rootReducer, INIT_STATE, applyMiddleware(createEpicMiddleware(rootEpic))
	)

	window.store = store

	return store
}
