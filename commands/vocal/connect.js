const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} = require('@discordjs/voice');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("connect")
    .setDescription("Permet au bot de rejoindre un vocal"),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Tu dois être dans un vocal`)
            .setColor("#008000"),
        ],
      });
    } else {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      const resource = createAudioResource(path.join(__dirname, 'moustique.mp3'));

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Je suis entré dans le vocal `)
            .setColor("#008000"),
        ],
      });
    }
  },
};
