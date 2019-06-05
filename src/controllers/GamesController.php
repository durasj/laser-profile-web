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
            $game->players = [
                [
                    "name" => "R4Tman",
                    "k/d" => "34/20",
                    "points" => 4275
                ],
                [
                    "name" => "lorem",
                    "k/d" => "25/20",
                    "points" => $points
                ],
                [
                    "name" => "XxX",
                    "k/d" => "25/25",
                    "points" => 1250
                ],
                [
                    "name" => "Trinity",
                    "k/d" => "25/25",
                    "points" => -210
                ],
                [
                    "name" => "CampingFTW",
                    "k/d" => "5/14",
                    "points" => -1210
                ]
            ];
            return $game;
        });

        return $response->withJson($items);
    }
}
