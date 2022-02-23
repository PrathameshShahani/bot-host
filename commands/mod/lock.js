const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "lock",
        description: "lock channel",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            const role2 = message.guild.roles.cache.find(role => role.name === '@everyone') 
                message.channel.updateOverwrite(role2,{ 'SEND_MESSAGES': false}) 
                message.channel.send("Successfully locked the channel!")
        } catch (e) {
            console.log(e);
        }

    }
}