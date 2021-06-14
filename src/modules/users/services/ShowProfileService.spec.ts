import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfileAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await showProfileService.execute({
      user_id: user.id,
    });

    await expect(updatedUser.name).toBe('John Doe');
    await expect(updatedUser.email).toBe('johndoe@example.com');
  });

  it('should not be able show the profile user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-exists-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
