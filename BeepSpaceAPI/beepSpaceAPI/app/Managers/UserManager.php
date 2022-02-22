<?php

declare(strict_types=1);

use DatabaseController as Controller;
use App\Entity\User as User;

class UserManager
{

    /**
     *  @var Controller
     */
    private $controller;

    public function __construct()
    {
        $this->controller = new Controller('mysql:host=sql.endora.cz:3310;dbname=beepspace', 'beepspaceapi', 'Lofas125');
    }



    public function createUser($username, $password, $email, $number, $birth)
    {
        $alreadyExist = $this->controller->sql("SELECT username FROM users WHERE username = '$username'");

        foreach ($alreadyExist as $row) {
            return "USER_EXIST";
        }

        $this->controller->sql("INSERT INTO users (username, password, email, number,birth) VALUES ('$username','$password','$email','$number','$birth')");
        return "success";
    }

    public function checkLogin($username, $password)
    {
        $result =  $this->controller->sql("SELECT username, password FROM users WHERE username = '$username' AND password = '$password'");
        foreach ($result as $row) {
            return true;
        }
        return false;
    }

    public function getFriends($id)
    {
        $result = $this->controller->sql("SELECT friends_id FROM users WHERE id ='$id'");
        foreach ($result as $row) {
            return $row->friends_id;
        }
    }



    public function returnUser($username)
    {
        $result =  $this->controller->sql("SELECT id, username, email,number,birth, online FROM users WHERE username = '$username'");
        foreach ($result as $row) {
            return new User($row->username, $row->id, $row->email, $row->number, $row->birth, $row->online);
        }
    }

    public function returnUserById($id){
        $result =  $this->controller->sql("SELECT id, username, email,number,birth, online FROM users WHERE id = '$id'");
        foreach ($result as $row) {
            return new User($row->username, $row->id, $row->email, $row->number, $row->birth, $row->online);
        }
    }

    public function addFriend($id, $id2)
    {
        $array = count((array)$this->getFriends($id))>0 ? $this->getFriends($id). "," . $id2 : $id2;
       
        $array2 = count((array)$this->getFriends($id2))>0 ? $this->getFriends($id2) . "," . $id : $id;

        $result = $this->controller->sql("UPDATE users SET friends_id = '$array' WHERE id = '$id'");
        $resul2 = $this->controller->sql("UPDATE users SET friends_id = '$array2' WHERE id = '$id2'");
        return true;
    }

    public function isFriend($id, $id2){
        $array = explode(",",$this->getFriends($id));

        if (($key = array_search($id2, $array)) !== false){
            return true;
        }
        return false;
    }


    public function convertIDtoName($id){

        $result = $this->controller->sql("SELECT * FROM users WHERE id='$id'");
        foreach($result as $row){
            return new User($row->username,$row->id,$row->email,$row->number,$row->birth,$row->online);
        }
    }

    public function removeFriend($id, $id2){
        $array = explode(",",$this->getFriends($id));
        $array2 = explode(",",$this->getFriends($id2));
        if (($key = array_search($id2, $array)) !== false) {
            unset($array[$key]);
            $implodedArray = implode(",", $array);
            $result = $this->controller->sql("UPDATE users SET friends_id = '$implodedArray' WHERE id = '$id'");        
            if (($key = array_search($id, $array2)) !== false) {
                unset($array2[$key]);
                $implodedArray = implode(",", $array2);
                $result = $this->controller->sql("UPDATE users SET friends_id = '$implodedArray' WHERE id = '$id2'");        
                return false;
            }
        }


        return false;


    }


    public function convertNameToID($username){
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$username'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }

        if(!$userId){
            return "neexistuje zadaný uživatel";
        }
        return $userId;
    }
    
    public function setPause($id){
        $this->controller->sql("UPDATE users SET online = 3 WHERE id = '$id'");
      
        return true;
    }

    public function setOnline($id){
        $this->controller->sql("UPDATE users SET online = 1 WHERE id = '$id'");
           
            return true;
        }

    public function setOffline($id){
        $this->controller->sql("UPDATE users SET online = 0 WHERE id = '$id'");
           
            return true;
        }


    public function returnAllUsers()
    {
        $arrayOfUsers = array();
        $result =  $this->controller->sql("SELECT id, username, email,number,birth, online FROM users");
        foreach ($result as $row) {
            array_push($arrayOfUsers, new User($row->username, $row->id, $row->email, $row->number, $row->birth,$row->online));
        }
        return $arrayOfUsers;
    }
}
