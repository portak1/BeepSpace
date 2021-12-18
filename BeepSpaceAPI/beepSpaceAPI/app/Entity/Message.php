<?php

declare(strict_types=1);

namespace App\Entity;

class Message{

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
    public $mine;

      /**
     *  @var bool
     */
    public $isChatMessage;

    
    public function __construct($user,$reciever,$date,$content,$mine,$isChatMessage){
        $this->setUser($user);
        $this->setDate($date);
        $this->setContent($content);
        $this->setReciever($reciever);
        $this->setMine($mine);
        $this->setIsChatMessage($isChatMessage);
    }

    private function setUser($user){
        $this->user = $user;
    }

    private function setIsChatMessage($isChatMessage){
        $this->isChatMessage = $isChatMessage;
    }
    private function setMine($mine){
        $this->mine = $mine;
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