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
    const displayableUnicodeRanges = [
        [0x0020, 0x007E], // Basic Latin (letters, digits, punctuation)
        [0x00A0, 0x024F], // Latin-1 Supplement & Extended-A (letters, symbols)
        [0x0300, 0x036F], // Combining Diacritical Marks (used for accents)
        [0x0370, 0x03FF], // Greek and Coptic
        [0x0400, 0x04FF], // Cyrillic
        [0x0590, 0x05FF], // Hebrew
        [0x0600, 0x06FF], // Arabic
        [0x1F600, 0x1F64F], // Emoticons (emoji)
        [0x1F680, 0x1F6FF], // Transport and Map Symbols (emoji)
        [0x1F700, 0x1F77F], // Alchemical Symbols
        [0x1F780, 0x1F7FF], // Geometric Shapes Extended
        [0x1F800, 0x1F8FF], // Supplemental Arrows-C
        [0x1F900, 0x1F9FF], // Supplemental Symbols and Pictographs
        [0x2000, 0x206F], // General Punctuation
        [0x2500, 0x257F], // Box Drawing
        [0x3000, 0x303F], // CJK Symbols and Punctuation
        [0xFF00, 0xFFEF], // Halfwidth and Fullwidth Forms
        [0x200B, 0x200B], // Zero Width Space (invisible but displayable)
    ];

    let result = '';
    for (let i = 0; i < length; i++) {
        const range = displayableUnicodeRanges[Math.floor(Math.random() * displayableUnicodeRanges.length)];
        const charCode = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        result += String.fromCharCode(charCode);
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
                reply.delete().catch(console.error);
            }, 1000);
        }
    });
};
