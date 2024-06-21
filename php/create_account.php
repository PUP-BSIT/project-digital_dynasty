<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $firstName = trim($_POST['firstName']);
    $middleName = trim($_POST['middleName']);
    $lastName = trim($_POST['lastName']);
    $birthday = $_POST['birthday'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $address = trim($_POST['address']);
    $email = trim($_POST['email']);
    $phone = $_POST['phone'];
    $courses = $_POST['courses'];
    $status = $_POST['status'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Error messages array
    $errors = [];

    // Validate required fields
    if (empty($firstName)) {
        $errors[] = "First name is required.";
    }
    if (empty($lastName)) {
        $errors[] = "Last name is required.";
    }
    if (empty($birthday)) {
        $errors[] = "Birthday is required.";
    }
    if (empty($age)) {
        $errors[] = "Age is required.";
    }
    if (empty($gender)) {
        $errors[] = "Gender is required.";
    }
    if (empty($address)) {
        $errors[] = "Address is required.";
    }
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if (empty($phone)) {
        $errors[] = "Phone number is required.";
    }
    if (empty($courses)) {
        $errors[] = "Please select a course.";
    }
    if (empty($status)) {
        $errors[] = "Please select a status.";
    }
    if (empty($password)) {
        $errors[] = "Password is required.";
    }
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }

    // Check for any errors
    if (!empty($errors)) {
        // Display errors and halt the script
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
        exit;
    }

    // Proceed with account creation (e.g., save to database)
    // For now, let's just simulate successful account creation
    echo "Account successfully created for $firstName $lastName!";
} else {
    // Redirect to form page if not accessed via POST
    header("Location: ../works/create_account.html");
    exit;
}
?>