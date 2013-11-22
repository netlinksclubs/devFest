<?php

/**
 * Map Controller
 *
 * @package default
 * @author Mustapha Ben Chaaben
 **/
class MapController extends BaseLayoutController
{
    /**
     * Basicaly displays a map with all of the reports with the ability to search etc...
     *
     * @return Response
     * @author Mustapha Ben Chaaben
     **/
    public function getIndex()
    {
        $this->layout->title = 'Map';
        $this->layout->description = 'A map of the dirty places that are hurting the environment all around the globe.';

        $this->layout->content = View::make('map.index');
    }
} // END class MapController extends BaseLayoutController