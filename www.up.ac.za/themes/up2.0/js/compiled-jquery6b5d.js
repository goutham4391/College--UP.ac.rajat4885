// Home Slider
$(window).load(function() {
	var $primarySlider = $('#slider');
	function checkForVideo() {
		var notSmall = ($(window).width() > 767);
		var support = (typeof(document.createElement('video').canPlayType) !== 'undefined');
		var hasVideo = ($primarySlider.find('video').length > 0);
		return (notSmall && support && hasVideo);
	}
	var primarySliderHasVideo = checkForVideo();
	$primarySlider.flexslider({
		animation: "fade",
		slideshowSpeed: 6000,
		animationSpeed: 1500,
		controlNav: true,
		directionNav: true,
		controlsContainer: ".flex-navigation",
		init: function() {
			$('.flexslider .loader').hide();
		},
		start: function(slider) {
			if (primarySliderHasVideo) {
				primarySliderCheckVideo();
				primarySliderConfigure();
			}
		},
		after: function(slider) {
			if (primarySliderHasVideo) {
				primarySliderStopVideos();
				primarySliderCheckVideo();
			}
		}
	});
	function primarySliderCheckVideo() {
		if ($primarySlider.find('.flex-active-slide video').length) {
			$primarySlider.flexslider("pause");
			$primarySlider.find('.flex-active-slide video')[0].play();
		}
	}
	function primarySliderStopVideos() {
		$primarySlider.find('video').each(function(){
			this.currentTime = 0;
			this.pause();
		});
	}
	function primarySliderConfigure() {
		$primarySlider.find('video').on('ended', function(){
			$primarySlider.flexslider("play");
		});
	}
	
});

