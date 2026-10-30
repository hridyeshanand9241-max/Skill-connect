
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail")
            .value.trim().toLowerCase();

        const password =
            document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        let accounts = [];

        try {
            accounts = JSON.parse(
                localStorage.getItem("skillConnectAccounts") || "[]"
            );
        } catch (error) {
            message.textContent = "Unable to read saved accounts.";
            return;
        }

        const user = accounts.find(function (account) {
            return (
                account.email &&
                account.email.trim().toLowerCase() === email &&
                account.password === password
            );
        });

        if (!user) {
            message.textContent =
                "Invalid email or password. Please register first.";
            return;
        }

        sessionStorage.setItem(
            "skillConnectCurrentUser",
            JSON.stringify({
                name: user.name,
                email: user.email,
                role: "student"
            })
        );

        message.textContent = "Login successful! Opening dashboard...";

        window.location.href = "dashboard.html";
    });
    function buyCourse(name, price) {

    const course = {
        name: name,
        price: price
    };

    localStorage.setItem(
        "selectedCourse",
        JSON.stringify(course)
    );

    window.location.href = "checkout.html";
}
});
