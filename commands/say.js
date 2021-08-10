const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name : 'say',
  execute(client, message, args){
    let chui = args.slice().join(' ')
    if(message.deletable) message.delete()
    if(!chui) return message.channel.send("Please enter `something`")
    message.channel.send(`${chui}`)
  }
}