$(document).ready(function() {
	// Accessibility
	$('.accessibility .access-btn').click(function(){
		$('.accessibility').toggleClass("open");
		return false;
	});

	// Responsive Table	
	jQuery(function ($) {			  
	  $('.responsive-table').footable({
		  "showToggle": false,
		  "expandAll": true,
		  "cascade": true
	  });
	});	
	
	// Slick Carousel
	$(".news-carousel").slick({
		dots: true,
		infinite: true,
		centerMode: true,
		centerPadding: '55px',
		slidesToShow: 5,
		slidesToScroll: 3,
		responsive: [
		{
			breakpoint: 991,
			settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 3
			}
		},
		{
			breakpoint: 480,
			settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '40px',
			slidesToShow: 1
			}
		}
		]
	});
	$(".slick-slide").hover(function () {
		$(this).toggleClass("hover");
		$(this).siblings().toggleClass("not-hover");
	});

	// Mobile Menu
	$(function() {
		$('nav#menu').mmenu({
			"extensions": [
			  "pageshadow",
			  "theme-dark"
		   ],
			offCanvas: {
			  position: "left"
		   }
		});
		var API = $("nav#menu").data( "mmenu" );

		$("#close").click(function() {
		   API.close();
		});
	});
	
	// Equal height
	$('.equal-height').matchHeight();
	$('.min-height').matchHeight({property: 'min-height'});
	
	// Menu hover - Desktop
	if ( $(window).width() > 767 ) {
		$('.navbar-nav li.dropdown').hover(function() {
			$(this).addClass('show');
			$(this).children('.dropdown-menu').addClass('show');
		}, function() {
			$(this).removeClass('show');
			$(this).children('.dropdown-menu').removeClass('show');
		});
    } else {
        return false;
		}
		
	// Menu navigation
	var menuUsedKeys = [37, 38, 39, 40, 32, 27];
	$('.header-area .navbar-nav > li > a').focus(function(){
		$('.header-area .navbar-nav > li').not($(this).parent('li:first')).removeClass('show').find('.dropdown-menu').removeClass('show');
	});
	$('.header-area .navbar-nav > li').focus(function(){
		$(this).children('a:first').focus();
	});
	$('.header-area .navbar-nav > li > a').keydown(function(event){
		if ($.inArray(event.which, menuUsedKeys) !== -1) {
			event.preventDefault();
			var $li = $(this).parents('li:first');
			if (event.which === 32) {
				if ($li.has('.dropdown-menu').length) {
					$('.header-area .navbar-nav > li').removeClass('show').find('.dropdown-menu').removeClass('show');
					$li.addClass('show').children('.dropdown-menu').addClass('show');
					$li.find('.dropdown-menu:first a:first').focus();
				}
			}
			if (event.which === 27) {
				$('.header-area .navbar-nav > li').removeClass('show').find('.dropdown-menu').removeClass('show');
			}
			if (event.which === 39 || event.which === 40) {
				var $next = $li.next('li');
				if ($next.length) {
					$next.children('a:first').focus();
				}
			}
			if (event.which === 37 || event.which === 38) {
				var $prev = $li.prev('li');
				if ($prev.length) {
					$prev.children('a:first').focus();
				}
			}

		}
	});
	$('.header-area .navbar-nav > li').children('.dropdown-menu').find('a').keydown(function(event){
		if ($.inArray(event.which, menuUsedKeys) !== -1) {
			event.preventDefault();
			var $li = $(this).parents('li:first');
			if (event.which === 27) {
				$('.header-area .navbar-nav > li').removeClass('show').find('.dropdown-menu').removeClass('show');
				$li.parents('.dropdown').children('a:first').focus();
			}
			if (event.which === 39 || event.which === 40) {
				var $links = $li.parents('.dropdown-menu:first').find('a');
				if ($links.index(this) + 1 !== $links.length) {
					$links.eq($links.index(this) + 1).focus();
				}
			}
			if (event.which === 37 || event.which === 38) {
				var $links = $li.parents('.dropdown-menu:first').find('a');
				if ($links.index(this) - 1 !== -1) {
					$links.eq($links.index(this) - 1).focus();
				}
			}

		}
	});
	
	// Mobile menu - Toggle open on click
	(function($){
		$(document).ready(function(){
			$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
				event.preventDefault(); 
				event.stopPropagation(); 
				$(this).parent().siblings().removeClass('open');
				$(this).siblings().toggleClass('open');
			});
			$(".navbar-toggle").click(function() {
				$('.header-area').toggleClass('open');
			});
		});
	})(jQuery);
	
	// Fixed menu
	var stickyThreshold = -49;
	var stickyHeader = $('.top-area')[0];
	var $stickyFloat = $('.header-area');
	$(window).on( 'scroll', function(){
		if (stickyHeader.getBoundingClientRect().top < stickyThreshold) {
			$stickyFloat.addClass('header-fixed');
		} else {
			$stickyFloat.removeClass('header-fixed');
		}
	});
	
	$('.header-area .navbar-default .navbar-toggle').click(function() {
		$(this).parent(".navbar-header").toggleClass("open");
	});
	
	// Bootstrap - Tooltip
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});
		
	// Fancybox
	$('[data-fancybox]').fancybox({
		buttons: ["close"],
		youtube : {
			controls : 0,
			showinfo : 0
		},
		vimeo : {
			color : 'f00'
		}
	});

});



