"use strict";
(function () {
	// Global variables
	var userAgent = navigator.userAgent.toLowerCase(),
			initialDate = new Date(),

			$document = $(document),
			$window = $(window),
			$html = $("html"),
			windowReady = false,

			isDesktop = $html.hasClass("desktop"),
			isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
			isTouch = "ontouchstart" in window,
			onloadCaptchaCallback,
			isNoviBuilder = false,
			plugins = {
				pointerEvents:        isIE < 11 ? "js/pointer-events.min.js" : false,
				bootstrapTooltip:     $("[data-toggle='tooltip']"),
				bootstrapModalDialog: $('.modal'),
				bootstrapTabs:        $(".tabs-custom"),
				rdNavbar:             $(".rd-navbar"),


				rdMailForm:     $(".rd-mailform"),
				rdInputLabel:   $(".form-label"),
				regula:         $("[data-constraints]"),
				owl:            $(".owl-carousel"),
				swiper:         $(".swiper-slider"),
				search:         $(".rd-search"),
				searchResults:  $('.rd-search-results'),
				statefulButton: $('.btn-stateful'),
				isotope:        $(".isotope"),
				popover:        $('[data-toggle="popover"]'),
				viewAnimate:    $('.view-animate'),

				radio:        $("input[type='radio']"),
				checkbox:     $("input[type='checkbox']"),
				customToggle: $("[data-custom-toggle]"),


				counter:        $(".counter"),
				progressLinear: $(".progress-linear"),
				circleProgress: $(".progress-bar-circle"),
				dateCountdown:  $('.DateCountdown'),
				preloader:      $(".page-loader"),
				captcha:        $('.recaptcha'),
				slick:          $('.slick-slider'),
				d3Charts:       $('.d3-chart'),

				materialParallax:        $(".parallax-container"),
				maps:                    $(".google-map-container"),
				lightGallery:            $("[data-lightgallery='group']"),
				lightGalleryItem:        $("[data-lightgallery='item']"),
				lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
				wow:                     $('.wow')
			};

// Initialize scripts that require a loaded window
	$window.on('load', function () {
		// Page loader & Page transition
		if (plugins.preloader.length && !isNoviBuilder) {
			pageTransition({
				target:            document.querySelector('.page'),
				delay:             0,
				duration:          500,
				classIn:           'fadeIn',
				classOut:          'fadeOut',
				classActive:       'animated',
				conditions:        function (event, link) {
					return link && !/(\#|javascript:void\(0\)|callto:|tel:|mailto:|:\/\/)/.test(link) && !event.currentTarget.hasAttribute('data-lightgallery');
				},
				onTransitionStart: function (options) {
					setTimeout(function () {
						plugins.preloader.removeClass('loaded');
					}, options.duration * .75);
				},
				onReady:           function () {
					plugins.preloader.addClass('loaded');
					windowReady = true;
				}
			});
		}
	});

	// Initialize scripts that require a finished document
	$(function () {
		isNoviBuilder = window.xMode;

		/**
		 * getSwiperHeight
		 * @description  calculate the height of swiper slider basing on data attr
		 */
		function getSwiperHeight(object, attr) {
			var val = object.attr("data-" + attr),
					dim;

			if (!val) {
				return undefined;
			}

			dim = val.match(/(px)|(%)|(vh)$/i);

			if (dim.length) {
				switch (dim[0]) {
					case "px":
						return parseFloat(val);
					case "vh":
						return $(window).height() * (parseFloat(val) / 100);
					case "%":
						return object.width() * (parseFloat(val) / 100);
				}
			} else {
				return undefined;
			}
		}

		/**
		 * toggleSwiperInnerVideos
		 * @description  toggle swiper videos on active slides
		 */
		function toggleSwiperInnerVideos(swiper) {
			var prevSlide = $(swiper.slides[swiper.previousIndex]),
					nextSlide = $(swiper.slides[swiper.activeIndex]),
					videos;

			prevSlide.find("video").each(function () {
				this.pause();
			});

			videos = nextSlide.find("video");
			if (videos.length) {
				videos.get(0).play();
			}
		}

		/**
		 * toggleSwiperCaptionAnimation
		 * @description  toggle swiper animations on active slides
		 */
		function toggleSwiperCaptionAnimation(swiper) {
			var prevSlide = $(swiper.container),
					nextSlide = $(swiper.slides[swiper.activeIndex]);

			prevSlide
			.find("[data-caption-animate]")
			.each(function () {
				var $this = $(this);
				$this
				.removeClass("animated")
				.removeClass($this.attr("data-caption-animate"))
				.addClass("not-animated");
			});

			nextSlide
			.find("[data-caption-animate]")
			.each(function () {
				var $this = $(this),
						delay = $this.attr("data-caption-delay");


				if (!isNoviBuilder) {
					setTimeout(function () {
						$this
						.removeClass("not-animated")
						.addClass($this.attr("data-caption-animate"))
						.addClass("animated");
					}, delay ? parseInt(delay) : 0);
				} else {
					$this
					.removeClass("not-animated")
				}
			});
		}


		/**
		 * initOwlCarousel
		 * @description  Init owl carousel plugin
		 */
		function initOwlCarousel(c) {
			var aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
					values = [0, 576, 768, 992, 1200, 1600],
					responsive = {};

			for (var j = 0; j < values.length; j++) {
				responsive[values[j]] = {};
				for (var k = j; k >= -1; k--) {
					if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
						responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
					}
					if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
						responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
					}
					if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
						responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
					}
				}
			}

			// Enable custom pagination
			if (c.attr('data-dots-custom')) {
				c.on("initialized.owl.carousel", function (event) {
					var carousel = $(event.currentTarget),
							customPag = $(carousel.attr("data-dots-custom")),
							active = 0;

					if (carousel.attr('data-active')) {
						active = parseInt(carousel.attr('data-active'), 10);
					}

					carousel.trigger('to.owl.carousel', [active, 300, true]);
					customPag.find("[data-owl-item='" + active + "']").addClass("active");

					customPag.find("[data-owl-item]").on('click', function (e) {
						e.preventDefault();
						carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item"), 10), 300, true]);
					});

					carousel.on("translate.owl.carousel", function (event) {
						customPag.find(".active").removeClass("active");
						customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
					});
				});
			}

			c.on("initialized.owl.carousel", function () {
				initLightGalleryItem(c.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
			});

			c.owlCarousel({
				autoplay:      isNoviBuilder ? false : c.attr("data-autoplay") === "true",
				loop:          isNoviBuilder ? false : c.attr("data-loop") !== "false",
				items:         1,
				center:        c.attr("data-center") === "true",
				dotsContainer: c.attr("data-pagination-class") || false,
				navContainer:  c.attr("data-navigation-class") || false,
				mouseDrag:     isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
				nav:           c.attr("data-nav") === "true",
				dots:          c.attr("data-dots") === "true",
				dotsEach:      c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
				animateIn:     c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
				animateOut:    c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
				responsive:    responsive,
				navText:       c.attr("data-nav-text") ? $.parseJSON(c.attr("data-nav-text")) : [],
				navClass:      c.attr("data-nav-class") ? $.parseJSON(c.attr("data-nav-class")) : ['owl-prev', 'owl-next']
			});
		}

		/**
		 * isScrolledIntoView
		 * @description  check the element whas been scrolled into the view
		 */
		function isScrolledIntoView(elem) {
			if (!isNoviBuilder) {
				return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
			} else {
				return true;
			}
		}

		/**
		 * initOnView
		 * @description  calls a function when element has been scrolled into the view
		 */
		function lazyInit(element, func) {
			var $win = jQuery(window);
			$win.on('load scroll', function () {
				if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
					func.call();
					element.addClass('lazy-loaded');
				}
			});
		}

		/**
		 * Live Search
		 * @description  create live search results
		 */
		function liveSearch(options) {
			options.live.removeClass('cleared').html();
			options.current++;
			options.spin.addClass('loading');

			$.get(handler, {
				s:          decodeURI(options.term),
				liveSearch: options.element.attr('data-search-live'),
				dataType:   "html",
				liveCount:  options.liveCount,
				filter:     options.filter,
				template:   options.template
			}, function (data) {
				options.processed++;
				var live = options.live;
				if (options.processed == options.current && !live.hasClass('cleared')) {
					live.find('> #search-results').removeClass('active');
					live.html(data);
					setTimeout(function () {
						live.find('> #search-results').addClass('active');
					}, 50);
				}
				options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
			})
		}

		/**
		 * attachFormValidator
		 * @description  attach form validation to elements
		 */
		function attachFormValidator(elements) {
			for (var i = 0; i < elements.length; i++) {
				var o = $(elements[i]), v;
				o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
				v = o.parent().find(".form-validation");
				if (v.is(":last-child")) {
					o.addClass("form-control-last-child");
				}
			}

			elements
			.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if (e.type != "blur") {
					if (!$this.parent().hasClass("has-error")) {
						return;
					}
				}

				if ($this.parents('.rd-mailform').hasClass('success')) {
					return;
				}

				if ((results = $this.regula('validate')).length) {
					for (i = 0; i < results.length; i++) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			})
			.regula('bind');
		}

		/**
		 * isValidated
		 * @description  check if all elemnts pass validation
		 */
		function isValidated(elements, captcha) {
			var results, errors = 0;

			if (elements.length) {
				for (j = 0; j < elements.length; j++) {

					var $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors == 0
					}
				}

				return errors == 0;
			}
			return true;
		}

		/**
		 * Init Bootstrap tooltip
		 * @description  calls a function when need to init bootstrap tooltips
		 */
		function initBootstrapTooltip(tooltipPlacement) {
			plugins.bootstrapTooltip.tooltip('dispose');

			if (window.innerWidth < 576) {
				plugins.bootstrapTooltip.tooltip({placement: 'bottom'});
			} else {
				plugins.bootstrapTooltip.tooltip({placement: tooltipPlacement});
			}
		}

		/**
		 * Copyright Year
		 * @description  Evaluates correct copyright year
		 */
		var o = $(".copyright-year");
		if (o.length) {
			o.text(initialDate.getFullYear());
		}

		/**
		 * validateReCaptcha
		 * @description  validate google reCaptcha
		 */
		function validateReCaptcha(captcha) {
			var $captchaToken = captcha.find('.g-recaptcha-response').val();

			if ($captchaToken == '') {
				captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
				captcha
				.closest('.form-group')
				.addClass('has-error');

				captcha.bind('propertychange', function () {
					var $this = $(this),
							$captchaToken = $this.find('.g-recaptcha-response').val();

					if ($captchaToken != '') {
						$this
						.closest('.form-group')
						.removeClass('has-error');
						$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
						$this.unbind('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * onloadCaptchaCallback
		 * @description  init google reCaptcha
		 */
		onloadCaptchaCallback = function () {
			for (i = 0; i < plugins.captcha.length; i++) {
				var $capthcaItem = $(plugins.captcha[i]);

				grecaptcha.render(
						$capthcaItem.attr('id'),
						{
							sitekey:  $capthcaItem.attr('data-sitekey'),
							size:     $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
							theme:    $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
							callback: function (e) {
								$('.recaptcha').trigger('propertychange');
							}
						}
				);
				$capthcaItem.after("<span class='form-validation'></span>");
			}
		};

		/**
		 * Google ReCaptcha
		 * @description Enables Google ReCaptcha
		 */
		if (plugins.captcha.length) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}

		/**
		 * Is Mac os
		 * @description  add additional class on html if mac os.
		 */
		if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

		/**
		 * IE Polyfills
		 * @description  Adds some loosing functionality to IE browsers
		 */
		if (isIE) {
			if (isIE < 10) {
				$html.addClass("lt-ie-10");
			}

			if (isIE < 11) {
				if (plugins.pointerEvents) {
					$.getScript(plugins.pointerEvents)
					.done(function () {
						$html.addClass("ie-10");
						PointerEventsPolyfill.initialize({});
					});
				}
			}

			if (isIE === 11) {
				$("html").addClass("ie-11");
			}

			if (isIE === 12) {
				$("html").addClass("ie-edge");
			}
		}

		/**
		 * Bootstrap Tooltips
		 * @description Activate Bootstrap Tooltips
		 */
		if (plugins.bootstrapTooltip.length) {
			var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
			initBootstrapTooltip(tooltipPlacement);
			$(window).on('resize orientationchange', function () {
				initBootstrapTooltip(tooltipPlacement);
			})
		}

		/**
		 * bootstrapModalDialog
		 * @description Stap vioeo in bootstrapModalDialog
		 */
		if (plugins.bootstrapModalDialog.length > 0) {
			var i = 0;

			for (i = 0; i < plugins.bootstrapModalDialog.length; i++) {
				var modalItem = $(plugins.bootstrapModalDialog[i]);

				modalItem.on('hidden.bs.modal', $.proxy(function () {
					var activeModal = $(this),
							rdVideoInside = activeModal.find('video'),
							youTubeVideoInside = activeModal.find('iframe');

					if (rdVideoInside.length) {
						rdVideoInside[0].pause();
					}

					if (youTubeVideoInside.length) {
						var videoUrl = youTubeVideoInside.attr('src');

						youTubeVideoInside
						.attr('src', '')
						.attr('src', videoUrl);
					}
				}, modalItem))
			}
		}


		/**
		 * Google map function for getting latitude and longitude
		 */
		function getLatLngObject(str, marker, map, callback) {
			var coordinates = {};
			try {
				coordinates = JSON.parse(str);
				callback(new google.maps.LatLng(
						coordinates.lat,
						coordinates.lng
				), marker, map)
			} catch (e) {
				map.geocoder.geocode({'address': str}, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var latitude = results[0].geometry.location.lat();
						var longitude = results[0].geometry.location.lng();

						callback(new google.maps.LatLng(
								parseFloat(latitude),
								parseFloat(longitude)
						), marker, map)
					}
				})
			}
		}

		// Google maps
		if (plugins.maps.length) {
			$.getScript("//maps.google.com/maps/api/js?key=AIzaSyAwH60q5rWrS8bXwpkZwZwhw9Bw0pqKTZM&sensor=false&libraries=geometry,places&v=3.7", function () {
				var head = document.getElementsByTagName('head')[0],
						insertBefore = head.insertBefore;

				head.insertBefore = function (newElement, referenceElement) {
					if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
						return;
					}
					insertBefore.call(head, newElement, referenceElement);
				};
				var geocoder = new google.maps.Geocoder;
				for (var i = 0; i < plugins.maps.length; i++) {
					var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
					var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
					var center = plugins.maps[i].getAttribute("data-center") || "New York";

					// Initialize map
					var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
						zoom:        zoom,
						styles:      styles,
						scrollwheel: false,
						center:      {
							lat: 0,
							lng: 0
						}
					});
					// Add map object to map node
					plugins.maps[i].map = map;
					plugins.maps[i].geocoder = geocoder;
					plugins.maps[i].google = google;

					// Get Center coordinates from attribute
					getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
						mapElement.map.setCenter(location);
					})

					// Add markers from google-map-markers array
					var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

					if (markerItems.length) {
						var markers = [];
						for (var j = 0; j < markerItems.length; j++) {
							var markerElement = markerItems[j];
							getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function (location, markerElement, mapElement) {
								var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
								var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
								var info = markerElement.getAttribute("data-description") || "";
								var infoWindow = new google.maps.InfoWindow({
									content: info
								});
								markerElement.infoWindow = infoWindow;
								var markerData = {
									position: location,
									map:      mapElement.map
								}
								if (icon) {
									markerData.icon = icon;
								}
								var marker = new google.maps.Marker(markerData);
								markerElement.gmarker = marker;
								markers.push({
									markerElement: markerElement,
									infoWindow:    infoWindow
								});
								marker.isActive = false;
								// Handle infoWindow close click
								google.maps.event.addListener(infoWindow, 'closeclick', (function (markerElement, mapElement) {
									var markerIcon = null;
									markerElement.gmarker.isActive = false;
									markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
									markerElement.gmarker.setIcon(markerIcon);
								}).bind(this, markerElement, mapElement));


								// Set marker active on Click and open infoWindow
								google.maps.event.addListener(marker, 'click', (function (markerElement, mapElement) {
									if (markerElement.infoWindow.getContent().length === 0) return;
									var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
									for (var k = 0; k < markers.length; k++) {
										var markerIcon;
										if (markers[k].markerElement === markerElement) {
											currentInfoWindow = markers[k].infoWindow;
										}
										gMarker = markers[k].markerElement.gmarker;
										if (gMarker.isActive && markers[k].markerElement !== markerElement) {
											gMarker.isActive = false;
											markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
											gMarker.setIcon(markerIcon);
											markers[k].infoWindow.close();
										}
									}

									currentMarker.isActive = !currentMarker.isActive;
									if (currentMarker.isActive) {
										if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")) {
											currentMarker.setIcon(markerIcon);
										}

										currentInfoWindow.open(map, marker);
									} else {
										if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")) {
											currentMarker.setIcon(markerIcon);
										}
										currentInfoWindow.close();
									}
								}).bind(this, markerElement, mapElement))
							})
						}
					}
				}
			});
		}


		/**
		 * Radio
		 * @description Add custom styling options for input[type="radio"]
		 */
		if (plugins.radio.length) {
			var i;
			for (i = 0; i < plugins.radio.length; i++) {
				var $this = $(plugins.radio[i]);
				$this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
			}
		}

		/**
		 * Checkbox
		 * @description Add custom styling options for input[type="checkbox"]
		 */
		if (plugins.checkbox.length) {
			var i;
			for (i = 0; i < plugins.checkbox.length; i++) {
				var $this = $(plugins.checkbox[i]);
				$this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
			}
		}

		/**
		 * Popovers
		 * @description Enables Popovers plugin
		 */
		if (plugins.popover.length) {
			if (window.innerWidth < 767) {
				plugins.popover.attr('data-placement', 'bottom');
				plugins.popover.popover();
			} else {
				plugins.popover.popover();
			}
		}

		/**
		 * Bootstrap Buttons
		 * @description  Enable Bootstrap Buttons plugin
		 */
		if (plugins.statefulButton.length) {
			$(plugins.statefulButton).on('click', function () {
				var statefulButtonLoading = $(this).button('loading');

				setTimeout(function () {
					statefulButtonLoading.button('reset')
				}, 2000);
			})
		}

		/**
		 * UI To Top
		 * @description Enables ToTop Button
		 */
		if (isDesktop && !isNoviBuilder) {
			$().UItoTop({
				easingType:     'easeOutQuart',
				containerClass: 'ui-to-top fa fa-angle-up'
			});
		}

		// RD Navbar
		if (plugins.rdNavbar.length) {
			var aliaces, i, j, len, value, values, responsiveNavbar;

			aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"];
			values = [0, 576, 768, 992, 1200, 1600];
			responsiveNavbar = {};

			for (i = j = 0, len = values.length; j < len; i = ++j) {
				value = values[i];
				if (!responsiveNavbar[values[i]]) {
					responsiveNavbar[values[i]] = {};
				}
				if (plugins.rdNavbar.attr('data' + aliaces[i] + 'layout')) {
					responsiveNavbar[values[i]].layout = plugins.rdNavbar.attr('data' + aliaces[i] + 'layout');
				}
				if (plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout')) {
					responsiveNavbar[values[i]]['deviceLayout'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout');
				}
				if (plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on')) {
					responsiveNavbar[values[i]]['focusOnHover'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on') === 'true';
				}
				if (plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height')) {
					responsiveNavbar[values[i]]['autoHeight'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height') === 'true';
				}

				if (isNoviBuilder) {
					responsiveNavbar[values[i]]['stickUp'] = false;
				} else if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up')) {
					responsiveNavbar[values[i]]['stickUp'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up') === 'true';
				}

				if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset')) {
					responsiveNavbar[values[i]]['stickUpOffset'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset');
				}
			}


			plugins.rdNavbar.RDNavbar({
				anchorNav:    !isNoviBuilder,
				stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
				responsive:   responsiveNavbar,
				callbacks:    {
					onStuck:        function () {
						var navbarSearch = this.$element.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
						}
					},
					onDropdownOver: function () {
						return !isNoviBuilder;
					},
					onUnstuck:      function () {
						if (this.$clone === null)
							return;

						var navbarSearch = this.$clone.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
							navbarSearch.trigger('blur');
						}

					}
				}
			});


			if (plugins.rdNavbar.attr("data-body-class")) {
				document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
			}
		}


		/**
		 * RD Search
		 * @description Enables search
		 */
		if (plugins.search.length || plugins.searchResults) {
			var handler = "bat/rd-search.php";
			var defaultTemplate = '<h5 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h5>' +
					'<p class="match"><em>#{href}</em></p>' +
					'<p>...#{token}...</p>';

			var defaultFilter = '*.html';

			if (plugins.search.length) {

				plugins.search = $('.' + plugins.search[0].className);

				for (i = 0; i < plugins.search.length; i++) {
					var searchItem = $(plugins.search[i]),
							options = {
								element:   searchItem,
								filter:    (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
								template:  (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
								live:      (searchItem.attr('data-search-live')) ? (searchItem.find('.' + searchItem.attr('data-search-live'))) : false,
								liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live')) : 4,
								current:   0,
								processed: 0,
								timer:     {}
							};

					if ($('.rd-navbar-search-toggle').length) {
						var toggle = $('.rd-navbar-search-toggle');
						toggle.on('click', function () {
							if (!($(this).hasClass('active'))) {
								searchItem.find('input').val('').trigger('propertychange');
							}
						});
					}

					if (options.live) {
						options.clearHandler = false;

						searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
							var ctx = this;

							this.term = this.element.find('input').val().trim();
							this.spin = this.element.find('.input-group-addon');

							clearTimeout(ctx.timer);

							if (ctx.term.length > 2) {
								ctx.timer = setTimeout(liveSearch(ctx), 200);

								if (ctx.clearHandler == false) {
									ctx.clearHandler = true;

									$("body").on("click", function (e) {
										if ($(e.toElement).parents('.rd-search').length == 0) {
											ctx.live.addClass('cleared').html('');
										}
									})
								}

							} else if (ctx.term.length == 0) {
								ctx.live.addClass('cleared').html('');
							}
						}, options, this));
					}

					searchItem.submit($.proxy(function () {
						$('<input />').attr('type', 'hidden')
						.attr('name', "filter")
						.attr('value', this.filter)
						.appendTo(this.element);
						return true;
					}, options, this))
				}
			}

			if (plugins.searchResults.length) {
				var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
				var match = regExp.exec(location.search);

				if (match != null) {
					$.get(handler, {
						s:        decodeURI(match[1]),
						dataType: "html",
						filter:   match[2],
						template: defaultTemplate,
						live:     ''
					}, function (data) {
						plugins.searchResults.html(data);
					})
				}
			}
		}


		/**
		 * ViewPort Universal
		 * @description Add class in viewport
		 */
		if (plugins.viewAnimate.length) {
			var i;
			for (i = 0; i < plugins.viewAnimate.length; i++) {
				var $view = $(plugins.viewAnimate[i]).not('.active');
				$document.on("scroll", $.proxy(function () {
					if (isScrolledIntoView(this)) {
						this.addClass("active");
					}
				}, $view))
				.trigger("scroll");
			}
		}


		// Swiper
		if (plugins.swiper.length) {
			for (var i = 0; i < plugins.swiper.length; i++) {
				var s = $(plugins.swiper[i]);
				var pag = s.find(".swiper-pagination"),
						next = s.find(".swiper-button-next"),
						prev = s.find(".swiper-button-prev"),
						bar = s.find(".swiper-scrollbar"),
						swiperSlide = s.find(".swiper-slide"),
						autoplay = false;

				for (var j = 0; j < swiperSlide.length; j++) {
					var $this = $(swiperSlide[j]),
							url;

					if (url = $this.attr("data-slide-bg")) {
						$this.css({
							"background-image": "url(" + url + ")",
							"background-size":  "cover"
						})
					}
				}

				swiperSlide.end()
				.find("[data-caption-animate]")
				.addClass("not-animated")
				.end();

				s.swiper({
					autoplay:                 !isNoviBuilder && $.isNumeric(s.attr('data-autoplay')) ? s.attr('data-autoplay') : false,
					direction:                s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
					effect:                   s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
					speed:                    s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
					keyboardControl:          s.attr('data-keyboard') === "true",
					mousewheelControl:        s.attr('data-mousewheel') === "true",
					mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
					nextButton:               next.length ? next.get(0) : null,
					prevButton:               prev.length ? prev.get(0) : null,
					pagination:               pag.length ? pag.get(0) : null,
					paginationClickable:      pag.length ? pag.attr("data-clickable") !== "false" : false,
					paginationBulletRender:   pag.length ? pag.attr("data-index-bullet") === "true" ? function (swiper, index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					} : null : null,
					scrollbar:                bar.length ? bar.get(0) : null,
					scrollbarDraggable:       bar.length ? bar.attr("data-draggable") !== "false" : true,
					scrollbarHide:            bar.length ? bar.attr("data-draggable") === "false" : false,
					loop:                     isNoviBuilder ? false : s.attr('data-loop') !== "false",
					simulateTouch:            s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
					onTransitionStart:        function (swiper) {
						toggleSwiperInnerVideos(swiper);
					},
					onTransitionEnd:          function (swiper) {
						toggleSwiperCaptionAnimation(swiper);
					},
					onInit:                   function (swiper) {
						toggleSwiperInnerVideos(swiper);
						toggleSwiperCaptionAnimation(swiper);
						initLightGalleryItem(s.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
					}
				});

				$window.on("resize", (function (s) {
					return function () {
						var mh = getSwiperHeight(s, "min-height"),
								h = getSwiperHeight(s, "height");
						if (h) {
							s.css("height", mh ? mh > h ? mh : h : h);
						}
					}
				})(s)).trigger("resize");
			}
		}


		// Owl carousel
		if (plugins.owl.length) {
			for (var i = 0; i < plugins.owl.length; i++) {
				var c = $(plugins.owl[i]);
				plugins.owl[i].owl = c;

				initOwlCarousel(c);
			}
		}

		/**
		 * Isotope
		 * @description Enables Isotope plugin
		 */
		if (plugins.isotope.length) {
			var i, isogroup = [];
			for (i = 0; i < plugins.isotope.length; i++) {
				var isotopeItem = plugins.isotope[i],
						iso = new Isotope(isotopeItem, {
							itemSelector: '.isotope-item',
							layoutMode:   isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
							filter:       '*'
						});

				isogroup.push(iso);
			}

			$(window).on('load', function () {
				setTimeout(function () {
					var i;
					for (i = 0; i < isogroup.length; i++) {
						isogroup[i].element.className += " isotope--loaded";
						isogroup[i].layout();
					}
				}, 600);
			});

			var resizeTimout;

			$("[data-isotope-filter]").on("click", function (e) {
				e.preventDefault();
				var filter = $(this);
				clearTimeout(resizeTimout);
				filter.parents(".isotope-filters").find('.active').removeClass("active");
				filter.addClass("active");
				var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');
				iso.isotope({
					itemSelector: '.isotope-item',
					layoutMode:   iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
					filter:       this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]'
				});
			}).eq(0).trigger("click")
		}

		/**
		 * WOW
		 * @description Enables Wow animation plugin
		 */
		if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
			new WOW().init();
		}

		// Bootstrap tabs
		if (plugins.bootstrapTabs.length) {
			for (var i = 0; i < plugins.bootstrapTabs.length; i++) {
				var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);

				//If have slick carousel inside tab - resize slick carousel on click
				if (bootstrapTabsItem.find('.slick-slider').length) {
					bootstrapTabsItem.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
						var $this = $(this);
						var setTimeOutTime = isNoviBuilder ? 1500 : 300;

						setTimeout(function () {
							$this.find('.tab-content .tab-pane.active .slick-slider').slick('setPosition');
						}, setTimeOutTime);
					}, bootstrapTabsItem));
				}
			}
		}


		/**
		 * RD Input Label
		 * @description Enables RD Input Label Plugin
		 */
		if (plugins.rdInputLabel.length) {
			plugins.rdInputLabel.RDInputLabel();
		}

		/**
		 * Regula
		 * @description Enables Regula plugin
		 */
		if (plugins.regula.length) {
			attachFormValidator(plugins.regula);
		}


		// RD Mailform
		if (plugins.rdMailForm.length) {
			var i, j, k,
					msg = {
						'MF000': 'Successfully sent!',
						'MF001': 'Recipients are not set!',
						'MF002': 'Form will not work locally!',
						'MF003': 'Please, define email field in your form!',
						'MF004': 'Please, define type of your form!',
						'MF254': 'Something went wrong with PHPMailer!',
						'MF255': 'Aw, snap! Something went wrong.'
					};

			for (i = 0; i < plugins.rdMailForm.length; i++) {
				var $form = $(plugins.rdMailForm[i]),
						formHasCaptcha = false;

				$form.attr('novalidate', 'novalidate').ajaxForm({
					data:         {
						"form-type": $form.attr("data-form-type") || "contact",
						"counter":   i
					},
					beforeSubmit: function (arr, $form, options) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
								inputs = form.find("[data-constraints]"),
								output = $("#" + form.attr("data-form-output")),
								captcha = form.find('.recaptcha'),
								captchaFlag = true;

						output.removeClass("active error success");

						if (isValidated(inputs, captcha)) {

							// veify reCaptcha
							if (captcha.length) {
								var captchaToken = captcha.find('.g-recaptcha-response').val(),
										captchaMsg = {
											'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
											'CPT002': 'Something wrong with google reCaptcha'
										};

								formHasCaptcha = true;

								$.ajax({
									method: "POST",
									url:    "bat/reCaptcha.php",
									data:   {'g-recaptcha-response': captchaToken},
									async:  false
								})
								.done(function (responceCode) {
									if (responceCode !== 'CPT000') {
										if (output.hasClass("snackbars")) {
											output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

											setTimeout(function () {
												output.removeClass("active");
											}, 3500);

											captchaFlag = false;
										} else {
											output.html(captchaMsg[responceCode]);
										}

										output.addClass("active");
									}
								});
							}

							if (!captchaFlag) {
								return false;
							}

							form.addClass('form-in-process');

							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
								output.addClass("active");
							}
						} else {
							return false;
						}
					},
					error:        function (result) {
						if (isNoviBuilder)
							return;

						var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
								form = $(plugins.rdMailForm[this.extraData.counter]);

						output.text(msg[result]);
						form.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}
					},
					success:      function (result) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
								output = $("#" + form.attr("data-form-output")),
								select = form.find('select');

						form
						.addClass('success')
						.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}

						result = result.length === 5 ? result : 'MF255';
						output.text(msg[result]);

						if (result === "MF000") {
							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active success");
							}
						} else {
							if (output.hasClass("snackbars")) {
								output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active error");
							}
						}

						form.clearForm();

						if (select.length) {
							select.select2("val", "");
						}

						form.find('input, textarea').trigger('blur');

						setTimeout(function () {
							output.removeClass("active error success");
							form.removeClass('success');
						}, 3500);
					}
				});
			}
		}


		/**
		 * Custom Toggles
		 */
		if (plugins.customToggle.length) {
			var i;

			for (i = 0; i < plugins.customToggle.length; i++) {
				var $this = $(plugins.customToggle[i]);

				$this.on('click', $.proxy(function (event) {
					event.preventDefault();
					var $ctx = $(this);
					$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
				}, $this));

				if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
					$("body").on("click", $this, function (e) {
						if (e.target !== e.data[0]
								&& $(e.data.attr('data-custom-toggle')).find($(e.target)).length
								&& e.data.find($(e.target)).length == 0) {
							$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
						}
					})
				}
			}
		}

		/**
		 * jQuery Count To
		 * @description Enables Count To plugin
		 */
		if (plugins.counter.length) {
			var i;

			for (i = 0; i < plugins.counter.length; i++) {
				var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
				$document
				.on("scroll", $.proxy(function () {
					var $this = this;

					if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
						$this.countTo({
							refreshInterval: 40,
							from:            0,
							to:              parseInt($this.text(), 10),
							speed:           $this.attr("data-speed") || 1000
						});
						$this.addClass('animated');
					}
				}, $counterNotAnimated))
				.trigger("scroll");
			}
		}

		/**
		 * TimeCircles
		 * @description  Enable TimeCircles plugin
		 */
		if (plugins.dateCountdown.length) {
			var i;
			for (i = 0; i < plugins.dateCountdown.length; i++) {
				var dateCountdownItem = $(plugins.dateCountdown[i]);

				$(window).on('load resize orientationchange', $.proxy(function () {
					var $this = $(this),
							circleColor = $this.data('circle-inner-color'),
							dateCountdownItemBgColor = $this.data('circle-bg'),
							time = {
								"Days":    {
									"text":  "Days",
									"color": circleColor,
									"show":  true
								},
								"Hours":   {
									"text":  "Hours",
									"color": circleColor,
									"show":  true
								},
								"Minutes": {
									"text":  "Minutes",
									"color": circleColor,
									"show":  true
								},
								"Seconds": {
									"text":  "Seconds",
									"color": circleColor,
									"show":  true
								}
							};

					$this.TimeCircles({
						fg_width:        $this.data('circle-fg-width') || 0.045,
						circle_bg_color: dateCountdownItemBgColor,
						bg_width:        $this.data('circle-bg-width') || 0.9,
						time:            time
					});

					if (window.innerWidth < 479) {
						$this.TimeCircles({
							time: {
								Days:    {
									"color": circleColor,
									"show":  true
								},
								Hours:   {
									"color": circleColor,
									"show":  true
								},
								Minutes: {
									color: circleColor,
									show:  true
								},
								Seconds: {
									show: false
								}
							}
						}).rebuild();
					} else if (window.innerWidth < 767) {
						$this.TimeCircles({
							time: {
								Days:    {
									"color": circleColor,
									"show":  true
								},
								Hours:   {
									"color": circleColor,
									"show":  true
								},
								Seconds: {show: false}
							}
						}).rebuild();
					} else {
						$this.TimeCircles({time: time}).rebuild();
					}
				}, dateCountdownItem));
			}
		}

		/**
		 * Circle Progress
		 * @description Enable Circle Progress plugin
		 */
		if (plugins.circleProgress.length) {
			var i;
			for (i = 0; i < plugins.circleProgress.length; i++) {
				var circleProgressItem = $(plugins.circleProgress[i]);
				$document
				.on("scroll", $.proxy(function () {
					var $this = $(this);

					if (!$this.hasClass('animated') && isScrolledIntoView($this)) {

						var arrayGradients = $this.attr('data-gradient').split(",");

						$this.circleProgress({
							value:      $this.attr('data-value'),
							size:       $this.attr('data-size') ? $this.attr('data-size') : 175,
							fill:       {
								gradient:      arrayGradients,
								gradientAngle: Math.PI / 4
							},
							startAngle: -Math.PI / 4 * 2,
							emptyFill:  $this.attr('data-empty-fill') ? $this.attr('data-empty-fill') : "rgb(245,245,245)",
							thickness:  $this.attr('data-thickness') ? parseInt($this.attr('data-thickness')) : 10,

						}).on('circle-animation-progress', function (event, progress, stepValue) {
							$(this).find('span').text(String(stepValue.toFixed(2)).replace('0.', '').replace('1.', '1'));
						});
						$this.addClass('animated');
					}
				}, circleProgressItem))
				.trigger("scroll");
			}
		}

		/**
		 * Linear Progress bar
		 * @description  Enable progress bar
		 */
		if (plugins.progressLinear.length) {
			for (i = 0; i < plugins.progressLinear.length; i++) {
				var progressBar = $(plugins.progressLinear[i]);
				$window
				.on("scroll load", $.proxy(function () {
					var bar = $(this);
					if (!bar.hasClass('animated-first') && isScrolledIntoView(bar)) {
						var end = parseInt($(this).find('.progress-value').text(), 10);
						bar.find('.progress-bar-linear').css({width: end + '%'});
						bar.find('.progress-value').countTo({
							refreshInterval: 40,
							from:            0,
							to:              end,
							speed:           500
						});
						bar.addClass('animated-first');
					}
				}, progressBar));
			}
		}


		/**
		 * Slick carousel
		 * @description  Enable Slick carousel plugin
		 */
		if (plugins.slick.length) {
			var i;
			for (i = 0; i < plugins.slick.length; i++) {
				var $slickItem = $(plugins.slick[i]);

				$slickItem.slick({
					slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
					asNavFor:       $slickItem.attr('data-for') || false,
					dots:           $slickItem.attr("data-dots") == "true",
					infinite:       isNoviBuilder ? false : $slickItem.attr("data-loop") == "true",
					focusOnSelect:  true,
					arrows:         $slickItem.attr("data-arrows") == "true",
					swipe:          $slickItem.attr("data-swipe") == "true",
					autoplay:       $slickItem.attr("data-autoplay") == "true",
					vertical:       $slickItem.attr("data-vertical") == "true",
					centerMode:     $slickItem.attr("data-center-mode") == "true",
					centerPadding:  $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
					mobileFirst:    true,
					responsive:     [
						{
							breakpoint: 0,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
							}
						},
						{
							breakpoint: 480,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
							}
						},
						{
							breakpoint: 768,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
							}
						},
						{
							breakpoint: 992,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
							}
						},
						{
							breakpoint: 1200,
							settings:   {
								slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
							}
						}
					]
				})
				.on('afterChange', function (event, slick, currentSlide, nextSlide) {
					var $this = $(this),
							childCarousel = $this.attr('data-child');

					if (childCarousel) {
						$(childCarousel + ' .slick-slide').removeClass('slick-current');
						$(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
					}
				});
			}
		}

		// Material Parallax
		if (plugins.materialParallax.length) {
			if (!isNoviBuilder && !isIE && !isMobile) {
				plugins.materialParallax.parallax();

				// heavy pages fix
				$window.on('load', function () {
					setTimeout(function () {
						$window.scroll();
					}, 500);
				});
			} else {
				for (var i = 0; i < plugins.materialParallax.length; i++) {
					var parallax = $(plugins.materialParallax[i]),
							imgPath = parallax.data("parallax-img");

					parallax.css({
						"background-image": 'url(' + imgPath + ')',
						"background-size":  "cover"
					});
				}
			}
		}


		/**
		 * @desc Initialize the gallery with set of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} addClass - additional gallery class
		 */
		function initLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector:  "[data-lightgallery='item']",
					autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass:  addClass,
					mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop:      $(itemsToInit).attr("data-lg-loop") !== "false"
				});
			}
		}

		/**
		 * @desc Initialize the gallery with dynamic addition of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} addClass - additional gallery class
		 */
		function initDynamicLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).on("click", function () {
					$(itemsToInit).lightGallery({
						thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
						selector:  "[data-lightgallery='item']",
						autoplay:  $(itemsToInit).attr("data-lg-autoplay") === "true",
						pause:     parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
						addClass:  addClass,
						mode:      $(itemsToInit).attr("data-lg-animation") || "lg-slide",
						loop:      $(itemsToInit).attr("data-lg-loop") !== "false",
						dynamic:   true,
						dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
					});
				});
			}
		}

		/**
		 * @desc Initialize the gallery with one image
		 * @param {object} itemToInit - jQuery object
		 * @param {string} addClass - additional gallery class
		 */
		function initLightGalleryItem(itemToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemToInit).lightGallery({
					selector:            "this",
					addClass:            addClass,
					counter:             false,
					youtubePlayerParams: {
						modestbranding: 1,
						showinfo:       0,
						rel:            0,
						controls:       0
					},
					vimeoPlayerParams:   {
						byline:   0,
						portrait: 0
					}
				});
			}
		}


		// lightGallery
		if (plugins.lightGallery.length) {
			for (var i = 0; i < plugins.lightGallery.length; i++) {
				initLightGallery(plugins.lightGallery[i]);
			}
		}

		// lightGallery item
		if (plugins.lightGalleryItem.length) {
			// Filter carousel items
			var notCarouselItems = [];

			for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
				if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
						!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
						!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
					notCarouselItems.push(plugins.lightGalleryItem[z]);
				}
			}

			plugins.lightGalleryItem = notCarouselItems;

			for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}

		// Dynamic lightGallery
		if (plugins.lightDynamicGalleryItem.length) {
			for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}


		/**
		 * D3 Charts
		 * @description Enables D3 Charts plugin
		 */
		if (plugins.d3Charts.length) {
			// for (i = 0; i < plugins.d3Charts.length; i++) {
			//   var d3ChartsItem = $(plugins.d3Charts[i]),
			//     d3ChartItemObject = parseJSONObject(d3ChartsItem, 'data-graph-object');
			//   c3ChartsArray.push(c3.generate(d3ChartItemObject));
			// }
		}

		function fillNumbers(n) {
			return Array.apply(null, {length: n}).map(Function.call, Number);
		}

		var d3Charts = [];
		var barChartObjectData = [11.5, 12.5, 13, 13.5, 13, 14.5, 21, 26, 29.8],
				barChartObject = {
					bindto:  '#bar-chart',
					legend:  {
						show: false
					},
					data:    {
						x:       'x',
						columns: [
							['x', '2000-01-01', '2002-01-01', '2004-01-01', '2006-01-01', '2008-01-01', '2010-01-01', '2012-01-01', '2014-01-01', '2016-01-01'],
							['data1'].concat(barChartObjectData)
						],
						axes:    {
							data1: 'y'
						},
						types:   {
							data1: 'bar'
						}
					},
					grid:    {
						y: {
							show: true
						}
					},
					axis:    {
						x: {
							type: 'timeseries',
							tick: {
								format: function (x) {
									return x.getFullYear();
								},
								outer:  false
							}
						},
						y: {
							min:  3,
							tick: {
								format: function (d) {
									return d + "M";
								},
								outer:  false
							}
						}
					},
					bar:     {
						width: {
							ratio: 0.3 // this makes bar width 50% of length between ticks
						}
						// or
						//width: 100 // this makes bar width 100px
					},
					tooltip: {
						show: false
					}
				};

		var barChartObjectData2 = [12.5, 19.5, 25, 29.5],
				barChartObject2 = {
					bindto:  '#bar-chart-2',
					legend:  {
						show: false
					},
					data:    {
						x:       'x',
						columns: [
							['x', '2010-01-01', '2012-01-01', '2014-01-01', '2016-01-01'],
							['data1'].concat(barChartObjectData2)
						],
						axes:    {
							data1: 'y'
						},
						types:   {
							data1: 'bar'
						}
					},
					grid:    {
						y: {
							show: true
						}
					},
					axis:    {
						x: {
							type: 'timeseries',
							tick: {
								format: function (x) {
									return x.getFullYear();
								},
								outer:  false
							}
						},
						y: {
							min:  3,
							tick: {
								format: function (d) {
									return d + "M";
								},
								outer:  false
							}
						}
					},
					bar:     {
						width: {
							ratio: 0.3 // this makes bar width 50% of length between ticks
						}
						// or
						//width: 100 // this makes bar width 100px
					},
					tooltip: {
						show: false
					}
				};

		var barChartObjectData3 = [290, 280, 160, 170, 140, 130, 115, 125, 105, 102, 100],
				barChartObject3 = {
					bindto:  '#bar-chart-3',
					legend:  {
						show: false
					},
					data:    {
						x:       'x',
						columns: [
							['x', '1996-01-01', '1998-01-01', '2000-01-01', '2002-01-01', '2004-01-01', '2006-01-01', '2008-01-01', '2010-01-01', '2012-01-01', '2014-01-01', '2016-01-01'],
							['data1'].concat(barChartObjectData3)
						],
						axes:    {
							data1: 'y'
						},
						types:   {
							data1: 'bar'
						}
					},
					grid:    {
						y: {
							show: true
						}
					},
					axis:    {
						x: {
							type: 'timeseries',
							tick: {
								format: function (x) {
									return x.getFullYear();
								},
								outer:  false
							}
						},
						y: {
							min:  50,
							tick: {
								format: function (d) {
									return d + "K ft";
								},
								outer:  false
							}
						}
					},
					bar:     {
						width: {
							ratio: 0.3 // this makes bar width 50% of length between ticks
						}
						// or
						//width: 100 // this makes bar width 100px
					},
					tooltip: {
						show: false
					}
				};

		var splineChartObjectData = [9, 13.5, 10.5, 16, 17, 21, 13.5, 16, 13, 11.5],
				splineChartObject = {
					bindto:  '#spline-chart',
					legend:  {
						show: false
					},
					data:    {
						x:       'x',
						columns: [
							['x', '2000-01-01', '2002-01-01', '2004-01-01', '2005-10-01', '2006-08-01', '2008-01-01', '2010-01-01', '2012-01-01', '2014-01-01', '2016-01-01'],
							['data1'].concat(splineChartObjectData)
						],
						axes:    {
							data1: 'y'
						},
						types:   {
							data1: 'spline'
						},
						colors:  {
							data1: '#4555b9'
						},
					},
					padding: {
						right: -100,
					},
					grid:    {
						y: {
							show: true
						}
					},
					axis:    {
						x: {
							min:  '1999-01-06',
							max:  '2020-01-06',
							type: 'timeseries',
							tick: {
								format: function (x) {
									return x.getFullYear();
								},
								outer:  false,
								count:  8,
								fit:    true
							}
						},
						y: {
							min:  4,
							max:  30,
							tick: {
								format: function (d) {
									return d + "M";
								},
								outer:  false
							}
						}
					},
					point:   {
						r:     3,
						focus: {
							expand: {
								enabled: true
							}
						}
					}
				};

		d3Charts.push(c3.generate(barChartObject));
		d3Charts.push(c3.generate(barChartObject2));
		d3Charts.push(c3.generate(barChartObject3));
		d3Charts.push(c3.generate(splineChartObject));
	});
}());
