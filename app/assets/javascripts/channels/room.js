App.room = App.cable.subscriptions.create(

  {
    channel: 'RoomChannel',
   
  },
 
{
  connected: function() {},
  
  disconnected: function() {},
  
  received: function(data) 
  {
  	
	
	$.each(data, function(key, value) {
	      //alert(key+"=="+value)
	});

	
	var unread = parseInt($("#unread_message_"+data['posted_to']+"_"+data['posted_from']).text());
	
	unread += 1;
	$("#unread_message_"+data['posted_to']+"_"+data['posted_from']).html(unread)
	$("#unread_message_"+data['posted_to']+"_"+data['posted_from']).parent().show();
	to_uuid = data['posted_to']+"-"+data['posted_from']
	from_uuid = data['posted_from']+"-"+data['posted_to']
	
	content1 = get_chat_row("right_align",data['message'],data['created_at'])
	content2 = get_chat_row("left_align",data['message'],data['created_at'])
	

	
   	$('.handshake-'+from_uuid).append(content1);
	$('.handshake-'+to_uuid).append(content2); 
		
	
	
	
  },
  
  speak: function(content,posted_from,posted_to,created_at) 
  {
  	//from create.js
	// to room_channel.rb
  	return this.perform('speak', {
		message: content,
		posted_from: posted_from,
		posted_to: posted_to,
		created_at: created_at}
		);
	
  },
  
  
  
  
  
 
  
});

function get_chat_row(class_name,message_content,created_at)
{
	content =""
	content += "<div class='message'>"
	content += "<div class='message_row_wrapper'>"
	content += "<div class='message_row "+class_name+"'>"
	content += "<div class='content'>"+message_content+"</div>"
	content += "<div class='duration'>"+created_at+"</div>"
	content += "</div>"
	content += "</div>"
	content += "</div>"
	
	return content
   	
}

