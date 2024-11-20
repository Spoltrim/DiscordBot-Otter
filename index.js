const {
  EmbedBuilder,
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  ActivityType,
} = require("discord.js");
const { writeFile } = require("fs");
const config = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");
const console = require("console");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(config.token);

client.commands = new Collection();
// On crée le chemin du dossier commands
const foldersPath = path.join(__dirname, "commands");
// On récupère les dossiers dans commands
const commandFolders = fs.readdirSync(foldersPath);

// On boucle sur chaque dossier
for (const folder of commandFolders) {
  // On crée le chemin vers 1 dossier
  const commandsPath = path.join(foldersPath, folder);
  // On récupère les fichiers JS du dossier
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // On boucle sur les fichiers
  for (const file of commandFiles) {
    // On crée le chemin du fichier
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // On vérifie si on a data ET execute dans le fichier
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log("L'un des deux attributs au moins est manquant");
    }
  }
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/g);

  const commandName = args.shift().toLowerCase();
  if (!commandName.startsWith(config.prefix)) return;
  const command = client.commands.get(commandName.slice(config.prefix.length));
  if (!command) return;
  command.run(client, message, args);
});

client.on("guildMemberAdd", (member) => {
  const welcomeChannel = member.guild.channels.cache.get(
    config.greeting.channelb
  );
  welcomeChannel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Bienvenue`)
        .setColor("#191970")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `Bienvenue ${member} sur ${member.guild.name}.
            Nous sommes désormais ${member.guild.memberCount}🎉🎊! `
        )
        .setTimestamp(),
    ],
  }),
    member.roles.add(config.greeting.roleb);
});

client.on("guildMemberRemove", (member) => {
  const welcomeChanel = member.guild.channels.cache.get(
    config.greeting.channelb
  );
  welcomeChanel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Au revoir`)
        .setColor("#191970")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Goodbye ${member} en espérant te revoir 👋`)
        .setTimestamp(),
    ],
  });
});

client.on("ready", () => {
  const statuses = [
    () => `twerker sur la banquise arctique`,
    () => `${client.guilds.cache.size} serveurs`,
    () =>
      `${client.guilds.cache.reduce(
        (acc, guild) => acc + guild.memberCount,
        0
      )} utilisateurs`,
  ];
  let i = 0;
  setInterval(() => {
    client.user.setActivity(statuses[i](), {
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/",
    });
    i = ++i % statuses.length;
  }, 1e4);

  client.on(Events.InteractionCreate, async (interaction) => {
    // Si on n'est pas sur une commande /, on ne fait rien
    if (!interaction.isChatInputCommand()) return;

    // On récupère la commande
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `Pas de commande correspondant à ${interaction.commandName}`
      );
    }

    try {
      //On essaie d'exécuter l'interaction
      await command.execute(interaction);
    } catch (error) {
      console.log(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Une erreur est survenue en exécutant cette commande",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Une erreur est survenue en exécutant cette commande",
          ephemeral: true,
        });
      }
    }
  });
});
