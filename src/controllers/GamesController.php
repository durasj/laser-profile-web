<?php

namespace Controllers;

use Models\Game;
use Slim\Http\Request;
use Slim\Http\Response;

class GamesController extends CRUDController
{
    protected $modelClass = Game::class;

    protected function getAll(Request $request, Response $response)
    {
        $items = $this->modelClass::all()->map(function ($game) {
            $points = rand(-1200, 4300);
            $game->points = $points;
            return $game;
        });

        return $response->withJson($items);
    }
}
