const { Client, Collection } = require('discord.js');
const { PREFIX } = require('./config');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fs = require("fs");
const request = require("request");
const axios = require("axios");
const snekfetch = require("snekfetch");
const fetch = require("node-fetch");

const db = require('quick.db');

bot.on('ready', () => {
  let activities = [`m!help | microbot.ml`,`m!help | Version - 3.0.2`,`Slash Commands soon!`],i = 0;
  setInterval(() => bot.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"PLAYING",url:"https://www.youtube.com/channel/UCojjqdGIsFdvpTkIhlaushA"  }), 10000)
})

const version=('2.1.0')

bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on('message', async message => {


    let prefix;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        
            } catch {
            prefix = PREFIX
    };
    try {
        if (message.mentions.has(bot.user.id) && !message.content.includes("@everyone") && !message.content.includes("voted for") && !message.content.includes("@here")) {
          message.channel.send(`\n<@${message.author.id}> My prefix for\ **${message.guild.name}\** is \`${prefix}\`\n Type ${prefix}help for Commands List!`);
          }
          
    } catch {
        return;
    };
    


});

require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000)


client.login("OTQ1OTg4NzkzNTI4MzYxMDAw.YhYKtw.KU_isYCxukeX69dugp1Vx3qx7Xg");