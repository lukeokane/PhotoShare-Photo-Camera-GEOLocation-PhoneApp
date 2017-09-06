<?php
require_once "configuration.php";
/* Perform query */
$username = filter_input(INPUT_POST, "username");
$query = "SELECT imageID, imageFileName, imageDesc, dateTaken, dateUploaded, GEOLong, GEOLat, GEOAddress from images where userID = (SELECT userID from users where username = :username) order by dateUploaded desc ";
$statement = $db->prepare($query);
$statement->bindValue(':username', $username);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();
?>