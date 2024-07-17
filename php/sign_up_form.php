<?php
include("../db_connect.php");

$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$birthday = $_POST['birthday'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

if ($password === $confirm_password) {
    $stmt = $conn->prepare("INSERT INTO student (firstname, middlename, lastname, birthday, age, gender, address, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssisssss", $firstname, $middlename, $lastname, $birthday, $age, $gender, $address, $email, $phone, $password);

    if ($stmt->execute()) {
        echo "Sign up successfully! Redirecting to log in page...";
        header("refresh:3;url=log_in_form.html");
    } else {
        echo "Sign up failed. Please try again.";
    }

    $stmt->close();
} else {
    echo "Passwords do not match. Please try again.";
}

$conn->close();
?>
