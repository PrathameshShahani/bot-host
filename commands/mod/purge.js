const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/purge [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]").then(msg=>msg.delete({timeout:5000}))
        if (isNaN(args[0]))
            return message.channel.send('**Please Supply A Valid Amount To Delete Messages!**').then(msg=>msg.delete({timeout:5000}));

        if (parseInt(args[0] > 100))
            return message.channel.send("**Please Supply A Number Less Than 100!**").then(msg=>msg.delete({timeout:5000}));

        if (parseInt(args[0] < 1))
            return message.channel.send("**Please Supply A Number More Than 1!**").then(msg=>msg.delete({timeout:5000}));

        	message.channel.bulkDelete(parseInt(args[0])+1)
        
            .then(messages => message.channel.send(`**Succesfully deleted \`${messages.size-1}/${args[0]}\` messages**`).then(msg => msg.delete({timeout:5000}))).catch(() => null)
    }
}