import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EncryptionService {
  private key = process.env.ENCRYPTION_KEY;

  generateRandomSecretKey(): string {
    return uuidv4().replace(/-/g, '');
  }

  encrypt(text: string): string {
    const ciphertext = CryptoJS.AES.encrypt(text, this.key).toString();
    return ciphertext;
  }

  decrypt(ciphertext: string): string {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, this.key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  hash(text: string): string {
    return CryptoJS.SHA3(text).toString();
  }
}
