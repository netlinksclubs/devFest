<div id="home-index">
	@if( Auth::check() )
		<div class="information_box">
			You are logged as {{ Auth::user()->fullName() }}
		</div>
	@endif
	<h1>Start by reporting it</h1>
	<article>
		If you know somewhere polluted, take the first step and report it to the world. You will be surprised by the community of people striving to clean this world.
	</article>

	<ul id="reportbutton">
		@if(Auth::guest())
			<li><a href="{{ URL::to('auth/google'); }}">Google plus</a></li>
		@else
			<li><a href="{{ URL::to('request/needhelp'); }}">I need some help</a></li>
			<li><a href="{{ URL::to('request/wanttohelp'); }}">I want to help</a></li>
		@endif
	</ul>
</div>