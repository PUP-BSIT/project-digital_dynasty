<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professor Dashboard</title>
  <link rel="stylesheet" href="../styles/professor_dashboard_styles.css">
</head>
<body>
  <header>
    <div id="header">
      <h1>Professor Dashboard</h1>
    </div>
    <div id="logout_button">
      <button id="logout">Logout</button>
    </div>
    <div class="gold-line"></div>
  </header>
  <div id="content">
    <div id="info">
      <h2>Professor Information</h2>
      <p><strong>Name:</strong> <span id="prof_name"></span></p>
      <p><strong>Class Number:</strong> <span id="class_no"></span></p>
      <p><strong>Course Name:</strong> <span id="course_name"></span></p>
    </div>
    <div id="attendance">
      <h2>Attendance</h2>
      <table id="attendance_table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <button id="edit_all_button" class="action-btn">Edit All</button>
      <button id="save_all_button" class="action-btn" disabled>Save All</button>
    </div>

    <button id="logout">c</button>
  </div>
  <script src="../js/professor_dashboard.js"></script>
</body>
</html>
