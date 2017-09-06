<?php
require_once "configuration.php";
/* Perform query */
$description = filter_input(INPUT_POST, "description");
$imageID = filter_input(INPUT_POST, "imageID");

$query = "UPDATE images SET imageDesc = :description WHERE imageID = :imageID";
$statement = $db->prepare($query);
     $statement->bindValue(':description', $description);
     $statement->bindValue(':imageID', $imageID);
$statement->execute();
$statement->closeCursor();