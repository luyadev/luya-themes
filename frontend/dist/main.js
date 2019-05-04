"use strict";

/* jquery.dropotron.js v1.4.3 | (c) @ajlkn | github.com/ajlkn/jquery.dropotron | MIT licensed */
!function (e) {
	e.fn.disableSelection_dropotron = function () {
		return e(this).css("user-select", "none").css("-khtml-user-select", "none").css("-moz-user-select", "none").css("-o-user-select", "none").css("-webkit-user-select", "none");
	}, e.fn.dropotron = function (t) {
		if (0 == this.length) return e(this);if (this.length > 1) for (var o = 0; o < this.length; o++) {
			e(this[o]).dropotron(t);
		}return e.dropotron(e.extend({ selectorParent: e(this) }, t));
	}, e.dropotron = function (t) {
		var o = e.extend({ selectorParent: null, baseZIndex: 1e3, menuClass: "dropotron", expandMode: "hover", hoverDelay: 150, hideDelay: 250, openerClass: "opener", openerActiveClass: "active", submenuClassPrefix: "level-", mode: "fade", speed: "fast", easing: "swing", alignment: "left", offsetX: 0, offsetY: 0, globalOffsetY: 0, IEOffsetX: 0, IEOffsetY: 0, noOpenerFade: !0, detach: !0, cloneOnDetach: !0 }, t),
		    n = o.selectorParent,
		    s = n.find("ul"),
		    i = e("body"),
		    a = e("body,html"),
		    l = e(window),
		    r = !1,
		    d = null,
		    c = null;n.on("doCollapseAll", function () {
			s.trigger("doCollapse");
		}), s.each(function () {
			var t = e(this),
			    n = t.parent();o.hideDelay > 0 && t.add(n).on("mouseleave", function (e) {
				window.clearTimeout(c), c = window.setTimeout(function () {
					t.trigger("doCollapse");
				}, o.hideDelay);
			}), t.disableSelection_dropotron().hide().addClass(o.menuClass).css("position", "absolute").on("mouseenter", function (e) {
				window.clearTimeout(c);
			}).on("doExpand", function () {
				if (t.is(":visible")) return !1;window.clearTimeout(c), s.each(function () {
					var t = e(this);e.contains(t.get(0), n.get(0)) || t.trigger("doCollapse");
				});var i,
				    a,
				    d,
				    f,
				    u = n.offset(),
				    p = n.position(),
				    h = (n.parent().position(), n.outerWidth()),
				    g = t.outerWidth(),
				    v = t.css("z-index") == o.baseZIndex;if (v) {
					switch (i = o.detach ? u : p, f = i.top + n.outerHeight() + o.globalOffsetY, a = o.alignment, t.removeClass("left").removeClass("right").removeClass("center"), o.alignment) {case "right":
							d = i.left - g + h, 0 > d && (d = i.left, a = "left");break;case "center":
							d = i.left - Math.floor((g - h) / 2), 0 > d ? (d = i.left, a = "left") : d + g > l.width() && (d = i.left - g + h, a = "right");break;case "left":default:
							d = i.left, d + g > l.width() && (d = i.left - g + h, a = "right");}t.addClass(a);
				} else switch ("relative" == n.css("position") || "absolute" == n.css("position") ? (f = o.offsetY, d = -1 * p.left) : (f = p.top + o.offsetY, d = 0), o.alignment) {case "right":
						d += -1 * n.parent().outerWidth() + o.offsetX;break;case "center":case "left":default:
						d += n.parent().outerWidth() + o.offsetX;}navigator.userAgent.match(/MSIE ([0-9]+)\./) && RegExp.$1 < 8 && (d += o.IEOffsetX, f += o.IEOffsetY), t.css("left", d + "px").css("top", f + "px").css("opacity", "0.01").show();var C = !1;switch (d = "relative" == n.css("position") || "absolute" == n.css("position") ? -1 * p.left : 0, t.offset().left < 0 ? (d += n.parent().outerWidth() - o.offsetX, C = !0) : t.offset().left + g > l.width() && (d += -1 * n.parent().outerWidth() - o.offsetX, C = !0), C && t.css("left", d + "px"), t.hide().css("opacity", "1"), o.mode) {case "zoom":
						r = !0, n.addClass(o.openerActiveClass), t.animate({ width: "toggle", height: "toggle" }, o.speed, o.easing, function () {
							r = !1;
						});break;case "slide":
						r = !0, n.addClass(o.openerActiveClass), t.animate({ height: "toggle" }, o.speed, o.easing, function () {
							r = !1;
						});break;case "fade":
						if (r = !0, v && !o.noOpenerFade) {
							var C;C = "slow" == o.speed ? 80 : "fast" == o.speed ? 40 : Math.floor(o.speed / 2), n.fadeTo(C, .01, function () {
								n.addClass(o.openerActiveClass), n.fadeTo(o.speed, 1), t.fadeIn(o.speed, function () {
									r = !1;
								});
							});
						} else n.addClass(o.openerActiveClass), n.fadeTo(o.speed, 1), t.fadeIn(o.speed, function () {
							r = !1;
						});break;case "instant":default:
						n.addClass(o.openerActiveClass), t.show();}return !1;
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
			    i = o.attr("href");o.on("click touchend", function (e) {
				0 == i.length || "#" == i ? e.preventDefault() : e.stopPropagation();
			}), o.length > 0 && 0 == s.length && t.on("click touchend", function (e) {
				r || (n.trigger("doCollapseAll"), e.stopPropagation());
			});
		}), n.children("li").each(function () {
			var t,
			    n = e(this),
			    s = n.children("ul");if (s.length > 0) {
				o.detach && (o.cloneOnDetach && (t = s.clone(), t.attr("class", "").hide().appendTo(s.parent())), s.detach().appendTo(i));for (var a = o.baseZIndex, l = 1, r = s; r.length > 0; l++) {
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
}(jQuery);
(function ($) {

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
		if (this.length == 0) return $this;

		// Multiple elements?
		if (this.length > 1) {

			for (var i = 0; i < this.length; i++) {
				$(this[i]).panel(userConfig);
			}return $this;
		}

		// Vars.
		var $this = $(this),
		    $body = $('body'),
		    $window = $(window),
		    id = $this.attr('id'),
		    config;

		// Config.
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

		}, userConfig);

		// Expand "target" if it's not a jQuery object already.
		if (typeof config.target != 'jQuery') config.target = $(config.target);

		// Panel.

		// Methods.
		$this._hide = function (event) {

			// Already hidden? Bail.
			if (!config.target.hasClass(config.visibleClass)) return;

			// If an event was provided, cancel it.
			if (event) {

				event.preventDefault();
				event.stopPropagation();
			}

			// Hide.
			config.target.removeClass(config.visibleClass);

			// Post-hide stuff.
			window.setTimeout(function () {

				// Reset scroll position.
				if (config.resetScroll) $this.scrollTop(0);

				// Reset forms.
				if (config.resetForms) $this.find('form').each(function () {
					this.reset();
				});
			}, config.delay);
		};

		// Vendor fixes.
		$this.css('-ms-overflow-style', '-ms-autohiding-scrollbar').css('-webkit-overflow-scrolling', 'touch');

		// Hide on click.
		if (config.hideOnClick) {

			$this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

			$this.on('click', 'a', function (event) {

				var $a = $(this),
				    href = $a.attr('href'),
				    target = $a.attr('target');

				if (!href || href == '#' || href == '' || href == '#' + id) return;

				// Cancel original event.
				event.preventDefault();
				event.stopPropagation();

				// Hide panel.
				$this._hide();

				// Redirect to href.
				window.setTimeout(function () {

					if (target == '_blank') window.open(href);else window.location.href = href;
				}, config.delay + 10);
			});
		}

		// Event: Touch stuff.
		$this.on('touchstart', function (event) {

			$this.touchPosX = event.originalEvent.touches[0].pageX;
			$this.touchPosY = event.originalEvent.touches[0].pageY;
		});

		$this.on('touchmove', function (event) {

			if ($this.touchPosX === null || $this.touchPosY === null) return;

			var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
			    diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
			    th = $this.outerHeight(),
			    ts = $this.get(0).scrollHeight - $this.scrollTop();

			// Hide on swipe?
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
			}

			// Prevent vertical scrolling past the top or bottom.
			if ($this.scrollTop() < 0 && diffY < 0 || ts > th - 2 && ts < th + 2 && diffY > 0) {

				event.preventDefault();
				event.stopPropagation();
			}
		});

		// Event: Prevent certain events inside the panel from bubbling.
		$this.on('click touchend touchstart touchmove', function (event) {
			event.stopPropagation();
		});

		// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
		$this.on('click', 'a[href="#' + id + '"]', function (event) {

			event.preventDefault();
			event.stopPropagation();

			config.target.removeClass(config.visibleClass);
		});

		// Body.

		// Event: Hide panel on body click/tap.
		$body.on('click touchend', function (event) {
			$this._hide(event);
		});

		// Event: Toggle.
		$body.on('click', 'a[href="#' + id + '"]', function (event) {

			event.preventDefault();
			event.stopPropagation();

			config.target.toggleClass(config.visibleClass);
		});

		// Window.

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
		if (typeof document.createElement('input').placeholder != 'undefined') return $(this);

		// No elements?
		if (this.length == 0) return $this;

		// Multiple elements?
		if (this.length > 1) {

			for (var i = 0; i < this.length; i++) {
				$(this[i]).placeholder();
			}return $this;
		}

		// Vars.
		var $this = $(this);

		// Text, TextArea.
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
		});

		// Password.
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
		});

		// Events.
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

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
		if (typeof $elements != 'jQuery') $elements = $($elements);

		// Step through elements.
		$elements.each(function () {

			var $e = $(this),
			    $p,
			    $parent = $e.parent();

			// No parent? Bail.
			if ($parent.length == 0) return;

			// Not moved? Move it.
			if (!$e.data(key)) {

				// Condition is false? Bail.
				if (!condition) return;

				// Get placeholder (which will serve as our point of reference for when this element needs to move back).
				$p = $e.prev();

				// Couldn't find anything? Means this element's already at the top, so bail.
				if ($p.length == 0) return;

				// Move element to top of parent.
				$e.prependTo($parent);

				// Mark element as moved.
				$e.data(key, $p);
			}

			// Moved already?
			else {

					// Condition is true? Bail.
					if (condition) return;

					$p = $e.data(key);

					// Move element back to its original location (using our placeholder).
					$e.insertAfter($p);

					// Unmark element as moved.
					$e.removeData(key);
				}
		});
	};
})(jQuery); /*
            Escape Velocity by HTML5 UP
            html5up.net | @ajlkn
            Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
            */

