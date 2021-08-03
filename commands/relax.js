const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const { SONG } = require('../config.json')
const ytdl = require('ytdl-core');

module.exports = {
  name: 'relax',
  async execute(message, args, client, serverQueue, channel){
    try{
      const connection = await message.member.voice.channel.join();
      const music = 'https://www.youtube.com/watch?v=aBkTkxKDduc&t=125s';
      const dispatcher = connection.play(ytdl(music));
      dispatcher.on("end", async () => {
          connection.channel.disconnect();
      });
      const embed = new MessageEmbed()
        .setDescription('Relax mode is on you have 3 minutes to relax ')
        .setColor('#ffb145')
        return message.channel.send(embed)
    }
    catch(err){
      message.channel.send('Relax mode is on you can\'t use any music related commands ')
    }
    
    
    
  }
}