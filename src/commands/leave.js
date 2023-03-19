const {SlashCommandBuilder} = require("@discordjs/builders");
const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("🎵 | If you want to turn off the music."),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.followUp(`There is no song on the list yet.`)
        client.distube.voices.leave(interaction)
        await interaction.followUp("I'm leave voice channels.").catch(err => {
            console.error('Error while trying to send message.', err)
        })
        db.delete(`music_${interaction.guild.id}`)
    }
}
