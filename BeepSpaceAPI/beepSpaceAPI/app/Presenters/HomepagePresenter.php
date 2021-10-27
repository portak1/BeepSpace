<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;


final class HomepagePresenter extends Nette\Application\UI\Presenter
{
    public function renderDefault()
    {
        $data = ['hello' => 'nette'];
	    return $this->sendJson($data);
    }

    public function renderTest()
    {

        $data = ['bye' => 'nette'];
        return $this->sendJson($data);
    }

}
