import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepositoy from '../IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepositoy {
  private appintments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appintments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // assign serve para unificar objeto, neste caso ele pega os valores do segundo parametro e uni com o primeiro, substituia a criaçaõ manual
    Object.assign(appointment, { id: uuid(), date, provider_id });

    // substituido pelo Object.assign
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appintments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
