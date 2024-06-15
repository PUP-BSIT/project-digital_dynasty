<?php
include "db_connect.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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
    $student_number = uniqid('2024-');

    if ($password !== $confirm_password) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {

        $stmt = $pdo->prepare('INSERT INTO student (firstname, middlename, lastname, birthday, age, gender, address, email, phone, password, datetime_created, datetime_updated, student_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)');
        $stmt->execute([$firstname, $middlename, $lastname, $birthday, $age, $gender, $address, $email, $phone, $hashed_password, $student_number]);

        echo json_encode(['success' => true, 'message' => 'Sign up successful!']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
    }
}
?>
