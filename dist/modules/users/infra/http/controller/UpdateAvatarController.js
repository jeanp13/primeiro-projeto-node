"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user)
    });
  }

}

exports.default = UpdateAvatarController;