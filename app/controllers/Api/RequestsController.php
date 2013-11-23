<?php
namespace Api;

/**
 * Reports API access
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/
class RequestsController extends \BaseController
{
    /**
     * Returns all reports in JSON format
     *
     * @return void
     * @author Mustapha Ben Chaaben
     **/
    public function getIndex() {
        return \Request2::where('done', '=', 0)->get();
    }
} // END class ReportController