const path = require('path');

// Function to convert Twitter/X links to vxtwitter links
const convertToVXLink = (content) => {
    const twitterRegex = /https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/g;
    const match = content.match(twitterRegex);
    if (match) {
        return match[0].replace(/(twitter\.com|x\.com)/, 'vxtwitter.com');
    }
    return null; 
};

const generateRandomUnicodeString = (length = 2000) => {
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const codePoint = Math.floor(Math.random() * 0x110000);

        // Ensure it's a valid Unicode code point and not a surrogate pair (for BMP)
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
            i--;
            continue;
        }

        result += String.fromCodePoint(codePoint)
    }

    return result;
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

        if (msg.author.id === '217028904890793984' && Math.random() < 0.01) {
            msg.delete();
        }

        if (msg.author.id === '168110440159772672' && Math.random() < 0.05) {
            msg.reply("🖕");
        }

        if (msg.author.id === '133744863756812291') {
            const reply = await msg.channel.send(generateRandomUnicodeString())
            setTimeout(() => {
                message.delete().catch(console.error);
            }, 1000);
        }
    });
};
