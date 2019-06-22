<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

use Models\User;

class UsersController extends CRUDController
{
    protected $roleCanEdit = [
        'admin' => ['admin', 'operator', 'player'],
        'operator' => ['player'],
        'player' => [],
    ];

    protected $modelClass = User::class;

    protected function getOne(Request $request, Response $response, int $id)
    {
        $accessToken = $request->getAttribute('token');
        $role = $accessToken['role'];
        $item = $this->modelClass::whereIn('role', $this->roleCanEdit[$role])->get();

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
        }

        return $response->withJson($item);
    }

    protected function getAll(Request $request, Response $response)
    {
        $accessToken = $request->getAttribute('token');
        $role = $accessToken['role'];
        return $response->withJson(
            $this->modelClass::whereIn('role', $this->roleCanEdit[$role])->get()
        );
    }

    protected function create(Request $request, Response $response)
    {
        $accessToken = $request->getAttribute('token');
        $data = $request->getParsedBody();

        $role = $accessToken['role'];
        if (!in_array($data['role'], $this->roleCanEdit[$role])) {
            return $response->withStatus(401)->write('Not allowed to edit this role.');
        }

        $item = new $this->modelClass($data);

        $item->password = $data['password'];
        $item->role = $data['role'];

        $item->save();

        return $response->withJson($item);
    }

    protected function update(Request $request, Response $response, $id)
    {
        $accessToken = $request->getAttribute('token');
        $data = $request->getParsedBody();

        $item = $this->modelClass::find($id);

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
        }

        $role = $accessToken['role'];
        if (!in_array($item['role'], $this->roleCanEdit[$role])
            || (isset($data['role']) && !in_array($data['role'], $this->roleCanEdit[$role]))
        ) {
            return $response->withStatus(401)->write('Not allowed to edit this role.');
        }

        $item->update($data);

        if (!empty($data['password'])) {
            $item->password = $data['password'];
        }
        if (!empty($data['role'])) {
            $item->role = $data['role'];
        }

        $item->save();

        return $response->withJson($item);
    }
}
