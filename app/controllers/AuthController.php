<?php
/**
 * This controller handel's authentification trough the different providers
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/

class AuthController extends BaseController {
	/**
	 * Construct the auth controller
	 *
	 * @return void
	 * @author Mustapha Ben Chaaben
	 **/
	public function __construct()
	{
		$this->beforeFilter('authOr404', array('only' => array('getLogout')));
	}

	/**
	 * Logout the user
	 *
	 * @return void
	 * @author Mustapha Ben Chaaben
	 **/
	public function getLogout()
	{
		Auth::logout();

		return Redirect::to('');
	}
}