import { Resend } from "resend";

export const resend = new Resend(String(process.env.RESEND_API_KEY))