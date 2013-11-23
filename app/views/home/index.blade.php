
		<div id="maps-modal-container" class="map-container">
			<div id="maps-modal-box">
					<!--<div id="center"></div>-->
				<div id="map_canvas" class="map-container"></div>
			</div>
		</div>

		<div class="bottom-menu">
			<button onclick="needHelp()" class="needs-help">Needs Help</button>
			<button onclick="canHelp()" class="can-help">Can Help</button>
		</div>

		{{ HTML::script('js/scriptForMap.js')}}


