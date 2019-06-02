<?php

use \Controllers\IndexController;
use \Controllers\AuthController;
use \Controllers\GamesController;
use \Controllers\TeamsController;
use \Controllers\UsersController;

$app->group('/api', function (Slim\App $app) {
    // Auth routes
    $app->post('/auth', AuthController::class);
    $app->get('/token', AuthController::class);

    // REST API routes
    $app->any('/games[/{id:[0-9]+}]', GamesController::class);
    $app->any('/game[/{id:[0-9]+}]', GamesController::class);

    $app->any('/teams[/{id:[0-9]+}]', TeamsController::class);
    $app->any('/team[/{id:[0-9]+}]', TeamsController::class);

    $app->any('/users[/{id:[0-9]+}]', UsersController::class);
    $app->any('/user[/{id:[0-9]+}]', UsersController::class);
});

// OPTIONS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// GUI Routes
$app->get('/[{path:.*}]', IndexController::class);
