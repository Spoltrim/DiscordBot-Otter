const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionsBitField,
} = require("discord.js");
const config = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Permet de fermer un channel")
    .addStringOption((option) =>
      option
        .setName("temps")
        .setDescription("le temps que dure la fermeture")
        .setRequired(false)
    ),

  async execute(interaction) {
    interaction.channel.permissionOverwrites.create(config.greeting.roleb, {
      [PermissionsBitField.Flags.SendMessages]: false,
    });
    const temps = interaction.options.getString("temps");
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Le channel a été fermé par ${interaction.user.displayName}**`
          )
          .setColor(`#191970`),
      ],
    });
  },
};

module.exports.help = {
  name: "lock",
  description: "Permet de fermer un channel",
};
