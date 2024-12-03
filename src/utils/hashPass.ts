import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

export function comparePassword(
  password: string,
  hashedPassword: string,
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
