<?php
$host = 'localhost';
$dbname = 'attendify';
$username = 'root';
$password = '';

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $sql = "SELECT 
                student.lastname, 
                student.firstname, 
                student.student_number, 
                class.class_no, 
                attendance.date, 
                attendance.status 
            FROM 
                attendance 
            JOIN 
                student ON attendance.student_no = student.student_number 
            JOIN 
                class ON attendance.class_no = class.class_no";
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll();
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>
