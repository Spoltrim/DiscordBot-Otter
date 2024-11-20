const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Ajoute un role")
    .addStringOption((option) =>
      option
        .setName("role")
        .setDescription("Le role que vous voulez ajouter")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("l'utilisateur à qui tu veux ajouter un role")
        .setRequired(true)
    ),

  async execute(interaction) {
    const roleMention = interaction.options.getString("role");
    const user = interaction.options.getString("user");
    const member = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    const role = interaction.guild.roles.cache.find(
      (role) => role.toString() === roleMention
    );
    member.roles.add(role);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Le role ${role} a été rajouter à ${user}.**`)
          .setColor("#4682B4"),
      ],
    });
  },
};
module.exports.help = {
  name: "addrole",
  description: "Ajoute un role ou plusieur role ",
};
