const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'translate',
  Description: 'hello',
  execute(message, args, client){
    const translator = require('@iamtraction/google-translate')
    const word = args.slice().join(' ')
    if(!word) return message.channel.send('Please enter something !')
    const translated = translator(word, { to : 'vi'})
    const tranmess = new MessageEmbed()
    .setAuthor('Bruhh Translate' ,'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .setDescription(`**From :** ${word}\n **Translate :** ${translated.text}`)
    message.channel.send(tranmess)
  }
}