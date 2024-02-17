var path = require('path');
const fs = require('fs');

module.exports = (client) => {

    //GLOBAL VAR
    const FILE_PATH = './responses/gn/Assets'; //Set path that contains image locations

    // init var
    let fileList, ID, random, img, gnMessage, files;

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {return;}
     
        // use fs to get a list of images in Assets folder

        ID = msg.author.id;
        fileList = fs.readdirSync(`${FILE_PATH}`);
        random = Math.floor(Math.random() * fileList.length); // for random feature
        img = fileList[random];
        gnMessage = `gn~ sleep tight`;

        
        //1% rare image
        let rare = Math.floor(Math.random() * 100);
        if (rare < 1) {
            img = 'rare.gif';
            gmMessage = "To doubt everything or to believe everything are two equally convenient solutions; both dispense with the necessity of reflection.";
        }

        const contentL = msg.content.toLowerCase();
        const channel = client.channels.cache.get(`${msg.channel.id}`);
        const [string1, string2] = ["gn", "gn "];
        const imagePath = path.join(`${FILE_PATH}`, `${img}`);
    
        if (contentL === string1 || contentL.includes(string2)) {
            channel.send({content: `<@${ID}> ${gnMessage}`, files: [`${imagePath}`]})
            .catch(error => console.error('Error sending image:', error));
        }
    });

}