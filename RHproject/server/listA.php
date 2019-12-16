<?php

# 01链接数据库

$db= mysqli_connect("127.0.0.1","root","","bangg");
// print_r($db);
// echo "ok";

#02 插入数据

#加载数据

$jsonData = file_get_contents("listdataA.json");

$data = json_decode($jsonData,true);

// echo (count($data));

# 通过for循环遍历数组

for($i=0;$i<count($data);$i++){
     print_r($data[$i]);
     $src = $data[$i]["src"];
     $shop = $data[$i]["shop"];
     $tlt = $data[$i]["tlt"];
     $pro = $data[$i]["pro"];
    $sql="INSERT INTO `bangg`.`list` (`id`, `src`, `shop`, `tlt`, `pro`) VALUES (NULL, '$src', '$shop', '$tlt', '$pro')";
    mysqli_query($db, $sql);
}

?>