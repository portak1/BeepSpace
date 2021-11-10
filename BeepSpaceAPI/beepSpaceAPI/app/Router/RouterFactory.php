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
		$router->addRoute('User?[username=<username>][&password=<password>][&email=<email>][&number=<number>][&birth=<birth>][&type=<type>]',array(
			'presenter' => 'User',
			'action'    => 'default',
			'email'    => '',
			'username' => '',
			'password' => '',
			'number'    => 0,
			'birth'    => '',		
			 'type'	    => 'login'
		));

		$router->addRoute('<presenter>/<action>[/<id>]', 'Homepage:default');

		return $router;
	}
}
