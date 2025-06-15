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
$month = (int) $json_obj['month'];
$year = (int) $json_obj['year'];

// Creating the JSON array

$JSON_array = array();

// Getting all of the events of the user in the current month

$stmt = $mysqli->prepare("select events.event_id, events.title, events.date, events.time, events.favorite, YEAR(events.date) as year, MONTH(events.date) as month, DAY(events.date) as day, users.id from events join users on events.user_id = users.id group by event_id having users.id = ? and month = ? and year = ?");

if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
} else {

    $stmt->bind_param("iii", $userID, $month, $year);
    $stmt->execute();
    $result = $stmt->get_result();
    $counter = 1;

    while ($row = $result->fetch_assoc()) {

        $event = array('event_id' => $row['event_id'], 'user_id' => $row['id'], 'title' => $row['title'], 'date' => $row['date'], 'time' => $row['time'], 'favorite' => $row['favorite'], 'day' => $row['day']);
        $JSON_array['event' . (string) $counter] = $event;
        $counter = $counter + 1;

    }

    $stmt->close();
    
}

echo json_encode($JSON_array);

exit;

?>
