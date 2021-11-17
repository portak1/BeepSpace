<?php


declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

header('Access-Control-Allow-Headers: accept, content-type, authorization');
header('Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT');
header('Access-Control-Allow-Origin: *');
if ("OPTIONS" === $_SERVER['REQUEST_METHOD']) {
	return;
}

App\Bootstrap::boot()
	->createContainer()
	->getByType(Nette\Application\Application::class)
	->run();
