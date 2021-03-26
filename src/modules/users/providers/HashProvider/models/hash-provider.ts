export interface IHashProvider {
  generateHash(data: string): Promise<string>;
  compareHash(data: string, hashed: string): Promise<boolean>;
}
