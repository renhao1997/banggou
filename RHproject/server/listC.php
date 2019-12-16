<?php
$type = $_REQUEST["type"];


# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "bangg");
// print_r($db); 

#根际点击来确定页码
$start = ($_REQUEST["page"] - 1) * 10;
// print_r($start); 

if($type == "default"){
    $sql = "SELECT * FROM list LIMIT $start ,10";
}elseif($type == "desc"){
    $sql = "SELECT * FROM list ORDER BY list.pro  DESC LIMIT $start ,10";
}elseif($type == "asc")
{
  $sql = "SELECT * FROM list ORDER BY list.pro ASC LIMIT $start ,10";
}

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

// print_r($data);
echo json_encode($data,true);
?>