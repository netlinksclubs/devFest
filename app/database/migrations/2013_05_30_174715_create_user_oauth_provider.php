<?php

use Illuminate\Database\Migrations\Migration;

class CreateUserOauthProvider extends Migration {

/**
	 * Add user_oauth_provider table
	 *
	 * The table should have:
	 * user_id which is a positive integer that refernces a user
	 * oauth_provider_id which is a positive integer that refernces a oauth_provider
	 * oauth_user_id a positive integer assigned by the provider to the user
	 * Timestamps for created and update times
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_oauth_provider', function($table) {
			$table->increments('id');

			$table->integer('user_id')->unsigned();
			$table->integer('oauth_provider_id')->unsigned();

			$table->integer('oauth_user_id')->unsigned();

			$table->foreign('user_id')->references('id')->on('user')->onUpdate('cascade')->onDelete('cascade');
			$table->foreign('oauth_provider_id')->references('id')->on('oauth_provider')->onUpdate('cascade')->onDelete('cascade');

			$table->timestamps();
		});
	}

	/**
	 * Destroy the user_oauth_provider table
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user_oauth_provider');
	}

}