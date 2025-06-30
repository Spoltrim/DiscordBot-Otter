const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("liste")
    .setDescription("Donne une liste secrete")
    .addStringOption((option) =>
      option
        .setName("mdp")
        .setDescription("Donne une liste secrete")
        .setRequired(true)
    ),
  async execute(interaction) {
    const MDP = interaction.options.getString(`mdp`);

    if (MDP === `loutre`) {
      return await await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`__To Do list__:`)
            .setColor("#050033")
            .setTimestamp()
            .addFields(
              {
                name: `Modération`,
                value: `
    ~~Ban~~
    ~~unban~~
    ~~Kick~~
    TempBan
    TempMute
    ~~Mute~~
    ~~unmute~~
    Warn`,
                inline: true,
              },
              {
                name: `Utiliter`,
                value: `
    ~~Prefix~~
    ~~removerole~~ 
    ~~addrole~~ 
    Logs 
    ~~info-serveur~~
    ~~profil~~
    ~~Clear~~
    ~~Help~~
    ~~Slowmode~~
    ~~Ping~~
    ~~Lock~~
    ~~Unlock~~
    tempLock
    ~~Envoie des mp~~`,
                inline: true,
              },
              {
                name: `Musique`,
                value: `
    ~~Play~~
    ~~Stop~~
    Loop
    ~~Disconnect~~
    `,
                inline: true,
              },
              {
                name: `école`,
                value: `
    faire un site en php et mysql 
    heberger un site sur un esp32 ou autre connerie de ce genre en info 
    NodeRed 
    `,
                inline: true,
              }
            ),
        ],
      });
    }
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Dommage c'est perdu`)
          .setColor("#050033")
          .setTimestamp(),
      ],
    });
  },
};

module.exports.help = {
  name: "liste",
  description: "To Do List",
};
