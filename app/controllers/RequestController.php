<?php

class RequestController extends BaseLayoutController {
	/**
     * Index page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function postNeedhelp()
    {
     	$this->createRequest(1, Input::get('latitude'), Input::get('longitude'));   
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getWanttohelp()
    {
        $this->createRequest(0, Input::get('latitude'), Input::get('longitude'));
    }

    private function createRequest($needhelp, $latitude , $longitude) {
    	$user = Auth::user();

        $request = new Request2();
        $request->done = 0;
        $request->needHelp = 1;
        $request->latitude = is_null($latitude) ? 36.843529 : $latitude;
        $request->longitude = is_null($longitude) ? 10.197799 : $longitude;

		$user->requests()->save($request);
    }
}