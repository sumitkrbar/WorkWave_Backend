import nodemailer from 'nodemailer'

import { MAIL_ID, MAIL_PASSWORD } from './serverConfig.js';
export default nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD,
  },
});