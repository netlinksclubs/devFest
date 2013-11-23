<?php


class Request2 extends Eloquent{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'request';

    /**
     * Users who opted for this provder
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public function user()
    {
        return $this->belongsTo('User');
    }

    /**
     * Users who opted for this provder
     *
     * @return array
     * @author Mustapha Ben Chaaben
     **/
    public function helper()
    {
        return $this->belongsTo('User', 'helper_id');
    }
}
