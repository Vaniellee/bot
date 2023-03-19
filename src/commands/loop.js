const {SlashCommandBuilder} = require("@discordjs/builders");

const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("🎵 | If you want to loop and listen to the song"),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const language = db.fetch(`language_${interaction.user.id}`)
        const queue = client.distube.getQueue(interaction);
        if (!language) {
            if (!queue) return interaction.followUp(`There is no song on the list yet.`)
            client.distube.setRepeatMode(interaction, 1);
            return interaction.followUp("The song was successfully looped.")
        }
    }
}
