// Reusable function to render elements
// The argument must be an object for the propperties to destructured
const createAutoComplete = ({
	root,
	renderOption,
	onOptionSelect,
	inputValue,
	fetchData,
}) => {
	// Get the div from html and insert label, input and dropdown list
	// root will be a div in html file passed as a propperty when this function is called
	root.innerHTML = `
	<label><b>Search</b></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"</div> 
		</div>
	</div>
`;

	// Select html elements created inside the root div
	// Input
	const input = root.querySelector("input");
	// Div that will contain the dropdown list
	const dropdown = root.querySelector(".dropdown");
	// Item in the list
	const resultsWrapper = root.querySelector(".results");

	// Call fetchData function to get results and put it into html
	const onInput = async (event) => {
		// Select text from input and use it to fetch data
		const items = await fetchData(event.target.value);

		// Checks if there are no results
		if (!items.length) {
			// Hide the dropdown list
			dropdown.classList.remove("is-active");
			return;
		}

		// Clear the results for the new search
		resultsWrapper.innerHTML = "";
		// Show dropdown list
		dropdown.classList.add("is-active");
		// Iterate each item found in the search
		for (let item of items) {
			// Each item will be an anchor tag
			const option = document.createElement("a");

			// Add item to the dropdown list
			option.classList.add("dropdown-item");
			option.innerHTML = renderOption(item);

			// Listen to click on the item from the list
			option.addEventListener("click", () => {
				// Hide list
				dropdown.classList.remove("is-active");
				// Update input with clicked item name
				input.value = inputValue(item);
				// Call function to search this specific item
				onOptionSelect(item);
			});

			// Append item on the list (results)
			resultsWrapper.appendChild(option);
		}
	};

	// Will call onInput via debounce only when user stops Typing. See utils.js
	// Since "()" are being used, debounce will execute immediately and return it's value, which is unnusual for a callback. But in this case, debounce() is returning another function, which in turn will act as the callback for the event listener.
	input.addEventListener("input", debounce(onInput, 700));

	// Listen to click outside of list to hide the list
	document.addEventListener("click", (event) => {
		if (!root.contains(event.target)) {
			// Hide list
			dropdown.classList.remove("is-active");
		}
	});
};
