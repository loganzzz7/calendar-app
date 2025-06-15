<?php

// Establishing connection with the database

$mysqli = new mysqli('localhost', 'root', '2529954656xx', 'calendar');

if ($mysqli -> connect_error) {
    printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}

?>