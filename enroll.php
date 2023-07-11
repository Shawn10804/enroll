<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enroll At CodeTelligence</title>
</head>
<body>
<?php


    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $dateofbirth = $_POST["dateofbirth"];
    $email = $_POST["email"];
    $course = $_POST["course"];
    $address = $_POST["address"];
    $tel = $_POST["tel"];
    if (isset($_POST['gender'])) {
        $gender = $_POST['gender'];
    } else {
        $gender = ''; // or assign a default value
    }
    
    echo "Gender : " . $gender . "<br>";


$conn = new mysqli('localhost', 'root', '', 'enrollment_db');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare('insert into enroll(first_name,last_name,dateofbirth,email,course,address,tel,gender)values(?,?,?,?,?,?,?,?)');
$stmt->bind_param('ssisssis', $first_name,$last_name,$dateofbirth,$email,$course,$address,$tel,$gender);
$stmt->execute();

echo "Connect Successfully ";



$stmt->close();
$conn->close();

?>
</body>
</html>