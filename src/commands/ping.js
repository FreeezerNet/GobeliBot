const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Vérifie que le bot répond et affiche sa latence.'),
  async execute(interaction) {
    await interaction.reply('🏓 Pong ! Calcul en cours...');
    const sent = await interaction.fetchReply();
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(
      `🏓 Pong ! Latence : **${latency}ms** | API : **${Math.round(
        interaction.client.ws.ping
      )}ms**`
    );
  },
};
