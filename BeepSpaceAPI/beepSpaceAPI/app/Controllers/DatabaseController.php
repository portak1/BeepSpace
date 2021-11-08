<?php

declare(strict_types=1);


class DatabaseController{


    private $database;
    

	public function __construct($dsn, $user, $password)
	{
		$this->database = new Nette\Database\Connection($dsn, $user, $password);
	}

    public function sql($query){
        return $this->database->query($query);         
    }

}