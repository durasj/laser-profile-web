<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;

use Models\User;

class AuthController
{
    protected $db;
    protected $settings;

    public function __construct($container)
    {
        $this->db = $container->get('db');
        $this->settings = $container->settings;
    }

    public function __invoke(Request $request, Response $response, $args)
    {
        if ($request->isPost() && $request->getUri()->getPath() === '/api/auth') {
            return $this->login($request, $response);
        } elseif ($request->isGet() && $request->getUri()->getPath() === '/api/token') {
            return $this->getAccessToken($request, $response);
        }
    }

    public function login(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        if (!isset($data['email']) || !isset($data['password'])) {
            return $response->withStatus(400)->write('Email and password are required.');
        }

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            // We need to run the password hash anyway to prevent timing attacks
            password_verify(
                '123',
                '$argon2i$v=19$m=1024,t=2,p=2$YzJBSzV4TUhkMzc3d3laeg$zqU/1IN0/AogfP4cmSJI1vc8lpXRW9/S0sYY2i2jHT0',
            );
            return $response->withStatus(401)->write('Email or password is wrong.');
        }

        if (!$user->verifyPassword($data['password'])) {
            return $response->withStatus(401)->write('Email or password is wrong.');
        }

        $secret = $this->settings['jwt']['secret'];
        $issued = time();
        $token = [
            'nbf' => $issued,
            'iat' => $issued,
            'id' => $user->id,
            'type' => 'refresh',
        ];

        return $response->withJson([
            'token' => JWT::encode($token, $secret),
        ]);
    }

    public function getAccessToken(Request $request, Response $response)
    {
        $refreshToken = $request->getAttribute('token');

        if (!$refreshToken
            || !isset($refreshToken['type'])
            || $refreshToken['type'] !== 'refresh'
        ) {
            return $response->withStatus(400)->write('Refresh token is needed for renew.');
        }

        $user = User::find($refreshToken['id']);

        $secret = $this->settings['jwt']['secret'];
        $issued = time();
        $token = [
            'nbf' => $issued,
            'iat' => $issued,
            'exp' => strtotime('+1 hour', $issued),
            'id' => $user->id,
            'nick' => $user->nick,
            'email' => $user->email,
            'role' => $user->role,
            'type' => 'access',
        ];

        return $response->withJson([
            'token' => JWT::encode($token, $secret),
            'user' => $user,
        ]);
    }
}
