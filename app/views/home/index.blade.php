
		<div id="maps-modal-container" class="map-container">
			<div id="maps-modal-box">
					<!--<div id="center"></div>-->
				<div id="map_canvas" class="map-container"></div>
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


