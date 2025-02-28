document.getElementById("forgetPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;

    // Prepare data for API
    const formData = {
        username,
        email,
        newPassword
    }

    try {
        // Send POST request to API
        const response = await fetch(`${config.API_URL}/api/auth/forget-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Handle response
        if (response.ok) {
            const data = await response.json();

            document.getElementById("responseMessage").innerText = "Success: " + data.message;
            document.getElementById("forgetPasswordForm").reset(); // Reset form
        } else {
            const data = await response.json();

            document.getElementById("responseMessage").innerText = "Unsuccess: " + data.message;
        }
    } catch (error) {
        console.error("Error submitting form:", error.message);
        document.getElementById("responseMessage").innerText = "Error submitting form: " + error.message;
    }
})