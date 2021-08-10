module.exports = async (client, message, searcher) => {
    const queue = new Map();
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = 'br!';

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const serverQueue = queue.get(message.guild.id);

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(message, args, client, queue, searcher);
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