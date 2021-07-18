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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 18, 15).getTime();
    });

    const apponitment = await createAppointment.execute({
      date: new Date(2021, 6, 18, 17),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    await expect(apponitment).toHaveProperty('id');
    await expect(apponitment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 6, 20, 17);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 18, 18).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 18, 17),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment if same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 18, 18).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 18, 19),
        provider_id: 'user_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8AM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 17, 18).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 18, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment after 5PM', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 17, 18).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 18, 18),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// describe('CreateAppointment', () => {
//   it('should be able to create a new appointment', () => {
//     expect(1 + 2).toBe(3);
//   });
// });
