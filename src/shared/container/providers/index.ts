import {container} from 'tsyringe';

import IStrorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorafeProvider';

container.registerSingleton<IStrorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);