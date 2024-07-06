document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const specialKeyInput = document
      .getElementById("id")
      .value.trim()
      .toUpperCase();

    if (specialKeyInput.startsWith("S")) {
      window.location = "./works/student_dashboard.html";
    } else if (specialKeyInput.startsWith("P")) {
      window.location = "./works/professor_dashboard.html";
    } else if (specialKeyInput.startsWith("A")) {
      window.location = "./works/professor_dashboard.html";
    } else {
      alert("Invalid input. Please enter a valid Special Key.");
    }
  });
});
