const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Retire un role")
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("Le role que vous voulez retirer")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("l'utilisateur à qui tu veux retirer un role")
        .setRequired(true)
    ),

  async execute(interaction) {
    const roleMention = interaction.options.getString("role");
    const user = interaction.options.getString("user");
    const member = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    const role = interaction.guild.roles.cache.find(
      (role) => role.toString() === roleMention
    );
    member.roles.remove(role);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Le role ${role} a été retirer à ${user}.**`)
          .setColor("#4682B4"),
      ],
    });
  },
};