(function ($) {

	var $window = $(window),
	    $body = $('body');

	// Breakpoints.
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
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		alignment: 'center',
		detach: false
	});

	// Nav.

	// Title Bar.
	$('<div id="titleBar">' + '<a href="#navPanel" class="toggle"></a>' + '<span class="title">' + $('#logo h1').html() + '</span>' + '</div>').appendTo($body);

	// Panel.
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
})(jQuery);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Jlc291cmNlcy9qcy9qcXVlcnkuZHJvcG90cm9uLm1pbi5qcyIsIi4uL3Jlc291cmNlcy9qcy91dGlsLmpzIiwiLi4vcmVzb3VyY2VzL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsQ0FBQSxVQUFBLENBQUEsRUFBQTtBQUFBLEdBQUEsRUFBQSxDQUFBLDBCQUFBLEdBQUEsWUFBQTtBQUFBLFNBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLGFBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxDQUFBLG9CQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsQ0FBQSxrQkFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLENBQUEsZ0JBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxDQUFBLHFCQUFBLEVBQUEsTUFBQSxDQUFBO0FBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsS0FBQSxLQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxLQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsS0FBQSxJQUFBLElBQUEsQ0FBQSxFQUFBLElBQUEsS0FBQSxNQUFBLEVBQUEsR0FBQTtBQUFBLEtBQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLEdBQUEsT0FBQSxFQUFBLFNBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxFQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLEVBQUEsRUFBQSxFQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUFBLE1BQUEsSUFBQSxFQUFBLE1BQUEsQ0FBQSxFQUFBLGdCQUFBLElBQUEsRUFBQSxZQUFBLEdBQUEsRUFBQSxXQUFBLFdBQUEsRUFBQSxZQUFBLE9BQUEsRUFBQSxZQUFBLEdBQUEsRUFBQSxXQUFBLEdBQUEsRUFBQSxhQUFBLFFBQUEsRUFBQSxtQkFBQSxRQUFBLEVBQUEsb0JBQUEsUUFBQSxFQUFBLE1BQUEsTUFBQSxFQUFBLE9BQUEsTUFBQSxFQUFBLFFBQUEsT0FBQSxFQUFBLFdBQUEsTUFBQSxFQUFBLFNBQUEsQ0FBQSxFQUFBLFNBQUEsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxFQUFBLFdBQUEsQ0FBQSxFQUFBLFdBQUEsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsUUFBQSxDQUFBLENBQUEsRUFBQSxlQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBO0FBQUEsTUFBQSxJQUFBLEVBQUEsY0FBQTtBQUFBLE1BQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxNQUFBLElBQUEsRUFBQSxNQUFBLENBQUE7QUFBQSxNQUFBLElBQUEsRUFBQSxXQUFBLENBQUE7QUFBQSxNQUFBLElBQUEsRUFBQSxNQUFBLENBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxDQUFBO0FBQUEsTUFBQSxJQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsSUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLGVBQUEsRUFBQSxZQUFBO0FBQUEsS0FBQSxPQUFBLENBQUEsWUFBQTtBQUFBLEdBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxZQUFBO0FBQUEsT0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsT0FBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxTQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsWUFBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsV0FBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsT0FBQSxVQUFBLENBQUEsWUFBQTtBQUFBLE9BQUEsT0FBQSxDQUFBLFlBQUE7QUFBQSxLQUFBLEVBQUEsRUFBQSxTQUFBLENBQUE7QUFBQSxJQUFBLENBQUEsRUFBQSxFQUFBLDBCQUFBLEdBQUEsSUFBQSxHQUFBLFFBQUEsQ0FBQSxFQUFBLFNBQUEsRUFBQSxHQUFBLENBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxFQUFBLENBQUEsWUFBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsV0FBQSxZQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsRUFBQSxFQUFBLENBQUEsVUFBQSxFQUFBLFlBQUE7QUFBQSxRQUFBLEVBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxZQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLFlBQUE7QUFBQSxTQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxFQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUE7QUFBQSxLQUFBLENBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxRQUFBLENBQUE7QUFBQSxRQUFBLENBQUE7QUFBQSxRQUFBLENBQUE7QUFBQSxRQUFBLElBQUEsRUFBQSxNQUFBLEVBQUE7QUFBQSxRQUFBLElBQUEsRUFBQSxRQUFBLEVBQUE7QUFBQSxRQUFBLEtBQUEsRUFBQSxNQUFBLEdBQUEsUUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBLENBQUE7QUFBQSxRQUFBLElBQUEsRUFBQSxVQUFBLEVBQUE7QUFBQSxRQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsU0FBQSxLQUFBLEVBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBO0FBQUEsYUFBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsR0FBQSxFQUFBLFdBQUEsRUFBQSxHQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsRUFBQSxTQUFBLEVBQUEsRUFBQSxXQUFBLENBQUEsTUFBQSxFQUFBLFdBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxDQUFBLFFBQUEsQ0FBQSxFQUFBLEVBQUEsU0FBQSxHQUFBLEtBQUEsT0FBQTtBQUFBLFdBQUEsRUFBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsS0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsTUFBQSxDQUFBLENBQUEsTUFBQSxLQUFBLFFBQUE7QUFBQSxXQUFBLEVBQUEsSUFBQSxHQUFBLEtBQUEsS0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLE1BQUEsSUFBQSxJQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLElBQUEsRUFBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxJQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUEsS0FBQSxNQUFBLENBQUE7QUFBQSxXQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsSUFBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO0FBQUEsS0FBQSxNQUFBLFFBQUEsY0FBQSxFQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsSUFBQSxjQUFBLEVBQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsS0FBQSxJQUFBLEVBQUEsR0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsU0FBQSxHQUFBLEtBQUEsT0FBQTtBQUFBLFdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxNQUFBLEdBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxLQUFBLFFBQUEsQ0FBQSxLQUFBLE1BQUEsQ0FBQTtBQUFBLFdBQUEsRUFBQSxNQUFBLEdBQUEsVUFBQSxLQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsVUFBQSxTQUFBLENBQUEsS0FBQSxDQUFBLGlCQUFBLEtBQUEsT0FBQSxFQUFBLEdBQUEsQ0FBQSxLQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLFNBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsUUFBQSxJQUFBLGNBQUEsRUFBQSxHQUFBLENBQUEsVUFBQSxDQUFBLElBQUEsY0FBQSxFQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsR0FBQSxDQUFBLEVBQUEsRUFBQSxNQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsSUFBQSxLQUFBLEVBQUEsTUFBQSxHQUFBLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxHQUFBLFVBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxHQUFBLEdBQUEsQ0FBQSxTQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsRUFBQSxJQUFBLEdBQUEsS0FBQSxNQUFBO0FBQUEsVUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLGlCQUFBLENBQUEsRUFBQSxFQUFBLE9BQUEsQ0FBQSxFQUFBLE9BQUEsUUFBQSxFQUFBLFFBQUEsUUFBQSxFQUFBLEVBQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsWUFBQTtBQUFBLFdBQUEsQ0FBQSxDQUFBO0FBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxLQUFBLE9BQUE7QUFBQSxVQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsUUFBQSxDQUFBLEVBQUEsaUJBQUEsQ0FBQSxFQUFBLEVBQUEsT0FBQSxDQUFBLEVBQUEsUUFBQSxRQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLE1BQUEsRUFBQSxZQUFBO0FBQUEsV0FBQSxDQUFBLENBQUE7QUFBQSxPQUFBLENBQUEsQ0FBQSxNQUFBLEtBQUEsTUFBQTtBQUFBLFVBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxZQUFBLEVBQUE7QUFBQSxXQUFBLENBQUEsQ0FBQSxJQUFBLFVBQUEsRUFBQSxLQUFBLEdBQUEsRUFBQSxHQUFBLFVBQUEsRUFBQSxLQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsS0FBQSxDQUFBLEVBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsWUFBQTtBQUFBLFVBQUEsUUFBQSxDQUFBLEVBQUEsaUJBQUEsR0FBQSxFQUFBLE1BQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLE1BQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxZQUFBO0FBQUEsYUFBQSxDQUFBLENBQUE7QUFBQSxTQUFBLENBQUE7QUFBQSxRQUFBLENBQUE7QUFBQSxPQUFBLE1BQUEsRUFBQSxRQUFBLENBQUEsRUFBQSxpQkFBQSxHQUFBLEVBQUEsTUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsTUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLFlBQUE7QUFBQSxXQUFBLENBQUEsQ0FBQTtBQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUEsS0FBQSxTQUFBLENBQUE7QUFBQSxRQUFBLFFBQUEsQ0FBQSxFQUFBLGlCQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsSUFBQSxFQUFBLEVBQUEsQ0FBQSxZQUFBLEVBQUEsWUFBQTtBQUFBLFdBQUEsRUFBQSxFQUFBLENBQUEsVUFBQSxLQUFBLEVBQUEsSUFBQSxJQUFBLEVBQUEsV0FBQSxDQUFBLEVBQUEsaUJBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxpQkFBQSxFQUFBLFdBQUEsQ0FBQSxFQUFBLGlCQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBQSxFQUFBLEVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7QUFBQSxXQUFBLEVBQUEsRUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxZQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLENBQUE7QUFBQSxJQUFBLENBQUEsRUFBQSxFQUFBLDBCQUFBLEdBQUEsUUFBQSxDQUFBLFFBQUEsRUFBQSxHQUFBLENBQUEsUUFBQSxFQUFBLFNBQUEsRUFBQSxFQUFBLENBQUEsZ0JBQUEsRUFBQSxVQUFBLENBQUEsRUFBQTtBQUFBLFVBQUEsRUFBQSxjQUFBLElBQUEsRUFBQSxlQUFBLEVBQUEsRUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxJQUFBLENBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsVUFBQSxJQUFBLE9BQUEsVUFBQSxDQUFBLFlBQUE7QUFBQSxPQUFBLE9BQUEsQ0FBQSxVQUFBO0FBQUEsS0FBQSxFQUFBLEVBQUEsVUFBQSxDQUFBO0FBQUEsSUFBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsV0FBQSxZQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsQ0FBQTtBQUFBLEdBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsRUFBQSxFQUFBLENBQUEsZ0JBQUEsRUFBQSxVQUFBLENBQUEsRUFBQTtBQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsY0FBQSxFQUFBO0FBQUEsR0FBQSxDQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsSUFBQSxFQUFBLEdBQUEsQ0FBQSxhQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsQ0FBQSxZQUFBO0FBQUEsT0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsT0FBQSxJQUFBLEVBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLE9BQUEsSUFBQSxFQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUE7QUFBQSxPQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsZ0JBQUEsRUFBQSxVQUFBLENBQUEsRUFBQTtBQUFBLFNBQUEsRUFBQSxNQUFBLElBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxjQUFBLEVBQUEsR0FBQSxFQUFBLGVBQUEsRUFBQTtBQUFBLElBQUEsR0FBQSxFQUFBLE1BQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxFQUFBLE1BQUEsSUFBQSxFQUFBLEVBQUEsQ0FBQSxnQkFBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxlQUFBLEdBQUEsRUFBQSxlQUFBLEVBQUE7QUFBQSxJQUFBLENBQUE7QUFBQSxHQUFBLENBQUEsRUFBQSxFQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLFlBQUE7QUFBQSxPQUFBLENBQUE7QUFBQSxPQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7QUFBQSxPQUFBLElBQUEsRUFBQSxRQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7QUFBQSxNQUFBLE1BQUEsS0FBQSxFQUFBLGFBQUEsS0FBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEdBQUEsUUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxFQUFBLE1BQUEsR0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxJQUFBLElBQUEsRUFBQSxVQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUEsRUFBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUE7QUFBQSxPQUFBLEdBQUEsQ0FBQSxTQUFBLEVBQUEsR0FBQSxHQUFBLEVBQUEsa0JBQUEsSUFBQSxFQUFBLFFBQUEsQ0FBQSxFQUFBLGtCQUFBLElBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsV0FBQSxDQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxZQUFBO0FBQUEsS0FBQSxPQUFBLENBQUEsZUFBQTtBQUFBLEdBQUEsRUFBQSxFQUFBLENBQUEsVUFBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO0FBQUEsUUFBQSxNQUFBLEVBQUEsT0FBQSxLQUFBLEVBQUEsY0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLGVBQUEsQ0FBQTtBQUFBLEdBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLGdCQUFBLEVBQUEsWUFBQTtBQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsZUFBQSxDQUFBO0FBQUEsR0FBQSxDQUFBO0FBQUEsRUFBQTtBQUFBLENBQUEsQ0FBQSxNQUFBLENBQUE7QUNEQSxDQUFBLFVBQUEsQ0FBQSxFQUFBOztBQUVBOzs7O0FBSUEsR0FBQSxFQUFBLENBQUEsT0FBQSxHQUFBLFlBQUE7O0FBRUEsTUFBQSxRQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsTUFDQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEdBQUEsQ0FEQTtBQUFBLE1BRUEsSUFBQSxFQUZBOztBQUlBLEtBQUEsSUFBQSxDQUFBLFlBQUE7O0FBRUEsT0FBQSxRQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsT0FDQSxTQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLENBQUEsQ0FEQTtBQUFBLE9BRUEsT0FBQSxNQUFBLElBQUEsQ0FBQSxNQUFBLENBRkE7QUFBQSxPQUdBLFNBQUEsTUFBQSxJQUFBLENBQUEsUUFBQSxDQUhBOztBQUtBLEtBQUEsSUFBQSxDQUNBLFFBQ0Esb0JBREEsR0FDQSxNQURBLEdBQ0EsR0FEQSxJQUVBLE9BQUEsTUFBQSxLQUFBLFdBQUEsSUFBQSxVQUFBLEVBQUEsR0FBQSxjQUFBLE1BQUEsR0FBQSxHQUFBLEdBQUEsRUFGQSxLQUdBLE9BQUEsSUFBQSxLQUFBLFdBQUEsSUFBQSxRQUFBLEVBQUEsR0FBQSxZQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsRUFIQSxJQUlBLEdBSkEsR0FLQSxzQkFMQSxHQUtBLE1BTEEsR0FLQSxXQUxBLEdBTUEsTUFBQSxJQUFBLEVBTkEsR0FPQSxNQVJBO0FBV0EsR0FsQkE7O0FBb0JBLFNBQUEsRUFBQSxJQUFBLENBQUEsRUFBQSxDQUFBO0FBRUEsRUE1QkE7O0FBOEJBOzs7OztBQUtBLEdBQUEsRUFBQSxDQUFBLEtBQUEsR0FBQSxVQUFBLFVBQUEsRUFBQTs7QUFFQTtBQUNBLE1BQUEsS0FBQSxNQUFBLElBQUEsQ0FBQSxFQUNBLE9BQUEsS0FBQTs7QUFFQTtBQUNBLE1BQUEsS0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBOztBQUVBLFFBQUEsSUFBQSxJQUFBLENBQUEsRUFBQSxJQUFBLEtBQUEsTUFBQSxFQUFBLEdBQUE7QUFDQSxNQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBLFVBQUE7QUFEQSxJQUdBLE9BQUEsS0FBQTtBQUVBOztBQUVBO0FBQ0EsTUFBQSxRQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsTUFDQSxRQUFBLEVBQUEsTUFBQSxDQURBO0FBQUEsTUFFQSxVQUFBLEVBQUEsTUFBQSxDQUZBO0FBQUEsTUFHQSxLQUFBLE1BQUEsSUFBQSxDQUFBLElBQUEsQ0FIQTtBQUFBLE1BSUEsTUFKQTs7QUFNQTtBQUNBLFdBQUEsRUFBQSxNQUFBLENBQUE7O0FBRUE7QUFDQSxVQUFBLENBSEE7O0FBS0E7QUFDQSxnQkFBQSxLQU5BOztBQVFBO0FBQ0EsaUJBQUEsS0FUQTs7QUFXQTtBQUNBLGdCQUFBLEtBWkE7O0FBY0E7QUFDQSxnQkFBQSxLQWZBOztBQWlCQTtBQUNBLGVBQUEsS0FsQkE7O0FBb0JBO0FBQ0EsU0FBQSxJQXJCQTs7QUF1QkE7QUFDQSxXQUFBLEtBeEJBOztBQTBCQTtBQUNBLGlCQUFBOztBQTNCQSxHQUFBLEVBNkJBLFVBN0JBLENBQUE7O0FBK0JBO0FBQ0EsTUFBQSxPQUFBLE9BQUEsTUFBQSxJQUFBLFFBQUEsRUFDQSxPQUFBLE1BQUEsR0FBQSxFQUFBLE9BQUEsTUFBQSxDQUFBOztBQUVBOztBQUVBO0FBQ0EsUUFBQSxLQUFBLEdBQUEsVUFBQSxLQUFBLEVBQUE7O0FBRUE7QUFDQSxPQUFBLENBQUEsT0FBQSxNQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsWUFBQSxDQUFBLEVBQ0E7O0FBRUE7QUFDQSxPQUFBLEtBQUEsRUFBQTs7QUFFQSxVQUFBLGNBQUE7QUFDQSxVQUFBLGVBQUE7QUFFQTs7QUFFQTtBQUNBLFVBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLFlBQUE7O0FBRUE7QUFDQSxVQUFBLFVBQUEsQ0FBQSxZQUFBOztBQUVBO0FBQ0EsUUFBQSxPQUFBLFdBQUEsRUFDQSxNQUFBLFNBQUEsQ0FBQSxDQUFBOztBQUVBO0FBQ0EsUUFBQSxPQUFBLFVBQUEsRUFDQSxNQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxDQUFBLFlBQUE7QUFDQSxVQUFBLEtBQUE7QUFDQSxLQUZBO0FBSUEsSUFaQSxFQVlBLE9BQUEsS0FaQTtBQWNBLEdBaENBOztBQWtDQTtBQUNBLFFBQ0EsR0FEQSxDQUNBLG9CQURBLEVBQ0EsMEJBREEsRUFFQSxHQUZBLENBRUEsNEJBRkEsRUFFQSxPQUZBOztBQUlBO0FBQ0EsTUFBQSxPQUFBLFdBQUEsRUFBQTs7QUFFQSxTQUFBLElBQUEsQ0FBQSxHQUFBLEVBQ0EsR0FEQSxDQUNBLDZCQURBLEVBQ0EsZUFEQTs7QUFHQSxTQUNBLEVBREEsQ0FDQSxPQURBLEVBQ0EsR0FEQSxFQUNBLFVBQUEsS0FBQSxFQUFBOztBQUVBLFFBQUEsS0FBQSxFQUFBLElBQUEsQ0FBQTtBQUFBLFFBQ0EsT0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLENBREE7QUFBQSxRQUVBLFNBQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUZBOztBQUlBLFFBQUEsQ0FBQSxJQUFBLElBQUEsUUFBQSxHQUFBLElBQUEsUUFBQSxFQUFBLElBQUEsUUFBQSxNQUFBLEVBQUEsRUFDQTs7QUFFQTtBQUNBLFVBQUEsY0FBQTtBQUNBLFVBQUEsZUFBQTs7QUFFQTtBQUNBLFVBQUEsS0FBQTs7QUFFQTtBQUNBLFdBQUEsVUFBQSxDQUFBLFlBQUE7O0FBRUEsU0FBQSxVQUFBLFFBQUEsRUFDQSxPQUFBLElBQUEsQ0FBQSxJQUFBLEVBREEsS0FHQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEdBQUEsSUFBQTtBQUVBLEtBUEEsRUFPQSxPQUFBLEtBQUEsR0FBQSxFQVBBO0FBU0EsSUEzQkE7QUE2QkE7O0FBRUE7QUFDQSxRQUFBLEVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUE7O0FBRUEsU0FBQSxTQUFBLEdBQUEsTUFBQSxhQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBO0FBQ0EsU0FBQSxTQUFBLEdBQUEsTUFBQSxhQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBO0FBRUEsR0FMQTs7QUFPQSxRQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUE7O0FBRUEsT0FBQSxNQUFBLFNBQUEsS0FBQSxJQUFBLElBQ0EsTUFBQSxTQUFBLEtBQUEsSUFEQSxFQUVBOztBQUVBLE9BQUEsUUFBQSxNQUFBLFNBQUEsR0FBQSxNQUFBLGFBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLEtBQUE7QUFBQSxPQUNBLFFBQUEsTUFBQSxTQUFBLEdBQUEsTUFBQSxhQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxLQURBO0FBQUEsT0FFQSxLQUFBLE1BQUEsV0FBQSxFQUZBO0FBQUEsT0FHQSxLQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxZQUFBLEdBQUEsTUFBQSxTQUFBLEVBSEE7O0FBS0E7QUFDQSxPQUFBLE9BQUEsV0FBQSxFQUFBOztBQUVBLFFBQUEsU0FBQSxLQUFBO0FBQUEsUUFDQSxXQUFBLEVBREE7QUFBQSxRQUVBLFFBQUEsRUFGQTs7QUFJQSxZQUFBLE9BQUEsSUFBQTs7QUFFQSxVQUFBLE1BQUE7QUFDQSxlQUFBLFFBQUEsUUFBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEsUUFBQSxJQUFBLFFBQUEsS0FBQTtBQUNBOztBQUVBLFVBQUEsT0FBQTtBQUNBLGVBQUEsUUFBQSxRQUFBLElBQUEsUUFBQSxDQUFBLENBQUEsR0FBQSxRQUFBLElBQUEsUUFBQSxDQUFBLENBQUEsR0FBQSxLQUFBO0FBQ0E7O0FBRUEsVUFBQSxLQUFBO0FBQ0EsZUFBQSxRQUFBLFFBQUEsSUFBQSxRQUFBLENBQUEsQ0FBQSxHQUFBLFFBQUEsSUFBQSxRQUFBLEtBQUE7QUFDQTs7QUFFQSxVQUFBLFFBQUE7QUFDQSxlQUFBLFFBQUEsUUFBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEsUUFBQSxJQUFBLFFBQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQTtBQUNBOztBQUVBO0FBQ0E7O0FBbkJBOztBQXVCQSxRQUFBLE1BQUEsRUFBQTs7QUFFQSxXQUFBLFNBQUEsR0FBQSxJQUFBO0FBQ0EsV0FBQSxTQUFBLEdBQUEsSUFBQTtBQUNBLFdBQUEsS0FBQTs7QUFFQSxZQUFBLEtBQUE7QUFFQTtBQUVBOztBQUVBO0FBQ0EsT0FBQSxNQUFBLFNBQUEsS0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLElBQ0EsS0FBQSxLQUFBLENBQUEsSUFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FEQSxFQUNBOztBQUVBLFVBQUEsY0FBQTtBQUNBLFVBQUEsZUFBQTtBQUVBO0FBRUEsR0E5REE7O0FBZ0VBO0FBQ0EsUUFBQSxFQUFBLENBQUEscUNBQUEsRUFBQSxVQUFBLEtBQUEsRUFBQTtBQUNBLFNBQUEsZUFBQTtBQUNBLEdBRkE7O0FBSUE7QUFDQSxRQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsY0FBQSxFQUFBLEdBQUEsSUFBQSxFQUFBLFVBQUEsS0FBQSxFQUFBOztBQUVBLFNBQUEsY0FBQTtBQUNBLFNBQUEsZUFBQTs7QUFFQSxVQUFBLE1BQUEsQ0FBQSxXQUFBLENBQUEsT0FBQSxZQUFBO0FBRUEsR0FQQTs7QUFTQTs7QUFFQTtBQUNBLFFBQUEsRUFBQSxDQUFBLGdCQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUE7QUFDQSxTQUFBLEtBQUEsQ0FBQSxLQUFBO0FBQ0EsR0FGQTs7QUFJQTtBQUNBLFFBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxjQUFBLEVBQUEsR0FBQSxJQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUE7O0FBRUEsU0FBQSxjQUFBO0FBQ0EsU0FBQSxlQUFBOztBQUVBLFVBQUEsTUFBQSxDQUFBLFdBQUEsQ0FBQSxPQUFBLFlBQUE7QUFFQSxHQVBBOztBQVNBOztBQUVBO0FBQ0EsTUFBQSxPQUFBLFlBQUEsRUFDQSxRQUFBLEVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUE7O0FBRUEsT0FBQSxNQUFBLE9BQUEsSUFBQSxFQUFBLEVBQ0EsTUFBQSxLQUFBLENBQUEsS0FBQTtBQUVBLEdBTEE7O0FBT0EsU0FBQSxLQUFBO0FBRUEsRUEvUEE7O0FBaVFBOzs7O0FBSUEsR0FBQSxFQUFBLENBQUEsV0FBQSxHQUFBLFlBQUE7O0FBRUE7QUFDQSxNQUFBLE9BQUEsU0FBQSxhQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsV0FBQSxJQUFBLFdBQUEsRUFDQSxPQUFBLEVBQUEsSUFBQSxDQUFBOztBQUVBO0FBQ0EsTUFBQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEVBQ0EsT0FBQSxLQUFBOztBQUVBO0FBQ0EsTUFBQSxLQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7O0FBRUEsUUFBQSxJQUFBLElBQUEsQ0FBQSxFQUFBLElBQUEsS0FBQSxNQUFBLEVBQUEsR0FBQTtBQUNBLE1BQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxXQUFBO0FBREEsSUFHQSxPQUFBLEtBQUE7QUFFQTs7QUFFQTtBQUNBLE1BQUEsUUFBQSxFQUFBLElBQUEsQ0FBQTs7QUFFQTtBQUNBLFFBQUEsSUFBQSxDQUFBLDJCQUFBLEVBQ0EsSUFEQSxDQUNBLFlBQUE7O0FBRUEsT0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBOztBQUVBLE9BQUEsRUFBQSxHQUFBLE1BQUEsRUFBQSxJQUNBLEVBQUEsR0FBQSxNQUFBLEVBQUEsSUFBQSxDQUFBLGFBQUEsQ0FEQSxFQUVBLEVBQ0EsUUFEQSxDQUNBLHNCQURBLEVBRUEsR0FGQSxDQUVBLEVBQUEsSUFBQSxDQUFBLGFBQUEsQ0FGQTtBQUlBLEdBWEEsRUFZQSxFQVpBLENBWUEsTUFaQSxFQVlBLFlBQUE7O0FBRUEsT0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBOztBQUVBLE9BQUEsRUFBQSxJQUFBLENBQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQSxrQkFBQSxDQUFBLEVBQ0E7O0FBRUEsT0FBQSxFQUFBLEdBQUEsTUFBQSxFQUFBLEVBQ0EsRUFDQSxRQURBLENBQ0Esc0JBREEsRUFFQSxHQUZBLENBRUEsRUFBQSxJQUFBLENBQUEsYUFBQSxDQUZBO0FBSUEsR0F4QkEsRUF5QkEsRUF6QkEsQ0F5QkEsT0F6QkEsRUF5QkEsWUFBQTs7QUFFQSxPQUFBLElBQUEsRUFBQSxJQUFBLENBQUE7O0FBRUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLGtCQUFBLENBQUEsRUFDQTs7QUFFQSxPQUFBLEVBQUEsR0FBQSxNQUFBLEVBQUEsSUFBQSxDQUFBLGFBQUEsQ0FBQSxFQUNBLEVBQ0EsV0FEQSxDQUNBLHNCQURBLEVBRUEsR0FGQSxDQUVBLEVBRkE7QUFJQSxHQXJDQTs7QUF1Q0E7QUFDQSxRQUFBLElBQUEsQ0FBQSxzQkFBQSxFQUNBLElBREEsQ0FDQSxZQUFBOztBQUVBLE9BQUEsSUFBQSxFQUFBLElBQUEsQ0FBQTtBQUNBLE9BQUEsSUFBQSxFQUNBLEVBQUEsT0FBQSxFQUNBLE1BREEsQ0FDQSxFQUFBLEtBQUEsRUFEQSxFQUVBLE1BRkEsR0FHQSxJQUhBLEdBSUEsT0FKQSxDQUlBLGtCQUpBLEVBSUEsYUFKQSxFQUtBLE9BTEEsQ0FLQSxnQkFMQSxFQUtBLFdBTEEsQ0FEQSxDQUFBOztBQVNBLE9BQUEsRUFBQSxJQUFBLENBQUEsSUFBQSxLQUFBLEVBQUEsRUFDQSxFQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsSUFBQSxJQUFBLGlCQUFBOztBQUVBLE9BQUEsRUFBQSxJQUFBLENBQUEsTUFBQSxLQUFBLEVBQUEsRUFDQSxFQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsTUFBQSxJQUFBLGlCQUFBOztBQUVBLEtBQUEsUUFBQSxDQUFBLHNCQUFBLEVBQ0EsR0FEQSxDQUNBLEVBQUEsSUFBQSxDQUFBLGFBQUEsQ0FEQSxFQUNBLFdBREEsQ0FDQSxDQURBOztBQUdBLE9BQUEsRUFBQSxHQUFBLE1BQUEsRUFBQSxFQUNBLEVBQUEsSUFBQSxHQURBLEtBR0EsRUFBQSxJQUFBOztBQUVBLEtBQ0EsRUFEQSxDQUNBLE1BREEsRUFDQSxVQUFBLEtBQUEsRUFBQTs7QUFFQSxVQUFBLGNBQUE7O0FBRUEsUUFBQSxJQUFBLEVBQUEsTUFBQSxHQUFBLElBQUEsQ0FBQSxnQkFBQSxFQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsR0FBQSxrQkFBQSxDQUFBOztBQUVBLFFBQUEsRUFBQSxHQUFBLE1BQUEsRUFBQSxFQUFBOztBQUVBLE9BQUEsSUFBQTtBQUNBLE9BQUEsSUFBQTtBQUVBO0FBRUEsSUFkQTs7QUFnQkEsS0FDQSxFQURBLENBQ0EsT0FEQSxFQUNBLFVBQUEsS0FBQSxFQUFBOztBQUVBLFVBQUEsY0FBQTs7QUFFQSxRQUFBLElBQUEsRUFBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLGdCQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxPQUFBLENBQUEsaUJB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QTs7QUFRQTtBQUNBLEdBQ0Esd0JBQ0EsT0FEQSxHQUVBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFGQSxHQUdBLFFBSEEsR0FJQSxRQUxBLEVBT0EsUUFQQSxDQU9BLEtBUEEsRUFRQSxLQVJBLENBUUE7QUFDQSxTQUFBLEdBREE7QUFFQSxlQUFBLElBRkE7QUFHQSxlQUFBLElBSEE7QUFJQSxlQUFBLElBSkE7QUFLQSxjQUFBLElBTEE7QUFNQSxRQUFBLE1BTkE7QUFPQSxVQUFBLEtBUEE7QUFRQSxnQkFBQTtBQVJBLEVBUkE7QUFtQkEsQ0EzREEsRUEyREEsTUEzREEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqcXVlcnkuZHJvcG90cm9uLmpzIHYxLjQuMyB8IChjKSBAYWpsa24gfCBnaXRodWIuY29tL2FqbGtuL2pxdWVyeS5kcm9wb3Ryb24gfCBNSVQgbGljZW5zZWQgKi9cclxuIWZ1bmN0aW9uKGUpe2UuZm4uZGlzYWJsZVNlbGVjdGlvbl9kcm9wb3Ryb249ZnVuY3Rpb24oKXtyZXR1cm4gZSh0aGlzKS5jc3MoXCJ1c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCIta2h0bWwtdXNlci1zZWxlY3RcIixcIm5vbmVcIikuY3NzKFwiLW1vei11c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCItby11c2VyLXNlbGVjdFwiLFwibm9uZVwiKS5jc3MoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsXCJub25lXCIpfSxlLmZuLmRyb3BvdHJvbj1mdW5jdGlvbih0KXtpZigwPT10aGlzLmxlbmd0aClyZXR1cm4gZSh0aGlzKTtpZih0aGlzLmxlbmd0aD4xKWZvcih2YXIgbz0wO288dGhpcy5sZW5ndGg7bysrKWUodGhpc1tvXSkuZHJvcG90cm9uKHQpO3JldHVybiBlLmRyb3BvdHJvbihlLmV4dGVuZCh7c2VsZWN0b3JQYXJlbnQ6ZSh0aGlzKX0sdCkpfSxlLmRyb3BvdHJvbj1mdW5jdGlvbih0KXt2YXIgbz1lLmV4dGVuZCh7c2VsZWN0b3JQYXJlbnQ6bnVsbCxiYXNlWkluZGV4OjFlMyxtZW51Q2xhc3M6XCJkcm9wb3Ryb25cIixleHBhbmRNb2RlOlwiaG92ZXJcIixob3ZlckRlbGF5OjE1MCxoaWRlRGVsYXk6MjUwLG9wZW5lckNsYXNzOlwib3BlbmVyXCIsb3BlbmVyQWN0aXZlQ2xhc3M6XCJhY3RpdmVcIixzdWJtZW51Q2xhc3NQcmVmaXg6XCJsZXZlbC1cIixtb2RlOlwiZmFkZVwiLHNwZWVkOlwiZmFzdFwiLGVhc2luZzpcInN3aW5nXCIsYWxpZ25tZW50OlwibGVmdFwiLG9mZnNldFg6MCxvZmZzZXRZOjAsZ2xvYmFsT2Zmc2V0WTowLElFT2Zmc2V0WDowLElFT2Zmc2V0WTowLG5vT3BlbmVyRmFkZTohMCxkZXRhY2g6ITAsY2xvbmVPbkRldGFjaDohMH0sdCksbj1vLnNlbGVjdG9yUGFyZW50LHM9bi5maW5kKFwidWxcIiksaT1lKFwiYm9keVwiKSxhPWUoXCJib2R5LGh0bWxcIiksbD1lKHdpbmRvdykscj0hMSxkPW51bGwsYz1udWxsO24ub24oXCJkb0NvbGxhcHNlQWxsXCIsZnVuY3Rpb24oKXtzLnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpfSkscy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9ZSh0aGlzKSxuPXQucGFyZW50KCk7by5oaWRlRGVsYXk+MCYmdC5hZGQobikub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oZSl7d2luZG93LmNsZWFyVGltZW91dChjKSxjPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC50cmlnZ2VyKFwiZG9Db2xsYXBzZVwiKX0sby5oaWRlRGVsYXkpfSksdC5kaXNhYmxlU2VsZWN0aW9uX2Ryb3BvdHJvbigpLmhpZGUoKS5hZGRDbGFzcyhvLm1lbnVDbGFzcykuY3NzKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpLm9uKFwibW91c2VlbnRlclwiLGZ1bmN0aW9uKGUpe3dpbmRvdy5jbGVhclRpbWVvdXQoYyl9KS5vbihcImRvRXhwYW5kXCIsZnVuY3Rpb24oKXtpZih0LmlzKFwiOnZpc2libGVcIikpcmV0dXJuITE7d2luZG93LmNsZWFyVGltZW91dChjKSxzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpO2UuY29udGFpbnModC5nZXQoMCksbi5nZXQoMCkpfHx0LnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpfSk7dmFyIGksYSxkLGYsdT1uLm9mZnNldCgpLHA9bi5wb3NpdGlvbigpLGg9KG4ucGFyZW50KCkucG9zaXRpb24oKSxuLm91dGVyV2lkdGgoKSksZz10Lm91dGVyV2lkdGgoKSx2PXQuY3NzKFwiei1pbmRleFwiKT09by5iYXNlWkluZGV4O2lmKHYpe3N3aXRjaChpPW8uZGV0YWNoP3U6cCxmPWkudG9wK24ub3V0ZXJIZWlnaHQoKStvLmdsb2JhbE9mZnNldFksYT1vLmFsaWdubWVudCx0LnJlbW92ZUNsYXNzKFwibGVmdFwiKS5yZW1vdmVDbGFzcyhcInJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwiY2VudGVyXCIpLG8uYWxpZ25tZW50KXtjYXNlXCJyaWdodFwiOmQ9aS5sZWZ0LWcraCwwPmQmJihkPWkubGVmdCxhPVwibGVmdFwiKTticmVhaztjYXNlXCJjZW50ZXJcIjpkPWkubGVmdC1NYXRoLmZsb29yKChnLWgpLzIpLDA+ZD8oZD1pLmxlZnQsYT1cImxlZnRcIik6ZCtnPmwud2lkdGgoKSYmKGQ9aS5sZWZ0LWcraCxhPVwicmlnaHRcIik7YnJlYWs7Y2FzZVwibGVmdFwiOmRlZmF1bHQ6ZD1pLmxlZnQsZCtnPmwud2lkdGgoKSYmKGQ9aS5sZWZ0LWcraCxhPVwicmlnaHRcIil9dC5hZGRDbGFzcyhhKX1lbHNlIHN3aXRjaChcInJlbGF0aXZlXCI9PW4uY3NzKFwicG9zaXRpb25cIil8fFwiYWJzb2x1dGVcIj09bi5jc3MoXCJwb3NpdGlvblwiKT8oZj1vLm9mZnNldFksZD0tMSpwLmxlZnQpOihmPXAudG9wK28ub2Zmc2V0WSxkPTApLG8uYWxpZ25tZW50KXtjYXNlXCJyaWdodFwiOmQrPS0xKm4ucGFyZW50KCkub3V0ZXJXaWR0aCgpK28ub2Zmc2V0WDticmVhaztjYXNlXCJjZW50ZXJcIjpjYXNlXCJsZWZ0XCI6ZGVmYXVsdDpkKz1uLnBhcmVudCgpLm91dGVyV2lkdGgoKStvLm9mZnNldFh9bmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTVNJRSAoWzAtOV0rKVxcLi8pJiZSZWdFeHAuJDE8OCYmKGQrPW8uSUVPZmZzZXRYLGYrPW8uSUVPZmZzZXRZKSx0LmNzcyhcImxlZnRcIixkK1wicHhcIikuY3NzKFwidG9wXCIsZitcInB4XCIpLmNzcyhcIm9wYWNpdHlcIixcIjAuMDFcIikuc2hvdygpO3ZhciBDPSExO3N3aXRjaChkPVwicmVsYXRpdmVcIj09bi5jc3MoXCJwb3NpdGlvblwiKXx8XCJhYnNvbHV0ZVwiPT1uLmNzcyhcInBvc2l0aW9uXCIpPy0xKnAubGVmdDowLHQub2Zmc2V0KCkubGVmdDwwPyhkKz1uLnBhcmVudCgpLm91dGVyV2lkdGgoKS1vLm9mZnNldFgsQz0hMCk6dC5vZmZzZXQoKS5sZWZ0K2c+bC53aWR0aCgpJiYoZCs9LTEqbi5wYXJlbnQoKS5vdXRlcldpZHRoKCktby5vZmZzZXRYLEM9ITApLEMmJnQuY3NzKFwibGVmdFwiLGQrXCJweFwiKSx0LmhpZGUoKS5jc3MoXCJvcGFjaXR5XCIsXCIxXCIpLG8ubW9kZSl7Y2FzZVwiem9vbVwiOnI9ITAsbi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSx0LmFuaW1hdGUoe3dpZHRoOlwidG9nZ2xlXCIsaGVpZ2h0OlwidG9nZ2xlXCJ9LG8uc3BlZWQsby5lYXNpbmcsZnVuY3Rpb24oKXtyPSExfSk7YnJlYWs7Y2FzZVwic2xpZGVcIjpyPSEwLG4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5hbmltYXRlKHtoZWlnaHQ6XCJ0b2dnbGVcIn0sby5zcGVlZCxvLmVhc2luZyxmdW5jdGlvbigpe3I9ITF9KTticmVhaztjYXNlXCJmYWRlXCI6aWYocj0hMCx2JiYhby5ub09wZW5lckZhZGUpe3ZhciBDO0M9XCJzbG93XCI9PW8uc3BlZWQ/ODA6XCJmYXN0XCI9PW8uc3BlZWQ/NDA6TWF0aC5mbG9vcihvLnNwZWVkLzIpLG4uZmFkZVRvKEMsLjAxLGZ1bmN0aW9uKCl7bi5hZGRDbGFzcyhvLm9wZW5lckFjdGl2ZUNsYXNzKSxuLmZhZGVUbyhvLnNwZWVkLDEpLHQuZmFkZUluKG8uc3BlZWQsZnVuY3Rpb24oKXtyPSExfSl9KX1lbHNlIG4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksbi5mYWRlVG8oby5zcGVlZCwxKSx0LmZhZGVJbihvLnNwZWVkLGZ1bmN0aW9uKCl7cj0hMX0pO2JyZWFrO2Nhc2VcImluc3RhbnRcIjpkZWZhdWx0Om4uYWRkQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5zaG93KCl9cmV0dXJuITF9KS5vbihcImRvQ29sbGFwc2VcIixmdW5jdGlvbigpe3JldHVybiB0LmlzKFwiOnZpc2libGVcIik/KHQuaGlkZSgpLG4ucmVtb3ZlQ2xhc3Moby5vcGVuZXJBY3RpdmVDbGFzcyksdC5maW5kKFwiLlwiK28ub3BlbmVyQWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKG8ub3BlbmVyQWN0aXZlQ2xhc3MpLHQuZmluZChcInVsXCIpLmhpZGUoKSwhMSk6ITF9KS5vbihcImRvVG9nZ2xlXCIsZnVuY3Rpb24oZSl7cmV0dXJuIHQuaXMoXCI6dmlzaWJsZVwiKT90LnRyaWdnZXIoXCJkb0NvbGxhcHNlXCIpOnQudHJpZ2dlcihcImRvRXhwYW5kXCIpLCExfSksbi5kaXNhYmxlU2VsZWN0aW9uX2Ryb3BvdHJvbigpLmFkZENsYXNzKFwib3BlbmVyXCIpLmNzcyhcImN1cnNvclwiLFwicG9pbnRlclwiKS5vbihcImNsaWNrIHRvdWNoZW5kXCIsZnVuY3Rpb24oZSl7cnx8KGUucHJldmVudERlZmF1bHQoKSxlLnN0b3BQcm9wYWdhdGlvbigpLHQudHJpZ2dlcihcImRvVG9nZ2xlXCIpKX0pLFwiaG92ZXJcIj09by5leHBhbmRNb2RlJiZuLmhvdmVyKGZ1bmN0aW9uKGUpe3J8fChkPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC50cmlnZ2VyKFwiZG9FeHBhbmRcIil9LG8uaG92ZXJEZWxheSkpfSxmdW5jdGlvbihlKXt3aW5kb3cuY2xlYXJUaW1lb3V0KGQpfSl9KSxzLmZpbmQoXCJhXCIpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpLm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbih0KXtyfHxlKHRoaXMpLmF0dHIoXCJocmVmXCIpLmxlbmd0aDwxJiZ0LnByZXZlbnREZWZhdWx0KCl9KSxuLmZpbmQoXCJsaVwiKS5jc3MoXCJ3aGl0ZS1zcGFjZVwiLFwibm93cmFwXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1lKHRoaXMpLG89dC5jaGlsZHJlbihcImFcIikscz10LmNoaWxkcmVuKFwidWxcIiksaT1vLmF0dHIoXCJocmVmXCIpO28ub24oXCJjbGljayB0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpezA9PWkubGVuZ3RofHxcIiNcIj09aT9lLnByZXZlbnREZWZhdWx0KCk6ZS5zdG9wUHJvcGFnYXRpb24oKX0pLG8ubGVuZ3RoPjAmJjA9PXMubGVuZ3RoJiZ0Lm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbihlKXtyfHwobi50cmlnZ2VyKFwiZG9Db2xsYXBzZUFsbFwiKSxlLnN0b3BQcm9wYWdhdGlvbigpKX0pfSksbi5jaGlsZHJlbihcImxpXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgdCxuPWUodGhpcykscz1uLmNoaWxkcmVuKFwidWxcIik7aWYocy5sZW5ndGg+MCl7by5kZXRhY2gmJihvLmNsb25lT25EZXRhY2gmJih0PXMuY2xvbmUoKSx0LmF0dHIoXCJjbGFzc1wiLFwiXCIpLmhpZGUoKS5hcHBlbmRUbyhzLnBhcmVudCgpKSkscy5kZXRhY2goKS5hcHBlbmRUbyhpKSk7Zm9yKHZhciBhPW8uYmFzZVpJbmRleCxsPTEscj1zO3IubGVuZ3RoPjA7bCsrKXIuY3NzKFwiei1pbmRleFwiLGErKyksby5zdWJtZW51Q2xhc3NQcmVmaXgmJnIuYWRkQ2xhc3Moby5zdWJtZW51Q2xhc3NQcmVmaXgrKGEtMS1vLmJhc2VaSW5kZXgpKSxyPXIuZmluZChcIj4gbGkgPiB1bFwiKX19KSxsLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtuLnRyaWdnZXIoXCJkb0NvbGxhcHNlQWxsXCIpfSkub24oXCJrZXlwcmVzc1wiLGZ1bmN0aW9uKGUpe3J8fDI3IT1lLmtleUNvZGV8fChlLnByZXZlbnREZWZhdWx0KCksbi50cmlnZ2VyKFwiZG9Db2xsYXBzZUFsbFwiKSl9KSxhLm9uKFwiY2xpY2sgdG91Y2hlbmRcIixmdW5jdGlvbigpe3J8fG4udHJpZ2dlcihcImRvQ29sbGFwc2VBbGxcIil9KX19KGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24oJCkge1xyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZSBhbiBpbmRlbnRlZCBsaXN0IG9mIGxpbmtzIGZyb20gYSBuYXYuIE1lYW50IGZvciB1c2Ugd2l0aCBwYW5lbCgpLlxyXG5cdCAqIEByZXR1cm4ge2pRdWVyeX0galF1ZXJ5IG9iamVjdC5cclxuXHQgKi9cclxuXHQkLmZuLm5hdkxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXJcdCR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0JGEgPSAkdGhpcy5maW5kKCdhJyksXHJcblx0XHRcdGIgPSBbXTtcclxuXHJcblx0XHQkYS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0dmFyXHQkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0aW5kZW50ID0gTWF0aC5tYXgoMCwgJHRoaXMucGFyZW50cygnbGknKS5sZW5ndGggLSAxKSxcclxuXHRcdFx0XHRocmVmID0gJHRoaXMuYXR0cignaHJlZicpLFxyXG5cdFx0XHRcdHRhcmdldCA9ICR0aGlzLmF0dHIoJ3RhcmdldCcpO1xyXG5cclxuXHRcdFx0Yi5wdXNoKFxyXG5cdFx0XHRcdCc8YSAnICtcclxuXHRcdFx0XHRcdCdjbGFzcz1cImxpbmsgZGVwdGgtJyArIGluZGVudCArICdcIicgK1xyXG5cdFx0XHRcdFx0KCAodHlwZW9mIHRhcmdldCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFyZ2V0ICE9ICcnKSA/ICcgdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIicgOiAnJykgK1xyXG5cdFx0XHRcdFx0KCAodHlwZW9mIGhyZWYgIT09ICd1bmRlZmluZWQnICYmIGhyZWYgIT0gJycpID8gJyBocmVmPVwiJyArIGhyZWYgKyAnXCInIDogJycpICtcclxuXHRcdFx0XHQnPicgK1xyXG5cdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiaW5kZW50LScgKyBpbmRlbnQgKyAnXCI+PC9zcGFuPicgK1xyXG5cdFx0XHRcdFx0JHRoaXMudGV4dCgpICtcclxuXHRcdFx0XHQnPC9hPidcclxuXHRcdFx0KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYi5qb2luKCcnKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGFuZWwtaWZ5IGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IHVzZXJDb25maWcgVXNlciBjb25maWcuXHJcblx0ICogQHJldHVybiB7alF1ZXJ5fSBqUXVlcnkgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdCQuZm4ucGFuZWwgPSBmdW5jdGlvbih1c2VyQ29uZmlnKSB7XHJcblxyXG5cdFx0Ly8gTm8gZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRcdHJldHVybiAkdGhpcztcclxuXHJcblx0XHQvLyBNdWx0aXBsZSBlbGVtZW50cz9cclxuXHRcdFx0aWYgKHRoaXMubGVuZ3RoID4gMSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0JCh0aGlzW2ldKS5wYW5lbCh1c2VyQ29uZmlnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdC8vIFZhcnMuXHJcblx0XHRcdHZhclx0JHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdCRib2R5ID0gJCgnYm9keScpLFxyXG5cdFx0XHRcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHRcdFx0aWQgPSAkdGhpcy5hdHRyKCdpZCcpLFxyXG5cdFx0XHRcdGNvbmZpZztcclxuXHJcblx0XHQvLyBDb25maWcuXHJcblx0XHRcdGNvbmZpZyA9ICQuZXh0ZW5kKHtcclxuXHJcblx0XHRcdFx0Ly8gRGVsYXkuXHJcblx0XHRcdFx0XHRkZWxheTogMCxcclxuXHJcblx0XHRcdFx0Ly8gSGlkZSBwYW5lbCBvbiBsaW5rIGNsaWNrLlxyXG5cdFx0XHRcdFx0aGlkZU9uQ2xpY2s6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHQvLyBIaWRlIHBhbmVsIG9uIGVzY2FwZSBrZXlwcmVzcy5cclxuXHRcdFx0XHRcdGhpZGVPbkVzY2FwZTogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIEhpZGUgcGFuZWwgb24gc3dpcGUuXHJcblx0XHRcdFx0XHRoaWRlT25Td2lwZTogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFJlc2V0IHNjcm9sbCBwb3NpdGlvbiBvbiBoaWRlLlxyXG5cdFx0XHRcdFx0cmVzZXRTY3JvbGw6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHQvLyBSZXNldCBmb3JtcyBvbiBoaWRlLlxyXG5cdFx0XHRcdFx0cmVzZXRGb3JtczogZmFsc2UsXHJcblxyXG5cdFx0XHRcdC8vIFNpZGUgb2Ygdmlld3BvcnQgdGhlIHBhbmVsIHdpbGwgYXBwZWFyLlxyXG5cdFx0XHRcdFx0c2lkZTogbnVsbCxcclxuXHJcblx0XHRcdFx0Ly8gVGFyZ2V0IGVsZW1lbnQgZm9yIFwiY2xhc3NcIi5cclxuXHRcdFx0XHRcdHRhcmdldDogJHRoaXMsXHJcblxyXG5cdFx0XHRcdC8vIENsYXNzIHRvIHRvZ2dsZS5cclxuXHRcdFx0XHRcdHZpc2libGVDbGFzczogJ3Zpc2libGUnXHJcblxyXG5cdFx0XHR9LCB1c2VyQ29uZmlnKTtcclxuXHJcblx0XHRcdC8vIEV4cGFuZCBcInRhcmdldFwiIGlmIGl0J3Mgbm90IGEgalF1ZXJ5IG9iamVjdCBhbHJlYWR5LlxyXG5cdFx0XHRcdGlmICh0eXBlb2YgY29uZmlnLnRhcmdldCAhPSAnalF1ZXJ5JylcclxuXHRcdFx0XHRcdGNvbmZpZy50YXJnZXQgPSAkKGNvbmZpZy50YXJnZXQpO1xyXG5cclxuXHRcdC8vIFBhbmVsLlxyXG5cclxuXHRcdFx0Ly8gTWV0aG9kcy5cclxuXHRcdFx0XHQkdGhpcy5faGlkZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWxyZWFkeSBoaWRkZW4/IEJhaWwuXHJcblx0XHRcdFx0XHRcdGlmICghY29uZmlnLnRhcmdldC5oYXNDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0Ly8gSWYgYW4gZXZlbnQgd2FzIHByb3ZpZGVkLCBjYW5jZWwgaXQuXHJcblx0XHRcdFx0XHRcdGlmIChldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIEhpZGUuXHJcblx0XHRcdFx0XHRcdGNvbmZpZy50YXJnZXQucmVtb3ZlQ2xhc3MoY29uZmlnLnZpc2libGVDbGFzcyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gUG9zdC1oaWRlIHN0dWZmLlxyXG5cdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gUmVzZXQgc2Nyb2xsIHBvc2l0aW9uLlxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpZy5yZXNldFNjcm9sbClcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuc2Nyb2xsVG9wKDApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBSZXNldCBmb3Jtcy5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChjb25maWcucmVzZXRGb3JtcylcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnZm9ybScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5yZXNldCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdH0sIGNvbmZpZy5kZWxheSk7XHJcblxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBWZW5kb3IgZml4ZXMuXHJcblx0XHRcdFx0JHRoaXNcclxuXHRcdFx0XHRcdC5jc3MoJy1tcy1vdmVyZmxvdy1zdHlsZScsICctbXMtYXV0b2hpZGluZy1zY3JvbGxiYXInKVxyXG5cdFx0XHRcdFx0LmNzcygnLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmcnLCAndG91Y2gnKTtcclxuXHJcblx0XHRcdC8vIEhpZGUgb24gY2xpY2suXHJcblx0XHRcdFx0aWYgKGNvbmZpZy5oaWRlT25DbGljaykge1xyXG5cclxuXHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2EnKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCctd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3InLCAncmdiYSgwLDAsMCwwKScpO1xyXG5cclxuXHRcdFx0XHRcdCR0aGlzXHJcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciAkYSA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRcdFx0XHRocmVmID0gJGEuYXR0cignaHJlZicpLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0ID0gJGEuYXR0cigndGFyZ2V0Jyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmICghaHJlZiB8fCBocmVmID09ICcjJyB8fCBocmVmID09ICcnIHx8IGhyZWYgPT0gJyMnICsgaWQpXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIENhbmNlbCBvcmlnaW5hbCBldmVudC5cclxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gSGlkZSBwYW5lbC5cclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLl9oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFJlZGlyZWN0IHRvIGhyZWYuXHJcblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YXJnZXQgPT0gJ19ibGFuaycpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0d2luZG93Lm9wZW4oaHJlZik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0fSwgY29uZmlnLmRlbGF5ICsgMTApO1xyXG5cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEV2ZW50OiBUb3VjaCBzdHVmZi5cclxuXHRcdFx0XHQkdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NYID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NZID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHQkdGhpcy5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoJHRoaXMudG91Y2hQb3NYID09PSBudWxsXHJcblx0XHRcdFx0XHR8fFx0JHRoaXMudG91Y2hQb3NZID09PSBudWxsKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0dmFyXHRkaWZmWCA9ICR0aGlzLnRvdWNoUG9zWCAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWCxcclxuXHRcdFx0XHRcdFx0ZGlmZlkgPSAkdGhpcy50b3VjaFBvc1kgLSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVksXHJcblx0XHRcdFx0XHRcdHRoID0gJHRoaXMub3V0ZXJIZWlnaHQoKSxcclxuXHRcdFx0XHRcdFx0dHMgPSAoJHRoaXMuZ2V0KDApLnNjcm9sbEhlaWdodCAtICR0aGlzLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHRcdFx0XHQvLyBIaWRlIG9uIHN3aXBlP1xyXG5cdFx0XHRcdFx0XHRpZiAoY29uZmlnLmhpZGVPblN3aXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdGJvdW5kYXJ5ID0gMjAsXHJcblx0XHRcdFx0XHRcdFx0XHRkZWx0YSA9IDUwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvbmZpZy5zaWRlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWSA8IGJvdW5kYXJ5ICYmIGRpZmZZID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlggPiBkZWx0YSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3JpZ2h0JzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKGRpZmZZIDwgYm91bmRhcnkgJiYgZGlmZlkgPiAoLTEgKiBib3VuZGFyeSkpICYmIChkaWZmWCA8ICgtMSAqIGRlbHRhKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3RvcCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWCA8IGJvdW5kYXJ5ICYmIGRpZmZYID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlkgPiBkZWx0YSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbSc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IChkaWZmWCA8IGJvdW5kYXJ5ICYmIGRpZmZYID4gKC0xICogYm91bmRhcnkpKSAmJiAoZGlmZlkgPCAoLTEgKiBkZWx0YSkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMudG91Y2hQb3NYID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLnRvdWNoUG9zWSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5faGlkZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFByZXZlbnQgdmVydGljYWwgc2Nyb2xsaW5nIHBhc3QgdGhlIHRvcCBvciBib3R0b20uXHJcblx0XHRcdFx0XHRcdGlmICgoJHRoaXMuc2Nyb2xsVG9wKCkgPCAwICYmIGRpZmZZIDwgMClcclxuXHRcdFx0XHRcdFx0fHwgKHRzID4gKHRoIC0gMikgJiYgdHMgPCAodGggKyAyKSAmJiBkaWZmWSA+IDApKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IFByZXZlbnQgY2VydGFpbiBldmVudHMgaW5zaWRlIHRoZSBwYW5lbCBmcm9tIGJ1YmJsaW5nLlxyXG5cdFx0XHRcdCR0aGlzLm9uKCdjbGljayB0b3VjaGVuZCB0b3VjaHN0YXJ0IHRvdWNobW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEV2ZW50OiBIaWRlIHBhbmVsIGlmIGEgY2hpbGQgYW5jaG9yIHRhZyBwb2ludGluZyB0byBpdHMgSUQgaXMgY2xpY2tlZC5cclxuXHRcdFx0XHQkdGhpcy5vbignY2xpY2snLCAnYVtocmVmPVwiIycgKyBpZCArICdcIl0nLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRjb25maWcudGFyZ2V0LnJlbW92ZUNsYXNzKGNvbmZpZy52aXNpYmxlQ2xhc3MpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHQvLyBCb2R5LlxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgcGFuZWwgb24gYm9keSBjbGljay90YXAuXHJcblx0XHRcdFx0JGJvZHkub24oJ2NsaWNrIHRvdWNoZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRcdCR0aGlzLl9oaWRlKGV2ZW50KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEV2ZW50OiBUb2dnbGUuXHJcblx0XHRcdFx0JGJvZHkub24oJ2NsaWNrJywgJ2FbaHJlZj1cIiMnICsgaWQgKyAnXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0Y29uZmlnLnRhcmdldC50b2dnbGVDbGFzcyhjb25maWcudmlzaWJsZUNsYXNzKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gV2luZG93LlxyXG5cclxuXHRcdFx0Ly8gRXZlbnQ6IEhpZGUgb24gRVNDLlxyXG5cdFx0XHRcdGlmIChjb25maWcuaGlkZU9uRXNjYXBlKVxyXG5cdFx0XHRcdFx0JHdpbmRvdy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PSAyNylcclxuXHRcdFx0XHRcdFx0XHQkdGhpcy5faGlkZShldmVudCk7XHJcblxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBcHBseSBcInBsYWNlaG9sZGVyXCIgYXR0cmlidXRlIHBvbHlmaWxsIHRvIG9uZSBvciBtb3JlIGZvcm1zLlxyXG5cdCAqIEByZXR1cm4ge2pRdWVyeX0galF1ZXJ5IG9iamVjdC5cclxuXHQgKi9cclxuXHQkLmZuLnBsYWNlaG9sZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gQnJvd3NlciBuYXRpdmVseSBzdXBwb3J0cyBwbGFjZWhvbGRlcnM/IEJhaWwuXHJcblx0XHRcdGlmICh0eXBlb2YgKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpLnBsYWNlaG9sZGVyICE9ICd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdHJldHVybiAkKHRoaXMpO1xyXG5cclxuXHRcdC8vIE5vIGVsZW1lbnRzP1xyXG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm4gJHRoaXM7XHJcblxyXG5cdFx0Ly8gTXVsdGlwbGUgZWxlbWVudHM/XHJcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA+IDEpIHtcclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpIDwgdGhpcy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdCQodGhpc1tpXSkucGxhY2Vob2xkZXIoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdC8vIFZhcnMuXHJcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0Ly8gVGV4dCwgVGV4dEFyZWEuXHJcblx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sdGV4dGFyZWEnKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJ1xyXG5cdFx0XHRcdFx0fHwgIGkudmFsKCkgPT0gaS5hdHRyKCdwbGFjZWhvbGRlcicpKVxyXG5cdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpXHJcblx0XHRcdFx0XHRcdFx0LnZhbChpLmF0dHIoJ3BsYWNlaG9sZGVyJykpO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykubWF0Y2goLy1wb2x5ZmlsbC1maWVsZCQvKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKVxyXG5cdFx0XHRcdFx0XHRpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpXHJcblx0XHRcdFx0XHRcdFx0LnZhbChpLmF0dHIoJ3BsYWNlaG9sZGVyJykpO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkuYXR0cignbmFtZScpLm1hdGNoKC8tcG9seWZpbGwtZmllbGQkLykpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSBpLmF0dHIoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0XHRcdGlcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gUGFzc3dvcmQuXHJcblx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9cGFzc3dvcmRdJylcclxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgaSA9ICQodGhpcyk7XHJcblx0XHRcdFx0XHR2YXIgeCA9ICQoXHJcblx0XHRcdFx0XHRcdFx0XHQkKCc8ZGl2PicpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmQoaS5jbG9uZSgpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVtb3ZlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lmh0bWwoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvdHlwZT1cInBhc3N3b3JkXCIvaSwgJ3R5cGU9XCJ0ZXh0XCInKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvdHlwZT1wYXNzd29yZC9pLCAndHlwZT10ZXh0JylcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGkuYXR0cignaWQnKSAhPSAnJylcclxuXHRcdFx0XHRcdFx0eC5hdHRyKCdpZCcsIGkuYXR0cignaWQnKSArICctcG9seWZpbGwtZmllbGQnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaS5hdHRyKCduYW1lJykgIT0gJycpXHJcblx0XHRcdFx0XHRcdHguYXR0cignbmFtZScsIGkuYXR0cignbmFtZScpICsgJy1wb2x5ZmlsbC1maWVsZCcpO1xyXG5cclxuXHRcdFx0XHRcdHguYWRkQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJylcclxuXHRcdFx0XHRcdFx0LnZhbCh4LmF0dHIoJ3BsYWNlaG9sZGVyJykpLmluc2VydEFmdGVyKGkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpLnZhbCgpID09ICcnKVxyXG5cdFx0XHRcdFx0XHRpLmhpZGUoKTtcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0eC5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHQub24oJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgeCA9IGkucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT0nICsgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaS52YWwoKSA9PSAnJykge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGkuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0eC5zaG93KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHhcclxuXHRcdFx0XHRcdFx0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpID0geC5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPScgKyB4LmF0dHIoJ25hbWUnKS5yZXBsYWNlKCctcG9seWZpbGwtZmllbGQnLCAnJykgKyAnXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aVxyXG5cdFx0XHRcdFx0XHRcdFx0LnNob3coKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmZvY3VzKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQub24oJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHR4LnZhbCgnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0Ly8gRXZlbnRzLlxyXG5cdFx0XHQkdGhpc1xyXG5cdFx0XHRcdC5vbignc3VibWl0JywgZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSxpbnB1dFt0eXBlPXBhc3N3b3JkXSx0ZXh0YXJlYScpXHJcblx0XHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpID0gJCh0aGlzKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGkuYXR0cignbmFtZScpLm1hdGNoKC8tcG9seWZpbGwtZmllbGQkLykpXHJcblx0XHRcdFx0XHRcdFx0XHRpLmF0dHIoJ25hbWUnLCAnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpLnZhbCgpID09IGkuYXR0cigncGxhY2Vob2xkZXInKSkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGkucmVtb3ZlQ2xhc3MoJ3BvbHlmaWxsLXBsYWNlaG9sZGVyJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpLnZhbCgnJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbigncmVzZXQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnc2VsZWN0JylcclxuXHRcdFx0XHRcdFx0LnZhbCgkKCdvcHRpb246Zmlyc3QnKS52YWwoKSk7XHJcblxyXG5cdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXQsdGV4dGFyZWEnKVxyXG5cdFx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRcdFx0eDtcclxuXHJcblx0XHRcdFx0XHRcdFx0aS5yZW1vdmVDbGFzcygncG9seWZpbGwtcGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0c3dpdGNoICh0aGlzLnR5cGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdzdWJtaXQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmVzZXQnOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICdwYXNzd29yZCc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0eCA9IGkucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT0nICsgaS5hdHRyKCduYW1lJykgKyAnLXBvbHlmaWxsLWZpZWxkXScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4LnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4LmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpLmF0dHIoJ2NoZWNrZWQnLCBpLmF0dHIoJ2RlZmF1bHRWYWx1ZScpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAndGV4dCc6XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlICd0ZXh0YXJlYSc6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGkudmFsKCkgPT0gJycpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpLmFkZENsYXNzKCdwb2x5ZmlsbC1wbGFjZWhvbGRlcicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cigncGxhY2Vob2xkZXInKSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkudmFsKGkuYXR0cignZGVmYXVsdFZhbHVlJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuICR0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyBlbGVtZW50cyB0by9mcm9tIHRoZSBmaXJzdCBwb3NpdGlvbnMgb2YgdGhlaXIgcmVzcGVjdGl2ZSBwYXJlbnRzLlxyXG5cdCAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudHMgRWxlbWVudHMgKG9yIHNlbGVjdG9yKSB0byBtb3ZlLlxyXG5cdCAqIEBwYXJhbSB7Ym9vbH0gY29uZGl0aW9uIElmIHRydWUsIG1vdmVzIGVsZW1lbnRzIHRvIHRoZSB0b3AuIE90aGVyd2lzZSwgbW92ZXMgZWxlbWVudHMgYmFjayB0byB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbnMuXHJcblx0ICovXHJcblx0JC5wcmlvcml0aXplID0gZnVuY3Rpb24oJGVsZW1lbnRzLCBjb25kaXRpb24pIHtcclxuXHJcblx0XHR2YXIga2V5ID0gJ19fcHJpb3JpdGl6ZSc7XHJcblxyXG5cdFx0Ly8gRXhwYW5kICRlbGVtZW50cyBpZiBpdCdzIG5vdCBhbHJlYWR5IGEgalF1ZXJ5IG9iamVjdC5cclxuXHRcdFx0aWYgKHR5cGVvZiAkZWxlbWVudHMgIT0gJ2pRdWVyeScpXHJcblx0XHRcdFx0JGVsZW1lbnRzID0gJCgkZWxlbWVudHMpO1xyXG5cclxuXHRcdC8vIFN0ZXAgdGhyb3VnaCBlbGVtZW50cy5cclxuXHRcdFx0JGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdHZhclx0JGUgPSAkKHRoaXMpLCAkcCxcclxuXHRcdFx0XHRcdCRwYXJlbnQgPSAkZS5wYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0Ly8gTm8gcGFyZW50PyBCYWlsLlxyXG5cdFx0XHRcdFx0aWYgKCRwYXJlbnQubGVuZ3RoID09IDApXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0Ly8gTm90IG1vdmVkPyBNb3ZlIGl0LlxyXG5cdFx0XHRcdFx0aWYgKCEkZS5kYXRhKGtleSkpIHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIENvbmRpdGlvbiBpcyBmYWxzZT8gQmFpbC5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIWNvbmRpdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdC8vIEdldCBwbGFjZWhvbGRlciAod2hpY2ggd2lsbCBzZXJ2ZSBhcyBvdXIgcG9pbnQgb2YgcmVmZXJlbmNlIGZvciB3aGVuIHRoaXMgZWxlbWVudCBuZWVkcyB0byBtb3ZlIGJhY2spLlxyXG5cdFx0XHRcdFx0XHRcdCRwID0gJGUucHJldigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBDb3VsZG4ndCBmaW5kIGFueXRoaW5nPyBNZWFucyB0aGlzIGVsZW1lbnQncyBhbHJlYWR5IGF0IHRoZSB0b3AsIHNvIGJhaWwuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoJHAubGVuZ3RoID09IDApXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdC8vIE1vdmUgZWxlbWVudCB0byB0b3Agb2YgcGFyZW50LlxyXG5cdFx0XHRcdFx0XHRcdCRlLnByZXBlbmRUbygkcGFyZW50KTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIE1hcmsgZWxlbWVudCBhcyBtb3ZlZC5cclxuXHRcdFx0XHRcdFx0XHQkZS5kYXRhKGtleSwgJHApO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTW92ZWQgYWxyZWFkeT9cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ29uZGl0aW9uIGlzIHRydWU/IEJhaWwuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGNvbmRpdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdCRwID0gJGUuZGF0YShrZXkpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTW92ZSBlbGVtZW50IGJhY2sgdG8gaXRzIG9yaWdpbmFsIGxvY2F0aW9uICh1c2luZyBvdXIgcGxhY2Vob2xkZXIpLlxyXG5cdFx0XHRcdFx0XHRcdCRlLmluc2VydEFmdGVyKCRwKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIFVubWFyayBlbGVtZW50IGFzIG1vdmVkLlxyXG5cdFx0XHRcdFx0XHRcdCRlLnJlbW92ZURhdGEoa2V5KTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSk7IiwiLypcclxuXHRFc2NhcGUgVmVsb2NpdHkgYnkgSFRNTDUgVVBcclxuXHRodG1sNXVwLm5ldCB8IEBhamxrblxyXG5cdEZyZWUgZm9yIHBlcnNvbmFsIGFuZCBjb21tZXJjaWFsIHVzZSB1bmRlciB0aGUgQ0NBIDMuMCBsaWNlbnNlIChodG1sNXVwLm5ldC9saWNlbnNlKVxyXG4qL1xyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuXHJcblx0dmFyXHQkd2luZG93ID0gJCh3aW5kb3cpLFxyXG5cdFx0JGJvZHkgPSAkKCdib2R5Jyk7XHJcblxyXG5cdC8vIEJyZWFrcG9pbnRzLlxyXG5cdC8vIFx0YnJlYWtwb2ludHMoe1xyXG5cdC8vIFx0XHR4bGFyZ2U6ICBbICcxMjgxcHgnLCAgJzE2ODBweCcgXSxcclxuXHQvLyBcdFx0bGFyZ2U6ICAgWyAnOTgxcHgnLCAgICcxMjgwcHgnIF0sXHJcblx0Ly8gXHRcdG1lZGl1bTogIFsgJzczN3B4JywgICAnOTgwcHgnICBdLFxyXG5cdC8vIFx0XHRzbWFsbDogICBbIG51bGwsICAgICAgJzczNnB4JyAgXVxyXG5cdC8vIFx0fSk7XHJcblxyXG5cdC8vIFBsYXkgaW5pdGlhbCBhbmltYXRpb25zIG9uIHBhZ2UgbG9hZC5cclxuXHRcdCR3aW5kb3cub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLXByZWxvYWQnKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHQvLyBEcm9wZG93bnMuXHJcblx0XHQkKCcjbmF2ID4gdWwnKS5kcm9wb3Ryb24oe1xyXG5cdFx0XHRtb2RlOiAnZmFkZScsXHJcblx0XHRcdG5vT3BlbmVyRmFkZTogdHJ1ZSxcclxuXHRcdFx0YWxpZ25tZW50OiAnY2VudGVyJyxcclxuXHRcdFx0ZGV0YWNoOiBmYWxzZVxyXG5cdFx0fSk7XHJcblxyXG5cdC8vIE5hdi5cclxuXHJcblx0XHQvLyBUaXRsZSBCYXIuXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0JzxkaXYgaWQ9XCJ0aXRsZUJhclwiPicgK1xyXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCIjbmF2UGFuZWxcIiBjbGFzcz1cInRvZ2dsZVwiPjwvYT4nICtcclxuXHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArICQoJyNsb2dvIGgxJykuaHRtbCgpICsgJzwvc3Bhbj4nICtcclxuXHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHQpXHJcblx0XHRcdFx0LmFwcGVuZFRvKCRib2R5KTtcclxuXHJcblx0XHQvLyBQYW5lbC5cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnPGRpdiBpZD1cIm5hdlBhbmVsXCI+JyArXHJcblx0XHRcdFx0XHQnPG5hdj4nICtcclxuXHRcdFx0XHRcdFx0JCgnI25hdicpLm5hdkxpc3QoKSArXHJcblx0XHRcdFx0XHQnPC9uYXY+JyArXHJcblx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0KVxyXG5cdFx0XHRcdC5hcHBlbmRUbygkYm9keSlcclxuXHRcdFx0XHQucGFuZWwoe1xyXG5cdFx0XHRcdFx0ZGVsYXk6IDUwMCxcclxuXHRcdFx0XHRcdGhpZGVPbkNsaWNrOiB0cnVlLFxyXG5cdFx0XHRcdFx0aGlkZU9uU3dpcGU6IHRydWUsXHJcblx0XHRcdFx0XHRyZXNldFNjcm9sbDogdHJ1ZSxcclxuXHRcdFx0XHRcdHJlc2V0Rm9ybXM6IHRydWUsXHJcblx0XHRcdFx0XHRzaWRlOiAnbGVmdCcsXHJcblx0XHRcdFx0XHR0YXJnZXQ6ICRib2R5LFxyXG5cdFx0XHRcdFx0dmlzaWJsZUNsYXNzOiAnbmF2UGFuZWwtdmlzaWJsZSdcclxuXHRcdFx0XHR9KTtcclxuXHJcbn0pKGpRdWVyeSk7Il19