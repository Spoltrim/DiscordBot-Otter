const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const config = require("../config.json");
  var reason = args.slice(1, args.length).join(` `) || "aucune raison fournie";

  if (!member) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Faut mentionner dans la vie**`)
          .setColor("#4169E1"),
      ],
    });
  }

  if (member.id === client.user.id) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Tu veux vraiment mute le bot?**`)
          .setColor("#4169E1"),
      ],
    });
  }

  if (member.roles.cache.get(config.greeting.rolem)) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${member} est déjà mute**`)
          .setColor("#4169E1"),
      ],
    });
  } else {
    member.roles.add(config.greeting.rolem);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${member} est mute pour ${reason}**`)
          .setColor("#4169E1"),
      ],
    });
  }
};
module.exports.help = {
  name: "mute",
  description: "mute les gens qui parlent trop",
};