$(function() {

	// Filter
	$('.filter-list > li > a:not(.link):not(.disabled)').click(function() {
		$(this).toggleClass('active');
		$(this).siblings('input').click();
		return false;
	});
	$('.filter-list > li > input[checked="checked"]').each(function() {
		$(this).siblings('a:not(.link)').addClass('active');
	});

	$('form .captcha-container .refresh').die('click').bind('click', function(e){
		e.preventDefault();
		$('.zp-captcha-img').hide();
		$('.load').show();
		$.post("/update_captcha", function(data){
				$('.zp-captcha-img').show();
				$('.load').hide();
				$('.zp-captcha-img').attr('src', data);
		});
	});
	$('.content-area a.history_back').click(function(){
		parent.history.back();
		return false;
	});
	$("form.zp-validate-standard-form").find(':required').each(function(i, obj) {
			$(obj).parents('.form-group:first').addClass('required');
	});
	$("form.zp-validate-standard-form").find('.invalid-feedback:visible').each(function(i, obj) {
			var group = $(obj).parents('.form-group:first');
			group.find('.invalid-feedback').show();
			group.find('.zp-validate-standard').addClass('is-invalid').removeClass('is-valid');
	});
	$(".zp-validate-standard").livequery(function() {
			$(this).validate({
					reset: false,
					invalid: function(obj) {                
							var group = $(obj).parents('.form-group:first');
							group.find('.invalid-feedback').show();
							$(obj).addClass('is-invalid').removeClass('is-valid');
					}, 
					valid: function(obj) {
							var group = $(obj).parents('.form-group:first');
							group.find('.invalid-feedback').hide();
							$(obj).removeClass('is-invalid').addClass('is-valid');
					}
			});
	});
	$("form.zp-validate-standard-form").livequery(function() {
			$(this).submit(function() {
					var invalid_fields = [];
					var invalid_field_text = '';
					var validity = $(this).find('.zp-validate-standard').isValid(true, {
						reset: false,
						invalid: function(obj) {
										var group = $(obj).parents('.form-group:first');
										invalid_fields.push(group.find('.control-label').text().replace('*','').trim());
										group.find('.invalid-feedback').show(); 
										$(obj).addClass('is-invalid').removeClass('is-valid');
						}, 
						valid: function(obj) {
										var group = $(obj).parents('.form-group:first');
										group.find('.invalid-feedback').hide();
										$(obj).removeClass('is-invalid').addClass('is-valid');
						}
					});

					if (invalid_fields.length) {
							invalid_field_text = '(' + invalid_fields.join(', ') + ') ';
					}
					if(validity) {
							$('#zpformwall').hide();
							validity = 'valid';
							return true;
					} else {
							validity = 'invalid';
							if($(this).hasClass('wall')){                    
									$('#zpformwall').text("Please complete all the form fields correctly");
									$('#zpformwall').addClass('alert alert-danger').show();
									window.scrollTo(0, 0);
							}
							return false;
					}

			});
	});
	// Home page counter
	if($('#counter').length){
		var a = 0;
		$(window).scroll(function() {
		var oTop = $('#counter').offset().top - window.innerHeight;
		if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
			var $this = $(this),
				countTo = $this.attr('data-count');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
				},
		
				{
		
				duration: 3000,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}
		
				});
			});
			a = 1;
		}
		
		});
	}
	$('.content-area #study-search-form').submit(function(e){
		var q = $('#study-search-form #q').val();
		e.preventDefault();
		e.stopPropagation();
		if (q) {
			location=$(this).attr('action')+"/term/"+q;
		}
	});
	if($('.content-area #study-search-form .js-typeahead').length) {
		var typeahead_faculties = [];
		$.getJSON("/programmes/mod/faculties", function(data){
			typeahead_faculties = data;
		});
		$('.content-area #study-search-form .js-typeahead').typeahead({
			input: '#study-search-form .js-typeahead',
			minLength: 2,
			maxLength: 20,
			maxItem: 50,
			order: "asc",
			hint: true,
			dynamic: true,
			delay: 500,
			emptyTemplate: 'No result for "{{query}}"',
			template: "{{name}}",
			group: {
				key: "faculty",
				template: function(item) {
					if (typeahead_faculties[item.faculty]) {
						return typeahead_faculties[item.faculty];
					} else {
						return 'Faculty';
					}
				}
			},
			display: ["name"],
			filter: false,
			href: "/programmes/programmeid/{{id}}/year/{{year}}",
			source: {
				plans: {
					ajax: {type: "POST", url: "/programmes/mod/lookup/term/{{query}}", path: "data.plans"}
				}
			},
			callback: {
				onClickAfter: function (node, a, item, event) {
					event.preventDefault();
					window.location = item.href;
				}
			},
			debug: false
		});
	}

	$.cp("loadIfRequired").cp("link", ".cookie-preferences-btn");


});