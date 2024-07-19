document.addEventListener("DOMContentLoaded", function() {
  const classNo = new URLSearchParams(window.location.search).get("class_no");

  fetch(`classreport.php?class_no=${classNo}`)
      .then(response => response.json())
      .then(data => {
          const tableBody = document.getElementById("attendanceTableBody");
          tableBody.innerHTML = ""; // Clear existing table data

          data.forEach(record => {
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${record.lastname}</td>
                  <td>${record.firstname}</td>
                  <td>${record.student_no}</td>
                  <td>${record.date}</td>
                  <td>${record.status}</td>
              `;
              tableBody.appendChild(row);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});
