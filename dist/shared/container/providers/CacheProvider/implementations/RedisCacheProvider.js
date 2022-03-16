"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cahce = _interopRequireDefault(require("../../../../../config/cahce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cahce.default.config.redis);
  }

  async save(key, value) {
    // console.log(key, value);
    this.client.set(key, JSON.stringify(value));
  }

  async recover(key) {
    const data = await this.client.get(key);
    if (!data) return null;
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  async invalidate(key) {
    await this.client.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeLine = this.client.pipeline();
    keys.forEach(key => {
      pipeLine.del(key);
    });
    await pipeLine.exec();
  }

}

exports.default = RedisCacheProvider;