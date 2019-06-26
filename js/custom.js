/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Init Animations
3. Set Header
4. Init Menu
5. Init Contact
6. Init Share
7. Init Milestones
8. Init Features Slider
9. Init Testimonials Slider
10. Init Accordions
11. Init Gallery


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var ctrl = new ScrollMagic.Controller();
	var overlay = $('.home_overlay');
	var homeHeight = $('.home').innerHeight();
	var scrollTop = $(window).scrollTop();
	var scrollPercent = ((scrollTop / homeHeight) * 1.5).toFixed(2);
	setTimeout(function()
	{
		overlay.css('opacity', scrollPercent);
	},2000);

	$(window).on('resize', function()
	{
		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
		scrollTop = $(window).scrollTop();
		scrollPercent = ((scrollTop / homeHeight) * 1.5).toFixed(2);
		
		overlay.css('opacity', scrollPercent);
	});

	initAnim();
	setHeader();
	initMenu();
	initContact();
	initShare();
	initMilestones();
	initFeaturesSlider();
	initTestSlider();
	initAccordions();
	initGallery();

	/* 

	2. Init Animations

	*/

	function initAnim()
	{
		var homePanel = $('.home_panel'),
		sidebar = $('.sidebar'),
		homeText = $('.home_text'),
		clients = $('.clients'),
		nav = $('.main_nav ul li'),
		imageOverlay = $('.home_image_overlay'),
		imageShadow = $('.user_image'),
		header = $('.header'),
		homeWidth = $('.home_panel').innerWidth(),
		homeHeight = $('.home_panel').innerHeight(),
		scrollTop = $(window).scrollTop();
		if(scrollTop < homeHeight)
		{
			var tween_panel = TweenMax.to(homePanel, 2.4, {left: 0, ease: Power3.easeInOut}),
			tween_sidebar = TweenMax.to(sidebar, 2, {left: 0, alpha:1, ease: Power3.easeInOut, delay: 2}),
			tween_home_text = TweenMax.to(homeText, 2.5, {alpha:1, ease: Power3.easeOut, delay: 4}),
			tween_clients = TweenMax.to(clients, 2, {alpha:1, bottom: '0px', ease: Power3.easeOut, delay: 2}),
			tween_image = TweenMax.to(imageOverlay, 1.5, {width: '0%', delay: 3.5, ease: Power3.easeOut}),
			tween_image_shadow = TweenMax.to(imageShadow, 2, {boxShadow:'0px 20px 49px rgba(0,0,0,0.31)', ease: Power3.easeOut, delay: 6}),
			tween_header = TweenMax.to(header, 2, {y:0, ease: Power3.easeOut, delay:2});
		}
		else
		{
			TweenMax.set(homePanel, {left: 0});
			TweenMax.set(sidebar, {left:0, alpha:1});
			TweenMax.set(homeText, {alpha:1});
			TweenMax.set(clients, {alpha:1, bottom:'0px'});
			TweenMax.set(nav, {alpha: 1, marginRight:37});
			TweenMax.set(imageOverlay, {width: '0%'});
			TweenMax.set(imageShadow, {boxShadow: '0px 20px 49px rgba(0,0,0,0.31)'});
			TweenMax.set(header, {y:0});
		}
	}

	/* 

	3. Set Header

	*/

	function setHeader()
	{
		var header = $('.header');

		if($(window).scrollTop() > 180)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		var hamb = $('.hamburger');
		var menu = $('.menu');
		var close = $('.menu_close');
		var isActive = false;

		hamb.on('click', function()
		{
			menu.toggleClass('active');
			hamb.toggleClass('active');
			if(!isActive)
			{
				$('.menu_text').fadeOut(function()
				{
					$(this).text('close').fadeIn();
				});
				isActive = true;
			}
			else
			{
				$('.menu_text').fadeOut(function()
				{
					$(this).text('menu').fadeIn();
				});
				isActive = false;
			}
		});
		close.on('click', function()
		{
			menu.toggleClass('active');
			hamb.toggleClass('active');
		});
	}

	/* 

	5. Init Contact

	*/

	function initContact()
	{
		if($('.contact').length)
		{
			var contact = $('.contact');
			var contactInner = $('.contact_inner');
			var about = $('.contact_about > div');
			var form = $('.contact_form_content > div');
			var button = $('.contact_activator');
			var close = $('.contact_close');

			button.on('click', function(e)
			{
				e.preventDefault();

				var openAnim = new TimelineLite();
				openAnim.fromTo(contact, 0.4, {alpha:0, 'pointerEvents': 'none'}, {alpha:1, 'pointerEvents': 'auto'})
				.fromTo(about, 0.5, {alpha:0, top:'-100%', ease: Power3.easeOut}, {alpha:1, top:'0'})
				.fromTo(form, 0.5, {alpha:0, top:'100%', ease: Power3.easeOut}, {alpha:1, delay:-0.5, top:0})
				.to(contactInner, 0.4, {'boxShadow':'0px 9px 27px rgba(0,0,0,0.3)'});
			});

			close.on('click', function()
			{
				contact.removeClass('active');
				var closeAnim = new TimelineLite();
				closeAnim.to(contactInner, 0.4, {'boxShadow':'none'})
				.to(form, 0.5, {alpha:0, top:'-100%', ease: Power3.easeOut})
				.to(about, 0.5, {alpha:0, top:'100%', ease: Power3.easeOut, delay:-0.5})
				.to(contact, 0.4, {alpha:0, 'pointerEvents': 'none'});
			});
		}
	}

	/* 

	5. Init Share

	*/

	function initShare()
	{
		if($('.sidebar_share_button').length)
		{
			var share = $('.sidebar_share_button');
			share.on('click', function()
			{
				share.parent().toggleClass('active');
			});
		}
	}

	/* 

	6. Init Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = '<span class="progress_perc">' + ele.attr('data-sign-before') + '</span>';
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = '<span class="progress_perc">' + ele.attr('data-sign-after') + '</span>';
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut,  
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/* 

	7. Init Features Slider

	*/

	function initFeaturesSlider()
	{
		if($('.features_slider').length)
		{
			var slider = $('.features_slider');
			slider.owlCarousel(
			{
				items:2,
				loop:false,
				autoplay:false,
				dots:false,
				smartSpeed:1200,
				margin:30
			});
		}
	}

	/* 

	8. Init Testimonials Slider

	*/

	function initTestSlider()
	{
		if($('.testimonials_slider').length)
		{
			var testSlider = $('.testimonials_slider');
			testSlider.owlCarousel(
			{
				items:2,
				loop:true,
				autoplay:false,
				dots:true,
				nav:false,
				smartSpeed:1200,
				responsive:
				{
					0:{items:1},
					992:{items:2}
				}
			});
		}
	}

	/* 

	9. Init Accordions

	*/

	function initAccordions()
	{
		if($('.accordion').length)
		{
			var accs = $('.accordion');

			accs.each(function()
			{
				var acc = $(this);
				var panel = $(acc.find($('.accordion_panel')));

				if(acc.hasClass('active'))
				{
					if(panel.css('max-height') == "0px")
					{
						panel.css('max-height', panel.prop('scrollHeight') + "px");
					}
					else
					{
						panel.css('max-height', "0px");
					} 
				}

				acc.on('click', function()
				{
					if(acc.hasClass('active'))
					{
						close_all();
					}
					else
					{
						open_acc();
					}

					setTimeout(function()
					{
						$(window).trigger('resize.px.parallax');
					}, 500);
				});

				function close_all()
				{
					accs.removeClass('active');
					accs.each(function()
					{
						var tempAcc = $(this);
						var tempPanel = $(tempAcc.find($('.accordion_panel')));
						tempPanel.css('max-height', "0px");
					});
				};

				function open_acc()
				{
					close_all();
					acc.addClass('active');
					
					if(panel.css('max-height') == "0px")
					{
						panel.css('max-height', panel.prop('scrollHeight') + "px");
					}
					else
					{
						panel.css('max-height', "0px");
					} 
				};
			});
		}

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 500);
	}

	/* 

	10. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_slider').length)
		{
			var slider = $('.gallery_slider');
			slider.owlCarousel(
			{
				items:5,
				loop:true,
				autoplay:false,
				smartSpeed:1200,
				nav:false,
				dots:false,
				responsive:
				{
					0:{items:3},
					992:{items:5},
					1200:{items:3},
					1441:{items:4},
					1600:{items:5}
				}
			});
		}

		$(document).ready(function()
		{
			$('.gallery_slider').magnificPopup(
			{
				delegate: '.owl-item:not(.cloned) > div .gallery_slide',
				type:'image',
				gallery:
				{
					enabled: true
				}
			});
		});
	}

});