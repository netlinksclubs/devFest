<?php

class HomeController extends BaseLayoutController {

    /**
     * Index page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getIndex()
    {
        $request = Request2::where('user_id', '=', Auth::user()->id)->where('done', '=', 0);
        $data = [
            'count' => $request->count()
        ];
        $this->layout->content = View::make('home.index', $data);
    }

    /**
     * About page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getAbout()
    {
        $this->layout->title = 'About';
        $this->layout->description = 'We love the environment and we want to contribute to its well-being. Nature\'s protector is our way of helping the environment get cleaner. Humanity deserves better! You can contribute too, just report dirty places and spread the word to the community.';
        $this->layout->content = View::make('home.about');
    }

    /**
     * Contact page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getContact()
    {
        $this->layout->title = 'Contact';
        $this->layout->description = 'Contact Nature\'s protector team. We always look forward for the oppurtunity to get in touch with our users.';
        $this->layout->content = View::make('home.contact');
    }

    /**
     * Privacy policy page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getPrivacy()
    {
        $this->layout->title = 'Privacy Policy';
        $this->layout->description = 'Nature\'s protector Privacy Policy. We care about our user\'s privacy';
        $this->layout->content = View::make('home.privacy');
    }

    /**
     * Terms of service page method
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getTos()
    {
        $this->layout->title = 'Terms of service';
        $this->layout->description = 'Nature\'s protector terms of service.';
        $this->layout->content = View::make('home.tos');
    }

    /**
     * Used as facebook channel file response
     *
     * https://developers.facebook.com/docs/javascript/gettingstarted/#dialogs
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getChannel()
    {
        $cache_expire = 60*60*24*365;
        header("Pragma: public");
        header("Cache-Control: max-age=".$cache_expire);
        header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$cache_expire) . ' GMT');
         
        return '<script src="//connect.facebook.net/en_US/all.js"></script>';
    }
}