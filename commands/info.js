const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'info',
  description: 'Info',
  execute(message, args, client){
    const info = new MessageEmbed()
    .setAuthor('| Bruhh Bot' ,'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .setImage('https://media.discordapp.net/attachments/848893653857468417/850984125418438666/bannerArtboard_1.png?width=1025&height=355')
    .setDescription('This bot is created and developed by @❰𝓐.𝓒❱ | Python.exe ⚑#8143, anhmydaika123#4445.\n Please use `br!help` to open help list !. Launched on April 10, 2021\n **Bruhh : Open the world of music !** \n------------------------------------------\n **Support :** https://discord.gg/McDhZpDDZM\n **Website :** https://bruhhbot.000webhostapp.com/')
    message.channel.send(info)
  }
}