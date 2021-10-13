import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviders = container.resolve(ListProviderDayAvailabilityService);
    // console.log(year);
    // console.log(month);
    // console.log(day);
    const availability = await listProviders.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
