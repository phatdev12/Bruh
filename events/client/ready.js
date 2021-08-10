module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log('Is online')
        const serverIn = client.guilds.cache.size;
        client.user.setPresence({
            activity: {
                name: `${serverIn} Servers | br!help`,
                image: "https://media.giphy.com/media/5Ztn33chuvutW/giphy.gif",
                type: 'LISTENING',
                buttons: [{label: "My Website", url: "https://bruhhbot.000webhostapp.com/"}]
            },
            status: 'LISTENING'
        })
    }
}