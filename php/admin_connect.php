<?php
$host = 'localhost';
$dbname = 'attendify';
$username = 'root';
$password = '';
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $userType = $_GET['type'] ?? 'student';

    if ($userType === 'student') {
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
    } else if ($userType === 'professor') {
        $sql = "SELECT 
                    professor.lastname, 
                    professor.firstname, 
                    professor.email, 
                    class.class_no, 
                    attendance.date, 
                    attendance.status 
                FROM 
                    attendance 
                JOIN 
                    class ON attendance.class_no = class.class_no 
                JOIN 
                    professor ON class.prof_id = professor.prof_id";
    }


    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll();
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>