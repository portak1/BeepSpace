<?php

declare(strict_types=1);

namespace App\Entity;

class Notification{

    /**
     *  @var string
     */
    public $user;
     /**
     *  @var string
     */
    public $reciever;

    /**
     *  @var string
     */
    public $date;

      /**
     *  @var string
     */
    public $content;

     /**
     *  @var bool
     */
    public $addFriend;


    public function __construct($user,$reciever,$date,$content,$addFriend){
        $this->setUser($user);
        $this->setDate($date);
        $this->setContent($content);
        $this->setReciever($reciever);
        $this->setAddFriend($addFriend);
    }

    private function setUser($user){
        $this->user = $user;
    }

    private function setAddFriend($addFriend){
        $this->addFriend = $addFriend;
    }
    public function getUser(){
        return $this->user;
    }
    private function setReciever($reciever){
        $this->reciever = $reciever;
    }

    public function getReciever(){
        return $this->reciever;
    }


    private function setDate($date){
        $this->date = $date;
    }
    public function getDate(){
        return $this->date;
    }

    private function setContent($content){
        $this->content = $content;
    }
    public function getContent(){
        return $this->content;
    }

}