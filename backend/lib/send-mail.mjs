import nodemailer from 'nodemailer'

const smtpOptions = {
  host: process.env['SMTP_HOST'],
  port: process.env['SMTP_PORT'],
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASSWORD'],
  },
}

const defaultFrom = process.env['DEFAULT_FROM_ADDRESS']

export default class SendMail {
  transporter

  constructor(options = smtpOptions) {
    this.transporter = nodemailer.createTransport(options)
  }

  async send(mail = {}) {
    const mailObj = {
      from: defaultFrom,
      to: defaultFrom,
      subject: 'mail subject',
      text: 'mail text',
      ...mail,
    }
    await this.transporter.sendMail(mailObj)
  }
}
