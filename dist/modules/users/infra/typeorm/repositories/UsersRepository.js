"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UsersRepository = (_dec = (0, _typeorm.EntityRepository)(_User.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const findUser = await this.ormRepository.findOne(id);
    return findUser;
  }

  async findByEmail(email) {
    const findUser = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return findUser;
  }

  async create({
    name,
    email,
    password
  }) {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    await this.ormRepository.save(user);
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    if (except_user_id) {
      const users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(except_user_id)
        }
      });
      return users;
    }

    const users = await this.ormRepository.find();
    return users;
  }

}) || _class) || _class) || _class);
var _default = UsersRepository;
exports.default = _default;