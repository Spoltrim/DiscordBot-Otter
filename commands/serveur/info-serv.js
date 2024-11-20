const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info-serv")
    .setDescription("Donne des informations sur le serveur"),

  async execute(interaction) {
    const id = interaction.member.guild.ownerId;
    const owner = await interaction.member.fetch(id);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("__Informations du serveur__")
          .setColor("#191970")
          .addFields(
            {
              name: `Members`,
              value: `Nous sommes ${interaction.member.guild.memberCount} membres.`,
            },
            {
              name: `Roles`,
              value: `Nous avons ${interaction.member.guild.roles.cache.size} roles.`,
            },
            {
              name: `Owner`,
              value: `Le gérant du serveur est ${owner} 👑.`,
            },
            {
              name: `Boost`,
              value: `le nombre de boost est de ${interaction.member.guild.premiumSubscriptionCount}.`,
            }
          )
          .setTimestamp(),
      ],
    });
  },
};
