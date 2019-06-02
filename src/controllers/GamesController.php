<?php

namespace Controllers;

use Models\Game;

class GamesController extends CRUDController
{
    protected $modelClass = Game::class;
}
