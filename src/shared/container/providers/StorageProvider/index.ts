import { container } from 'tsyringe';

import IStrorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorafeProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStrorageProvider>('StorageProvider', providers.s3);
