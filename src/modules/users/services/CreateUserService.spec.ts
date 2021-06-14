import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users on the same email another', async () => {
    await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'John doe',
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
