/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Share
5. Init Contact
6. Init Details Slider
7. Init Gallery


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var ctrl = new ScrollMagic.Controller();

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
	});

	setHeader();
	initMenu();
	initShare();
	initContact();
	initDetailsSlider();
	initGallery();

	/* 

	2. Set Header

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

	3. Init Menu

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
	}

	/* 

	4. Init Share

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

	6. Init Details Slider

	*/

	function initDetailsSlider()
	{
		if($('.details_slider').length)
		{
			var slider = $('.details_slider');
			slider.owlCarousel(
			{
				items:1,
				autoplay:false,
				loop:true,
				nav:false,
				dots:false,
				smartSpeed:1200
			});

			if($('.prev').length)
			{
				var prev = $('.prev');
				prev.on('click', function()
				{
					slider.trigger('prev.owl.carousel');
				});
			}

			if($('.next').length)
			{
				var next = $('.next');
				next.on('click', function()
				{
					slider.trigger('next.owl.carousel');
				});
			}
		}
	}

	/* 

	7. Init Gallery

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