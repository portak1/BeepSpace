<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;



class PepegacPresenter extends Nette\Application\UI\Presenter
{

	public function renderDefault(int $id, string $heslo)
    {
       
        $data = [
            "id" => $id,
            "heslo" => $heslo
        ];
	    return $this->sendJson($data);
    }   



}