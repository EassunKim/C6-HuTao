// roll
require('dotenv').config();
const prefix = '$';

module.exports = (client) => {
    client.on('messageCreate', message => {
        if (message.author.bot || !message.content.startsWith(prefix)) return; // Ignore bot messages and messages without prefix
        const args = message.content.slice(prefix.length).trim().split(/ +/);
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
        if (command === 'flip') {
            let max = 100; // Default maximum value for the random number
            const min = 1; // Minimum value for the random number (inclusive)
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min and max
            if (randomNumber <= 50) {
                message.channel.send(`Heads da yo`);
            } else {
                message.channel.send(`tails da yo`);
            }
        }
    });
}
