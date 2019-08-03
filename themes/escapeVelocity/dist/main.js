/* jquery.dropotron.js v1.4.3 | (c) @ajlkn | github.com/ajlkn/jquery.dropotron | MIT licensed */
!function (e) {
  e.fn.disableSelection_dropotron = function () {
    return e(this).css("user-select", "none").css("-khtml-user-select", "none").css("-moz-user-select", "none").css("-o-user-select", "none").css("-webkit-user-select", "none");
  }, e.fn.dropotron = function (t) {
    if (0 == this.length) return e(this);
    if (this.length > 1) for (var o = 0; o < this.length; o++) {
      e(this[o]).dropotron(t);
    }
    return e.dropotron(e.extend({
      selectorParent: e(this)
    }, t));
  }, e.dropotron = function (t) {
    var o = e.extend({
      selectorParent: null,
      baseZIndex: 1e3,
      menuClass: "dropotron",
      expandMode: "hover",
      hoverDelay: 150,
      hideDelay: 250,
      openerClass: "opener",
      openerActiveClass: "active",
      submenuClassPrefix: "level-",
      mode: "fade",
      speed: "fast",
      easing: "swing",
      alignment: "left",
      offsetX: 0,
      offsetY: 0,
      globalOffsetY: 0,
      IEOffsetX: 0,
      IEOffsetY: 0,
      noOpenerFade: !0,
      detach: !0,
      cloneOnDetach: !0
    }, t),
        n = o.selectorParent,
        s = n.find("ul"),
        i = e("body"),
        a = e("body,html"),
        l = e(window),
        r = !1,
        d = null,
        c = null;
    n.on("doCollapseAll", function () {
      s.trigger("doCollapse");
    }), s.each(function () {
      var t = e(this),
          n = t.parent();
      o.hideDelay > 0 && t.add(n).on("mouseleave", function (e) {
        window.clearTimeout(c), c = window.setTimeout(function () {
          t.trigger("doCollapse");
        }, o.hideDelay);
      }), t.disableSelection_dropotron().hide().addClass(o.menuClass).css("position", "absolute").on("mouseenter", function (e) {
        window.clearTimeout(c);
      }).on("doExpand", function () {
        if (t.is(":visible")) return !1;
        window.clearTimeout(c), s.each(function () {
          var t = e(this);
          e.contains(t.get(0), n.get(0)) || t.trigger("doCollapse");
        });
        var i,
            a,
            d,
            f,
            u = n.offset(),
            p = n.position(),
            h = (n.parent().position(), n.outerWidth()),
            g = t.outerWidth(),
            v = t.css("z-index") == o.baseZIndex;

        if (v) {
          switch (i = o.detach ? u : p, f = i.top + n.outerHeight() + o.globalOffsetY, a = o.alignment, t.removeClass("left").removeClass("right").removeClass("center"), o.alignment) {
            case "right":
              d = i.left - g + h, 0 > d && (d = i.left, a = "left");
              break;

            case "center":
              d = i.left - Math.floor((g - h) / 2), 0 > d ? (d = i.left, a = "left") : d + g > l.width() && (d = i.left - g + h, a = "right");
              break;

            case "left":
            default:
              d = i.left, d + g > l.width() && (d = i.left - g + h, a = "right");
          }

          t.addClass(a);
        } else switch ("relative" == n.css("position") || "absolute" == n.css("position") ? (f = o.offsetY, d = -1 * p.left) : (f = p.top + o.offsetY, d = 0), o.alignment) {
          case "right":
            d += -1 * n.parent().outerWidth() + o.offsetX;
            break;

          case "center":
          case "left":
          default:
            d += n.parent().outerWidth() + o.offsetX;
        }

        navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 < 8 && (d += o.IEOffsetX, f += o.IEOffsetY), t.css("left", d + "px").css("top", f + "px").css("opacity", "0.01").show();
        var C = !1;

        switch (d = "relative" == n.css("position") || "absolute" == n.css("position") ? -1 * p.left : 0, t.offset().left < 0 ? (d += n.parent().outerWidth() - o.offsetX, C = !0) : t.offset().left + g > l.width() && (d += -1 * n.parent().outerWidth() - o.offsetX, C = !0), C && t.css("left", d + "px"), t.hide().css("opacity", "1"), o.mode) {
          case "zoom":
            r = !0, n.addClass(o.openerActiveClass), t.animate({
              width: "toggle",
              height: "toggle"
            }, o.speed, o.easing, function () {
              r = !1;
            });
            break;

          case "slide":
            r = !0, n.addClass(o.openerActiveClass), t.animate({
              height: "toggle"
            }, o.speed, o.easing, function () {
              r = !1;
            });
            break;

          case "fade":
            if (r = !0, v && !o.noOpenerFade) {
              var C;
              C = "slow" == o.speed ? 80 : "fast" == o.speed ? 40 : Math.floor(o.speed / 2), n.fadeTo(C, .01, function () {
                n.addClass(o.openerActiveClass), n.fadeTo(o.speed, 1), t.fadeIn(o.speed, function () {
                  r = !1;
                });
              });
            } else n.addClass(o.openerActiveClass), n.fadeTo(o.speed, 1), t.fadeIn(o.speed, function () {
              r = !1;
            });

            break;

          case "instant":
          default:
            n.addClass(o.openerActiveClass), t.show();
        }

        return !1;
      }).on("doCollapse", function () {
        return t.is(":visible") ? (t.hide(), n.removeClass(o.openerActiveClass), t.find("." + o.openerActiveClass).removeClass(o.openerActiveClass), t.find("ul").hide(), !1) : !1;
      }).on("doToggle", function (e) {
        return t.is(":visible") ? t.trigger("doCollapse") : t.trigger("doExpand"), !1;
      }), n.disableSelection_dropotron().addClass("opener").css("cursor", "pointer").on("click touchend", function (e) {
        r || (e.preventDefault(), e.stopPropagation(), t.trigger("doToggle"));
      }), "hover" == o.expandMode && n.hover(function (e) {
        r || (d = window.setTimeout(function () {
          t.trigger("doExpand");
        }, o.hoverDelay));
      }, function (e) {
        window.clearTimeout(d);
      });
    }), s.find("a").css("display", "block").on("click touchend", function (t) {
      r || e(this).attr("href").length < 1 && t.preventDefault();
    }), n.find("li").css("white-space", "nowrap").each(function () {
      var t = e(this),
          o = t.children("a"),
          s = t.children("ul"),
          i = o.attr("href");
      o.on("click touchend", function (e) {
        0 == i.length || "#" == i ? e.preventDefault() : e.stopPropagation();
      }), o.length > 0 && 0 == s.length && t.on("click touchend", function (e) {
        r || (n.trigger("doCollapseAll"), e.stopPropagation());
      });
    }), n.children("li").each(function () {
      var t,
          n = e(this),
          s = n.children("ul");

      if (s.length > 0) {
        o.detach && (o.cloneOnDetach && (t = s.clone(), t.attr("class", "").hide().appendTo(s.parent())), s.detach().appendTo(i));

        for (var a = o.baseZIndex, l = 1, r = s; r.length > 0; l++) {
          r.css("z-index", a++), o.submenuClassPrefix && r.addClass(o.submenuClassPrefix + (a - 1 - o.baseZIndex)), r = r.find("> li > ul");
        }
      }
    }), l.on("scroll", function () {
      n.trigger("doCollapseAll");
    }).on("keypress", function (e) {
      r || 27 != e.keyCode || (e.preventDefault(), n.trigger("doCollapseAll"));
    }), a.on("click touchend", function () {
      r || n.trigger("doCollapseAll");
    });
  };
}(jQuery);(function ($) {
  /**
   * Generate an indented list of links from a nav. Meant for use with panel().
   * @return {jQuery} jQuery object.
   */
  $.fn.navList = function () {
    var $this = $(this),
        $a = $this.find('a'),
        b = [];
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
	Escape Velocity by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function ($) {
  var $window = $(window),
      $body = $('body'); // Breakpoints.
  // 	breakpoints({
  // 		xlarge:  [ '1281px',  '1680px' ],
  // 		large:   [ '981px',   '1280px' ],
  // 		medium:  [ '737px',   '980px'  ],
  // 		small:   [ null,      '736px'  ]
  // 	});
  // Play initial animations on page load.

  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  }); // Dropdowns.

  $('#nav > ul').dropotron({
    mode: 'fade',
    noOpenerFade: true,
    alignment: 'center',
    detach: false
  }); // Nav.
  // Title Bar.

  $('<div id="titleBar">' + '<a href="#navPanel" class="toggle"></a>' + '<span class="title">' + $('#logo h1').html() + '</span>' + '</div>').appendTo($body); // Panel.

  $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>').appendTo($body).panel({
    delay: 500,
    hideOnClick: true,
    hideOnSwipe: true,
    resetScroll: true,
    resetForms: true,
    side: 'left',
    target: $body,
    visibleClass: 'navPanel-visible'
  });
})(jQuery);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Jlc291cmNlcy9qcy9qcXVlcnkuZHJvcG90cm9uLm1pbi5qcyIsIi4uL3Jlc291cmNlcy9qcy91dGlsLmpzIiwiLi4vcmVzb3VyY2VzL2pzL2VzY2FwZVZlbG9jaXR5LmpzIl0sIm5hbWVzIjpbImUiLCJmbiIsImRpc2FibGVTZWxlY3Rpb25fZHJvcG90cm9uIiwiY3NzIiwiZHJvcG90cm9uIiwidCIsImxlbmd0aCIsIm8iLCJleHRlbmQiLCJzZWxlY3RvclBhcmVudCIsImJhc2VaSW5kZXgiLCJtZW51Q2xhc3MiLCJleHBhbmRNb2RlIiwiaG92ZXJEZWxheSIsImhpZGVEZWxheSIsIm9wZW5lckNsYXNzIiwib3BlbmVyQWN0aXZlQ2xhc3MiLCJzdWJtZW51Q2xhc3NQcmVmaXgiLCJtb2RlIiwic3BlZWQiLCJlYXNpbmciLCJhbGlnbm1lbnQiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImdsb2JhbE9mZnNldFkiLCJJRU9mZnNldFgiLCJJRU9mZnNldFkiLCJub09wZW5lckZhZGUiLCJkZXRhY2giLCJjbG9uZU9uRGV0YWNoIiwibiIsInMiLCJmaW5kIiwiaSIsImEiLCJsIiwid2luZG93IiwiciIsImQiLCJjIiwib24iLCJ0cmlnZ2VyIiwiZWFjaCIsInBhcmVudCIsImFkZCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJoaWRlIiwiYWRkQ2xhc3MiLCJpcyIsImNvbnRhaW5zIiwiZ2V0IiwiZiIsInUiLCJvZmZzZXQiLCJwIiwicG9zaXRpb24iLCJoIiwib3V0ZXJXaWR0aCIsImciLCJ2IiwidG9wIiwib3V0ZXJIZWlnaHQiLCJyZW1vdmVDbGFzcyIsImxlZnQiLCJNYXRoIiwiZmxvb3IiLCJ3aWR0aCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiUmVnRXhwIiwiJDEiLCJzaG93IiwiQyIsImFuaW1hdGUiLCJoZWlnaHQiLCJmYWRlVG8iLCJmYWRlSW4iLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImhvdmVyIiwiYXR0ciIsImNoaWxkcmVuIiwiY2xvbmUiLCJhcHBlbmRUbyIsImtleUNvZGUiLCJqUXVlcnkiLCIkIiwibmF2TGlzdCIsIiR0aGlzIiwiJGEiLCJiIiwiaW5kZW50IiwibWF4IiwicGFyZW50cyIsImhyZWYiLCJ0YXJnZXQiLCJwdXNoIiwidGV4dCIsImpvaW4iLCJwYW5lbCIsInVzZXJDb25maWciLCIkYm9keSIsIiR3aW5kb3ciLCJpZCIsImNvbmZpZyIsImRlbGF5IiwiaGlkZU9uQ2xpY2siLCJoaWRlT25Fc2NhcGUiLCJoaWRlT25Td2lwZSIsInJlc2V0U2Nyb2xsIiwicmVzZXRGb3JtcyIsInNpZGUiLCJ2aXNpYmxlQ2xhc3MiLCJfaGlkZSIsImV2ZW50IiwiaGFzQ2xhc3MiLCJzY3JvbGxUb3AiLCJyZXNldCIsIm9wZW4iLCJsb2NhdGlvbiIsInRvdWNoUG9zWCIsIm9yaWdpbmFsRXZlbnQiLCJ0b3VjaGVzIiwicGFnZVgiLCJ0b3VjaFBvc1kiLCJwYWdlWSIsImRpZmZYIiwiZGlmZlkiLCJ0aCIsInRzIiwic2Nyb2xsSGVpZ2h0IiwicmVzdWx0IiwiYm91bmRhcnkiLCJkZWx0YSIsInRvZ2dsZUNsYXNzIiwicGxhY2Vob2xkZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWwiLCJ4IiwiYXBwZW5kIiwicmVtb3ZlIiwiaHRtbCIsInJlcGxhY2UiLCJpbnNlcnRBZnRlciIsImZvY3VzIiwidHlwZSIsInByaW9yaXRpemUiLCIkZWxlbWVudHMiLCJjb25kaXRpb24iLCJrZXkiLCIkZSIsIiRwIiwiJHBhcmVudCIsImRhdGEiLCJwcmV2IiwicHJlcGVuZFRvIiwicmVtb3ZlRGF0YSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDQSxFQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBS0MsMEJBQUwsR0FBZ0MsWUFBVTtBQUFDLFdBQU9GLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUcsR0FBUixDQUFZLGFBQVosRUFBMEIsTUFBMUIsRUFBa0NB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Q0N5QixFQUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWVwRixTQUFmLENBQXlCO0FBQ3hCYyxJQUFBQSxJQUFJLEVBQUUsTUFEa0I7QUFFeEJTLElBQUFBLFlBQVksRUFBRSxJQUZVO0FBR3hCTixJQUFBQSxTQUFTLEVBQUUsUUFIYTtBQUl4Qk8sSUFBQUEsTUFBTSxFQUFFO0FBSmdCLEdBQXpCLEVBckJXLENBNEJaO0FBRUM7O0FBQ0M0RCxFQUFBQSxDQUFDLENBQ0Esd0JBQ0MseUNBREQsR0FFQyxzQkFGRCxHQUUwQkEsQ0FBQyxDQUFDLFVBQUQsQ0FBRCxDQUFjd0QsSUFBZCxFQUYxQixHQUVpRCxTQUZqRCxHQUdBLFFBSkEsQ0FBRCxDQU1FM0QsUUFORixDQU1Xa0IsS0FOWCxFQS9CVSxDQXVDWDs7QUFDQ2YsRUFBQUEsQ0FBQyxDQUNBLHdCQUNDLE9BREQsR0FFRUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxPQUFWLEVBRkYsR0FHQyxRQUhELEdBSUEsUUFMQSxDQUFELENBT0VKLFFBUEYsQ0FPV2tCLEtBUFgsRUFRRUYsS0FSRixDQVFRO0FBQ05NLElBQUFBLEtBQUssRUFBRSxHQUREO0FBRU5DLElBQUFBLFdBQVcsRUFBRSxJQUZQO0FBR05FLElBQUFBLFdBQVcsRUFBRSxJQUhQO0FBSU5DLElBQUFBLFdBQVcsRUFBRSxJQUpQO0FBS05DLElBQUFBLFVBQVUsRUFBRSxJQUxOO0FBTU5DLElBQUFBLElBQUksRUFBRSxNQU5BO0FBT05oQixJQUFBQSxNQUFNLEVBQUVNLEtBUEY7QUFRTlcsSUFBQUEsWUFBWSxFQUFFO0FBUlIsR0FSUjtBQW1CRixDQTNERCxFQTJERzNCLE1BM0RIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqcXVlcnkuZHJvcG90cm9uLmpzIHYxLjQuMyB8IChjKSBAYWpsa24gfCBnaXRodWIuY29tL2FqbGtuL2pxdWVyeS5kcm9wb3Ryb24gfCBNSVQgbGljZW5zZWQgKi9cclxuIWZ1bmN0aW9uKGUpe2UuZm4uZGlzYWJsZVNlbGVjdGlvbl9kcm9wb3Ryb249ZnVuY3Rpb24oKXtyZXR1cm4gZSh0aGlzKS5jc3MoXCJ1c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCIta2h0bWwtdXNlci1zZWxlY3RcIixcIm5vbmVcIikuY3NzKFwiLW1vei11c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCItby11c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsXCJub25lXCIpfSxlLmZuLmRyb3BvdHJvbj1mdW5jdGlvbih0KXtpZigwPT10aGlzLmxlbmd0aClyZXR1cm4gZSh0aGlzKTtpZih0aGlzLmxlbmd0aD4xKWZvcih2YXIgbz0wO288dGhpcy5sZW5ndGg7bysrKWUodGhpc1tvXSkuZHJvcG90cm9uKHQpO3JldHVybiBlLmRyb3BvdHJvbihlLmV4dGVuZCh7c2VsZWN0b3JQYXJlbnQ6ZSh0aGlzKX0sdCkpfSxlLmRyb3BvdHJvbj1mdW5jdGlvbih0KXt2YXIgbz1lLmV4dGVuZCh7c2VsZWN0b3JQYXJlbnQ6bnVsbCxiYXNlWkluZGV4OjFlMyxtZW51Q2xhc3M6XCJkcm9wb3Ryb25cIixleHBhbmRNb2RlOlwiaG92ZXJcIixob3ZlckRlbGF5OjE1MCxoaWRlRGVsYXk6MjUwLG9wZW5lckNsYXNzOlwib3BlbmVyXCIsb3BlbmVyQWN0aXZlQ2xhc3M6XCJhY3RpdmVcIixzdWJtZW51Q2xhc3NQcmVmaXg6XCJsZXZlbC1cIixtb2RlOlwiZmFkZVwiLHNwZWVkOlwiZmFzdFwiLGVhc2luZzpcInN3aW5nXCIsYWxpZ25tZW50OlwibGVmdFwiLG9mZnNldFg6MCxvZmZzZXRZOjAsZ2xvYmFsT2Zmc2V0WTowLElFT2Zmc2V0WDowLElFT2Zmc2V0WTowLG5vT3BlbmVyRmFkZTohMCxkZXRhY2g6ITAsY2xvbmVPbkRldGFjaDohMH0sdCksbj1vLnNlbGVjdG9yUGFyZW50LHM9bi5maW5kKFwidWxcIiksaT1lKFwiYm9keVwiKSxhPWUoXCJib2R5LGh0bWxcIiksbD1lKHdpbmRvdykscj0hMSxkPW51bGwsYz1udWxsO24ub24oXCJkb0NvbGxhcHNlQWxsXCIsZnVuY3Rpb24oKXtzLnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpfSkscy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKSxuPXQucGFyZW50KCk7by5oaWRlRGVsYXk+MCYmdC5hZGQobikub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oZSl7d2luZG93LmNsZWFyVGltZW91dChjKSxjPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC50cmlnZ2VyKFwiZG9Db2xsYXBzZVwiKX0sby5oaWRlRGVsYXkpfSksdC5kaXNhYmxlU2VsZWN0aW9uX2Ryb3BvdHJvbigpLmhpZGUoKS5hZGRDbGFzcyhvLm1lbnVDbGFzcykuY3NzKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpLm9uKFwibW91c2VlbnRlclwiLGZ1bmN0aW9uKGUpe3dpbmRvdy5jbGVhclRpbWVvdXQoYyl9KS5vbihcImRvRXhwYW5kXCIsZnVuY3Rpb24oKXtpZih0LmlzKFwiOnZpc2libGVcIikpcmV0dXJuITE7d2luZG93LmNsZWFyVGltZW91dChjKSxzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpO2UuY29udGFpbnModC5nZXQoMCksbi5nZXQoMCkpfHx0LnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpfSk7dmFyIGksYSxkLGYsdT1uLm9mZnNldCgpLHA9bi5wb3NpdGlvbigpLGg9KG4ucGFyZW50KCkucG9zaXRpb24oKSxuLm91dGVyV2lkdGgoKSksZz10Lm91dGVyV2lkdGgoKSx2PXQuY3NzKFwiei1pbmRleFwiKT09by5iYXNlWkluZGV4O2lmKHYpe3N3aXRjaChpPW8uZGV0YWNoP3U6cCxmPWkudG9wK24ub3V0ZXJIZWlnaHQoKStvLmdsb2JhbE9mZnNldFksYT1vLmFsaWdubWVudCx0LnJlbW92ZUNsYXNzKFwibGVmdFwiKS5yZW1vdmVDbGFzcyhcInJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwiY2VudGVyXCIpLG8uYWxpZ25tZW50KXtjYXNlXCJyaWdodFwiOmQ9aS5sZWZ0LWcraCwwPmQmJihkPWkubGVmdCxhPVwibGVmdFwiKTticmVhaztjYXNlXCJjZW50ZXJcIjpkPWkubGVmdC1NYXRoLmZsb29yKChnLWgpLzIpLDA+ZD8oZD1pLmxlZnQsYT1cImxlZnRcIik6ZCtnPmwud2lkdGgoKSYmKGQ9aS5sZWZ0LWcraCxhPVwicmlnaHRcIik7YnJlYWs7Y2FzZVwibGVmdFwiOmRlZmF1bHQ6ZD1pLmxlZnQsZCtnPmwud2lkdGgoKSYmKGQ9aS5sZWZ0LWcraCxhPVwicmlnaHRcIil9dC5hZGRDbGFzcyhhKX1lbHNlIHN3aXRjaChcInJlbGF0aXZlXCI9PW4uY3NzKFwicG9zaXRpb25cIil8fFwiYWJzb2x1dGVcIj09bi5jc3MoXCJwb3NpdGlvblwiKT8oZj1vLm9mZnNldFksZD0tMSpwLmxlZnQpOihmPXAudG9wK28ub2Zmc2V0WSxkPTApLG8uYWxpZ25tZW50KXtjYXNlXCJyaWdodFwiOmQrPS0xKm4ucGFyZW50KCkub3V0ZXJXaWR0aCgpK28ub2Zmc2V0WDticmVhaztjYXNlXCJjZW50ZXJcIjpjYXNlXCJsZWZ0XCI6ZGVmYXVsdDpkKz1uLnBhcmVudCgpLm91dGVyV2lkdGgoKStvLm9mZnNldFh9bmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTVNJRSAoWzAtOV0rKVxcLi8pJiZSZWdFeHAuJDE8OCYmKGQrPW8uSUVPZmZzZXRYLGYrPW8uSUVPZmZzZXRZKSx0LmNzcyhcImxlZnRcIixkK1wicHhcIikuY3NzKFwidG9wXCIsZitcInB4XCIpLmNzcyhcIm9wYWNpdHlcIixcIjAuMDFcIikuc2hvdygpO3ZhciBDPSExO3N3aXRjaChkPVwicmVsYXRpdmVcIj09bi5jc3MoXCJwb3NpdGlvblwiKXx8XCJhYnNvbHV0ZVwiPT1uLmNzcyhcInBvc2l0aW9uXCIpPy0xKnAubGVmdDowLHQub2Zmc2V0KCkubGVmdDwwPyhkKz1uLnBhcmVudCgpLm91dGVyV2lkdGgoKS1vLm9mZnNldFgsQz0hMCk6dC5vZmZzZXQoKS5sZWZ0K2c+bC53aWR0aCgpJiYoZCs9LTEqbi5wYXJlbnQoKS5vdXRlcldpZHRoKCktby5vZmZzZXRYLEM9ITApLEMmJnQuY3NzKFwibGVmdFwiLGQrXCJweFwiKSx0LmhpZGUoKS5jc3MoXCJvcGFjaXR5XCIsXCIxXCIpLG8ubW9kZSl7Y2FzZVwiem9vbVwiOnI9ITAsbi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSx0LmFuaW1hdGUoe3dpZHRoOlwidG9nZ2xlXCIsaGVpZ2h0OlwidG9nZ2xlXCJ9LG8uc3BlZWQsby5lYXNpbmcsZnVuY3Rpb24oKXtyPSExfSk7YnJlYWs7Y2FzZVwic2xpZGVcIjpyPSEwLG4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5hbmltYXRlKHtoZWlnaHQ6XCJ0b2dnbGVcIn0sby5zcGVlZCxvLmVhc2luZyxmdW5jdGlvbigpe3I9ITF9KTticmVhaztjYXNlXCJmYWRlXCI6aWYocj0hMCx2JiYhby5ub09wZW5lckZhZGUpe3ZhciBDO0M9XCJzbG93XCI9PW8uc3BlZWQ/ODA6XCJmYXN0XCI9PW8uc3BlZWQ/NDA6TWF0aC5mbG9vcihvLnNwZWVkLzIpLG4uZmFkZVRvKEMsLjAxLGZ1bmN0aW9uKCl7bi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSxuLmZhZGVUbyhvLnNwZWVkLDEpLHQuZmFkZUluKG8uc3BlZWQsZnVuY3Rpb24oKXtyPSExfSl9KX1lbHNlIG4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksbi5mYWRlVG8oby5zcGVlZCwxKSx0LmZhZGVJbihvLnNwZWVkLGZ1bmN0aW9uKCl7cj0hMX0pO2JyZWFrO2Nhc2VcImluc3RhbnRcIjpkZWZhdWx0Om4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5zaG93KCl9cmV0dXJuITF9KS5vbihcImRvQ29sbGFwc2VcIixmdW5jdGlvbigpe3JldHVybiB0LmlzKFwiOnZpc2libGVcIik/KHQuaGlkZSgpLG4ucmVtb3ZlQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5maW5kKFwiLlwiK28ub3BlbmVyQWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKG8ub3BlbmVyQWN0aXZlQ2xhc3MpLHQuZmluZChcInVsXCIpLmhpZGUoKSwhMSk6ITF9KS5vbihcImRvVG9nZ2xlXCIsZnVuY3Rpb24oZSl7cmV0dXJuIHQuaXMoXCI6dmlzaWJsZVwiKT90LnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpOnQudHJpZ2dlcihcImRvRXhwYW5kXCIpLCExfSksbi5kaXNhYmxlU2VsZWN0aW9uX2Ryb3BvdHJvbigpLmFkZENsYXNzKFwib3BlbmVyXCIpLmNzcyhcImN1cnNvclwiLFwicG9pbnRlclwiKS5vbihcImNsaWNrIHRvdWNoZW5kXCIsZnVuY3Rpb24oZSl7cnx8KGUucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpLHQudHJpZ2dlcihcImRvVG9nZ2xlXCIpKX0pLFwiaG92ZXJcIj09by5leHBhbmRNb2RlJiZuLmhvdmVyKGZ1bmN0aW9uKGUpe3J8fChkPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC50cmlnZ2VyKFwiZG9FeHBhbmRcIil9LG8uaG92ZXJEZWxheSkpfSxmdW5jdGlvbihlKXt3aW5kb3cuY2xlYXJUaW1lb3V0KGQpfSl9KSxzLmZpbmQoXCJhXCIpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpLm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbih0KXtyfHxlKHRoaXMpLmF0dHIoXCJocmVmXCIpLmxlbmd0aDwxJiZ0LnByZXZlbnREZWZhdWx0KCl9KSxuLmZpbmQoXCJsaVwiKS5jc3MoXCJ3aGl0ZS1zcGFjZVwiLFwibm93cmFwXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpLG89dC5jaGlsZHJlbihcImFcIikscz10LmNoaWxkcmVuKFwidWxcIiksaT1vLmF0dHIoXCJocmVmXCIpO28ub24oXCJjbGljayB0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpezA9PWkubGVuZ3RofHxcIiNcIj09aT9lLnByZXZlbnREZWZhdWx0KCk6ZS5zdG9wUHJvcGFnYXRpb24oKX0pLG8ubGVuZ3RoPjAmJjA9PXMubGVuZ3RoJiZ0Lm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbihlKXtyfHwobi50cmlnZ2VyKFwiZG9Db2xsYXBzZUFsbFwiKSxlLnN0b3BQcm9wYWdhdGlvbigpKX0pfSksbi5jaGlsZHJlbihcImxpXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgdCxuPWUodGhpcykscz1uLmNoaWxkcmVuKFwidWxcIik7aWYocy5sZW5ndGg+MCl7by5kZXRhY2gmJihvLmNsb25lT25EZXRhY2gmJih0PXMuY2xvbmUoKSx0LmF0dHIoXCJjbGFzc1wiLFwiXCIpLmhpZGUoKS5hcHBlbmRUbyhzLnBhcmVudCgpKSkscy5kZXRhY2goKS5hcHBlbmRUbyhpKSk7Zm9yKHZhciBhPW8uYmFzZVpJbmRleCxsPTEscj1zO3IubGVuZ3RoPjA7bCsrKXIuY3NzKFwiei1pbmRleFwiLGErKyksby5zdWJtZW51Q2xhc3NQcmVmaXgmJnIuYWRkQ2xhc3Moby5zdWJtZW51Q2xhc3NQcmVmaXgrKGEtMS1vLmJhc2VaSW5kZXgpKSxyPXIuZmluZChcIj4gbGkgPiB1bFwiKX19KSxsLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtuLnRyaWdnZXIoXCJkb0NvbGxhcHNlQWxsXCIpfSkub24oXCJrZXlwcmVzc1wiLGZ1bmN0aW9uKGUpe3J8fDI3IT1lLmtleUNvZGV8fChlLnByZXZlbnREZWZhdWx0KCksbi50cmlnZ2VyKFwiZG9Db2xsYXBzZUFsbFwiKSl9KSxhLm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbigpe3J8fG4udHJpZ2dlcihcImRvQ29sbGFwc2VBbGxcIil9KX19KGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24oJCkge1xyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZSBhbiBpbmRlbnRlZCBsaXN0IG9mIGxpbmtzIGZyb20gYSBuYXYuIE1lYW50IGZvciB1c2Ugd2l0aCBwYW5lbCgpLlxyXG5cdCAqIEByZXR1cm4ge2pRdWVyeX0galF1ZXJ5IG9iamVjdC5cclxuXHQgKi9cclxuXHQkLmZuLm5hdkxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXJcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0JGEgPSAkdGhpcy5maW5kKCdhJyksXHJcblx0XHRcdGIgPSBbXTtcclxuXHJcblx0XHQkYS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0aW5kZW50ID0gTWF0aC5tYXgoMCwgJHRoaXMucGFyZW50cygnbGknKS5sZW5ndGggLSAxKSxcclxuXHRcdFx0XHRocmVmID0gJHRoaXMuYXR0cignaHJlZicpLFxyXG5cdFx0XHRcdHRhcmdldCA9ICR0aGlzLmF0dHIoJ3RhcmdldCcpO1xyXG5cclxuXHRcdFx0Yi5wdXNoKFxyXG5cdFx0XHRcdCc8YSAnICtcclxuXHRcdFx0XHRcdCdjbGFzcz1cImxpbmsgZGVwdGgtJyArIGluZGVudCArICdcIicgK1xyXG5cdFx0XHRcdFx0KCAodHlwZW9mIHRhcmdldCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFyZ2V0ICE9ICcnKSA/ICcgdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIicgOiAnJykgK1xyXG5cdFx0XHRcdFx0KCAodHlwZW9mIGhyZWYgIT09ICd1bmRlZmluZWQnICYmIGhyZWYgIT0gJycpID8gJyBocmVmPVwiJyArIGhyZWYgKyAnXCInIDogJycpICtcclxuXHRcdFx0XHQnPicgK1xyXG5cdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiaW5kZW50LScgKyBpbmRlbnQgKyAnXCI+PC9zcGFuPicgK1xyXG5cdFx0XHRcdFx0JHRoaXMudGV4dCgpICtcclxuXHRcdFx0XHQnPC9hPidcclxuXHRcdFx0KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYi5qb2luKCcnKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGFuZWwtaWZ5IGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHVzZXJDb25maWcgVXNlciBjb25maWcuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ucGFuZWwgPSBmdW5jdGlvbih1c2VyQ29uZmlnKSB7XHJcblxyXG5cdFx0Ly8gTm8gZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHQvLyBNdWx0aXBsZSBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID4gMSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0JCh0aGlzW2ldKS5wYW5lbCh1c2VyQ29uZmlnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdC8vIFZhcnMuXHJcblx0XHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdCRib2R5ID0gJCgnYm9keScpLFxyXG5cdFx0XHRcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHRcdFx0aWQgPSAkdGhpcy5hdHRyKCdpZCcpLFxyXG5cdFx0XHRcdGNvbmZpZztcclxuXHJcblx0XHQvLyBDb25maWcuXHJcblx0XHRcdGNvbmZpZyA9ICQuZXh0ZW5kKHtcclxuXHJcblx0XHRcdFx0Ly8gRGVsYXkuXHJcblx0XHRcdFx0XHRkZWxheTogMCxcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBwYW5lbCBvbiBsaW5rIGNsaWNrLlxyXG5cdFx0XHRcdFx0aGlkZU9uQ2xpY2s6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHQvLyBIaWRlIHBhbmVsIG9uIGVzY2FwZSBrZXlwcmVzcy5cclxuXHRcdFx0XHRcdGhpZGVPbkVzY2FwZTogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIEhpZGUgcGFuZWwgb24gc3dpcGUuXHJcblx0XHRcdFx0XHRoaWRlT25Td2lwZTogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFJlc2V0IHNjcm9sbCBwb3NpdGlvbiBvbiBoaWRlLlxyXG5cdFx0XHRcdFx0cmVzZXRTY3JvbGw6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHQvLyBSZXNldCBmb3JtcyBvbiBoaWRlLlxyXG5cdFx0XHRcdFx0cmVzZXRGb3JtczogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFNpZGUgb2Ygdmlld3BvcnQgdGhlIHBhbmVsIHdpbGwgYXBwZWFyLlxyXG5cdFx0XHRcdFx0c2lkZTogbnVsbCxcclxuXHJcblx0XHRcdFx0Ly8gVGFyZ2V0IGVsZW1lbnQgZm9yIFwiY2xhc3NcIi5cclxuXHRcdFx0XHRcdHRhcmdldDogJHRoaXMsXHJcblxyXG5cdFx0XHRcdC8vIENsYXNzIHRvIHRvZ2dsZS5cclxuXHRcdFx0XHRcdHZpc2libGVDbGFzczogJ3Zpc2libGUnXHJcblxyXG5cdFx0XHR9LCB1c2VyQ29uZmlnKTtcclxuXHJcblx0XHRcdC8vIEV4cGFuZCBcInRhcmdldFwiIGlmIGl0J3Mgbm90IGEgalF1ZXJ5IG9iamVjdCBhbHJlYWR5LlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgY29uZmlnLnRhcmdldCAhPSAnalF1ZXJ5JylcclxuXHRcdFx0XHRcdGNvbmZpZy50YXJnZXQgPSAkKGNvbmZpZy50YXJnZXQpO1xyXG5cclxuXHRcdC8vIFBhbmVsLlxyXG5cclxuXHRcdFx0Ly8gTWV0aG9kcy5cclxuXHRcdFx0XHQkdGhpcy5faGlkZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWxyZWFkeSBoaWRkZW4/IEJhaWwuXHJcblx0XHRcdFx0XHRcdGlmICghY29uZmlnLnRhcmdldC5oYXNDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0Ly8gSWYgYW4gZXZlbnQgd2FzIHByb3ZpZGVkLCBjYW5jZWwgaXQuXHJcblx0XHRcdFx0XHRcdGlmIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUuXHJcblx0XHRcdFx0XHRcdGNvbmZpZy50YXJnZXQucmVtb3ZlQ2xhc3MoY29uZmlnLnZpc2libGVDbGFzcyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gUG9zdC1oaWRlIHN0dWZmLlxyXG5cdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gUmVzZXQgc2Nyb2xsIHBvc2l0aW9uLlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXNldFNjcm9sbClcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuc2Nyb2xsVG9wKDApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBSZXNldCBmb3Jtcy5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChjb25maWcucmVzZXRGb3JtcylcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnZm9ybScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5yZXNldCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdH0sIGNvbmZpZy5kZWxheSk7XHJcblxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBWZW5kb3IgZml4ZXMuXHJcblx0XHRcdFx0JHRoaXNcclxuXHRcdFx0XHRcdC5jc3MoJy1tcy1vdmVyZmxvdy1zdHlsZScsICctbXMtYXV0b2hpZGluZy1zY3JvbGxiYXInKVxyXG5cdFx0XHRcdFx0LmNzcygnLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmcnLCAndG91Y2gnKTtcclxuXHJcblx0XHRcdC8vIEhpZGUgb24gY2xpY2suXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5oaWRlT25DbGljaykge1xyXG5cclxuXHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2EnKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCctd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3InLCAncmdiYSgwLDAsMCwwKScpO1xyXG5cclxuXHRcdFx0XHRcdCR0aGlzXHJcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciAkYSA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRcdFx0XHRocmVmID0gJGEuYXR0cignaHJlZicpLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0ID0gJGEuYXR0cigndGFyZ2V0Jyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICghaHJlZiB8fCBocmVmID09ICcjJyB8fCBocmVmID09ICcnIHx8IGhyZWYgPT0gJyMnICsgaWQpXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIENhbmNlbCBvcmlnaW5hbCBldmVudC5cclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gSGlkZSBwYW5lbC5cclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFJlZGlyZWN0IHRvIGhyZWYuXHJcblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YXJnZXQgPT0gJ19ibGFuaycpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0d2luZG93Lm9wZW4oaHJlZik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSwgY29uZmlnLmRlbGF5ICsgMTApO1xyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEV2ZW50OiBUb3VjaCBzdHVmZi5cclxuXHRcdFx0XHQkdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NYID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NZID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHQkdGhpcy5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoJHRoaXMudG91Y2hQb3NYID09PSBudWxsXHJcblx0XHRcdFx0XHR8fFx0JHRoaXMudG91Y2hQb3NZID09PSBudWxsKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0dmFyXHRkaWZmWCA9ICR0aGlzLnRvdWNoUG9zWCAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWCxcclxuXHRcdFx0XHRcdFx0ZGlmZlkgPSAkdGhpcy50b3VjaFBvc1kgLSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVksXHJcblx0XHRcdFx0XHRcdHRoID0gJHRoaXMub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0dHMgPSAoJHRoaXMuZ2V0KDApLnNjcm9sbEhlaWdodCAtICR0aGlzLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHRcdFx0XHQvLyBIaWRlIG9uIHN3aXBlP1xyXG5cdFx0XHRcdFx0XHRpZiAoY29uZmlnLmhpZGVPblN3aXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdGJvdW5kYXJ5ID0gMjAsXHJcblx0XHRcdFx0XHRcdFx0XHRkZWx0YSA9IDUwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvbmZpZy5zaWRlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWSA8IGJvdW5kYXJ5ICYmIGRpZmZZID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlggPiBkZWx0YSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3JpZ2h0JzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZZIDwgYm91bmRhcnkgJiYgZGlmZlkgPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWCA8ICgtMSAqIGRlbHRhKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3RvcCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWCA8IGJvdW5kYXJ5ICYmIGRpZmZYID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlkgPiBkZWx0YSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWCA8IGJvdW5kYXJ5ICYmIGRpZmZYID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlkgPCAoLTEgKiBkZWx0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NYID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLnRvdWNoUG9zWSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5faGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFByZXZlbnQgdmVydGljYWwgc2Nyb2xsaW5nIHBhc3QgdGhlIHRvcCBvciBib3R0b20uXHJcblx0XHRcdFx0XHRcdGlmICgoJHRoaXMuc2Nyb2xsVG9wKCkgPCAwICYmIGRpZmZZIDwgMClcclxuXHRcdFx0XHRcdFx0fHwgKHRzID4gKHRoIC0gMikgJiYgdHMgPCAodGggKyAyKSAmJiBkaWZmWSA+IDApKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFByZXZlbnQgY2VydGFpbiBldmVudHMgaW5zaWRlIHRoZSBwYW5lbCBmcm9tIGJ1YmJsaW5nLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCdjbGljayB0b3VjaGVuZCB0b3VjaHN0YXJ0IHRvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEV2ZW50OiBIaWRlIHBhbmVsIGlmIGEgY2hpbGQgYW5jaG9yIHRhZyBwb2ludGluZyB0byBpdHMgSUQgaXMgY2xpY2tlZC5cclxuXHRcdFx0XHQkdGhpcy5vbignY2xpY2snLCAnYVtocmVmPVwiIycgKyBpZCArICdcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcudGFyZ2V0LnJlbW92ZUNsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBCb2R5LlxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgcGFuZWwgb24gYm9keSBjbGljay90YXAuXHJcblx0XHRcdFx0JGJvZHkub24oJ2NsaWNrIHRvdWNoZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdCR0aGlzLl9oaWRlKGV2ZW50KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEV2ZW50OiBUb2dnbGUuXHJcblx0XHRcdFx0JGJvZHkub24oJ2NsaWNrJywgJ2FbaHJlZj1cIiMnICsgaWQgKyAnXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0Y29uZmlnLnRhcmdldC50b2dnbGVDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gV2luZG93LlxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgb24gRVNDLlxyXG5cdFx0XHRcdGlmIChjb25maWcuaGlkZU9uRXNjYXBlKVxyXG5cdFx0XHRcdFx0JHdpbmRvdy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PSAyNylcclxuXHRcdFx0XHRcdFx0XHQkdGhpcy5faGlkZShldmVudCk7XHJcblxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBcHBseSBcInBsYWNlaG9sZGVyXCIgYXR0cmlidXRlIHBvbHlmaWxsIHRvIG9uZSBvciBtb3JlIGZvcm1zLlxyXG5cdCAqIEByZXR1cm4ge2pRdWVyeX0galF1ZXJ5IG9iamVjdC5cclxuXHQgKi9cclxuXHQkLmZuLnBsYWNlaG9sZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gQnJvd3NlciBuYXRpdmVseSBzdXBwb3J0cyBwbGFjZWhvbGRlcnM/IEJhaWwuXHJcblx0XHRcdGlmICh0eXBlb2YgKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpLnBsYWNlaG9sZGVyICE9ICd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdHJldHVybiAkKHRoaXMpO1xyXG5cclxuXHRcdC8vIE5vIGVsZW1lbnRzP1xyXG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0Ly8gTXVsdGlwbGUgZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdCQodGhpc1tpXSkucGxhY2Vob2xkZXIoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdC8vIFZhcnMuXHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0Ly8gVGV4dCwgVGV4dEFyZWEuXHJcblx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sdGV4dGFyZWEnKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJ1xyXG5cdFx0XHRcdFx0fHwgIGkudmFsKCkgPT0gaS5hdHRyKCdwbGFjZWhvbGRlcicpKVxyXG5cdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpXHJcblx0XHRcdFx0XHRcdFx0LnZhbChpLmF0dHIoJ3BsYWNlaG9sZGVyJykpO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKVxyXG5cdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpXHJcblx0XHRcdFx0XHRcdFx0LnZhbChpLmF0dHIoJ3BsYWNlaG9sZGVyJykpO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkuYXR0cignbmFtZScpLm1hdGNoKC8tcG9seWZpbGwtZmllbGQkLykpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSBpLmF0dHIoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gUGFzc3dvcmQuXHJcblx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9cGFzc3dvcmRdJylcclxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyk7XHJcblx0XHRcdFx0XHR2YXIgeCA9ICQoXHJcblx0XHRcdFx0XHRcdFx0XHQkKCc8ZGl2PicpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmQoaS5jbG9uZSgpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVtb3ZlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lmh0bWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvdHlwZT1cInBhc3N3b3JkXCIvaSwgJ3R5cGU9XCJ0ZXh0XCInKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvdHlwZT1wYXNzd29yZC9pLCAndHlwZT10ZXh0JylcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkuYXR0cignaWQnKSAhPSAnJylcclxuXHRcdFx0XHRcdFx0eC5hdHRyKCdpZCcsIGkuYXR0cignaWQnKSArICctcG9seWZpbGwtZmllbGQnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykgIT0gJycpXHJcblx0XHRcdFx0XHRcdHguYXR0cignbmFtZScsIGkuYXR0cignbmFtZScpICsgJy1wb2x5ZmlsbC1maWVsZCcpO1xyXG5cclxuXHRcdFx0XHRcdHguYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0LnZhbCh4LmF0dHIoJ3BsYWNlaG9sZGVyJykpLmluc2VydEFmdGVyKGkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKVxyXG5cdFx0XHRcdFx0XHRpLmhpZGUoKTtcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0eC5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHQub24oJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgeCA9IGkucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT0nICsgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0eC5zaG93KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHhcclxuXHRcdFx0XHRcdFx0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpID0geC5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyB4LmF0dHIoJ25hbWUnKS5yZXBsYWNlKCctcG9seWZpbGwtZmllbGQnLCAnJykgKyAnXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHRcdFx0LnNob3coKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQub24oJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHR4LnZhbCgnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gRXZlbnRzLlxyXG5cdFx0XHQkdGhpc1xyXG5cdFx0XHRcdC5vbignc3VibWl0JywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSxpbnB1dFt0eXBlPXBhc3N3b3JkXSx0ZXh0YXJlYScpXHJcblx0XHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGkuYXR0cignbmFtZScpLm1hdGNoKC8tcG9seWZpbGwtZmllbGQkLykpXHJcblx0XHRcdFx0XHRcdFx0XHRpLmF0dHIoJ25hbWUnLCAnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpLnZhbCgpID09IGkuYXR0cigncGxhY2Vob2xkZXInKSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGkucmVtb3ZlQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpLnZhbCgnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbigncmVzZXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnc2VsZWN0JylcclxuXHRcdFx0XHRcdFx0LnZhbCgkKCdvcHRpb246Zmlyc3QnKS52YWwoKSk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXQsdGV4dGFyZWEnKVxyXG5cdFx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRcdFx0eDtcclxuXHJcblx0XHRcdFx0XHRcdFx0aS5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0c3dpdGNoICh0aGlzLnR5cGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdzdWJtaXQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmVzZXQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdwYXNzd29yZCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0eCA9IGkucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT0nICsgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4LnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpLmF0dHIoJ2NoZWNrZWQnLCBpLmF0dHIoJ2RlZmF1bHRWYWx1ZScpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndGV4dCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICd0ZXh0YXJlYSc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyBlbGVtZW50cyB0by9mcm9tIHRoZSBmaXJzdCBwb3NpdGlvbnMgb2YgdGhlaXIgcmVzcGVjdGl2ZSBwYXJlbnRzLlxyXG5cdCAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudHMgRWxlbWVudHMgKG9yIHNlbGVjdG9yKSB0byBtb3ZlLlxyXG5cdCAqIEBwYXJhbSB7Ym9vbH0gY29uZGl0aW9uIElmIHRydWUsIG1vdmVzIGVsZW1lbnRzIHRvIHRoZSB0b3AuIE90aGVyd2lzZSwgbW92ZXMgZWxlbWVudHMgYmFjayB0byB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbnMuXHJcblx0ICovXHJcblx0JC5wcmlvcml0aXplID0gZnVuY3Rpb24oJGVsZW1lbnRzLCBjb25kaXRpb24pIHtcclxuXHJcblx0XHR2YXIga2V5ID0gJ19fcHJpb3JpdGl6ZSc7XHJcblxyXG5cdFx0Ly8gRXhwYW5kICRlbGVtZW50cyBpZiBpdCdzIG5vdCBhbHJlYWR5IGEgalF1ZXJ5IG9iamVjdC5cclxuXHRcdFx0aWYgKHR5cGVvZiAkZWxlbWVudHMgIT0gJ2pRdWVyeScpXHJcblx0XHRcdFx0JGVsZW1lbnRzID0gJCgkZWxlbWVudHMpO1xyXG5cclxuXHRcdC8vIFN0ZXAgdGhyb3VnaCBlbGVtZW50cy5cclxuXHRcdFx0JGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHZhclx0JGUgPSAkKHRoaXMpLCAkcCxcclxuXHRcdFx0XHRcdCRwYXJlbnQgPSAkZS5wYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0Ly8gTm8gcGFyZW50PyBCYWlsLlxyXG5cdFx0XHRcdFx0aWYgKCRwYXJlbnQubGVuZ3RoID09IDApXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0Ly8gTm90IG1vdmVkPyBNb3ZlIGl0LlxyXG5cdFx0XHRcdFx0aWYgKCEkZS5kYXRhKGtleSkpIHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIENvbmRpdGlvbiBpcyBmYWxzZT8gQmFpbC5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIWNvbmRpdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdC8vIEdldCBwbGFjZWhvbGRlciAod2hpY2ggd2lsbCBzZXJ2ZSBhcyBvdXIgcG9pbnQgb2YgcmVmZXJlbmNlIGZvciB3aGVuIHRoaXMgZWxlbWVudCBuZWVkcyB0byBtb3ZlIGJhY2spLlxyXG5cdFx0XHRcdFx0XHRcdCRwID0gJGUucHJldigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBDb3VsZG4ndCBmaW5kIGFueXRoaW5nPyBNZWFucyB0aGlzIGVsZW1lbnQncyBhbHJlYWR5IGF0IHRoZSB0b3AsIHNvIGJhaWwuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoJHAubGVuZ3RoID09IDApXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdC8vIE1vdmUgZWxlbWVudCB0byB0b3Agb2YgcGFyZW50LlxyXG5cdFx0XHRcdFx0XHRcdCRlLnByZXBlbmRUbygkcGFyZW50KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIE1hcmsgZWxlbWVudCBhcyBtb3ZlZC5cclxuXHRcdFx0XHRcdFx0XHQkZS5kYXRhKGtleSwgJHApO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTW92ZWQgYWxyZWFkeT9cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIGlzIHRydWU/IEJhaWwuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGNvbmRpdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdCRwID0gJGUuZGF0YShrZXkpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTW92ZSBlbGVtZW50IGJhY2sgdG8gaXRzIG9yaWdpbmFsIGxvY2F0aW9uICh1c2luZyBvdXIgcGxhY2Vob2xkZXIpLlxyXG5cdFx0XHRcdFx0XHRcdCRlLmluc2VydEFmdGVyKCRwKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIFVubWFyayBlbGVtZW50IGFzIG1vdmVkLlxyXG5cdFx0XHRcdFx0XHRcdCRlLnJlbW92ZURhdGEoa2V5KTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSk7IiwiLypcclxuXHRFc2NhcGUgVmVsb2NpdHkgYnkgSFRNTDUgVVBcclxuXHRodG1sNXVwLm5ldCB8IEBhamxrblxyXG5cdEZyZWUgZm9yIHBlcnNvbmFsIGFuZCBjb21tZXJjaWFsIHVzZSB1bmRlciB0aGUgQ0NBIDMuMCBsaWNlbnNlIChodG1sNXVwLm5ldC9saWNlbnNlKVxyXG4qL1xyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuXHJcblx0dmFyXHQkd2luZG93ID0gJCh3aW5kb3cpLFxyXG5cdFx0JGJvZHkgPSAkKCdib2R5Jyk7XHJcblxyXG5cdC8vIEJyZWFrcG9pbnRzLlxyXG5cdC8vIFx0YnJlYWtwb2ludHMoe1xyXG5cdC8vIFx0XHR4bGFyZ2U6ICBbICcxMjgxcHgnLCAgJzE2ODBweCcgXSxcclxuXHQvLyBcdFx0bGFyZ2U6ICAgWyAnOTgxcHgnLCAgICcxMjgwcHgnIF0sXHJcblx0Ly8gXHRcdG1lZGl1bTogIFsgJzczN3B4JywgICAnOTgwcHgnICBdLFxyXG5cdC8vIFx0XHRzbWFsbDogICBbIG51bGwsICAgICAgJzczNnB4JyAgXVxyXG5cdC8vIFx0fSk7XHJcblxyXG5cdC8vIFBsYXkgaW5pdGlhbCBhbmltYXRpb25zIG9uIHBhZ2UgbG9hZC5cclxuXHRcdCR3aW5kb3cub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLXByZWxvYWQnKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyBEcm9wZG93bnMuXHJcblx0XHQkKCcjbmF2ID4gdWwnKS5kcm9wb3Ryb24oe1xyXG5cdFx0XHRtb2RlOiAnZmFkZScsXHJcblx0XHRcdG5vT3BlbmVyRmFkZTogdHJ1ZSxcclxuXHRcdFx0YWxpZ25tZW50OiAnY2VudGVyJyxcclxuXHRcdFx0ZGV0YWNoOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vIE5hdi5cclxuXHJcblx0XHQvLyBUaXRsZSBCYXIuXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0JzxkaXYgaWQ9XCJ0aXRsZUJhclwiPicgK1xyXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCIjbmF2UGFuZWxcIiBjbGFzcz1cInRvZ2dsZVwiPjwvYT4nICtcclxuXHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArICQoJyNsb2dvIGgxJykuaHRtbCgpICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHQpXHJcblx0XHRcdFx0LmFwcGVuZFRvKCRib2R5KTtcclxuXHJcblx0XHQvLyBQYW5lbC5cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnPGRpdiBpZD1cIm5hdlBhbmVsXCI+JyArXHJcblx0XHRcdFx0XHQnPG5hdj4nICtcclxuXHRcdFx0XHRcdFx0JCgnI25hdicpLm5hdkxpc3QoKSArXHJcblx0XHRcdFx0XHQnPC9uYXY+JyArXHJcblx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0KVxyXG5cdFx0XHRcdC5hcHBlbmRUbygkYm9keSlcclxuXHRcdFx0XHQucGFuZWwoe1xyXG5cdFx0XHRcdFx0ZGVsYXk6IDUwMCxcclxuXHRcdFx0XHRcdGhpZGVPbkNsaWNrOiB0cnVlLFxyXG5cdFx0XHRcdFx0aGlkZU9uU3dpcGU6IHRydWUsXHJcblx0XHRcdFx0XHRyZXNldFNjcm9sbDogdHJ1ZSxcclxuXHRcdFx0XHRcdHJlc2V0Rm9ybXM6IHRydWUsXHJcblx0XHRcdFx0XHRzaWRlOiAnbGVmdCcsXHJcblx0XHRcdFx0XHR0YXJnZXQ6ICRib2R5LFxyXG5cdFx0XHRcdFx0dmlzaWJsZUNsYXNzOiAnbmF2UGFuZWwtdmlzaWJsZSdcclxuXHRcdFx0XHR9KTtcclxuXHJcbn0pKGpRdWVyeSk7Il19