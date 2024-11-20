const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (
    !message.member.permissions.has(
      PermissionsBitField.Flags.Administrator ||
        PermissionsBitField.Flags.BanMembers
    )
  ) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Tu n'as pas les permitions pour unban.**`)
          .setColor("#87CEEB"),
      ],
    });
  } else {
    let memberUnban = await client.users.fetch(args[0]);
    message.guild.members.unban(memberUnban);
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${memberUnban} est revenus à la vie.**`)
          .setColor("#87CEEB"),
      ],
    });
  }
};
module.exports.help = {
  name: "unban",
  description: "unban des gens",
};
