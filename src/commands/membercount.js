const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Affiche le nombre de membres du serveur.'),
  async execute(interaction) {
    await interaction.reply(
      `🧌 Nous sommes actuellement **${interaction.guild.memberCount}** gobelins dans le repaire !`
    );
  },
};
