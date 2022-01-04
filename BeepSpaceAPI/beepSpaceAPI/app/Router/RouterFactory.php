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
		$router->addRoute('Message?[create=<create>][&user=<user>][&reciever=<reciever>][&content=<content>][&date=<date>][&isChatMessage=<isChatMessage>][&chatId=<chatId>]',array(
			'presenter' => 'Message',
			'action'    => 'default',
			'create'    => 0,
			'reciever' => '',
			'content'   => '',
			'date'      =>'',
			'isChatMessage' => false,
			'chatId' =>0
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
		$router->addRoute('Notifications?[type=<type>][&user=<user>][&reciever=<reciever>][&content=<content>][&date=<date>][&id=<id>][&addNotification=<addNotification>][&groupchatID=<groupchatID>]',array(
			'presenter' => 'Notifications',
			'action'    => 'default',
			'type'    => "GET",
			'content'   => '',
			'reciever'=> '',
			'date'      =>'',
			'addNotification' => 0,
			'id' => 0,
			'user' => '',
			'groupchatID' =>0
		));
		$router->addRoute(('Groupchat?[type=<type>][&user=<user>][&id=<id>][&name=<name>][&color=<color>]'),array(
			'presenter' => 'Groupchat',
			'action'    => 'default',
			'user' => '',
			'id'   => 0,
			'name' => '',
			'color'   => ''
		));

		$router->addRoute('<presenter>/<action>[/<id>]', 'Homepage:default');

		return $router;
	}
}
