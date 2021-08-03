const { Util,Client, MessageEmbed, Collection } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
  name: 'covid',
  description: 'covid',
  execute(message, args, client){
    countrys = args.slice().join(' ');
    if (!countrys){
      fetch('https://disease.sh/v3/covid-19/all')
        .then(res1 => res1.json())
        .then((jsons) => {
          const ExampleEmbed1 = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Information about covid-19')
          .setDescription('---------------------------------')
          .addFields(
              {name: 'Number of infections', value: jsons.cases, inline: true},
              {name: 'Number of infections today', value: jsons.todayCases, inline: true},
              {name: 'Dead', value: jsons.deaths, inline: true},
              {name: 'Rehibilitate', value: jsons.recovered, inline: true},
          )
          message.channel.send(ExampleEmbed1);
      })
    }
    else {
      fetch(`https://corona.lmao.ninja/v2/countries/${countrys}`)
        .then(res => res.json())
        .then((json) => {
          const ExampleEmbed2 = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Information about covid-19 epidemic in ${json.country}`)
          .addFields(
              {name: 'Number of infections ', value: json.cases, inline: true},
              {name: 'Number of infections today ', value: json.todayCases, inline: true},
              {name: 'Dead', value: json.deaths, inline: true},
              {name: 'Rehibilitate', value: json.recovered, inline: true},
          )
          .setTimestamp()
          .setFooter('Bruhh', 'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/181282250_504799057544088_8090273501818269906_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=MZgzcEAsLR0AX-oZpQo&_nc_ht=scontent-xsp1-3.xx&oh=3487a506ed5011815348bf8433d5cf60&oe=60CA39C9');
          message.channel.send(ExampleEmbed2);
      });
    }
    
  }
}