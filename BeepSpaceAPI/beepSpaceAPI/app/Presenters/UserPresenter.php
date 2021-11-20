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
	public function renderDefault(string $username, string $password,string $email, int $number,string $birth,string $type)
    {
        $this->userManager = new UserManager();
        if($type == "REGISTRATION"){
            return $this->sendJson([
                "state" => $this->userManager->createUser($username,$password,$email,$number,$birth)
            ]);
        }
        if($type == "ALL"){
            return $this->sendJson($this->userManager->returnAllUsers());
        }
        if($type == "ONE"){
            return $this->sendJson(($this->userManager->returnUser($username)));
        }
        if($this->userManager->checkLogin($username,$password)){
            $this->data = $this->userManager->returnUser($username);
         }else{
            $this->data = [
                "state" => "WRONG"
            ];
         }
	    return $this->sendJson($this->data);
    }   



}