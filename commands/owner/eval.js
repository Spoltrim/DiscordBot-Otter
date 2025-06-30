module.exports.run = async (client, message, args) => {
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
  try {
    if (message.author.id !== "424976108757450754") return;
    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    console.log(cleanCode);
    message.channel
      .send(
        { content: cleanCode.toString() },
        {
          code: "js",
          split: { maxLength: 1980, char: "\n", prepend: "", append: "" },
        }
      )
      .catch((err) => {
        console.log(err);
        message.channel.send(
          { content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\`` },
          { split: true }
        );
      });
  } catch (err) {
    console.log(err);
    message.channel.send(
      { content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\`` },
      { split: true }
    );
  }
};

