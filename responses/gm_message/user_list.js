const gmUser = require('./user_class');
const fs = require('fs');
const path = require('path');
const FILE_PATH = './responses/gm_message/Assets';

//Function to read files from each user's directory
function getImageFiles(directory) {
    try {
        const files = fs.readdirSync(directory).filter(file => {
            return file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif');
        });
        //console.log(`Files in ${directory}:`, files);
        return files;
    } catch (error) {
        return [];
    }
}

const userDefinitions = [
    { name: 'test', id: '1160719966551687199', message: 'GMGMGMGGMMG'},
    { name: 'todd', id: '254436057087606786', message: 'Good Morning Todd!! Did you take your vitamins today?' },
    { name: 'fgsky', id: '97116639727738880', message: "Good morning FGSky these vitamins aren't going to take themselves" },
    { name: 'jooah', id: '687452592745349152', message: "Good morning Jooah~ your breakfast is on the way!" },
    { name: 'kyle', id: '478973799145013258', message: "gm kyle lets drift" },
    { name: 'pacfic fish', id: '436031839690555402', message: "BLUB BLUB BLUB BLUB BLUB" },
    { name: 'bjs', id: '216784525085245441', message: "Good morning" },
    { name: 'param', id: '297585779004276736', message: "lookin cute today param" },
    { name: 'taro', id: '613596372796702740', message: "KILL YOURSELF btw take ur vitamins" },
];

const users = userDefinitions.map(user => {
    const userDirectory = path.join(FILE_PATH, user.name);
    const files = getImageFiles(userDirectory);
    return new gmUser(user.name, user.id, files, user.message);
});


module.exports = users;