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
    public function renderDefault(string $type, string $user, string $reciever, string $content,int $id, string $date, bool $addNotification)
    {
        $this->notificationsManager = new NotificationsManager();
        if ($type == "CREATE") {
            $data = [
                "state" => $this->notificationsManager->createNewNotification($user, $reciever, $date, $content, $addNotification)
            ];
        } else if ($type == "REMOVE") {
            $data = [
                "state" => $this->notificationsManager->removeNotification($user)
            ];
        }
        else if ($type == "REMOVEONE") {
            $data = [
                "state" => $this->notificationsManager->removeNotificationByID($id)
            ];
        } else if ($type == "GET") {
            return $this->sendJson($this->notificationsManager->getNotification($user));
        } else if ($type == "CONFIRM") {
            $data = [
                "state" => $this->notificationsManager->confirmFriendRequest($user,$reciever,$id)
            ];
        } else {
            $data = [
                "state" => "ERROR 400: WRONG TYPE OF REQUEST."
            ];
        }


        return $this->sendJson($data);
    }
}
