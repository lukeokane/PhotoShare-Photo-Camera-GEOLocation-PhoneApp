<?php
require_once "configuration.php";
/* Perform query */
$username = filter_input(INPUT_POST, "usernameOfAlbumOwner");
$albumID = filter_input(INPUT_POST, "albumID");
$query = "SELECT imageID, (select albumName from albums where albumID = :albumID) as albumName, imageFileName, imageDesc, dateTaken, dateUploaded, GEOLong, GEOLat, GEOAddress from images where userID = (SELECT userID from users where username = :username) AND albumID = :albumID order by dateUploaded desc ";
$statement = $db->prepare($query);
$statement->bindValue(':username', $username);
     $statement->bindValue(':albumID', $albumID);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);
echo $json;
$statement->closeCursor();