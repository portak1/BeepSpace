<?php

declare(strict_types=1);

namespace App\Presenters;

use App\Entity\GroupChat;
use GroupChatManager;
use Nette;



final class GroupchatPresenter extends Nette\Application\UI\Presenter
{

    /**
     *  @var GroupChatManager
     */
    private $groupchatManager;
    public function renderDefault(string $type, int $id, string $user, string $name, string $color)
    {
       $data = [];
        $this->groupchatManager  = new GroupChatManager();
        if($type == "ALL"){
          return $this->sendJson($this->groupchatManager->returnAllChats($user));
        }else if($type =="IN-CHAT"){
          return $this->sendJson($this->groupchatManager->isInOneChat($user,$id));
        }else if($type == "ACTIVE-USERS"){
          return $this->sendJson(($this->groupchatManager->activeUsers($id)));
        }else if($type == "REMOVE-ACTIVE-USER"){
          if($this->groupchatManager->removeActiveUser($name)){
            $data = [
              "state" => "user removed"
          ];
        }
        }else if($type == "GET-GROUPCHAT"){
          return $this->sendJson($this->groupchatManager->returnGroupchat($id));
        }else if($type == "ACCEPT-INVITE"){
          if($this->groupchatManager->acceptInvite($id,$user)){
            $data = [
              "state" => "ADDED"
          ];
          }else{
            $data = [
              "state" => "ERROR, SOMETHING WENT WRONG"
          ];}
        }else if($type == "ADD-ACTIVE-USER"){
          if($this->groupchatManager->addActiveUser($id,$name)){
            $data = [
              "state" => "user added"
          ];
          }

        } else if($type == "CREATE"){
          if($this->groupchatManager->createGroupchat($name,$color,$id)){
            $data = [
              "state" => "CREATED"
          ];
          }else{
            $data = [
              "state" => "ERROR, SOMETHING WENT WRONG"
          ];}
        }

        
	    return $this->sendJson($data);
    }

    

}
