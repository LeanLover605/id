const Discord = require("discord.js");
const fs = require("fs");
const Canvas = require('canvas')

module.exports = {
    name: "make",
    description: "make",
    run: async (interaction) => {
        console.log("command rec");
        const canvas = Canvas.createCanvas(1140, 800)
        const ctx = canvas.getContext('2d')
        const back = await Canvas.loadImage('https://cdn.discordapp.com/attachments/984444040848216117/992029346682392606/reside.jpg')
        ctx.drawImage(back, 0, 0, canvas.width, canvas.height)
        ctx.font = "20px Impact"
        ctx.fillStyle = "#fffffff"
        ctx.textAlign = "center"
        ctx.fillText(interaction.member.username, 650, 355)

        const avaa = await Canvas.loadImage(interaction.member.displayAvatarURL({
            format: "png",
            size: 1024
        }))
        ctx.drawImage(avaa, 620, 420, 117, 117)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sss.png")

        interaction.channel.send({ files: [attachment]})
    }
}