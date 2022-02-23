const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "createvc",
    description: "Create Voice Channels in your Server"},
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Channel Updates")
    	.setDescription(":x: You do not have enough permissions!")
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       	.setTimestamp()
        .setColor("RED");
    return message.channel.send(embed)
}
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Channel Updates")
    	.setDescription(":x: Please mention the name for the Channel")
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       	.setTimestamp()
        .setColor("RED");
    return message.channel.send(embed)
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Channel Updates")
    .setDescription(`Channel has been created`)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor("GREEN");
  message.channel.send(embed);
}
}