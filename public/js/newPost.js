const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value.trim();

	if (title && content) {
		const response = await fetch(`/api/posts`, {
			method: "POST",
			body: JSON.stringify({ title, content }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to create project");
		}
	}
};

document.querySelector("#post").addEventListener("click", newFormHandler);
