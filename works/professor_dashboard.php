<?php
session_start(); // Start session

// Check if professor is logged in
if (!isset($_SESSION['prof_id'])) {
    header("Location: ../works/log_in_form.html?error=notloggedin");
    exit();
}

// Include database connection
require '../db_connect.php';

// Fetch professor's name using prof_id stored in session
$stmt = $conn->prepare("SELECT firstname, lastname FROM professor WHERE prof_id = ?");
$stmt->bind_param("s", $_SESSION['prof_id']);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $professor = $result->fetch_assoc();
    $professor_name = $professor['firstname'] . ' ' . $professor['lastname'];
} else {
    // Handle case where professor data is not found (optional)
    $professor_name = "Professor"; // Default or error handling message
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professor Dashboard</title>
    <link rel="stylesheet" href="../styles/professor_dashboard.css">
    <!-- Include any other head content -->
</head>
<body>
    <header>
        <div id="header">
            <h1>Professor Dashboard</h1>
        </div>
        <button id="logout_button"><a href="../php/logout.php" id="logout">Logout</a></button>
    </header>

    <div id="content">
        <div id="info">
            <div class="greeting">
                <h2>Welcome, <?php echo htmlspecialchars($professor_name); ?>!</h2>
            </div>
        </div>

        <div id="attendance">
            <h2>Attendance Data</h2>
            <div id="attendanceTable">
                <!-- Attendance table will be dynamically generated here -->
            </div>
        </div>
    </div>

    <script src="../js/professor_dashboard.js"></script>
</body>
</html>
