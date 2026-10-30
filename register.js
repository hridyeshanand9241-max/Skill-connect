function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    if (!isValidEmail(email)) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
}
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    const accounts = JSON.parse(
        localStorage.getItem("skillConnectAccounts") || "[]"
    );

    const exists = accounts.some(function (account) {
        return account.email === email;
    });

    if (exists) {
        message.textContent = "This email is already registered. Please log in.";
        message.style.color = "red";
        return;
    }

    // Save the new account
    accounts.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem(
        "skillConnectAccounts",
        JSON.stringify(accounts)
    );

sessionStorage.setItem(
    "skillConnectCurrentUser",
    JSON.stringify({
        name: name,
        email: email,
        role: "student"
    })
);

    // Open the study profile page
    window.location.href = "study-profile.html";
});
