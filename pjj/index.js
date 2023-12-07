const Discord = require('discord.js')
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Canvas = require('canvas')
const fs = require("fs");
const client = new Discord.Client({
	intents: [Discord.GatewayIntentBits.Guilds]
})

const token = ""

let commands = [];
fs.readdir("commands", (err, files) => {
    if (err) throw err;
    files.forEach(async (f) => {
        try {
            let props = require(`./commands/${f}`);
            commands.push({
                name: props.name,
                description: props.description,
                options: props.options,
            });
        } catch (err) {
            console.log(err);
        }
    });
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.type != 2) return;
    fs.readdir("commands", (err, files) => {
        if (err) throw err;
        files.forEach(async (f) => {
            let props = require(`./commands/${f}`);
            if (
                interaction.commandName.toLowerCase() ===
                props.name.toLowerCase()
            ) {
                try {
                    if (interaction.member.permissions.has("ADMINISTRATOR")) {
                        return props.run(interaction);
                    } else {
                        return interaction.reply({
                            content: `Missing permission: **ADMINISTRATOR**`,
                            ephemeral: true,
                        });
                    }
                } catch (e) {
                    return interaction.reply({
                        content: `\`\`\`Missing Permissions\`\`\``,
                        ephemeral: true,
                    });
                }
            }
        });
    });
});

const rest = new REST({ version: "9" }).setToken(token);
client.once("ready", () => {
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: commands,
            });
            console.log("Ready.");
        } catch {}
    })();
});
client.login(token);

client.on('messageCreate', async message => {
    
    if(message.content === "!make"){
        console.log("command rec");
        const canvas = Canvas.createCanvas(1140, 800)
        const ctx = canvas.getContext('2d')
        const back = await Canvas.loadImage('https://cdn.discordapp.com/attachments/984444040848216117/992029346682392606/reside.jpg')
        ctx.drawImage(back, 0, 0, canvas.width, canvas.height)
        ctx.font = "20px Impact"
        ctx.fillStyle = "#fffffff"
        ctx.textAlign = "center"
        ctx.fillText(message.author.tag.toUpperCase(), 650, 355)

        const avaa = await Canvas.loadImage(message.author.displayAvatarURL({
            format: "png",
            size: 1024
        }))
        ctx.drawImage(avaa, 620, 420, 117, 117)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sss.png")

        message.channel.send({ files: [attachment]})
    }
})

client.on("ready", () => {
    console.log(client.user.tag);
});
