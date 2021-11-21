<?php

declare(strict_types=1);

namespace App\Entity;

class User
{

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
    /**
     *  @var bool
     */
    public $online;


    public function __construct($name, $id, $email, $number, $birth, $online)
    {
        $this->setName($name);
        $this->setEmail($email);
        $this->setNumber($number);
        $this->setBirth($birth);
        $this->setID($id);
        $this->setOnline($online);
    }

    private function setName($name)
    {
        $this->name = $name;
    }

    private function setOnline($online)
    {
        $this->online = $online;
    }

    private function setEmail($email)
    {
        $this->email = $email;
    }

    private function setNumber($number)
    {
        $this->number = $number;
    }
    private function setBirth($birth)
    {
        $this->birth = $birth;
    }

    private function setID($id)
    {
        $this->id = $id;
    }
}
