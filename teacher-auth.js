
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // TEACHER REGISTRATION
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const confirmPassword =
                document.getElementById("confirmPassword").value;
            const message = document.getElementById("message");

            if (!name || !email || !password || !confirmPassword) {
                message.textContent = "Please fill in all fields.";
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                message.textContent = "Please enter a valid email address.";
                return;
            }

            if (password.length < 8) {
                message.textContent =
                    "Password must be at least 8 characters.";
                return;
            }

            if (password !== confirmPassword) {
                message.textContent = "Passwords do not match.";
                return;
            }

            const teachers = JSON.parse(
                localStorage.getItem("skillConnectTeachers") || "[]"
            );

            if (teachers.some(teacher => teacher.email === email)) {
                message.textContent =
                    "This teacher account already exists. Please log in.";
                return;
            }

            teachers.push({ name, email, password });

            localStorage.setItem(
                "skillConnectTeachers",
                JSON.stringify(teachers)
            );

            message.textContent = "Registration successful! Opening login...";

            window.location.href = "teacher-login.html";
        });
    }

    // TEACHER LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value
                .trim().toLowerCase();
            const password = document.getElementById("password").value;
            const message = document.getElementById("message");

            const teachers = JSON.parse(
                localStorage.getItem("skillConnectTeachers") || "[]"
            );

            const teacher = teachers.find(
                item => item.email === email && item.password === password
            );

            if (!teacher) {
                message.textContent =
                    "Invalid teacher email or password. Register first if you don't have an account.";
                return;
            }

            sessionStorage.setItem(
                "skillConnectCurrentUser",
                JSON.stringify({
                    name: teacher.name,
                    email: teacher.email,
                    role: "teacher"
                })
            );

            window.location.href = "teacher-dashboard.html";
        });
    }
});
