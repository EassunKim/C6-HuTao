const path = require('path');

// Function to convert Twitter/X links to vxtwitter links
const convertToVXLink = (content) => {
    const twitterRegex = /https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+/g;
    return content.replace(twitterRegex, (url) => {
        return url.replace(/(twitter\.com|x\.com)/, 'vxtwitter.com');
    });
};

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

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;

        const contentL = msg.content.toLowerCase();

        responses.forEach(({ trigger, callback }) => {
            if (trigger.includes(contentL)) {
                callback(msg);
            }
        });

        const convertedContent = convertToVXLink(msg.content);
        if (convertedContent !== msg.content) {
            msg.reply(convertedContent);
        }

        // Special case for "SleepHill" user
        if (msg.author.id === '217028904890793984' && Math.random() < 0.01) {
            msg.delete();
        }
    });
};
