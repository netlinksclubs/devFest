<!DOCTYPE html>
<html>
	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# netlinksclub: http://ogp.me/ns/fb/netlinksclub#">
		<meta charset="UTF-8">
		<title>{{ $title }}</title>
		<meta name="description" content="{{{ $description }}}">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		@unless(array_key_exists('og:title', $meta))
			<meta property="og:title" content="{{{ $title }}}">
		@endif

		@unless(array_key_exists('og:description', $meta))
			<meta property="og:description" content="{{{ $description }}}">
		@endif

		@foreach($meta as $property => $contents)
			<meta property="{{ $property }}" content="{{{ $contents }}}">
		@endforeach
		
		<link href="{{ URL::asset('stylesheets/screen.css') }}" media="screen, projection" rel="stylesheet" type="text/css" />
		<link href="{{ URL::asset('stylesheets/print.css') }}" media="print" rel="stylesheet" type="text/css" />
		
		<!--[if IE]>
			<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<![endif]-->
	</head>
	<body>
		<header>
			<div id="container" class="common-container">
				<div id="logo">
					<a href="{{ URL::to('/') }}">
						<img src="{{ URL::asset('img/logo.png') }}">
					</a>
				</div>
				<nav>
					<ul>
						<li><a href="{{ URL::to('/') }}">Home</a></li>
						<li><a href="{{ URL::action('MapController@getIndex' )}}">Map</a></li>
						@if(Auth::check())
							<li><a href="{{ URL::action('AuthController@getLogout'); }}">Logout</a></li>
						@endif
					</ul>
				</nav>
				
			</div>
			

		</header>
		<section class="common">
			<div id="page-content">
				{{ $content }}
			</div>
		</section>
		<footer class="footer common-container">
			<nav>
				<ul>
					<li><a href="{{ URL::action('HomeController@getAbout') }}">About</a></li>
					<li><a href="{{ URL::action('HomeController@getContact'); }}">Contact</a></li>
					<li><a href="{{ URL::action('HomeController@getPrivacy'); }}">Privacy</a></li>
					<li><a href="{{ URL::action('HomeController@getTos'); }}">Terms of service</a></li>
				</ul>
			</nav>
			<div>
			<div id="maps-modal-container">
				<div id="maps-modal-box">
					<!--<div id="center"></div>-->
					<div id="map_canvas" class="common-container"></div>
				</div>
				<div id="maps-modal-reveal"></div>
			</div>
		</footer>

		<script type="text/javascript"src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

		<script type="text/javascript">
			window.jQuery ||
			document.write('<script type="text/javascript" src="scripts/jquery-1.8.3.min.js"><\/script>');

			var baseURL = "{{ URL::to('') }}";
		</script>
		{{ HTML::script('https://maps.googleapis.com/maps/api/js?key=AIzaSyAKhs4sj23T-h3UrhMGvDrWFGFpGeKPrIc&sensor=true') }}
		{{ HTML::script('js/main.js') }}
	</body>
</html>