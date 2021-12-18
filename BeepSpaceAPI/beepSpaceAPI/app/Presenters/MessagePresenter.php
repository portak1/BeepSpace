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
	public function renderDefault(bool $create, string $user,string $reciever,string $content, string $date,bool $isChatMessage,int $chatId)
    {
        $this->messageManager = new MessageManager();
       if($create){
           if($isChatMessage){
            $data = [
                "state" => $this->messageManager->createNewMessage($content,$user,$reciever,$date,$isChatMessage,$chatId)
            ];
           }else{
            $data = [
                "state" => $this->messageManager->createNewMessage($content,$user,$reciever,$date,false,0)
            ];
           }
       }else{
           if($isChatMessage){
            $data = $this->messageManager->getMessagesForChat($user,$chatId);
           }else{
            $data = $this->messageManager->getMessages($user,$reciever);
           }
       }

      
	    return $this->sendJson($data);
    }   



}