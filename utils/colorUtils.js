const brightColors = [
    '#FF6464', // Light Red
    '#FFFF64', // Yellow
    '#64FF64', // Light Green
    '#64FFFF', // Light Cyan
    '#6464FF', // Light Blue
    '#FF64FF', // Light Magenta
];

// Function to generate a random bright color from the hex array
const getRandomBrightColor = () => {
    const randomIndex = Math.floor(Math.random() * brightColors.length);
    return brightColors[randomIndex];
}

module.exports = getRandomBrightColor;