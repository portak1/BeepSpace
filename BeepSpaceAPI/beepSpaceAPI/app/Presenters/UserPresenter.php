<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use UserManager;



class UserPresenter extends Nette\Application\UI\Presenter
{

    /**
     *  @var UserManager
     */
    private $userManager;
    private $data;
    public function renderDefault(string $username, string $password, string $email, int $id, int $id2, int $number, string $birth, string $type)
    {
        $this->userManager = new UserManager();
        if ($type == "REGISTRATION") {
            return $this->sendJson([
                "state" => $this->userManager->createUser($username, $password, $email, $number, $birth)
            ]);
        }
        if ($type == "ALL") {
            return $this->sendJson($this->userManager->returnAllUsers());
        }
        if ($type == "ONE") {
            return $this->sendJson($this->userManager->returnUser($username));
        }
        if($type == "ONE-BY-ID"){
            return $this->sendJson($this->userManager->returnUser($this->userManager->convertIDtoName($id)->name));
        }
        if ($type == "ADD-FRIEND") {
            return $this->sendJson([
                "state" =>  $this->userManager->addFriend($id, $id2)
            ]);
        }

        if ($type == "REMOVE-FRIEND") {
            return $this->sendJson([
                "state" => $this->userManager->removeFriend($id, $id2)
            ]);
        }

        if ($type == "IS-FRIENDS") {
            return $this->sendJson([
                "state" => $this->userManager->isFriend($id, $id2)
            ]);
        }

        if($type == "SET-ONLINE"){
            return $this->sendJson([
                "state" => $this->userManager->setOnline($id)
            ]);
        }
        
        if($type == "SET-PAUSE"){
            return $this->sendJson([
                "state" => $this->userManager->setPause($id)
            ]);
        }
        
        if($type == "SET-OFFLINE"){
            return $this->sendJson([
                "state" => $this->userManager->setOffline($id)
            ]);
        }
        if ($this->userManager->checkLogin($username, $password)) {
            $this->data = $this->userManager->returnUser($username);
        } else {
            $this->data = [
                "state" => "WRONG"
            ];
        }
        return $this->sendJson($this->data);
    }
}
