const {
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");
const config = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Permet de ouvrir un channel"),

  async execute(interaction) {
    interaction.channel.permissionOverwrites.create(config.greeting.roleb, {
      [PermissionsBitField.Flags.SendMessages]: true,
    });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**Le channel a été ouvert par ${interaction.user.displayName}**`
          )
          .setColor(`#191970`),
      ],
    });
  },
};
