const { EncryptJWT, jwtDecrypt } = require('jose');
const crypto = require('crypto');

// Generate a secret key for JWE if not provided (for dev)
// In production, this must be a fixed 32-byte secret in env vars
const SECRET_KEY = process.env.JWE_SECRET || crypto.randomBytes(32).toString('hex');
const secret = Buffer.from(SECRET_KEY, 'utf-8');

// Ensure secret is long enough for A256GCM (32 bytes)
// If process.env.JWE_SECRET is used, make sure it is 32 chars or convert properly
// For simplicity in this demo, we use a generated key if env is missing,
// but for persistence across restarts config must be set.
// Lets assume JWE_SECRET is provided as a 32+ char string or handled carefully.

const getKey = () => {
    // Basic pad or slice to 32 bytes for A256GCM
    const key = process.env.JWT_SECRET || 'dev-secret-must-be-32-bytes-long!';
    return new TextEncoder().encode(key.padEnd(32, '!').slice(0, 32));
};

const generateToken = async (payload) => {
    const jwt = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .encrypt(getKey());
  
    return jwt;
};

const verifyToken = async (token) => {
    const { payload } = await jwtDecrypt(token, getKey());
    return payload;
};

const generateRefreshToken = async (payload) => {
    // Refresh tokens can be simple signed JWTs or also JWEs. 
    // Spec req 2.3.3 says "issues a short-lived Access Token and a longer-lived Refresh Token".
    // We'll use JWE for consistency and security.
    const jwt = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .encrypt(getKey());

    return jwt;
};

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken
};
