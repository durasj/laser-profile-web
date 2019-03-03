<?php


use Phinx\Seed\AbstractSeed;

class Init extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 3; $i++) {
            $data[] = [
                'nick'      => $faker->userName,
                'email'     => $faker->email,
                'password'  => password_hash('lsruser123', PASSWORD_BCRYPT),
                'role'      => 'operator',
            ];
        }

        $this->table('users')->insert($data)->save();
    }
}
