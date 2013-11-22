<?php
/**
 * Eloquent model for the providers
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/
class Oauth_provider extends Eloquent {
	/**
	 * Table name
	 *
	 * @var string
	 * @author Mustapha Ben Chaaben
	 **/
	protected $table = 'oauth_provider';

	public $timestamps = true;

	protected $fillable = array('provider');
	protected $guarded = array('id');

	/**
	 * Users who opted for this provder
	 *
	 * @return void
	 * @author Mustapha Ben Chaaben
	 **/
	public function users()
	{
		return $this->belongsToMany('User', 'user_oauth_provider', 'user_id');
	}
} // END class