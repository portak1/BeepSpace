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
        $this->controller = new Controller('mysql:host=sql.endora.cz:3310;dbname=beepspace', 'beepspaceapi', 'Lofas125');
        $this->userManager = new UserManager();
        $this->groupchatManager = new GroupChatManager();
    }


    public function createNewMessage($content, $user,$reciever, $date, $isChatMessage,$chatId)
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
            $recieverId = $userId;
        }

        $this->controller->sql("INSERT INTO messages (message_date, user_id, reciever_id, content,isChatMessage,chat_id) VALUES (' $date','$userId','$recieverId','$content','$isChatMessage','$chatId')");
        return "message Created";
    }


    public function getMessagesForChat($user,$groupchatId){
        $user = $this->userManager->returnUser($user);
        $groupchat = $this->groupchatManager->returnGroupchat($groupchatId);
        $arrayOfUsers = array();


        $result = $this->controller->sql("SELECT content, user_id, reciever_id, isChatMessage, message_date FROM messages WHERE chat_id = '$groupchatId'");
        foreach ($result as $row) {
            if($row->user_id ==$user->id){
                array_push($arrayOfUsers, new Message($user->name,$groupchat->name, $row->message_date, $row->content,true,$row->isChatMessage));
            }else{
                $user = $this->userManager->convertIDtoName($row->user_id);
                array_push($arrayOfUsers, new Message($user,$groupchat->name, $row->message_date, $row->content,false,$row->isChatMessage));
            }
        }

        return $arrayOfUsers;
    }

    public function getMessages($user,$reciever)
    {   
    

        $user = $this->userManager->returnUser($user);
        $reciever = $this->userManager->returnUser($reciever);

        $result = $this->controller->sql("SELECT content, user_id, reciever_id, isChatMessage, message_date FROM messages WHERE user_id = '$user->id' AND reciever_id = '$reciever->id' OR user_id = '$reciever->id' AND reciever_id = '$user->id'");
        $arrayOfUsers = array();
        foreach ($result as $row) {
            if($row->user_id ==$user->id){
                array_push($arrayOfUsers, new Message($user->name,$reciever->name, $row->message_date, $row->content,true,$row->isChatMessage));
            }else{
                array_push($arrayOfUsers, new Message($reciever->name,$user->name, $row->message_date, $row->content,false,$row->isChatMessage));
            }
        }

        return $arrayOfUsers;
    }


    
}
