<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class Probleme extends Eloquent implements UserInterface, RemindableInterface {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'probleme';

    /**
     * Users who opted for this provder
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public function oauth_providers()
    {
        return $this->belongsTo('Catogrie');
    }
}
