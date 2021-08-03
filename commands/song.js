const { MessageEmbed, RichEmbed } = require("discord.js");

module.exports = {
  name: 'song',
  execute(message, args, client, serverQueue, result, songInfo){
    let song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        img: songInfo.videoDetails.thumbnails,
        second: songInfo.videoDetails.lengthSeconds,
        view: songInfo.videoDetails.viewCount,
    }
    const songinf = new MessageEmbed()
    .setAuthor('Bruhh Bot' ,'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .setTitle(`${song.title}`)
    .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
    .addField("Time" , song.second, true)
    .addField("View" , song.view, true)
    .setColor("#ffb145")
    message.channel.send(songinf)
    
  }
}
