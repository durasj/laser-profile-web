<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class IndexController
{
    public function __invoke(Request $request, Response $response, array $args)
    {
        // Web server should automatically handle routes that dont start with /api as files
        // with fallback to index.html as backend UI is SPA
        // Still, for built-in PHP server, we'll serve the index.html

        return $response->write(file_get_contents(__DIR__ . '/../assets/index.html'));
    }
}
