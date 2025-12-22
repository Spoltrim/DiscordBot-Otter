const { EmbedBuilder, Permissions } = require("discord.js");
/*if (
    !message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR || Permissions.FLAGS.KICK_MEMBERS
    )
  )*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick l'utilisateur choisit")
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("La raison de pourquoi tu le kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("membre")
        .setDescription("l'utilisateur à qui tu veux kick")
        .setRequired(true)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString("raison");
    const user = interaction.options.getString("membre");
    const member = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    await member.kick({ reason: "reason" });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**${user} est mort pour ${reason}**.`)
          .setColor("#4682B4"),
      ],
    });
  },
};
