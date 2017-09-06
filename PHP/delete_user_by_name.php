<?php
require_once "configuration.php";
/* Perform query */
$username = filter_input(INPUT_POST, "username");
$query = "DELETE FROM images WHERE userID = (select userID from users where username = :username); DELETE FROM albums where userID = (select userID from users where username = :username); DELETE from users where username = :username;";
$statement = $db->prepare($query);
$statement->bindValue(':username', $username);
$statement->execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$statement->closeCursor();
?>