const { Events, EmbedBuilder } = require('discord.js');
const { welcomeChannelId, autoRoleId, colors } = require('../config');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    // Rôle automatique (optionnel)
    if (autoRoleId) {
      try {
        await member.roles.add(autoRoleId);
      } catch (err) {
        console.error(`⚠️  Impossible d'ajouter le rôle auto : ${err.message}`);
      }
    }

    const channel = welcomeChannelId
      ? member.guild.channels.cache.get(welcomeChannelId)
      : member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(colors.green)
      .setTitle('🧌 Un nouveau gobelin a rejoint le repaire !')
      .setDescription(
        `Bienvenue ${member} dans **${member.guild.name}** !\n` +
          `Installe-toi, attrape une manette et viens jouer avec nous. 🎲`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter({ text: `Tu es le ${member.guild.memberCount}e membre du repaire` })
      .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
  },
};
