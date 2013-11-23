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
     	$this->createRequest();   
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getWanttohelp()
    {
        $this->createRequest(0);
    }

    private function createRequest($needhelp = 1) {
    	$user = Auth::user();

        $request = new Request2();
        $request->done = 0;
        $request->needHelp = 1;

        $request->latitude = Input::get('latitude');;
        $request->longitude = Input::get('longitude');;

		$user->requests()->save($request);
    }
}