<?php

use Illuminate\Database\Migrations\Migration;

class CreateProblemeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create("probleme", function($table) {
            $table->increments("id");
            $table->string("name", 32);
            $table->string("description", 320);
            $table->string("icon",2);
            $table->integer("catogrie_id")->unsigned();

            $table->foreign('catogrie_id')->references('id')->on('catogrie')->onUpdate('cascade')->onDelete('cascade');

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
		//
		Schema::drop('prob');
	}

}