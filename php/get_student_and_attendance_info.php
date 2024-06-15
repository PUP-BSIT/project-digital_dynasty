<?php
include "db_connect.php";

$student_no = "123456";

$student_sql = "SELECT name, gender, email, section, student_no, contact_no FROM students WHERE student_no = '$student_no'";
$student_result = $conn->query($student_sql);

$response = [];

if ($student_result->num_rows > 0) {
    $response["student_info"] = $student_result->fetch_assoc();
} else {
    $response["student_info"] = ["error" => "No student found"];
}

// Fetch attendance statusf
if (isset($_GET["course"])) {
    $course = $_GET["course"];
    $attendance_sql = "SELECT status FROM attendance WHERE student_no = '$student_no' AND class_no = '$course'";
    $attendance_result = $conn->query($attendance_sql);

    if ($attendance_result->num_rows > 0) {
        $response["attendance_status"] = $attendance_result->fetch_assoc();
    } else {
        $response["attendance_status"] = [
            "status" => "No attendance record found",
        ];
    }
} else {
    $response["attendance_status"] = ["error" => "No course specified"];
}

echo json_encode($response);

$conn->close();
?>

 ?>