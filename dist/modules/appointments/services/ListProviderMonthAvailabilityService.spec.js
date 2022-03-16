"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderMonthAvailability;
let fakeAppointmentRepository;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentsRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentRepository);
  });
  it('should be able to list the month availability from proider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 8, 0, 0)
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 9, 0, 0)
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 10, 0, 0)
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 11, 0, 0)
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 12, 0, 0)
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 5, 16, 13, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2022, 5, 16, 14, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2022, 5, 16, 15, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2022, 5, 16, 16, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2022, 5, 16, 17, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: 'user',
      provider_id: 'user',
      date: new Date(2022, 5, 17, 17, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2022,
      month: 6
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 15,
      available: true
    }, {
      day: 16,
      available: false
    }, {
      day: 17,
      available: true
    }, {
      day: 18,
      available: true
    }]));
  });
});