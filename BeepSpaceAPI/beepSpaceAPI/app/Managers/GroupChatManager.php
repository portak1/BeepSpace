<?php

declare(strict_types=1);

use App\Entity\GroupChat as GroupChat;
use App\Entity\User;
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
        $this->controller = new Controller('mysql:host=sql.endora.cz:3310;dbname=beepspace', 'beepspaceapi', 'Lofas125');
        $this->userManager = new UserManager();
    }


    public function returnAppAllChats(){
        $allGroupchats = array();
        $result = $this->controller->sql("SELECT id, name, color, users, connected_users FROM groupchat");
        foreach($result as $row){
               array_push($allGroupchats,new GroupChat($row->id,$row->name,$row->color,$row->users,$row->connected_users));
        };
        return $allGroupchats;
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
        $user = $this->userManager->returnUser($name);
        $groupchat = $this->returnGroupchat($groupchatID); 
        return $this->isInChat($user->id,$groupchat->users);
    }

    public function acceptInvite($id,$name){
        $userID = $this->userManager->convertNameToID($name);
        $result = $this->controller->sql("SELECT users FROM groupchat WHERE id='$id'");
        foreach($result as $row){
            if (($key = array_search($userID, explode(",",$row->users))) !== false) {
                return false;
            }
            $finalStringArr= $row->users . ",".$userID;
        }
        $result = $this->controller->sql("UPDATE groupchat SET users='$finalStringArr' WHERE id='$id'");
        return true;
    }

    public function addActiveUser($id,$name){
        $addUserID = $this->userManager->convertNameToID($name);
        $result = $this->controller->sql("SELECT connected_users FROM groupchat WHERE id='$id'");
        foreach($result as $row){
            if (($key = array_search($addUserID, explode(",",$row->connected_users))) !== false) {
                return;
            }
            $finalArray = $row->connected_users . ','.$addUserID;
        }
        $result = $this->controller->sql("UPDATE groupchat SET connected_users='$finalArray' WHERE id='$id'");
        return true;
    }

    public function removeActiveUser($name){
        $removeActiveUserID = $this->userManager->convertNameToID($name);
        $result = $this->controller->sql("SELECT id,connected_users FROM groupchat");
        foreach($result as $row){
            $finalArray = explode(",",$row->connected_users);
            $key = array_search($removeActiveUserID,$finalArray);
            unset($finalArray[$key]);
            $finalArray = implode(",",$finalArray);
            $result = $this->controller->sql("UPDATE groupchat SET connected_users='$finalArray' WHERE id='$row->id'");
        }
       
        return true;
    }

    public function activeUsers($groupchatID){
        $userArray = array();

        $result = $this->controller->sql("SELECT connected_users FROM groupchat where id='$groupchatID'");
        foreach($result as $row){
            $activeUsersID = explode(",",$row->connected_users);
            foreach($activeUsersID as $row2){
                $result2 = $this->controller->sql("SELECT * FROM users WHERE id='$row2'");
                foreach($result2 as $row3){
                    array_push($userArray,new User($row3->username,$row3->id,$row3->email,$row3->number,$row3->birth,$row3->online));
                }
            }
        }
        return $userArray;

    }
    

    public function createGroupchat($name,$color,$userID){
        $newColor = "#" . $color;
        $this->controller->sql("INSERT INTO groupchat(name,color,users) VALUES ('$name','$newColor','$userID') ");
        $result = $this->controller->sql("SELECT * FROM groupchat ORDER BY id DESC LIMIT 1");
       foreach($result as $row){
        return new GroupChat($row->id,$row->name,$row->color,$row->users,$row->connected_users);
       }
    }

    public function isInChat($id,$users){
            $array = explode(",",$users);   
            if (($key = array_search($id, $array)) !== false){
                return true;
            }
            return false;      
    }
}
