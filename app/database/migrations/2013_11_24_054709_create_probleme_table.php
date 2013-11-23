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
            $table->string("icon", 2);
            $table->integer("category_id")->unsigned();

            $table->foreign('category_id')->references('id')->on('category')->onUpdate('cascade')->onDelete('cascade');

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
		Schema::drop('probleme');
	}

}