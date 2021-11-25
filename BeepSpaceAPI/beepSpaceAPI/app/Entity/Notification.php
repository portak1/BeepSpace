<?php

declare(strict_types=1);

namespace App\Entity;

class Notification{


 /**
     *  @var int
     */
    public $id;
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
    public $type;


    public function __construct($id,$user,$reciever,$date,$content,$type){
        $this->setUser($user);
        $this->setDate($date);
        $this->setContent($content);
        $this->setReciever($reciever);
        $this->setType($type);
        $this->setId($id);
    }

    private function setId($id){
        $this->id = $id;
    }
    private function setUser($user){
        $this->user = $user;
    }

    private function setType($type){
        $this->type = $type;
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