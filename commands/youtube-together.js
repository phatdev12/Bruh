const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const fetch = require('node-fetch');
require('@discordjs/voice');
module.exports = {
  name: 'ytt',
  description: 'ytt',
  execute(message, args, client, channel){
    if (!channel) return message.reply("Please join a voice chat first")
    if(message.member.voice.channel) {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
          return message.channel.send(`${invite.code}`);
      });
    };
  }
}