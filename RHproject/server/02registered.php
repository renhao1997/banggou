<?php

//获取客户端提供的参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];


// echo $username;
// echo $phone;
// echo $password;

// echo"ok";
$db = mysqli_connect("127.0.0.1","root","","bangg");
// print_r($db);
$sql1 = "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db,$sql1);

$obj = array("status"=>"", "data"=>array("msg"=>""));

if(mysqli_num_rows($result) == 1)
{
   $obj["status"] = "error";
   $obj["data"]["msg"] = "注册失败，该用户名已经被使用！！！";
}else
{
  $sql = "INSERT INTO `bangg`.`user` (`id`, `username`, `phone`, `password`) VALUES (NULL, '$username ', '$phone', '$password');";

  # 执行SQL语句
  mysqli_query($db, $sql);

  $obj["status"] = "success";
  $obj["data"]["msg"] = "恭喜您，注册成功！！！";
}

echo json_encode($obj,true);

?>