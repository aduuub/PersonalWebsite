import * as React from 'react';
import emailjs from 'emailjs-com';

import { FormEvent, RefObject } from 'react';
import { Element } from 'react-scroll';

import Constants from 'models/constants';

interface IProps {
}

interface IState {
    sent: boolean;
}

export default class HomeContact extends React.Component<IProps, IState> {

    name: RefObject<HTMLInputElement>;
    email: RefObject<HTMLInputElement>;
    message: RefObject<HTMLTextAreaElement>;
    form: RefObject<HTMLFormElement>;
    formMessage: string;
    sending: boolean;

    constructor(props: IProps) {
        super(props);

        this.name = React.createRef();
        this.email = React.createRef();
        this.message = React.createRef();
        this.form = React.createRef();
        this.formMessage = '';
        this.sending = false;
        this.state = {
            sent: false,
        };

        emailjs.init("user_AYXYuNgX0Mkwsh2CUqQu1");
    }

    validateInput(input: HTMLInputElement | HTMLTextAreaElement): boolean {
        if ((input.value?.length ?? 0) < 1) {
            input.classList.add('Invalid');
            return false;
        }

        input.classList.remove('Invalid');
        return true;
    }

    value(input: HTMLInputElement | HTMLTextAreaElement): string {
        return input.value;
    }

    validate(): boolean {
        const validName = this.validateInput(this.name.current!);
        const validEmail = this.validateInput(this.email.current!);
        const validMessage = this.validateInput(this.message.current!);

        return validName && validEmail && validMessage;
    }

    mailSent(success: boolean) {
        if (success) {

        } else {
            this.formMessage = 'Enquiry failed to send';
        }
        
        this.setState({ sent: true });
        this.sending = false;
    }

    handleSubmit(event: FormEvent<EventTarget>) {
        event.preventDefault();
        
        if (this.sending) {
            return;
        }

        if (!this.validate()) {
            return;
        }

        this.sending = true;
        
        const mail = {
            name: this.value(this.name.current!),
            email: this.value(this.email.current!),
            message: this.value(this.message.current!)
        };

        emailjs
            .send('service_98m4xvj', 'template_9e2fgdm', mail)
            .then(() => { this.mailSent(true); })
            .catch(() => { this.mailSent(false); });
    }

    resetForm() {
        this.setState({ sent: false });
        this.formMessage = '';
    }

    render() {
        return (
            <Element name={Constants.contactKey}>
            <div className='HomeContact-slant'></div>
            <div className='HomeContact'>
                <div className='HomeContact-container'>
                    <div className='Grid'>
                        {/* Text */}
                        <div className='u-md-width1of2'>
                            <h1 className='HomeContact-title'>Let's talk</h1>
                            <p className='HomeContact-body'>You can get in touch with me by sending me a note or give me a call on +64 27 766 0041</p>
                        </div>
                        {/* Form */}
                        <div className='u-md-width1of2'>
                            <div className='HomeContact-form'>
                                { !this.state.sent &&
                                    <form onSubmit={this.handleSubmit.bind(this)} ref={this.form}>
                                        <input className='Input' placeholder='Your name' ref={this.name}></input>
                                        <input className='Input' placeholder='Your email' ref={this.email}></input>
                                        <textarea className='TextArea' placeholder='How can I help?' ref={this.message}></textarea>
                                        <input className='Button' type='submit' value='Submit'/>
                                    </form>
                                }
                                { this.state.sent &&
                                    <div className='HomeContact-form-response'>
                                        <h4 className='HomeContact-form-message'>{this.formMessage}</h4>
                                        <button className='Button' onClick={this.resetForm.bind(this)}>Enquire again</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Element>
        );
    }
}

class ContactFormData {
    name: string;
    email: string;
    message: string;

    constructor(name: string, email: string, message: string) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}   
