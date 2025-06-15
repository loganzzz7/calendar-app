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
$userVerified = false;
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

$userID = "";
$username = "";
$token = "";

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

if (checkValid($inputUser, $inputPassword, $userID, $username, $token) == true) {

    // ini_set("session.cookie_httponly", 1);
    // session_start();

    $_SESSION['token'] = $token;

    echo json_encode(array(
        "success" => true,
        "user_id" => $userID,
        "user" => $username,
        "token" => $token
    ));
    exit;
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Wrong username or password. Please re-enter."
    ));
    exit;
}

function checkValid($inputUser, $inputPassword, &$userID, &$username, &$token) {

    // Initializing the database
    
    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';

    $stmt1 = $mysqli->prepare("select count(*), id, password from users where username = ?");

    if (!$stmt1) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        return false;
    } else {

        // Running the search query

        $stmt1->bind_param("s", $inputUser);
        $stmt1->execute();
        $stmt1->bind_result($cnt, $user_id, $password_hash);
        $stmt1->fetch();
        $stmt1->close();

        // Checking if the username and password match with the results of the query

        if ($cnt == 1 && password_verify($inputPassword, $password_hash)) {

            $userID = $user_id;
            $username = htmlentities($inputUser);
            $token = bin2hex(openssl_random_pseudo_bytes(32));

            return true;

        } else {

            return false;
            
        }
        
    }
    
}
