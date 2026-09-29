const CHARACTERS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateShortCode(length = 7) {
    let result = "";

    for (let i = 0; i < length; i++) {
        const index = Math.floor(
            Math.random() * CHARACTERS.length
        );

        result += CHARACTERS[index];
    }

    return result;
}


//collision can occur but we are using unique so nothing will happen very minute cases