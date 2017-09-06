     <?php
       require_once 'configuration.php';
 $images = json_decode($_POST['json']);
 $username = $_POST['username'];
 $albumID = $_POST['albumID'];
 
 foreach($images as $fileName){
                    $query = "UPDATE images SET userID = (select userID from users where username = :username), albumID = :albumID WHERE imageFileName = :imageFileName";
         $statement = $db->prepare($query);
         $statement->bindValue(':username', $username);
         $statement->bindValue(':albumID', $albumID);
         $statement->bindValue(':imageFileName', $fileName);
         $statement->execute();
         $results = $statement->fetch(PDO::FETCH_ASSOC);
         $statement->closeCursor();
         

}
          ?>