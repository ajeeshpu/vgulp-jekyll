var Slideshow = Class.extend({

	init : function(slideshowDiv)
	{
		this.slideshowDiv = slideshowDiv;
		
		this.slideLength = 5;
		this.transitionLength = 0.5; /* be sure to update home.css as well */
		this.slideI = 0;
		this.slides = [];
	
		var self = this;
		this.slides = slideshowDiv.find('.slide').each(function(slide)
		{
			// add to slides array
			self.slides.push(slide);
			
			//if (self.slides.length == 1)
			//	$(slide).addClass('current');
			
			// add transition handler event
			/*
			var self_ = self;
			self.transitionHandler = function(){ self_.transitionEnded(); } // keep a reference if we ever need to remove the listener
			
			document.addEventListener('webkitTransitionEnd', self.transitionHandler, true);
			document.addEventListener('oTransitionEnd', self.transitionHandler, true);
			document.addEventListener('transitionEnd', self.transitionHandler, true);
			*/	
		});
		
		this.createPageIndicator();
	},
	
	start : function()
	{
		this.teeUpNext();
	},
	
	end : function()
	{
		clearTimeout(this.nextTO);
	},
	
	teeUpNext : function()
	{
		var self = this;
		this.nextTO = setTimeout(function()
		{
			self.next();
		}, this.slideLength * 1000);
	},
	
	next : function()
	{
		// put the new slide over the existing one and then animate it
		this.thisSlide = $(this.slides[this.slideI]);
		
		// advance and get new slide
		this.slideI++;
		if (!this.slides[this.slideI])
			this.slideI = 0;
		
		this.nextSlide = $(this.slides[this.slideI]);
		
		// add transition classes
		this.nextSlide.addClass('next');
		this.thisSlide.addClass('hide');
			
		var self = this;
		setTimeout(function(){ self.transitionEnded(); }, self.transitionLength*1000+10);
	},
	
	transitionEnded : function()
	{	
		this.nextSlide.addClass('current');
		this.thisSlide.removeClass('next');
		
		this.thisSlide.removeClass('current');
		this.thisSlide.removeClass('hide');
		
		this.teeUpNext();
		
		this.updateIndicator();
	},
	
	updateIndicator : function()
	{
		if (this.pageIndicator)
		{
			this.pageIndicator.find('.selected').removeClass('selected');
			this.pageIndicator.find('#pi_'+(this.slideI+1)).addClass('selected');
		}
	},
	
	createPageIndicator : function()
	{
		if (!this.pageIndicator)
		{
			this.pageIndicator = $('<div class="page_indicator"></div>');
			
			// add dots for pages
			var html = [];
			for(var i=1; i<=this.slides.length; i++)
			{
				html[i] = '<div id="pi_'+i+'" '+(i==0?'class="selected"':'')+'></div>';
			}
			
			this.pageIndicator.append($(html.join('')));
			
			this.slideshowDiv.append(this.pageIndicator);
			
			this.updateIndicator();
		}
	}
	
});