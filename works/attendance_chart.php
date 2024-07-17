<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Attendance Chart</title>
    <link rel="stylesheet" href="../styles/attendance_chart.css" />
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" src="../js/attendance_chart.js" defer></script>
</head>

<body>
    <header>
        <h2>Attendance Chart</h2>
    </header>
    <div id="date-selector">
        <label for="date">Select Date:</label>
        <input type="date" id="date">
        <button id="go-button">Generate Chart</button>
    </div>
    <div id="loading">Loading...</div>
    <div id="attendance_chart" style="width: 900px; height: 500px;"></div>
</body>

</html>