import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // console.log('asd');
    nodemailer.createTestAccount().then(account => {
      const tranporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      // console.log(account);

      this.client = tranporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const info = await this.client.sendMail({
      from: 'Equipe goBarber <equipe@gobarber.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
