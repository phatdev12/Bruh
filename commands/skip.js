module.exports = {
    name: 'skip',
    async execute(message, args, client, serverQueue, searcher){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        if(serverQueue.connection.dispatcher.end() == null){
            return
        }
        serverQueue.connection.dispatcher.end();
    }
}