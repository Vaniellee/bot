const {SlashCommandBuilder} = require("@discordjs/builders");
const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("🎵 | If you want to continue music."),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        const language = db.fetch(`language_${interaction.user.id}`)
        if (queue.paused === false) return interaction.followUp("The music is already playing.")
        if (!language) {
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            interaction.followUp({content: "Successfully reopened your song."})
            queue.resume()
        }
    }
}
