document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const goButton = document.getElementById("go-button");
  const loadingElement = document.getElementById("loading");
  const chartContainer = document.getElementById("attendance_chart");

  loadingElement.style.display = "none";

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    drawChart([["Subject", "Present", "Absent"]]);
  });

  goButton.addEventListener("click", function () {
    const selectedDate = dateInput.value;
    if (selectedDate) {
      fetchAttendanceData(selectedDate);
    }
  });

  function fetchAttendanceData(date) {
    loadingElement.style.display = "block";

    fetch(
      `../php/get_attendance_data.php?student_no=${studentNumber}&date=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        loadingElement.style.display = "none";
        drawChart(data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        loadingElement.style.display = "none";
      });
  }

  function drawChart(data) {
    var dataTable = google.visualization.arrayToDataTable(data);

    var options = {
      title: "Attendance Summary",
      hAxis: { title: "Subject" },
      vAxis: { title: "Count" },
      seriesType: "bars",
      series: { 1: { type: "line" } },
      colors: ["#1b9e77", "#d95f02"],
    };

    var chart = new google.visualization.ComboChart(chartContainer);
    chart.draw(dataTable, options);
  }
});
