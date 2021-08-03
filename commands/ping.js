const {MessageEmbed} = require('discord.js')
module.exports = {
  name: 'ping',
  description: "This is ping!",
  execute(message, args, client){
    const pingEmbed = new MessageEmbed()
      .setFooter('Bruhh', 'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/181282250_504799057544088_8090273501818269906_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=MZgzcEAsLR0AX-oZpQo&_nc_ht=scontent-xsp1-3.xx&oh=3487a506ed5011815348bf8433d5cf60&oe=60CA39C9')
      .setTitle(`<a:wave:868782469011353630> pong ${client.ws.ping} ms`)
      .setColor('#0099ff')
      message.channel.send(pingEmbed);
  }
}