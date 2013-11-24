<?php

use Illuminate\Database\Migrations\Migration;

class CreateCatogrieTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create("catogrie", function($table) {
            $table->increments("id");
            $table->string("name", 32);
            $table->string("desc", 320);

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
		Schema::drop('catogrie');
	}

}