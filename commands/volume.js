const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'vol',
    execute(message, args, client, serverQueue){
        let title, number
        let argument = args.join(' ')
        const channel = message.member.voice.channel
        if(!channel)  return message.reply('You need To Be In VC to Change Volume.') // If Member Isn't in VC
        if(!serverQueue) return message.reply('No Song Is Being Played.')
        if(!argument) { title = 'Current Volume'; number= serverQueue.volume } // If No Number is Provided BOT Will Send Current Volume
        else {
            let set = parseInt(argument)
            if(isNaN(set)) return message.reply('Volume Needs To Be A Number.') // If Volume Number Isn't Number
            else if(set > 100) return message.reply('Volume Cant Be Greater Then 100.') // If Volume Is Greater Than 100
            else if(set < 0) return message.reply('Volume Cant Be -ve') // If Volume Is -ve or Less Then 0
            serverQueue.volume = set
            serverQueue.connection.dispatcher.setVolumeLogarithmic(set / 100)
            title = 'Volume Set To'
            number = set
        }

        const embed = new MessageEmbed()
        .setTitle(title)
        .setColor('#ffb145')
        .setDescription(number)
        .setThumbnail('https://media.discordapp.net/attachments/848893653857468417/850944364960022568/Artboard_1.png?width=434&height=434')
        .addField('Volume Changed By:-', message.author)
        .setFooter('Volume')
        message.channel.send(embed)
    }
}