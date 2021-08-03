const axios = require('axios');
const fetch = require('node-fetch');
const {MessageEmbed} = require('discord.js')
require("./inline.js");

module.exports = {
  name: 'chat',
  execute(message, args, client,){
    let mesg = args.join(" ");
    if (!mesg) return message.channel.send("Please say something.");
    else {
      axios.get(`http://api.brainshop.ai/get?bid=156828&key=Pr587LwmD9paxUon&uid=1&msg=${encodeURIComponent(mesg)}`)
      .then(res => {
          let data = res.data
          let reply = data.cnt
          message.channel.send(reply)
      })     
    }
  }
}