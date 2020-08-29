import "dotenv/config";

import nodemailer from 'nodemailer'
import { debounce } from 'lodash'


export const sendMail = async (title: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_ID, // sender address
    to: process.env.EMAIL_SUBSCRIPTION,
    subject: title,
    text,
  });

  return info
}

export const sendMailDebounce = debounce(sendMail, 5 * 60 * 1000, { leading: true, trailing: false })
