// Debounce function will be used to send request only when user stops typing
// Must be called each time the user types something
const debounce = (func, delay = 1000) => {
	let timeOutId;
	// debounce will retur another function
	return (...args) => {
		// Check if timeOutId is already set as something
		if (timeOutId) {
			// Will stop setTimeOut only if timeOutId is already set
			clearTimeout(timeOutId);
		}
		// Initiate setTimeout. If the user doesn't type anything else, the setTimeOut won't be stopped by the clearTimeOut
		timeOutId = setTimeout(() => {
			// apply will keep track of how many args are being passed
			// func will be the function passed as debounce argument. Will execute
			// delay will default to 1000ms or passed as debounce argument
			func.apply(null, args);
		}, delay);
	};
};
