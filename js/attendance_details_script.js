document.addEventListener('DOMContentLoaded', function() {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    const form = document.getElementById('date-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        fetchAttendanceData(date);
    });

    function fetchAttendanceData(date) {
        fetch('../works/attendance_details.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `date=${encodeURIComponent(date)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.attendance) {
                drawChart(data.attendance);
            } else {
                console.error('Invalid data received:', data);
                drawChart({ Present: 0, Absent: 0 }); // Fallback in case of invalid data
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            drawChart({ Present: 0, Absent: 0 }); // Fallback in case of error
        });
    }

    function drawChart(attendanceData) {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Status');
        data.addColumn('number', 'Count');

        // Ensure data is defined and has the expected properties
        const presentCount = attendanceData?.Present || 0;
        const absentCount = attendanceData?.Absent || 0;

        data.addRows([
            ['Present', presentCount],
            ['Absent', absentCount]
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
