<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class IndexController
{
    public function __invoke(Request $request, Response $response, array $args)
    {
        // TODO: Add actual logic

        // Redirect to login if not authenticated
        return $response->withRedirect('/login');

        // ... otherwise to games
        return $response->withRedirect('/games');
    }
}
