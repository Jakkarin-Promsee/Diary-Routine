async function LoadLogout() {
    try {
        const response = await fetch(`${config.API_URL}/api/auth/logout`, {
            method: "GET"
        });

        // Handle response
        if (response.ok) {
            const data = await response.json();
            document.getElementById("responseMessage").innerText = "Success: " + data.message;
        } else {
            const data = await response.json();
            document.getElementById("responseMessage").innerText = "Unsuccess: " + data.message;
        }
    } catch (error) {
        console.error("Error Loading Profile:", error);
        document.getElementById("responseMessage").innerText = "Error Loading Profile: " + error;
    }
}

document.addEventListener('DOMContentLoaded', LoadLogout);