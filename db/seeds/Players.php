<?php


use Phinx\Seed\AbstractSeed;

class Players extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'nick'      => $faker->userName,
                'email'     => $faker->email,
                'password'  => password_hash('lsruser123', PASSWORD_BCRYPT),
                'role'      => 'player',
            ];
        }

        $this->table('users')->insert($data)->save();
    }
}
