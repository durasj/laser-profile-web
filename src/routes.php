<?php

use \Controllers\IndexController;
use \Controllers\LoginController;
use \Controllers\GamesController;

// GUI Routes
$app->get('/', IndexController::class);
$app->get('/login', LoginController::class);
$app->get('/games', GamesController::class);

// Backend API routes

// REST API routes
