$('#private').click(function(){
	$(this).css('background','#e7e7e7');
	$('#public').css('background','#f4f4f4');
});

$('#public').click(function(){
	$(this).css('background','#e7e7e7');
	$('#private').css('background','#f4f4f4');
});



//par default
	
	$('#categorie1').css('background','#e7e7e7');
	$('#categorie2').css('background','#f4f4f4');
	$('#categorie3').css('background','#f4f4f4');
	$('#problemes1').css('visibility',' visible');
	$('#problemes2').css('visibility', 'hidden');
	$('#problemes3').css('visibility', 'hidden');



$('#categorie1').click(function(){
	$(this).css('background','#e7e7e7');
	$('#categorie2').css('background','#f4f4f4');
	$('#categorie3').css('background','#f4f4f4');
	$('#problemes1').css('visibility',' visible');
	$('#problemes2').css('visibility', 'hidden');
	$('#problemes3').css('visibility', 'hidden');
});

$('#categorie2').click(function(){
	$(this).css('background','#e7e7e7');
	$('#categorie1').css('background','#f4f4f4');
	$('#categorie3').css('background','#f4f4f4');
	$('#problemes2').css('visibility', 'visible');
	$('#problemes1').css('visibility', 'hidden');
	$('#problemes3').css('visibility', 'hidden');
});

$('#categorie3').click(function(){
	$(this).css('background','#e7e7e7');
	$('#categorie1').css('background','#f4f4f4');
	$('#categorie2').css('background','#f4f4f4');
	$('#problemes3').css('visibility', 'visible');
	$('#problemes2').css('visibility', 'hidden');
	$('#problemes1').css('visibility', 'hidden');
});






$('.needs-help').click(function(){

});


