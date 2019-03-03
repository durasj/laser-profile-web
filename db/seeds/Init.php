<?php


use Phinx\Seed\AbstractSeed;

class Init extends AbstractSeed
{
    public function run()
    {
        $data = [
            [
                'nick'      => 'admin',
                'email'     => 'admin@domain.com',
                'password'  => password_hash('lsruser123', PASSWORD_BCRYPT),
                'role'      => 'admin',
            ],
        ];

        $this->table('users')->insert($data)->save();
    }
}
