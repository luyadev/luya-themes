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
})(jQuery);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Jlc291cmNlcy9qcy9qcXVlcnkuZHJvcG90cm9uLm1pbi5qcyIsIi4uL3Jlc291cmNlcy9qcy91dGlsLmpzIiwiLi4vcmVzb3VyY2VzL2pzL21haW4uanMiXSwibmFtZXMiOlsiZSIsImZuIiwiZGlzYWJsZVNlbGVjdGlvbl9kcm9wb3Ryb24iLCJjc3MiLCJkcm9wb3Ryb24iLCJ0IiwibGVuZ3RoIiwibyIsImV4dGVuZCIsInNlbGVjdG9yUGFyZW50IiwiYmFzZVpJbmRleCIsIm1lbnVDbGFzcyIsImV4cGFuZE1vZGUiLCJob3ZlckRlbGF5IiwiaGlkZURlbGF5Iiwib3BlbmVyQ2xhc3MiLCJvcGVuZXJBY3RpdmVDbGFzcyIsInN1Ym1lbnVDbGFzc1ByZWZpeCIsIm1vZGUiLCJzcGVlZCIsImVhc2luZyIsImFsaWdubWVudCIsIm9mZnNldFgiLCJvZmZzZXRZIiwiZ2xvYmFsT2Zmc2V0WSIsIklFT2Zmc2V0WCIsIklFT2Zmc2V0WSIsIm5vT3BlbmVyRmFkZSIsImRldGFjaCIsImNsb25lT25EZXRhY2giLCJuIiwicyIsImZpbmQiLCJpIiwiYSIsImwiLCJ3aW5kb3ciLCJyIiwiZCIsImMiLCJvbiIsInRyaWdnZXIiLCJlYWNoIiwicGFyZW50IiwiYWRkIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImhpZGUiLCJhZGRDbGFzcyIsImlzIiwiY29udGFpbnMiLCJnZXQiLCJmIiwidSIsIm9mZnNldCIsInAiLCJwb3NpdGlvbiIsImgiLCJvdXRlcldpZHRoIiwiZyIsInYiLCJ0b3AiLCJvdXRlckhlaWdodCIsInJlbW92ZUNsYXNzIiwibGVmdCIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJSZWdFeHAiLCIkMSIsInNob3ciLCJDIiwiYW5pbWF0ZSIsImhlaWdodCIsImZhZGVUbyIsImZhZGVJbiIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiaG92ZXIiLCJhdHRyIiwiY2hpbGRyZW4iLCJjbG9uZSIsImFwcGVuZFRvIiwia2V5Q29kZSIsImpRdWVyeSIsIiQiLCJuYXZMaXN0IiwiJHRoaXMiLCIkYSIsImIiLCJpbmRlbnQiLCJtYXgiLCJwYXJlbnRzIiwiaHJlZiIsInRhcmdldCIsInB1c2giLCJ0ZXh0Iiwiam9pbiIsInBhbmVsIiwidXNlckNvbmZpZyIsIiRib2R5IiwiJHdpbmRvdyIsImlkIiwiY29uZmlnIiwiZGVsYXkiLCJoaWRlT25DbGljayIsImhpZGVPbkVzY2FwZSIsImhpZGVPblN3aXBlIiwicmVzZXRTY3JvbGwiLCJyZXNldEZvcm1zIiwic2lkZSIsInZpc2libGVDbGFzcyIsIl9oaWRlIiwiZXZlbnQiLCJoYXNDbGFzcyIsInNjcm9sbFRvcCIsInJlc2V0Iiwib3BlbiIsImxvY2F0aW9uIiwidG91Y2hQb3NYIiwib3JpZ2luYWxFdmVudCIsInRvdWNoZXMiLCJwYWdlWCIsInRvdWNoUG9zWSIsInBhZ2VZIiwiZGlmZlgiLCJkaWZmWSIsInRoIiwidHMiLCJzY3JvbGxIZWlnaHQiLCJyZXN1bHQiLCJib3VuZGFyeSIsImRlbHRhIiwidG9nZ2xlQ2xhc3MiLCJwbGFjZWhvbGRlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbCIsIngiLCJhcHBlbmQiLCJyZW1vdmUiLCJodG1sIiwicmVwbGFjZSIsImluc2VydEFmdGVyIiwiZm9jdXMiLCJ0eXBlIiwicHJpb3JpdGl6ZSIsIiRlbGVtZW50cyIsImNvbmRpdGlvbiIsImtleSIsIiRlIiwiJHAiLCIkcGFyZW50IiwiZGF0YSIsInByZXYiLCJwcmVwZW5kVG8iLCJyZW1vdmVEYXRhIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUNBLEVBQUFBLENBQUMsQ0FBQ0MsRUFBRixDQUFLQywwQkFBTCxHQUFnQyxZQUFVO0FBQUMsV0FBT0YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRRyxHQUFSLENBQVksYUFBWixFQUEwQixNQUExQixFQUFrQ0EsR0FBbEMsQ0FB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LENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZXBGLFNBQWYsQ0FBeUI7QUFDeEJjLElBQUFBLElBQUksRUFBRSxNQURrQjtBQUV4QlMsSUFBQUEsWUFBWSxFQUFFLElBRlU7QUFHeEJOLElBQUFBLFNBQVMsRUFBRSxRQUhhO0FBSXhCTyxJQUFBQSxNQUFNLEVBQUU7QUFKZ0IsR0FBekIsRUFyQlcsQ0E0Qlo7QUFFQzs7QUFDQzRELEVBQUFBLENBQUMsQ0FDQSx3QkFDQyx5Q0FERCxHQUVDLHNCQUZELEdBRTBCQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWN3RCxJQUFkLEVBRjFCLEdBRWlELFNBRmpELEdBR0EsUUFKQSxDQUFELENBTUUzRCxRQU5GLENBTVdrQixLQU5YLEVBL0JVLENBdUNYOztBQUNDZixFQUFBQSxDQUFDLENBQ0Esd0JBQ0MsT0FERCxHQUVFQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVDLE9BQVYsRUFGRixHQUdDLFFBSEQsR0FJQSxRQUxBLENBQUQsQ0FPRUosUUFQRixDQU9Xa0IsS0FQWCxFQVFFRixLQVJGLENBUVE7QUFDTk0sSUFBQUEsS0FBSyxFQUFFLEdBREQ7QUFFTkMsSUFBQUEsV0FBVyxFQUFFLElBRlA7QUFHTkUsSUFBQUEsV0FBVyxFQUFFLElBSFA7QUFJTkMsSUFBQUEsV0FBVyxFQUFFLElBSlA7QUFLTkMsSUFBQUEsVUFBVSxFQUFFLElBTE47QUFNTkMsSUFBQUEsSUFBSSxFQUFFLE1BTkE7QUFPTmhCLElBQUFBLE1BQU0sRUFBRU0sS0FQRjtBQVFOVyxJQUFBQSxZQUFZLEVBQUU7QUFSUixHQVJSO0FBbUJGLENBM0RELEVBMkRHM0IsTUEzREgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGpxdWVyeS5kcm9wb3Ryb24uanMgdjEuNC4zIHwgKGMpIEBhamxrbiB8IGdpdGh1Yi5jb20vYWpsa24vanF1ZXJ5LmRyb3BvdHJvbiB8IE1JVCBsaWNlbnNlZCAqL1xyXG4hZnVuY3Rpb24oZSl7ZS5mbi5kaXNhYmxlU2VsZWN0aW9uX2Ryb3BvdHJvbj1mdW5jdGlvbigpe3JldHVybiBlKHRoaXMpLmNzcyhcInVzZXItc2VsZWN0XCIsXCJub25lXCIpLmNzcyhcIi1raHRtbC11c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCItbW96LXVzZXItc2VsZWN0XCIsXCJub25lXCIpLmNzcyhcIi1vLXVzZXItc2VsZWN0XCIsXCJub25lXCIpLmNzcyhcIi13ZWJraXQtdXNlci1zZWxlY3RcIixcIm5vbmVcIil9LGUuZm4uZHJvcG90cm9uPWZ1bmN0aW9uKHQpe2lmKDA9PXRoaXMubGVuZ3RoKXJldHVybiBlKHRoaXMpO2lmKHRoaXMubGVuZ3RoPjEpZm9yKHZhciBvPTA7bzx0aGlzLmxlbmd0aDtvKyspZSh0aGlzW29dKS5kcm9wb3Ryb24odCk7cmV0dXJuIGUuZHJvcG90cm9uKGUuZXh0ZW5kKHtzZWxlY3RvclBhcmVudDplKHRoaXMpfSx0KSl9LGUuZHJvcG90cm9uPWZ1bmN0aW9uKHQpe3ZhciBvPWUuZXh0ZW5kKHtzZWxlY3RvclBhcmVudDpudWxsLGJhc2VaSW5kZXg6MWUzLG1lbnVDbGFzczpcImRyb3BvdHJvblwiLGV4cGFuZE1vZGU6XCJob3ZlclwiLGhvdmVyRGVsYXk6MTUwLGhpZGVEZWxheToyNTAsb3BlbmVyQ2xhc3M6XCJvcGVuZXJcIixvcGVuZXJBY3RpdmVDbGFzczpcImFjdGl2ZVwiLHN1Ym1lbnVDbGFzc1ByZWZpeDpcImxldmVsLVwiLG1vZGU6XCJmYWRlXCIsc3BlZWQ6XCJmYXN0XCIsZWFzaW5nOlwic3dpbmdcIixhbGlnbm1lbnQ6XCJsZWZ0XCIsb2Zmc2V0WDowLG9mZnNldFk6MCxnbG9iYWxPZmZzZXRZOjAsSUVPZmZzZXRYOjAsSUVPZmZzZXRZOjAsbm9PcGVuZXJGYWRlOiEwLGRldGFjaDohMCxjbG9uZU9uRGV0YWNoOiEwfSx0KSxuPW8uc2VsZWN0b3JQYXJlbnQscz1uLmZpbmQoXCJ1bFwiKSxpPWUoXCJib2R5XCIpLGE9ZShcImJvZHksaHRtbFwiKSxsPWUod2luZG93KSxyPSExLGQ9bnVsbCxjPW51bGw7bi5vbihcImRvQ29sbGFwc2VBbGxcIixmdW5jdGlvbigpe3MudHJpZ2dlcihcImRvQ29sbGFwc2VcIil9KSxzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpLG49dC5wYXJlbnQoKTtvLmhpZGVEZWxheT4wJiZ0LmFkZChuKS5vbihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbihlKXt3aW5kb3cuY2xlYXJUaW1lb3V0KGMpLGM9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpfSxvLmhpZGVEZWxheSl9KSx0LmRpc2FibGVTZWxlY3Rpb25fZHJvcG90cm9uKCkuaGlkZSgpLmFkZENsYXNzKG8ubWVudUNsYXNzKS5jc3MoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIikub24oXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oZSl7d2luZG93LmNsZWFyVGltZW91dChjKX0pLm9uKFwiZG9FeHBhbmRcIixmdW5jdGlvbigpe2lmKHQuaXMoXCI6dmlzaWJsZVwiKSlyZXR1cm4hMTt3aW5kb3cuY2xlYXJUaW1lb3V0KGMpLHMuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcyk7ZS5jb250YWlucyh0LmdldCgwKSxuLmdldCgwKSl8fHQudHJpZ2dlcihcImRvQ29sbGFwc2VcIil9KTt2YXIgaSxhLGQsZix1PW4ub2Zmc2V0KCkscD1uLnBvc2l0aW9uKCksaD0obi5wYXJlbnQoKS5wb3NpdGlvbigpLG4ub3V0ZXJXaWR0aCgpKSxnPXQub3V0ZXJXaWR0aCgpLHY9dC5jc3MoXCJ6LWluZGV4XCIpPT1vLmJhc2VaSW5kZXg7aWYodil7c3dpdGNoKGk9by5kZXRhY2g/dTpwLGY9aS50b3Arbi5vdXRlckhlaWdodCgpK28uZ2xvYmFsT2Zmc2V0WSxhPW8uYWxpZ25tZW50LHQucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpLnJlbW92ZUNsYXNzKFwicmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJjZW50ZXJcIiksby5hbGlnbm1lbnQpe2Nhc2VcInJpZ2h0XCI6ZD1pLmxlZnQtZytoLDA+ZCYmKGQ9aS5sZWZ0LGE9XCJsZWZ0XCIpO2JyZWFrO2Nhc2VcImNlbnRlclwiOmQ9aS5sZWZ0LU1hdGguZmxvb3IoKGctaCkvMiksMD5kPyhkPWkubGVmdCxhPVwibGVmdFwiKTpkK2c+bC53aWR0aCgpJiYoZD1pLmxlZnQtZytoLGE9XCJyaWdodFwiKTticmVhaztjYXNlXCJsZWZ0XCI6ZGVmYXVsdDpkPWkubGVmdCxkK2c+bC53aWR0aCgpJiYoZD1pLmxlZnQtZytoLGE9XCJyaWdodFwiKX10LmFkZENsYXNzKGEpfWVsc2Ugc3dpdGNoKFwicmVsYXRpdmVcIj09bi5jc3MoXCJwb3NpdGlvblwiKXx8XCJhYnNvbHV0ZVwiPT1uLmNzcyhcInBvc2l0aW9uXCIpPyhmPW8ub2Zmc2V0WSxkPS0xKnAubGVmdCk6KGY9cC50b3Arby5vZmZzZXRZLGQ9MCksby5hbGlnbm1lbnQpe2Nhc2VcInJpZ2h0XCI6ZCs9LTEqbi5wYXJlbnQoKS5vdXRlcldpZHRoKCkrby5vZmZzZXRYO2JyZWFrO2Nhc2VcImNlbnRlclwiOmNhc2VcImxlZnRcIjpkZWZhdWx0OmQrPW4ucGFyZW50KCkub3V0ZXJXaWR0aCgpK28ub2Zmc2V0WH1uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9NU0lFIChbMC05XSspXFwuLykmJlJlZ0V4cC4kMTw4JiYoZCs9by5JRU9mZnNldFgsZis9by5JRU9mZnNldFkpLHQuY3NzKFwibGVmdFwiLGQrXCJweFwiKS5jc3MoXCJ0b3BcIixmK1wicHhcIikuY3NzKFwib3BhY2l0eVwiLFwiMC4wMVwiKS5zaG93KCk7dmFyIEM9ITE7c3dpdGNoKGQ9XCJyZWxhdGl2ZVwiPT1uLmNzcyhcInBvc2l0aW9uXCIpfHxcImFic29sdXRlXCI9PW4uY3NzKFwicG9zaXRpb25cIik/LTEqcC5sZWZ0OjAsdC5vZmZzZXQoKS5sZWZ0PDA/KGQrPW4ucGFyZW50KCkub3V0ZXJXaWR0aCgpLW8ub2Zmc2V0WCxDPSEwKTp0Lm9mZnNldCgpLmxlZnQrZz5sLndpZHRoKCkmJihkKz0tMSpuLnBhcmVudCgpLm91dGVyV2lkdGgoKS1vLm9mZnNldFgsQz0hMCksQyYmdC5jc3MoXCJsZWZ0XCIsZCtcInB4XCIpLHQuaGlkZSgpLmNzcyhcIm9wYWNpdHlcIixcIjFcIiksby5tb2RlKXtjYXNlXCJ6b29tXCI6cj0hMCxuLmFkZENsYXNzKG8ub3BlbmVyQWN0aXZlQ2xhc3MpLHQuYW5pbWF0ZSh7d2lkdGg6XCJ0b2dnbGVcIixoZWlnaHQ6XCJ0b2dnbGVcIn0sby5zcGVlZCxvLmVhc2luZyxmdW5jdGlvbigpe3I9ITF9KTticmVhaztjYXNlXCJzbGlkZVwiOnI9ITAsbi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSx0LmFuaW1hdGUoe2hlaWdodDpcInRvZ2dsZVwifSxvLnNwZWVkLG8uZWFzaW5nLGZ1bmN0aW9uKCl7cj0hMX0pO2JyZWFrO2Nhc2VcImZhZGVcIjppZihyPSEwLHYmJiFvLm5vT3BlbmVyRmFkZSl7dmFyIEM7Qz1cInNsb3dcIj09by5zcGVlZD84MDpcImZhc3RcIj09by5zcGVlZD80MDpNYXRoLmZsb29yKG8uc3BlZWQvMiksbi5mYWRlVG8oQywuMDEsZnVuY3Rpb24oKXtuLmFkZENsYXNzKG8ub3BlbmVyQWN0aXZlQ2xhc3MpLG4uZmFkZVRvKG8uc3BlZWQsMSksdC5mYWRlSW4oby5zcGVlZCxmdW5jdGlvbigpe3I9ITF9KX0pfWVsc2Ugbi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSxuLmZhZGVUbyhvLnNwZWVkLDEpLHQuZmFkZUluKG8uc3BlZWQsZnVuY3Rpb24oKXtyPSExfSk7YnJlYWs7Y2FzZVwiaW5zdGFudFwiOmRlZmF1bHQ6bi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSx0LnNob3coKX1yZXR1cm4hMX0pLm9uKFwiZG9Db2xsYXBzZVwiLGZ1bmN0aW9uKCl7cmV0dXJuIHQuaXMoXCI6dmlzaWJsZVwiKT8odC5oaWRlKCksbi5yZW1vdmVDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSx0LmZpbmQoXCIuXCIrby5vcGVuZXJBY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5maW5kKFwidWxcIikuaGlkZSgpLCExKTohMX0pLm9uKFwiZG9Ub2dnbGVcIixmdW5jdGlvbihlKXtyZXR1cm4gdC5pcyhcIjp2aXNpYmxlXCIpP3QudHJpZ2dlcihcImRvQ29sbGFwc2VcIik6dC50cmlnZ2VyKFwiZG9FeHBhbmRcIiksITF9KSxuLmRpc2FibGVTZWxlY3Rpb25fZHJvcG90cm9uKCkuYWRkQ2xhc3MoXCJvcGVuZXJcIikuY3NzKFwiY3Vyc29yXCIsXCJwb2ludGVyXCIpLm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbihlKXtyfHwoZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCksdC50cmlnZ2VyKFwiZG9Ub2dnbGVcIikpfSksXCJob3ZlclwiPT1vLmV4cGFuZE1vZGUmJm4uaG92ZXIoZnVuY3Rpb24oZSl7cnx8KGQ9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnRyaWdnZXIoXCJkb0V4cGFuZFwiKX0sby5ob3ZlckRlbGF5KSl9LGZ1bmN0aW9uKGUpe3dpbmRvdy5jbGVhclRpbWVvdXQoZCl9KX0pLHMuZmluZChcImFcIikuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIikub24oXCJjbGljayB0b3VjaGVuZFwiLGZ1bmN0aW9uKHQpe3J8fGUodGhpcykuYXR0cihcImhyZWZcIikubGVuZ3RoPDEmJnQucHJldmVudERlZmF1bHQoKX0pLG4uZmluZChcImxpXCIpLmNzcyhcIndoaXRlLXNwYWNlXCIsXCJub3dyYXBcIikuZWFjaChmdW5jdGlvbigpe3ZhciB0PWUodGhpcyksbz10LmNoaWxkcmVuKFwiYVwiKSxzPXQuY2hpbGRyZW4oXCJ1bFwiKSxpPW8uYXR0cihcImhyZWZcIik7by5vbihcImNsaWNrIHRvdWNoZW5kXCIsZnVuY3Rpb24oZSl7MD09aS5sZW5ndGh8fFwiI1wiPT1pP2UucHJldmVudERlZmF1bHQoKTplLnN0b3BQcm9wYWdhdGlvbigpfSksby5sZW5ndGg+MCYmMD09cy5sZW5ndGgmJnQub24oXCJjbGljayB0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpe3J8fChuLnRyaWdnZXIoXCJkb0NvbGxhcHNlQWxsXCIpLGUuc3RvcFByb3BhZ2F0aW9uKCkpfSl9KSxuLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbigpe3ZhciB0LG49ZSh0aGlzKSxzPW4uY2hpbGRyZW4oXCJ1bFwiKTtpZihzLmxlbmd0aD4wKXtvLmRldGFjaCYmKG8uY2xvbmVPbkRldGFjaCYmKHQ9cy5jbG9uZSgpLHQuYXR0cihcImNsYXNzXCIsXCJcIikuaGlkZSgpLmFwcGVuZFRvKHMucGFyZW50KCkpKSxzLmRldGFjaCgpLmFwcGVuZFRvKGkpKTtmb3IodmFyIGE9by5iYXNlWkluZGV4LGw9MSxyPXM7ci5sZW5ndGg+MDtsKyspci5jc3MoXCJ6LWluZGV4XCIsYSsrKSxvLnN1Ym1lbnVDbGFzc1ByZWZpeCYmci5hZGRDbGFzcyhvLnN1Ym1lbnVDbGFzc1ByZWZpeCsoYS0xLW8uYmFzZVpJbmRleCkpLHI9ci5maW5kKFwiPiBsaSA+IHVsXCIpfX0pLGwub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe24udHJpZ2dlcihcImRvQ29sbGFwc2VBbGxcIil9KS5vbihcImtleXByZXNzXCIsZnVuY3Rpb24oZSl7cnx8MjchPWUua2V5Q29kZXx8KGUucHJldmVudERlZmF1bHQoKSxuLnRyaWdnZXIoXCJkb0NvbGxhcHNlQWxsXCIpKX0pLGEub24oXCJjbGljayB0b3VjaGVuZFwiLGZ1bmN0aW9uKCl7cnx8bi50cmlnZ2VyKFwiZG9Db2xsYXBzZUFsbFwiKX0pfX0oalF1ZXJ5KTtcbiIsIihmdW5jdGlvbigkKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlIGFuIGluZGVudGVkIGxpc3Qgb2YgbGlua3MgZnJvbSBhIG5hdi4gTWVhbnQgZm9yIHVzZSB3aXRoIHBhbmVsKCkuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ubmF2TGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHQkYSA9ICR0aGlzLmZpbmQoJ2EnKSxcclxuXHRcdFx0YiA9IFtdO1xyXG5cclxuXHRcdCRhLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHR2YXJcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRpbmRlbnQgPSBNYXRoLm1heCgwLCAkdGhpcy5wYXJlbnRzKCdsaScpLmxlbmd0aCAtIDEpLFxyXG5cdFx0XHRcdGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0dGFyZ2V0ID0gJHRoaXMuYXR0cigndGFyZ2V0Jyk7XHJcblxyXG5cdFx0XHRiLnB1c2goXHJcblx0XHRcdFx0JzxhICcgK1xyXG5cdFx0XHRcdFx0J2NsYXNzPVwibGluayBkZXB0aC0nICsgaW5kZW50ICsgJ1wiJyArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgdGFyZ2V0ICE9PSAndW5kZWZpbmVkJyAmJiB0YXJnZXQgIT0gJycpID8gJyB0YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiJyA6ICcnKSArXHJcblx0XHRcdFx0XHQoICh0eXBlb2YgaHJlZiAhPT0gJ3VuZGVmaW5lZCcgJiYgaHJlZiAhPSAnJykgPyAnIGhyZWY9XCInICsgaHJlZiArICdcIicgOiAnJykgK1xyXG5cdFx0XHRcdCc+JyArXHJcblx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJpbmRlbnQtJyArIGluZGVudCArICdcIj48L3NwYW4+JyArXHJcblx0XHRcdFx0XHQkdGhpcy50ZXh0KCkgK1xyXG5cdFx0XHRcdCc8L2E+J1xyXG5cdFx0XHQpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBiLmpvaW4oJycpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQYW5lbC1pZnkgYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0ge29iamVjdH0gdXNlckNvbmZpZyBVc2VyIGNvbmZpZy5cclxuXHQgKiBAcmV0dXJuIHtqUXVlcnl9IGpRdWVyeSBvYmplY3QuXHJcblx0ICovXHJcblx0JC5mbi5wYW5lbCA9IGZ1bmN0aW9uKHVzZXJDb25maWcpIHtcclxuXHJcblx0XHQvLyBObyBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdC8vIE11bHRpcGxlIGVsZW1lbnRzP1xyXG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPiAxKSB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHQkKHRoaXNbaV0pLnBhbmVsKHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0JGJvZHkgPSAkKCdib2R5JyksXHJcblx0XHRcdFx0JHdpbmRvdyA9ICQod2luZG93KSxcclxuXHRcdFx0XHRpZCA9ICR0aGlzLmF0dHIoJ2lkJyksXHJcblx0XHRcdFx0Y29uZmlnO1xyXG5cclxuXHRcdC8vIENvbmZpZy5cclxuXHRcdFx0Y29uZmlnID0gJC5leHRlbmQoe1xyXG5cclxuXHRcdFx0XHQvLyBEZWxheS5cclxuXHRcdFx0XHRcdGRlbGF5OiAwLFxyXG5cclxuXHRcdFx0XHQvLyBIaWRlIHBhbmVsIG9uIGxpbmsgY2xpY2suXHJcblx0XHRcdFx0XHRoaWRlT25DbGljazogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIEhpZGUgcGFuZWwgb24gZXNjYXBlIGtleXByZXNzLlxyXG5cdFx0XHRcdFx0aGlkZU9uRXNjYXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBwYW5lbCBvbiBzd2lwZS5cclxuXHRcdFx0XHRcdGhpZGVPblN3aXBlOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gUmVzZXQgc2Nyb2xsIHBvc2l0aW9uIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldFNjcm9sbDogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFJlc2V0IGZvcm1zIG9uIGhpZGUuXHJcblx0XHRcdFx0XHRyZXNldEZvcm1zOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0Ly8gU2lkZSBvZiB2aWV3cG9ydCB0aGUgcGFuZWwgd2lsbCBhcHBlYXIuXHJcblx0XHRcdFx0XHRzaWRlOiBudWxsLFxyXG5cclxuXHRcdFx0XHQvLyBUYXJnZXQgZWxlbWVudCBmb3IgXCJjbGFzc1wiLlxyXG5cdFx0XHRcdFx0dGFyZ2V0OiAkdGhpcyxcclxuXHJcblx0XHRcdFx0Ly8gQ2xhc3MgdG8gdG9nZ2xlLlxyXG5cdFx0XHRcdFx0dmlzaWJsZUNsYXNzOiAndmlzaWJsZSdcclxuXHJcblx0XHRcdH0sIHVzZXJDb25maWcpO1xyXG5cclxuXHRcdFx0Ly8gRXhwYW5kIFwidGFyZ2V0XCIgaWYgaXQncyBub3QgYSBqUXVlcnkgb2JqZWN0IGFscmVhZHkuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjb25maWcudGFyZ2V0ICE9ICdqUXVlcnknKVxyXG5cdFx0XHRcdFx0Y29uZmlnLnRhcmdldCA9ICQoY29uZmlnLnRhcmdldCk7XHJcblxyXG5cdFx0Ly8gUGFuZWwuXHJcblxyXG5cdFx0XHQvLyBNZXRob2RzLlxyXG5cdFx0XHRcdCR0aGlzLl9oaWRlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBBbHJlYWR5IGhpZGRlbj8gQmFpbC5cclxuXHRcdFx0XHRcdFx0aWYgKCFjb25maWcudGFyZ2V0Lmhhc0NsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiBhbiBldmVudCB3YXMgcHJvdmlkZWQsIGNhbmNlbCBpdC5cclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGlkZS5cclxuXHRcdFx0XHRcdFx0Y29uZmlnLnRhcmdldC5yZW1vdmVDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKTtcclxuXHJcblx0XHRcdFx0XHQvLyBQb3N0LWhpZGUgc3R1ZmYuXHJcblx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBSZXNldCBzY3JvbGwgcG9zaXRpb24uXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlnLnJlc2V0U2Nyb2xsKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5zY3JvbGxUb3AoMCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFJlc2V0IGZvcm1zLlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXNldEZvcm1zKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdmb3JtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlc2V0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0fSwgY29uZmlnLmRlbGF5KTtcclxuXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIFZlbmRvciBmaXhlcy5cclxuXHRcdFx0XHQkdGhpc1xyXG5cdFx0XHRcdFx0LmNzcygnLW1zLW92ZXJmbG93LXN0eWxlJywgJy1tcy1hdXRvaGlkaW5nLXNjcm9sbGJhcicpXHJcblx0XHRcdFx0XHQuY3NzKCctd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZycsICd0b3VjaCcpO1xyXG5cclxuXHRcdFx0Ly8gSGlkZSBvbiBjbGljay5cclxuXHRcdFx0XHRpZiAoY29uZmlnLmhpZGVPbkNsaWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnYScpXHJcblx0XHRcdFx0XHRcdC5jc3MoJy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcicsICdyZ2JhKDAsMCwwLDApJyk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXNcclxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyICRhID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0XHRcdGhyZWYgPSAkYS5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXQgPSAkYS5hdHRyKCd0YXJnZXQnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCFocmVmIHx8IGhyZWYgPT0gJyMnIHx8IGhyZWYgPT0gJycgfHwgaHJlZiA9PSAnIycgKyBpZClcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2FuY2VsIG9yaWdpbmFsIGV2ZW50LlxyXG5cdFx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBIaWRlIHBhbmVsLlxyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuX2hpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gUmVkaXJlY3QgdG8gaHJlZi5cclxuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldCA9PSAnX2JsYW5rJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR9LCBjb25maWcuZGVsYXkgKyAxMCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvdWNoIHN0dWZmLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1kgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdCR0aGlzLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgkdGhpcy50b3VjaFBvc1ggPT09IG51bGxcclxuXHRcdFx0XHRcdHx8XHQkdGhpcy50b3VjaFBvc1kgPT09IG51bGwpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHR2YXJcdGRpZmZYID0gJHRoaXMudG91Y2hQb3NYIC0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYLFxyXG5cdFx0XHRcdFx0XHRkaWZmWSA9ICR0aGlzLnRvdWNoUG9zWSAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWSxcclxuXHRcdFx0XHRcdFx0dGggPSAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG5cdFx0XHRcdFx0XHR0cyA9ICgkdGhpcy5nZXQoMCkuc2Nyb2xsSGVpZ2h0IC0gJHRoaXMuc2Nyb2xsVG9wKCkpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUgb24gc3dpcGU/XHJcblx0XHRcdFx0XHRcdGlmIChjb25maWcuaGlkZU9uU3dpcGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym91bmRhcnkgPSAyMCxcclxuXHRcdFx0XHRcdFx0XHRcdGRlbHRhID0gNTA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29uZmlnLnNpZGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZZIDwgYm91bmRhcnkgJiYgZGlmZlkgPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWCA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSAoZGlmZlkgPCBib3VuZGFyeSAmJiBkaWZmWSA+ICgtMSAqIGJvdW5kYXJ5KSkgJiYgKGRpZmZYIDwgKC0xICogZGVsdGEpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndG9wJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA+IGRlbHRhKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZYIDwgYm91bmRhcnkgJiYgZGlmZlggPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWSA8ICgtMSAqIGRlbHRhKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy50b3VjaFBvc1ggPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NZID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gUHJldmVudCB2ZXJ0aWNhbCBzY3JvbGxpbmcgcGFzdCB0aGUgdG9wIG9yIGJvdHRvbS5cclxuXHRcdFx0XHRcdFx0aWYgKCgkdGhpcy5zY3JvbGxUb3AoKSA8IDAgJiYgZGlmZlkgPCAwKVxyXG5cdFx0XHRcdFx0XHR8fCAodHMgPiAodGggLSAyKSAmJiB0cyA8ICh0aCArIDIpICYmIGRpZmZZID4gMCkpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFdmVudDogUHJldmVudCBjZXJ0YWluIGV2ZW50cyBpbnNpZGUgdGhlIHBhbmVsIGZyb20gYnViYmxpbmcuXHJcblx0XHRcdFx0JHRoaXMub24oJ2NsaWNrIHRvdWNoZW5kIHRvdWNoc3RhcnQgdG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgcGFuZWwgaWYgYSBjaGlsZCBhbmNob3IgdGFnIHBvaW50aW5nIHRvIGl0cyBJRCBpcyBjbGlja2VkLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCdjbGljaycsICdhW2hyZWY9XCIjJyArIGlkICsgJ1wiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdGNvbmZpZy50YXJnZXQucmVtb3ZlQ2xhc3MoY29uZmlnLnZpc2libGVDbGFzcyk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdC8vIEJvZHkuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBwYW5lbCBvbiBib2R5IGNsaWNrL3RhcC5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2sgdG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdFx0JHRoaXMuX2hpZGUoZXZlbnQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFRvZ2dsZS5cclxuXHRcdFx0XHQkYm9keS5vbignY2xpY2snLCAnYVtocmVmPVwiIycgKyBpZCArICdcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcudGFyZ2V0LnRvZ2dsZUNsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBXaW5kb3cuXHJcblxyXG5cdFx0XHQvLyBFdmVudDogSGlkZSBvbiBFU0MuXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5oaWRlT25Fc2NhcGUpXHJcblx0XHRcdFx0XHQkd2luZG93Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09IDI3KVxyXG5cdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKGV2ZW50KTtcclxuXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGx5IFwicGxhY2Vob2xkZXJcIiBhdHRyaWJ1dGUgcG9seWZpbGwgdG8gb25lIG9yIG1vcmUgZm9ybXMuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ucGxhY2Vob2xkZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBCcm93c2VyIG5hdGl2ZWx5IHN1cHBvcnRzIHBsYWNlaG9sZGVycz8gQmFpbC5cclxuXHRcdFx0aWYgKHR5cGVvZiAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSkucGxhY2Vob2xkZXIgIT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0cmV0dXJuICQodGhpcyk7XHJcblxyXG5cdFx0Ly8gTm8gZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHQvLyBNdWx0aXBsZSBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID4gMSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0JCh0aGlzW2ldKS5wbGFjZWhvbGRlcigpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0Ly8gVmFycy5cclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcblx0XHQvLyBUZXh0LCBUZXh0QXJlYS5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSx0ZXh0YXJlYScpXHJcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnXHJcblx0XHRcdFx0XHR8fCAgaS52YWwoKSA9PSBpLmF0dHIoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKS5tYXRjaCgvLXBvbHlmaWxsLWZpZWxkJC8pKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09IGkuYXR0cigncGxhY2Vob2xkZXInKSlcclxuXHRcdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHRcdC52YWwoJycpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBQYXNzd29yZC5cclxuXHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT1wYXNzd29yZF0nKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHRcdFx0XHRcdHZhciB4ID0gJChcclxuXHRcdFx0XHRcdFx0XHRcdCQoJzxkaXY+JylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmFwcGVuZChpLmNsb25lKCkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZW1vdmUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuaHRtbCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPVwicGFzc3dvcmRcIi9pLCAndHlwZT1cInRleHRcIicpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC90eXBlPXBhc3N3b3JkL2ksICd0eXBlPXRleHQnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCdpZCcpICE9ICcnKVxyXG5cdFx0XHRcdFx0XHR4LmF0dHIoJ2lkJywgaS5hdHRyKCdpZCcpICsgJy1wb2x5ZmlsbC1maWVsZCcpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLmF0dHIoJ25hbWUnKSAhPSAnJylcclxuXHRcdFx0XHRcdFx0eC5hdHRyKCduYW1lJywgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkJyk7XHJcblxyXG5cdFx0XHRcdFx0eC5hZGRDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKVxyXG5cdFx0XHRcdFx0XHQudmFsKHguYXR0cigncGxhY2Vob2xkZXInKSkuaW5zZXJ0QWZ0ZXIoaSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpXHJcblx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdC5vbignYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciB4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR4LnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0eFxyXG5cdFx0XHRcdFx0XHQub24oJ2ZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSB4LnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9JyArIHguYXR0cignbmFtZScpLnJlcGxhY2UoJy1wb2x5ZmlsbC1maWVsZCcsICcnKSArICddJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0XHRcdFx0XHQuZm9jdXMoKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5vbigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdHgudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBFdmVudHMuXHJcblx0XHRcdCR0aGlzXHJcblx0XHRcdFx0Lm9uKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dFt0eXBlPXRleHRdLGlucHV0W3R5cGU9cGFzc3dvcmRdLHRleHRhcmVhJylcclxuXHRcdFx0XHRcdFx0LmVhY2goZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0XHRcdGkuYXR0cignbmFtZScsICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gaS5hdHRyKCdwbGFjZWhvbGRlcicpKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aS5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHRcdFx0XHRcdGkudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdyZXNldCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdzZWxlY3QnKVxyXG5cdFx0XHRcdFx0XHQudmFsKCQoJ29wdGlvbjpmaXJzdCcpLnZhbCgpKTtcclxuXHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dCx0ZXh0YXJlYScpXHJcblx0XHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRcdFx0XHR4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpLnJlbW92ZUNsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3N1Ym1pdCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyZXNldCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR4ID0gaS5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyBpLmF0dHIoJ25hbWUnKSArICctcG9seWZpbGwtZmllbGRdJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHguaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkuYXR0cignY2hlY2tlZCcsIGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3RleHRhcmVhJzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkuYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdwbGFjZWhvbGRlcicpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS52YWwoaS5hdHRyKCdkZWZhdWx0VmFsdWUnKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIGVsZW1lbnRzIHRvL2Zyb20gdGhlIGZpcnN0IHBvc2l0aW9ucyBvZiB0aGVpciByZXNwZWN0aXZlIHBhcmVudHMuXHJcblx0ICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50cyBFbGVtZW50cyAob3Igc2VsZWN0b3IpIHRvIG1vdmUuXHJcblx0ICogQHBhcmFtIHtib29sfSBjb25kaXRpb24gSWYgdHJ1ZSwgbW92ZXMgZWxlbWVudHMgdG8gdGhlIHRvcC4gT3RoZXJ3aXNlLCBtb3ZlcyBlbGVtZW50cyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9ucy5cclxuXHQgKi9cclxuXHQkLnByaW9yaXRpemUgPSBmdW5jdGlvbigkZWxlbWVudHMsIGNvbmRpdGlvbikge1xyXG5cclxuXHRcdHZhciBrZXkgPSAnX19wcmlvcml0aXplJztcclxuXHJcblx0XHQvLyBFeHBhbmQgJGVsZW1lbnRzIGlmIGl0J3Mgbm90IGFscmVhZHkgYSBqUXVlcnkgb2JqZWN0LlxyXG5cdFx0XHRpZiAodHlwZW9mICRlbGVtZW50cyAhPSAnalF1ZXJ5JylcclxuXHRcdFx0XHQkZWxlbWVudHMgPSAkKCRlbGVtZW50cyk7XHJcblxyXG5cdFx0Ly8gU3RlcCB0aHJvdWdoIGVsZW1lbnRzLlxyXG5cdFx0XHQkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0dmFyXHQkZSA9ICQodGhpcyksICRwLFxyXG5cdFx0XHRcdFx0JHBhcmVudCA9ICRlLnBhcmVudCgpO1xyXG5cclxuXHRcdFx0XHQvLyBObyBwYXJlbnQ/IEJhaWwuXHJcblx0XHRcdFx0XHRpZiAoJHBhcmVudC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHQvLyBOb3QgbW92ZWQ/IE1vdmUgaXQuXHJcblx0XHRcdFx0XHRpZiAoISRlLmRhdGEoa2V5KSkge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIGlzIGZhbHNlPyBCYWlsLlxyXG5cdFx0XHRcdFx0XHRcdGlmICghY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gR2V0IHBsYWNlaG9sZGVyICh3aGljaCB3aWxsIHNlcnZlIGFzIG91ciBwb2ludCBvZiByZWZlcmVuY2UgZm9yIHdoZW4gdGhpcyBlbGVtZW50IG5lZWRzIHRvIG1vdmUgYmFjaykuXHJcblx0XHRcdFx0XHRcdFx0JHAgPSAkZS5wcmV2KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIENvdWxkbid0IGZpbmQgYW55dGhpbmc/IE1lYW5zIHRoaXMgZWxlbWVudCdzIGFscmVhZHkgYXQgdGhlIHRvcCwgc28gYmFpbC5cclxuXHRcdFx0XHRcdFx0XHRcdGlmICgkcC5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTW92ZSBlbGVtZW50IHRvIHRvcCBvZiBwYXJlbnQuXHJcblx0XHRcdFx0XHRcdFx0JGUucHJlcGVuZFRvKCRwYXJlbnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTWFyayBlbGVtZW50IGFzIG1vdmVkLlxyXG5cdFx0XHRcdFx0XHRcdCRlLmRhdGEoa2V5LCAkcCk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBNb3ZlZCBhbHJlYWR5P1xyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gaXMgdHJ1ZT8gQmFpbC5cclxuXHRcdFx0XHRcdFx0XHRpZiAoY29uZGl0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0JHAgPSAkZS5kYXRhKGtleSk7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBNb3ZlIGVsZW1lbnQgYmFjayB0byBpdHMgb3JpZ2luYWwgbG9jYXRpb24gKHVzaW5nIG91ciBwbGFjZWhvbGRlcikuXHJcblx0XHRcdFx0XHRcdFx0JGUuaW5zZXJ0QWZ0ZXIoJHApO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gVW5tYXJrIGVsZW1lbnQgYXMgbW92ZWQuXHJcblx0XHRcdFx0XHRcdFx0JGUucmVtb3ZlRGF0YShrZXkpO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5KTsiLCIvKlxyXG5cdEVzY2FwZSBWZWxvY2l0eSBieSBIVE1MNSBVUFxyXG5cdGh0bWw1dXAubmV0IHwgQGFqbGtuXHJcblx0RnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIHVuZGVyIHRoZSBDQ0EgMy4wIGxpY2Vuc2UgKGh0bWw1dXAubmV0L2xpY2Vuc2UpXHJcbiovXHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuXHR2YXJcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHQkYm9keSA9ICQoJ2JvZHknKTtcclxuXHJcblx0Ly8gQnJlYWtwb2ludHMuXHJcblx0Ly8gXHRicmVha3BvaW50cyh7XHJcblx0Ly8gXHRcdHhsYXJnZTogIFsgJzEyODFweCcsICAnMTY4MHB4JyBdLFxyXG5cdC8vIFx0XHRsYXJnZTogICBbICc5ODFweCcsICAgJzEyODBweCcgXSxcclxuXHQvLyBcdFx0bWVkaXVtOiAgWyAnNzM3cHgnLCAgICc5ODBweCcgIF0sXHJcblx0Ly8gXHRcdHNtYWxsOiAgIFsgbnVsbCwgICAgICAnNzM2cHgnICBdXHJcblx0Ly8gXHR9KTtcclxuXHJcblx0Ly8gUGxheSBpbml0aWFsIGFuaW1hdGlvbnMgb24gcGFnZSBsb2FkLlxyXG5cdFx0JHdpbmRvdy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkYm9keS5yZW1vdmVDbGFzcygnaXMtcHJlbG9hZCcpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdC8vIERyb3Bkb3ducy5cclxuXHRcdCQoJyNuYXYgPiB1bCcpLmRyb3BvdHJvbih7XHJcblx0XHRcdG1vZGU6ICdmYWRlJyxcclxuXHRcdFx0bm9PcGVuZXJGYWRlOiB0cnVlLFxyXG5cdFx0XHRhbGlnbm1lbnQ6ICdjZW50ZXInLFxyXG5cdFx0XHRkZXRhY2g6IGZhbHNlXHJcblx0XHR9KTtcclxuXHJcblx0Ly8gTmF2LlxyXG5cclxuXHRcdC8vIFRpdGxlIEJhci5cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnPGRpdiBpZD1cInRpdGxlQmFyXCI+JyArXHJcblx0XHRcdFx0XHQnPGEgaHJlZj1cIiNuYXZQYW5lbFwiIGNsYXNzPVwidG9nZ2xlXCI+PC9hPicgK1xyXG5cdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgJCgnI2xvZ28gaDEnKS5odG1sKCkgKyAnPC9zcGFuPicgK1xyXG5cdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdClcclxuXHRcdFx0XHQuYXBwZW5kVG8oJGJvZHkpO1xyXG5cclxuXHRcdC8vIFBhbmVsLlxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCc8ZGl2IGlkPVwibmF2UGFuZWxcIj4nICtcclxuXHRcdFx0XHRcdCc8bmF2PicgK1xyXG5cdFx0XHRcdFx0XHQkKCcjbmF2JykubmF2TGlzdCgpICtcclxuXHRcdFx0XHRcdCc8L25hdj4nICtcclxuXHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHQpXHJcblx0XHRcdFx0LmFwcGVuZFRvKCRib2R5KVxyXG5cdFx0XHRcdC5wYW5lbCh7XHJcblx0XHRcdFx0XHRkZWxheTogNTAwLFxyXG5cdFx0XHRcdFx0aGlkZU9uQ2xpY2s6IHRydWUsXHJcblx0XHRcdFx0XHRoaWRlT25Td2lwZTogdHJ1ZSxcclxuXHRcdFx0XHRcdHJlc2V0U2Nyb2xsOiB0cnVlLFxyXG5cdFx0XHRcdFx0cmVzZXRGb3JtczogdHJ1ZSxcclxuXHRcdFx0XHRcdHNpZGU6ICdsZWZ0JyxcclxuXHRcdFx0XHRcdHRhcmdldDogJGJvZHksXHJcblx0XHRcdFx0XHR2aXNpYmxlQ2xhc3M6ICduYXZQYW5lbC12aXNpYmxlJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxufSkoalF1ZXJ5KTsiXX0=