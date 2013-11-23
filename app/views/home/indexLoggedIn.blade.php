
		<div id="maps-modal-container" class="map-container">
			<div id="maps-modal-box">
					<!--<div id="center"></div>-->
				<div id="map_canvas" class="map-container"></div>
			</div>
		</div>

		<div id="userMeetBox" class="hide userBox center-box">
			<span id="closeBox" class="close">x</span>
	        <img src="" alt="" class="roundedPic userPic">
	        <h2 class="userTitle"></h2>
	        <div class="userSocialInfo">
	            <a class="icon-google-plus" href="" target="_blank">&nbsp;&nbsp;Visit his google plus profile</a>
	        </div>
    	</div>

		<div class="bottom-menu">
			{{ ($count == '1') ? 'Someone is coming... Searching...' : '' }}
			<div id="buttonGroup" class="{{ ($count == '1') ? 'hide' : '' }}">
				<button onclick="needHelp()" class="needs-help">I Need Help</button>
				<button onclick="canHelp()" class="can-help">I Can Help</button>
			</div>
		</div>

		{{ HTML::script('js/scriptForMap.js')}}


