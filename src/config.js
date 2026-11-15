require('dotenv').config();

const config = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID || null,
  welcomeChannelId: process.env.WELCOME_CHANNEL_ID || null,
  goodbyeChannelId:
    process.env.GOODBYE_CHANNEL_ID || process.env.WELCOME_CHANNEL_ID || null,
  autoRoleId: process.env.AUTO_ROLE_ID || null,
};

// Couleurs utilisées dans les embeds (thème du repaire)
config.colors = {
  green: 0x57f287,
  red: 0xed4245,
  blurple: 0x5865f2,
  yellow: 0xfee75c,
};

module.exports = config;
