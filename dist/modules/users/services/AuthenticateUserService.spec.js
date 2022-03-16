"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let authenticateUserService;
let fakeCacheProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    authenticateUserService = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new appointment', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    const reponse = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123123'
    });
    await expect(reponse).toHaveProperty('token');
  });
  it('should not be able to authenticate with incorect user', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    await expect(authenticateUserService.execute({
      email: 'johndoe@example.com.br',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with incorect password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    await expect(authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});