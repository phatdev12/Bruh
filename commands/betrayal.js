const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'betrayal',
  description: 'betrayal',
  execute(message, args, client, channel){
    if (!channel) return message.reply("Please join a voice chat first")
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite =>{
            if(!invite.code) return message.reply(":x: Cannot start minigame")
            message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`)
    })
  }
}