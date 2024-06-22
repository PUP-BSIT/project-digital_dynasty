document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phoneNumber = document.getElementById("phone").value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneNumber.match(phoneRegex)) {
      alert("Please enter a valid 11-digit phone number.");
      return;
    }
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    alert(`Account successfully created for ${firstName} ${lastName}`);;

    window.location = "../works/professorsaccount.html";
  });
});
