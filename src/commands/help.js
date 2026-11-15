const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { colors } = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche la liste des commandes disponibles.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(colors.blurple)
      .setTitle('🧌 Les commandes du Gobelin')
      .setDescription('Voici ce que je sais faire pour le moment :')
      .addFields(
        { name: '/ping', value: 'Vérifie que je suis bien réveillé.' },
        { name: '/help', value: 'Affiche ce message.' },
        { name: '/serverinfo', value: 'Infos sur le repaire.' },
        { name: '/membercount', value: 'Nombre de gobelins présents.' }
      )
      .setFooter({ text: 'De nouvelles commandes arriveront bientôt !' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
