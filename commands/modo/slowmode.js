const { EmbedBuilder } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const salon = message.channel;
  var seconde = args.slice(0, args.length);
  message.delete();
  if (seconde == `0`) {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${message.author} décide qu'il n'y a plus de slowmode.`
          )
          .setColor("#2F4F4F"),
      ],
    });
    return salon.setRateLimitPerUser(`0`);
  }
  if (!seconde == `0`) {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${message.author} mets un cooldown de ${seconde} seconde.`
          )
          .setColor("#2F4F4F"),
      ],
    });
    return salon.setRateLimitPerUser(`${seconde}`);
  }
};
module.exports.help = {
  name: "slowmode",
  description: "met un slowmode sur un salon",
};
