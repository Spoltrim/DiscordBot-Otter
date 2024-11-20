const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const database = require("../../database.php");
module.exports.run = async (client, message, args) => {
  const ID = message.channelid;

  fs.writeFileSync(database, JSON.stringify(ID));

  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setDescription(`**Le channel a été enregistré**`)
        .setColor(`#191970`),
    ],
  });
};
module.exports.help = {
  name: "set-welcome",
  description: "Permet de set le bienvenue d'un serveur ",
};
