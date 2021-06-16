import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability from proider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2021, 5, 16, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2021, 5, 16, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2021, 5, 17, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 6,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 15, availability: true },
        { day: 16, availability: false },
        { day: 17, availability: false },
        { day: 18, availability: true },
      ]),
    );
  });
});
