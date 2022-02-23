const Discord = module.require("discord.js");

module.exports = {
  config : {
	name: "delchannel",
	description: "Delete Channels From your Server"},
	run: async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Channel Updates")
    	.setDescription(":x: You do not have enough permissions!")
		.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       	.setTimestamp()
        .setColor("RED");
    return message.channel.send(embed)
}
        const fetchedChannel = message.mentions.channels.first();
	if (!fetchedChannel) {
	return message.channel.send("`Usage: <prefix> delchannel <channel>`")
        }
	fetchedChannel.delete()

	const embed = new Discord.MessageEmbed()
	.setTitle("Channel Updates")
	.setDescription ("Channel has been deleted")
  	.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
	.setColor("RANDOM");
	
	await message.channel.send(embed);
}
}