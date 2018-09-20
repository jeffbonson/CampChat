class MessagesController < ApplicationController
  
  def new
   @user = User.find(params[:user_id])
   @uuid = [params[:user_id].to_s,current_user.id.to_s].sort().join("-")
   @messages = Message.where("uuid = ?",@uuid).order("created_at")
   @message = Message.new()
    
  end
  
  def create
    @message = Message.new(message_params)
    if @message.save
      @success = true
    else
      @success = false
    end
  end
  
   private
   
   def message_params
    params.require(:message).permit(:content,:from,:to,:uuid)
  end
  
end
