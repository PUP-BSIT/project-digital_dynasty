document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const specialKeyInput = document
      .getElementById("id")
      .value.trim()
      .toUpperCase();

    if (specialKeyInput === "") {
      showError("Please enter a Special Key.");
      return;
    }

    if (specialKeyInput.startsWith("S")) {
      showSuccess("Logging in as a student...");
      setTimeout(function () {
        window.location = "./student_dashboard.html";
      }, 2000);
    } else if (specialKeyInput.startsWith("P")) {
      showSuccess("Logging in as a professor...");
      setTimeout(function () {
        window.location = "./professor_dashboard.html";
      }, 2000);
    } else if (specialKeyInput.startsWith("A")) {
      showSuccess("Logging in as an administrator...");
      setTimeout(function () {
        window.location = "./administrator_dashboard.html";
      }, 2000);
    } else {
      showError("Invalid input. Please enter a valid Special Key.");
    }
  });

  function showError(message) {
    const errorCard = createCard(message, "error");
    form.appendChild(errorCard);

    const continueButton = createContinueButton();
    errorCard.appendChild(document.createElement("br"));
    errorCard.appendChild(continueButton);
  }

  function showSuccess(message) {
    const successCard = createCard(message, "success");
    form.appendChild(successCard);
  }

  function createCard(message, type) {
    const card = document.createElement("div");
    card.classList.add("card", type);
    card.textContent = message;

    return card;
  }

  function createContinueButton() {
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.classList.add("continue-button");

    continueButton.addEventListener("click", function () {
      const card = this.parentElement;
      card.remove();
    });

    return continueButton;
  }
});
