const ms = require('ms');
module.exports = {
  name: 'unmute',
  execute(message, args,client){
    const target = message.mentions.users.first();
    if(target){
        let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

        let memberTarget= message.guild.members.cache.get(target.id);

        memberTarget.roles.remove(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } else{
        message.channel.send('Cant find that member!');
    }
  }
}