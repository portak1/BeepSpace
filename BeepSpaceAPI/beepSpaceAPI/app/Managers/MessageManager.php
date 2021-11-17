<?php

declare(strict_types=1);

use App\Entity\Message as Message;
use DatabaseController as Controller;
use UserManager as UserManager;
class MessageManager
{

    /**
     *  @var Controller
     */
    private $controller;
    /**
     *  @var UserManager
     */
    private $userManager;

    public function __construct()
    {
        $this->controller = new Controller('mysql:host=localhost;dbname=beepspace', 'root', '');
        $this->userManager = new UserManager();
    }


    public function createNewMessage($content, $user,$reciever, $date)
    {
        $result = $this->controller->sql("SELECT id FROM users WHERE username='$user'");
        $userId = false;        
        foreach ($result as $row) {
            $userId = $row->id;
        }

        if(!$userId){
            return "neexistuje zadaný uživatel";
        }

        $result = $this->controller->sql("SELECT id FROM users WHERE username='$reciever'");
        $recieverId = false;        
        foreach ($result as $row) {
            $recieverId = $row->id;
        }

        if(!$recieverId){
            return "neexistuje zadaný uživatel";
        }

        return $this->controller->sql("INSERT INTO messages (message_date, user_id, reciever_id, content) VALUES (' $date','$userId','$recieverId','$content')");
    }

    public function getMessages($user,$reciever)
    {   
    

        $user = $this->userManager->returnUser($user);
        $reciever = $this->userManager->returnUser($reciever);

        $result = $this->controller->sql("SELECT content, user_id, reciever_id, message_date FROM messages WHERE user_id = '$user->id' AND reciever_id = '$reciever->id' OR user_id = '$reciever->id' AND reciever_id = '$user->id'");
        $arrayOfUsers = array();
        foreach ($result as $row) {
            if($row->user_id ==$user->id){
                array_push($arrayOfUsers, new Message($user->name,$reciever->name, $row->message_date, $row->content,true));
            }else{
                array_push($arrayOfUsers, new Message($reciever->name,$user->name, $row->message_date, $row->content,false));
            }
        }

        return $arrayOfUsers;
    }


    
}
