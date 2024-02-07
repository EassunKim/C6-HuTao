require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const PREFIX = '$';

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c)=> {
    console.log(`${c.user.tag} is online`)
});
/*
// Time Zone Functionality
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'H:\C6-HuTao\c6-hutao-c4e1c7818aa9',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });


async function readSheet(range) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: range,
    });
    return response.data.values;
}

async function writeToSheet(range, values) {
    const request = {
        spreadsheetId: '1SpRRS1JdkgWaZ9ccNyjK9d9oXtGUlZq04vRuyp0siZM',
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: { values: values },
    };
    const response = await sheets.spreadsheets.values.update(request);
    console.log(`${response.data.updatedCells} cells updated.`);
}

client.on('message', async msg => {
    // ignore any bot messages or messages not starting with $
    if (msg.author.bot || !msg.content.startsWith(PREFIX)) return;
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'time create') {
        if (args.length !== 2) {
            msg.channel.send('use it right :3 PROPER CMD $time create <name> <time zone abbreviation>');
            return;
        }

        const [A,B] = args;

        //check if A already in spread sheet
        const data = await readSheet('Sheet1!A:A');
        const exists = data.some(row => row[0] === A);

        if (exists) {
            msg.channel.send(`${A} Aleady exists`);
        } else {
            const nextRow = data.length + 1;

            await writeToSheet(`Sheet1!A${nextRow}:B${nextRow}`, [[A, B]]);
            message.channel.send(`${A} and ${B} added to the spreadsheet.`);
        }
    } else if (command === 'time') {
        if (args.length !== 1) {
            msg.channel.send('Let\'s go! Hey you, butterfly You too, buzzin\' by  Guidin\' your way to the after life Openin\' the path without a fright, oh! I\'ll light the fire, watch it blaze\' cross the universe I\'ll spit my rhymes, watch your step, or you\'ll get burned Hey! Wooh! Yeah! PROPER CMD $time create <name>');
            return;
        } 

        //check if A already in spread sheet
        const data = await readSheet('Sheet1!A:A');
        const exists = data.some(row => row[0] === A);


    }


}

);
*/

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
                message.channel.send('Invalid maximum number. Using default maximum (100).');
            }
        }
        const min = 1; // Minimum value for the random number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min and max
        message.channel.send(`BOOM!!! ${randomNumber}`);
    }
});

// :3
client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    }

    if (msg.content === "hi") {
        msg.reply(':3');
    }
});
/*
// ghost ping
function ghostPing() {
    
    guild.members.cache.forEach(member => {
        memberIDs.push(member.user.id);
    });
    const randomMember = members[Math.floor(Math.random() * members.length)]; 

    const channel = client.channels.cache.get('1180431071704256513');
    if (channel && channel.type === 'text') {
        channel.send(`:3`);
    } 
}
*/
setInterval(ghostPing, 5);
client.login(process.env.TOKEN);