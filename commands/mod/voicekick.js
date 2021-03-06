module.exports = {
    config: {
        name: "voicekick",
        aliases: ["vckick"],
        description: "kick a member from the vc ",
        usage: "z!vckick [mention]"
    },
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "I Don't Have Proper Permissions To Use This Command!"
      );
     
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `You do not have permission to apply this command!`
       );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Please Mention User That You Want To Kick From Voice Channel!`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`User Is Not In Any Voice Channel!`);

    message.mentions.members.first().voice.kick();
    
    message.channel.send(`User Has Been Kicked From Voice Channel!`)
  }
};