const { Util,Client, MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'spotify',
  execute(message, args, client){
    let user = message.mentions.users.first() || message.author;
    if (user.presence.activity !== null || user.presence.activity.name === "Spotify" && user.presence.activity.type === "LISTENING" && user.presence.activity.assets !== null){
      let image = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`
      let url = `https://open.spotify.com/track/${status.syncID}`
      let name = user.presence.activity.details
      let artist = user.presence.activity.state
      let album = user.presence.activity.assets.largeText
      // Embed ------------------>
      const embed = new MessageEmbed()
        .setAuthor("Spotify Track Information")
        .setColor()
        .setThumbnail(image)
        .addField("Name:", name, true)
        .addField("Album:", album, true)
        .addField("Artist:", artist, true)
        .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
      message.channel.send(embed)
    } else {
      message.channel.send("No Listening")
    }
  }
}