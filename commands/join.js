module.exports = {
  name: 'join',
  description: 'join',
  async execute(message, args, client){
    client.on("ready", () => {
      const channel = client.channels.get("863412548027547699");
      if (!channel) return console.error("The channel does not exist!");
      channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      });
    });

  }
}