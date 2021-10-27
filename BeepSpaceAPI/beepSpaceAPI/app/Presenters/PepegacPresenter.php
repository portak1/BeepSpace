<?php
use Contributte\ApiRouter\ApiRoute;

class PepegacPresenter extends Nette\Application\UI\Presenter
{

	public function renderDefault()
    {
        $data = ['pepegac' => 'nette'];
	    return $this->sendJson($data);
    }

}