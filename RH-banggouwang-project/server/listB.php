<?php

$db = mysqli_connect("127.0.0.1", "root", "", "bangg");

$sql = "SELECT * FROM list";
$result = mysqli_query($db,$sql);
$total = mysqli_num_rows($result);

// print_r($total)

$count = ceil($total  / 8);

$data  = array("count"=>$count);  
echo json_encode($data,true);
?>