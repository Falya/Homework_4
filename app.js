'use strict';
function _async(gen) {
	let iterator;

	function doAsync(arg) {
		iterator = iterator || gen(arg);
		let result = iterator.next(arg);
		return result.done ? result.value : Promise.resolve(result.value).then(doAsync);
	}

	return doAsync;

}

function fetchUser(id) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(id+5);
		}, 1000);
	});
}

function fetchFriends(id) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(id);
		}, 1000);
	});
}

function* gen (id) {
	let user = (yield fetchUser(id)),
		friends = (yield fetchFriends(id));
	return {
		user,
		friends
	};
}

let fetchDatae = _async(gen);
fetchDatae(8).then(res => console.log(res));

