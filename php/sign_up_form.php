<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $firstname = $_POST['firstname'];
  $middlename = $_POST['middlename'];
  $lastname = $_POST['lastname'];
  $birthday = $_POST['birthday'];
  $age = $_POST['age'];
  $address = $_POST['address'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $status = $_POST['status'];
  $password = $_POST['password'];
  $confirmPassword = $_POST['confirmPassword'];

  if ($password !== $confirmPassword) {
    echo "Passwords do not match.";
    exit;
  }

  $passwordHash = password_hash($password, PASSWORD_DEFAULT);

  $result = $conn->query("SELECT MAX(id) AS max_id FROM professor");
  $row = $result->fetch_assoc();
  $maxId = $row['max_id'] + 1;
  $profId = sprintf("P%05d", $maxId);

  $stmt = $conn->prepare("INSERT INTO professor (firstname, middlename, lastname, birthday, age, ddress, email, phone, status, password, prof_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssssissssssss", $firstname, $middlename, $lastname, $birthday, $age, $address, $email, $phone, $status, $passwordHash, $profId);

  if ($stmt->execute()) {
    echo "Sign up successfully";
  } else {
    echo "Error: " . $stmt->error;
  }

  $stmt->close();
  $conn->close();
}
?>