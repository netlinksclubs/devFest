$bulle=$(".bulle");
$bulle.text("");
chaine=$bulle.attr("data-contentbefore");
i=1;
a = new Audio("kbsound.mp3");

function textTyping() 
{
	if ($bulle.text()==$bulle.attr("data-contentbefore")){
		$bulle.text("");
	}
	$bulle.text($bulle.text()+chaine.charAt(0));
	chaine=chaine.slice(1,chaine.length);
	if (chaine!="") {
		setTimeout(textTyping,100);	
		a.play();
	}
	else {
		if (i==1) {
		setTimeout(startAnimations,2000); 
		$bulle.text($bulle.attr("data-contentbefore"));
		chaine=$bulle.attr("data-contentafter");
		ch=chaine;
		setTimeout(textTyping,3000);
		i++; }

	}

}

textTyping();



function startAnimations() {
	i++;
	$('body').css('-webkit-animation','animfilter linear 3s forwards running');
	$('#animation1').css('-webkit-animation','showsun linear 5s forwards running');
	$('#slogan').css('-webkit-animation','show 6s ease-out 0s forwards running');
	$('.googlebutton').css('-webkit-animation','show 8s ease-out 0s forwards running');
}

