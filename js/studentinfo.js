document.addEventListener("DOMContentLoaded", function () {
  fetchStudentAndAttendanceInfo();
});

function fetchStudentAndAttendanceInfo(course = "") {
  let url = "get_student_and_attendance_info.php";
  if (course) {
    url += "?course=" + course;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.student_info.error) {
        console.error("Error fetching student info:", data.student_info.error);
      } else {
        const studentInfo = data.student_info;
        document.getElementById("student-name").textContent += studentInfo.name;
        document.getElementById("name").textContent += studentInfo.name;
        document.getElementById("gender").textContent += studentInfo.gender;
        document.getElementById("email").textContent += studentInfo.email;
        document.getElementById("section").textContent += studentInfo.section;
        document.getElementById("studentnumber").textContent +=
          studentInfo.student_no;
        document.getElementById("contactnumber").textContent +=
          studentInfo.contact_no;
      }

      if (course) {
        if (data.attendance_status.status) {
          document.getElementById("attendance-status").textContent =
            data.attendance_status.status;
        } else {
          console.error(
            "Error fetching attendance status:",
            data.attendance_status.error
          );
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function fetchAttendance() {
  const course = document.getElementById("courses").value;
  if (course) {
    fetchStudentAndAttendanceInfo(course);
  } else {
    alert("Please select a course");
  }
}
