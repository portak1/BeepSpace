<?php

declare(strict_types=1);

namespace App\Entity;

class User{

    /**
     *  @var string
     */
    public $name;

    /**
     *  @var string
     */
    public $email;

      /**
     *  @var int
     */
    public $number;

     /**
     *  @var int
     */
    public $id;
    /**
     *  @var string
     */
    public $birth;


    public function __construct($name, $id,$email,$number,$birth){
        $this->setName($name);
        $this->setEmail($email);
        $this->setNumber($number);
        $this->setBirth($birth);
        $this->setID($id);
    }

    private function setName($name){
        $this->name = $name;
    }


    private function setEmail($email){
        $this->email = $email;
    }

    private function setNumber($number){
        $this->number = $number;
    }
    private function setBirth($birth){
        $this->birth = $birth;
    }

    private function setID($id){
        $this->id = $id;
    }
    

}