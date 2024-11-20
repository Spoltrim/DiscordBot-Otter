const { EmbedBuilder } = require("discord.js");
//faire que le nom des commandes sois automatique
module.exports.run = async (client, message, args) => {
  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Liste des commandes:`)
        .setColor("#050033")
        .addFields({
          name: `Liste:`,
          value: `
      Ban✅,Eval✅,Info-role✅, Info-serv✅,Info-user✅,Kick✅,Liste-command✅,Liste✅,Message✅, Mute✅, Slowmode ✅, Unban✅, Unmute✅ `,
          inline: true,
        }),
    ],
  });
};
module.exports.help = {
  name: "liste-co",
  description: "Donne la liste des commandes qui sont actives ",
};
