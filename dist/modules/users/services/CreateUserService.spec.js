"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    const user = await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    await expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users on the same email another', async () => {
    await createUserService.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    await expect(createUserService.execute({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});