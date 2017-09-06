<?php 
require_once "configuration.php";

 $username= $_POST['username'];
 $email = 'user@user.com'; 
 $userimage = $_POST['userimage'];

 $query = "SELECT username FROM `users` WHERE username = :username";

 $statement = $db->prepare($query);
 $statement->bindValue(':username', $username);
 $statement->execute();

if($statement->rowCount() > 0){
        $query = "SELECT * FROM `users` WHERE username = :username";

 $statement = $db->prepare($query);
 $statement->bindValue(':username', $username);
 $statement->execute();

 $result = $statement->fetch(PDO::FETCH_ASSOC);

 echo json_encode($result);








    } else {
 $query = "INSERT INTO `users` (`username`, `email`, `joinDate`, `imageName`) VALUES (:username, :email, NOW(), :userimage)";

 $statement = $db->prepare($query);
 $statement->bindValue(':username', $username);
 $statement->bindValue(':email', $email);
 $statement->bindValue(':userimage', $userimage );
 $statement->execute();
 $statement->closeCursor();
    }