<?php
header('Content-Type: application/json');
require '../db_connect.php';

$category = $_GET['category'] ?? '';
$type = $_GET['type'] ?? '';

if ($type === 'chart') {
    switch ($category) {
        case 'Students':
        case 'Professors':
            $table = ($category === 'Students') ? 'student' : 'professor';
            $query = "SELECT age, gender, COUNT(*) as count FROM $table GROUP BY age, gender";
            break;

        case 'Programs':
            $query = "SELECT course, COUNT(*) as count FROM student GROUP BY course";
            break;

        case 'Total Students':
            $query = "SELECT COUNT(*) as total FROM student";
            break;

        default:
            echo json_encode([]);
            exit;
    }

    $result = $conn->query($query);
    $data = [];

    if ($category === 'Total Students') {
        $row = $result->fetch_assoc();
        $data[] = ['total' => $row['total']];
    } else {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

$conn->close();
?>
