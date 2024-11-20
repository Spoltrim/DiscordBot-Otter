const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

//faire la slash commande dans l'index ? a causes des dépendances circulaires

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commandlist")
    .setDescription("Liste des commandes"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [new EmbedBuilder().setDescription(``).setColor("#050033")],
    });
  },
};
