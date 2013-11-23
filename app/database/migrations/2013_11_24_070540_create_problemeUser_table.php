<?php

use Illuminate\Database\Migrations\Migration;

class CreateProblemeUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('problemeUser', function($t)
		{
			$t->increments('id');
			$t->integer('user_id')->unsigned();
			$t->integer('probleme_id')->unsigned();

			$t->foreign('user_id')->references('id')->on('user')->onUpdate('cascade')->onDelete('cascade');
			$t->foreign('probleme_id')->references('id')->on('probleme')->onUpdate('cascade')->onDelete('cascade');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('problemeUser');
	}

}