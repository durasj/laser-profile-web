<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

abstract class CRUDController
{
    protected $db;
    protected $acl;

    public function __construct($container)
    {
        $this->db = $container->get('db');
        $this->acl = $container->acl;
    }

    public function __invoke(Request $request, Response $response, array $args)
    {
        if (!$this->hasAccess($request, $response)) {
            return $response->withStatus(401)->write('Insufficient rights.');
        }

        if ($request->getMethod() === 'GET' && !empty($args['id'])) {
            return $this->getOne($request, $response, $args['id']);
        } elseif ($request->getMethod() === 'GET' && empty($args['id'])) {
            return $this->getAll($request, $response);
        } elseif ($request->getMethod() === 'POST') {
            return $this->create($request, $response);
        } elseif ($request->getMethod() === 'PATCH' && !empty($args['id'])) {
            return $this->update($request, $response, $args['id']);
        } elseif ($request->getMethod() === 'DELETE' && !empty($args['id'])) {
            return $this->delete($request, $response, $args['id']);
        } else {
            return $response->withStatus(501)->write('Supported methods: GET, POST, PATCH, DELETE.');
        }
    }

    protected function getOne(Request $request, Response $response, int $id)
    {
        $item = $this->modelClass::find($id);

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
        }

        return $response->withJson($item);
    }

    protected function getAll(Request $request, Response $response)
    {
        return $response->withJson($this->modelClass::all());
    }

    protected function create(Request $request, Response $response)
    {
        $item = new $this->modelClass($request->getParsedBody());

        $item->save();

        return $response->withJson($item);
    }

    protected function update(Request $request, Response $response, int $id)
    {
        $item = $this->modelClass::find($id);

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
        }

        $item->update($request->getParsedBody());

        return $response->withJson($item);
    }

    protected function delete(Request $request, Response $response, int $id)
    {
        $item = $this->modelClass::find($id);

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
        }

        $item->delete();

        return $response->withJson($item);
    }

    protected function hasAccess(Request $request, Response $response)
    {
        $accessToken = $request->getAttribute('token');

        if (!$accessToken
            || !isset($accessToken['type'])
            || $accessToken['type'] !== 'access'
        ) {
            return $response->withStatus(401)->write('Invalid token.');
        }

        $actionName = 'unknown';
        switch ($request->getMethod()) {
            case 'POST':
                $actionName = 'create';
                break;

            case 'GET':
                $actionName = 'read';
                break;

            case 'PATCH':
                $actionName = 'update';
                break;

            case 'DELETE':
                $actionName = 'delete';
                break;
        }

        $modelName = strtolower(\preg_replace('/Controllers\\\(.*)Controller/', '$1', get_class($this)));
        $ruleName = $modelName . ':' . $actionName;

        return in_array($ruleName, $this->acl[$accessToken['role']]);
    }
}
