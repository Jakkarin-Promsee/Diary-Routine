document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    // Prepare data for API
    const formData = {
        username: name,
        password: password
    };

    try {
        // Send POST request to API
        const response = await fetch(`${config.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Handle response
        const data = await response.json();

        if (response.ok) {
            document.getElementById("responseMessage").innerText = "Success: " + data.message;
            document.getElementById("loginForm").reset(); // Reset form
        } else {
            document.getElementById("responseMessage").innerText = "Unsuccess: " + data.message;
        }
    } catch (error) {
        console.error("Error submitting form:", JSON.parse(error.message));
        document.getElementById("responseMessage").innerText = "Error submitting form: " + error;
    }
});