<?php
require_once "configuration.php";
/* Perform query */
$username = filter_input(INPUT_POST, "usernameOfAlbumOwner");
$albumID = filter_input(INPUT_POST, "albumID");


$query = "SELECT * FROM images order by dateUploaded desc ";

$statement = $db->prepare($query);
$statement->bindValue(':username', $username);
$statement->bindValue(':albumID', $albumID);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();