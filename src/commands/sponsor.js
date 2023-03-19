
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")
const languagefile = require("../language.json")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sponsor")
    .setDescription("sponsor RasByte"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
    const embed = new Discord.EmbedBuilder()
    .setAuthor({name: "RasByte - En iyi Almanya lokasyon sunucu sağlayıcısı!", iconURL: client.user.avatarURL()})
    .setThumbnail('https://media.discordapp.net/attachments/1033416832255791235/1043876886960418843/0x0.png')
    .setDescription("Hey! Sende RasByte'a katılarak ücretsiz olarak **Discord Bot**, **Website** Projelerinizi 7/24 aktif halde tutabilirsiniz. RasByte 2 Yıldır hizmet vermektedir ve sunucuları Almanya lokasyonda yerleşiyor. Zaman kaybetme [bize katıl](https://discord.rasbyte.net)!")
    .setColor("Purple")
    return interaction.followUp({embeds: [embed]})
 }
}
