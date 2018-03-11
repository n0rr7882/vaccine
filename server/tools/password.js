import crypto from 'crypto';

export function password(password) {
    return crypto.createHash("sha512").update(password).digest('base64');
}