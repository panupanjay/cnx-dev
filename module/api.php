<?php
    $url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php?stationID='.$_GET['stationID']; // path to your JSON file
    $data = file_get_contents($url); // put the contents of the file into a variable
    $json = json_decode($data); // decode the JSON feed
    echo json_encode($json);
?>