import {Observable} from 'rxjs'

function ajax$(config) {
	return Observable.ajax({
		...config,
		dataType: 'jsonp',
		responseType: 'json',
		headers: {'Content-Type': 'application/json'},
		timeout: 5 * 1000,
	})
}

function getAjax$(url) {
	return ajax$({url, method: 'GET'})
}

export const getUsers = function getUsers() {
	return getAjax$('https://api.github.com/users')
}

export const getFollowers = function getFollowers(url) {
	return getAjax$(url)
}
