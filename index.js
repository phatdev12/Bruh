const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const { executionAsyncResource } = require('async_hooks');
const client = new Client();
const { Player } = require("discord-player");
const fetch = require('node-fetch');
const discordButtons = require("discord-buttons-plugin")
const buttonClient = new discordButtons(client)
const player = new Player(client);
require('discord-buttons')(client);
const ytdl = require('ytdl-core');
const translator = require('@iamtraction/google-translate')
const weather = require("weather-js");
const config = require('./package.json');
const fs = require("fs");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const { YTSearcher } = require('ytsearcher');
client.commands = new Collection();
client.cooldown = new Collection();
client.db = require("quick.db");
const commandfile = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandfile ){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

client.config = {
    cooldown: 15000
};
let settings = {method: "Get"};
let data;
const prefix = 'br!';

client.player = player;
const queue = new Map();
const searcher = new YTSearcher({
    key: "AIzaSyDR-u6HYCKbrGak43RL0siTGMhgVypTGO8",
    revealed: true
});
client.once('ready', () => {
    const serverIn = client.guilds.cache.size;
    console.log('Is Online !')
    client.user.setPresence({
        activity: {
            name: `${serverIn} Servers | br!help`,
            image: "https://media.giphy.com/media/5Ztn33chuvutW/giphy.gif",
            type: 'LISTENING',
            buttons: [{label: "My Website", url: "https://bruhhbot.000webhostapp.com/"}]
        },
        status: 'LISTENING'
    }) 
});
client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return
    //This is our server queue. We are getting this server queue from the global queue. 
    const server_queue = queue.get(message.guild.id);
    //const queues = queue
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const serverQueue = queue.get(message.guild.id);
    let result = await searcher.search(args.join(" "), { type: "video" })
    const songInfo = await ytdl.getInfo(result.first.url)
    xp(message);
    const channel = message.member.voice.channel;
    const cmd = args.shift().toLowerCase();
    if (cmd == 'ping'){
      client.commands.get('ping').execute(message, args, client)
    }
    if (cmd == 'info'){
      client.commands.get('info').execute(message, args, client)
    }
    if (cmd == 'rank'){
      client.commands.get('rank').execute(message, args, client)
    }
    if (cmd == 'speak'){
      client.commands.get('speak').execute(message, args, client)
    }
    if (cmd == "leave"){
      client.commands.get('leave').execute(message, args, client, channel)
    }
    if (cmd == "queue"){
      client.commands.get('queue').execute(message, args, client, serverQueue)
    }
    if (cmd == "join"){
      client.commands.get('join').execute(message, args, client)
    }
    if (cmd == 'translate'){
      client.commands.get('translate').execute(message, args, client)
    }
    if (cmd == 'help'){
      client.commands.get('help').execute(message, args, client)
    }
    if (cmd == 'avt') {
      client.commands.get('avt').execute(message, args, client)
    }
    if (cmd == 'lyric'){
      client.commands.get('lyrics').execute(message, args, client, serverQueue)
    }
    if(cmd == 'play'){
      const songss = args.slice().join(' ')
      const permissions = channel.permissionsFor(message.client.user)
      if(!permissions.has('CONNECT')) return message.reply('I Dont Have Perms To Connect to The VC You Are In.').then(serverQueue.connection.dispatcher.end()) // If BOT Doesnot Has Connect Perms to Connect to VC.
      if(!permissions.has('SPEAK')) return message.reply('I Dont Have perms To Speak In The VC, How Can I PLay Music.')
      else{
        message.channel.send(`**Searching** \`${songss}\``)
        execute(message, serverQueue)
      }
    }
    if(cmd == 'loop'){
      loop(args, serverQueue)
    }
    if(cmd == 'stop'){
      stop(message, serverQueue)
    }
    if(cmd == 'skip'){
      skip(message, serverQueue)
    }
    if (cmd == 'say'){
      client.commands.get('say').execute(message, args, client)
    }
    if (cmd == 'wiki'){
        client.commands.get('wiki').execute(message, args, client)
        
    }
    if (cmd == 'chat'){
      client.commands.get('chat').execute(message, args, client)
    }
    if (cmd == 'resume'){
      client.commands.get('resume').execute(message, args, client, serverQueue)
    }
    if (cmd == 'pause'){
      client.commands.get('pause').execute(message, args, client, serverQueue)
    }
    if (cmd == 'meme'){
        client.commands.get('meme').execute(message, args, client)
    }
    if (cmd == 'kiss'){
        client.commands.get('kiss').execute(message, args, client)
    }
    if (cmd == 'mute' || cmd == 'cam'){
      client.commands.get('mute').execute(message, args, client)
    }
    if (cmd == 'unmute'){
      client.commands.get('unmute').execute(message, args, client)
    }
    if (cmd == 'ytt'){
      client.commands.get('ytt').execute(message, args, client, channel)
    }
    if (cmd == 'poker'){
      client.commands.get('poker').execute(message, args, client, channel)
    }
    if (cmd == 'betrayal' || cmd == 'betrayal.io'){
      client.commands.get('betrayal').execute(message, args, client, channel)
    }
    if (cmd == 'fishington' || cmd == 'fishington.io'){
      client.commands.get('fish').execute(message, args, client, channel)
    }
    if (cmd == 'weather'){
        client.commands.get('weather').execute(message, args, client)
    }
    if (cmd == 'ship'){
        client.commands.get('ship').execute(message, args, client)
    }
    if (cmd == 'spotify'){
      let user = message.mentions.users.first() || message.author;

      if(user.presence.activities !== null && user.presence.activities.type === 'LISTENING' && user.presence.activities[0].name === 'Spotify') {

          let trackIMG = `https://i.scdn.co/image/${user.presence.activities[0].assets.largeImage.slice(8)}`;
          let trackURL = `https://open.spotify.com/track/${user.presence.activities[0].syncID}`;
          let trackName = user.presence.activities[0].details;
          let trackAuthor = user.presence.activities[0].state;
          let trackAlbum = user.presence.activities[0].assets.largeText;

          const embed = new MessageEmbed()
              .setAuthor('Spotify Track Info', 'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
              .setColor("#ffb145")
              .setThumbnail(trackIMG)
              .addField('Song Name', trackName, true)
              .addField('Album', trackAlbum, true)
              .addField('Author', trackAuthor, false)
              .addField('Listen to Track', `${trackURL}`, false)
              .setFooter(message.member.displayName, message.author.displayAvatarURL())
              .setTimestamp()

          message.channel.send(embed);
      } else {
          message.channel.send('**This user isn\'t listening to Spotify!**');
      }
    }
    if (cmd == 'wikip'){
        const wiki1 = args.slice().join(' ')
        if(!wiki1) return message.reply('Provide A Query To Search.') // If Nothing Is Searched
        const url = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki1)}` // From Here BOT Will Search For It

        let response
        try {
            response = await fetch(url).then(res => res.json())
        }      
        catch (e) {
            return message.reply('An Error Occured, Try Again.')
        }

        try {
            if(response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setURL(response.content_urls.desktop.page)
                .setDescription([`
                ${response.extract}
                Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
                message.channel.send(embed)
            }
            else { // If Only One Result
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(response.title)
                .setThumbnail(response.thumbnail.source)
                .setURL(response.content_urls.desktop.page)
                .setDescription(response.extract)
                message.channel.send(embed)
            }
        }
        catch(err){
            return message.reply('Provide A Valid Query To Search.') // If Searched Query Is Not Available
        }
    }
    if (cmd == 'covid19'){
        client.commands.get('covid').execute(message, args, client)
    }
    if (cmd == 'volume' || cmd == 'vol'){
      client.commands.get('vol').execute(message, args, client, serverQueue)
    }
    if (cmd == 'relax'){
      client.commands.get('relax').execute(message, args, client, serverQueue, channel)
    }
    if (cmd == 'nowplaying' || cmd == 'np'){
      client.commands.get('np').execute(message, args, client, serverQueue)
    }
    if (cmd == 'remove' || cmd == 'remov'){
      client.commands.get('remove').execute(message, args, client, serverQueue)
    }
    if (cmd == 'song'){
      client.commands.get('song').execute(message, args, client, serverQueue, result, songInfo)
    }
    async function execute(message, serverQueue){
      try{
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
          if(result.first == null)
            return message.channel.send("There are no results found");
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                img: songInfo.videoDetails.thumbnails,
                second: songInfo.videoDetails.lengthSeconds
            };
 
            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 50,
                    playing: true
                };
                queue.set(message.guild.id, queueConstructor);
 
                queueConstructor.songs.push(song);
 
                try{
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Unable to join the voice chat ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`The song has been added ${song.url}`);
            }
        }
      }
      catch(err){
        message.channel.send("Can't play other links, please use Youtube link")
      }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                if(serverQueue.loopone){
                  play(guild, serverQueue.songs[0]);
                }
                else if(serverQueue.loopall){
                  serverQueue.songs.push(serverQueue.songs[0]);
                  serverQueue.songs.shift();
                } else {
                  serverQueue.songs.shift();
                }
                play(guild, serverQueue.songs[0]);
            })
            const songinf = new MessageEmbed()
            .setAuthor('Bruhh Bot' ,'https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
            .setTitle(`Now playing ${serverQueue.songs[0].title}`)
            .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
            .setDescription(`${serverQueue.songs[0].second} |⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴⫴|\n **Hope you have a good time**`)
            .setColor("#ffb145")
            serverQueue.txtChannel.send(songinf)
    }

    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first!")
        serverQueue.songs = [];
        
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        serverQueue.connection.dispatcher.end();
    }
    function loop(args, serverQueue){
      if (args.length < 1) return message.channel.send("Please specify what loop you want `br!loop <all/one/off>`")
      switch(args[0].toLowerCase()){
        case 'all':
          serverQueue.loopall = !serverQueue.loopall;
          serverQueue.loopone = false;

          if (serverQueue.loopall == true)
            message.channel.send("Loop all has been turned on!")
          else
            message.channel.send("Loop all has been turned off!")
          break;
        case 'one':
          serverQueue.loopone = !serverQueue.loopone;
          serverQueue.loopall = false;

          if (serverQueue.loopone == true)
            message.channel.send("Loop one has been turned on!")
          else
            message.channel.send("Loop one has been turned off!")
          break;
        case 'off':
            serverQueue.loopone = false;
            serverQueue.loopall = false;
            message.channel.send("Loop has been turned off!")
          break;
      };
    }
    function doKissAction() {
        var rand = [
            'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
            'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
            'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
            'https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif',
            'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
            'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
            'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
            'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
            'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif',
            'https://media.giphy.com/media/l2Je2M4Nfrit0L7sQ/giphy.gif',
            'https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif',
            'https://media.giphy.com/media/prBaGUi1Vmy9a/giphy.gif'

        ];
     
        return rand[Math.floor(Math.random() * rand.length)];
    }
});
function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let xp = client.db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}



client.login("ODQ0NjE0MTUwNTkxNDc5ODQ4.YKU-OQ.srjq_C5bYC9CKC9TVPadxWsgiNQ");