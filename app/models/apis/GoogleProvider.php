<?php
namespace apis;

use OAuth\Common\Consumer\Credentials;
use OAuth\Common\Http\Uri\Uri;

/**
 * This model handels all interactions with google throught the API provided
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/

class GoogleProvider {
	/**
	 * google object (SDK)
	 *
	 * @var object
	 **/
	private $googleService = null;

	/**
	 * Cach google informations
	 *
	 * @var string
	 **/
	private $google_informations = null;

	/**
	 * Constructor: initialize google
	 *
	 * @return void
	 * @author Mustapha Ben Chaaben
	 **/
	public function __construct()
	{
		// In-session storage
		$storage = new LaravelSession('OauthSession');

		// Setup the credentials for the requests
		$credentials = new Credentials(
			\Config::get('oauthServices.google.key'),
			\Config::get('oauthServices.google.secret'),
			\URL::action('Auth\GoogleController@getCheck')
		);

		$serviceFactory = new \OAuth\ServiceFactory();

		// Get an instance of google service
		$this->googleService = $serviceFactory->createService('Google', $credentials, $storage, array('scope' => \Config::get('oauthServices.google.scope')));
	}

	/**
	 * Create token
	 *
	 * @return void
	 * @author Mustapha Ben Chaaben
	 **/
	public function createToken($code)
	{
		$this->googleService->requestAccessToken($code);
	}

	/**
	 * return the user informations of the corressponding user
	 *
	 * @return user informations
	 * @author Mustapha Ben Chaaben
	 **/
	public function getUserInfo()
	{
		if($this->google_informations === null)
			$this->google_informations = json_decode($this->googleService->request('https://www.googleapis.com/oauth2/v1/userinfo'), true);

		return $this->google_informations;
	}

	/**
	 * Return the authorization uri
	 *
	 * @return string
	 * @author Mustapha Ben Chaaben
	 **/
	public function getAuthorizationUri()
	{
		return (string) $this->googleService->getAuthorizationUri();
	}
} // END class