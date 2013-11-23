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
		Schema::create('request', function($table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->tinyInteger('done');
			$table->tinyInteger('needHelp');

			$table->decimal('latitude', 18, 14);
			$table->decimal('longitude', 18, 14);

			$table->foreign('user_id')->references('id')->on('user')->onUpdate('cascade')->onDelete('cascade');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('request');
	}

}