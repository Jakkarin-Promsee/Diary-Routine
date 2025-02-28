document.getElementById("changePasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect data from form
    const password = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    // Prepare data for API
    const formData = {
        password,
        newPassword
    }

    try {
        const response = await fetch(`${config.API_URL}/api/auth/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        // Handle response
        if (response.ok) {
            const data = await response.json();

            document.getElementById("responseMessage").innerText = "Success: " + data.message;
            document.getElementById("changePasswordForm").reset(); // Reset form
        } else {
            const data = await response.json();

            document.getElementById("responseMessage").innerText = "Unsuccess: " + data.message;
        }
    } catch {
        console.error("Error submitting form:", error.message);
        document.getElementById("responseMessage").innerText = "Error submitting form: " + error.message;
    }
})