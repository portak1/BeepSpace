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
		$router->addRoute('Pepegac?id=<id>&heslo=<heslo>', 'Pepegac:default');
		$router->addRoute('Message?[create=<create>][&user=<user>][&content=<content>][&date=<date>]',array(
			'presenter' => 'Message',
			'action'    => 'default',
			'create'    => 0,
			'content'   => '',
			'date'      =>''
		));

		$router->addRoute('<presenter>/<action>[/<id>]', 'Homepage:default');

		return $router;
	}
}
