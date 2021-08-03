const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'ship',
  description: 'ship',
  execute(message, args, client){
    let userss = message.mentions.users.first()
    let RN = Math.floor(Math.random() * 100) + 1

    if(!userss) return message.channel.send('please mention member to ship')

    const Unlove = new MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://media.discordapp.net/attachments/845159974732824601/845536311048798238/broken-heart.png?width=434&height=434')
    .setDescription(`${message.author} shipped with ${userss} and it is ${RN}%`)

    const love = new MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://media.discordapp.net/attachments/845159974732824601/845536315524120586/heart.png?width=434&height=434')
    .setDescription(`${message.author} shipped with ${userss} and it is ${RN}%`)

    if (RN > 50){
        message.channel.send(love)
    } else {
        message.channel.send(Unlove)
    }
  }
}