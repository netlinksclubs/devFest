<?php

use Illuminate\Database\Migrations\Migration;

class CreateOauthProvider extends Migration {
	/**
	 * Add oauth_provider table
	 *
	 * The table should have:
	 * id which is a positive integer
	 * provider which is a 100 characters string
	 * Timestamps for created and update times
	 * @return void
	 */
	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('oauth_provider', function($table) {
			$table->increments('id');
			$table->string('provider', 100);

			$table->timestamps();
		});

		\Oauth_provider::create(array('provider' => 'google')); 
	}

	/**
	 * Destroy the oauth_provider table
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('oauth_provider');
	}
}