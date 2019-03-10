<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class GamesController
{
    public function __construct($container)
    {
        $this->renderer = $container->get('renderer');
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        return $this->renderer->render($response, 'games.phtml', $args);
    }
}
