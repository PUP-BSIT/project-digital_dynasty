<?php
include "db_connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $student_number = $_POST['student_number'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM student WHERE student_number = ? AND password = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $student_number, $password);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $studentName = $row['name'];
    $gender = $row['gender'];
    $email = $row['email'];
    $section = $row['section'];
    $studentNumber = $row['student_number'];
    $contactNumber = $row['contact_number'];

    session_start();
    $_SESSION['studentName'] = $studentName;
    $_SESSION['gender'] = $gender;
    $_SESSION['email'] = $email;
    $_SESSION['section'] = $section;
    $_SESSION['studentNumber'] = $studentNumber;
    $_SESSION['contactNumber'] = $contactNumber;

    header("Location: student_dashboard.php");
    exit();
  } else {
    echo "Invalid special key or password.";
  }
}

$conn->close();
?>
