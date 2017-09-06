     <?php
       require_once 'configuration.php';
       $GEOLong = $_POST['GEOLong'];
       $GEOLat = $_POST['GEOLat'];
       $imageFileName = $_POST['imageFileName'];
       $image = explode(".", $imageFileName);
       $imageID = $image[0];
       
       echo $imageFileName;
       echo $imageID;
       echo $GEOLong;
       echo $GEOLat;
       
        $details_url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' . $GEOLat . ',' . $GEOLong;
       
                        $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $details_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $response = json_decode(curl_exec($ch), true);
     $GEOAddress =  $response['results'][1]['formatted_address'];
                 echo $GEOAddress;
       
       $query = "UPDATE images SET GEOLong = :GEOLong, GEOLat = :GEOLat, GEOAddress = :GEOAddress where imageID = :imageID";
         $statement = $db->prepare($query);
         $statement->bindValue(':GEOLong', $GEOLong);
         $statement->bindValue(':GEOLat', $GEOLat);
         $statement->bindValue(':GEOAddress', $GEOAddress);
                  $statement->bindValue(':imageID', $imageID);
         $statement->execute();
         $results = $statement->fetch(PDO::FETCH_ASSOC);
         $statement->closeCursor();
       
         ?>