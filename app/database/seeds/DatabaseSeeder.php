<?php

class DatabaseSeeder extends Seeder {

    public function run()
    {
        $this->call('CatogrieTableSeeder');

        $this->command->info('User table seeded!');
    }

}

class CatogrieTableSeeder extends Seeder {

    public function run()
    {
        Category::create(['name' => 'addiction','descreption'=> 'test test test']);
    }

}