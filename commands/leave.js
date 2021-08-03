module.exports = {
  name: 'leave',
  description: 'leave',
  execute(message, args, client, channel){
    if(!channel){
      message.channel.send("no voice")
    }else{
      channel.leave();
    }
  }
}