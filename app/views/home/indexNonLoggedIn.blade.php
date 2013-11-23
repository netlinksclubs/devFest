<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Guide me</title>
		<meta name="description" content="">
		<link href='http://fonts.googleapis.com/css?family=Pontano+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="stylesheets/style.css">
	</head>
	<body>
		<!-- birds -->
		<div class="birdA">
					<div class="bird" id="bird1">
					</div>
					<div class="bird" id="bird2">
					</div>
			</div>

			<div class="birdB">
					<div class="bird birdB" id="bird1">
					</div>
					<div class="bird birdB" id="bird2">
					</div>
			</div>

		<!-- end birds -->
		
		<header>
			<div id="animation1">
				<div class="tree">
					<div class="top">
						<div class="dot1"></div>
						<div class="dot2"></div>
					</div>
					<div class="bottom" ></div>
					<div class="middle1"></div>
					<div class="middle2"></div>
				</div>

				<div class="tree2">
					<div class="top">
						<div class="dot1"></div>
						<div class="dot2"></div>
					</div>
					<div class="bottom" ></div>
					<div class="middle1"></div>
					<div class="middle2"></div>
				</div>

				<div class="tree3">
					<div class="top">
						<div class="dot1"></div>
						<div class="dot2"></div>
					</div>
					<div class="bottom" ></div>
					<div class="middle1"></div>
					<div class="middle2"></div>
				</div>


				<div class="flower"></div>
				<div class="flower2"></div>
				<div class="herb"></div>
				<div class="chaise">
					<div class="bulle" data-contentbefore="I'm not feeling ok..." data-contentafter="It's Better to find someone to understand you... Thanks..">I'm not feeling ok...</div>
				</div>

				<div id="slogan"><span>In a blink of an eye,</span> <br> You will see the light</div>
				<a href="{{URL::to('/auth/google')}}">
					<div class="googlebutton">Subscribe with GOOGLE+
						<div class="googlebuttonicon">+</div>
					</div>
				</a>
			
			</div>
		</header>
		<script type="text/javascript"src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

		<script type="text/javascript">
		window.jQuery ||
		document.write('<script type="text/javascript" src="scripts/jquery-1.8.3.min.js"><\/script>');
		</script>
		
		<script src="{{URL::to('/')}}/js/script2.js"></script>

	</body>
</html>