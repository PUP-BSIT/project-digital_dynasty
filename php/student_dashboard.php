<?php
include 'db_connection.php';

$student_id = 1;

$sql = "SELECT students.firstname, students.lastname, contact_information.email
        FROM students
        INNER JOIN contact_information ON students.id = contact_information.student_id
        WHERE students.id = $student_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) {
    echo "First Name: " . $row["firstname"]. "<br>";
    echo "Last Name: " . $row["lastname"]. "<br>";
    echo "Email: " . $row["email"]. "<br>";
  }
} else {
  echo "0 results";
}

$conn->close();
?>
