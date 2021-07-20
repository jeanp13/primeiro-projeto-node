interface IMAilConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'jean@jpavsys.dev.br',
      name: 'Jean Paulo JpavSys',
    },
  },
} as IMAilConfig;
