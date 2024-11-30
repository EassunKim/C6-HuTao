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

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    
    let r, g, b;
    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    const rgbToHex = (x) => Math.round((x + m) * 255).toString(16).padStart(2, '0');
    return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
}

function getNextColorInSpectrum(step) {
    const hue = (step * 360) / 1440;
    const saturation = 100;
    const lightness = 50;
    return hslToHex(hue, saturation, lightness);
}

module.exports = {
    getRandomBrightColor,
    getNextColorInSpectrum,
}