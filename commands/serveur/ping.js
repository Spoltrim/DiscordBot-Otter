const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Donne la latence du bot !"),

  async execute(interaction) {
    const Ping = interaction.client.ws.ping;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`__Pong de tes morts !__`)
          .setColor("#008000")
          .setDescription(`**${Ping}ms**`),
      ],
    });
  },
};
