<?php
return [
    'settings' => [
        'displayErrorDetails' => DISPLAY_ERRORS, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        // JWT token settings
        'jwt' => [
            'secret' => 'somesuperhardsecret',
        ],

        'db' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'database' => 'DB_NAME',
            'username' => 'DB_USER',
            'password' => 'DB_PASSWORD',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],

        'locale' => [
            'available' => ['en_US', 'sk_SK'],
            'default' => 'en_US',
        ],
    ],
];
