import { Message } from "discord.js";
import { MessageHandler } from "../messageHandler";
import { USER_BJS, USER_FGSKY, USER_JOOAH, USER_KYLE, USER_PACIFICFISH, USER_TODD } from "../../../constants/entityIdConstants";
import { getAssetPath, getRandomFilepath } from "../../../utils/fileUtils";
import { proc } from "../../../utils/wrapperUtils";

const getRandomUserFile = (user: string) => {
    return getRandomFilepath(`gm/${user}`);
}

const execute = async (message: Message) => {
    let filePath = getAssetPath('gm/hutao.jpg');
    let response = 'Good morning!';

    switch (message.author.id) {
        case USER_TODD:
            response = 'Good Morning Todd!! Did you take your vitamins today?';
            filePath = getRandomUserFile('todd');
            break;
        case USER_FGSKY:
            response = "Good morning FGSky these vitamins aren't going to take themselves";
            filePath = getRandomUserFile('fgsky');
            break;
        case USER_JOOAH:
            response = "Good morning Jooah~ your breakfast is on the way!";
            filePath = getRandomUserFile('jooah');
            break;
        case USER_KYLE:
            response = "gm kyle lets drift";
            filePath = getRandomUserFile('kyle');
            break;
        case USER_PACIFICFISH:
            response = "BLUB BLUB BLUB BLUB BLUB + **VITAMINS** + Feed the wolf fox";
            filePath = getRandomUserFile('pacificfish');
            break;
        case USER_BJS:
            response = "Good morning";
            filePath = getRandomUserFile('bjs');
            break;
    }

    proc(0.01, () => {
        filePath = getAssetPath('gm/rare.webp');
        response = 'I made it look like I was dancing in the palm of your hand when in fact, you had been dancing in mine';
    })

    message.reply({ content: response, files: [filePath] });
}

export const gm: MessageHandler = {
    execute
}
