document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("attendanceForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
  
        const courses = document.getElementById("courses").value;
        const students = document.getElementById("students").value;
        const calendar = document.getElementById("calendar").value;
        const status = document.querySelector(
          'input[name="status"]:checked'
        ).value;
        const classReport = document.getElementById("class-report").value;
  
        if (!courses || !students || !calendar || !status || !classReport) {
          alert("Please fill out all fields.");
          return;
        }
  
        const formData = {
          courses: courses,
          students: students,
          calendar: calendar,
          status: status,
          classReport: classReport,
        };
  
        console.log("Form Data:", formData);
        alert("Form submitted successfully!");
  
        document.getElementById("attendanceForm").reset();
      });
  });
  