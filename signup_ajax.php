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

//Variables can be accessed as such:
$inputUser = $json_obj['username'];
$inputPassword = $json_obj['password'];

// Checking if the new user is not currently in use

if (checkUsername($inputUser) == true) {

    if (createUser($inputUser, $inputPassword) == true) {
        echo json_encode(array("success" => true));
        exit;
    }
    
} else {
    echo json_encode(array("success" => false));
    exit;
}


function checkUsername($inputUser) {

    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';

    $stmt1 = $mysqli->prepare("select * from users where username = ?");

    if (!$stmt1) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        return false;
    } else {
        
        $stmt1->bind_param("s", $inputUser);
        $stmt1->execute();
        $stmt1->store_result();

        if ($stmt1->num_rows() > 0) {
            return false;
        }

        $stmt1->close();

        return true;

    }
}


function createUser($inputUser, $inputPassword) {

    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';

    // Preparing the username and hashing the password

    $username = $inputUser;
    $password = password_hash($inputPassword, PASSWORD_BCRYPT);

    // Preparing the usernamd and password insertion query

    $stmt2 = $mysqli->prepare("insert into users (username, password) values (?, ?)");

    if (!$stmt2) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        return false;
    }

    // Running the insertion query

    $stmt2->bind_param('ss', $username, $password);
    $stmt2->execute();
    $stmt2->close();

    return true;
    
}

?>