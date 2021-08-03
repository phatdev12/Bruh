const { Util,Client, MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'remove',
  execute(message, args, client, serverQueue){  // To Check If Music Is Being Played.
    if(isNaN(parseInt(args[0])) || !args[0]) return message.reply('Enter A Valid Number.\nUse `+queue` To See Number Of Song.') // If Number Is Not A Number or Not A Valid Number.
    if(!serverQueue) return message.reply('No Song Being Played, Cant Remove Song.') // If No Song Is Being Played.
    let remove = args[0] - 1
    let arr = serverQueue.songs
    if(remove > arr.length || remove < 0 ) { return message.reply('Thats Not A Valid Number.') } // If Number Is Not Their In Queue Or -ve.

    const embed = new MessageEmbed()
    .setAuthor('Song Removed')
    .setColor('#ffb145')
    .setTitle(`Removed:- **${arr[remove].title}**`, '<a:Next:803138566091309057>')
    .setTimestamp()
    .setFooter(`Song Removed | Song Removed by:-${message.author}`)
    message.channel.send(embed)

    if(remove === 0) { skip.execute(message, ags) }
    else { arr.splice(remove, 1) }
  }
}