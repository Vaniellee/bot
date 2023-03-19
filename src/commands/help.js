
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("The help menü."),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
    const embed = new Discord.EmbedBuilder()
    .setAuthor({name: "Shinobu help menü!!!", iconURL: client.user.avatarURL()})
    .setImage('https://media1.giphy.com/media/MyLk3W3lliLe/giphy.gif')
    .setThumbnail(interaction.user.avatarURL())
    .setDescription("**Hello, I'm a bot (yes you already know that) I'm here to make you listen to good songs..**\n\n Invite Me: [add](https://discord.com/api/oauth2/authorize?client_id=1031201130803368066&permissions=8&scope=applications.commands%20bot) I'm sure you'll be happy that you added me\n\n **Commands**\n » `/help` - Shows the help menü.\n » `/back` - If you want to get the music back.\n » `/bass` -  If you want to increase the bass of the music.\n » `/leave` -  If you want to turn off the music.\n » `/loop` - If you want to loop and listen to the song.\n » `/nowplaying` - If you want to learn about music.\n » `/pause` - If you want to turn off the music.\n » `/ping` - If you want to know your ping.\n » `/play` - Do you want to open a song?\n » `/resume` -  If you want to continue music.\n » `/seek` - If you want to search for music.\n » `/skip` - If you want to skip the music.\n » `/slow` - If you want to listen to slow music.\n » `/speed` -  If you want to listen to fast music.\n » `/i` - To get information about the bot.\n » `/volume` -  If you want to adjust the music volume.\n\n Helloooo friend, I'm **Shinobu** I came to have fun with you, shall we listen to a song? ")
    .setColor("Purple")
    return interaction.followUp({embeds: [embed]})
 }
}
