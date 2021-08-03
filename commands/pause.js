const { MessageEmbed } = require('discord.js');
const queue = new Map();
module.exports = {
  name: 'pause',
  execute(message, args, client, serverQueue){
    if(serverQueue && serverQueue.playing) {
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause() // Pause Music

        // Lets Go For Embed Directly
        const embed = new MessageEmbed()
        .setDescription('ㅤㅤㅤ◁ㅤㅤ▶ㅤㅤ▷ㅤㅤㅤ')
        .setColor('#ffb145')
        return message.channel.send(embed)
    }
    return message.reply('No Song Is Being Played, Can\'t Pause')
  }
}