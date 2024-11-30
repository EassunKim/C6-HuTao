const path = require('path');
const { generateRandomUnicodeString } = require('../utils/stringUtils');

// Function to convert Twitter/X links to vxtwitter links
const convertToVXLink = (content) => {
    const twitterRegex = /https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/g;
    const match = content.match(twitterRegex);
    if (match) {
        return match[0].replace(/(twitter\.com|x\.com)/, 'vxtwitter.com');
    }
    return null; 
};

const containsCounterStrikeMention = (message) => {
    const keywords = ["counter strike", "counterstrike", "csgo", "cs", "cs2", "counter-strike"];

    const lowerCaseMessage = message.toLowerCase();
    const wordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'i'); // 'i' for case-insensitive

    return wordRegex.test(lowerCaseMessage);
}

const getRandomFact = async () => {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');
        return response.data.text;
    } catch (error) {
        console.error('Error fetching the random fact:', error);
        return null;  
    }
}

module.exports = (client) => {
    const responses = [
        {
            trigger: ['hi'],
            response: ':3',
            callback: (msg) => msg.reply(':3'),
        },
        {
            trigger: ['who', 'who?'],
            response: 'Xiangling',
            callback: (msg) => msg.reply('Xiangling'),
        },
        {
            trigger: ['hu'],
            response: 'Tao!',
            callback: (msg) => msg.reply('Tao!'),
        },
        {
            trigger: ['boo'],
            response: 'Tao!',
            callback: (msg) => msg.reply('Tao!'),
        },
        {
            trigger: ['and perhaps'],
            response: 'what is this?',
            callback: (msg) => msg.reply('what is this?'),
        }
    ];

    client.on('messageCreate', async (msg) => {
        if (msg.author.bot) return;

        const contentL = msg.content.toLowerCase();

        responses.forEach(({ trigger, callback }) => {
            if (trigger.includes(contentL)) {
                callback(msg);
            }
        });

        const convertedContent = convertToVXLink(msg.content);
        if (convertedContent) {
            msg.reply(convertedContent).then(() => {
                msg.suppressEmbeds(true);
            });
        }

        if (containsCounterStrikeMention(msg.content)) {
            msg.channel.send("<@133744863756812291> counter strike mentioned")
        }

        if (msg.author.id === '217028904890793984' && Math.random() < 0.01) {
            msg.delete();
        }

        if (msg.author.id === '168110440159772672' && Math.random() < 0.05) {
            msg.reply("🖕");
        }

        if (msg.author.id === '133744863756812291' && Math.random() < 0.05) {
            const reply = await msg.channel.send(generateRandomUnicodeString(2000))
            setTimeout(() => {
                reply.delete().catch(console.error);
            }, 1000);
        }

        if (msg.author.id === '478973799145013258' && Math.random() < 0.05) {
            const reply = await msg.reply({files: ['./responses/gm_message/Assets/kyle/princess-connect-kyaru.gif']})

            setTimeout(() => {
                reply.delete().catch(console.error);
            }, 2500);
        }
    });
};
