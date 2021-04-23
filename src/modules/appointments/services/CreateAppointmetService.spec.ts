import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const apponitment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(apponitment).toHaveProperty('id');
    expect(apponitment.provider_id).toBe('123123123');
  });
});

// describe('CreateAppointment', () => {
//   it('should be able to create a new appointment', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
