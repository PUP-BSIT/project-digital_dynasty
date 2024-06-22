document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(".edit-button");
  const updateButtons = document.querySelectorAll(".update-button");

  editButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const row = button.closest("tr");
      const attendanceStatus = row.querySelector(".attendance-status");

      if (attendanceStatus.querySelector("input") === null) {
        const currentStatus = attendanceStatus.textContent;
        attendanceStatus.innerHTML = `<input type="text" 
           value="${currentStatus}" />`;
        updateButtons[index].disabled = false;
      }
    });
  });

  updateButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const row = button.closest("tr");
      const attendanceStatus = row.querySelector(".attendance-status");
      const inputField = attendanceStatus.querySelector("input");

      if (inputField && inputField.value.trim() !== "") {
        attendanceStatus.textContent = inputField.value.trim();
        button.disabled = true;
      }
    });
  });

  document.addEventListener("input", function (event) {
    if (
      event.target.tagName === "INPUT" &&
      event.target.closest(".attendance-status")
    ) {
      const row = event.target.closest("tr");
      const updateButton = row.querySelector(".update-button");
      updateButton.disabled = event.target.value.trim() === "";
    }
  });
});
