<?php
namespace Register;

/**
 * This controller enables registration trough the google provider
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/
class GoogleController extends \BaseLayoutController
{
    protected $google;

    /**
     * Construct the Register controller
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public function __construct()
    {
        $this->beforeFilter('noGoogleAuthOr404');

        $this->google = \App::make('google');
    }

    /**
     * Setup layout for google controller
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    protected function setupLayout()
    {
        parent::setupLayout();

        $this->layout->title = 'Register';
    }

    /**
     * Register a new user with a google account
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public function getNew_account()
    {
        $user_information = $this->google->getUserInfo();

        $this->layout->nest('content', 'register/new_account', array_merge($user_information, array('provider' => 'google')));
    }

    /**
     * Post the registration
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public function putNew_account()
    {
        $input = \Input::all();      
        
        $rules = array(
            'password'  => 'required|min:8',
        );

        $validator = \Validator::make($input, $rules);
        
        if($validator->fails()) {
            return \Redirect::back()->withErrors($validator)
                                   ->withInput();
        }

        $user_information = $this->google->getUserInfo();

        // Add user to database
        \User::addUserWithInfoAndProvider(array_merge($user_information, array('password' => \Input::get('password'))), 'google');

        $credentials = array(
            'email' => $user_information['email'],
            'password' => \Input::get('password')
        );

        if(! \Auth::attempt($credentials, true)) {
            \Log::error('Weird shit: Tried to log newly registred user with no luck!!; User: ' . $credentials[0]);
        }

        return \Redirect::to('/');
    }
}