window.onresize = test1;
	
	function shrinkIFrame()
	{
		var width = screen.width;
		var width1 =  $(window).width();
		if((width-width1)<=20)
		{
			$('html').addClass('revolution_screen');
		}
		else
		{
			//$('html').removeClass('revolution_screen');	
		}
	}
	
	var height_colleft =  $(window).height() - 40;
	var height_friend_list =  $(window).height();
	$('#leftCol').css('height',height_colleft);
	$('.main_right').css('height',height_colleft);
	$('#friend_list').css('height',height_friend_list);
	$('#friend_online').css('height',(height_friend_list-410));
	$('#search_friend').css('margin-top','0px');

	function test1()
	{
		var width = screen.width;
		var width1 =  $(window).width();
		
		if((width-width1)<=20)
		{
			$('html').addClass('revolution_screen');
		}
		else
		{
			//$('html').removeClass('revolution_screen');	
		}
	}