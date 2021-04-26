import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(pauload: string): Promise<string> {
    return pauload;
  }

  public async compareHash(pauload: string, hashed: string): Promise<boolean> {
    return pauload === hashed;
  }
}
