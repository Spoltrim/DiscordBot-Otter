const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("commandlist")
    .setDescription("Liste des commandes"),
  async execute(interaction) {
    const commands = interaction.client.commands;
    const commandList = commands
      .map(
        (cmd) =>
          `**/${cmd.data.name}**: ${
            cmd.data.description || "Pas de description."
          }`
      )
      .join("\n");
    const helpEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Liste des commandes disponibles")
      .setDescription(commandList)
      .setFooter({
        text: "Utilisez une commande en tapant /<nom de la commande>",
      });
    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};
