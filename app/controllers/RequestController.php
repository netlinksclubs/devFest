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
        $request = Request2::where('needHelp', '=', 0)->where('done', '=', 0)->get();
        if($request->count() == 0) {
            $this->createRequest(1, Input::get('latitude'), Input::get('longitude'));
        
            return json_encode([]);
        }
        $user = $request->first();
        $user->user_id = Auth::user()->id;
        $user->save();

        return json_encode([]);
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function postWanttohelp()
    {
        $request = Request2::where('needHelp', '=', 1)->where('done', '=', 0)->get();
        if($request->count() == 0) {
            $this->createRequest(0, Input::get('latitude'), Input::get('longitude'));
        
            return json_encode([]);
        }

        $user = $request->first();

        $user->helper_id = Auth::user()->id;
        $user->save();
        
        return json_encode([]);
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function postMakedone()
    {
        $request = Request2::where('user_id', '=', Auth::user()->id)->where('done', '=', 0)->orWhere('helper_id', '=', Auth::user()->id)->where('done', '=', 0);
        
        if($request->count() == 0) {
            return json_encode([]);
        }

        $user = $request->first();

        $user->done = 1;
        $user->save();
        
        return json_encode([]);
    }

    private function createRequest($needhelp, $latitude , $longitude) {
    	$user = Auth::user();

        $request = new Request2();
        $request->done = 0;
        $request->needHelp = $needhelp;
        $request->latitude = is_null($latitude) ? 36.843529 + rand(0, 100) * 0.00001 : $latitude;
        $request->longitude = is_null($longitude) ? 10.197799 + rand(0, 100) * 0.00001 : $longitude;

        if($needhelp == 1)
        {
		    $user->requests()->save($request);
        }
        else
        {
            $user->helperRequests()->save($request);
        }
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function postHasresponse()
    {
        $request = Request2::where('user_id', '=', Auth::user()->id)->where('done', '=', 0)->orWhere('helper_id', '=', Auth::user()->id)->where('done', '=', 0)->get();
        
        $helper = $request->first();
        if(is_null($helper)) return '[]';
        $helper = $helper->helper();
        if(is_null($helper)) return '[]';
        $helper = $helper->first();
        if(is_null($helper)) return '[]';

        $user = $request->first();
        if(is_null($user)) return '[]';
        $user = $user->user();
        if(is_null($user)) return '[]';
        $user = $user->first();
        if(is_null($user)) return '[]';

        if($user->id == Auth::user()->id) {
            return json_encode([[
                'id' => $helper->id,
                'google_id' => $helper->oauth_providers()->first()->pivot->oauth_user_id,
                'first_name' => $helper->first_name,
                'last_name' => $helper->last_name,
                'avatar' => $helper->avatar
            ]]);
        } else {
            return json_encode([[
                'id' => $user->id,
                'google_id' => $user->oauth_providers()->first()->pivot->oauth_user_id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'avatar' => $user->avatar
            ]]);
        }
    }
}