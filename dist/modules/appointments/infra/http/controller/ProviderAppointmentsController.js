"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderAppointmentService = _interopRequireDefault(require("../../../services/ListProviderAppointmentService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query; // console.log(request.query);
    // console.log(year);
    // console.log(month);
    // console.log(day);
    // console.log(provider_id);
    // console.log(hour);

    const listProviders = _tsyringe.container.resolve(_ListProviderAppointmentService.default);

    const appointments = await listProviders.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json((0, _classTransformer.classToClass)(appointments));
  }

}

exports.default = ProviderAppointmentsController;