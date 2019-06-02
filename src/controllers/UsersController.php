<?php

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

use Models\User;

class UsersController extends CRUDController
{
    protected $modelClass = User::class;

    protected function create(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        $item = new $this->modelClass($data);

        $item->password = $data['password'];
        $item->role = $data['role'];

        $item->save();

        return $response->withJson($item);
    }

    protected function update(Request $request, Response $response, $id)
    {
        $data = $request->getParsedBody();

        $item = $this->modelClass::find($id);

        if (!$item) {
            return $response
                ->withStatus(404, 'Item with the given id was not found.')
                ->write('Item with the given id was not found.');
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
