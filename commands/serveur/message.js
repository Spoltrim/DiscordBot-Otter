const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("message")
    .setDescription("permet d'envoyer un message en mp a une personne")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("la personne a qui tu veux envoyer un message")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("le message que tu veux lui écrire")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getString("user");
    const mess = interaction.options.getString("message");
    const member = interaction.guild.members.cache.find(
      (member) => member.toString() === user
    );
    if (!member) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("**Utilisateur introuvable.**")
            .setColor("#4682B4"),
        ],
      });
    }
    try {
      await member.send(mess);
    } catch (error) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("**Impossible d'envoyer le message.**")
            .setColor("#4682B4"),
        ],
        flags: 64,
      });
    }

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("**Le message a bien été envoyé.**")
          .setColor("#4682B4"),
      ],
      flags: 64,
    });
  },
};

