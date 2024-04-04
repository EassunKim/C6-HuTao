/*
    Simple reply function for c6 HuTao bot
    Contains simple cases wherein the bot will respond to certain users 'gm' message

    Cases can be added by copy pasting a new case and changing the paramaters in the first part of each block
*/


var path = require('path');
const users = require('./user_list');

module.exports = (client) => {

    //GLOBAL VAR
    const FILE_PATH = './responses/gm_message/Assets'; //Set path that contains image locations

    // init var
    let fileList, ID, random, img, gmMessage, name;

    client.on('messageCreate', (msg) => {
        if (msg.author.bot) {return;}

        //find if user is in user_list
        const authorID = msg.author.id;
        const person = users.find(sender => sender.userID === authorID);
        if (!person) {
            // general case
            gmMessage = "Good morning!";
            ID = msg.author.id;
            img = "hutao.jpg";
            name = '';
     
        } else {
            fileList = person.imgName;
            ID = person.userID;
            random = Math.floor(Math.random() * fileList.length); // for random feature
            img = fileList[random];
            gmMessage = person.gmMessage;
            name = person.name
        }
        
        //1% rare image
        let rare = Math.floor(Math.random() * 100);
        if (rare < 1) {
            img = 'rare.webp';
            gmMessage = "I made it look like I was dancing in the palm of your hand when in fact, you had been dancing in mine";
        }

        const contentL = msg.content.toLowerCase();
        const channel = client.channels.cache.get(`${msg.channel.id}`);
        const [string1, string2] = ["gm", "gm "];
        const imagePath = path.join(`${FILE_PATH}`,name, `${img}`);
    
        if (contentL === string1 || contentL.startsWith(string2)) {
            if (msg.author.id === `${ID}`) {
                channel.send({content: `<@${ID}> ${gmMessage}`, files: [`${imagePath}`]})
                .catch(error => console.error('Error sending image:', error));
            }
        }
    });

}