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

        $this->layout->title = 'Guide Me';

        $this->layout->description = 'Guide me a net plateform that connects people in need.';

        $this->layout->meta = [
            'og:site_name' => 'Guide me',
            //'fb:app_id' => \Config::get('oauthServices.facebook.key'),
            'og:image'  => URL::asset('img/logo.png')
        ];
    }
} // END class BaseLayoutController extends BaseController=