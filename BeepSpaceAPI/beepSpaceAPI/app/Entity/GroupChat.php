<?php

declare(strict_types=1);

namespace App\Entity;

class GroupChat{

    /**
     *  @var int
     */
    public $id;
     /**
     *  @var string
     */
    public $name;

    /**
     *  @var string
     */
    public $color;

      /**
     *  @var string
     */
    public $users;

     /**
     *  @var string
     */
    public $connectedUsers;

    
    public function __construct($id,$name,$color,$users,$connectedUsers){
        $this->setId($id);
        $this->setName($name);
        $this->setColor($color);
        $this->setUsers($users);
        $this->setConnectedUsers($connectedUsers);
    }

    private function setId($id){
        $this->id = $id;
    }

    private function setName($name){
        $this->name = $name;
    }
    private function setColor($color){
        $this->color = $color;
    }


    private function setUsers($users){
        $this->users = $users;
    }

    private function setConnectedUsers($connectedUsers){
        $this->connectedUsers = $connectedUsers;
    }

}