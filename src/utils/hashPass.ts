import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}
