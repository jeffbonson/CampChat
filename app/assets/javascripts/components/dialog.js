function open_dialog(page)
{
	$(".dialog_box").html(page);
	$(".mask_page").addClass("is_active");
	$(".dialog_box").addClass("is_open");
	jQuery('html,body').animate({scrollTop:0},500);
	
}

function close_dialog()
{
	
	$(".dialog_box").html('');
	$(".mask_page").removeClass("is_active");
	$(".dialog_box").removeClass("is_open");
	

	
}


$(document).on('click', '.close-dialog', function()
{
	close_dialog();
});

$(document).on('click', '.mask_page', function()
{
	var inputPresent = 0;
	
	$(".dialog-wrapper").find("input[type=text]").each(function()
	 {
    	
		if($(this).val().length > 0)
		{
			inputPresent += 1
		}
	}); 
	
	if(inputPresent == 0)
	{
		close_dialog();
	}
	else
	{
		
	}
	
	
});

$(document).on('click', '.footer-box .cancel', function()
{
	close_dialog();
});