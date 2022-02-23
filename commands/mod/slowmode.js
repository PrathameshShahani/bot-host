module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  	 if (!message.member.hasPermission("ADMINISTRATOR"))
         return message.channel.send(
          `You do not have permission to apply this command!`
         );
     
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set the slowmode of this channel too **${args[0]}**`
    );
  },
};