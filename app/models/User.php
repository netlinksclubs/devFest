<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('password', 'level');
    protected $guarded = array('level');

    public $timestamps = true;
    
    protected $softDelete = true;

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    /**
     * Get the e-mail address where password reminders are sent.
     *
     * @return string
     */
    public function getReminderEmail()
    {
        return $this->email;
    }

    /**
     * Users who opted for this provder
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public function oauth_providers()
    {
        return $this->belongsToMany('Oauth_provider', 'user_oauth_provider')
                    ->withPivot('oauth_user_id')
                    ->withTimestamps();
    }

    public function requests()
    {
        return $this->hasMany('Request2');
    }
    public function problemeUser()
    {
        return $this->hasMany('problemeUser');
    }

    /**
     * Returns an array with names of the providers that provide authentification for this user
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public function oauthProvidersNames()
    {
        $providers = $this->oauth_providers()
                         ->get(array('provider'))
                         ->toArray();

        return array_pluck($providers, 'provider');
    }

    /**
     * Return wether or not the user has the provided provider
     *
     * @param string provider name
     *
     * @return bool
     * @author Mustapha Ben Chaaben
     **/
    public function hasOauthProvider($provider)
    {
        return array_search($provider, $this->oauthProvidersNames()) !== false;
    }

    /**
     * Return the full name of the user
     *
     * @return string
     * @author Mustapha Ben Chaaben
     **/
    public function fullName()
    {
        return $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
    }

    /**
     * Get user record matching the provided provider and oauther user id
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public static function getWithProviderAndOauthId($provider, $user_oauth_id)
    {
        $result = DB::table('user_oauth_provider')
            ->join('oauth_provider', 'user_oauth_provider.oauth_provider_id', '=', 'oauth_provider.id')
            ->where('oauth_user_id', '=', $user_oauth_id)
            ->where('provider', '=', $provider)
            ->first();

        if($result == null) {
            return array();
        }

        $user_id = $result->user_id;
        
        return User::where('id', '=', $user_id)->get();
    }

    /**
     * add user with the provided informations and provider
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public static function addUserWithInfoAndProvider($user_informations, $provider)
    {
        DB::transaction(function() use ($user_informations, $provider)
        {
            // Create the new user
            $user = new User;
     
            $user->email = $user_informations['email'];
            $user->password = Hash::make($user_informations['password']);
            $user->first_name = $user_informations['first_name'];
            $user->middle_name = isset($user_informations['middle_name']) ? $user_informations['middle_name'] : '';
            $user->last_name = $user_informations['last_name'];
            $user->avatar = $user_informations['picture'];

            $user->bio = isset($user_informations['bio']) ? $user_informations['bio'] : '';

            $user->save();

            // Get the corresponding provider
            $oauth_provider = Oauth_provider::where('provider', '=', $provider)->first();

            if( is_null($oauth_provider) )
            {
                Log::write('Error: Inexisting oatuh provider: ' . $provider);
                return ;
            }
            
            // Create the link between the provider and the user
            $user->oauth_providers()->attach($oauth_provider->id, array('oauth_user_id' => $user_informations['id']));
        });
    }

    /**
     * Test email existance in database
     *
     * @return bool|int the id if a mach was found, false otherwise
     * @author Mustapha Ben Chaaben
     **/
    public static function userIdFromEmail($email)
    {
        $request = DB::query('select id from ' . User::$table . ' where email = ?', array($email));
        
        if(count($request) === 1)
        {
            return (int) $request[0]->id;
        }
        else
        {
            return false;
        }
    }
}