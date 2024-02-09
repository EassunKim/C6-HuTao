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

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        } 
    
        const contentL = msg.content.toLowerCase();
        const lmao = client.channels.cache.get('1180431071704256513');
        const toddID = '254436057087606786';
        const string = "gm";
    
        if (contentL === string) {
            const imagePath = 'H:/C6-HuTao/Assets/furina_pic.jpg';
    
            if (msg.author.id === `${toddID}`) {
                lmao.send({ files: [{ attachment: 'H:/C6-HuTao/Assets/furina_pic.jpg'}]})
                    .then(lmao.send(`<@${toddID}> Good Morning Todd!! Did you take your vitamins today?`))
                    .catch(error => console.error('Error sending image:', error));
            } else {
                console.error("error");
            }
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

    //Water
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {
            return;
        }
        let contentL = msg.content.toLowerCase();
        let string = "water";

        if (contentL.includes(string)) {
            msg.reply('and perhaps what is this?');
        }
    });

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