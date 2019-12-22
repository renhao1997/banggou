<?php

$db = mysqli_connect("127.0.0.1", "root", "", "bangg");



$username = $_REQUEST["username"];
$password = $_REQUEST["password"];


# (2) 去数据库中查询看指定的用户名是否存在
$sql = "SELECT * FROM user WHERE username='$username'" ;
$result = mysqli_query($db,$sql);

$data = array("status"=>"","data"=>array("msg"=>""));
if(mysqli_num_rows($result) == 0)
{
  # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
    //获取数据库的密码
    $data = $result->fetch_all(MYSQLI_ASSOC);
    $psw = $data[0]['password'];

    if($password !=  $psw)
    {
      # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
      $data["status"] = "error";
      $data["data"]["msg"] = "登录失败，密码不正确！！！";
    }else
    {
      # (2-2-2) 密码正确，那么就返回数据(登录成功)
      $userId = $data[0]['id'];
      $data["status"] = "success";
      $data["data"]["msg"] = "恭喜你，登录成功";
      $data["data"]["userId"] = $userId;
    }
}
// echo $res;
echo json_encode($data,true);
?>