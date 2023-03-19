const {SlashCommandBuilder} = require("@discordjs/builders");

const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("🎵 | Stop Music!"),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const language = db.fetch(`language_${interaction.user.id}`)
        if (!language) {
            const queue = client.distube.getQueue(interaction);
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            if (queue.paused === true) return interaction.followUp("The music is already stopped.")

            interaction.followUp({content: "Successfully paused your song."})
            client.distube.pause(interaction);
        }
    }
}
