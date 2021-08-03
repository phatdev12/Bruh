const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name : 'say',
  execute(message, args, client){
    let chui = args.slice().join(' ')
    if(message.deletable) message.delete()
    if(!chui) return message.channel.send("Please enter `something`")
    message.channel.send(`${chui}`)
  }
}