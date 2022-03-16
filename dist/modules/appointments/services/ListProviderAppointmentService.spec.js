"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentService = _interopRequireDefault(require("./ListProviderAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderAppointmentService;
let fakeAppointmentRepository;
let fakeCacheProvider;
describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointmentService = new _ListProviderAppointmentService.default(fakeAppointmentRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2021, 5, 16, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2021, 5, 16, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 5, 16, 11).getTime();
    });
    const availability = await listProviderAppointmentService.execute({
      provider_id: 'user',
      year: 2021,
      month: 6,
      day: 16
    });
    expect(availability).toEqual([appointment1, appointment2]);
  });
});