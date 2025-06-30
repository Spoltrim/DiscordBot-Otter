const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Permet de relancer la musique mise en pause."),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("❌ Il n'y a aucune musique en cours !")
              .setColor("#0F056B"),
          ],
        });
    }

    if (!queue.paused) {
      return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("⏸️ La musique n'est pas en pause !")
              .setColor("#0F056B"),
          ],
        });
    }

    client.distube.resume(Interaction.guildId);
    interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("⏸️ La musique à repris !")
              .setColor("#0F056B"),
          ],
        });
  },
};

