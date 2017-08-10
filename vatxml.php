<?php

header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

//CONNECTING TO THE SERVER

//SERVER INFO
$servername = "127.0.0.1";
$username = "root";
$password = "password";
$dbname = "Volunteerinfo";

//CREATES CONNECTION
$conn = mysql_connect($servername, $username, $password);

//CHECKS CONNECTION
if (!$conn) {
    die("Connection failed: " . $msql_error());
}

if (!mysql_select_db($dbname)) {
  echo "Unable to select database: " . mysql_error();
}

echo '<response>';

$name = $_GET["name"];
$startdatetime = $_GET["startdatetime"];
$enddatetime = $_GET["enddatetime"];
$address = $_GET["address"];
$contact = $_GET["contact"];
$description = $_GET["description"];
$tags = $_GET["tags"];

$sql = "INSERT into events (name, startdatetime, enddatetime,address, contact, description, tags) values ('$name','$startdatetime','$enddatetime','$address','$contact','$description','$tags');" ;
$result = mysql_query($sql);

$sql = "DELETE FROM events WHERE address='';";
$result = mysql_query($sql);

$sql = "SELECT * FROM events;";
$result = mysql_query($sql);

if (mysql_num_rows($result)==0){
  echo "No rows found.";
} else {
while($rows=mysql_fetch_assoc($result)){
      echo "<name>".$rows['name']."</name>";
      echo "<startdatetime>".$rows['startdatetime']."</startdatetime>";
      echo "<enddatetime>".$rows['enddatetime']."</enddatetime>";
      echo "<address>".$rows['address']."</address>";
      echo "<contact>".$rows['contact']."</contact>";
      echo "<description>".$rows['description']."</description>";
    }
}


//
// $recommend = "SELECT address from events;";
// $result = mysql_query($recommend);
//
// if(!$result){
//   echo "select failed: " . mysql_error();
// }
//
// if (mysql_num_rows($result) == 0) {
//   echo "No rows found";
// } else {
//   while ($row = mysql_fetch_assoc($result)) {
//     echo "<name>" . $row['name'] . "</name>";
//     echo "<address>" . $row['address'] . "</address>";
//   }
// }
//
// mysql_free_result($result);

echo '</response>';
?>
