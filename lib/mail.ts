import nodemailer from "nodemailer"

export async function sendMail({subject, body}: {
    subject: string,
    body: string
}){
    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        tls: {
            ciphers: "SSLv3"
        },
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        },
    });

    try {
        const testResult = await transport.verify()
        console.log(testResult)
    } catch(error) {
        console.log(error)
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL, to: SMTP_EMAIL, subject, html:body
        })
        console.log(sendResult);
    } catch(error) {
        console.log(error)
    }
}