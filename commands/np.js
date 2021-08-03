const { Util,Client, MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'np',
  execute(message, args, client, serverQueue){ // To Check If Music Is Being Played.
    if(!serverQueue) return message.reply('No Song Is Being Played.')
    const q = serverQueue.songs[0] // To Check If Music Is Being Played.
    if(!q) return message.reply('No Music Is Being Played.')
    const embed = new MessageEmbed()
    .setAuthor('Now Playing')
    .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .setTitle(`**${q.title}**`)
    .setTimestamp()
    .setColor('#ffb145')
    .setFooter('Now Playing')
    message.channel.send(embed)
  }
}