const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

//faire des permission pour que pas tout le monde puissse ban :)
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ça ban des gens")
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("La raison de pourquoi tu le bans")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("membre")
        .setDescription("l'utilisateur à qui tu veux ban")
        .setRequired(true)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString("raison");
    const user = interaction.options.getString("membre");
    const member = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    await member.ban({ reason: "reason" });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${user} est mort pour ${reason}**.`)
          .setColor("#4682B4"),
      ],
    });
  },
};
