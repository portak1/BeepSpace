<?php

declare(strict_types=1);

namespace App\Presenters;

use DateTime;
use Nette;
use MessageManager;



class MessagePresenter extends Nette\Application\UI\Presenter
{

/**
     *  @var MessageManager
     */
    private $messageManager;
	public function renderDefault(bool $create, string $user,string $reciever,string $content, string $date)
    {
        $this->messageManager = new MessageManager();
       if($create){
            $data = [
                "state" => $this->messageManager->createNewMessage($content,$user,$reciever,$date)
            ];
       }else{
           $data = $this->messageManager->getMessages($user,$reciever);
       }

      
	    return $this->sendJson($data);
    }   



}