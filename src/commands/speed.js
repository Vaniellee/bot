const {SlashCommandBuilder} = require("@discordjs/builders");
const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("speed")
        .setDescription("🎵 | If you want to listen to fast music."),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        const language = db.fetch(`language_${interaction.user.id}`)
        if (!language) {
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            interaction.followUp({content: "The song was sped up successfully."})
            queue.filters.add("nightcore")
        }
    }
}
