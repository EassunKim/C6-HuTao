import { Client, IntentsBitField } from "discord.js";
import { GUILD_UVIC, ROLE_HUTAO_COLOR, ROLE_MAJ, ROLE_VAL, USER_HUTAO } from "./constants/entityIdConstants";
import { STATUS_CONSTANTS } from "./constants/statusConstants";
import { handleMessages } from "./handlers/messageHandlers/messageHandler";
import { getNextColorInSpectrum, getRandomBrightColor } from "./utils/colorUtils";
import * as dotenv from 'dotenv';
import OpenAI from "openai";
import { getAssetPath } from "./utils/fileUtils";

dotenv.config();

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ]
});

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

/* ===== HANDLERS ===== */
handleMessages(client, openai);

/*===== READY ===== */
client.on('ready', async (c)=> {
    console.log(`${c.user.tag} is online`);

    // TODO: Can we just fetch these on init and use them everywhere
    const guild = await client.guilds.fetch(GUILD_UVIC);
    const roleVal = await guild.roles.fetch(ROLE_VAL);
    const roleMaj = await guild.roles.fetch(ROLE_MAJ);
    const roleHutaoColor = await guild.roles.fetch(ROLE_HUTAO_COLOR);
    const userHutao = await guild.members.fetch(USER_HUTAO);

    roleHutaoColor?.setColor(getRandomBrightColor());
    userHutao?.setNickname(null);
    const defaultAvatar = getAssetPath("default-avatar.png");
    client.user?.setAvatar(defaultAvatar);

    // TODO: refactor to set these through command
    let cycleMajColor = false;
    let cycleValRole = true;

    // Set Bot status randomly
    setInterval(() => {
        let random = Math.floor(Math.random() * STATUS_CONSTANTS.length);
        client.user?.setActivity(STATUS_CONSTANTS[random]);
    } , 1200000);

    setInterval(async () => {
        if (!cycleMajColor) return;
        const randomColor = getRandomBrightColor()
        roleMaj?.setColor(randomColor);
    } , 5000);

    let step = 0;
    setInterval(async () => {
        if (!cycleValRole) return;
        const newColor = getNextColorInSpectrum(step); 
        await roleVal?.setColor(newColor);
        step = (step + 1) % 144;
    }, 15000); 
});

client.login(process.env.HUTAO_DISCORD_TOKEN);