
  
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
       
       const e1 =  new MessageEmbed()

       .setDescription(`** :no_entry_sign: You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**`)
       .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp()
       .setColor("RED")

        const e2 =  new MessageEmbed()

       .setDescription(`**Please Provide A User To Ban**`)
       .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp()
      
       .setColor("RED")

       const e3 =  new MessageEmbed()

       .setDescription(`**:no_entry_sign: User Is Not In The Guild**`)
       .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp()
      
       .setColor("RED")

       const e4 =  new MessageEmbed()

       .setDescription(`**:no_entry_sign: You Cannot Ban Yourself**`)
       .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp()
      
       .setColor("RED")

       const e5 =  new MessageEmbed()

       .setDescription(`**:no_entry_sign: Cant Ban That User**`)
       .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp()
      
       .setColor("RED")
       
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) 
            
            return message.channel.send(e1);
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(e1);
            if (!args[0]) return message.channel.send(e2)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send(e3);
            if (banMember === message.member) return message.channel.send(e4)

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send(e5)
            try {
            message.guild.members.ban(banMember)
            banMember.send(`Hello, You Have Been Banned From ${message.guild.name}`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: **${banMember.user.username}** has been banned for ${reason}`)
            	.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       			.setTimestamp()
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: **${banMember.user.username}** has been banned (No reason has been provided)`)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
       			.setTimestamp()
            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
            	.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
