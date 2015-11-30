var site = {
	// run first
	run: function(){
		// run when the dom is ready
		$(document).ready(function(){ site.ready(); });
		// run when resources are fully loaded
		$(window).load(function(){ site.load(); });
		// run now
		site.asap();
	},	
	// run now
	asap: function(){
		site.fonts();
		site.lightbox();
		site.modal();
		site.cta();
		site.ga();
	},
	// run when dom ready
	ready: function(){
		//site.slide();
		site.fader();
	},
	// load when window completely loaded
	load: function(){
		
	},
	// typekit
	fonts: function(){
		document.write('\x3Cscript type="text/javascript" src="//use.typekit.net/xqq3xtt.js">\x3C/script>');
		document.write('\x3Cscript type="text/javascript">try{Typekit.load();}catch(e){}\x3C/script>');
	},
	// slide scrolling
	slide: function(){
		$('a[href^=#]').on('click',function(){
			var href = $(this).attr('href');
			var hash = href.split('#').pop();
			if ( hash.length ) {
				var target = $('#'+hash);
				if ( target ) {
					var offset = target.offset().top;
					$('html,body').animate({scrollTop:offset},500);
				}
				return false;
			}
		});
	},
	// load google analytics
	ga: function(){

			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-31580170-1']);
			_gaq.push(['_trackPageview']);

			(function() {
			  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();

	},
	fader: function(){
		$('.fader').each(function(){
			var fader = $(this);
			var timer = $(this).attr('data-timer');
			timer = ( timer ) ? timer : 5000;
			var content = $(this).find('.fader-content');
			var children = content.children();
			if ( children.length ) {
				var wrapper = $('<div class="fader-wrapper" data-current="0" data-total="'+children.length+'"/>');
				wrapper.css({
					width: (children.length*100)+'%',
					left: 0
				});
				wrapper.append(children);
				content.append(wrapper);
			}
			var cycle = setInterval(function(){ jump.next(); },timer);
			function restart(){
				cycle = setInterval(function(){ jump.next(); },timer);
			}
			var jump = {
				current: function(){ return Number(content.find('.fader-wrapper').attr('data-current')); },
				total: function(){ return Number(content.find('.fader-wrapper').attr('data-total')); },
				future: function(){ return ( jump.current() + 1 >= jump.total() ) ? 0 : jump.current() + 1; },
				past: function(){ return ( jump.current() == 0 ) ? jump.total() - 1 : jump.current() - 1; },
				next: function(){
					content.find('.fader-wrapper').fadeOut(500,function(){
						var future = jump.future();
						$(this).attr('data-current',future).css('left','-'+(future*100)+'%').fadeIn(500);
					});
				},
				prev: function(){
					content.find('.fader-wrapper').fadeOut(500,function(){
						var past = jump.past();
						$(this).attr('data-current',past).css('left','-'+(past*100)+'%').fadeIn(500);
					});
				}
			};
			fader.find('.fader-previous').on('click',function(){
				fader.find('.fader-wrapper').stop();
				clearInterval(cycle);
				jump.prev();
				restart();
				return false;
			});
			fader.find('.fader-next').on('click',function(){
				fader.find('.fader-wrapper').stop();
				clearInterval(cycle);
				jump.next();
				restart();
				return false;
			});
		});
	},
	lightbox : function() {
		$(document).on('click','a[target="lightbox"]',function(){
			var this_href = $(this).attr('href');
			var embed = $('<iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>');
			embed.attr('src',this_href+'?autoplay=1&modestbranding=1&showinfo=0&theme=light&rel=0');
			var lightbox = $('\
				<div class="lightbox">\
					<div class="lightbox-content">\
						<div class="lightbox-body">\
							<div class="embed">\
								<div class="embed-content"></div>\
								<a href="#" class="lightbox-close"></a>\
							</div>\
						</div>\
					</div>\
				</div>\
			');
			lightbox.find('.embed-content').append(embed);
			$('body').append(lightbox);
			$('.lightbox').animate({opacity:1},500);
			return false;
		});
		$(document).on('click','a.lightbox-close',function(){
			$('.lightbox').animate({opacity:0},500,function(){
				$(this).remove();
			});
			return false;
		});
	},
	cta: function(){
		$(document).on('submit','.form.cta',function(){
			$('#factsheet').css({display:'block'}).animate({opacity:1},500);
		});
	},
	modal: function(){
		$(document).on('click','a[target="modal"]',function(){
			var href = $(this).attr('href');
			$(href).css({display:'block'}).animate({opacity:1},500);
			return false;
		});
		$(document).on('click','a.modal-close',function(){
			$('.modal').animate({opacity:0},500,function(){
				$(this).hide();
			});
			return false;
		});
		$(document).on('submit','form[data-modal-submit]',function(){
			var content = $(this).attr('data-modal-submit');
			$(this).hide().after('<h3 id="#formtext" style="text-align: center;">'+content+'</h3>');
		});
	}
}

// trigger initial scripts
site.run();
