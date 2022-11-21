(function($) {
    var config  = {
        'name':'zp_cookie_preferences', 
        'container':'#cookie-preferences-container', 
        'form':'#cookie-preferences',
        'formElement':'#cookiePreferencesForm',
        'formSelectorPrefix':'#cookiePreferences_',
        'url':'/cookie-preferences/controls',
        'types': ['statistic', 'preferences', 'marketing'],
        'defaultTypes': ['statistic', 'preferences'],
        'granularClass': 'granular-mode',
        'valid-settings': /^[01]{3}-1$/,
        'body-trigger': 'zp_cookie_preferences_updated',
        'loader': '<div class="d-flex justify-content-center align-items-center fixed-loader text-center"><div class="h1"><i class="fa fa-spin fa-spinner"></i></div></div>'
    };
    $.cp = function(action, a) {
        switch (action) {
            case "check":
                return check(a);
            case "config":
                return c(a);
            case "required":
                required()
                break;
            case "link":
                link(a);
                break;
            case "loadIfRequired":
                loadIfRequired();
                break;
            case "acceptAll":
                acceptAll();
                break;
            case "hide":
                hide();
                break;
            case "top":
                top();
                break;
            case "setLoader":
                setLoader(a);
                break;
            case "defaultForm":
                defaultForm();
                break;
            case "saveForm":
                saveForm();
                break;
            case "granular":
                granular()
                break;
            default:
                break;
        }
        return this;
    };

    function c(key) {
        if (config[key]) {
            return config[key];
        }
        return false;
    }
    function setLoader(loader) {
        config["loader"] = loader;
    }
    function loadIfRequired() {
      if (required()) {
        load();
      }
    }
    function isLoaded() {
        if ($(c('container')).find(c('form')).length) {
            return true;
        }
        return false;
    }
    function link(selector) {
      $(selector).click(function(){
          granular();
          if (isLoaded()) {
              show()
          } else {
              load();
          }
      });
    }
    function check(parameter) {
        var types  = c('types');
        if (($.cookie(c('name'))) && (typeof String.prototype.match === "function") && ($.cookie(c('name')).match(c('valid-settings')))) {
            var index = types.indexOf(parameter);
            if (index >= 0) {
                if ($.cookie(c('name'))[index] === "1") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            var defaults = c('defaultTypes');
            if ($.inArray(parameter, defaults) !== -1) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    function required() {
        if (!$.cookie(c('name'))) {
            return true;
        } else {
            if ((typeof String.prototype.match === "function") && (!$.cookie(c('name')).match(c('valid-settings')))) {
                return true;
            }
        }
        return false;
    }
    function save(values) {
        var value = '';
        $(c('types')).each(function(key, type){
            if (values[type] === 1) {
                value += "1";
            } else {
                value += "0";
            }
        });
        value += "-1";
        $.cookie(c('name'), null);
        $.cookie(c('name'), value, {expires: 365, path: "/"});
        $("body").trigger(c('body-trigger'));
    }
    function acceptAll() {
        values = {};
        $(c('types')).each(function(key, type){		
            values[type] = 1;
        });
        save(values);
    }
    function saveForm() {
      var values = {};
      var $form = $(c('container')).find(c('formElement')+':first');
      $(c('types')).each(function(key, type){
          var selector = c('formSelectorPrefix')+type+":first";
          var value = 0;
          if ($form.find(selector).attr("checked")) {
              value = 1;
          }
          values[type] = value;
      });
      save(values);
    }
    function defaultForm() {
      var types = c('types');
      var defaults = c('defaultTypes');
      var $form = $(c('container')).find(c('formElement')+':first');
      $(types).each(function(key, type){
          var selector = c('formSelectorPrefix')+type+":first";
          if (required()) {
            if ($.inArray(type, defaults) !== -1) {
              $form.find(selector).attr("checked", true).change();
            }
          } else {
            if (check(type)) {
                $form.find(selector).not(":checked").attr("checked", true).change();
            } else {
                $form.find(selector+":checked").attr("checked", false).change();
            }
          }
      });
    }
    function load(loader_overide) {
      top();
      var loader = c('loader');
      if (loader_overide !== undefined) {
          loader = loader_overide;
      }
      var $container = $(c('container'));
      $container.html(loader).hide(0, function() {
          show();
      });
      var url = $container.data('url');
      if (!url) {
          url = c('url');
      }
      $container.load(url);
    }
    function granular() {
      $(c('container')).addClass(c('granularClass'));
    }
    function hide() {
      var $container = $(c('container'));
      if ($container.hasClass('granular-mode') == true) {
    //   if ($container.css('position') === 'fixed') {
          $container.animate({
              left: "-50%",
              opacity: 0.5
          }, 'normal', function () {
              $container.hide(0, function(){
                  $container.css('left', "");
                  $container.css('opacity', "");
              });
          });
      } else {
          $container.slideUp();
      }

      $('.site-blur-container').fadeOut();
    }
    function show() {
        top();
        var $container = $(c('container'));

        if ($container.hasClass('granular-mode') == true) {
        // if ($container.css('position') === 'fixed') {
            if ($container.css('display') === "none") {
              $container.css('left', "-50%");
              $container.css('opacity', "0.5");
            }
            $container.show(0, function () {
                $container.animate({
                    left: "0",
                    opacity: 1
                }, 'normal');
            });
        } else {
            $container.slideDown();
        }

        $('.site-blur-container').fadeIn();
    }
    function top() {
        $('body').scrollTop(0);
    }
})(jQuery);