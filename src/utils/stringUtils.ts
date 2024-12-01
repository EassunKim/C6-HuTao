export const generateRandomUnicodeString = (length: number) => {
    const languageUnicodeRanges = [
        [0x0041, 0x005A], // Latin Uppercase (A-Z)
        [0x0061, 0x007A], // Latin Lowercase (a-z)
        [0x00C0, 0x00FF], // Latin-1 Supplement (Accented letters)
        [0x0100, 0x017F], // Latin Extended-A
        [0x0180, 0x024F], // Latin Extended-B
        [0x0400, 0x04FF], // Cyrillic
        [0x0370, 0x03FF], // Greek and Coptic
        [0x0590, 0x05FF], // Hebrew
        [0x0600, 0x06FF], // Arabic
        [0x0700, 0x074F], // Syriac
        [0x0980, 0x09FF], // Bengali
        [0x0A00, 0x0A7F], // Gurmukhi (Punjabi)
        [0x0A80, 0x0AFF], // Gujarati
        [0x0B00, 0x0B7F], // Oriya
        [0x0B80, 0x0BFF], // Tamil
        [0x0C00, 0x0C7F], // Telugu
        [0x0C80, 0x0CFF], // Kannada
        [0x0D00, 0x0D7F], // Malayalam
        [0x0D80, 0x0DFF], // Sinhala
        [0x0E00, 0x0E7F], // Thai
        [0x0E80, 0x0EFF], // Lao
        [0x1100, 0x11FF], // Hangul Jamo (Korean)
        [0x4E00, 0x9FFF], // CJK Ideographs (Chinese, Japanese, Korean)
        [0x3040, 0x309F], // Hiragana (Japanese)
        [0x30A0, 0x30FF], // Katakana (Japanese)
        [0xAC00, 0xD7AF], // Hangul Syllabic Blocks (Korean)
    ];

    let result = '';
    for (let i = 0; i < length; i++) {
        const range = languageUnicodeRanges[Math.floor(Math.random() * languageUnicodeRanges.length)];
        const charCode = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        result += String.fromCharCode(charCode);
    }

    return result;
}
