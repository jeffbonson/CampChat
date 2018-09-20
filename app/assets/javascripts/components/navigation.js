window.addEventListener("orientationchange", function() {
	//change_nav_frame_height()
	
}, false);



  

$( window ).resize(function() {
	//change_nav_frame_height()
	
});

$(document).on('click', '.nav_menu_button_frame', function()
{
	
	var menu_status = $(".nav_frame").attr("data-menu")
	
	if (menu_status == "open")
	{
		 close_nav_frame()
	}
	else
	{
		var body_width = $("header").width();
		var nav_menu_frame_width = $(".nav_menu_frame").width();
		var nav_page_frame_width = body_width - nav_menu_frame_width - 10
		
		$(".nav_menu_frame").addClass("show_nav_menu_frame");
		
		$(".nav_menu_frame").show();
		
		$(".nav_menu_frame").animate({"margin-left":0},10);
		
		$(".nav_page_frame").addClass("nav_page_frame_slider");
		
		$(".add_item_form").addClass("add_item_form_reduced");
		
		close = "<span class='fa fa-times'></span>"
		
		$(".nav_menu_button_frame").html(close)
		
		$(".nav_frame").attr("data-menu","open")
		$(".page_frame").width(body_width);
		
		
	}
});


$( window ).on( "orientationchange", function( event ) {
  close_nav_frame();
 
});

function close_nav_frame()
{
	//$(".nav_menu_frame").hide();
	
	var nmw = $(".nav_menu_frame").width()
	$(".nav_menu_frame").animate({"margin-left":-nmw},10,
	function()
	{
		$(".nav_menu_frame").removeAttr("style");
		$(".page_frame").removeAttr("style");
		$(".nav_menu_frame").removeClass("show_nav_menu_frame");
		$(".nav_frame").attr("data-menu","close");
		$(".nav_page_frame").removeClass("nav_page_frame_slider");
		$(".add_item_form").removeClass("add_item_form_reduced");
		open = "<span class='fa fa-bars'></span>"
		$(".nav_menu_button_frame").html(open)
		
	});
}


function select_nav_item(module)
{
	$(".nav_item").removeClass("nav_item_active");
	$("#"+module).addClass("nav_item_active");
}
	
function change_nav_frame_height()
{
	//$(".page_frame").removeAttr("style");
}
