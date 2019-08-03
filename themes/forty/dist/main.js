(function ($) {
  /**
   * Generate an indented list of links from a nav. Meant for use with panel().
   * @return {jQuery} jQuery object.
   */
  $.fn.navList = function () {
    var $this = $(this);
    $a = $this.find('a'), b = [];
    $a.each(function () {
      var $this = $(this),
          indent = Math.max(0, $this.parents('li').length - 1),
          href = $this.attr('href'),
          target = $this.attr('target');
      b.push('<a ' + 'class="link depth-' + indent + '"' + (typeof target !== 'undefined' && target != '' ? ' target="' + target + '"' : '') + (typeof href !== 'undefined' && href != '' ? ' href="' + href + '"' : '') + '>' + '<span class="indent-' + indent + '"></span>' + $this.text() + '</a>');
    });
    return b.join('');
  };
  /**
   * Panel-ify an element.
   * @param {object} userConfig User config.
   * @return {jQuery} jQuery object.
   */


  $.fn.panel = function (userConfig) {
    // No elements?
    if (this.length == 0) return $this; // Multiple elements?

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        $(this[i]).panel(userConfig);
      }

      return $this;
    } // Vars.


    var $this = $(this),
        $body = $('body'),
        $window = $(window),
        id = $this.attr('id'),
        config; // Config.

    config = $.extend({
      // Delay.
      delay: 0,
      // Hide panel on link click.
      hideOnClick: false,
      // Hide panel on escape keypress.
      hideOnEscape: false,
      // Hide panel on swipe.
      hideOnSwipe: false,
      // Reset scroll position on hide.
      resetScroll: false,
      // Reset forms on hide.
      resetForms: false,
      // Side of viewport the panel will appear.
      side: null,
      // Target element for "class".
      target: $this,
      // Class to toggle.
      visibleClass: 'visible'
    }, userConfig); // Expand "target" if it's not a jQuery object already.

    if (typeof config.target != 'jQuery') config.target = $(config.target); // Panel.
    // Methods.

    $this._hide = function (event) {
      // Already hidden? Bail.
      if (!config.target.hasClass(config.visibleClass)) return; // If an event was provided, cancel it.

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      } // Hide.


      config.target.removeClass(config.visibleClass); // Post-hide stuff.

      window.setTimeout(function () {
        // Reset scroll position.
        if (config.resetScroll) $this.scrollTop(0); // Reset forms.

        if (config.resetForms) $this.find('form').each(function () {
          this.reset();
        });
      }, config.delay);
    }; // Vendor fixes.


    $this.css('-ms-overflow-style', '-ms-autohiding-scrollbar').css('-webkit-overflow-scrolling', 'touch'); // Hide on click.

    if (config.hideOnClick) {
      $this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
      $this.on('click', 'a', function (event) {
        var $a = $(this),
            href = $a.attr('href'),
            target = $a.attr('target');
        if (!href || href == '#' || href == '' || href == '#' + id) return; // Cancel original event.

        event.preventDefault();
        event.stopPropagation(); // Hide panel.

        $this._hide(); // Redirect to href.


        window.setTimeout(function () {
          if (target == '_blank') window.open(href);else window.location.href = href;
        }, config.delay + 10);
      });
    } // Event: Touch stuff.


    $this.on('touchstart', function (event) {
      $this.touchPosX = event.originalEvent.touches[0].pageX;
      $this.touchPosY = event.originalEvent.touches[0].pageY;
    });
    $this.on('touchmove', function (event) {
      if ($this.touchPosX === null || $this.touchPosY === null) return;
      var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
          diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
          th = $this.outerHeight(),
          ts = $this.get(0).scrollHeight - $this.scrollTop(); // Hide on swipe?

      if (config.hideOnSwipe) {
        var result = false,
            boundary = 20,
            delta = 50;

        switch (config.side) {
          case 'left':
            result = diffY < boundary && diffY > -1 * boundary && diffX > delta;
            break;

          case 'right':
            result = diffY < boundary && diffY > -1 * boundary && diffX < -1 * delta;
            break;

          case 'top':
            result = diffX < boundary && diffX > -1 * boundary && diffY > delta;
            break;

          case 'bottom':
            result = diffX < boundary && diffX > -1 * boundary && diffY < -1 * delta;
            break;

          default:
            break;
        }

        if (result) {
          $this.touchPosX = null;
          $this.touchPosY = null;

          $this._hide();

          return false;
        }
      } // Prevent vertical scrolling past the top or bottom.


      if ($this.scrollTop() < 0 && diffY < 0 || ts > th - 2 && ts < th + 2 && diffY > 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }); // Event: Prevent certain events inside the panel from bubbling.

    $this.on('click touchend touchstart touchmove', function (event) {
      event.stopPropagation();
    }); // Event: Hide panel if a child anchor tag pointing to its ID is clicked.

    $this.on('click', 'a[href="#' + id + '"]', function (event) {
      event.preventDefault();
      event.stopPropagation();
      config.target.removeClass(config.visibleClass);
    }); // Body.
    // Event: Hide panel on body click/tap.

    $body.on('click touchend', function (event) {
      $this._hide(event);
    }); // Event: Toggle.

    $body.on('click', 'a[href="#' + id + '"]', function (event) {
      event.preventDefault();
      event.stopPropagation();
      config.target.toggleClass(config.visibleClass);
    }); // Window.
    // Event: Hide on ESC.

    if (config.hideOnEscape) $window.on('keydown', function (event) {
      if (event.keyCode == 27) $this._hide(event);
    });
    return $this;
  };
  /**
   * Apply "placeholder" attribute polyfill to one or more forms.
   * @return {jQuery} jQuery object.
   */


  $.fn.placeholder = function () {
    // Browser natively supports placeholders? Bail.
    if (typeof document.createElement('input').placeholder != 'undefined') return $(this); // No elements?

    if (this.length == 0) return $this; // Multiple elements?

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        $(this[i]).placeholder();
      }

      return $this;
    } // Vars.


    var $this = $(this); // Text, TextArea.

    $this.find('input[type=text],textarea').each(function () {
      var i = $(this);
      if (i.val() == '' || i.val() == i.attr('placeholder')) i.addClass('polyfill-placeholder').val(i.attr('placeholder'));
    }).on('blur', function () {
      var i = $(this);
      if (i.attr('name').match(/-polyfill-field$/)) return;
      if (i.val() == '') i.addClass('polyfill-placeholder').val(i.attr('placeholder'));
    }).on('focus', function () {
      var i = $(this);
      if (i.attr('name').match(/-polyfill-field$/)) return;
      if (i.val() == i.attr('placeholder')) i.removeClass('polyfill-placeholder').val('');
    }); // Password.

    $this.find('input[type=password]').each(function () {
      var i = $(this);
      var x = $($('<div>').append(i.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
      if (i.attr('id') != '') x.attr('id', i.attr('id') + '-polyfill-field');
      if (i.attr('name') != '') x.attr('name', i.attr('name') + '-polyfill-field');
      x.addClass('polyfill-placeholder').val(x.attr('placeholder')).insertAfter(i);
      if (i.val() == '') i.hide();else x.hide();
      i.on('blur', function (event) {
        event.preventDefault();
        var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

        if (i.val() == '') {
          i.hide();
          x.show();
        }
      });
      x.on('focus', function (event) {
        event.preventDefault();
        var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');
        x.hide();
        i.show().focus();
      }).on('keypress', function (event) {
        event.preventDefault();
        x.val('');
      });
    }); // Events.

    $this.on('submit', function () {
      $this.find('input[type=text],input[type=password],textarea').each(function (event) {
        var i = $(this);
        if (i.attr('name').match(/-polyfill-field$/)) i.attr('name', '');

        if (i.val() == i.attr('placeholder')) {
          i.removeClass('polyfill-placeholder');
          i.val('');
        }
      });
    }).on('reset', function (event) {
      event.preventDefault();
      $this.find('select').val($('option:first').val());
      $this.find('input,textarea').each(function () {
        var i = $(this),
            x;
        i.removeClass('polyfill-placeholder');

        switch (this.type) {
          case 'submit':
          case 'reset':
            break;

          case 'password':
            i.val(i.attr('defaultValue'));
            x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

            if (i.val() == '') {
              i.hide();
              x.show();
            } else {
              i.show();
              x.hide();
            }

            break;

          case 'checkbox':
          case 'radio':
            i.attr('checked', i.attr('defaultValue'));
            break;

          case 'text':
          case 'textarea':
            i.val(i.attr('defaultValue'));

            if (i.val() == '') {
              i.addClass('polyfill-placeholder');
              i.val(i.attr('placeholder'));
            }

            break;

          default:
            i.val(i.attr('defaultValue'));
            break;
        }
      });
    });
    return $this;
  };
  /**
   * Moves elements to/from the first positions of their respective parents.
   * @param {jQuery} $elements Elements (or selector) to move.
   * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
   */


  $.prioritize = function ($elements, condition) {
    var key = '__prioritize'; // Expand $elements if it's not already a jQuery object.

    if (typeof $elements != 'jQuery') $elements = $($elements); // Step through elements.

    $elements.each(function () {
      var $e = $(this),
          $p,
          $parent = $e.parent(); // No parent? Bail.

      if ($parent.length == 0) return; // Not moved? Move it.

      if (!$e.data(key)) {
        // Condition is false? Bail.
        if (!condition) return; // Get placeholder (which will serve as our point of reference for when this element needs to move back).

        $p = $e.prev(); // Couldn't find anything? Means this element's already at the top, so bail.

        if ($p.length == 0) return; // Move element to top of parent.

        $e.prependTo($parent); // Mark element as moved.

        $e.data(key, $p);
      } // Moved already?
      else {
          // Condition is true? Bail.
          if (condition) return;
          $p = $e.data(key); // Move element back to its original location (using our placeholder).

          $e.insertAfter($p); // Unmark element as moved.

          $e.removeData(key);
        }
    });
  };
})(jQuery);/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($) {
  var $window = $(window),
      $body = $('body'),
      $wrapper = $('#wrapper'),
      $header = $('#header'),
      $banner = $('#banner'); // Breakpoints.

  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px']
  });
  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */

  $.fn._parallax = browser.name == 'ie' || browser.name == 'edge' || browser.mobile ? function () {
    return $(this);
  } : function (intensity) {
    var $window = $(window),
        $this = $(this);
    if (this.length == 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        $(this[i])._parallax(intensity);
      }

      return $this;
    }

    if (!intensity) intensity = 0.25;
    $this.each(function () {
      var $t = $(this),
          on,
          off;

      on = function on() {
        $t.css('background-position', 'center 100%, center 100%, center 0px');
        $window.on('scroll._parallax', function () {
          var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);
          $t.css('background-position', 'center ' + pos * (-1 * intensity) + 'px');
        });
      };

      off = function off() {
        $t.css('background-position', '');
        $window.off('scroll._parallax');
      };

      breakpoints.on('<=medium', off);
      breakpoints.on('>medium', on);
    });
    $window.off('load._parallax resize._parallax').on('load._parallax resize._parallax', function () {
      $window.trigger('scroll');
    });
    return $(this);
  }; // Play initial animations on page load.

  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  }); // Clear transitioning state on unload/hide.

  $window.on('unload pagehide', function () {
    window.setTimeout(function () {
      $('.is-transitioning').removeClass('is-transitioning');
    }, 250);
  }); // Fix: Enable IE-only tweaks.

  if (browser.name == 'ie' || browser.name == 'edge') $body.addClass('is-ie'); // Scrolly.

  $('.scrolly').scrolly({
    offset: function offset() {
      return $header.height() - 2;
    }
  }); // Tiles.

  var $tiles = $('.tiles > article');
  $tiles.each(function () {
    var $this = $(this),
        $image = $this.find('.image'),
        $img = $image.find('img'),
        $link = $this.find('.link'),
        x; // Image.
    // Set image.

    $this.css('background-image', 'url(' + $img.attr('src') + ')'); // Set position.

    if (x = $img.data('position')) $image.css('background-position', x); // Hide original.

    $image.hide(); // Link.

    if ($link.length > 0) {
      $x = $link.clone().text('').addClass('primary').appendTo($this);
      $link = $link.add($x);
      $link.on('click', function (event) {
        var href = $link.attr('href'); // Prevent default.

        event.stopPropagation();
        event.preventDefault(); // Target blank?

        if ($link.attr('target') == '_blank') {
          // Open in new tab.
          window.open(href);
        } // Otherwise ...
        else {
            // Start transitioning.
            $this.addClass('is-transitioning');
            $wrapper.addClass('is-transitioning'); // Redirect.

            window.setTimeout(function () {
              location.href = href;
            }, 500);
          }
      });
    }
  }); // Header.

  if ($banner.length > 0 && $header.hasClass('alt')) {
    $window.on('resize', function () {
      $window.trigger('scroll');
    });
    $window.on('load', function () {
      $banner.scrollex({
        bottom: $header.height() + 10,
        terminate: function terminate() {
          $header.removeClass('alt');
        },
        enter: function enter() {
          $header.addClass('alt');
        },
        leave: function leave() {
          $header.removeClass('alt');
          $header.addClass('reveal');
        }
      });
      window.setTimeout(function () {
        $window.triggerHandler('scroll');
      }, 100);
    });
  } // Banner.


  $banner.each(function () {
    var $this = $(this),
        $image = $this.find('.image'),
        $img = $image.find('img'); // Parallax.

    $this._parallax(0.275); // Image.


    if ($image.length > 0) {
      // Set image.
      $this.css('background-image', 'url(' + $img.attr('src') + ')'); // Hide original.

      $image.hide();
    }
  }); // Menu.

  var $menu = $('#menu'),
      $menuInner;
  $menu.wrapInner('<div class="inner"></div>');
  $menuInner = $menu.children('.inner');
  $menu._locked = false;

  $menu._lock = function () {
    if ($menu._locked) return false;
    $menu._locked = true;
    window.setTimeout(function () {
      $menu._locked = false;
    }, 350);
    return true;
  };

  $menu._show = function () {
    if ($menu._lock()) $body.addClass('is-menu-visible');
  };

  $menu._hide = function () {
    if ($menu._lock()) $body.removeClass('is-menu-visible');
  };

  $menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass('is-menu-visible');
  };

  $menuInner.on('click', function (event) {
    event.stopPropagation();
  }).on('click', 'a', function (event) {
    var href = $(this).attr('href');
    event.preventDefault();
    event.stopPropagation(); // Hide.

    $menu._hide(); // Redirect.


    window.setTimeout(function () {
      window.location.href = href;
    }, 250);
  });
  $menu.appendTo($body).on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    $body.removeClass('is-menu-visible');
  }).append('<a class="close" href="#menu">Close</a>');
  $body.on('click', 'a[href="#menu"]', function (event) {
    event.stopPropagation();
    event.preventDefault(); // Toggle.

    $menu._toggle();
  }).on('click', function (event) {
    // Hide.
    $menu._hide();
  }).on('keydown', function (event) {
    // Hide on escape.
    if (event.keyCode == 27) $menu._hide();
  });
})(jQuery);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Jlc291cmNlcy9qcy91dGlsLmpzIiwiLi4vcmVzb3VyY2VzL2pzL2ZvcnR5LmpzIl0sIm5hbWVzIjpbIiQiLCJmbiIsIm5hdkxpc3QiLCIkdGhpcyIsIiRhIiwiZmluZCIsImIiLCJlYWNoIiwiaW5kZW50IiwiTWF0aCIsIm1heCIsInBhcmVudHMiLCJsZW5ndGgiLCJocmVmIiwiYXR0ciIsInRhcmdldCIsInB1c2giLCJ0ZXh0Iiwiam9pbiIsInBhbmVsIiwidXNlckNvbmZpZyIsImkiLCIkYm9keSIsIiR3aW5kb3ciLCJ3aW5kb3ciLCJpZCIsImNvbmZpZyIsImV4dGVuZCIsImRlbGF5IiwiaGlkZU9uQ2xpY2siLCJoaWRlT25Fc2NhcGUiLCJoaWRlT25Td2lwZSIsInJlc2V0U2Nyb2xsIiwicmVzZXRGb3JtcyIsInNpZGUiLCJ2aXNpYmxlQ2xhc3MiLCJfaGlkZSIsImV2ZW50IiwiaGFzQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInJlbW92ZUNsYXNzIiwic2V0VGltZW91dCIsInNjcm9sbFRvcCIsInJlc2V0IiwiY3NzIiwib24iLCJvcGVuIiwibG9jYXRpb24iLCJ0b3VjaFBvc1giLCJvcmlnaW5hbEV2ZW50IiwidG91Y2hlcyIsInBhZ2VYIiwidG91Y2hQb3NZIiwicGFnZVkiLCJkaWZmWCIsImRpZmZZIiwidGgiLCJvdXRlckhlaWdodCIsInRzIiwiZ2V0Iiwic2Nyb2xsSGVpZ2h0IiwicmVzdWx0IiwiYm91bmRhcnkiLCJkZWx0YSIsInRvZ2dsZUNsYXNzIiwia2V5Q29kZSIsInBsYWNlaG9sZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidmFsIiwiYWRkQ2xhc3MiLCJtYXRjaCIsIngiLCJhcHBlbmQiLCJjbG9uZSIsInJlbW92ZSIsImh0bWwiLCJyZXBsYWNlIiwiaW5zZXJ0QWZ0ZXIiLCJoaWRlIiwicGFyZW50Iiwic2hvdyIsImZvY3VzIiwidHlwZSIsInByaW9yaXRpemUiLCIkZWxlbWVudHMiLCJjb25kaXRpb24iLCJrZXkiLCIkZSIsIiRwIiwiJHBhcmVudCIsImRhdGEiLCJwcmV2IiwicHJlcGVuZFRvIiwicmVtb3ZlRGF0YSIsImpRdWVyeSIsIiR3cmFwcGVyIiwiJGhlYWRlciIsIiRiYW5uZXIiLCJicmVha3BvaW50cyIsInhsYXJnZSIsImxhcmdlIiwibWVkaXVtIiwic21hbGwiLCJ4c21hbGwiLCJ4eHNtYWxsIiwiX3BhcmFsbGF4IiwiYnJvd3NlciIsIm5hbWUiLCJtb2JpbGUiLCJpbnRlbnNpdHkiLCIkdCIsIm9mZiIsInBvcyIsInBhcnNlSW50IiwicG9zaXRpb24iLCJ0b3AiLCJ0cmlnZ2VyIiwic2Nyb2xseSIsIm9mZnNldCIsImhlaWdodCIsIiR0aWxlcyIsIiRpbWFnZSIsIiRpbWciLCIkbGluayIsIiR4IiwiYXBwZW5kVG8iLCJhZGQiLCJzY3JvbGxleCIsImJvdHRvbSIsInRlcm1pbmF0ZSIsImVudGVyIiwibGVhdmUiLCJ0cmlnZ2VySGFuZGxlciIsIiRtZW51IiwiJG1lbnVJbm5lciIsIndyYXBJbm5lciIsImNoaWxkcmVuIiwiX2xvY2tlZCIsIl9sb2NrIiwiX3Nob3ciLCJfdG9nZ2xlIl0sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBWTtBQUVaOzs7O0FBSUFBLEVBQUFBLENBQUMsQ0FBQ0MsRUFBRixDQUFLQyxPQUFMLEdBQWUsWUFBVztBQUV6QixRQUFJQyxLQUFLLEdBQUdILENBQUMsQ0FBQyxJQUFELENBQWI7QUFDQ0ksSUFBQUEsRUFBRSxHQUFHRCxLQUFLLENBQUNFLElBQU4sQ0FBVyxHQUFYLENBQUwsRUFDQUMsQ0FBQyxHQUFHLEVBREo7QUFHREYsSUFBQUEsRUFBRSxDQUFDRyxJQUFILENBQVEsWUFBVztBQUVsQixVQUFJSixLQUFLLEdBQUdILENBQUMsQ0FBQyxJQUFELENBQWI7QUFBQSxVQUNDUSxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBWVAsS0FBSyxDQUFDUSxPQUFOLENBQWMsSUFBZCxFQUFv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bkcsS0FBTjtBQUVELEdBZkYsRUFnQkVVLEVBaEJGLENBZ0JLLFNBaEJMLEVBZ0JnQixVQUFTVCxLQUFULEVBQWdCO0FBRTlCO0FBQ0MsUUFBSUEsS0FBSyxDQUFDNkIsT0FBTixJQUFpQixFQUFyQixFQUNDcUUsS0FBSyxDQUFDbkcsS0FBTjtBQUVGLEdBdEJGO0FBd0JELENBeFVELEVBd1VHNEQsTUF4VUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlIGFuIGluZGVudGVkIGxpc3Qgb2YgbGlua3MgZnJvbSBhIG5hdi4gTWVhbnQgZm9yIHVzZSB3aXRoIHBhbmVsKCkuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ubmF2TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHQkYSA9ICR0aGlzLmZpbmQoJ2EnKSxcclxuXHRcdFx0YiA9IFtdO1xyXG5cclxuXHRcdCRhLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXJcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRpbmRlbnQgPSBNYXRoLm1heCgwLCAkdGhpcy5wYXJlbnRzKCdsaScpLmxlbmd0aCAtIDEpLFxyXG5cdFx0XHRcdGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0dGFyZ2V0ID0gJHRoaXMuYXR0cigndGFyZ2V0Jyk7XHJcblxyXG5cdFx0XHRiLnB1c2goXHJcblx0XHRcdFx0JzxhICcgK1xyXG5cdFx0XHRcdFx0J2NsYXNzPVwibGluayBkZXB0aC0nICsgaW5kZW50ICsgJ1wiJyArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgdGFyZ2V0ICE9PSAndW5kZWZpbmVkJyAmJiB0YXJnZXQgIT0gJycpID8gJyB0YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiJyA6ICcnKSArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgaHJlZiAhPT0gJ3VuZGVmaW5lZCcgJiYgaHJlZiAhPSAnJykgPyAnIGhyZWY9XCInICsgaHJlZiArICdcIicgOiAnJykgK1xyXG5cdFx0XHRcdCc+JyArXHJcblx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJpbmRlbnQtJyArIGluZGVudCArICdcIj48L3NwYW4+JyArXHJcblx0XHRcdFx0XHQkdGhpcy50ZXh0KCkgK1xyXG5cdFx0XHRcdCc8L2E+J1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBiLmpvaW4oJycpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQYW5lbC1pZnkgYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdXNlckNvbmZpZyBVc2VyIGNvbmZpZy5cclxuXHQgKiBAcmV0dXJuIHtqUXVlcnl9IGpRdWVyeSBvYmplY3QuXHJcblx0ICovXHJcblx0JC5mbi5wYW5lbCA9IGZ1bmN0aW9uKHVzZXJDb25maWcpIHtcclxuXHJcblx0XHQvLyBObyBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdC8vIE11bHRpcGxlIGVsZW1lbnRzP1xyXG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPiAxKSB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHQkKHRoaXNbaV0pLnBhbmVsKHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0JGJvZHkgPSAkKCdib2R5JyksXHJcblx0XHRcdFx0JHdpbmRvdyA9ICQod2luZG93KSxcclxuXHRcdFx0XHRpZCA9ICR0aGlzLmF0dHIoJ2lkJyksXHJcblx0XHRcdFx0Y29uZmlnO1xyXG5cclxuXHRcdC8vIENvbmZpZy5cclxuXHRcdFx0Y29uZmlnID0gJC5leHRlbmQoe1xyXG5cclxuXHRcdFx0XHQvLyBEZWxheS5cclxuXHRcdFx0XHRcdGRlbGF5OiAwLFxyXG5cclxuXHRcdFx0XHQvLyBIaWRlIHBhbmVsIG9uIGxpbmsgY2xpY2suXHJcblx0XHRcdFx0XHRoaWRlT25DbGljazogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIEhpZGUgcGFuZWwgb24gZXNjYXBlIGtleXByZXNzLlxyXG5cdFx0XHRcdFx0aGlkZU9uRXNjYXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBwYW5lbCBvbiBzd2lwZS5cclxuXHRcdFx0XHRcdGhpZGVPblN3aXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gUmVzZXQgc2Nyb2xsIHBvc2l0aW9uIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldFNjcm9sbDogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFJlc2V0IGZvcm1zIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldEZvcm1zOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gU2lkZSBvZiB2aWV3cG9ydCB0aGUgcGFuZWwgd2lsbCBhcHBlYXIuXHJcblx0XHRcdFx0XHRzaWRlOiBudWxsLFxyXG5cclxuXHRcdFx0XHQvLyBUYXJnZXQgZWxlbWVudCBmb3IgXCJjbGFzc1wiLlxyXG5cdFx0XHRcdFx0dGFyZ2V0OiAkdGhpcyxcclxuXHJcblx0XHRcdFx0Ly8gQ2xhc3MgdG8gdG9nZ2xlLlxyXG5cdFx0XHRcdFx0dmlzaWJsZUNsYXNzOiAndmlzaWJsZSdcclxuXHJcblx0XHRcdH0sIHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0Ly8gRXhwYW5kIFwidGFyZ2V0XCIgaWYgaXQncyBub3QgYSBqUXVlcnkgb2JqZWN0IGFscmVhZHkuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjb25maWcudGFyZ2V0ICE9ICdqUXVlcnknKVxyXG5cdFx0XHRcdFx0Y29uZmlnLnRhcmdldCA9ICQoY29uZmlnLnRhcmdldCk7XHJcblxyXG5cdFx0Ly8gUGFuZWwuXHJcblxyXG5cdFx0XHQvLyBNZXRob2RzLlxyXG5cdFx0XHRcdCR0aGlzLl9oaWRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBBbHJlYWR5IGhpZGRlbj8gQmFpbC5cclxuXHRcdFx0XHRcdFx0aWYgKCFjb25maWcudGFyZ2V0Lmhhc0NsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiBhbiBldmVudCB3YXMgcHJvdmlkZWQsIGNhbmNlbCBpdC5cclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGlkZS5cclxuXHRcdFx0XHRcdFx0Y29uZmlnLnRhcmdldC5yZW1vdmVDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKTtcclxuXHJcblx0XHRcdFx0XHQvLyBQb3N0LWhpZGUgc3R1ZmYuXHJcblx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBSZXNldCBzY3JvbGwgcG9zaXRpb24uXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlnLnJlc2V0U2Nyb2xsKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5zY3JvbGxUb3AoMCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGZvcm1zLlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXNldEZvcm1zKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdmb3JtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0fSwgY29uZmlnLmRlbGF5KTtcclxuXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIFZlbmRvciBmaXhlcy5cclxuXHRcdFx0XHQkdGhpc1xyXG5cdFx0XHRcdFx0LmNzcygnLW1zLW92ZXJmbG93LXN0eWxlJywgJy1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcicpXHJcblx0XHRcdFx0XHQuY3NzKCctd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZycsICd0b3VjaCcpO1xyXG5cclxuXHRcdFx0Ly8gSGlkZSBvbiBjbGljay5cclxuXHRcdFx0XHRpZiAoY29uZmlnLmhpZGVPbkNsaWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnYScpXHJcblx0XHRcdFx0XHRcdC5jc3MoJy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcicsICdyZ2JhKDAsMCwwLDApJyk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXNcclxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyICRhID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0XHRcdGhyZWYgPSAkYS5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXQgPSAkYS5hdHRyKCd0YXJnZXQnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFocmVmIHx8IGhyZWYgPT0gJyMnIHx8IGhyZWYgPT0gJycgfHwgaHJlZiA9PSAnIycgKyBpZClcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2FuY2VsIG9yaWdpbmFsIGV2ZW50LlxyXG5cdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBIaWRlIHBhbmVsLlxyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuX2hpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gUmVkaXJlY3QgdG8gaHJlZi5cclxuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldCA9PSAnX2JsYW5rJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9LCBjb25maWcuZGVsYXkgKyAxMCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvdWNoIHN0dWZmLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1kgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgkdGhpcy50b3VjaFBvc1ggPT09IG51bGxcclxuXHRcdFx0XHRcdHx8XHQkdGhpcy50b3VjaFBvc1kgPT09IG51bGwpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHR2YXJcdGRpZmZYID0gJHRoaXMudG91Y2hQb3NYIC0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYLFxyXG5cdFx0XHRcdFx0XHRkaWZmWSA9ICR0aGlzLnRvdWNoUG9zWSAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWSxcclxuXHRcdFx0XHRcdFx0dGggPSAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHR0cyA9ICgkdGhpcy5nZXQoMCkuc2Nyb2xsSGVpZ2h0IC0gJHRoaXMuc2Nyb2xsVG9wKCkpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgb24gc3dpcGU/XHJcblx0XHRcdFx0XHRcdGlmIChjb25maWcuaGlkZU9uU3dpcGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym91bmRhcnkgPSAyMCxcclxuXHRcdFx0XHRcdFx0XHRcdGRlbHRhID0gNTA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29uZmlnLnNpZGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZZIDwgYm91bmRhcnkgJiYgZGlmZlkgPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWCA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSAoZGlmZlkgPCBib3VuZGFyeSAmJiBkaWZmWSA+ICgtMSAqIGJvdW5kYXJ5KSkgJiYgKGRpZmZYIDwgKC0xICogZGVsdGEpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndG9wJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA8ICgtMSAqIGRlbHRhKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NZID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gUHJldmVudCB2ZXJ0aWNhbCBzY3JvbGxpbmcgcGFzdCB0aGUgdG9wIG9yIGJvdHRvbS5cclxuXHRcdFx0XHRcdFx0aWYgKCgkdGhpcy5zY3JvbGxUb3AoKSA8IDAgJiYgZGlmZlkgPCAwKVxyXG5cdFx0XHRcdFx0XHR8fCAodHMgPiAodGggLSAyKSAmJiB0cyA8ICh0aCArIDIpICYmIGRpZmZZID4gMCkpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFdmVudDogUHJldmVudCBjZXJ0YWluIGV2ZW50cyBpbnNpZGUgdGhlIHBhbmVsIGZyb20gYnViYmxpbmcuXHJcblx0XHRcdFx0JHRoaXMub24oJ2NsaWNrIHRvdWNoZW5kIHRvdWNoc3RhcnQgdG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgcGFuZWwgaWYgYSBjaGlsZCBhbmNob3IgdGFnIHBvaW50aW5nIHRvIGl0cyBJRCBpcyBjbGlja2VkLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCdjbGljaycsICdhW2hyZWY9XCIjJyArIGlkICsgJ1wiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdGNvbmZpZy50YXJnZXQucmVtb3ZlQ2xhc3MoY29uZmlnLnZpc2libGVDbGFzcyk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdC8vIEJvZHkuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBwYW5lbCBvbiBib2R5IGNsaWNrL3RhcC5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2sgdG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdFx0JHRoaXMuX2hpZGUoZXZlbnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvZ2dsZS5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2snLCAnYVtocmVmPVwiIycgKyBpZCArICdcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcudGFyZ2V0LnRvZ2dsZUNsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBXaW5kb3cuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBvbiBFU0MuXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5oaWRlT25Fc2NhcGUpXHJcblx0XHRcdFx0XHQkd2luZG93Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09IDI3KVxyXG5cdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKGV2ZW50KTtcclxuXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGx5IFwicGxhY2Vob2xkZXJcIiBhdHRyaWJ1dGUgcG9seWZpbGwgdG8gb25lIG9yIG1vcmUgZm9ybXMuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ucGxhY2Vob2xkZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBCcm93c2VyIG5hdGl2ZWx5IHN1cHBvcnRzIHBsYWNlaG9sZGVycz8gQmFpbC5cclxuXHRcdFx0aWYgKHR5cGVvZiAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSkucGxhY2Vob2xkZXIgIT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0cmV0dXJuICQodGhpcyk7XHJcblxyXG5cdFx0Ly8gTm8gZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHQvLyBNdWx0aXBsZSBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID4gMSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0JCh0aGlzW2ldKS5wbGFjZWhvbGRlcigpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHQvLyBUZXh0LCBUZXh0QXJlYS5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSx0ZXh0YXJlYScpXHJcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnXHJcblx0XHRcdFx0XHR8fCAgaS52YWwoKSA9PSBpLmF0dHIoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKS5tYXRjaCgvLXBvbHlmaWxsLWZpZWxkJC8pKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09IGkuYXR0cigncGxhY2Vob2xkZXInKSlcclxuXHRcdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHRcdC52YWwoJycpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBQYXNzd29yZC5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT1wYXNzd29yZF0nKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHRcdFx0XHRcdHZhciB4ID0gJChcclxuXHRcdFx0XHRcdFx0XHRcdCQoJzxkaXY+JylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmFwcGVuZChpLmNsb25lKCkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZW1vdmUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuaHRtbCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPVwicGFzc3dvcmRcIi9pLCAndHlwZT1cInRleHRcIicpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPXBhc3N3b3JkL2ksICd0eXBlPXRleHQnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCdpZCcpICE9ICcnKVxyXG5cdFx0XHRcdFx0XHR4LmF0dHIoJ2lkJywgaS5hdHRyKCdpZCcpICsgJy1wb2x5ZmlsbC1maWVsZCcpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKSAhPSAnJylcclxuXHRcdFx0XHRcdFx0eC5hdHRyKCduYW1lJywgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkJyk7XHJcblxyXG5cdFx0XHRcdFx0eC5hZGRDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHQudmFsKHguYXR0cigncGxhY2Vob2xkZXInKSkuaW5zZXJ0QWZ0ZXIoaSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdC5vbignYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciB4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR4LnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0eFxyXG5cdFx0XHRcdFx0XHQub24oJ2ZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSB4LnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9JyArIHguYXR0cignbmFtZScpLnJlcGxhY2UoJy1wb2x5ZmlsbC1maWVsZCcsICcnKSArICddJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0XHRcdFx0XHQuZm9jdXMoKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdHgudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBFdmVudHMuXHJcblx0XHRcdCR0aGlzXHJcblx0XHRcdFx0Lm9uKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dFt0eXBlPXRleHRdLGlucHV0W3R5cGU9cGFzc3dvcmRdLHRleHRhcmVhJylcclxuXHRcdFx0XHRcdFx0LmVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0XHRcdGkuYXR0cignbmFtZScsICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gaS5hdHRyKCdwbGFjZWhvbGRlcicpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHRcdFx0XHRcdGkudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdyZXNldCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdzZWxlY3QnKVxyXG5cdFx0XHRcdFx0XHQudmFsKCQoJ29wdGlvbjpmaXJzdCcpLnZhbCgpKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dCx0ZXh0YXJlYScpXHJcblx0XHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRcdFx0XHR4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpLnJlbW92ZUNsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3N1Ym1pdCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyZXNldCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkuYXR0cignY2hlY2tlZCcsIGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3RleHRhcmVhJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdwbGFjZWhvbGRlcicpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIGVsZW1lbnRzIHRvL2Zyb20gdGhlIGZpcnN0IHBvc2l0aW9ucyBvZiB0aGVpciByZXNwZWN0aXZlIHBhcmVudHMuXHJcblx0ICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50cyBFbGVtZW50cyAob3Igc2VsZWN0b3IpIHRvIG1vdmUuXHJcblx0ICogQHBhcmFtIHtib29sfSBjb25kaXRpb24gSWYgdHJ1ZSwgbW92ZXMgZWxlbWVudHMgdG8gdGhlIHRvcC4gT3RoZXJ3aXNlLCBtb3ZlcyBlbGVtZW50cyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9ucy5cclxuXHQgKi9cclxuXHQkLnByaW9yaXRpemUgPSBmdW5jdGlvbigkZWxlbWVudHMsIGNvbmRpdGlvbikge1xyXG5cclxuXHRcdHZhciBrZXkgPSAnX19wcmlvcml0aXplJztcclxuXHJcblx0XHQvLyBFeHBhbmQgJGVsZW1lbnRzIGlmIGl0J3Mgbm90IGFscmVhZHkgYSBqUXVlcnkgb2JqZWN0LlxyXG5cdFx0XHRpZiAodHlwZW9mICRlbGVtZW50cyAhPSAnalF1ZXJ5JylcclxuXHRcdFx0XHQkZWxlbWVudHMgPSAkKCRlbGVtZW50cyk7XHJcblxyXG5cdFx0Ly8gU3RlcCB0aHJvdWdoIGVsZW1lbnRzLlxyXG5cdFx0XHQkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyXHQkZSA9ICQodGhpcyksICRwLFxyXG5cdFx0XHRcdFx0JHBhcmVudCA9ICRlLnBhcmVudCgpO1xyXG5cclxuXHRcdFx0XHQvLyBObyBwYXJlbnQ/IEJhaWwuXHJcblx0XHRcdFx0XHRpZiAoJHBhcmVudC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyBOb3QgbW92ZWQ/IE1vdmUgaXQuXHJcblx0XHRcdFx0XHRpZiAoISRlLmRhdGEoa2V5KSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIGlzIGZhbHNlPyBCYWlsLlxyXG5cdFx0XHRcdFx0XHRcdGlmICghY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gR2V0IHBsYWNlaG9sZGVyICh3aGljaCB3aWxsIHNlcnZlIGFzIG91ciBwb2ludCBvZiByZWZlcmVuY2UgZm9yIHdoZW4gdGhpcyBlbGVtZW50IG5lZWRzIHRvIG1vdmUgYmFjaykuXHJcblx0XHRcdFx0XHRcdFx0JHAgPSAkZS5wcmV2KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIENvdWxkbid0IGZpbmQgYW55dGhpbmc/IE1lYW5zIHRoaXMgZWxlbWVudCdzIGFscmVhZHkgYXQgdGhlIHRvcCwgc28gYmFpbC5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICgkcC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTW92ZSBlbGVtZW50IHRvIHRvcCBvZiBwYXJlbnQuXHJcblx0XHRcdFx0XHRcdFx0JGUucHJlcGVuZFRvKCRwYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTWFyayBlbGVtZW50IGFzIG1vdmVkLlxyXG5cdFx0XHRcdFx0XHRcdCRlLmRhdGEoa2V5LCAkcCk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBNb3ZlZCBhbHJlYWR5P1xyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gaXMgdHJ1ZT8gQmFpbC5cclxuXHRcdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0JHAgPSAkZS5kYXRhKGtleSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBNb3ZlIGVsZW1lbnQgYmFjayB0byBpdHMgb3JpZ2luYWwgbG9jYXRpb24gKHVzaW5nIG91ciBwbGFjZWhvbGRlcikuXHJcblx0XHRcdFx0XHRcdFx0JGUuaW5zZXJ0QWZ0ZXIoJHApO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gVW5tYXJrIGVsZW1lbnQgYXMgbW92ZWQuXHJcblx0XHRcdFx0XHRcdFx0JGUucmVtb3ZlRGF0YShrZXkpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5KTsiLCIvKlxyXG5cdEZvcnR5IGJ5IEhUTUw1IFVQXHJcblx0aHRtbDV1cC5uZXQgfCBAYWpsa25cclxuXHRGcmVlIGZvciBwZXJzb25hbCBhbmQgY29tbWVyY2lhbCB1c2UgdW5kZXIgdGhlIENDQSAzLjAgbGljZW5zZSAoaHRtbDV1cC5uZXQvbGljZW5zZSlcclxuKi9cclxuXHJcbihmdW5jdGlvbigkKSB7XHJcblxyXG5cdHZhclx0JHdpbmRvdyA9ICQod2luZG93KSxcclxuXHRcdCRib2R5ID0gJCgnYm9keScpLFxyXG5cdFx0JHdyYXBwZXIgPSAkKCcjd3JhcHBlcicpLFxyXG5cdFx0JGhlYWRlciA9ICQoJyNoZWFkZXInKSxcclxuXHRcdCRiYW5uZXIgPSAkKCcjYmFubmVyJyk7XHJcblxyXG5cdC8vIEJyZWFrcG9pbnRzLlxyXG5cdFx0YnJlYWtwb2ludHMoe1xyXG5cdFx0XHR4bGFyZ2U6ICAgIFsnMTI4MXB4JywgICAnMTY4MHB4JyAgIF0sXHJcblx0XHRcdGxhcmdlOiAgICAgWyc5ODFweCcsICAgICcxMjgwcHgnICAgXSxcclxuXHRcdFx0bWVkaXVtOiAgICBbJzczN3B4JywgICAgJzk4MHB4JyAgICBdLFxyXG5cdFx0XHRzbWFsbDogICAgIFsnNDgxcHgnLCAgICAnNzM2cHgnICAgIF0sXHJcblx0XHRcdHhzbWFsbDogICAgWyczNjFweCcsICAgICc0ODBweCcgICAgXSxcclxuXHRcdFx0eHhzbWFsbDogICBbbnVsbCwgICAgICAgJzM2MHB4JyAgICBdXHJcblx0XHR9KTtcclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyBwYXJhbGxheCBzY3JvbGxpbmcgdG8gYW4gZWxlbWVudCdzIGJhY2tncm91bmQgaW1hZ2UuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4uX3BhcmFsbGF4ID0gKGJyb3dzZXIubmFtZSA9PSAnaWUnIHx8IGJyb3dzZXIubmFtZSA9PSAnZWRnZScgfHwgYnJvd3Nlci5tb2JpbGUpID8gZnVuY3Rpb24oKSB7IHJldHVybiAkKHRoaXMpIH0gOiBmdW5jdGlvbihpbnRlbnNpdHkpIHtcclxuXHJcblx0XHR2YXJcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5sZW5ndGggPT0gMCB8fCBpbnRlbnNpdHkgPT09IDApXHJcblx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHRpZiAodGhpcy5sZW5ndGggPiAxKSB7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdCQodGhpc1tpXSkuX3BhcmFsbGF4KGludGVuc2l0eSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaW50ZW5zaXR5KVxyXG5cdFx0XHRpbnRlbnNpdHkgPSAwLjI1O1xyXG5cclxuXHRcdCR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXIgJHQgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdG9uLCBvZmY7XHJcblxyXG5cdFx0XHRvbiA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQkdC5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCAnY2VudGVyIDEwMCUsIGNlbnRlciAxMDAlLCBjZW50ZXIgMHB4Jyk7XHJcblxyXG5cdFx0XHRcdCR3aW5kb3dcclxuXHRcdFx0XHRcdC5vbignc2Nyb2xsLl9wYXJhbGxheCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHBvcyA9IHBhcnNlSW50KCR3aW5kb3cuc2Nyb2xsVG9wKCkpIC0gcGFyc2VJbnQoJHQucG9zaXRpb24oKS50b3ApO1xyXG5cclxuXHRcdFx0XHRcdFx0JHQuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJ2NlbnRlciAnICsgKHBvcyAqICgtMSAqIGludGVuc2l0eSkpICsgJ3B4Jyk7XHJcblxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0b2ZmID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdCR0XHJcblx0XHRcdFx0XHQuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgJycpO1xyXG5cclxuXHRcdFx0XHQkd2luZG93XHJcblx0XHRcdFx0XHQub2ZmKCdzY3JvbGwuX3BhcmFsbGF4Jyk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0YnJlYWtwb2ludHMub24oJzw9bWVkaXVtJywgb2ZmKTtcclxuXHRcdFx0YnJlYWtwb2ludHMub24oJz5tZWRpdW0nLCBvbik7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHdpbmRvd1xyXG5cdFx0XHQub2ZmKCdsb2FkLl9wYXJhbGxheCByZXNpemUuX3BhcmFsbGF4JylcclxuXHRcdFx0Lm9uKCdsb2FkLl9wYXJhbGxheCByZXNpemUuX3BhcmFsbGF4JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JHdpbmRvdy50cmlnZ2VyKCdzY3JvbGwnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuICQodGhpcyk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8vIFBsYXkgaW5pdGlhbCBhbmltYXRpb25zIG9uIHBhZ2UgbG9hZC5cclxuXHRcdCR3aW5kb3cub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLXByZWxvYWQnKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyBDbGVhciB0cmFuc2l0aW9uaW5nIHN0YXRlIG9uIHVubG9hZC9oaWRlLlxyXG5cdFx0JHdpbmRvdy5vbigndW5sb2FkIHBhZ2VoaWRlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5pcy10cmFuc2l0aW9uaW5nJykucmVtb3ZlQ2xhc3MoJ2lzLXRyYW5zaXRpb25pbmcnKTtcclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyBGaXg6IEVuYWJsZSBJRS1vbmx5IHR3ZWFrcy5cclxuXHRcdGlmIChicm93c2VyLm5hbWUgPT0gJ2llJyB8fCBicm93c2VyLm5hbWUgPT0gJ2VkZ2UnKVxyXG5cdFx0XHQkYm9keS5hZGRDbGFzcygnaXMtaWUnKTtcclxuXHJcblx0Ly8gU2Nyb2xseS5cclxuXHRcdCQoJy5zY3JvbGx5Jykuc2Nyb2xseSh7XHJcblx0XHRcdG9mZnNldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuICRoZWFkZXIuaGVpZ2h0KCkgLSAyO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0Ly8gVGlsZXMuXHJcblx0XHR2YXIgJHRpbGVzID0gJCgnLnRpbGVzID4gYXJ0aWNsZScpO1xyXG5cclxuXHRcdCR0aWxlcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHQkaW1hZ2UgPSAkdGhpcy5maW5kKCcuaW1hZ2UnKSwgJGltZyA9ICRpbWFnZS5maW5kKCdpbWcnKSxcclxuXHRcdFx0XHQkbGluayA9ICR0aGlzLmZpbmQoJy5saW5rJyksXHJcblx0XHRcdFx0eDtcclxuXHJcblx0XHRcdC8vIEltYWdlLlxyXG5cclxuXHRcdFx0XHQvLyBTZXQgaW1hZ2UuXHJcblx0XHRcdFx0XHQkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcgKyAkaW1nLmF0dHIoJ3NyYycpICsgJyknKTtcclxuXHJcblx0XHRcdFx0Ly8gU2V0IHBvc2l0aW9uLlxyXG5cdFx0XHRcdFx0aWYgKHggPSAkaW1nLmRhdGEoJ3Bvc2l0aW9uJykpXHJcblx0XHRcdFx0XHRcdCRpbWFnZS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCB4KTtcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBvcmlnaW5hbC5cclxuXHRcdFx0XHRcdCRpbWFnZS5oaWRlKCk7XHJcblxyXG5cdFx0XHQvLyBMaW5rLlxyXG5cdFx0XHRcdGlmICgkbGluay5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRcdFx0JHggPSAkbGluay5jbG9uZSgpXHJcblx0XHRcdFx0XHRcdC50ZXh0KCcnKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3ByaW1hcnknKVxyXG5cdFx0XHRcdFx0XHQuYXBwZW5kVG8oJHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdCRsaW5rID0gJGxpbmsuYWRkKCR4KTtcclxuXHJcblx0XHRcdFx0XHQkbGluay5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGhyZWYgPSAkbGluay5hdHRyKCdocmVmJyk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBQcmV2ZW50IGRlZmF1bHQuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIFRhcmdldCBibGFuaz9cclxuXHRcdFx0XHRcdFx0XHRpZiAoJGxpbmsuYXR0cigndGFyZ2V0JykgPT0gJ19ibGFuaycpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBPcGVuIGluIG5ldyB0YWIuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5vcGVuKGhyZWYpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBPdGhlcndpc2UgLi4uXHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3RhcnQgdHJhbnNpdGlvbmluZy5cclxuXHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoJ2lzLXRyYW5zaXRpb25pbmcnKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHdyYXBwZXIuYWRkQ2xhc3MoJ2lzLXRyYW5zaXRpb25pbmcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBSZWRpcmVjdC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sIDUwMCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cclxuXHQvLyBIZWFkZXIuXHJcblx0XHRpZiAoJGJhbm5lci5sZW5ndGggPiAwXHJcblx0XHQmJlx0JGhlYWRlci5oYXNDbGFzcygnYWx0JykpIHtcclxuXHJcblx0XHRcdCR3aW5kb3cub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCR3aW5kb3cudHJpZ2dlcignc2Nyb2xsJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JHdpbmRvdy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHQkYmFubmVyLnNjcm9sbGV4KHtcclxuXHRcdFx0XHRcdGJvdHRvbTpcdFx0JGhlYWRlci5oZWlnaHQoKSArIDEwLFxyXG5cdFx0XHRcdFx0dGVybWluYXRlOlx0ZnVuY3Rpb24oKSB7ICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2FsdCcpOyB9LFxyXG5cdFx0XHRcdFx0ZW50ZXI6XHRcdGZ1bmN0aW9uKCkgeyAkaGVhZGVyLmFkZENsYXNzKCdhbHQnKTsgfSxcclxuXHRcdFx0XHRcdGxlYXZlOlx0XHRmdW5jdGlvbigpIHsgJGhlYWRlci5yZW1vdmVDbGFzcygnYWx0Jyk7ICRoZWFkZXIuYWRkQ2xhc3MoJ3JldmVhbCcpOyB9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JHdpbmRvdy50cmlnZ2VySGFuZGxlcignc2Nyb2xsJyk7XHJcblx0XHRcdFx0fSwgMTAwKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0Ly8gQmFubmVyLlxyXG5cdFx0JGJhbm5lci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHQkaW1hZ2UgPSAkdGhpcy5maW5kKCcuaW1hZ2UnKSwgJGltZyA9ICRpbWFnZS5maW5kKCdpbWcnKTtcclxuXHJcblx0XHRcdC8vIFBhcmFsbGF4LlxyXG5cdFx0XHRcdCR0aGlzLl9wYXJhbGxheCgwLjI3NSk7XHJcblxyXG5cdFx0XHQvLyBJbWFnZS5cclxuXHRcdFx0XHRpZiAoJGltYWdlLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHRcdFx0XHQvLyBTZXQgaW1hZ2UuXHJcblx0XHRcdFx0XHRcdCR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICd1cmwoJyArICRpbWcuYXR0cignc3JjJykgKyAnKScpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgb3JpZ2luYWwuXHJcblx0XHRcdFx0XHRcdCRpbWFnZS5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblx0Ly8gTWVudS5cclxuXHRcdHZhciAkbWVudSA9ICQoJyNtZW51JyksXHJcblx0XHRcdCRtZW51SW5uZXI7XHJcblxyXG5cdFx0JG1lbnUud3JhcElubmVyKCc8ZGl2IGNsYXNzPVwiaW5uZXJcIj48L2Rpdj4nKTtcclxuXHRcdCRtZW51SW5uZXIgPSAkbWVudS5jaGlsZHJlbignLmlubmVyJyk7XHJcblx0XHQkbWVudS5fbG9ja2VkID0gZmFsc2U7XHJcblxyXG5cdFx0JG1lbnUuX2xvY2sgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdGlmICgkbWVudS5fbG9ja2VkKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdCRtZW51Ll9sb2NrZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JG1lbnUuX2xvY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHR9LCAzNTApO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQkbWVudS5fc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0aWYgKCRtZW51Ll9sb2NrKCkpXHJcblx0XHRcdFx0JGJvZHkuYWRkQ2xhc3MoJ2lzLW1lbnUtdmlzaWJsZScpO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0JG1lbnUuX2hpZGUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdGlmICgkbWVudS5fbG9jaygpKVxyXG5cdFx0XHRcdCRib2R5LnJlbW92ZUNsYXNzKCdpcy1tZW51LXZpc2libGUnKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdCRtZW51Ll90b2dnbGUgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdGlmICgkbWVudS5fbG9jaygpKVxyXG5cdFx0XHRcdCRib2R5LnRvZ2dsZUNsYXNzKCdpcy1tZW51LXZpc2libGUnKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdCRtZW51SW5uZXJcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdC8vIEhpZGUuXHJcblx0XHRcdFx0XHQkbWVudS5faGlkZSgpO1xyXG5cclxuXHRcdFx0XHQvLyBSZWRpcmVjdC5cclxuXHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcblx0XHRcdFx0XHR9LCAyNTApO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0JG1lbnVcclxuXHRcdFx0LmFwcGVuZFRvKCRib2R5KVxyXG5cdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLW1lbnUtdmlzaWJsZScpO1xyXG5cclxuXHRcdFx0fSlcclxuXHRcdFx0LmFwcGVuZCgnPGEgY2xhc3M9XCJjbG9zZVwiIGhyZWY9XCIjbWVudVwiPkNsb3NlPC9hPicpO1xyXG5cclxuXHRcdCRib2R5XHJcblx0XHRcdC5vbignY2xpY2snLCAnYVtocmVmPVwiI21lbnVcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHQvLyBUb2dnbGUuXHJcblx0XHRcdFx0XHQkbWVudS5fdG9nZ2xlKCk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0Ly8gSGlkZS5cclxuXHRcdFx0XHRcdCRtZW51Ll9oaWRlKCk7XHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHQvLyBIaWRlIG9uIGVzY2FwZS5cclxuXHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09IDI3KVxyXG5cdFx0XHRcdFx0XHQkbWVudS5faGlkZSgpO1xyXG5cclxuXHRcdFx0fSk7XHJcblxyXG59KShqUXVlcnkpOyJdfQ==