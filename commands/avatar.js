const { Util, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'avt',
  description: 'avatar',
  async execute(message, client, args){
    const embed = new MessageEmbed()
 
    if(!message.mentions.users.first()){
        embed.setTitle("Your Avatar:")
        embed.setThumbnail(message.author.displayAvatarURL())
        embed.setDescription("This is your avatar.")
        embed.setColor("RANDOM")
        return message.channel.send(embed)
    }else{
        const user = message.mentions.users.first()
        embed.setTitle(`${user.tag}'s Avatar:`)
        embed.setThumbnail(user.displayAvatarURL())
        embed.setDescription(`This is ${user.tag}'s avatar.`)
        embed.setColor('RANDOM')
        embed.setFooter("This is a test.")
        return message.channel.send(embed)
    }
  }
}
//This returns the AvatarURL of the user
function getUserAvatar(user) {
    let avatar = user.avatarURL()
    return avatar;
}
