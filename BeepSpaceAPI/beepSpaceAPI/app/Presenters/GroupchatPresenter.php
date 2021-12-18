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
    public function renderDefault(string $type, int $id, string $user)
    {
        $this->groupchatManager  = new GroupChatManager();
        if($type == "ALL"){
          return $this->sendJson($this->groupchatManager->returnAllChats($user));
        }else if($type =="IN-CHAT"){
          return $this->sendJson($this->groupchatManager->isInOneChat($user,$id));
        }

        $data = [];
	    return $this->sendJson($data);
    }

    

}
