/* Make CSS :active work on mobile */
document.addEventListener("touchstart", function() {},false);



/* Drift Live Chat */
!function() {
	var t;
	if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0, 
	t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
	t.factory = function(e) {
		return function() {
			var n;
			return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
		};
	}, t.methods.forEach(function(e) {
		t[e] = t.factory(e);
	}), t.load = function(t) {
		var e, n, o, i;
		e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"), 
		o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js", 
		n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
	});
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('t3xvtekkcwmi');

drift.on('ready', function(api) {
	api.widget.hide()
    $('.js-openChat').click(function() {
        api.sidebar.open();
    });
});



/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63372069-4', 'auto');
ga('send', 'pageview');



/* Checkout Page */
$('.js-serviceCheckout-option').change(function() {
	var totalPrice = $('.js-serviceCheckout-price');
	totalPrice.text(parseInt(totalPrice.text()) + $(this).data('price'));
});



/* Submit Form */
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