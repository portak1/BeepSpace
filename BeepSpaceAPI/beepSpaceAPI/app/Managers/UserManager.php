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
        $this->controller = new Controller('mysql:host=localhost;dbname=beepspace', 'root', '');
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
        $array = $this->getFriends($id). "," . $id2;
        $result = $this->controller->sql("UPDATE users SET friends_id = '$array' WHERE id = '$id'");
        foreach ($result as $row) {
            return true;
        }
        return false;
    }

    public function isFriend($id, $id2){
        $array = explode(",",$this->getFriends($id));

        if (($key = array_search($id2, $array)) !== false){
            return true;
        }
        return false;
    }


    public function removeFriend($id, $id2){
        $array = explode(",",$this->getFriends($id));

        if (($key = array_search($id2, $array)) !== false) {
            unset($array[$key]);
            $implodedArray = implode(",", $array);
            $result = $this->controller->sql("UPDATE users SET friends_id = '$implodedArray' WHERE id = '$id'");
            foreach ($result as $row) {
                return true;
            }
            return false;
        }
        return false;


    }

    
    public function setPause($id){
        $result = $this->controller->sql("UPDATE users SET online = 3 WHERE id = '$id'");
        foreach ($result as $row) {
            return true;
        }
        return false;
    }

    public function setOnline($id){
        $result = $this->controller->sql("UPDATE users SET online = 1 WHERE id = '$id'");
            foreach ($result as $row) {
                return true;
            }
            return false;
    }

    public function setOffline($id){
        $result = $this->controller->sql("UPDATE users SET online = 0 WHERE id = '$id'");
            foreach ($result as $row) {
                return true;
            }
            return false;
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
