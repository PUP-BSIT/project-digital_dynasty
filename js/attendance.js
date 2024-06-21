document.addEventListener("DOMContentLoaded", function () {
  const updateButtons = document.querySelectorAll(".update-button");
  
  updateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const attendanceCell = row.querySelector(".attendance-status");
      attendanceCell.textContent = "Updated"; 
    });
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      
      alert(
        "Edit button clicked for " +
          row.querySelector(".cell-with-border").textContent
      );

    });
  });
});
