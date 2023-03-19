const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("back")
        .setDescription("🎵 | If you want to get the music back.")
        .addStringOption(option => option.setName("number").setDescription("How far back do you want to go?").setRequired(true)),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.followUp(`There is no song on the list yet.`)
        const number = interaction.options.getString("number")
        if (isNaN(number)) return interaction.followUp("Give me number!")
        const type = parseInt(number)
        queue.seek((queue.currentTime - type))
        return interaction.followUp("Successfully reclaimed the song.")
    }
}
