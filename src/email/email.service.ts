import { Readable } from "node:stream";
import nodemailer from "nodemailer";

export async  function enviarEmail(email?: string, titulo?: string, texto?: string, csvStream?: Readable){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  
        port: 587,                   
        secure: false,           
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transporter.sendMail({
        from: '"SISTEMA DE AUTOMAÇÕES PRICEMET" <no-reply@meusistema.com>',
        to: email,
        subject: titulo,
        text: texto,
        attachments: [
            {
            filename: "dados.csv",
            content: csvStream
            }
        ]
    })
}