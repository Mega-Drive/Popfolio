/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Share
5. Init Contact
6. Init Progress Bars
7. Init Milestones
8. Init Rotator
9. Init Gallery


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
	initProgressBars()
	initMilestones();
	initRotator();
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

	6. Init Progress Bars

	*/

	function initProgressBars()
	{
		if($('.skill_bars').length)
		{
			var eles = $('.skill_bars');
			var gradNum = 0;

			eles.each(function(i)
			{

				var ele = $(this);
	    		var elePerc = ele.data('perc');
	    		var eleName = '#'+ele.data('name');
	    		var eleColorStart = ele.data('color-start');
	    		var eleColorEnd = ele.data('color-end');
	    		var eleGradient = 'url(#gradient' + gradNum.toString() +')';
	    		let linearGradient = '<defs><linearGradient id="gradient' + gradNum + '" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"><stop offset="20%" stop-color="'+ eleColorStart +'"/><stop offset="50%" stop-color="'+ eleColorEnd+'"/></linearGradient></defs>';
	    		
	    		var statsScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var pbar = new ProgressBar.Line(eleName, 
		    		{
		    			strokeWidth: 1,
						easing: 'easeInOut',
						duration: 1400,
						color: eleGradient,
						trailColor: '#e9eaeb',
						trailWidth: 1,
						svgStyle: {width: '100%', height: '100%'},
						text: {
							style: {
								position: 'absolute',
								right: '0',
								top: '-20px',
								padding: 0,
								margin: 0,
								transform: null
								},
								autoStyleContainer: false
						},
						step: (state, bar) => {
						bar.setText(Math.round(bar.value() * 100) + ' %');
						}
		    		});
		    		pbar.animate(elePerc);
					pbar.svg.insertAdjacentHTML('afterBegin', linearGradient);
		    	})
		    	.addTo(ctrl);
		    	gradNum++;
			});
		}	
	}

	/* 

	7. Init Milestones

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

	8. Initialize Rotator

	*/

	function initRotator()
	{
		setTimeout(function()
		{
			$('.rotate').css('opacity', '1');
		},200);
		
		$('.rotate').Morphext(
		{
			// The [in] animation type. Refer to Animate.css for a list of available animations.
		    animation: "fadeIn",
		    // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		    separator: ",",
		    // The delay between the changing of each phrase in milliseconds.
		    speed: 5000
		});
	}

	/* 

	9. Init Gallery

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