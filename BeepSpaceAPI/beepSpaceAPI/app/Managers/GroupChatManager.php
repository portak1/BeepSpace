<?php

declare(strict_types=1);

use App\Entity\GroupChat as GroupChat;
use DatabaseController as Controller;
use UserManager as UserManager;
class GroupChatManager
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


    public function returnAllChats($user){
        $allGroupchats = array();
        $userID = $this->userManager->convertNameToID($user);
        $result = $this->controller->sql("SELECT id, name, color, users, connected_users FROM groupchat");
        foreach($result as $row){
            if($this->isInChat($userID,$row->users)){
               array_push($allGroupchats,new GroupChat($row->id,$row->name,$row->color,$row->users,$row->connected_users));
            }
        };
        return $allGroupchats;

    }


    public function returnGroupchat($id){
        $result = $this->controller->sql("SELECT id, name, color, users, connected_users FROM groupchat WHERE id='$id'");
        foreach($result as $row){            
               return new GroupChat($row->id,$row->name,$row->color,$row->users,$row->connected_users);
            
        }
    }

    public function isInOneChat($name,$groupchatID){
        $id = $this->userManager->returnUser($name);
        $groupchat = $this->returnGroupchat($groupchatID);        
        return $this->isInChat($id,$groupchat->users);
    }
    

    public function isInChat($id,$users){
            $array = explode(",",$users);    
            if (($key = array_search($id, $array)) !== false){
                return true;
            }
            return false;      
    }
}
