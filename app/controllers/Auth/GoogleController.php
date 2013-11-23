<?php namespace Auth;

/**
 * Handel's google authentification requests
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/

class GoogleController extends \BaseController {
    protected $google;

    /**
     * Construct the google auth controller
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public function __construct()
    {   
        $this->beforeFilter('noAuthOr404');

        $this->google = \App::make('google');
    }

    /**
     * Auhentificate user through google
     *
     * @return Redirect
     * @author Mustapha Ben Chaaben
     **/
    public function getIndex()
    {
        return \Redirect::to($this->google->getAuthorizationUri());
    }

    /**
     * Check if user is authenticated and registerd with the corresponding provider account
     *
     * @return mixed
     * @author Mustapha Ben Chaaben
     **/
    public function getCheck()
    {
        // No input code then die
        if(! \Input::has('code')) {
            \Redirect::to('/');
        }

        // Create the token exceptions are handeled globaly
        $this->google->createToken(\Input::get('code'));

        // Send a request with it to get user informations
        $user_information = $this->google->getUserInfo();
        
        // Some thing is wrong if the return isn't an array or an empty one
        if(!is_array($user_information) or empty($user_information)) {
            \Redirect::to('/');
        }

        // Find user associated with this oauth id
        $user = \User::getWithProviderAndOauthId('google', $user_information['id']);
        
        // If no one mached this means user doesn't exist in the database
        if(count($user) === 0) {
            return \Redirect::action('Register\GoogleController@getNew_account');
        } else if(count($user) === 1) {
            \Auth::login($user[0], true);
            return \Redirect::to('/');
        }
    }
}