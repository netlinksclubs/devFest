<?php

use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration {
	/**
	 * Add user table
	 *
	 * The table should have:
	 * id which is a positive integer
	 * email which is a string of 256 characters maximum
	 * password which is a 64 characters string
	 * first_name which is a 128 characters string
	 * middle_name which is a 128 characters string
	 * last_name which is a 128 characters string
	 * bio which is a text field
	 * Timestamps for created and update times
	 * @return void
	 */
	public function up()
	{
		Schema::create('user', function($table) {
			$table->increments('id');
			$table->string('password', 64);
			$table->text('avatar');
			$table->string('first_name', 128);
			$table->string('middle_name', 128);
			$table->string('last_name', 128);
			$table->tinyInteger('level');
			$table->text('bio');

			$table->timestamps();
			$table->softDeletes();
		});

		DB::statement('ALTER TABLE ' . \Config::get('database.connections.mysql.prefix') . 'user ADD COLUMN email varchar(256) COLLATE latin1_swedish_ci NOT NULL UNIQUE AFTER id;');
	}

	/**
	 * Destroy the user's table
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user');
	}
}