const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'resume',
  execute(message, args, client, serverQueue){ 
    if(serverQueue && !serverQueue.playing) {
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume() // Resumes Music

        const embed = new MessageEmbed()
        .setDescription('ㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤ')
        .setColor('#ffb145')
        return message.channel.send(embed)
    }
    else if (serverQueue.playing) return message.reply('Song Isn\'t Pause, Cant Resume.')
  }
}