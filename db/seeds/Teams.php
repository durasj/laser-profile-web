<?php


use Phinx\Seed\AbstractSeed;

class Teams extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'name' => $faker->word,
            ];
        }

        $this->table('teams')->insert($data)->save();
    }
}
