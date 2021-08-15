const { MessageEmbed, RichEmbed} = require('discord.js');
module.exports = {
  name: 'help',
  description: 'help',
  execute(message, args, client){
    const command = args.slice().join(' ')
    const help = new MessageEmbed()
      .setAuthor('Bruhh Bot' ,'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
      .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
      .setDescription("**Prefix :** `br!`.")
      .addField("Play Music", "`play`, `stop`, `skip`, `resume`, `pause`, `nowplaying`, `remove`, `queue`, `volume`, `song`, `loop`, `relax`, `leave`, `disconnect`.")
      .addField("Fun", "`ship`, `meme`, `say`, `ping`, `ytt`, `fishington`, `fishington.io`, `poker`, `betrayal`, `betrayal.io`.",true)
      .addField("Other", "`wiki`, `covid19`, `weather`.",true)
      .setColor('#2F3136')
      .setTimestamp()
    message.channel.send(help)
  }
}