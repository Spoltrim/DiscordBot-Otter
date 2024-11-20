const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const commandHelp = command.help.name;
  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setColor("#191970")
        .setDescription(`${commandHelp}.`)
        .setTimestamp(),
    ],
  });
  console.log(commandHelp);
};
module.exports.help = {
  name: "help",
  description: "donne le nom de tout les commandes",
};
