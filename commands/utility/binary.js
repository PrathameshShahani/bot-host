const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../config');
const axios = require('axios')

module.exports = {
    config: {
        name: 'binary',
        description: 'Shows your text in Binary Format',
        aliases: ["binary"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
        
        const url = `http://some-random-api.ml/binary?text=${args}`;

  let response, data;
  try {
    response = await axios.get(url);
    data = response.data;
  } catch (e) {
    return message.channel.send(`Please give something to get a binary code of!`);
  }

  const embed = new MessageEmbed()
    .setTitle("Text to Binary")
    .setThumbnail(
      "https://png.pngtree.com/png-clipart/20200225/original/pngtree-binary-code-and-magnifying-glass-isometric-icon-png-image_5252004.jpg"
    )

    .setDescription("**Binary Code** - `" + data.binary + "`")
    .setTimestamp()
    .setFooter(
      "© MicroBot",
    )
    .setColor(config.embedcolor);

  await message.channel.send(embed);

    }
}
