<?php

use Phinx\Seed\AbstractSeed;

class Games extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 3; $i++) {
            $dateTime = $faker->dateTimeBetween('-1 year', 'now', $timezone = null)->format('Y-m-d H:i:s');
            $data[] = [
                'played'    => $dateTime,
                'players'   => $faker->numberBetween(4, 12),
                'teams'     => 'XvsX',
            ];
        }

        $this->table('games')->insert($data)->save();
    }
}
