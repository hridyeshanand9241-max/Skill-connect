
const profileForm = document.getElementById("studyProfileForm");
const profileMessage = document.getElementById("profileMessage");

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const currentUser = JSON.parse(
        sessionStorage.getItem("skillConnectCurrentUser") || "null"
    );

    if (!currentUser) {
        profileMessage.textContent =
            "Please log in or register before creating your profile.";
        profileMessage.style.color = "red";
        return;
    }

    const profile = {
        name: currentUser.name,
        email: currentUser.email,
        education: document.getElementById("education").value,
        classCourse: document.getElementById("classCourse").value.trim(),
        institution: document.getElementById("institution").value.trim(),
        teachSkills: document.getElementById("teachSkills").value.trim(),
        learnSkills: document.getElementById("learnSkills").value.trim(),
        skillLevel: document.getElementById("level").value,
        availability: document.getElementById("availability").value
    };

    const profiles = JSON.parse(
        localStorage.getItem("skillConnectProfiles") || "{}"
    );

    profiles[currentUser.email] = profile;

    localStorage.setItem(
        "skillConnectProfiles",
        JSON.stringify(profiles)
    );

    profileMessage.textContent = "Profile saved successfully!";
    profileMessage.style.color = "green";

    // Open the study profile page after saving.
    window.location.href = "study-profile.html";
    window.location.href = "dashboard.html";
});
