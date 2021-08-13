const { Util, MessageEmbed, Collection } = require('discord.js');
module.exports = {
  name: 'avt',
  description: 'avatar',
  async execute(message, client, args){
    let user = await message.author;
    let avatar;

    //when args are given, set user to mentioned user
    if (args.length > 0) {
        let userID = args[0].slice(3, -1)
        user = message.guild.members.cache.get(userID).user;
    }

    avatar = getUserAvatar(user);


    let embed = new MessageEmbed()
        .setTitle(`Avatar ${user.tag}`)
        .setImage(avatar)
        .setColor('RANDOM')
    message.channel.send(embed)
  }
}
//This returns the AvatarURL of the user
function getUserAvatar(user) {
    let avatar = user.avatarURL()
    return avatar;
}
