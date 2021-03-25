import Appointment from '../typeorm/entities/Appointment';

interface IAppointmentsRepositoy {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
