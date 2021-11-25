<?php

declare(strict_types=1);

namespace App\Router;

use Nette;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
	use Nette\StaticClass;

	public static function createRouter(): RouteList
	{
		$router = new RouteList;
		$router->addRoute('Message?[create=<create>][&user=<user>][&reciever=<reciever>][&content=<content>][&date=<date>]',array(
			'presenter' => 'Message',
			'action'    => 'default',
			'create'    => 0,
			'content'   => '',
			'date'      =>''
		));
		$router->addRoute('User?[username=<username>][&password=<password>][&email=<email>][&id=<id>][&id2=<id2>][&number=<number>][&birth=<birth>][&type=<type>]',array(
			'presenter'=> 'User',
			'action'   => 'default',
			'email'    => '',
			'username' => '',
			'password' => '',
			'id'       => 0,
			'id2'       => 0,			
			'number'   => 0,
			'birth'    => '',		
			 'type'	   => 'login'
		));
		$router->addRoute('Notification?[type=<type>][&user=<user>][&reciever=<reciever>][&content=<content>][&date=<date>][&addNotification=<addNotification>]',array(
			'presenter' => 'Notification',
			'action'    => 'default',
			'type'    => "GET",
			'content'   => '',
			'reciever '=> '',
			'date'      =>'',
			'addNotification' => 0
		));

		$router->addRoute('<presenter>/<action>[/<id>]', 'Homepage:default');

		return $router;
	}
}
