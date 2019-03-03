<?php
// Application middleware

$container = $app->getContainer();

$app->add(new \Slim\Csrf\Guard);

$app->add(new \Boronczyk\LocalizationMiddleware(
    $container->settings['locale']['available'], $container->settings['locale']['default']),
);

$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/api"],
    "ignore" => ["/api/token",],
    "secret" => $container->settings['jwt']['secret']
]));
