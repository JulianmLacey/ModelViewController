const loginEventHandler = async (event) => {
	event.preventDefault();
	const username = document.querySelector("#username").value.trim();
	const password = document.querySelector("#password").value.trim();
	console.log(username, password);
	if (username && password) {
		// Send a POST request to the API endpoint
		const response = await fetch("/api/user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			document.location.replace("/profile");
		} else {
			alert(response.statusText);
		}
	}
	console.log(username, password);
};

const signupEventHandler = async (event) => {
	event.preventDefault();
	const username = document.querySelector("#username").value.trim();
	const password = document.querySelector("#password").value.trim();
	if (username && password) {
		// Send a POST request to the API endpoint
		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			serverRespose.innerHTML = response.statusText;
			document.location.replace("/homepage");
		} else {
			alert(response.statusText);
		}
	}
};

document.querySelector("#signup-submit").addEventListener("click", signupEventHandler);
document.querySelector("#login-submit").addEventListener("click", loginEventHandler);
