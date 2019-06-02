<?php
// Application middleware

$container = $app->getContainer();

$app->add(new \Boronczyk\LocalizationMiddleware(
    $container->settings['locale']['available'],
    $container->settings['locale']['default'],
));

$app->add(new \Tuupola\Middleware\JwtAuthentication([
    'path' => ['/api'],
    'ignore' => ['/api/auth'],
    'secret' => $container->settings['jwt']['secret']
]));

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
