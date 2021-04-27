const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// Sets up the transporter

async function setup(): Promise < any > {
    return new Promise((resolve, reject) => {
        const contactEmail = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        contactEmail.verify((error: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(contactEmail);
            }
        });
    });
}

// Sends the message once the transport has been setup and verified

interface IEnquiry {
    name: string;
    email: string;
    message: string;
}

async function send(enquiry: IEnquiry, transport: any): Promise <void> {
    const mail = {
        from: enquiry.email,
        to: "adamwareing241@gmail.com",
        subject: "Contact Form Message",
        html: `<p>Name: ${enquiry.name}</p><p>Email: ${enquiry.email}</p><p>Message: ${enquiry.message}</p>`,
    };

    return new Promise((resolve, reject) => {
        transport.sendMail(mail, (error: any) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// Lambda function

interface IResponse {
    statusCode: number;
    body?: string;
}

exports.handler = async function (event: any, _: any): Promise<IResponse> {

    try {
        await setup()
            .then(transport => {
                const enquiry = JSON.parse(event.body);
                return send(enquiry, transport);
            });
        return { statusCode: 200 };
    
    } catch(error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "An error occured trying to send the message" })
        };
    }
}
