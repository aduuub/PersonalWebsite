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

async function send(body: any, transport: any): Promise <void> {
    const mail = {
        from: body.email,
        to: "adamwareing241@gmail.com",
        subject: "Contact Form Message",
        html: `<p>Name: ${body.name}</p><p>Email: ${body.email}</p><p>Message: ${body.message}</p>`,
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
                return send(event.body, transport);
            });
        return { statusCode: 200 };
    
    } catch(error) { 
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error })
        };
    }
}