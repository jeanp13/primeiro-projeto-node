import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorafeProvider';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();    
    const fakeStorageProvider = new FakeStorageProvider();
    
    const updateUserAvatarService = new UpdateUserAvatarService(
        fakeUsersRepository,
        fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await updateUserAvatarService.execute({
        user_id: user.id,
        avatarFileName: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();    
    const fakeStorageProvider = new FakeStorageProvider();
    
    const updateUserAvatarService = new UpdateUserAvatarService(
        fakeUsersRepository,
        fakeStorageProvider,
    );

    expect(updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update avatar exists user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();    
    const fakeStorageProvider = new FakeStorageProvider();
    
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
        fakeUsersRepository,
        fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await updateUserAvatarService.execute({
        user_id: user.id,
        avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
        user_id: user.id,
        avatarFileName: 'newAvatar.jpg',
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');
    expect(user.avatar).toBe('newAvatar.jpg')
  });

});
