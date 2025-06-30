const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Permet d'avoir le profil d'une personne")
    .addStringOption((option) =>
      option
        .setName("membre")
        .setDescription("le membre a qui tu veux voir le profile")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getString("membre");
    const membre = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    const member = membre || interaction.member;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`__Informations de l'utilisateur __`)
          .setColor("#1E90FF")
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .addFields(
            { name: `Nom`, value: `${member}`, inline: true },
            {
              name: `Surnom`,
              value: `${
                member.globalName || `L'utilisateur n'as pas de surnom`
              }`,
              inline: true,
            },
            {
              name: `Date de rejoint du serveur`,
              value: `${member.joinedAt.toLocaleDateString()}`,
            },
            {
              name: `Rôle le plus haut `,
              value: `${member.roles.highest}`,
              inline: true,
            },
            {
              name: `L'identifiant`,
              value: `${member.user.id}`,
              inline: true,
            }
          )
          .setTimestamp(),
      ],
    });
  },
};
