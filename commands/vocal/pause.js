const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Permet de mettre la musique en pause."),
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

    if (queue.paused) {
      return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("⏸️ La musique est déjà en pause !")
              .setColor("#0F056B"),
          ],
        });
    }

    queue.pause();
    interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("⏸️ Musique mise en pause !")
              .setColor("#0F056B"),
          ],
        });
  },
};

