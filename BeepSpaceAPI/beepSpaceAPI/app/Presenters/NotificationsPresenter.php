<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use NotificationsManager;

class NotificationsPresenter extends Nette\Application\UI\Presenter
{

        /**
     *  @var NotificationsManager
     */
    private $notificationsManager;
	public function renderDefault(string $type, string $user,string $reciever,string $content, string $date, bool $addNotification)
    {
        $this->notificationsManager = new NotificationsManager();
       if($type == "CREATE"){
            $data = [
                "state" => $this->notificationsManager->createNewNotification($user,$reciever,$date,$content,$addNotification)
            ];
       }else if($type == "REMOVE"){
           $data = [
               "state" => $this->notificationsManager->removeNotification($user)
           ];
       }else if($type == "GET"){
            return $this->send($this->notificationsManager->getNotification($user));
       }else{
        $data = [
            "state" => "ERROR 400: WRONG TYPE OF REQUEST."
        ];
       }

      
	    return $this->sendJson($data);
    }   



}