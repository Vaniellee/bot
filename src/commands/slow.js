const {SlashCommandBuilder} = require("@discordjs/builders");
const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("slowed")
        .setDescription("🎵 | If you want to listen to slow music"),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        const language = db.fetch(`language_${interaction.user.id}`)
        if (!language) {
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            interaction.followUp({content: "The song was successfully slowed down."})
            queue.filters.add("vaporwave")
        }
    }
}
