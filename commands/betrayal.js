const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'betrayal',
  description: 'betrayal',
  execute(message, args, client, channel){
    if (!channel) return message.reply("Please join a voice chat first")
    client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {
      return message.channel.send(`${invite.code}`);
    });
  }
}