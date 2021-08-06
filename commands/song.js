const { MessageEmbed, RichEmbed } = require("discord.js");


module.exports = {
  name: 'song',
  async execute(message, args, client, serverQueue, searcher, ytdl){
    let results = await searcher.search(args.join(" "), { type: "video" })
    const songInfos = await ytdl.getInfo(result.first.url)
    let song = {
        title: songInfos.videoDetails.title,
        url: songInfos.videoDetails.video_url,
        img: songInfos.videoDetails.thumbnails,
        second: songInfos.videoDetails.lengthSeconds,
        view: songInfos.videoDetails.viewCount,
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
