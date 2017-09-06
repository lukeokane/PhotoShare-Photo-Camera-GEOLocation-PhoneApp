<?php
require_once "configuration.php";
/* Perform query */
$userID= filter_input(INPUT_POST, "userid");


$query = "SELECT albumID, albumName FROM albums WHERE userID = :userID";

$statement = $db->prepare($query);
$statement->bindValue(':userID', $userID);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();