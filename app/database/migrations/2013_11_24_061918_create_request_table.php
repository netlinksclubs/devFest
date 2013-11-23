<?php

use Illuminate\Database\Migrations\Migration;

class CreateRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('request', function($t)
		{
			$t->increments('id');
			$t->integer('user_id')->unsigned();
			$t->tinyInteger('done');
			$t->tinyInteger('needHelp');

			$t->foreign('user_id')->references('id')->on('user')->onUpdate('cascade')->onDelete('cascade');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}