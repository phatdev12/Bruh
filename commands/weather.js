const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const weather = require("weather-js");
module.exports = {
  name: 'weather',
  description: 'weather',
  execute(message, args, client){
    let city = args.join(" ");
    let degreetype = "C";

    weather.find({search: city, degreetype: degreetype}, function(err, result){
      if (!city) return message.channel.send("Vui lòng chọn thành phố");
      if (err || result === undefined || result.length === 0) return message.channel.send("Không biết thành phố, vui lòng thử lại")

      let current = result[0].current;
      let location = result[0].location;

      const em = new MessageEmbed()
      .setAuthor(current.observationpoint)
      .setDescription(`> ${current.skytext}`)
      .setThumbnail(current.imageUrl)
      .setTimestamp()
      .setColor('RANDOM')

      em.addField("Latitude", location.lat, true)
      .addField("Longtube", location.long, true)
      .addField("Feels Like", `${Math.floor((current.feelslike - 32) / 1.8000)}° C  Degree`, true)
      .addField("Degree Type", location.degreetype, true)
      .addField("Winds", current.winddisplay, true)
      .addField("Humidity", `GMT ${location.timezone}`, true)
      .addField("Temperature", `${Math.floor((current.temperature - 32) / 1.8000)}° C Degree`)
      .addField("Observation", current.observationtime, true)

      message.channel.send(em);
    })
  }
}