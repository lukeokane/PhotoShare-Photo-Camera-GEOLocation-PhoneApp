<?php

 error_reporting(E_ALL);
 ini_set('display_errors', 1);
 ini_set('memory_limit', '-1'); // enabled the full memory available.
 require_once 'configuration.php';
 if (isset($_POST['image']))
     {
     $image = $_POST['image'];
     $username= $_POST['username'];
     $albumID = $_POST['albumID'];

     $query = "SELECT max(imageID) + 1 as count from images";
     $statement = $db->prepare($query);
     $statement->execute();
     $results = $statement->fetch(PDO::FETCH_ASSOC);
     $statement->closeCursor();

     $imageData = base64_decode($image);
     $source = imagecreatefromstring($imageData);
     $angle = 0;
     $rotate = imagerotate($source, $angle, 0); // if want to rotate the image
     $dir = "images/" . $results['count'] . ".JPG";
     $imageSave = imagejpeg($rotate, $dir, 100);
     imagedestroy($source);
     
     $fileName = $results['count'] . ".JPG";

     $query = "INSERT into images (userID, albumID, imageFileName, imageDesc, dateTaken, GEOLong, GEOLat, GEOAddress) VALUES ((select userID from users where username = :username), :albumID, :imageFileName, 'No Description', NOW(), 0, 0, 'null')";
     $statement = $db->prepare($query);
     $statement->bindValue(':username', $username);
     $statement->bindValue(':albumID', $albumID);
     $statement->bindValue(':imageFileName', $fileName);
     $statement->execute();
     $results = $statement->fetch(PDO::FETCH_ASSOC);
     $statement->closeCursor();
     
     $return->result = 'success';
     $return->reply = $fileName;
     $json = json_encode($return);
     
     echo $json;

    // echo "<br>done";
     } else
     {
     echo "error";
     }
?>