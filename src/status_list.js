const { ActivityType } = require("discord.js");

let status = [
    {
        name: "Xiangling Paradise",
        type: ActivityType.Listening,
        url: "https://www.youtube.com/watch?v=OwMlnkUX354",
    },
    {
        name: "Farming Crimson Witch",
        type: ActivityType.Custom,
        state: "Farming Crimson Witch"
    },
    {
        name: "Full refreshing",
        type: ActivityType.Custom,
        state: "Full refreshing"
    },
]

module.exports = status;