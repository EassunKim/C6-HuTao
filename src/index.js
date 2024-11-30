require('dotenv').config();

//Dependencies
const {Client, IntentsBitField, ActivityType, MessageAttachment } = require('discord.js');
const path = require('path');
const cron = require('node-cron');
const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;

//Imported Behaviors
const gm = require('../responses/gm_message/gm');
const response = require('../responses/responses');
const roll = require('../commands/roll');
const play = require('../commands/lfg');
const gn = require('../responses/gn/gn');
const { generateRandomUnicodeString } = require('../utils/stringUtils');

// COMMAND PREFIX
const PREFIX = '$';



const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

/* ===== IMPORTS ===== */
response(client); // simple responses
gm(client); // good morning messages
roll(client); // roll command
play(client);// play command
gn(client);//gn message

/*===== READY ===== */
client.on('ready', async (c)=> {
    console.log(`${c.user.tag} is online`);

    // Set Bot status randomly
    const status = require('./status_list');
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    } , 1200000);

    setInterval(async () => {
        const name = generateRandomUnicodeString(32);
        const guild = await client.guilds.fetch('1097755762232672268');
        const member = await guild.members.fetch('133744863756812291');
        await member.setNickname(name);
    } , 5000);

    if (!mongoURL) return;

    await mongoose.connect(mongoURL || '', {
    });

    if (mongoose.connect) {
        console.log('successfully connected to mongodb');
    } else {
        console.log('there was an error connecting to the db')
    }

});


client.login(process.env.HUTAO_DISCORD_TOKEN);