"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfileService;
describe('UpdateProfileAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able show the profile user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await showProfileService.execute({
      user_id: user.id
    });
    await expect(updatedUser.name).toBe('John Doe');
    await expect(updatedUser.email).toBe('johndoe@example.com');
  });
  it('should not be able show the profile user', async () => {
    await expect(showProfileService.execute({
      user_id: 'non-exists-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});