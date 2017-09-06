<?php 
require_once "configuration.php";

 $userID= $_POST['userID'];
 $newAlbumName = $_POST['newAlbumName'];

 $query = "INSERT INTO `albums`(`userID`, `albumName`) VALUES (:userID,:newAlbumName)";

 $statement = $db->prepare($query);
 $statement->bindValue(':userID', $userID);
 $statement->bindValue(':newAlbumName', $newAlbumName);
 $statement->execute();
