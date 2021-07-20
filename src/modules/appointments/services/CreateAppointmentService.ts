import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointmentsRepositoy from '../repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositoy,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const startedDate = startOfHour(date);

    if (isBefore(startedDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }
    // throw new AppError("You can't create an appointment on a past date.");

    if (user_id === provider_id) {
      throw new AppError("You can't create an appotment with yourself");
    }
    const hour = getHours(startedDate);

    if (hour > 17 || hour < 8) {
      throw new AppError('You can only create appotments between 8am and 5pm');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      startedDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: startedDate,
    });

    const dateFormated = format(startedDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo Agendamento para dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
