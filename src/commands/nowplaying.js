const {EmbedBuilder} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("🎵 | You get information about the song playing."),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.followUp(`There is no song on the list yet.`)
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 20);
        const embed = new EmbedBuilder()
            .setColor('Purple')
        .setImage('https://media.tenor.com/gC0nuK4bEJUAAAAd/shinobu-cute-dance-shinobu.gif')
    .setThumbnail(interaction.user.avatarURL())
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .addFields({
                name: 'Music Author:',
                value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`,
                inline: true
            })
            .addFields({name: 'Member:', value: `${queue.songs[0].user}`, inline: true})
            .addFields({name: 'Voice:', value: `${queue.volume}%`, inline: true})
            .addFields({name: 'Views:', value: `${queue.songs[0].views}`, inline: true})
            .addFields({name: 'Like:', value: `${queue.songs[0].likes}`, inline: true})
            .addFields({name: 'Filtre:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true})
            .addFields({
                name: `Video Time: **[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]**`,
                value: ` ${'<:green_middle_bar_awoken:1053412306249330720>'.repeat(part) + '<a:shinobu_EpicDance:1053414267698827314>' + '<:green_middle_bar_awoken:1053412306249330720>'.repeat(20 - part)}`,
                inline: false
            })
        return interaction.followUp({embeds: [embed]})
    }
}
