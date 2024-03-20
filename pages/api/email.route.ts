import type { NextApiRequest, NextApiResponse } from 'next';
import { SMTPClient } from 'emailjs';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const email=req.body.email;
    const subject =req.body.subject;
    const name = req.body.user;
    const dns = "http://ec2-3-21-169-197.us-east-2.compute.amazonaws.com/email/newemail" //    "http://ec2-3-21-169-197.us-east-2.compute.amazonaws.com/" //

    
    res.status(200).end(JSON.stringify({ message: 'Send Mail' }))
    const client = new SMTPClient({
        user: process.env.EMAILUSER,
        password: process.env.EPASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    const message = {
        text: 'i hope',
        from: '<digitalmoneyhouseg3@gmail.com>',
        to: email,
        subject:  subject,
        attachment: [
            {
                data:'<html lang="en"><body> <div style=" position: absolute; margin: 0px; background-color: #3A393E; width: 100%; height: 500px;"> <div style="display: flex ; flex-wrap: wrap;"> <div style=" font-family: Roboto, sans-serif; z-index: 1; margin-left: 40%; margin-top: 29px; width: 88px; height: 28px; border-top-left-radius: 8px; border-bottom-left-radius: 8px; padding: 6px; text-align: center; background: #C1FD35;"> DIGITAL </div><div style=" font-family: Roboto, sans-serif; margin-left: -10px; margin-top: 29px; width: 181px; height: 28px; border-radius: 8px; padding: 6px; text-align: center; background: #201F22; color: #FFFFFF;"> MONEY HOUSE </div></div><div style=" margin: auto; margin-top: 20px; width: 90%; height: 309px; background: #201F22; border-radius: 15px; border: 0.7777px solid #C1FD35;"> <div style=" text-align: center; font-family: Roboto, sans-serif; font-style: normal; font-weight: 400; font-size: 25.5px; line-height: 28px; color: #C1FD35;"> Hola '+name+'</div><div style=" font-family: Roboto, sans-serif; font-style: normal; font-weight: 500; font-size: 17px; line-height: 26px; text-align: center; color: #FFFFFF; "> <p>Recibimos tu solicitud de cambio de email.</p><p>Por favor confirma el cambio entrando al siguiente link.</p></div><a href="'+dns+'?email='+email+'" style="margin-left: 40%;"> <button style=" box-sizing: border-box; text-align: center; background-color: #201F22; margin: auto; width: 178px; height: 57px; color:#C1FD35; border: 1px solid #C1FD35; border-radius: 10px;"> Confirmar email </button> </a> </div></div></body></html>', alternative: true
            },]

    };
    client.send(message, function (err, message) {
        console.log(err || message);
    });
}


