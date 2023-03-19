const {SlashCommandBuilder} = require("@discordjs/builders");

const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("🎵 | if you want to skip the music"),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        const language = db.fetch(`language_${interaction.user.id}`)
        if (!language) {
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            if (queue.songs.length === 1) return interaction.followUp("No song found in the queue!")
            client.distube.skip(interaction)
            return interaction.followUp("The song was passed successfully.")
        }

    }
}
