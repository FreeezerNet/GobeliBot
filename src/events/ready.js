const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
    console.log(`🧌 Le repaire des Gobelins est bien gardé !`);

    client.user.setActivity('veiller sur le repaire 🧌');
  },
};
