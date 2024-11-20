const { EmbedBuilder, Permissions } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const member = message.mentions.members.first();
  var reason = args.slice(1, args.length).join(` `) || "Aucune raison fournie";

  if (!member) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Faut mentionner dans la vie**`)
          .setColor("#4682B4"),
      ],
    });
  }

  if (member.id === client.user.id) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Tu veux vraiment kick le bot?**`)
          .setColor("#4682B4"),
      ],
    });
  }

  if (member.id === message.guild.ownerId) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Tu veux vraiment kick le chef du serveur?**`)
          .setColor("#4682B4"),
      ],
    });
  }
  if (
    !message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR || Permissions.FLAGS.KICK_MEMBERS
    )
  ) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Tu n'as pas les permitions pour expulser**`)
          .setColor("#4682B4"),
      ],
    });
  }
  if (!member.kickable) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Dommage pour toi, cette personne ne peux pas être expulsé **`
          )
          .setColor("#4682B4"),
      ],
    });
  }

  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setDescription(`**${member} est mort pour ${reason}**`)
        .setColor("#4682B4"),
    ],
  });
  member.send({
    embeds: [
      new EmbedBuilder()
        .setDescription(
          `**${member} est kick pour ${reason} par ${message.member}**`
        )
        .setColor("#4682B4"),
    ],
  });
  member.kick(reason);
};
module.exports.help = {
  name: "kick",
  description: "kick des gens",
};
