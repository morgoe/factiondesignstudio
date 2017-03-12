



/*******************
 * Crisp Live Chat *
 *******************/
$crisp = [];
CRISP_WEBSITE_ID = '2c543135-0dc6-4c8a-9f3b-95372300a407';
(function(){d=document;s=d.createElement('script');s.src='https://client.crisp.im/l.js';s.async=1;d.getElementsByTagName('head')[0].appendChild(s);})();

$('.js-openChat').attr('disabled', true);
$crisp.push(["on", "session:loaded", function() {
	// $crisp.do("chat:hide");
	$('.js-openChat').attr('disabled', false);
}]);
$crisp.push(["on", "chat:closed", function() {
	// $crisp.do("chat:hide");
}]);

$(document).on('click', '.js-openChat', function() {
	console.log('q')
    $crisp.do("chat:show");
    $crisp.do("chat:open");
});



/********************
 * Google Analytics *
 ********************/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63372069-4', 'auto');
ga('send', 'pageview');

// Send an event on page exit, so that time is tracked properly for bounce pages.
var numPagesVisited = 0;
window.onbeforeunload = function(){
	ga('send', 'event', 'time-tracking', 'page-exit');
	if (numPagesVisited === 1)
		ga('send', 'event', 'engagement', 'page-bounce');
}




/*****************
 * Instant Click *
 *****************/
InstantClick.on('change', function() {
	ga('send', 'pageview', location.pathname + location.search);
	numPagesVisited++;
	// initExternalLinks();
});

InstantClick.init();



/****************
 * Interactions *
 ***************/
// Make CSS :active work on mobile
document.addEventListener("touchstart", function() {},false);


// Update Pricing with Extras
$('.js-serviceCheckout-option').change(function() {
	var totalPrice = $('.js-serviceCheckout-price');
	totalPrice.text(parseInt(totalPrice.text()) + $(this).data('price'));
});


// Submit Form
$(document).on('click', '.js-serviceCheckout-submit', function(e){
	e.preventDefault(); // prevent the form to do the post.
	$(this).addClass('loading');

	var form = $('.js-serviceCheckout-form');
	var data = {};

	form.find('.js-serviceCheckout-input').each(function() {
		data[$(this).attr('name')] = $(this).val();
	});

	form.find('.js-serviceCheckout-option:checked').each(function() {
		data[$(this).attr('name')] = $(this).val();
	});

	data['price'] = $('.js-serviceCheckout-price').text();
	
	$.ajax({
		url: "https://formspree.io/hello@morgancarter.com.au", 
		method: "POST",
		data: data,
		dataType: "json"
	})
	.done(function() {
		window.location.href = "/thanks/";
	});
});