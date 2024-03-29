import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;
    // console.log(request.query);
    // console.log(year);
    // console.log(month);
    // console.log(day);
    // console.log(provider_id);
    // console.log(hour);
    const listProviders = container.resolve(ListProviderAppointmentService);

    const appointments = await listProviders.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(classToClass(appointments));
  }
}
