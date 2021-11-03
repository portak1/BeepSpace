<?php

declare(strict_types=1);

use App\Entity\Message as Message;
use DatabaseController as Controller;

class MessageManager
{

    /**
     *  @var Controller
     */
    public $controller;

    public function __construct()
    {
        $this->controller = new Controller('mysql:host=localhost;dbname=beepspace', 'root', '');
    }


    public function createNewMessage($content, $user, $date)
    {
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$user'");
        $userId = false;
        foreach ($result as $row) {
            $userId = $row->id;
        }

        if(!$userId){
            return "neexistuje zadaný uživatel";
        }

        return $this->controller->sql("INSERT INTO messages (message_date, user_id, content) VALUES (' $date','$userId','$content')");
    }

    public function getMessages($user)
    {
        
        $result = $this->controller->sql("SELECT content, users.username as username, message_date FROM messages JOIN users WHERE users.id = messages.user_id AND username = '$user'");
        $arrayOfUsers = array();
        foreach ($result as $row) {
            array_push($arrayOfUsers, new Message($row->username, $row->message_date, $row->content));
        }

        return $arrayOfUsers;
    }
}
