import crypto from 'crypto';
import fs from 'fs/promises';

const FILE = 'database/digix2/shadow.enc';
const SECRET = process.env.OWNER_KEY || 'Digix-crew';

const ALGO = 'aes-256-cbc';

function getKey() {
  return crypto.createHash('sha256').update(SECRET).digest();
}

export async function encryptOwners(ownerArray) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);

  let encrypted = cipher.update(JSON.stringify(ownerArray), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const payload = iv.toString('hex') + ':' + encrypted;
  await fs.writeFile(FILE, payload);
}

export async function decryptOwners() {
  try {
    const data = await fs.readFile(FILE, 'utf8');
    const [ivHex, encrypted] = data.split(':');

    const decipher = crypto.createDecipheriv(
      ALGO,
      getKey(),
      Buffer.from(ivHex, 'hex')
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch {
    return [];
  }
}