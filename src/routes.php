<?php

use \Controllers\IndexController;
use \Controllers\AuthController;
use \Controllers\GamesController;
use \Controllers\TeamsController;
use \Controllers\UsersController;

// OPTIONS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response->withStatus(200);
});

$app->group('/api', function (Slim\App $app) {
    // Auth routes
    $app->post('/auth', AuthController::class);
    $app->get('/token', AuthController::class);

    // REST API routes
    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/games[/{id:[0-9]+}]', GamesController::class);
    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/game[/{id:[0-9]+}]', GamesController::class);

    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/teams[/{id:[0-9]+}]', TeamsController::class);
    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/team[/{id:[0-9]+}]', TeamsController::class);

    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/users[/{id:[0-9]+}]', UsersController::class);
    $app->map(['GET', 'POST', 'PATCH', 'DELETE'], '/user[/{id:[0-9]+}]', UsersController::class);
});

// GUI Routes
$app->get('/[{path:.*}]', IndexController::class);
