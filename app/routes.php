<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/match',function(){
	$req = Request2::where('needHelp', '=', 0)->firstOrFail();
	return $req->user_id;
});

Route::controller('map', 'MapController');
Route::controller('/', 'HomeController');

