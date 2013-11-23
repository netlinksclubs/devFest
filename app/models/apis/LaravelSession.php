<?php
namespace apis;

use OAuth\Common\Storage\TokenStorageInterface;
use OAuth\Common\Token\TokenInterface;
use OAuth\Common\Storage\Exception\TokenNotFoundException;

/**
 * This is a wrapper class for the Laravel Session class allowing its use as a storage for tokens
 *
 * @package apis
 * @author Mustapha Ben Chaaben
 **/
class LaravelSession implements TokenStorageInterface
{
    private $sessionBase;

    public function __construct($sessionBase = 'oauth_token')
    {
        $this->sessionBase = $sessionBase;
    }

    public function retrieveAccessToken($service)
    {
        if ($this->hasAccessToken($service)) {
            return \Session::get($this->sessionBase . '.' . $service);
        }

        throw new TokenNotFoundException('Token not found in session, are you sure you stored it?');
    }

    public function storeAccessToken($service, TokenInterface $token)
    {
        \Session::put($this->sessionBase . '.' . $service, $token);
    }

    /**
    * @return bool
    */
    public function hasAccessToken($service)
    {
        return \Session::has($this->sessionBase . '.' . $service);
    }

    /**
    * Delete the users token. Aka, log out.
    */
    public function clearToken($service)
    {
        \Session::forget($this->sessionBase . '.' . $service);
    }

    public function clearAllTokens()
    {
        \Session::forget($this->sessionBase . '.' . $service);
    }
} // END class LaravelSession