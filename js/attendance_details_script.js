document.addEventListener('DOMContentLoaded', function() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    const form = document.getElementById('date-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        fetchAttendanceData(date);
    });

    document.getElementById('back-button').addEventListener('click', function() {
        window.location.href = '../works.student_dashboard.php';
    });

    function fetchAttendanceData(date) {
        fetch('../php/attendance_details.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `date=${encodeURIComponent(date)}`
        })
        .then(response => response.json())
        .then(data => {
            drawChart(data.attendance);
        });
    }

    function drawChart(attendanceData) {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Count');
        data.addRows([
            ['Present', attendanceData.Present],
            ['Absent', attendanceData.Absent]
        ]);

        const options = {
            title: 'Attendance Summary',
            hAxis: { title: 'Status' },
            vAxis: { title: 'Count' },
            legend: { position: 'none' }
        };

        const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
});
