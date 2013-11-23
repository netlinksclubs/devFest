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

Route::group(array('prefix' => 'register'), function() {
    Route::controller('google', 'Register\\GoogleController');
});

Route::group(array('prefix' => 'auth'), function() {
    Route::controller('google', 'Auth\\GoogleController');
});

Route::controller('auth', 'AuthController');

Route::controller('map', 'MapController');
Route::controller('/', 'HomeController');

App::singleton('google', function()
{
    return new apis\GoogleProvider();
});