module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = 'br!';

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(message, args, client);
    if(cmd == 'play'){
        execute(message, serverQueue)
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
        }else{
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
    async function execute(message, serverQueue){
        const permissions = channel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.reply('I Dont Have Perms To Connect to The VC You Are In.').then(serverQueue.connection.dispatcher.end()) // If BOT Doesnot Has Connect Perms to Connect to VC.
        if(!permissions.has('SPEAK')) return message.reply('I Dont Have perms To Speak In The VC, How Can I PLay Music.')
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
        if(message.deletable) await message.delete()
        let result = await searcher.search(args.join(" "), { type: "video" })
        const songss = args.slice().join(' ')
        message.channel.send(`**Searching** \`${songss}\``)
        const songInfo = await ytdl.getInfo(result.first.url)
        if(result.first == null)
            return message.channel.send("There are no results found");
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                img: songInfo.videoDetails.thumbnails,
                second: songInfo.videoDetails.lengthSeconds
            };
            if(song.url == null){
            message.channel.send("Cannot play this song")
            return
            }
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
        if(serverQueue.connection.dispatcher.end() == null){
            return
        }
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        if(serverQueue.connection.dispatcher.end() == null){
            return
        }
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
}