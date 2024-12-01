import { Message } from "discord.js";
import { getAssetPath, getRandomFilepath } from "../../../utils/fileUtils";
import { proc } from "../../../utils/wrapperUtils";
import { MessageHandler } from "../messageHandler";

const execute = async (message: Message) => {
    let filePath = getRandomFilepath('gn/standard');
    let response = 'gn~ sleep tight';

    proc(0.01, () => {
        filePath = getAssetPath('gn/rare.gif');
        response = 'To doubt everything or to believe everything are two equally convenient solutions; both dispense with the necessity of reflection.'
    });

    message.reply({ content: response, files: [filePath] });
}

export const gn: MessageHandler = {
    execute
}
