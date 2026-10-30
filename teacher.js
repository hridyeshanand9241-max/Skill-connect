const courseForm = document.getElementById("courseForm");

courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value.trim();
    const courseDescription = document.getElementById("courseDescription").value.trim();
    const coursePrice = document.getElementById("coursePrice").value;

    const message = document.getElementById("courseMessage");

    if (!courseName || !courseDescription || coursePrice === "") {
        message.textContent = "Please fill in all course details.";
        return;
    }

    const courses = JSON.parse(
        localStorage.getItem("skillConnectCourses") || "[]"
    );

    courses.push({
        id: Date.now(),
        name: courseName,
        description: courseDescription,
        price: Number(coursePrice)
    });

    localStorage.setItem("skillConnectCourses", JSON.stringify(courses));

    message.textContent = "Course created successfully!";

    courseForm.reset();
});