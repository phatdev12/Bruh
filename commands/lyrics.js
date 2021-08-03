const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const pagnination = require('discord.js-pagination');
const { setSizeDependencies } = require('mathjs');
const lyricFinder = require('lyrics-finder');
module.exports = {
  name: 'lyrics',
  execute(message, args, client, serverQueue){
    let song = args.slice().join(' ')
    const page1 = new MessageEmbed()
    .setTitle("Page 1")
    .setDescription("Page 1")
    const page2 = new MessageEmbed()
    .setTitle("Page 2")
    .setDescription("Page 2")
    .setDescription
    const pages = [
      page1,
      page2
    ]
    const emoji = ["⬅", "➡"]
    const timeout = '100000'
    pagnination(message, pages, emoji, timeout)
  }
}

function finder(song, songName, message, pages){
  let fulllyrics = lyricFinder(song, songName) || "Not Found"
  for (let i = 0; i < fulllyrics.length; i += 2048){
    let lyric = fulllyrics.substring(i, Math.min(fulllyrics.length, i + 2048))
    let msg = new MessageEmbed()
      .setDecription(lyric)
    pages.push(msg)
  }
}