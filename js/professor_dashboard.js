// Function to fetch attendance data from PHP and generate table
function fetchAttendanceData() {
    fetch('../php/get_attendance_data.php') // Adjust URL to match your PHP script path
        .then(response => response.json())
        .then(data => {
            var table = generateAttendanceTable(data);
            document.getElementById('attendanceTable').innerHTML = table;
        })
        .catch(error => console.error('Error fetching attendance data:', error));
}

// Function to generate HTML table from attendance data
function generateAttendanceTable(data) {
    var table = '<table>';
    table += '<tr><th>Attendance ID</th><th>Date</th><th>Status</th><th>Class Number</th><th>Student ID</th><th>Last Name</th><th>First Name</th></tr>';
    data.forEach(function(row) {
        table += '<tr>';
        table += '<td>' + row.attendance_id + '</td>';
        table += '<td>' + row.date + '</td>';
        table += '<td>' + row.status + '</td>';
        table += '<td>' + row.class_no + '</td>';
        table += '<td>' + row.student_no + '</td>';
        table += '<td>' + row.last_name + '</td>';
        table += '<td>' + row.first_name + '</td>';
        table += '</tr>';
    });
    table += '</table>';
    return table;
}

// Fetch attendance data when the page loads
window.addEventListener('load', fetchAttendanceData);
