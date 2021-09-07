const {MessageEmbed} = require('discord.js')
module.exports = {
  name: 'ping',
  description: "This is ping!",
  execute(message, args, client){
    let color;
    const pingEmbed = new MessageEmbed()
    if (client.ws.ping <= 100){
      pingEmbed.setTitle(`<:The_connection_is_excellent:853012983559225344> Connection: ${client.ws.ping} ms`);
      color = '#00ff48';
    }
    if (client.ws.ping >= 100, client.ws.ping <= 300){
      pingEmbed.setTitle(`<:The_connection_is_good:853013073718935602> Connection: ${client.ws.ping} ms`);
      color = '#ffdc2b';
    }
    else {
      pingEmbed.setTitle(`<:The_connection_is_bad:853013157374853150> Connection: ${client.ws.ping} ms`);
      color = '#ff3333';
    }
    pingEmbed.setColor(color);
    message.channel.send(pingEmbed)
  }
}