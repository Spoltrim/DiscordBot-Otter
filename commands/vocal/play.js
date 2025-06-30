const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const youtube = require("youtube-sr").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Joue une musique")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Le nom ou le lien de la musique")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply();
    const query = interaction.options.getString("song");

    // Validation de l'URL
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              "Vous devez être dans un canal vocal pour jouer de la musique !"
            )
            .setColor("#0F056B"),
        ],
      });
    }

    // Connexion au canal vocal
    let searchQuery = query;

    // Si ce n’est pas un lien YouTube, on cherche le premier résultat
    if (!query.startsWith("http")) {
      try {
        const results = await youtube.search(query, { limit: 1 });
        if (!results.length)
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`❌ Aucun résultat trouvé.`)
                .setColor("#0F056B"),
            ],
          });
        searchQuery = results[0].url;
      } catch (err) {
        console.error(err);
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`❌ Erreur lors de la recherche YouTube.`)
              .setColor("#0F056B"),
          ],
        });
      }
    }

    // Joue la musique (que ce soit URL directe ou URL trouvée)
    await client.distube.play(voiceChannel, searchQuery, {
      member: interaction.member,
      textChannel: interaction.channel,
    });
    setTimeout(() => {
      const queue = client.distube.getQueue(interaction.guildId);

      if (!queue) {
        return interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle(`❌ Impossible de récupérer la file d'attente.`)
              .setColor("#0F056B"),
          ],
        });
      }

      if (queue.playing && queue.songs.length > 1) {
        const addedSong = queue.songs[queue.songs.length - 1];
        interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle(
                `**${addedSong.name}** a été ajoutée à la file d'attente.`
              )
              .setColor("#0F056B"),
          ],
        });
      } else {
        const currentSong = queue.songs[0];
        interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle(`🎶 Je joue : **${currentSong.name}**`)
              .setColor("#0F056B"),
          ],
        });
      }
    }, 1000);
  },
};


