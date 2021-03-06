import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const apponitment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    await expect(apponitment).toHaveProperty('id');
    await expect(apponitment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1231231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// describe('CreateAppointment', () => {
//   it('should be able to create a new appointment', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
