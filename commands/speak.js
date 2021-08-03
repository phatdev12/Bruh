const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const { getAudioUrl } = require('google-tts-api')

//------module
module.exports = {
  name: 'speak',
  description: "This is ping!",
  execute(message, args, client){;
    const pingEmbed = new MessageEmbed()      
      if(!args[0]) return message.channel.send('Please enter something to say !')
      const string = args.slice().join(' ')
      if (string > 500) return message.channel.send('Please enter less than 500 characters !')
      const voicechan = message.member.voice.channel;
      if (!voicechan) return message.reply('You must go to `voice channel`')
      const audio = getAudioUrl(string, {
        lang: "en",
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
      });
      try {
        voicechan.join().then(connection => {
          const dispatchers = connection.play(audio);
          dispatchers.on('finish', () => {
            voicechan.leave();
          })
        })
      }
      catch(e){
        message.channel.send('Bot Error -_-')
        console.error(e)
      }
  }
}