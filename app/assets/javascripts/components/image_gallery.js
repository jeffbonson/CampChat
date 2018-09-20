$(document).on('click', '.close_image_gallery', function(){
    jQuery(".image_gallery_window").fadeOut();
    
    
});

$(document).on('click', '.gallery_image', function(e)
	{
		
		var selectedIndex = $(this).attr("data-index");
		var selectedSource = $(this).attr("src");
		var imageGalleryArray = []
		var imageCount = 0;
		
		$(".gallery_image").each(function(a)
		{
			imageCount += 1
			imgSource = $(this).attr('src');
			imgIndex = $(this).attr("data-index");
			$(".image_gallery_data").attr("data-"+imgIndex,imgSource)
			
		})
		$(".image_gallery_data").attr("data-count",imageCount)
		
		jQuery(".image_gallery_window").fadeIn();
		
		$(".image_gallery_window table tr td.content img").attr("src",selectedSource);
		$(".image_gallery_window table tr td.content img").attr("data-index",selectedIndex);
		
		$(".galleryLeft").hide();
		
		if(imageCount > 0)
		{
			
			if(imageCount == 1)
			{
				
				$(".galleryRight").hide();
			}
			else
			{
				
				$(".galleryRight").show();	
			}
		}
		else
		{
			$(".galleryRight").hide();
		}
	});


$(document).on('click', '.galleryLeft', function(e)
	{
		var currentIndex = parseInt($(".image_gallery_window table tr td.content img").attr("data-index"));
		var previousIndex = currentIndex - 1;
		var totalCount = parseInt($(".image_gallery_data").attr("data-count"))
		if(previousIndex >= 0)
		{
			$(".galleryLeft").show();
			$(".galleryRight").show();
			var image_source = $(".image_gallery_data").attr("data-"+previousIndex);
			$(".image_gallery_window table tr td.content img").hide();
			$(".image_gallery_window table tr td.content img").attr("src",image_source);
			$(".image_gallery_window table tr td.content img").attr("data-index",previousIndex);
			$(".image_gallery_window table tr td.content img").fadeIn();
			if(previousIndex == 0)
			{
				$(".galleryLeft").hide();
			}
		}
		else
		{
			$(".galleryLeft").hide();
			$(".galleryRight").show();
		}
		
		
	});

	
$(document).on('click', '.galleryRight', function(e)
	{
		var currentIndex = parseInt($(".image_gallery_window table tr td.content img").attr("data-index"));
		var nextIndex = currentIndex + 1;
		var totalCount = parseInt($(".image_gallery_data").attr("data-count"))
		if(nextIndex < totalCount)
		{
			$(".galleryRight").show();
			$(".galleryLeft").show();
			
			var image_source = $(".image_gallery_data").attr("data-"+nextIndex);
			$(".image_gallery_window table tr td.content img").hide();
			$(".image_gallery_window table tr td.content img").attr("src",image_source);
			$(".image_gallery_window table tr td.content img").attr("data-index",nextIndex);
			$(".image_gallery_window table tr td.content img").fadeIn();	
			
			if(nextIndex == totalCount-1)
			{
				$(".galleryRight").hide();
			}
		}
		else
		{
			$(".galleryRight").hide();
			$(".galleryLeft").show();
		}
		
		
	});