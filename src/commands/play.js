const {SlashCommandBuilder} = require("@discordjs/builders");
const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("🎵| Do you want to open a song?")
        .addStringOption(option => option.setName("name").setDescription("Song Name?").setRequired(true)),
    run: async (client, interaction, track) => {
        await interaction.deferReply().catch(err => {
            console.error('Error while trying to defer.', err)
        })
        const string = interaction.options.getString("name")
        let voiceChannel = interaction.member.voice.channel
        const language = db.fetch(`language_${interaction.user.id}`)
        if (!language) {
            if (!voiceChannel) return interaction.followUp({content: "You are not on an audio channel!"})

            client.distube.voices.join(voiceChannel)

            await client.distube.play(interaction.member.voice.channel, string);
            const tracks = await client.player.search(string, {
                requestedBy: interaction.user
            }).then(x => x.tracks[0]);

            if (!tracks) return interaction.followUp("🎵 | Music started.")
            const embed = new Discord.EmbedBuilder()
                .addFields({name: "Music playing", value: `${tracks.title}`, inline: true})
                .addFields({name: "Singing the music", value: `${tracks.author}`, inline: true})
                .addFields({name: "Duration of the music", value: `${tracks.duration}`, inline: true})
                .addFields({name: "Listening to music", value: `${tracks.views}`, inline: true})
                .addFields({name: "Thumbnail of music", value: "[Click](" + tracks.thumbnail + ")", inline: true})
                .addFields({name: "Video of the music", value: "[Click](" + tracks.url + ")", inline: true})
                .setThumbnail(interaction.user.avatarURL())
                .setColor("Purple")
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("<:hm:1053405811797401631>")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setCustomId("soru"),
                    new Discord.ButtonBuilder()
                        .setLabel("Support Server")
                        .setEmoji("<:shinob:1080540691651903590>")
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL("https://discord.gg/BnXJNMgV66"),
                    new Discord.ButtonBuilder()
                        .setLabel("Add me")
                        .setEmoji("<:shinob:1080540691651903590>")
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL("https://discord.com/api/oauth2/authorize?client_id=1031201130803368066&permissions=8&scope=bot")
                )

            await interaction.followUp({embeds: [embed], components: [row]}).then(messages => {
                db.set(`music_${interaction.guild.id}`, {
                    kanal: interaction.channel.id,
                    mesaj: messages.id,
                    muzik: string,
                    user: interaction.user.id,
                    başlık: tracks.title,
                    yükleyen: tracks.author,
                    süre: tracks.duration,
                    görüntülenme: tracks.views,
                    thumb: tracks.thumbnail,
                    video: tracks.url
                })
            })
        }
    }
}
