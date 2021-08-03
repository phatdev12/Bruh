const { MessageEmbed } = require("discord.js");
const distube = require("distube")

module.exports = {
  name: 'queue',
  execute(message, args, client, serverQueue){
    if(!serverQueue) return message.reply('There Is No Music Being Played, Cant Show Queue.') // If No Music Is Being Played or BOT Isn't In VC.

        const q = serverQueue.songs

        const embed = new MessageEmbed()
        .setTitle('Audio List')
        .setColor('#ffb145')
        for (var key in q) { embed.addFields({ name: '\u200b' + `${parseInt(key) + 1}` + ') ' + `\`${q[key].title}\``,
    value: '.' }) }
    message.channel.send(embed)
  }
}