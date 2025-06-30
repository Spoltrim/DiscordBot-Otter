const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Affiche toutes les commandes disponibles du bot."),
  async execute(interaction, client) {
    const categories = {};

    // Trie les commandes par catégorie
    client.commands.forEach((command) => {
      const category = command.category || "Autres";
      if (!categories[category]) categories[category] = [];
      categories[category].push(command);
    });
    // Création de l'embed
    const embed = new EmbedBuilder()
      .setTitle("📖 Aide - Commandes disponibles")
      .setColor("Random");
    for (const [category, cmds] of Object.entries(categories)) {
      embed.addFields({
        name: `📂 ${category}`,
        value: cmds
          .map((cmd) => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
          .join("\n"),
        inline: false,
      });
    }
    await interaction.reply({ embeds: [embed] });
  },
};
