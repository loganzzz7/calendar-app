<?php

ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$userID = (int) $json_obj['userID'];
$token = (string) $json_obj['token'];
$title = (string) $json_obj['title'];
$date = (string) $json_obj['date'];
$time = (string) $json_obj['time'];
$eventID = (int) $json_obj['eventID'];
$favorite = (int) $json_obj['favorite'];
$CSRFtoken = $_SESSION['token'];

// Checking the user's CSRF token

if (!hash_equals($CSRFtoken, $token)) {
    die("Request forgery detected");
}

// printf("%s\n", $userID);
// printf("%s\n", $token);
// printf("%s\n", $title);
// printf("%s\n", $time);
//printf("%s\n", $CSRFtoken);

// Adding the user's new event to the database

$stmt = $mysqli->prepare("update events set title=?, date=?, time=?, user_id=?, favorite=? where event_id = ?");

if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
} else {
    // $stmt->bind_param("isss", 1, "2024-03-12", "15:09:43", "Hello");
    $stmt->bind_param("sssiii", $title, $date, $time, $userID, $favorite, $eventID);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $stmt->close();
        echo json_encode(array("success" => true));
        exit;
    } else {
        echo json_encode(array("success" => false));
        printf("%s", $mysqli->error);
        exit;
    }

}

?>