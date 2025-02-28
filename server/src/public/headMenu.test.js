function LoadHeadMenu() {
    document.getElementById("headMenu").innerHTML = `
    <div class="text-white flex justify-center pt-6 gap-x-4">
        <a href="/static/register.test.html" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">Register</a>

        <a href="/static/login.test.html" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">Log in</a>

        <a href="/static/profile.test.html" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">Profile</a>

        <a href="/static/logout.test.html" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">Log out</a>
    </div>
    `
}

document.addEventListener('DOMContentLoaded', LoadHeadMenu);