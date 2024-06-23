import argon2 from 'argon2';

import { serverEnv } from '../server.env';

const isProduction = serverEnv.NODE_ENV === 'production';

class PasswordManager {
  async hash(password: string): Promise<string> {
    if (isProduction) {
      return argon2.hash(password);
    }

    return password;
  }

  async verify(hash: string, password: string): Promise<boolean> {
    if (isProduction) {
      return argon2.verify(hash, password);
    }

    return hash === password;
  }
}

export const passwordManager = new PasswordManager();
