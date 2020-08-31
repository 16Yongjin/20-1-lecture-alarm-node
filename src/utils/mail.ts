import nodemailer from 'nodemailer'
import { debounce } from 'lodash'
import { logger } from "./logger";


export const sendMail = async (title: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to: process.env.EMAIL_ID,
    subject: title,
    text,
  }).catch((error) => logger.error(error.message));

  return info
}

export const sendMailDebounce = debounce(sendMail, 5 * 60 * 1000, { leading: true, trailing: false })