		<div style="width:40%">
			<section>
				<button id="public">PUBLIC</button>
				<button id="private">PRIVATE</button>
			</section>
			<input type="text" class="tel" placeholder="numero telephone">
			<br>
			<section class="textForm">
				Which kind of help you need
			</section>
			<section class="probleme">
				<button id="categorie1">Addiction</button>
				<button class="middle" id="categorie2">Addiction</button>
				<button id="categorie3">Addiction</button>
				<div class="problemeList" id="problemes1">
					<ul style="list-style:none">
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>

						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
					</ul>
				</div>
				<div class="problemeList" id="problemes2">
				<ul style="list-style:none">
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>

						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
					</ul>
				</div>
				<div class="problemeList" id="problemes3">
				<ul style="list-style:none">
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>

						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
						<li>
							<input type="checkbox" value="drug"> Drug
						</li>
					</ul>
				</div>
				
			</section>
			<button class="save">Save</button>
		</div>




		{{ HTML::script(js/scriptForForm.js) }}