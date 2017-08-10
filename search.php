<?php

  header('Content-Type: text/xml');
  echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

  $search = isset($_GET['search']) ? $_GET['search'] : '';
  if($search == 'Type to search for an event'){
    header('Location: search.php');
  }
  if($search != ''){
    $con = mysql_connect("127.0.0.1", "root", "password");
    $db = mysql_select_db("Volunteerinfo");

  echo '<response2>';

    if (!isset($search)) {
      echo '';
    } else {
      // if($_GET['q'] !== ''){
      // $search = $_GET['q'];
      $query = mysql_query("SELECT * FROM events WHERE name LIKE '%$search%' OR description LIKE '%$search%' OR tags LIKE '%$search%'");
      $num_rows = mysql_num_rows($query);
      // echo "select failed: " . mysql_error();
      // echo $num_rows;
      // echo $num_rows; </strong> results for: <?php echo $search;</p>
      while($row = mysql_fetch_array($query)){
        $event = $row['name'];
        $desc = $row['description'];
        $tags = $row['tags'];
        echo '<name>' .$event. '</name>';
        echo '<description>'.$desc.'</description>';
        echo '<tags>'.$tags.'</tags>';
      }
    }
  } else {
      header('Location: search.php');
    }
  echo '</response2>';

?>
