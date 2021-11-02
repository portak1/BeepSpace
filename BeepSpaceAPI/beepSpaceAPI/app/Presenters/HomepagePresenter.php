<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;


final class HomepagePresenter extends Nette\Application\UI\Presenter
{
    public function renderDefault()
    {
        $data = [];
	    return $this->sendJson($data);
    }

    

}
