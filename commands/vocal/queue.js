const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Permet d'avoir la liste des musiques à suivre"),
  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Aucune musique en cours !")
              .setColor("#0F056B"),
          ],
        });
    }

    const nextSongs = queue.songs
      .slice(1)
      .map((song, i) => `${i + 1}. ${song.name}`)
      .join("\n");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`🎶 File d’attente :\n${nextSongs || "Rien après ça !"}`)
          .setColor("#0F056B"),
      ],
    });
  },
};
