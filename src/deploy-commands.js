const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config');

if (!token || !clientId) {
  console.error('❌ DISCORD_TOKEN et CLIENT_ID sont requis dans le fichier .env.');
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'))) {
  const command = require(path.join(commandsPath, file));
  if ('data' in command) commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(`🔄 Enregistrement de ${commands.length} commande(s)...`);

    const route = guildId
      ? Routes.applicationGuildCommands(clientId, guildId) // instantané, idéal pour un serveur
      : Routes.applicationCommands(clientId); // global, jusqu'à 1h de propagation

    const data = await rest.put(route, { body: commands });

    console.log(
      `✅ ${data.length} commande(s) enregistrée(s)${
        guildId ? ' sur le serveur' : ' globalement'
      } !`
    );
  } catch (error) {
    console.error(error);
  }
})();
