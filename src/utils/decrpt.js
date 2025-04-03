import CryptoJS from 'crypto-js';

export const decryptFuc = async (data) => {
    try {
        // console.log("Received encrypted data:", data);

        const keyString = "nagarajki@ganakalabs"; // Key string used in backend
        const key = CryptoJS.enc.Utf8.parse(keyString.padEnd(32, ' ')); // Pad keyString to ensure it's 32 bytes

        const ivString = "restrictedganaka123"; // Same IV as used in backend
        const iv = CryptoJS.enc.Utf8.parse(ivString.padEnd(16, ' ')); // Pad or truncate to 16 bytes

        // Parse hex encrypted data
        const encryptedDataBytes = CryptoJS.enc.Hex.parse(data);

        // Decrypt data
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: encryptedDataBytes },
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        );

        // Convert decrypted data to string
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        // Check if decryption was successful
        if (!decryptedText) {
            throw new Error("Decryption failed or resulted in an empty string");
        }

        return JSON.parse(decryptedText);
    } catch (error) {
        console.error("Decryption Error:", error.message);
        return null;
    }
}


export const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$&';

    // Ensure the password is at least 8 characters long and meets all conditions
    let password = '';

    // Add one of each required character type
    password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Add random characters to complete the desired length
    const allChars = upperCaseChars + lowerCaseChars + digits + specialChars;
    for (let i = password.length; i < 8; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to ensure randomness of character types
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}