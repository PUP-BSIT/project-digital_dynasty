<?php
$servername = "your_server_name";
$username = "admin";
$password = "";
$dbname = "attendify";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
