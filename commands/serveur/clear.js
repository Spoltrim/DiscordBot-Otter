const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Efface des messages")
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Le nombre de message à effacer")
        .setRequired(true)
    ),
  async execute(interaction) {
    const number = interaction.options.getInteger("nombre");
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${number} messages ont été clear ❤️`)
          .setColor("#0000FF"),
      ],
    });
    await interaction.channel.bulkDelete(number);
  },
};
module.exports.help = {
  name: "clear",
  description: "supprime les messages",
};
