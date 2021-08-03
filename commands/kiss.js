const { Util,Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'kiss',
  description: 'kiss',
  execute(message, args, client){
    const usersss = message.mentions.users.first()
    rand = [
        'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
        'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
        'https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif',
        'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
        'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
        'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
        'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
        'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif',
        'https://media.giphy.com/media/MQVpBqASxSlFu/giphy.gif'
    ]
    const kissem = new MessageEmbed()
    .setDescription(`${message.author} kiss ${usersss}`)
    .setImage(rand[Math.floor(Math.random()*rand.length)])
    .setTimestamp()         
    return message.channel.send(kissem);
  }
}