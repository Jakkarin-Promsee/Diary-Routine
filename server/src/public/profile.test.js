async function LoadProfile() {
    try {
        const response = await fetch(`/api/auth/profile`, {
            method: "GET",
            credentials: "include", // Send cookies with request
        });

        // Handle response
        const data = await response.json();

        if (response.ok) {
            document.getElementById("responseMessage").innerText = "Success: " + data.message;
            document.getElementById("responseMessage").innerText += `\nUser: ${JSON.stringify(data.user, null, 2)}`;

        } else {
            document.getElementById("responseMessage").innerText = "Unsuccess: " + data.message;
        }
    } catch (error) {
        console.error("Error Loading Profile:", error);
        document.getElementById("responseMessage").innerText = "Error Loading Profile: " + error;
    }
}

document.addEventListener('DOMContentLoaded', LoadProfile);