const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Permet de sauter une musique"),
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
    await client.distube.skip();
    const currentSong = queue.songs[0];
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(
            "La musique a été skip, La prochaine musique est :" +
              currentSong.name
          )
          .setColor("#0F056B"),
      ],
    });
  },
};
