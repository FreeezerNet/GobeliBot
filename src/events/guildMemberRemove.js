const { Events, EmbedBuilder } = require('discord.js');
const { goodbyeChannelId, colors } = require('../config');

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    const channel = goodbyeChannelId
      ? member.guild.channels.cache.get(goodbyeChannelId)
      : member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(colors.red)
      .setTitle('👋 Un gobelin quitte le repaire...')
      .setDescription(
        `**${member.user.tag}** a quitté le serveur.\nOn espère le revoir bientôt ! 🪄`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter({
        text: `Nous sommes maintenant ${member.guild.memberCount} dans le repaire`,
      })
      .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
  },
};
