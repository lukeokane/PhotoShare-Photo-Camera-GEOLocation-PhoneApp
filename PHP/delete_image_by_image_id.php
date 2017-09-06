<?php
require_once "configuration.php";
/* Perform query */
$imageID = filter_input(INPUT_POST, "imageID");
$query = "DELETE FROM images WHERE imageID = :imageID;";
$statement = $db->prepare($query);
$statement->bindValue(':imageID', $imageID);
$statement->execute();
$statement->closeCursor();
?>