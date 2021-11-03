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
    public $date;

      /**
     *  @var string
     */
    public $content;


    public function __construct($user,$date,$content){
        $this->setUser($user);
        $this->setDate($date);
        $this->setContent($content);
    }

    private function setUser($user){
        $this->user = $user;
    }

    public function getUser(){
        return $this->user;
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