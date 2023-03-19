
const {SlashCommandBuilder} = require("@discordjs/builders");
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("🤖 | If you want to know your ping."),
    run: async (client, interaction) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const embed = new Discord.EmbedBuilder()
            .setDescription(client.ws.ping + " ms")
            .setColor("Aqua")
        return interaction.followUp({embeds: [embed]})
    }
}
