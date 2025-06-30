const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Permet au bot de quitter un vocal"),

  async execute(interaction, client) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return interaction.reply("Tu dois être dans un salon vocal.");

    client.distube.stop(voiceChannel);
    client.distube.voices.leave(voiceChannel);
    interaction.reply("🔌 Bot déconnecté du salon vocal !");
  },
};

