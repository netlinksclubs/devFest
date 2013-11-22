<?php

/**
 * This services as a basic class to set the common layout for controller which use the common layout
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/
class BaseLayoutController extends BaseController
{
    /**
     * Sets the basic layout
     *
     * @var string
     **/
    public $layout = 'layouts.common';

    /**
     * Setup layout
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    protected function setupLayout()
    {
        parent::setupLayout();

        $this->layout->title = 'Nature\'s Protector';

        $this->layout->description = 'Nature\'s Protector allows people who care about the environment to contribute in keeping it safe by reporting dirty places. People from all around the globe can come together as a community to save our precious planet.';

        $this->layout->meta = [
            'og:site_name' => 'Nature\'s protector',
            'fb:app_id' => \Config::get('oauthServices.facebook.key'),
            'og:image'  => URL::asset('img/logo.png')
        ];
    }
} // END class BaseLayoutController extends BaseController=