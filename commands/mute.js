const ms = require('ms');
module.exports = {
  name: 'mute',
  execute(message, args, client){
    const target = message.mentions.users.first();
    if (target) {
        let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');
        if (!muteRole) return message.channel.send(" please add `mute` role")

        let memberTarget = message.guild.members.cache.get(target.id);

        if (!args[1]) {
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted`);
            return
        }
        memberTarget.roles.add(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

        setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
        }, ms(args[1]));
    } else {
        message.channel.send('Cant find that member!');
    }
  }
}