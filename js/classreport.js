document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("attendanceForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const courses = document.getElementById("courses").value;
    const students = document.getElementById("students").value;
    const calendar = document.getElementById("calendar").value;
    const present = document.getElementById("presentCount").textContent;
    const absent = document.getElementById("absentCount").textContent;
    const classReport = document.getElementById("class-report").value;

    if (
      !courses ||
      !students ||
      !calendar ||
      !present ||
      !absent ||
      !classReport
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = {
      courses: courses,
      students: students,
      calendar: calendar,
      present: present,
      absent: absent,
      classReport: classReport,
    };

    console.log("Form Data:", formData);

    alert("Form submitted successfully!");

    form.reset();
  });
});
