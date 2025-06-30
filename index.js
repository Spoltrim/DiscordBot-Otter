global.crypto = require("crypto");
process.env.FFMPEG_PATH = require("ffmpeg-static");
const { REST, Routes } = require("discord.js");
const { DisTube } = require("distube");
const { token, AppId, GUILD_ID } = require("./config");
const { YtDlpPlugin } = require("@distube/yt-dlp");
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
const cli = require("nodemon/lib/cli");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
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

client.login(token);
console.log("Le Bot est en ligne");
client.distube = new DisTube(client, {
  plugins: [new YtDlpPlugin()],
});

// Initialisation de la collection de commandes
client.commands = new Collection();

// Chargement des commandes
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      command.category = folder;
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`⚠️ La commande dans ${file} est invalide.`);
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
    () => `entrain de twerker sur la banquise arctique`,
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
      url: "https://www.twitch.tv/anaismrn",
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
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Une erreur est survenue en exécutant cette commande",
          flags: 64,
        });
      } else {
        await interaction.reply({
          content: "Une erreur est survenue en exécutant cette commande",
          flags: 64,
        });
      }
    }
  });
});
