<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('memory_limit','-1'); // enabled the full memory available.
 require_once 'configuration.php';
 $noGPSCount = 0;
 $arrayOfImageNames = array();
 
 if (isset($_FILES['upload']['tmp_name']))
     {
     $result = array();
     foreach ($_FILES['upload'] as $key1 => $value1)
         {
         foreach ($value1 as $key2 => $value2)
             {
             $result[$key2][$key1] = $value2;
             }
         }


     foreach ($result as $test)
         {
         $test["name"] = uniqid() . '.JPG';
         $temp = explode(".", $test["name"]);
       //  echo $test['name'];
         $query = "SELECT max(imageID) + 1 as count from images";
         $statement = $db->prepare($query);
         $statement->execute();
         $results = $statement->fetch(PDO::FETCH_ASSOC);
         $statement->closeCursor();
         $fileName = $results['count'] . '.' . end($temp);
         $dir = 'images/' . $fileName;
         if (move_uploaded_file($test['tmp_name'], $dir))
             {
      
             $exif = exif_read_data($dir);
             if (isset($exif['GPSLatitude']) && isset($exif['GPSLongitude']) && isset($exif['GPSLatitudeRef']) && isset($exif['GPSLongitudeRef']))
                 {
                 $GPSLatitudeRef = strtolower(trim($exif['GPSLatitudeRef']));
                 $GPSLongitudeRef = strtolower(trim($exif['GPSLongitudeRef']));


                 $lat_degrees_a = explode('/', $exif['GPSLatitude'][0]);
                 $lat_minutes_a = explode('/', $exif['GPSLatitude'][1]);
                 $lat_seconds_a = explode('/', $exif['GPSLatitude'][2]);
                 $lng_degrees_a = explode('/', $exif['GPSLongitude'][0]);
                 $lng_minutes_a = explode('/', $exif['GPSLongitude'][1]);
                 $lng_seconds_a = explode('/', $exif['GPSLongitude'][2]);

                 $lat_degrees = $lat_degrees_a[0] / $lat_degrees_a[1];
                 $lat_minutes = $lat_minutes_a[0] / $lat_minutes_a[1];
                 $lat_seconds = $lat_seconds_a[0] / $lat_seconds_a[1];
                 $lng_degrees = $lng_degrees_a[0] / $lng_degrees_a[1];
                 $lng_minutes = $lng_minutes_a[0] / $lng_minutes_a[1];
                 $lng_seconds = $lng_seconds_a[0] / $lng_seconds_a[1];

                 $lat = (float) $lat_degrees + ((($lat_minutes * 60) + ($lat_seconds)) / 3600);
                 $lng = (float) $lng_degrees + ((($lng_minutes * 60) + ($lng_seconds)) / 3600);

                 //If the latitude is South, make it negative. 
                 //If the longitude is west, make it negative
                 $GPSLatitudeRef == 's' ? $lat *= -1 : '';
                 $GPSLongitudeRef == 'w' ? $lng *= -1 : '';
                 
                  $details_url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' . $lat . ',' . $lng;
 
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $details_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $response = json_decode(curl_exec($ch), true);
 
 $GEOAddress =  $response['results'][1]['formatted_address'];
                 $obj = json_decode($json);
                // echo $lat;
               //  echo "<br>";
                // echo $long;
               
                 $dateTaken = $exif['DateTimeDigitized'];
                 
                        
                  $img = imagecreatefromjpeg($dir);
        $exif = exif_read_data($dir);
        if ($img && $exif && isset($exif['Orientation']))
        {
            $ort = $exif['Orientation'];

            if ($ort == 6 || $ort == 5)
                $img = imagerotate($img, 270, null);
            if ($ort == 3 || $ort == 4)
                $img = imagerotate($img, 180, null);
            if ($ort == 8 || $ort == 7)
                $img = imagerotate($img, 90, null);

            if ($ort == 5 || $ort == 4 || $ort == 7)
                imageflip($img, IMG_FLIP_HORIZONTAL);
                
                
                }
            imagejpeg($img, $dir);
             
                 
                 $query = "INSERT into images (userID, albumID, imageFileName, imageDesc, dateTaken, GEOLong, GEOLat, GEOAddress) VALUES (1, 1, :imageFileName, 'No Description', :dateTaken, :GEOLong, :GEOLat, :GEOAddress)";
         $statement = $db->prepare($query);
         $statement->bindValue(':imageFileName', $fileName);
          $statement->bindValue(':dateTaken', $dateTaken);
         $statement->bindValue(':GEOLong', $lng);
         $statement->bindValue(':GEOLat', $lat);
         $statement->bindValue(':GEOAddress', $GEOAddress);
         $statement->execute();
         $results = $statement->fetch(PDO::FETCH_ASSOC);
         $statement->closeCursor();
         array_push($arrayOfImageNames, $fileName);
                 } else
                 {
                	$noGPSCount++;
                 }
             } else
             {
           //  echo $test['name'] . "does not have gps location";
             }
         }
              $return->result = 'success'; 
     if ($noGPSCount === 0)
     {
     $return->reply = "successful";
     }
     else
     {
     $return->reply = $noGPSCount . ' images did not save to the server because there was no GPS location attached.';
     }
     $return->noGPSCount = $noGPSCount;
     $return->lng = $lng;
     $return->lat = $lat;
     $return->geoadd = $GEOAddress;
          $return->imageNames = $arrayOfImageNames;
     $json = json_encode($return);
     
         
     } else
     {
     // echo "error";
        $return->result = 'failure';
     $return->reply = 'No images reached the server';
     $return->noGPSCount = 0;
     $json = json_encode($return);
     }
     
          echo $json;
?>