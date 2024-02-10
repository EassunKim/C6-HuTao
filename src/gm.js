var path = require('path');

module.exports = (client) => {

    //GLOBAL VAR
    const FILE_PATH = 'H:/C6-HuTao/Assets/'; //Set path that contains image locations

    // todd gm
    client.on('messageCreate', (msg) => {
        //USER CHANGES THESE
        const userID = '1160719966551687199';
        const imgName = 'furina_pic.jpg';
        const gmMessage = "Good Morning Todd!! Did you take your vitamins today?"
        //
        const contentL = msg.content.toLowerCase();
        const channel = client.channels.cache.get(`${msg.channel.id}`);
        const [string1, string2] = ["gm", "gm "];
        const imagePath = path.join(`${FILE_PATH}`, `${imgName}`)

        if (msg.author.bot) {return;}
    
        if (contentL === string1 || contentL.includes(string2)) {
            if (msg.author.id === `${userID}`) {
                channel.send({files: [{ attachment: `${imagePath}`}]
            })
                .then(channel.send(`<@${userID}> ${gmMessage}`))
                .catch(error => console.error('Error sending image:', error));
            }
        }
    });

    // fgsky gm
    client.on('messageCreate', (msg) => {
        //USER CHANGES THESE
        const userID = '97116639727738880';
        const imgName = 'cyno.jpg';
        const gmMessage = "Good morning FGSky these vitamins aren't going to take themselves"
        //
        const contentL = msg.content.toLowerCase();
        const channel = client.channels.cache.get(`${msg.channel.id}`);
        const [string1, string2] = ["gm", "gm "];
        const imagePath = path.join(`${FILE_PATH}`, `${imgName}`)

        if (msg.author.bot) {return;}
    
        if (contentL === string1 || contentL.includes(string2)) {
            if (msg.author.id === `${userID}`) {
                channel.send({files: [{ attachment: `${imagePath}`}]
            })
                .then(channel.send(`<@${userID}> ${gmMessage}`))
                .catch(error => console.error('Error sending image:', error));
            }
        }
    });

    // jooah gm
    client.on('messageCreate', (msg) => {
        //USER CHANGES THESE
        const userID = '687452592745349152';
        const imgName = 'yuka.webp';
        const gmMessage = "Good morning Jooah~ your breakfast is on the way!";
        //
        const contentL = msg.content.toLowerCase();
        const channel = client.channels.cache.get(`${msg.channel.id}`);
        const [string1, string2] = ["gm", "gm "];
        const imagePath = path.join(`${FILE_PATH}`, `${imgName}`)

        if (msg.author.bot) {return;}
    
        if (contentL === string1 || contentL.includes(string2)) {
            if (msg.author.id === `${userID}`) {
                channel.send({files: [{ attachment: `${imagePath}`}]
            })
                .then(channel.send(`<@${userID}> ${gmMessage}`))
                .catch(error => console.error('Error sending image:', error));
            }
        }
    });




}