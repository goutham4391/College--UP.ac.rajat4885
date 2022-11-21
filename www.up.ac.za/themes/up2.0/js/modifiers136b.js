
	function addModifiers(){
		if (!$.cp('check','preferences')) {
			$.cookie("zp_page_modifiers", null, {path: "/"});
		}
        if ($.cookie("zp_page_modifiers")) {
            var modifiers  =['font-increase-1', 'font-increase-2', 'font-increase-3', 'underline-links'];
            var modifierToggles = $.cookie("zp_page_modifiers").split('');
            var body = $('body');
            if (modifierToggles.length === modifiers.length) {
                $(modifiers).each(function(key, modifier){
                    if (modifierToggles[key] === "1") {
						body.addClass(modifier);
                    }
                });
            } else {
                $.cookie("zp_page_modifiers", null, {path: "/"});
            }
        }
	};
	function updateModifierPreferencesMessage(hide) {
		var parentSelector = '.accessibility .access-inner';
		var selector = parentSelector+' .message';
		if (hide) {
			$(selector).hide();
		} else {
			if (!$(selector).length) {
				$(parentSelector).prepend('<div class="message alert alert-info rounded-0">Settings will not persist if Preference Cookies are not toggled on.</div>');
			}
			$(selector).show();
		}
	}
	
	
	$(function () {

        $('.accessibility').mouseenter(function(){
			$('.accessibility').addClass("open");
		});
		$('.accessibility').mouseleave(function(){
			$('.accessibility').removeClass("open");
		});
        $('.accessibility .access-reset').click(function(){
            $('body').removeClass(
                        'font-increase-1 '+
                        'font-increase-2 '+
                        'font-increase-3 '+
						'underline-links '+
						'reader-view'
					);
					updateModifierCookie();
        });

		function updateModifierCookie() {
			if ($.cp('check','preferences')) {
				var modifiers  =['font-increase-1', 'font-increase-2', 'font-increase-3', 'underline-links'];
				var body = $('body');
				var value = '';
				$(modifiers).each(function(key, modifier){
					if (body.hasClass(modifier)) {
						value += "1";
						$('.accessibility .'+modifier).addClass('active');
					} else {
						value += "0";
						$('.accessibility .'+modifier).removeClass('active');
					}
				});
				$.cookie("zp_page_modifiers", null, {path: "/"});
				$.cookie('zp_page_modifiers', value, {expires: 7, path: "/"});
			} else {
				$.cookie("zp_page_modifiers", null, {path: "/"});
			}
			
		}
		updateModifierCookie();
		$(".font-button").bind("click", function () {
			if ($(this).hasClass("increase")) {
				$('body').addClass('font-increase-1');
			} else {
				$('body').removeClass('font-increase-1');
			}
			updateModifierCookie();
			return false;
		});

		$('.accessibility .underline-links').click(function(){
			$('body').toggleClass('underline-links');
			updateModifierCookie();
		});
		$('body').on('zp_cookie_preferences_updated', function(){
			updateModifierCookie();
			updateModifierPreferencesMessage($.cp('check','preferences'));
		})
		$('.accessibility .reader-view').click(function(){
			$(this).toggleClass('active');
			$('body').toggleClass('reader-view');
			$('.equal-height').matchHeight();
			$('.min-height').matchHeight({property: 'min-height'});
		});
		
		updateModifierPreferencesMessage($.cp('check','preferences'));
	});