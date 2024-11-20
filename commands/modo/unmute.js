const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  const config = require("../config.json");

  if (!member) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Faut mentionner dans la vie**`)
          .setColor("#4169E1"),
      ],
    });
  }

  if (!member.roles.cache.get(config.greeting.rolem)) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${member} n'est pas mute**`)
          .setColor("#4169E1"),
      ],
    });
  } else {
    member.roles.remove(config.greeting.rolem);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${member} est unmute par ${message.author} **`)
          .setColor("#4169E1"),
      ],
    });
  }
};
module.exports.help = {
  name: "unmute",
  description: "unmute les gens",
};
