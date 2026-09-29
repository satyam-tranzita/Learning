export function validateUrl(value) {
    try {
        const url = new URL(value);

        if (!["http:", "https:"].includes(url.protocol)) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}