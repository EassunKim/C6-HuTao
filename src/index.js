require('dotenv').config();

//Dependencies
const {Client, IntentsBitField, ActivityType, MessageAttachment } = require('discord.js');
const path = require('path');
const cron = require('node-cron');

//Imported Behaviors
const gm = require('../responses/gm_message/gm');
const response = require('../responses/responses');
const roll = require('../commands/roll');
const play = require('../commands/lfg');
const gn = require('../responses/gn/gn');

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

client.on('ready', (c)=> {
    console.log(`${c.user.tag} is online`);

    // Set Bot status randomly
    const status = require('./status_list');
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    } , 1200000);
});


client.login(process.env.TOKEN);