<?php

declare(strict_types=1);

namespace App\Presenters;

use DateTime;
use Nette;
use MessageManager;



class MessagePresenter extends Nette\Application\UI\Presenter
{

    public $messageManager;
	public function renderDefault(bool $create, string $user,string $content, string $date)
    {
        $this->messageManager = new MessageManager();
       if($create){
            $data = [
                "state" => $this->messageManager->createNewMessage($content,$user,$date)
            ];
       }else{
           $data = $this->messageManager->getMessages($user);
       }

      
	    return $this->sendJson($data);
    }   



}