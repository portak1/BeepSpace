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
        }else if($type == "CREATE"){
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
