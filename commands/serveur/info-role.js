const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info-role")
    .setDescription("Donne les information sur le role")
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("Le role dont vous voulez des infos")
        .setRequired(true)
    ),

  async execute(interaction) {
    const roleMention = interaction.options.getString("role");
    const role = interaction.guild.roles.cache.find(
      (role) => role.toString() === roleMention
    );
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`__Informations du rôle __`)
          .setColor("#4682B4")
          .addFields(
            { name: `Nom`, value: `${role.name}`, inline: true },
            { name: `Identifiant`, value: `${role.id}`, inline: true },
            {
              name: `Mentionnable`,
              value: `${role.mentionable}`,
              inline: true,
            },
            {
              name: `Date de création`,
              value: `${role.createdAt.toLocaleDateString()}`,
            },
            {
              name: `Rôle séparer des autres`,
              value: `${role.hoist}`,
              inline: true,
            }
          )
          .setTimestamp(),
      ],
    });
  },
};

