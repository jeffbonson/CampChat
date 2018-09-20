class RoomChannel < ApplicationCable::Channel
  # https://www.youtube.com/watch?v=n0WUjGkDFS0
  # https://hectorperezarenas.com/2015/12/26/rails-5-tutorial-how-to-create-a-chat-with-action-cable/
  
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def received
  end
  
  def speak(data)
    puts "testing speak #{data}"
    ActionCable.server.broadcast 'room_channel' , message: data['message'], posted_from: data['posted_from'], posted_to: data['posted_to'] ,created_at: data['created_at']
    # to rooms.js received function
  end
end
