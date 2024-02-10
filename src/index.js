require('dotenv').config();
const {Client, IntentsBitField, ActivityType, MessageAttachment } = require('discord.js');
const path = require('path');
const PREFIX = '$';
const response = require('../responses/responses');
const gm = require('../responses/gm_message/gm')
const cron = require('node-cron');



const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

//import of all message responses from repsonses.js
response(client);
gm(client);

// Bot's status
let status = [
    {
        name: "Xiangling Paradise",
        type: ActivityType.Listening,
        url: "https://www.youtube.com/watch?v=OwMlnkUX354",
    },
    {
        name: "Farming Crimson Witch",
        type: ActivityType.Custom,
        state: "Farming Crimson Witch"
    },
]



client.on('ready', (c)=> {
    console.log(`${c.user.tag} is online`);

    // Set Bot status randomly
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    } , 1200000);

    var lmao = client.channels.cache.get('1203811935573770324');
    var toddID = '254436057087606786';
    var bongoID = '687452592745349152';
    var paramID = '297585779004276736';

    // reminding my friend to take his pills
    // cron.schedule('38 21 * * *', () => {
    //     if (lmao) {
    //         const imagePath = path.join(__dirname, '..', 'Assets', 'furina_pic.jpg');
    //         const attachment = new MessageAttachment(imagePath);

    //         lmao.send(`yop`, attachment)

    //     }
    // });
    
});

// roll
client.on('messageCreate', message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return; // Ignore bot messages and messages without prefix
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'roll') {
        let max = 100; // Default maximum value for the random number
        if (args.length > 0) {
            // If a maximum number is provided as an argument, parse it
            const providedMax = parseInt(args[0]);
            if (!isNaN(providedMax) && providedMax > 1) {
                max = providedMax;
            } else {
                message.channel.send('USE IT RIGHT :3');
            }
        }
        const min = 1; // Minimum value for the random number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min and max
        message.channel.send(`BOOM!!! ${randomNumber}`);
    }
});

client.login(process.env.TOKEN);