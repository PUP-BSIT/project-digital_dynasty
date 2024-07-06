document.addEventListener("DOMContentLoaded", function () {
  fetch('student_dashboard.php')
    .then(response => response.json())
    .then(data => {
      document.getElementById('student-name').textContent = 'Hello, ' + data.firstname;
      document.getElementById('name').textContent = 'Name: ' + data.firstname + ' ' + data.middlename + ' ' + data.lastname;
      document.getElementById('gender').textContent = 'Gender: ' + data.gender;
      document.getElementById('email').textContent = 'Email: ' + data.email;
      document.getElementById('studentnumber').textContent = 'Student Number: ' + data.student_number;
      document.getElementById('contactnumber').textContent = 'Contact Number: ' + data.phone;

      document.getElementById('attendance-status').textContent = data.attendance_status ? 'Present' : 'Absent';
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logout").addEventListener("click", function () {
    window.location = "../index.html";
  });
});