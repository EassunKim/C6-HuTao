/*
    Simple reply function for c6 HuTao bot
    Contains simple cases wherein the bot will respond to messages when they are sent
*/

var path = require('path');

module.exports = (client) => {

    // Hu Tao
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "hi";

        if (contentL === string) {
            msg.reply(':3');
        }
    });

    // xiangling
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "who";
        let string2 = "who?";

        if (contentL === string || contentL === string2) {
            msg.reply('Xiangling');
        }
    });

    // Hu Tao
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "hu";

        if (contentL === string) {
            msg.reply('Tao!');
        }
    });

    // Bootao
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "boo";

        if (contentL === string) {
            msg.reply('Tao!');
        }
    });

    // //Water
    // client.on('messageCreate', (msg) => {
    //     if (msg.author.bot) {
    //         return;
    //     }
    //     let contentL = msg.content.toLowerCase();
    //     let string = "water";

    //     if (contentL.includes(string)) {
    //         msg.reply('and perhaps what is this?');
    //     }
    // });

    //what is this
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "and perhaps";

        if (contentL === string) {
            msg.reply('what is this?');
        }
    });
}