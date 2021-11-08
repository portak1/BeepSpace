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


    public function returnUser($username)
    {
        $result =  $this->controller->sql("SELECT id, username, email,number,birth FROM users WHERE username = '$username'");
        foreach ($result as $row) {
            return new User($row->username,$row->id, $row->email, $row->number, $row->birth);
        }
    }
}
