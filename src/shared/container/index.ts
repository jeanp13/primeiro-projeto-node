import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IAppointmentsRepositoy from '@modules/appointments/repositories/IAppointmentsRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

container.registerSingleton<IAppointmentsRepositoy>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);
